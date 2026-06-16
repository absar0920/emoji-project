import Link from "next/link";
import { KSection } from "@/components/kitchen/Section";

const TYPES = [
  { dt: "PFP maker & avatar builder", dd: "Creates profile-picture emoji — square images, typically 512 × 512 px, styled as an emoji face or character that represents you across platforms. Angel PFPs use soft tones, halos, wings, and pastel backgrounds; baddie designs go darker with sharp expressions and bold accessories. Both build identically: choose a base, layer accessories, set a background, export square at high resolution." },
  { dt: "Cat maker & animal builder", dd: "For users who want animal-based emoji rather than human faces. A full-body cat maker produces a complete character with customizable fur color, eye shape, expression, accessories, and pose — especially popular for Twitch emotes and gaming or pet Discord servers." },
  { dt: "Flag maker", dd: "Design custom flag emoji for territories, organizations, or communities with no standard Unicode representation. Common in Discord servers for regional communities, esports orgs, and groups the official library doesn't yet include." },
  { dt: "Letter maker & font generator", dd: "A letter maker converts individual characters into decorative emoji-style symbols; a font generator applies one consistent style across a whole alphabet so you can write in a custom emoji font. Popular for stylized display names, bios, and Discord nicknames." },
  { dt: "Personal maker & self creator", dd: "For emoji that represent you specifically. The workflow begins with a photo upload or manual feature-matching to your own face and style — a personalized set without the platform lock-in of Apple Memoji or Bitmoji." },
  { dt: "Sticker maker", dd: "Produces larger-format images for stickers in WhatsApp, Telegram, and Instagram Stories rather than small inline chat emoji. WhatsApp requires WebP under 100 KB at 512 × 512 px; Telegram accepts WebP and PNG under 512 KB. A good tool converts and validates automatically before download." },
  { dt: "Random generator & emoji mixer", dd: "A random generator produces unexpected combinations from randomized inputs for inspiration and shareable content. An emoji mixer (emojimix) blends two existing Unicode emoji into a hybrid — Google's Emoji Kitchen is the best-known implementation — and doubles as a lesson in which features stay readable at small sizes." },
];

export default function MakerTypes() {
  return (
    <KSection
      kicker="Section 04"
      title="Emoji Maker Types: Which Builder Fits Your Goal"
      dek="Understanding each type prevents you from forcing the wrong workflow onto the right idea."
    >
      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {TYPES.map((t) => (
          <div key={t.dt}><dt>{t.dt}</dt><dd>{t.dd}</dd></div>
        ))}
      </dl>

      <p className="t-body font-read max-w-2xl">
        Want to try the mixer approach now? Blend two emoji in the{" "}
        <Link href="/tools/emoji-kitchen" className="fg-link">Emoji Kitchen</Link> tool, or generate
        from a prompt with the <Link href="/tools/text-to-emoji" className="fg-link">Text to Emoji</Link> tool.
      </p>
    </KSection>
  );
}
