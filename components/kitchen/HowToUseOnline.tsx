import { KSection } from "./Section";

const WAYS = [
  { icon: "🔍", title: "Google Search", desc: "Search \"emoji kitchen\" in any browser. The interactive tool appears at the top of results — connected directly to Google's full library. No sign-in required." },
  { icon: "🍳", title: "This Tool", desc: "Use the interactive Emoji Kitchen tool at the top of this page to combine any two emojis. Powered by Google's sticker library, with copy and download." },
];

export default function HowToUseOnline() {
  return (
    <KSection kicker="Browser" title="Emoji Kitchen Online — From Any Browser" dek="No app installation or keyboard setup required.">
      <div className="fg-list mb-8">
        {WAYS.map((w) => (
          <div key={w.title} className="fg-entry fg-entry--ledger">
            <span className="fg-entry__glyph" style={{ fontSize: "1.5rem" }}>{w.icon}</span>
            <div className="fg-entry__main">
              <span className="fg-entry__name">{w.title}</span>
              <p className="fg-entry__text">{w.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Works Everywhere</span>
        <p>Emoji Kitchen is accessible from any browser — desktop, laptop, Mac, or phone — without installing an app or enabling a keyboard. The Google Search tool is the fastest, most complete way to reach the full 100,000+ combination library.</p>
      </div>
    </KSection>
  );
}
