"use client";

import { useId, useState } from "react";
import { useToast } from "./shared";

/** デモ用の仮の単価（万円 / ㎡）。実在の相場ではありません */
const kinds = [
  { id: "kitchen", label: "キッチン", base: 55, per: 2.4, unit: "㎡", min: 4, max: 20, def: 8 },
  { id: "bath", label: "浴室", base: 70, per: 3.0, unit: "㎡", min: 2, max: 8, def: 4 },
  { id: "wall", label: "外壁塗装", base: 30, per: 0.45, unit: "㎡", min: 60, max: 300, def: 120 },
  { id: "roof", label: "屋根", base: 35, per: 0.8, unit: "㎡", min: 40, max: 200, def: 80 },
] as const;

const grades = [
  { id: "std", label: "標準", rate: 1 },
  { id: "high", label: "こだわり", rate: 1.45 },
] as const;

export function EstimateDemo() {
  const [kindId, setKindId] = useState<(typeof kinds)[number]["id"]>("wall");
  const kind = kinds.find((k) => k.id === kindId)!;
  const [size, setSize] = useState<number>(kind.def);
  const [grade, setGrade] = useState<(typeof grades)[number]["id"]>("std");
  const toast = useToast();
  const sliderId = useId();

  const rate = grades.find((g) => g.id === grade)!.rate;
  const mid = (kind.base + kind.per * size) * rate;
  const low = Math.round(mid * 0.88);
  const high = Math.round(mid * 1.15);

  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-lg border border-line bg-white">
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-7 p-6 md:p-8">
          <div>
            <p className="text-sm text-ink-mute">リフォームの概算シミュレーター</p>
            <p className="mt-1 text-2xl font-bold">3つ選ぶだけで、費用の目安が分かります</p>
          </div>

          <fieldset>
            <legend className="font-bold">1. 工事の場所</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {kinds.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  aria-pressed={kindId === k.id}
                  onClick={() => {
                    setKindId(k.id);
                    setSize(k.def);
                  }}
                  className={`min-h-14 rounded-lg border-2 px-4 text-left font-bold ${
                    kindId === k.id ? "border-brand-deep bg-brand-wash text-brand-dark" : "border-line hover:border-ink-mute"
                  }`}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor={sliderId} className="font-bold">
              2. 広さ
            </label>
            <div className="mt-2 flex items-center gap-4">
              <input
                id={sliderId}
                type="range"
                min={kind.min}
                max={kind.max}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="h-11 flex-1 accent-brand-deep"
              />
              <output htmlFor={sliderId} className="en w-24 text-right text-2xl font-bold tabular-nums">
                {size}
                <span className="ml-1 font-sans text-sm">{kind.unit}</span>
              </output>
            </div>
          </div>

          <fieldset>
            <legend className="font-bold">3. 仕上がり</legend>
            <div className="mt-2 inline-flex rounded-lg border-2 border-line p-1">
              {grades.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={grade === g.id}
                  onClick={() => setGrade(g.id)}
                  className={`min-h-11 rounded-md px-6 font-bold ${grade === g.id ? "bg-ink text-paper" : "text-ink-soft"}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col justify-between bg-ink p-6 text-paper md:p-8">
          <div aria-live="polite">
            <p className="text-sm text-paper/70">{kind.label}・{size}{kind.unit}・{grade === "std" ? "標準" : "こだわり"}の目安</p>
            <p className="en mt-3 text-[2.75rem] font-bold leading-none tabular-nums md:text-[3.5rem]">
              {low}〜{high}
              <span className="ml-2 font-sans text-xl">万円</span>
            </p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
              <div className="h-full rounded-full bg-brand-light transition-[width] duration-500" style={{ width: `${Math.min(100, (high / 400) * 100)}%` }} />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-paper/70">
              デモ用の仮の数値です。実際の費用は現地の状況によって変わります。
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.show("相談フォームを開きます（デモ）")}
            className="mt-8 min-h-14 rounded-lg bg-brand-light font-bold text-ink hover:bg-mint"
          >
            この内容で相談する
          </button>
        </div>
      </div>
      {toast.node}
    </div>
  );
}
