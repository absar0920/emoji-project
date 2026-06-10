import { KSection } from "./Section";

const FEATURES = [
  { icon: "🔁", title: "The Double Emoji Trick", desc: "Select the same emoji twice for an exaggerated, maximalist version. 😭+😭 produces ultra-crying; 🤡+🤡 a more chaotic clown; 😍+😍 over-the-top heart-eyes. The fastest way to amplify a single emotion." },
  { icon: "💾", title: "Save Favorite Combos", desc: "Long-press any sticker in the suggestion row on Android to save it to your gallery as a PNG. Gboard also retains recently used stickers, so frequent combos resurface without re-selecting." },
  { icon: "📡", title: "Offline Limitations", desc: "Kitchen needs an internet connection for new combinations — stickers are fetched from Google's servers, not stored on-device. Loaded stickers may cache briefly; new pairings won't load offline." },
  { icon: "🔄", title: "Update Frequency", desc: "Google adds combinations with major Gboard releases, usually aligned with annual Unicode releases and Pixel launches. Major expansions arrived with every Android version from 12 through 16." },
];

export default function HiddenFeatures() {
  return (
    <KSection kicker="Pro Tips" title="Hidden Features & Pro Tips" dek="Tricks most Emoji Kitchen guides don't cover.">
      <div className="fg-list mb-8">
        {FEATURES.map((f) => (
          <div key={f.title} className="fg-entry fg-entry--ledger">
            <span className="fg-entry__glyph" style={{ fontSize: "1.5rem" }}>{f.icon}</span>
            <div className="fg-entry__main">
              <span className="fg-entry__name">{f.title}</span>
              <p className="fg-entry__text">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Offline · The Difference</span>
        <p>Regular emojis render fully offline as Unicode characters from your device font. Kitchen stickers are fetched images that need connectivity for first loads — the picker opens offline, but the suggestion row stays empty for unfetched combos until you reconnect.</p>
      </div>
    </KSection>
  );
}
