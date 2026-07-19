import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Same-origin download proxy for Emoji Kitchen stickers.
//
// The picker's result_url is a cross-origin gstatic.com URL, and the HTML
// `download` attribute is ignored cross-origin — the browser just navigates to
// the image. This route fetches the sticker server-side and re-serves it from
// our own origin with Content-Disposition: attachment, so it downloads reliably
// in every browser regardless of gstatic's CORS config.
//
// The host is allowlisted so this can't be used as an open proxy / SSRF vector.
function isAllowedHost(hostname: string): boolean {
  return hostname === "gstatic.com" || hostname.endsWith(".gstatic.com");
}

// Keep filenames filesystem-safe: lowercase, hyphen-joined slugs only.
function safeName(raw: string | null): string {
  const cleaned = (raw || "").toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "emoji-kitchen";
}

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (target.protocol !== "https:" || !isAllowedHost(target.hostname)) {
    return NextResponse.json({ error: "url not allowed" }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(target, { cache: "no-store" });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") || "";
  if (!upstream.ok || !contentType.startsWith("image/")) {
    return NextResponse.json({ error: "not an image" }, { status: 502 });
  }

  const filename = `${safeName(req.nextUrl.searchParams.get("name"))}.png`;

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      // The gstatic stickers are immutable; let the browser/CDN cache the proxy.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
