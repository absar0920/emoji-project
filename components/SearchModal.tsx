"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { createSearchIndex, searchEmojis } from "@/lib/search";
import { EmojiSearchItem } from "@/types/emoji";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EmojiSearchItem[]>([]);
  const [fuse, setFuse] = useState<Fuse<EmojiSearchItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && !fuse) {
      setLoading(true);
      fetch("/api/search-index")
        .then((res) => res.json())
        .then((data: EmojiSearchItem[]) => {
          setFuse(createSearchIndex(data));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen, fuse]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (fuse && query) {
      setResults(searchEmojis(fuse, query));
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  const handleSelect = useCallback((slug: string) => {
    router.push(`/emoji/${slug}`);
    onClose();
  }, [router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200">
          <span className="text-xl text-neutral-400">🔍</span>
          <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search any emoji or feeling..." className="flex-1 text-lg outline-none placeholder:text-neutral-400" />
          <kbd className="px-2 py-1 rounded bg-neutral-100 text-xs text-neutral-500 font-mono">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {loading && <div className="p-6 text-center text-neutral-400">Loading search index...</div>}
          {!loading && query && results.length === 0 && <div className="p-6 text-center text-neutral-400">No emojis found for &quot;{query}&quot;</div>}
          {results.map((item) => (
            <button key={item.slug} onClick={() => handleSelect(item.slug)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-left">
              <span className="text-3xl">{item.character}</span>
              <div>
                <div className="font-medium text-neutral-900">{item.name}</div>
                <div className="text-xs text-neutral-500">{item.category} · {item.shortcode}</div>
              </div>
            </button>
          ))}
          {!loading && !query && <div className="p-4 text-sm text-neutral-400 text-center">Type to search emojis by name, feeling, or shortcode</div>}
        </div>
      </div>
    </div>
  );
}
