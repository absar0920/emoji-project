import { NextRequest, NextResponse } from "next/server";
import { getSearchIndexLite } from "@/lib/mongodb";
import { enforceRateLimit } from "@/lib/ratelimit";

// Trimmed index for the eager-loading tools (EmojiPicker, KeyboardTool,
// shortcodes) — ~70% smaller than the full index. Same caching strategy:
// Redis for server compute, Cache-Control for transport.
const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";

export async function GET(req: NextRequest) {
  // Loose per-IP cap to blunt scraping loops that bypass the CDN. Fails open.
  const blocked = await enforceRateLimit(req, "public");
  if (blocked) return blocked;

  const index = await getSearchIndexLite();
  return NextResponse.json(index, {
    headers: { "Cache-Control": CACHE_CONTROL },
  });
}
