import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { readSessionToken, decrypt } from "./session";

export const isAdmin = cache(async (): Promise<boolean> => {
  const session = await decrypt(await readSessionToken());
  return session?.sub === "superadmin";
});

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
