import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";
import { getPublishedPostBySlug, getPostBySlugForPreview, getRelatedPosts } from "@/lib/blog";
import { isAdmin } from "@/lib/dal";
import type { BlogPost } from "@/types/blog";
import BlogContent from "@/components/BlogContent";
import BlogCard from "@/components/BlogCard";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";

// Weekly ISR: each URL renders on first request, then serves from cache for 7 days.
// Empty generateStaticParams => nothing prerendered at build (keeps build under Vercel's limit).
export const revalidate = 604800;
export async function generateStaticParams() {
  return [];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

// Preview is admin-gated and routed through Next's Draft Mode rather than a
// raw searchParams branch: `revalidate = 604800` puts this route on weekly
// on-demand ISR, and ISR's cache is keyed by pathname only (it doesn't vary
// on the query string). Branching the *content* directly on `?preview=1`
// would risk an admin's draft render getting cached at the bare `/blog/slug`
// path and served to the next anonymous visitor — a real content leak. Draft
// Mode's `__prerender_bypass` cookie is specifically designed so
// cookie-bearing requests always render fresh and are never written to that
// shared cache, so we use it as the actual gate for draft content.
async function resolvePost(slug: string): Promise<BlogPost | null> {
  const { isEnabled } = await draftMode();
  if (isEnabled && (await isAdmin())) {
    return getPostBySlugForPreview(slug);
  }
  return getPublishedPostBySlug(slug);
}

// `?preview=1` is the entry point admins use, but it only ever triggers a
// redirect (never renders content itself): it verifies admin, flips on Draft
// Mode, then redirects to the clean canonical URL where `resolvePost` above
// takes over. This keeps the canonical URL's ISR cache safe (see above) while
// still satisfying a plain `?preview=1` link. Non-admins passing `?preview=1`
// are not blocked outright — the flag is simply ignored and they fall
// through to the normal published-only resolution below, same as if they'd
// never passed it.
async function enablePreviewIfRequested(slug: string, preview?: string): Promise<void> {
  if (!preview) return;
  if (!(await isAdmin())) return;
  (await draftMode()).enable();
  redirect(`/blog/${slug}`);
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  if (preview) return { title: "Preview" };
  const post = await resolvePost(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.seo_title || post.title;
  const description = (post.seo_description || post.excerpt).slice(0, 155);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  await enablePreviewIfRequested(slug, preview);

  const post = await resolvePost(slug);
  if (!post) notFound();

  const categorySlug = post.categories[0]?.slug;
  const related = await getRelatedPosts(categorySlug, post.slug, 3);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: post.author },
    ...(post.featured_image ? { image: post.featured_image } : {}),
    publisher: { "@type": "Organization", name: process.env.NEXT_PUBLIC_SITE_NAME || "Emoji Meaning" },
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
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          {post.status !== "published" && (
            <div className="mb-8 border border-[var(--accent)] bg-[var(--paper-2)] px-4 py-3">
              <p className="mono text-[0.75rem] uppercase tracking-[0.14em] t-accent">
                Preview — this post is {post.status} and not publicly visible
              </p>
            </div>
          )}

          {/* Running head */}
          <div className="fg-runhead mb-10">
            <span className="flex items-center gap-2 min-w-0">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <Link href="/blog" className="fg-link">Journal</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink truncate">{post.title}</span>
            </span>
            <span className="hidden sm:inline shrink-0">Field Guide</span>
          </div>

          <FadeIn>
            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5">
                {post.categories.map((cat) => (
                  <Link key={cat.slug} href={`/blog/category/${cat.slug}`} className="fg-kicker hover:underline">{cat.name}</Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2.4rem] sm:text-[3.4rem]">{post.title}</h1>

            {/* Meta */}
            <p className="fg-label mt-5 flex items-center gap-2.5">
              {formattedDate && <span>{formattedDate}</span>}
              {formattedDate && <span className="opacity-40" aria-hidden="true">·</span>}
              <span>{post.author}</span>
              <span className="opacity-40" aria-hidden="true">·</span>
              <span>{post.reading_time} min read</span>
            </p>

            {/* Featured Image */}
            {post.featured_image ? (
              <div className="aspect-[2/1] relative overflow-hidden border border-[var(--line)] mt-8">
                <Image src={post.featured_image} alt={post.featured_image_alt || post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
              </div>
            ) : (
              <div className="aspect-[3/1] bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center mt-8">
                <span className="text-6xl">📝</span>
              </div>
            )}
          </FadeIn>

          {/* Content */}
          <AnimatedSection>
            <div className="mt-10 border-t-2 border-[var(--rule)] pt-9">
              <BlogContent html={post.content_html} />
            </div>
          </AnimatedSection>

          {/* Related */}
          {related.length > 0 && (
            <AnimatedSection>
              <section className="pt-12">
                <div className="fg-chapter__bar">
                  <span className="fg-chapter__n">More</span>
                  <span className="fg-chapter__count">from the journal</span>
                </div>
                <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">Related reading</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-7">
                  {related.map((p) => <BlogCard key={p.id} post={p} />)}
                </div>
              </section>
            </AnimatedSection>
          )}
        </div>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </ClientShell>
  );
}
