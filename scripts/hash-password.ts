// scripts/hash-password.ts
// Usage: npx tsx scripts/hash-password.ts 'your-plaintext-password'
import bcrypt from "bcryptjs";

const pw = process.argv[2];
if (!pw) {
  console.error("Usage: npx tsx scripts/hash-password.ts '<password>'");
  process.exit(1);
}
console.log(bcrypt.hashSync(pw, 12));
