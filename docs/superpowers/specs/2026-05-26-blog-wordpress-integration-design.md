# Blog: Headless WordPress Integration

**Date:** 2026-05-26
**Status:** Draft
**Approach:** Direct WP REST API (Approach A)

## Summary

Add a blog to the emoji platform by fetching content from an existing WordPress instance via its REST API and rendering it inside the Next.js app at `/blog/*`. Posts are server-rendered on every request (always fresh). The blog uses the same Tailwind design system, Navbar/Footer shell, skeleton loading, and animation patterns as the rest of the app. Only standard posts and categories are supported — no custom fields, no auth, no comments.

## Environment Configuration

**New env var:**
- `WORDPRESS_API_URL` — base URL for the WP REST API (e.g., `https://your-wp-site.com/wp-json/wp/v2`)
- Added to `.env.local` and `.env.local.example`

No authentication tokens needed — WP REST API exposes published posts and categories publicly. All fetches happen server-side (Node.js → WP), so CORS is not a concern.

## Types

A single `types/blog.ts` file defining:

```typescript
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;       // rendered HTML from WP
  date: string;          // ISO date string
  modified: string;      // ISO date string
  author: string;        // author display name
  featuredImage: string | null;  // URL or null
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}
```

## WordPress Client Library

A single `lib/wordpress.ts` file that wraps WP REST API calls. Reads `WORDPRESS_API_URL` from `process.env`.

### Functions

| Function | WP Endpoint | Returns |
|----------|-------------|---------|
| `getPosts(page?, perPage?, categoryId?)` | `GET /posts?_embed&page=N&per_page=N&categories=N` | `{ posts: BlogPost[], totalPages: number }` |
| `getPostBySlug(slug)` | `GET /posts?_embed&slug=X` | `BlogPost \| null` |
| `getCategories()` | `GET /categories?per_page=100` | `BlogCategory[]` |
| `getCategoryBySlug(slug)` | `GET /categories?slug=X` | `BlogCategory \| null` |
| `getAllPostSlugs()` | `GET /posts?per_page=100&_fields=slug` (paginated) | `string[]` |

The `_embed` parameter tells WP to inline author and featured media data in the response, avoiding extra round trips.

Each function maps the verbose WP response to the clean `BlogPost`/`BlogCategory` types:
- `title.rendered` → `title`
- `excerpt.rendered` → `excerpt` (strip HTML tags for plain text)
- `content.rendered` → `content` (keep as HTML)
- `_embedded['wp:featuredmedia'][0].source_url` → `featuredImage`
- `_embedded.author[0].name` → `author`
- `_embedded['wp:term'][0]` → `categories` array

Error handling: if the WP API is unreachable or returns an error, functions return empty results / null rather than throwing. The pages handle null/empty gracefully with "no posts" states.

## Routes & Pages

### `/blog` — Blog Index

- Server component with `dynamic = "force-dynamic"`
- Fetches `getPosts(page, 12)` and `getCategories()`
- Page number from `searchParams.page` (defaults to 1)
- Layout:
  - Breadcrumb: Home › Blog
  - Heading: "Blog" + subtitle
  - Category filter chips (link to `/blog/category/[slug]`)
  - 3-column responsive card grid (`BlogCard` components)
  - Pagination: Previous / Next links with page numbers
  - Empty state if no posts
- `generateMetadata()`: title "Blog", description about emoji guides

### `/blog/[slug]` — Single Post

- Server component with `dynamic = "force-dynamic"`
- Fetches `getPostBySlug(slug)`, calls `notFound()` if null
- Fetches related posts: `getPosts(1, 3, post.categories[0]?.id)` (same category, limit 3)
- Layout:
  - Breadcrumb: Home › Blog › Post Title
  - Featured image hero (full-width rounded, or gradient fallback)
  - Post meta: date (formatted), author, category badges
  - Title (h1)
  - Content rendered via `BlogContent` component (prose container)
  - Related posts section (3 `BlogCard` components)
- `generateMetadata()`: title from WP post title, description from excerpt (stripped to 155 chars), canonical `/blog/[slug]`, OpenGraph with featured image
- JSON-LD: `Article` schema (headline, datePublished, dateModified, author, image) + `BreadcrumbList`

### `/blog/category/[slug]` — Category Archive

- Server component with `dynamic = "force-dynamic"`
- Fetches `getCategoryBySlug(slug)`, calls `notFound()` if null
- Fetches `getPosts(page, 12, category.id)`
- Layout:
  - Breadcrumb: Home › Blog › Category Name
  - Heading with category name + description
  - Same card grid and pagination as blog index
- `generateMetadata()`: title "Category Name — Blog"

## Components

### `BlogCard`

Reusable post card for index and category pages.

- Featured image with `next/image` (fallback: gradient placeholder with emoji 📝)
- Title (line-clamp-2)
- Excerpt (line-clamp-3, stripped HTML)
- Date (formatted)
- Category badges (small pills linking to `/blog/category/[slug]`)
- Wrapped in `AnimatedCard` for hover lift + tap scale
- Links to `/blog/[slug]`

### `BlogContent`

Renders WP HTML content safely.

- Wraps content in a `div` with Tailwind Typography `prose` classes
- Customizes prose colors to match the existing design palette (primary-dark headings, neutral-700 body)
- Uses `dangerouslySetInnerHTML` to render WP's HTML output
- The `prose` classes from `@tailwindcss/typography` handle all nested HTML styling (h1-h6, p, ul, ol, blockquote, code, pre, img, a, table, etc.)

## Dependency

**`@tailwindcss/typography`** — Tailwind plugin providing `prose` classes for rendering arbitrary HTML content. Required because WordPress sends raw HTML with semantic elements that need styling.

Added to `devDependencies` and registered in `tailwind.config.ts` plugins array (or Tailwind v4 CSS import).

## SEO & Sitemap

### Metadata

- Blog index: `"Blog | Emoji Intelligence"` via title template
- Post pages: `generateMetadata()` with WP post title, excerpt as description, canonical URL, OpenGraph with featured image
- Category pages: `"Category Name — Blog | Emoji Intelligence"`

### Sitemap

Extend `app/sitemap.ts`:
- Add sitemap chunk id 18 for blog posts
- `getAllPostSlugs()` → map to `emojintel.com/blog/[slug]` with priority 0.7, changeFrequency "weekly"
- Add `/blog` to chunk 0 (static pages) with priority 0.6

### Structured Data

On single post pages:
- `Article` JSON-LD: headline, datePublished, dateModified, author (name), image (featured image URL), publisher (site name)
- `BreadcrumbList` JSON-LD: Home → Blog → Post Title

## Animations & Loading

### Animations

- Blog index: `FadeIn` on heading area, `StaggerContainer` + `StaggerItem` on card grid, category chips
- Post page: `FadeIn` on hero/title area, `AnimatedSection` on content block and related posts
- Category page: same as blog index

### Loading Skeletons (3 files)

**`app/blog/loading.tsx`:**
- Heading skeleton + `SkeletonChips` for categories + `SkeletonGrid` 3-col for post cards

**`app/blog/[slug]/loading.tsx`:**
- Full-width image skeleton + title lines + author/date line + content text lines skeleton

**`app/blog/category/[slug]/loading.tsx`:**
- Heading + description skeleton + `SkeletonGrid` 3-col

### Navbar

Add "Blog" link to the existing `components/Navbar.tsx` navigation.

## What Is Explicitly Out of Scope

- **WordPress preview/draft mode:** No authenticated preview of unpublished posts
- **Comments:** WP comments system not integrated
- **Custom post types / ACF:** Only standard WP posts and categories
- **RSS feed:** WordPress already provides one at its own domain
- **Blog search:** Not built initially; can extend existing search modal later
- **Author pages:** No `/blog/author/[name]` routes
- **Tag pages:** Only categories, not WP tags
- **Webhook-based revalidation:** Using force-dynamic (server-rendered) instead
- **Image optimization proxy:** Featured images served directly from WP domain

## Next.js Config

Add `remotePatterns` entry to `next.config.ts` to allow `next/image` to optimize images from the WordPress domain. The pattern is derived from `WORDPRESS_API_URL` — e.g., if WP is at `https://blog.example.com/wp-json/wp/v2`, add `blog.example.com` as an allowed remote hostname.

Also update `generateSitemaps()` in `app/sitemap.ts` to return ids 0-18 (currently 0-17) to include the new blog chunk.

## File Change Summary

| Change Type | Files | Count |
|-------------|-------|-------|
| New file | `types/blog.ts` | 1 |
| New file | `lib/wordpress.ts` | 1 |
| New file | `components/BlogCard.tsx` | 1 |
| New file | `components/BlogContent.tsx` | 1 |
| New file | `app/blog/page.tsx` | 1 |
| New file | `app/blog/loading.tsx` | 1 |
| New file | `app/blog/[slug]/page.tsx` | 1 |
| New file | `app/blog/[slug]/loading.tsx` | 1 |
| New file | `app/blog/category/[slug]/page.tsx` | 1 |
| New file | `app/blog/category/[slug]/loading.tsx` | 1 |
| Modified | `.env.local.example` (add WORDPRESS_API_URL) | 1 |
| Modified | `app/sitemap.ts` (add chunk 18 for blog) | 1 |
| Modified | `components/Navbar.tsx` (add Blog link) | 1 |
| New dependency | `@tailwindcss/typography` | — |
| **Total** | | **~13 files** |
