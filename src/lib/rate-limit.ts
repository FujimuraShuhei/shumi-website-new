import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * 同じ送信元からの連続送信を制限する（10分に5回まで）。
 * Upstash Redis の環境変数があればそれを使い、無ければサーバーのメモリで簡易的に数える。
 * Vercel は複数のサーバーで動くため、本番では Upstash の設定をおすすめします。
 */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

const upstash =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(LIMIT, "10 m"), prefix: "shumi-contact" })
    : null;

const memory = new Map<string, number[]>();

export async function checkRateLimit(key: string): Promise<boolean> {
  if (upstash) {
    const { success } = await upstash.limit(key);
    return success;
  }
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= LIMIT) return false;
  hits.push(now);
  memory.set(key, hits);
  if (memory.size > 5000) memory.clear();
  return true;
}
