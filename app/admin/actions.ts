"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";
import { enforceRateLimit } from "@/lib/ratelimit";

export async function login(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  // Rebuild a minimal Request so the limiter can read IP + origin from headers.
  const h = await headers();
  const req = new Request("http://internal/admin/login", {
    method: "POST",
    headers: h,
  });
  const blocked = await enforceRateLimit(req, "login");
  if (blocked) return { error: "Too many attempts. Please wait a minute and try again." };

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!(await verifyCredentials(username, password))) {
    return { error: "Invalid username or password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
