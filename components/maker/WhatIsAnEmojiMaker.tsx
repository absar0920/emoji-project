import Link from "next/link";
import { KSection } from "@/components/kitchen/Section";

const INTRO =
  "An emoji maker is a browser-based or app-based tool that lets you design, customize, and export small graphic images that function as emojis inside messaging platforms, social networks, and community servers. Unlike the standard emojis managed by the Unicode Consortium, a custom emoji is built entirely by you — the expression, the style, the color palette, the accessories, and the output dimensions are all under your control.";

const WORKFLOWS = [
  { dt: "Component-based design", dd: "What most people picture when they think of an emoji builder. You select and arrange pre-built facial features, accessories, and backgrounds on a layered canvas, building the design piece by piece from a library of elements." },
  { dt: "Image-based creation", dd: "Starts from an existing image — a photo, drawing, or screenshot. The tool prepares it for emoji use through cropping, background removal, resizing, and format conversion. No drawing skills required." },
  { dt: "AI generation", dd: "Takes a plain text prompt and produces original emoji artwork using a generative model. You describe the concept in words and receive a styled result within seconds — exactly what the generator at the top of this page does." },
];

const LAYER_INTRO = [
  "Every component-style emoji builder operates on the same core principle. You begin with a base shape — most commonly a circle for face emojis or a full-body silhouette for character emojis. On top of that base, the tool stacks individual elements on separate layers. Each layer holds a single component: eyes, eyebrows, nose, mouth, glasses, hair, hat, mask, hands, or background.",
  "Because each element sits on its own layer, you can move, scale, rotate, copy, delete, or reorder any one of them without touching the others. The canvas shows a live preview as you work. When the design is complete, the tool flattens all layers and exports a single image file.",
];

const LAYERS: [string, string, string][] = [
  ["Base Shape", "Overall emoji outline", "Size, fill color, opacity"],
  ["Facial Features", "Eyes, nose, mouth, brows", "Style, position, scale, color"],
  ["Accessories", "Glasses, hats, beards, masks", "Rotation, color, layer order"],
  ["Hair", "Style and length", "Placement, color, scale"],
  ["Stickers", "Decorative overlays", "Position, blend mode, opacity"],
  ["Background", "Scene, color, or pattern", "Color, theme, transparency"],
  ["Text", "Labels or captions", "Font, size, color, position"],
];

export default function WhatIsAnEmojiMaker() {
  return (
    <KSection
      kicker="Section 01"
      title="What Is an Emoji Maker and How It Works"
      dek="Three creation workflows, one shared idea: full control the Unicode library can't give you."
    >
      <div className="fg-prose max-w-2xl mb-8">
        <p>{INTRO}</p>
      </div>

      <p className="fg-label mb-3">The three workflows</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-9">
        {WORKFLOWS.map((w) => (
          <div key={w.dt}><dt>{w.dt}</dt><dd>{w.dd}</dd></div>
        ))}
      </dl>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-4">How the Layer-Based Builder Works</h3>
      <div className="fg-prose max-w-2xl mb-7">
        {LAYER_INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="fg-table-wrap mb-9">
        <table className="fg-table">
          <thead>
            <tr><th>Layer Type</th><th>What It Controls</th><th>Key Editable Properties</th></tr>
          </thead>
          <tbody>
            {LAYERS.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td>{r[1]}</td>
                <td className="muted">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-4">Upload-Based and AI Workflows</h3>
      <div className="fg-prose max-w-2xl mb-8">
        <p>Upload-based creator tools take a different starting point. You bring an existing image — PNG, JPG, GIF, or WebP — and the tool handles everything: crop for a strong focal point, remove the background, choose an animation effect if needed, and export in the exact format and pixel dimensions the target platform requires.</p>
        <p>A text-to-emoji generator converts a plain-language prompt into a custom image. You type something like “angry cat with sunglasses and lightning bolts” and receive a styled result within seconds. The tradeoff is precision: the output varies between generations, and you cannot position individual elements the way a layer-based editor allows. For rapid creative exploration, AI generators are powerful; for branded designs, a manual editor produces more predictable, repeatable results.</p>
      </div>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Quick Decision Guide</span>
        <p>
          Building from scratch → use a component-based builder. Have an existing image → use an
          upload-based creator. Have a concept but no source → use an{" "}
          <Link href="/tools/text-to-emoji" className="fg-link">AI text-to-emoji generator</Link>{" "}
          first, then refine the output in an editor.
        </p>
      </div>
    </KSection>
  );
}
