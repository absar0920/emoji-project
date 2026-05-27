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
        <nav className="text-sm text-neutral-400 dark:text-slate-500 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <a href="/blog" className="hover:text-primary">Blog</a>{" › "}
          <span className="text-neutral-600 dark:text-slate-400 line-clamp-1">{post.title}</span>
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
            <div className="aspect-[3/1] bg-gradient-to-br from-primary-light dark:from-indigo-900/30 to-violet-50 dark:to-violet-900/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-6xl">📝</span>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-neutral-400 dark:text-slate-500 mb-3">
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
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary font-medium hover:bg-primary/20 dark:hover:bg-indigo-500/30 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark dark:text-indigo-100 mb-8">
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
            <h2 className="text-xl font-bold text-primary-dark dark:text-indigo-100 mb-4">Related Posts</h2>
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
