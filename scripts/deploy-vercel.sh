#!/usr/bin/env bash
# Deploy Travello to Vercel (production).
# Usage:  VERCEL_TOKEN=xxx bash scripts/deploy-vercel.sh
set -euo pipefail
cd /home/z/my-project
: "${VERCEL_TOKEN:?Set VERCEL_TOKEN to a token from https://vercel.com/account/tokens}"
echo "== deploying to Vercel (production) =="
vercel deploy --prod --yes --token "$VERCEL_TOKEN" 2>&1 | tee /tmp/vercel-deploy.log | tail -8
echo "== finding deployment URL =="
grep -oE "https://[a-z0-9-]+\.vercel\.app" /tmp/vercel-deploy.log | tail -1 || true
