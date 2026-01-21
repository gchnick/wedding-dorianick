import { db, GuestbookMessage, count } from "astro:db";

export default async function check() {
  const result = await db.select({ count: count() }).from(GuestbookMessage);
  console.log(`Total messages in DB: ${result[0].count}`);
}
