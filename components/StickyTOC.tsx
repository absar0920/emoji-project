"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "meanings", label: "Meanings" },
  { id: "platforms", label: "Platforms" },
  { id: "cultures", label: "Cultures" },
  { id: "timeline", label: "Timeline" },
  { id: "related", label: "Related" },
  { id: "faq", label: "FAQ" },
];

export default function StickyTOC() {
  const [active, setActive] = useState("meanings");

  useEffect(() => {
    function onScroll() {
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(section.id);
            break;
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <nav className="sticky top-16 z-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-neutral-200 dark:border-slate-700 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-lg">
      <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              active === section.id
                ? "bg-primary text-white"
                : "text-neutral-500 dark:text-slate-400 hover:text-neutral-800 dark:hover:text-slate-100 hover:bg-neutral-100 dark:hover:bg-slate-700"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
