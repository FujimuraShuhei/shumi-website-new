"use client";

import { useEffect, useState } from "react";
import { AppMock } from "@/components/mocks/AppMock";
import { BrandSiteMock } from "@/components/mocks/BrandSiteMock";
import { MockScaler, useInView } from "@/components/mocks/kit";
import { RecruitMock } from "@/components/mocks/RecruitMock";
import { Button } from "@/components/ui";

const chapters = [
  {
    en: "Branding",
    label: "ブランディング",
    title: "ブランドの強みが伝わるホームページへ。",
    body: "会社の想いと強みを言葉にし、「選ばれる理由」をデザインで伝えます。",
  },
  {
    en: "Recruit",
    label: "採用サイト",
    title: "いい人が集まる採用サイトへ。",
    body: "働く人の声と仕事のリアルを届け、求人媒体だけでは出会えない人とつなぎます。",
  },
  {
    en: "Business app",
    label: "業務アプリ",
    title: "仕事が軽くなる業務アプリへ。",
    body: "日報・案件管理・写真台帳をひとつの画面に。本来の仕事に力を注げる環境をつくります。",
  },
];

/** 1章を見せる時間（秒）。この時間で次の章へ自動で切り替わる */
const CHAPTER_SECONDS = 9;

function Mock({ index, active }: { index: number; active: boolean }) {
  if (index === 0) return <BrandSiteMock active={active} />;
  if (index === 1) return <RecruitMock active={active} />;
  return <AppMock active={active} />;
}

/** 背景の光とブランドの帯（動かない） */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-[12%] -top-[20%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(closest-side,rgba(6,159,169,0.26),transparent)]" />
      <div className="absolute -bottom-[40%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(11,117,150,0.2),transparent)]" />
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-[0.07]">
        <g transform="rotate(-40 500 300)" fill="#3cc3c4">
          <rect x="200" y="250" width="900" height="70" rx="35" />
          <rect x="420" y="360" width="600" height="26" rx="13" />
        </g>
      </svg>
    </div>
  );
}

/**
 * トップのファーストビュー。
 * スクロールでは何も動かさない。「ブランディング → 採用サイト → 業務アプリ」は一定時間ごとに自動で切り替わり、
 * 下のタブを押せば好きな章をすぐに見られる。マウスを乗せている間・画面外にある間は止まる。
 */
export function HomeStory() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [reduce, setReduce] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const running = !reduce && !hovering && inView;
  const next = () => setActive((a) => (a + 1) % chapters.length);

  return (
    <section data-header-dark aria-label="Shumiについて" className="relative overflow-hidden bg-[#0d1f22]">
      <HeroBackdrop />
      <div ref={ref} className="wrap relative grid items-center gap-12 pb-20 pt-14 md:pb-24 lg:min-h-[calc(100svh-80px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:pb-[9vh] lg:pt-[5vh] xl:min-h-[calc(100svh-88px)]">
        {/* 左：メッセージ */}
        <div className="hero-in">
          <p className="flex items-center gap-4 text-[12px] font-bold tracking-[0.14em] text-brand-light">
            <span aria-hidden="true" className="h-px w-8 bg-brand-light" />
            横浜市のブランディング・ホームページ制作
          </p>
          <h1 className="mt-6 text-[2.5rem] font-black leading-[1.3] tracking-[0.02em] text-paper sm:text-[3rem] lg:text-[min(3.75rem,6.2vh)]">
            いい人と、
            <br />
            いい仕事が、
            <br />
            集まる会社へ。
          </h1>
          <p className="mt-6 max-w-[30rem] text-[15px] leading-[2.05] text-paper/70">
            ブランディング、採用サイト、業務アプリ。Shumiは、関わった会社に「成果」として還元することを約束します。
          </p>

          {/* 今の章の説明（切り替えはふんわりフェード） */}
          <div className="relative mt-10 grid">
            {chapters.map((c, i) => (
              <div
                key={c.en}
                aria-hidden={active !== i}
                className={`[grid-area:1/1] transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active === i ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                <p className="label-en text-[13px] text-brand-light">
                  {String(i + 1).padStart(2, "0")} / 03　{c.en}
                </p>
                <p className="mt-2 text-[1.25rem] font-black leading-[1.6] tracking-[0.04em] text-paper md:text-[1.375rem]">{c.title}</p>
                <p className="mt-1.5 max-w-[28rem] text-[14px] leading-[1.9] text-paper/65">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact/" variant="light">
              無料で相談する
            </Button>
            <Button href="/works/" variant="ghost">
              制作実績を見る
            </Button>
          </div>
        </div>

        {/* 右：自動で操作される画面と、章のタブ */}
        <div className="hero-in" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          <div className="relative aspect-[760/500] w-full">
            {chapters.map((c, i) => (
              <div
                key={c.en}
                aria-hidden={active !== i}
                className={`absolute inset-0 transition-[opacity,translate,scale] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active === i ? "z-10 translate-y-0 scale-100 opacity-100 delay-150" : "pointer-events-none z-0 translate-y-4 scale-[0.98] opacity-0"
                }`}
              >
                <MockScaler>
                  <Mock index={i} active={inView && active === i} />
                </MockScaler>
              </div>
            ))}
          </div>

          <div role="tablist" aria-label="Shumiの3つの仕事" className="mt-8 grid grid-cols-3 gap-3 lg:mt-10">
            {chapters.map((c, i) => (
              <button
                key={c.en}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className="group cursor-pointer rounded-xl px-1 py-2 text-left"
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-paper/15">
                  <span
                    key={`${i}-${active}`}
                    className={`block h-full origin-left rounded-full bg-[linear-gradient(90deg,#3cc3c4,#6ab8e2)] ${
                      active !== i ? "scale-x-0" : reduce ? "scale-x-100" : "animate-[hero-fill_linear_forwards]"
                    }`}
                    style={active === i && !reduce ? { animationDuration: `${CHAPTER_SECONDS}s`, animationPlayState: running ? "running" : "paused" } : undefined}
                    onAnimationEnd={active === i ? next : undefined}
                  />
                </span>
                <span
                  className={`mt-2.5 block text-[12px] font-bold tracking-[0.08em] transition-colors duration-500 ${
                    active === i ? "text-paper" : "text-paper/50 group-hover:text-paper/85"
                  }`}
                >
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
