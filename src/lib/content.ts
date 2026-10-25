/* ------------------------------------------------------------------
   記事と制作実績の型（中身は content/ フォルダの MDX ファイル）
   書き方は CLAUDE.md の「記事・制作実績の書き方」を参照
------------------------------------------------------------------ */

/** 画像。url は public/ からのパス（例：/blog/記事のスラッグ/cover.webp） */
export type ImageRef = { url: string; width: number; height: number; alt?: string };

export type WorkCategory = "web" | "app" | "sales" | "design";

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Work = {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: WorkCategory[];
  summary: string;
  challenge?: string;
  solution?: string;
  result?: string;
  thumbnail?: ImageRef;
  /** 詳細ページに並べる画像（任意・複数） */
  gallery?: ImageRef[];
  url?: string;
  publishedAt: string;
  /** MDX の本文（任意） */
  source: string;
};

export type Post = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  eyecatch?: ImageRef;
  publishedAt: string;
  updatedAt?: string;
  /** MDX の本文 */
  source: string;
  /** 本文のおおよその読了時間（分） */
  readingMinutes: number;
};

export const workCategoryLabel: Record<WorkCategory, string> = {
  web: "ホームページ制作",
  app: "業務アプリ",
  sales: "営業ツール",
  design: "デザイン制作",
};

/** ブログのカテゴリ（増やすときはここに追加） */
export const postCategories = ["建設業の集客", "Web集客", "Web制作", "デザイン", "ブランディング", "業務効率化", "採用"] as const;

export function formatDate(iso?: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Tokyo" }).format(
    new Date(iso),
  );
}

/** 2023.09.01 形式 */
export function formatDot(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  const t = new Date(d.getTime() + 9 * 3600 * 1000);
  return `${t.getUTCFullYear()}.${p(t.getUTCMonth() + 1)}.${p(t.getUTCDate())}`;
}
