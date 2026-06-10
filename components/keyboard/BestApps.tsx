import { KSection } from "@/components/kitchen/Section";
import { QuickAnswer } from "./parts";

const INTRO = [
  "The best emoji keyboard apps for 2026 include Gboard (Google), SwiftKey (Microsoft), Facemoji, and Bitmoji, each extending the built-in keyboard in a different direction. Third-party apps typically bring larger libraries, smarter predictions trained on your usage, custom sticker packs, and features like Emoji Kitchen that combine emojis in ways the standard keyboard cannot.",
  "The honest answer for most users is that Gboard already does everything needed. But third-party keyboards are no longer competing primarily on emoji access — they compete on prediction quality, customization, and creative features. If you want a keyboard that learns your emoji habits and suggests the right ones before you think to look, SwiftKey's prediction model is genuinely impressive after a few weeks of use.",
];

const DETAILS = [
  { dt: "Gboard's hidden emoji features", dd: "Beyond basic access, Gboard includes Emoji Kitchen — place two standard emojis together and it suggests a combined mashup sticker. 🙂 + 🔥 becomes a fire-faced smiley; 😭 + 💀 becomes a dramatic skull with tears. Google has generated thousands of these. They appear as sticker suggestions in the toolbar and can be shared in apps that accept images." },
  { dt: "Privacy consideration", dd: "Any third-party keyboard technically processes everything you type to provide predictions. Reputable apps from Google and Microsoft have public data policies and do not transmit your keystrokes to external servers for advertising. Unknown or newly released apps from unfamiliar developers carry more risk — check permissions carefully before granting full keyboard access." },
];

const TABLE = [
  { app: "Gboard", platform: "Android + iOS", features: "Full set + search + Emoji Kitchen", advantage: "Emoji Kitchen mashups", best: "Most users", price: "Free" },
  { app: "SwiftKey", platform: "Android + iOS", features: "Full set + emoji prediction", advantage: "Learns your emoji habits", best: "Heavy typists", price: "Free" },
  { app: "Facemoji", platform: "Android + iOS", features: "Full set + custom creation", advantage: "Draw your own emojis", best: "Creative users", price: "Free + premium" },
  { app: "Bitmoji Keyboard", platform: "Android + iOS", features: "Personalized avatar stickers", advantage: "Personalized emoji stickers", best: "Social users", price: "Free" },
  { app: "Samsung Keyboard", platform: "Android (Samsung)", features: "Full set + AR Emoji", advantage: "Samsung AR Emoji integration", best: "Samsung users", price: "Built-in" },
  { app: "Default iOS Keyboard", platform: "iOS", features: "Full Unicode + search", advantage: "Seamless iOS integration", best: "iPhone users", price: "Built-in" },
];

export default function BestApps() {
  return (
    <KSection
      kicker="Apps · 2026"
      title="Best Emoji Keyboard Apps — Android and iOS Compared"
      dek="For most people the built-in keyboard is enough; here's when a third-party app earns its place."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {DETAILS.map((row) => (
          <div key={row.dt}><dt>{row.dt}</dt><dd>{row.dd}</dd></div>
        ))}
      </dl>

      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>App</th><th>Platform</th><th>Emoji Features</th><th>Unique Advantage</th><th>Best For</th><th>Price</th></tr>
          </thead>
          <tbody>
            {TABLE.map((row) => (
              <tr key={row.app}>
                <td className="strong whitespace-nowrap">{row.app}</td>
                <td className="muted whitespace-nowrap">{row.platform}</td>
                <td>{row.features}</td>
                <td>{row.advantage}</td>
                <td className="muted">{row.best}</td>
                <td className="muted whitespace-nowrap">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickAnswer q="What Is the Best Free Emoji Keyboard App?">
        Gboard by Google is the best free emoji keyboard for most users on Android and iOS. It
        includes the full Unicode emoji set, keyword search, Emoji Kitchen mashup stickers, GIF
        access, and sticker packs — entirely free with no ads in the keyboard interface. It comes
        pre-installed on most Android devices and is available on the App Store for iPhone users.
      </QuickAnswer>

      <QuickAnswer q="Is It Safe to Use Third-Party Emoji Keyboards?">
        Gboard and SwiftKey are safe choices — made by Google and Microsoft respectively, both
        publish clear data policies, and neither sells keyboard input. Be cautious with lesser-known
        apps: a third-party keyboard can technically access everything you type, including passwords.
        Stick to keyboards from established developers, read the privacy policy before installing, and
        check the permissions requested during setup.
      </QuickAnswer>
    </KSection>
  );
}
