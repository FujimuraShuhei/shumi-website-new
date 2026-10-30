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
export function ScaledPreview({ demo, className = "relative aspect-[16/10] overflow-hidden" }: { demo: DemoMeta; className?: string }) {
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
      const scale = demo.mobile ? height / 800 : width / demo.baseWidth;
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
        style={{ width: size.width, transform: `scale(${size.scale})`, padding: demo.mobile ? "50px 0" : "32px" }}
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
      <ul className={layout === "feature" ? "grid gap-8 md:grid-cols-2" : "grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3"}>
        {list.map((d) => (
          <li key={d.id} className="group">
            <div className="relative rounded-[26px] bg-panel p-2.5 text-paper transition-[box-shadow,translate] duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-30px_rgba(13,31,34,0.55)]">
              <ScaledPreview demo={d} className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[linear-gradient(145deg,#eef3f4,#dde6e9)]" />
              <div className="flex items-center justify-between gap-4 px-3.5 pb-2 pt-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.08em] text-brand-light">{d.category}</p>
                  <h3 className="mt-0.5 truncate text-[16px] font-black">{d.title}</h3>
                </div>
                <span aria-hidden="true" className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-card px-4 text-[13px] font-bold text-ink transition-colors group-hover:bg-paper">
                  触ってみる
                  <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </div>
              {/* カード全体を押せるようにする透明なボタン */}
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setActive(d);
                }}
                className="absolute inset-0 h-full w-full rounded-[26px]"
                aria-haspopup="dialog"
                aria-label={`「${d.title}」のデモを開いて触ってみる`}
              />
            </div>
            <p className="mt-4 px-1 text-[14px] leading-[1.95] text-ink-soft">{d.summary}</p>
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
        className="m-auto max-h-[94dvh] w-[min(1240px,96vw)] overflow-hidden rounded-[22px] bg-white p-0 tracking-normal text-slate-900 shadow-2xl backdrop:bg-night/80 backdrop:backdrop-blur-sm"
      >
        {active && ActiveDemo && (
          <div className="flex max-h-[94dvh] flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3.5 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="rounded-full bg-[#0a7a83]/10 px-2.5 py-1 text-[11px] font-bold text-[#0a7a83]">{active.category}のデモ</span>
                <h2 id="demo-dialog-title" className="truncate text-[17px] font-bold">
                  {active.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="デモを閉じる"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 ring-1 ring-slate-200 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="grid min-h-0 flex-1 gap-5 overflow-auto bg-slate-100 p-4 md:p-6 lg:grid-cols-[1fr_250px]">
              <div className="min-w-0">
                <ActiveDemo />
              </div>
              <aside className="h-fit rounded-2xl bg-white p-5 text-[13px] ring-1 ring-slate-200">
                <p className="leading-[1.9] text-slate-700">{active.summary}</p>
                <p className="mt-5 text-[12px] font-bold text-slate-500">この画面の工夫</p>
                <ul className="mt-2.5 space-y-2.5">
                  {active.points.map((p) => (
                    <li key={p} className="flex gap-2.5 leading-[1.7]">
                      <span aria-hidden="true" className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#0a7a83] text-white">
                        <svg width="9" height="9" viewBox="0 0 24 24">
                          <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl bg-slate-50 p-3 text-[12px] leading-relaxed text-slate-500">
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
