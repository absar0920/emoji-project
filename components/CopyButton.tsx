"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  /** "editorial" = Field Guide look (oxblood, mono, zero-radius). Use only inside .theme-editorial. */
  tone?: "default" | "editorial";
}

export default function CopyButton({ text, label, className = "", tone = "default" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (tone === "editorial") {
    return (
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.96 }}
        className={`mono inline-flex items-center gap-1.5 px-4 py-2 text-[0.66rem] uppercase tracking-[0.14em] transition-colors ${className}`}
        style={{ background: copied ? "var(--good)" : "var(--accent)", color: "var(--paper)" }}
      >
        {copied ? "Copied ✓" : label || `Copy ${text}`}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        copied ? "bg-accent-emerald text-white" : "bg-primary text-white hover:bg-primary-dark"
      } ${className}`}
    >
      {copied ? "Copied!" : label || `Copy ${text}`}
    </motion.button>
  );
}
