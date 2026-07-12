import "server-only";
import { createHash, timingSafeEqual } from "crypto";

// Constant-time string compare. Hash both sides to a fixed 32-byte digest so
// timingSafeEqual gets equal-length buffers and no length/timing is leaked.
function safeEqual(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a).digest();
  const bh = createHash("sha256").update(b).digest();
  return timingSafeEqual(ah, bh);
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.SUPERADMIN_USERNAME;
  const expectedPassword = process.env.SUPERADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword) return false;
  // Compare both with constant-time equality; evaluate both so the result
  // doesn't short-circuit on the username and leak which field was wrong.
  const passwordOk = safeEqual(password, expectedPassword);
  const userOk = safeEqual(username, expectedUser);
  return passwordOk && userOk;
}
