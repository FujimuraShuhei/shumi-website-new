"use client";

import { useId, useState, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/icons";
import { Segmented, useToast } from "./shared";

/** デモ用の仮の単価（万円 / ㎡）。実在の相場ではありません */
const kinds = [
  { id: "kitchen", label: "キッチン", icon: "layout" as IconName, base: 55, per: 2.4, unit: "㎡", min: 4, max: 20, def: 8 },
  { id: "bath", label: "浴室", icon: "sync" as IconName, base: 70, per: 3.0, unit: "㎡", min: 2, max: 8, def: 4 },
  { id: "wall", label: "外壁塗装", icon: "brand" as IconName, base: 30, per: 0.45, unit: "㎡", min: 60, max: 300, def: 120 },
  { id: "roof", label: "屋根", icon: "up" as IconName, base: 35, per: 0.8, unit: "㎡", min: 40, max: 200, def: 80 },
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
  const material = Math.round(mid * 0.45);
  const labor = Math.round(mid * 0.4);
  const other = Math.max(0, Math.round(mid) - material - labor);
  const pct = ((size - kind.min) / (kind.max - kind.min)) * 100;

  const Step = ({ n, children }: { n: number; children: ReactNode }) => (
    <span className="flex items-center gap-2.5 text-[14px] font-bold">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0a7a83] text-[12px] text-white">{n}</span>
      {children}
    </span>
  );

  return (
    <div className="relative min-h-[600px] overflow-hidden rounded-2xl bg-white tracking-normal text-slate-900 ring-1 ring-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0a7a83] text-[12px] font-bold text-white">青</span>
          <p className="text-[14px] font-bold">青葉工務店</p>
        </div>
        <p className="text-[12px] text-slate-500">リフォームの概算シミュレーター</p>
      </div>
      <div className="grid md:grid-cols-[1.15fr_1fr]">
        <div className="space-y-8 p-6 md:p-8">
          <div>
            <p className="text-[22px] font-bold leading-snug">3つ選ぶだけで、費用の目安がわかる</p>
            <p className="mt-1 text-[13px] text-slate-500">入力した内容は送信されません。</p>
          </div>

          <fieldset>
            <legend>
              <Step n={1}>工事の場所</Step>
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {kinds.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  aria-pressed={kindId === k.id}
                  onClick={() => {
                    setKindId(k.id);
                    setSize(k.def);
                  }}
                  className={`flex h-14 items-center gap-3 rounded-xl px-4 text-left text-[14px] font-semibold transition-[background-color,box-shadow] ${
                    kindId === k.id ? "bg-[#0a7a83]/[0.07] text-[#075c63] ring-2 ring-[#0a7a83]" : "bg-white ring-1 ring-slate-200 hover:ring-slate-300"
                  }`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${kindId === k.id ? "bg-[#0a7a83] text-white" : "bg-slate-100 text-slate-500"}`}>
                    <Icon name={k.icon} className="h-[18px] w-[18px]" />
                  </span>
                  {k.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <div className="flex items-end justify-between">
              <label htmlFor={sliderId}>
                <Step n={2}>広さ</Step>
              </label>
              <output htmlFor={sliderId} className="text-[26px] font-bold leading-none tabular-nums">
                {size}
                <span className="ml-1 text-[13px] font-semibold text-slate-500">{kind.unit}</span>
              </output>
            </div>
            <input
              id={sliderId}
              type="range"
              min={kind.min}
              max={kind.max}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-[#0a7a83]"
              style={{ background: `linear-gradient(90deg,#0a7a83 ${pct}%,#e2e8f0 ${pct}%)` }}
            />
            <div className="mt-2 flex justify-between text-[11px] text-slate-400 tabular-nums">
              <span>
                {kind.min}
                {kind.unit}
              </span>
              <span>
                {kind.max}
                {kind.unit}
              </span>
            </div>
          </div>

          <div>
            <Step n={3}>仕上がり</Step>
            <div className="mt-3">
              <Segmented label="仕上がり" value={grade} onChange={setGrade} options={grades.map((g) => ({ value: g.id, label: g.label }))} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-[linear-gradient(160deg,#0b6f78,#0a7a83_45%,#0b6a8f)] p-6 text-white md:p-8">
          <div aria-live="polite">
            <p className="text-[12px] font-semibold text-white/75">
              {kind.label}・{size}
              {kind.unit}・{grade === "std" ? "標準" : "こだわり"}の目安
            </p>
            <p className="mt-3 text-[44px] font-bold leading-none tabular-nums md:text-[52px]">
              {low}〜{high}
              <span className="ml-2 text-[18px] font-semibold">万円</span>
            </p>

            <div className="mt-8 rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
              <p className="text-[12px] font-semibold text-white/80">内訳の目安</p>
              <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
                <span className="bg-white transition-[width] duration-500" style={{ width: `${(material / mid) * 100}%` }} />
                <span className="bg-[#7fe0e0] transition-[width] duration-500" style={{ width: `${(labor / mid) * 100}%` }} />
                <span className="bg-white/40 transition-[width] duration-500" style={{ width: `${(other / mid) * 100}%` }} />
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-[12px]">
                {[
                  ["材料", material, "bg-white"],
                  ["工事", labor, "bg-[#7fe0e0]"],
                  ["諸経費", other, "bg-white/40"],
                ].map(([k, v, c]) => (
                  <div key={k as string}>
                    <dt className="flex items-center gap-1.5 text-white/75">
                      <span className={`h-2 w-2 rounded-full ${c}`} />
                      {k}
                    </dt>
                    <dd className="mt-0.5 font-bold tabular-nums">約{v}万円</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-white/65">デモ用の仮の数値です。実際の費用は現地の状況によって変わります。</p>
          </div>
          <button
            type="button"
            onClick={() => toast.show("相談フォームを開きます（デモ）")}
            className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-white text-[15px] font-bold text-[#075c63] transition-colors hover:bg-slate-100"
          >
            この内容で相談する
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>
      {toast.node}
    </div>
  );
}
