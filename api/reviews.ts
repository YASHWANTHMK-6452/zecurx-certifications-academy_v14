import { courseCodes, coursePricesInr } from "./_prices";
import { redis, redisConfigured } from "./_redis";
import { clientIp, type Req, type Res } from "./_http";
import { randomBytes } from "node:crypto";
import { mailConfigured, sendReviewEmail } from "./_reviewMail";

// Only the newest approved reviews are shown on the site.
const MAX_VISIBLE = 10;

type StoredReview = { name: string; role: string; rating: number; date: string; text: string };

const coursePricesAll = (code: string) => coursePricesInr[code]?.title ?? code;

function displayName(full: string) {
  const parts = full.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0];
}

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");

  // Public: list approved reviews for every course (newest 10), plus overall count and average.
  if (req.method === "GET") {
    if (!redisConfigured()) return res.status(200).json({ reviews: {}, stats: {} });
    const entries = await Promise.all(
      courseCodes.map(async (code) => {
        const rows: string[] = await redis("LRANGE", `reviews:${code}`, 0, 499);
        const all = rows.map((row) => JSON.parse(row) as StoredReview);
        const average = all.length ? all.reduce((sum, r) => sum + r.rating, 0) / all.length : 0;
        return { code, visible: all.slice(0, MAX_VISIBLE), stats: { count: all.length, average, distribution: [5, 4, 3, 2, 1].map((n) => all.filter((r) => r.rating === n).length) } };
      }),
    );
    return res.status(200).json({
      reviews: Object.fromEntries(entries.map((e) => [e.code, e.visible])),
      stats: Object.fromEntries(entries.map((e) => [e.code, e.stats])),
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!redisConfigured() || !mailConfigured()) return res.status(500).json({ error: "Reviews are temporarily unavailable" });

  // Limit guessing attempts: 10 submissions per IP per hour.
  const key = `rl:review:${clientIp(req)}`;
  const attempts = await redis("INCR", key);
  if (attempts === 1) await redis("EXPIRE", key, 3600);
  if (attempts > 10) return res.status(429).json({ error: "Too many attempts. Please try again later." });

  const { courseCode, certificateId, email, rating, text } = req.body ?? {};
  if (!courseCodes.includes(courseCode)) return res.status(400).json({ error: "Unknown course" });
  if (typeof certificateId !== "string" || typeof email !== "string") return res.status(400).json({ error: "Certificate ID and email are required" });
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ error: "Choose a rating from 1 to 5" });
  if (typeof text !== "string" || text.trim().length < 4 || text.length > 600) return res.status(400).json({ error: "Write a comment of 4 to 600 characters" });

  const certId = certificateId.trim().toUpperCase();
  const raw = await redis("GET", `cert:${certId}`);
  const cert = raw ? JSON.parse(raw) : null;
  // Same generic message for every mismatch so nobody can probe which IDs exist.
  if (!cert || cert.courseCode !== courseCode || cert.email !== email.trim().toLowerCase()) {
    return res.status(403).json({ error: "We couldn't verify these details. Only learners who received this course's ZecurX certificate can post a review." });
  }

  // One review per certificate.
  const first = await redis("SET", `reviewed:${certId}`, "1", "NX");
  if (first !== "OK") return res.status(409).json({ error: "A review has already been submitted for this certificate." });

  const review: StoredReview = {
    name: displayName(cert.name),
    role: "Certified learner",
    rating,
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    text: text.trim(),
  };
  // Held for approval: it appears on the site only after the owner approves it from the notification email.
  const id = randomBytes(12).toString("hex");
  await redis("SET", `review:pending:${id}`, JSON.stringify({ courseCode, certId, review }), "EX", 60 * 60 * 24 * 30);
  try {
    const host = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "");
    const baseUrl = process.env.SITE_URL || `https://${host}`;
    await sendReviewEmail({ baseUrl, id, courseCode, courseTitle: coursePricesAll(courseCode), name: review.name, rating, text: review.text });
  } catch {
    await redis("DEL", `review:pending:${id}`);
    await redis("DEL", `reviewed:${certId}`);
    return res.status(502).json({ error: "We could not submit your review right now. Please try again later." });
  }
  return res.status(200).json({ pending: true });
}
