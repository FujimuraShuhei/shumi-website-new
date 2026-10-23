import type { Metadata } from "next";
import { WorksFilter } from "@/components/pages/WorksFilter";
import { ContactCta, PageHero } from "@/components/ui";
import { getWorks } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "HP制作実績",
  description: "Shumiデザインのホームページ制作実績。建設・建築業をはじめ、さまざまな業種のサイトと業務アプリを制作しています。",
};

export default async function WorksPage() {
  const works = await getWorks();
  return (
    <>
      <PageHero
        crumbs={[{ label: "HP制作実績" }]}
        en="Works"
        title="HP制作実績"
        lead="建設・建築業をはじめ、さまざまな業種のホームページを制作しています。社外に公開できない業務アプリは、ご相談の際に画面をお見せします。"
      />
      <section aria-label="実績の一覧" className="bg-paper py-24 md:py-32">
        <div className="wrap">
          <WorksFilter works={works} />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
