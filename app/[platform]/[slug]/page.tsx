import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getEmojiBySlug } from "@/lib/mongodb";
import { generatePlatformMeta, generatePlatformBreadcrumb, generatePlatformFAQ } from "@/lib/seo";
import { PLATFORM_KEYS, PLATFORM_LABELS, PLATFORM_ICONS, PlatformKey } from "@/types/emoji";
import CopyButton from "@/components/CopyButton";
import PlatformLinks from "@/components/PlatformLinks";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import { FadeIn, AnimatedSection } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ platform: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform, slug } = await params;
  if (!PLATFORM_KEYS.includes(platform as PlatformKey)) return { title: "Not Found" };
  const emoji = await getEmojiBySlug(slug);
  if (!emoji) return { title: "Emoji Not Found" };
  const meta = generatePlatformMeta(emoji, platform as PlatformKey);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: meta.openGraph,
  };
}

function MeaningRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt>{label.replace(/_/g, " ")}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default async function PlatformPage({ params }: PageProps) {
  const { platform, slug } = await params;
  if (!PLATFORM_KEYS.includes(platform as PlatformKey)) notFound();

  const emoji = await getEmojiBySlug(slug);
  if (!emoji) notFound();

  const platformKey = platform as PlatformKey;
  const emojiRec = emoji as unknown as Record<string, unknown>;
  const platforms = emojiRec.platforms as Record<string, Record<string, unknown>> | undefined;
  const platformData = (platforms?.[platformKey] ?? (emojiRec[platformKey] as Record<string, unknown> | undefined)) as Record<string, unknown> | undefined;
  const platformLabel = PLATFORM_LABELS[platformKey];
  const platformIcon = PLATFORM_ICONS[platformKey];

  const breadcrumbSchema = generatePlatformBreadcrumb(emoji, platformKey);
  const faqSchema = generatePlatformFAQ(emoji, platformKey);

  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          {/* Breadcrumb / running head */}
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2 min-w-0">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span>{platformLabel}</span>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink truncate">{emoji.character} {emoji.name}</span>
            </span>
            <span className="hidden sm:inline shrink-0">Field Guide</span>
          </div>

          {/* Masthead */}
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8 border-b-2 border-[var(--rule)] pb-9">
              <span className="text-[6.5rem] sm:text-[8.5rem] leading-[0.8] shrink-0">{emoji.character}</span>
              <div className="flex-1 min-w-0 pb-1">
                <p className="fg-kicker mb-3">{platformLabel} reading</p>
                <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2.1rem] sm:text-[3rem]">
                  {emoji.name} <span className="t-accent">on {platformLabel}</span>
                </h1>
                <p className="mono t-muted text-[0.72rem] tracking-wider mt-3">{emoji.unicode} · {emoji.shortcode}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <CopyButton text={emoji.character} tone="editorial" label={`Copy ${emoji.character}`} />
                  <Link href={`/emoji/${emoji.slug}`} className="fg-navlink">All meanings →</Link>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Platform meaning */}
          <AnimatedSection>
            <section className="pt-12">
              <div className="fg-chapter__bar">
                <span className="fg-chapter__n">{platformIcon} {platformLabel}</span>
                <span className="fg-chapter__count">the reading</span>
              </div>
              <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">What it signals here</h2>

              {platformData && Object.keys(platformData).length > 0 ? (
                <dl className="fg-deflist mt-7 border-t border-[var(--line)]">
                  {Object.entries(platformData).map(([key, value]) => {
                    if (Array.isArray(value)) {
                      return (
                        <MeaningRow key={key} label={key}>
                          <span className="flex flex-wrap gap-x-3 gap-y-1 mono text-[0.7rem] uppercase tracking-wider t-accent">
                            {value.map((tag: string) => <span key={tag}>{tag}</span>)}
                          </span>
                        </MeaningRow>
                      );
                    }
                    if (typeof value === "number") {
                      return (
                        <MeaningRow key={key} label={key}>
                          <span className="mono"><b className="t-accent text-base">{value}</b> <span className="t-muted">/ 100</span></span>
                        </MeaningRow>
                      );
                    }
                    return <MeaningRow key={key} label={key}>{String(value)}</MeaningRow>;
                  })}
                </dl>
              ) : (
                <p className="fg-prose t-muted italic mt-6">No {platformLabel} data is recorded for this emoji yet.</p>
              )}
            </section>
          </AnimatedSection>

          {/* Other platforms */}
          <AnimatedSection>
            <section className="pt-14">
              <div className="fg-chapter__bar">
                <span className="fg-chapter__n">Cross-platform</span>
                <span className="fg-chapter__count">{PLATFORM_KEYS.length} platforms</span>
              </div>
              <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">See it elsewhere</h2>
              <div className="mt-7">
                <PlatformLinks emojiSlug={emoji.slug} currentPlatform={platformKey} tone="editorial" />
              </div>
            </section>
          </AnimatedSection>
        </div>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ClientShell>
  );
}
