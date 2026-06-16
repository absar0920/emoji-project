import { KSection } from "@/components/kitchen/Section";

const MEANINGS: [string, string, string][] = [
  ["🌹🖕", "Roses are red, middle finger", "Passive-aggressive farewell or dismissal. Used when someone is done with a situation but still wants to seem composed about it."],
  ["💀✋", "Dead, stop", "“I'm dead — stop, this is too funny.” Gen Z uses 💀 as the replacement for 😂, meaning something was so funny it's fatal. Adding ✋ intensifies the plea to stop."],
  ["🙂🔪", "Fine. I'm fine. Definitely fine", "Smiling with a knife signals contained hostility — someone holding it together while internally losing it. Dark humor, widely used in workplace contexts."],
  ["🏳️🧢", "White flag + cap", "Surrender followed by calling someone a liar. Cap = lie in AAVE-influenced internet slang. Together: “I give up arguing but you're still lying.”"],
  ["🫠💧", "Melting and crying", "Complete emotional dissolution. Used when something is so overwhelming — embarrassing, funny, or difficult — that you are metaphorically melting away."],
  ["🍵🐸", "Tea + Kermit", "Origin: the “But that's none of my business” Kermit meme. Used when sharing tea (gossip) while pretending to be uninvolved — the modern “just saying.”"],
  ["🌚🌝", "Dark moon + full moon face", "Flirty or suggestive exchange. Often appears in flirty text conversations."],
  ["⌛💔", "Hourglass + broken heart", "Time running out on a relationship or situation. Expresses that something precious is being lost gradually, not all at once."],
  ["🫦👀", "Lips + eyes", "Looking closely with interest — often flirty, sometimes just “I see you” or “I'm watching this situation closely.”"],
  ["🐍✉️", "Snake + letter", "Writing a callout or exposé about someone who acted snakily. Popularized during social media drama cycles."],
  ["🌈🐄", "Rainbow + cow", "Absurdist humor with no fixed meaning — used specifically because it has no obvious interpretation. Popular in brainrot humor communities."],
  ["🧿🪬", "Evil eye + hamsa", "Protection from negative energy. Used sincerely in many cultural contexts and increasingly as an aesthetic spiritual signal in bios."],
];

export default function CombosWithMeaning() {
  return (
    <KSection
      kicker="Section 05"
      title="Emoji Combos with Meaning Explained"
      dek="Signals, codes, and in-jokes that carry information beyond their literal definitions."
    >
      <div className="border-t border-[var(--line)]">
        {MEANINGS.map(([combo, name, meaning]) => (
          <div key={combo} className="flex gap-4 sm:gap-6 py-4 border-b border-[var(--line)]">
            <span className="text-2xl shrink-0 w-14 leading-snug">{combo}</span>
            <div className="min-w-0">
              <h3 className="font-read font-semibold t-ink leading-snug">{name}</h3>
              <p className="t-body leading-relaxed mt-1 max-w-2xl">{meaning}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fg-pull fg-pull--sm mt-8">
        <span className="fg-kicker">Cultural Context</span>
        <p>Emoji meanings evolve faster than dictionaries can track them. A combo that meant one thing in 2022 may carry a completely different connotation in 2026. When in doubt, search it with the current year on TikTok or Urban Dictionary before using it.</p>
      </div>
    </KSection>
  );
}
