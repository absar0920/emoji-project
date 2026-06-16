"use client";

import { useState, useEffect } from "react";
import { EmojiSearchItemLite } from "@/types/emoji";
import { Skeleton } from "@/components/Skeleton";

interface EmojiPickerProps {
  onSelect: (emoji: { character: string; slug: string; name: string }) => void;
  selected?: string;
}

export default function EmojiPicker({ onSelect, selected }: EmojiPickerProps) {
  const [emojis, setEmojis] = useState<EmojiSearchItemLite[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/search-index/lite")
      .then((res) => res.json())
      .then((data: EmojiSearchItemLite[]) => {
        setEmojis(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = search
    ? emojis.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
          e.character === search
      )
    : emojis.slice(0, 60);

  return (
    <div className="fg-card p-3 w-full max-w-xs">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search emoji…"
        className="fg-field w-full px-3 py-2 text-sm mb-2"
      />
      {loading ? (
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} w="32px" h="32px" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-1 max-h-48 overflow-y-auto scrollbar-hide">
          {filtered.map((e) => (
            <button
              key={e.slug}
              onClick={() => onSelect({ character: e.character, slug: e.slug, name: e.name })}
              className="text-2xl p-1 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors hover:bg-[var(--paper-2)]"
              style={selected === e.character ? { boxShadow: "inset 0 0 0 2px var(--accent)" } : undefined}
              title={e.name}
            >
              {e.character}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-6 text-center t-muted py-4 text-sm mono">No emojis found</div>
          )}
        </div>
      )}
    </div>
  );
}
