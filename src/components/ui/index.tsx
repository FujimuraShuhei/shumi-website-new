import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className={className}>
      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

type Variant = "primary" | "secondary" | "light" | "ghost";
const variants: Record<Variant, string> = {
  primary: "bg-grad-brand text-paper hover:brightness-110",
  secondary: "border border-ink/20 bg-paper text-ink hover:border-ink",
  light: "bg-paper text-ink hover:bg-mint",
  ghost: "border border-paper/30 text-paper hover:border-paper",
};

/** 丸みのあるボタン。右端に矢印の丸アイコン */
export function Button({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-16 items-center justify-between gap-8 whitespace-nowrap rounded-full pl-8 pr-2 text-[15px] font-bold tracking-[0.06em] transition-colors ${variants[variant]} ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`grid h-12 w-12 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${
          variant === "primary" || variant === "ghost"
            ? "bg-paper/15"
            : variant === "light"
              ? "bg-brand-wash text-brand-deep"
              : "bg-mist transition-colors group-hover:bg-grad-brand group-hover:text-paper"
        }`}
      >
        <Arrow />
      </span>
    </Link>
  );
}

/** 「〜を見る」などの遷移も、すべて丸いボタンで統一する（白地用の細枠ボタン） */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Button href={href} variant="secondary" className={`!h-14 !gap-6 !pl-7 [&>span]:!h-10 [&>span]:!w-10 ${className}`}>
      {children}
    </Button>
  );
}

/**
 * セクション見出し（資料のスライド見出しの形）
 * 章番号 → 太い英字 → 日本語の一言（大きく）→ 補足（一文）
 */
export function Heading({
  en,
  title,
  lead,
  id,
  num,
  align = "left",
  tone = "default",
  as: Tag = "h2",
  className = "",
}: {
  en: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  /** 章番号（例：「02」） */
  num?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  as?: "h1" | "h2";
  className?: string;
}) {
  const inverse = tone === "inverse";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {num && (
        <p aria-hidden="true" data-r="pop" className={`mb-5 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className={`label-en grid h-9 min-w-9 place-items-center rounded-full px-2 text-[13px] ${inverse ? "bg-paper/10 text-brand-light ring-1 ring-paper/20" : "bg-grad-brand text-paper"}`}>{num}</span>
          <span className={`h-px w-10 ${inverse ? "bg-paper/25" : "bg-ink/20"}`} />
        </p>
      )}
      <p aria-hidden="true" data-r="mask" className={`display-en text-[clamp(2.75rem,7vw,5.5rem)] ${inverse ? "text-grad-light" : "text-grad-brand"}`}>
        {en}
      </p>
      <Tag id={id} data-r="up" className={`mt-6 text-[1.5rem] leading-[1.5] tracking-[0.03em] md:text-[2rem] ${inverse ? "text-paper" : "text-ink"}`}>
        {title}
      </Tag>
      {lead && <p data-r="up" className={`mt-5 text-[15px] leading-[2] md:text-base ${inverse ? "text-paper/75" : "text-ink-soft"}`}>{lead}</p>}
    </div>
  );
}

/** 下層ページの冒頭 */
export function PageHero({
  en,
  title,
  lead,
  crumbs,
  children,
}: {
  en: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: { href?: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft bg-paper">
      <Bands className="pointer-events-none absolute -right-40 -top-24 hidden h-[520px] w-[620px] opacity-90 md:block" />
      <div className="hero-in wrap relative pb-20 pt-10 md:pb-28 md:pt-14">
        <Breadcrumb crumbs={crumbs} />
        <p aria-hidden="true" className="display-en text-grad-brand mt-16 text-[clamp(3.25rem,10vw,8rem)] md:mt-24">
          {en}
        </p>
        <h1 className="mt-8 max-w-4xl text-[1.75rem] leading-[1.5] tracking-[0.04em] md:text-[2.5rem]">{title}</h1>
        {lead && <p className="mt-8 max-w-2xl text-[15px] leading-[2.1] text-ink-soft md:text-base">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumb({ crumbs }: { crumbs: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="現在地">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-mute">
        <li>
          <Link href="/" className="hover:text-ink">
            ホーム
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.label} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-px w-3 bg-line" />
            {c.href ? (
              <Link href={c.href} className="hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * 現サイトのキービジュアルにある「斜めの帯」を、ブランドのモチーフとして継承した図形。
 */
export function Bands({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 620 520" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="band-a" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#069fa9" />
          <stop offset="1" stopColor="#3cc3c4" />
        </linearGradient>
        <linearGradient id="band-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#e2f3f4" />
          <stop offset="1" stopColor="#f5fbfb" />
        </linearGradient>
      </defs>
      <g transform="rotate(-45 310 260)">
        <rect x="120" y="150" width="560" height="64" rx="32" fill="url(#band-b)" />
        <rect x="260" y="250" width="420" height="40" rx="20" fill="url(#band-a)" opacity="0.9" />
        <rect x="200" y="320" width="300" height="14" rx="7" fill="#154245" opacity="0.85" />
      </g>
    </svg>
  );
}

/** 資料請求とお問い合わせ（現サイトの全ページ末尾の構成を継承） */
export function ContactCta() {
  return (
    <section aria-label="資料請求とお問い合わせ" className="bg-paper py-24 md:py-32">
      <div className="wrap grid gap-6 lg:grid-cols-2">
        <Link href="/document/" data-r="up" className="group relative overflow-hidden rounded-[24px] bg-grad-mint p-10 transition-colors hover:bg-brand-wash md:p-14">
          <p className="label-en text-[13px] text-brand-deep">Document</p>
          <p className="mt-4 text-[1.75rem] font-black leading-relaxed tracking-[0.06em]">お役立ち資料</p>
          <p className="mt-4 max-w-md text-[15px] leading-[2] text-ink-soft">成功事例や詳しい料金プラン、お悩みの解決方法をまとめた資料を無料でお配りしています。</p>
          <span className="mt-10 inline-flex items-center gap-3 text-[15px] font-bold text-brand-deep">
            資料をダウンロードする
            <span className="grid h-12 w-12 place-items-center rounded-full bg-paper transition-transform duration-300 group-hover:translate-x-1">
              <Arrow />
            </span>
          </span>
        </Link>
        <Link href="/contact/" data-r="up" className="group relative overflow-hidden rounded-[24px] bg-grad-deep p-10 text-paper transition-colors hover:brightness-110 md:p-14">
          <Bands className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[500px] opacity-50" />
          <p className="label-en relative text-[13px] text-brand-light">Contact</p>
          <p className="relative mt-4 text-[1.75rem] font-black leading-relaxed tracking-[0.06em]">お問い合わせ</p>
          <p className="relative mt-4 max-w-md text-[15px] leading-[2] text-paper/75">
            サイト制作・リニューアル、業務アプリのご相談はこちらから。無料でお見積りいたします。
          </p>
          <span className="relative mt-10 inline-flex items-center gap-3 text-[15px] font-bold">
            無料で相談する
            <span className="grid h-12 w-12 place-items-center rounded-full bg-paper/15 transition-transform duration-300 group-hover:translate-x-1">
              <Arrow />
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}

export function Pill({ children, tone = "line" }: { children: ReactNode; tone?: "line" | "brand" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-[0.06em] ${
        tone === "brand" ? "bg-brand-wash text-brand-deep" : "border border-line text-ink-soft"
      }`}
    >
      {children}
    </span>
  );
}
