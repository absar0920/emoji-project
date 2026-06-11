import { KSection } from "@/components/kitchen/Section";

const PARAS = [
  "Forty years after Yasushi Wakabayashi typed (^_^) into a Japanese bulletin board, kaomoji are still here. They survived the rise of emoji. They survived the death of the platforms that created them. They are now part of a global visual language spoken fluently by Discord communities, anime fandoms, developer teams, aesthetic Instagram accounts, and a generation of young people rediscovering early internet culture through Y2K nostalgia.",
  "The neuroscience tells us why they endure. Simple text symbols trigger the same neural pathways as real human faces. The brain reads (T_T) and responds to the emotional signal before the conscious mind has time to register that it is looking at two letters and an underscore.",
  "They do something emoji cannot: render identically on every device on earth without a single image file. They do something Western emoticons cannot: express a range of emotion so nuanced and culturally rich that a single character swap in the eye position completely changes the feeling of the face.",
  "Pick your favorite kaomoji from this guide. Set it up as a text replacement on your device using the steps in the how-to section. Use it the next time words alone feel insufficient.",
];

export default function Conclusion() {
  return (
    <KSection kicker="The Bottom Line" title="Forty Years On, Kaomoji Are Still Here" dek="They outlived emoji's arrival and the platforms that birthed them.">
      <div className="fg-prose max-w-2xl mb-9">
        {PARAS.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <p className="font-mono t-accent text-center text-3xl sm:text-4xl py-6 border-y border-[var(--line)] select-all">(^_^)</p>

      <div className="mt-10 pt-6 border-t border-[var(--line)]">
        <p className="fg-label mb-3">References</p>
        <ul className="space-y-2">
          <li>
            <a href="https://www.unicode.org/reports/tr51/" target="_blank" rel="noopener noreferrer" className="fg-link">
              Unicode Character Database &amp; Technical Standard (UTS #51)
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Kaomoji" target="_blank" rel="noopener noreferrer" className="fg-link">
              Wikipedia — Kaomoji
            </a>
          </li>
        </ul>
      </div>
    </KSection>
  );
}
