import { Metadata } from "next";
import Link from "next/link";
import { getSearchIndex } from "@/lib/mongodb";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
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
      <main className="theme-editorial min-h-screen">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          {/* Running head */}
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink">Index</span>
            </span>
            <span className="hidden sm:inline">Field Guide</span>
          </div>

          {/* Masthead */}
          <div className="border-b-2 border-[var(--rule)] pb-7 mb-9">
            <p className="fg-kicker mb-4">{q ? "Search results" : "The index"}</p>
            <h1 className="font-display t-ink leading-[1.0] tracking-[-0.015em] text-[2.4rem] sm:text-[3.4rem]">
              {q ? <>&ldquo;{q}&rdquo;</> : "All emojis"}
            </h1>
            <p className="fg-label mt-4">
              {results.length} {results.length === 1 ? "entry" : "entries"}
            </p>
          </div>

          {results.length > 0 ? (
            <div className="fg-specimen-grid">
              {results.map((emoji) => (
                <Link key={emoji.slug} href={`/emoji/${emoji.slug}`} className="fg-specimen fg-link">
                  <span className="fg-specimen__g">{emoji.character}</span>
                  <span className="fg-specimen__c block text-center leading-tight line-clamp-2">{emoji.name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 border-y border-[var(--line)] text-center">
              <span className="text-5xl block mb-5">🔍</span>
              <p className="mono text-[0.8rem] uppercase tracking-[0.14em] t-muted">
                No entries for &ldquo;{q}&rdquo; — try another term
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
