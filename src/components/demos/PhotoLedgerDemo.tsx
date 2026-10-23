"use client";

import { useState } from "react";
import { PhotoThumb } from "./DailyReportDemo";
import { AppFrame, Chip, useToast } from "./shared";

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

  return (
    <AppFrame title="写真台帳　青葉 戸建てリフォーム" nav={["写真台帳", "業務の一覧", "現場", "日報", "資材"]}>
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="工程で絞り込む">
            <Chip active={phase === "all"} onClick={() => setPhase("all")}>
              すべて
            </Chip>
            {phases.map((p) => (
              <Chip key={p} active={phase === p} onClick={() => setPhase(p)}>
                {p}
              </Chip>
            ))}
          </div>
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => toast.show(`${selected.length}枚で台帳を作成しました（デモ）`)}
            className="min-h-11 rounded-md bg-brand-deep px-5 text-sm font-bold text-paper hover:bg-brand-dark disabled:bg-ink-mute"
          >
            選んだ{selected.length}枚で台帳を作る
          </button>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => {
            const on = selected.includes(p.id);
            return (
              <li key={p.id} className={`overflow-hidden rounded-lg border-2 bg-paper ${on ? "border-brand-deep" : "border-transparent"}`}>
                <button type="button" onClick={() => setOpen(p.id)} className="relative block aspect-[4/3] w-full" aria-label={`${p.phase} ${p.place} の写真を大きく見る`}>
                  <PhotoThumb seed={p.seed} />
                  <span className="absolute bottom-1.5 left-1.5 rounded-sm bg-[#2e5a3e] px-1.5 py-0.5 text-left text-[10px] leading-tight text-paper">
                    {p.phase}
                    <br />
                    {p.place}
                  </span>
                </button>
                <label className="flex min-h-10 cursor-pointer items-center gap-2 px-2.5 text-xs">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => setSelected((s) => (on ? s.filter((x) => x !== p.id) : [...s, p.id]))}
                    className="h-4 w-4 accent-brand-deep"
                  />
                  <span className="font-bold">台帳に入れる</span>
                  <span className="ml-auto tabular-nums text-ink-mute">{p.date}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {current && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-ink/70 p-6" onClick={() => setOpen(null)}>
          <div className="w-full max-w-lg overflow-hidden rounded-lg bg-paper" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3]">
              <PhotoThumb seed={current.seed} />
              <dl className="absolute bottom-3 left-3 grid grid-cols-[auto_1fr] gap-x-3 rounded-sm bg-[#2e5a3e] px-3 py-2 text-xs text-paper">
                <dt>工事名</dt>
                <dd>青葉 戸建てリフォーム</dd>
                <dt>工種</dt>
                <dd>{current.phase}</dd>
                <dt>撮影</dt>
                <dd>{current.place}　{current.date}</dd>
              </dl>
            </div>
            <div className="flex justify-end p-3">
              <button type="button" onClick={() => setOpen(null)} className="min-h-11 rounded-md border-2 border-ink px-5 text-sm font-bold" autoFocus>
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
