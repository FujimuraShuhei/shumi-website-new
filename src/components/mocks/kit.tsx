"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

gsap.registerPlugin(useGSAP);

export type Q = (selector: string) => Element[];

/** モックの設計サイズ（この大きさで作り、表示幅に合わせて縮小する） */
export const MOCK_W = 760;
export const MOCK_H = 500;

/**
 * モックの中の要素の位置（設計サイズ基準）を返す。カーソルを要素の上へ動かすときに使う。
 */
export function locate(root: RefObject<HTMLElement | null>, q: Q, selector: string, fx = 0.5, fy = 0.5) {
  const r = root.current!.getBoundingClientRect();
  const s = r.width / root.current!.offsetWidth || 1;
  const el = q(selector)[0];
  if (!el) return { x: 0, y: 0 };
  const e = el.getBoundingClientRect();
  return { x: (e.left - r.left + e.width * fx) / s, y: (e.top - r.top + e.height * fy) / s };
}

/**
 * ループ再生するタイムラインを作る。active のときだけ再生し、それ以外は一時停止。
 * 「動きを減らす」設定のときは完成した状態で止める。
 */
export function useMockLoop(
  root: RefObject<HTMLElement | null>,
  active: boolean,
  build: (tl: gsap.core.Timeline, q: Q) => void,
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [reduced, setReduced] = useState(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root) as Q;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReduced(reduce);
      const tl = gsap.timeline({ paused: true, repeat: reduce ? 0 : -1, repeatDelay: 1.4 });
      build(tl, q);
      tlRef.current = tl;
      if (reduce) tl.progress(1).pause();
      // 入れ替わった瞬間に空の画面が見えないよう、組み上がった状態から始める
      else tl.time(Math.min(2.4, tl.duration() * 0.3)).pause();
      return () => {
        tl.kill();
        tlRef.current = null;
      };
    },
    { scope: root },
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || reduced) return;
    if (active) tl.play();
    else tl.pause();
  }, [active, reduced]);
}

/** 表示中かどうか（スマホで、画面に入ったモックだけ動かすため） */
export function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** 設計サイズのモックを、親の幅に合わせて縮小して表示する */
export function MockScaler({ children, width = MOCK_W, height = MOCK_H, className = "" }: { children: ReactNode; width?: number; height?: number; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      if (e.contentRect.width) setScale(e.contentRect.width / width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={box} className={`relative w-full ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

/** ブラウザの枠。URL欄は data-url で文字が打たれ、data-load で読み込みバーが伸びる */
export function BrowserChrome({ url, children, tone = "light" }: { url: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[14px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.06)] ${
        tone === "dark" ? "bg-[#0b1a1d]" : "bg-paper"
      }`}
    >
      <div className={`relative flex h-10 shrink-0 items-center gap-3 px-4 ${tone === "dark" ? "bg-[#10272b]" : "bg-[#eef2f4]"}`}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c941]" />
        </div>
        <div className="mx-auto flex h-6 w-[340px] items-center gap-2 rounded-md bg-paper px-3 text-[11px] text-ink-mute">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <rect x="1.5" y="4.5" width="7" height="5" rx="1" fill="#6a7682" />
            <path d="M3 4.5V3a2 2 0 0 1 4 0v1.5" fill="none" stroke="#6a7682" />
          </svg>
          <span data-url className="en inline-block overflow-hidden whitespace-nowrap">
            {url}
          </span>
        </div>
        <span data-load className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-brand" />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/** 疑似カーソル（矢印＋クリック時の波紋） */
export function Cursor() {
  return (
    <div data-cursor className="pointer-events-none absolute left-0 top-0 z-50 opacity-0">
      <span data-ripple className="absolute -left-4 -top-4 h-8 w-8 rounded-full border-2 border-brand-light opacity-0" />
      <svg width="22" height="26" viewBox="0 0 22 26" className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]">
        <path d="M2 2l16 11.5-7 1.2 4.2 8.3-3 1.5-4.2-8.4L2 21z" fill="#ffffff" stroke="#0d1f22" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** カーソルで要素をクリックする動き */
export function clickAt(tl: gsap.core.Timeline, root: RefObject<HTMLElement | null>, q: Q, selector: string, position?: gsap.Position, duration = 0.8) {
  tl.to(
    q("[data-cursor]"),
    {
      x: () => locate(root, q, selector).x,
      y: () => locate(root, q, selector).y,
      duration,
      ease: "power3.inOut",
    },
    position,
  )
    .to(q("[data-cursor] svg"), { scale: 0.82, duration: 0.08, transformOrigin: "0 0" })
    .fromTo(q("[data-ripple]"), { scale: 0.3, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.45, ease: "power2.out" }, "<")
    .to(q("[data-cursor] svg"), { scale: 1, duration: 0.12 }, "<0.08");
  return tl;
}

/** 数字を数え上げる */
export function countUp(tl: gsap.core.Timeline, el: Element | undefined, to: number, position?: gsap.Position, duration = 1.2, from = 0) {
  if (!el) return tl;
  const o = { v: from };
  const fmt = new Intl.NumberFormat("ja-JP");
  tl.fromTo(
    o,
    { v: from },
    {
      v: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = fmt.format(Math.round(o.v));
      },
      onStart: () => {
        el.textContent = fmt.format(from);
      },
    },
    position,
  );
  return tl;
}
