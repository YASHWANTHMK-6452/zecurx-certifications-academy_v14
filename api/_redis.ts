// Storage for the whole API. If DATABASE_URL is set, data is stored in PostgreSQL (see _pg.ts).
// Otherwise it falls back to the Upstash Redis REST client (works with Vercel's Upstash/KV integration). No SDK needed.
import { pgCommand, pgConfigured } from "./_pg";

const base = () => process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = () => process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const redisConfigured = () => pgConfigured() || Boolean(base() && token());

export async function redis(...command: (string | number)[]): Promise<any> {
  if (!redisConfigured()) throw new Error("Storage is not configured");
  if (pgConfigured()) return pgCommand(command);
  const response = await fetch(base() as string, {
    method: "POST",
    headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(data.error ?? "Storage error");
  return data.result;
}
