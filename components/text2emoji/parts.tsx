"use client";

import { useState } from "react";

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="fg-kbd">{children}</kbd>;
}

// Ruled 4-up data strip: big Didone figure + mono caption, hairline-divided.
export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border border-[var(--line)] my-9">
      {stats.map((s, i) => (
        <div
          key={s.value}
          className={`px-4 py-5 border-[var(--line)] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""} ${i > 0 ? "sm:border-l" : ""}`}
        >
          <div className="font-display t-ink leading-none text-[1.8rem] sm:text-[2.1rem] tracking-[-0.01em]">{s.value}</div>
          <div className="fg-label mt-2 leading-snug">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// Hairline-bordered code block (matches the .fg-article pre treatment) with a
// mono language label and a copy-to-clipboard button.
export function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="border border-[var(--line)] bg-[var(--paper-2)] my-6">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--line)]">
        <span className="fg-label">{lang}</span>
        <button
          onClick={handleCopy}
          className="mono text-[0.6rem] uppercase tracking-[0.16em] t-accent hover:opacity-70 transition-opacity"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[0.82rem] leading-relaxed">
        <code className="mono t-ink whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
