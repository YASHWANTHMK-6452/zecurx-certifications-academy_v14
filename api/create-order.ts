import { coursePricesInr } from "./_prices";
import { applyCoupon } from "./_coupons";

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

  const { courseCode, name, email, phone, policyAccepted, policyVersion, couponCode } = req.body ?? {};
  const course = typeof courseCode === "string" ? coursePricesInr[courseCode] : undefined;
  if (!course) return res.status(400).json({ error: "This course is not available for online payment" });
  if (typeof name !== "string" || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Valid name and email are required" });
  }

  if (policyAccepted !== true) {
    return res.status(400).json({ error: "You must accept the No Refund Policy to continue" });
  }

  // The price is always recomputed here; a coupon is re-validated and never trusted from the browser.
  let amountInr = course.amount;
  let appliedCoupon = "";
  if (typeof couponCode === "string" && couponCode.trim()) {
    const result = applyCoupon(courseCode, couponCode);
    if (!result.valid) return res.status(400).json({ error: result.error });
    amountInr = result.finalAmount;
    appliedCoupon = result.code;
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
    },
    body: JSON.stringify({
      amount: amountInr * 100, // paise
      currency: "INR",
      receipt: `${courseCode}_${Date.now()}`.slice(0, 40),
      notes: { courseCode, courseTitle: course.title, coupon: appliedCoupon, listPriceInr: String(course.amount), refundPolicyAccepted: "yes", refundPolicyVersion: String(policyVersion ?? "").slice(0, 20), name: name.slice(0, 60), email, phone: String(phone ?? "").slice(0, 15) },
    }),
  });

  if (!response.ok) return res.status(502).json({ error: "Could not create payment order" });
  const order = await response.json();
  return res.status(200).json({ keyId, orderId: order.id, amount: order.amount, currency: order.currency, courseTitle: course.title });
}
