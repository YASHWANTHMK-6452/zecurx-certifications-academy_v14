# ZecurX Academy API deployment package

This folder contains the read-only Academy catalogue API and its deployment examples.

## Important status

The API is **not deployed** by committing these files. The live Hetzner Compose and Nginx configuration are separate from this repository. Do not merge the draft PR into production or run an unreviewed deployment.

## Package contents

- `server.js`, `package.json`, `Dockerfile`: private read-only API service.
- `compose.service.yml`: Compose overlay; no public API port.
- `nginx-location.example.conf`: HTTPS reverse-proxy location.
- `deploy.sh`: non-mutating server preflight. It checks existing services, secret variable presence, certificate directory and the real `public.courses` column names. It does not deploy, restart, or alter anything.

## Safe next step

After the files have been copied to `/opt/zecurx-infra/academy-api`, run the preflight as root on the Hetzner server:

```bash
bash /opt/zecurx-infra/academy-api/deploy.sh
```

The output shows only course column names, never course rows, passwords, tokens, or other user data. Share that output to confirm the actual schema before preparing the final deployment. Do not paste the contents of `.env`.

## Required security settings

The existing `/opt/zecurx-infra/.env` must contain server-only values:

- `ACADEMY_DB_USER`: dedicated PostgreSQL login (not the database owner).
- `ACADEMY_DB_PASSWORD`: strong password for that login.
- `ACADEMY_API_TOKEN`: randomly generated token of at least 32 characters.

The dedicated database login should have SELECT access only to `public.courses`. Do not expose port 8080 or PostgreSQL port 5432 to the public internet. Do not change the existing website, LMS, payment routes, PostgreSQL volume, or other Compose services.

## Still required before deployment

1. Confirm the actual course columns and public status values.
2. Confirm course identifiers map to the seven Academy catalogue codes.
3. Confirm an HTTPS certificate exists for `api.zecurx.com`.
4. Review the actual Nginx virtual host and add the proxy route without replacing existing server blocks.
5. Validate Nginx and Compose configuration, then deploy only the Academy API service.
6. Test authenticated API responses and a Vercel preview before production rollout.
