import { KSection } from "./Section";

const STEPS = [
  "Open the Google Play Store and confirm Gboard is installed (minimum version 6.5+; update if you are below that).",
  "Go to device Settings → General Management → Keyboard list and default.",
  "Set Gboard as the default keyboard.",
  "Open Gboard Settings (long-press the comma key → tap the settings gear, or Settings → Gboard).",
  "Tap Preferences → locate the Emoji Kitchen toggle → switch it on.",
  "Open any messaging app, tap the emoji icon, select a supported emoji — the Kitchen suggestion row appears above the keyboard.",
];

export default function HowToUseAndroid() {
  return (
    <KSection kicker="Setup · Android" title="How to Use Emoji Kitchen on Android (Gboard)" dek="Emoji Kitchen is built natively into Gboard — no separate download required.">
      <ol className="fg-steps mb-8">
        {STEPS.map((text, i) => (
          <li key={i} className="fg-step">
            <span className="fg-step__n tabular-nums">{i + 1}</span>
            <div><p className="fg-step__t">{text}</p></div>
          </li>
        ))}
      </ol>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Watch Out · Samsung</span>
        <p>Samsung devices default to Samsung Keyboard, which has no Emoji Kitchen — switch to Gboard in Settings → General Management → Keyboard list. On Xiaomi/MIUI, Gboard may need full permissions under Settings → Manage Apps → Gboard → Permissions.</p>
      </div>
    </KSection>
  );
}
