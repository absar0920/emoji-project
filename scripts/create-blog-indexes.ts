import { connectToDatabase } from "../lib/mongodb";

async function main() {
  const conn = await connectToDatabase();
  if (!conn) throw new Error("Set MONGODB_URI");
  const col = conn.db.collection("blog_posts");
  await col.createIndex({ slug: 1 }, { unique: true });
  await col.createIndex({ status: 1, published_at: -1 });
  await col.createIndex({ "categories.slug": 1 });
  console.log("blog_posts indexes created");
  process.exit(0);
}
main();
