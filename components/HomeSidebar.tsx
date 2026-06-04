import Link from "next/link";

const CATEGORIES = [
  { icon: "😀", name: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
  { icon: "👥", name: "People & Body", href: "/search?category=People+%26+Body" },
  { icon: "🐱", name: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
  { icon: "🍕", name: "Food & Drink", href: "/search?category=Food+%26+Drink" },
  { icon: "✈️", name: "Travel & Places", href: "/search?category=Travel+%26+Places" },
  { icon: "⚽", name: "Activities", href: "/search?category=Activities" },
  { icon: "💡", name: "Objects", href: "/search?category=Objects" },
  { icon: "❤️", name: "Symbols", href: "/search?category=Symbols" },
  { icon: "🏁", name: "Flags", href: "/search?category=Flags" },
];

export default function HomeSidebar() {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <nav className="sticky top-24">
        <h3 className="eyebrow mb-4 flex items-center gap-2">
          <span className="inline-block w-5 h-px bg-primary" aria-hidden="true" />
          Categories
        </h3>
        <ul className="divide-y divide-neutral-200/70 dark:divide-slate-700/60 border-y border-neutral-200/70 dark:border-slate-700/60">
          {CATEGORIES.map((cat, i) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className="group flex items-center gap-3 py-2.5 text-sm text-neutral-600 dark:text-slate-300 hover:text-primary transition-colors"
              >
                <span className="font-mono text-[10px] text-neutral-300 dark:text-slate-600 tabular-nums w-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base">{cat.icon}</span>
                <span className="font-medium group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
