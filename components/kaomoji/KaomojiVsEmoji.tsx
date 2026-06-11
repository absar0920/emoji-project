import { KSection } from "@/components/kitchen/Section";

const ROWS: [string, string, string, string][] = [
  ["Made from", "Unicode text characters", "Graphic images", "Basic ASCII characters"],
  ["Read direction", "Upright, face-on", "Not applicable (image)", "Sideways (tilted)"],
  ["Renders same everywhere", "Yes, pure text", "No, varies by OS", "Yes, pure text"],
  ["First created", "1986, Japan", "1999, Japan (NTT DoCoMo)", "1982, USA (Dr. Scott Fahlman)"],
  ["Works in plain text files", "Yes", "Sometimes (may show as box)", "Yes"],
  ["Expressiveness range", "Very high", "High", "Low"],
  ["Platform dependency", "None", "High (Apple vs Android differ)", "None"],
  ["Requires image support", "No", "Yes", "No"],
  ["Example", "(^_^)", "😊", ":-)"],
];

export default function KaomojiVsEmoji() {
  return (
    <KSection
      kicker="Comparison"
      title="Kaomoji vs Emoji vs Emoticon"
      dek="Three terms used interchangeably online — and the differences that actually matter."
    >
      <div className="fg-prose max-w-2xl mb-8">
        <p>These three terms get used interchangeably online. They are not the same thing, and the differences matter when you are choosing which one to use.</p>
      </div>

      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Feature</th><th>Kaomoji</th><th>Emoji</th><th>Emoticon</th></tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fg-prose max-w-2xl">
        <p>Emoji were designed by Shigetaka Kurita at NTT DoCoMo in 1999, partly inspired by kaomoji culture. The word emoji comes from the same Japanese root as kaomoji: e (絵) meaning picture, and moji (文字) meaning character. The surface similarity between “emoji” and the English word “emotion” is a coincidence that helped the word catch on globally.</p>
      </div>
    </KSection>
  );
}
