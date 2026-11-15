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

Use the existing Compose environment file for the database credentials, plus a newly generated random `ACADEMY_API_TOKEN` (at least 32 characters). Never commit the token or database credentials.

The service defaults to database host `zecurx-postgres`, port `5432`, and database `zecurx_platform`. These can be overridden with `POSTGRES_HOST`, `POSTGRES_PORT`, and `POSTGRES_DB`.

## Deployment note

The current infrastructure Compose file lives on the server at `/opt/zecurx-infra/docker-compose.yml` and is not maintained in this website repository. Add this service there with:

- build context pointing to this directory after the files are copied to the server;
- `env_file: .env`;
- `POSTGRES_HOST=zecurx-postgres`;
- `ACADEMY_API_TOKEN` supplied as a secret environment variable;
- `networks: [zecurx-shared]`;
- no `ports:` mapping.

Do not deploy until the existing Nginx virtual-host configuration has been reviewed and an HTTPS-only route to this service has been added. Keep the API private behind Nginx; do not expose port 8080 or PostgreSQL port 5432 directly.

## Vercel

Configure these server-side environment variables only after the HTTPS route is deployed:

- `ACADEMY_API_URL=https://<your-api-host>/v1/courses`
- `ACADEMY_API_TOKEN=<same random token>`

The Vercel route at `/api/academy-courses` proxies the request server-to-server. Do not use `VITE_` or `NEXT_PUBLIC_` prefixes for either secret.

## Important schema check

The service currently expects `public.courses` to have `status` and optional `isPublic` JSON fields and returns only the public allowlist listed in `server.js`. Confirm actual production values/columns before deployment. No production database migration is required.
