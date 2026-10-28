import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Button, ContactCta } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { formatDot, type Post } from "@/lib/content";
import { getPosts } from "@/lib/entries";
import { renderMdx } from "@/lib/mdx";
import { site } from "@/lib/site";
import { mdxComponents } from "./mdx-components";
import { PostCard } from "./PostCard";

/** ブログ記事のページ（content/blog/{スラッグ}.mdx） */
export async function PostArticle({ post: p }: { post: Post }) {
  const { content, headings } = await renderMdx(p.source, mdxComponents, `content/blog/${p.id}.mdx`);
  const toc = headings.filter((h) => h.level === 2);
  const sameCategory = (await getPosts({ category: p.category })).filter((x) => x.id !== p.id);
  const related = [...sameCategory, ...(await getPosts()).filter((x) => x.id !== p.id && x.category !== p.category)].slice(0, 3);

  // 検索エンジン向けの記事情報（構造化データ）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt ?? p.publishedAt,
    image: p.eyecatch ? `${site.url}${p.eyecatch.url}` : undefined,
    author: { "@type": "Organization", name: site.company.name, url: site.url },
    publisher: { "@type": "Organization", name: site.company.name, url: site.url },
    mainEntityOfPage: `${site.url}/${p.id}/`,
  };

  return (
    <>
      <article className="bg-base">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <header className="hero-in wrap pb-12 pt-10 md:pb-16 md:pt-14 xl:px-24">
          <Breadcrumb crumbs={[{ href: "/blog/", label: "ブログ" }, { label: p.title }]} />
          <div className="mt-14 max-w-[52rem] md:mt-20">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
              <Link href={`/blog/?category=${encodeURIComponent(p.category)}`} className="inline-flex h-8 items-center rounded-full bg-brand-wash px-3 font-bold text-brand-deep hover:bg-brand hover:text-paper">
                {p.category}
              </Link>
              <time dateTime={p.publishedAt} className="en text-ink-mute">
                {formatDot(p.publishedAt)}
              </time>
              {p.updatedAt && p.updatedAt !== p.publishedAt && <span className="en text-ink-mute">更新 {formatDot(p.updatedAt)}</span>}
              <span className="inline-flex items-center gap-1.5 text-ink-mute">
                <Icon name="clock" className="h-4 w-4" />約{p.readingMinutes}分で読めます
              </span>
            </div>
            <h1 className="mt-6 text-[1.625rem] leading-[1.6] tracking-[0.04em] md:text-[2.375rem]">{p.title}</h1>
            <p className="mt-6 text-[15px] leading-[2] text-ink-soft">{p.excerpt}</p>
          </div>
        </header>

        <div className="wrap grid gap-12 pb-16 md:pb-24 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16 xl:px-24">
          <div className="min-w-0">
            {p.eyecatch && (
              <div className="mb-14 overflow-hidden rounded-[24px] bg-mist">
                <Image src={p.eyecatch.url} alt={p.eyecatch.alt ?? ""} width={p.eyecatch.width} height={p.eyecatch.height} priority sizes="(min-width: 1100px) 760px, 100vw" className="h-auto w-full" />
              </div>
            )}
            {toc.length > 2 && (
              <details className="mb-12 rounded-[22px] bg-mist p-6 lg:hidden" open={toc.length <= 6}>
                <summary className="cursor-pointer text-[15px] font-black">目次</summary>
                <TocList items={toc} />
              </details>
            )}
            <div className="prose-shumi !max-w-none">{content}</div>

            {/* 書いた人 */}
            <aside className="mt-20 flex flex-col gap-6 rounded-[28px] bg-mist p-7 sm:flex-row sm:items-center md:p-8">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-grad-brand text-paper">
                <Icon name="pen" className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <p className="text-[12px] font-bold text-ink-mute">この記事を書いた人</p>
                <p className="mt-1 text-lg font-black">{site.company.name}</p>
                <p className="mt-2 text-[14px] leading-[1.9] text-ink-soft">横浜市を拠点に、建設業のホームページ・採用サイト・業務アプリをつくっています。</p>
              </div>
              <Button href="/company/" variant="secondary" className="!h-14 shrink-0 [&>span]:!h-10 [&>span]:!w-10">
                しゅうみについて
              </Button>
            </aside>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {toc.length > 0 && (
                <nav aria-label="目次" className="rounded-[22px] bg-mist p-6">
                  <p className="text-[13px] font-black tracking-[0.08em]">目次</p>
                  <TocList items={toc} />
                </nav>
              )}
              <div className="rounded-[22px] bg-grad-deep p-6 text-paper">
                <p className="text-[15px] font-black leading-snug">ホームページ・業務アプリの相談</p>
                <p className="mt-2 text-[13px] leading-[1.8] text-paper/75">お見積りは無料です。</p>
                <Button href="/contact/" variant="light" className="mt-5 !h-12 w-full !gap-2 !pl-5 text-[13px] [&>span]:!h-9 [&>span]:!w-9">
                  無料で相談する
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line-soft bg-base py-20 md:py-28">
          <div className="wrap">
            <h2 id="related-title" className="text-xl md:text-2xl">
              あわせて読みたい
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.id} data-r="pop">
                  <PostCard post={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <ContactCta />
    </>
  );
}

function TocList({ items }: { items: { id: string; text: string }[] }) {
  return (
    <ol className="mt-4 space-y-1">
      {items.map((h, i) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className="group flex gap-3 rounded-xl px-2 py-2 text-[13.5px] leading-[1.7] hover:bg-card">
            <span className="label-en mt-[0.15em] text-[11px] text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-bold group-hover:text-brand-deep">{h.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
