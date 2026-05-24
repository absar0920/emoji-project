"use client";

import { useState, useEffect } from "react";
import ToolHero from "@/components/ToolHero";
import { EmojiSearchItem } from "@/types/emoji";

const CATEGORIES = [
  "Smileys & Emotion", "People & Body", "Animals & Nature", "Food & Drink",
  "Travel & Places", "Activities", "Objects", "Symbols", "Flags",
];

export default function EmojiKeyboardPage() {
  const [emojis, setEmojis] = useState<EmojiSearchItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Smileys & Emotion");
  const [copied, setCopied] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/search-index")
      .then((res) => res.json())
      .then((data: EmojiSearchItem[]) => setEmojis(data));

    const stored = localStorage.getItem("recent-emojis");
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  function handleCopy(character: string) {
    navigator.clipboard.writeText(character);
    setCopied(character);
    setTimeout(() => setCopied(null), 1500);

    const updated = [character, ...recent.filter((e) => e !== character)].slice(0, 10);
    setRecent(updated);
    localStorage.setItem("recent-emojis", JSON.stringify(updated));
  }

  const filtered = search
    ? emojis.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
          e.character === search
      )
    : emojis.filter((e) => e.category === category);

  return (
    <>
      <ToolHero
        title="Emoji Keyboard"
        description="Browse, search, and copy any emoji with one click."
      />

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search emojis..."
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/30 mb-4"
      />

      {/* Categories */}
      {!search && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                category === cat ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Recent */}
      {recent.length > 0 && !search && (
        <div className="mb-4">
          <span className="text-xs font-medium text-neutral-500 block mb-2">Recent</span>
          <div className="flex gap-1">
            {recent.map((e, i) => (
              <button
                key={i}
                onClick={() => handleCopy(e)}
                className="text-2xl p-1 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-8 sm:grid-cols-8 gap-1">
        {filtered.map((e) => (
          <button
            key={e.slug}
            onClick={() => handleCopy(e.character)}
            className={`text-3xl p-2 rounded-lg hover:bg-neutral-100 hover:scale-110 transition-all ${
              copied === e.character ? "bg-accent-emerald/10 scale-110" : ""
            }`}
            title={e.name}
          >
            {e.character}
          </button>
        ))}
      </div>

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-accent-emerald text-white rounded-full text-sm font-medium shadow-lg z-50">
          Copied {copied}!
        </div>
      )}
    </>
  );
}
