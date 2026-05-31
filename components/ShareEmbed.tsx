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
    { key: "html", label: "Embed using HTML:", value: `<a href="${url}">${label}</a>` },
    { key: "markdown", label: "Embed using Markdown:", value: `[${label}](${url})` },
    { key: "url", label: "Plain URL:", value: url },
  ];

  async function handleCopy(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-primary-dark dark:text-white mb-4">Share & Embed</h2>
      <div className="space-y-4">
        {snippets.map((s) => (
          <div key={s.key}>
            <label className="text-sm font-medium text-neutral-600 dark:text-slate-300 block mb-1.5">
              {s.label}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={s.value}
                className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm font-mono bg-neutral-100 dark:bg-slate-700 text-neutral-700 dark:text-slate-300 border border-neutral-200 dark:border-slate-600 outline-none"
              />
              <button
                onClick={() => handleCopy(s.key, s.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-colors ${
                  copied === s.key
                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                    : "bg-neutral-200 dark:bg-slate-600 text-neutral-700 dark:text-slate-300 hover:bg-neutral-300 dark:hover:bg-slate-500"
                }`}
              >
                {copied === s.key ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
