import { applyCoupon } from "./_coupons";

type Req = { method?: string; body?: any };
type Res = { status: (code: number) => Res; json: (body: unknown) => void; setHeader: (k: string, v: string) => void };

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { courseCode, couponCode } = req.body ?? {};
  const result = applyCoupon(typeof courseCode === "string" ? courseCode : "", couponCode);
  return res.status(result.valid ? 200 : 400).json(result);
}
