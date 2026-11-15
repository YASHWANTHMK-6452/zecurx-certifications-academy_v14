# Deployment checklist (not yet deployed)

The GitHub branch contains the API code and examples only. The live Hetzner Compose and Nginx files are not in this repository, so do not assume these snippets are active.

## Before deployment

1. Confirm the real `public.courses` rows use the expected public visibility/status values and that the course identifier matches the seven catalogue codes used by the site. The live schema and rows have not yet been inspected.
2. Create a dedicated PostgreSQL login with SELECT permission only on `public.courses`. Do not use the production superuser or the LMS application's owner account for the API.
3. Add these server-only values to `/opt/zecurx-infra/.env`: `ACADEMY_DB_USER`, `ACADEMY_DB_PASSWORD`, and a randomly generated `ACADEMY_API_TOKEN` (at least 32 random characters). Never commit these values.
4. Copy `server.js`, `package.json`, and `Dockerfile` to `/opt/zecurx-infra/academy-api`.
5. Merge `compose.service.yml` into the existing `/opt/zecurx-infra/docker-compose.yml`; retain existing services, volumes and networks. The service has no public port mapping.
6. Obtain an HTTPS certificate for `api.zecurx.com` using the existing Certbot setup, then add `nginx-location.example.conf` inside the matching HTTPS virtual host. Review the complete live Nginx file before editing; do not replace existing server blocks.
7. Validate the Nginx configuration before reload. Test the internal health endpoint and authenticated course endpoint from the Docker network.
8. Configure Vercel server-side variables:
   - `ACADEMY_API_URL=https://api.zecurx.com/academy-api/v1/courses`
   - `ACADEMY_API_TOKEN=<same random token>`
9. Deploy a Vercel preview and confirm course titles/descriptions load from PostgreSQL. Payment values remain from the existing frontend configuration.

## Rollback

Remove the new Nginx location and the `academy-api` service only, then reload/redeploy the existing infrastructure. Do not remove the PostgreSQL container, volume, or existing services.

## Safety

- Do not publish port 8080 or PostgreSQL port 5432.
- Do not put database credentials or the bearer token in Vite/client environment variables.
- Do not run migrations or alter production tables for this read-only catalogue integration.
- Do not change payment endpoints or checkout code as part of this task.
- The server's current PostgreSQL port mapping should be reviewed separately against Hetzner firewall rules and any existing trusted clients before changing it; do not remove it blindly.
