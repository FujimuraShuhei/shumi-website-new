"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icons";
import { AppFrame, Avatar, Segmented, ui, useToast } from "./shared";

type Status = "todo" | "doing" | "done";
type Task = { id: number; title: string; site: string; owner: string; due: string; status: Status };

const statusLabel: Record<Status, string> = { todo: "未着手", doing: "進行中", done: "完了" };
const statusStyle: Record<Status, { pill: string; dot: string }> = {
  todo: { pill: "bg-slate-100 text-slate-700 ring-slate-200", dot: "bg-slate-400" },
  doing: { pill: "bg-sky-50 text-sky-800 ring-sky-200", dot: "bg-sky-500" },
  done: { pill: "bg-emerald-50 text-emerald-800 ring-emerald-200", dot: "bg-emerald-500" },
};

const owners = ["山田", "佐藤", "鈴木", "高橋"];

const initial: Task[] = [
  { id: 1, title: "配筋検査の立ち会い", site: "港北 集合住宅新築", owner: "佐藤", due: "2026-10-27", status: "todo" },
  { id: 2, title: "足場の解体日程を調整", site: "戸塚 外壁改修", owner: "山田", due: "2026-10-28", status: "doing" },
  { id: 3, title: "キッチン資材の発注", site: "青葉 戸建てリフォーム", owner: "鈴木", due: "2026-10-30", status: "doing" },
  { id: 4, title: "近隣への工事案内を配布", site: "鶴見 店舗内装", owner: "高橋", due: "2026-11-02", status: "todo" },
  { id: 5, title: "竣工写真の整理", site: "金沢 倉庫改修", owner: "山田", due: "2026-10-22", status: "done" },
  { id: 6, title: "安全書類の提出", site: "港北 集合住宅新築", owner: "佐藤", due: "2026-10-25", status: "done" },
];

const TODAY = "2026-10-26";
const daysLeft = (due: string) => Math.round((new Date(due).getTime() - new Date(TODAY).getTime()) / 86400000);

export function TasksDemo() {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const [lastAdded, setLastAdded] = useState<number | null>(null);
  const toast = useToast();
  const formId = useId();

  const counts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      doing: tasks.filter((t) => t.status === "doing").length,
      done: tasks.filter((t) => t.status === "done").length,
      urgent: tasks.filter((t) => t.status !== "done" && daysLeft(t.due) <= 2).length,
    }),
    [tasks],
  );

  const visible = tasks
    .filter((t) => filter === "all" || t.status === filter)
    .filter((t) => !query || `${t.title}${t.site}${t.owner}`.includes(query))
    .sort((a, b) => (a.status === "done" ? 1 : 0) - (b.status === "done" ? 1 : 0) || a.due.localeCompare(b.due));

  function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") ?? "").trim();
    if (!title) return;
    const id = Date.now();
    setTasks((ts) => [
      { id, title, site: String(fd.get("site") || "現場未設定"), owner: String(fd.get("owner")), due: String(fd.get("due")), status: "todo" },
      ...ts,
    ]);
    setLastAdded(id);
    setFilter("all");
    setAdding(false);
    toast.show("業務を登録しました");
  }

  function advance(id: number) {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: t.status === "todo" ? "doing" : t.status === "doing" ? "done" : "todo" } : t)));
  }

  const stats = [
    { label: "未着手", value: counts.todo, tone: "text-slate-900" },
    { label: "進行中", value: counts.doing, tone: "text-sky-700" },
    { label: "完了", value: counts.done, tone: "text-emerald-700" },
    { label: "期日が近い", value: counts.urgent, tone: "text-rose-600" },
  ];

  return (
    <AppFrame
      title="業務の一覧"
      subtitle="すべての現場・10月26日（月）"
      actions={
        <button type="button" onClick={() => setAdding((v) => !v)} aria-expanded={adding} aria-controls={formId} className={ui.btn}>
          <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
          業務を追加
        </button>
      }
    >
      <div className="space-y-4 p-5">
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className={`${ui.card} px-4 py-3.5`}>
              <p className="text-[12px] font-medium text-slate-500">{s.label}</p>
              <p className={`mt-1 text-[26px] font-bold leading-none tabular-nums ${s.tone}`}>
                {s.value}
                <span className="ml-1 text-[12px] font-medium text-slate-400">件</span>
              </p>
            </li>
          ))}
        </ul>

        {adding && (
          <form id={formId} onSubmit={add} aria-label="業務を登録する" className={`${ui.card} grid gap-3 p-4 md:grid-cols-[1.4fr_1.2fr_.8fr_.9fr_auto] md:items-end`}>
            <label className="block">
              <span className={ui.label}>
                内容 <span className="text-rose-600">*</span>
              </span>
              <input name="title" required autoFocus placeholder="例：外壁の足場を確認" className={`${ui.input} mt-1`} />
            </label>
            <label className="block">
              <span className={ui.label}>現場</span>
              <input name="site" placeholder="例：戸塚 外壁改修" className={`${ui.input} mt-1`} />
            </label>
            <label className="block">
              <span className={ui.label}>担当</span>
              <select name="owner" className={`${ui.input} mt-1`}>
                {owners.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={ui.label}>期日</span>
              <input type="date" name="due" defaultValue="2026-10-31" required className={`${ui.input} mt-1`} />
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setAdding(false)} className={ui.btnGhost}>
                やめる
              </button>
              <button type="submit" className={ui.btn}>
                登録
              </button>
            </div>
          </form>
        )}

        <section aria-label="業務の一覧" className={`${ui.card} min-w-0 overflow-hidden`}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <Segmented
              label="状態で絞り込む"
              value={filter}
              onChange={setFilter}
              options={(["all", "todo", "doing", "done"] as const).map((s) => ({ value: s, label: s === "all" ? "すべて" : statusLabel[s], count: counts[s] }))}
            />
            <label className="relative">
              <span className="sr-only">キーワードで探す</span>
              <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="現場名・担当で探す" className={`${ui.input} h-9 w-52 pl-9`} />
            </label>
          </div>

          <div className="hidden grid-cols-[96px_1fr_150px_90px_96px] gap-4 border-b border-slate-100 bg-slate-50 px-4 py-2 text-[11px] font-semibold text-slate-500 lg:grid">
            <span>状態</span>
            <span>業務</span>
            <span>現場</span>
            <span>担当</span>
            <span className="text-right">期日</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {visible.map((t) => {
              const d = daysLeft(t.due);
              const urgent = t.status !== "done" && d <= 2;
              const st = statusStyle[t.status];
              return (
                <li
                  key={t.id}
                  className={`grid grid-cols-[96px_1fr_auto] items-center gap-4 px-4 py-3 transition-colors hover:bg-slate-50 lg:grid-cols-[96px_1fr_150px_90px_96px] ${
                    t.id === lastAdded ? "bg-[#0a7a83]/[0.06]" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => advance(t.id)}
                    aria-label={`「${t.title}」の状態を変える（いまは${statusLabel[t.status]}）`}
                    title="押すと状態が進みます"
                    className={`inline-flex h-7 w-fit items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold ring-1 ring-inset transition-colors hover:brightness-95 ${st.pill}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                    {statusLabel[t.status]}
                  </button>
                  <div className="min-w-0">
                    <p className={`truncate text-[13px] font-semibold ${t.status === "done" ? "text-slate-400 line-through" : ""}`}>{t.title}</p>
                    <p className="truncate text-[12px] text-slate-500 lg:hidden">
                      {t.site}・{t.owner}
                    </p>
                  </div>
                  <p className="hidden truncate text-[12px] text-slate-600 lg:block">{t.site}</p>
                  <p className="hidden items-center gap-2 text-[12px] text-slate-700 lg:flex">
                    <Avatar name={t.owner} size="sm" />
                    {t.owner}
                  </p>
                  <p className="text-right text-[12px] tabular-nums">
                    <span className="block text-slate-700">{t.due.slice(5).replace("-", "/")}</span>
                    <span
                      className={`mt-0.5 inline-block rounded px-1.5 text-[11px] font-semibold ${
                        t.status === "done" ? "text-slate-400" : urgent ? "bg-rose-50 text-rose-600" : "text-slate-500"
                      }`}
                    >
                      {t.status === "done" ? "完了" : d < 0 ? `${-d}日超過` : d === 0 ? "今日まで" : `あと${d}日`}
                    </span>
                  </p>
                </li>
              );
            })}
            {visible.length === 0 && <li className="px-4 py-12 text-center text-[13px] text-slate-500">該当する業務はありません。「業務を追加」から登録できます。</li>}
          </ul>
        </section>
      </div>
      {toast.node}
    </AppFrame>
  );
}
