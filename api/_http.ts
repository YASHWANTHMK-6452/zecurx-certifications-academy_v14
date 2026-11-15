import { timingSafeEqual } from "node:crypto";

export type Req = { method?: string; body?: any; query?: Record<string, string | string[] | undefined>; headers: Record<string, string | string[] | undefined> };
export type Res = { status: (code: number) => Res; json: (body: unknown) => void; setHeader: (k: string, v: string) => void };

export function isAdmin(req: Req): boolean {
  const expected = process.env.ADMIN_API_KEY;
  const given = req.headers["x-admin-key"];
  if (!expected || expected.length < 16 || typeof given !== "string") return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function clientIp(req: Req): string {
  const forwarded = req.headers["x-forwarded-for"];
  return (typeof forwarded === "string" ? forwarded.split(",")[0] : "unknown").trim();
}
