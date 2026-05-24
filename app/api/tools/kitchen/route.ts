import { NextRequest, NextResponse } from "next/server";
import { getKitchenCombo } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const emoji1 = req.nextUrl.searchParams.get("emoji1");
  const emoji2 = req.nextUrl.searchParams.get("emoji2");

  if (!emoji1 || !emoji2) {
    return NextResponse.json({ error: "emoji1 and emoji2 are required" }, { status: 400 });
  }

  const combo = await getKitchenCombo(emoji1, emoji2);
  if (!combo) {
    return NextResponse.json({ result_url: null });
  }

  return NextResponse.json({ result_url: combo.result_url });
}
