import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEmojiBySlug, getRelatedEmojis, getComparisonsByEmoji, getCombosByEmoji } from "@/lib/mongodb";
import Link from "next/link";
import { generateEmojiMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import CopyButton from "@/components/CopyButton";
import MeaningTabs from "@/components/MeaningTabs";
import PlatformAccordion from "@/components/PlatformAccordion";
import CultureCard from "@/components/CultureCard";
import TimelineSection from "@/components/TimelineSection";
import RelatedEmojis from "@/components/RelatedEmojis";
import PlatformLinks from "@/components/PlatformLinks";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";
import DesignVariations from "@/components/DesignVariations";
import ShareEmbed from "@/components/ShareEmbed";
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
  const emoji = await getEmojiBySlug(slug);
  if (!emoji) return { title: "Emoji Not Found" };
  const meta = generateEmojiMeta(emoji);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: meta.openGraph,
  };
}

function Chapter({ label, meta, title, id, children }: { label: string; meta?: string; title: string; id?: string; children: React.ReactNode }) {
  return (
    <AnimatedSection>
      <section id={id} className="pt-12 scroll-mt-24">
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

const Chev = () => (
  <svg className="fg-chev w-4 h-4 t-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 9l-7 7-7-7" />
  </svg>
);

const PLATFORM_KEYS = [
  "tiktok", "whatsapp", "instagram", "x", "facebook", "snapchat",
  "telegram", "discord", "pinterest", "reddit", "linkedin", "bereal",
  "threads", "twitch", "spotify",
];

export default async function EmojiPage({ params }: PageProps) {
  const { slug } = await params;
  const emoji = await getEmojiBySlug(slug);
  if (!emoji) notFound();

  const relatedEmojis = await getRelatedEmojis(emoji.relations?.related?.slice(0, 15) || []);
  const [comparisons, combos] = await Promise.all([
    getComparisonsByEmoji(slug, 3),
    getCombosByEmoji(emoji.character, 3),
  ]);
  const faqSchema = generateFAQSchema(emoji);
  const breadcrumbSchema = generateBreadcrumbSchema(emoji);

  const meanings = [
    emoji.genz_meaning && { key: "genz", label: "Gen-Z", content: { interpretation: emoji.genz_meaning.interpretation || "", tiktok_usage: emoji.genz_meaning.tiktok_usage || "", irony_level: emoji.genz_meaning.irony_level ?? 0 } },
    emoji.official_meaning && { key: "official", label: "Official", content: { description: emoji.official_meaning.description || "", original_intent: emoji.official_meaning.original_intent || "" } },
    emoji.emotional_meaning && { key: "emotional", label: "Emotional", content: { emotion_type: emoji.emotional_meaning.emotion_type || "", intensity: emoji.emotional_meaning.intensity ?? 0, psychology_note: emoji.emotional_meaning.psychology_note || "" } },
    emoji.dating_meaning && { key: "dating", label: "Dating", content: { flirt_usage: emoji.dating_meaning.flirt_usage || "", relationship_context: emoji.dating_meaning.relationship_context || "", red_flag: emoji.dating_meaning.red_flag ?? false } },
    emoji.meme_meaning && { key: "meme", label: "Meme", content: { viral_usage: emoji.meme_meaning.viral_usage || "", irony_level: emoji.meme_meaning.irony_level ?? 0 } },
    emoji.sarcastic_meaning && { key: "sarcastic", label: "Sarcastic", content: { passive_aggressive_usage: emoji.sarcastic_meaning.passive_aggressive || "", meme_sarcasm: emoji.sarcastic_meaning.meme_sarcasm || "" } },
  ].filter(Boolean) as unknown as Array<{ key: string; label: string; content: Record<string, string | number | boolean> }>;

  const emojiRec = emoji as unknown as Record<string, unknown>;
  const platformsObj = emojiRec.platforms as Record<string, unknown> | undefined;
  const platforms = PLATFORM_KEYS.flatMap((key) => {
    const data = (platformsObj?.[key] ?? emojiRec[key]) as Record<string, string | string[] | number> | undefined;
    if (!data || typeof data !== "object") return [];
    return [{ key, data }];
  });

  const rel = emoji.relations || {};
  const seeAlso: Array<{ label: string; items: string[] }> = [
    { label: "Opposite", items: rel.opposite || [] },
    { label: "Often confused with", items: rel.confusing || [] },
    { label: "Can replace", items: rel.replacement || [] },
  ].filter((g) => g.items.length > 0);

  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          {/* Breadcrumb */}
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2 min-w-0">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <Link href="/search" className="fg-link">Emojis</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink truncate">{emoji.character} {emoji.name}</span>
            </span>
            <span className="hidden sm:inline shrink-0">Field Guide</span>
          </div>

          {/* Masthead */}
          <FadeIn immediate>
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8 border-b-2 border-[var(--rule)] pb-9">
              <span className="text-[6.5rem] sm:text-[8.5rem] leading-[0.8] shrink-0">{emoji.character}</span>
              <div className="flex-1 min-w-0 pb-1">
                <p className="fg-kicker mb-3">The Emoji</p>
                <h1 className="font-display t-ink leading-[1.0] tracking-[-0.015em] text-[2.4rem] sm:text-[3.4rem]">{emoji.name}</h1>
                <p className="mono t-muted text-[0.72rem] tracking-wider mt-3">{emoji.unicode} · {emoji.shortcode}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <CopyButton text={emoji.character} tone="editorial" label={`Copy ${emoji.character}`} />
                  {emoji.virality?.trend_score != null && (
                    <span className="fg-label">Trend <b className="t-accent text-sm">{emoji.virality.trend_score}</b></span>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {meanings.length > 0 && (
            <Chapter label="✦" meta={`${meanings.length} layers`} title="Meaning layers" id="meanings">
              <MeaningTabs meanings={meanings} />
            </Chapter>
          )}

          {platforms.length > 0 && (
            <Chapter label="By app" meta={`${platforms.length} platforms`} title="Platform meanings" id="platforms">
              <PlatformAccordion platforms={platforms} />
            </Chapter>
          )}

          {emoji.cultures && Object.keys(emoji.cultures).length > 0 && (
            <Chapter label="Across cultures" title="Cultural meanings" id="cultures">
              <div className="fg-list">
                {Object.entries(emoji.cultures).map(([region, meaning]) => (
                  <CultureCard key={region} region={region} meaning={meaning as string} />
                ))}
              </div>
            </Chapter>
          )}

          {emoji.time_evolution && (
            <Chapter label="Evolution" title="How its meaning shifted" id="timeline">
              <TimelineSection timeEvolution={emoji.time_evolution} />
            </Chapter>
          )}

          {relatedEmojis.length > 0 && (
            <Chapter label="Related" meta={`${relatedEmojis.length}`} title="Related emojis" id="related">
              <RelatedEmojis emojis={relatedEmojis} />
            </Chapter>
          )}

          <Chapter label="Cross-platform" meta={`${PLATFORM_KEYS.length} platforms`} title="See it on every platform">
            <PlatformLinks emojiSlug={emoji.slug} tone="editorial" />
          </Chapter>

          {comparisons.length > 0 && (
            <Chapter label="Compare" title="Compare with">
              <div className="fg-list">
                {comparisons.map((comp) => {
                  const otherChar = comp.emoji1_slug === slug ? comp.emoji2_character : comp.emoji1_character;
                  const otherName = comp.emoji1_slug === slug ? comp.emoji2_name : comp.emoji1_name;
                  return (
                    <Link key={comp.slug} href={`/vs/${comp.slug}`} className="fg-link flex items-center gap-3 py-3.5 border-b border-[var(--line)]">
                      <span className="text-xl">{emoji.character}</span>
                      <span className="mono t-muted text-[0.62rem]">VS</span>
                      <span className="text-xl">{otherChar}</span>
                      <span className="font-read flex-1 min-w-0 truncate">{otherName}</span>
                      <span className="t-muted">→</span>
                    </Link>
                  );
                })}
              </div>
            </Chapter>
          )}

          {combos.length > 0 && (
            <Chapter label="Combos" title="Emoji combinations">
              <div className="fg-list">
                {combos.map((combo) => (
                  <Link key={combo.slug} href={`/combo/${combo.slug}`} className="fg-link flex items-center gap-4 py-3.5 border-b border-[var(--line)]">
                    <span className="text-xl shrink-0">{combo.combos?.[0]?.emojis?.slice(0, 3).join("") || "🎉"}</span>
                    <span className="font-read flex-1 min-w-0 truncate">{combo.theme}</span>
                    <span className="t-muted">→</span>
                  </Link>
                ))}
              </div>
            </Chapter>
          )}

          {seeAlso.length > 0 && (
            <Chapter label="See also" title="Adjacent emojis">
              <dl className="fg-deflist border-t border-[var(--line)]">
                {seeAlso.map((g) => (
                  <div key={g.label}>
                    <dt>{g.label}</dt>
                    <dd>
                      <span className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {g.items.map((s) => (
                          <Link key={s} href={`/emoji/${s}`} className="fg-link mono text-[0.72rem] uppercase tracking-wide">{s.replace(/-/g, " ")}</Link>
                        ))}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Chapter>
          )}

          <Chapter label="Share" title="Share &amp; embed">
            <ShareEmbed slug={emoji.slug} character={emoji.character} name={emoji.name} />
          </Chapter>

          {faqSchema.mainEntity.length > 0 && (
            <Chapter label="FAQ" meta={`${faqSchema.mainEntity.length} questions`} title="Frequently asked" id="faq">
              <div className="fg-list">
                {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                  <details key={i} className="fg-detail border-b border-[var(--line)]">
                    <summary className="flex items-baseline gap-3 sm:gap-4 py-3.5 cursor-pointer">
                      <span className="mono t-muted text-[0.62rem] w-6 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-read t-ink flex-1">{faq.name}</span>
                      <Chev />
                    </summary>
                    <p className="t-body leading-relaxed pb-4 max-w-2xl sm:pl-[2.6rem]">{faq.acceptedAnswer.text}</p>
                  </details>
                ))}
              </div>
            </Chapter>
          )}

          {emoji.safety && (
            <Chapter label="Safety" title="Safety &amp; usage">
              <dl className="fg-deflist border-t border-[var(--line)]">
                <div>
                  <dt style={{ color: "var(--good)" }}>Safe meaning</dt>
                  <dd>{emoji.safety.safe_meaning}</dd>
                </div>
                {emoji.safety.toxic_meaning && (
                  <div>
                    <dt style={{ color: "var(--accent)" }}>Caution</dt>
                    <dd>{emoji.safety.toxic_meaning}</dd>
                  </div>
                )}
                {emoji.safety.nsfw && (
                  <div>
                    <dt style={{ color: "var(--accent)" }}>NSFW</dt>
                    <dd>Not safe for work — use with care.</dd>
                  </div>
                )}
              </dl>
              {emoji.safety.warning_notes && <p className="mono text-[0.7rem] t-muted mt-4">{emoji.safety.warning_notes}</p>}
            </Chapter>
          )}

          <Chapter label="Rendering" title="How it looks across platforms" id="design">
            <DesignVariations character={emoji.character} variations={emoji.design_variations} />
          </Chapter>
        </div>
      </main>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </ClientShell>
  );
}
