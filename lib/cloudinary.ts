import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(bytes: Buffer): Promise<{ url: string }> {
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "blog";
  const dataUri = `data:image/*;base64,${bytes.toString("base64")}`;
  const res = await cloudinary.uploader.upload(dataUri, { folder, resource_type: "image" });
  return { url: res.secure_url };
}
