import { Metadata } from "next";
import Link from "next/link";
import { getTrendingEmojis, getTrendingByPlatform } from "@/lib/mongodb";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trending Emojis 2026 — Most Viral Emojis Today",
  description: "See which emojis are trending on TikTok, Instagram, and across all platforms. Updated daily with trend scores.",
};

export const dynamic = "force-dynamic";

interface TrendingEmoji {
  slug: string;
  character: string;
  name: string;
  category?: string;
  virality?: { trend_score?: number };
}

function EmojiRow({ emoji, rank }: { emoji: TrendingEmoji; rank: number }) {
  return (
    <Link href={`/emoji/${emoji.slug}`} className="fg-link flex items-center gap-4 py-3.5 border-b border-[var(--line)]">
      <span className="mono t-muted text-[0.7rem] w-7 shrink-0 tabular-nums">{String(rank).padStart(2, "0")}</span>
      <span className="text-3xl shrink-0">{emoji.character}</span>
      <div className="flex-1 min-w-0">
        <span className="font-read t-ink block truncate">{emoji.name}</span>
        {emoji.category && <span className="fg-label">{emoji.category}</span>}
      </div>
      {emoji.virality?.trend_score != null && (
        <span className="fg-label shrink-0">Trend <b className="t-accent text-sm">{emoji.virality.trend_score}</b></span>
      )}
    </Link>
  );
}

function Chapter({ label, meta, title, children }: { label: string; meta?: string; title: string; children: React.ReactNode }) {
  return (
    <section className="pt-12 first:pt-0">
      <div className="fg-chapter__bar">
        <span className="fg-chapter__n">{label}</span>
        {meta && <span className="fg-chapter__count">{meta}</span>}
      </div>
      <h2 className="fg-chapter__title mt-5 text-[1.6rem] sm:text-[2rem]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const Empty = ({ what }: { what: string }) => (
  <p className="mono text-[0.78rem] uppercase tracking-[0.14em] t-muted py-8 border-b border-[var(--line)]">No {what} data available yet</p>
);

export default async function TrendingPage() {
  const [top20, tiktok, instagram] = await Promise.all([
    getTrendingEmojis(20),
    getTrendingByPlatform("tiktok", 10),
    getTrendingByPlatform("instagram", 10),
  ]);

  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          {/* Running head */}
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink">Trending</span>
            </span>
            <span className="hidden sm:inline">Field Guide</span>
          </div>

          {/* Masthead */}
          <div className="border-b-2 border-[var(--rule)] pb-7">
            <p className="fg-kicker mb-4">Updated daily</p>
            <h1 className="font-display t-ink leading-[1.0] tracking-[-0.015em] text-[2.6rem] sm:text-[3.6rem]">Trending now</h1>
            <p className="t-muted font-read mt-4 max-w-2xl">The most viral emojis right now across every major platform.</p>
          </div>

          <Chapter label="Overall" meta="Top 20" title="Today's top 20">
            {top20.length > 0 ? (
              <div className="fg-list">{top20.map((e, i) => <EmojiRow key={e.slug} emoji={e as TrendingEmoji} rank={i + 1} />)}</div>
            ) : <Empty what="trending" />}
          </Chapter>

          <Chapter label="🎵 TikTok" meta="Top 10" title="Trending on TikTok">
            {tiktok.length > 0 ? (
              <div className="fg-list">{tiktok.map((e, i) => <EmojiRow key={e.slug} emoji={e as TrendingEmoji} rank={i + 1} />)}</div>
            ) : <Empty what="TikTok" />}
          </Chapter>

          <Chapter label="📸 Instagram" meta="Top 10" title="Trending on Instagram">
            {instagram.length > 0 ? (
              <div className="fg-list">{instagram.map((e, i) => <EmojiRow key={e.slug} emoji={e as TrendingEmoji} rank={i + 1} />)}</div>
            ) : <Empty what="Instagram" />}
          </Chapter>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
