"use client";

import { useRef } from "react";
import { BrowserChrome, clickAt, countUp, Cursor, MOCK_H, MOCK_W, useMockLoop } from "./kit";

const people = [
  { name: "佐藤 拓海", role: "施工管理 / 入社3年目", quote: "現場をまとめる面白さに気づいた。", c: ["#069fa9", "#154245"] },
  { name: "高橋 美咲", role: "設計 / 入社5年目", quote: "お客様の「ありがとう」が原動力。", c: ["#3cc3c4", "#0a7a83"] },
  { name: "中村 蓮", role: "大工 / 入社2年目", quote: "一生ものの技術が身につく。", c: ["#154245", "#0d1f22"] },
  { name: "伊藤 さくら", role: "事務 / 入社4年目", quote: "現場を支える仕事に誇りがある。", c: ["#0a7a83", "#3cc3c4"] },
];

const jobs = [
  ["施工管理", "正社員・経験者歓迎", "月給 28万円〜"],
  ["大工（見習いから）", "正社員・未経験OK", "月給 23万円〜"],
  ["設計・積算", "正社員", "月給 26万円〜"],
];

const bars = [22, 30, 26, 48, 70, 92];

/**
 * モック②：採用サイトで、働く人を知り、応募が届くまで。
 * 見出し → 社員の写真が広がる → 社員インタビューが流れる → 求人一覧 → 応募フォームに入力 → 応募完了
 * 右下では、公開後に応募が増えていくグラフが伸びる。
 */
export function RecruitMock({ active = true }: { active?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useMockLoop(root, active, (tl, q) => {
    tl.set(q("[data-url]"), { clipPath: "inset(0 100% 0 0)" }, 0)
      .set(q("[data-load]"), { scaleX: 0, opacity: 1 }, 0)
      .set(q("[data-rh] > span > span"), { yPercent: 115 }, 0)
      .set(q("[data-rfade]"), { opacity: 0, y: 12 }, 0)
      .set(q("[data-portrait]"), { opacity: 0, rotate: 0, x: 0, y: 30 }, 0)
      .set(q("[data-track]"), { x: 0 }, 0)
      .set(q("[data-person]"), { opacity: 0, y: 16 }, 0)
      .set(q("[data-rpage]"), { y: 0 }, 0)
      .set(q("[data-job]"), { opacity: 0, x: -16 }, 0)
      .set(q("[data-modal]"), { opacity: 0 }, 0)
      .set(q("[data-sheet]"), { y: 40, opacity: 0 }, 0)
      .set(q("[data-type]"), { clipPath: "inset(0 100% 0 0)" }, 0)
      .set(q("[data-select]"), { opacity: 0 }, 0)
      .set(q("[data-done]"), { opacity: 0, scale: 0.9 }, 0)
      .set(q("[data-check]"), { strokeDashoffset: 40 }, 0)
      .set(q("[data-form]"), { opacity: 1 }, 0)
      .set(q("[data-panel]"), { opacity: 0, y: 30 }, 0)
      .set(q("[data-bar]"), { scaleY: 0, transformOrigin: "50% 100%" }, 0)
      .set(q("[data-new]"), { opacity: 0, scale: 0.6 }, 0)
      .set(q("[data-cursor]"), { x: 520, y: 460, opacity: 0 }, 0);

    tl.to(q("[data-url]"), { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "steps(22)" }, 0.2)
      .to(q("[data-load]"), { scaleX: 1, duration: 0.6, ease: "power2.inOut" })
      .to(q("[data-load]"), { opacity: 0, duration: 0.2 })
      .to(q("[data-rh] > span > span"), { yPercent: 0, duration: 1, stagger: 0.14, ease: "expo.out" }, "<-0.1")
      .to(q("[data-rfade]"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "<0.3")
      // 社員の写真が扇のように広がる
      .to(q("[data-portrait]"), { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }, "<-0.2")
      .to(q("[data-portrait='0']"), { rotate: -8, x: -58, duration: 0.8, ease: "back.out(1.4)" }, ">-0.2")
      .to(q("[data-portrait='2']"), { rotate: 8, x: 58, duration: 0.8, ease: "back.out(1.4)" }, "<")
      // 解析パネル
      .to(q("[data-panel]"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "<0.2")
      .to(q("[data-bar]"), { scaleY: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }, "<0.2");
    countUp(tl, q("[data-apps]")[0], 4, "<", 0.6, 0);

    // ページをスクロールして社員インタビューへ
    tl.to(q("[data-rpage]"), { y: -236, duration: 1.2, ease: "power3.inOut" }, "+=0.3")
      .to(q("[data-person]"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "<0.5")
      .to(q("[data-track]"), { x: -168, duration: 1.1, ease: "power3.inOut" }, "+=0.4")
      .to(q("[data-rpage]"), { y: () => -((q("[data-rpage]")[0] as HTMLElement).offsetHeight - 430), duration: 1.1, ease: "power3.inOut" }, "+=0.2")
      .to(q("[data-job]"), { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "<0.5");

    // 応募する
    tl.to(q("[data-cursor]"), { opacity: 1, duration: 0.3 }, ">0.1");
    clickAt(tl, root, q, "[data-apply='0']", "<", 0.9);
    tl.to(q("[data-modal]"), { opacity: 1, duration: 0.25 }, ">-0.05")
      .to(q("[data-sheet]"), { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "<")
      .to(q("[data-type='name']"), { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "steps(5)" }, ">0.1")
      .to(q("[data-type='tel']"), { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "steps(13)" }, ">0.15")
      .to(q("[data-select]"), { opacity: 1, duration: 0.2 }, ">0.1");
    clickAt(tl, root, q, "[data-submit]", ">0.1", 0.6);
    tl.to(q("[data-form]"), { opacity: 0, duration: 0.25 }, ">")
      .to(q("[data-done]"), { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, ">")
      .to(q("[data-check]"), { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, "<0.15")
      // 応募数が増える
      .to(q("[data-new]"), { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, "<0.2");
    countUp(tl, q("[data-apps]")[0], 17, "<", 1.2, 4);
    tl.to(q("[data-bar='5']"), { scaleY: 1.22, duration: 0.6, ease: "back.out(2)" }, "<0.2");
    tl.to(q("[data-cursor]"), { opacity: 0, duration: 0.4 }, ">0.6").to({}, { duration: 1.4 });
  });

  return (
    <div ref={root} className="relative select-none font-sans text-ink" style={{ width: MOCK_W, height: MOCK_H }} aria-hidden="true">
      <div className="absolute left-0 top-0 h-[470px] w-[548px]">
        <BrowserChrome url="aoba-komuten.jp/recruit">
          <div data-rpage className="absolute inset-x-0 top-0">
            {/* ナビ */}
            <div className="flex h-12 items-center justify-between bg-[#ccd1d3] px-5">
              <p className="text-[12px] font-semibold tracking-[0.12em]">
                青葉工務店 <span className="ml-1 text-[10px] font-medium text-brand-deep">採用サイト</span>
              </p>
              <div className="flex items-center gap-4 text-[10px] text-ink-soft">
                <span>仕事を知る</span>
                <span>人を知る</span>
                <span>募集要項</span>
                <span className="rounded-full bg-[#e9533f] px-3 py-1.5 font-semibold text-paper">エントリー</span>
              </div>
            </div>

            {/* キービジュアル */}
            <div className="relative h-[250px] overflow-hidden bg-[#dbdede] px-6 pt-8">
              <p data-rfade className="en text-[10px] tracking-[0.24em] text-brand-deep">RECRUIT 2027</p>
              <h3 data-rh className="mt-3 text-[30px] font-semibold leading-[1.35] tracking-[0.06em]">
                <span className="block overflow-hidden">
                  <span className="block">現場で、</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block">一生ものの</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block">
                    技術を<span className="text-brand-deep">。</span>
                  </span>
                </span>
              </h3>
              <p data-rfade className="mt-3 text-[10px] leading-[1.8] text-ink-soft">
                未経験から、10年後も誇れる職人へ。
              </p>
              <div className="absolute right-14 top-8 h-[180px] w-[136px]">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    data-portrait={i}
                    className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_18px_30px_-14px_rgba(13,31,34,0.45)]"
                    style={{ zIndex: i === 1 ? 3 : 1 }}
                  >
                    <svg viewBox="0 0 150 190" className="h-full w-full">
                      <defs>
                        <linearGradient id={`pt-${i}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor={["#cfe9ea", "#bfe0e1", "#d8e4e6"][i]} />
                          <stop offset="1" stopColor={["#8fc7c9", "#5fb3b6", "#9fb8bd"][i]} />
                        </linearGradient>
                      </defs>
                      <rect width="150" height="190" fill={`url(#pt-${i})`} />
                      <circle cx="75" cy="84" r="27" fill="#dcc3b0" />
                      <path d="M44 80 Q75 40 106 80 L106 72 Q75 30 44 72 Z" fill={["#ffffff", "#f3c94a", "#ffffff"][i]} />
                      <rect x="42" y="74" width="66" height="8" rx="4" fill={["#e2e8ea", "#e0b230", "#e2e8ea"][i]} />
                      <path d="M24 190 Q30 128 75 124 Q120 128 126 190 Z" fill={["#154245", "#0a7a83", "#2a3948"][i]} />
                      <rect x="62" y="132" width="26" height="6" rx="3" fill="#3cc3c4" opacity="0.8" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* 社員インタビュー */}
            <div className="bg-[#ccd1d3] px-6 py-6">
              <div className="flex items-end justify-between">
                <p className="text-[14px] font-semibold tracking-[0.08em]">先輩の声</p>
                <p className="en text-[9px] tracking-[0.2em] text-ink-mute">PEOPLE</p>
              </div>
              <div className="mt-3 overflow-hidden">
                <div data-track className="flex gap-3">
                  {people.map((p) => (
                    <div key={p.name} data-person className="w-[156px] shrink-0 overflow-hidden rounded-xl border border-line-soft">
                      <div className="relative h-[70px]" style={{ background: `linear-gradient(135deg, ${p.c[0]}, ${p.c[1]})` }}>
                        <span className="absolute -bottom-4 left-3 grid h-10 w-10 place-items-center rounded-full border-2 border-paper bg-[#dcc3b0] text-[12px] font-semibold text-ink">
                          {p.name[0]}
                        </span>
                      </div>
                      <div className="px-3 pb-3 pt-6">
                        <p className="text-[11px] font-semibold">{p.name}</p>
                        <p className="text-[9px] text-ink-mute">{p.role}</p>
                        <p className="mt-2 text-[10px] leading-[1.6]">「{p.quote}」</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 募集要項 */}
            <div className="bg-mist px-6 pb-8 pt-6">
              <p className="text-[14px] font-semibold tracking-[0.08em]">募集中の職種</p>
              <div className="mt-3 space-y-2">
                {jobs.map(([t, k, pay], i) => (
                  <div key={t} data-job className="flex items-center justify-between rounded-xl bg-[#ccd1d3] px-4 py-3">
                    <div>
                      <p className="text-[12px] font-semibold">{t}</p>
                      <p className="mt-0.5 text-[9px] text-ink-mute">
                        {k}　{pay}
                      </p>
                    </div>
                    <span data-apply={i} className="rounded-full bg-[#e9533f] px-3.5 py-1.5 text-[10px] font-semibold text-paper">
                      応募する
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 応募フォーム */}
          <div data-modal className="absolute inset-0 z-10 flex items-end justify-center bg-ink/40 pb-6">
            <div data-sheet className="relative w-[340px] rounded-2xl bg-[#ccd1d3] p-5 shadow-2xl">
              <div data-form>
                <p className="text-[13px] font-semibold">エントリー：施工管理</p>
                <div className="mt-3 space-y-2.5 text-[10px]">
                  <div>
                    <p className="text-ink-mute">お名前</p>
                    <div className="mt-1 h-8 rounded-lg border border-line px-3 leading-8">
                      <span data-type="name" className="inline-block whitespace-nowrap">
                        山本 大輝
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-ink-mute">電話番号</p>
                    <div className="mt-1 h-8 rounded-lg border border-line px-3 leading-8">
                      <span data-type="tel" className="en inline-block whitespace-nowrap">
                        090-1234-5678
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-ink-mute">面談の希望日</p>
                    <div className="mt-1 flex gap-1.5">
                      {["11/2（土）", "11/5（火）", "11/9（土）"].map((d, i) => (
                        <span key={d} className="relative rounded-lg border border-line px-2.5 py-1.5">
                          {d}
                          {i === 1 && <span data-select className="absolute inset-0 grid place-items-center rounded-lg bg-brand-deep text-paper">{d}</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span data-submit className="mt-4 block rounded-full bg-[#e9533f] py-2.5 text-center text-[11px] font-semibold text-paper">
                  この内容で応募する
                </span>
              </div>
              <div data-done className="absolute inset-0 grid place-items-center rounded-2xl bg-[#ccd1d3] text-center">
                <div>
                  <svg width="54" height="54" viewBox="0 0 54 54" className="mx-auto">
                    <circle cx="27" cy="27" r="25" fill="#cbdbdc" />
                    <path data-check d="M16 28l7 7 15-15" fill="none" stroke="#0a7a83" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" />
                  </svg>
                  <p className="mt-3 text-[13px] font-semibold">応募が完了しました</p>
                  <p className="mt-1 text-[10px] text-ink-mute">面談の日程は、担当よりご連絡します。</p>
                </div>
              </div>
            </div>
          </div>
        </BrowserChrome>
      </div>

      {/* 応募数のパネル */}
      <div data-panel className="absolute bottom-6 right-0 z-20 w-[200px] rounded-2xl bg-[#ccd1d3] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold">今月の応募数</p>
          <span data-new className="en rounded-full bg-[#e4d4d4] px-2 py-0.5 text-[10px] font-semibold text-[#c2362f]">New</span>
        </div>
        <p className="en mt-1 text-[34px] font-light leading-none">
          <span data-apps>17</span>
          <span className="ml-1 font-sans text-[12px]">件</span>
        </p>
        <div className="mt-3 flex h-[78px] items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                data-bar={i}
                className={`w-full rounded-t-[4px] ${i >= 3 ? "bg-[linear-gradient(180deg,#3cc3c4,#0a7a83)]" : "bg-line"}`}
                style={{ height: `${h * 0.75}px` }}
              />
              <span className="en text-[8px] text-ink-mute">{["5月", "6月", "7月", "8月", "9月", "10月"][i]}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[9px] text-ink-mute">
          <span className="h-2 w-2 rounded-sm bg-brand" />
          採用サイト公開後（イメージ）
        </p>
      </div>
      <Cursor />
    </div>
  );
}
