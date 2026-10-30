"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/icons";

/**
 * 業務アプリのデモ用の見た目の部品。
 * デモは「実際に納品するアプリの画面」なので、サイト本体のグレー基調ではなく、
 * 白を基本にした一般的な業務アプリの配色（白い面・薄いグレーの地・ブランドのティール）で作る。
 */

export const ui = {
  accent: "#0a7a83",
  btn: "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0a7a83] px-4 text-[13px] font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)] transition-colors hover:bg-[#086a72] disabled:cursor-not-allowed disabled:bg-slate-300",
  btnGhost:
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-4 text-[13px] font-semibold text-slate-700 ring-1 ring-slate-300 transition-colors hover:bg-slate-50",
  input:
    "block h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-[13px] text-slate-900 placeholder:text-slate-400 transition-[border-color,box-shadow] focus:border-[#0a7a83] focus:outline-none focus:ring-4 focus:ring-[#0a7a83]/15",
  label: "text-[12px] font-semibold text-slate-600",
  card: "rounded-xl bg-white ring-1 ring-slate-200",
};

/** デモ内の小さな通知（操作の結果を知らせる） */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = useCallback((m: string) => {
    setMessage(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2600);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const node = (
    <div aria-live="polite" className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex justify-center px-4">
      {message && (
        <p className="flex items-center gap-2.5 rounded-full bg-slate-900 py-2.5 pl-3 pr-5 text-[13px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(15,23,42,0.5)] [animation:demo-toast_.35s_cubic-bezier(.22,1,.36,1)]">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-slate-900">
            <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />
          </span>
          {message}
        </p>
      )}
    </div>
  );
  return { show, node };
}

type NavEntry = { label: string; icon: IconName };

const defaultNav: NavEntry[] = [
  { label: "業務の一覧", icon: "list" },
  { label: "現場", icon: "layout" },
  { label: "日報", icon: "doc" },
  { label: "写真台帳", icon: "camera" },
  { label: "資材", icon: "box" },
];

/** PCアプリ風の枠（左にメニュー、上にバー） */
export function AppFrame({
  title,
  subtitle,
  children,
  nav = defaultNav,
  current = 0,
  actions,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  nav?: NavEntry[];
  current?: number;
  actions?: ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-[600px] overflow-hidden rounded-2xl bg-white text-slate-900 tracking-normal ring-1 ring-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
      <aside className="hidden w-[208px] shrink-0 flex-col border-r border-slate-200 bg-slate-50 md:flex" aria-label="アプリのメニュー">
        <div className="flex items-center gap-2.5 px-4 pb-4 pt-5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0a7a83] text-[13px] font-bold text-white">G</span>
          <div className="leading-tight">
            <p className="text-[14px] font-bold">Genba</p>
            <p className="text-[11px] text-slate-500">青葉工務店</p>
          </div>
        </div>
        <ul className="space-y-0.5 px-2.5">
          {nav.map((n, i) => (
            <li key={n.label}>
              <span
                aria-current={i === current ? "page" : undefined}
                className={`flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] ${
                  i === current ? "bg-white font-semibold text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] ring-1 ring-slate-200" : "text-slate-600"
                }`}
              >
                <Icon name={n.icon} className={`h-[18px] w-[18px] ${i === current ? "text-[#0a7a83]" : "text-slate-400"}`} />
                {n.label}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-2.5 border-t border-slate-200 px-4 py-3.5">
          <Avatar name="山田" />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12px] font-semibold">山田 太郎</p>
            <p className="truncate text-[11px] text-slate-500">工務課</p>
          </div>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[60px] shrink-0 items-center justify-between gap-4 border-b border-slate-200 px-5">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold">{title}</p>
            {subtitle && <p className="truncate text-[11px] text-slate-500">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {actions}
            <span className="hidden h-9 w-9 place-items-center rounded-lg text-slate-500 ring-1 ring-slate-200 sm:grid" aria-hidden="true">
              <Icon name="bell" className="h-[18px] w-[18px]" />
            </span>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-slate-50/70">{children}</div>
      </div>
    </div>
  );
}

const avatarColors = ["bg-sky-100 text-sky-800", "bg-amber-100 text-amber-800", "bg-violet-100 text-violet-800", "bg-emerald-100 text-emerald-800"];
export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const c = avatarColors[[...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % avatarColors.length];
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-full font-bold ${c} ${size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-[11px]"}`}>
      {name.slice(0, 1)}
    </span>
  );
}

/** 切り替えボタンの並び（セグメント） */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: ReactNode; count?: number }[];
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-0.5 rounded-lg bg-slate-100 p-1 ring-1 ring-slate-200/70">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[12px] font-semibold transition-colors ${
            value === o.value ? "bg-white text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.12)]" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {o.label}
          {o.count !== undefined && <span className={`tabular-nums ${value === o.value ? "text-[#0a7a83]" : "text-slate-400"}`}>{o.count}</span>}
        </button>
      ))}
    </div>
  );
}

/** スマホの枠 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[380px] rounded-[48px] bg-slate-900 p-[10px] tracking-normal shadow-[0_40px_80px_-40px_rgba(15,23,42,0.6)]">
      <div className="relative isolate h-[700px] overflow-hidden rounded-[38px] bg-[#f2f4f6] text-slate-900 [clip-path:inset(0_round_38px)]">
        <div aria-hidden="true" className="absolute left-1/2 top-2.5 z-20 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-slate-900" />
        {children}
      </div>
    </div>
  );
}

/** 選べるチップ（複数選択） */
export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition-colors ${
        active ? "bg-[#0a7a83] text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)]" : "bg-white text-slate-600 ring-1 ring-slate-300 hover:ring-slate-400"
      }`}
    >
      {active && <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />}
      {children}
    </button>
  );
}
