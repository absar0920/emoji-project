import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(bytes: Buffer, mimeType: string): Promise<{ url: string }> {
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "blog";
  // Must be a CONCRETE mime (e.g. image/png) — a wildcard like image/* makes
  // Cloudinary fail to parse the data URI and fall back to treating the whole
  // base64 string as a file path (ENAMETOOLONG). The caller validates mimeType.
  const dataUri = `data:${mimeType};base64,${bytes.toString("base64")}`;
  const res = await cloudinary.uploader.upload(dataUri, { folder, resource_type: "image" });
  return { url: res.secure_url };
}
