import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getPosts, getCategoryBySlug, getCategories } from "@/lib/wordpress";
import BlogCard from "@/components/BlogCard";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

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
    description: category.description || `Browse ${category.name} articles on Emoji Meaning.`,
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
      <main className="theme-editorial min-h-screen">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          {/* Running head */}
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2 min-w-0">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <Link href="/blog" className="fg-link">Journal</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink truncate">{category.name}</span>
            </span>
            <span className="hidden sm:inline shrink-0">Field Guide</span>
          </div>

          {/* Masthead */}
          <div className="border-b-2 border-[var(--rule)] pb-7">
            <p className="fg-kicker mb-4">Category</p>
            <h1 className="font-display t-ink leading-[1.0] tracking-[-0.015em] text-[2.6rem] sm:text-[3.6rem]">{category.name}</h1>
            {category.description && <p className="t-muted font-read mt-4 max-w-2xl">{category.description}</p>}
          </div>

          {/* Category filing row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2.5 py-5 border-b border-[var(--line)] mb-9">
            <Link href="/blog" className="fg-navlink">All</Link>
            {allCategories.map((cat) => {
              const active = cat.slug === slug;
              return (
                <Link
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="fg-navlink"
                  data-active={active}
                  style={active ? { color: "var(--accent)", borderBottom: "2px solid var(--accent)", paddingBottom: "2px" } : undefined}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Post grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="py-20 border-y border-[var(--line)] text-center">
              <span className="text-5xl block mb-5">📂</span>
              <p className="mono text-[0.8rem] uppercase tracking-[0.14em] t-muted">No posts in this category yet</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-[var(--line)]">
              {page > 1 ? (
                <Link href={`/blog/category/${slug}?page=${page - 1}`} className="fg-navlink">← Previous</Link>
              ) : <span />}
              <span className="fg-label">Page {page} / {totalPages}</span>
              {page < totalPages ? (
                <Link href={`/blog/category/${slug}?page=${page + 1}`} className="fg-navlink">Next →</Link>
              ) : <span />}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
