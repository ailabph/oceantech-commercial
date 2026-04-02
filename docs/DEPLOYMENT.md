# Deployment

## Overview

Each brand is a standalone Next.js app deployed to Cloudflare Pages via GitHub Actions.

| Brand | URL | CF Pages Project | Status |
|-------|-----|-----------------|--------|
| **brand-2** | **https://oceantechoffshore.com** | oceantech-brand-2 | **LIVE — selected main theme** |
| brand-1 | https://brand-1.oceantechoffshore.com | oceantech-brand-1 | Alternative |
| brand-2 | https://brand-2.oceantechoffshore.com | oceantech-brand-2 | Alternative (mirror of main) |
| brand-3 | https://brand-3.oceantechoffshore.com | oceantech-brand-3 | Alternative |

---

## How It Works

Push to main triggers GitHub Actions, which builds all 3 brands in parallel and deploys static output to Cloudflare Pages via Wrangler.

    push to main
        └── GitHub Actions (.github/workflows/deploy.yml)
                ├── deploy-brand-1 (parallel)
                │       ├── npm install
                │       ├── npm run build  →  apps/brand-1/out/
                │       └── wrangler pages deploy → oceantech-brand-1.pages.dev
                ├── deploy-brand-2 (parallel)
                │       ├── npm install
                │       ├── npm run build  →  apps/brand-2/out/
                │       └── wrangler pages deploy → oceantech-brand-2.pages.dev
                └── deploy-brand-3 (parallel)
                        ├── npm install
                        ├── npm run build  →  apps/brand-3/out/
                        └── wrangler pages deploy → oceantech-brand-3.pages.dev

DNS: brand-X.oceantechoffshore.com → CNAME → oceantech-brand-X.pages.dev (Cloudflare proxied)

---

## Build Configuration

Each brand uses output: export in next.config.ts for static HTML generation:

    const nextConfig: NextConfig = {
      output: 'export',
      images: { unoptimized: true },
    };

Build output goes to apps/brand-X/out/ — this is what gets deployed to Cloudflare Pages.

---

## GitHub Actions Secrets

| Secret | Description |
|--------|-------------|
| CF_API_TOKEN | Cloudflare API token with Pages:Edit + Account:Read |
| CF_ACCOUNT_ID | Cloudflare account ID |

To rotate the CF token: generate a new one at dash.cloudflare.com → My Profile → API Tokens,
then update CF_API_TOKEN in the repo GitHub Actions secrets.

---

## Infrastructure

- Repo: https://github.com/ailabph/oceantech-commercial
- Cloudflare Account: sage.kafra@proton.me
- Zone: oceantechoffshore.com (same Cloudflare account)
- VPS: oceantech (192.168.122.49 on agent-farm-2) — development only, not in traffic path

---

## Local Development

    cd apps/brand-1   # or brand-2, brand-3
    npm install
    npm run dev       # http://localhost:3000

## Manual Deploy (if needed)

    cd apps/brand-1
    npm run build
    npx wrangler pages deploy out --project-name=oceantech-brand-1
