import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "ホームページ制作・リニューアル、業務アプリ開発、デザイン制作のご相談はこちら。無料でお見積りいたします。",
};

const steps = [
  { title: "お問い合わせ（無料）", body: "このフォームからご相談ください。" },
  { title: "ヒアリング", body: "メールまたはお電話・オンライン会議で、ご要望を伺います。" },
  { title: "ご提案とご契約", body: "内容に合ったプランをご提案し、契約内容をお送りします。" },
  { title: "制作開始", body: "契約内容にもとづいて制作を始めます。" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "お問い合わせ" }]}
        en="Contact"
        title="お問い合わせ"
        lead="サイト制作やリニューアル、業務アプリのご相談、ご不明点など、お気軽にお問い合わせください。無料でお見積りいたします。"
      />
      <div className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-20 lg:grid-cols-[1fr_22rem] lg:gap-24">
          <section aria-label="お問い合わせフォーム" className="max-w-3xl">
            <InquiryForm kind="contact" />
          </section>
          <aside className="space-y-10">
            <div className="rounded-[24px] bg-mist p-8">
              <h2 className="text-base font-semibold tracking-[0.06em]">ご依頼から制作までの流れ</h2>
              <ol className="mt-6 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="en grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-deep text-xs font-medium text-paper">{i + 1}</span>
                    <span>
                      <span className="block text-[15px] font-semibold">{s.title}</span>
                      <span className="mt-1 block text-sm leading-[1.9] text-ink-soft">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-3 px-2 text-sm leading-[1.9] text-ink-soft">
              <p>営業時間：{site.hours}</p>
              <p>同業他社様からのパートナー契約のご連絡は歓迎しております。</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
