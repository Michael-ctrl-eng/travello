/**
 * Screenshot harness — loads the preview-server pages in headless Chromium
 * at 1440px wide, saves full-page PNGs to download/shots/, and runs the
 * currency-toggle + booking-widget verification checks.
 */
const fs = require("fs");
const { chromium } = require("playwright");

const BASE = "http://localhost:3010";
const OUT = "/home/z/my-project/download/shots";
const EGP_BTN = '.currency-switch .currency-opt[data-currency="EGP"]';

const results = { pages: {}, currency: {}, booking: {}, consoleErrors: {} };

async function freshPage(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 300)); });
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
  return { ctx, page, errs };
}

async function load(page, route) {
  const url = BASE + route;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  } catch (e) {
    // networkidle can be blocked by flaky CDNs — fall back to load state
    try { await page.goto(url, { waitUntil: "load", timeout: 30000 }); }
    catch (e2) { /* keep whatever loaded */ }
  }
  await page.waitForTimeout(2500); // extra time for CDN images (unsplash etc.)
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  /* ---------- 01 + 08: /listings with currency toggle test ---------- */
  {
    const { ctx, page, errs } = await freshPage(browser);
    await load(page, "/listings");
    results.currency.usdFirstCard = (await page.textContent(".price-chip-amount")).trim();
    await page.screenshot({ path: OUT + "/01-listings-usd.png", fullPage: true });
    await page.click(EGP_BTN);
    await page.waitForTimeout(800);
    await page.screenshot({ path: OUT + "/08-listings-egp.png", fullPage: true });
    results.currency.egpFirstCard = (await page.textContent(".price-chip-amount")).trim();
    results.currency.localStorageAfterClick = await page.evaluate(() => localStorage.getItem("wl-currency"));
    results.consoleErrors["/listings"] = errs;
    await ctx.close();
  }

  /* ---------- 02–07: static page screenshots (fresh USD contexts) ---------- */
  const statics = [
    ["/listings/l1", "02-show.png"],
    ["/listings/new", "03-new-listing.png"],
    ["/login", "04-login.png"],
    ["/signup", "05-signup.png"],
    ["/bookings/my-reservations", "06-bookings.png"],
    ["/bookings/success-preview", "07-success.png"],
  ];
  for (const [route, name] of statics) {
    const { ctx, page, errs } = await freshPage(browser);
    await load(page, route);
    await page.screenshot({ path: OUT + "/" + name, fullPage: true });
    results.pages[route] = name;
    results.consoleErrors[route] = errs;
    await ctx.close();
  }

  /* ---------- 09 + booking widget math on /listings/l1 (fresh USD context) ---------- */
  {
    const { ctx, page, errs } = await freshPage(browser);
    await load(page, "/listings/l1");
    await page.evaluate(() => {
      const set = (sel, val) => {
        const el = document.querySelector(sel);
        el.value = val;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      };
      set("#check-in", "2026-11-20");
      set("#check-out", "2026-11-25");
    });
    await page.waitForTimeout(500);
    results.booking.usd = {
      rateCalc: (await page.textContent("#rate-calc")).trim(),
      subTotal: (await page.textContent("#sub-total")).trim(),
      grandTotal: (await page.textContent("#grand-total")).trim(),
    };
    await page.click(EGP_BTN);
    await page.waitForTimeout(500);
    results.booking.egpGrandTotal = (await page.textContent("#grand-total")).trim();
    await page.screenshot({ path: OUT + "/09-show-egp.png", fullPage: true });
    results.consoleErrors["/listings/l1#booking"] = errs;
    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})().catch((e) => { console.error("FATAL:", e); process.exit(1); });
