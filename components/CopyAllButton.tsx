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
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        copied ? "bg-accent-emerald text-white" : "bg-accent-emerald text-white hover:bg-emerald-700"
      } ${className}`}
    >
      {copied ? "Copied!" : `Copy All ${emojis.join("")}`}
    </button>
  );
}
