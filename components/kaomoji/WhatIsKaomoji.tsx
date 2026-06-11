import { KSection } from "@/components/kitchen/Section";

const DEF = [
  "Kaomoji (顔文字) are Japanese-style text emoticons built entirely from Unicode characters. They express emotions, actions, and facial expressions by combining punctuation marks, letters, and special symbols into a face that you read upright, not sideways. The word itself breaks into two Japanese words: kao (顔), meaning face, and moji (文字), meaning character.",
  "The simplest example is (^_^). The outer parentheses form the face outline. The carets represent smiling eyes. The underscore is the mouth. You read it straight on, exactly like looking at a real face.",
  "That upright reading direction is what separates kaomoji from Western emoticons like :-) which you have to tilt your head to interpret. It is also what gives kaomoji a far wider expressive range. When the eyes carry the emotion instead of the mouth, a single character swap completely changes the feeling of the face.",
  "Because kaomoji are plain Unicode text, they render identically on every device, browser, operating system, and platform on earth. No image file. No font dependency. No rendering engine. Type (^_^) on a Windows PC, an iPhone, a Linux terminal, or a forty-year-old email client, and it looks exactly the same.",
];

const EYES: [string, string][] = [
  ["^ or ＾", "Happy, pleased, smiling"],
  ["T or ;", "Crying, sad, tearful"],
  ["> or ＞", "Mischievous, shifty, scheming"],
  ["· or .", "Calm, blank, neutral"],
  ["◕ or ●", "Cute, wide-eyed, innocent"],
  ["≧ or ≦", "Excited, delighted"],
  ["´ `", "Gentle, slightly sad"],
  ["＊ or *", "Sparkling, surprised, star-eyed"],
  ["ò or ó", "Determined, fierce"],
  ["╥", "Deep sadness, overwhelmed"],
  ["⊙", "Shocked, startled"],
  ["— or ー", "Deadpan, tired, unimpressed"],
];

const MOUTH: [string, string][] = [
  ["_ or ω", "Neutral, cute, calm"],
  ["▽ or v", "Cheerful, open smile"],
  ["﹏ or へ", "Troubled, worried, uneasy"],
  ["Д or □", "Shock, open-mouthed"],
  ["皿", "Angry, gritting teeth"],
  ["‿", "Gentle smile, content"],
  ["3", "Kissing, affectionate"],
];

const ARMS: [string, string][] = [
  ["ノ or ヽ", "Raised arm, waving"],
  ["つ or ⊃", "Reaching out, hugging"],
  ["٩ and ۶", "Both arms raised, excited"],
  ["ง", "Fighting stance, fist raised"],
  ["┻━┻", "Table being flipped"],
  ["︵", "Object being thrown"],
];

function CharTable({ rows, head }: { rows: [string, string][]; head: [string, string] }) {
  return (
    <div className="fg-table-wrap mb-7">
      <table className="fg-table">
        <thead>
          <tr><th>{head[0]}</th><th>{head[1]}</th></tr>
        </thead>
        <tbody>
          {rows.map(([c, m]) => (
            <tr key={c}>
              <td className="mono t-accent whitespace-nowrap" style={{ fontSize: "0.95rem" }}>{c}</td>
              <td>{m}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WhatIsKaomoji() {
  return (
    <KSection
      kicker="Fundamentals"
      title="What Is Kaomoji? Definition and Meaning"
      dek="A face you read upright, built from pure Unicode — and how to decode any of them."
    >
      <div className="fg-prose max-w-2xl mb-10">
        {DEF.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <h3 className="font-display t-ink text-[1.4rem] sm:text-[1.7rem] mb-4">How to Read Any Kaomoji</h3>
      <div className="fg-prose max-w-2xl mb-7">
        <p>Every kaomoji follows a recognizable structure. Once you understand the building blocks, you can decode any kaomoji you encounter without looking it up. The structure moves from outside to inside.</p>
      </div>

      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        <div>
          <dt>Face Outline</dt>
          <dd>The outermost characters create the face boundary. Standard parentheses ( ) are most common. Some kaomoji use square brackets [ ], curly braces {"{ }"}, or Japanese full-width parentheses （ ）for a rounder, heavier look.</dd>
        </div>
        <div>
          <dt>Eyes</dt>
          <dd>The main emotional indication is carried by the eye characters, located just inside the face shape. This is the most important part of reading a kaomoji.</dd>
        </div>
      </dl>

      <p className="fg-label mb-3">Eye characters</p>
      <CharTable rows={EYES} head={["Eye Character", "Emotion It Signals"]} />

      <div className="fg-prose max-w-2xl mb-7">
        <p>The mouth — the central character between the eyes — signals emotional tone but carries less weight than the eyes.</p>
      </div>

      <p className="fg-label mb-3">Mouth characters</p>
      <CharTable rows={MOUTH} head={["Mouth Character", "What It Signals"]} />

      <div className="fg-prose max-w-2xl mb-7">
        <p>Arms and actions — characters placed outside the face outline — add body language.</p>
      </div>

      <p className="fg-label mb-3">Arms &amp; actions</p>
      <CharTable rows={ARMS} head={["Arm / Action Element", "What It Conveys"]} />

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Decorations</span>
        <p>Hearts ♡, stars ✧ ☆, sparkles ✨, sweat drops ;;, and tildes ~ add emotional nuance or visual flair around the face.</p>
      </div>
    </KSection>
  );
}
