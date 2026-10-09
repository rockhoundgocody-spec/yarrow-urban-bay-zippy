/** Offline check: load once online, then go offline and reload core pages. */
import { chromium } from "playwright";
const base = (process.argv[2] || "http://127.0.0.1:8081").replace(/\/$/, "");
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
await ctx.addInitScript(() => { try { if (!localStorage.getItem("rhgo-field-v2")) localStorage.setItem("rhgo-field-v2", JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 0 })); } catch {} });
const page = await ctx.newPage();
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.evaluate(async () => { await navigator.serviceWorker.ready; });
await page.reload({ waitUntil: "networkidle" }); // now controlled by the SW
await page.goto(base + "/pedia/quartz", { waitUntil: "networkidle" });
await ctx.setOffline(true);
let fail = false;
for (const p of ["/", "/pedia", "/pedia/quartz", "/explore", "/identify", "/vault"]) {
  const errs = [];
  page.removeAllListeners("pageerror");
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(base + p, { waitUntil: "load" }).catch((e) => errs.push(e.message));
  await page.waitForTimeout(600);
  const h1 = await page.evaluate(() => document.querySelector("h1")?.textContent?.trim() || "");
  const ok = h1 && !/^Offline$/.test(h1) && errs.length === 0;
  if (!ok) fail = true;
  console.log(`${ok ? "PASS" : "FAIL"} offline ${p} h1="${h1}" ${errs.join("; ").slice(0, 160)}`);
}
await browser.close();
process.exit(fail ? 1 : 0);
