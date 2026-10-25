"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/lib/content";
import { PostCard } from "./PostCard";

/** ブログ一覧（カテゴリで絞り込み。/blog/?category=〇〇 で開くとそのカテゴリから表示） */
export function BlogList({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [cat, setCat] = useState("all");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("category");
    if (q && categories.includes(q)) setCat(q);
  }, [categories]);
  const select = (c: string) => {
    setCat(c);
    const url = c === "all" ? "/blog/" : `/blog/?category=${encodeURIComponent(c)}`;
    window.history.replaceState(null, "", url);
  };
  const list = cat === "all" ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <div role="group" aria-label="カテゴリで絞り込む" className="mb-14 flex flex-wrap gap-2">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => select(c)}
            className="h-11 rounded-full border border-line px-6 text-sm font-bold text-ink-soft transition-colors hover:border-ink aria-pressed:border-brand-deep aria-pressed:bg-grad-brand aria-pressed:text-paper"
          >
            {c === "all" ? "すべて" : c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length}件の記事を表示しています
      </p>
      <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.id}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
