import { redis, redisConfigured } from "./_redis";
import { isAdmin, type Req, type Res } from "./_http";

// ADMIN ONLY. Lists the latest paid enrollments so you can issue certificates.
export default async function handler(req: Req, res: Res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!isAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
  if (!redisConfigured()) return res.status(500).json({ error: "Storage is not configured" });

  const ids: string[] = await redis("LRANGE", "enrollments", 0, 99);
  const rows = await Promise.all(ids.map((id) => redis("GET", `enroll:${id}`)));
  return res.status(200).json({ enrollments: rows.filter(Boolean).map((row) => JSON.parse(row)) });
}
