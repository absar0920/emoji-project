import Link from "next/link";

const footerLinks = {
  popular: [
    { name: "💀 Skull", href: "/emoji/skull" },
    { name: "😭 Crying", href: "/emoji/loudly-crying-face" },
    { name: "🔥 Fire", href: "/emoji/fire" },
    { name: "❤️ Heart", href: "/emoji/red-heart" },
    { name: "😂 Joy", href: "/emoji/face-with-tears-of-joy" },
    { name: "💅 Nail Polish", href: "/emoji/nail-polish" },
  ],
  tools: [
    { name: "Emoji Kitchen", href: "/tools/emoji-kitchen" },
    { name: "Text to Emoji", href: "/tools/text-to-emoji" },
    { name: "Vibe Search", href: "/tools/vibe-search" },
    { name: "Caption Generator", href: "/tools/caption-generator" },
    { name: "Trending Emojis", href: "/tools/emoji-trends" },
    { name: "Emoji Keyboard", href: "/tools/emoji-keyboard" },
    { name: "Kaomoji", href: "/tools/kaomoji" },
    { name: "Emoji Compare", href: "/tools/emoji-vs" },
    { name: "Emoji Combos", href: "/tools/emoji-combos" },
  ],
  categories: [
    { name: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
    { name: "People & Body", href: "/search?category=People+%26+Body" },
    { name: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
    { name: "Food & Drink", href: "/search?category=Food+%26+Drink" },
    { name: "Travel & Places", href: "/search?category=Travel+%26+Places" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ],
};

function Column({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h3 className="fg-label mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="fg-link font-read text-[0.92rem]">{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="theme-editorial border-t-2 border-[var(--rule)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-lg" aria-hidden="true">🧠</span>
              <span className="font-display t-ink text-xl">Emoji Intelligence</span>
            </div>
            <p className="t-muted text-sm leading-relaxed max-w-xs">
              A complete field guide to what every emoji really means — Gen-Z slang, platform context, and cultural intelligence.
            </p>
          </div>
          <Column title="Popular Emojis" links={footerLinks.popular} />
          <Column title="Tools" links={footerLinks.tools} />
          <Column title="Categories" links={footerLinks.categories} />
          <Column title="Company" links={footerLinks.company} />
        </div>

        <div className="border-t border-[var(--line)] mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 fg-label">
          <span>© {new Date().getFullYear()} Emoji Intelligence</span>
          <span>Emoji Meanings — A Field Guide · Nº 2026</span>
        </div>
      </div>
    </footer>
  );
}
