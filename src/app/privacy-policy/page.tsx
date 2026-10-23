import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "プライバシーポリシー" };

/** ※ひな形です。公開前に、現サイトのプライバシーポリシーと内容を照らし合わせてください。 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "プライバシーポリシー" }]} en="Privacy policy" title="プライバシーポリシー" />
      <div className="bg-paper py-20 md:py-28">
        <div className="wrap">
          <div className="prose-shumi">
            <p>{site.company.name}（以下「当事務所」）は、お預かりする個人情報を以下の方針に従って取り扱います。</p>
            <h2>取得する情報</h2>
            <p>お問い合わせ・資料請求の際に、お名前、会社名、メールアドレス、電話番号、ご相談の内容を取得します。</p>
            <h2>利用目的</h2>
            <ul>
              <li>お問い合わせへの回答、資料の送付</li>
              <li>ご依頼いただいた業務に関するご連絡</li>
              <li>サービス改善のための統計（個人を特定しない形）</li>
            </ul>
            <h2>保存と管理</h2>
            <p>
              フォームから送信された内容は、暗号化された通信で当事務所のメールにのみ届きます。Webサイトの管理画面やデータベースには保存しません。
            </p>
            <h2>外部サービスの利用</h2>
            <p>フォームの不正送信を防ぐために Cloudflare Turnstile を、メールの送信に Resend を利用しています。これらのサービスには、処理に必要な範囲で情報が送られます。</p>
            <h2>第三者への提供</h2>
            <p>法令に基づく場合を除き、ご本人の同意なく第三者に提供することはありません。</p>
            <h2>開示・訂正・削除</h2>
            <p>ご本人からのお求めに応じて、保有する個人情報の開示・訂正・削除に対応します。お問い合わせフォームからご連絡ください。</p>
            <h2>改定</h2>
            <p>本方針は、必要に応じて改定することがあります。改定した場合はこのページでお知らせします。</p>
          </div>
        </div>
      </div>
    </>
  );
}
