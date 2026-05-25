import { NextRequest, NextResponse } from "next/server";
import { callGemini, hashKey } from "@/lib/gemini";
import { connectToDatabase, emojis } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body as { query?: string };

    if (!query || query.length > 300) {
      return NextResponse.json(
        { error: "Query is required (max 300 chars)" },
        { status: 400 }
      );
    }

    const cacheKey = `smart:${hashKey(query)}`;
    const parsed = await callGemini(
      `You are an emoji search engine. The user is searching: "${query}"

Analyze the query and extract:
- search_terms: array of 3-5 emoji names to search for (e.g. ["skull", "crying face", "broken heart"])
- platform: specific platform if mentioned (tiktok/whatsapp/instagram/x/etc) or null
- context: which meaning layer is most relevant: "genz_meaning", "emotional_meaning", "dating_meaning", "sarcastic_meaning", "meme_meaning", "official_meaning", or null
- culture: cultural context if mentioned (e.g. "pakistan_india", "middle_east") or null

Return a JSON object with these fields.`,
      cacheKey
    );

    const searchTerms = (parsed.search_terms as string[]) || [];
    const platform = parsed.platform as string | null;
    const context = parsed.context as string | null;

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ results: [] });
    }

    // Search MongoDB using the extracted terms
    const regexPatterns = searchTerms.map((t) => new RegExp(t, "i"));
    const docs = await emojis(conn.db)
      .find({
        $or: [
          { name: { $in: regexPatterns } },
          { tags: { $in: regexPatterns } },
        ],
      })
      .limit(10)
      .toArray();

    const results = docs.map((doc) => {
      let relevant_meaning = "";
      let why = "";

      // Pick the relevant meaning layer based on context
      if (context && (doc as any)[context]) {
        const layer = (doc as any)[context];
        relevant_meaning =
          layer.interpretation ||
          layer.description ||
          layer.viral_usage ||
          layer.flirt_usage ||
          layer.emotion_type ||
          layer.passive_aggressive_usage ||
          JSON.stringify(layer).slice(0, 150);
        why = `Matched ${context.replace("_", " ")} layer`;
      } else if (platform && (doc as any)[platform]) {
        const platData = (doc as any)[platform];
        relevant_meaning =
          platData.meaning ||
          platData.chat_meaning ||
          platData.bio_usage ||
          JSON.stringify(platData).slice(0, 150);
        why = `${platform} context`;
      } else {
        relevant_meaning =
          doc.genz_meaning?.interpretation ||
          doc.official_meaning?.description ||
          "";
        why = "General meaning";
      }

      return {
        character: doc.character,
        slug: doc.slug,
        name: doc.name,
        relevant_meaning,
        why,
      };
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Smart search error:", err);
    return NextResponse.json({ results: [] });
  }
}
