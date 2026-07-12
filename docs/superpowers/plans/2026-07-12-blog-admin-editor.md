# Blog Admin + Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A superadmin-only `/admin` area to author production-quality blog posts with a rich TipTap editor, replacing the WordPress source, rendered on `/blog`.

**Architecture:** Lightweight signed-session auth (`jose` cookie + `bcryptjs` env credential, no provider). A Next-16 `proxy.ts` gates `/admin/*`; every write re-verifies via a Data Access Layer. Posts live in a MongoDB `blog_posts` collection storing both canonical ProseMirror JSON and sanitized HTML. Writes are server actions that `revalidatePath` the affected public routes. Media uploads go to Cloudinary via a superadmin-authed signed endpoint.

**Tech Stack:** Next.js 16 (App Router, React 19), MongoDB, Upstash Redis, TipTap v3, `jose` v6, `bcryptjs` v3, `isomorphic-dompurify` v3, `cloudinary` v2, `lowlight` v3.

## Global Constraints

- **This is Next.js 16 — NOT training-data Next.js.** Middleware is renamed to **`proxy.ts`** (`export default async function proxy(req: NextRequest)`, Node.js runtime). `cookies()`, `headers()`, and route `params`/`searchParams` are **async** (`await`). Read `node_modules/next/dist/docs/01-app/02-guides/authentication.md` before writing auth code.
- **No test runner exists** in this repo (no Jest/Playwright). Do NOT stand one up. Verification = repeatable **scripted smoke tests** (`npx tsx scripts/*.ts` against a running dev server) for security/data logic, plus a **manual browser checklist** for editor UX — mirroring the existing `scripts/smoke-ratelimit.ts` pattern.
- **Secrets are server-only.** Never prefix an admin/Cloudinary/auth env with `NEXT_PUBLIC_`. Verify no key reaches a client component.
- **Reuse existing infra:** `connectToDatabase()` from `lib/mongodb.ts`, `getCached/setCached` from `lib/redis.ts`, `enforceRateLimit` from `lib/ratelimit.ts`, the `fg-article` prose class, and the `ClientShell`/`Footer` layout wrappers.
- **Design bar:** the owner rejects generic "AI-like" UI. Admin surfaces must match the site's editorial (`fg-*`) styling, not a default form look. The editor surface is styled with `fg-article` (true WYSIWYG).
- **Cookie policy (locked):** session cookie `admin_session`, `httpOnly` + `secure` + `sameSite: "strict"` + `path: "/"`, **7-day non-sliding** expiry.
- Commit after each task. Branch off `main` first (do not commit the whole feature to `main` directly without a branch).

---

## File Structure

**Auth**
- `lib/session.ts` — encrypt/decrypt/create/delete the `jose` session cookie.
- `lib/auth.ts` — `verifyCredentials()` against env (`bcryptjs`).
- `lib/dal.ts` — `requireAdmin()` (redirecting, for pages) + `isAdmin()` (boolean, for actions/APIs).
- `proxy.ts` — root gate for `/admin/*`.
- `app/admin/login/page.tsx` + `app/admin/actions.ts` (`login`, `logout`).
- `scripts/hash-password.ts` — one-off helper to produce `SUPERADMIN_PASSWORD_HASH`.

**Blog data + content**
- `types/blog.ts` — extend with the stored `BlogPost` shape + `BlogPostInput`.
- `lib/blog.ts` — Mongo CRUD + public queries (replaces `lib/wordpress.ts` consumers).
- `lib/sanitize.ts` — `sanitizeHtml()`.
- `lib/slug.ts` — `slugify()` + `ensureUniqueSlug()`.
- `lib/editor-extensions.ts` — the TipTap extension array shared by the client editor and server-side `generateHTML`.
- `lib/blog-html.ts` — `jsonToSanitizedHtml()` (server: JSON → HTML → sanitize).
- `scripts/create-blog-indexes.ts` — Mongo indexes.

**Media**
- `lib/cloudinary.ts` — configured Cloudinary client + `uploadImage()`.
- `app/api/admin/upload/route.ts` — authed, validated upload endpoint.

**Admin UI**
- `app/admin/layout.tsx` — admin chrome (authed via `requireAdmin`).
- `app/admin/page.tsx` — post list/dashboard.
- `app/admin/posts/new/page.tsx`, `app/admin/posts/[id]/edit/page.tsx` — editor pages.
- `components/admin/BlogEditor.tsx` — the TipTap editor client component (toolbar, autosave).
- `components/admin/EditorToolbar.tsx`, `components/admin/PostMetaFields.tsx`, `components/admin/CategoryInput.tsx`, `components/admin/FeaturedImageInput.tsx` — editor sub-components.
- `app/admin/posts/actions.ts` — `savePost`, `deletePost`, `setPostStatus`.

**Public integration**
- Modify `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/category/[slug]/page.tsx`, `app/sitemap.ts` (and `app/api/sitemap-index` if it lists posts) to read from `lib/blog.ts`.
- `app/globals.css` — extend `fg-article` for code blocks / tables / figures / task lists; add admin editor styles.
- Retire `lib/wordpress.ts` and the `WORDPRESS_API_URL` image host in `next.config.ts`.

**Verification**
- `scripts/smoke-blog-admin.ts` — security/data smoke test.

---

## Phase 0 — Dependencies, env, config

### Task 0: Install deps and register env + image host

**Files:**
- Modify: `package.json`, `package-lock.json`
- Modify: `.env.local.example`, `.env.local`
- Modify: `next.config.ts`
- Create: `scripts/hash-password.ts`

**Interfaces:**
- Produces: env names `AUTH_SECRET`, `SUPERADMIN_USERNAME`, `SUPERADMIN_PASSWORD_HASH`, `BLOG_AUTHOR_NAME`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_UPLOAD_FOLDER`, optional `RL_LOGIN_PER_MIN`; `res.cloudinary.com` as an allowed image host.

- [ ] **Step 1: Install dependencies**

```bash
npm install jose@6 bcryptjs@3 isomorphic-dompurify@3 cloudinary@2 \
  @tiptap/react@3 @tiptap/pm@3 @tiptap/starter-kit@3 \
  @tiptap/extension-link@3 @tiptap/extension-image@3 @tiptap/extension-underline@3 \
  @tiptap/extension-placeholder@3 @tiptap/extension-character-count@3 \
  @tiptap/extension-code-block-lowlight@3 @tiptap/extension-table@3 \
  @tiptap/extension-task-list@3 @tiptap/extension-task-item@3 lowlight@3
npm install -D @types/bcryptjs
```

- [ ] **Step 2: Add the password-hash helper**

```ts
// scripts/hash-password.ts
// Usage: npx tsx scripts/hash-password.ts 'your-plaintext-password'
import bcrypt from "bcryptjs";

const pw = process.argv[2];
if (!pw) {
  console.error("Usage: npx tsx scripts/hash-password.ts '<password>'");
  process.exit(1);
}
console.log(bcrypt.hashSync(pw, 12));
```

- [ ] **Step 3: Append env docs to `.env.local.example`**

```bash
# --- Admin / blog CMS ---
AUTH_SECRET=<32+ random bytes, e.g. `openssl rand -base64 48`>
SUPERADMIN_USERNAME=admin
# Generate with: npx tsx scripts/hash-password.ts '<password>'
SUPERADMIN_PASSWORD_HASH=<bcrypt hash>
BLOG_AUTHOR_NAME=Emoji Meaning
# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
CLOUDINARY_UPLOAD_FOLDER=blog
# Optional: login rate limit (default 5/min)
# RL_LOGIN_PER_MIN=5
```

Then set real values in `.env.local` (generate `AUTH_SECRET` and the hash).

- [ ] **Step 4: Add Cloudinary image host in `next.config.ts`**

In the `images.remotePatterns` array (currently WP-only), add `{ protocol: "https", hostname: "res.cloudinary.com" }`. Keep it unconditional (not tied to `wpUrl`).

- [ ] **Step 5: Verify install + typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git checkout -b feat/blog-admin
git add package.json package-lock.json .env.local.example next.config.ts scripts/hash-password.ts
git commit -m "chore: add blog-admin deps, env, cloudinary image host"
```

---

## Phase 1 — Auth foundation

### Task 1: Session module (`lib/session.ts`)

**Files:**
- Create: `lib/session.ts`

**Interfaces:**
- Produces: `encrypt(payload) => Promise<string>`, `decrypt(token?: string) => Promise<SessionPayload | null>`, `createSession() => Promise<void>`, `deleteSession() => Promise<void>`, `readSessionToken() => Promise<string | undefined>`; type `SessionPayload = { sub: "superadmin" }`.

- [ ] **Step 1: Write the module**

```ts
// lib/session.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const SEVEN_DAYS_SEC = 7 * 24 * 60 * 60;

export type SessionPayload = { sub: "superadmin" };

function key(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key());
}

export async function decrypt(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    return payload.sub === "superadmin" ? { sub: "superadmin" } : null;
  } catch {
    return null;
  }
}

export async function createSession(): Promise<void> {
  const token = await encrypt({ sub: "superadmin" });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: SEVEN_DAYS_SEC, // 7-day non-sliding
  });
}

export async function deleteSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function readSessionToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit` → no errors.

- [ ] **Step 3: Commit** — `git commit -am "feat(auth): jose session module"`

### Task 2: Credential verification (`lib/auth.ts`)

**Files:**
- Create: `lib/auth.ts`

**Interfaces:**
- Consumes: env `SUPERADMIN_USERNAME`, `SUPERADMIN_PASSWORD_HASH`.
- Produces: `verifyCredentials(username: string, password: string) => Promise<boolean>`.

- [ ] **Step 1: Write the module**

```ts
// lib/auth.ts
import "server-only";
import bcrypt from "bcryptjs";

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.SUPERADMIN_USERNAME;
  const hash = process.env.SUPERADMIN_PASSWORD_HASH;
  if (!expectedUser || !hash) return false;
  // Compare password first (constant-ish work) then username, to avoid trivial user enumeration.
  const passwordOk = await bcrypt.compare(password, hash);
  return passwordOk && username === expectedUser;
}
```

- [ ] **Step 2: Typecheck + commit** — `npx tsc --noEmit`; `git commit -am "feat(auth): credential verification"`

### Task 3: Data Access Layer (`lib/dal.ts`)

**Files:**
- Create: `lib/dal.ts`

**Interfaces:**
- Consumes: `readSessionToken`, `decrypt` from `lib/session.ts`.
- Produces: `isAdmin() => Promise<boolean>` (non-redirecting; for actions/APIs), `requireAdmin() => Promise<void>` (redirects to `/admin/login` when unauthenticated; for pages/layouts).

- [ ] **Step 1: Write the module**

```ts
// lib/dal.ts
import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { readSessionToken, decrypt } from "./session";

export const isAdmin = cache(async (): Promise<boolean> => {
  const session = await decrypt(await readSessionToken());
  return session?.sub === "superadmin";
});

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
```

- [ ] **Step 2: Typecheck + commit** — `git commit -am "feat(auth): DAL isAdmin/requireAdmin"`

### Task 4: Login rate-limit tier

**Files:**
- Modify: `lib/ratelimit.ts`

**Interfaces:**
- Consumes: existing `Tier`, `windowsFor`, `envInt`.
- Produces: `"login"` added to `Tier`; `enforceRateLimit(req, "login")` usable (fail-closed like other non-public tiers).

- [ ] **Step 1: Add the login tier**

In `lib/ratelimit.ts`: extend `export type Tier = "text" | "image" | "public" | "login";` and add a case in `windowsFor`:

```ts
    case "login":
      return [{ limit: envInt("RL_LOGIN_PER_MIN", 5), window: "60 s", suffix: "min" }];
```

`enforceRateLimit` already treats any non-`"public"` tier as fail-closed, which is correct for login.

- [ ] **Step 2: Typecheck + commit** — `git commit -am "feat(auth): login rate-limit tier (5/min)"`

### Task 5: Login page + auth actions

**Files:**
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/actions.ts`

**Interfaces:**
- Consumes: `verifyCredentials`, `createSession`, `deleteSession`, `enforceRateLimit`, `isAdmin`.
- Produces: server actions `login(prevState, formData) => Promise<{ error?: string }>` and `logout() => Promise<void>`.

- [ ] **Step 1: Write the auth actions**

```ts
// app/admin/actions.ts
"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";
import { enforceRateLimit } from "@/lib/ratelimit";

export async function login(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  // Rebuild a minimal Request so the limiter can read IP + origin from headers.
  const h = await headers();
  const req = new Request("http://internal/admin/login", {
    method: "POST",
    headers: h,
  });
  const blocked = await enforceRateLimit(req, "login");
  if (blocked) return { error: "Too many attempts. Please wait a minute and try again." };

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!(await verifyCredentials(username, password))) {
    return { error: "Invalid username or password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
```

Note: `enforceRateLimit` reads `x-forwarded-for`/`origin` from the passed `Request.headers`; forwarding the incoming `headers()` preserves them. Confirm during verification that a real login trips the 5/min limit.

- [ ] **Step 2: Write the login page** (client form using `useActionState`, styled with `fg-*`)

```tsx
// app/admin/login/page.tsx
"use client";
import { useActionState } from "react";
import { login } from "../actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, {});
  return (
    <main className="theme-editorial min-h-screen flex items-center justify-center px-5">
      <form action={formAction} className="w-full max-w-sm">
        <p className="fg-kicker mb-3">Field Guide</p>
        <h1 className="font-display t-ink text-[2rem] mb-7">Admin sign in</h1>
        <label className="fg-label block mb-2">Username</label>
        <input name="username" autoComplete="username" className="fg-field w-full px-4 py-3 mb-5" required />
        <label className="fg-label block mb-2">Password</label>
        <input name="password" type="password" autoComplete="current-password" className="fg-field w-full px-4 py-3 mb-6" required />
        {state.error && <div className="fg-alert px-4 py-3 mb-5">{state.error}</div>}
        <button disabled={pending} className="fg-btn w-full py-3">{pending ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
```

- [ ] **Step 3: Typecheck + commit** — `git commit -am "feat(auth): login page + login/logout actions"`

### Task 6: Proxy gate (`proxy.ts`)

**Files:**
- Create: `proxy.ts` (project root — Next 16 replacement for `middleware.ts`)

**Interfaces:**
- Consumes: `decrypt`, `SESSION_COOKIE` from `lib/session.ts`.
- Produces: redirect to `/admin/login` for unauthenticated `/admin/*` (except `/admin/login`); redirect authenticated users away from `/admin/login` to `/admin`.

- [ ] **Step 1: Confirm the convention**

Re-read `node_modules/next/dist/docs/01-app/02-guides/authentication.md` §"Optimistic checks with Proxy". Confirm: file is `proxy.ts`, `export default async function proxy(req: NextRequest)`, `export const config = { matcher: [...] }`, Node.js runtime, read cookie via `req.cookies.get(name)?.value` (avoid `cookies()` in proxy to keep it simple).

- [ ] **Step 2: Write the proxy**

```ts
// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt, SESSION_COOKIE } from "@/lib/session";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const session = await decrypt(req.cookies.get(SESSION_COOKIE)?.value);
  const authed = session?.sub === "superadmin";

  if (!authed && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
  if (authed && isLogin) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 3: Manual verify**

Run `npm run dev`. Visit `http://localhost:3000/admin` logged-out → redirects to `/admin/login`. This is the optimistic gate; the authoritative check is `requireAdmin()` in the admin layout (Task 13) and `isAdmin()` in every write.

- [ ] **Step 4: Commit** — `git commit -am "feat(auth): proxy gate for /admin"`

---

## Phase 2 — Blog data layer

### Task 7: Blog types

**Files:**
- Modify: `types/blog.ts`

**Interfaces:**
- Produces: `BlogPost` (stored shape), `BlogPostInput`, `BlogCategoryRef`, `BlogListItem`. These are consumed by `lib/blog.ts`, the editor, and all public pages.

- [ ] **Step 1: Replace `types/blog.ts`**

```ts
// types/blog.ts
export interface BlogCategoryRef {
  name: string;
  slug: string;
}

export type BlogStatus = "draft" | "published";

/** Stored document in the `blog_posts` collection. */
export interface BlogPost {
  id: string;               // stringified Mongo _id
  slug: string;
  title: string;
  excerpt: string;
  content_json: unknown;    // canonical ProseMirror JSON (TipTap getJSON())
  content_html: string;     // sanitized, rendered HTML for display
  status: BlogStatus;
  featured_image: string | null;
  featured_image_alt: string;
  categories: BlogCategoryRef[];
  seo_title: string;        // may be "" -> fall back to title
  seo_description: string;  // may be "" -> fall back to excerpt
  author: string;
  reading_time: number;     // minutes
  created_at: string;       // ISO
  updated_at: string;       // ISO
  published_at: string | null; // ISO, set on first publish
}

/** Input accepted by createPost/updatePost (server-derives html/reading_time/timestamps). */
export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content_json: unknown;
  status: BlogStatus;
  featured_image: string | null;
  featured_image_alt: string;
  categories: BlogCategoryRef[];
  seo_title: string;
  seo_description: string;
}

/** Trimmed shape for list/card views (no content). */
export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: BlogStatus;
  featured_image: string | null;
  categories: BlogCategoryRef[];
  author: string;
  reading_time: number;
  published_at: string | null;
  updated_at: string;
}

export interface BlogCategoryCount {
  name: string;
  slug: string;
  count: number;
}
```

- [ ] **Step 2: Typecheck** — expect errors in files importing the old `BlogPost`/`BlogCategory` (blog pages, `BlogCard`, `lib/wordpress.ts`). These are fixed in Phase 5. Commit anyway to lock the type.

- [ ] **Step 3: Commit** — `git commit -am "feat(blog): stored BlogPost types"`

### Task 8: Slug + sanitize helpers

**Files:**
- Create: `lib/slug.ts`, `lib/sanitize.ts`

**Interfaces:**
- Produces: `slugify(text: string) => string`; `ensureUniqueSlug(base: string, existsFn: (slug: string) => Promise<boolean>) => Promise<string>`; `sanitizeHtml(html: string) => string`.

- [ ] **Step 1: `lib/slug.ts`**

```ts
// lib/slug.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "post";
}

export async function ensureUniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = base;
  let n = 2;
  while (await exists(slug)) slug = `${base}-${n++}`;
  return slug;
}
```

- [ ] **Step 2: `lib/sanitize.ts`**

```ts
// lib/sanitize.ts
import "server-only";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p", "br", "hr", "h2", "h3", "h4", "strong", "em", "u", "s", "a",
  "ul", "ol", "li", "blockquote", "code", "pre", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "th", "td", "span", "div",
];
const ALLOWED_ATTR = ["href", "src", "alt", "title", "class", "target", "rel", "colspan", "rowspan", "data-type", "data-checked"];

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(https?:|mailto:|\/)/i, // block javascript:
  });
}
```

- [ ] **Step 3: Typecheck + commit** — `git commit -am "feat(blog): slug + html sanitize helpers"`

### Task 9: Shared TipTap extensions + server HTML render

**Files:**
- Create: `lib/editor-extensions.ts`, `lib/blog-html.ts`

**Interfaces:**
- Produces: `editorExtensions` (array; imported by BOTH the client editor and server `generateHTML`); `jsonToSanitizedHtml(json: unknown) => string`; `estimateReadingTime(json: unknown) => number`.

- [ ] **Step 1: `lib/editor-extensions.ts`** (framework-agnostic `@tiptap/core` extensions only — safe on server)

```ts
// lib/editor-extensions.ts
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { createLowlight, common } from "lowlight";

const lowlight = createLowlight(common);

export const editorExtensions = [
  StarterKit.configure({ codeBlock: false, heading: { levels: [2, 3, 4] } }),
  Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
  Image.configure({ HTMLAttributes: { class: "fg-article__img" } }),
  Underline,
  CodeBlockLowlight.configure({ lowlight }),
  Table.configure({ resizable: false }),
  TableRow,
  TableHeader,
  TableCell,
  TaskList,
  TaskItem.configure({ nested: true }),
];
```

- [ ] **Step 2: `lib/blog-html.ts`**

```ts
// lib/blog-html.ts
import "server-only";
import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/core";
import { editorExtensions } from "./editor-extensions";
import { sanitizeHtml } from "./sanitize";

export function jsonToSanitizedHtml(json: unknown): string {
  const html = generateHTML(json as JSONContent, editorExtensions);
  return sanitizeHtml(html);
}

/** ~200 wpm over the plain text of the doc. */
export function estimateReadingTime(json: unknown): number {
  const text = collectText(json as JSONContent);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function collectText(node: JSONContent | undefined): string {
  if (!node) return "";
  let out = node.text ?? "";
  for (const child of node.content ?? []) out += " " + collectText(child);
  return out;
}
```

- [ ] **Step 3: Typecheck + commit** — `git commit -am "feat(blog): shared tiptap extensions + server html render"`

### Task 10: Blog data layer (`lib/blog.ts`)

**Files:**
- Create: `lib/blog.ts`

**Interfaces:**
- Consumes: `connectToDatabase` (`lib/mongodb.ts`), `getCached/setCached` (`lib/redis.ts`), `jsonToSanitizedHtml`/`estimateReadingTime` (`lib/blog-html.ts`), `slugify`/`ensureUniqueSlug` (`lib/slug.ts`).
- Produces:
  - Public: `getPublishedPosts(page, perPage, categorySlug?) => Promise<{ posts: BlogListItem[]; totalPages: number }>`; `getPublishedPostBySlug(slug) => Promise<BlogPost | null>`; `getCategoryCounts() => Promise<BlogCategoryCount[]>`; `getAllPublishedSlugs() => Promise<string[]>`; `getRelatedPosts(categorySlug, excludeSlug, limit) => Promise<BlogListItem[]>`.
  - Admin: `listAllPosts() => Promise<BlogListItem[]>`; `getPostById(id) => Promise<BlogPost | null>`; `createPost(input) => Promise<{ id: string; slug: string }>`; `updatePost(id, input) => Promise<{ slug: string }>`; `deletePost(id) => Promise<void>`; `setStatus(id, status) => Promise<{ slug: string }>`; `getExistingCategoryNames() => Promise<string[]>`.

- [ ] **Step 1: Write `lib/blog.ts`.** Key rules:
  - Collection: `db.collection("blog_posts")`.
  - `createPost`/`updatePost`: server-derive `content_html = jsonToSanitizedHtml(input.content_json)`, `reading_time`, timestamps; on create, `slug = ensureUniqueSlug(input.slug || slugify(input.title), slugExists)`; set `published_at` the first time `status` becomes `"published"`.
  - Map `_id` → `id: string` in every returned object; never leak the raw `_id`.
  - Public reads cache in Redis (short TTL, e.g. 300s) keyed by args; admin reads are uncached (always fresh).
  - `getExistingCategoryNames`: `distinct("categories.name")` across published posts (for autocomplete).

Full reference implementation:

```ts
// lib/blog.ts
import "server-only";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { getCached, setCached } from "./redis";
import { jsonToSanitizedHtml, estimateReadingTime } from "./blog-html";
import { slugify, ensureUniqueSlug } from "./slug";
import type {
  BlogPost, BlogPostInput, BlogListItem, BlogCategoryCount, BlogStatus,
} from "@/types/blog";

const COLLECTION = "blog_posts";

/* eslint-disable @typescript-eslint/no-explicit-any */
function toPost(d: any): BlogPost {
  return {
    id: String(d._id),
    slug: d.slug, title: d.title, excerpt: d.excerpt,
    content_json: d.content_json, content_html: d.content_html,
    status: d.status, featured_image: d.featured_image ?? null,
    featured_image_alt: d.featured_image_alt ?? "",
    categories: d.categories ?? [], seo_title: d.seo_title ?? "",
    seo_description: d.seo_description ?? "", author: d.author,
    reading_time: d.reading_time ?? 1,
    created_at: d.created_at, updated_at: d.updated_at,
    published_at: d.published_at ?? null,
  };
}
function toListItem(d: any): BlogListItem {
  return {
    id: String(d._id), slug: d.slug, title: d.title, excerpt: d.excerpt,
    status: d.status, featured_image: d.featured_image ?? null,
    categories: d.categories ?? [], author: d.author,
    reading_time: d.reading_time ?? 1,
    published_at: d.published_at ?? null, updated_at: d.updated_at,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const LIST_PROJECTION = {
  slug: 1, title: 1, excerpt: 1, status: 1, featured_image: 1,
  categories: 1, author: 1, reading_time: 1, published_at: 1, updated_at: 1,
} as const;

export async function getPublishedPosts(
  page = 1, perPage = 12, categorySlug?: string
): Promise<{ posts: BlogListItem[]; totalPages: number }> {
  const cacheKey = `blog:list:${categorySlug ?? "all"}:${page}:${perPage}`;
  const cached = await getCached<{ posts: BlogListItem[]; totalPages: number }>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return { posts: [], totalPages: 0 };
  const col = conn.db.collection(COLLECTION);
  const filter: Record<string, unknown> = { status: "published" };
  if (categorySlug) filter["categories.slug"] = categorySlug;
  const [docs, total] = await Promise.all([
    col.find(filter, { projection: LIST_PROJECTION })
      .sort({ published_at: -1 }).skip((page - 1) * perPage).limit(perPage).toArray(),
    col.countDocuments(filter),
  ]);
  const result = { posts: docs.map(toListItem), totalPages: Math.max(1, Math.ceil(total / perPage)) };
  await setCached(cacheKey, result, 300);
  return result;
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const cacheKey = `blog:post:${slug}`;
  const cached = await getCached<BlogPost>(cacheKey);
  if (cached) return cached;
  const conn = await connectToDatabase();
  if (!conn) return null;
  const d = await conn.db.collection(COLLECTION).findOne({ slug, status: "published" });
  if (!d) return null;
  const post = toPost(d);
  await setCached(cacheKey, post, 300);
  return post;
}

export async function getCategoryCounts(): Promise<BlogCategoryCount[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const rows = await conn.db.collection(COLLECTION).aggregate([
    { $match: { status: "published" } },
    { $unwind: "$categories" },
    { $group: { _id: { name: "$categories.name", slug: "$categories.slug" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]).toArray();
  return rows.map((r) => ({ name: r._id.name, slug: r._id.slug, count: r.count }));
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await conn.db.collection(COLLECTION)
    .find({ status: "published" }, { projection: { slug: 1 } }).toArray();
  return docs.map((d) => d.slug as string);
}

export async function getRelatedPosts(
  categorySlug: string | undefined, excludeSlug: string, limit = 3
): Promise<BlogListItem[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const filter: Record<string, unknown> = { status: "published", slug: { $ne: excludeSlug } };
  if (categorySlug) filter["categories.slug"] = categorySlug;
  const docs = await conn.db.collection(COLLECTION)
    .find(filter, { projection: LIST_PROJECTION }).sort({ published_at: -1 }).limit(limit).toArray();
  return docs.map(toListItem);
}

// --- Admin (uncached) ---

export async function listAllPosts(): Promise<BlogListItem[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await conn.db.collection(COLLECTION)
    .find({}, { projection: LIST_PROJECTION }).sort({ updated_at: -1 }).toArray();
  return docs.map(toListItem);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connectToDatabase();
  if (!conn) return null;
  const d = await conn.db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
  return d ? toPost(d) : null;
}

export async function getExistingCategoryNames(): Promise<string[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return (await conn.db.collection(COLLECTION).distinct("categories.name")) as string[];
}

async function slugExists(slug: string, exceptId?: string): Promise<boolean> {
  const conn = await connectToDatabase();
  if (!conn) return false;
  const q: Record<string, unknown> = { slug };
  if (exceptId && ObjectId.isValid(exceptId)) q._id = { $ne: new ObjectId(exceptId) };
  return !!(await conn.db.collection(COLLECTION).findOne(q, { projection: { _id: 1 } }));
}

export async function createPost(input: BlogPostInput): Promise<{ id: string; slug: string }> {
  const conn = await connectToDatabase();
  if (!conn) throw new Error("DB unavailable");
  const now = new Date().toISOString();
  const base = slugify(input.slug || input.title);
  const slug = await ensureUniqueSlug(base, (s) => slugExists(s));
  const doc = {
    ...input, slug,
    content_html: jsonToSanitizedHtml(input.content_json),
    reading_time: estimateReadingTime(input.content_json),
    author: process.env.BLOG_AUTHOR_NAME || "Staff",
    created_at: now, updated_at: now,
    published_at: input.status === "published" ? now : null,
  };
  const res = await conn.db.collection(COLLECTION).insertOne(doc);
  return { id: String(res.insertedId), slug };
}

export async function updatePost(id: string, input: BlogPostInput): Promise<{ slug: string }> {
  if (!ObjectId.isValid(id)) throw new Error("bad id");
  const conn = await connectToDatabase();
  if (!conn) throw new Error("DB unavailable");
  const _id = new ObjectId(id);
  const existing = await conn.db.collection(COLLECTION).findOne({ _id });
  if (!existing) throw new Error("not found");
  const now = new Date().toISOString();
  const base = slugify(input.slug || input.title);
  const slug = base === existing.slug ? existing.slug : await ensureUniqueSlug(base, (s) => slugExists(s, id));
  const becomingPublished = input.status === "published" && !existing.published_at;
  await conn.db.collection(COLLECTION).updateOne({ _id }, {
    $set: {
      ...input, slug,
      content_html: jsonToSanitizedHtml(input.content_json),
      reading_time: estimateReadingTime(input.content_json),
      updated_at: now,
      published_at: becomingPublished ? now : existing.published_at ?? null,
    },
  });
  return { slug };
}

export async function setStatus(id: string, status: BlogStatus): Promise<{ slug: string }> {
  if (!ObjectId.isValid(id)) throw new Error("bad id");
  const conn = await connectToDatabase();
  if (!conn) throw new Error("DB unavailable");
  const _id = new ObjectId(id);
  const existing = await conn.db.collection(COLLECTION).findOne({ _id });
  if (!existing) throw new Error("not found");
  const now = new Date().toISOString();
  await conn.db.collection(COLLECTION).updateOne({ _id }, {
    $set: {
      status, updated_at: now,
      published_at: status === "published" && !existing.published_at ? now : existing.published_at ?? null,
    },
  });
  return { slug: existing.slug };
}

export async function deletePost(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const conn = await connectToDatabase();
  if (!conn) return;
  await conn.db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}
```

- [ ] **Step 2: Typecheck + commit** — `git commit -am "feat(blog): mongodb data layer"`

### Task 11: Mongo indexes

**Files:**
- Create: `scripts/create-blog-indexes.ts`

- [ ] **Step 1: Write the index script** (unique `slug`, plus `status + published_at`, and `categories.slug`)

```ts
// scripts/create-blog-indexes.ts
import { connectToDatabase } from "../lib/mongodb";

async function main() {
  const conn = await connectToDatabase();
  if (!conn) throw new Error("Set MONGODB_URI");
  const col = conn.db.collection("blog_posts");
  await col.createIndex({ slug: 1 }, { unique: true });
  await col.createIndex({ status: 1, published_at: -1 });
  await col.createIndex({ "categories.slug": 1 });
  console.log("blog_posts indexes created");
  process.exit(0);
}
main();
```

- [ ] **Step 2: Run it + commit**

Run: `env-cmd -f .env.local npx tsx scripts/create-blog-indexes.ts`
Expected: "blog_posts indexes created". Add an npm script `"create-blog-indexes"` mirroring the existing `create-indexes` entry. Commit.

---

## Phase 3 — Cloudinary upload

### Task 12: Cloudinary client + authed upload endpoint

**Files:**
- Create: `lib/cloudinary.ts`, `app/api/admin/upload/route.ts`

**Interfaces:**
- Produces: `uploadImage(bytes: Buffer, filename: string) => Promise<{ url: string }>`; `POST /api/admin/upload` (multipart `file`) → `{ url }` (401 if not admin; 400 on bad type/size).

- [ ] **Step 1: `lib/cloudinary.ts`**

```ts
// lib/cloudinary.ts
import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(bytes: Buffer): Promise<{ url: string }> {
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "blog";
  const dataUri = `data:image/*;base64,${bytes.toString("base64")}`;
  const res = await cloudinary.uploader.upload(dataUri, { folder, resource_type: "image" });
  return { url: res.secure_url };
}
```

- [ ] **Step 2: `app/api/admin/upload/route.ts`** (auth + validation)

```ts
// app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/dal";
import { uploadImage } from "@/lib/cloudinary";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Unsupported type" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const { url } = await uploadImage(bytes);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
```

- [ ] **Step 3: Typecheck + commit** — `git commit -am "feat(blog): authed cloudinary upload endpoint"`

---

## Phase 4 — Admin UI + editor

### Task 13: Admin layout + dashboard list

**Files:**
- Create: `app/admin/layout.tsx`, `app/admin/page.tsx`

**Interfaces:**
- Consumes: `requireAdmin` (`lib/dal.ts`), `listAllPosts` (`lib/blog.ts`), `logout` (`app/admin/actions.ts`).

- [ ] **Step 1: `app/admin/layout.tsx`** — authoritative gate + admin chrome. The login page must NOT be gated by this layout's `requireAdmin`; place login under this layout but early-return before the guard by checking the segment, OR (simpler) put `requireAdmin()` only in `app/admin/(protected)/layout.tsx` and move dashboard/editor under a `(protected)` route group while keeping `app/admin/login` outside it. Use the route-group approach:
  - Move dashboard/editor pages under `app/admin/(protected)/...`.
  - `app/admin/(protected)/layout.tsx` calls `await requireAdmin()` then renders chrome (site title, "New post" link, logout button as a `form action={logout}`).
  - `app/admin/login/page.tsx` stays at `app/admin/login` (outside the group, ungated).

- [ ] **Step 2: `app/admin/(protected)/page.tsx`** — list posts via `listAllPosts()`, grouped/filtered by status, each row linking to `/admin/posts/[id]/edit`, with a status badge and a "New post →" CTA. Style with `fg-*`.

- [ ] **Step 3: Manual verify** — logged in, `/admin` shows the (empty) list; logout redirects to login. Commit.

### Task 14: Editor sub-components

**Files:**
- Create: `components/admin/CategoryInput.tsx`, `components/admin/FeaturedImageInput.tsx`, `components/admin/PostMetaFields.tsx`, `components/admin/EditorToolbar.tsx`

**Interfaces:**
- `CategoryInput`: props `{ value: BlogCategoryRef[]; onChange; suggestions: string[] }` — tag input with datalist autocomplete; derives slug via `slugify` on add.
- `FeaturedImageInput`: props `{ value: string | null; alt: string; onChange(url, alt) }` — posts to `/api/admin/upload`, shows preview.
- `PostMetaFields`: props for title, slug (auto from title, editable), excerpt, seo_title, seo_description, status — controlled inputs styled `fg-field`.
- `EditorToolbar`: props `{ editor: Editor }` — buttons calling `editor.chain().focus().toggleBold()` etc., plus image insert (reuses upload), link prompt, table insert.

- [ ] **Step 1–4:** Implement each as a client component using `fg-*` styles. For `EditorToolbar`, guard every button with `editor.isActive(...)` for active state. Image button triggers a hidden `<input type=file>` → upload → `editor.chain().focus().setImage({ src: url }).run()`. Typecheck + commit per component.

### Task 15: BlogEditor (TipTap) with autosave

**Files:**
- Create: `components/admin/BlogEditor.tsx`

**Interfaces:**
- Consumes: `editorExtensions`, `EditorToolbar`, `PostMetaFields`, `CategoryInput`, `FeaturedImageInput`, the `savePost` action.
- Props: `{ initial?: BlogPost; suggestions: string[] }`.

- [ ] **Step 1: Build the editor** using `useEditor({ extensions: [...editorExtensions, Placeholder.configure(...), CharacterCount], content: initial?.content_json ?? "", editorProps: { attributes: { class: "fg-article ..." } } })`. Assemble meta fields + toolbar + `EditorContent`. Add Placeholder + CharacterCount here (client-only extensions kept out of the shared server array).

- [ ] **Step 2: Autosave** — a debounced (e.g. 1.5s) effect that calls `savePost` with `status: "draft"` when content/meta change and the post already has an id (new posts autosave after the first manual save that yields an id). Show a "Saved · HH:MM" indicator. Guard against autosaving an empty title.

- [ ] **Step 3: Publish/Save controls** — "Save draft" and "Publish" buttons call `savePost` with the chosen status; "Preview" opens `/blog/[slug]?preview=1` in a new tab (preview handled in Task 17).

- [ ] **Step 4: Manual verify + commit** — type content, confirm autosave indicator, styling matches `fg-article`.

### Task 16: Post server actions + editor pages

**Files:**
- Create: `app/admin/posts/actions.ts`
- Create: `app/admin/(protected)/posts/new/page.tsx`, `app/admin/(protected)/posts/[id]/edit/page.tsx`

**Interfaces:**
- Produces: `savePost(input: BlogPostInput & { id?: string }) => Promise<{ id: string; slug: string }>`, `deletePost(id: string) => Promise<void>`, `setPostStatus(id: string, status: BlogStatus) => Promise<void>`. Each **re-verifies `isAdmin()`** and `revalidatePath`s affected routes.

- [ ] **Step 1: `app/admin/posts/actions.ts`**

```ts
// app/admin/posts/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/dal";
import { createPost, updatePost, deletePost as del, setStatus } from "@/lib/blog";
import type { BlogPostInput, BlogStatus } from "@/types/blog";

async function assertAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
function revalidateBlog(slug: string, categories: { slug: string }[] = []) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  for (const c of categories) revalidatePath(`/blog/category/${c.slug}`);
  revalidatePath("/sitemap.xml");
}

export async function savePost(input: BlogPostInput & { id?: string }): Promise<{ id: string; slug: string }> {
  await assertAdmin();
  const { id, ...data } = input;
  const res = id ? { id, ...(await updatePost(id, data)) } : await createPost(data);
  revalidateBlog(res.slug, data.categories);
  return res;
}

export async function setPostStatus(id: string, status: BlogStatus): Promise<void> {
  await assertAdmin();
  const { slug } = await setStatus(id, status);
  revalidateBlog(slug);
}

export async function deletePost(id: string): Promise<void> {
  await assertAdmin();
  await del(id);
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin");
}
```

- [ ] **Step 2: Editor pages** — `new/page.tsx` renders `<BlogEditor suggestions={await getExistingCategoryNames()} />`; `[id]/edit/page.tsx` loads `getPostById(id)` (404 via `notFound()` if missing) and renders `<BlogEditor initial={post} suggestions={...} />`. Both are under `(protected)` so already gated.

- [ ] **Step 3: Manual verify + commit** — create, edit, publish, delete a post; confirm it persists.

---

## Phase 5 — Public rendering integration

### Task 17: Switch `/blog` pages + preview to Mongo

**Files:**
- Modify: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/category/[slug]/page.tsx`, `components/BlogCard.tsx`

**Interfaces:**
- Consumes: `getPublishedPosts`, `getPublishedPostBySlug`, `getCategoryCounts`, `getRelatedPosts`, `getPostById`, `isAdmin`.

- [ ] **Step 1: `/blog` list** — replace `getPosts`/`getCategories` (WP) with `getPublishedPosts`/`getCategoryCounts`. Update `BlogCard` to the `BlogListItem` shape (`featured_image`, `published_at`, `reading_time`, category `.slug`). Keep the design markup.
- [ ] **Step 2: `/blog/[slug]`** — replace `getPostBySlug`/`getPosts`. Render `post.content_html` through `BlogContent` (unchanged). Build Article/Breadcrumb JSON-LD from the new fields (`author`, `published_at`, `featured_image`, `seo_title`/`seo_description` fallbacks in `generateMetadata`). **Preview:** accept `searchParams.preview`; if `preview` is set AND `await isAdmin()`, allow loading a draft via `getPostById`/an unpublished lookup; otherwise `notFound()` for non-published. Keep weekly ISR + on-demand revalidation.
- [ ] **Step 3: `/blog/category/[slug]`** — replace `getCategoryBySlug`/`getPosts` with `getPublishedPosts(page, perPage, slug)` + derive the category name from `getCategoryCounts()`. `notFound()` if the category has zero published posts.
- [ ] **Step 4: Typecheck + manual verify + commit** — published post appears at `/blog` and `/blog/[slug]`; a draft 404s publicly but renders with `?preview=1` when logged in.

### Task 18: Sitemap + retire WordPress

**Files:**
- Modify: `app/sitemap.ts` (and `app/api/sitemap-index/route.ts` if it enumerates posts)
- Modify: `next.config.ts`
- Delete: `lib/wordpress.ts`
- Modify: `.env.local.example` (remove `WORDPRESS_API_URL`)

- [ ] **Step 1: Sitemap** — replace any `getAllPostSlugs` (WP) usage with `getAllPublishedSlugs()` from `lib/blog.ts`.
- [ ] **Step 2:** Grep for remaining WP imports: `grep -rn "lib/wordpress\|WORDPRESS_API_URL" app lib components next.config.ts` → expect zero after edits. Delete `lib/wordpress.ts`. Remove the WP branch from `next.config.ts` `images.remotePatterns` (keep Cloudinary). Remove `WORDPRESS_API_URL` from `.env.local.example`.
- [ ] **Step 3: Typecheck + commit** — `git commit -am "feat(blog): mongo-backed public blog + sitemap; retire wordpress"`

### Task 19: Extend `fg-article` + editor styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1:** Add styles under `fg-article` for elements WP didn't emit: `pre code` (code blocks, using lowlight's `hljs` token classes), `table/th/td` borders, `figure/figcaption`, `ul[data-type="taskList"]` + checkboxes, and `.fg-article__img`. Add an admin editor wrapper style so the `EditorContent` surface matches the published look (WYSIWYG), plus toolbar button styles.
- [ ] **Step 2: Manual verify** — a post using every toolbar feature renders correctly on `/blog/[slug]` and looks identical in the editor. Commit.

---

## Phase 6 — Verification

### Task 20: Security/data smoke test

**Files:**
- Create: `scripts/smoke-blog-admin.ts`

- [ ] **Step 1: Write the smoke test** (mirrors `scripts/smoke-ratelimit.ts`). Against a running dev server, assert:
  - `GET /admin` (no cookie) → 307/redirect to `/admin/login`.
  - `POST /api/admin/upload` (no cookie) → 401.
  - Calling the `savePost` path without a session is rejected (401/Unauthorized) — exercise via a small authed vs unauthed fetch to an admin API, or document as a manual step if server actions can't be invoked over HTTP directly.
  - Login brute force: POST the login form >5 times in a minute → a 429/"Too many attempts" result. (Set `RL_LOGIN_PER_MIN=2` temporarily, as done for the rate-limit smoke test; restore after.)
  - A published post is returned by `getPublishedPosts` and a draft is not (seed one of each via the data layer in the script, then clean up).

- [ ] **Step 2: Run it** — `npm run dev` in one terminal, `npx tsx scripts/smoke-blog-admin.ts` in another. All checks pass. Stop the dev server afterward. Commit.

### Task 21: Manual E2E checklist

- [ ] Log in with real credentials → lands on `/admin`.
- [ ] Create a post: title, body using **every** toolbar feature (headings, bold/italic/underline, lists, quote, code block, inline code, link, table, task list, image upload to Cloudinary, HR, emoji).
- [ ] Confirm autosave indicator updates while typing; reload the edit page → content intact.
- [ ] Set categories (autocomplete works), excerpt, SEO title/description, featured image.
- [ ] Preview (`?preview=1`) renders the draft; incognito/logged-out `/blog/[slug]` 404s while draft.
- [ ] Publish → appears immediately on `/blog`, `/blog/[slug]`, and the relevant `/blog/category/[slug]`; sitemap includes it.
- [ ] Edit the published post → change reflects immediately (on-demand revalidation).
- [ ] Unpublish → disappears from `/blog`. Delete → gone; `/blog/[slug]` 404s.
- [ ] Confirm `res.cloudinary.com` images load and are `next/image`-optimized.
- [ ] `npx tsc --noEmit` clean; `npx eslint <changed files>` clean.

---

## Self-Review Notes (for the executor)

- **Spec coverage:** WordPress retirement (T18), Mongo store (T7/T10), lightweight `jose`+`bcryptjs` auth (T1/T2), proxy gate + per-write recheck (T6/T16), TipTap w/ full toolbar (T9/T14/T15), JSON+sanitized-HTML storage (T9/T10), Cloudinary signed upload (T12), draft/publish + SEO fields (T7/T10/T16), freeform categories w/ autocomplete (T14), CRUD+autosave+preview (T15/T16/T17), on-demand revalidation (T16), reuse+extend `fg-article` WYSIWYG (T15/T19), 7-day SameSite=Strict cookie + 5/min login limit (T1/T4), verification (T20/T21). All 13 locked decisions map to tasks.
- **Known integration risks to watch:** (1) invoking server actions from the smoke test over HTTP is awkward — prefer testing the admin *API* boundary (`/api/admin/upload`) for the unauthed-write check and treat action auth as covered by the shared `assertAdmin`/`isAdmin`. (2) `@tiptap/html`'s `generateHTML` must run only server-side (it pulls in a DOM shim); keep it in `lib/blog-html.ts` (`server-only`). (3) Placeholder/CharacterCount are client-only — do not add them to `lib/editor-extensions.ts` (shared with the server), add them inside `BlogEditor`. (4) Confirm the `(protected)` route-group gate covers all authed pages and that `/admin/login` sits outside it.
