#!/usr/bin/env bash
# Publish the Travello repo to GitHub.
# Usage:  GH_TOKEN=ghp_xxx bash scripts/publish.sh [repo-name] [private|public]
# - authenticates, creates the repo under the token owner's account,
# - pushes main, verifies remote HEAD, leaves a clean remote URL (no token stored).
set -euo pipefail
cd /home/z/my-project
TOKEN="${GH_TOKEN:?Set GH_TOKEN to a GitHub personal access token (repo scope)}"
NAME="${1:-travello}"
VIS="${2:-private}"   # private (default) | public
PRIV=$( [ "$VIS" = "private" ] && echo true || echo false )

echo "== authenticating =="
LOGIN=$(curl -sf -H "Authorization: Bearer $TOKEN" https://api.github.com/user \
  | python3 -c 'import json,sys; print(json.load(sys.stdin)["login"])') \
  || { echo "FATAL: token rejected by GitHub (Bad credentials)"; exit 1; }
echo "authenticated as: $LOGIN"

echo "== creating repo $LOGIN/$NAME ($VIS) =="
CODE=$(curl -s -o /tmp/repo.json -w "%{http_code}" -X POST \
  -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$NAME\",\"description\":\"Travello — premium stays, reimagined. Next.js booking experience.\",\"private\":$PRIV,\"has_wiki\":false}")
case "$CODE" in
  201) echo "repo created" ;;
  422) echo "repo already exists — continuing with push" ;;
  *)   echo "FATAL: repo create failed (HTTP $CODE)"; head -c 300 /tmp/repo.json; echo; exit 1 ;;
esac

git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$LOGIN/$NAME.git"

echo "== pushing =="
git push "https://x-access-token:${TOKEN}@github.com/${LOGIN}/${NAME}.git" main:main

echo "== verifying remote =="
sleep 2
REMOTE_SHA=$(curl -sf -H "Authorization: Bearer $TOKEN" "https://api.github.com/repos/$LOGIN/$NAME/commits/main" \
  | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("sha","?")[:7])')
LOCAL_SHA=$(git rev-parse --short HEAD)
echo "local HEAD: $LOCAL_SHA | remote HEAD: $REMOTE_SHA"
[ "$LOCAL_SHA" = "$REMOTE_SHA" ] && echo "PUSH VERIFIED" || { echo "WARNING: remote sha mismatch"; exit 1; }
echo "DONE: https://github.com/$LOGIN/$NAME"
