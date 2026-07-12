import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/dal";
import { uploadImage } from "@/lib/cloudinary";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Unsupported type" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const { url } = await uploadImage(bytes);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
