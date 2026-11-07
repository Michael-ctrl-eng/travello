/**
 * Re-shoot 01 + 08 only — verify price chip now floats on the card image.
 * Also reports DOM geometry of the chip vs the image for programmatic proof.
 */
const { chromium } = require("playwright");

const BASE = "http://localhost:3010";
const OUT = "/home/z/my-project/download/shots";
const EGP_BTN = '.currency-switch .currency-opt[data-currency="EGP"]';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });

  try { await page.goto(BASE + "/listings", { waitUntil: "networkidle", timeout: 45000 }); }
  catch { await page.goto(BASE + "/listings", { waitUntil: "load", timeout: 30000 }).catch(() => {}); }
  await page.waitForTimeout(2500);

  // Programmatic geometry check: chip must sit inside the img's box
  const geo = await page.evaluate(() => {
    const img = document.querySelector(".listing-card .listing-media img");
    const chip = document.querySelector(".listing-card .price-chip");
    const media = document.querySelector(".listing-card .listing-media");
    const ib = img.getBoundingClientRect(), cb = chip.getBoundingClientRect(), mb = media.getBoundingClientRect();
    return {
      imgBottom: ib.bottom, chipTop: cb.top, chipBottom: cb.bottom, chipLeft: cb.left,
      mediaBottom: mb.bottom, mediaTop: mb.top,
      chipInsideMedia: cb.bottom <= mb.bottom && cb.top >= mb.top && cb.left >= mb.left,
      chipAboveCardBody: cb.bottom <= ib.bottom,
      chipText: chip.textContent.replace(/\s+/g, " ").trim(),
    };
  });

  await page.screenshot({ path: OUT + "/01-listings-usd.png", fullPage: true });
  await page.click(EGP_BTN);
  await page.waitForTimeout(800);
  const egpText = (await page.textContent(".price-chip-amount")).trim();
  await page.screenshot({ path: OUT + "/08-listings-egp.png", fullPage: true });

  await ctx.close();
  await browser.close();
  console.log(JSON.stringify({ geo, usdFirstCard: geo.chipText, egpFirstCard: egpText, consoleErrors: errs }, null, 2));
})().catch((e) => { console.error("FATAL:", e); process.exit(1); });
