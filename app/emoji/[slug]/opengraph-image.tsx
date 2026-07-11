import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getEmojiBySlug } from "@/lib/mongodb";

export const alt = "Emoji meaning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Weekly ISR: generate each OG image once on first crawl, then serve from cache.
// Empty generateStaticParams => none rendered at build (keeps build fast).
export const revalidate = 604800;
export async function generateStaticParams() {
  return [];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const emoji = await getEmojiBySlug(slug);

  const logo = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  const name = emoji?.name || slug;
  const character = emoji?.character || "❓";
  const description = emoji?.official_meaning?.description || "Emoji meaning";

  return new ImageResponse(
    (
      <div style={{
        background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "white",
      }}>
        <div style={{ fontSize: 180, lineHeight: 1 }}>{character}</div>
        <div style={{ fontSize: 48, fontWeight: 800, marginTop: 20, textAlign: "center" }}>{name} Emoji</div>
        <div style={{ fontSize: 24, opacity: 0.8, marginTop: 12, maxWidth: 800, textAlign: "center" }}>{description.slice(0, 100)}</div>
        <div style={{ fontSize: 18, opacity: 0.85, marginTop: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logoSrc} width={32} height={32} alt="" />
          Emoji Meaning
        </div>
      </div>
    ),
    { ...size }
  );
}
