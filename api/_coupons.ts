import { coursePricesInr } from "./_prices";

// Coupons live in the COUPONS environment variable (JSON), so codes can change without a redeploy of code.
// Example:
//   COUPONS={"WELCOME10":{"type":"percent","value":10},"FLAT2000":{"type":"flat","value":2000,"courses":["zxCPEH"],"expires":"2026-12-31"}}
// type: "percent" (1-100) or "flat" (rupees). courses and expires (YYYY-MM-DD) are optional.
type Coupon = { type: "percent" | "flat"; value: number; courses?: string[]; expires?: string; maxUses?: number };

// Codes that work out of the box. EDIT OR REMOVE these before going live, they are real discounts once deployed.
// Codes from the COUPONS environment variable are added on top (and override a code with the same name).
const DEFAULT_COUPONS: Record<string, Coupon> = {
  ZECURX10: { type: "percent", value: 10 },
  FLAT1000: { type: "flat", value: 1000 },
};

function loadCoupons(): Record<string, Coupon> {
  try {
    const parsed = JSON.parse(process.env.COUPONS || "{}");
    return { ...DEFAULT_COUPONS, ...(parsed && typeof parsed === "object" ? parsed : {}) };
  } catch {
    return DEFAULT_COUPONS;
  }
}

export type CouponResult =
  | { valid: true; code: string; baseAmount: number; discount: number; finalAmount: number; label: string }
  | { valid: false; error: string };

export function applyCoupon(courseCode: string, rawCode: unknown): CouponResult {
  const course = coursePricesInr[courseCode];
  if (!course) return { valid: false, error: "This course is not available for online payment" };
  const code = typeof rawCode === "string" ? rawCode.trim().toUpperCase().slice(0, 30) : "";
  if (!code) return { valid: false, error: "Enter a coupon code" };

  const coupon = loadCoupons()[code];
  const invalid = { valid: false as const, error: "This coupon code is not valid" };
  if (!coupon || (coupon.type !== "percent" && coupon.type !== "flat") || !(coupon.value > 0)) return invalid;
  if (coupon.courses?.length && !coupon.courses.includes(courseCode)) return { valid: false, error: "This coupon does not apply to this course" };
  if (coupon.expires && Date.now() > new Date(`${coupon.expires}T23:59:59+05:30`).getTime()) return { valid: false, error: "This coupon has expired" };

  const base = course.amount;
  const raw = coupon.type === "percent" ? Math.round((base * Math.min(coupon.value, 100)) / 100) : Math.round(coupon.value);
  const discount = Math.min(raw, base - 1); // Razorpay needs at least ₹1
  return {
    valid: true,
    code,
    baseAmount: base,
    discount,
    finalAmount: base - discount,
    label: coupon.type === "percent" ? `${coupon.value}% off` : `₹${discount.toLocaleString("en-IN")} off`,
  };
}
