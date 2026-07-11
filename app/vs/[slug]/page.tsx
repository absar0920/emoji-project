import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import { getRelatedComparisons } from "@/lib/mongodb";
import { resolveComparison } from "@/lib/comparison";
import { generateComparisonMeta, generateComparisonFAQ } from "@/lib/seo";
import ComparisonRow from "@/components/ComparisonRow";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";

// Weekly ISR: each URL renders on first request, then serves from cache for 7 days.
// Empty generateStaticParams => nothing prerendered at build (keeps build under Vercel's limit).
export const revalidate = 604800;
export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await resolveComparison(slug);
  if (res.kind === "notfound") return { title: "Comparison Not Found" };
  // Page-level permanentRedirect handles the actual hop; metadata is discarded.
  if (res.kind === "redirect") return {};
  const meta = generateComparisonMeta(res.comparison);
  const base: Metadata = {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
  };
  // Composed long-tail pages resolve so nobody hits a 404, but stay out of the
  // index to avoid thin/duplicate-content penalties. Curated pages are indexable.
  if (res.kind === "composed") base.robots = { index: false, follow: true };
  return base;
}

function Chapter({ label, meta, title, children }: { label: string; meta?: string; title: string; children: React.ReactNode }) {
  return (
    <AnimatedSection>
      <section className="pt-12">
        <div className="fg-chapter__bar">
          <span className="fg-chapter__n">{label}</span>
          {meta && <span className="fg-chapter__count">{meta}</span>}
        </div>
        <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">{title}</h2>
        <div className="mt-7">{children}</div>
      </section>
    </AnimatedSection>
  );
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await resolveComparison(slug);
  if (res.kind === "notfound") notFound();
  if (res.kind === "redirect") permanentRedirect(`/vs/${res.to}`);
  const comparison = res.comparison;

  // Related = curated comparisons sharing either emoji (all indexable pages, so
  // a noindex composed page funnels link equity into them). The masthead always
  // links both constituent /emoji/[slug] pages as guaranteed-present exits.
  const related = await getRelatedComparisons(comparison.emoji1_slug, 5);
  const faqSchema = generateComparisonFAQ(comparison);

  const diffRows = Object.entries(comparison.differences).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: value as string,
  }));

  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2 min-w-0">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <Link href="/tools/emoji-vs" className="fg-link">Compare</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink truncate">{comparison.emoji1_character} vs {comparison.emoji2_character}</span>
            </span>
            <span className="hidden sm:inline shrink-0">Field Guide</span>
          </div>

          {/* Masthead */}
          <FadeIn>
            <div className="border-b-2 border-[var(--rule)] pb-9">
              <p className="fg-kicker mb-5">The Comparison</p>
              <div className="flex items-center justify-center gap-6 sm:gap-12 mb-6">
                <Link href={`/emoji/${comparison.emoji1_slug}`} className="fg-link text-center">
                  <span className="text-6xl sm:text-8xl block mb-2">{comparison.emoji1_character}</span>
                  <span className="fg-label">{comparison.emoji1_name}</span>
                </Link>
                <span className="font-display t-accent italic text-2xl sm:text-4xl shrink-0">vs</span>
                <Link href={`/emoji/${comparison.emoji2_slug}`} className="fg-link text-center">
                  <span className="text-6xl sm:text-8xl block mb-2">{comparison.emoji2_character}</span>
                  <span className="fg-label">{comparison.emoji2_name}</span>
                </Link>
              </div>
              <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2rem] sm:text-[2.8rem] text-center">
                {comparison.emoji1_name} vs {comparison.emoji2_name}
              </h1>
            </div>
          </FadeIn>

          {comparison.winner && (
            <AnimatedSection>
              <div className="fg-pull mt-10">
                <span className="fg-kicker">Winner · {comparison.winner}</span>
                <p>{comparison.winner_reason}</p>
              </div>
            </AnimatedSection>
          )}

          <Chapter label="Differences" title="Key differences">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-2 border-b-2 border-[var(--rule)] mb-2">
              <span className="fg-label">{comparison.emoji1_character} {comparison.emoji1_name}</span>
              <span className="fg-label text-center">Category</span>
              <span className="fg-label text-right">{comparison.emoji2_character} {comparison.emoji2_name}</span>
            </div>
            {diffRows.map((row) => {
              const parts = row.value.split(/\bvs\.?\b|\bwhile\b|\bbut\b/i);
              return (
                <ComparisonRow key={row.label} label={row.label} emoji1Value={parts[0]?.trim() || row.value} emoji2Value={parts[1]?.trim() || ""} />
              );
            })}
          </Chapter>

          <Chapter label="Usage" title="When to use each">
            <p className="fg-prose t-body max-w-2xl">{comparison.when_to_use}</p>
          </Chapter>

          {related.filter((r) => r.slug !== slug).length > 0 && (
            <Chapter label="Related" title="Related comparisons">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {related.filter((r) => r.slug !== slug).map((r) => (
                  <Link key={r.slug} href={`/vs/${r.slug}`} className="fg-card fg-link flex items-center gap-2 px-4 py-2.5 shrink-0">
                    <span className="text-2xl">{r.emoji1_character}</span>
                    <span className="mono t-muted text-[0.6rem]">VS</span>
                    <span className="text-2xl">{r.emoji2_character}</span>
                  </Link>
                ))}
              </div>
            </Chapter>
          )}

          {faqSchema.mainEntity.length > 0 && (
            <Chapter label="FAQ" meta={`${faqSchema.mainEntity.length} questions`} title="Frequently asked">
              <div className="fg-list">
                {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                  <details key={i} className="fg-detail border-b border-[var(--line)]">
                    <summary className="flex items-baseline gap-3 sm:gap-4 py-3.5 cursor-pointer">
                      <span className="mono t-muted text-[0.62rem] w-6 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-read t-ink flex-1">{faq.name}</span>
                      <svg className="fg-chev w-4 h-4 t-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="t-body leading-relaxed pb-4 max-w-2xl sm:pl-[2.6rem]">{faq.acceptedAnswer.text}</p>
                  </details>
                ))}
              </div>
            </Chapter>
          )}
        </div>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ClientShell>
  );
}
