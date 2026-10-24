/**
 * サイト全体の設定と、各ページの文章。
 * 会社情報（代表者名・住所・メールアドレスなど）は環境変数から読み込みます（.env.example を参照）。
 */
const env = (key: string, fallback = "") => process.env[key]?.trim() || fallback;

export const site = {
  name: "Shumi",
  nameJa: "しゅうみ",
  tagline: "横浜市のブランディング・ホームページ制作",
  description:
    "神奈川県横浜市のShumi（しゅうみ）は、ブランディングを軸にしたホームページ制作と、業務効率化アプリ・営業ツールの開発を行っています。建設・建築業をはじめ、企業の魅力と仕事を美しく整えます。",
  url: env("NEXT_PUBLIC_SITE_URL", "https://shumiofficial.com"),
  hours: env("NEXT_PUBLIC_BUSINESS_HOURS", "9:00–18:00"),
  company: {
    name: env("NEXT_PUBLIC_COMPANY_NAME", "Shumiデザイン"),
    founded: env("NEXT_PUBLIC_COMPANY_FOUNDED"),
    representative: env("NEXT_PUBLIC_COMPANY_REPRESENTATIVE"),
    address: env("NEXT_PUBLIC_COMPANY_ADDRESS", "神奈川県横浜市"),
    email: env("NEXT_PUBLIC_CONTACT_EMAIL"),
    phone: env("NEXT_PUBLIC_CONTACT_PHONE"),
  },
};

/* ------------------------------------------------------------------
   ナビゲーション（現サイトの構成とURLをそのまま継承し、業務アプリ開発を追加）
------------------------------------------------------------------ */
export type NavItem = { href: string; label: string; en?: string; desc?: string; children?: NavItem[] };

export const websiteServices = [
  {
    href: "/construction_industry_website/",
    label: "建設・建築業特化サイト制作",
    en: "Construction",
    desc: "業界を知り尽くした設計で、信頼と問い合わせを生むサイトに。",
  },
  {
    href: "/website/corpolate/",
    label: "コーポレートサイト制作",
    en: "Corporate",
    desc: "BtoB企業の信頼を形にする、会社の顔となるサイト。",
  },
  {
    href: "/website/service_site/",
    label: "集客ができるサイト制作",
    en: "Service site",
    desc: "BtoCのお客様の心をつかみ、問い合わせにつなげるサイト。",
  },
  {
    href: "/website/recruit_website/",
    label: "採用応募を増やすサイト制作",
    en: "Recruit",
    desc: "働く魅力を伝え、ミスマッチと採用コストを減らすサイト。",
  },
];

export const appServices = [
  {
    href: "/app/",
    label: "業務効率化アプリ開発",
    en: "Business app",
    desc: "日報・案件管理・写真台帳など、社内の仕事を一つの画面に。",
  },
  {
    href: "/app/#sales-tool",
    label: "営業ツール開発",
    en: "Sales tool",
    desc: "地図での顧客管理や見積シミュレーターで、営業を強くする。",
  },
  {
    href: "/app/demo/",
    label: "アプリのデモを触る",
    en: "Demo",
    desc: "実際の画面を、その場で操作できます。",
  },
];

export const nav: NavItem[] = [
  { href: "/website/", label: "サイト制作内容", children: websiteServices },
  { href: "/app/", label: "業務アプリ開発", children: appServices },
  { href: "/plan/", label: "制作プラン" },
  { href: "/works/", label: "HP制作実績" },
  { href: "/design_all/", label: "デザイン制作" },
  { href: "/company/", label: "しゅうみについて" },
  { href: "/blog/", label: "ブログ" },
];

/* ------------------------------------------------------------------
   共通コンテンツ
------------------------------------------------------------------ */
export const strengths = [
  {
    en: "Hearing",
    title: "徹底したヒアリング",
    body: "事業やサービス、お客様が抱える課題を深く伺い、Webで何を伝えるべきか、どの業務を仕組みにすべきかを明確にします。",
  },
  {
    en: "Research",
    title: "競合との差別化のための調査",
    body: "競合のサイトや業界の動向を分析し、比較されたときに選ばれる「自社だけの強み」を一緒に言葉にします。",
  },
  {
    en: "Writing",
    title: "テキストもすべてお任せ",
    body: "ヒアリングと調査をもとに、伝わる文章をこちらで作成します。テキスト作成はすべてのプランに含まれています。",
  },
];

export const qualities = [
  {
    en: "Secure",
    title: "セキュリティに強い",
    body: "通信の暗号化、入力内容の検証、不正な送信の自動ブロック。個人情報は必要な場所にだけ保存する設計を標準にしています。",
  },
  {
    en: "Readable",
    title: "見やすい",
    body: "デジタル庁デザインシステムの考え方に沿って、文字の大きさや色のコントラストを設計。どの端末でも読みやすい画面にします。",
  },
  {
    en: "Usable",
    title: "触りやすい",
    body: "初めて使う人が迷わない導線と、指で押しやすいボタン。実際に操作してもらいながら、使いやすさを磨きます。",
  },
];

export const effects = [
  {
    title: "会社のブランドと信頼が上がる",
    body: "明確でわかりやすいデザインと、理念に共感を呼ぶコンテンツで、取引先やお客様からの信頼を高めます。",
  },
  {
    title: "応募が増え、採用のミスマッチが減る",
    body: "働く人の声と仕事のリアルを伝えることで、求人媒体だけでは出会えなかった人材とつながり、入社後のギャップも減らせます。",
  },
  {
    title: "伝わるコンテンツで、集客につながる",
    body: "ユーザーが知りたいこと、解決したいことを起点に設計するから、検索からの流入と問い合わせが増えていきます。",
  },
  {
    title: "社員が、本来の仕事に集中できる",
    body: "業務アプリで転記や確認の手間をなくし、営業・現場・事務の時間を、価値を生む仕事に戻します。",
  },
];

export const flow = [
  { title: "ヒアリング", short: "課題と目標を整理", body: "お客様のニーズや目標、課題点を明確にします。" },
  { title: "設計・コンテンツ作成", short: "構成と文章をつくる", body: "ワイヤーフレームで構成を作り込み、テキストを作成します。" },
  { title: "デザイン・開発", short: "かたちにする", body: "設計とテキストが固まった段階で、デザインと実装を進めます。" },
  { title: "テスト公開", short: "全端末で確認", body: "表示の乱れや不備がないか、端末ごとに綿密に確認します。" },
  { title: "公開・サポート", short: "公開後も伴走", body: "貴社で運用できる形でお渡しし、公開後の更新や改善も支えます。" },
];

export const commonFeatures = ["スマホ対応", "メールフォーム", "SSL化", "独自ドメイン", "画像用意（10枚）", "画像加工", "CMS（更新機能）", "ブログ機能"];

export const assurances = [
  { title: "完全オリジナルデザイン", body: "テンプレートに文字を入れるだけではなく、一社ごとにオリジナルのデザインを制作します。" },
  { title: "ブログ・お知らせ機能", body: "追加料金になりがちなブログ機能も、すべてのサイトに標準で付いています。" },
  { title: "安心のアフターサポート", body: "公開後の更新や運用のご相談に、電話・メール・オンライン会議で対応します。" },
];
