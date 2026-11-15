import { redis, redisConfigured } from "./_redis";
import { escapeHtml, verifyModeration } from "./_reviewMail";

type Req = { method?: string; query?: Record<string, string | string[] | undefined>; body?: any };
type Res = { status: (code: number) => Res; send: (body: string) => void; setHeader: (k: string, v: string) => void };

const first = (v: unknown) => (Array.isArray(v) ? String(v[0]) : typeof v === "string" ? v : "");

function page(res: Res, status: number, title: string, body: string) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(status).send(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title>
  <body style="font-family:Arial,sans-serif;background:#f4f7ff;margin:0;padding:24px;color:#111d35"><div style="max-width:560px;margin:40px auto;background:#fff;border-radius:18px;padding:28px;box-shadow:0 10px 30px rgba(26,44,79,.1)">
  <h2 style="margin-top:0">${escapeHtml(title)}</h2>${body}</div></body>`);
}

export default async function handler(req: Req, res: Res) {
  if (!redisConfigured()) return page(res, 500, "Unavailable", "<p>Storage is not configured.</p>");

  const src = req.method === "POST" ? req.body ?? {} : req.query ?? {};
  const id = first(src.id).replace(/[^a-f0-9]/gi, "").slice(0, 40);
  const action = first(src.action);
  const sig = first(src.sig);
  if (!id || !verifyModeration(id, action, sig)) return page(res, 403, "Invalid link", "<p>This approval link is not valid.</p>");

  const raw = await redis("GET", `review:pending:${id}`);
  if (!raw) return page(res, 404, "Already handled", "<p>This review was already approved or rejected, or the link has expired.</p>");
  const pending = JSON.parse(raw) as { courseCode: string; certId: string; review: { name: string; role: string; rating: number; date: string; text: string } };
  const { review } = pending;

  // Opening the email link only shows the review. Nothing changes until the button is pressed (so mail scanners cannot approve by accident).
  if (req.method !== "POST") {
    const verb = action === "approve" ? "Approve and publish" : "Reject";
    return page(
      res,
      200,
      action === "approve" ? "Approve this review?" : "Reject this review?",
      `<p style="color:#5a6780">${escapeHtml(pending.courseCode)} · <b>${escapeHtml(review.name)}</b> · ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
       <blockquote style="margin:12px 0 22px;padding:12px 16px;border-left:4px solid #315be3;background:#f4f7ff">${escapeHtml(review.text)}</blockquote>
       <form method="post"><input type="hidden" name="id" value="${id}"><input type="hidden" name="action" value="${escapeHtml(action)}"><input type="hidden" name="sig" value="${escapeHtml(sig)}">
       <button style="padding:12px 24px;border:0;border-radius:10px;background:${action === "approve" ? "#315be3" : "#c0392b"};color:#fff;font-weight:bold;font-size:15px;cursor:pointer">${verb}</button></form>`,
    );
  }

  if (action === "approve") {
    await redis("LPUSH", `reviews:${pending.courseCode}`, JSON.stringify(review));
    await redis("DEL", `review:pending:${id}`);
    return page(res, 200, "Review approved", "<p>The review is now live on the course page.</p>");
  }
  // Rejected: free the certificate so the learner can submit a revised review.
  await redis("DEL", `review:pending:${id}`);
  await redis("DEL", `reviewed:${pending.certId}`);
  return page(res, 200, "Review rejected", "<p>The review was not published. The learner can submit a new one.</p>");
}
