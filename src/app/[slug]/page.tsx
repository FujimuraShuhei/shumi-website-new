import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/post/PostArticle";
import { WorkArticle } from "@/components/post/WorkArticle";
import { getPost, getPosts, getWork, getWorks } from "@/lib/entries";

/**
 * 現サイト（WordPress）と同じく、ブログ記事と制作実績はルート直下のURL（/記事のスラッグ/）で表示する。
 * content/blog・content/works の MDX ファイル名がそのままURLになる。
 */
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const [works, posts] = await Promise.all([getWorks(), getPosts()]);
  return [...works.map((w) => ({ slug: w.id })), ...posts.map((p) => ({ slug: p.id }))];
}

async function find(slug: string) {
  const work = await getWork(slug);
  if (work) return { type: "work" as const, work };
  const post = await getPost(slug);
  if (post) return { type: "post" as const, post };
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hit = await find(slug);
  if (!hit) return {};
  if (hit.type === "work") {
    const w = hit.work;
    return {
      title: `${w.client} ${w.title}`,
      description: w.summary,
      alternates: { canonical: `/${w.id}/` },
      openGraph: w.thumbnail ? { images: [w.thumbnail.url] } : undefined,
    };
  }
  const p = hit.post;
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/${p.id}/` },
    openGraph: {
      type: "article",
      publishedTime: p.publishedAt,
      modifiedTime: p.updatedAt ?? p.publishedAt,
      images: p.eyecatch ? [p.eyecatch.url] : undefined,
    },
  };
}

export default async function EntryPage({ params }: Props) {
  const { slug } = await params;
  const hit = await find(slug);
  if (!hit) notFound();
  return hit.type === "work" ? <WorkArticle work={hit.work} /> : <PostArticle post={hit.post} />;
}
