import fs from "node:fs/promises";
import path from "node:path";
import { imageSize } from "image-size";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
import { Button } from "@/components/ui";
import { Icon, IconBadge, type IconName } from "@/components/ui/icons";

/**
 * 記事（MDX）の中で使える部品。使い方は CLAUDE.md と content/blog/_template.mdx を参照。
 * どれも「資料デザイン」のトーンで、短い言葉と図で伝えるためのもの。
 */

/* ---------- 画像 ---------- */

async function sizeOf(src: string) {
  try {
    const { width, height } = imageSize(await fs.readFile(path.join(process.cwd(), "public", decodeURI(src))));
    return { width: width ?? 1600, height: height ?? 900 };
  } catch {
    throw new Error(`記事の画像 ${src} が public${src} にありません`);
  }
}

/** 図・画像（キャプションつき）。<Figure src="/blog/スラッグ/1.webp" alt="..." caption="..." /> */
export async function Figure({ src, alt, caption, wide = false }: { src: string; alt: string; caption?: string; wide?: boolean }) {
  const external = /^https?:\/\//.test(src);
  const size = external ? { width: 1600, height: 900 } : await sizeOf(src);
  return (
    <figure className={`not-prose my-10 ${wide ? "md:-mx-16" : ""}`}>
      <div className="overflow-hidden rounded-[20px] bg-mist ring-1 ring-line-soft">
        <Image src={src} alt={alt} width={size.width} height={size.height} sizes="(min-width: 900px) 768px, 100vw" className="h-auto w-full brightness-[0.94]" />
      </div>
      {caption && <figcaption className="mt-3 text-center text-[13px] text-ink-mute">{caption}</figcaption>}
    </figure>
  );
}

/** Markdown の ![説明](/blog/...) もそのまま Figure にする */
async function MdImage({ src, alt, title }: ComponentProps<"img">) {
  if (typeof src !== "string") return null;
  return <Figure src={src} alt={alt ?? ""} caption={title ?? undefined} />;
}

/* ---------- リンク ---------- */

function MdLink({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

/* ---------- 文章の強調 ---------- */

/** 導入文（記事の最初に1つ） */
export function Lead({ children }: { children: ReactNode }) {
  return <div className="not-prose text-[1.0625rem] font-bold leading-[2.1] text-ink md:text-lg [&_p+p]:mt-4">{children}</div>;
}

const boxTones = {
  // グレーの地の上なので、明るい箱は使わない（要点はブランド色、補足は一段沈んだグレー）
  point: { wrap: "bg-panel text-paper", text: "text-paper [&_strong]:text-brand-light", badge: "bg-grad-brand text-paper", icon: "check" as IconName, label: "ポイント" },
  note: { wrap: "bg-sunk", text: "text-ink [&_strong]:text-brand-deep", badge: "bg-brand-deep text-paper", icon: "chat" as IconName, label: "メモ" },
  warn: { wrap: "bg-[#dccab6] ring-1 ring-[#c8ad8f]", text: "text-ink [&_strong]:text-[#7a3d0c]", badge: "bg-[#a85712] text-paper", icon: "eye" as IconName, label: "注意" },
};

function Box({ tone, title, children }: { tone: keyof typeof boxTones; title?: string; children: ReactNode }) {
  const t = boxTones[tone];
  return (
    <aside className={`not-prose my-10 rounded-[22px] p-6 md:p-7 ${t.wrap}`}>
      <p className="flex items-center gap-3 text-[15px] font-black">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${t.badge}`}>
          <Icon name={t.icon} className="h-4 w-4" strokeWidth={2.2} />
        </span>
        {title ?? t.label}
      </p>
      <div className={`mt-3 text-[15px] leading-[2] [&_li]:mt-1 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 ${t.text}`}>{children}</div>
    </aside>
  );
}
export const Point = (p: { title?: string; children: ReactNode }) => <Box tone="point" {...p} />;
export const Note = (p: { title?: string; children: ReactNode }) => <Box tone="note" {...p} />;
export const Warn = (p: { title?: string; children: ReactNode }) => <Box tone="warn" {...p} />;

/** まとめ（チェックつきの一覧）。中は Markdown の箇条書きで書く */
export function Summary({ title = "この記事のまとめ", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="not-prose my-12 overflow-hidden rounded-[24px] bg-grad-deep p-7 text-paper md:p-9">
      <p className="label-en text-[12px] text-brand-light">Summary</p>
      <p className="mt-1 text-lg font-black">{title}</p>
      <div className="mt-5 text-[15px] leading-[1.9] [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-8 [&_li+li]:mt-3 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.35em] [&_li]:before:grid [&_li]:before:h-5 [&_li]:before:w-5 [&_li]:before:place-items-center [&_li]:before:rounded-full [&_li]:before:bg-brand-light [&_li]:before:text-[11px] [&_li]:before:font-black [&_li]:before:text-night [&_li]:before:content-['✓'] [&_strong]:text-brand-light">
        {children}
      </div>
    </aside>
  );
}

/* ---------- 図解 ---------- */

/** 手順。<Steps><Step title="...">本文</Step>...</Steps> */
export function Steps({ children }: { children: ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <ol className="not-prose relative my-10 space-y-4">
      <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-line" />
      {items.map((child, i) => (
        <li key={i} className="relative flex gap-5">
          <span className={`label-en relative grid h-12 w-12 shrink-0 place-items-center rounded-full text-[14px] ${i === items.length - 1 ? "bg-grad-brand text-paper" : "bg-panel text-brand-light"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 rounded-[20px] bg-mist p-5">{child}</div>
        </li>
      ))}
    </ol>
  );
}
export function Step({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div>
      <p className="text-[16px] font-black">{title}</p>
      {children && <div className="mt-1.5 text-[14px] leading-[1.9] text-ink-soft [&_p+p]:mt-2">{children}</div>}
    </div>
  );
}

/** ビフォー・アフターの比較 */
export function Compare({
  before,
  after,
  beforeLabel = "よくある状態",
  afterLabel = "こうすると",
}: {
  before: string[];
  after: string[];
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="not-prose my-10 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
      <div className="rounded-[22px] bg-sunk p-6">
        <p className="text-[13px] font-bold text-ink-mute">{beforeLabel}</p>
        <ul className="mt-4 space-y-2.5">
          {before.map((t) => (
            <li key={t} className="flex items-start gap-3 text-[14px] leading-[1.8]">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/10 text-[11px] text-ink-soft">✕</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <span aria-hidden="true" className="mx-auto grid h-11 w-11 rotate-90 place-items-center rounded-full bg-grad-brand text-paper md:rotate-0">
        <Icon name="arrow" className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <div className="rounded-[22px] bg-grad-deep p-6 text-paper">
        <p className="text-[13px] font-bold text-brand-light">{afterLabel}</p>
        <ul className="mt-4 space-y-2.5">
          {after.map((t) => (
            <li key={t} className="flex items-start gap-3 text-[14px] font-bold leading-[1.8]">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-light text-night">
                <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** アイコン付きカードの並び。<Cards><Card icon="search" title="...">短い説明</Card>...</Cards> */
export function Cards({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 }) {
  return <div className={`not-prose my-10 grid gap-3 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>{children}</div>;
}
export function Card({ icon = "check", title, children }: { icon?: IconName; title: string; children?: ReactNode }) {
  return (
    <div className="rounded-[20px] bg-panel p-5 text-paper">
      <IconBadge name={icon} tone="dark" size="sm" />
      <p className="mt-4 text-[15px] font-black leading-snug">{title}</p>
      {children && <div className="mt-1.5 text-[13px] leading-[1.85] text-paper/75">{children}</div>}
    </div>
  );
}

/** 数字で見せる。<Stats items={[{ value: "3", unit: "倍", label: "問い合わせ数" }]} /> */
export function Stats({ items }: { items: { value: string; unit?: string; label: string }[] }) {
  return (
    <div className={`not-prose my-10 grid grid-cols-2 gap-3 ${items.length >= 3 ? "md:grid-cols-3" : ""}`}>
      {items.map((s) => (
        <div key={s.label} className="rounded-[20px] bg-mist p-5">
          <p className="display-en text-grad-brand text-[2.5rem]">
            {s.value}
            {s.unit && <span className="ml-1 text-[1rem] font-black tracking-normal">{s.unit}</span>}
          </p>
          <p className="mt-1 text-[13px] font-bold text-ink-soft">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/** よくある質問。<Faq q="質問">答え</Faq> */
export function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="not-prose group my-3 rounded-[18px] bg-mist px-5 py-4 open:bg-sunk">
      <summary className="flex cursor-pointer list-none items-center gap-3 text-[15px] font-black [&::-webkit-details-marker]:hidden">
        <span className="label-en grid h-7 w-7 shrink-0 place-items-center rounded-full bg-grad-brand text-[12px] text-paper">Q</span>
        <span className="flex-1">{q}</span>
        <span aria-hidden="true" className="text-brand-deep transition-transform group-open:rotate-45">＋</span>
      </summary>
      <div className="mt-3 pl-10 text-[14px] leading-[1.95] text-ink-soft [&_p+p]:mt-2">{children}</div>
    </details>
  );
}

/** 記事の途中に置く相談の案内 */
export function Cta({ title = "ホームページや業務アプリのご相談はお気軽に", children }: { title?: string; children?: ReactNode }) {
  return (
    <aside className="not-prose my-12 flex flex-col gap-6 rounded-[24px] bg-grad-brand p-7 text-paper md:flex-row md:items-center md:justify-between md:p-8">
      <div>
        <p className="text-lg font-black leading-snug">{title}</p>
        <div className="mt-2 text-[14px] leading-[1.9] text-paper/80">{children ?? "建設業のホームページ・採用サイト・業務アプリまで。お見積りは無料です。"}</div>
      </div>
      <Button href="/contact/" variant="light" className="shrink-0">
        無料で相談する
      </Button>
    </aside>
  );
}

/** 画像だけの段落は <p> で包まない（<figure> を <p> の中に置けないため） */
function MdP({ children, ...rest }: ComponentProps<"p">) {
  const kids = Children.toArray(children);
  if (kids.length === 1 && isValidElement(kids[0]) && kids[0].type === MdImage) return <>{children}</>;
  return <p {...rest}>{children}</p>;
}

/* ---------- 表 ---------- */

function MdTable(props: ComponentProps<"table">) {
  return (
    <div className="my-8 overflow-x-auto">
      <table {...props} />
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  a: MdLink,
  p: MdP,
  img: MdImage as MDXComponents["img"],
  table: MdTable,
  Figure: Figure as MDXComponents[string],
  Lead,
  Point,
  Note,
  Warn,
  Summary,
  Steps,
  Step,
  Compare,
  Cards,
  Card,
  Stats,
  Faq,
  Cta,
};
