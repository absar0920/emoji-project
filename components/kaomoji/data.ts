// The kaomoji corpus that powers the interactive browser, transcribed from the
// category tables in the guide. `use` = "best used for" (or the animal, for the
// animal set; omitted for decorative dividers).

export interface KaomojiEntry {
  k: string;
  meaning: string;
  use?: string;
}

export interface KaomojiCategory {
  id: string;
  label: string;
  intro: string;
  entries: KaomojiEntry[];
}

export const KAOMOJI_CATEGORIES: KaomojiCategory[] = [
  {
    id: "happy",
    label: "Happy",
    intro:
      "Use these when you want to express genuine joy, celebration, enthusiasm, or a friendly greeting. The ^ eyes are the universal happiness signal.",
    entries: [
      { k: "(^_^)", meaning: "Classic happy face", use: "Friendly greeting, general happiness" },
      { k: "(*^▽^*)", meaning: "Gleeful, sparkling joy", use: "Exciting news, celebrations" },
      { k: "(＾▽＾)", meaning: "Big open smile", use: "Enthusiastic agreement" },
      { k: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", meaning: "Throwing sparkles, elated", use: "Amazing news, pure excitement" },
      { k: "٩(◕‿◕｡)۶", meaning: "Both arms up, beaming", use: "Victory, overwhelming happiness" },
      { k: "(*≧ω≦)", meaning: "Grinning wide", use: "Teasing happiness, playful joy" },
      { k: "(✿◠‿◠)", meaning: "Flower girl, sweet smile", use: "Gentle happiness, feminine joy" },
      { k: "ヽ(•‿•)ノ", meaning: "Cheering with arms up", use: "Encouragement, celebration" },
      { k: "(≧◡≦)", meaning: "Squinting with joy", use: "Cute happiness, giggly" },
      { k: "♪(๑ᴖ◡ᴖ๑)♪", meaning: "Singing happily", use: "Music, carefree mood" },
    ],
  },
  {
    id: "sad",
    label: "Sad",
    intro:
      "Use these for genuine sadness, disappointment, heartbreak, or those moments when words alone do not capture how low you feel. The T or ; eyes signal tears.",
    entries: [
      { k: "(T_T)", meaning: "Classic crying face", use: "General sadness, disappointment" },
      { k: "(╥﹏╥)", meaning: "Overwhelmed with sadness", use: "Deep sadness, heartbreak" },
      { k: "(；ω；)", meaning: "Quietly crying", use: "Gentle sadness, moved to tears" },
      { k: "(´；ω；`)", meaning: "Struggling not to cry", use: "Bittersweet, trying to hold it together" },
      { k: "(｡•́︿•̀｡)", meaning: "Downcast, forlorn", use: "Loneliness, longing" },
      { k: "(ಥ_ಥ)", meaning: "Crying hard", use: "Overwhelmed emotion" },
      { k: "(╯︵╰,)", meaning: "Head bowed, defeated", use: "Resignation, giving up" },
      { k: "(っ˘̩╮˘̩)っ", meaning: "Reaching out while crying", use: "Needing comfort, vulnerability" },
      { k: "(⌣̩̩́_⌣̩̩̀)", meaning: "Quietly sad", use: "Subtle sadness, melancholy" },
      { k: "( ╥ω╥ )", meaning: "Big crying face", use: "Dramatic sadness, playful woe" },
    ],
  },
  {
    id: "angry",
    label: "Angry",
    intro:
      "Use these when you are annoyed, furious, or have hit your limit. The 皿 mouth character means gritting teeth. The table flip is the most dramatic option in the entire kaomoji vocabulary.",
    entries: [
      { k: "(╬▔皿▔)", meaning: "Seething anger", use: "Intense frustration, suppressed rage" },
      { k: "(╯°□°）╯︵ ┻━┻", meaning: "Table flip", use: "Absolute loss of patience" },
      { k: "(ง •̀_•́)ง", meaning: "Fighting stance", use: "Determined anger, ready to confront" },
      { k: "(ﾒ` ﾛ ´)", meaning: "Sharp glare", use: "Cold anger, disapproval" },
      { k: "(≧皿≦)", meaning: "Screaming mad", use: "Loud frustration, outrage" },
      { k: "(¬_¬)", meaning: "Side eye, annoyed", use: "Passive irritation, skepticism" },
      { k: "٩(╬▌▐)۶", meaning: "Both fists raised", use: "Extreme anger" },
      { k: "(凸ಠ益ಠ)凸", meaning: "Double middle finger", use: "Maximum frustration" },
    ],
  },
  {
    id: "cute",
    label: "Cute & Shy",
    intro:
      "These capture the kawaii aesthetic at its purest: soft expressions, wide or half-hidden eyes, and a sense of gentle vulnerability. The blushing marks // or ;; are the signature detail.",
    entries: [
      { k: "(´・ω・`)", meaning: "Slightly sad cuteness", use: "Gentle sadness, seeking comfort" },
      { k: "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", meaning: "Blushing, flustered", use: "Embarrassed, receiving a compliment" },
      { k: "(◍•ᴗ•◍)", meaning: "Round cute face", use: "Overwhelmingly adorable" },
      { k: "(*꒦ ꒵꒦)", meaning: "Shy and downcast", use: "Shyness, self-consciousness" },
      { k: "(灬º‿º灬)♡", meaning: "Sweet smile with heart", use: "Affectionate cuteness" },
      { k: "(っ˘ω˘ς )", meaning: "Soft and gentle", use: "Cozy, sleepy cute" },
      { k: "(ᗒᗨᗕ)", meaning: "Wide cute grin", use: "Playful adorableness" },
      { k: "(˶˃ ᵕ ˂˶)", meaning: "Small shy face", use: "Quiet shyness" },
      { k: "( ˘ ³˘)♥", meaning: "Sending a kiss", use: "Affectionate, flirty" },
      { k: "(ɔˆ ³(ˆ⌣ˆc)", meaning: "Kissing cheeks", use: "Playful affection" },
    ],
  },
  {
    id: "love",
    label: "Love",
    intro:
      "Use these to express warmth, care, romance, or the specific joy of wanting to give someone a hug through a screen.",
    entries: [
      { k: "(｡♥‿♥｡)", meaning: "Love-struck face", use: "Romantic feelings, deep affection" },
      { k: "(づ｡◕‿‿◕｡)づ", meaning: "Reaching out for a hug", use: "Offering comfort, wanting closeness" },
      { k: "(ˆ⌣ˆ)♡", meaning: "Content with a heart", use: "Quiet love, peaceful affection" },
      { k: "♡(˘▽˘>ʃƪ)", meaning: "Sharing a heart", use: "Sending love" },
      { k: "❤(ˆ‿ˆ)❤", meaning: "Surrounded by hearts", use: "Overflowing love" },
      { k: "(´ ε ` )♡", meaning: "Sending a kiss", use: "Romantic affection" },
      { k: "(♡˙︶˙♡)", meaning: "Heart eyes", use: "Infatuated, adoring" },
      { k: "♡(｡- ω -)♡", meaning: "Dreamy love", use: "Gentle romantic feeling" },
    ],
  },
  {
    id: "shrug",
    label: "Shrug & Confused",
    intro:
      "The shruggie — ¯\\_(ツ)_/¯ — is the single most recognized kaomoji in Western internet culture. The ツ character is the Japanese katakana syllable “tsu,” which happens to look exactly like a smiling face. The arms complete the shrug.",
    entries: [
      { k: "¯\\_(ツ)_/¯", meaning: "The Shruggie", use: "Indifference, I don’t know, resigned acceptance" },
      { k: "(¯―¯٥)", meaning: "Uncertain, trailing off", use: "Unsure, mild confusion" },
      { k: "(・_・?)", meaning: "Puzzled", use: "Genuine confusion, thinking" },
      { k: "(°ω°?)", meaning: "Wide-eyed confusion", use: "Surprised confusion" },
      { k: "(´。• ᵕ •。`)", meaning: "Soft confusion", use: "Gentle puzzlement" },
      { k: "¯(°_o)/¯", meaning: "Dramatic shrug", use: "Exasperated, no idea at all" },
      { k: "(￢_￢)", meaning: "Skeptical look", use: "Doubt, suspicion" },
      { k: "(　ˇωˇ)", meaning: "Blank stare", use: "Waiting for an explanation" },
    ],
  },
  {
    id: "animal",
    label: "Animals",
    intro:
      "Animal kaomoji use character combinations that visually suggest ears, whiskers, snouts, and fur. Cat kaomoji are the most developed category, driven by decades of Japanese cat internet culture.",
    entries: [
      { k: "(=^･ω･^=)", meaning: "Happy cat face", use: "Cat" },
      { k: "(ΦωΦ)", meaning: "Proud cat, slightly smug", use: "Cat" },
      { k: "(=｀ω´=)", meaning: "Fierce cat, displeased", use: "Cat" },
      { k: "ʕ•ᴥ•ʔ", meaning: "Shrug Bear, affectionate bear hug energy", use: "Bear" },
      { k: "ʕ•́ᴥ•̀ʔっ", meaning: "Worried bear", use: "Bear" },
      { k: "((/)(-_-)(/))", meaning: "Classic bunny with ears", use: "Bunny" },
      { k: "(ᵔᴥᵔ)", meaning: "Happy dog", use: "Dog" },
      { k: "ᓚᘏᗢ", meaning: "The most popular seal kaomoji", use: "Seal" },
      { k: ">°)))彡", meaning: "Swimming fish", use: "Fish" },
      { k: "(⌒▽⌒)☆", meaning: "Excited sparkle character", use: "Star creature" },
      { k: "(ˇ෴ˇ)", meaning: "Chubby hamster face", use: "Hamster" },
      { k: "/ᐠ｡ꞈ｡ᐟ\\", meaning: "Fluffy cat with ears", use: "Cat" },
      { k: "(•ᴗ•)ノ", meaning: "Happy bird waving", use: "Bird" },
    ],
  },
  {
    id: "sleepy",
    label: "Sleepy",
    intro:
      "Use these when you are exhausted, finished with the day, or done with a conversation in the most polite way possible.",
    entries: [
      { k: "(￣o￣) zzZ", meaning: "Sleeping deeply", use: "Goodnight, completely exhausted" },
      { k: "(－_－) zzZ", meaning: "Dozing off", use: "Falling asleep mid-conversation" },
      { k: "(=_=)", meaning: "Tired, heavy-eyed", use: "Low energy, want to sleep" },
      { k: "(´-ω-`)", meaning: "Drowsy, peaceful", use: "Comfortable tiredness" },
      { k: "(_ _)｡z Z", meaning: "Face down, asleep", use: "Completely knocked out" },
    ],
  },
  {
    id: "fighting",
    label: "Fighting",
    intro:
      "These express battle readiness, fierce determination, or the specific energy of someone who has decided they are going to do something regardless of the obstacles.",
    entries: [
      { k: "(ง •̀_•́)ง", meaning: "Ready to fight", use: "Maximum determination, challenge accepted" },
      { k: "(ง'̀-'́)ง", meaning: "Fists raised", use: "Aggressive determination" },
      { k: "ヽ(`Д´)ﾉ", meaning: "Furious and ready", use: "Angry fight energy" },
      { k: "(ง •̀灬•́)ง", meaning: "Intense fighting stance", use: "Fierce, unbreakable resolve" },
      { k: "(｀∀´)Ψ", meaning: "Evil grin, scheming", use: "Mischievous determination" },
    ],
  },
  {
    id: "embarrassed",
    label: "Embarrassed",
    intro:
      "Blushing marks appear as // or ;; placed near the cheeks. These kaomoji carry the core kawaii emotional register of vulnerability and sweetness.",
    entries: [
      { k: "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", meaning: "Deep blush", use: "Receiving unexpected praise" },
      { k: "(〃ω〃)", meaning: "Blushing hard", use: "Shy happiness, embarrassment" },
      { k: "(///▽///)", meaning: "Beet red, flustered", use: "Maximum embarrassment" },
      { k: "(*^.^*)", meaning: "Gentle blush", use: "Soft embarrassment, touched" },
      { k: "(⌒▽⌒✿)", meaning: "Blushing with flower", use: "Sweet flustered happiness" },
      { k: "(｡•ˇ‸ˇ•｡)", meaning: "Bashful, looking down", use: "Quiet embarrassment" },
    ],
  },
  {
    id: "surprised",
    label: "Surprised",
    intro:
      "The ロ or □ mouth character signals an open, shocked mouth. The Σ symbol at the start of a kaomoji means sudden shock or realization.",
    entries: [
      { k: "(°ロ°)", meaning: "Shocked face", use: "Sudden surprise" },
      { k: "Σ(°△°)", meaning: "Sudden shock or realization", use: "Startled, sudden realization" },
      { k: "(⊙_⊙)", meaning: "Wide-eyed stare", use: "Disbelief, stunned" },
      { k: "(ﾟДﾟ)", meaning: "Open-mouthed shock", use: "Genuine disbelief" },
      { k: "w(°ｏ°)w", meaning: "Surprised with arms out", use: "Startled, caught off guard" },
    ],
  },
  {
    id: "angel",
    label: "Angel",
    intro:
      "These use halo symbols and soft expressions to signal purity, innocence, or the specific energy of someone pretending they did absolutely nothing wrong.",
    entries: [
      { k: "(｀・ω・´)\"", meaning: "Innocent look", use: "Pretending to be angelic" },
      { k: "(^_^)v", meaning: "Victory sign, pure", use: "Wholesome success" },
      { k: "(/^▽^)/", meaning: "Angel wings gesture", use: "Pure joy, blessing energy" },
      { k: "☆*:.｡.o(≧▽≦)o.｡.:*☆", meaning: "Full sparkle angel", use: "Maximum innocence and joy" },
    ],
  },
  {
    id: "sparkle",
    label: "Star & Sparkle",
    intro:
      "These use Unicode star and sparkle characters as core design elements. They appear frequently in aesthetic bios, decorative borders, and kaomoji dividers.",
    entries: [
      { k: "✧٩(◕‿◕｡)۶✧", meaning: "Surrounded by stars", use: "Magical excitement" },
      { k: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", meaning: "Throwing sparkles", use: "Celebration, giving energy to someone" },
      { k: "☆(ゝω･)v", meaning: "Star wink", use: "Playful, charming" },
      { k: "(★^O^★)", meaning: "Star eyes", use: "Starstruck, amazed" },
      { k: "✨(ᗒᗨᗕ)✨", meaning: "Sparkle grin", use: "Pure sparkling happiness" },
    ],
  },
  {
    id: "dividers",
    label: "Dividers",
    intro:
      "These are not faces but decorative text art used in bios, headers, Discord profiles, and social media posts. They are some of the highest-search-volume kaomoji-adjacent content.",
    entries: [
      { k: "·͜·♡", meaning: "Simple heart divider" },
      { k: "⋆｡°✩ ⋆｡°✩", meaning: "Star sparkle repeat" },
      { k: "━━━━━━━━━━━━━", meaning: "Clean line" },
      { k: "꒰ ꒱", meaning: "Soft bracket pair" },
      { k: "✦ ✧ ✦ ✧ ✦", meaning: "Alternating star divider" },
      { k: "·˚ ༘ ₊˚ˑ", meaning: "Aesthetic dot pattern" },
      { k: "≪ · · ≫", meaning: "Arrow style divider" },
    ],
  },
];

// Flat list for search across every category.
export const ALL_KAOMOJI: (KaomojiEntry & { category: string })[] =
  KAOMOJI_CATEGORIES.flatMap((c) => c.entries.map((e) => ({ ...e, category: c.label })));
