"use client";

import { useState } from "react";
import { WorksGrid } from "@/components/home/Sections";
import { workCategoryLabel, type Work, type WorkCategory } from "@/lib/content";

export function WorksFilter({ works }: { works: Work[] }) {
  const [cat, setCat] = useState<WorkCategory | "all">("all");
  const list = cat === "all" ? works : works.filter((w) => w.category.includes(cat));
  const options = (["all", "web", "app", "sales", "design"] as const).filter(
    (o) => o === "all" || works.some((w) => w.category.includes(o)),
  );

  return (
    <>
      <div role="group" aria-label="種類で絞り込む" className="mb-14 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={cat === o}
            onClick={() => setCat(o)}
            className="h-11 rounded-full border border-line px-6 text-sm font-bold text-ink-soft transition-colors hover:border-ink aria-pressed:border-brand-deep aria-pressed:bg-grad-brand aria-pressed:text-paper"
          >
            {o === "all" ? "すべて" : workCategoryLabel[o]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length}件の実績を表示しています
      </p>
      <WorksGrid works={list} />
    </>
  );
}
