import { randomBytes } from "node:crypto";
import { courseCodes } from "./_prices";
import { redis, redisConfigured } from "./_redis";
import { isAdmin, type Req, type Res } from "./_http";

// ADMIN ONLY. Call this when a learner has finished the course and you issue their certificate.
// Only people who get a certificate ID here can post a review.
export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!isAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
  if (!redisConfigured()) return res.status(500).json({ error: "Storage is not configured" });

  const { courseCode, name, email, paymentId } = req.body ?? {};
  if (!courseCodes.includes(courseCode)) return res.status(400).json({ error: "Unknown course code" });
  if (typeof name !== "string" || name.trim().length < 2) return res.status(400).json({ error: "Learner name is required" });
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: "Valid learner email is required" });

  const cleanEmail = email.trim().toLowerCase();
  const certificateId = `ZX-${courseCode.replace(/^zx/, "")}-${new Date().getFullYear()}-${randomBytes(6).toString("hex").toUpperCase()}`;

  // One certificate per learner per course.
  const owner = await redis("SET", `certowner:${courseCode}:${cleanEmail}`, certificateId, "NX");
  if (owner !== "OK") {
    const existing = await redis("GET", `certowner:${courseCode}:${cleanEmail}`);
    return res.status(409).json({ error: "A certificate was already issued to this learner for this course", certificateId: existing });
  }

  await redis("SET", `cert:${certificateId}`, JSON.stringify({ certificateId, courseCode, name: name.trim(), email: cleanEmail, paymentId: paymentId ?? null, issuedAt: new Date().toISOString() }));
  await redis("LPUSH", "certs", certificateId);

  // TODO: email the certificate ID to the learner together with their certificate.
  return res.status(200).json({ certificateId });
}
