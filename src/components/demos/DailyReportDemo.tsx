"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/icons";
import { Chip, PhoneFrame } from "./shared";

const weathers = [
  {
    id: "sun",
    label: "晴れ",
    icon: (
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
      </g>
    ),
  },
  {
    id: "cloud",
    label: "くもり",
    icon: <path d="M7 18h10a4 4 0 0 0-.6-8 5.5 5.5 0 0 0-10.4 1.7A3.2 3.2 0 0 0 7 18z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  },
  {
    id: "rain",
    label: "雨",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 14h10a4 4 0 0 0-.6-8 5.5 5.5 0 0 0-10.4 1.7A3.2 3.2 0 0 0 7 14z" />
        <path d="M8 17l-1 3M12 17l-1 3M16 17l-1 3" />
      </g>
    ),
  },
];

const works = ["足場", "基礎", "配筋", "型枠", "内装", "塗装", "清掃", "搬入"];
const sites = ["港北 集合住宅新築", "戸塚 外壁改修", "青葉 戸建てリフォーム"];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <p className="px-1 text-[12px] font-semibold text-slate-500">{title}</p>
      <div className="mt-1.5 rounded-2xl bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">{children}</div>
    </section>
  );
}

export function DailyReportDemo() {
  const [weather, setWeather] = useState("sun");
  const [picked, setPicked] = useState<string[]>(["配筋"]);
  const [people, setPeople] = useState(4);
  const [photos, setPhotos] = useState(2);
  const [site, setSite] = useState(sites[0]);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col px-6 pb-8 pt-20">
          <div className="flex flex-1 flex-col items-center text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_12px_30px_-10px_rgba(16,185,129,0.6)]">
              <Icon name="check" className="h-10 w-10" strokeWidth={2.4} />
            </span>
            <p className="mt-6 text-[22px] font-bold" role="status">
              日報を送信しました
            </p>
            <p className="mt-2 text-[13px] text-slate-500">事務所の一覧にすぐ反映されます</p>
            <dl className="mt-8 w-full divide-y divide-slate-100 rounded-2xl bg-white px-4 text-left text-[14px] shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
              {[
                ["現場", site],
                ["天気", weathers.find((w) => w.id === weather)?.label],
                ["作業", picked.join("・") || "—"],
                ["人数", `${people}人`],
                ["写真", `${photos}枚`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <button type="button" onClick={() => setSent(false)} className="h-[52px] w-full rounded-2xl bg-white text-[15px] font-semibold text-[#0a7a83] shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
            もう1件書く
          </button>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <header className="bg-white px-5 pb-3 pt-12">
          <p className="text-[12px] font-semibold text-[#0a7a83]">10月26日（月）</p>
          <p className="text-[26px] font-bold leading-tight">今日の日報</p>
        </header>
        <div className="flex-1 space-y-5 overflow-auto px-4 pb-6 pt-4">
          <Group title="現場">
            <label className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0a7a83]/10 text-[#0a7a83]">
                <Icon name="pin" className="h-5 w-5" />
              </span>
              <span className="sr-only">現場を選ぶ</span>
              <select value={site} onChange={(e) => setSite(e.target.value)} className="h-10 min-w-0 flex-1 appearance-none bg-transparent text-[15px] font-semibold focus:outline-none">
                {sites.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <span aria-hidden="true" className="text-slate-400">
                ⌄
              </span>
            </label>
          </Group>

          <Group title="天気">
            <div role="group" aria-label="天気" className="grid grid-cols-3 gap-2">
              {weathers.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  aria-pressed={weather === w.id}
                  onClick={() => setWeather(w.id)}
                  className={`flex h-[68px] flex-col items-center justify-center gap-1 rounded-xl text-[12px] font-semibold transition-colors ${
                    weather === w.id ? "bg-[#0a7a83] text-white" : "bg-slate-50 text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    {w.icon}
                  </svg>
                  {w.label}
                </button>
              ))}
            </div>
          </Group>

          <Group title="作業内容（複数選べます）">
            <div className="flex flex-wrap gap-2">
              {works.map((w) => (
                <Chip key={w} active={picked.includes(w)} onClick={() => setPicked((p) => (p.includes(w) ? p.filter((x) => x !== w) : [...p, w]))}>
                  {w}
                </Chip>
              ))}
            </div>
          </Group>

          <Group title="作業人数">
            <div className="flex items-center justify-between" role="group" aria-label="作業人数">
              <button type="button" onClick={() => setPeople((n) => Math.max(1, n - 1))} className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-2xl font-semibold text-slate-700" aria-label="1人減らす">
                −
              </button>
              <p className="text-[34px] font-bold tabular-nums" aria-live="polite">
                {people}
                <span className="ml-1 text-[14px] font-semibold text-slate-500">人</span>
              </p>
              <button type="button" onClick={() => setPeople((n) => n + 1)} className="grid h-12 w-12 place-items-center rounded-xl bg-[#0a7a83] text-2xl font-semibold text-white" aria-label="1人増やす">
                ＋
              </button>
            </div>
          </Group>

          <Group title={`写真（${photos}枚）`}>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: photos }).map((_, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg">
                  <PhotoThumb seed={i} />
                </div>
              ))}
              {photos < 8 && (
                <button
                  type="button"
                  onClick={() => setPhotos((n) => n + 1)}
                  className="grid aspect-square place-items-center rounded-lg border-2 border-dashed border-slate-300 text-slate-500"
                  aria-label="写真を追加"
                >
                  <Icon name="camera" className="h-6 w-6" />
                </button>
              )}
            </div>
          </Group>
        </div>
        <div className="border-t border-slate-200 bg-white p-4 pb-6">
          <button type="button" onClick={() => setSent(true)} className="h-[54px] w-full rounded-2xl bg-[#0a7a83] text-[16px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(10,122,131,0.8)] transition-colors hover:bg-[#086a72]">
            日報を送信する
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

/** 現場写真の代わりの図案（実際の写真は使わない） */
export function PhotoThumb({ seed }: { seed: number }) {
  const v = seed % 4;
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sky-${v}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={["#cfdce6", "#e3d7c4", "#cbd6e2", "#d6dccf"][v]} />
          <stop offset="1" stopColor={["#a9b8c5", "#c4ad8c", "#a3b3c4", "#b8c1ae"][v]} />
        </linearGradient>
      </defs>
      <rect width="60" height="60" fill={`url(#sky-${v})`} />
      {v === 0 && (
        <g stroke="#5f6f7d" strokeWidth="1.6">
          {[10, 22, 34, 46].map((p) => (
            <g key={p}>
              <line x1={p} y1="0" x2={p} y2="60" />
              <line x1="0" y1={p} x2="60" y2={p} />
            </g>
          ))}
        </g>
      )}
      {v === 1 && <path d="M0 40 L20 25 L35 35 L60 18 L60 60 L0 60Z" fill="#94805f" />}
      {v === 2 && (
        <g fill="#6f8296">
          <rect x="8" y="10" width="7" height="50" />
          <rect x="26" y="20" width="7" height="40" />
          <rect x="44" y="5" width="7" height="55" />
          <rect x="0" y="28" width="60" height="4" />
        </g>
      )}
      {v === 3 && <rect x="10" y="12" width="40" height="36" rx="2" fill="#eef0ec" stroke="#7d8790" strokeWidth="1.6" />}
    </svg>
  );
}
