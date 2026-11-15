// PostgreSQL storage for the new site. Speaks the same tiny "redis-style" commands the rest of the API already uses
// (GET, SET [NX] [EX], DEL, LPUSH, LRANGE, INCR, EXPIRE), so no other file had to change.
// Everything lives in its OWN schema ("zecurx") so it never touches the official website's tables.
type PgPool = { query: (text: string, values?: unknown[]) => Promise<{ rows: any[]; rowCount: number | null }> };

let poolPromise: Promise<PgPool> | null = null;
let ready: Promise<void> | null = null;

export const pgConfigured = () => Boolean(process.env.DATABASE_URL);

function getPool(): Promise<PgPool> {
  if (!poolPromise) {
    poolPromise = (async () => {
      const { default: pg } = await import("pg");
      // sslmode in the URL would override our ssl setting, so remove it and control SSL with DATABASE_SSL / DATABASE_CA.
      const url = new URL(process.env.DATABASE_URL as string);
      url.searchParams.delete("sslmode");
      const ssl =
        process.env.DATABASE_SSL === "off"
          ? false
          : process.env.DATABASE_CA
            ? { ca: process.env.DATABASE_CA.replace(/\\n/g, "\n"), rejectUnauthorized: true }
            : { rejectUnauthorized: false }; // encrypted, but the server certificate is not verified
      return new pg.Pool({ connectionString: url.toString(), ssl, max: 1, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 8_000 }) as unknown as PgPool;
    })();
  }
  return poolPromise;
}

async function init(): Promise<PgPool> {
  const pool = await getPool();
  if (!ready) {
    ready = (async () => {
      await pool.query("CREATE SCHEMA IF NOT EXISTS zecurx");
      await pool.query("CREATE TABLE IF NOT EXISTS zecurx.kv (key text PRIMARY KEY, value text NOT NULL, expires_at timestamptz)");
      await pool.query("CREATE TABLE IF NOT EXISTS zecurx.lists (id bigserial PRIMARY KEY, list_key text NOT NULL, value text NOT NULL)");
      await pool.query("CREATE INDEX IF NOT EXISTS lists_key_id ON zecurx.lists (list_key, id DESC)");
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  await ready;
  return pool;
}

export async function pgCommand(command: (string | number)[]): Promise<any> {
  const pool = await init();
  const [name, key, ...rest] = command;
  const k = String(key);

  switch (String(name).toUpperCase()) {
    case "GET": {
      const r = await pool.query("SELECT value FROM zecurx.kv WHERE key = $1 AND (expires_at IS NULL OR expires_at > now())", [k]);
      return r.rows[0]?.value ?? null;
    }
    case "SET": {
      const value = String(rest[0]);
      const flags = rest.slice(1).map((x) => String(x).toUpperCase());
      const nx = flags.includes("NX");
      const exIndex = flags.indexOf("EX");
      const seconds = exIndex >= 0 ? Number(rest[1 + exIndex + 1]) : null;
      const sql = nx
        ? `INSERT INTO zecurx.kv (key, value, expires_at) VALUES ($1, $2, CASE WHEN $3::int IS NULL THEN NULL ELSE now() + make_interval(secs => $3::int) END)
           ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, expires_at = EXCLUDED.expires_at
           WHERE zecurx.kv.expires_at IS NOT NULL AND zecurx.kv.expires_at <= now()
           RETURNING key`
        : `INSERT INTO zecurx.kv (key, value, expires_at) VALUES ($1, $2, CASE WHEN $3::int IS NULL THEN NULL ELSE now() + make_interval(secs => $3::int) END)
           ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, expires_at = EXCLUDED.expires_at
           RETURNING key`;
      const r = await pool.query(sql, [k, value, seconds]);
      return r.rows.length ? "OK" : null;
    }
    case "DEL": {
      const r = await pool.query("DELETE FROM zecurx.kv WHERE key = $1", [k]);
      return r.rowCount ?? 0;
    }
    case "LPUSH": {
      await pool.query("INSERT INTO zecurx.lists (list_key, value) VALUES ($1, $2)", [k, String(rest[0])]);
      const r = await pool.query("SELECT count(*)::int AS n FROM zecurx.lists WHERE list_key = $1", [k]);
      return r.rows[0].n;
    }
    case "LRANGE": {
      // Newest first, like a Redis list built with LPUSH. stop = -1 means "to the end".
      const start = Number(rest[0]);
      const stop = Number(rest[1]);
      const limit = stop < 0 ? null : stop - start + 1;
      const r = await pool.query("SELECT value FROM zecurx.lists WHERE list_key = $1 ORDER BY id DESC OFFSET $2 LIMIT $3", [k, start, limit]);
      return r.rows.map((row) => row.value);
    }
    case "INCR": {
      const r = await pool.query(
        `INSERT INTO zecurx.kv (key, value) VALUES ($1, '1')
         ON CONFLICT (key) DO UPDATE SET
           value = CASE WHEN zecurx.kv.expires_at IS NOT NULL AND zecurx.kv.expires_at <= now() THEN '1' ELSE (zecurx.kv.value::bigint + 1)::text END,
           expires_at = CASE WHEN zecurx.kv.expires_at IS NOT NULL AND zecurx.kv.expires_at <= now() THEN NULL ELSE zecurx.kv.expires_at END
         RETURNING value`,
        [k],
      );
      return Number(r.rows[0].value);
    }
    case "EXPIRE": {
      const r = await pool.query("UPDATE zecurx.kv SET expires_at = now() + make_interval(secs => $2::int) WHERE key = $1", [k, Number(rest[0])]);
      return r.rowCount ? 1 : 0;
    }
    default:
      throw new Error(`Unsupported storage command: ${name}`);
  }
}
