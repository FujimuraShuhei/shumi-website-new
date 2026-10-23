import type { Column, Work } from "./content";

/**
 * microCMS を接続するまでの仮データ（現サイトに掲載中の実績・記事のタイトルとURL）。
 * microCMS では「コンテンツID」を現サイトのURLのスラッグと同じにしてください。
 * 例）https://shumiofficial.com/uchida_koji_works/ → コンテンツID：uchida_koji_works
 */
export const sampleWorks: Work[] = [
  { id: "uchida_koji_works", title: "コーポレートサイト制作", client: "内田工事株式会社様", industry: "建設業", category: ["web"], summary: "工事会社としての信頼と、施工の強みが伝わるコーポレートサイトを制作しました。", publishedAt: "2023-09-05T00:00:00.000Z" },
  { id: "seikou_shumidesign", title: "コーポレートサイト制作", client: "株式会社セイコウ様", industry: "建設業", category: ["web"], summary: "会社の信頼感と事業の幅が伝わるサイトを制作しました。", publishedAt: "2023-06-01T00:00:00.000Z" },
  { id: "syokusenko_natsume", title: "ホームページ制作", client: "職専工なつめ様", industry: "建設業", category: ["web"], summary: "職人の技術と人柄が伝わるホームページを制作しました。", publishedAt: "2023-05-31T00:00:00.000Z" },
  { id: "enhance_homepage", title: "ホームページ制作", client: "合同会社エンハンス様", industry: "サービス業", category: ["web"], summary: "事業の魅力をわかりやすく伝えるホームページを制作しました。", publishedAt: "2023-05-30T00:00:00.000Z" },
  { id: "yokohama-renove", title: "ホームページ制作", client: "YOKOHAMA RENOVE様", industry: "リフォーム", category: ["web"], summary: "リフォームの事例と想いが伝わるホームページを制作しました。", publishedAt: "2023-05-20T00:00:00.000Z" },
  { id: "wings_hamaotsu", title: "ホームページ制作", client: "Wings英語教室@浜大津様", industry: "教育", category: ["web"], summary: "教室の雰囲気が伝わり、体験レッスンの申し込みにつながるサイトを制作しました。", publishedAt: "2023-04-10T00:00:00.000Z" },
];

const migrating = "<p>この記事は新しいサイトへ移行中です。microCMS の「ブログ」に本文を登録すると、ここに表示されます。</p>";

export const sampleColumns: Column[] = [
  { id: "buildingconstruction_attracting_customers", title: "工務店・建築企業が成功した集客方法5選をまとめました", category: "建設業の集客", excerpt: "工務店や建築企業が、紹介だけに頼らず問い合わせを増やすための集客方法をまとめました。", body: migrating, publishedAt: "2023-10-12T00:00:00.000Z" },
  { id: "construction_industry_website_necessity_effect", title: "建設業のホームページの必要性や良いホームページの効果とは？", category: "建設業の集客", excerpt: "建設会社にホームページが必要な理由と、良いホームページがもたらす効果を解説します。", body: migrating, publishedAt: "2023-09-14T00:00:00.000Z" },
  { id: "contact_point_9", title: "ホームページからのお問い合わせを増やす9つの施策を徹底紹介", category: "Web集客", excerpt: "フォームの見直しから導線の設計まで、すぐに取り組める施策を紹介します。", body: migrating, publishedAt: "2023-08-08T00:00:00.000Z" },
  { id: "choosing-production-company", title: "【失敗しないために】Web制作会社を選ぶべきポイントを徹底解説", category: "Web制作", excerpt: "ホームページ発注で失敗しないために、制作会社を比べるときの確認ポイントをまとめました。", body: migrating, publishedAt: "2023-06-20T00:00:00.000Z" },
  { id: "corporate-website-and-points-for-effective-creation", title: "コーポレートサイトの役割と効果的な作成のポイント", category: "Web制作", excerpt: "コーポレートサイトが担う役割と、成果につながる作り方のポイントを解説します。", body: migrating, publishedAt: "2023-06-02T00:00:00.000Z" },
  { id: "site_rinyual_point_strategy", title: "効果的なサイトリニューアルのための戦略と手順", category: "Web制作", excerpt: "リニューアルで成果を出すための戦略と、進め方の手順をまとめました。", body: migrating, publishedAt: "2023-05-24T00:00:00.000Z" },
  { id: "corpolate_picture", title: "コーポレートサイトの写真は何を用意したらいい？", category: "デザイン", excerpt: "コーポレートサイトに必要な写真と、素材サイトや撮影のコツを紹介します。", body: migrating, publishedAt: "2023-05-12T00:00:00.000Z" },
  { id: "simple_cssonly_button", title: "CSSだけで作れるシンプルなhoverボタンアニメーション9選", category: "Web制作", excerpt: "コピペで使える、CSSだけのボタンアニメーションを紹介します。", body: migrating, publishedAt: "2023-04-18T00:00:00.000Z" },
  { id: "2column_text_image", title: "2カラムのテキストと画像の横並びレイアウト", category: "Web制作", excerpt: "テキストと画像を横に並べる、よく使うレイアウトの作り方です。", body: migrating, publishedAt: "2022-12-20T00:00:00.000Z" },
];
