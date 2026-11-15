import { createHmac, timingSafeEqual } from "node:crypto";
import { recordEnrollment } from "./_enroll";

type Req = { method?: string; body?: any };
type Res = { status: (code: number) => Res; json: (body: unknown) => void; setHeader: (k: string, v: string) => void };

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return res.status(500).json({ error: "Payment gateway is not configured" });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};
  if (![razorpay_order_id, razorpay_payment_id, razorpay_signature].every((v) => typeof v === "string")) {
    return res.status(400).json({ verified: false });
  }

  const expected = createHmac("sha256", keySecret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(razorpay_signature);
  if (!(a.length === b.length && timingSafeEqual(a, b))) return res.status(400).json({ verified: false });

  // Signature is valid. Fetch the payment from Razorpay to return trusted details.
  let payment: { status?: string; amount?: number; email?: string; notes?: Record<string, string> } = {};
  try {
    const response = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
      headers: { Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64") },
    });
    if (response.ok) payment = await response.json();
  } catch {
    /* signature already proves the payment; details are optional */
  }

  await recordEnrollment({
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amountInr: payment.amount ? payment.amount / 100 : 0,
    courseCode: payment.notes?.courseCode,
    name: payment.notes?.name,
    email: payment.email ?? payment.notes?.email,
    source: "browser",
  });

  return res.status(200).json({ verified: true, status: payment.status ?? "unknown", amount: payment.amount ? payment.amount / 100 : undefined });
}
