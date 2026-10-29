import type { Metadata } from "next";
import { Button, ContactCta, Heading, PageHero } from "@/components/ui";
import { IncludedGrid } from "@/components/home/Deck";
import { Icon, IconBadge, type IconName } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "制作プラン",
  description: "Shumiのホームページ制作プラン（スタンダード・プレミアム）、共通の内容とオプション、業務アプリ開発の進め方をご案内します。",
};

const plans = [
  {
    name: "スタンダードプラン",
    en: "Standard",
    target: "すぐに成果につながるホームページを作りたい企業様に",
    items: [
      ["制作ページ数", "6ページ（デザイン・コーディング）"],
      ["テキスト作成", "作成の補助"],
      ["修正回数", "2回まで"],
      ["打ち合わせ", "2回"],
      ["制作期間", "45日"],
    ],
  },
  {
    name: "プレミアムプラン",
    en: "Premium",
    target: "集客を徹底的に目指す企業様に",
    featured: true,
    items: [
      ["制作ページ数", "10ページ（デザイン・コーディング）"],
      ["戦略設計", "競合分析・自社の強みキーワード選定・コンテンツ設計"],
      ["修正回数", "4回まで"],
      ["打ち合わせ", "5回以内"],
      ["制作期間", "60日"],
    ],
  },
];

const options = [
  ["バナー制作", "1枚 1万円〜", "image"],
  ["Instagram投稿画像の作成", "1枚 2,000円〜", "mobile"],
  ["名刺デザイン", "1種 2万円〜", "handshake"],
  ["写真の編集・加工", "1枚 2,000円〜", "camera"],
  ["予約機能", "5万円〜", "clock"],
  ["ホームページのアイキャッチ画像作成", "1枚 1万円〜", "layout"],
  ["会社パンフレット", "4ページ 9万円〜／6ページ 12万円〜", "doc"],
  ["資料作成", "10ページ 5万円", "chart"],
  ["広告運用", "月額 5万円〜", "up"],
];

const appPlan: { icon: IconName; title: string; body: string }[] = [
  { icon: "chat", title: "ご相談・業務の見学", body: "困っている業務と流れを伺う" },
  { icon: "tap", title: "試作画面の作成", body: "触れる試作で、現場が確認" },
  { icon: "chart", title: "お見積り", body: "画面・人数・連携から算出" },
  { icon: "shield", title: "開発・導入・保守", body: "説明会と、改善・更新を継続" },
];

export default function PlanPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "制作プラン" }]}
        en="Plan"
        title="制作プラン"
        lead="新規のホームページ制作は、2つのプランをご用意しています。ご要望に合わせたオーダーメイドのプランも承ります。"
      />

      <section aria-labelledby="plans-title" className="bg-base py-28 md:py-40">
        <div className="wrap">
          <Heading num="01" en="Website" id="plans-title" title="ホームページ制作は、2つのプラン。" />
          <ul className="mt-16 grid gap-6 lg:grid-cols-2">
            {plans.map((p) => (
              <li key={p.name} data-r="pop" className={`rounded-[28px] p-8 md:p-12 ${p.featured ? "bg-grad-brand text-paper" : "bg-panel text-paper"}`}>
                <div className="flex items-center justify-between">
                  <p className={`label-en text-[13px] ${p.featured ? "text-paper" : "text-brand-light"}`}>{p.en}</p>
                  {p.featured && <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-night px-3 text-[12px] font-bold text-paper"><Icon name="up" className="h-4 w-4" strokeWidth={2.2} />集客を徹底</span>}
                </div>
                <h3 className="mt-3 text-2xl tracking-[0.05em]">{p.name}</h3>
                <p className={`mt-3 text-[15px] text-paper/80`}>{p.target}</p>
                <p className={`mt-8 text-sm text-paper/80`}>共通の内容（下記）に加えて</p>
                <dl className={`mt-3 divide-y border-y divide-paper/15 border-paper/15`}>
                  {p.items.map(([k, v]) => (
                    <div key={k} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                      <dt className={`text-sm text-paper/75`}>{k}</dt>
                      <dd className="font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-[2] text-ink-soft">
            ※ 料金はご要望を伺ったうえでお見積りします。サイトのリニューアルはページ数などを個別にご提案します。
            <br />※ Web事業・IT企業様からのご依頼は、本プランとは別にご相談ください。
          </p>
        </div>
      </section>

      <section aria-labelledby="common-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <Heading num="02" en="Common" id="common-title" title="必要なものは、最初から全部入り。" />
          <div className="mt-16">
            <IncludedGrid />
          </div>
        </div>
      </section>

      <section aria-labelledby="option-title" className="bg-base py-28 md:py-40">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Heading num="03" en="Option" id="option-title" title="オプション" lead="料金の目安です。内容に合わせてお見積りします。" />
          <dl className="grid gap-3 sm:grid-cols-2">
            {options.map(([k, v, icon]) => (
              <div key={k} data-r="pop" className="flex items-center gap-4 rounded-[20px] bg-panel p-5 text-paper">
                <IconBadge name={icon as IconName} tone="dark" size="sm" />
                <div>
                  <dt className="text-[14px] font-bold leading-snug">{k}</dt>
                  <dd className="label-en mt-1 text-[13px] text-brand-light">{v}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="app-plan-title" className="bg-grad-night py-28 text-paper md:py-40">
        <div className="wrap">
          <Heading
            num="04"
            en="Business app"
            id="app-plan-title"
            title="業務アプリは、伺ってからお見積り。"
            tone="inverse"
            lead="作るものによって費用が変わるため、無料でお見積りします。"
          />
          <ol className="mt-16 grid gap-3 md:grid-cols-4">
            {appPlan.map((a, i) => (
              <li key={a.title} data-r="pop" className="rounded-[24px] bg-paper/[0.06] p-7 ring-1 ring-paper/12">
                <div className="flex items-center justify-between">
                  <IconBadge name={a.icon} tone="dark" />
                  <span className="label-en text-[12px] text-brand-light">Step {String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-6 text-lg font-black tracking-[0.02em]">{a.title}</p>
                <p className="mt-2 text-[13.5px] leading-[1.85] text-paper/70">{a.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact/" variant="light">
              プラン内容を相談する（無料）
            </Button>
            <Button href="/app/" variant="ghost">
              業務アプリ開発を見る
            </Button>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
