import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "お役立ち資料",
  description: "Shumiのサイト制作がよりわかる資料を無料でお配りしています。成功事例や詳しい料金プラン、お悩みの解決方法をまとめました。",
};

const docs = [
  { en: "Service", title: "Shumiのサイト制作がわかる資料", body: "成功事例や詳しい料金プラン、お悩みの解決方法をまとめています。" },
  { en: "Construction", title: "工務店・建築企業の集客施策まとめ", body: "工務店・建築企業が、いまから取り組むべき集客の方法をまとめました。" },
  { en: "Business app", title: "業務アプリ導入の進め方", body: "どの業務からアプリにするか、社内でどう定着させるか。導入の手順をまとめました。" },
];

export default function DocumentPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "お役立ち資料" }]}
        en="Document"
        title="お役立ち資料"
        lead="Shumiのサイト制作がより詳しくわかる資料を、無料でお配りしています。フォームを送信いただくと、メールで資料をお送りします。"
      />
      <div className="bg-paper py-24 md:py-32">
        <div className="wrap grid gap-20 lg:grid-cols-[22rem_1fr] lg:gap-24">
          <section aria-labelledby="docs-title">
            <h2 id="docs-title" className="text-base tracking-[0.06em]">
              お送りできる資料
            </h2>
            <ul className="mt-6 space-y-4">
              {docs.map((d) => (
                <li key={d.title} className="overflow-hidden rounded-[20px] border border-line-soft">
                  <div aria-hidden="true" className="relative aspect-[16/9] bg-[linear-gradient(135deg,#154245,#0a7a83)] p-5">
                    <p className="label-en text-[11px] text-paper/70">{d.en}</p>
                    <p className="mt-2 text-sm font-bold leading-relaxed text-paper">{d.title}</p>
                    <svg viewBox="0 0 200 120" className="absolute -bottom-6 -right-10 h-24 opacity-60">
                      <g transform="rotate(-45 100 60)">
                        <rect x="40" y="40" width="200" height="22" rx="11" fill="#3cc3c4" />
                        <rect x="80" y="74" width="150" height="10" rx="5" fill="#ffffff" opacity="0.6" />
                      </g>
                    </svg>
                  </div>
                  <p className="p-5 text-sm leading-[1.9] text-ink-soft">{d.body}</p>
                </li>
              ))}
            </ul>
          </section>
          <section aria-label="資料請求フォーム" className="max-w-3xl">
            <InquiryForm kind="document" />
          </section>
        </div>
      </div>
    </>
  );
}
