import { Metadata } from "next";
import Link from "next/link";
import { getSearchIndex } from "@/lib/mongodb";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  if (!q) return { title: "Search Emojis" };
  return {
    title: `"${q}" — Emoji Search Results`,
    description: `Find the meaning of "${q}" emojis across Gen-Z slang, TikTok, WhatsApp, and more.`,
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const allEmojis = await getSearchIndex();

  let results = allEmojis;
  if (q) {
    const query = q.toLowerCase();
    results = allEmojis.filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.tags.some((t) => t.toLowerCase().includes(query)) ||
        e.character === q ||
        e.shortcode.toLowerCase().includes(query)
    );
  }

  return (
    <ClientShell>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-primary-dark dark:text-white mb-2">
          {q ? `Search results for "${q}"` : "All Emojis"}
        </h1>
        <p className="text-neutral-500 dark:text-slate-400 mb-8">
          {results.length} emoji{results.length !== 1 ? "s" : ""} found
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {results.map((emoji) => (
            <Link
              key={emoji.slug}
              href={`/emoji/${emoji.slug}`}
              className="flex flex-col items-center gap-1 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-slate-900/30 hover:shadow-md dark:hover:shadow-slate-900/30 transition-shadow border border-neutral-100 dark:border-slate-700"
            >
              <span className="text-3xl">{emoji.character}</span>
              <span className="text-xs text-neutral-600 dark:text-slate-300 text-center truncate w-full">{emoji.name}</span>
            </Link>
          ))}
        </div>
        {results.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-neutral-500 dark:text-slate-400">No emojis found for &quot;{q}&quot;. Try a different search term.</p>
          </div>
        )}
      </main>
      <Footer />
    </ClientShell>
  );
}
