import "server-only";
import { Resend } from "resend";
import type { FormInput } from "./contact-schema";
import { site } from "./site";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(input: FormInput): [string, string][] {
  const common: [string, string][] = [
    ["お名前", input.name],
    ["会社名", input.company || "—"],
    ["メール", input.email],
    ["電話番号", input.phone || "—"],
  ];
  if (input.kind === "contact") return [["ご相談の種類", input.topic], ...common, ["内容", input.message]];
  return [["ご希望の資料", input.documents.join("、")], ...common, ["ご質問など", input.message || "—"]];
}

const toText = (r: [string, string][]) => r.map(([k, v]) => `■${k}\n${v}`).join("\n\n");
const toHtml = (r: [string, string][]) =>
  `<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${r
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="background:#e9ecee;border:1px solid #c7d1dd;white-space:nowrap">${escape(k)}</th><td style="border:1px solid #c7d1dd">${escape(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

export type MailResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

/**
 * 1. Shumi（Gmail）への通知：返信ボタンでそのままお客様に返信できるよう reply-to をお客様にする
 * 2. お客様への自動返信：返信すると Shumi の Gmail に届くよう reply-to を通知先にする
 */
export async function sendContactMails(input: FormInput, meta: { ip: string | null; ua: string | null }): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[mail] メール設定が無いため、送信内容をログに出力します\n" + toText(rows(input)));
      return { ok: true };
    }
    console.error("[mail] RESEND_API_KEY / MAIL_FROM / CONTACT_TO のいずれかが未設定です");
    return { ok: false, reason: "not-configured" };
  }

  const resend = new Resend(apiKey);
  const r = rows(input);
  const label = input.kind === "contact" ? "お問い合わせ" : "資料請求";
  const who = input.company ? `${input.company} ${input.name}様` : `${input.name}様`;

  try {
    const notify = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: `【${label}】${who}`,
      text: `${toText(r)}\n\n---\n送信元IP: ${meta.ip ?? "不明"}\nブラウザ: ${meta.ua ?? "不明"}`,
      html: `<p>サイトから${label}が届きました。このメールに返信すると、お客様に届きます。</p>${toHtml(r)}`,
    });
    if (notify.error) throw notify.error;

    const intro =
      input.kind === "contact"
        ? "お問い合わせありがとうございます。内容を確認のうえ、2営業日以内に担当よりご連絡いたします。"
        : "資料請求ありがとうございます。担当より、1営業日以内に資料をメールでお送りいたします。";

    const reply = await resend.emails.send({
      from,
      to: input.email,
      replyTo: to,
      subject: `【Shumi】${label}を受け付けました`,
      text: `${input.name}様\n\n${intro}\n\n以下の内容で受け付けました。\n\n${toText(r)}\n\n---\nShumi（しゅうみ）\n${site.url}\n受付時間 ${site.hours}\n※このメールは送信専用アドレスから自動でお送りしています。ご返信いただくと担当に届きます。`,
      html: `<p>${escape(input.name)}様</p><p>${intro}</p><p>以下の内容で受け付けました。</p>${toHtml(r)}<p style="margin-top:24px;color:#46525e;font-size:12px">Shumi（しゅうみ）<br>${site.url}<br>受付時間 ${site.hours}</p>`,
    });
    // 自動返信の失敗は、通知が届いていれば受付自体は成功として扱う
    if (reply.error) console.error("[mail] 自動返信の送信に失敗しました", reply.error);

    return { ok: true };
  } catch (error) {
    console.error("[mail] 通知メールの送信に失敗しました", error);
    return { ok: false, reason: "failed" };
  }
}
