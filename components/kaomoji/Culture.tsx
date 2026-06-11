import { KSection } from "@/components/kitchen/Section";

const KAWAII = [
  "Kawaii (可愛い), Japan's cultural philosophy of cuteness, is not a superficial trend. It is a deeply embedded aesthetic value that shaped which kaomoji survived and which ones faded. Linguist Ilaria Moschini's research connects the adoption patterns of kaomoji directly to kawaii culture: the soft eyes, round faces, decorative hearts, and vulnerable expressions that dominate the kaomoji vocabulary all map onto kawaii principles.",
  "This is why Japanese kaomoji look so different from Western emoticons even when they express the same emotion. A Western sad face :-( uses a drooping mouth as its primary signal. A Japanese sad kaomoji (T_T) uses tears falling from the eyes. The emotional grammar is different because the cultural visual vocabulary is different.",
];

const GLOBAL = [
  "Kaomoji traveled from Japan to the global internet through several distinct pathways. Tumblr in the early 2010s was a critical bridge: anime fans, K-pop communities, and aesthetic bloggers all used kaomoji in posts, usernames, and bio text. Twitter's character limit made kaomoji efficient emotional shorthand. Discord's text-first community culture gave them a permanent home.",
  "The Roblox community developed its own kaomoji subculture around display names, where creative combinations of Unicode characters compete for attention in a character-limited username field. Instagram bio kaomoji, particularly sparkle dividers and decorative borders, became a standard formatting tool for aesthetic accounts.",
];

const PORTER = [
  "Among all the cultural pathways that brought kaomoji to Western audiences, Porter Robinson's work had the most concentrated impact on a specific community. His Worlds (2014) album visually embraced the kawaii internet aesthetic of early 2010s Japan, and his Nurture (2021) album deepened that connection with warm, handmade digital aesthetics that incorporated kaomoji elements directly into his visual branding.",
  "His fanbase, one of the most visually cohesive communities in electronic music, adopted kaomoji as community identifiers. Searching for “porter robinson kaomoji” still surfaces a substantial body of fan art, decorated social media posts, and community discussion threads. He demonstrated that Japanese text art could function as serious artistic branding in Western contexts.",
];

const Y2K = [
  "The “2026 is the new 2016” cultural trend has pushed early internet aesthetics back into mainstream visibility. Y2K visual culture includes chunky fonts, bright colors, low-resolution graphics, and text-based decorative elements — all of which describe kaomoji perfectly.",
  "A generation that grew up with emoji as the baseline is now encountering kaomoji as something novel and expressive in a way that image-based emoji cannot replicate. The text-based nature of kaomoji reads as raw and authentic in an era saturated with polished graphics. Their manual construction feels artisanal compared to an emoji picker.",
];

const DEV = [
  "Developers have kept a quiet but consistent kaomoji culture running through the 2010s and 2020s in contexts most non-technical users never see.",
  "Git commit messages, README files, documentation headers, and Slack channels inside technology companies regularly feature kaomoji. They serve the same function they always have: adding human emotional context to text that would otherwise read as cold and transactional. A deployment notification that reads “ヾ(＾∇＾) Deploy complete!” communicates success differently than one that reads “Deployment successful.”",
  "In internal Slack and Microsoft Teams channels, kaomoji in casual communication are widely accepted across most technology and creative industries. In client-facing email, use them sparingly and only with established contacts. In formal business documents, skip them entirely.",
];

function Sub({ title, paras }: { title: string; paras: string[] }) {
  return (
    <div className="mt-10 first:mt-0">
      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-4">{title}</h3>
      <div className="fg-prose max-w-2xl">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

export default function Culture() {
  return (
    <KSection
      kicker="Culture"
      title="Kaomoji in Culture and Pop Culture"
      dek="From kawaii philosophy and 2channel to Porter Robinson, Y2K, and commit messages."
    >
      <Sub title="The Kawaii Foundation" paras={KAWAII} />
      <Sub title="From 2channel to the Global Internet" paras={GLOBAL} />
      <Sub title="Porter Robinson and the Western Revival" paras={PORTER} />
      <Sub title="The Y2K Revival: 2025–2026" paras={Y2K} />
      <Sub title="Kaomoji in Professional and Developer Contexts" paras={DEV} />
    </KSection>
  );
}
