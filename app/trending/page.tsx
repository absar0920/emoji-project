import { Metadata } from "next";
import Link from "next/link";
import { getTrendingEmojis, getTrendingByPlatform } from "@/lib/mongodb";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trending Emojis 2026 — Most Viral Emojis Today",
  description:
    "See which emojis are trending on TikTok, Instagram, and across all platforms. Updated daily with trend scores.",
};

export const dynamic = "force-dynamic";

function EmojiRow({
  emoji,
  rank,
}: {
  emoji: any;
  rank: number;
}) {
  return (
    <Link
      href={`/emoji/${emoji.slug}`}
      className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/30 hover:shadow-lg transition-shadow"
    >
      <span className="text-sm font-bold text-neutral-400 dark:text-slate-500 w-8">
        #{rank}
      </span>
      <span className="text-4xl">{emoji.character}</span>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-neutral-900 dark:text-slate-100 block truncate">
          {emoji.name}
        </span>
        <span className="text-xs text-neutral-500 dark:text-slate-400">{emoji.category}</span>
      </div>
      {emoji.virality?.trend_score != null && (
        <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-accent-amber text-sm font-medium shrink-0">
          🔥 {emoji.virality.trend_score}
        </span>
      )}
    </Link>
  );
}

export default async function TrendingPage() {
  const [top20, tiktok, instagram] = await Promise.all([
    getTrendingEmojis(20),
    getTrendingByPlatform("tiktok", 10),
    getTrendingByPlatform("instagram", 10),
  ]);

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Trending Emojis
          </h1>
          <p className="text-neutral-500 dark:text-slate-400">
            The most popular emojis right now across all platforms.
          </p>
        </div>

        {/* Top 20 */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary-dark dark:text-white mb-4">
            Today&apos;s Top 20
          </h2>
          <div className="space-y-3">
            {top20.map((emoji, i) => (
              <EmojiRow key={emoji.slug} emoji={emoji} rank={i + 1} />
            ))}
            {top20.length === 0 && (
              <p className="text-neutral-400 dark:text-slate-500 text-center py-8">
                No trending data available yet.
              </p>
            )}
          </div>
        </section>

        <hr className="border-neutral-200 dark:border-slate-700 my-8" />

        {/* TikTok */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary-dark dark:text-white mb-4">
            Trending on TikTok
          </h2>
          <div className="space-y-3">
            {tiktok.map((emoji, i) => (
              <EmojiRow key={emoji.slug} emoji={emoji} rank={i + 1} />
            ))}
            {tiktok.length === 0 && (
              <p className="text-neutral-400 dark:text-slate-500 text-center py-8">
                No TikTok trending data available.
              </p>
            )}
          </div>
        </section>

        <hr className="border-neutral-200 dark:border-slate-700 my-8" />

        {/* Instagram */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary-dark dark:text-white mb-4">
            Trending on Instagram
          </h2>
          <div className="space-y-3">
            {instagram.map((emoji, i) => (
              <EmojiRow key={emoji.slug} emoji={emoji} rank={i + 1} />
            ))}
            {instagram.length === 0 && (
              <p className="text-neutral-400 dark:text-slate-500 text-center py-8">
                No Instagram trending data available.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </ClientShell>
  );
}
