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
        badge="AI-Powered"
      />

      <div className="mb-7">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Search by feeling, mood, or vibe…"
            className="fg-field flex-1 min-w-0 px-4 py-3 text-base"
          />
          <button onClick={() => handleSearch(query)} disabled={!query.trim() || loading} className="fg-btn px-6 shrink-0">
            {loading ? "…" : "Search"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {MOODS.map((mood) => (
            <button key={mood} onClick={() => handleSearch(mood)} className="fg-chip px-3 py-1.5">{mood}</button>
          ))}
        </div>
      </div>

      {error && <div className="fg-alert px-4 py-3 mb-6">{error}</div>}

      {results.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-5">
            <p className="fg-kicker">{results.length} matches</p>
            <CopyAllButton emojis={results.map((r) => r.emoji)} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {results.map((r, i) => (
              <div key={i} className="fg-card p-4 text-center">
                <span className="text-4xl block mb-2">{r.emoji}</span>
                <span className="font-read text-sm t-ink block">{r.name}</span>
                <span className="fg-kicker inline-block mt-1.5">{r.match_percent}% match</span>
                <p className="text-xs t-muted mt-2 leading-relaxed">{r.reason}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
