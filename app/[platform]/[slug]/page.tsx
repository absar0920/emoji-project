import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEmojiBySlug, getAllSlugs } from "@/lib/mongodb";
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

export default async function PlatformPage({ params }: PageProps) {
  const { platform, slug } = await params;
  if (!PLATFORM_KEYS.includes(platform as PlatformKey)) notFound();

  const emoji = await getEmojiBySlug(slug);
  if (!emoji) notFound();

  const platformKey = platform as PlatformKey;
  const platformData = ((emoji as any).platforms?.[platformKey] || (emoji as any)[platformKey]) as Record<string, unknown> | undefined;
  const platformLabel = PLATFORM_LABELS[platformKey];
  const platformIcon = PLATFORM_ICONS[platformKey];

  const breadcrumbSchema = generatePlatformBreadcrumb(emoji, platformKey);
  const faqSchema = generatePlatformFAQ(emoji, platformKey);

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 dark:text-slate-500 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span className="capitalize">{platformLabel}</span>{" › "}
          <span className="text-neutral-600 dark:text-slate-300">{emoji.character} {emoji.name}</span>
        </nav>

        {/* Hero */}
        <FadeIn>
          <div className="bg-gradient-to-br from-primary-light to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/20 rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6">
            <span className="text-8xl sm:text-[128px] leading-none">{emoji.character}</span>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-1">
                {emoji.name} on {platformLabel} {platformIcon}
              </h1>
              <p className="text-sm text-neutral-500 dark:text-slate-400 font-mono mb-3">{emoji.unicode} · {emoji.shortcode}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <CopyButton text={emoji.character} />
                <a href={`/emoji/${emoji.slug}`} className="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 hover:bg-neutral-200 dark:hover:bg-slate-600 transition-colors">
                  See all meanings →
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Platform meaning */}
        <AnimatedSection>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary-dark dark:text-white mb-4">
              {platformIcon} {platformLabel} Meaning
            </h2>
            {platformData ? (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700 space-y-4">
                {Object.entries(platformData).map(([key, value]) => {
                  if (Array.isArray(value)) {
                    return (
                      <div key={key}>
                        <span className="text-sm text-neutral-500 dark:text-slate-400 capitalize block mb-1">{key.replace(/_/g, " ")}</span>
                        <div className="flex flex-wrap gap-1">
                          {value.map((tag: string) => (
                            <span key={tag} className="text-sm px-2 py-0.5 bg-primary-light dark:bg-indigo-900/30 text-primary rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  if (typeof value === "number") {
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500 dark:text-slate-400 capitalize">{key.replace(/_/g, " ")}</span>
                        <span className="font-medium text-accent-amber">{value}/100</span>
                      </div>
                    );
                  }
                  return (
                    <div key={key}>
                      <span className="text-xs text-neutral-500 dark:text-slate-400 capitalize block">{key.replace(/_/g, " ")}</span>
                      <p className="text-neutral-700 dark:text-slate-300">{String(value)}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-neutral-500 dark:text-slate-400">No {platformLabel} data available for this emoji.</p>
            )}
          </section>
        </AnimatedSection>

        {/* See on other platforms */}
        <AnimatedSection>
          <section className="mb-10">
            <h2 className="text-lg font-bold text-primary-dark dark:text-white mb-4">See on Other Platforms</h2>
            <PlatformLinks emojiSlug={emoji.slug} currentPlatform={platformKey} />
          </section>
        </AnimatedSection>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ClientShell>
  );
}
