import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/dal";

// Admin preview entry point. Lives in a Route Handler (always dynamic) rather
// than in the page, because the page itself is weekly on-demand ISR: reading a
// request-time API there (searchParams/cookies) during the static-generation
// pass throws DYNAMIC_SERVER_USAGE and 500s the whole route.
//
// Flow: an admin hits /blog/<slug>/preview → we verify admin, flip on Draft
// Mode (sets the `__prerender_bypass` cookie), then redirect to the canonical
// /blog/<slug>. That canonical request now carries the bypass cookie, so it
// renders dynamically/fresh and `resolvePost` returns the draft — while the
// shared ISR cache at the bare path is never written from a draft render, so
// anonymous visitors can't be served leaked draft content.
//
// Non-admins hitting this route simply don't get Draft Mode enabled and are
// redirected to the published view (or 404) — the flag is ignored, not blocked.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (await isAdmin()) {
    (await draftMode()).enable();
  }
  redirect(`/blog/${slug}`);
}
