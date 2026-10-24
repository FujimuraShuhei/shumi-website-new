import type { Metadata } from "next";
import { Button, ContactCta, Heading, PageHero } from "@/components/ui";
import { commonFeatures } from "@/lib/site";

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
  ["バナー制作", "1枚 1万円〜"],
  ["Instagram投稿画像の作成", "1枚 2,000円〜"],
  ["名刺デザイン", "1種 2万円〜"],
  ["写真の編集・加工", "1枚 2,000円〜"],
  ["予約機能", "5万円〜"],
  ["ホームページのアイキャッチ画像作成", "1枚 1万円〜"],
  ["会社パンフレット", "4ページ 9万円〜／6ページ 12万円〜"],
  ["資料作成", "10ページ 5万円"],
  ["広告運用", "月額 5万円〜"],
];

const appPlan = [
  { title: "ご相談・業務の見学", body: "いま困っている業務と、仕事の流れを伺います。" },
  { title: "試作画面の作成", body: "本番の前に触れる試作を作り、現場の方に操作していただきます。" },
  { title: "お見積り", body: "画面と機能の数、使う人数、ほかのサービスとの連携をもとにお見積りします。" },
  { title: "開発・導入・保守", body: "開発後は説明会を行い、公開後の改善とセキュリティの更新も継続します。" },
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

      <section aria-labelledby="plans-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading en="Website" id="plans-title" title="新規ホームページ制作" />
          <ul className="mt-16 grid gap-6 lg:grid-cols-2">
            {plans.map((p) => (
              <li key={p.name} className={`rounded-[28px] p-8 md:p-12 ${p.featured ? "bg-brand-dark text-paper" : "border border-line bg-paper"}`}>
                <p className={`label-en text-[13px] ${p.featured ? "text-brand-light" : "text-brand-deep"}`}>{p.en}</p>
                <h3 className="mt-3 text-2xl tracking-[0.05em]">{p.name}</h3>
                <p className={`mt-3 text-[15px] ${p.featured ? "text-paper/75" : "text-ink-soft"}`}>{p.target}</p>
                <p className={`mt-8 text-sm ${p.featured ? "text-paper/75" : "text-ink-soft"}`}>共通の内容（下記）に加えて</p>
                <dl className={`mt-3 divide-y border-y ${p.featured ? "divide-paper/15 border-paper/15" : "divide-line border-line"}`}>
                  {p.items.map(([k, v]) => (
                    <div key={k} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                      <dt className={`text-sm ${p.featured ? "text-paper/70" : "text-ink-mute"}`}>{k}</dt>
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
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Heading en="Common" id="common-title" title="すべてのプランに含まれる内容" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {commonFeatures.map((f) => (
              <li key={f} className="flex items-center gap-4 rounded-2xl bg-paper px-6 py-5 font-bold">
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0 text-brand-deep">
                  <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
                  <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="option-title" className="bg-paper py-28 md:py-40">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Heading en="Option" id="option-title" title="オプション" lead="料金の目安です。内容に合わせてお見積りします。" />
          <dl className="divide-y divide-line border-y border-line">
            {options.map(([k, v]) => (
              <div key={k} className="flex flex-col justify-between gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                <dt className="font-bold">{k}</dt>
                <dd className="text-[15px] text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="app-plan-title" className="bg-night py-28 text-paper md:py-40">
        <div className="wrap">
          <Heading
            en="Business app"
            id="app-plan-title"
            title="業務アプリ開発の進め方と費用"
            tone="inverse"
            lead="業務アプリと営業ツールは、作るものによって費用が大きく変わるため、ご相談の内容を伺ってからお見積りします。お見積りは無料です。"
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-paper/10 md:grid-cols-4">
            {appPlan.map((a, i) => (
              <li key={a.title} className="bg-night p-8">
                <p className="label-en text-[13px] text-brand-light">Step {String(i + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-lg font-extrabold tracking-[0.04em]">{a.title}</p>
                <p className="mt-3 text-sm leading-[2] text-paper/70">{a.body}</p>
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
