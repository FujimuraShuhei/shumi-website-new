"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icons";
import { PhotoThumb } from "./DailyReportDemo";
import { AppFrame, Segmented, ui, useToast } from "./shared";

const phases = ["着工前", "基礎", "躯体", "仕上げ"] as const;
type Phase = (typeof phases)[number];

const photos = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  phase: phases[i % 4] as Phase,
  place: ["北面", "南面", "1階 LDK", "2階 洋室", "玄関"][i % 5],
  date: `10/${String(6 + i).padStart(2, "0")}`,
  seed: i,
}));

export function PhotoLedgerDemo() {
  const [phase, setPhase] = useState<Phase | "all">("all");
  const [selected, setSelected] = useState<number[]>([0, 5]);
  const [open, setOpen] = useState<number | null>(null);
  const toast = useToast();
  const list = photos.filter((p) => phase === "all" || p.phase === phase);
  const current = open !== null ? photos.find((p) => p.id === open) : null;
  const toggle = (id: number) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <AppFrame
      title="写真台帳"
      subtitle="青葉 戸建てリフォーム・12枚"
      current={3}
      actions={
        <button type="button" disabled={selected.length === 0} onClick={() => toast.show(`${selected.length}枚で台帳を作成しました（デモ）`)} className={ui.btn}>
          <Icon name="doc" className="h-4 w-4" />
          台帳を作る
          <span className="rounded-full bg-white/20 px-1.5 text-[11px] tabular-nums">{selected.length}</span>
        </button>
      }
    >
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented
            label="工程で絞り込む"
            value={phase}
            onChange={setPhase}
            options={[{ value: "all" as const, label: "すべて", count: photos.length }, ...phases.map((p) => ({ value: p, label: p, count: photos.filter((x) => x.phase === p).length }))]}
          />
          <p className="text-[12px] text-slate-500">
            写真を押すと拡大、<span className="font-semibold text-slate-700">左上の丸</span>で台帳に入れます
          </p>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => {
            const on = selected.includes(p.id);
            return (
              <li
                key={p.id}
                className={`group relative overflow-hidden rounded-xl bg-white transition-shadow ${on ? "ring-2 ring-[#0a7a83] shadow-[0_8px_20px_-12px_rgba(10,122,131,0.6)]" : "ring-1 ring-slate-200 hover:ring-slate-300"}`}
              >
                <button type="button" onClick={() => setOpen(p.id)} className="relative block aspect-[4/3] w-full overflow-hidden" aria-label={`${p.phase} ${p.place} の写真を大きく見る`}>
                  <span className="block h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                    <PhotoThumb seed={p.seed} />
                  </span>
                  <span className="absolute bottom-2 left-2 rounded-[3px] bg-[#2e5a3e] px-1.5 py-0.5 text-left text-[10px] leading-tight text-white/95 ring-1 ring-white/30">
                    {p.phase}
                    <br />
                    {p.place}
                  </span>
                </button>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  aria-label={`${p.phase} ${p.place} を台帳に入れる`}
                  onClick={() => toggle(p.id)}
                  className={`absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-full transition-colors ${
                    on ? "bg-[#0a7a83] text-white" : "bg-white/85 text-transparent ring-1 ring-slate-300 hover:text-slate-400"
                  }`}
                >
                  <Icon name="check" className="h-4 w-4" strokeWidth={2.6} />
                </button>
                <div className="flex items-center justify-between px-3 py-2.5 text-[12px]">
                  <span className="font-semibold">{p.place}</span>
                  <span className="tabular-nums text-slate-500">{p.date}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {current && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-slate-900/70 p-6 backdrop-blur-[2px]" onClick={() => setOpen(null)}>
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="写真の拡大">
            <div className="relative aspect-[4/3]">
              <PhotoThumb seed={current.seed} />
              <dl className="absolute bottom-3 left-3 grid grid-cols-[auto_1fr] gap-x-3 rounded-[3px] bg-[#2e5a3e] px-3 py-2 text-[11px] text-white ring-1 ring-white/30">
                <dt className="text-white/70">工事名</dt>
                <dd>青葉 戸建てリフォーム</dd>
                <dt className="text-white/70">工種</dt>
                <dd>{current.phase}</dd>
                <dt className="text-white/70">撮影</dt>
                <dd>
                  {current.place}　{current.date}
                </dd>
              </dl>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <button type="button" onClick={() => toggle(current.id)} className={selected.includes(current.id) ? ui.btnGhost : ui.btn}>
                {selected.includes(current.id) ? "台帳から外す" : "台帳に入れる"}
              </button>
              <button type="button" onClick={() => setOpen(null)} className={ui.btnGhost} autoFocus>
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
      {toast.node}
    </AppFrame>
  );
}
