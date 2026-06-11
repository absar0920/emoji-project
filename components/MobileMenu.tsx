"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { label: "Trending", href: "/trending" },
  { label: "Compare", href: "/tools/emoji-vs" },
  { label: "Blog", href: "/blog" },
];

const CATEGORY_LINKS = [
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

const TOOL_LINKS = [
  { icon: "🍳", name: "Emoji Kitchen", href: "/tools/emoji-kitchen" },
  { icon: "🔍", name: "Smart Search", href: "/tools/smart-search" },
  { icon: "✨", name: "Emoji Maker", href: "/tools/emoji-maker" },
  { icon: "📝", name: "Text to Emoji", href: "/tools/text-to-emoji" },
  { icon: "🎯", name: "Vibe Search", href: "/tools/vibe-search" },
  { icon: "💬", name: "Caption Generator", href: "/tools/caption-generator" },
  { icon: "(•‿•)", name: "Kaomoji", href: "/tools/kaomoji" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-[var(--paper)]">
      <div className="flex items-center justify-between px-5 h-16 border-b-[1.5px] border-[var(--rule)]">
        <span className="fg-label">Menu</span>
        <button onClick={onClose} className="fg-iconbtn w-9 h-9" aria-label="Close menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-64px)] px-5 py-6 space-y-8">
        <div className="fg-list border-t-0">
          {MENU_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose} className="fg-link block font-read text-lg py-2.5 border-b border-[var(--line)]">
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h3 className="fg-label mb-3">Emojis</h3>
          <div>
            {CATEGORY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={onClose} className="fg-menuitem flex items-center gap-2.5 py-2 font-read">
                <span aria-hidden="true">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="fg-label mb-3">Tools</h3>
          <div>
            {TOOL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={onClose} className="fg-menuitem flex items-center gap-2.5 py-2 font-read">
                <span aria-hidden="true">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
