import "server-only";
import bcrypt from "bcryptjs";

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.SUPERADMIN_USERNAME;
  const hash = process.env.SUPERADMIN_PASSWORD_HASH;
  if (!expectedUser || !hash) return false;
  // Compare password first (constant-ish work) then username, to avoid trivial user enumeration.
  const passwordOk = await bcrypt.compare(password, hash);
  return passwordOk && username === expectedUser;
}
