#!/bin/bash
# Retry failed image searches sequentially with delay
OUT=/home/z/my-project/scripts/imgs
declare -A Q=(
  [giza]="Great Pyramids of Giza with the Sphinx at golden hour Egypt"
  [hurghada]="Hurghada Red Sea resort beach with turquoise water Egypt"
  [luxor]="Luxor Temple and the Nile river at sunset Egypt"
  [alaska]="Alaska Denali wilderness cabin with northern lights aurora"
  [santorini]="Santorini white houses blue domes overlooking the caldera Greece"
  [iceland]="Iceland northern lights aurora over a cozy glass lodge"
  [maldives]="Maldives overwater bungalow villa on turquoise lagoon"
  [zermatt]="Zermatt Matterhorn alpine chalet snow Switzerland"
  [petra]="Petra the Treasury carved rock facade Jordan"
  [tuscany]="Tuscany countryside farmhouse among rolling hills and cypress Italy"
)

for key in giza hurghada luxor alaska santorini iceland maldives zermatt petra tuscany; do
  if grep -q '"original_url"' "$OUT/$key.txt" 2>/dev/null; then
    echo "$key already OK, skip"
    continue
  fi
  echo "fetching $key ..."
  z-ai image-search -q "${Q[$key]}" --count 2 --gl us --no-rank > "$OUT/$key.txt" 2>&1
  if grep -q '"original_url"' "$OUT/$key.txt"; then echo "$key OK"; else echo "$key FAILED"; fi
  sleep 6
done
echo "RETRY PASS DONE"

python3 - <<'PY'
import json, os, re
d = "/home/z/my-project/scripts/imgs"
out = {}
for name in sorted(os.listdir(d)):
    if not name.endswith(".txt"): continue
    key = name[:-4]
    raw = open(os.path.join(d, name)).read()
    urls = re.findall(r'"original_url":\s*"([^"]+)"', raw)
    if urls:
        out[key] = urls
        print(key, "->", urls[0])
    else:
        print(key, "-> EMPTY")
json.dump(out, open("/home/z/my-project/scripts/imgs/urls.json","w"), indent=1)
print("saved urls.json with", len(out), "keys")
PY
