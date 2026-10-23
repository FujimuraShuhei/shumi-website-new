"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { DailyReportDemo } from "./DailyReportDemo";
import { EstimateDemo } from "./EstimateDemo";
import { MapSalesDemo } from "./MapSalesDemo";
import { PhotoLedgerDemo } from "./PhotoLedgerDemo";
import { demos, type DemoMeta } from "./registry";
import { TasksDemo } from "./TasksDemo";

export const demoComponents: Record<string, ComponentType> = {
  tasks: TasksDemo,
  "map-sales": MapSalesDemo,
  "daily-report": DailyReportDemo,
  estimate: EstimateDemo,
  "photo-ledger": PhotoLedgerDemo,
};

/** 本物の画面をそのまま縮小して見せる（操作はできない状態） */
export function ScaledPreview({ demo, className = "relative aspect-[16/10] overflow-hidden bg-mint" }: { demo: DemoMeta; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ scale: 0.3, width: demo.baseWidth });
  const Demo = demoComponents[demo.id];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return; // 非表示のときは計算しない
      // スマホ画面は高さに合わせ、PC画面は幅に合わせて縮小する
      const scale = demo.mobile ? height / 760 : width / demo.baseWidth;
      setSize({ scale, width: width / scale });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [demo]);

  return (
    <div ref={box} className={className} aria-hidden="true">
      <div
        inert
        className="pointer-events-none absolute left-0 top-0 origin-top-left"
        style={{ width: size.width, transform: `scale(${size.scale})`, padding: demo.mobile ? "40px 0" : "24px" }}
      >
        <Demo />
      </div>
    </div>
  );
}

export function DemoGallery({ ids, layout = "grid" }: { ids?: string[]; layout?: "grid" | "feature" }) {
  const list = ids ? demos.filter((d) => ids.includes(d.id)) : demos;
  const [active, setActive] = useState<DemoMeta | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  const ActiveDemo = active ? demoComponents[active.id] : null;

  return (
    <>
      <ul className={layout === "feature" ? "grid gap-8 md:grid-cols-2" : "grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3"}>
        {list.map((d) => (
          <li key={d.id} className="group">
            <div className="relative overflow-hidden rounded-2xl border border-line-soft bg-paper transition-[box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-30px_rgba(13,31,34,0.35)]">
              <ScaledPreview demo={d} />
              <div className="flex items-center justify-between gap-4 border-t border-line-soft bg-paper px-6 py-5">
                <div>
                  <p className="text-xs font-medium tracking-[0.08em] text-brand-deep">{d.category}</p>
                  <h3 className="mt-1 text-base font-semibold">{d.title}</h3>
                </div>
                <span aria-hidden="true" className="shrink-0 rounded-full border border-line px-4 py-2 text-[13px] font-medium text-brand-deep transition-colors group-hover:border-brand-deep">
                  触ってみる
                </span>
              </div>
              {/* カード全体を押せるようにする透明なボタン */}
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setActive(d);
                }}
                className="absolute inset-0 h-full w-full rounded-2xl"
                aria-haspopup="dialog"
                aria-label={`「${d.title}」のデモを開いて触ってみる`}
              />
            </div>
            <p className="mt-4 text-sm leading-[2] text-ink-soft">{d.summary}</p>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="demo-dialog-title"
        onClose={() => {
          setActive(null);
          opener.current?.focus();
        }}
        onClick={(e) => e.target === dialog.current && setActive(null)}
        className="m-auto max-h-[94dvh] w-[min(1180px,96vw)] overflow-hidden rounded-2xl bg-paper p-0 text-ink backdrop:bg-night/80 backdrop:backdrop-blur-sm"
      >
        {active && ActiveDemo && (
          <div className="flex max-h-[94dvh] flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-7">
              <div>
                <p className="text-xs font-medium text-brand-deep">{active.category}のデモ</p>
                <h2 id="demo-dialog-title" className="text-xl">
                  {active.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="min-h-11 shrink-0 rounded-full border border-line px-5 text-sm font-medium hover:border-ink"
              >
                閉じる
              </button>
            </div>
            <div className="grid min-h-0 flex-1 gap-6 overflow-auto bg-mist p-4 md:p-6 lg:grid-cols-[1fr_240px]">
              <div className="min-w-0">
                <ActiveDemo />
              </div>
              <aside className="text-sm">
                <p className="leading-relaxed">{active.summary}</p>
                <p className="mt-5 font-semibold">この画面の工夫</p>
                <ul className="mt-2 space-y-2">
                  {active.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-md bg-paper p-3 text-xs leading-relaxed text-ink-soft">
                  見た目と操作感を確かめるためのデモです。入力した内容は保存されず、どこにも送信されません。
                </p>
              </aside>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
