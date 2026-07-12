"use client";

/* eslint-disable react-hooks/set-state-in-effect -- intentional state syncs on modal open/close + query change */
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
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

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
        .then((res) => {
          // 429 (rate limited) / 503 (at capacity) → fall back to fuzzy search,
          // same as a network error, instead of showing an empty AI panel.
          if (!res.ok) throw new Error("smart-search unavailable");
          return res.json();
        })
        .then((data) => {
          setSmartResults(data.results || []);
          setSmartLoading(false);
        })
        .catch(() => {
          // Fallback to fuzzy search on error/timeout/rate-limit
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
    <div className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm flex items-start justify-center pt-[14vh] px-4" onClick={onClose}>
      <div
        className="theme-editorial w-full max-w-xl bg-[var(--paper)] border border-[var(--line)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-[var(--rule)]">
          <svg className="w-5 h-5 shrink-0 text-[var(--ink-3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any emoji or feeling…"
            className="flex-1 min-w-0 text-lg outline-none bg-transparent font-read t-ink placeholder:text-[var(--ink-3)]"
          />
          <kbd className="mono text-[0.62rem] tracking-widest text-[var(--ink-3)] border border-[var(--line)] px-1.5 py-0.5">ESC</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-5 py-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton w="32px" h="32px" />
                  <div className="flex-1">
                    <Skeleton w="70%" h="13px" className="mb-1.5" />
                    <Skeleton w="50%" h="11px" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {smartLoading && (
            <div className="p-6 text-center">
              <span className="fg-kicker block mb-3">Thinking</span>
              <div className="flex justify-center gap-1.5">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--accent)", animationDelay: `${d}ms` }} />
                ))}
              </div>
              <span className="mono text-[0.66rem] uppercase tracking-[0.14em] t-muted block mt-3">Finding the perfect emojis…</span>
            </div>
          )}

          {smartResults.length > 0 && (
            <>
              <div className="fg-kicker px-5 py-2 border-b border-[var(--line)] bg-[var(--paper-2)]">AI Results</div>
              <StaggerContainer>
                {smartResults.map((item) => (
                  <StaggerItem key={item.slug}>
                    <button onClick={() => handleSelect(item.slug)} className="w-full flex items-center gap-3.5 px-5 py-3 text-left border-b border-[var(--line-2)] transition-colors hover:bg-[var(--paper-2)]">
                      <span className="text-3xl shrink-0">{item.character}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-read t-ink">{item.name}</div>
                        <div className="text-xs t-muted line-clamp-1">{item.relevant_meaning}</div>
                        {item.why && <div className="fg-kicker mt-0.5">{item.why}</div>}
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          )}

          {!loading && query && results.length === 0 && smartResults.length === 0 && !smartLoading && (
            <div className="p-6 text-center mono text-[0.72rem] uppercase tracking-[0.14em] t-muted">No emojis found for &ldquo;{query}&rdquo;</div>
          )}

          <StaggerContainer>
            {results.map((item) => (
              <StaggerItem key={item.slug}>
                <button onClick={() => handleSelect(item.slug)} className="w-full flex items-center gap-3.5 px-5 py-3 text-left border-b border-[var(--line-2)] transition-colors hover:bg-[var(--paper-2)]">
                  <span className="text-3xl shrink-0">{item.character}</span>
                  <div className="min-w-0">
                    <div className="font-read t-ink">{item.name}</div>
                    <div className="fg-label normal-case mt-0.5" style={{ textTransform: "none" }}>{item.category} · {item.shortcode}</div>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {!loading && !query && (
            <div className="p-6 text-center mono text-[0.72rem] uppercase tracking-[0.14em] t-muted">Search emojis by name, feeling, or shortcode</div>
          )}
        </div>
      </div>
    </div>
  );
}
