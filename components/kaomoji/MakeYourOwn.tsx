import { KSection } from "@/components/kitchen/Section";

const OUTLINES: [string, string][] = [
  ["( )", "Standard, clean, universally readable"],
  ["（ ）", "Full-width Japanese version, rounder appearance"],
  ["[ ]", "Robotic, geometric feeling"],
  ["{ }", "Unusual, creates organic framing"],
  ["｡", "Minimal, used in very simple kaomoji"],
];

const MOUTHS: [string, string][] = [
  ["Happy open smile", "▽ or v"],
  ["Gentle content", "ω or _"],
  ["Troubled or worried", "﹏ or へ"],
  ["Shocked open mouth", "Д or □ or ロ"],
  ["Gritting teeth in anger", "皿"],
  ["Kissing", "3"],
];

const EXAMPLES = [
  {
    title: "A Happy Cat Kaomoji",
    target: "(=^･ω･^=)",
    parts: [
      ["Face outline", "( ) with = signs for whiskers at the edges"],
      ["Eyes", "^ (happy)"],
      ["Ears", "the = signs extend upward, suggesting cat ears"],
      ["Mouth", "ω (classic cute mouth)"],
    ],
  },
  {
    title: "A Sad Crying Kaomoji",
    target: "(；ω；)",
    parts: [
      ["Face outline", "( )"],
      ["Eyes", "; (tears falling)"],
      ["Mouth", "ω (the same cute mouth now reads as sad because the crying eyes dominate)"],
    ],
  },
  {
    title: "A Determined Fighting Kaomoji",
    target: "(ง •̀_•́)ง",
    parts: [
      ["Face outline", "( )"],
      ["Eyes", "•̀ and •́ (accented dots, creating a fierce narrowed look)"],
      ["Mouth", "_ (flat, determined, no wasted expression)"],
      ["Arms", "ง on both sides (fighting fists raised)"],
    ],
  },
];

const CHARSETS: [string, string, string][] = [
  ["Standard ASCII", "Works everywhere, maximum compatibility", "( ) [ ] ^ _ ; . : | / \\ < > * ~ #"],
  ["Japanese full-width", "Rounder, heavier, more expressive", "（ ） ω ヽ ノ ヾ ゞ ツ Д ロ 皿"],
  ["Unicode special symbols", "Extended expressiveness", "ᴥ ᵔ ◕ ╯ ╰ ┻ ━ ᗒ ᗕ ᘏ ᓚ"],
  ["Decorative Unicode", "Hearts, stars, sparkles", "♡ ❤ ✧ ☆ ✨ ٩ ۶ ʕ ♪ ♫"],
];

function MiniTable({ rows, head }: { rows: [string, string][]; head: [string, string] }) {
  return (
    <div className="fg-table-wrap mb-5">
      <table className="fg-table">
        <thead><tr><th>{head[0]}</th><th>{head[1]}</th></tr></thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a}><td className="strong">{a}</td><td className="mono" style={{ fontSize: "0.95rem" }}>{b}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-9">
      <p className="fg-kicker mb-2">Step {n}</p>
      <h4 className="font-display t-ink text-[1.2rem] sm:text-[1.35rem] mb-3">{title}</h4>
      {children}
    </div>
  );
}

export default function MakeYourOwn() {
  return (
    <KSection
      kicker="Build One"
      title="How to Make Your Own Kaomoji"
      dek="A five-step assembly process — easier than it looks once the characters click."
    >
      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-6">The Anatomy of a Kaomoji</h3>

      <Step n={1} title="Choose your face outline">
        <p className="t-body font-read max-w-2xl mb-4">The face outline creates the visual boundary that tells readers this is a face.</p>
        <MiniTable rows={OUTLINES} head={["Outline Option", "Visual Effect"]} />
      </Step>

      <Step n={2} title="Choose eyes that match the emotion">
        <p className="t-body font-read max-w-2xl mb-4">Pick from the eye-character table in the reading section above. This is the single most important creative decision — the eyes determine what emotion your kaomoji communicates at first glance.</p>
        <dl className="fg-deflist border-t border-[var(--line)] max-w-2xl">
          <div><dt>Happy intention</dt><dd>use ^ or ◕ or ≧</dd></div>
          <div><dt>Sad intention</dt><dd>use T or ; or ╥</dd></div>
          <div><dt>Angry intention</dt><dd>use ò or ó or &gt; with a specific mouth pairing</dd></div>
          <div><dt>Cute intention</dt><dd>use · or ω or ◕</dd></div>
        </dl>
      </Step>

      <Step n={3} title="Choose a mouth">
        <MiniTable rows={MOUTHS} head={["Your Goal", "Mouth to Use"]} />
      </Step>

      <Step n={4} title="Add optional arms">
        <p className="t-body font-read max-w-2xl">Arms transform a face into an action. Without arms: (^_^). With raised arms: ヽ(^_^)ノ. With a reaching gesture: (^_^)づ. With a fighting stance: (ง^_^)ง.</p>
      </Step>

      <Step n={5} title="Add decorations">
        <p className="t-body font-read max-w-2xl">Place hearts ♡, stars ✧ ☆, sparkles ✨, or music notes ♪ around the face to amplify the emotional tone.</p>
      </Step>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mt-12 mb-6">Three Worked Examples</h3>
      {EXAMPLES.map((ex) => (
        <div key={ex.title} className="mb-8">
          <h4 className="font-display t-ink text-[1.15rem] sm:text-[1.3rem] mb-2">Building {ex.title}</h4>
          <p className="mono t-accent mb-3" style={{ fontSize: "1.05rem" }}>Target: {ex.target}</p>
          <dl className="fg-deflist border-t border-[var(--line)] max-w-2xl">
            {ex.parts.map(([a, b]) => (
              <div key={a}><dt>{a}</dt><dd>{b}</dd></div>
            ))}
          </dl>
        </div>
      ))}

      <div className="fg-pull fg-pull--sm mb-10">
        <span className="fg-kicker">The Key Insight</span>
        <p>The same ω mouth reads as happy in (^_^) and sad in (；ω；). The eyes carry the emotional meaning — the mouth just completes the face.</p>
      </div>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-3">Unicode Character Sets Used in Kaomoji</h3>
      <p className="t-muted font-read max-w-2xl mb-5">Different types of characters produce different visual qualities.</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-6">
        {CHARSETS.map(([name, note, chars]) => (
          <div key={name}>
            <dt>{name} — {note}</dt>
            <dd className="mono" style={{ fontSize: "0.95rem" }}>{chars}</dd>
          </div>
        ))}
      </dl>
      <p className="t-body font-read max-w-2xl">Full-width Japanese characters give kaomoji more visual weight and a more rounded appearance than standard ASCII. Advanced kaomoji using Shift JIS characters may not render on all platforms. For maximum compatibility, stick to Unicode characters that appear in the tables above.</p>
    </KSection>
  );
}
