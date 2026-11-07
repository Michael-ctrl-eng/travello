/**
 * Live-site verification for the deployed Travello app.
 * Usage: node scripts/verify-live.js https://<deployment-url>
 */
const { chromium } = require("playwright");
const BASE = process.argv[2];
if (!BASE) { console.error("usage: node verify-live.js <url>"); process.exit(2); }

const results = [];
function ok(name, cond, detail) {
  results.push([cond ? "PASS" : "FAIL", name, detail == null ? "" : String(detail)]);
  if (!cond) process.exitCode = 1;
}

(async () => {
  const browser = await chromium.launch();
  /* .tmp.now blocks HeadlessChrome UA (403) — use a real Chrome UA */
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    locale: "en-US",
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(800);

  const html = await page.content();
  ok("no 'wanderlust' on live site", !/wanderlust/i.test(html));
  const brand = ((await page.locator(".wl-brand-word").first().textContent()) || "").trim();
  ok("live navbar brand is Travello", brand === "Travello", `got "${brand}"`);
  ok("live title", /Travello/.test(await page.title()), await page.title());
  ok("hero image loaded", (await page.locator(".wl-hero-media img, img").first().getAttribute("src")) != null);

  await page.locator(".wl-card-btn").first().click();
  await page.waitForSelector(".wl-modal-panel", { timeout: 15000 });
  await page.waitForTimeout(500);
  const total = () => page.locator(".wl-bd-total span").last().textContent();
  const guests = () => page.locator(".wl-stepper strong").first().textContent();
  const t0 = (await total()).trim();
  const g0 = Number(await guests());
  for (let i = 0; i < 3; i++) await page.click('button[aria-label="More guests"]');
  await page.waitForTimeout(400);
  const t1 = (await total()).trim();
  ok("live: total constant when adding guests", t1 === t0, `${t0} -> ${t1} (guests ${g0} -> ${await guests()})`);
  for (let i = 0; i < 2; i++) await page.click('button[aria-label="Fewer guests"]');
  await page.waitForTimeout(400);
  const t2 = (await total()).trim();
  ok("live: total constant when removing guests", t2 === t0, `${t0} -> ${t2}`);
  ok("live: no console errors", errs.length === 0, errs.join(" ; "));

  await browser.close();
  console.log(results.map((r) => r.join("  |  ")).join("\n"));
  console.log(`\n${results.filter((r) => r[0] === "PASS").length} passed, ${results.filter((r) => r[0] === "FAIL").length} failed`);
})().catch((e) => { console.error("LIVE VERIFY CRASH:", e); process.exit(2); });
