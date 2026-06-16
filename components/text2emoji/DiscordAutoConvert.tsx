import Link from "next/link";
import { KSection } from "@/components/kitchen/Section";

const INTRO = [
  "Discord text-to-emoji conversion is one of its most distinctive features. When you type a shortcode like :fire: and press send, Discord automatically renders 🔥 in your message. The conversion happens at the moment of sending — not a keyboard trick but a Discord text-processing feature that maps shortcode strings to Unicode emoji or custom server emoji.",
  "Type “:” in any Discord text field and an autocomplete dropdown appears, showing matching emoji as you type — a real-time converter built into the interface. Custom server emoji get their own shortcodes and auto-convert the same way.",
];

const TURNOFF = [
  { dt: "💻 Desktop (Windows / Mac)", dd: "Click the ⚙️ Settings gear near your username → in the left sidebar scroll to Text & Images → find “Automatically convert emoticons in your messages to emoji” and toggle it OFF. Shortcodes like :smile: are now sent as plain text." },
  { dt: "📱 Mobile — Android", dd: "Tap your profile icon (bottom-right) → Settings → Text & Images → toggle off “Convert Emoticons.”" },
  { dt: "📱 Mobile — iPhone / iOS", dd: "Tap your profile image (lower-right) → Settings → Text & Images → turn off “Automatically convert emoticons.”" },
  { dt: "Google Chat", dd: "Click Settings (⚙️) top-right → find “Automatically format text as emoji” (or similar) under message settings → disable it. Google Chat then sends emoticons like :) as plain text." },
];

export default function DiscordAutoConvert() {
  return (
    <KSection
      kicker="Section 07"
      title="Text to Emoji on Discord: Auto-Convert Settings"
      dek="How Discord's built-in shortcode conversion works — and how to turn it off."
    >
      <div className="fg-prose max-w-2xl mb-9">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <p className="fg-label mb-3">How to turn it off</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {TURNOFF.map((t) => (
          <div key={t.dt}><dt>{t.dt}</dt><dd>{t.dd}</dd></div>
        ))}
      </dl>

      <div className="fg-prose max-w-2xl mb-8">
        <p><strong>Emoji in channel names:</strong> copy any emoji (🎮 🎵 📢) from your picker and paste it at the start of a channel name when creating or editing it. Discord renders emoji in channel names on desktop, though some mobile clients may show character codes if the font lacks that glyph.</p>
      </div>

      <div className="fg-pull fg-pull--sm mb-8">
        <span className="fg-kicker">Heads Up</span>
        <p>Turning off auto-conversion affects your outgoing messages only — you’ll still see emoji in messages from others who have it enabled, and custom server :shortcode: emoji will still appear.</p>
      </div>

      <p className="t-body font-read max-w-2xl">
        Discord also has a full keyboard guide of its own — see the{" "}
        <Link href="/tools/emoji-keyboard" className="fg-link">Emoji Keyboard guide</Link> for the
        colon-trigger shortcut and every other platform.
      </p>
    </KSection>
  );
}
