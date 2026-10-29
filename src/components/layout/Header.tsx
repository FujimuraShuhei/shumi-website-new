"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav, site, type NavItem } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // 夜色のセクション（data-header-dark）の上にいる間は、ヘッダーも暗い配色にする
  const [dark, setDark] = useState(pathname === "/");
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // 閉じるアニメーションの間も中身を表示しておくため、最後に開いたメニューを覚えておく
  const lastMenu = useRef<NavItem | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const h = window.innerWidth >= 1280 ? 88 : 80;
      const zones = document.querySelectorAll("[data-header-dark]");
      let on = false;
      zones.forEach((z) => {
        const r = z.getBoundingClientRect();
        if (r.top <= h + 1 && r.bottom > h) on = true;
      });
      setDark(on);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const isCurrent = (href: string) => href !== "/" && pathname.startsWith(href.replace(/#.*$/, ""));

  // マウスが通り過ぎただけで開かないよう、少し待ってから開く
  const hoverOpen = (key: string) => {
    clearTimeout(closeTimer.current);
    clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setOpenMenu(key), openMenu ? 0 : 120);
  };
  const hoverClose = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 220);
  };

  const active = nav.find((n) => n.href === openMenu);
  if (active?.children) lastMenu.current = active;
  const panelOpen = Boolean(active?.children);
  // メニューを開いている間は明るい配色に戻す
  const isDark = dark && !openMenu && !mobileOpen;

  return (
    <header
      data-dark={isDark || undefined}
      className={`group/h sticky top-0 z-50 backdrop-blur-md transition-[background-color,box-shadow,color] duration-500 ${
        isDark ? "bg-night text-paper shadow-[0_1px_0_rgba(255,255,255,0.08)]" : "bg-base/95 text-ink"
      } ${!isDark && (scrolled || openMenu || mobileOpen) ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}
      onMouseLeave={hoverClose}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        本文へ移動
      </a>
      <div className="wrap flex h-20 items-center justify-between gap-6 xl:h-[88px]">
        <Link href="/" className="flex shrink-0 items-center gap-5 rounded text-[#2a3948] transition-colors group-data-[dark]/h:text-paper" aria-label="Shumi ホーム">
          <Logo className="h-6 w-auto xl:h-7" />
          <span className="hidden border-l border-line pl-5 text-[11px] leading-snug tracking-[0.08em] text-ink-mute group-data-[dark]/h:border-paper/20 group-data-[dark]/h:text-paper/60 2xl:block">
            {site.tagline.replace("・", "・\n")
              .split("\n")
              .map((t) => (
                <span key={t} className="block">
                  {t}
                </span>
              ))}
          </span>
        </Link>

        <nav aria-label="メインメニュー" className="hidden xl:block">
          <ul className="flex items-center">
            {nav.map((item) =>
              item.children ? (
                <li key={item.href} onMouseEnter={() => hoverOpen(item.href)}>
                  <button
                    type="button"
                    aria-expanded={openMenu === item.href}
                    aria-controls={`${menuId}-panel`}
                    onClick={() => setOpenMenu((v) => (v === item.href ? null : item.href))}
                    className={`flex h-11 items-center gap-1.5 whitespace-nowrap rounded px-3 text-[13.5px] font-bold tracking-[0.06em] transition-colors hover:text-brand-deep ${
                      isCurrent(item.href) ? "text-brand-deep group-data-[dark]/h:text-brand-light" : "text-ink group-data-[dark]/h:text-paper/85 group-data-[dark]/h:hover:text-paper"
                    }`}
                  >
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${openMenu === item.href ? "rotate-180" : ""}`}>
                      <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </li>
              ) : (
                <li key={item.href} onMouseEnter={hoverClose}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="flex h-11 items-center whitespace-nowrap rounded px-3 text-[13.5px] font-bold tracking-[0.06em] text-ink transition-colors hover:text-brand-deep aria-[current=page]:text-brand-deep group-data-[dark]/h:text-paper/85 group-data-[dark]/h:hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/document/"
            className="hidden h-11 items-center whitespace-nowrap rounded-full border border-line px-5 text-[13px] font-bold tracking-[0.06em] transition-colors hover:border-ink group-data-[dark]/h:border-paper/25 group-data-[dark]/h:hover:border-paper sm:inline-flex xl:hidden min-[1400px]:inline-flex"
          >
            資料ダウンロード
          </Link>
          <Link
            href="/contact/"
            className="hidden h-11 items-center whitespace-nowrap rounded-full bg-grad-brand px-6 text-[13px] font-bold tracking-[0.06em] text-paper transition-colors hover:brightness-110 sm:inline-flex"
          >
            お問い合わせ
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line group-data-[dark]/h:border-paper/30 xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls={`${menuId}-mobile`}
            aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform ${mobileOpen ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform ${mobileOpen ? "top-1 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* PC：サブメニュー */}
      <div
        id={`${menuId}-panel`}
        aria-hidden={!panelOpen}
        inert={!panelOpen}
        onMouseEnter={() => active && hoverOpen(active.href)}
        className={`absolute inset-x-0 top-full hidden border-t border-line bg-base shadow-[0_24px_48px_-32px_rgba(13,31,34,0.35)] transition-[opacity,translate,visibility] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:block ${
          panelOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {lastMenu.current && <MegaMenu item={lastMenu.current} />}
      </div>

      {/* スマホ：全画面メニュー */}
      <div
        id={`${menuId}-mobile`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-base transition-[opacity,translate,visibility] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden ${
          mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav aria-label="メニュー" className="wrap pb-16 pt-4">
          <ul className="divide-y divide-line-soft">
            {nav.map((item) => (
              <li key={item.href} className="py-2">
                <Link href={item.href} className="flex min-h-14 items-center text-lg font-extrabold">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-3 grid gap-1 border-l border-line pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="flex min-h-11 items-center text-[15px] text-ink-soft">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/contact/" className="flex h-14 items-center justify-center rounded-full bg-grad-brand font-bold text-paper">
              お問い合わせ
            </Link>
            <Link href="/document/" className="flex h-14 items-center justify-center rounded-full border border-line font-bold">
              資料ダウンロード
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MegaMenu({ item }: { item: NavItem }) {
  return (
    <div className="wrap grid grid-cols-[16rem_1fr] gap-12 py-10">
      <div>
        <p className="text-xl font-extrabold">{item.label}</p>
        <Link href={item.href} className="mt-5 inline-flex h-11 items-center gap-3 rounded-full border border-ink/15 pl-5 pr-1.5 text-sm font-bold transition-colors hover:border-ink">
          一覧を見る
          <span className="grid h-8 w-8 place-items-center rounded-full bg-mist">
            <Arrow />
          </span>
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
        {item.children!.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="group flex items-start justify-between gap-6 rounded-lg p-4 transition-colors hover:bg-mist">
              <span>
                <span className="label-en block text-xs text-brand-deep">{c.en}</span>
                <span className="mt-1 block font-bold">{c.label}</span>
                <span className="mt-1 block text-[13px] leading-relaxed text-ink-mute">{c.desc}</span>
              </span>
              <span className="mt-6 text-ink-mute transition-transform group-hover:translate-x-1 group-hover:text-brand-deep">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className={className}>
      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
