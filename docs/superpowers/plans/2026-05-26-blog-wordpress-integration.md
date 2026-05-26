# Blog: Headless WordPress Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a blog at `/blog/*` that fetches content from an existing WordPress instance via its REST API and renders it inside the Next.js app with full SEO, loading skeletons, and animations.

**Architecture:** A thin `lib/wordpress.ts` client wraps WP REST API calls and maps verbose responses to clean TypeScript types. Three server-rendered routes (`/blog`, `/blog/[slug]`, `/blog/category/[slug]`) fetch from WP on every request. Blog posts render WP HTML content inside a Tailwind Typography `prose` container. Sitemap extended with a new chunk for blog URLs.

**Tech Stack:** Next.js 16 App Router, WP REST API v2, `@tailwindcss/typography`, Framer Motion (existing wrappers), Tailwind CSS 4

**Spec:** `docs/superpowers/specs/2026-05-26-blog-wordpress-integration-design.md`

---

### Task 1: Install Typography Plugin + Environment Setup

**Files:**
- Modify: `package.json` (new dependency)
- Modify: `app/globals.css` (import typography plugin)
- Modify: `.env.local.example` (add WORDPRESS_API_URL)
- Modify: `next.config.ts` (add remotePatterns for WP images)

- [ ] **Step 1: Install `@tailwindcss/typography`**

Run:
```bash
npm install @tailwindcss/typography
```

- [ ] **Step 2: Import the typography plugin in `app/globals.css`**

Add this import right after the existing `@import "tailwindcss";` line at the top of `app/globals.css`:

```css
@import "@tailwindcss/typography";
```

- [ ] **Step 3: Add `WORDPRESS_API_URL` to `.env.local.example`**

Append to the end of `.env.local.example`:

```
# WordPress Blog (headless CMS)
WORDPRESS_API_URL=https://your-wp-site.com/wp-json/wp/v2
```

- [ ] **Step 4: Add remotePatterns to `next.config.ts`**

Replace the entire file content with:

```typescript
import type { NextConfig } from "next";

const wpUrl = process.env.WORDPRESS_API_URL
  ? new URL(process.env.WORDPRESS_API_URL)
  : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: wpUrl
      ? [{ protocol: wpUrl.protocol.replace(":", "") as "http" | "https", hostname: wpUrl.hostname }]
      : [],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap-index",
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json app/globals.css .env.local.example next.config.ts
git commit -m "feat: add typography plugin and WordPress env config"
```

---

### Task 2: Blog Types

**Files:**
- Create: `types/blog.ts`

- [ ] **Step 1: Create `types/blog.ts`**

```typescript
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author: string;
  featuredImage: string | null;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add types/blog.ts
git commit -m "feat: add blog types for WordPress integration"
```

---

### Task 3: WordPress Client Library

**Files:**
- Create: `lib/wordpress.ts`

- [ ] **Step 1: Create `lib/wordpress.ts`**

```typescript
import { BlogPost, BlogCategory } from "@/types/blog";

const WP_API = process.env.WORDPRESS_API_URL || "";

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function mapPost(raw: any): BlogPost {
  const embedded = raw._embedded || {};
  const featuredMedia = embedded["wp:featuredmedia"]?.[0];
  const author = embedded.author?.[0];
  const terms = embedded["wp:term"]?.[0] || [];

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title?.rendered || "",
    excerpt: stripHtmlTags(raw.excerpt?.rendered || ""),
    content: raw.content?.rendered || "",
    date: raw.date,
    modified: raw.modified,
    author: author?.name || "Unknown",
    featuredImage: featuredMedia?.source_url || null,
    categories: terms.map((t: any) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
    })),
  };
}

function mapCategory(raw: any): BlogCategory {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    count: raw.count,
    description: raw.description || "",
  };
}

export async function getPosts(
  page = 1,
  perPage = 12,
  categoryId?: number
): Promise<{ posts: BlogPost[]; totalPages: number }> {
  if (!WP_API) return { posts: [], totalPages: 0 };

  const params = new URLSearchParams({
    _embed: "true",
    page: String(page),
    per_page: String(perPage),
  });
  if (categoryId) params.set("categories", String(categoryId));

  try {
    const res = await fetch(`${WP_API}/posts?${params}`, { cache: "no-store" });
    if (!res.ok) return { posts: [], totalPages: 0 };

    const totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
    const data = await res.json();
    return { posts: data.map(mapPost), totalPages };
  } catch {
    return { posts: [], totalPages: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!WP_API) return null;

  try {
    const res = await fetch(
      `${WP_API}/posts?_embed=true&slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;
    return mapPost(data[0]);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<BlogCategory[]> {
  if (!WP_API) return [];

  try {
    const res = await fetch(`${WP_API}/categories?per_page=100`, {
      cache: "no-store",
    });
    if (!res.ok) return [];

    const data = await res.json();
    return data.map(mapCategory).filter((c: BlogCategory) => c.count > 0);
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<BlogCategory | null> {
  if (!WP_API) return null;

  try {
    const res = await fetch(
      `${WP_API}/categories?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;
    return mapCategory(data[0]);
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!WP_API) return [];

  const slugs: string[] = [];
  let page = 1;

  try {
    while (true) {
      const res = await fetch(
        `${WP_API}/posts?per_page=100&_fields=slug&page=${page}`,
        { cache: "no-store" }
      );
      if (!res.ok) break;

      const data = await res.json();
      if (!data.length) break;

      slugs.push(...data.map((p: any) => p.slug));
      const totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
      if (page >= totalPages) break;
      page++;
    }
  } catch {
    // return what we have
  }

  return slugs;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/wordpress.ts
git commit -m "feat: add WordPress REST API client library"
```

---

### Task 4: BlogCard Component

**Files:**
- Create: `components/BlogCard.tsx`

- [ ] **Step 1: Create `components/BlogCard.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { AnimatedCard } from "@/components/MotionWrappers";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <AnimatedCard>
      <Link
        href={`/blog/${post.slug}`}
        className="block bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow"
      >
        {/* Featured Image */}
        <div className="aspect-[16/9] bg-gradient-to-br from-primary-light to-violet-50 relative">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              📝
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex gap-1.5 mb-2">
              {post.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-semibold text-neutral-900 line-clamp-2 mb-1">
            {post.title}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-3 mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/BlogCard.tsx
git commit -m "feat: add BlogCard component for post listings"
```

---

### Task 5: BlogContent Component

**Files:**
- Create: `components/BlogContent.tsx`

- [ ] **Step 1: Create `components/BlogContent.tsx`**

```tsx
interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:text-primary-dark prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/BlogContent.tsx
git commit -m "feat: add BlogContent component for rendering WordPress HTML"
```

---

### Task 6: Blog Index Page + Loading Skeleton

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/loading.tsx`

- [ ] **Step 1: Create `app/blog/page.tsx`**

```tsx
import { Metadata } from "next";
import Link from "next/link";
import { getPosts, getCategories } from "@/lib/wordpress";
import BlogCard from "@/components/BlogCard";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Emoji guides, trending slang breakdowns, and cultural deep dives. Learn what every emoji really means.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [{ posts, totalPages }, categories] = await Promise.all([
    getPosts(page, 12),
    getCategories(),
  ]);

  return (
    <ClientShell>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span className="text-neutral-600">Blog</span>
        </nav>

        {/* Header */}
        <FadeIn>
          <h1 className="text-3xl font-extrabold text-primary-dark mb-2">Blog</h1>
          <p className="text-neutral-500 mb-6">
            Emoji guides, trending slang breakdowns, and cultural deep dives.
          </p>
        </FadeIn>

        {/* Category chips */}
        {categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8">
            <Link
              href="/blog"
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-white"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Post grid */}
        {posts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">📝</span>
            <p className="text-neutral-500">No blog posts yet. Check back soon!</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}`}
                className="px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 text-sm font-medium text-neutral-600 hover:shadow-md transition-shadow"
              >
                ← Previous
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-neutral-400">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}`}
                className="px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 text-sm font-medium text-neutral-600 hover:shadow-md transition-shadow"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Create `app/blog/loading.tsx`**

```tsx
import { Skeleton, SkeletonChips, SkeletonGrid } from "@/components/Skeleton";

export default function BlogLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Skeleton w="120px" h="14px" className="mb-4" />
      <Skeleton w="100px" h="32px" className="mb-2" />
      <Skeleton w="340px" h="16px" className="mb-6" />
      <SkeletonChips count={6} />
      <div className="mt-8">
        <SkeletonGrid cols={3} count={6} />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx app/blog/loading.tsx
git commit -m "feat: add blog index page with WordPress integration"
```

---

### Task 7: Single Post Page + Loading Skeleton

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/blog/[slug]/loading.tsx`

- [ ] **Step 1: Create `app/blog/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPosts } from "@/lib/wordpress";
import BlogContent from "@/components/BlogContent";
import BlogCard from "@/components/BlogCard";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const description = post.excerpt.slice(0, 155);

  return {
    title: post.title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      ...(post.featuredImage ? { images: [post.featuredImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const categoryId = post.categories[0]?.id;
  const { posts: relatedPosts } = categoryId
    ? await getPosts(1, 4, categoryId)
    : { posts: [] };
  const related = relatedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified,
    author: { "@type": "Person", name: post.author },
    ...(post.featuredImage ? { image: post.featuredImage } : {}),
    publisher: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_SITE_NAME || "Emoji Intelligence",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <ClientShell>
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <a href="/blog" className="hover:text-primary">Blog</a>{" › "}
          <span className="text-neutral-600 line-clamp-1">{post.title}</span>
        </nav>

        <FadeIn>
          {/* Featured Image */}
          {post.featuredImage ? (
            <div className="aspect-[2/1] relative rounded-2xl overflow-hidden mb-6">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          ) : (
            <div className="aspect-[3/1] bg-gradient-to-br from-primary-light to-violet-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-6xl">📝</span>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-neutral-400 mb-3">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>

          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex gap-1.5 mb-4">
              {post.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-8">
            {post.title}
          </h1>
        </FadeIn>

        {/* Content */}
        <AnimatedSection>
          <BlogContent html={post.content} />
        </AnimatedSection>

        {/* Related Posts */}
        {related.length > 0 && (
          <AnimatedSection className="mt-12">
            <h2 className="text-xl font-bold text-primary-dark mb-4">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Create `app/blog/[slug]/loading.tsx`**

```tsx
import { Skeleton } from "@/components/Skeleton";

export default function BlogPostLoading() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Skeleton w="200px" h="14px" className="mb-4" />
      <Skeleton w="100%" h="300px" className="rounded-2xl mb-6" />
      <div className="flex gap-3 mb-3">
        <Skeleton w="100px" h="14px" />
        <Skeleton w="80px" h="14px" />
      </div>
      <div className="flex gap-1.5 mb-4">
        <Skeleton w="60px" h="20px" round />
        <Skeleton w="80px" h="20px" round />
      </div>
      <Skeleton w="80%" h="36px" className="mb-8" />
      <div className="space-y-3">
        <Skeleton w="100%" h="14px" />
        <Skeleton w="100%" h="14px" />
        <Skeleton w="90%" h="14px" />
        <Skeleton w="100%" h="14px" />
        <Skeleton w="75%" h="14px" />
        <Skeleton w="100%" h="14px" />
        <Skeleton w="100%" h="14px" />
        <Skeleton w="85%" h="14px" />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add "app/blog/[slug]/page.tsx" "app/blog/[slug]/loading.tsx"
git commit -m "feat: add single blog post page with SEO and JSON-LD"
```

---

### Task 8: Category Archive Page + Loading Skeleton

**Files:**
- Create: `app/blog/category/[slug]/page.tsx`
- Create: `app/blog/category/[slug]/loading.tsx`

- [ ] **Step 1: Create `app/blog/category/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getPosts, getCategoryBySlug, getCategories } from "@/lib/wordpress";
import BlogCard from "@/components/BlogCard";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} — Blog`,
    description: category.description || `Browse ${category.name} articles on Emoji Intelligence.`,
  };
}

export default async function BlogCategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);
  if (!category) notFound();

  const { posts, totalPages } = await getPosts(page, 12, category.id);

  return (
    <ClientShell>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <a href="/blog" className="hover:text-primary">Blog</a>{" › "}
          <span className="text-neutral-600">{category.name}</span>
        </nav>

        <FadeIn>
          <h1 className="text-3xl font-extrabold text-primary-dark mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-neutral-500 mb-6">{category.description}</p>
          )}
        </FadeIn>

        {/* Category chips */}
        <div className="flex gap-2 flex-wrap mb-8">
          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
          >
            All
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog/category/${cat.slug}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                cat.slug === slug
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Post grid */}
        {posts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">📂</span>
            <p className="text-neutral-500">No posts in this category yet.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {page > 1 && (
              <Link
                href={`/blog/category/${slug}?page=${page - 1}`}
                className="px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 text-sm font-medium text-neutral-600 hover:shadow-md transition-shadow"
              >
                ← Previous
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-neutral-400">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/blog/category/${slug}?page=${page + 1}`}
                className="px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 text-sm font-medium text-neutral-600 hover:shadow-md transition-shadow"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Create `app/blog/category/[slug]/loading.tsx`**

```tsx
import { Skeleton, SkeletonChips, SkeletonGrid } from "@/components/Skeleton";

export default function BlogCategoryLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Skeleton w="160px" h="14px" className="mb-4" />
      <Skeleton w="180px" h="32px" className="mb-2" />
      <Skeleton w="300px" h="16px" className="mb-6" />
      <SkeletonChips count={6} />
      <div className="mt-8">
        <SkeletonGrid cols={3} count={6} />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add "app/blog/category/[slug]/page.tsx" "app/blog/category/[slug]/loading.tsx"
git commit -m "feat: add blog category archive page"
```

---

### Task 9: Sitemap Extension

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Add blog chunk to sitemap**

In `app/sitemap.ts`:

Add the import at the top:
```typescript
import { getAllPostSlugs } from "@/lib/wordpress";
```

In `generateSitemaps()`, change the loop to go to 18:
```typescript
for (let i = 0; i <= 18; i++) {
  ids.push({ id: i });
}
```

Add `/blog` to the static pages in chunk 0. Inside the `if (id === 0)` block, add to the returned array:
```typescript
{ url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.6 },
```

Add a new block before the final `return []` for chunk 18:
```typescript
if (id === 18) {
  const postSlugs = await getAllPostSlugs();
  return postSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: extend sitemap with blog post URLs"
```

---

### Task 10: Add Blog Link to Navbar + Mobile Menu

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/MobileMenu.tsx`

- [ ] **Step 1: Add Blog link to desktop Navbar**

In `components/Navbar.tsx`, inside the `<div className="hidden md:flex items-center gap-6 ml-8">` block, add a Blog link after the Compare link (after line 69):

```tsx
              <Link
                href="/blog"
                className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors"
              >
                Blog
              </Link>
```

- [ ] **Step 2: Add Blog link to MobileMenu**

In `components/MobileMenu.tsx`, add Blog to the `MENU_LINKS` array:

```typescript
const MENU_LINKS = [
  { label: "Trending", href: "/trending" },
  { label: "Compare", href: "/tools/emoji-vs" },
  { label: "Blog", href: "/blog" },
];
```

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx components/MobileMenu.tsx
git commit -m "feat: add Blog link to navbar and mobile menu"
```

---

### Task 11: Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript type check**

Run: `npx tsc --noEmit 2>&1 | tail -20`
Expected: No type errors.

- [ ] **Step 2: Run Next.js build**

Run: `npx next build 2>&1 | tail -30`
Expected: Build succeeds. Blog routes (`/blog`, `/blog/[slug]`, `/blog/category/[slug]`) appear in the route list.

- [ ] **Step 3: Fix any errors if needed**

Common issues:
- Missing `"use client"` (should not be needed — all blog pages are server components)
- Import path typos
- Next.js Image component requires `remotePatterns` config (handled in Task 1)

- [ ] **Step 4: Commit if fixes were needed**

```bash
git add -A
git commit -m "fix: resolve build issues from blog integration"
```
