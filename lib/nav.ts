// Single source of truth for primary navigation — consumed by the Sidebar (desktop rail
// + mobile drawer) and the Navbar. Keep this in sync with the routes under app/.

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "tools",
    label: "Tools",
    items: [
      { icon: "🍳", label: "Emoji Kitchen", href: "/tools/emoji-kitchen" },
      { icon: "🔍", label: "Smart Search", href: "/tools/smart-search" },
      { icon: "✨", label: "Emoji Maker", href: "/tools/emoji-maker" },
      { icon: "📝", label: "Text to Emoji", href: "/tools/text-to-emoji" },
      { icon: "🎯", label: "Vibe Search", href: "/tools/vibe-search" },
      { icon: "💬", label: "Caption Generator", href: "/tools/caption-generator" },
      { icon: "⌨️", label: "Emoji Keyboard", href: "/tools/emoji-keyboard" },
      { icon: "(•‿•)", label: "Kaomoji", href: "/tools/kaomoji" },
      { icon: "🏷️", label: "Shortcodes", href: "/tools/emoji-shortcodes" },
      { icon: "⚔️", label: "Emoji Compare", href: "/tools/emoji-vs" },
      { icon: "🎨", label: "Emoji Combos", href: "/tools/emoji-combos" },
      { icon: "🔥", label: "Trend Tracker", href: "/tools/emoji-trends" },
    ],
  },
  {
    id: "categories",
    label: "Emoji Categories",
    items: [
      { icon: "😀", label: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
      { icon: "👥", label: "People & Body", href: "/search?category=People+%26+Body" },
      { icon: "🐱", label: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
      { icon: "🍕", label: "Food & Drink", href: "/search?category=Food+%26+Drink" },
      { icon: "✈️", label: "Travel & Places", href: "/search?category=Travel+%26+Places" },
      { icon: "⚽", label: "Activities", href: "/search?category=Activities" },
      { icon: "💡", label: "Objects", href: "/search?category=Objects" },
      { icon: "❤️", label: "Symbols", href: "/search?category=Symbols" },
      { icon: "🏁", label: "Flags", href: "/search?category=Flags" },
    ],
  },
  {
    id: "browse",
    label: "Browse",
    items: [
      { icon: "🔥", label: "Trending", href: "/trending" },
      { icon: "📰", label: "Blog", href: "/blog" },
    ],
  },
];
