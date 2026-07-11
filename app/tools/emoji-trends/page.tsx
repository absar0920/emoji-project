import { Metadata } from "next";
import Link from "next/link";
import { getTrendingEmojis } from "@/lib/mongodb";
import ToolHero from "@/components/ToolHero";

export const metadata: Metadata = {
  title: "Trending Emojis 2026 — Most Popular Emojis Right Now",
  description: "See which emojis are trending on TikTok, Instagram, and WhatsApp. Updated daily with trend scores.",
};

// Weekly ISR — cached after first render instead of running on every request.
// Shorten this (e.g. 3600) if you want trends to refresh more often.
export const revalidate = 604800;

export default async function EmojiTrendsPage() {
  const trending = await getTrendingEmojis(20);

  return (
    <>
      <ToolHero title="Trending Emojis" description="See which emojis are trending right now across all platforms." badge="Live" />

      {trending.length > 0 ? (
        <div className="fg-list">
          {trending.map((emoji, i) => (
            <Link key={emoji.slug} href={`/emoji/${emoji.slug}`} className="fg-link flex items-center gap-4 py-3.5 border-b border-[var(--line)]">
              <span className="mono t-muted text-[0.7rem] w-7 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-3xl shrink-0">{emoji.character}</span>
              <div className="flex-1 min-w-0">
                <span className="font-read t-ink block truncate">{emoji.name}</span>
                {emoji.category && <span className="fg-label">{emoji.category}</span>}
              </div>
              {emoji.virality?.trend_score != null && (
                <span className="fg-label shrink-0">Trend <b className="t-accent text-sm">{emoji.virality.trend_score}</b></span>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 border-y border-[var(--line)] text-center">
          <span className="text-5xl block mb-4">📊</span>
          <p className="mono text-[0.78rem] uppercase tracking-[0.14em] t-muted">No trending data available yet</p>
        </div>
      )}
    </>
  );
}
