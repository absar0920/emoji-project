"use client";

import { useState } from "react";
import Link from "next/link";
import ToolHero from "@/components/ToolHero";
import { StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

const EXAMPLE_QUERIES = [
  "breakup emoji for tiktok",
  "sarcastic ok on whatsapp",
  "sad emoji gen-z",
  "flirty emoji for dating",
  "meme emoji for instagram",
  "toxic emoji meaning",
];

interface SmartSearchResult {
  character: string;
  slug: string;
  name: string;
  relevant_meaning: string;
  why: string;
}

export default function SmartSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SmartSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch(q: string) {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await fetch("/api/tools/smart-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.results || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToolHero
        title="Smart Search"
        description="Search emojis by meaning, feeling, platform context, or cultural use. AI understands what you're looking for."
        badge="✨ AI-Powered"
      />

      {/* Search input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Try: breakup emoji for tiktok, sad emoji gen-z..."
            className="flex-1 px-5 py-3 rounded-lg border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-shadow text-lg"
          />
          <button
            onClick={() => handleSearch(query)}
            disabled={!query.trim() || loading}
            className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* Example query chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {EXAMPLE_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => handleSearch(q)}
              className="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-slate-700 text-sm text-neutral-600 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-700 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-accent-red text-sm mb-6">
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <h2 className="font-display text-xl sm:text-2xl text-primary-dark dark:text-white mb-4">Results</h2>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <StaggerItem key={i}>
                <Link
                  href={`/emoji/${r.slug}`}
                  className="card-lift bg-white dark:bg-slate-800 rounded-2xl p-5 border border-neutral-200/80 dark:border-slate-700 shadow-sm flex gap-4 items-start"
                >
                  <span className="text-5xl leading-none flex-shrink-0">{r.character}</span>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-slate-100 block capitalize">
                      {r.name}
                    </span>
                    {r.why && (
                      <span className="text-xs px-2 py-0.5 rounded-full border border-neutral-200 dark:border-slate-700 text-primary font-medium mt-1 inline-block">
                        {r.why}
                      </span>
                    )}
                    {r.relevant_meaning && (
                      <p className="text-xs text-neutral-500 dark:text-slate-400 mt-2 line-clamp-3">
                        {r.relevant_meaning}
                      </p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </>
      )}

      {searched && !loading && results.length === 0 && !error && (
        <div className="text-center py-12 text-neutral-400 dark:text-slate-500">
          <span className="text-4xl block mb-3">🔍</span>
          <p>No results found. Try a different query.</p>
        </div>
      )}
    </>
  );
}
