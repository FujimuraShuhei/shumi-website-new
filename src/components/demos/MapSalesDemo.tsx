"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/icons";
import { AppFrame, ui, useToast } from "./shared";

type Stage = "lead" | "talk" | "won" | "sleep";
type Customer = {
  id: number;
  name: string;
  kind: string;
  area: string;
  x: number;
  y: number;
  stage: Stage;
  lastVisit: string;
  memo: string;
  visits: number;
};

/** 状況は色だけでなく文字（見・商・契・休）でも区別する */
const stageMeta: Record<Stage, { label: string; mark: string; color: string; pill: string }> = {
  lead: { label: "見込み", mark: "見", color: "#0ea5e9", pill: "bg-sky-50 text-sky-800 ring-sky-200" },
  talk: { label: "商談中", mark: "商", color: "#0a7a83", pill: "bg-teal-50 text-teal-800 ring-teal-200" },
  won: { label: "契約", mark: "契", color: "#16a34a", pill: "bg-emerald-50 text-emerald-800 ring-emerald-200" },
  sleep: { label: "休眠", mark: "休", color: "#94a3b8", pill: "bg-slate-100 text-slate-600 ring-slate-200" },
};

const initial: Customer[] = [
  { id: 1, name: "青葉ホーム", kind: "工務店", area: "青葉区", x: 110, y: 120, stage: "talk", lastVisit: "10/21", memo: "外壁塗装の見積を来週提出。社長は午前中が不在がち。", visits: 4 },
  { id: 2, name: "港北設備工業", kind: "設備工事", area: "港北区", x: 250, y: 150, stage: "lead", lastVisit: "10/08", memo: "展示会で名刺交換。採用に課題あり。", visits: 1 },
  { id: 3, name: "鶴見リフォーム", kind: "リフォーム", area: "鶴見区", x: 390, y: 120, stage: "won", lastVisit: "10/18", memo: "日報アプリ導入済み。来月に追加機能の相談。", visits: 7 },
  { id: 4, name: "戸塚建材", kind: "建材商社", area: "戸塚区", x: 140, y: 330, stage: "sleep", lastVisit: "06/30", memo: "担当者が異動。新しい窓口を確認する。", visits: 2 },
  { id: 5, name: "保土ケ谷塗装", kind: "塗装", area: "保土ケ谷区", x: 230, y: 250, stage: "talk", lastVisit: "10/23", memo: "写真台帳の手間に困っている。デモを見せる。", visits: 3 },
  { id: 6, name: "中区内装デザイン", kind: "内装", area: "中区", x: 400, y: 260, stage: "lead", lastVisit: "—", memo: "紹介。まだ連絡していない。", visits: 0 },
  { id: 7, name: "金沢土木", kind: "土木", area: "金沢区", x: 360, y: 390, stage: "lead", lastVisit: "09/12", memo: "公共工事の書類作成を効率化したい。", visits: 1 },
  { id: 8, name: "旭ハウジング", kind: "工務店", area: "旭区", x: 70, y: 220, stage: "won", lastVisit: "10/02", memo: "採用サイト公開済み。応募の増え方を共有する。", visits: 6 },
  { id: 9, name: "磯子電設", kind: "電気工事", area: "磯子区", x: 300, y: 330, stage: "talk", lastVisit: "10/19", memo: "工程管理アプリの要件を整理中。", visits: 2 },
];

export function MapSalesDemo() {
  const [customers, setCustomers] = useState(initial);
  const [shown, setShown] = useState<Record<Stage, boolean>>({ lead: true, talk: true, won: true, sleep: false });
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number>(5);
  const [route, setRoute] = useState<number[]>([5, 9]);
  const toast = useToast();

  const visible = useMemo(() => customers.filter((c) => shown[c.stage] && (!query || `${c.name}${c.area}${c.kind}`.includes(query))), [customers, shown, query]);
  const selected = customers.find((c) => c.id === selectedId);
  const routePoints = route.map((id) => customers.find((c) => c.id === id)!).filter(Boolean);

  function recordVisit(id: number) {
    setCustomers((cs) => cs.map((c) => (c.id === id ? { ...c, lastVisit: "10/26", visits: c.visits + 1 } : c)));
    toast.show("訪問を記録しました");
  }
  function toggleRoute(id: number) {
    setRoute((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));
  }

  return (
    <AppFrame
      title="訪問マップ"
      subtitle="横浜市・顧客 9件"
      nav={[
        { label: "訪問マップ", icon: "pin" },
        { label: "顧客", icon: "people" },
        { label: "商談", icon: "handshake" },
        { label: "今日の予定", icon: "clock" },
        { label: "レポート", icon: "chart" },
      ]}
      actions={
        <span className="hidden items-center gap-2 rounded-lg bg-[#0a7a83]/[0.08] px-3 py-2 text-[12px] font-semibold text-[#0a7a83] sm:inline-flex">
          <Icon name="route" className="h-4 w-4" />
          今日のルート {route.length}件
        </span>
      }
    >
      <div className="grid h-full lg:grid-cols-[290px_1fr]">
        <section aria-label="顧客の一覧" className="order-2 flex min-h-0 flex-col border-r border-slate-200 bg-white lg:order-1">
          <div className="space-y-3 border-b border-slate-200 p-3.5">
            <label className="relative block">
              <span className="sr-only">顧客を探す</span>
              <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="会社名・地域で探す" className={`${ui.input} h-9 pl-9`} />
            </label>
            <div role="group" aria-label="表示する状況" className="flex flex-wrap gap-1.5">
              {(Object.keys(stageMeta) as Stage[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={shown[s]}
                  onClick={() => setShown((v) => ({ ...v, [s]: !v[s] }))}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold ring-1 ring-inset transition-colors ${
                    shown[s] ? stageMeta[s].pill : "bg-white text-slate-400 ring-slate-200 line-through"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: stageMeta[s].color }} />
                  {stageMeta[s].label}
                </button>
              ))}
            </div>
          </div>
          <ul className="min-h-0 flex-1 overflow-auto p-1.5">
            {visible.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  aria-current={c.id === selectedId ? "true" : undefined}
                  className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors hover:bg-slate-50 aria-[current=true]:bg-[#0a7a83]/[0.07]"
                >
                  <Badge stage={c.stage} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold">{c.name}</span>
                    <span className="block truncate text-[11px] text-slate-500">
                      {c.area}・最終訪問 {c.lastVisit}
                    </span>
                  </span>
                  {route.includes(c.id) && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#0a7a83] px-1 text-[10px] font-bold text-white" aria-label={`ルートの${route.indexOf(c.id) + 1}番目`}>
                      {route.indexOf(c.id) + 1}
                    </span>
                  )}
                </button>
              </li>
            ))}
            {visible.length === 0 && <li className="px-3 py-10 text-center text-[12px] text-slate-500">条件に合う顧客はいません</li>}
          </ul>
        </section>

        <div className="relative order-1 min-h-[400px] overflow-hidden bg-[#eef1ec] lg:order-2">
          <svg viewBox="0 0 480 440" className="absolute inset-0 h-full w-full" role="img" aria-label="顧客の位置を示した地図（デモ用のイメージ）" preserveAspectRatio="xMidYMid slice">
            {/* 街区 */}
            <g fill="#e6eae3">
              {Array.from({ length: 48 }).map((_, i) => (
                <rect key={i} x={(i % 8) * 62 + 4} y={Math.floor(i / 8) * 76 + 6} width="52" height="62" rx="5" />
              ))}
            </g>
            {/* 海・公園・川 */}
            <path d="M480 60 C 440 140 470 220 420 300 C 390 350 420 400 400 440 L480 440Z" fill="#cfe3ee" />
            <rect x="170" y="70" width="60" height="40" rx="8" fill="#d5e8cf" />
            <rect x="40" y="290" width="70" height="50" rx="8" fill="#d5e8cf" />
            <path d="M0 190 C 90 170 150 210 220 200 S 340 170 430 210" fill="none" stroke="#cfe3ee" strokeWidth="10" />
            {/* 道路（縁取り＋白） */}
            <g fill="none" strokeLinecap="round">
              {[
                ["M20 60 L 460 420", 12],
                ["M0 270 C 120 260 280 280 470 250", 10],
                ["M200 0 C 210 120 190 300 230 440", 10],
                ["M330 0 L 300 440", 8],
                ["M0 120 L 480 150", 7],
              ].map(([d, w]) => (
                <g key={d as string}>
                  <path d={d as string} stroke="#d9ddd6" strokeWidth={(w as number) + 3} />
                  <path d={d as string} stroke="#ffffff" strokeWidth={w as number} />
                </g>
              ))}
            </g>
            <path d="M40 0 C 120 160 280 180 380 440" fill="none" stroke="#b9c0c7" strokeWidth="3" strokeDasharray="10 6" />
            {/* 今日のルート */}
            {routePoints.length > 1 && (
              <polyline points={routePoints.map((p) => `${p.x},${p.y - 16}`).join(" ")} fill="none" stroke="#0a7a83" strokeWidth="3.5" strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
            )}
            {visible.map((c) => {
              const m = stageMeta[c.stage];
              const sel = c.id === selectedId;
              return (
                <g key={c.id} transform={`translate(${c.x} ${c.y}) scale(${sel ? 1.25 : 1})`} onClick={() => setSelectedId(c.id)} className="cursor-pointer" aria-hidden="true">
                  {sel && <circle r="20" cy="-2" fill={m.color} opacity="0.18" />}
                  <ellipse cy="2" rx="6" ry="2.2" fill="#0f172a" opacity="0.18" />
                  <path d="M0 0 C -4 -6 -12 -11 -12 -20 A 12 12 0 1 1 12 -20 C 12 -11 4 -6 0 0Z" fill={m.color} stroke="#ffffff" strokeWidth="2" />
                  <text y="-16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
                    {m.mark}
                  </text>
                  {route.includes(c.id) && (
                    <g transform="translate(10 -30)">
                      <circle r="7" fill="#0f172a" />
                      <text y="3.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">
                        {route.indexOf(c.id) + 1}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* 地図の操作（見た目だけ） */}
          <div aria-hidden="true" className="absolute right-3 top-3 overflow-hidden rounded-lg bg-white text-slate-600 shadow-[0_2px_8px_rgba(15,23,42,0.15)]">
            <span className="grid h-8 w-8 place-items-center border-b border-slate-200 text-lg">＋</span>
            <span className="grid h-8 w-8 place-items-center text-lg">−</span>
          </div>
          <p className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[11px] text-slate-500 shadow-sm">地図はデモ用のイメージです</p>

          {selected && (
            <article aria-label={`${selected.name}の情報`} className="absolute inset-x-3 bottom-3 rounded-xl bg-white p-4 shadow-[0_20px_40px_-16px_rgba(15,23,42,0.4)] ring-1 ring-slate-200 sm:left-auto sm:w-[320px]">
              <div className="flex items-start gap-3">
                <Badge stage={selected.stage} large />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-bold">{selected.name}</p>
                  <p className="text-[12px] text-slate-500">
                    {selected.kind}・{selected.area}
                  </p>
                </div>
                <span className={`inline-flex h-6 shrink-0 items-center rounded-full px-2 text-[11px] font-semibold ring-1 ring-inset ${stageMeta[selected.stage].pill}`}>
                  {stageMeta[selected.stage].label}
                </span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <dt className="text-[11px] text-slate-500">訪問回数</dt>
                  <dd className="text-[16px] font-bold tabular-nums">{selected.visits}回</dd>
                </div>
                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <dt className="text-[11px] text-slate-500">最終訪問</dt>
                  <dd className="text-[16px] font-bold tabular-nums">{selected.lastVisit}</dd>
                </div>
              </dl>
              <p className="mt-3 border-l-2 border-[#0a7a83] pl-3 text-[12.5px] leading-relaxed text-slate-700">{selected.memo}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => recordVisit(selected.id)} className={ui.btn}>
                  <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />
                  訪問を記録
                </button>
                <button type="button" onClick={() => toggleRoute(selected.id)} className={ui.btnGhost}>
                  <Icon name="route" className="h-4 w-4" />
                  {route.includes(selected.id) ? "ルート解除" : "ルートに追加"}
                </button>
              </div>
            </article>
          )}
        </div>
      </div>
      {toast.node}
    </AppFrame>
  );
}

function Badge({ stage, large = false }: { stage: Stage; large?: boolean }) {
  const m = stageMeta[stage];
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-bold text-white ${large ? "h-10 w-10 text-[14px]" : "h-8 w-8 text-[12px]"}`}
      style={{ background: m.color }}
    >
      {m.mark}
    </span>
  );
}
