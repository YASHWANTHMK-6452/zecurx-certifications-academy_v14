# ZecurX Certifications and Academy

Production-ready React and Vite implementation of the ZecurX Certifications and Academy page. The
project preserves the existing responsive design, animations, course content,
trainer profile, partner marquee, and interactive course pathfinder.

## Technology

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 build integration
- Custom responsive CSS
- pnpm 10
- Node.js 22

The site is a static client-side application. It does not use a database,
authentication provider, API, server-side runtime, or cloud storage.

## Requirements

- [Node.js 22](https://nodejs.org/)
- [pnpm 10](https://pnpm.io/installation)
- Git, for source control and GitHub deployment

## Run locally on Windows PowerShell

From the folder containing `package.json`:

```powershell
# Confirm Node.js is installed.
node --version

# Enable Corepack and install the pnpm version declared by this project.
corepack enable
corepack prepare pnpm@10.34.3 --activate

# Install the exact dependency versions from pnpm-lock.yaml.
pnpm install --frozen-lockfile

# Start the local Vite development server.
pnpm dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

To verify and preview the production build:

```powershell
pnpm check
pnpm preview
```

`pnpm check` runs TypeScript validation and then creates the production output
in `dist/`.

## Environment variables

Razorpay payments need `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` (see `.env.example`).
Do not add secrets to source control.

The Figma Make preview environment may provide `FIGMA_PUBLIC_URL`,
`FIGMA_DEV_SERVER_HOST`, and `PORT` automatically. These are platform-managed
preview values and are not needed on Vercel or for ordinary local development.

## Deploy with GitHub and Vercel

### 1. Create a GitHub repository

Create an empty repository in GitHub without adding a README, license, or
`.gitignore`. Then run the following commands in PowerShell from this project:

```powershell
git init
git add .
git commit -m "Add ZecurX Certifications and Academy website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

If this folder is already a Git repository, skip `git init`. If it already has
the correct `origin`, skip `git remote add origin`.

### 2. Import into Vercel

1. Sign in to Vercel and choose **Add New → Project**.
2. Import the GitHub repository.
3. Vercel should detect **Vite** from `vercel.json`.
4. Confirm these settings:
   - Install command: `pnpm install --frozen-lockfile`
   - Build command: `pnpm run build`
   - Output directory: `dist`
5. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` as environment variables.
6. Select **Deploy**.

Every later push to `main` creates a new production deployment. Pull requests
and other branches receive Vercel preview deployments when Git integration is
enabled.

### Optional: deploy with the Vercel CLI

```powershell
pnpm dlx vercel
pnpm dlx vercel --prod
```

Follow the prompts to link the local folder to a Vercel project. No framework
override or environment variables are needed.

## Project structure

```text
.
├── .env.example
├── .figma/
│   └── make/
│       ├── analyze-routes
│       ├── deploy
│       ├── deploy-preview
│       ├── dev
│       ├── dev.json
│       ├── format
│       ├── install
│       ├── langserver
│       └── site.json
├── .gitignore
├── .mise.toml
├── AGENTS.md
├── CLAUDE.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public/
│   ├── assets/
│   │   ├── cyber-operations.jpg
│   │   ├── partner-brindavan.png
│   │   ├── partner-dhanwantari.png
│   │   ├── partner-iibs.png
│   │   ├── partner-kgi.png
│   │   ├── partner-mount-carmel.png
│   │   ├── partner-msrcasc.png
│   │   ├── partner-presidency.png
│   │   ├── partner-ramaiah.png
│   │   ├── partner-ribs.png
│   │   ├── partner-sapthagiri.png
│   │   ├── partner-st-pauls.png
│   │   ├── partner-yenepoya.png
│   │   ├── trainer-profile.png
│   │   ├── zecurx-icon.png
│   │   ├── zecurx-wordmark.png
│   │   ├── zxCCE.png
│   │   ├── zxCCF.png
│   │   ├── zxCCP.png
│   │   ├── zxCFD.png
│   │   ├── zxCPEH.png
│   │   ├── zxCPPT.png
│   │   └── zxGAIP.png
│   └── favicon.svg
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

Generated folders such as `node_modules/`, `dist/`, and `.vercel/` are omitted
from source control and from the downloadable source archive.

## Assets and external connections

All logos, course marks, partner marks, the trainer photograph, and the hero
photograph are included under `public/assets/`.

At runtime, the site only makes these external connections:

- Google Fonts for DM Sans and Sora.
- Official partner websites and ZecurX contact pages when a visitor follows an
  external link.
- The photographer's Unsplash profile when the photo credit is selected.

No credentials are needed for these links. If Google Fonts is unavailable, the
CSS falls back to the browser's sans-serif font.

## Current limitations

- Course enrollment and team-training actions link to the existing ZecurX
  website rather than an in-project checkout or CRM.
- Course, trainer, and partner content is source-controlled and does not have a
  CMS or administrator dashboard.
- This project intentionally remains a Vite static site because its current
  functionality does not require Next.js server rendering or API routes.


## Payments (Razorpay)

Routes (hash based, so no server rewrites are needed):

| URL | Page |
| --- | --- |
| `/` | Home and course cards |
| `/#/course/<code>` | Course overview, enroll card, ratings and comments (last) |
| `/#/checkout/<code>` | Checkout page with order summary and No Refund Policy acceptance |
| `/#/refund-policy` | No Refund Policy |

Backend (Vercel serverless functions in `api/`):

- `POST /api/create-order` validates the course and policy acceptance, takes the price from `api/_prices.ts`, and creates a Razorpay order.
- `POST /api/verify-payment` verifies the Razorpay signature and fetches the payment status.
- `POST /api/razorpay-webhook` receives Razorpay's server-to-server events (`order.paid`, `payment.captured`, `payment.failed`), verifies the signature on the raw body, and records the enrollment even if the buyer closed the tab. Needs `RAZORPAY_WEBHOOK_SECRET`.
- `api/_enroll.ts` is the one place to save enrollments and send emails; both flows call it, so key it by payment ID to avoid duplicates.

Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in Vercel (see `.env.example`). Run locally with `vercel dev` so `/api` works.


## Verified reviews (certificate holders only)

Only learners who received a ZecurX certificate can post a review.

1. A learner pays (stored by `api/_enroll.ts`) or joins through an institution.
2. When they complete the course, issue their certificate ID (admin only):

```bash
curl -X POST https://YOUR-DOMAIN/api/admin-issue-certificate \
  -H "x-admin-key: $ADMIN_API_KEY" -H "Content-Type: application/json" \
  -d '{"courseCode":"zxCPEH","name":"Ananya Rao","email":"ananya@example.com"}'
```

3. Send the returned `certificateId` to the learner with their certificate.
4. On the course page they enter the certificate ID and the same email. The server checks both against the course, allows one review per certificate, and limits attempts per IP.

List recent paid enrollments (admin only): `curl -H "x-admin-key: $ADMIN_API_KEY" https://YOUR-DOMAIN/api/admin-enrollments`


## Review approval emails

New reviews are held until you approve them from an email, sent through SendGrid.

1. SendGrid -> Settings -> API Keys -> Create API Key -> Restricted Access -> enable **Mail Send** -> copy the key (starts with `SG.`).
2. SendGrid -> Settings -> Sender Authentication: verify a Single Sender (or your domain). This is the address emails are sent from.
3. In Vercel -> Project -> Settings -> Environment Variables add:
   - `SENDGRID_API_KEY` = the key from step 1
   - `REVIEW_FROM_EMAIL` = the verified sender, e.g. `reviews@yourdomain.com`
   - `REVIEW_NOTIFY_EMAIL` = the inbox that should receive approval requests
   - `ADMIN_API_KEY` = any random string of 16+ characters (signs the approve/reject links)
   - `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (storage, already needed for reviews)
   - Optional: `SITE_URL` (https://yourdomain.com)
4. Redeploy.

The email contains **Review & approve** and **Reject** buttons. You do not add those links yourself: the server creates them for every review.

The `/api` routes only exist on Vercel. `pnpm dev` (plain Vite) cannot run them, so test reviews, coupons and payments with `vercel dev` or on a deployed preview.
