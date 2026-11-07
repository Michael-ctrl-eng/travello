#!/usr/bin/env bash
# One-time migration: rebrand Wanderlust -> Travello everywhere in the repo.
# 1) git mv tracked paths/folders named "wanderlust"
# 2) drop stale gitlink entry "wanderlust" + untrack .env
# 3) rename legacy (untracked) folder on disk
# 4) replace all WanderLust/Wanderlust/wanderlust strings in tracked text files
# 5) same string replacement inside the legacy folder (untracked, local only)
set -euo pipefail
cd /home/z/my-project

echo "== 1/5 git mv tracked paths =="
git mv src/lib/wanderlust src/lib/travello
git mv src/components/wanderlust src/components/travello
git mv src/app/wanderlust.css src/app/travello.css
git mv download/wanderlust-apple-edition.zip download/travello-apple-edition.zip
git mv download/wanderlust-apple-edition-screenshots download/travello-apple-edition-screenshots

echo "== 2/5 drop stale gitlink + untrack .env =="
git rm --cached -q wanderlust || true
git rm --cached -q .env

echo "== 3/5 rename legacy folder on disk =="
if [ -d wanderlust ]; then mv wanderlust travello; fi

echo "== 4/5 replace strings in tracked text files =="
mapfile -t FILES < <(git grep -li wanderlust | grep -vE '\.(png|jpg|jpeg|zip|db|ico|woff2?|mp4)$' || true)
if [ "${#FILES[@]}" -gt 0 ]; then
  printf 'patching %s files:\n' "${#FILES[@]}"
  printf '  %s\n' "${FILES[@]}"
  sed -i 's/WANDERLUST/TRAVELLO/g; s/WanderLust/Travello/g; s/Wanderlust/Travello/g; s/wanderlust/travello/g' "${FILES[@]}"
else
  echo "no tracked text files to patch"
fi

echo "== 5/5 legacy folder (untracked, local only) =="
if [ -d travello ]; then
  grep -rli wanderlust travello --exclude-dir=node_modules -Z 2>/dev/null \
    | xargs -0 -r sed -i 's/WANDERLUST/TRAVELLO/g; s/WanderLust/Travello/g; s/Wanderlust/Travello/g; s/wanderlust/travello/g' || true
fi

echo "== leftover check (should be empty) =="
git grep -li wanderlust | grep -vE '\.(png|jpg|jpeg|zip|db|ico|woff2?|mp4)$' || echo "clean: no wanderlust left in tracked text files"
grep -rli wanderlust travello --exclude-dir=node_modules 2>/dev/null || echo "clean: no wanderlust left in legacy folder"
echo "== done =="
