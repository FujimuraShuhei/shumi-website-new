import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { imageSize } from "image-size";
import { cache } from "react";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { postCategories, type ImageRef, type Post, type Work } from "./content";

export * from "./content";

/**
 * 記事と制作実績は content/ フォルダの MDX ファイルから読み込む（ビルド時に静的ページになる）。
 * - content/blog/{スラッグ}.mdx   → /{スラッグ}/ のブログ記事
 * - content/works/{スラッグ}.mdx  → /{スラッグ}/ の制作実績
 * ファイル名がそのままURLになる。先頭が _ のファイル（テンプレートなど）は読み込まない。
 * 書き方の決まりに合わないファイルがあると、ビルドがエラーで止まる（公開事故を防ぐため）。
 */

const ROOT = path.join(process.cwd(), "content");
const PUBLIC = path.join(process.cwd(), "public");

/** 固定ページのURLと重ならないように */
const RESERVED = new Set([
  "website", "construction_industry_website", "app", "plan", "company", "design_all", "works", "blog",
  "document", "contact", "privacy-policy", "regalpage", "api",
]);

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日付は 2026-10-25 の形式で書いてください");

const postSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(20, "excerpt（概要）は20文字以上で書いてください").max(160, "excerpt（概要）は160文字以内にしてください"),
  category: z.enum(postCategories),
  publishedAt: date,
  updatedAt: date.optional(),
  eyecatch: z.string().startsWith("/").optional(),
  eyecatchAlt: z.string().optional(),
  draft: z.boolean().optional(),
});

const workSchema = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  industry: z.string().min(1),
  category: z.array(z.enum(["web", "app", "sales", "design"])).min(1),
  summary: z.string().min(1),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  thumbnail: z.string().startsWith("/").optional(),
  gallery: z.array(z.string().startsWith("/")).optional(),
  url: z.url().optional(),
  publishedAt: date,
  draft: z.boolean().optional(),
});

type Raw = { slug: string; file: string; data: unknown; source: string };

async function readDir(dir: "blog" | "works"): Promise<Raw[]> {
  const base = path.join(ROOT, dir);
  let names: string[] = [];
  try {
    names = await fs.readdir(base);
  } catch {
    return [];
  }
  const files = names.filter((n) => n.endsWith(".mdx") && !n.startsWith("_"));
  return Promise.all(
    files.map(async (name) => {
      const file = `content/${dir}/${name}`;
      const slug = name.replace(/\.mdx$/, "");
      if (!/^[a-z0-9][a-z0-9_-]*$/.test(slug)) throw new Error(`${file}: ファイル名（URL）は半角の英小文字・数字・-・_ だけにしてください`);
      if (RESERVED.has(slug)) throw new Error(`${file}: 「${slug}」は固定ページのURLと重なるため使えません`);
      const text = await fs.readFile(path.join(base, name), "utf8");
      const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      if (!m) throw new Error(`${file}: 先頭に --- で囲んだ設定（フロントマター）がありません`);
      return { slug, file, data: parseYaml(m[1]), source: m[2] };
    }),
  );
}

async function image(file: string, url: string, alt?: string): Promise<ImageRef> {
  const abs = path.join(PUBLIC, decodeURI(url));
  let buf: Buffer;
  try {
    buf = await fs.readFile(abs);
  } catch {
    throw new Error(`${file}: 画像 ${url} が public${url} にありません`);
  }
  const { width, height } = imageSize(buf);
  if (!width || !height) throw new Error(`${file}: 画像 ${url} の大きさを読み取れません`);
  return { url, width, height, alt };
}

function check<T>(schema: z.ZodType<T>, raw: Raw): T {
  const r = schema.safeParse(raw.data);
  if (!r.success) {
    const msg = r.error.issues.map((i) => `  - ${i.path.join(".") || "(全体)"}: ${i.message}`).join("\n");
    throw new Error(`${raw.file} のフロントマターに誤りがあります\n${msg}`);
  }
  return r.data;
}

/** 下書き（draft: true）は開発中だけ表示する */
const showDrafts = process.env.NODE_ENV !== "production";

function readingMinutes(source: string) {
  const text = source.replace(/<[^>]+>/g, "").replace(/[#>*`_\-[\]()!|]/g, "");
  return Math.max(1, Math.round(text.replace(/\s/g, "").length / 500));
}

const byDateDesc = <T extends { publishedAt: string }>(a: T, b: T) => b.publishedAt.localeCompare(a.publishedAt);

export const allPosts = cache(async (): Promise<Post[]> => {
  const raws = await readDir("blog");
  const posts = await Promise.all(
    raws.map(async (raw): Promise<Post | null> => {
      const d = check(postSchema, raw);
      if (d.draft && !showDrafts) return null;
      return {
        id: raw.slug,
        title: d.title,
        category: d.category,
        excerpt: d.excerpt,
        eyecatch: d.eyecatch ? await image(raw.file, d.eyecatch, d.eyecatchAlt) : undefined,
        publishedAt: d.publishedAt,
        updatedAt: d.updatedAt,
        source: raw.source,
        readingMinutes: readingMinutes(raw.source),
      };
    }),
  );
  return posts.filter((p): p is Post => p !== null).sort(byDateDesc);
});

export const allWorks = cache(async (): Promise<Work[]> => {
  const raws = await readDir("works");
  const works = await Promise.all(
    raws.map(async (raw): Promise<Work | null> => {
      const d = check(workSchema, raw);
      if (d.draft && !showDrafts) return null;
      return {
        id: raw.slug,
        title: d.title,
        client: d.client,
        industry: d.industry,
        category: d.category,
        summary: d.summary,
        challenge: d.challenge,
        solution: d.solution,
        result: d.result,
        thumbnail: d.thumbnail ? await image(raw.file, d.thumbnail) : undefined,
        gallery: d.gallery ? await Promise.all(d.gallery.map((g) => image(raw.file, g))) : undefined,
        url: d.url,
        publishedAt: d.publishedAt,
        source: raw.source,
      };
    }),
  );
  const list = works.filter((w): w is Work => w !== null).sort(byDateDesc);
  const postIds = new Set((await allPosts()).map((p) => p.id));
  const dup = list.find((w) => postIds.has(w.id));
  if (dup) throw new Error(`「${dup.id}」が content/blog と content/works の両方にあります（URLが重なります）`);
  return list;
});

export async function getWorks({ limit }: { limit?: number } = {}) {
  return (await allWorks()).slice(0, limit);
}
export async function getWork(id: string) {
  return (await allWorks()).find((w) => w.id === id) ?? null;
}
export async function getPosts({ limit, category }: { limit?: number; category?: string } = {}) {
  return (await allPosts()).filter((p) => !category || p.category === category).slice(0, limit);
}
export async function getPost(id: string) {
  return (await allPosts()).find((p) => p.id === id) ?? null;
}
