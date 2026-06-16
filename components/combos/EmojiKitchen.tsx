import Link from "next/link";
import { KSection } from "@/components/kitchen/Section";

const PAIRS: [string, string, string][] = [
  ["🐱 + 👻", "Cat + Ghost", "A ghostly cat — soft, spooky, perfect for Halloween or any time you feel feline and ethereal."],
  ["🌙 + ☁️", "Moon + Cloud", "Sleepy moon tucked in clouds — dreamy nighttime vibe, ideal for goodnight messages."],
  ["🔥 + 💧", "Fire + Water", "Steam or conflict imagery — great for drama posts or expressing contradictory feelings."],
  ["🍓 + 🌸", "Strawberry + Flower", "Fruity floral hybrid — cute aesthetic, popular in kawaii and cottagecore communities."],
  ["😭 + 👑", "Crying + Crown", "Dramatic royalty — crying but make it regal. For when you're suffering glamorously."],
  ["🐸 + ☕", "Frog + Coffee", "The Kermit-tea meme formalized — gossiping frog with a cup, perfect for spilling tea."],
  ["🌈 + 🌧️", "Rainbow + Rain", "Hope through difficulty — emotional, bittersweet, popular for mental health content."],
  ["💀 + 🌸", "Skull + Flower", "Dark beauty — gothic floral aesthetic, perfect for dark cottagecore or dark feminine vibes."],
];

const FUNNIEST: [string, string][] = [
  ["🦷 + 😂", "Laughing tooth — chaotic, absurd, impossible not to react to"],
  ["🍕 + 😎", "Cool pizza with sunglasses — unbothered slice energy"],
  ["🥚 + 💀", "Dead egg — existential crisis in breakfast form"],
  ["🌵 + 😭", "Crying cactus — contradictory, inexplicably relatable"],
];

export default function EmojiKitchen() {
  return (
    <KSection
      kicker="Section 06"
      title="Emoji Kitchen: The Best Combos to Try"
      dek="Google's Gboard feature that merges two emojis into a single hybrid illustration."
    >
      <div className="fg-prose max-w-2xl mb-8">
        <p>Emoji Kitchen combines two standard Unicode emojis into a single hybrid image — a smiling sun wearing heart glasses, a crying skull, a ghost hugging a cat. Unlike standard combos, it produces an entirely new image rather than a sequence of existing ones, which makes it popular for WhatsApp stickers and image-based reactions.</p>
      </div>

      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Pair</th><th>Name</th><th>Vibe / Use</th></tr>
          </thead>
          <tbody>
            {PAIRS.map((r) => (
              <tr key={r[0]}>
                <td className="text-xl whitespace-nowrap">{r[0]}</td>
                <td className="strong whitespace-nowrap">{r[1]}</td>
                <td>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="fg-label mb-3">Funniest Kitchen combos</p>
      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Pair</th><th>Vibe / Use</th></tr>
          </thead>
          <tbody>
            {FUNNIEST.map((r) => (
              <tr key={r[0]}>
                <td className="text-xl whitespace-nowrap">{r[0]}</td>
                <td>{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-body font-read max-w-2xl">
        Want to actually make these? Merge any two emojis in the{" "}
        <Link href="/tools/emoji-kitchen" className="fg-link">Emoji Kitchen tool</Link>.
      </p>
    </KSection>
  );
}
