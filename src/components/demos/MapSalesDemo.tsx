"use client";

import { useMemo, useState } from "react";
import { AppFrame, Chip, useToast } from "./shared";

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

const stageMeta: Record<Stage, { label: string; mark: string; fill: string; text: string }> = {
  lead: { label: "見込み", mark: "見", fill: "#ffffff", text: "#0a7a83" },
  talk: { label: "商談中", mark: "商", fill: "#0a7a83", text: "#ffffff" },
  won: { label: "契約", mark: "契", fill: "#1b232b", text: "#3cc3c4" },
  sleep: { label: "休眠", mark: "休", fill: "#d9dee2", text: "#46525e" },
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
  const [selectedId, setSelectedId] = useState<number>(5);
  const [route, setRoute] = useState<number[]>([5, 9]);
  const toast = useToast();

  const visible = useMemo(() => customers.filter((c) => shown[c.stage]), [customers, shown]);
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
    <AppFrame title="訪問マップ" nav={["訪問マップ", "顧客", "商談", "今日の予定", "レポート"]}>
      <div className="grid h-full lg:grid-cols-[280px_1fr]">
        <section aria-label="顧客の一覧" className="order-2 flex min-h-0 flex-col border-r border-line bg-white lg:order-1">
          <div className="border-b border-line p-3">
            <p className="text-xs font-bold text-ink-soft">表示する状況</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(Object.keys(stageMeta) as Stage[]).map((s) => (
                <Chip key={s} active={shown[s]} onClick={() => setShown((v) => ({ ...v, [s]: !v[s] }))}>
                  <Pin stage={s} size={16} />
                  {stageMeta[s].label}
                </Chip>
              ))}
            </div>
          </div>
          <ul className="min-h-0 flex-1 divide-y divide-line-soft overflow-auto">
            {visible.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  aria-current={c.id === selectedId ? "true" : undefined}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-mist aria-[current=true]:bg-brand-wash`}
                >
                  <Pin stage={c.stage} size={26} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{c.name}</span>
                    <span className="block truncate text-xs text-ink-mute">
                      {c.area}　最終訪問 {c.lastVisit}
                    </span>
                  </span>
                  {route.includes(c.id) && (
                    <span className="rounded bg-brand-light px-1.5 text-[11px] font-bold">
                      {route.indexOf(c.id) + 1}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          <p className="border-t border-line px-3 py-2 text-xs text-ink-mute">
            今日のルート：{route.length}件
          </p>
        </section>

        <div className="relative order-1 min-h-[380px] bg-[#eef1f3] lg:order-2">
          <svg viewBox="0 0 480 440" className="absolute inset-0 h-full w-full" role="img" aria-label="顧客の位置を示した地図（デモ用のイメージ）" preserveAspectRatio="xMidYMid slice">
            {/* 海 */}
            <path d="M480 60 C 440 140 470 220 420 300 C 390 350 420 400 400 440 L480 440Z" fill="#d6e4f5" />
            {/* 公園 */}
            <rect x="170" y="70" width="60" height="40" rx="6" fill="#dbe9de" />
            <rect x="40" y="290" width="70" height="50" rx="6" fill="#dbe9de" />
            {/* 川 */}
            <path d="M0 190 C 90 170 150 210 220 200 S 340 170 430 210" fill="none" stroke="#c9dbf0" strokeWidth="9" />
            {/* 幹線道路 */}
            <g fill="none" stroke="#ffffff" strokeLinecap="round">
              <path d="M20 60 L 460 420" strokeWidth="10" />
              <path d="M0 270 C 120 260 280 280 470 250" strokeWidth="8" />
              <path d="M200 0 C 210 120 190 300 230 440" strokeWidth="8" />
              <path d="M330 0 L 300 440" strokeWidth="6" />
              <path d="M0 120 L 480 150" strokeWidth="5" />
            </g>
            {/* 鉄道 */}
            <path d="M40 0 C 120 160 280 180 380 440" fill="none" stroke="#9aa6b2" strokeWidth="3" strokeDasharray="10 6" />
            {/* ルート */}
            {routePoints.length > 1 && (
              <polyline
                points={routePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="#3cc3c4"
                strokeWidth="5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}
            {visible.map((c) => (
              <g
                key={c.id}
                transform={`translate(${c.x} ${c.y})`}
                onClick={() => setSelectedId(c.id)}
                className="cursor-pointer"
                aria-hidden="true"
              >
                {c.id === selectedId && <circle r="22" fill="#0a7a83" opacity="0.15" />}
                <path d="M0 0 L -9 -14 A 13 13 0 1 1 9 -14 Z" fill={stageMeta[c.stage].fill} stroke="#1b232b" strokeWidth="2" transform="translate(0 4)" />
                <text y="-14" textAnchor="middle" fontSize="11" fontWeight="700" fill={stageMeta[c.stage].text}>
                  {stageMeta[c.stage].mark}
                </text>
              </g>
            ))}
          </svg>
          <p className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[11px] text-ink-mute">地図はデモ用のイメージです</p>

          {selected && (
            <article
              aria-label={`${selected.name}の情報`}
              className="absolute inset-x-3 bottom-3 rounded-lg border border-line bg-white p-4 shadow-[0_12px_30px_-12px_rgba(27,35,43,0.35)] sm:left-auto sm:w-80"
            >
              <div className="flex items-start gap-3">
                <Pin stage={selected.stage} size={30} />
                <div className="min-w-0">
                  <p className="font-bold">{selected.name}</p>
                  <p className="text-xs text-ink-mute">
                    {selected.kind}　{selected.area}　訪問 {selected.visits}回
                  </p>
                </div>
              </div>
              <p className="mt-3 rounded bg-mist px-3 py-2 text-sm leading-relaxed">{selected.memo}</p>
              <p className="mt-2 text-xs text-ink-mute">最終訪問 {selected.lastVisit}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => recordVisit(selected.id)}
                  className="min-h-11 rounded-md bg-brand-deep text-sm font-bold text-paper hover:bg-brand-dark"
                >
                  訪問を記録
                </button>
                <button
                  type="button"
                  onClick={() => toggleRoute(selected.id)}
                  className="min-h-11 rounded-md border-2 border-ink text-sm font-bold hover:bg-mist"
                >
                  {route.includes(selected.id) ? "ルートから外す" : "ルートに追加"}
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

function Pin({ stage, size }: { stage: Stage; size: number }) {
  const m = stageMeta[stage];
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true" className="shrink-0">
      <circle cx="15" cy="15" r="13" fill={m.fill} stroke="#1b232b" strokeWidth="2" />
      <text x="15" y="19.5" textAnchor="middle" fontSize="13" fontWeight="700" fill={m.text}>
        {m.mark}
      </text>
    </svg>
  );
}
