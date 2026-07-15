// Single source of truth for the project's social profiles. Consumed by:
//   - components/SocialLinks.tsx  (visible icon row in Footer + About)
//   - app/layout.tsx              (Organization JSON-LD `sameAs` array)
// so the visible links and the SEO schema can never drift.
export interface SocialLink {
  /** Brand name; also the key into the icon map in SocialLinks.tsx. */
  name: string;
  /** Accessible label announced by screen readers. */
  label: string;
  url: string;
}

// Order is intentional (rough recognizability): GitHub, Medium, Quora,
// Pinterest, Bluesky.
export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", label: "Emoji Meaning on GitHub", url: "https://github.com/EmojisMeaning" },
  { name: "Medium", label: "Emoji Meaning on Medium", url: "https://medium.com/@emojismeaning" },
  { name: "Quora", label: "Emoji Meaning on Quora", url: "https://www.quora.com/profile/Emojis-Meaning-1" },
  { name: "Pinterest", label: "Emoji Meaning on Pinterest", url: "https://www.pinterest.com/emojismeaning/" },
  { name: "Bluesky", label: "Emoji Meaning on Bluesky", url: "https://bsky.app/profile/emojismeaning.bsky.social" },
];
