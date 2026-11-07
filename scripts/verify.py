"""Programmatic verification of the Apple glass theme on every page."""
import json
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173"

CHECKS_JS = """
() => {
  const r = {};
  // 1. Page has no horizontal overflow
  r.hOverflow = document.documentElement.scrollWidth - window.innerWidth;

  // 2. Navbar is frosted glass
  const nav = document.querySelector('.navbar');
  const cs = getComputedStyle(nav);
  r.nav = {
    backdrop: cs.backdropFilter || cs.webkitBackdropFilter,
    bg: cs.backgroundColor,
    height: cs.height,
    sticky: cs.position,
  };

  // 3. Brand wordmark exists
  r.brandWord = !!document.querySelector('.nav-brand-word');

  // 4. Primary CTA is Apple blue pill
  const cta = document.querySelector('.btn-apple, .nav-link-pill');
  if (cta) {
    const c = getComputedStyle(cta);
    r.cta = { bg: c.backgroundColor, radius: c.borderRadius, color: c.color };
  }

  // 5. Body font stack + background
  const b = getComputedStyle(document.body);
  r.body = { font: b.fontFamily.slice(0, 90), bg: b.backgroundColor, color: b.color };

  // 6. Aurora layer exists (glass needs something to blur)
  r.hasAurora = getComputedStyle(document.body, '::before').backgroundImage !== 'none';

  // 7. Glass cards present anywhere
  r.glassCount = document.querySelectorAll(
    '.glass-card, .listing-card, .booking-card, .booking-widget, .review-card, #filters-container, .tax-toggle'
  ).length;

  // 8. Any unstyled bootstrap red / dark buttons left over?
  r.oldRed = [...document.querySelectorAll('.btn')].filter(el => {
    const c = getComputedStyle(el).backgroundColor;
    return c === 'rgb(254, 66, 77)' || c === 'rgb(220, 53, 69)';
  }).length;
  r.bsDark = [...document.querySelectorAll('.btn')].filter(el =>
    getComputedStyle(el).backgroundColor === 'rgb(33, 37, 41)'
  ).length;

  // 9. Images loaded ok
  r.brokenImgs = [...document.images].filter(i => i.complete && i.naturalWidth === 0).length;

  // 10. Footer frosted
  const f = document.querySelector('footer');
  r.footer = f ? { bg: getComputedStyle(f).backgroundColor, blur: getComputedStyle(f).backdropFilter } : null;

  return r;
}
"""

PAGES = [
    "listings", "listings?user=1", "listings/L0?user=1", "login", "signup",
    "listings/new", "listings/demo/edit?user=1", "bookings/my-reservations?user=1",
    "bookings/success", "error-demo",
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    report = {}
    for path in PAGES:
        page.goto(BASE + "/" + path, wait_until="networkidle", timeout=45000)
        page.wait_for_timeout(400)
        report[path] = page.evaluate(CHECKS_JS)
    browser.close()

for path, r in report.items():
    issues = []
    if r["hOverflow"] > 1: issues.append(f"H-OVERFLOW {r['hOverflow']}px")
    if "blur" not in (r["nav"]["backdrop"] or ""): issues.append("nav not blurred")
    if "rgba(255, 255, 255" not in r["nav"]["bg"]: issues.append(f"nav bg {r['nav']['bg']}")
    if not r["brandWord"]: issues.append("no wordmark")
    if r.get("cta") and r["cta"]["bg"] not in ("rgb(0, 113, 227)", "rgb(0, 119, 237)"):
        issues.append(f"cta bg {r['cta']['bg']}")
    if r.get("cta") and "980" not in r["cta"]["radius"]: issues.append(f"cta radius {r['cta']['radius']}")
    if "Inter" not in r["body"]["font"]: issues.append(f"font {r['body']['font'][:40]}")
    if not r["hasAurora"]: issues.append("no aurora bg")
    if r["glassCount"] == 0: issues.append("no glass surfaces")
    if r["oldRed"]: issues.append(f"{r['oldRed']} old red buttons")
    if r["bsDark"]: issues.append(f"{r['bsDark']} bootstrap dark buttons")
    if r["brokenImgs"]: issues.append(f"{r['brokenImgs']} broken images")
    status = "OK " if not issues else "FAIL"
    print(f"[{status}] {path}" + ("" if not issues else "  -> " + "; ".join(issues)))

# print full detail for two key pages
print("\n--- detail: listings ---")
print(json.dumps(report["listings"], indent=1, ensure_ascii=False))
print("\n--- detail: listings/L0?user=1 ---")
print(json.dumps(report["listings/L0?user=1"], indent=1, ensure_ascii=False))
