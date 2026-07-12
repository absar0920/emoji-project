/**
 * Live smoke test for the AI rate-limiting / hardening layer.
 *
 * Proves the real endpoints return the right status codes against a running
 * dev server + real Redis. This is the verification bar for this feature —
 * mocked unit tests of a rate limiter mostly test the mock.
 *
 * Usage:
 *   1. Have Redis (UPSTASH_*) configured in .env.local
 *   2. npm run dev   (in another terminal)
 *   3. npx tsx scripts/smoke-ratelimit.ts
 *
 * Optional env:
 *   BASE_URL   (default http://localhost:3000)
 *   ORIGIN     (default = BASE_URL, i.e. same-origin)
 *
 * NOTE: Set RL_TEXT_PER_MIN=1 in .env.local before running. The burst test
 * fires requests CONCURRENTLY (same sliding-window bucket) so it trips
 * deterministically and spends only a single real Gemini call.
 */

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const ORIGIN = process.env.ORIGIN ?? BASE;

let passed = 0;
let failed = 0;

function check(name: string, cond: boolean, detail: string) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name} — ${detail}`);
  }
}

async function post(path: string, body: unknown, origin: string | null) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (origin) headers["Origin"] = origin;
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json, retryAfter: res.headers.get("retry-after") };
}

async function main() {
  console.log(`\nSmoke-testing rate limiting at ${BASE}\n`);

  // 1. Origin hardening: a foreign Origin must be rejected with 403.
  console.log("Origin allowlist:");
  const foreign = await post("/api/tools/vibe-search", { query: "cozy autumn vibes" }, "https://evil.example.com");
  check("foreign origin → 403", foreign.status === 403, `got ${foreign.status}`);
  check("403 body has code=forbidden_origin", foreign.json?.code === "forbidden_origin", JSON.stringify(foreign.json));

  // 2. Same-origin request is allowed (200, or 503 if the global cap is already
  //    exhausted / Redis missing — both mean the gate let it through to logic).
  console.log("\nSame-origin allowed:");
  const ok = await post("/api/tools/vibe-search", { query: "one off query " + Math.floor(Date.now() / 1000) }, ORIGIN);
  check("same-origin not blocked by origin gate", ok.status !== 403, `got ${ok.status}`);

  // 3. Burst → 429 with Retry-After. Fire CONCURRENTLY so the requests share one
  //    sliding-window bucket (reliable) and only one reaches Gemini (cheap).
  //    Requires RL_TEXT_PER_MIN=1.
  console.log("\nPer-IP burst limit — 3 concurrent (expects ≥1×429 with Retry-After):");
  const burst = await Promise.all(
    [1, 2, 3].map((i) => post("/api/tools/vibe-search", { query: `burst ${i}` }, ORIGIN))
  );
  const limited = burst.filter((r) => r.status === 429);
  check("at least one concurrent request is 429", limited.length >= 1, `statuses: ${burst.map((r) => r.status).join(",")}`);
  check(
    "429 carries Retry-After + code=rate_limited",
    limited.some((r) => !!r.retryAfter && r.json?.code === "rate_limited"),
    "missing header/code"
  );

  console.log(`\n${passed} passed, ${failed} failed\n`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error("Smoke test crashed (is the dev server running?):", err.message);
  process.exit(1);
});
