import { KSection } from "./Section";

const PROBLEMS = [
  { problem: "Emoji Kitchen not showing at all", cause: "Wrong default keyboard or toggle off", fix: "Set Gboard as default; enable in Gboard Preferences" },
  { problem: "Suggestion row missing", cause: "Emoji Kitchen disabled in settings", fix: "Gboard → Preferences → Emoji Kitchen → On" },
  { problem: "Stickers appear but won't send", cause: "App doesn't support image stickers", fix: "Use a compatible app (WhatsApp, Telegram, Google Messages)" },
  { problem: "No combos for specific emoji", cause: "Emoji not supported (flags, people)", fix: "Use supported emoji categories only" },
  { problem: "Feature disappeared after update", cause: "Cache reset or version change", fix: "Clear Gboard cache; restart device" },
  { problem: "Works on Android but not iPhone", cause: "iOS Gboard lacks the native feature", fix: "Use the Google Search web tool at google.com" },
  { problem: "Sticker sends blank / broken", cause: "Internet connection issue", fix: "Check connection; images load from Google's servers" },
];

export default function Troubleshooting() {
  return (
    <KSection kicker="Troubleshooting" title="Emoji Kitchen Troubleshooting" dek="Fixes for every common problem.">
      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Problem</th><th>Likely Cause</th><th>Fix</th></tr>
          </thead>
          <tbody>
            {PROBLEMS.map((row) => (
              <tr key={row.problem}>
                <td className="strong">{row.problem}</td>
                <td className="muted">{row.cause}</td>
                <td>{row.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="fg-deflist border-t border-[var(--line)]">
        <div>
          <dt>Cache clear steps</dt>
          <dd>If Kitchen was working and stopped: Settings → Apps → Gboard → Storage → Clear Cache, then restart. This removes stored sticker data and forces a fresh fetch.</dd>
        </div>
        <div>
          <dt>Combos disappeared after update?</dt>
          <dd>A major Gboard update can reset the local cache, leaving the suggestion row sparse for a day or two. Normal usage re-populates it as Gboard fetches combinations for the emojis you select.</dd>
        </div>
      </dl>
    </KSection>
  );
}
