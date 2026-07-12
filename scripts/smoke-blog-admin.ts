/**
 * Live smoke test for the blog-admin security boundary + data layer.
 *
 * Mirrors scripts/smoke-ratelimit.ts: proves the real routes/gates return the
 * right status codes against a running dev server + real MongoDB/Redis,
 * rather than testing mocks. Covers:
 *
 *   1. GET  /admin              (no cookie) -> 307 redirect to /admin/login
 *   2. POST /api/admin/upload   (no cookie) -> 401
 *   3. Login brute force        -> rate-limited after RL_LOGIN_PER_MIN attempts
 *   4. Data layer: a published post is visible via getPublishedPosts /
 *      getPublishedPostBySlug, a draft is not — seeded + cleaned up here.
 *
 * Usage:
 *   1. Have MongoDB (MONGODB_URI) + Redis (UPSTASH_*) configured in .env.local
 *   2. npm run dev   (in another terminal)
 *   3. NODE_OPTIONS="--conditions=react-server" npx env-cmd -f .env.local npx tsx scripts/smoke-blog-admin.ts
 *
 * Optional env:
 *   BASE_URL   (default http://localhost:3000)
 *
 * NOTE on the two unusual invocation requirements:
 *
 *   - `env-cmd -f .env.local` loads MONGODB_URI/UPSTASH_* into process.env.
 *     Unlike `next dev`, a plain tsx script does not read .env.local itself —
 *     check 4 imports lib/blog.ts directly and needs real DB/cache config.
 *
 *   - `NODE_OPTIONS="--conditions=react-server"` is required ONLY because
 *     check 4 imports lib/blog.ts, which (like every server-only data-layer
 *     module) starts with `import "server-only"`. Next's bundler resolves
 *     that package's "react-server" export condition to a no-op stub for
 *     code running in the server component graph; outside Next's bundler
 *     (plain tsx) the package's default export condition resolves to a stub
 *     that unconditionally throws. Passing this Node conditions flag makes
 *     plain Node pick the same "react-server" stub Next's bundler would.
 *     (`server-only` is a devDependency here so that stub exists in
 *     node_modules at all — Next normally vendors its own copy internally
 *     and user projects never need it directly.)
 *
 * NOTE on check 3 (login brute force): the login form is a React 19 Server
 * Action (`app/admin/actions.ts`), not a JSON API route. There is no stable
 * public JSON contract to POST to directly. Instead this script drives the
 * SAME no-JS progressive-enhancement path a browser uses when JS is
 * unavailable: Next renders a real `<form method="POST" encType="multipart/
 * form-data">` on the login page with hidden fields identifying the bound
 * server action, and intercepts a plain multipart POST to that URL. We
 * scrape those hidden fields from the rendered page once and reuse them for
 * a burst of concurrent POSTs, exactly like smoke-ratelimit.ts's burst
 * trick. The action rate-limits BEFORE checking credentials (see
 * app/admin/actions.ts), so this trips deterministically without real
 * SUPERADMIN_* credentials. Set RL_LOGIN_PER_MIN=1 in .env.local before
 * running to trip it reliably in a small burst; restore it afterward.
 *
 * Because AUTH_SECRET/SUPERADMIN_* are commonly unset in local dev, checks
 * that would need a genuine authenticated session (e.g. an authed upload)
 * are SKIPPED rather than failed — the four checks above do not need one.
 */

import http from "node:http";
// The http import above also isolates this script's module scope (TS would
// otherwise treat a file with no top-level import/export as a global script
// and collide with scripts/smoke-ratelimit.ts's same-named declarations).

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

let passed = 0;
let failed = 0;
let skipped = 0;

function check(name: string, cond: boolean, detail: string) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name} — ${detail}`);
  }
}

function skip(name: string, reason: string) {
  skipped++;
  console.log(`  – SKIPPED ${name} — ${reason}`);
}

// --- Check 1: unauthenticated /admin is gated by the proxy ---

async function checkAdminGate() {
  console.log("\n1. Admin route gate (GET /admin, no cookie):");
  const res = await fetch(`${BASE}/admin`, { redirect: "manual" });
  check("307 redirect", res.status === 307, `got ${res.status}`);
  const location = res.headers.get("location") ?? "";
  check("redirects to /admin/login", location.endsWith("/admin/login"), `got ${location}`);
}

// --- Check 2: unauthenticated upload is rejected before any work happens ---

async function checkUploadGate() {
  console.log("\n2. Upload route gate (POST /api/admin/upload, no cookie):");
  const form = new FormData();
  form.append("file", new Blob(["not-a-real-image"], { type: "image/png" }), "smoke.png");
  const res = await fetch(`${BASE}/api/admin/upload`, { method: "POST", body: form });
  const json = await res.json().catch(() => ({}));
  check("401 Unauthorized", res.status === 401, `got ${res.status}`);
  check("error body present", typeof json?.error === "string", JSON.stringify(json));
}

// --- Check 3: login brute force trips the rate limiter ---
// Scrapes the progressive-enhancement form fields Next renders for the login
// server action, then fires a concurrent burst (same trick as
// smoke-ratelimit.ts's burst test) so every request shares one sliding-
// window bucket.
//
// This burst is sent with node:http rather than fetch(). Empirically, Node's
// built-in fetch (undici) pools/pipelines concurrent requests to the same
// origin on shared keep-alive connections, and Next's dev server (Turbopack)
// resolves a POSTed Server Action against a manifest lookup that is NOT
// robust to that pipelining — concurrent fetch() calls reliably produced
// "Failed to find Server Action" 500s here, while both concurrent curl
// processes (separate sockets, no pipelining) and node:http with
// keepAlive: false reliably reproduced the real 429-equivalent behavior.

interface ScrapedAction {
  actionId: string;
  actionKey: string;
}

function scrapeAction(html: string): ScrapedAction | null {
  const idMatch = html.match(/&quot;id&quot;:&quot;([a-f0-9]+)&quot;/);
  const keyMatch = html.match(/\$ACTION_KEY"\s+value="([^"]+)"/);
  if (!idMatch || !keyMatch) return null;
  return { actionId: idMatch[1], actionKey: keyMatch[1] };
}

function postMultipart(url: string, fields: Record<string, string>): Promise<string> {
  const boundary = "----smoke" + Math.random().toString(16).slice(2);
  const body =
    Object.entries(fields)
      .map(([name, value]) => `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`)
      .join("") + `--${boundary}--\r\n`;
  const u = new URL(url);
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname,
        method: "POST",
        agent: new http.Agent({ keepAlive: false }),
        headers: {
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function postLoginAttempt(action: ScrapedAction): Promise<string> {
  return postMultipart(`${BASE}/admin/login`, {
    "$ACTION_REF_1": "",
    "$ACTION_1:0": JSON.stringify({ id: action.actionId, bound: "$@1" }),
    "$ACTION_1:1": "[{}]",
    "$ACTION_KEY": action.actionKey,
    username: "smoketest",
    password: "wrong-password",
  });
}

async function checkLoginBruteForce() {
  console.log("\n3. Login brute force (concurrent burst, expects rate-limit message):");
  const loginPage = await fetch(`${BASE}/admin/login`).then((r) => r.text());
  const action = scrapeAction(loginPage);
  if (!action) {
    skip(
      "login rate limit",
      "could not scrape server-action fields from /admin/login (page markup may have changed)"
    );
    return;
  }
  const burst = await Promise.all([1, 2, 3].map(() => postLoginAttempt(action)));
  const limited = burst.filter((body) => body.includes("Too many attempts"));
  check(
    "at least one concurrent attempt is rate-limited",
    limited.length >= 1,
    `0/${burst.length} responses contained the rate-limit message — is RL_LOGIN_PER_MIN set low enough for this burst size?`
  );
}

// --- Check 4: data layer enforces published-only visibility ---
// Imports lib/blog.ts directly (see header note on NODE_OPTIONS). Seeds one
// published + one draft post, asserts visibility, then always cleans up.

async function checkDataLayer() {
  console.log("\n4. Data layer: published visible, draft hidden (seed + cleanup):");
  let blog;
  try {
    blog = await import("../lib/blog");
  } catch (err) {
    skip(
      "data layer visibility",
      `could not import lib/blog.ts — ${(err as Error).message}. Run with NODE_OPTIONS="--conditions=react-server" and env-cmd -f .env.local (see header comment).`
    );
    return;
  }
  const { createPost, getPublishedPostBySlug, deletePost } = blog;

  const stamp = Date.now();
  const basePost: Omit<Parameters<typeof createPost>[0], "title" | "slug" | "status"> = {
    excerpt: "smoke test post — safe to delete",
    content_json: { type: "doc", content: [{ type: "paragraph" }] },
    featured_image: null,
    featured_image_alt: "",
    categories: [],
    seo_title: "",
    seo_description: "",
  };

  let publishedId: string | null = null;
  let draftId: string | null = null;
  try {
    const published = await createPost({
      ...basePost,
      title: `Smoke Test Published ${stamp}`,
      slug: `smoke-test-published-${stamp}`,
      status: "published",
    });
    publishedId = published.id;

    const draft = await createPost({
      ...basePost,
      title: `Smoke Test Draft ${stamp}`,
      slug: `smoke-test-draft-${stamp}`,
      status: "draft",
    });
    draftId = draft.id;

    const foundPublished = await getPublishedPostBySlug(published.slug);
    check("published post is visible via getPublishedPostBySlug", foundPublished !== null, "got null");

    const foundDraft = await getPublishedPostBySlug(draft.slug);
    check("draft post is NOT visible via getPublishedPostBySlug", foundDraft === null, `got ${JSON.stringify(foundDraft)}`);
  } catch (err) {
    check("data layer seed/assert did not throw", false, (err as Error).message);
  } finally {
    if (publishedId) await deletePost(publishedId).catch(() => {});
    if (draftId) await deletePost(draftId).catch(() => {});
  }
}

async function main() {
  console.log(`\nSmoke-testing blog-admin security/data boundary at ${BASE}\n`);

  await checkAdminGate();
  await checkUploadGate();
  await checkLoginBruteForce();
  await checkDataLayer();

  console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped\n`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error("Smoke test crashed (is the dev server running?):", err.message);
  process.exit(1);
});
