"use client";

import { useRef } from "react";
import { BrowserChrome, clickAt, countUp, Cursor, locate, MOCK_H, MOCK_W, useMockLoop } from "./kit";

/**
 * モック①：ブランドの強みが伝わるコーポレートサイトが、その場で組み上がっていく。
 * URL入力 → 読み込み → ナビ → キービジュアルの線画 → 見出し → 実績の数字 → サービス
 * → カーソルで「施工事例」へ → ページがスクロール → 事例にホバー → お問い合わせの通知
 */
export function BrandSiteMock({ active = true }: { active?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useMockLoop(root, active, (tl, q) => {
    const stats = q("[data-stat]");
    // 初期状態
    tl.set(q("[data-url]"), { clipPath: "inset(0 100% 0 0)" }, 0)
      .set(q("[data-load]"), { scaleX: 0, opacity: 1 }, 0)
      .set(q("[data-nav] > *"), { opacity: 0, y: -8 }, 0)
      .set(q("[data-hero-bg]"), { opacity: 0, scale: 1.08 }, 0)
      .set(q("[data-draw]"), { strokeDashoffset: 600 }, 0)
      .set(q("[data-sun]"), { scale: 0, transformOrigin: "50% 50%" }, 0)
      .set(q("[data-h1] > span > span"), { yPercent: 115 }, 0)
      .set(q("[data-hero-sub], [data-stats] > *"), { opacity: 0, y: 12 }, 0)
      .set(q("[data-card]"), { opacity: 0, y: 26 }, 0)
      .set(q("[data-tile]"), { opacity: 0, y: 24 }, 0)
      .set(q("[data-tile-img]"), { scale: 1 }, 0)
      .set(q("[data-tile-more]"), { opacity: 0, y: 6 }, 0)
      .set(q("[data-page]"), { y: 0 }, 0)
      .set(q("[data-underline]"), { scaleX: 0 }, 0)
      .set(q("[data-toast]"), { opacity: 0, y: 24, scale: 0.96 }, 0)
      .set(q("[data-cursor]"), { x: 700, y: 470, opacity: 0 }, 0);

    // URLを打って読み込む
    tl.to(q("[data-url]"), { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "steps(15)" }, 0.2)
      .to(q("[data-load]"), { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, ">-0.05")
      .to(q("[data-load]"), { opacity: 0, duration: 0.25 })
      // ナビとキービジュアル
      .to(q("[data-nav] > *"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "<-0.1")
      .to(q("[data-hero-bg]"), { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }, "<")
      .to(q("[data-draw]"), { strokeDashoffset: 0, duration: 1.6, stagger: 0.07, ease: "power2.inOut" }, "<0.2")
      .to(q("[data-sun]"), { scale: 1, duration: 1, ease: "elastic.out(1, 0.6)" }, "<0.6")
      .to(q("[data-h1] > span > span"), { yPercent: 0, duration: 0.9, stagger: 0.12, ease: "expo.out" }, "<-0.6")
      .to(q("[data-hero-sub]"), { opacity: 1, y: 0, duration: 0.6 }, "<0.3")
      .to(q("[data-stats] > *"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "<0.15");
    countUp(tl, stats[0], 38, "<", 1.1);
    countUp(tl, stats[1], 1240, "<", 1.4);
    countUp(tl, stats[2], 98, "<", 1.2);
    tl.to(q("[data-card]"), { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }, "<0.2");

    // カーソルで施工事例へ
    tl.to(q("[data-cursor]"), { opacity: 1, duration: 0.3 }, "+=0.2").to(q("[data-cursor]"), { x: 520, y: 220, duration: 0.9, ease: "power3.inOut" }, "<");
    tl.to(
      q("[data-cursor]"),
      { x: () => locate(root, q, "[data-link-works]").x, y: () => locate(root, q, "[data-link-works]").y, duration: 0.6, ease: "power3.inOut" },
      ">",
    ).to(q("[data-underline]"), { scaleX: 1, duration: 0.3, ease: "power2.out" }, ">-0.1");
    clickAt(tl, root, q, "[data-link-works]", ">0.15", 0.2);

    // ページがスクロール
    tl.to(q("[data-page]"), { y: () => -((q("[data-page]")[0] as HTMLElement).offsetHeight - (MOCK_H - 40)), duration: 1.3, ease: "power3.inOut" }, ">0.05")
      .to(q("[data-underline]"), { scaleX: 0, duration: 0.2 }, "<")
      .to(q("[data-tile]"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "<0.6");

    // 事例にホバー
    tl.to(
      q("[data-cursor]"),
      { x: () => locate(root, q, "[data-tile='1']", 0.55, 0.45).x, y: () => locate(root, q, "[data-tile='1']", 0.55, 0.45).y, duration: 0.8, ease: "power3.inOut" },
      ">0.1",
    )
      .to(q("[data-tile='1'] [data-tile-img]"), { scale: 1.06, duration: 0.6, ease: "power2.out" }, ">-0.15")
      .to(q("[data-tile='1'] [data-tile-more]"), { opacity: 1, y: 0, duration: 0.3 }, "<");

    // お問い合わせが届く
    tl.to(q("[data-toast]"), { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, ">0.3");
    countUp(tl, q("[data-toast-count]")[0], 3, "<0.2", 0.8, 1);
    tl.to({}, { duration: 1.6 });
  });

  return (
    <div ref={root} className="relative select-none font-sans text-ink" style={{ width: MOCK_W, height: MOCK_H }} aria-hidden="true">
      <BrowserChrome url="aoba-komuten.jp">
        <div data-page className="absolute inset-x-0 top-0">
          {/* ナビ */}
          <div data-nav className="flex h-14 items-center justify-between border-b border-line-soft bg[#ccd1d3] px-6">
            <div className="flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 26 26">
                <path d="M3 12L13 4l10 8v10H3z" fill="#154245" />
                <path d="M10 22v-6h6v6" fill="#3cc3c4" />
              </svg>
              <div className="leading-none">
                <p className="text-[13px] font-semibold tracking-[0.12em]">青葉工務店</p>
                <p className="en mt-1 text-[8px] tracking-[0.2em] text-ink-mute">AOBA KOMUTEN</p>
              </div>
            </div>
            <div className="flex items-center gap-5 text-[11px] text-ink-soft">
              <span>会社案内</span>
              <span data-link-works className="relative">
                施工事例
                <span data-underline className="absolute -bottom-1 left-0 h-px w-full origin-left bg-brand-deep" />
              </span>
              <span>家づくりの流れ</span>
              <span>採用情報</span>
              <span className="rounded-full bg-brand-deep px-3.5 py-1.5 text-paper">無料相談</span>
            </div>
          </div>

          {/* キービジュアル */}
          <div className="relative h-[292px] overflow-hidden">
            <div data-hero-bg className="absolute inset-0 bg-[linear-gradient(115deg,#0d1f22_0%,#154245_55%,#0a7a83_100%)]" />
            <svg viewBox="0 0 760 292" className="absolute inset-0 h-full w-full">
              <circle data-sun cx="610" cy="96" r="30" fill="#3cc3c4" opacity="0.85" />
              <g fill="none" stroke="#e2f3f4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
                <path data-draw strokeDasharray="600" d="M360 260 H740" />
                <path data-draw strokeDasharray="600" d="M420 260 V180 L490 130 L560 180 V260" />
                <path data-draw strokeDasharray="600" d="M560 260 V200 L620 158 L680 200 V260" />
                <path data-draw strokeDasharray="600" d="M470 260 V220 H510 V260 M590 220 H650 V242 H590 Z" />
                <path data-draw strokeDasharray="600" d="M440 190 H470 V210 H440 Z M520 190 H545 V210 H520 Z" />
                <path data-draw strokeDasharray="600" d="M380 260 C380 235 395 220 400 260 M700 260 C702 230 720 226 718 260" />
              </g>
              <g opacity="0.25">
                <rect x="-40" y="190" width="420" height="16" rx="8" fill="#3cc3c4" transform="rotate(-24 170 198)" />
              </g>
            </svg>
            <div className="relative px-8 pt-8 text-paper">
              <p data-hero-sub className="en text-[10px] tracking-[0.24em] text-brand-light">SINCE 1987 / YOKOHAMA</p>
              <h3 data-h1 className="mt-4 text-[27px] font-medium leading-[1.5] tracking-[0.12em]">
                <span className="block overflow-hidden">
                  <span className="block">地域の暮らしを、</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block">確かな技術で支える。</span>
                </span>
              </h3>
              <p data-hero-sub className="mt-3 text-[11px] leading-[1.9] text-paper/75">
                横浜で38年。新築からリフォームまで、
                <br />
                一棟一棟に向き合う工務店です。
              </p>
              <div data-stats className="mt-5 flex gap-8">
                {[
                  ["創業", "38", "年"],
                  ["施工実績", "1,240", "件"],
                  ["お客様満足度", "98", "%"],
                ].map(([l, n, u]) => (
                  <div key={l}>
                    <p className="text-[9px] text-paper/60">{l}</p>
                    <p className="en mt-0.5 text-[22px] font-light leading-none">
                      <span data-stat>{n}</span>
                      <span className="ml-0.5 font-sans text-[10px]">{u}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* サービス */}
          <div className="bg[#ccd1d3] px-8 py-7">
            <p className="en text-[10px] tracking-[0.2em] text-brand-deep">SERVICE</p>
            <div className="mt-3 grid grid-cols-3 gap-4">
              {[
                ["新築注文住宅", "家族の暮らしに合わせた、世界にひとつの住まい。"],
                ["リノベーション", "住み慣れた家を、これからの暮らしに合わせて。"],
                ["外構・エクステリア", "庭や駐車場まで、住まいの印象を整えます。"],
              ].map(([t, d], i) => (
                <div key={t} data-card className="rounded-xl border border-line-soft p-4">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-wash">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0a7a83" strokeWidth="1.5">
                      {i === 0 && <path d="M2 8l6-5 6 5v6H2z" />}
                      {i === 1 && <path d="M3 13l7-7 3 3-7 7H3zM9 4l3 3" />}
                      {i === 2 && <path d="M2 13h12M4 13V8M8 13V5M12 13V9" />}
                    </svg>
                  </div>
                  <p className="mt-3 text-[12px] font-semibold tracking-[0.06em]">{t}</p>
                  <p className="mt-1.5 text-[10px] leading-[1.7] text-ink-mute">{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 施工事例 */}
          <div className="bg-mist px-8 pb-10 pt-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="en text-[10px] tracking-[0.2em] text-brand-deep">WORKS</p>
                <p className="mt-1 text-[16px] font-semibold tracking-[0.08em]">施工事例</p>
              </div>
              <p className="text-[10px] text-ink-mute">すべて見る</p>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[
                ["港北区 S様邸", "新築注文住宅", ["#c9dfe0", "#8fb9bb"]],
                ["青葉区 K様邸", "リノベーション", ["#e7dccb", "#c7b08e"]],
                ["都筑区 M様邸", "新築注文住宅", ["#d6e0e8", "#9fb4c7"]],
                ["緑区 T様邸", "外構工事", ["#d9e6d6", "#a5c09f"]],
              ].map(([name, kind, [a, b]], i) => (
                <div key={name as string} data-tile={i} className="overflow-hidden rounded-xl bg[#ccd1d3]">
                  <div className="relative h-[92px] overflow-hidden">
                    <svg data-tile-img viewBox="0 0 160 92" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
                      <defs>
                        <linearGradient id={`tile-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor={a as string} />
                          <stop offset="1" stopColor={b as string} />
                        </linearGradient>
                      </defs>
                      <rect width="160" height="92" fill={`url(#tile-${i})`} />
                      <path d={i % 2 ? "M30 92V50l45-30 45 30v42z" : "M20 92V44h70V30l40 18v44z"} fill="#e3e8ea" opacity="0.85" />
                      <path d={i % 2 ? "M62 92V68h26v24" : "M40 60h22v16H40zM96 58h20v34H96z"} fill={b as string} opacity="0.7" />
                      <rect x="0" y="84" width="160" height="8" fill="#e3e8ea" opacity="0.4" />
                    </svg>
                    <span data-tile-more className="absolute inset-x-2 bottom-2 rounded-md bg-ink/80 py-1 text-center text-[9px] text-paper">
                      詳しく見る
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[10px] font-semibold">{name as string}</p>
                    <p className="text-[9px] text-ink-mute">{kind as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* お問い合わせの通知 */}
        <div data-toast className="absolute bottom-5 right-5 z-20 flex w-[230px] items-center gap-3 rounded-xl bg[#ccd1d3] p-3.5 shadow-[0_20px_40px_-12px_rgba(13,31,34,0.4)] ring-1 ring-line-soft">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-deep">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.5">
              <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
              <path d="M2.5 4.5L8 9l5.5-4.5" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold">新しいお問い合わせ</p>
            <p className="text-[10px] text-ink-mute">施工事例ページから</p>
          </div>
          <span className="en ml-auto grid h-6 min-w-6 place-items-center rounded-full bg-[#e9533f] px-1.5 text-[11px] font-semibold text-paper">
            <span data-toast-count>3</span>
          </span>
        </div>
      </BrowserChrome>
      <Cursor />
    </div>
  );
}
