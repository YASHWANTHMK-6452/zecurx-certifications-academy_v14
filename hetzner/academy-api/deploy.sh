#!/usr/bin/env bash
# Safe preflight for the ZecurX Academy API. This script does not deploy,
# restart, alter, or expose any existing service.
set -Eeuo pipefail

ROOT="/opt/zecurx-infra"
COMPOSE="$ROOT/docker-compose.yml"
API_DIR="$ROOT/academy-api"
DOMAIN="api.zecurx.com"

fail() { printf 'STOP: %s\n' "$*" >&2; exit 1; }
ok() { printf 'OK: %s\n' "$*"; }

[[ "$(id -u)" -eq 0 ]] || fail "Run as root from the Hetzner server."
[[ -f "$COMPOSE" ]] || fail "Existing Compose file not found: $COMPOSE"
[[ -f "$API_DIR/server.js" && -f "$API_DIR/package.json" && -f "$API_DIR/Dockerfile" ]] || fail "Academy API files are missing from $API_DIR."
[[ -f "$ROOT/.env" ]] || fail "Existing Compose .env file not found."
ok "Existing infrastructure files found."

docker network inspect zecurx-shared >/dev/null 2>&1 || fail "Docker network zecurx-shared is missing."
docker inspect zecurx-postgres >/dev/null 2>&1 || fail "PostgreSQL container zecurx-postgres is missing."
docker inspect zecurx-nginx >/dev/null 2>&1 || fail "Nginx container zecurx-nginx is missing."
ok "Existing Docker network, PostgreSQL, and Nginx containers found."

# Do not print secret values. Only report whether the expected variables exist.
for key in ACADEMY_DB_USER ACADEMY_DB_PASSWORD ACADEMY_API_TOKEN; do
  if ! grep -Eq "^[[:space:]]*${key}=" "$ROOT/.env"; then
    fail "Missing $key in $ROOT/.env. Add secrets securely before deployment."
  fi
done
ok "Dedicated Academy DB credentials and API token are configured."

if [[ ! -d "$ROOT/certbot/conf/live/$DOMAIN" ]]; then
  fail "No certificate directory for $DOMAIN. HTTPS certificate must be issued before API activation."
fi
ok "HTTPS certificate directory exists."

# Verify the existing compose file parses without changing it.
docker compose -f "$COMPOSE" config --quiet || fail "Existing Docker Compose configuration is invalid."
ok "Existing Docker Compose configuration parses."

# Check actual course schema and print only column names, never row data.
docker exec zecurx-postgres sh -lc 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Atc "SELECT column_name FROM information_schema.columns WHERE table_schema = '''public''' AND table_name = '''courses''' ORDER BY ordinal_position"' > /tmp/zecurx-academy-course-columns.txt   || fail "Could not inspect public.courses using the existing PostgreSQL container credentials."

if [[ ! -s /tmp/zecurx-academy-course-columns.txt ]]; then
  fail "public.courses was not found or has no visible columns."
fi
ok "Read public.courses column names into /tmp/zecurx-academy-course-columns.txt."
printf '\nCourse table columns (names only):\n'
cat /tmp/zecurx-academy-course-columns.txt
printf '\nPRE-FLIGHT ONLY: no services were started, stopped, or changed.\n'
