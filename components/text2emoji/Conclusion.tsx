import Link from "next/link";
import { KSection } from "@/components/kitchen/Section";

const TOOLS = [
  { label: "Emoji Keyboard", href: "/tools/emoji-keyboard" },
  { label: "Emoji Combos", href: "/tools/emoji-combos" },
  { label: "Emoji Kitchen", href: "/tools/emoji-kitchen" },
  { label: "Emoji Maker", href: "/tools/emoji-maker" },
];

const REFS = [
  { label: "Unicode Consortium — Full Emoji List, v17.0", href: "https://www.unicode.org/emoji/charts/full-emoji-list.html" },
  { label: "Emojipedia — Emoji Statistics and Usage Data", href: "https://emojipedia.org/stats" },
  { label: "Python Emoji Library (PyPI)", href: "https://pypi.org/project/emoji/" },
];

export default function Conclusion() {
  return (
    <KSection kicker="The Bottom Line" title="Explore More Emoji Tools &amp; Guides" dek="From combos and keyboard shortcuts to the full meaning guide — everything to master emoji in 2026.">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="fg-card fg-link p-4 text-center font-read text-sm t-ink">
            {t.label}
          </Link>
        ))}
      </div>

      <div className="pt-6 border-t border-[var(--line)]">
        <p className="fg-label mb-3">References &amp; Sources</p>
        <ul className="space-y-2">
          {REFS.map((r) => (
            <li key={r.href}>
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="fg-link">{r.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </KSection>
  );
}
