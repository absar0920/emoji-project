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
    { name: "Shortcodes", href: "/tools/emoji-shortcodes" },
    { name: "Emoji Compare", href: "/tools/emoji-vs" },
    { name: "Emoji Combos", href: "/tools/emoji-combos" },
    { name: "Emoji Maker", href: "/tools/emoji-maker" },
    { name: "Smart Search", href: "/tools/smart-search" },
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

export default function Footer() {
  return (
    <>
    <div className="h-0.5 bg-gradient-to-r from-primary to-accent-violet" />
    <footer className="bg-neutral-900 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧠</span>
              <span className="text-lg font-bold text-white">Emoji Intelligence</span>
            </div>
            <p className="text-sm">
              The world&apos;s most comprehensive emoji meaning platform. Gen-Z slang, platform context, and cultural intelligence.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Emojis</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.popular.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-300 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-300 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary-300 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-300 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Emoji Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
}
