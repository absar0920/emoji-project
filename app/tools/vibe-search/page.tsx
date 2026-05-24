"use client";

import { useState } from "react";
import ToolHero from "@/components/ToolHero";
import CopyAllButton from "@/components/CopyAllButton";

const MOODS = ["sad", "love", "toxic", "funny", "aesthetic", "angry", "hype", "chill", "romantic", "dark"];

interface VibeResult {
  emoji: string;
  name: string;
  match_percent: number;
  reason: string;
}

export default function VibeSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<VibeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(q: string) {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tools/vibe-search", {
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
        title="Vibe Search"
        description="Search emojis by mood, feeling, or vibe. Find the perfect emoji for any emotion."
        badge="✨ AI-Powered"
      />

      {/* Search */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Search by feeling, mood, or vibe..."
            className="flex-1 px-5 py-3 rounded-full border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/30 text-lg"
          />
          <button
            onClick={() => handleSearch(query)}
            disabled={!query.trim() || loading}
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* Mood chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => handleSearch(mood)}
              className="px-3 py-1.5 rounded-full bg-neutral-100 text-sm text-neutral-600 hover:bg-neutral-200 transition-colors capitalize"
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-accent-red text-sm mb-6">{error}</div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary-dark">Results</h2>
            <CopyAllButton emojis={results.map((r) => r.emoji)} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {results.map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100 text-center">
                <span className="text-4xl block mb-2">{r.emoji}</span>
                <span className="text-xs font-medium text-neutral-900 block">{r.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary font-medium mt-1 inline-block">
                  {r.match_percent}% match
                </span>
                <p className="text-xs text-neutral-500 mt-2">{r.reason}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
