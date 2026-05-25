import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";
const SITEMAP_COUNT = 18; // IDs 0-17

export async function GET() {
  const entries = Array.from({ length: SITEMAP_COUNT }, (_, i) =>
    `  <sitemap>
    <loc>${SITE_URL}/sitemap/${i}.xml</loc>
  </sitemap>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
