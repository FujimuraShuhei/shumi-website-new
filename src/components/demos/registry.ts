export type DemoMeta = {
  id: string;
  title: string;
  category: "業務アプリ" | "営業ツール";
  summary: string;
  points: string[];
  /** 一覧の縮小表示で使う、元の画面の幅 */
  baseWidth: number;
  /** スマホ画面のデモ */
  mobile?: boolean;
};

export const demos: DemoMeta[] = [
  {
    id: "tasks",
    title: "業務の登録と一覧",
    category: "業務アプリ",
    summary: "現場ごとの業務を登録し、担当と期日で管理します。期日が近いものは赤で知らせます。",
    points: ["状態はタップで切り替え", "現場名や担当で検索", "期日が近いものを自動で強調"],
    baseWidth: 1040,
  },
  {
    id: "map-sales",
    title: "地図で回る営業アプリ",
    category: "営業ツール",
    summary: "見込み客を地図に並べ、状況ごとに印を分けて表示。訪問の記録と今日のルートづくりができます。",
    points: ["状況は色と文字の両方で表示", "訪問の記録はワンタップ", "近くの訪問先をまとめてルートに"],
    baseWidth: 1040,
  },
  {
    id: "daily-report",
    title: "スマホで送る日報",
    category: "業務アプリ",
    summary: "天気・作業・人数・写真をタップで入力。手袋をしたままでも押せる大きさのボタンにしています。",
    points: ["文字入力をほぼ使わない", "写真もその場で追加", "送信すると事務所の一覧に反映"],
    baseWidth: 420,
    mobile: true,
  },
  {
    id: "estimate",
    title: "リフォーム概算シミュレーター",
    category: "営業ツール",
    summary: "場所・広さ・仕上がりを選ぶだけで、費用の目安を表示します。商談の場でも、自社サイトでも使えます。",
    points: ["3つの選択だけで完結", "単価は管理画面から変更できる想定", "そのまま相談フォームへ"],
    baseWidth: 960,
  },
  {
    id: "photo-ledger",
    title: "工事写真の台帳づくり",
    category: "業務アプリ",
    summary: "撮った写真を工程で絞り込み、選んだ写真から提出用の台帳を作ります。",
    points: ["工程・場所のタグで整理", "黒板の情報を写真に表示", "選んだ写真で台帳を作成"],
    baseWidth: 1040,
  },
];
