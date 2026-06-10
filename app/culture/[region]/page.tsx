import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEmojisByCulture } from "@/lib/mongodb";
import { generateCultureMeta, generateCultureBreadcrumb } from "@/lib/seo";
import { CULTURE_REGIONS, CULTURE_INFO, CultureRegion } from "@/types/emoji";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ region: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region } = await params;
  if (!CULTURE_REGIONS.includes(region as CultureRegion)) return { title: "Not Found" };
  const meta = generateCultureMeta(region as CultureRegion);
  return { title: meta.title, description: meta.description, alternates: { canonical: meta.canonical } };
}

export default async function CulturePage({ params }: PageProps) {
  const { region } = await params;
  if (!CULTURE_REGIONS.includes(region as CultureRegion)) notFound();

  const regionKey = region as CultureRegion;
  const info = CULTURE_INFO[regionKey];
  const emojis = await getEmojisByCulture(regionKey);
  const breadcrumbSchema = generateCultureBreadcrumb(regionKey);

  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2 min-w-0">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span>Cultures</span>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink truncate">{info.label}</span>
            </span>
            <span className="hidden sm:inline shrink-0">Field Guide</span>
          </div>

          {/* Masthead */}
          <FadeIn>
            <div className="flex items-end gap-5 sm:gap-7 border-b-2 border-[var(--rule)] pb-8">
              <span className="text-[4.5rem] sm:text-[6rem] leading-[0.8] shrink-0">{info.flag}</span>
              <div className="pb-1">
                <p className="fg-kicker mb-3">Across Cultures</p>
                <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2rem] sm:text-[2.8rem]">
                  Emoji Meanings in {info.label}
                </h1>
                <p className="t-muted font-read mt-3">How emojis are read and used in {info.label}.</p>
              </div>
            </div>
          </FadeIn>

          <AnimatedSection>
            <section className="pt-12">
              <div className="fg-chapter__bar">
                <span className="fg-chapter__n">Top emojis</span>
                <span className="fg-chapter__count">{emojis.length}</span>
              </div>
              <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">Most used in {info.label}</h2>
              {emojis.length > 0 ? (
                <div className="fg-list mt-7">
                  {emojis.map((emoji) => {
                    const culturalMeaning = (emoji.cultures as Record<string, string>)?.[regionKey] || "";
                    return (
                      <Link key={emoji.slug} href={`/emoji/${emoji.slug}`} className="fg-entry fg-entry--ledger fg-link">
                        <span className="fg-entry__glyph">{emoji.character}</span>
                        <div className="fg-entry__main">
                          <span className="fg-entry__name">{emoji.name}</span>
                          <p className="fg-entry__text">{culturalMeaning}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="mono text-[0.78rem] uppercase tracking-[0.14em] t-muted py-8 border-y border-[var(--line)] mt-7">No data for this region yet</p>
              )}
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="pt-12">
              <div className="fg-chapter__bar">
                <span className="fg-chapter__n">Explore</span>
              </div>
              <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">Other cultures</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2.5 mt-7 border-t border-[var(--line)] pt-5">
                {CULTURE_REGIONS.filter((r) => r !== regionKey).map((r) => {
                  const rInfo = CULTURE_INFO[r];
                  return (
                    <Link key={r} href={`/culture/${r}`} className="fg-navlink">
                      <span aria-hidden="true">{rInfo.flag}</span>{rInfo.label}
                    </Link>
                  );
                })}
              </div>
            </section>
          </AnimatedSection>
        </div>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </ClientShell>
  );
}
