/* ------------------------------------------------------------------
   microCMS のスキーマ（管理画面で同じフィールドIDで作成してください）
   README.md の「microCMS の設定」に一覧があります。
------------------------------------------------------------------ */
export type CmsImage = { url: string; width?: number; height?: number };

export type WorkCategory = "web" | "app" | "sales" | "design";

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
  thumbnail?: CmsImage;
  url?: string;
  body?: string;
  publishedAt?: string;
};

export type Column = {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  eyecatch?: CmsImage;
  body: string;
  publishedAt?: string;
  revisedAt?: string;
};

export const workCategoryLabel: Record<WorkCategory, string> = {
  web: "ホームページ制作",
  app: "業務アプリ",
  sales: "営業ツール",
  design: "デザイン制作",
};

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
