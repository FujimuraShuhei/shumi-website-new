import type { ReactNode } from "react";

/** 図解用の線アイコン（24×24、線の太さ 1.75） */
const paths: Record<string, ReactNode> = {
  brand: (
    <>
      <path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.8z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3.3 2.7-5 5.5-5s4.9 1.7 5.5 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.6 14.2c2.4.2 4.2 1.7 4.9 4.8" />
    </>
  ),
  app: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
      <path d="M17 13.5v7M13.5 17h7" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z" />
      <path d="M13.5 7l3 3" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z" />
      <path d="M8.8 12l2.2 2.2 4.4-4.6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  tap: (
    <>
      <path d="M9 11V5.5a1.8 1.8 0 0 1 3.6 0V10" />
      <path d="M12.6 9.5a1.8 1.8 0 0 1 3.6 0v1a1.8 1.8 0 0 1 3.3 1V15c0 3.4-2.4 6-6 6h-1c-2.3 0-3.9-1-5.1-2.9L5 14.8a1.7 1.7 0 0 1 2.7-2l1.3 1.4" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M7.5 15l3.5-4 3 2.5 5-6" />
    </>
  ),
  up: (
    <>
      <path d="M4 17l6-6 4 4 6-7" />
      <path d="M15 8h5v5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  sync: (
    <>
      <path d="M19.5 10A7.5 7.5 0 0 0 6 6.5L4.5 8" />
      <path d="M4.5 4v4h4" />
      <path d="M4.5 14A7.5 7.5 0 0 0 18 17.5l1.5-1.5" />
      <path d="M19.5 20v-4h-4" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 15.5h6" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 7.5h4l1.5-2.5h6l1.5 2.5h4v12h-17z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6.5L20.5 7" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.6 3.8 5.4 3.8 8.5s-1.2 5.9-3.8 8.5c-2.6-2.6-3.8-5.4-3.8-8.5S9.4 6.1 12 3.5z" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="9.5" r="1.8" />
      <path d="M4 17l5-4.5 3.5 3 3-2.5 4.5 4" />
    </>
  ),
  blog: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M8 8h8M8 11.5h8M8 15h5" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 13v-1.5a7.5 7.5 0 0 1 15 0V13" />
      <rect x="3.5" y="13" width="4" height="6" rx="1.5" />
      <rect x="16.5" y="13" width="4" height="6" rx="1.5" />
    </>
  ),
  layout: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M9.5 9v11" />
    </>
  ),
  handshake: (
    <>
      <path d="M2.5 11l4-4 3 1.5 3-1.5 4 1 5 4" />
      <path d="M6.5 7l-1 7 5 4.5c.8.7 2 .6 2.6-.2l4.4-5.3" />
      <path d="M9.5 8.5l3.5 3.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4z" />
      <path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" />
    </>
  ),
  list: (
    <>
      <path d="M9 6.5h11M9 12h11M9 17.5h11" />
      <circle cx="4.5" cy="6.5" r="1" />
      <circle cx="4.5" cy="12" r="1" />
      <circle cx="4.5" cy="17.5" r="1" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8 18h7.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H16" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  arrow: <path d="M4 12h15M14 6l6 6-6 6" />,
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6", strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/** アイコンを丸い面に乗せたもの（図解の節点） */
export function IconBadge({ name, tone = "light", size = "md" }: { name: IconName; tone?: "light" | "brand" | "dark"; size?: "sm" | "md" | "lg" }) {
  const box = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const ic = size === "lg" ? "h-8 w-8" : size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const tones = {
    light: "bg-brand-deep text-paper",
    brand: "bg-grad-brand text-paper shadow-[0_10px_24px_-10px_rgba(10,122,131,0.7)]",
    dark: "bg-paper/10 text-brand-light ring-1 ring-paper/15",
  };
  return (
    <span className={`grid shrink-0 place-items-center rounded-2xl ${box} ${tones[tone]}`}>
      <Icon name={name} className={ic} />
    </span>
  );
}
