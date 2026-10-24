"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * 横に流れ続ける文字の帯。
 * スクロールの速さに合わせて加速し、スクロールの向きで流れる向きも変わる。
 */
export function Marquee({
  children,
  speed = 40,
  direction = 1,
  className = "",
  reactive = true,
}: {
  children: ReactNode;
  /** 1周にかかる秒数 */
  speed?: number;
  direction?: 1 | -1;
  className?: string;
  /** スクロールの速さに反応させるか */
  reactive?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const track = root.current!.querySelector("[data-track]") as HTMLElement;
      const tween = gsap.fromTo(
        track,
        { xPercent: direction === 1 ? 0 : -50 },
        { xPercent: direction === 1 ? -50 : 0, duration: speed, ease: "none", repeat: -1 },
      );
      if (!reactive) return;
      let base = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          base = self.direction === 1 ? 1 : -1;
          const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 400);
          gsap.to(tween, { timeScale: base * boost, duration: 0.2, overwrite: true });
          gsap.to(tween, { timeScale: base, duration: 1.2, delay: 0.2, ease: "power2.out" });
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`} aria-hidden="true">
      <div data-track className="flex w-max whitespace-nowrap will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}

/** 背景に薄く横へ流れる大きな英字 */
export function BgWords({ words, tone = "light", className = "" }: { words: string; tone?: "light" | "dark" | "mint"; className?: string }) {
  const color =
    tone === "dark"
      ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)]"
      : tone === "mint"
        ? "text-[#e6f2f3]"
        : "text-[#f3f6f7]";
  return (
    <Marquee speed={60} className={`pointer-events-none absolute inset-x-0 select-none ${className}`}>
      <span className={`display-en block !pb-0 pr-[0.35em] text-[clamp(7rem,17vw,16rem)] leading-none ${color}`}>{words}</span>
    </Marquee>
  );
}
