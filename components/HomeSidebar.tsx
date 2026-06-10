import Link from "next/link";

// Canonical chapter index — ids must match the `id` passed to each section.
export const CHAPTERS = [
  { n: "01", id: "what-are", t: "What Meanings Are" },
  { n: "02", id: "quick-ref", t: "Quick Reference" },
  { n: "03", id: "origin", t: "Origin & History" },
  { n: "04", id: "categories", t: "Category Reference" },
  { n: "05", id: "most-used", t: "Most Used Globally" },
  { n: "06", id: "faces", t: "Face Emojis" },
  { n: "07", id: "deep-dives", t: "Deep Dives" },
  { n: "08", id: "hearts", t: "Heart Emojis" },
  { n: "09", id: "hands", t: "Hand Emojis" },
  { n: "10", id: "texting", t: "In Texting" },
  { n: "11", id: "flirting", t: "Flirting" },
  { n: "12", id: "platforms", t: "By Platform" },
  { n: "13", id: "combos", t: "Combinations" },
  { n: "14", id: "slang", t: "Internet Slang" },
  { n: "15", id: "symbols", t: "Symbols" },
  { n: "16", id: "culture", t: "Across Cultures" },
  { n: "17", id: "misread", t: "Most Misunderstood" },
  { n: "18", id: "rendering", t: "Platform Rendering" },
  { n: "19", id: "work", t: "At Work" },
  { n: "20", id: "new-2026", t: "New in 2026" },
  { n: "21", id: "how-to-find", t: "Finding Meanings" },
  { n: "22", id: "copy-paste", t: "Copy & Paste" },
  { n: "23", id: "faq", t: "FAQ" },
  { n: "24", id: "bottom-line", t: "The Bottom Line" },
];

export default function HomeSidebar() {
  return (
    <aside className="hidden lg:block w-52 shrink-0">
      <nav className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide">
        <p className="fg-label pb-2 mb-1 border-b-2 border-[var(--rule)]">Contents</p>
        <ol>
          {CHAPTERS.map((c) => (
            <li key={c.id} className="border-b border-[var(--line)]">
              <Link href={`#${c.id}`} className="fg-link flex items-baseline gap-2.5 py-2">
                <span className="mono text-[0.6rem] t-muted w-4 shrink-0">{c.n}</span>
                <span className="text-[0.92rem] leading-snug">{c.t}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
