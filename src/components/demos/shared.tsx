"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** デモ内の小さな通知（操作の結果を知らせる） */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = useCallback((m: string) => {
    setMessage(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2400);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const node = (
    <div aria-live="polite" className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
      {message && (
        <p className="flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-bold text-paper shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="7" fill="var(--color-brand-light)" />
            <path d="M4.5 8.2l2.2 2.2 4.8-4.8" fill="none" stroke="var(--color-ink)" strokeWidth="1.8" />
          </svg>
          {message}
        </p>
      )}
    </div>
  );
  return { show, node };
}

/** PCアプリ風の枠 */
export function AppFrame({ title, children, nav }: { title: string; children: ReactNode; nav?: string[] }) {
  return (
    <div className="relative flex h-full min-h-[560px] overflow-hidden rounded-xl border border-line bg-[#f5f7f9] text-ink">
      {nav && (
        <aside className="hidden w-48 shrink-0 flex-col bg-night p-4 text-paper md:flex" aria-label="アプリのメニュー">
          <p className="en text-lg font-bold">Genba</p>
          <p className="text-[11px] text-paper/60">デモ用アプリ</p>
          <ul className="mt-6 space-y-1 text-sm">
            {nav.map((n, i) => (
              <li
                key={n}
                className={`rounded px-3 py-2 ${i === 0 ? "bg-paper/10 font-bold text-paper" : "text-paper/70"}`}
                aria-current={i === 0 ? "page" : undefined}
              >
                {n}
              </li>
            ))}
          </ul>
        </aside>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-paper px-5">
          <p className="font-bold">{title}</p>
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-wash text-xs font-bold text-brand-dark">山田</span>
            <span className="hidden sm:inline">山田 工務課</span>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

/** スマホの枠 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[380px] rounded-[44px] border-[10px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgba(27,35,43,0.5)]">
      <div className="relative h-[680px] overflow-hidden rounded-[34px] bg-[#f5f7f9]">
        <div aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border-2 px-4 text-sm font-bold transition-colors ${
        active ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink-soft hover:border-ink-mute"
      }`}
    >
      {children}
    </button>
  );
}
