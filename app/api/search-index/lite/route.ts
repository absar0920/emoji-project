import { NextResponse } from "next/server";
import { getSearchIndexLite } from "@/lib/mongodb";

// Trimmed index for the eager-loading tools (EmojiPicker, KeyboardTool,
// shortcodes) — ~70% smaller than the full index. Same caching strategy:
// Redis for server compute, Cache-Control for transport.
const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";

export async function GET() {
  const index = await getSearchIndexLite();
  return NextResponse.json(index, {
    headers: { "Cache-Control": CACHE_CONTROL },
  });
}
