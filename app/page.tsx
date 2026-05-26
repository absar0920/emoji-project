import Link from "next/link";
import { getTrendingEmojis } from "@/lib/mongodb";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

export const revalidate = 300;

const TOOLS = [
  { icon: "🍳", name: "Emoji Kitchen", desc: "Mix emojis into new designs", href: "/tools/emoji-kitchen" },
  { icon: "🔍", name: "Smart Search", desc: "AI-powered emoji finder", href: "/tools/smart-search" },
  { icon: "✨", name: "Emoji Maker", desc: "Generate custom emojis", href: "/tools/emoji-maker" },
  { icon: "📝", name: "Text to Emoji", desc: "Convert text to emoji style", href: "/tools/text-to-emoji" },
  { icon: "🎯", name: "Vibe Search", desc: "Find emojis by feeling", href: "/tools/vibe-search" },
  { icon: "💬", name: "Caption Generator", desc: "Viral captions with emojis", href: "/tools/caption-generator" },
];

const CATEGORIES = [
  { icon: "😀", name: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
  { icon: "👥", name: "People & Body", href: "/search?category=People+%26+Body" },
  { icon: "🐱", name: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
  { icon: "🍕", name: "Food & Drink", href: "/search?category=Food+%26+Drink" },
  { icon: "✈️", name: "Travel & Places", href: "/search?category=Travel+%26+Places" },
  { icon: "⚽", name: "Activities", href: "/search?category=Activities" },
  { icon: "💡", name: "Objects", href: "/search?category=Objects" },
  { icon: "❤️", name: "Symbols", href: "/search?category=Symbols" },
  { icon: "🏁", name: "Flags", href: "/search?category=Flags" },
];

export default async function HomePage() {
  const trending = await getTrendingEmojis(10);

  return (
    <ClientShell>
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              ✨ AI-Powered Emoji Intelligence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-dark leading-tight mb-4">
              Every Emoji.{" "}
              <span className="bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent">
                Every Meaning.
              </span>
            </h1>
            <p className="text-lg text-neutral-500 mb-8">
              3,700+ emojis · 15 platforms · 31 cultures
            </p>

            {/* Search bar */}
            <div className="max-w-lg mx-auto">
              <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                <span className="text-xl">🔍</span>
                <span className="flex-1 text-left text-neutral-400">Search any emoji or feeling...</span>
                <span className="bg-primary text-white px-5 py-1.5 rounded-full text-sm font-semibold">
                  Search
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Emojis */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary-dark">Most Popular</h2>
              <Link href="/search" className="text-sm text-primary font-medium hover:underline">
                Show More →
              </Link>
            </div>
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              {trending.map((e) => (
                <Link
                  key={e.slug}
                  href={`/emoji/${e.slug}`}
                  className="text-4xl sm:text-5xl hover:scale-110 transition-transform"
                  title={e.name}
                >
                  {e.character}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Playground */}
        <section className="py-12 bg-neutral-50/50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-primary-dark mb-6">Tools Playground</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="bg-gradient-to-br from-primary-light/50 to-violet-50/50 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-white rounded-xl shadow-sm w-12 h-12 flex items-center justify-center text-2xl mb-3">
                    {tool.icon}
                  </div>
                  <div className="font-semibold text-primary-dark">{tool.name}</div>
                  <div className="text-sm text-neutral-500 mt-1">{tool.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category Browse */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-primary-dark mb-6">Browse by Category</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-100 text-sm font-medium text-neutral-700 hover:shadow-md transition-shadow whitespace-nowrap shrink-0"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </ClientShell>
  );
}
