import { KSection } from "@/components/kitchen/Section";

const REFS = [
  { label: "Unicode Technical Standard #51 — Emoji Design Guidelines", href: "https://www.unicode.org/reports/tr51/" },
  { label: "Emojipedia — Unicode Emoji Statistics and Official Data", href: "https://emojipedia.org/stats" },
  { label: "Unicode Consortium — Full Emoji List", href: "https://www.unicode.org/emoji/charts/full-emoji-list.html" },
];

export default function Conclusion() {
  return (
    <KSection kicker="The Bottom Line" title="Build the Reactions You Actually Need" dek="Define your intent, pick the right workflow, design for small sizes, export to spec.">
      <div className="fg-prose max-w-2xl mb-9">
        <p>
          Custom emoji creation has moved from niche hobby into a standard part of how communities,
          teams, and individuals communicate online. With 92% of the world’s online population using
          emoji and over 6 trillion messages per month carrying them, the demand for personalized
          expression is not slowing down.
        </p>
        <p>
          Define your intent, choose the right workflow, design with small-size readability in mind,
          and export in the format your platform requires. Your next Discord server, Slack workspace,
          or Twitch community does not have to rely on the same library the rest of the internet uses.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-[var(--line)]">
        <p className="fg-label mb-3">References</p>
        <ul className="space-y-2">
          {REFS.map((r) => (
            <li key={r.href}>
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="fg-link">{r.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </KSection>
  );
}
