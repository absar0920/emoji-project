/**
 * Client-side helper for the AI tool pages. Parses a tool API response and
 * throws a user-facing Error on failure — including the rate-limit "retry in Ns"
 * message from the shared response contract in lib/ratelimit.ts. No server
 * imports, safe to use from client components.
 */
export async function readToolJson<T = Record<string, unknown>>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({} as Record<string, unknown>));
  const err = data as { error?: string; code?: string; retryAfter?: number };

  if (!res.ok || err.error) {
    if (err.code === "rate_limited" && err.retryAfter) {
      throw new Error(`You're going too fast — try again in ${err.retryAfter}s.`);
    }
    if (err.code === "at_capacity") {
      throw new Error("AI is temporarily at capacity — please try again in a bit.");
    }
    throw new Error(err.error || "Something went wrong. Please try again.");
  }
  return data as T;
}
