"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({
  text,
  label,
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        copied
          ? "bg-accent-emerald text-white"
          : "bg-primary text-white hover:bg-primary-dark"
      } ${className}`}
    >
      {copied ? "Copied!" : label || `Copy ${text}`}
    </motion.button>
  );
}
