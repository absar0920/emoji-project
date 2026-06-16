// The combo corpus that powers the interactive browser, transcribed from the
// copy-paste tables in the guide. Each entry: the emoji combo + its vibe/use.

export interface ComboEntry {
  combo: string;
  vibe: string;
}

export interface ComboCategory {
  id: string;
  label: string;
  group: string;
  intro?: string;
  entries: ComboEntry[];
}

export const COMBO_CATEGORIES: ComboCategory[] = [
  {
    id: "soft-sweet",
    label: "Soft & Sweet",
    group: "Cute",
    intro:
      "The most searched and most saved category across every platform — warm, soft, approachable combos for bios, captions, and messages to friends.",
    entries: [
      { combo: "🌸🍵🌿", vibe: "cozy morning energy, slow living vibes" },
      { combo: "🎀💗🍬", vibe: "sweet, girly, pink aesthetic" },
      { combo: "🌷🤍✨", vibe: "clean girl, fresh, minimal" },
      { combo: "🍓🌸💫", vibe: "fruity, playful, spring energy" },
      { combo: "🐣💛🌼", vibe: "new beginnings, gentle happiness" },
      { combo: "🫧💙🌊", vibe: "calm, cool, light blue aesthetic" },
      { combo: "🍦🎠🌸", vibe: "dreamy, pastel, nostalgic" },
      { combo: "🌙🌸🍃", vibe: "soft night, peaceful, feminine" },
    ],
  },
  {
    id: "cute-bio",
    label: "Cute for Bio",
    group: "Cute",
    entries: [
      { combo: "🌙✨🫧", vibe: "dreamy bio opener, ethereal" },
      { combo: "🎀🌸💗", vibe: "coquette bio staple" },
      { combo: "☁️🤍🌿", vibe: "minimal, clean, soft aesthetic" },
      { combo: "🌻🍯✨", vibe: "warm golden aesthetic" },
      { combo: "💐🌷🎀", vibe: "floral, romantic, feminine" },
      { combo: "🍵🌿📖", vibe: "studious cozy vibes" },
      { combo: "🌊🐚🤍", vibe: "beach girl, coastal energy" },
      { combo: "🍋🌼☀️", vibe: "sunny, cheerful, bright aesthetic" },
    ],
  },
  {
    id: "cute-couple",
    label: "For Bf / Gf",
    group: "Cute",
    entries: [
      { combo: "🫂💗🌙", vibe: "late night together, warm hug" },
      { combo: "💌🌹✨", vibe: "romantic, sending love" },
      { combo: "🫶💗🌸", vibe: "heart hands, gentle affection" },
      { combo: "🌙💕🐻", vibe: "goodnight combo for your person" },
      { combo: "☕🌅💛", vibe: "good morning text combo" },
      { combo: "💍🌹🥂", vibe: "romantic milestone, celebration" },
    ],
  },
  {
    id: "funny",
    label: "Funny",
    group: "Funny",
    intro:
      "Funny combos work when the combination creates an unexpected image, a relatable situation, or an absurdist non-sequitur. The best have a punchline built into the sequence — the third or fourth emoji delivers the twist.",
    entries: [
      { combo: "🧍💀📞", vibe: "standing there dead inside but answering anyway" },
      { combo: "🫠☕🔁", vibe: "melting without coffee, repeat cycle" },
      { combo: "🐸🪑🍵", vibe: "sitting and minding business, Kermit energy" },
      { combo: "😭🔥📚", vibe: "studying is destroying me" },
      { combo: "🧠💨🪟", vibe: "brain left the building" },
      { combo: "🛌📱😂", vibe: "3am in bed scrolling alone, classic" },
      { combo: "🚶💨🏃", vibe: "started walking, then sprinting away from problems" },
      { combo: "😤👊🗑️", vibe: "that idea? trash. moving on." },
      { combo: "🎭🧍🚪", vibe: "putting on a face, then leaving" },
      { combo: "🪄🙂💀", vibe: "magically fine until suddenly not" },
      { combo: "🐧🏃💨", vibe: "waddling away at full speed" },
      { combo: "💅🪨😐", vibe: "unbothered, literally made of stone" },
    ],
  },
  {
    id: "coquette",
    label: "Coquette",
    group: "Aesthetic",
    intro:
      "Built on ribbons, roses, pink, and soft femininity with an edge — the most-searched aesthetic category in 2026.",
    entries: [
      { combo: "🎀🌸💗", vibe: "core coquette bio combo" },
      { combo: "🎀🕊️💌", vibe: "romantic, letter-writing energy" },
      { combo: "🌹🖤🎀", vibe: "dark coquette, dramatic romance" },
      { combo: "🫧🎀🍒", vibe: "soft but with bite" },
      { combo: "💌🌷🎀", vibe: "writing love letters in spring" },
      { combo: "🍓🎀🌸", vibe: "sweet and feminine" },
    ],
  },
  {
    id: "dark-academia",
    label: "Dark Academia",
    group: "Aesthetic",
    intro:
      "Books, candlelight, ancient architecture, and intellectual melancholy. The palette runs warm-dark: brown, burgundy, amber, and ink black.",
    entries: [
      { combo: "📖🕯️🍂", vibe: "reading by candlelight in autumn" },
      { combo: "🖋️📜🌙", vibe: "writing late at night" },
      { combo: "☕📚🌿", vibe: "library afternoon energy" },
      { combo: "🌧️🪟📖", vibe: "rain outside, reading inside" },
      { combo: "🦉🌑📜", vibe: "midnight studies, gothic scholar" },
      { combo: "🍷🖋️🌹", vibe: "dramatic, literary, brooding" },
    ],
  },
  {
    id: "cottagecore",
    label: "Cottagecore",
    group: "Aesthetic",
    intro:
      "Nature, slow living, wildflowers, baking, and rural simplicity. These combos feel like summer afternoons with no plans.",
    entries: [
      { combo: "🌾🍄🌿", vibe: "meadow foraging vibes" },
      { combo: "🫖🌸🐝", vibe: "garden tea, honey and flowers" },
      { combo: "🍞🧈🌼", vibe: "morning baking, simple joy" },
      { combo: "🌧️🌿☁️", vibe: "soft rainy day in the countryside" },
      { combo: "🦋🌸🍯", vibe: "wildflower garden, golden hour" },
      { combo: "🌻🏡🌿", vibe: "cottage life, sunflower garden" },
    ],
  },
  {
    id: "y2k",
    label: "Y2K",
    group: "Aesthetic",
    entries: [
      { combo: "💿🪩✨", vibe: "disco revival, early 2000s energy" },
      { combo: "📱💋🌀", vibe: "flip phone era nostalgia" },
      { combo: "⭐🔮💜", vibe: "cosmic Y2K, mystical pop" },
      { combo: "🪩💗🌟", vibe: "club night, shiny and pink" },
      { combo: "📸🌈✌️", vibe: "vintage camera, optimistic pop" },
      { combo: "💅⚡🌀", vibe: "attitude, electric, chaotic cute" },
    ],
  },
  {
    id: "baddie",
    label: "Baddie",
    group: "Aesthetic",
    entries: [
      { combo: "💅🖤🔥", vibe: "unbothered, hot, unbothered again" },
      { combo: "💋👑🌹", vibe: "queen energy, no apologies" },
      { combo: "🖤💎✨", vibe: "dark luxury aesthetic" },
      { combo: "🚬🖤🪩", vibe: "edgy, nightlife, cool girl" },
      { combo: "👁️🖤🔮", vibe: "mysterious, dark feminine energy" },
      { combo: "💰🖤👑", vibe: "boss, money, power" },
    ],
  },
  {
    id: "kawaii",
    label: "Kawaii",
    group: "Aesthetic",
    entries: [
      { combo: "🐰💗🌸", vibe: "bunny soft kawaii energy" },
      { combo: "🍡🌸🎀", vibe: "Japanese sweet shop aesthetic" },
      { combo: "🧸💕🌈", vibe: "stuffed animals and pastel rainbows" },
      { combo: "🍑🌸🐾", vibe: "cute animal print, peachy softness" },
      { combo: "🌟🍬🦋", vibe: "magical candy aesthetic" },
      { combo: "🌸🎐🍵", vibe: "spring festival, Japanese inspired" },
    ],
  },
  {
    id: "preppy",
    label: "Preppy",
    group: "Aesthetic",
    entries: [
      { combo: "🎾🤍🏄", vibe: "east coast summer, athletic clean" },
      { combo: "⛵🌊🐚", vibe: "sailing club energy" },
      { combo: "📚🍋🌿", vibe: "ivy league study aesthetic" },
      { combo: "🐋🌊🤍", vibe: "nautical, classic preppy" },
      { combo: "🍦🌞🎪", vibe: "summer fair, wholesome fun" },
      { combo: "🌸🎀📐", vibe: "cute and organized, school aesthetic" },
    ],
  },
  {
    id: "instagram",
    label: "Instagram",
    group: "Platform",
    intro:
      "Instagram bios have 150 characters; most high-performing bios use combos as visual line-breaks between pieces of information. The combo sets the tone before the words do.",
    entries: [
      { combo: "🌸✨🎀", vibe: "soft feminine IG bio opener" },
      { combo: "📍🌍✈️", vibe: "travel lover, location + wanderlust" },
      { combo: "🎵🎧🌙", vibe: "music lover, night owl" },
      { combo: "📸🌿☕", vibe: "photographer, nature, coffee aesthetic" },
    ],
  },
  {
    id: "tiktok",
    label: "TikTok",
    group: "Platform",
    intro:
      "TikTok's 80-character bio forces economy. The strongest bios say everything with three emojis and leave room for a handle or tagline.",
    entries: [
      { combo: "💀🎵✨", vibe: "chaotic music lover, Gen Z energy" },
      { combo: "🎬📱💫", vibe: "content creator signal" },
      { combo: "🌸🤍🌙", vibe: "soft aesthetic, minimal TikTok bio" },
      { combo: "🔥💅🖤", vibe: "baddie TikTok energy" },
    ],
  },
  {
    id: "discord",
    label: "Discord",
    group: "Platform",
    intro:
      "Discord combos live in status messages, server descriptions, and channel names. They lean slightly longer and into humor, gaming culture, or specific server themes.",
    entries: [
      { combo: "🎮💀🔫", vibe: "gaming server, competitive energy" },
      { combo: "🌙✨🫧", vibe: "chill server, soft aesthetic status" },
      { combo: "☕📚🌿", vibe: "study server status" },
      { combo: "🔥⚔️🏆", vibe: "competitive server banner energy" },
    ],
  },
  {
    id: "summer",
    label: "Summer",
    group: "Seasonal",
    entries: [
      { combo: "🌊☀️🍉", vibe: "classic summer trio" },
      { combo: "🏖️🐚🌴", vibe: "beach day, tropical" },
      { combo: "🍋☀️🌊", vibe: "lemon summer, Mediterranean vibes" },
      { combo: "🌅🍹🌴", vibe: "sunset cocktail hour" },
    ],
  },
  {
    id: "halloween",
    label: "Halloween",
    group: "Seasonal",
    entries: [
      { combo: "🎃🕷️🌙", vibe: "spooky classic, October bio" },
      { combo: "🦇👻🖤", vibe: "gothic Halloween, dark fun" },
      { combo: "🍬🎭🕸️", vibe: "trick or treat, costume party" },
      { combo: "🌙🔮🦋", vibe: "witchy, mystical October vibes" },
    ],
  },
  {
    id: "christmas",
    label: "Christmas",
    group: "Seasonal",
    entries: [
      { combo: "🎄✨🎁", vibe: "Christmas classic, festive bio" },
      { combo: "⛄🧣☕", vibe: "cozy winter, snowman morning" },
      { combo: "🕯️🍪❄️", vibe: "baking cookies, candlelight winter" },
      { combo: "🎅🤶🔔", vibe: "jolly Christmas, family holiday" },
    ],
  },
];

export const ALL_COMBOS: (ComboEntry & { category: string })[] =
  COMBO_CATEGORIES.flatMap((c) => c.entries.map((e) => ({ ...e, category: c.label })));
