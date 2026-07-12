// lib/blog.ts
import "server-only";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { getCached, setCached, incrCached } from "./redis";
import { jsonToSanitizedHtml, estimateReadingTime } from "./blog-html";
import { slugify, ensureUniqueSlug } from "./slug";
import type {
  BlogPost, BlogPostInput, BlogListItem, BlogCategoryCount, BlogStatus,
} from "@/types/blog";

const COLLECTION = "blog_posts";

// The sitemap chunk id (see generateSitemaps() in app/sitemap.ts) that serves
// blog post URLs at /sitemap/<id>.xml. Shared here so app/sitemap.ts and the
// admin revalidation actions can't drift apart.
export const BLOG_SITEMAP_ID = 18;

// Bumped on every write that can change public list-page output (new post,
// status change, slug/category change, delete). getPublishedPosts() folds
// the current value into its cache key, so a bump makes every previously
// cached `blog:list:*` page unreachable instantly — no need to enumerate
// every category/page/perPage combination to delete individually.
const LIST_GEN_KEY = "blog:list:gen";
async function bumpBlogListGeneration(): Promise<void> {
  await incrCached(LIST_GEN_KEY);
}

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
  const gen = (await getCached<number>(LIST_GEN_KEY)) ?? 0;
  const cacheKey = `blog:list:${categorySlug ?? "all"}:${page}:${perPage}:${gen}`;
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

// No Redis cache here (unlike getPublishedPosts). This powers the
// /blog/[slug] page, which is weekly on-demand ISR (revalidate=604800) and is
// invalidated on write via revalidatePath (see app/admin/posts/actions.ts).
// A Redis read here would be a `no-store` fetch (the Upstash REST client),
// which forces the ISR render dynamic — Next then aborts it as "static to
// dynamic at runtime" and 500s the route. Mongo reads use the native driver
// (TCP, not fetch), so they are prerender-safe.
export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const conn = await connectToDatabase();
  if (!conn) return null;
  const d = await conn.db.collection(COLLECTION).findOne({ slug, status: "published" });
  return d ? toPost(d) : null;
}

// Uncached lookup by slug regardless of status — used only for admin-gated
// draft/unpublished previews. Callers MUST check `isAdmin()` before calling.
export async function getPostBySlugForPreview(slug: string): Promise<BlogPost | null> {
  const conn = await connectToDatabase();
  if (!conn) return null;
  const d = await conn.db.collection(COLLECTION).findOne({ slug });
  return d ? toPost(d) : null;
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
  await bumpBlogListGeneration();
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
  // The /blog/<slug> ISR page is busted by revalidatePath in the save action;
  // the list-page cache (Redis) is invalidated by bumping the generation key.
  await bumpBlogListGeneration();
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
  // Unpublish/re-publish is reflected on the /blog/<slug> page via
  // revalidatePath in the action; the list cache via the generation bump.
  await bumpBlogListGeneration();
  return { slug: existing.slug };
}

export async function deletePost(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const conn = await connectToDatabase();
  if (!conn) return;
  const _id = new ObjectId(id);
  await conn.db.collection(COLLECTION).deleteOne({ _id });
  // The caller (deletePost action) revalidatePath's /blog/<slug>; the list
  // cache is invalidated by the generation bump below.
  await bumpBlogListGeneration();
}
