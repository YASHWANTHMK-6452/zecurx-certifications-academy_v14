# Deployment checklist (not yet deployed)

The GitHub branch contains the API code and examples only. The live Hetzner Compose and Nginx files are not in this repository, so do not assume these snippets are active.

## Before deployment

1. Confirm the real `public.courses` rows use the expected public visibility/status values and that `courseCode` matches the seven catalogue codes used by the site.
2. Create a dedicated PostgreSQL login with SELECT permission only on the specific course columns/table. Do not use the production superuser for the API.
3. Generate a long random `ACADEMY_API_TOKEN` and add it to the server's secret environment (never commit it).
4. Copy `server.js`, `package.json`, and `Dockerfile` to `/opt/zecurx-infra/academy-api`.
5. Merge `compose.service.yml` into the existing `/opt/zecurx-infra/docker-compose.yml`; retain existing services, volumes and networks. The service has no public port mapping.
6. Add `nginx-location.example.conf` inside the existing HTTPS virtual host. Verify Nginx configuration before reload.
7. Test the internal health endpoint and authenticated course endpoint from the Nginx container/network.
8. Configure Vercel server-side variables:
   - `ACADEMY_API_URL=https://<existing-zecurx-host>/academy-api/v1/courses`
   - `ACADEMY_API_TOKEN=<same random token>`
9. Deploy a Vercel preview and confirm course titles/descriptions load from PostgreSQL. Payment values remain from the existing frontend configuration.

## Rollback

Remove the new Nginx location and the `academy-api` service only, then reload/redeploy the existing infrastructure. Do not remove the PostgreSQL container, volume, or existing services.

## Safety

- Do not publish port 8080 or PostgreSQL port 5432.
- Do not put database credentials or the bearer token in Vite/client environment variables.
- Do not run migrations or alter production tables for this read-only catalogue integration.
- Do not change payment endpoints or checkout code as part of this task.
