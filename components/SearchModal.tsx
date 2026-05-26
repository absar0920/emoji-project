"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { createSearchIndex, searchEmojis } from "@/lib/search";
import { EmojiSearchItem } from "@/types/emoji";
import { Skeleton } from "@/components/Skeleton";
import { StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

const SMART_KEYWORDS = [
  "meaning", "on tiktok", "for dating", "whatsapp", "instagram",
  "sarcastic", "meme", "tiktok", "twitter", "snapchat", "discord",
  "toxic", "flirt", "breakup", "culture", "pakistan", "middle east",
  "gen-z", "genz", "professional", "sentiment",
];

function isSmartQuery(q: string): boolean {
  const words = q.trim().split(/\s+/);
  if (words.length <= 2) return false;
  const lower = q.toLowerCase();
  return SMART_KEYWORDS.some((kw) => lower.includes(kw));
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EmojiSearchItem[]>([]);
  const [fuse, setFuse] = useState<Fuse<EmojiSearchItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [smartResults, setSmartResults] = useState<
    Array<{ character: string; slug: string; name: string; relevant_meaning: string; why: string }>
  >([]);
  const [smartLoading, setSmartLoading] = useState(false);
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
      setSmartResults([]);
      setSmartLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setSmartResults([]);
      return;
    }

    if (isSmartQuery(query)) {
      setSmartLoading(true);
      setResults([]);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      fetch("/api/tools/smart-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setSmartResults(data.results || []);
          setSmartLoading(false);
        })
        .catch(() => {
          // Fallback to fuzzy search on error/timeout
          if (fuse) setResults(searchEmojis(fuse, query));
          setSmartResults([]);
          setSmartLoading(false);
        })
        .finally(() => clearTimeout(timeout));

      return () => {
        controller.abort();
        clearTimeout(timeout);
      };
    } else {
      setSmartResults([]);
      if (fuse) setResults(searchEmojis(fuse, query));
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
          {loading && (
            <div className="px-5 py-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton w="32px" h="32px" />
                  <div className="flex-1">
                    <Skeleton w="70%" h="14px" className="mb-1.5" />
                    <Skeleton w="50%" h="12px" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {smartLoading && (
            <div className="p-4 text-center">
              <span className="text-lg">🤖</span>
              <div className="flex justify-center gap-1 my-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-xs text-neutral-400">Finding the perfect emojis...</span>
            </div>
          )}
          {smartResults.length > 0 && (
            <>
              <div className="px-5 py-2 text-xs font-medium text-primary bg-primary/5">
                AI Results
              </div>
              <StaggerContainer>
                {smartResults.map((item) => (
                  <StaggerItem key={item.slug}>
                    <button
                      onClick={() => handleSelect(item.slug)}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-left"
                    >
                      <span className="text-3xl">{item.character}</span>
                      <div className="flex-1">
                        <div className="font-medium text-neutral-900">{item.name}</div>
                        <div className="text-xs text-neutral-600 line-clamp-1">
                          {item.relevant_meaning}
                        </div>
                        <div className="text-xs text-primary">{item.why}</div>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          )}
          {!loading && query && results.length === 0 && smartResults.length === 0 && !smartLoading && <div className="p-6 text-center text-neutral-400">No emojis found for &quot;{query}&quot;</div>}
          <StaggerContainer>
            {results.map((item) => (
              <StaggerItem key={item.slug}>
                <button onClick={() => handleSelect(item.slug)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-left">
                  <span className="text-3xl">{item.character}</span>
                  <div>
                    <div className="font-medium text-neutral-900">{item.name}</div>
                    <div className="text-xs text-neutral-500">{item.category} · {item.shortcode}</div>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
          {!loading && !query && <div className="p-4 text-sm text-neutral-400 text-center">Type to search emojis by name, feeling, or shortcode</div>}
        </div>
      </div>
    </div>
  );
}
