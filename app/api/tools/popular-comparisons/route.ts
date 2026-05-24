import { NextResponse } from "next/server";
import { getPopularComparisons } from "@/lib/mongodb";

export async function GET() {
  const comparisons = await getPopularComparisons(10);
  return NextResponse.json(comparisons);
}
