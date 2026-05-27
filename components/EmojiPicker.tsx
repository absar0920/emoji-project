"use client";

import { useState, useEffect } from "react";
import { EmojiSearchItem } from "@/types/emoji";
import { Skeleton } from "@/components/Skeleton";

interface EmojiPickerProps {
  onSelect: (emoji: { character: string; slug: string; name: string }) => void;
  selected?: string;
}

export default function EmojiPicker({ onSelect, selected }: EmojiPickerProps) {
  const [emojis, setEmojis] = useState<EmojiSearchItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/search-index")
      .then((res) => res.json())
      .then((data: EmojiSearchItem[]) => {
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
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-neutral-200 dark:border-slate-700 p-3 w-full max-w-xs">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search emoji..."
        className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-slate-700 text-sm mb-2 outline-none focus:ring-2 focus:ring-primary/30 dark:bg-slate-700 dark:text-slate-100"
      />
      {loading ? (
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} w="32px" h="32px" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-1 max-h-48 overflow-y-auto">
          {filtered.map((e) => (
            <button
              key={e.slug}
              onClick={() => onSelect({ character: e.character, slug: e.slug, name: e.name })}
              className={`text-2xl p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-700 transition-colors ${
                selected === e.character ? "bg-primary-light dark:bg-indigo-900/30 ring-2 ring-primary" : ""
              }`}
              title={e.name}
            >
              {e.character}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-6 text-center text-neutral-400 dark:text-slate-500 py-4 text-sm">No emojis found</div>
          )}
        </div>
      )}
    </div>
  );
}
