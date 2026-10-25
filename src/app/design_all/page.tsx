import type { Metadata } from "next";
import { WorksGrid } from "@/components/home/Sections";
import { Button, ContactCta, Heading, PageHero } from "@/components/ui";
import { PointCards } from "@/components/ui/deck";
import { getWorks } from "@/lib/entries";

export const metadata: Metadata = {
  title: "デザイン制作",
  description: "ホームページ制作に加えて、バナー、SNS投稿画像、名刺、会社パンフレット、資料などのデザイン制作を承ります。",
};

const items = [
  { icon: "image" as const, en: "Banner", title: "バナー・広告画像", body: "Web広告やサイト内のキャンペーンに使うバナーを制作します。" },
  { icon: "mobile" as const, en: "SNS", title: "Instagram投稿画像", body: "ブランドの世界観をそろえた、続けやすい投稿テンプレートと画像を制作します。" },
  { icon: "handshake" as const, en: "Business card", title: "名刺", body: "会社の印象を手渡しで伝える、ロゴや配色と統一した名刺をデザインします。" },
  { icon: "doc" as const, en: "Pamphlet", title: "会社パンフレット", body: "営業や採用の場で使える、4ページ・6ページの会社案内を制作します。" },
  { icon: "chart" as const, en: "Document", title: "提案資料・営業資料", body: "伝えたいことが一目で伝わる、構成から整えた資料を制作します。" },
  { icon: "camera" as const, en: "Photo", title: "写真の編集・加工", body: "お手持ちの写真を、サイトや印刷物で映える仕上がりに整えます。" },
];

export default async function DesignPage() {
  const works = (await getWorks()).filter((w) => w.category.includes("design") || w.category.includes("web")).slice(0, 6);
  return (
    <>
      <PageHero
        crumbs={[{ label: "デザイン制作" }]}
        en="Design"
        title="ハイクオリティなデザイン制作"
        lead="ホームページ制作で培ったブランディングの考え方で、Webと紙のデザインを一貫して制作します。"
      >
        <div className="mt-12">
          <Button href="/plan/" variant="secondary">
            料金の目安を見る
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="items-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading num="01" en="Lineup" id="items-title" title="Webも紙も、一貫したデザインで。" />
          <div className="mt-16">
            <PointCards items={items} />
          </div>
        </div>
      </section>

      <section aria-labelledby="works-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <Heading num="02" en="Works" id="works-title" title="制作実績" />
          <div className="mt-16">
            <WorksGrid works={works} />
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
