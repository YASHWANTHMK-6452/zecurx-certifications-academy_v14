import http from "node:http";
import { timingSafeEqual } from "node:crypto";
import pg from "pg";

const { Pool } = pg;
const port = Number(process.env.PORT || 8080);
const token = process.env.ACADEMY_API_TOKEN || "";
const pool = new Pool({
  host: process.env.POSTGRES_HOST || "zecurx-postgres",
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || "zecurx_platform",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  // Traffic stays on the private Docker network; do not expose PostgreSQL publicly.
  ssl: false,
});

const publicFields = [
  "id", "courseCode", "code", "title", "slug", "description",
  "shortDescription", "thumbnail", "level", "language", "duration",
  "price", "discount", "tags", "status", "isPublic",
];

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function send(res, status, body) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    return send(res, 200, { ok: true, service: "zecurx-academy-read-api" });
  }

  if (req.method !== "GET" || req.url !== "/v1/courses") {
    return send(res, 404, { error: "Not found" });
  }

  const auth = req.headers.authorization || "";
  const supplied = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token.length < 32 || !safeEqual(token, supplied)) {
    return send(res, 401, { error: "Unauthorized" });
  }

  try {
    // Read-only transaction. The API never writes to the production LMS database.
    const client = await pool.connect();
    try {
      await client.query("BEGIN READ ONLY");
      const result = await client.query(`
        SELECT to_jsonb(c) AS record
        FROM public.courses AS c
        WHERE lower(coalesce(to_jsonb(c)->>'status', 'published')) IN ('published', 'active')
          AND coalesce(nullif(to_jsonb(c)->>'isPublic', '')::boolean, true) = true
        ORDER BY lower(coalesce(to_jsonb(c)->>'title', ''))
        LIMIT 100
      `);
      await client.query("COMMIT");
      const courses = result.rows.map(({ record }) =>
        Object.fromEntries(publicFields
          .filter((field) => Object.hasOwn(record, field) && record[field] !== null)
          .map((field) => [field, record[field]]))
      );
      return send(res, 200, { courses });
    } catch (error) {
      await client.query("ROLLBACK").catch(() => undefined);
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    // Keep database details out of the public response and logs.
    console.error("Academy course query failed:", error?.code || "unknown");
    return send(res, 500, { error: "Unable to load courses" });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`ZecurX Academy read API listening on ${port}`);
});

process.on("SIGTERM", async () => {
  server.close();
  await pool.end();
});
