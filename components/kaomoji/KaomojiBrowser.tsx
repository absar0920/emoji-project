"use client";

import { useState } from "react";
import { KAOMOJI_CATEGORIES, ALL_KAOMOJI } from "./data";

export default function KaomojiBrowser() {
  const [activeId, setActiveId] = useState(KAOMOJI_CATEGORIES[0].id);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(k: string) {
    navigator.clipboard.writeText(k);
    setCopied(k);
    setTimeout(() => setCopied(null), 1500);
  }

  const q = query.trim().toLowerCase();
  const active = KAOMOJI_CATEGORIES.find((c) => c.id === activeId)!;
  const rows = q
    ? ALL_KAOMOJI.filter(
        (e) =>
          e.k.toLowerCase().includes(q) ||
          e.meaning.toLowerCase().includes(q) ||
          (e.use?.toLowerCase().includes(q) ?? false) ||
          e.category.toLowerCase().includes(q)
      )
    : active.entries;

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search kaomoji by feeling, meaning, or category…"
        className="fg-field w-full px-4 py-3 mb-5"
      />

      {!q && (
        <div className="fg-tabs mb-5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {KAOMOJI_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              data-active={c.id === activeId}
              aria-pressed={c.id === activeId}
              className="fg-tab whitespace-nowrap"
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {!q && <p className="t-muted font-read mb-5 max-w-2xl leading-relaxed">{active.intro}</p>}

      {q && (
        <p className="fg-label mb-4">
          {rows.length} {rows.length === 1 ? "result" : "results"} for &ldquo;{query.trim()}&rdquo;
        </p>
      )}

      <div className="border-t-2 border-[var(--rule)]">
        {rows.map((e, i) => (
          <button
            key={`${e.k}-${i}`}
            onClick={() => handleCopy(e.k)}
            title="Click to copy"
            className="group w-full text-left grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr_auto] gap-x-6 gap-y-1 items-baseline py-3.5 border-b border-[var(--line)] transition-colors hover:bg-[var(--paper-2)]"
          >
            <span
              className="mono text-base sm:text-lg t-ink break-words leading-snug"
              style={copied === e.k ? { color: "var(--accent)" } : undefined}
            >
              {e.k}
            </span>
            <span className="min-w-0">
              <span className="font-read t-ink block">{e.meaning}</span>
              {e.use && (
                <span className="fg-label block mt-0.5" style={{ textTransform: "none" }}>
                  {e.use}
                </span>
              )}
            </span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.16em] shrink-0 self-center hidden sm:block t-accent opacity-0 group-hover:opacity-100 transition-opacity">
              {copied === e.k ? "Copied ✓" : "Copy"}
            </span>
          </button>
        ))}

        {rows.length === 0 && (
          <div className="py-10 text-center mono text-[0.72rem] uppercase tracking-[0.14em] t-muted">
            No kaomoji found for &ldquo;{query.trim()}&rdquo;
          </div>
        )}
      </div>

      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-accent-ed text-[var(--paper)] text-sm font-medium z-50 mono"
        >
          Copied {copied}
        </div>
      )}
    </div>
  );
}
