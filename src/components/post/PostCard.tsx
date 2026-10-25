import Image from "next/image";
import Link from "next/link";
import { formatDot, type Post } from "@/lib/content";

/** 記事のカード（一覧・関連記事） */
export function PostCard({ post: p }: { post: Post }) {
  return (
    <Link href={`/${p.id}/`} className="group block">
      <div className="relative aspect-[1200/630] overflow-hidden rounded-2xl bg-mint">
        {p.eyecatch ? (
          <Image src={p.eyecatch.url} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          // アイキャッチが無い記事は、タイトルを図案にして代わりに表示する
          <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between bg-grad-mint p-6">
            <span className="label-en inline-flex h-7 w-fit items-center rounded-full bg-paper px-3 text-[11px] text-brand-deep">{p.category}</span>
            <span className="line-clamp-3 text-[15px] font-black leading-[1.7] tracking-[0.03em] text-brand-dark">{p.title}</span>
            <span className="h-1 w-10 rounded-full bg-grad-brand" />
          </div>
        )}
      </div>
      <div className="mt-5 flex items-center gap-4 text-xs">
        <time dateTime={p.publishedAt} className="en text-ink-mute">
          {formatDot(p.publishedAt)}
        </time>
        <span className="font-bold text-brand-deep">{p.category}</span>
      </div>
      <h3 className="mt-3 text-base font-bold leading-[1.8] tracking-[0.04em] transition-colors group-hover:text-brand-deep">{p.title}</h3>
    </Link>
  );
}
