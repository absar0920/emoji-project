import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(
  bytes: Buffer,
  mimeType: string,
  opts: { folder?: string; tags?: string[] } = {}
): Promise<{ url: string; publicId: string }> {
  const folder = opts.folder || process.env.CLOUDINARY_UPLOAD_FOLDER || "blog";
  // Must be a CONCRETE mime (e.g. image/png) — a wildcard like image/* makes
  // Cloudinary fail to parse the data URI and fall back to treating the whole
  // base64 string as a file path (ENAMETOOLONG). The caller validates mimeType.
  const dataUri = `data:${mimeType};base64,${bytes.toString("base64")}`;
  const res = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: "image",
    ...(opts.tags ? { tags: opts.tags } : {}),
  });
  return { url: res.secure_url, publicId: res.public_id };
}

export interface EmojiImage {
  /** Display URL (cropped quadrant, trimmed, padded to a centered square). */
  url: string;
  /** Same image with fl_attachment so a click downloads instead of navigating. */
  download: string;
}

// Gemini returns the 4 emoji variations as a single 2x2 grid image. Rather than
// pull in an image library to slice it, we derive four quadrant URLs from the
// one uploaded grid via pure Cloudinary transformations (zero extra generation
// cost): crop one 50%x50% cell by gravity, trim the transparent margin, then
// pad back to a centered 512² square.
const QUADRANTS = ["north_west", "north_east", "south_west", "south_east"] as const;

export function gridQuadrantImages(publicId: string): EmojiImage[] {
  return QUADRANTS.map((gravity) => {
    const base = [
      { width: 0.5, height: 0.5, crop: "crop", gravity },
      { effect: "trim:10" },
      { width: 512, height: 512, crop: "pad", background: "transparent" },
    ];
    return {
      url: cloudinary.url(publicId, { secure: true, transformation: base }),
      download: cloudinary.url(publicId, {
        secure: true,
        transformation: [...base, { flags: "attachment" }],
      }),
    };
  });
}
