"use client";

import { useState } from "react";

interface ShareEmbedProps {
  slug: string;
  character: string;
  name: string;
}

export default function ShareEmbed({ slug, character, name }: ShareEmbedProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";
  const url = `${siteUrl}/emoji/${slug}`;
  const label = `${character} ${name} Emoji Meaning`;

  const snippets = [
    { key: "html", label: "Embed — HTML", value: `<a href="${url}">${label}</a>` },
    { key: "markdown", label: "Embed — Markdown", value: `[${label}](${url})` },
    { key: "url", label: "Plain URL", value: url },
  ];

  async function handleCopy(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-5">
      {snippets.map((s) => (
        <div key={s.key}>
          <label className="fg-label block mb-2">{s.label}</label>
          <div className="flex gap-2">
            <input type="text" readOnly value={s.value} className="fg-input flex-1 min-w-0 px-3 py-2" />
            <button
              onClick={() => handleCopy(s.key, s.value)}
              className="mono text-[0.66rem] uppercase tracking-[0.14em] px-4 py-2 border shrink-0 transition-colors"
              style={
                copied === s.key
                  ? { borderColor: "var(--accent)", color: "var(--accent)" }
                  : { borderColor: "var(--line)", color: "var(--ink-2)" }
              }
            >
              {copied === s.key ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
