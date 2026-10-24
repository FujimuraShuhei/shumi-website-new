import type { Metadata } from "next";
import { PointCards, StepChips } from "@/components/ui/deck";
import { IconBadge } from "@/components/ui/icons";
import { ContactCta, Heading, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "しゅうみについて",
  description: "横浜市のShumiデザイン（しゅうみ）について。理念、名前の由来、得意なデザイン、事務所概要をご紹介します。",
};

const career = [
  ["2020年4月", "個人事業主としてWebデザインを開始"],
  ["2021年4月", "株式会社GVIにWebディレクター兼マーケターとして入社"],
  ["2021年7月", "Web制作スクールの講師を担当"],
  ["2021年10月", "リニューアルを担当したサイトで、SEO経由の売上が1.1億円に"],
  ["2022年3月", "株式会社GVIを退社"],
  ["2022年10月", "Shumiデザインを設立"],
];

export default function CompanyPage() {
  const c = site.company;
  const info: [string, string][] = [
    ["社名", c.name],
    ...(c.founded ? [["設立", c.founded] as [string, string]] : []),
    ...(c.representative ? [["代表者", c.representative] as [string, string]] : []),
    ["所在地", c.address],
    ["事業内容", "Webブランディング、ホームページ制作、デザイン制作、マーケティング支援、業務効率化アプリ・営業ツールの開発"],
    ["営業時間", site.hours],
    ...(c.email ? [["メール", c.email] as [string, string]] : []),
    ...(c.phone ? [["電話", c.phone] as [string, string]] : []),
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "しゅうみについて" }]}
        en="About us"
        title="しゅうみについて"
        lead="サービスの魅力を、わかりやすく、魅力的にWebで伝える。そのための設計から、日々の仕事を支える仕組みづくりまでを支援しています。"
      />

      <section aria-labelledby="philosophy-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading num="01" en="Philosophy" id="philosophy-title" title="つくって終わり、にしない。" lead="魅力が正しく伝わり、選ばれるところまで支援します。" />
          <div className="mt-14">
            <StepChips steps={["魅力を見つける", "設計とデザイン", "正しく伝わる", "選ばれる・成果になる"]} />
          </div>
        </div>
      </section>

      <section aria-labelledby="name-title" className="bg-grad-deep py-28 text-paper md:py-40">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-24">
          <div>
            <p data-r="pop" className="label-en inline-flex h-8 items-center rounded-full bg-paper/10 px-3 text-[12px] text-brand-light">02 · Name</p>
            <h2 id="name-title" className="mt-6 text-[1.5rem] leading-[1.8] tracking-[0.06em] sm:text-[1.75rem] xl:text-[2.125rem]">
              美しさが、ゆきとどく。
              <br />
              美しさが、整っている。
            </h2>
          </div>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: "eye" as const, k: "ゆきとどく", b: "細部まで、気配りのある設計" },
                { icon: "layout" as const, k: "整っている", b: "見やすく、迷わない情報設計" },
              ].map((m) => (
                <li key={m.k} data-r="pop" className="rounded-[24px] bg-paper/[0.06] p-7 ring-1 ring-paper/12">
                  <IconBadge name={m.icon} tone="dark" />
                  <p className="mt-6 text-[1.5rem] font-black">{m.k}</p>
                  <p className="mt-2 text-[14px] text-paper/70">{m.b}</p>
                </li>
              ))}
            </ul>
            <p data-r="up" className="mt-6 text-[14px] leading-[2] text-paper/70">「しゅうみ」の名前に込めた2つの意味。Webサイトでも業務アプリでも変わらない姿勢です。</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="style-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading num="03" en="Style" id="style-title" title="得意なテイストは、2つ。" lead="そのほかのデザインも、ご要望に応じて。" />
          <div className="mt-16">
            <PointCards
              items={[
                { icon: "brand", en: "Stylish", title: "スタイリッシュ", body: "余白と構成で、信頼感と先進性を。" },
                { icon: "eye", en: "Simple & gentle", title: "シンプルで優しい", body: "やわらかな色と読みやすさで、安心を。" },
                { icon: "globe", en: "Area", title: "全国から、オンラインで", body: "横浜市・川崎市は撮影にも伺えます。" },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="outline-title" className="bg-mist py-28 md:py-40">
        <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Heading num="04" en="Outline" id="outline-title" title="事務所概要" />
            <dl className="mt-12 divide-y divide-line border-y border-line">
              {info.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <dt className="text-sm font-bold">{k}</dt>
                  <dd className="text-[15px] text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <Heading num="05" en="Career" id="career-title" title={c.representative ? `代表 ${c.representative} 経歴` : "代表経歴"} />
            <ol className="mt-12 border-l border-line">
              {career.map(([d, t]) => (
                <li key={d} data-r="pop" className="relative pb-8 pl-8 last:pb-0">
                  <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-brand" />
                  <p className="label-en text-[13px] text-brand-deep">{d}</p>
                  <p className="mt-1 text-[15px] leading-[1.9]">{t}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
