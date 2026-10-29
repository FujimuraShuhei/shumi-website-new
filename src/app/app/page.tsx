import type { Metadata } from "next";
import { ScatterScene } from "@/components/app/ScatterScene";
import { DemoGallery } from "@/components/demos/DemoGallery";
import { MockShowcase } from "@/components/mocks/MockShowcase";
import { FlowTimeline } from "@/components/home/Deck";
import { PointCards } from "@/components/ui/deck";
import { IconBadge, type IconName } from "@/components/ui/icons";
import { Button, ContactCta, Heading, PageHero, TextLink } from "@/components/ui";
import { qualities } from "@/lib/site";

export const metadata: Metadata = {
  title: "業務効率化アプリ・営業ツール開発",
  description:
    "日報・案件管理・写真台帳などの業務効率化アプリと、地図での顧客管理や見積シミュレーターなどの営業ツールを開発します。セキュリティに強く、見やすく、触りやすいアプリを。",
};

const appExamples = [
  { icon: "doc" as IconName, en: "Daily report", title: "日報・作業報告", body: "現場からスマホで送信。人数や作業内容はタップで入力し、事務所ではすぐに一覧と集計を確認できます。" },
  { icon: "layout" as IconName, en: "Project", title: "案件・工事の管理", body: "案件の登録、担当、期日、進み具合を一つの画面で。期日が近いものは自動で知らせます。" },
  { icon: "camera" as IconName, en: "Photo", title: "写真台帳", body: "撮影した写真を工程や場所で整理し、提出用の台帳を数クリックで作成できます。" },
  { icon: "app" as IconName, en: "Stock", title: "資材・在庫の管理", body: "倉庫と現場の資材の出入りを記録し、足りなくなりそうなものを事前に知らせます。" },
];

const salesExamples = [
  { icon: "globe" as IconName, en: "Map", title: "地図で見込み客を管理", body: "見込み客を地図に並べ、状況ごとに色分け。訪問の記録と、効率のよい訪問ルートづくりができます。" },
  { icon: "chart" as IconName, en: "Simulator", title: "見積シミュレーター", body: "工事の場所や広さを選ぶだけで概算を表示。商談の場でも、ホームページ上でも使えます。" },
  { icon: "search" as IconName, en: "Case database", title: "施工事例データベース", body: "工事の種類や地域で事例を絞り込み、タブレットで商談相手にすぐ見せられます。" },
  { icon: "doc" as IconName, en: "Proposal", title: "提案用ページ", body: "相手の会社に合わせた提案をWebページで。資料を送るより、見てもらいやすくなります。" },
];

const steps = [
  { title: "ご相談・業務の見学", short: "仕事の流れを見学", body: "困っている業務と、実際の仕事の流れを伺います。" },
  { title: "触れる試作", short: "現場で触って確認", body: "本番の前に試作画面を作り、現場の方に操作していただきます。" },
  { title: "開発とテスト", short: "安全性と動作を検証", body: "セキュリティの確認と、スマホ・PCでの動作確認を行います。" },
  { title: "導入と説明会", short: "説明会と手順書", body: "使い方の説明会を行い、手順書をお渡しします。" },
  { title: "改善と保守", short: "使いながら育てる", body: "使いながら出てきた要望を反映し、更新を続けます。" },
];

function ExampleGrid({ items }: { items: typeof appExamples }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((e, i) => (
        <li key={e.title} data-r="pop" className="rounded-[24px] bg-panel p-7 text-paper">
          <div className="flex items-center gap-4">
            <IconBadge name={e.icon} tone={i === 0 ? "brand" : "dark"} />
            <div>
              <p className="label-en text-[12px] text-brand-light">{e.en}</p>
              <p className="text-[1.125rem] font-black tracking-[0.02em]">{e.title}</p>
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-[1.9] text-paper/75">{e.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function AppPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "業務アプリ開発" }]}
        en="Business app"
        title="業務効率化アプリ・営業ツール開発"
        lead="紙の日報、担当者ごとのExcel、FAXと電話。散らばった社内の仕事を、現場の人がそのまま使えるアプリにまとめます。市販のツールが合わなかった会社にこそ、業務に合わせたアプリを。"
      >
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/app/demo/">デモを触る</Button>
          <Button href="/contact/" variant="secondary">
            無料で相談する
          </Button>
        </div>
      </PageHero>

      <MockShowcase kind="app" caption="スマホで送った日報が、事務所のダッシュボードにすぐ届く（デモ）" />

      <ScatterScene />

      <section aria-labelledby="app-title" className="bg-base py-28 md:py-40">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <Heading num="01" en="Business app" id="app-title" title="業務効率化アプリ" lead="建設業をはじめ、現場と事務所のあいだで起きている手間を減らします。" />
          <ExampleGrid items={appExamples} />
        </div>
      </section>

      <section id="sales-tool" aria-labelledby="sales-title" className="bg-mist py-28 md:py-40">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <Heading num="02" en="Sales tool" id="sales-title" title="営業ツール" lead="誰がどこを訪問したか、次に誰へ連絡するか。営業の動きを支える道具をつくります。" />
          <ExampleGrid items={salesExamples} />
        </div>
      </section>

      <section aria-labelledby="demo-title" className="bg-base py-28 md:py-40">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Heading num="03" en="Demo" id="demo-title" title="デモを触ってみる" lead="画面を押すと、その場で操作できます。入力した内容は保存されず、どこにも送信されません。" />
            <TextLink href="/app/demo/" className="shrink-0">
              5つのデモをすべて見る
            </TextLink>
          </div>
          <div className="mt-16">
            <DemoGallery ids={["map-sales", "tasks"]} layout="feature" />
          </div>
        </div>
      </section>

      <section aria-labelledby="quality-title" className="bg-grad-deep py-28 text-paper md:py-40">
        <div className="wrap">
          <Heading num="04" en="Quality" id="quality-title" title="安全に、見やすく、触りやすく。" tone="inverse" lead="毎日使うものだから、最初の設計から。" />
          <div className="mt-16">
            <PointCards items={qualities} tone="dark" />
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="bg-base py-28 md:py-40">
        <div className="wrap">
          <Heading num="05" en="Flow" id="steps-title" title="作る前に、触って確かめる。" lead="試作で確かめるから「作ったのに使われない」が起きません。" />
          <div className="mt-20">
            <FlowTimeline steps={steps} />
          </div>
          <div data-r="pop" className="mt-16 flex flex-col gap-4 rounded-[24px] bg-panel p-6 text-paper sm:flex-row sm:items-center">
            <IconBadge name="chart" tone="dark" />
            <p className="text-[14px] font-bold leading-[1.9]">費用は「画面と機能の数・使う人数・連携するサービス」で決まります。内容を伺ってから、無料でお見積りします。</p>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
