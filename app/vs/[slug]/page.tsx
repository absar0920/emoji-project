import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getComparisonBySlug, getAllComparisonSlugs, getRelatedComparisons } from "@/lib/mongodb";
import { generateComparisonMeta, generateComparisonFAQ } from "@/lib/seo";
import ComparisonRow from "@/components/ComparisonRow";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) return { title: "Comparison Not Found" };
  const meta = generateComparisonMeta(comparison);
  return { title: meta.title, description: meta.description, alternates: { canonical: meta.canonical } };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) notFound();

  const related = await getRelatedComparisons(comparison.emoji1_slug, 5);
  const faqSchema = generateComparisonFAQ(comparison);

  const diffRows = Object.entries(comparison.differences).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
  }));

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span>Comparisons</span>{" › "}
          <span className="text-neutral-600">{comparison.emoji1_character} vs {comparison.emoji2_character}</span>
        </nav>

        {/* Hero */}
        <FadeIn>
          <div className="bg-gradient-to-br from-primary-light to-violet-50 rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-center gap-6 sm:gap-12">
              <Link href={`/emoji/${comparison.emoji1_slug}`} className="text-center hover:scale-105 transition-transform">
                <span className="text-6xl sm:text-8xl block mb-2">{comparison.emoji1_character}</span>
                <span className="text-sm font-medium text-neutral-600">{comparison.emoji1_name}</span>
              </Link>
              <span className="text-2xl sm:text-4xl font-extrabold text-primary">VS</span>
              <Link href={`/emoji/${comparison.emoji2_slug}`} className="text-center hover:scale-105 transition-transform">
                <span className="text-6xl sm:text-8xl block mb-2">{comparison.emoji2_character}</span>
                <span className="text-sm font-medium text-neutral-600">{comparison.emoji2_name}</span>
              </Link>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-primary-dark text-center mt-4">
              {comparison.emoji1_name} vs {comparison.emoji2_name}
            </h1>
          </div>
        </FadeIn>

        {/* Winner */}
        <AnimatedSection>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-center">
            <span className="text-sm font-medium text-accent-amber">🏆 Winner: {comparison.winner}</span>
            <p className="text-sm text-neutral-600 mt-1">{comparison.winner_reason}</p>
          </div>
        </AnimatedSection>

        {/* Differences */}
        <AnimatedSection>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">Key Differences</h2>
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-2 border-b border-neutral-200 mb-2">
                <span className="text-sm font-bold text-neutral-900">{comparison.emoji1_character} {comparison.emoji1_name}</span>
                <span className="text-xs text-neutral-400">Category</span>
                <span className="text-sm font-bold text-neutral-900 text-right">{comparison.emoji2_character} {comparison.emoji2_name}</span>
              </div>
              {diffRows.map((row) => {
                const parts = row.value.split(/\bvs\.?\b|\bwhile\b|\bbut\b/i);
                return (
                  <ComparisonRow
                    key={row.label}
                    label={row.label}
                    emoji1Value={parts[0]?.trim() || row.value}
                    emoji2Value={parts[1]?.trim() || ""}
                  />
                );
              })}
            </div>
          </section>
        </AnimatedSection>

        {/* When to use */}
        <AnimatedSection>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">When To Use Each</h2>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
              <p className="text-neutral-700">{comparison.when_to_use}</p>
            </div>
          </section>
        </AnimatedSection>

        {/* Related comparisons */}
        <AnimatedSection>
          {related.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-primary-dark mb-4">Related Comparisons</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {related.filter((r) => r.slug !== slug).map((r) => (
                  <Link
                    key={r.slug}
                    href={`/vs/${r.slug}`}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl">{r.emoji1_character}</span>
                    <span className="text-sm font-bold text-neutral-400">vs</span>
                    <span className="text-2xl">{r.emoji2_character}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                <details key={i} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer font-medium text-neutral-900 hover:bg-neutral-50">{faq.name}</summary>
                  <p className="px-4 pb-4 text-sm text-neutral-600">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ClientShell>
  );
}
