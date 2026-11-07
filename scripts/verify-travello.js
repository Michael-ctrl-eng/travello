/**
 * Travello verification — runs against the production build on :3000.
 * Checks: (1) Travello branding everywhere, (2) no "wanderlust" text left,
 * (3) adding/removing guests NEVER changes the total price (per-stay pricing).
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BASE = "http://localhost:3000";
const OUT = "/home/z/my-project/download/shots/travello-verify";
fs.mkdirSync(OUT, { recursive: true });

const results = [];
function ok(name, cond, detail) {
  results.push([cond ? "PASS" : "FAIL", name, detail == null ? "" : String(detail)]);
  if (!cond) process.exitCode = 1;
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(600);

  /* ---- branding ---- */
  const html = await page.content();
  ok("no 'wanderlust' string anywhere on the page", !/wanderlust/i.test(html));
  const brand = ((await page.locator(".wl-brand-word").first().textContent()) || "").trim();
  ok("navbar brand is Travello", brand === "Travello", `got "${brand}"`);
  const footer = ((await page.locator(".wl-footer-word").first().textContent()) || "").trim();
  ok("footer brand is Travello", footer === "Travello", `got "${footer}"`);
  const title = await page.title();
  ok("document title contains Travello", /Travello/.test(title), title);
  const aboutLink = ((await page.locator("footer a").filter({ hasText: "About" }).first().textContent()) || "").trim();
  ok("footer About link says Travello", aboutLink.includes("Travello"), aboutLink);
  await page.screenshot({ path: path.join(OUT, "01-hero.png") });

  /* ---- open first listing modal ---- */
  await page.locator(".wl-card-btn").first().click();
  await page.waitForSelector(".wl-modal-panel", { timeout: 10000 });
  await page.waitForTimeout(400);
  const total = () => page.locator(".wl-bd-total span").last().textContent();
  const guests = () => page.locator(".wl-stepper strong").first().textContent();

  const g0 = Number(await guests());
  const t0 = (await total()).trim();
  ok("modal opened with total price", t0.length > 0, `total=${t0} @ ${g0} guests`);
  await page.screenshot({ path: path.join(OUT, "02-modal.png") });

  /* ---- add guests: price must stay constant ---- */
  for (let i = 0; i < 3; i++) await page.click('button[aria-label="More guests"]');
  await page.waitForTimeout(300);
  const g1 = Number(await guests());
  const t1 = (await total()).trim();
  ok("guests increased", g1 === g0 + 3, `${g0} -> ${g1}`);
  ok("TOTAL UNCHANGED after adding guests", t1 === t0, `${t0} -> ${t1} (guests ${g0} -> ${g1})`);

  const note = (await page.locator(".wl-bd-note--flat").first().textContent()) || "";
  ok("flat-price note reflects guest count", /Same total for 1/.test(note) && note.includes(String(g1)), note.trim());
  await page.screenshot({ path: path.join(OUT, "03-modal-more-guests.png") });

  /* ---- remove guests: price must stay constant ---- */
  for (let i = 0; i < 2; i++) await page.click('button[aria-label="Fewer guests"]');
  await page.waitForTimeout(300);
  const g2 = Number(await guests());
  const t2 = (await total()).trim();
  ok("guests decreased", g2 === g1 - 2, `${g1} -> ${g2}`);
  ok("TOTAL UNCHANGED after removing guests", t2 === t0, `${t0} -> ${t2} (guests ${g1} -> ${g2})`);

  /* ---- console health ---- */
  ok("no console/page errors", errs.length === 0, errs.join(" ; "));

  await browser.close();
  console.log(results.map((r) => r.join("  |  ")).join("\n"));
  console.log(`\n${results.filter((r) => r[0] === "PASS").length} passed, ${results.filter((r) => r[0] === "FAIL").length} failed`);
  console.log("screenshots -> " + OUT);
})().catch((e) => { console.error("VERIFY CRASH:", e); process.exit(2); });
