# ZecurX Academy read-only course API

This service is designed to run beside the existing PostgreSQL container on the private `zecurx-shared` Docker network. It does not publish PostgreSQL or modify the LMS schema.

## What it does

- Exposes `GET /health` for container health checks.
- Exposes authenticated `GET /v1/courses`.
- Reads only from `public.courses` in a read-only transaction.
- Returns an allowlist of course catalogue fields; it does not return user, enrollment, payment, or certificate records.
- Requires a bearer token of at least 32 characters.
- Listens on port 8080. Do not publish this port to the public host.

## Required environment

Use a dedicated PostgreSQL account with SELECT access only to `public.courses`. Configure these server-only variables in the existing Compose environment file:

- `ACADEMY_DB_USER`
- `ACADEMY_DB_PASSWORD`
- `ACADEMY_API_TOKEN` (random, at least 32 characters)

Never reuse the PostgreSQL superuser/LMS owner credentials for this service. Never commit secrets.

The service defaults to database host `zecurx-postgres`, port `5432`, and database `zecurx_platform`. These can be overridden with `POSTGRES_HOST`, `POSTGRES_PORT`, and `POSTGRES_DB`.

## Deployment note

The current infrastructure Compose file lives on the server at `/opt/zecurx-infra/docker-compose.yml` and is not maintained in this website repository. Add the service from `compose.service.yml` there after copying this directory to `/opt/zecurx-infra/academy-api`.

The service joins the existing `zecurx-shared` Docker network and has no public `ports:` mapping. Keep it private behind Nginx; do not expose port 8080 or PostgreSQL port 5432 directly.

## HTTPS and Nginx

The API hostname is `api.zecurx.com`. Obtain its certificate with the existing Certbot setup, then add the location snippet from `nginx-location.example.conf` to the matching HTTPS server block. Review the actual live Nginx configuration first and preserve all existing virtual hosts. Validate the Nginx configuration before reloading it.

## Vercel

After the HTTPS route and API service are deployed, configure these server-side environment variables:

- `ACADEMY_API_URL=https://api.zecurx.com/academy-api/v1/courses`
- `ACADEMY_API_TOKEN=<same random token>`

The Vercel route at `/api/academy-courses` proxies the request server-to-server. Do not use `VITE_` or `NEXT_PUBLIC_` prefixes for either secret.

## Important schema check

The service currently expects `public.courses` to have `status` and optional `isPublic` JSON fields. The frontend currently matches database records by `courseCode` or `code` against seven existing catalogue codes. Confirm the actual production column names, values, and rows before deployment. No production database migration is intended.
