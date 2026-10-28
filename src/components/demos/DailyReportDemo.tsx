"use client";

import { useState } from "react";
import { Chip, PhoneFrame } from "./shared";

const weathers = [
  { id: "sun", label: "晴れ", icon: <circle cx="10" cy="10" r="5" fill="#3cc3c4" stroke="#1b232b" strokeWidth="1.5" /> },
  {
    id: "cloud",
    label: "くもり",
    icon: <path d="M5 14h10a3.5 3.5 0 0 0-1-6.9A4.5 4.5 0 0 0 5.3 9 2.6 2.6 0 0 0 5 14z" fill="#d9dee2" stroke="#1b232b" strokeWidth="1.5" />,
  },
  {
    id: "rain",
    label: "雨",
    icon: (
      <g stroke="#1b232b" strokeWidth="1.5">
        <path d="M5 11h10a3.5 3.5 0 0 0-1-6.9A4.5 4.5 0 0 0 5.3 6 2.6 2.6 0 0 0 5 11z" fill="#c9dbf0" />
        <path d="M7 13.5l-1 3M11 13.5l-1 3M15 13.5l-1 3" fill="none" />
      </g>
    ),
  },
];

const works = ["足場", "基礎", "配筋", "型枠", "内装", "塗装", "清掃", "搬入"];
const sites = ["港北 集合住宅新築", "戸塚 外壁改修", "青葉 戸建てリフォーム"];

export function DailyReportDemo() {
  const [weather, setWeather] = useState("sun");
  const [picked, setPicked] = useState<string[]>(["配筋"]);
  const [people, setPeople] = useState(4);
  const [photos, setPhotos] = useState(1);
  const [site, setSite] = useState(sites[0]);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
            <circle cx="36" cy="36" r="34" fill="#3cc3c4" />
            <path d="M22 37l9 9 19-19" fill="none" stroke="#1b232b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-6 text-xl font-bold" role="status">
            日報を送信しました
          </p>
          <dl className="mt-6 w-full space-y-2 rounded-lg bg-white p-4 text-left text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-mute">現場</dt>
              <dd className="font-bold">{site}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-mute">作業</dt>
              <dd className="font-bold">{picked.join("・") || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-mute">人数</dt>
              <dd className="font-bold">{people}人</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-mute">写真</dt>
              <dd className="font-bold">{photos}枚</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-ink-soft">事務所の一覧にすぐ反映されます。</p>
          <button type="button" onClick={() => setSent(false)} className="mt-8 min-h-12 w-full rounded-lg border-2 border-ink font-bold">
            もう1件書く
          </button>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className="bg-ink px-5 pb-4 pt-12 text-paper">
          <p className="text-xs text-paper/70">10月26日（月）</p>
          <p className="text-lg font-bold">今日の日報</p>
        </div>
        <div className="flex-1 space-y-5 overflow-auto px-5 py-5">
          <label className="block">
            <span className="text-sm font-bold">現場</span>
            <select
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="mt-1.5 block min-h-12 w-full rounded-lg border-2 border-line bg-white px-3"
            >
              {sites.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend className="text-sm font-bold">天気</legend>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {weathers.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  aria-pressed={weather === w.id}
                  onClick={() => setWeather(w.id)}
                  className={`flex min-h-14 flex-col items-center justify-center rounded-lg border-2 text-xs font-bold ${
                    weather === w.id ? "border-ink bg-brand-wash" : "border-line bg-white text-ink-soft"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                    {w.icon}
                  </svg>
                  {w.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold">作業内容（複数選べます）</legend>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {works.map((w) => (
                <Chip
                  key={w}
                  active={picked.includes(w)}
                  onClick={() => setPicked((p) => (p.includes(w) ? p.filter((x) => x !== w) : [...p, w]))}
                >
                  {w}
                </Chip>
              ))}
            </div>
          </fieldset>

          <div>
            <p className="text-sm font-bold" id="people-label">
              作業人数
            </p>
            <div className="mt-1.5 flex items-center justify-between rounded-lg border-2 border-line bg-white p-1.5" role="group" aria-labelledby="people-label">
              <button
                type="button"
                onClick={() => setPeople((n) => Math.max(1, n - 1))}
                className="grid h-12 w-12 place-items-center rounded-md bg-mist text-2xl font-bold"
                aria-label="1人減らす"
              >
                −
              </button>
              <p className="en text-3xl font-bold tabular-nums" aria-live="polite">
                {people}
                <span className="ml-1 font-sans text-sm">人</span>
              </p>
              <button
                type="button"
                onClick={() => setPeople((n) => n + 1)}
                className="grid h-12 w-12 place-items-center rounded-md bg-mist text-2xl font-bold"
                aria-label="1人増やす"
              >
                ＋
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold">写真</p>
            <div className="mt-1.5 grid grid-cols-4 gap-2">
              {Array.from({ length: photos }).map((_, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-md">
                  <PhotoThumb seed={i} />
                </div>
              ))}
              {photos < 8 && (
                <button
                  type="button"
                  onClick={() => setPhotos((n) => n + 1)}
                  className="grid aspect-square place-items-center rounded-md border-2 border-dashed border-ink-mute text-xs font-bold text-ink-soft"
                >
                  ＋追加
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-line bg-white p-4">
          <button
            type="button"
            onClick={() => setSent(true)}
            className="min-h-14 w-full rounded-lg bg-brand-deep text-lg font-bold text-paper hover:bg-brand-dark"
          >
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
    <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden="true">
      <rect width="60" height="60" fill={["#b9c3cc", "#c9b79c", "#a9b7c6", "#c2c8bd"][v]} />
      {v === 0 && (
        <g stroke="#6c7884" strokeWidth="2">
          {[10, 22, 34, 46].map((p) => (
            <g key={p}>
              <line x1={p} y1="0" x2={p} y2="60" />
              <line x1="0" y1={p} x2="60" y2={p} />
            </g>
          ))}
        </g>
      )}
      {v === 1 && <path d="M0 40 L20 25 L35 35 L60 18 L60 60 L0 60Z" fill="#9c8a6e" />}
      {v === 2 && (
        <g fill="#7f8fa0">
          <rect x="8" y="10" width="8" height="50" />
          <rect x="26" y="20" width="8" height="40" />
          <rect x="44" y="5" width="8" height="55" />
          <rect x="0" y="28" width="60" height="5" />
        </g>
      )}
      {v === 3 && <rect x="10" y="12" width="40" height="36" fill="#e9ecee" stroke="#7d8790" strokeWidth="2" />}
      <rect x="4" y="44" width="22" height="12" fill="#2e5a3e" />
    </svg>
  );
}
