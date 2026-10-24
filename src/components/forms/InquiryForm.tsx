"use client";

import Link from "next/link";
import Script from "next/script";
import { useActionState, useEffect, useId, useRef, type ReactNode } from "react";
import { submitForm } from "@/app/actions/contact";
import { documentsList, topics, type FormState } from "@/lib/contact-schema";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; language?: string }) => string;
      remove: (id: string) => void;
    };
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function InquiryForm({ kind, defaultTopic }: { kind: "contact" | "document"; defaultTopic?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, { status: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();

  useEffect(() => {
    if (state.status === "error") {
      summaryRef.current?.focus();
    }
    if (state.status === "success") {
      doneRef.current?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-[28px] bg-mint p-10 md:p-16" role="status">
        <svg width="56" height="56" viewBox="0 0 72 72" aria-hidden="true">
          <circle cx="36" cy="36" r="34" fill="var(--color-brand-deep)" />
          <path d="M22 37l9 9 19-19" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 ref={doneRef} tabIndex={-1} className="mt-8 text-2xl tracking-[0.06em] md:text-[1.75rem]">
          {kind === "contact" ? "お問い合わせを受け付けました" : "資料請求を受け付けました"}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
          {kind === "contact"
            ? "ご入力のメールアドレスに、受付のお知らせを自動でお送りしました。内容を確認のうえ、2営業日以内に担当よりご連絡します。"
            : "ご入力のメールアドレスに、受付のお知らせを自動でお送りしました。1営業日以内に資料をメールでお送りします。"}
        </p>
        <p className="mt-3 text-sm text-ink-mute">メールが届かない場合は、迷惑メールのフォルダもご確認ください。</p>
        <Link href="/" className="mt-10 inline-flex h-14 items-center rounded-full border border-ink/20 bg-paper px-8 font-bold hover:border-ink">
          トップページに戻る
        </Link>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = state.fieldErrors ?? {};
  const val = (k: string) => (typeof v[k] === "string" ? (v[k] as string) : undefined);
  // 送信のたびにフォームを作り直して、入力値を保ったまま表示する
  const formKey = JSON.stringify(v);

  return (
    <>
      <form key={formKey} action={action} noValidate={false} className="space-y-10" aria-describedby={`${uid}-req`}>
        <input type="hidden" name="kind" value={kind} />
        {/* ボット対策の隠し欄。人間には見えず、入力されることはない */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            この欄は空のままにしてください
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <p id={`${uid}-req`} className="text-sm text-ink-soft">
          <Required /> の項目は入力が必要です。
        </p>

        {state.status === "error" && (
          <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-2xl border border-alert/40 bg-[#fdf1f0] p-6">
            <p className="font-bold text-alert">{state.message}</p>
            {Object.keys(err).length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {Object.entries(err).map(([k, m]) => (
                  <li key={k}>
                    <a href={`#${uid}-${k}`} className="underline">
                      {m}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {kind === "contact" ? (
          <Field label="ご相談の種類" required id={`${uid}-topic`} error={err.topic} as="fieldset">
            <div className="grid gap-2 sm:grid-cols-2">
              {topics.map((t) => (
                <label key={t} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-line bg-paper px-5 transition-colors hover:border-ink-mute has-checked:border-brand-deep has-checked:bg-mint">
                  <input type="radio" name="topic" value={t} required defaultChecked={(val("topic") ?? defaultTopic ?? topics[0]) === t} className="h-5 w-5 accent-[#0a7a83]" />
                  <span className="text-[15px] font-bold">{t}</span>
                </label>
              ))}
            </div>
          </Field>
        ) : (
          <Field label="ご希望の資料（複数選べます）" required id={`${uid}-documents`} error={err.documents} as="fieldset">
            <div className="grid gap-2">
              {documentsList.map((d) => (
                <label key={d} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-line bg-paper px-5 transition-colors hover:border-ink-mute has-checked:border-brand-deep has-checked:bg-mint">
                  <input
                    type="checkbox"
                    name="documents"
                    value={d}
                    defaultChecked={Array.isArray(v.documents) ? v.documents.includes(d) : true}
                    className="h-5 w-5 accent-[#0a7a83]"
                  />
                  <span className="text-[15px] font-bold">{d}</span>
                </label>
              ))}
            </div>
          </Field>
        )}

        <div className="grid gap-10 md:grid-cols-2">
          <Field label="お名前" required id={`${uid}-name`} error={err.name}>
            <input id={`${uid}-name`} name="name" required maxLength={50} autoComplete="name" defaultValue={val("name")} {...invalid(err.name, `${uid}-name`)} className={inputCls} />
          </Field>
          <Field label="会社名" required id={`${uid}-company`} error={err.company}>
            <input
              id={`${uid}-company`}
              name="company"
              required
              maxLength={100}
              autoComplete="organization"
              defaultValue={val("company")}
              {...invalid(err.company, `${uid}-company`)}
              className={inputCls}
            />
          </Field>
          <Field label="メールアドレス" required id={`${uid}-email`} error={err.email} hint="例：taro@example.com">
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              defaultValue={val("email")}
              {...invalid(err.email, `${uid}-email`)}
              className={inputCls}
            />
          </Field>
          <Field label="電話番号" id={`${uid}-phone`} error={err.phone} hint="お電話でのご連絡を希望される場合">
            <input id={`${uid}-phone`} name="phone" type="tel" maxLength={20} autoComplete="tel" inputMode="tel" defaultValue={val("phone")} {...invalid(err.phone, `${uid}-phone`)} className={inputCls} />
          </Field>
        </div>

        <Field
          label={kind === "contact" ? "ご相談の内容" : "ご質問など"}
          required={kind === "contact"}
          id={`${uid}-message`}
          error={err.message}
          hint={kind === "contact" ? "サイトのご要望や、「日報を紙で集めていて大変」といった困りごとなど、自由にご記入ください。" : undefined}
        >
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={7}
            required={kind === "contact"}
            maxLength={3000}
            defaultValue={val("message")}
            {...invalid(err.message, `${uid}-message`)}
            className={`${inputCls} py-3 leading-relaxed`}
          />
        </Field>

        <div id={`${uid}-privacy`}>
          <label className="flex min-h-12 cursor-pointer items-start gap-3">
            <input type="checkbox" name="privacy" required defaultChecked={val("privacy") === "on"} className="mt-1 h-5 w-5 shrink-0 accent-[#0a7a83]" aria-invalid={err.privacy ? true : undefined} />
            <span>
              <Link href="/privacy" target="_blank" className="font-bold text-brand-deep underline underline-offset-4">
                プライバシーポリシー（新しいタブ）
              </Link>
              に同意する <Required />
            </span>
          </label>
          {err.privacy && <p className="mt-1 text-sm font-bold text-alert">{err.privacy}</p>}
        </div>

        {siteKey && <Turnstile siteKey={siteKey} />}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-16 w-full items-center justify-center rounded-full bg-brand-deep px-14 text-[15px] font-bold tracking-[0.08em] text-paper transition-colors hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {pending ? "送信しています…" : kind === "contact" ? "この内容で相談する" : "資料を請求する"}
        </button>
        <p className="text-sm text-ink-mute">送信した内容は、暗号化された通信でお送りします。フリーランスの方からの営業のご連絡はご遠慮ください。</p>
      </form>
    </>
  );
}

/**
 * Cloudflare Turnstile。フォームを作り直すたびに新しい確認欄を出す
 * （確認のトークンは1回しか使えないため）
 */
function Turnstile({ siteKey }: { siteKey: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let id: string | undefined;
    let timer: ReturnType<typeof setInterval> | undefined;
    const mount = () => {
      if (!ref.current || !window.turnstile) return false;
      id = window.turnstile.render(ref.current, { sitekey: siteKey, language: "ja" });
      return true;
    };
    if (!mount()) timer = setInterval(() => mount() && clearInterval(timer), 200);
    return () => {
      clearInterval(timer);
      if (id) window.turnstile?.remove(id);
    };
  }, [siteKey]);
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div ref={ref} className="min-h-[65px]" />
    </>
  );
}

const inputCls =
  "block min-h-14 w-full rounded-xl border border-line bg-paper px-5 text-base transition-colors hover:border-ink-mute focus:border-brand-deep focus:outline-none focus:ring-4 focus:ring-brand-wash aria-invalid:border-alert";

const invalid = (error: string | undefined, id: string) =>
  error ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};

function Required() {
  return <span className="ml-2 rounded-full bg-brand-wash px-2 py-0.5 align-middle text-[11px] font-bold text-brand-deep">必須</span>;
}

function Field({
  label,
  required,
  id,
  error,
  hint,
  children,
  as = "div",
}: {
  label: string;
  required?: boolean;
  id: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  as?: "div" | "fieldset";
}) {
  const Label = as === "fieldset" ? "legend" : "label";
  const Wrapper = as;
  return (
    <Wrapper id={as === "fieldset" ? id : undefined}>
      <Label {...(as === "div" ? { htmlFor: id } : {})} className="mb-3 block text-[15px] font-bold tracking-[0.04em]">
        {label}
        {required && <Required />}
      </Label>
      {hint && <p className="mb-2 text-sm text-ink-mute">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-bold text-alert">
          {error}
        </p>
      )}
    </Wrapper>
  );
}
