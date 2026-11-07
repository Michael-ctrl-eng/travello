#!/bin/bash
# Travello — fetch real destination photos via z-ai image-search (concurrent, stdout capture)
OUT=/home/z/my-project/scripts/imgs
mkdir -p "$OUT"

declare -A Q=(
  [giza]="Great Pyramids of Giza with the Sphinx at golden hour Egypt"
  [hurghada]="Hurghada Red Sea resort beach with turquoise water Egypt"
  [luxor]="Luxor Temple and the Nile river at sunset Egypt"
  [alaska]="Alaska Denali wilderness cabin with northern lights aurora"
  [hawaii]="Hawaii Maui beach with palm trees and turquoise ocean"
  [santorini]="Santorini white houses blue domes overlooking the caldera Greece"
  [cappadocia]="Cappadocia hot air balloons at sunrise over fairy chimneys Turkey"
  [iceland]="Iceland northern lights aurora over a cozy glass lodge"
  [maldives]="Maldives overwater bungalow villa on turquoise lagoon"
  [zermatt]="Zermatt Matterhorn alpine chalet snow Switzerland"
  [petra]="Petra the Treasury carved rock facade Jordan"
  [tuscany]="Tuscany countryside farmhouse among rolling hills and cypress Italy"
)

for key in "${!Q[@]}"; do
  z-ai image-search -q "${Q[$key]}" --count 2 --gl us --no-rank > "$OUT/$key.txt" 2>&1 &
done
wait
echo "ALL DONE"

python3 - <<'PY'
import json, os, re
d = "/home/z/my-project/scripts/imgs"
out = {}
for name in sorted(os.listdir(d)):
    if not name.endswith(".txt"): continue
    key = name[:-4]
    raw = open(os.path.join(d, name)).read()
    m = re.search(r"\{.*\}", raw, re.S)
    if not m:
        print(key, "NO JSON:", raw[:100].replace("\n"," ")); continue
    try:
        j = json.loads(m.group(0))
        urls = [r["original_url"] for r in j.get("results", [])]
        out[key] = urls
        print(key, "->", urls[0] if urls else "EMPTY")
    except Exception as e:
        print(key, "PARSE ERR", e)
json.dump(out, open("/home/z/my-project/scripts/imgs/urls.json","w"), indent=1)
print("saved urls.json with", len(out), "keys")
PY
