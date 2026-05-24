import { Metadata } from "next";
import Link from "next/link";
import { getTrendingEmojis } from "@/lib/mongodb";
import ToolHero from "@/components/ToolHero";

export const metadata: Metadata = {
  title: "Trending Emojis 2026 — Most Popular Emojis Right Now",
  description: "See which emojis are trending on TikTok, Instagram, and WhatsApp. Updated daily with trend scores.",
};

export const dynamic = "force-dynamic";

export default async function EmojiTrendsPage() {
  const trending = await getTrendingEmojis(20);

  return (
    <>
      <ToolHero
        title="Trending Emojis"
        description="See which emojis are trending right now across all platforms."
        badge="🔥 Live"
      />

      <div className="space-y-3">
        {trending.map((emoji, i) => (
          <Link
            key={emoji.slug}
            href={`/emoji/${emoji.slug}`}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
          >
            <span className="text-sm font-bold text-neutral-400 w-6">#{i + 1}</span>
            <span className="text-4xl">{emoji.character}</span>
            <div className="flex-1">
              <span className="font-medium text-neutral-900">{emoji.name}</span>
              <span className="text-xs text-neutral-500 block">{emoji.category}</span>
            </div>
            {emoji.virality?.trend_score != null && (
              <span className="px-3 py-1 rounded-full bg-amber-50 text-accent-amber text-sm font-medium">
                🔥 {emoji.virality.trend_score}
              </span>
            )}
          </Link>
        ))}

        {trending.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            <span className="text-6xl block mb-4">📊</span>
            <p>No trending data available yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
