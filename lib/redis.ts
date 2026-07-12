import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redis;
}

/**
 * Shared Upstash client for callers that need raw Redis ops (rate limiter,
 * global-budget counters) rather than the cache helpers. Returns null when
 * Redis is not configured — callers decide fail-open vs fail-closed.
 */
export function getRedisClient(): Redis | null {
  return getRedis();
}

export async function getCached<T>(key: string): Promise<T | null> {
  const r = getRedis();
  if (!r) return null;
  try {
    const data = await r.get<T>(key);
    return data;
  } catch {
    return null;
  }
}

export async function setCached<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  const r = getRedis();
  if (!r) return;
  try {
    await r.set(key, value, { ex: ttlSeconds });
  } catch {
    // Cache write failure is non-fatal
  }
}

export async function delCached(key: string): Promise<void> {
  const r = getRedis();
  if (!r) return;
  try {
    await r.del(key);
  } catch {
    // Cache delete failure is non-fatal
  }
}

// Used for the blog list-page cache-generation counter: incrementing this on
// every write instantly invalidates all `blog:list:*` pages (they key on the
// current generation) without needing to enumerate every category/page/
// perPage combination that could be cached.
export async function incrCached(key: string): Promise<number | null> {
  const r = getRedis();
  if (!r) return null;
  try {
    return await r.incr(key);
  } catch {
    return null;
  }
}
