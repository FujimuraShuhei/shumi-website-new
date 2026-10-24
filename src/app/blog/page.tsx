import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta, PageHero } from "@/components/ui";
import { formatDot } from "@/lib/content";
import { getColumns } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "ブログ",
  description: "ホームページ制作・Web集客・建設業の集客・業務改善に役立つノウハウをお届けします。",
};

export default async function BlogPage() {
  const posts = await getColumns();
  return (
    <>
      <PageHero crumbs={[{ label: "ブログ" }]} en="Blog" title="ブログ" lead="ホームページと業務改善に役立つノウハウをお届けします。" />
      <section aria-label="記事の一覧" className="bg-paper py-24 md:py-32">
        <ul className="wrap grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.id}>
              <Link href={`/${p.id}/`} className="group block">
                <div className="relative aspect-[1200/630] overflow-hidden rounded-2xl bg-mint">
                  {p.eyecatch ? (
                    <Image src={`${p.eyecatch.url}?w=900&fm=webp`} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  ) : (
                    <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#eef8f8,#e2f3f4)] p-8">
                      <span className="text-center text-sm font-bold leading-[1.8] tracking-[0.06em] text-brand-dark">{p.title}</span>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex items-center gap-4 text-xs">
                  <time dateTime={p.publishedAt} className="en text-ink-mute">
                    {formatDot(p.publishedAt)}
                  </time>
                  {p.category && <span className="font-bold text-brand-deep">{p.category}</span>}
                </div>
                <h2 className="mt-3 text-base font-bold leading-[1.8] tracking-[0.04em] transition-colors group-hover:text-brand-deep">{p.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ContactCta />
    </>
  );
}
