import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/mongodb";

export const revalidate = 3600;

export async function GET() {
  const index = await getSearchIndex();
  return NextResponse.json(index);
}
