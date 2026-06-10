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
  const { posts: relatedPosts } = categoryId ? await getPosts(1, 4, categoryId) : { posts: [] };
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
    publisher: { "@type": "Organization", name: process.env.NEXT_PUBLIC_SITE_NAME || "Emoji Intelligence" },
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
                  <Link key={cat.id} href={`/blog/category/${cat.slug}`} className="fg-kicker hover:underline">{cat.name}</Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2.4rem] sm:text-[3.4rem]">{post.title}</h1>

            {/* Meta */}
            <p className="fg-label mt-5 flex items-center gap-2.5">
              <span>{formattedDate}</span>
              <span className="opacity-40" aria-hidden="true">·</span>
              <span>{post.author}</span>
            </p>

            {/* Featured Image */}
            {post.featuredImage ? (
              <div className="aspect-[2/1] relative overflow-hidden border border-[var(--line)] mt-8">
                <Image src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
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
              <BlogContent html={post.content} />
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
