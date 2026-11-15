import { createHmac, timingSafeEqual } from "node:crypto";

// Signed links let the site owner approve or reject a review straight from the notification email.
// The signature uses ADMIN_API_KEY, so nobody can approve a review without the email link.
export type ModerationAction = "approve" | "reject";

export function signModeration(id: string, action: ModerationAction): string {
  return createHmac("sha256", process.env.ADMIN_API_KEY ?? "").update(`${id}|${action}`).digest("hex");
}

export function verifyModeration(id: string, action: string, sig: string): boolean {
  if (!process.env.ADMIN_API_KEY || process.env.ADMIN_API_KEY.length < 16) return false;
  if (action !== "approve" && action !== "reject") return false;
  const expected = Buffer.from(signModeration(id, action));
  const given = Buffer.from(String(sig));
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function mailConfigured(): boolean {
  return Boolean(
    process.env.SENDGRID_API_KEY &&
      process.env.REVIEW_NOTIFY_EMAIL &&
      process.env.REVIEW_FROM_EMAIL &&
      process.env.ADMIN_API_KEY &&
      process.env.ADMIN_API_KEY.length >= 16,
  );
}

// Accepts "name@domain.com" or "ZecurX Reviews <name@domain.com>".
function parseSender(value: string): { email: string; name?: string } {
  const match = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return match ? { email: match[2].trim(), name: match[1] || undefined } : { email: value.trim() };
}

export async function sendReviewEmail(opts: { baseUrl: string; id: string; courseCode: string; courseTitle: string; name: string; rating: number; text: string }) {
  const link = (action: ModerationAction) => `${opts.baseUrl}/api/review-moderate?id=${opts.id}&action=${action}&sig=${signModeration(opts.id, action)}`;
  const stars = "★".repeat(opts.rating) + "☆".repeat(5 - opts.rating);
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111d35">
      <h2 style="margin:0 0 6px">New review waiting for approval</h2>
      <p style="margin:0 0 16px;color:#5a6780">${escapeHtml(opts.courseTitle)} (${escapeHtml(opts.courseCode)})</p>
      <p style="margin:0 0 4px"><b>${escapeHtml(opts.name)}</b> · <span style="color:#e8a400;font-size:18px">${stars}</span></p>
      <blockquote style="margin:12px 0 22px;padding:12px 16px;border-left:4px solid #315be3;background:#f4f7ff">${escapeHtml(opts.text)}</blockquote>
      <a href="${link("approve")}" style="display:inline-block;padding:12px 22px;background:#315be3;color:#fff;border-radius:10px;text-decoration:none;font-weight:bold">Review &amp; approve</a>
      <a href="${link("reject")}" style="display:inline-block;margin-left:10px;padding:12px 22px;border:1px solid #c9d2e3;color:#111d35;border-radius:10px;text-decoration:none">Reject</a>
      <p style="margin-top:22px;color:#8a95ab;font-size:12px">The review is only shown on the website after you approve it.</p>
    </div>`;
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: (process.env.REVIEW_NOTIFY_EMAIL as string).trim() }] }],
      from: parseSender(process.env.REVIEW_FROM_EMAIL as string),
      subject: `New ${opts.rating}★ review for ${opts.courseCode}: approval needed`,
      content: [{ type: "text/html", value: html }],
    }),
  });
  if (!response.ok) throw new Error("Could not send the notification email");
}
