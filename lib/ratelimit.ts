import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";
import { getRedisClient } from "./redis";

/**
 * Abuse hardening for the paid AI endpoints. Three layers, all keyed off the
 * same Upstash Redis:
 *
 *   1. Origin allowlist  — reject cross-site POSTs (casual scripting/scraping).
 *   2. Per-IP sliding windows — burst + daily budget per client IP.
 *   3. Global daily cap  — a single hard ceiling on real Gemini calls across
 *      ALL clients, so IP-rotation can't run the bill past a number we choose.
 *
 * Failure policy: the paid AI tiers FAIL CLOSED (if we can't enforce a limit we
 * don't make the paid call — return 503), because a Redis outage is also a
 * cache outage and would otherwise mean uncapped spend. The free "public" tier
 * (search-index) fails OPEN — no cost risk, keep the app usable.
 *
 * Every limit is env-overridable (RL_*) so the ceiling can be tightened in the
 * Vercel dashboard without a code change or redeploy.
 */

export type Tier = "text" | "image" | "public" | "login";
export type BudgetKind = "text" | "image";

function envInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

// Per-IP windows. Each tier lists one or more [limit, window] sliding windows;
// a request must pass ALL windows for its tier.
type Window = { limit: number; window: `${number} ${"s" | "m" | "h" | "d"}`; suffix: string };

function windowsFor(tier: Tier): Window[] {
  switch (tier) {
    case "text":
      return [
        { limit: envInt("RL_TEXT_PER_MIN", 15), window: "60 s", suffix: "min" },
        { limit: envInt("RL_TEXT_PER_DAY", 150), window: "1 d", suffix: "day" },
      ];
    case "image":
      return [
        { limit: envInt("RL_IMAGE_PER_MIN", 4), window: "60 s", suffix: "min" },
        { limit: envInt("RL_IMAGE_PER_DAY", 20), window: "1 d", suffix: "day" },
      ];
    case "public":
      return [{ limit: envInt("RL_PUBLIC_PER_MIN", 30), window: "60 s", suffix: "min" }];
    case "login":
      return [{ limit: envInt("RL_LOGIN_PER_MIN", 5), window: "60 s", suffix: "min" }];
  }
}

// Cache Ratelimit instances by prefix so we don't rebuild them per request.
const limiterCache = new Map<string, Ratelimit>();

function getLimiter(prefix: string, w: Window): Ratelimit | null {
  const redis = getRedisClient();
  if (!redis) return null;
  const cached = limiterCache.get(prefix);
  if (cached) return cached;
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(w.limit, w.window),
    prefix,
    analytics: false,
  });
  limiterCache.set(prefix, rl);
  return rl;
}

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  // Vercel sets x-forwarded-for at the edge; the left-most entry is the real
  // client. We only trust this because it originates from Vercel, not the client.
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Same-origin allowlist. Auto-allows requests whose Origin host matches the
 * request host (covers production + every Vercel preview deploy with zero
 * config), plus localhost and any hosts in RL_ALLOWED_ORIGINS. A present-but-
 * disallowed Origin is rejected; an ABSENT Origin falls through (some privacy
 * tools strip it — we don't want false positives, the rate limiter still applies).
 */
function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  if (host === req.headers.get("host")) return true;
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return true;
  const extra = (process.env.RL_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return extra.some((o) => {
    try {
      return new URL(o).host === host;
    } catch {
      return o === host;
    }
  });
}

// --- Response contract (one consistent JSON shape the frontend branches on) ---

function rateLimitedResponse(retryAfterSec: number): NextResponse {
  return NextResponse.json(
    { error: "Too many requests — please slow down.", code: "rate_limited", retryAfter: retryAfterSec },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
  );
}

function forbiddenOriginResponse(): NextResponse {
  return NextResponse.json(
    { error: "Requests must originate from this site.", code: "forbidden_origin" },
    { status: 403 }
  );
}

/** 503 for both the fail-closed (Redis down) case and the global-cap case. */
export function capacityResponse(): NextResponse {
  return NextResponse.json(
    { error: "AI is temporarily at capacity — please try again later.", code: "at_capacity" },
    { status: 503 }
  );
}

/**
 * Gate an AI route. Call as the first line of the handler:
 *   const blocked = await enforceRateLimit(req, "text");
 *   if (blocked) return blocked;
 * Returns a Response to send back, or null when the request may proceed.
 */
export async function enforceRateLimit(req: Request, tier: Tier): Promise<NextResponse | null> {
  const failClosed = tier !== "public";

  if (!originAllowed(req)) {
    console.warn(`[ratelimit] blocked origin=${req.headers.get("origin")} tier=${tier}`);
    return forbiddenOriginResponse();
  }

  const ip = getClientIp(req);

  for (const w of windowsFor(tier)) {
    const limiter = getLimiter(`rl:${tier}:${w.suffix}`, w);
    if (!limiter) {
      // Redis unavailable: fail closed for paid tiers, open for public.
      if (failClosed) {
        console.warn(`[ratelimit] redis unavailable, failing closed tier=${tier}`);
        return capacityResponse();
      }
      return null;
    }
    try {
      const { success, reset } = await limiter.limit(ip);
      if (!success) {
        const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
        console.warn(`[ratelimit] 429 ip=${ip} tier=${tier} window=${w.suffix}`);
        return rateLimitedResponse(retryAfter);
      }
    } catch (err) {
      console.warn(`[ratelimit] limiter error tier=${tier}: ${(err as Error).message}`);
      if (failClosed) return capacityResponse();
      return null;
    }
  }

  return null;
}

/**
 * Thrown when the global daily budget is exhausted. Routes translate this into
 * capacityResponse(). Lives here so both callGemini and the image route share it.
 */
export class GlobalBudgetError extends Error {
  constructor(public kind: BudgetKind) {
    super(`global ${kind} budget exhausted`);
    this.name = "GlobalBudgetError";
  }
}

/**
 * Reserve one unit of the global daily budget for a REAL Gemini call. Must be
 * called only on a cache MISS (cache hits are free and must never be throttled).
 * Increments a per-UTC-day counter and returns false once the cap is exceeded.
 * Fails CLOSED: if Redis can't confirm remaining budget, we don't spend.
 */
export async function reserveGlobalBudget(kind: BudgetKind): Promise<boolean> {
  const redis = getRedisClient();
  if (!redis) return false; // can't meter → don't make the paid call

  const cap = kind === "image" ? envInt("RL_IMAGE_GLOBAL_DAILY", 45) : envInt("RL_TEXT_GLOBAL_DAILY", 10000);
  // UTC day bucket; toISOString is deterministic and available in all runtimes.
  const day = new Date().toISOString().slice(0, 10);
  const key = `budget:${kind}:${day}`;

  try {
    const n = await redis.incr(key);
    if (n === 1) await redis.expire(key, 90000); // ~25h, safely past the UTC rollover
    if (n > cap) {
      console.warn(`[ratelimit] global ${kind} cap hit (${n}/${cap}) day=${day}`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(`[ratelimit] global budget check failed kind=${kind}: ${(err as Error).message}`);
    return false; // fail closed
  }
}
