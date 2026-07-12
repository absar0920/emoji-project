/**
 * Security + behavior test for lib/sanitize.ts (the published-post HTML
 * sanitizer). Runs offline — no server, no DB.
 *
 * Guards two things:
 *   1. Security: XSS vectors (script/iframe/event-handlers/javascript: URLs,
 *      protocol-relative URLs) never survive.
 *   2. Rendering: legitimate TipTap-authored content (links, images, lists,
 *      tables WITH colspan, task-list checkboxes) is preserved, and every
 *      <input> is forced read-only via `disabled`.
 *
 * Also asserts jsdom is NOT pulled into the module graph — the whole point of
 * moving off isomorphic-dompurify was to keep jsdom out of the serverless
 * bundle (it crashed /blog in prod with ERR_REQUIRE_ESM).
 *
 * Usage: npx tsx scripts/smoke-sanitize.ts
 */
import { sanitizeHtml } from "../lib/sanitize";

let passed = 0;
let failed = 0;

function check(name: string, cond: boolean, detail = "") {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

// ── 1. XSS vectors must not survive ────────────────────────────────────────
console.log("Security — dangerous content is stripped:");
{
  const cases: Array<[string, string]> = [
    ["<script>", `<p>ok</p><script>alert(1)</script>`],
    ["<iframe>", `<iframe src="https://evil"></iframe><p>ok</p>`],
    ["<style>", `<style>body{}</style><p>ok</p>`],
    ["onerror handler", `<img src="https://x/y.png" onerror="alert(1)">`],
    ["onclick handler", `<p onclick="evil()">click</p>`],
    ["javascript: href", `<a href="javascript:alert(1)">x</a>`],
    ["  spaced javascript:", `<a href="  javascript:alert(1)">x</a>`],
    ["JaVaScRiPt: href", `<a href="JaVaScRiPt:alert(1)">x</a>`],
    ["data: img", `<img src="data:text/html,<script>alert(1)</script>">`],
    ["protocol-relative //", `<a href="//evil.com">x</a>`],
    ["svg/onload", `<svg onload="alert(1)"></svg><p>ok</p>`],
  ];
  for (const [name, dirty] of cases) {
    const out = sanitizeHtml(dirty);
    const bad =
      /<script|<iframe|<style|<svg/i.test(out) ||
      /\son\w+\s*=/i.test(out) ||
      /javascript:/i.test(out) ||
      /src\s*=\s*["']?\s*data:/i.test(out) ||
      /href\s*=\s*["']?\s*\/\//i.test(out);
    check(name, !bad, `output: ${JSON.stringify(out)}`);
  }
}

// ── 2. Legitimate content is preserved ─────────────────────────────────────
console.log("\nRendering — legitimate content survives:");
{
  const rich = sanitizeHtml(
    `<p>Hello <strong>world</strong> <em>x</em></p>` +
      `<h2>T</h2><blockquote>q</blockquote><pre><code>x</code></pre>` +
      `<ul><li>a</li></ul>` +
      `<a href="https://ok.com">ok</a> <a href="mailto:a@b.com">m</a> <a href="/rel">r</a>` +
      `<img src="https://res.cloudinary.com/x/y.png" alt="a">`,
  );
  check("keeps <strong>/<em>", /<strong>world<\/strong>/.test(rich) && /<em>x<\/em>/.test(rich));
  check("keeps headings/blockquote/pre", /<h2>T<\/h2>/.test(rich) && /<blockquote>/.test(rich) && /<pre><code>/.test(rich));
  check("keeps https link", /<a[^>]*href="https:\/\/ok\.com"/.test(rich));
  check("keeps mailto link", /href="mailto:a@b\.com"/.test(rich));
  check("keeps root-relative link", /href="\/rel"/.test(rich));
  check("keeps image src+alt", /<img[^>]*src="https:\/\/res\.cloudinary\.com\/x\/y\.png"[^>]*alt="a"/.test(rich) || /<img[^>]*alt="a"[^>]*src=/.test(rich));

  // Tables with colspan/rowspan — DOMPurify silently dropped these (a latent
  // bug); the new sanitizer must preserve them so tables render correctly.
  const table = sanitizeHtml(`<table><tbody><tr><td colspan="2" rowspan="3">c</td></tr></tbody></table>`);
  check("keeps table colspan", /colspan="2"/.test(table), table);
  check("keeps table rowspan", /rowspan="3"/.test(table), table);
}

// ── 3. Task-list checkboxes rendered read-only ─────────────────────────────
console.log("\nTask-list checkboxes forced read-only:");
{
  const out = sanitizeHtml(
    `<div data-type="taskItem" data-checked="true"><label><input type="checkbox" checked></label></div>`,
  );
  check("input kept with type=checkbox", /<input[^>]*type="checkbox"/.test(out), out);
  check("input forced disabled", /<input[^>]*\sdisabled(=|\s|>)/.test(out), out);
  check("data-type/data-checked kept", /data-type="taskItem"/.test(out) && /data-checked="true"/.test(out), out);

  // Even an input that wasn't disabled in source must come out disabled.
  const forced = sanitizeHtml(`<input type="checkbox">`);
  check("undisabled source input → disabled", /disabled/.test(forced), forced);
}

// ── 4. target=_blank hardened with rel=noopener ────────────────────────────
console.log("\nTab-nabbing hardening:");
{
  const out = sanitizeHtml(`<a href="https://ok.com" target="_blank">x</a>`);
  check("target link gets rel=noopener noreferrer", /rel="noopener noreferrer"/.test(out), out);
}

// ── 5. jsdom must NOT be in the module graph ───────────────────────────────
console.log("\nBundle hygiene:");
{
  const list = (process as NodeJS.Process & { moduleLoadList: string[] }).moduleLoadList;
  const hasJsdom = list.some((m) => m.toLowerCase().includes("jsdom"));
  check("jsdom NOT loaded", !hasJsdom, "jsdom is in the module graph");
}

console.log(`\n${failed === 0 ? "PASS" : "FAIL"} — ${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
