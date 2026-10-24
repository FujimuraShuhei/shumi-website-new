import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { WorkThumb } from "@/components/home/Sections";
import { Breadcrumb, Button, ContactCta } from "@/components/ui";
import { formatDot, workCategoryLabel } from "@/lib/content";
import { getColumn, getColumns, getWork, getWorks } from "@/lib/microcms";

/**
 * 現サイト（WordPress）と同じく、ブログ記事と制作実績はルート直下のURL（/記事のスラッグ/）で表示する。
 * microCMS の「コンテンツID」が URL になります。
 */
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const [works, posts] = await Promise.all([getWorks(), getColumns()]);
  return [...works.map((w) => ({ slug: w.id })), ...posts.map((p) => ({ slug: p.id }))];
}

async function find(slug: string) {
  const work = await getWork(slug);
  if (work) return { type: "work" as const, work };
  const post = await getColumn(slug);
  if (post) return { type: "post" as const, post };
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hit = await find(slug);
  if (!hit) return {};
  if (hit.type === "work") return { title: `${hit.work.client} ${hit.work.title}`, description: hit.work.summary };
  return {
    title: hit.post.title,
    description: hit.post.excerpt,
    openGraph: { type: "article", images: hit.post.eyecatch ? [`${hit.post.eyecatch.url}?w=1200&h=630&fit=crop`] : undefined },
  };
}

export default async function EntryPage({ params }: Props) {
  const { slug } = await params;
  const hit = await find(slug);
  if (!hit) notFound();

  if (hit.type === "work") {
    const w = hit.work;
    const sections = [
      { title: "ご相談の内容", body: w.challenge },
      { title: "行ったこと", body: w.solution },
      { title: "公開後の変化", body: w.result },
    ].filter((s) => s.body);
    return (
      <>
        <article>
          <header className="bg-paper">
            <div className="wrap pb-16 pt-10 md:pb-20 md:pt-14">
              <Breadcrumb crumbs={[{ href: "/works/", label: "HP制作実績" }, { label: w.client }]} />
              <div className="mt-16 flex flex-wrap gap-x-4 gap-y-1 text-sm md:mt-20">
                {w.category.map((c) => (
                  <span key={c} className="font-bold text-brand-deep">
                    {workCategoryLabel[c]}
                  </span>
                ))}
                <span className="text-ink-mute">{w.industry}</span>
              </div>
              <h1 className="mt-4 text-[1.75rem] leading-[1.6] tracking-[0.05em] md:text-[2.5rem]">{w.client}</h1>
              <p className="mt-2 text-lg text-ink-soft">{w.title}</p>
              <p className="mt-8 max-w-2xl text-[15px] leading-[2.1] text-ink-soft md:text-base">{w.summary}</p>
            </div>
          </header>
          <div className="wrap">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-mint">
              <WorkThumb work={w} sizes="(min-width: 1280px) 1152px, 100vw" priority />
            </div>
          </div>
          {sections.length > 0 && (
            <dl className="wrap mt-20 grid gap-12 md:grid-cols-3">
              {sections.map((s) => (
                <div key={s.title} className="border-t border-ink pt-8">
                  <dt className="font-bold tracking-[0.06em]">{s.title}</dt>
                  <dd className="mt-4 whitespace-pre-line text-[15px] leading-[2.1] text-ink-soft">{s.body}</dd>
                </div>
              ))}
            </dl>
          )}
          {w.body && <div className="prose-shumi wrap mt-20 !max-w-[52rem]" dangerouslySetInnerHTML={{ __html: w.body }} />}
          <div className="wrap mt-20 flex flex-col gap-3 pb-28 sm:flex-row md:pb-36">
            {w.url && (
              <a
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 items-center justify-center rounded-full bg-grad-brand px-10 text-[15px] font-bold text-paper hover:brightness-110"
              >
                公開中のサイトを見る（新しいタブ）
              </a>
            )}
            <Button href="/works/" variant="secondary">
              制作実績の一覧へ
            </Button>
          </div>
        </article>
        <ContactCta />
      </>
    );
  }

  const p = hit.post;
  return (
    <>
      <article className="bg-paper">
        <header className="wrap pb-14 pt-10 md:pt-14">
          <Breadcrumb crumbs={[{ href: "/blog/", label: "ブログ" }, { label: p.title }]} />
          <div className="mx-auto mt-16 max-w-[52rem] md:mt-20">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <time dateTime={p.publishedAt} className="en text-ink-mute">
                {formatDot(p.publishedAt)}
              </time>
              {p.revisedAt && p.revisedAt !== p.publishedAt && <span className="en text-ink-mute">更新 {formatDot(p.revisedAt)}</span>}
              {p.category && <span className="font-bold text-brand-deep">{p.category}</span>}
            </div>
            <h1 className="mt-5 text-[1.625rem] leading-[1.7] tracking-[0.06em] md:text-[2.25rem]">{p.title}</h1>
          </div>
        </header>
        {p.eyecatch && (
          <div className="wrap">
            <div className="relative mx-auto aspect-[1200/630] max-w-[52rem] overflow-hidden rounded-[24px]">
              <Image src={`${p.eyecatch.url}?w=1600&fm=webp`} alt="" fill priority sizes="(min-width: 900px) 832px, 100vw" className="object-cover" />
            </div>
          </div>
        )}
        {/* microCMS のリッチエディタの本文（編集者だけが入力する信頼できる内容） */}
        <div className="wrap py-16 md:py-20">
          <div className="prose-shumi mx-auto !max-w-[44rem]" dangerouslySetInnerHTML={{ __html: p.body }} />
          <div className="mx-auto mt-20 max-w-[44rem]">
            <Button href="/blog/" variant="secondary">
              ブログの一覧へ
            </Button>
          </div>
        </div>
      </article>
      <ContactCta />
    </>
  );
}
