import { KSection } from "./Section";

const APPS = [
  { app: "Google Messages", platform: "Android", works: true, how: "Native Gboard integration" },
  { app: "WhatsApp", platform: "Android & iOS", works: true, how: "Sends as image sticker" },
  { app: "Telegram", platform: "Android & iOS", works: true, how: "Sends as image" },
  { app: "Messenger", platform: "Android & iOS", works: true, how: "Sends as image" },
  { app: "Snapchat", platform: "Android", works: true, how: "Sends as image in chat" },
  { app: "Discord", platform: "Android & iOS", works: true, how: "Sends as image attachment" },
  { app: "TikTok Comments", platform: "Android", works: true, how: "Copy-paste method" },
  { app: "Instagram DMs", platform: "Android", works: true, how: "Sends as image" },
  { app: "Gmail (compose)", platform: "Android", works: true, how: "Inserts as inline image" },
  { app: "iMessage", platform: "iOS (web method)", works: null, how: "Share saved sticker image" },
  { app: "Instagram Comments", platform: "Any", works: false, how: "Plain text field only" },
  { app: "Twitter/X", platform: "Any", works: false, how: "Plain text field only" },
  { app: "Facebook Status", platform: "Any", works: false, how: "Plain text field only" },
];

function Status({ works }: { works: boolean | null }) {
  const label = works === true ? "Yes" : works === false ? "No" : "Partial";
  const color = works === true ? "var(--good)" : works === false ? "var(--bad)" : "var(--warn)";
  return <span className="mono text-[0.66rem] uppercase tracking-[0.1em]" style={{ color }}>{label}</span>;
}

export default function SupportedApps() {
  return (
    <KSection kicker="Compatibility" title="Where Emoji Kitchen Works — and Where It Doesn't" dek="Works in any app that accepts image messages; fails in plain text fields.">
      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>App</th><th>Platform</th><th>Works?</th><th>How</th></tr>
          </thead>
          <tbody>
            {APPS.map((row) => (
              <tr key={row.app}>
                <td className="strong whitespace-nowrap">{row.app}</td>
                <td className="muted whitespace-nowrap">{row.platform}</td>
                <td><Status works={row.works} /></td>
                <td className="muted">{row.how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Why It Fails in Comments</span>
        <p>Instagram comments, Twitter/X compose boxes, and Facebook status fields are plain text inputs that accept only Unicode characters. Kitchen stickers are PNG images — there&apos;s no way to embed an image inline. Messaging apps work because they treat text, stickers, and images as parallel input types.</p>
      </div>
    </KSection>
  );
}
