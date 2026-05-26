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
