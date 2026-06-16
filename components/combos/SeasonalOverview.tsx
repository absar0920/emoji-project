import { KSection } from "@/components/kitchen/Section";

const ROWS: [string, string, string, string][] = [
  ["☀️ Summer", "🌊☀️🍉", "🌴🍹✨", "July–August captions, beach posts"],
  ["🍂 Fall", "🍂🎃☕", "🌾🕯️🍁", "September–November bios, cozy posts"],
  ["❄️ Winter", "❄️🤍🕯️", "☃️🧤🍫", "December–February status, holiday posts"],
  ["🌸 Spring", "🌸🌿🐝", "🌷☁️🌼", "March–May captions, fresh start posts"],
  ["🎃 Halloween", "🎃🕷️🌙", "🦇👻🖤", "October bios, spooky content"],
  ["🎄 Christmas", "🎄✨🎁", "⛄🧣🕯️", "December posts, holiday greetings"],
  ["💝 Valentine's", "💌🌹💗", "🫶🍓✨", "February captions, couples posts"],
  ["🦃 Thanksgiving", "🍂🦃🍁", "🥧🕯️🍂", "November posts, gratitude captions"],
  ["🎆 New Year", "🥂✨🎆", "🌙🎉💫", "NYE posts, new year bios"],
  ["🌹 Mother's Day", "💐🤱🌸", "💌🌹🫂", "May tribute posts"],
];

export default function SeasonalOverview() {
  return (
    <KSection
      kicker="Section 04"
      title="Seasonal &amp; Holiday Combos"
      dek="Refresh your bio and captions through the year — a signal your account is active and current."
    >
      <div className="fg-table-wrap">
        <table className="fg-table">
          <thead>
            <tr><th>Season / Holiday</th><th>Top Combo</th><th>Backup Combo</th><th>Best For</th></tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td className="text-xl whitespace-nowrap">{r[1]}</td>
                <td className="text-xl whitespace-nowrap">{r[2]}</td>
                <td className="muted">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-muted font-read mt-5 max-w-2xl text-sm">
        The Summer, Halloween, and Christmas sets — plus every aesthetic and platform set — are all
        click-to-copy in the browser at the top of this page.
      </p>
    </KSection>
  );
}
