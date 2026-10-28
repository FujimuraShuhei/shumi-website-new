import { Icon, IconBadge, type IconName } from "@/components/ui/icons";

/**
 * 下層ページ用の「資料っぽい」図解パーツ。
 * どれも data-r="pop" で、スクロールに合わせてポンポンと順に現れる。
 */

/** 英字ラベルや見出しの言葉から、合うアイコンを選ぶ */
const iconRules: [RegExp, IconName][] = [
  [/secure|security|セキュリティ|安全|ssl|守/i, "shield"],
  [/readab|見やす|デザイン|design|style|モダン/i, "eye"],
  [/usab|触りやす|操作|スクロール/i, "tap"],
  [/hearing|ヒアリング|相談|声/i, "chat"],
  [/research|調査|分析|marketing|マーケ|競合|検索|seo/i, "search"],
  [/content|コンテンツ|テキスト|文章|writing/i, "pen"],
  [/structure|設計|構成|ワイヤー|layout/i, "layout"],
  [/knowledge|業務内容|詳し|業界/i, "brand"],
  [/conversion|問い合わせ|導線|応募|予約/i, "mail"],
  [/写真|画像|photo|camera/i, "camera"],
  [/採用|求職|人|people|recruit|ミスマッチ/i, "people"],
  [/信頼|信用|透明|ブランド|trust/i, "brand"],
  [/売上|成約|集客|増や|成長|向上/i, "up"],
  [/自動|負担|手間|効率|管理/i, "sync"],
  [/サポート|support|アフター/i, "support"],
  [/ブログ|お知らせ|blog/i, "blog"],
  [/オリジナル|original/i, "brand"],
  [/日報|報告|台帳|doc/i, "doc"],
  [/勤怠|出面|時間|clock/i, "clock"],
  [/地図|map|訪問|営業/i, "globe"],
  [/スマホ|mobile/i, "mobile"],
  [/リニューアル|配色|コンセプト|強み/i, "brand"],
];
export function iconFor(...texts: (string | undefined)[]): IconName {
  const t = texts.filter(Boolean).join(" ");
  for (const [re, name] of iconRules) if (re.test(t)) return name;
  return "check";
}

const num = (i: number) => String(i + 1).padStart(2, "0");

/** 強み：アイコン＋番号のカード（3枚が基本） */
export function PointCards({
  items,
  tone = "light",
}: {
  items: { en?: string; title: string; body: string; icon?: IconName }[];
  tone?: "light" | "panel" | "dark";
}) {
  const card = {
    light: "bg-card ring-1 ring-line-soft",
    panel: "bg-card shadow-[0_24px_60px_-40px_rgba(13,31,34,0.45)]",
    dark: "bg-paper/[0.06] ring-1 ring-paper/12",
  }[tone];
  const dark = tone === "dark";
  return (
    <ul className={`grid gap-4 ${items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
      {items.map((it, i) => (
        <li key={it.title} data-r="pop" className={`relative flex flex-col rounded-[24px] p-7 md:p-8 ${card}`}>
          <div className="flex items-start justify-between">
            <IconBadge name={it.icon ?? iconFor(it.en, it.title)} tone={dark ? "dark" : i === 0 ? "brand" : "light"} size="lg" />
            <span aria-hidden="true" className={`display-en text-[2.75rem] ${dark ? "text-paper/10" : "text-line-soft"}`}>
              {num(i)}
            </span>
          </div>
          {it.en && <p className={`label-en mt-8 text-[12px] ${dark ? "text-brand-light" : "text-brand-deep"}`}>{it.en}</p>}
          <p className={`${it.en ? "mt-1" : "mt-8"} text-[1.25rem] font-black leading-snug tracking-[0.02em]`}>{it.title}</p>
          <p className={`mt-3 text-[14px] leading-[1.9] ${dark ? "text-paper/70" : "text-ink-soft"}`}>{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** 課題・できること：チェック付きのタイル */
export function CaseTiles({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${items.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
      {items.map((c) => (
        <li key={c.title} data-r="pop" className="flex gap-5 rounded-[22px] bg-card p-6 ring-1 ring-line-soft">
          <IconBadge name={iconFor(c.title)} size="md" />
          <div>
            <p className="text-[17px] font-black leading-snug tracking-[0.02em]">{c.title}</p>
            <p className="mt-2 text-[13.5px] leading-[1.85] text-ink-soft">{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** 「課題 → 解決」の対比（導入文を図にしたもの） */
export function ProblemSolution({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
      <div data-r="pop" className="rounded-[24px] bg-mist p-7">
        <span className="inline-flex h-8 items-center gap-2 rounded-full bg-card px-3 text-[12px] font-bold text-ink-mute">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-ink-mute/15 text-[10px]">!</span>
          よくある状態
        </span>
        <p className="mt-5 text-[15px] font-bold leading-[1.9]">{problem}</p>
      </div>
      <span data-r="pop" aria-hidden="true" className="mx-auto grid h-12 w-12 rotate-90 place-items-center rounded-full bg-grad-brand text-paper md:rotate-0">
        <Icon name="arrow" className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <div data-r="pop" className="rounded-[24px] bg-grad-deep p-7 text-paper">
        <span className="inline-flex h-8 items-center gap-2 rounded-full bg-paper/10 px-3 text-[12px] font-bold text-brand-light">
          <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />
          Shumiなら
        </span>
        <p className="mt-5 text-[15px] font-bold leading-[1.9]">{solution}</p>
      </div>
    </div>
  );
}

/** 文字列だけの工程を、番号つきのチップでつなぐ */
export function StepChips({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((s, i) => (
        <li key={s} className="contents">
          <span data-r="pop" className="inline-flex h-14 items-center gap-3 rounded-full bg-card pl-2 pr-6 ring-1 ring-line-soft">
            <span className={`label-en grid h-10 w-10 place-items-center rounded-full text-[13px] ${i === steps.length - 1 ? "bg-grad-brand text-paper" : "bg-brand-wash text-brand-deep"}`}>
              {num(i)}
            </span>
            <span className="text-[15px] font-bold tracking-[0.04em]">{s}</span>
          </span>
          {i < steps.length - 1 && (
            <span data-r="pop" aria-hidden="true" className="text-brand">
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** 小さなアイコンタイル（できること・アイデアの一覧） */
export function IdeaTiles({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className="grid grid-cols-2 gap-3">
      {items.map((a) => (
        <li
          key={a}
          data-r="pop"
          className={`flex flex-col gap-4 rounded-[20px] p-5 ${dark ? "bg-paper/[0.06] ring-1 ring-paper/12" : "bg-card ring-1 ring-line-soft"}`}
        >
          <IconBadge name={iconFor(a)} tone={dark ? "dark" : "light"} size="sm" />
          <span className="text-[14px] font-bold leading-snug tracking-[0.03em]">{a}</span>
        </li>
      ))}
    </ul>
  );
}

/** 大きな数字・キーワードを並べる帯 */
export function KeyFacts({ items, tone = "light" }: { items: { value: string; unit?: string; label: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className={`grid grid-cols-2 gap-3 ${items.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
      {items.map((f) => (
        <li key={f.label} data-r="pop" className={`rounded-[22px] p-6 ${dark ? "bg-paper/[0.06] ring-1 ring-paper/12" : "bg-mist"}`}>
          <p className="display-en text-[2.5rem] text-grad-brand md:text-[3rem]">
            {f.value}
            {f.unit && <span className="ml-1 text-[1rem] font-black tracking-normal">{f.unit}</span>}
          </p>
          <p className={`mt-2 text-[13px] font-bold ${dark ? "text-paper/70" : "text-ink-soft"}`}>{f.label}</p>
        </li>
      ))}
    </ul>
  );
}
