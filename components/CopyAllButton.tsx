"use client";

import { useState } from "react";

interface CopyAllButtonProps {
  emojis: string[];
  className?: string;
}

export default function CopyAllButton({ emojis, className = "" }: CopyAllButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(emojis.join(""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`fg-btn-ghost mono text-[0.66rem] uppercase tracking-[0.14em] px-4 py-2 ${className}`}
      style={copied ? { color: "var(--accent)", borderColor: "var(--accent)" } : undefined}
    >
      {copied ? "Copied ✓" : "Copy all"}
    </button>
  );
}
