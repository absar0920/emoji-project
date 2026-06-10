"use client";

import { useState } from "react";

const PLATFORM_ICONS: Record<string, string> = {
  tiktok: "🎵", whatsapp: "💬", instagram: "📸", x: "𝕏", facebook: "👤",
  snapchat: "👻", telegram: "✈️", discord: "🎮", pinterest: "📌", reddit: "🤖",
  linkedin: "💼", bereal: "📷", threads: "🧵", twitch: "🎬", spotify: "🎧",
};

interface PlatformAccordionProps {
  platforms: Array<{ key: string; data: Record<string, string | string[] | number> }>;
}

export default function PlatformAccordion({ platforms }: PlatformAccordionProps) {
  const [open, setOpen] = useState<string | null>(platforms[0]?.key ?? null);
  if (platforms.length === 0) return null;
  const current = platforms.find((p) => p.key === open);

  return (
    <div>
      <div className="fg-tabs mb-7 overflow-x-auto scrollbar-hide">
        {platforms.map((p) => (
          <button key={p.key} onClick={() => setOpen(p.key)} data-active={open === p.key} className="fg-tab">
            <span aria-hidden="true">{PLATFORM_ICONS[p.key] || "📱"}</span>
            <span className="capitalize">{p.key}</span>
          </button>
        ))}
      </div>

      {current && (
        <dl className="fg-deflist border-t border-[var(--line)]">
          {Object.entries(current.data).map(([key, value]) => {
            if (Array.isArray(value)) {
              return (
                <div key={key}>
                  <dt>{key.replace(/_/g, " ")}</dt>
                  <dd>
                    <span className="flex flex-wrap gap-x-3 gap-y-1 mono text-[0.7rem] uppercase tracking-wider t-accent">
                      {value.map((tag) => <span key={tag}>{tag}</span>)}
                    </span>
                  </dd>
                </div>
              );
            }
            if (typeof value === "number") {
              return (
                <div key={key}>
                  <dt>{key.replace(/_/g, " ")}</dt>
                  <dd className="mono"><b className="t-accent text-base">{value}</b> <span className="t-muted">/ 100</span></dd>
                </div>
              );
            }
            return (
              <div key={key}>
                <dt>{key.replace(/_/g, " ")}</dt>
                <dd>{String(value)}</dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}
