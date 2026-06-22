import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Emoji Meaning — Every Emoji, Decoded.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f2e9",
          fontFamily: "sans-serif",
          color: "#1a1714",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 200,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: 16,
            border: "3px solid #1a1714",
          }}
        >
          <img src={logoSrc} width={176} height={176} alt="" />
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 36 }}>Emoji Meaning</div>
        <div style={{ fontSize: 28, opacity: 0.7, marginTop: 12 }}>
          Every Emoji, Decoded.
        </div>
      </div>
    ),
    { ...size }
  );
}
