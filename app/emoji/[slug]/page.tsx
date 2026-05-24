import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEmojiBySlug, getAllSlugs, getRelatedEmojis } from "@/lib/mongodb";
import { generateEmojiMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import CopyButton from "@/components/CopyButton";
import MeaningCard from "@/components/MeaningCard";
import PlatformCard from "@/components/PlatformCard";
import CultureCard from "@/components/CultureCard";
import TimelineSection from "@/components/TimelineSection";
import RelatedEmojis from "@/components/RelatedEmojis";
import PlatformLinks from "@/components/PlatformLinks";
import StickyTOC from "@/components/StickyTOC";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pages generated on-demand via ISR — not at build time
export async function generateStaticParams() {
  return [];
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

export default async function EmojiPage({ params }: PageProps) {
  const { slug } = await params;
  const emoji = await getEmojiBySlug(slug);
  if (!emoji) notFound();

  const relatedEmojis = await getRelatedEmojis(emoji.relations?.related?.slice(0, 15) || []);
  const faqSchema = generateFAQSchema(emoji);
  const breadcrumbSchema = generateBreadcrumbSchema(emoji);

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <a href="/search" className="hover:text-primary">Emojis</a>{" › "}
          <span className="text-neutral-600">{emoji.character} {emoji.name}</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-light to-violet-50 rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6">
          <span className="text-8xl sm:text-[128px] leading-none">{emoji.character}</span>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-1">{emoji.name} Emoji</h1>
            <p className="text-sm text-neutral-500 font-mono mb-3">{emoji.unicode} · {emoji.shortcode}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <CopyButton text={emoji.character} />
              <CopyButton text={emoji.shortcode} label={emoji.shortcode} className="bg-neutral-100 !text-neutral-700 hover:!bg-neutral-200" />
              {emoji.virality?.trend_score != null && (
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-accent-amber">🔥 {emoji.virality?.trend_score}</span>
              )}
            </div>
          </div>
        </div>

        <StickyTOC />

        {/* Meanings */}
        <section id="meanings" className="mt-8 mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">Meaning Layers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MeaningCard type="official" label="Official" content={{ description: emoji.official_meaning?.description || "", original_intent: emoji.official_meaning?.original_intent || "" }} />
            <MeaningCard type="genz" label="Gen-Z" content={{ interpretation: emoji.genz_meaning?.interpretation || "", tiktok_usage: emoji.genz_meaning?.tiktok_usage || "", irony_level: emoji.genz_meaning?.irony_level ?? 0 }} />
            <MeaningCard type="emotional" label="Emotional" content={{ emotion_type: emoji.emotional_meaning?.emotion_type || "", intensity: emoji.emotional_meaning?.intensity ?? 0, psychology_note: emoji.emotional_meaning?.psychology_note || "" }} />
            <MeaningCard type="dating" label="Dating" content={{ flirt_usage: emoji.dating_meaning?.flirt_usage || "", relationship_context: emoji.dating_meaning?.relationship_context || "", red_flag: emoji.dating_meaning?.red_flag ?? false }} />
            <MeaningCard type="meme" label="Meme" content={{ viral_usage: emoji.meme_meaning?.viral_usage || "", irony_level: emoji.meme_meaning?.irony_level ?? 0 }} />
            <MeaningCard type="sarcastic" label="Sarcastic" content={{ passive_aggressive: emoji.sarcastic_meaning?.passive_aggressive || "", meme_sarcasm: emoji.sarcastic_meaning?.meme_sarcasm || "" }} />
          </div>
        </section>

        {/* Platforms */}
        <section id="platforms" className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">Platform Meanings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {((emoji as any).platforms?.tiktok || emoji.tiktok) && <PlatformCard platform="tiktok" data={((emoji as any).platforms?.tiktok || emoji.tiktok) as unknown as Record<string, string | string[] | number>} />}
            {((emoji as any).platforms?.whatsapp || emoji.whatsapp) && <PlatformCard platform="whatsapp" data={((emoji as any).platforms?.whatsapp || emoji.whatsapp) as unknown as Record<string, string | string[] | number>} />}
            {((emoji as any).platforms?.instagram || emoji.instagram) && <PlatformCard platform="instagram" data={((emoji as any).platforms?.instagram || emoji.instagram) as unknown as Record<string, string | string[] | number>} />}
          </div>
        </section>

        {/* Cultures */}
        <section id="cultures" className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">Cultural Meanings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emoji.cultures && Object.entries(emoji.cultures).map(([region, meaning]) => (
              <CultureCard key={region} region={region} meaning={meaning as string} />
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">Meaning Evolution</h2>
          {emoji.time_evolution && <TimelineSection timeEvolution={emoji.time_evolution} />}
        </section>

        {/* Related */}
        <section id="related" className="mb-10">
          <RelatedEmojis emojis={relatedEmojis} />
        </section>

        {/* Platform links */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-primary-dark mb-4">See on Every Platform</h2>
          <PlatformLinks emojiSlug={emoji.slug} />
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
              <details key={i} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer font-medium text-neutral-900 hover:bg-neutral-50">{faq.name}</summary>
                <p className="px-4 pb-4 text-sm text-neutral-600">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Safety */}
        {emoji.safety && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">Safety & Usage</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-full text-sm bg-emerald-50 text-accent-emerald font-medium">✅ {emoji.safety.safe_meaning}</span>
              {emoji.safety.toxic_meaning && (
                <span className="px-3 py-1.5 rounded-full text-sm bg-red-50 text-accent-red font-medium">⚠️ {emoji.safety.toxic_meaning}</span>
              )}
              {emoji.safety.nsfw && (
                <span className="px-3 py-1.5 rounded-full text-sm bg-red-100 text-accent-red font-bold">🔞 NSFW</span>
              )}
            </div>
            {emoji.safety.warning_notes && (
              <p className="mt-2 text-sm text-neutral-500">{emoji.safety.warning_notes}</p>
            )}
          </section>
        )}
      </main>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </ClientShell>
  );
}
