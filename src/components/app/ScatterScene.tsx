"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * 散らばった紙・FAX・Excel・付箋が、スクロールに合わせて1つのアプリ画面に吸い込まれる。
 * from: 散らばった位置（舞台に対する%）/ to: アプリ画面内の行の位置
 */
type Item = { id: string; from: [number, number, number]; to: [number, number]; row: number; el: ReactNode };

const items: Item[] = [
  { id: "nippo", from: [5, 44, -8], to: [30, 36], row: 0, el: <PaperNippo /> },
  { id: "fax", from: [72, 10, 6], to: [30, 44], row: 1, el: <PaperFax /> },
  { id: "excel", from: [36, 62, -3], to: [30, 52], row: 2, el: <PaperExcel /> },
  { id: "sticky", from: [82, 52, 9], to: [30, 60], row: 3, el: <Sticky /> },
  { id: "memo", from: [17, 70, 5], to: [30, 68], row: 4, el: <PhoneMemo /> },
  { id: "photo", from: [57, 30, -6], to: [30, 76], row: 5, el: <Polaroid /> },
];

const appRows = [
  { src: "日報", title: "港北 集合住宅　配筋 4人", meta: "佐藤　10/26 17:05", tag: "受付済み" },
  { src: "FAX", title: "協力会社から発注書の控え", meta: "株式会社〇〇設備", tag: "確認待ち" },
  { src: "Excel", title: "戸塚 外壁改修　工程を更新", meta: "足場解体 → 10/28", tag: "更新" },
  { src: "付箋", title: "青葉様へ折り返しの電話", meta: "期日 今日", tag: "今日" },
  { src: "電話", title: "資材の納期変更（キッチン）", meta: "鈴木　メモから登録", tag: "共有済み" },
  { src: "写真", title: "竣工写真 24枚を台帳へ", meta: "金沢 倉庫改修", tag: "完了" },
];

export function ScatterScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        root.current?.setAttribute("data-animated", "");

        items.forEach((it) => {
          gsap.set(q(`[data-item="${it.id}"]`), { left: `${it.from[0]}%`, top: `${it.from[1]}%`, rotation: it.from[2], scale: 1, autoAlpha: 1 });
        });
        gsap.set(q("[data-window]"), { autoAlpha: 0, y: 40, scale: 0.96 });
        gsap.set(q("[data-row]"), { autoAlpha: 0, x: -16 });
        gsap.set(q("[data-step2]"), { autoAlpha: 0, y: 20 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7 },
        });

        // 紙がゆっくり漂う
        tl.to(q("[data-item]"), { y: (i) => (i % 2 ? -24 : 18), rotation: (i) => items[i].from[2] * 1.4, duration: 1 })
          .to(q("[data-step1]"), { autoAlpha: 0, y: -20, duration: 0.5 }, 0.9)
          .to(q("[data-window]"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 }, 1);
        // 画面の行へ吸い込まれる
        items.forEach((it, i) => {
          tl.to(
            q(`[data-item="${it.id}"]`),
            { left: `${it.to[0]}%`, top: `${it.to[1]}%`, rotation: 0, y: 0, scale: 0.18, duration: 0.9, ease: "power3.in" },
            1.3 + i * 0.12,
          ).to(q(`[data-item="${it.id}"]`), { autoAlpha: 0, duration: 0.15 }, 2.1 + i * 0.12);
          tl.to(q(`[data-row="${i}"]`), { autoAlpha: 1, x: 0, duration: 0.35, ease: "power2.out" }, 2.05 + i * 0.12);
        });
        tl.to(q("[data-step2]"), { autoAlpha: 1, y: 0, duration: 0.5 }, 2.4).to({}, { duration: 0.6 });

        return () => root.current?.removeAttribute("data-animated");
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="scatter-title"
      className="group/scene relative bg-mist data-[animated]:h-[320vh]"
    >
      <div className="relative group-data-[animated]/scene:sticky group-data-[animated]/scene:top-0 group-data-[animated]/scene:h-dvh group-data-[animated]/scene:overflow-hidden">
        <div className="wrap relative z-10 pt-20 group-data-[animated]/scene:absolute group-data-[animated]/scene:inset-x-0 group-data-[animated]/scene:top-[calc(88px+4vh)] group-data-[animated]/scene:pt-0">
          <div data-step1 className="max-w-2xl group-data-[animated]/scene:absolute">
            <h2 id="scatter-title" className="text-[1.625rem] font-medium leading-[1.7] tracking-[0.08em] md:text-[2.25rem]">
              日報は紙、工程はExcel、
              <br />
              連絡はFAXと電話。
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              どこに何があるかは、ベテランの頭の中だけ。転記と確認の電話で、一日が終わっていませんか。
            </p>
          </div>
          <div data-step2 className="mt-10 max-w-2xl group-data-[animated]/scene:mt-0">
            <p className="text-[1.625rem] font-medium leading-[1.7] tracking-[0.08em] md:text-[2.25rem]">
              ひとつの画面に、まとめる。
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              現場からはスマホで、事務所ではPCで。同じ情報を、同じ画面で見られるようにします。
            </p>
          </div>
        </div>

        {/* 散らばった紙（大きい画面で演出するときだけ） */}
        <div aria-hidden="true" className="absolute inset-0 z-20 hidden group-data-[animated]/scene:block">
          {items.map((it) => (
            <div key={it.id} data-item={it.id} className="absolute w-[200px] origin-center will-change-transform">
              {it.el}
            </div>
          ))}
        </div>

        {/* まとまった後のアプリ画面 */}
        <div className="wrap relative pb-20 pt-10 group-data-[animated]/scene:absolute group-data-[animated]/scene:inset-x-0 group-data-[animated]/scene:top-[36vh] group-data-[animated]/scene:pb-0 group-data-[animated]/scene:pt-0">
          <div data-window className="mx-auto max-w-[880px] overflow-hidden rounded-2xl border border-line-soft bg-paper shadow-[0_40px_80px_-40px_rgba(27,35,43,0.45)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="font-semibold">受付トレイ</p>
              <p className="text-sm text-ink-mute">すべての連絡がここに届きます</p>
            </div>
            <ul className="divide-y divide-line-soft">
              {appRows.map((r, i) => (
                <li key={r.title} data-row={i} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-4 sm:px-5">
                  <span className="rounded bg-mist py-1 text-center text-xs font-semibold text-ink-soft">{r.src}</span>
                  <span className="min-w-0">
                    <span className="block font-semibold leading-snug sm:truncate">{r.title}</span>
                    <span className="block text-xs text-ink-mute sm:truncate">{r.meta}</span>
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      r.tag === "今日" ? "bg-[#fbe9e8] text-alert" : r.tag === "完了" ? "bg-[#e3f2ea] text-ok" : "bg-brand-wash text-brand-deep"
                    }`}
                  >
                    {r.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- 散らばる紙たち（すべてCSSとSVGで描画） ---- */

function Lines({ n = 5, w = [90, 70, 85, 60, 75] }: { n?: number; w?: number[] }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-1.5 rounded bg-ink/25" style={{ width: `${w[i % w.length]}%` }} />
      ))}
    </div>
  );
}

function PaperNippo() {
  return (
    <div className="rounded-sm bg-paper p-4 shadow-[0_10px_30px_-10px_rgba(27,35,43,0.4)]">
      <p className="border-b-2 border-ink pb-1 text-center text-sm font-semibold">作業日報</p>
      <div className="mt-2 grid grid-cols-[3rem_1fr] gap-x-2 gap-y-1.5 text-[11px]">
        <span>現場</span>
        <span className="font-semibold">港北 集合住宅</span>
        <span>人数</span>
        <span className="font-semibold">4名</span>
      </div>
      <div className="mt-3">
        <Lines n={4} />
      </div>
    </div>
  );
}

function PaperFax() {
  return (
    <div className="rounded-sm bg-[#f7f7f2] p-4 shadow-[0_10px_30px_-10px_rgba(27,35,43,0.4)]">
      <p className="en text-xl font-semibold tracking-widest">FAX</p>
      <p className="text-[11px]">送信票　1/2枚</p>
      <div className="mt-3 border-t border-dashed border-ink/40 pt-3">
        <Lines n={5} w={[100, 95, 60, 88, 40]} />
      </div>
    </div>
  );
}

function PaperExcel() {
  return (
    <div className="overflow-hidden rounded-sm bg-paper shadow-[0_10px_30px_-10px_rgba(27,35,43,0.4)]">
      <div className="bg-[#1d6b42] px-3 py-1.5 text-[11px] font-semibold text-paper">工程表_最新(2)_修正.xlsx</div>
      <div className="grid grid-cols-6 gap-px bg-line p-px">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className={`h-4 ${[8, 9, 10, 15, 16, 22, 23, 24, 25].includes(i) ? "bg-[#9ec4ad]" : "bg-paper"}`} />
        ))}
      </div>
    </div>
  );
}

function Sticky() {
  return (
    <div className="w-[160px] bg-[#fff6c9] p-4 shadow-[0_10px_24px_-10px_rgba(27,35,43,0.45)]">
      <p className="text-sm font-semibold leading-snug">青葉様に折り返し！</p>
      <p className="mt-2 text-xs">午後イチで</p>
    </div>
  );
}

function PhoneMemo() {
  return (
    <div className="rounded-sm bg-paper p-4 shadow-[0_10px_30px_-10px_rgba(27,35,43,0.4)]">
      <p className="text-xs font-semibold">電話メモ　14:20</p>
      <p className="mt-1 text-[11px]">キッチン資材 納期変更の件</p>
      <div className="mt-3">
        <Lines n={3} w={[80, 55, 70]} />
      </div>
    </div>
  );
}

function Polaroid() {
  return (
    <div className="w-[170px] bg-paper p-2.5 pb-6 shadow-[0_10px_30px_-10px_rgba(27,35,43,0.4)]">
      <svg viewBox="0 0 60 44" className="w-full" aria-hidden="true">
        <rect width="60" height="44" fill="#b9c3cc" />
        <g stroke="#6c7884" strokeWidth="1.5">
          {[8, 18, 28, 38, 48].map((p) => (
            <line key={p} x1={p} y1="0" x2={p} y2="44" />
          ))}
          {[10, 22, 34].map((p) => (
            <line key={p} x1="0" y1={p} x2="60" y2={p} />
          ))}
        </g>
        <rect x="3" y="31" width="18" height="10" fill="#2e5a3e" />
      </svg>
      <p className="mt-1.5 text-[11px]">配筋 北側</p>
    </div>
  );
}
