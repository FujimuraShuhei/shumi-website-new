"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Button } from "@/components/ui";
import { IconBadge, type IconName } from "@/components/ui/icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const inputs = ["紙の日報", "Excelの工程表", "FAX・発注書", "電話メモ", "スマホの写真"];
const outputs = ["ダッシュボード", "自動で集計", "写真台帳", "チームで共有"];

const features: { icon: IconName; en: string; title: string; body: string }[] = [
  { icon: "sync", en: "Zero re-typing", title: "転記ゼロ", body: "入力はその場で1回だけ" },
  { icon: "mobile", en: "Mobile first", title: "現場から報告", body: "日報も写真もスマホで" },
  { icon: "chart", en: "Real-time", title: "いつでも最新", body: "会社の今が一画面に" },
  { icon: "lock", en: "Secure", title: "安全に共有", body: "権限ごとに見える範囲を" },
];

type Layout = "h" | "v";

/** 入口（散らかった仕事）→ 業務アプリ → 出口（整った仕事）の流れ図 */
function FlowDiagram({ layout }: { layout: Layout }) {
  const H = layout === "h";
  const W = H ? 1100 : 360;
  const Hh = H ? 470 : 820;
  const app = H ? { x: 550, y: 235 } : { x: 180, y: 420 };
  const inPts = inputs.map((_, i) =>
    H ? { x: 230, y: 55 + i * 90 } : { x: i % 2 === 0 ? 92 : 268, y: 40 + Math.floor(i / 2) * 78 + (i === 4 ? 0 : 0) },
  );
  if (!H) inPts[4] = { x: 180, y: 196 };
  const outPts = outputs.map((_, i) => (H ? { x: 880, y: 100 + i * 90 } : { x: i % 2 === 0 ? 92 : 268, y: 640 + Math.floor(i / 2) * 78 }));

  const inPath = (p: { x: number; y: number }) =>
    H
      ? `M${p.x} ${p.y} C ${p.x + 140} ${p.y}, ${app.x - 200} ${app.y}, ${app.x - 92} ${app.y}`
      : `M${p.x} ${p.y + 20} C ${p.x} ${p.y + 120}, ${app.x} ${app.y - 180}, ${app.x} ${app.y - 92}`;
  const outPath = (p: { x: number; y: number }) =>
    H
      ? `M${app.x + 92} ${app.y} C ${app.x + 200} ${app.y}, ${p.x - 140} ${p.y}, ${p.x} ${p.y}`
      : `M${app.x} ${app.y + 92} C ${app.x} ${app.y + 180}, ${p.x} ${p.y - 120}, ${p.x} ${p.y - 20}`;

  const chipW = H ? 180 : 156;
  const chipH = 40;

  return (
    <svg viewBox={`0 0 ${W} ${Hh}`} className="h-auto w-full overflow-visible" role="img" aria-labelledby={`flow-title-${layout}`}>
      <title id={`flow-title-${layout}`}>紙の日報、Excel、FAX、電話メモ、写真が業務アプリに集まり、ダッシュボード、自動集計、写真台帳、チームでの共有につながる図</title>
      <defs>
        <linearGradient id={`fd-app-${layout}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b8a95" />
          <stop offset="1" stopColor="#0b6f96" />
        </linearGradient>
        <linearGradient id={`fd-line-${layout}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3cc3c4" stopOpacity="0.15" />
          <stop offset="1" stopColor="#3cc3c4" stopOpacity="0.8" />
        </linearGradient>
        <filter id={`fd-glow-${layout}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* 線 */}
      <g fill="none" strokeWidth="1.5">
        {inPts.map((p, i) => (
          <path key={`i${i}`} id={`fd-in-${layout}-${i}`} data-fd-line data-fd-in-line d={inPath(p)} stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6" />
        ))}
        {outPts.map((p, i) => (
          <path key={`o${i}`} id={`fd-out-${layout}-${i}`} data-fd-line d={outPath(p)} stroke={`url(#fd-line-${layout})`} />
        ))}
      </g>

      {/* 流れるデータ */}
      <g data-fd-packets>
        {inPts.map((_, i) => (
          <circle key={`pi${i}`} r="3.5" fill="#ffffff" opacity="0.7">
            <animateMotion dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath href={`#fd-in-${layout}-${i}`} />
            </animateMotion>
          </circle>
        ))}
        {outPts.map((_, i) => (
          <circle key={`po${i}`} r="4.5" fill="#3cc3c4">
            <animateMotion dur="2.2s" begin={`${0.9 + i * 0.4}s`} repeatCount="indefinite">
              <mpath href={`#fd-out-${layout}-${i}`} />
            </animateMotion>
          </circle>
        ))}
      </g>

      {/* 入口：散らかった仕事 */}
      {inPts.map((p, i) => {
        const x = H ? p.x - chipW : p.x - chipW / 2;
        const y = H ? p.y - chipH / 2 : p.y - chipH / 2;
        const tilt = [-4, 3, -2, 5, -3][i];
        return (
          <g key={inputs[i]} data-fd-in transform={`rotate(${tilt} ${x + chipW / 2} ${y + chipH / 2})`}>
            <rect x={x} y={y} width={chipW} height={chipH} rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" strokeDasharray="3 4" />
            <text x={x + chipW / 2} y={y + 25} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="14" fontWeight="700" letterSpacing="1">
              {inputs[i]}
            </text>
          </g>
        );
      })}

      {/* 中央：業務アプリ */}
      <g data-fd-app>
        <circle cx={app.x} cy={app.y} r="110" fill="#0b8a95" opacity="0.35" filter={`url(#fd-glow-${layout})`} />
        <rect x={app.x - 92} y={app.y - 92} width="184" height="184" rx="36" fill={`url(#fd-app-${layout})`} stroke="rgba(255,255,255,0.25)" />
        <g transform={`translate(${app.x - 46} ${app.y - 58})`} fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="0" y="0" width="92" height="64" rx="10" fill="rgba(255,255,255,0.12)" />
          <path d="M14 46 L32 30 L46 40 L66 18 L78 26" />
          <path d="M14 16 h22" opacity="0.7" />
        </g>
        <text x={app.x} y={app.y + 42} textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="900" letterSpacing="2">
          業務アプリ
        </text>
        <text x={app.x} y={app.y + 64} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="700" letterSpacing="2">
          by Shumi
        </text>
      </g>

      {/* 出口：整った仕事 */}
      {outPts.map((p, i) => {
        const x = H ? p.x : p.x - chipW / 2;
        const y = p.y - 24;
        return (
          <g key={outputs[i]} data-fd-out>
            <rect x={x} y={y} width={H ? 200 : chipW} height="48" rx="12" fill="#eef1f2" />
            <circle cx={x + 24} cy={y + 24} r="9" fill="#e2f3f4" />
            <path d={`M${x + 19.5} ${y + 24.5} l3 3 6-6.5`} fill="none" stroke="#0a7a83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x={x + 42} y={y + 29.5} fill="#1d2a36" fontSize="14" fontWeight="800" letterSpacing="1">
              {outputs[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * 業務アプリで効率化することを強調するセクション。
 * 散らかった仕事が業務アプリに流れ込み、整った形で出ていく流れ図が、スクロールで組み上がる。
 */
export function AppEfficiency() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        q("[data-fd-line]").forEach((el) => {
          const len = (el as unknown as SVGPathElement).getTotalLength();
          gsap.set(el, { strokeDasharray: `${len}`, strokeDashoffset: len });
        });
        gsap.set(q("[data-fd-packets]"), { opacity: 0 });
        gsap.set(q("[data-fd-in]"), { opacity: 0, x: -30 });
        gsap.set(q("[data-fd-out]"), { opacity: 0, x: 30 });
        gsap.set(q("[data-fd-app]"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });

        q("[data-fd]").forEach((diagram) => {
          const d = gsap.utils.selector(diagram);
          gsap
            .timeline({ scrollTrigger: { trigger: diagram, start: "top 75%", once: true } })
            .to(d("[data-fd-in]"), { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" })
            .to(d("[data-fd-line]"), { strokeDashoffset: 0, duration: 1.1, stagger: 0.04, ease: "power2.inOut" }, "<0.3")
            .to(d("[data-fd-app]"), { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.6)" }, "<0.3")
            .to(d("[data-fd-out]"), { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "<0.4")
            // 入口の線は、描き終わったら点線に戻す
            .set(d("[data-fd-in-line]"), { strokeDasharray: "4 6", strokeDashoffset: 0 }, ">")
            .to(d("[data-fd-packets]"), { opacity: 1, duration: 0.6 }, "<");
        });

      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-header-dark aria-labelledby="efficiency-title" className="relative overflow-hidden bg-[#0c2026] pb-28 pt-20 text-paper md:pb-40 md:pt-28">
      {/* 動く方眼 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-[gridmove_14s_linear_infinite] bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(70%_70%_at_50%_45%,#000,transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[35%] h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(11,117,150,0.25),transparent)]" />

      <div className="wrap relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p aria-hidden="true" data-r="pop" className="mb-5 flex items-center gap-3">
              <span className="label-en grid h-9 min-w-9 place-items-center rounded-full bg-paper/10 px-2 text-[13px] text-brand-light ring-1 ring-paper/20">01</span>
              <span className="h-px w-10 bg-paper/25" />
            </p>
            <p aria-hidden="true" data-r="mask" className="display-en text-grad-light text-[clamp(2.75rem,7vw,5.5rem)]">
              Business app
            </p>
            <h2 id="efficiency-title" data-r="up" className="mt-6 text-[1.75rem] leading-[1.5] tracking-[0.03em] md:text-[2.75rem]">
              散らかった仕事を、
              <br />
              ひとつのアプリに。
            </h2>
          </div>
          <div>
            <p data-r="up" className="text-[15px] leading-[2.05] text-paper/75 md:text-base">
              紙・Excel・FAX・電話。バラバラの情報を業務アプリに集めて、自動でそろえます。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/app/" variant="light">
                業務アプリ開発を見る
              </Button>
              <Button href="/app/demo/" variant="ghost">
                デモを触る
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div data-fd className="hidden md:block">
            <FlowDiagram layout="h" />
          </div>
          <div data-fd className="mx-auto max-w-[400px] md:hidden">
            <FlowDiagram layout="v" />
          </div>
        </div>

        <ul className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:gap-4 lg:grid-cols-4">
          {features.map((f) => (
            <li key={f.en} data-r="pop" className="rounded-[24px] bg-paper/[0.05] p-5 ring-1 ring-paper/12 md:p-7">
              <IconBadge name={f.icon} tone="dark" />
              <p className="label-en mt-6 text-[11px] text-brand-light md:mt-7 md:text-[12px]">{f.en}</p>
              <h3 className="mt-1 text-[1.125rem] leading-[1.4] tracking-[0.02em] md:text-[1.5rem]">{f.title}</h3>
              <p className="mt-2 text-[12.5px] leading-[1.7] text-paper/70 md:text-[14px]">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
