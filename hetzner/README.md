# Database on Hetzner (replaces Upstash)

1. Hetzner Cloud: create an Ubuntu server, firewall allowing only ports 22, 80, 443.
2. DNS: point db.yourdomain.com (A record) to the server IP, then put that name in `Caddyfile`.
3. On the server: `curl -fsSL https://get.docker.com | sh`
4. Copy this folder to the server, run `cp .env.example .env`, edit SRH_TOKEN.
5. `docker compose up -d`
6. Test: `curl -X POST https://db.yourdomain.com -H "Authorization: Bearer YOUR_TOKEN" -d '["PING"]'`  -> {"result":"PONG"}
7. Vercel env vars: UPSTASH_REDIS_REST_URL=https://db.yourdomain.com and UPSTASH_REDIS_REST_TOKEN=YOUR_TOKEN, then redeploy.

View data: `docker compose exec redis redis-cli`, then e.g. `KEYS *` or `LRANGE reviews:zxCPEH 0 -1`.

---
# Using your EXISTING PostgreSQL on Hetzner instead (no Redis needed)

The API can store everything in PostgreSQL. Set `DATABASE_URL` in Vercel and it is used instead of Upstash.

1. Run `postgres-setup.sql` once as the Postgres admin (change the password first). This makes a separate database
   `zecurx_academy` and a limited user `zecurx_app`. The official site's data is not touched.
2. Vercel must be able to reach Postgres over the internet (Vercel has no fixed IP). So:
   - Enable SSL in Postgres (`ssl = on` in postgresql.conf, with a certificate).
   - Listen on the public address (`listen_addresses`).
   - In pg_hba.conf allow ONLY this user and database, over SSL, with a password:
     `hostssl  zecurx_academy  zecurx_app  0.0.0.0/0  scram-sha-256`
   - In the Hetzner firewall open port 5432. Use a very strong password.
   - If Postgres runs in Docker, publish port 5432 and apply the same rules.
3. Vercel -> Environment Variables:
   `DATABASE_URL=postgresql://zecurx_app:PASSWORD@db.yourdomain.com:5432/zecurx_academy`
   (no ?sslmode in the URL). Redeploy.
4. The tables `zecurx.kv` and `zecurx.lists` are created automatically on the first request.
5. View data: `psql -U zecurx_app -d zecurx_academy -c "select key from zecurx.kv"`.
