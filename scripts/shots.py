"""Screenshot every themed page for visual verification."""
import pathlib
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173"
OUT = pathlib.Path("/home/z/my-project/shots")
OUT.mkdir(exist_ok=True)

PAGES = [
    ("listings", "/listings", True),
    ("listings-flash", "/listings?flash=success", False),
    ("listings-logged-in", "/listings?user=1", False),
    ("show", "/listings/L0?user=1", True),
    ("login", "/login", False),
    ("signup", "/signup", False),
    ("new-listing", "/listings/new", False),
    ("edit-listing", "/listings/demo/edit?user=1", False),
    ("bookings", "/bookings/my-reservations?user=1", False),
    ("booking-success", "/bookings/success", False),
    ("error", "/error-demo", False),
]

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Desktop pass
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    page = ctx.new_page()
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))

    for name, path, full in PAGES:
        page.goto(BASE + path, wait_until="networkidle", timeout=45000)
        page.wait_for_timeout(1600)  # let entrance animations finish
        page.screenshot(path=str(OUT / f"{name}.png"), full_page=full)
        print("shot:", name)

    # Frosted-glass proof: scroll content under the sticky navbar + toolbar
    page.goto(BASE + "/listings", wait_until="networkidle", timeout=45000)
    page.wait_for_timeout(800)
    page.evaluate("window.scrollTo({top: 700})")
    page.wait_for_timeout(900)
    page.screenshot(path=str(OUT / "scrolled-glass.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 420})
    print("shot: scrolled-glass")

    print("console errors:", errors if errors else "none")
    ctx.close()

    # Mobile pass
    mctx = browser.new_context(
        viewport={"width": 390, "height": 844}, device_scale_factor=2,
        is_mobile=True, has_touch=True,
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    )
    mpage = mctx.new_page()
    mpage.goto(BASE + "/listings", wait_until="networkidle", timeout=45000)
    mpage.wait_for_timeout(1600)
    mpage.screenshot(path=str(OUT / "mobile-listings.png"))
    mpage.screenshot(path=str(OUT / "mobile-listings-full.png"), full_page=True)

    # mobile nav open state
    mpage.click(".navbar-toggler")
    mpage.wait_for_timeout(700)
    mpage.screenshot(path=str(OUT / "mobile-nav-open.png"))
    mctx.close()

    browser.close()
    print("done")
