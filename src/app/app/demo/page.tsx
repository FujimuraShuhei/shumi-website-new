import type { Metadata } from "next";
import { DemoGallery } from "@/components/demos/DemoGallery";
import { Button, ContactCta, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "業務アプリのデモ",
  description: "業務の登録と一覧、地図営業アプリ、スマホの日報、見積シミュレーター、写真台帳。Shumiが開発する業務アプリと営業ツールの画面を、その場で操作できます。",
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/app/", label: "業務アプリ開発" }, { label: "デモ" }]}
        en="Demo"
        title="業務アプリのデモ"
        lead="画面を押すと、その場で操作できます。見た目と操作感を確かめるためのデモのため、入力した内容は保存されず、どこにも送信されません。"
      />
      <section aria-label="デモの一覧" className="bg-base py-24 md:py-32">
        <div className="wrap">
          <DemoGallery />
          <div className="mt-24 grid gap-8 rounded-[28px] bg-mint p-10 md:grid-cols-[1fr_auto] md:items-center md:p-14">
            <div>
              <h2 className="text-xl tracking-[0.06em] md:text-2xl">御社の業務に合わせた試作もお作りします</h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-[2.05] text-ink-soft">
                ご相談の段階で、実際の項目名や流れに合わせた試作画面をお見せします。現場の方に触っていただいてから、作るかどうかを決められます。
              </p>
            </div>
            <Button href="/contact/">試作について相談する</Button>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
