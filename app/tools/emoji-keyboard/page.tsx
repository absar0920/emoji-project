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
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("recent-emojis") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch("/api/search-index")
      .then((res) => res.json())
      .then((data: EmojiSearchItem[]) => setEmojis(data));
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
      <ToolHero title="Emoji Keyboard" description="Browse, search, and copy any emoji with one click." badge="Keyboard" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search emojis…"
        className="fg-field w-full px-4 py-3 mb-5"
      />

      {!search && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} data-active={category === cat} className="fg-chip px-3 py-1.5">{cat}</button>
          ))}
        </div>
      )}

      {recent.length > 0 && !search && (
        <div className="mb-5">
          <span className="fg-label block mb-2">Recent</span>
          <div className="flex gap-1">
            {recent.map((e, i) => (
              <button key={i} onClick={() => handleCopy(e)} className="text-2xl p-1.5 transition-colors hover:bg-[var(--paper-2)]">{e}</button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-8 gap-1 border-t border-l border-[var(--line)]">
        {filtered.map((e) => (
          <button
            key={e.slug}
            onClick={() => handleCopy(e.character)}
            className="aspect-square grid place-items-center text-3xl border-r border-b border-[var(--line)] transition-colors hover:bg-[var(--paper-2)]"
            style={copied === e.character ? { background: "var(--accent)" } : undefined}
            title={e.name}
          >
            {e.character}
          </button>
        ))}
      </div>

      {copied && (
        <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-accent-ed text-[var(--paper)] text-sm font-medium z-50 mono">
          Copied {copied}
        </div>
      )}
    </>
  );
}
