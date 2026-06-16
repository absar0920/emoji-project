import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/mongodb";

// Redis (in getSearchIndex) owns server-side freshness; this header lets the
// browser/CDN serve repeat loads without hitting the server at all.
const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";

export async function GET() {
  const index = await getSearchIndex();
  return NextResponse.json(index, {
    headers: { "Cache-Control": CACHE_CONTROL },
  });
}
