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
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-white">
      <div className="flex items-center justify-between px-4 h-16 border-b border-neutral-200">
        <span className="text-lg font-bold text-primary-dark">Menu</span>
        <button onClick={onClose} className="p-2 text-neutral-500 hover:text-neutral-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-64px)] p-4 space-y-6">
        {/* Direct links */}
        <div className="space-y-1">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-3 py-2.5 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">Emojis</h3>
          <div className="space-y-0.5">
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 rounded-lg hover:bg-neutral-50"
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">Tools</h3>
          <div className="space-y-0.5">
            {TOOL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-600 rounded-lg hover:bg-neutral-50"
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
