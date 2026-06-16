import { KSection } from "@/components/kitchen/Section";

const SCALE = [
  "In 2026, emojis appear in over 6 trillion messages per month globally. Daily usage among millennials sits at approximately 94% across all digital platforms. The Unicode Consortium approved Emoji 17.0 in September 2025, adding 163 new emojis — including a distorted face, ballet dancer, orca, and treasure chest — bringing the total to over 3,800 officially recognized Unicode emojis. Yet demand for personalized expression continues to outpace official releases by a wide margin.",
  "The Unicode Consortium adds new emojis once per year, and the approval process from proposal to publication takes two to four years. An emoji maker bypasses that cycle entirely. If your community needs a specific reaction today, you can have a custom emoji live in your server in under fifteen minutes.",
];

const PLATFORMS = [
  { dt: "Discord", dd: "Server administrators upload custom emoji that members can use within that server. Emoji slots grow from 50 at the base boost level up to 500 at the maximum tier." },
  { dt: "Slack", dd: "Workspace members upload emoji visible to everyone on the team. Custom Slack emoji encode inside jokes, celebrate launches, and reinforce team culture without a single word." },
  { dt: "Twitch", dd: "Emotes function as a currency of community identity. Subscribers gain access to custom emotes usable across the platform. A recognizable emote set is one of the most effective tools a streamer has for building lasting channel loyalty." },
];

const CLOSING = [
  "Brands increasingly use custom emoji for marketing campaigns, product launches, and community engagement. A branded emoji that matches a company's visual identity extends recognition into personal conversations in a way conventional advertising cannot. The emoji-making software market is projected at roughly $790 million in 2026 and forecast to more than double by 2033, driven primarily by rising business adoption alongside continued personal-use growth.",
  "The standard emoji library was designed for global readability, which required stripping culturally specific meaning from every symbol. A custom emoji creator gives communities the ability to encode their own references, rituals, and shared vocabulary into visual form — something no committee-approved library can replicate at the pace communities evolve.",
];

export default function WhyItMatters() {
  return (
    <KSection
      kicker="Section 02"
      title="Why Emoji Maker Tools Matter in 2026"
      dek="Not novelty — genuine communication gaps the Unicode library was never designed to fill."
    >
      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-4">The Scale of Emoji Communication</h3>
      <div className="fg-prose max-w-2xl mb-9">
        {SCALE.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-4">Platform-Level Custom Emoji Ecosystems</h3>
      <dl className="fg-deflist border-t border-[var(--line)] mb-9">
        {PLATFORMS.map((p) => (
          <div key={p.dt}><dt>{p.dt}</dt><dd>{p.dd}</dd></div>
        ))}
      </dl>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-4">Business, Brand &amp; Community</h3>
      <div className="fg-prose max-w-2xl">
        {CLOSING.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </KSection>
  );
}
