"use server";

import { headers } from "next/headers";
import { formSchema, type FormState } from "@/lib/contact-schema";
import { sendContactMails } from "@/lib/mail";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * お問い合わせ・資料請求の送信処理（サーバー側だけで動く）
 * 1. ボット用の隠し欄に入力があれば、成功したふりをして破棄
 * 2. 入力内容の検証（ここで失敗しても送信回数には数えない）
 * 3. 連続送信の制限
 * 4. Turnstile（人間かどうか）の確認
 * 5. Resend でメール送信。内容はデータベースやCMSには保存しない
 */
export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const h = await headers();
  const ip = h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const ua = h.get("user-agent");

  const raw = {
    kind: formData.get("kind"),
    name: formData.get("name") ?? "",
    company: formData.get("company") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    topic: formData.get("topic") ?? undefined,
    documents: formData.getAll("documents"),
    message: formData.get("message") ?? "",
    privacy: formData.get("privacy") ?? undefined,
  };
  const values = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, Array.isArray(v) ? v.map(String) : String(v ?? "")]),
  ) as Record<string, string | string[]>;

  if (formData.get("website")) return { status: "success" };

  const parsed = formSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "入力内容を確認してください。", fieldErrors, values };
  }

  if (!(await checkRateLimit(ip ?? "unknown"))) {
    return { status: "error", message: "短い時間に何度も送信されたため、受け付けを止めています。10分ほど時間をおいてから、もう一度送信してください。", values };
  }

  const token = formData.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) {
    return { status: "error", message: "自動送信ではないことを確認できませんでした。画面下の確認欄が完了してから、もう一度送信してください。", values };
  }

  const result = await sendContactMails(parsed.data, { ip, ua });
  if (!result.ok) {
    return {
      status: "error",
      message: "送信できませんでした。通信状況を確認し、時間をおいてもう一度送信してください。",
      values,
    };
  }
  return { status: "success" };
}
