import { KSection } from "@/components/kitchen/Section";

const ORIGINS = [
  "In September 1982, Dr. Scott Fahlman, a computer scientist at Carnegie Mellon University, proposed using :-) to signal jokes on a university message board. He was trying to solve a real problem: text conversations were causing misunderstandings because readers could not tell when someone was being sarcastic. His sideways smiley became the foundation of Western emoticon culture.",
  "Four years later, in June 1986, Yasushi Wakabayashi posted (^_^) on ASCII NET, a Japanese precursor to the modern internet. Unlike Fahlman's creation, which borrowed from the left-to-right reading flow of the Latin alphabet, Wakabayashi's version was built for a face-forward reading convention rooted in how Japanese writing and visual culture already oriented faces. The kaomoji read upright because that is how Japanese users already thought about faces.",
  "The two traditions then developed completely independently for the next decade.",
];

const TWOCH = [
  "The real explosion of kaomoji variety happened through the 1990s and 2000s on 2channel (2ch), Japan's largest and most influential anonymous internet forum. At its peak, 2channel hosted millions of daily posts and became the primary incubator for Japanese internet culture.",
  "2channel users worked with the Shift JIS character encoding, which gave them access to a far wider range of symbols than standard ASCII. Where a Western user typing on a US keyboard had access to roughly 95 printable characters, a 2channel user working in Shift JIS could pull from thousands of characters including Japanese hiragana, katakana, kanji, and a vast library of punctuation and special symbols from multiple scripts.",
  "The results were extraordinary. Two iconic characters emerged from 2channel's ASCII art (AA) culture: Mona, a cat-like figure, and Giko Cat, a stylized feline built from full-width characters. These were not just kaomoji — they were the first Japanese internet memes, forerunners of the visual character culture that would eventually produce Vocaloid, VTubers, and modern anime avatar aesthetics.",
  "Linguist Ilaria Moschini's research on kawaii culture in digital communication notes that kaomoji were predominantly adopted by young women and manga fans in this era. The kawaii (可愛い) aesthetic, Japan's cultural philosophy of cuteness, shaped which features became standard: wide eyes, round faces, soft expressions, and decorative elements like hearts and stars.",
];

const EMOJI = [
  "When Shigetaka Kurita designed the first 176 emoji for NTT DoCoMo in 1999, many observers assumed text-based emoticons and kaomoji would become obsolete. They were wrong.",
  "Emoji solved the rendering problem that kaomoji never had: a single, universally recognized graphic image could communicate across language barriers in a way that character-based expressions could not always manage. But emoji introduced a new problem: they render differently on different platforms. The smiling face you send from an iPhone looks noticeably different when it arrives on a Samsung Galaxy. Apple's face is round and yellow. Samsung's may have a different expression entirely. The Unicode Consortium standardizes the code point, but each operating system renders its own artwork.",
  "Kaomoji have no rendering variation. (^_^) looks exactly the same on every device that can display Unicode. That consistency is a genuine technical advantage that emoji cannot match.",
];

const REVIVAL = [
  "Something unexpected happened between 2020 and 2026. Kaomoji stopped being a niche interest and became a mainstream aesthetic marker.",
  "The Y2K nostalgia wave, accelerating through 2025 with the “2026 is the new 2016” cultural trend, brought early internet aesthetics back into fashion. Younger generations first saw kaomoji — a fundamental visual component of Y2K digital culture — through Tumblr archives, vintage anime forums, and retro web aesthetics, adopting them as identity signals.",
  "Music producer Porter Robinson accelerated this significantly. His 2014 album Worlds and 2021 album Nurture both leaned heavily into kawaii and kaomoji visual branding. His fanbase adopted kaomoji as community identifiers. Search traffic for “porter robinson kaomoji” represents a meaningful slice of overall kaomoji interest in Western audiences.",
  "Discord communities, anime fandoms, and developer culture have each kept kaomoji alive through different channels. Developers in particular use kaomoji in commit messages, README files, and internal documentation as personality signals that humanize technical writing.",
  "The neuroscience now confirms what these communities already knew intuitively. Research published in Psychophysiology in 2026 revealed that emoji and human faces use overlapping neural representations in the brain — a shared neural code for emotion recognition. A separate 2026 study found that people recognize emotions from emoji and kaomoji faster and more accurately than from real photographs. Simple text symbols, it turns out, trigger the same emotional processing pathways as real human faces.",
];

function Sub({ title, paras }: { title: string; paras: string[] }) {
  return (
    <div className="mt-10">
      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-4">{title}</h3>
      <div className="fg-prose max-w-2xl">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

export default function History() {
  return (
    <KSection
      kicker="History"
      title="The History of Kaomoji: From 1986 to 2026"
      dek="Two parallel inventions, four years and an ocean apart, that never touched."
    >
      <div className="fg-prose max-w-2xl mb-2">
        {ORIGINS.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <Sub title="The 2channel Era: Explosion of Creativity" paras={TWOCH} />
      <Sub title="Why Emoji Did Not Kill Kaomoji" paras={EMOJI} />
      <Sub title="The 2020s Revival: Y2K Aesthetics and Porter Robinson" paras={REVIVAL} />
    </KSection>
  );
}
