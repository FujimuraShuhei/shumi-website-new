"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppMock } from "@/components/mocks/AppMock";
import { BrandSiteMock } from "@/components/mocks/BrandSiteMock";
import { MockScaler, useInView } from "@/components/mocks/kit";
import { RecruitMock } from "@/components/mocks/RecruitMock";
import { Button } from "@/components/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chapters = [
  {
    en: "Branding",
    label: "ブランディング",
    title: "ブランドの強みが伝わるホームページへ。",
    body: "会社の想いと強みを言葉にし、取引先やお客様に「選ばれる理由」をデザインで伝えます。",
  },
  {
    en: "Recruit",
    label: "採用サイト",
    title: "いい人が集まる採用サイトへ。",
    body: "働く人の声と仕事のリアルを届け、求人媒体だけでは出会えない人材とつなぎます。採用サイトは、会社の未来に直接効く投資です。",
  },
  {
    en: "Business app",
    label: "業務アプリ",
    title: "仕事が軽くなる業務アプリへ。",
    body: "日報、案件管理、写真台帳をひとつの画面に。集まった人が、本来の仕事に力を注げる環境をつくります。",
  },
];

function Mock({ index, active }: { index: number; active: boolean }) {
  if (index === 0) return <BrandSiteMock active={active} />;
  if (index === 1) return <RecruitMock active={active} />;
  return <AppMock active={active} />;
}

function Intro({ as: Tag = "h1" }: { as?: "h1" | "p" }) {
  return (
    <>
      <p className="flex items-center gap-4 text-[12px] font-bold tracking-[0.14em] text-brand-light">
        <span aria-hidden="true" className="h-px w-8 bg-brand-light" />
        横浜市のブランディング・ホームページ制作
      </p>
      <Tag className="mt-6 text-[2.5rem] font-black leading-[1.3] tracking-[0.02em] text-paper sm:text-[3rem] lg:mt-[2.6vh] lg:text-[min(3.75rem,6.2vh)]">
        いい人と、
        <br />
        いい仕事が、
        <br />
        集まる会社へ。
      </Tag>
      <p className="mt-6 max-w-[30rem] text-[15px] leading-[2.05] text-paper/70 lg:mt-[2.6vh]">
        ブランディング、採用サイト、業務アプリ。Shumiは、関わった会社に「成果」として還元することを約束します。
      </p>
    </>
  );
}

/** 背景の光とブランドの帯（画面に固定され、スクロールしても動かない） */
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

function Ctas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button href="/contact/" variant="light">
        無料で相談する
      </Button>
      <Button href="/works/" variant="ghost">
        制作実績を見る
      </Button>
    </div>
  );
}

/** スマホ・動きを減らす設定のとき：章ごとに縦に並べ、画面に入ったモックだけ動かす */
function StaticChapter({ index, children }: { index: number; children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const c = chapters[index];
  return (
    <div ref={ref} className="border-t border-paper/10 pt-12">
      <p className="label-en text-[13px] text-brand-light">
        {String(index + 1).padStart(2, "0")} — {c.en}
      </p>
      <h2 className="mt-3 text-xl leading-[1.7] tracking-[0.06em] text-paper sm:text-2xl">{c.title}</h2>
      <p className="mt-4 max-w-xl text-[15px] leading-[2.05] text-paper/70">{c.body}</p>
      <div className="mt-8">
        <MockScaler>
          <Mock index={index} active={inView} />
        </MockScaler>
      </div>
      {children}
    </div>
  );
}

/**
 * トップのファーストビュー。
 * 夜色の背景で、スクロールに合わせて「ブランディング → 採用サイト → 業務アプリ」の3章が切り替わる。
 * 右側のモックは、それぞれが自動で操作されているように動き続ける。
 */
export function HomeStory() {
  const root = useRef<HTMLElement>(null);
  // auto：画面幅で切り替え（PCは演出、スマホは縦並び）。static：動きを減らす設定のときは常に縦並び
  const [mode, setMode] = useState<"auto" | "static">("auto");
  const [desktop, setDesktop] = useState(false);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      setMode(reduce.matches ? "static" : "auto");
      setDesktop(wide.matches && !reduce.matches);
    };
    apply();
    reduce.addEventListener("change", apply);
    wide.addEventListener("change", apply);
    return () => {
      reduce.removeEventListener("change", apply);
      wide.removeEventListener("change", apply);
    };
  }, []);

  useGSAP(
    () => {
      if (!desktop) return;
      const q = gsap.utils.selector(root);
      const mocks = q("[data-stage-mock]");
      const texts = q("[data-chapter]");

      // 背景は動かさず、右側の画面だけが上下にすっと入れ替わる
      const front = { yPercent: 0, scale: 1, opacity: 1 };
      const leave = { yPercent: -8, scale: 0.97, opacity: 0 };
      const enter = { yPercent: 10, scale: 0.98, opacity: 0 };

      gsap.set(mocks[0], front);
      gsap.set([mocks[1], mocks[2]], enter);
      gsap.set(texts[0], { opacity: 1, y: 0 });
      gsap.set([texts[1], texts[2]], { opacity: 0, y: 30 });
      gsap.set(q("[data-fill]"), { scaleX: 0, transformOrigin: "left center" });
      gsap.set(q("[data-fill='0']"), { scaleX: 1 });

      // 読み込み時の入り
      gsap.from(q("[data-in]"), { opacity: 0, y: 24, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.1 });
      gsap.from(q("[data-stage]"), { opacity: 0, y: 40, scale: 0.97, duration: 1.4, ease: "expo.out", delay: 0.25 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        },
      });

      tl.to({}, { duration: 0.8 })
        // 1 → 2
        .to(mocks[0], { ...leave, duration: 0.7, ease: "power2.in" })
        .to(mocks[1], { ...front, duration: 0.9, ease: "power3.out" }, "<0.45")
        .to(texts[0], { opacity: 0, y: -30, duration: 0.5 }, "<")
        .to(texts[1], { opacity: 1, y: 0, duration: 0.5 }, "<0.45")
        .to(q("[data-fill='1']"), { scaleX: 1, duration: 1 }, "<-0.45")
        .to({}, { duration: 1 })
        // 2 → 3
        .to(mocks[1], { ...leave, duration: 0.7, ease: "power2.in" })
        .to(mocks[2], { ...front, duration: 0.9, ease: "power3.out" }, "<0.45")
        .to(texts[1], { opacity: 0, y: -30, duration: 0.5 }, "<")
        .to(texts[2], { opacity: 1, y: 0, duration: 0.5 }, "<0.45")
        .to(q("[data-fill='2']"), { scaleX: 1, duration: 1 }, "<-0.45")
        .to({}, { duration: 0.9 });
    },
    { scope: root, dependencies: [desktop], revertOnUpdate: true },
  );

  return (
    <section ref={root} data-header-dark aria-label="Shumiについて" className={`relative overflow-x-clip bg-[#0d1f22] ${mode === "static" ? "" : "lg:h-[400vh]"}`}>
      <div
        className={`${mode === "static" ? "hidden" : "hidden lg:flex"} sticky top-20 h-[calc(100svh-80px)] items-center overflow-hidden xl:top-[88px] xl:h-[calc(100svh-88px)]`}
      >
          <HeroBackdrop />
          <div className="wrap relative grid w-full grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-10 pb-[10vh] pt-[4vh]">
            <div>
              <div data-in>
                <Intro as={desktop ? "h1" : "p"} />
              </div>
              <div data-in className="relative mt-[4.5vh] h-[min(11rem,20vh)] [@media(max-height:820px)]:h-[5.25rem]">
                {chapters.map((c, i) => (
                  <div key={c.en} data-chapter className="absolute inset-0" aria-hidden={active !== i}>
                    <p className="label-en text-[13px] text-brand-light">
                      {String(i + 1).padStart(2, "0")} / 03　{c.en}
                    </p>
                    <h2 className="mt-3 text-[1.375rem] leading-[1.6] tracking-[0.06em] text-paper">{c.title}</h2>
                    <p className="mt-2 max-w-[28rem] text-[14px] leading-[1.95] text-paper/65 [@media(max-height:820px)]:hidden">{c.body}</p>
                  </div>
                ))}
              </div>
              <div data-in aria-hidden="true" className="mt-[1.5vh] grid max-w-[28rem] grid-cols-3 gap-3">
                {chapters.map((c, i) => (
                  <div key={c.en}>
                    <div className="h-[3px] overflow-hidden rounded-full bg-paper/15">
                      <div data-fill={i} className="h-full rounded-full bg-[linear-gradient(90deg,#3cc3c4,#6ab8e2)]" />
                    </div>
                    <p className={`mt-2 text-[11px] tracking-[0.08em] transition-colors ${active === i ? "text-paper" : "text-paper/45"}`}>{c.label}</p>
                  </div>
                ))}
              </div>
              <div data-in className="mt-[4.5vh]">
                <Ctas />
              </div>
            </div>

            <div data-stage className="relative [perspective:1600px]">
              <div className="relative aspect-[760/500] w-full">
                {[0, 1, 2].map((i) => (
                  <div key={i} data-stage-mock className="absolute inset-0 will-change-transform" style={{ zIndex: i + 1 }}>
                    <MockScaler>
                      <Mock index={i} active={desktop && active === i} />
                    </MockScaler>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>

      <div className={`${mode === "static" ? "" : "lg:hidden"} relative overflow-hidden`}>
        <HeroBackdrop />
        <div className="wrap relative pb-24 pt-16 md:pb-32 md:pt-24">
          <Intro as={desktop ? "p" : "h1"} />
          <div className="mt-10">
            <Ctas />
          </div>
          <div className="mt-20 space-y-20">
            {chapters.map((c, i) => (
              <StaticChapter key={c.en} index={i}>
                {null}
              </StaticChapter>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
