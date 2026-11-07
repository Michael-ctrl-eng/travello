"""Mobile menu sheet verification: computed styles + fresh screenshots."""
import json
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173"

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(
        viewport={"width": 390, "height": 844}, device_scale_factor=2,
        is_mobile=True, has_touch=True,
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    )
    pg = ctx.new_page()
    pg.goto(BASE + "/listings", wait_until="networkidle", timeout=45000)
    pg.wait_for_timeout(1200)

    # open the menu
    pg.click(".navbar-toggler")
    pg.wait_for_timeout(900)

    styles = pg.evaluate("""() => {
      const nc = document.querySelector('.navbar-collapse');
      const cs = getComputedStyle(nc);
      const nav = document.querySelector('.navbar');
      const ns = getComputedStyle(nav);
      return {
        sheet: {
          bg: cs.backgroundColor,
          backdrop: cs.backdropFilter || cs.webkitBackdropFilter,
          radius: cs.borderRadius,
          flexDirection: cs.flexDirection,
          display: cs.display,
        },
        bar: { bg: ns.backgroundColor, backdrop: ns.backdropFilter || "none" },
        links: [...document.querySelectorAll('.navbar-collapse .nav-link')].map(a => {
          const r = a.getBoundingClientRect();
          return { text: a.textContent.trim(), x: Math.round(r.x), w: Math.round(r.width), y: Math.round(r.y) };
        }),
        overflowX: document.documentElement.scrollWidth - window.innerWidth,
      };
    }""")
    print(json.dumps(styles, indent=1))

    # scrolled menu over content — proves frost
    pg.evaluate("window.scrollTo({top: 500})")
    pg.wait_for_timeout(700)
    pg.screenshot(path="/home/z/my-project/shots/mobile-nav-open.png")

    # plain mobile listing page
    pg.evaluate("window.scrollTo({top: 0})")
    pg.wait_for_timeout(600)
    pg.screenshot(path="/home/z/my-project/shots/mobile-listings.png")
    ctx.close()
    b.close()
    print("done")
