"use client";

import { useState } from "react";
import { COMBO_CATEGORIES, ALL_COMBOS } from "./data";

export default function CombosBrowser() {
  const [activeId, setActiveId] = useState(COMBO_CATEGORIES[0].id);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(combo: string) {
    navigator.clipboard.writeText(combo);
    setCopied(combo);
    setTimeout(() => setCopied(null), 1500);
  }

  const q = query.trim().toLowerCase();
  const active = COMBO_CATEGORIES.find((c) => c.id === activeId)!;
  const rows = q
    ? ALL_COMBOS.filter(
        (e) =>
          e.combo.includes(query.trim()) ||
          e.vibe.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
    : active.entries;

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search combos by vibe, category, or emoji…"
        className="fg-field w-full px-4 py-3 mb-5"
      />

      {!q && (
        <div className="fg-tabs mb-5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {COMBO_CATEGORIES.map((c) => (
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

      {!q && active.intro && (
        <p className="t-muted font-read mb-5 max-w-2xl leading-relaxed">{active.intro}</p>
      )}

      {q && (
        <p className="fg-label mb-4">
          {rows.length} {rows.length === 1 ? "result" : "results"} for &ldquo;{query.trim()}&rdquo;
        </p>
      )}

      <div className="border-t-2 border-[var(--rule)]">
        {rows.map((e, i) => (
          <button
            key={`${e.combo}-${i}`}
            onClick={() => handleCopy(e.combo)}
            title="Click to copy"
            className="group w-full text-left grid grid-cols-1 sm:grid-cols-[minmax(0,9rem)_1fr_auto] gap-x-6 gap-y-1 items-center py-3.5 border-b border-[var(--line)] transition-colors hover:bg-[var(--paper-2)]"
          >
            <span
              className="text-2xl leading-snug"
              style={copied === e.combo ? { filter: "none" } : undefined}
            >
              {e.combo}
            </span>
            <span className="font-read t-body min-w-0">{e.vibe}</span>
            <span className="mono text-[0.6rem] uppercase tracking-[0.16em] shrink-0 self-center hidden sm:block t-accent opacity-0 group-hover:opacity-100 transition-opacity">
              {copied === e.combo ? "Copied ✓" : "Copy"}
            </span>
          </button>
        ))}

        {rows.length === 0 && (
          <div className="py-10 text-center mono text-[0.72rem] uppercase tracking-[0.14em] t-muted">
            No combos found for &ldquo;{query.trim()}&rdquo;
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
