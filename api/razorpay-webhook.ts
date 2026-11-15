import { createHmac, timingSafeEqual } from "node:crypto";
import { recordEnrollment } from "./_enroll";

// Razorpay signs the exact raw body, so the automatic JSON body parser must be off.
export const config = { api: { bodyParser: false } };

type Req = { method?: string; headers: Record<string, string | string[] | undefined>; [Symbol.asyncIterator]: () => AsyncIterator<Buffer | string> };
type Res = { status: (code: number) => Res; json: (body: unknown) => void; setHeader: (k: string, v: string) => void };

async function readRawBody(req: Req): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req as unknown as AsyncIterable<Buffer | string>) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return res.status(500).json({ error: "Webhook is not configured" });

  const signature = req.headers["x-razorpay-signature"];
  if (typeof signature !== "string") return res.status(400).json({ error: "Missing signature" });

  const raw = await readRawBody(req);
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (!(a.length === b.length && timingSafeEqual(a, b))) return res.status(400).json({ error: "Invalid signature" });

  let event: any;
  try {
    event = JSON.parse(raw.toString("utf8"));
  } catch {
    return res.status(400).json({ error: "Invalid payload" });
  }

  // order.paid fires once the order is fully paid; payment.captured is the per-payment equivalent.
  if (event.event === "order.paid" || event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    if (payment?.id && payment?.order_id) {
      await recordEnrollment({
        paymentId: payment.id,
        orderId: payment.order_id,
        amountInr: (payment.amount ?? 0) / 100,
        courseCode: payment.notes?.courseCode,
        name: payment.notes?.name,
        email: payment.email ?? payment.notes?.email,
        phone: payment.contact ?? payment.notes?.phone,
        source: "webhook",
      });
    }
  } else if (event.event === "payment.failed") {
    const payment = event.payload?.payment?.entity;
    console.log("payment failed", { paymentId: payment?.id, orderId: payment?.order_id, reason: payment?.error_description });
  }

  // Always answer 200 for verified events so Razorpay stops retrying.
  return res.status(200).json({ received: true });
}
