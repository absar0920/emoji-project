"use client";

import { useState } from "react";

const PLATFORM_ICONS: Record<string, string> = {
  tiktok: "🎵",
  whatsapp: "💬",
  instagram: "📸",
  x: "𝕏",
  facebook: "👤",
  snapchat: "👻",
  telegram: "✈️",
  discord: "🎮",
  pinterest: "📌",
  reddit: "🤖",
  linkedin: "💼",
  bereal: "📷",
  threads: "🧵",
  twitch: "🎬",
  spotify: "🎵",
};

interface PlatformAccordionProps {
  platforms: Array<{
    key: string;
    data: Record<string, string | string[] | number>;
  }>;
}

export default function PlatformAccordion({ platforms }: PlatformAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  if (platforms.length === 0) return null;

  return (
    <section id="platforms" className="mb-10">
      <h2 className="text-xl font-bold text-primary-dark dark:text-indigo-100 mb-4">Platform Meanings</h2>

      {/* Platform icon row */}
      <div className="flex gap-2 flex-wrap mb-4">
        {platforms.map((p) => (
          <button
            key={p.key}
            onClick={() => setOpen(open === p.key ? null : p.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              open === p.key
                ? "bg-primary text-white shadow-md dark:shadow-slate-900/30"
                : "bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-900/30 border border-neutral-100 dark:border-slate-700 text-neutral-600 dark:text-slate-300 hover:shadow-md"
            }`}
          >
            <span>{PLATFORM_ICONS[p.key] || "📱"}</span>
            <span className="capitalize">{p.key}</span>
          </button>
        ))}
      </div>

      {/* Expanded platform card */}
      {open && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/30 p-5 border border-neutral-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">
              {PLATFORM_ICONS[open] || "📱"}
            </span>
            <h3 className="font-bold text-neutral-900 dark:text-slate-100 capitalize">{open}</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(
              platforms.find((p) => p.key === open)?.data || {}
            ).map(([key, value]) => {
              if (Array.isArray(value)) {
                return (
                  <div key={key}>
                    <span className="text-xs text-neutral-500 dark:text-slate-400 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {value.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-primary-light dark:bg-indigo-900/30 text-primary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }
              if (typeof value === "number") {
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-neutral-500 dark:text-slate-400 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-medium text-accent-amber">
                      {value}/100
                    </span>
                  </div>
                );
              }
              return (
                <div key={key} className="text-sm">
                  <span className="text-neutral-500 dark:text-slate-400 capitalize block text-xs">
                    {key.replace(/_/g, " ")}
                  </span>
                  <p className="text-neutral-700 dark:text-slate-300">{String(value)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
