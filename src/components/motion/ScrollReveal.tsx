"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * ページ全体のスクロール演出。属性を付けた要素だけが動く。
 * - data-r="up"    下からふわっと出る（近くの要素は順番に）
 * - data-r="mask"  大きな英字が下から切り出されるように出る
 * - data-r="pop"   ポンと弾むように、近くのものが順番に現れる
 * - data-r-draw    図解の線（SVG path）が描かれる
 * - data-r="line"  線が左から伸びる
 * - data-r-scrub   スクロール量に合わせて線が伸びる（進み具合の表現）
 * - data-cycle     循環図：矢印が描かれ、各項目が順に現れる
 * 画面に最初から見えている要素や、「動きを減らす」設定のときは何もしない。
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vh = window.innerHeight;
    const below = (el: Element) => el.getBoundingClientRect().top > vh * 0.92;

    const ctx = gsap.context(() => {
      const ups = gsap.utils.toArray<HTMLElement>('[data-r="up"]').filter(below);
      gsap.set(ups, { opacity: 0, y: 44 });
      ScrollTrigger.batch(ups, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.09, ease: "expo.out", overwrite: true }),
      });

      // ポンポンと順に現れる（図解の節点・カード）
      const pops = gsap.utils.toArray<HTMLElement>('[data-r="pop"]').filter(below);
      gsap.set(pops, { opacity: 0, scale: 0.86, y: 18 });
      ScrollTrigger.batch(pops, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.09, ease: "back.out(1.7)", overwrite: true }),
      });

      // 図解の線：左から順に描かれる
      // （線の種類や点線を崩さないよう、線を含む SVG ごと左から切り出す）
      const drawSvgs = new Set<SVGSVGElement>();
      gsap.utils.toArray<SVGElement>("[data-r-draw]").forEach((el) => {
        const svg = el.ownerSVGElement ?? (el as unknown as SVGSVGElement);
        if (below(svg)) drawSvgs.add(svg);
      });
      drawSvgs.forEach((svg) => {
        gsap.fromTo(
          svg,
          { clipPath: "inset(-20% 100% -20% 0)" },
          { clipPath: "inset(-20% 0% -20% 0)", duration: 1.1, ease: "power2.inOut", scrollTrigger: { trigger: svg, start: "top 85%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-r="mask"]').filter(below).forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", y: "35%" },
          { clipPath: "inset(0 0 -20% 0)", y: "0%", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-r="line"]').filter(below).forEach((el) => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>("[data-r-scrub]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 55%", scrub: 0.6 } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-cycle]").forEach((root) => {
        const q = gsap.utils.selector(root);
        const arcs = q("[data-cycle-arc]") as unknown as SVGPathElement[];
        arcs.forEach((a) => {
          const len = a.getTotalLength();
          gsap.set(a, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(q("[data-cycle-node]"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%", transformBox: "fill-box" });
        gsap.set(q("[data-cycle-core]"), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%", transformBox: "fill-box" });
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 75%", once: true } });
        tl.to(q("[data-cycle-core]"), { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" });
        q("[data-cycle-node]").forEach((n, i) => {
          tl.to(n, { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(2.2)" }, i === 0 ? ">-0.15" : ">-0.05");
          if (arcs[i]) tl.to(arcs[i], { strokeDashoffset: 0, duration: 0.28, ease: "power2.inOut" }, ">-0.1");
        });
        // 描き終わったら、リングの光が回り続ける
        tl.to(q("[data-cycle-spin]"), { opacity: 1, duration: 0.4 }).add(() => {
          gsap.to(q("[data-cycle-spin]"), { rotation: 360, transformOrigin: "50% 50%", transformBox: "view-box", duration: 6, ease: "none", repeat: -1 });
        });
      });
    });

    // 画像やフォントの読み込みで位置がずれるのを補正
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
