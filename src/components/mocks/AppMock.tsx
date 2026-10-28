"use client";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useRef } from "react";
import { countUp, locate, MOCK_H, MOCK_W, useMockLoop } from "./kit";

gsap.registerPlugin(MotionPathPlugin);

const week = [
  ["月", 46],
  ["火", 58],
  ["水", 52],
  ["木", 70],
  ["金", 64],
  ["土", 38],
  ["日", 0],
] as const;

const rows = [
  { site: "戸塚 外壁改修", work: "足場の解体", who: "山田", status: "進行中", flip: false },
  { site: "青葉 戸建て", work: "キッチンの搬入", who: "鈴木", status: "進行中", flip: true },
  { site: "金沢 倉庫改修", work: "竣工写真の整理", who: "高橋", status: "完了", flip: false },
];

/**
 * モック③：スマホで送った日報が、事務所のダッシュボードに届く。
 * ダッシュボードの数字とグラフ → スマホで日報を入力して送信 → 線を伝って届く
 * → 一覧に新しい行が入り、数字が更新 → 別の作業が「完了」に変わる
 */
export function AppMock({ active = true }: { active?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useMockLoop(root, active, (tl, q) => {
    const tap = (sel: string, pos: gsap.Position = ">") => {
      tl.to(q("[data-tap]"), { x: () => locate(root, q, sel).x - 14, y: () => locate(root, q, sel).y - 14, opacity: 1, duration: 0.45, ease: "power3.inOut" }, pos)
        .to(q("[data-tap]"), { scale: 0.7, duration: 0.1 })
        .to(q("[data-tap]"), { scale: 1, duration: 0.18 });
    };

    tl.set(q("[data-win]"), { opacity: 0, y: 24, scale: 0.97 }, 0)
      .set(q("[data-side] > *"), { opacity: 0, x: -6 }, 0)
      .set(q("[data-kpi]"), { opacity: 0, y: 14 }, 0)
      .set(q("[data-wbar]"), { scaleY: 0, transformOrigin: "50% 100%" }, 0)
      .set(q("[data-today]"), { scaleY: 0, transformOrigin: "50% 100%" }, 0)
      .set(q("[data-line]"), { strokeDashoffset: 700 }, 0)
      .set(q("[data-dot]"), { opacity: 0 }, 0)
      .set(q("[data-row]"), { opacity: 0, x: 12 }, 0)
      .set(q("[data-newrow]"), { height: 0, opacity: 0 }, 0)
      .set(q("[data-newrow-bg]"), { opacity: 1 }, 0)
      .set(q("[data-done-pill]"), { opacity: 0 }, 0)
      .set(q("[data-done-check]"), { strokeDashoffset: 20 }, 0)
      .set(q("[data-phone]"), { opacity: 0, y: 60 }, 0)
      .set(q("[data-chip-on]"), { opacity: 0 }, 0)
      .set(q("[data-n3]"), { yPercent: 0 }, 0)
      .set(q("[data-n4]"), { yPercent: 100 }, 0)
      .set(q("[data-photo-new]"), { scale: 0, opacity: 0 }, 0)
      .set(q("[data-sent]"), { opacity: 0 }, 0)
      .set(q("[data-send]"), { scale: 1 }, 0)
      .set(q("[data-wire]"), { strokeDashoffset: 520, opacity: 1 }, 0)
      .set(q("[data-packet]"), { opacity: 0 }, 0)
      .set(q("[data-tap]"), { opacity: 0, x: 90, y: 470 }, 0);

    // ダッシュボードが立ち上がる
    tl.to(q("[data-win]"), { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out" }, 0.2)
      .to(q("[data-side] > *"), { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 }, "<0.2")
      .to(q("[data-kpi]"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "<0.1");
    countUp(tl, q("[data-k]")[0], 12, "<", 1);
    countUp(tl, q("[data-k]")[1], 38, "<", 1.2);
    countUp(tl, q("[data-k]")[2], 3, "<", 0.8);
    tl.to(q("[data-wbar]"), { scaleY: 1, duration: 0.8, stagger: 0.06, ease: "power3.out" }, "<0.2")
      .to(q("[data-line]"), { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "<0.2")
      .to(q("[data-dot]"), { opacity: 1, duration: 0.2, stagger: 0.05 }, "<0.6")
      .to(q("[data-row]"), { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "<-0.4");

    // スマホで日報を入力
    tl.to(q("[data-phone]"), { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "+=0.2");
    tap("[data-chip='配筋']", ">0.2");
    tl.to(q("[data-chip-on]"), { opacity: 1, duration: 0.15 }, "<0.1");
    tap("[data-plus]", ">0.15");
    tl.to(q("[data-n3]"), { yPercent: -100, duration: 0.3, ease: "power2.out" }, "<0.1").to(q("[data-n4]"), { yPercent: 0, duration: 0.3, ease: "power2.out" }, "<");
    tap("[data-photo-add]", ">0.15");
    tl.to(q("[data-photo-new]"), { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" }, "<0.1");
    tap("[data-send]", ">0.2");
    tl.to(q("[data-send]"), { scale: 0.95, duration: 0.1 }, "<0.05")
      .to(q("[data-send]"), { scale: 1, duration: 0.15 })
      .to(q("[data-sent]"), { opacity: 1, duration: 0.25 }, "<")
      .to(q("[data-tap]"), { opacity: 0, duration: 0.3 }, ">0.1");

    // 線を伝って事務所へ届く
    tl.to(q("[data-wire]"), { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "<")
      .set(q("[data-packet]"), { opacity: 1 }, "<0.1")
      .to(
        q("[data-packet]"),
        { motionPath: { path: q("[data-wire]")[0] as SVGPathElement, align: q("[data-wire]")[0] as SVGPathElement, alignOrigin: [0.5, 0.5] }, duration: 0.9, ease: "power2.inOut" },
        "<",
      )
      .to(q("[data-packet]"), { opacity: 0, scale: 2, duration: 0.25 }, ">")
      .to(q("[data-wire]"), { opacity: 0, duration: 0.4 }, "<")
      // 一覧に新しい行
      .to(q("[data-newrow]"), { height: 46, opacity: 1, duration: 0.5, ease: "power3.out" }, "<")
      .to(q("[data-today]"), { scaleY: 1, duration: 0.7, ease: "back.out(1.6)" }, "<0.1");
    countUp(tl, q("[data-k]")[1], 39, "<", 0.5, 38);
    tl.to(q("[data-newrow-bg]"), { opacity: 0, duration: 1.4 }, ">0.4");

    // 別の作業が完了に
    tl.to(q("[data-done-pill]"), { opacity: 1, duration: 0.3 }, "<0.2").to(q("[data-done-check]"), { strokeDashoffset: 0, duration: 0.35 }, "<0.1");
    countUp(tl, q("[data-k]")[2], 2, "<", 0.4, 3);
    tl.to({}, { duration: 1.8 });
  });

  return (
    <div ref={root} className="relative select-none font-sans text-ink" style={{ width: MOCK_W, height: MOCK_H }} aria-hidden="true">
      {/* ダッシュボード */}
      <div data-win className="absolute right-0 top-2 flex h-[452px] w-[600px] overflow-hidden rounded-[14px] bg-[#f4f7f8] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.06)]">
        <div data-side className="flex w-[54px] shrink-0 flex-col items-center gap-3 bg-night py-4">
          <span className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-brand text-[11px] font-bold text-paper">G</span>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`grid h-8 w-8 place-items-center rounded-lg ${i === 0 ? "bg-white/12" : ""}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={i === 0 ? "#3cc3c4" : "rgba(255,255,255,0.45)"} strokeWidth="1.5">
                {i === 0 && <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" />}
                {i === 1 && <path d="M3 3h10v10H3zM3 7h10M7 7v6" />}
                {i === 2 && <path d="M4 2h8v12H4zM6 5h4M6 8h4M6 11h2" />}
                {i === 3 && <path d="M2 4h12v9H2zM5 4l1.5-2h3L11 4M8 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />}
                {i === 4 && <path d="M8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM3 14c.5-3 2.5-4.5 5-4.5s4.5 1.5 5 4.5" />}
              </svg>
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold tracking-[0.04em]">ダッシュボード</p>
              <p className="text-[9px] text-ink-mute">10月26日（月）　青葉工務店</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-7 w-36 rounded-lg bg-white px-2.5 text-[9px] leading-7 text-ink-mute ring-1 ring-line-soft">現場・担当で検索</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-wash text-[9px] font-semibold text-brand-deep">山田</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {[
              ["稼働中の現場", "12", "件", ""],
              ["今週の日報", "39", "件", "+1"],
              ["期日が近い作業", "2", "件", ""],
            ].map(([l, n, u], i) => (
              <div key={l} data-kpi className="rounded-xl bg-white p-3 ring-1 ring-line-soft">
                <p className="text-[9px] text-ink-mute">{l}</p>
                <p className={`en mt-1 text-[24px] font-light leading-none ${i === 2 ? "text-[#c2362f]" : ""}`}>
                  <span data-k>{n}</span>
                  <span className="ml-1 font-sans text-[10px] text-ink-mute">{u}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid grid-cols-[1fr_1.12fr] gap-2.5">
            {/* グラフ */}
            <div className="rounded-xl bg-white p-3 ring-1 ring-line-soft">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold">今週の作業時間</p>
                <p className="en text-[8px] text-ink-mute">hours</p>
              </div>
              <div className="relative mt-2 h-[150px]">
                <svg viewBox="0 0 220 150" className="absolute inset-0 h-full w-full overflow-visible">
                  {[30, 70, 110].map((y) => (
                    <line key={y} x1="0" x2="220" y1={y} y2={y} stroke="#eaeff2" />
                  ))}
                </svg>
                <div className="absolute inset-x-0 bottom-4 top-0 flex items-end gap-2 px-1">
                  {week.map(([d, h], i) => (
                    <div key={d} className="relative flex h-full flex-1 items-end">
                      <div data-wbar className="w-full rounded-t-[4px] bg-brand-wash" style={{ height: `${h}%` }} />
                      {i === 0 && <div data-today className="absolute bottom-0 w-full rounded-t-[4px] bg-[linear-gradient(180deg,#3cc3c4,#0a7a83)]" style={{ height: "62%" }} />}
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 220 150" className="absolute inset-x-1 bottom-4 top-0 h-[134px] w-[calc(100%-8px)] overflow-visible" preserveAspectRatio="none">
                  <path data-line d="M15 84 L47 66 L79 74 L111 46 L143 56 L175 92" fill="none" stroke="#154245" strokeWidth="1.6" strokeDasharray="700" />
                  {[
                    [15, 84],
                    [47, 66],
                    [79, 74],
                    [111, 46],
                    [143, 56],
                    [175, 92],
                  ].map(([x, y]) => (
                    <circle key={x} data-dot cx={x} cy={y} r="2.6" fill="#ffffff" stroke="#154245" strokeWidth="1.4" />
                  ))}
                </svg>
                <div className="absolute inset-x-1 bottom-0 flex">
                  {week.map(([d]) => (
                    <span key={d} className="flex-1 text-center text-[8px] text-ink-mute">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 最新の報告 */}
            <div className="rounded-xl bg-white p-3 ring-1 ring-line-soft">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold">最新の報告</p>
                <p className="text-[8px] text-ink-mute">すべて見る</p>
              </div>
              <div data-list className="mt-1.5">
                <div data-newrow className="relative overflow-hidden">
                  <div data-newrow-bg className="absolute inset-0 rounded-lg bg-brand-wash" />
                  <div className="relative flex h-[46px] items-center gap-2 px-1.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f4d9c4] text-[9px] font-semibold">佐</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold">港北 集合住宅　配筋・4人</p>
                      <p className="text-[8px] text-ink-mute">日報　写真3枚　たった今</p>
                    </div>
                    <span className="en rounded-full bg-brand-deep px-2 py-0.5 text-[8px] font-semibold text-paper">New</span>
                  </div>
                </div>
                {rows.map((r) => (
                  <div key={r.site} data-row className="flex h-[46px] items-center gap-2 border-t border-line-soft px-1.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mist text-[9px] font-semibold text-ink-soft">{r.who[0]}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold">
                        {r.site}　{r.work}
                      </p>
                      <p className="text-[8px] text-ink-mute">担当 {r.who}</p>
                    </div>
                    <span className="relative">
                      <span className={`block rounded-full px-2 py-0.5 text-[8px] font-semibold ${r.status === "完了" ? "bg-[#e3f2ea] text-ok" : "bg-brand-wash text-brand-deep"}`}>
                        {r.status}
                      </span>
                      {r.flip && (
                        <span data-done-pill className="absolute inset-0 flex items-center justify-center gap-0.5 rounded-full bg-[#e3f2ea] text-[8px] font-semibold text-ok">
                          <svg width="8" height="8" viewBox="0 0 8 8">
                            <path data-done-check d="M1 4.2l2 2 4-4.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="20" />
                          </svg>
                          完了
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* スマホから事務所へつながる線 */}
      <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible" viewBox={`0 0 ${MOCK_W} ${MOCK_H}`}>
        <path
          data-wire
          d="M196 468 C 300 486, 352 262, 484 200"
          fill="none"
          stroke="#3cc3c4"
          strokeWidth="2"
          strokeDasharray="520"
          strokeLinecap="round"
        />
        <circle data-packet r="6" fill="#3cc3c4" stroke="#ffffff" strokeWidth="2" />
      </svg>

      {/* スマホ */}
      <div data-phone className="absolute bottom-0 left-0 z-20 h-[420px] w-[200px] rounded-[34px] bg-[#0b1214] p-[7px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative h-full overflow-hidden rounded-[28px] bg-[#f4f7f8]">
          <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-[#0b1214]" />
          <div className="flex items-center justify-between px-5 pt-2.5 text-[8px] font-semibold">
            <span className="en">9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-3 rounded-sm bg-ink" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
          </div>
          <div className="mt-2.5 bg-brand-dark px-4 pb-2.5 pt-2.5 text-paper">
            <p className="text-[8px] text-paper/70">10月26日（月）</p>
            <p className="text-[13px] font-semibold tracking-[0.06em]">今日の日報</p>
          </div>
          <div className="space-y-2 px-3 py-2.5 text-[9px]">
            <div>
              <p className="font-semibold text-ink-soft">現場</p>
              <p className="mt-1 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-line-soft">港北 集合住宅新築</p>
            </div>
            <div>
              <p className="font-semibold text-ink-soft">作業内容</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {["足場", "配筋", "型枠", "清掃"].map((c) => (
                  <span key={c} data-chip={c} className="relative rounded-full bg-white px-2 py-0.5 text-[8.5px] ring-1 ring-line">
                    {c}
                    {c === "配筋" && <span data-chip-on className="absolute inset-0 grid place-items-center rounded-full bg-brand-deep text-paper">配筋</span>}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-ink-soft">作業人数</p>
              <div className="mt-1 flex items-center justify-between rounded-lg bg-white p-1 ring-1 ring-line-soft">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-mist text-[12px]">−</span>
                <span className="en relative h-[18px] w-6 overflow-hidden text-center text-[15px] leading-[18px]">
                  <span data-n3 className="absolute inset-0">3</span>
                  <span data-n4 className="absolute inset-0">4</span>
                </span>
                <span data-plus className="grid h-6 w-6 place-items-center rounded-md bg-mist text-[12px]">＋</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-ink-soft">写真</p>
              <div className="mt-1 grid grid-cols-4 gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    {...(i === 2 ? { "data-photo-new": "" } : {})}
                    className="aspect-square rounded-md"
                    style={{ background: ["linear-gradient(135deg,#b9c3cc,#8696a3)", "linear-gradient(135deg,#c9b79c,#9c8a6e)", "linear-gradient(135deg,#a9c7c9,#5f9da0)"][i] }}
                  />
                ))}
                <span data-photo-add className="grid aspect-square place-items-center rounded-md border border-dashed border-ink-mute text-[12px] text-ink-mute">
                  ＋
                </span>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-3 bottom-3">
            <span data-send className="relative block rounded-xl bg-brand-deep py-2.5 text-center text-[10px] font-semibold text-paper">
              日報を送信する
              <span data-sent className="absolute inset-0 flex items-center justify-center gap-1 rounded-xl bg-ok">
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M1.5 5.2l2.3 2.3L8.5 2.8" fill="none" stroke="#fff" strokeWidth="1.6" />
                </svg>
                送信しました
              </span>
            </span>
          </div>
        </div>
      </div>
      <span data-tap className="pointer-events-none absolute left-0 top-0 z-40 h-7 w-7 rounded-full border-2 border-paper bg-brand/60 shadow-[0_0_0_6px_rgba(60,195,196,0.25)]" />
    </div>
  );
}
