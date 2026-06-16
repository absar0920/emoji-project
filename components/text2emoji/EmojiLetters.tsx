import { KSection } from "@/components/kitchen/Section";

// [letter, regional indicator, bubble/circle, square]
const ALPHABET: [string, string, string, string][] = [
  ["A", "🇦", "🅐 Ⓐ", "🄰"], ["B", "🇧", "🅑 Ⓑ", "🄱"], ["C", "🇨", "🅒 Ⓒ", "🄲"],
  ["D", "🇩", "🅓 Ⓓ", "🄳"], ["E", "🇪", "🅔 Ⓔ", "🄴"], ["F", "🇫", "🅕 Ⓕ", "🄵"],
  ["G", "🇬", "🅖 Ⓖ", "🄶"], ["H", "🇭", "🅗 Ⓗ", "🄷"], ["I", "🇮", "🅘 Ⓘ", "🄸"],
  ["J", "🇯", "🅙 Ⓙ", "🄹"], ["K", "🇰", "🅚 Ⓚ", "🄺"], ["L", "🇱", "🅛 Ⓛ", "🄻"],
  ["M", "🇲", "🅜 Ⓜ", "🄼"], ["N", "🇳", "🅝 Ⓝ", "🄽"], ["O", "🇴", "🅞 Ⓞ", "🄾"],
  ["P", "🇵", "🅟 Ⓟ", "🄿"], ["Q", "🇶", "🅠 Ⓠ", "🅀"], ["R", "🇷", "🅡 Ⓡ", "🅁"],
  ["S", "🇸", "🅢 Ⓢ", "🅂"], ["T", "🇹", "🅣 Ⓣ", "🅃"], ["U", "🇺", "🅤 Ⓤ", "🅄"],
  ["V", "🇻", "🅥 Ⓥ", "🅅"], ["W", "🇼", "🅦 Ⓦ", "🅆"], ["X", "🇽", "🅧 Ⓧ", "🅇"],
  ["Y", "🇾", "🅨 Ⓨ", "🅈"], ["Z", "🇿", "🅩 Ⓩ", "🅉"],
];

export default function EmojiLetters() {
  return (
    <KSection
      kicker="Section 03"
      title="Text to Emoji Letters &amp; Alphabet Generator"
      dek="Three styles of emoji letters: regional indicators, bubble/circle, and square variants."
    >
      <div className="fg-prose max-w-2xl mb-8">
        <p><strong>Regional Indicators</strong> (🇦–🇿) are the flag-building blocks Unicode designed for country-flag combinations, widely repurposed as decorative letters. <strong>Bubble / Circle</strong> uses filled and outlined circular variants like 🅐 and Ⓐ. <strong>Square</strong> refers to the squared letter variants in Unicode’s enclosed alphanumerics block.</p>
      </div>

      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Letter</th><th>Regional Indicator</th><th>Bubble / Circle</th><th>Square</th></tr>
          </thead>
          <tbody>
            {ALPHABET.map(([l, ri, bubble, sq]) => (
              <tr key={l}>
                <td className="strong">{l}</td>
                <td className="text-xl">{ri}</td>
                <td className="text-xl">{bubble}</td>
                <td className="text-xl">{sq}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="fg-label mb-3">Copy &amp; paste examples</p>
      <div className="border border-[var(--line)] bg-[var(--paper-2)] p-5 mb-8 space-y-2.5">
        <p className="font-read t-ink">HELLO → <span className="text-xl">🇭 🇪 🇱 🇱 🇴</span></p>
        <p className="font-read t-ink">COOL → <span className="text-xl">🇨 🇴 🇴 🇱</span></p>
        <p className="font-read t-ink">FIRE → <span className="text-xl">🇫 🇮 🇷 🇪</span></p>
        <div className="pt-2 border-t border-[var(--line)] space-y-2.5">
          <p className="font-read t-ink">Numbers: <span className="text-xl">1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟</span></p>
          <p className="font-read t-ink">Symbols: <span className="text-xl">❗ ❓ ⭐ ➕ ➖ ✅ ❌ 💯</span></p>
        </div>
      </div>

      <div className="fg-pull fg-pull--sm mb-8">
        <span className="fg-kicker">Platform Note</span>
        <p>Regional-indicator letters (🇦–🇿) may auto-combine into flag emoji when two valid country-code letters sit side by side — 🇺🇸 displays as the US flag. Use a space or zero-width joiner between letters to prevent this in Discord, WhatsApp, and iMessage.</p>
      </div>

      <div className="fg-prose max-w-2xl">
        <p>Text to emoji sign language (or text to ASL emoji) uses hand-gesture emoji like 🤟 🤙 👋 🫶 🤞 🫱 to represent concepts — not a literal ASL alphabet, but a visual shorthand widely used in captions to convey warmth, connection, and communication without words.</p>
      </div>
    </KSection>
  );
}
