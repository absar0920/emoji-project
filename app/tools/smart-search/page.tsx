"use client";

import { useState } from "react";
import Link from "next/link";
import ToolHero from "@/components/ToolHero";

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
        badge="AI-Powered"
      />

      <div className="mb-7">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Try: breakup emoji for tiktok, sad emoji gen-z…"
            className="fg-field flex-1 min-w-0 px-4 py-3 text-base"
          />
          <button onClick={() => handleSearch(query)} disabled={!query.trim() || loading} className="fg-btn px-6 shrink-0">
            {loading ? "…" : "Search"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {EXAMPLE_QUERIES.map((q) => (
            <button key={q} onClick={() => handleSearch(q)} className="fg-chip px-3 py-1.5">{q}</button>
          ))}
        </div>
      </div>

      {error && <div className="fg-alert px-4 py-3 mb-6">{error}</div>}

      {results.length > 0 && (
        <>
          <p className="fg-kicker mb-5">{results.length} results</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((r, i) => (
              <Link key={i} href={`/emoji/${r.slug}`} className="fg-card fg-link p-5 flex gap-4 items-start">
                <span className="text-5xl leading-none shrink-0">{r.character}</span>
                <div className="min-w-0">
                  <span className="font-read t-ink block capitalize">{r.name}</span>
                  {r.why && <span className="fg-kicker inline-block mt-1.5">{r.why}</span>}
                  {r.relevant_meaning && <p className="text-xs t-muted mt-2 line-clamp-3 leading-relaxed">{r.relevant_meaning}</p>}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {searched && !loading && results.length === 0 && !error && (
        <div className="py-16 border-y border-[var(--line)] text-center">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="mono text-[0.78rem] uppercase tracking-[0.14em] t-muted">No results — try a different query</p>
        </div>
      )}
    </>
  );
}
