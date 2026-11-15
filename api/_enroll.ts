import { redis, redisConfigured } from "./_redis";

// Single place to record a successful payment. Called by BOTH /api/verify-payment (browser flow)
// and /api/razorpay-webhook (Razorpay server-to-server), so one payment can arrive twice.
// Saved once per payment ID (SET NX), so duplicates are ignored.
export type PaidEnrollment = {
  paymentId: string;
  orderId: string;
  amountInr: number;
  courseCode?: string;
  name?: string;
  email?: string;
  phone?: string;
  source: "browser" | "webhook";
};

export async function recordEnrollment(enrollment: PaidEnrollment) {
  console.log("enrollment paid", enrollment);
  if (!redisConfigured()) return;
  try {
    const created = await redis("SET", `enroll:${enrollment.paymentId}`, JSON.stringify({ ...enrollment, recordedAt: new Date().toISOString() }), "NX");
    if (created === "OK") await redis("LPUSH", "enrollments", enrollment.paymentId);
    // TODO: send the enrollment confirmation email here (only when `created === "OK"`).
  } catch (error) {
    console.error("could not store enrollment", error); // never break the payment flow
  }
}
