import "server-only";
import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { Column, Work, WorkCategory } from "./content";
import { sampleColumns, sampleWorks } from "./sample-data";

export * from "./content";

type ListResponse<T> = { contents: T[]; totalCount: number; offset: number; limit: number };

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

/** 環境変数が無いときは null（サンプルデータで表示する） */
const client = serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;

export const isCmsConnected = client !== null;

/** 1時間ごとに再取得。更新時は Webhook (/api/revalidate) で即時反映 */
const requestInit = { next: { revalidate: 3600, tags: ["microcms"] } } as RequestInit;

/** microCMS の selectフィールドは配列で返るので、値を正規化する */
function normalizeWork(raw: Work & { category: unknown }): Work {
  const cat = Array.isArray(raw.category) ? raw.category : raw.category ? [raw.category] : [];
  const valid: WorkCategory[] = ["web", "app", "sales", "design"];
  return { ...raw, category: cat.filter((c): c is WorkCategory => valid.includes(c as WorkCategory)) };
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    // 存在しないコンテンツID（404）は「見つからない」として静かに扱う
    if (!/404/.test(String(error))) console.error("[microCMS] 取得に失敗しました", error);
    return fallback;
  }
}

export async function getWorks(queries: MicroCMSQueries = {}): Promise<Work[]> {
  if (!client) return sampleWorks.slice(0, queries.limit ?? 100);
  return safe(async () => {
    const res = await client.get<ListResponse<Work>>({
      endpoint: "works",
      queries: { limit: 100, orders: "-publishedAt", ...queries },
      customRequestInit: requestInit,
    });
    return res.contents.map(normalizeWork);
  }, sampleWorks);
}

export async function getWork(id: string): Promise<Work | null> {
  if (!client) return sampleWorks.find((w) => w.id === id) ?? null;
  return safe(async () => {
    const res = await client.get<Work>({ endpoint: "works", contentId: id, customRequestInit: requestInit });
    return normalizeWork(res);
  }, null);
}

export async function getColumns(queries: MicroCMSQueries = {}): Promise<Column[]> {
  if (!client) return sampleColumns.slice(0, queries.limit ?? 100);
  return safe(async () => {
    const res = await client.get<ListResponse<Column>>({
      endpoint: "blog",
      queries: { limit: 100, orders: "-publishedAt", ...queries },
      customRequestInit: requestInit,
    });
    return res.contents;
  }, sampleColumns);
}

export async function getColumn(id: string): Promise<Column | null> {
  if (!client) return sampleColumns.find((c) => c.id === id) ?? null;
  return safe(
    () => client.get<Column>({ endpoint: "blog", contentId: id, customRequestInit: requestInit }),
    null,
  );
}

