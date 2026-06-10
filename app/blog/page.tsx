import { Metadata } from "next";
import Link from "next/link";
import { getPosts, getCategories } from "@/lib/wordpress";
import BlogCard from "@/components/BlogCard";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Emoji guides, trending slang breakdowns, and cultural deep dives. Learn what every emoji really means.",
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
      <main className="theme-editorial min-h-screen">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          {/* Running head */}
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink">The Journal</span>
            </span>
            <span className="hidden sm:inline">Field Guide</span>
          </div>

          {/* Masthead */}
          <div className="border-b-2 border-[var(--rule)] pb-7">
            <p className="fg-kicker mb-4">Dispatches</p>
            <h1 className="font-display t-ink leading-[1.0] tracking-[-0.015em] text-[2.6rem] sm:text-[3.6rem]">The Journal</h1>
            <p className="t-muted font-read mt-4 max-w-2xl">Emoji guides, trending slang breakdowns, and cultural deep dives.</p>
          </div>

          {/* Category filing row */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 py-5 border-b border-[var(--line)] mb-9">
              <Link href="/blog" className="fg-navlink" data-active style={{ color: "var(--accent)", borderBottom: "2px solid var(--accent)", paddingBottom: "2px" }}>All</Link>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/blog/category/${cat.slug}`} className="fg-navlink">{cat.name}</Link>
              ))}
            </div>
          )}

          {/* Post grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="py-20 border-y border-[var(--line)] text-center">
              <span className="text-5xl block mb-5">📝</span>
              <p className="mono text-[0.8rem] uppercase tracking-[0.14em] t-muted">No dispatches yet — check back soon</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-[var(--line)]">
              {page > 1 ? (
                <Link href={`/blog?page=${page - 1}`} className="fg-navlink">← Previous</Link>
              ) : <span />}
              <span className="fg-label">Page {page} / {totalPages}</span>
              {page < totalPages ? (
                <Link href={`/blog?page=${page + 1}`} className="fg-navlink">Next →</Link>
              ) : <span />}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
