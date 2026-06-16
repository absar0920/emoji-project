import { KSection } from "@/components/kitchen/Section";

const TOP = [
  "Text-to-speech (TTS) systems read emoji aloud by announcing the emoji's official Unicode description — not the visual symbol. When a TTS engine encounters 🔥, it says “fire emoji” or simply “fire,” depending on the verbosity setting. This has spawned a niche but high-traffic phenomenon: people crafting the longest, most bizarre emoji strings possible to trigger absurdly long TTS readings.",
];

const SUBS = [
  { title: "In group chats", body: "On Discord, iMessage, and group messaging apps, enabling TTS reads all messages aloud, including emoji. Discord's /tts [message] command speaks your text — include 🎉🔥💯 and it reads “party popper fire hundred points.” For accessibility users this can be verbose, so keep emoji purposeful rather than decorative when TTS users may be present." },
  { title: "Roblox", body: "Roblox's built-in TTS reads in-game chat aloud. Pasting long sequences of emoji triggers it to read each description in sequence — multi-minute narrations from a single message. The “longest TTS emoji in Roblox” trend involves 30–50+ emoji; viral examples mixed 🌍🌎🌏 (three globe descriptions), national flags (each a country name), and compound sequences. It's a player-driven exploit, not an intended feature — Roblox periodically updates its emoji-reading behavior." },
  { title: "Xbox", body: "Xbox's Narrator accessibility TTS reads emoji descriptions in messages, bios, and achievement notifications. The “longest TTS emoji on Xbox” challenge fills a gamertag bio or club description with maximum multi-descriptor emoji. Flag emoji and compound emoji like 👨‍👩‍👧‍👦 (“family man woman girl boy”) are especially lengthy spoken aloud." },
  { title: "Voice-to-text", body: "Voice-to-text generally converts speech to words only, but there are exceptions: Siri can insert emoji when you dictate and say the emoji name (“fire emoji” → 🔥 in supported apps), and Gboard offers emoji suggestions in its voice-input row after transcription. Talk-to-text emoji behavior keeps improving in 2026 as AI voice models better understand emoji intent." },
  { title: "“The Emoji Movie” as TTS", body: "A viral genre converts the film's script into entirely emoji-based text, then runs it through TTS — a robotic narration of emoji descriptions rather than dialogue. These circulated widely on YouTube and TikTok as absurdist commentary on the film and on TTS's limitations." },
];

export default function TextToSpeech() {
  return (
    <KSection
      kicker="Section 09"
      title="Text to Speech with Emoji (Group Chat, Roblox, Xbox)"
      dek="TTS reads an emoji's Unicode description aloud — which became its own viral genre."
    >
      <div className="fg-prose max-w-2xl mb-9">
        {TOP.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {SUBS.map((s) => (
        <div key={s.title} className="mb-8 last:mb-0">
          <h3 className="font-display t-ink text-[1.3rem] sm:text-[1.5rem] mb-3">{s.title}</h3>
          <div className="fg-prose max-w-2xl"><p>{s.body}</p></div>
        </div>
      ))}
    </KSection>
  );
}
