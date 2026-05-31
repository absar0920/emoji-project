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
    <aside className="hidden lg:block w-52 shrink-0">
      <nav className="sticky top-20">
        <h3 className="text-xs font-bold text-neutral-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-2">
          Emoji Categories
        </h3>
        <ul className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-800 hover:text-primary-dark dark:hover:text-white transition-colors"
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
