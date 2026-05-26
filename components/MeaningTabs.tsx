"use client";

import { useState } from "react";

const TAB_COLORS: Record<string, { border: string; label: string }> = {
  genz: { border: "border-l-accent-violet", label: "text-accent-violet" },
  official: { border: "border-l-primary", label: "text-primary" },
  emotional: { border: "border-l-accent-emerald", label: "text-accent-emerald" },
  dating: { border: "border-l-accent-red", label: "text-accent-red" },
  meme: { border: "border-l-accent-amber", label: "text-accent-amber" },
  sarcastic: { border: "border-l-neutral-400", label: "text-neutral-500" },
};

interface MeaningLayer {
  key: string;
  label: string;
  content: Record<string, string | number | boolean>;
}

interface MeaningTabsProps {
  meanings: MeaningLayer[];
}

export default function MeaningTabs({ meanings }: MeaningTabsProps) {
  const [active, setActive] = useState(meanings[0]?.key || "genz");

  const activeMeaning = meanings.find((m) => m.key === active);
  const colors = TAB_COLORS[active] || TAB_COLORS.official;

  return (
    <section id="meanings" className="mb-10">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Meaning Layers</h2>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
        {meanings.map((m) => (
          <button
            key={m.key}
            onClick={() => setActive(m.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              active === m.key
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Active meaning card */}
      {activeMeaning && (
        <div
          className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${colors.border}`}
        >
          <h3 className={`text-sm font-bold mb-3 ${colors.label}`}>
            {activeMeaning.label} Meaning
          </h3>
          <div className="space-y-2">
            {Object.entries(activeMeaning.content).map(([key, value]) => {
              if (typeof value === "boolean") {
                return (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className={value ? "text-accent-red" : "text-accent-emerald"}>
                      {value ? "Yes" : "No"}
                    </span>
                  </div>
                );
              }
              if (typeof value === "number") {
                return (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-medium text-neutral-800">{value}/10</span>
                  </div>
                );
              }
              return (
                <p key={key} className="text-sm text-neutral-700">
                  {String(value)}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
