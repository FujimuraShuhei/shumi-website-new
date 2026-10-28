import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "利用規約" };

/** ※ひな形です。公開前に、現サイトの利用規約と内容を照らし合わせてください。 */
export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "利用規約" }]} en="Terms" title="利用規約" />
      <div className="bg-base py-20 md:py-28">
        <div className="wrap">
          <div className="prose-shumi">
            <p>このWebサイト（以下「本サイト」）をご利用いただく際の条件を定めます。</p>
            <h2>著作権</h2>
            <p>本サイトに掲載している文章・画像・デザインの著作権は、Shumiデザインまたは正当な権利者に帰属します。無断での転載・複製はご遠慮ください。</p>
            <h2>デモについて</h2>
            <p>本サイトの業務アプリのデモは、操作感をお試しいただくためのものです。入力した内容は保存されず、表示される名称や数値は架空のものです。</p>
            <h2>免責</h2>
            <p>本サイトの情報は正確であるよう努めていますが、その内容を保証するものではありません。本サイトの利用によって生じた損害について、当事務所は責任を負いません。</p>
            <h2>変更</h2>
            <p>本規約は予告なく変更することがあります。</p>
          </div>
        </div>
      </div>
    </>
  );
}
