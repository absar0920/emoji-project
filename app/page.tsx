import Link from "next/link";
import { getTrendingEmojis, getEmojiCount } from "@/lib/mongodb";
import EmojiCard from "@/components/EmojiCard";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  const trending = await getTrendingEmojis(12);
  const emojiCount = await getEmojiCount();

  const heroEmojis = trending.slice(0, 6);
  const trendingRow = trending.slice(0, 10);

  const stats = [
    { label: "Emojis", value: `${emojiCount.toLocaleString()}+` },
    { label: "Platforms", value: "3" },
    { label: "Cultures", value: "4+" },
    { label: "Powered", value: "AI" },
  ];

  return (
    <ClientShell>
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left column */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  ✨ AI-Powered
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-dark leading-tight mb-4">
                  Every Emoji.{" "}
                  <span className="bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent">
                    Every Meaning.
                  </span>
                </h1>
                <p className="text-lg text-neutral-500 mb-8">
                  Gen-Z slang · Platform context · Cultural intelligence · AI-powered search
                </p>

                {/* Search bar placeholder (will be wired to modal in Task 11) */}
                <div className="relative max-w-lg">
                  <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-full shadow-lg border border-neutral-200 cursor-pointer hover:shadow-xl transition-shadow">
                    <span className="text-xl">🔍</span>
                    <span className="text-neutral-400">Search any emoji or feeling...</span>
                  </div>
                </div>

                {/* Trending pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {heroEmojis.slice(0, 4).map((e) => (
                    <Link
                      key={e.slug}
                      href={`/emoji/${e.slug}`}
                      className="px-3 py-1 rounded-full bg-white/70 text-sm text-neutral-600 hover:bg-white hover:shadow-sm transition-all"
                    >
                      {e.character} {e.name.toLowerCase()}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right column — emoji grid */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                {heroEmojis.slice(0, 5).map((e) => (
                  <Link
                    key={e.slug}
                    href={`/emoji/${e.slug}`}
                    className="flex flex-col items-center gap-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-4xl">{e.character}</span>
                    <span className="text-xs text-neutral-600 font-medium text-center">{e.name}</span>
                  </Link>
                ))}
                <Link
                  href="/search"
                  className="flex flex-col items-center justify-center gap-1 p-4 bg-primary rounded-xl text-white hover:bg-primary-dark transition-colors"
                >
                  <span className="text-lg font-bold">{emojiCount}+</span>
                  <span className="text-xs">more</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Now */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary-dark mb-6">🔥 Trending Now</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trendingRow.map((e) => (
                <div key={e.slug} className="flex-shrink-0">
                  <EmojiCard character={e.character} name={e.name} slug={e.slug} trendScore={e.virality?.trend_score} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </ClientShell>
  );
}
