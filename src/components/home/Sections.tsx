import Image from "next/image";
import Link from "next/link";
import { formatDot, workCategoryLabel, type Column, type Work } from "@/lib/content";
import { flow } from "@/lib/site";
import { Arrow } from "@/components/ui";

/** サービスの一覧（行で並べ、ホバーで背景が出る） */
export function ServiceRows({ items }: { items: { href: string; label: string; en?: string; desc?: string }[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((s) => (
        <li key={s.href} data-r="up" className="border-b border-line">
          <Link href={s.href} className="group grid items-center gap-3 px-2 py-8 transition-colors duration-300 hover:bg-mint md:grid-cols-[12rem_1fr_auto] md:gap-10 md:px-6 md:py-10">
            <span className="label-en text-[13px] text-brand-deep">{s.en}</span>
            <span>
              <span className="block text-lg font-extrabold tracking-[0.04em] md:text-xl">{s.label}</span>
              {s.desc && <span className="mt-2 block text-sm leading-[2] text-ink-soft">{s.desc}</span>}
            </span>
            <span aria-hidden="true" className="hidden h-12 w-12 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-brand-deep group-hover:bg-grad-brand group-hover:text-paper md:grid">
              <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 実績のサムネイル。画像が未登録のときはブランドの帯で代わりの図案を出す */
export function WorkThumb({ work, sizes = "(min-width: 1024px) 33vw, 100vw", priority = false }: { work: Work; sizes?: string; priority?: boolean }) {
  // 実績ごとに帯の位置を少しずらし、並べたときに単調にならないようにする
  const seed = [...work.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const shift = (seed % 5) * 22 - 44;
  if (work.thumbnail) {
    return (
      <Image
        src={`${work.thumbnail.url}?w=1200&fm=webp`}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
    );
  }
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#eef8f8,#e2f3f4)]">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04]">
        <g transform={`translate(${shift} 0) rotate(-45 200 125)`}>
          <rect x="120" y="70" width="320" height="34" rx="17" fill="#069fa9" opacity="0.85" />
          <rect x="190" y="124" width="230" height="16" rx="8" fill="#154245" opacity="0.8" />
          <rect x="60" y="160" width="300" height="28" rx="14" fill="#ffffff" />
        </g>
      </svg>
      <span className="absolute bottom-5 left-6 text-sm font-bold tracking-[0.08em] text-brand-dark">{work.client.replace(/様$/, "")}</span>
    </div>
  );
}

export function WorksGrid({ works }: { works: Work[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {works.map((w) => (
        <li key={w.id} data-r="up">
          <Link href={`/${w.id}/`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mint">
              <WorkThumb work={w} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-mute">
              {w.category.map((c) => (
                <span key={c} className="font-bold text-brand-deep">
                  {workCategoryLabel[c]}
                </span>
              ))}
              <span>{w.industry}</span>
            </div>
            <p className="mt-2 text-lg font-extrabold tracking-[0.04em]">{w.client}</p>
            <p className="mt-1 text-sm text-ink-soft">{w.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FlowSteps() {
  return (
    <div className="relative">
    <div aria-hidden="true" className="mb-6 hidden h-[3px] overflow-hidden rounded-full bg-line-soft md:block">
      <div data-r-scrub className="h-full w-full rounded-full bg-[linear-gradient(90deg,#3cc3c4,#0a7a83,#0b7596)]" />
    </div>
    <ol className="grid gap-px overflow-hidden rounded-2xl bg-line-soft md:grid-cols-5">
      {flow.map((f, i) => (
        <li key={f.title} data-r="up" className="relative bg-paper p-8">
          <p className="label-en text-[13px] text-brand-deep">Step {String(i + 1).padStart(2, "0")}</p>
          <p className="mt-6 text-lg font-extrabold tracking-[0.04em]">{f.title}</p>
          <p className="mt-3 text-sm leading-[2] text-ink-soft">{f.body}</p>
        </li>
      ))}
    </ol>
    </div>
  );
}

export function BlogRows({ posts }: { posts: Column[] }) {
  return (
    <ul className="border-t border-line">
      {posts.map((p) => (
        <li key={p.id} data-r="up" className="border-b border-line">
          <Link href={`/${p.id}/`} className="group grid gap-2 py-7 transition-colors md:grid-cols-[8rem_10rem_1fr_auto] md:items-center md:gap-8">
            <time dateTime={p.publishedAt} className="en text-sm text-ink-mute">
              {formatDot(p.publishedAt)}
            </time>
            <span className="text-xs font-bold text-brand-deep">{p.category}</span>
            <span className="font-bold leading-[1.9] tracking-[0.04em] transition-colors group-hover:text-brand-deep">{p.title}</span>
            <Arrow className="hidden text-ink-mute transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-deep md:block" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 番号を付けない3つの要素（順番に意味がないもの） */
export function Triad({ items, tone = "default" }: { items: { en?: string; title: string; body: string }[]; tone?: "default" | "panel" }) {
  return (
    <ul className={`grid md:grid-cols-3 ${tone === "panel" ? "gap-px overflow-hidden rounded-2xl bg-line-soft" : "gap-12 md:gap-10"}`}>
      {items.map((it) => (
        <li key={it.title} data-r="up" className={tone === "panel" ? "bg-paper p-8 md:p-10" : "border-t border-ink pt-8"}>
          {it.en && <p className="label-en text-[13px] text-brand-deep">{it.en}</p>}
          <p className="mt-4 text-lg font-extrabold tracking-[0.04em]">{it.title}</p>
          <p className="mt-4 text-[15px] leading-[2.05] text-ink-soft">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}
