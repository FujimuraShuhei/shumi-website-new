"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { AppFrame, useToast } from "./shared";

type Status = "todo" | "doing" | "done";
type Task = { id: number; title: string; site: string; owner: string; due: string; status: Status };

const statusLabel: Record<Status, string> = { todo: "未着手", doing: "進行中", done: "完了" };
const statusStyle: Record<Status, string> = {
  todo: "border border-line bg[#ccd1d3] text-ink-soft",
  doing: "bg-brand-wash text-brand-dark",
  done: "bg[#ccdad3] text-ok",
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

function daysLeft(due: string) {
  return Math.round((new Date(due).getTime() - new Date(TODAY).getTime()) / 86400000);
}

export function TasksDemo() {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [query, setQuery] = useState("");
  const [lastAdded, setLastAdded] = useState<number | null>(null);
  const toast = useToast();
  const formId = useId();

  const counts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      doing: tasks.filter((t) => t.status === "doing").length,
      done: tasks.filter((t) => t.status === "done").length,
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
    e.currentTarget.reset();
    toast.show("業務を登録しました");
  }

  function advance(id: number) {
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, status: t.status === "todo" ? "doing" : t.status === "doing" ? "done" : "todo" } : t)),
    );
  }

  const inputCls = "mt-1 block min-h-11 w-full rounded-md border-2 border-line bg[#ccd1d3] px-3 text-sm focus:border-brand-deep";

  return (
    <AppFrame title="業務の一覧" nav={["業務の一覧", "現場", "日報", "写真台帳", "資材"]}>
      <div className="grid gap-5 p-5 lg:grid-cols-[280px_1fr]">
        <form onSubmit={add} aria-labelledby={`${formId}-h`} className="h-fit rounded-lg border border-line bg[#ccd1d3] p-4">
          <p id={`${formId}-h`} className="font-bold">
            業務を登録する
          </p>
          <div className="mt-3 space-y-3 text-sm">
            <label className="block">
              <span className="font-bold">
                内容 <span className="text-alert">必須</span>
              </span>
              <input name="title" required placeholder="例：外壁の足場を確認" className={inputCls} />
            </label>
            <label className="block">
              <span className="font-bold">現場</span>
              <input name="site" placeholder="例：戸塚 外壁改修" className={inputCls} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="font-bold">担当</span>
                <select name="owner" className={inputCls}>
                  {owners.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="font-bold">期日</span>
                <input type="date" name="due" defaultValue="2026-10-31" required className={inputCls} />
              </label>
            </div>
            <button
              type="submit"
             
              className="mt-1 min-h-11 w-full rounded-md bg-brand-deep font-bold text-paper hover:bg-brand-dark"
            >
              登録する
            </button>
          </div>
        </form>

        <section aria-label="業務の一覧" className="min-w-0 rounded-lg border border-line bg[#ccd1d3]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-3">
            <div role="group" aria-label="状態で絞り込む" className="flex flex-wrap gap-1">
              {(["all", "todo", "doing", "done"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                 
                  aria-pressed={filter === s}
                  onClick={() => setFilter(s)}
                  className={`min-h-9 rounded px-3 text-sm font-bold ${
                    filter === s ? "bg-ink text-paper" : "text-ink-soft hover:bg-mist"
                  }`}
                >
                  {s === "all" ? "すべて" : statusLabel[s]}
                  <span className="ml-1.5 tabular-nums opacity-70">{counts[s]}</span>
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="sr-only">キーワードで探す</span>
              <input
                type="search"
                value={query}
               
                onChange={(e) => setQuery(e.target.value)}
                placeholder="現場名・担当で探す"
                className="min-h-9 w-44 rounded-md border-2 border-line px-3"
              />
            </label>
          </div>

          <ul className="divide-y divide-line-soft">
            {visible.map((t) => {
              const d = daysLeft(t.due);
              const urgent = t.status !== "done" && d <= 2;
              return (
                <li
                  key={t.id}
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 transition-colors ${
                    t.id === lastAdded ? "bg-brand-wash" : ""
                  }`}
                >
                  <button
                    type="button"
                   
                    onClick={() => advance(t.id)}
                    aria-label={`「${t.title}」の状態を変える（いまは${statusLabel[t.status]}）`}
                    className={`min-h-8 min-w-[4.5rem] rounded-full px-3 text-xs font-bold ${statusStyle[t.status]}`}
                  >
                    {statusLabel[t.status]}
                  </button>
                  <div className="min-w-0">
                    <p className={`truncate font-bold ${t.status === "done" ? "text-ink-mute line-through" : ""}`}>{t.title}</p>
                    <p className="truncate text-xs text-ink-mute">
                      {t.site}　担当 {t.owner}
                    </p>
                  </div>
                  <p className={`text-right text-xs tabular-nums ${urgent ? "font-bold text-alert" : "text-ink-mute"}`}>
                    {t.due.slice(5).replace("-", "/")}
                    <br />
                    {t.status === "done" ? "完了" : d < 0 ? `${-d}日過ぎ` : d === 0 ? "今日まで" : `あと${d}日`}
                  </p>
                </li>
              );
            })}
            {visible.length === 0 && (
              <li className="px-4 py-10 text-center text-sm text-ink-mute">該当する業務はありません。左のフォームから登録できます。</li>
            )}
          </ul>
        </section>
      </div>
      {toast.node}
    </AppFrame>
  );
}
