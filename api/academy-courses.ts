import type { Req, Res } from "./_http";

type AcademyCourse = {
  id?: string;
  courseCode?: string;
  code?: string;
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  thumbnail?: string;
  level?: string;
  language?: string;
  duration?: string | number;
  price?: string | number;
  discount?: string | number;
  tags?: string[];
};

export default async function handler(req: Req, res: Res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const upstream = process.env.ACADEMY_API_URL;
  const token = process.env.ACADEMY_API_TOKEN;
  if (!upstream || !token) {
    return res.status(503).json({ error: "Academy catalogue is not configured yet" });
  }

  let url: URL;
  try {
    url = new URL(upstream);
    if (url.protocol !== "https:") {
      return res.status(503).json({ error: "Academy API must use HTTPS" });
    }
  } catch {
    return res.status(503).json({ error: "Academy API URL is invalid" });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { authorization: `Bearer ${token}`, accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      return res.status(response.status === 401 ? 502 : 503).json({ error: "Academy catalogue is temporarily unavailable" });
    }
    const payload = await response.json() as { courses?: AcademyCourse[] };
    const courses = Array.isArray(payload.courses) ? payload.courses : [];
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ courses });
  } catch {
    return res.status(503).json({ error: "Academy catalogue is temporarily unavailable" });
  }
}
