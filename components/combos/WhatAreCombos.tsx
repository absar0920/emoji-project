import { KSection } from "@/components/kitchen/Section";

const TOP = [
  "Emoji combos are sequences of two or more emojis used together to communicate a specific mood, message, aesthetic, or reaction. Unlike single emojis, which carry one basic meaning, emoji combos build layered meaning through combination — the same way words create sentences. A 🌙 alone means night. Add ✨🫧 and it becomes dreamy, ethereal, soft.",
  "They have become the native vocabulary of digital communication in 2026. You see them in Instagram bios, TikTok captions, Discord server names, Snapchat stories, Twitter replies, and text messages — used to express personality, signal aesthetic, mark community membership, and say in three characters what would otherwise take a whole sentence.",
];

const MID = [
  "The popularity of emoji combos tracks directly with how platforms reward visual identity. Instagram's algorithm responds to engagement, and posts with carefully chosen combos consistently outperform those without. TikTok's culture of aesthetic self-presentation has made combos an essential tool for anyone curating a recognizable presence. Discord servers use themed combos in channel names, status messages, and server branding.",
  "There are also practical reasons. A combo in a bio communicates your vibe before anyone reads a single word. A well-chosen combo in a caption guides the emotional read of an image. A funny combo in a group chat changes the energy of a conversation instantly. These are not decorative choices — they are communicative ones.",
  "With over 3,950 Unicode emojis available as of 2026 — including 163 new additions from Emoji 17.0 released in September 2025 — the combinatorial space is nearly infinite. But not all combos land equally. This guide gives you the ones that actually work.",
];

export default function WhatAreCombos() {
  return (
    <KSection
      kicker="Section 01"
      title="What Are Emoji Combos and Why Everyone Uses Them"
      dek="The native vocabulary of digital communication — layered meaning, built from sequence."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {TOP.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="fg-pull fg-pull--sm mb-8">
        <p>The closest thing to a visual accent is an emoji combination — it conveys not just what someone is saying but also how they wish to be interpreted.</p>
      </div>

      <div className="fg-prose max-w-2xl">
        {MID.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </KSection>
  );
}
