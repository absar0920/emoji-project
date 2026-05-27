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
        <nav className="text-sm text-neutral-400 dark:text-slate-500 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span className="text-neutral-600 dark:text-slate-400">Blog</span>
        </nav>

        {/* Header */}
        <FadeIn>
          <h1 className="text-3xl font-extrabold text-primary-dark dark:text-indigo-100 mb-2">Blog</h1>
          <p className="text-neutral-500 dark:text-slate-400 mb-6">
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
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 dark:bg-slate-700 text-neutral-600 dark:text-slate-300 hover:bg-neutral-200 dark:hover:bg-slate-600 transition-colors"
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
            <p className="text-neutral-500 dark:text-slate-400">No blog posts yet. Check back soon!</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}`}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-900/30 border border-neutral-200 dark:border-slate-700 text-sm font-medium text-neutral-600 dark:text-slate-300 hover:shadow-md transition-shadow"
              >
                ← Previous
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-neutral-400 dark:text-slate-500">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}`}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-900/30 border border-neutral-200 dark:border-slate-700 text-sm font-medium text-neutral-600 dark:text-slate-300 hover:shadow-md transition-shadow"
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
