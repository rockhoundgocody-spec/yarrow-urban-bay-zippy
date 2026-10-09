import { chromium } from "/workspace/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const base = process.argv[2] || "http://127.0.0.1:8081";
const AXE = readFileSync("/tmp/axe/node_modules/axe-core/axe.min.js", "utf8");
const ROUTES = ["/", "/explore", "/explore/crater-diamonds", "/identify", "/pedia", "/pedia/quartz", "/safety", "/trips", "/quests", "/profile", "/vault", "/clover", "/community", "/market", "/no-such-page"];
const out = { routes: {}, perf: {} };
const browser = await chromium.launch();
const seed = () => { try { if (!localStorage.getItem("rhgo-field-v2")) localStorage.setItem("rhgo-field-v2", JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 0 })); } catch {} };
// 1) a11y + ergonomics per route
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await ctx.addInitScript(seed);
  for (const r of ROUTES) {
    const page = await ctx.newPage();
    await page.goto(base + r, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.addScriptTag({ content: AXE });
    const res = await page.evaluate(async () => {
      const a = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } });
      const v = a.violations.map((x) => ({ id: x.id, impact: x.impact, n: x.nodes.length, sample: x.nodes.slice(0, 2).map((n) => n.target.join(" ") + " :: " + (n.failureSummary || "").split("\n").slice(1, 2).join(" ").slice(0, 140)) }));
      const vis = (el) => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.visibility !== "hidden" && s.display !== "none" && b.width > 0 && b.height > 0; };
      const inter = [...document.querySelectorAll("a[href],button,input,select,textarea,[role=button],[role=tab],summary")].filter(vis);
      const small = inter.map((el) => { const b = el.getBoundingClientRect(); return { el, w: Math.round(b.width), h: Math.round(b.height) }; });
      const under44 = small.filter((x) => x.w < 44 || x.h < 44).map((x) => `${x.el.tagName.toLowerCase()}${x.el.getAttribute("aria-label") ? "[" + x.el.getAttribute("aria-label") + "]" : ""} "${(x.el.textContent || "").trim().slice(0, 24)}" ${x.w}x${x.h}`);
      const under48 = small.filter((x) => x.w < 48 || x.h < 48).length;
      const texts = [...document.querySelectorAll("body *")].filter((el) => vis(el) && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1));
      const fs = texts.map((el) => parseFloat(getComputedStyle(el).fontSize));
      const h = [...document.querySelectorAll("h1,h2,h3,h4")].map((x) => x.tagName);
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return "ok"; } catch { return "BAD"; } });
      return { v, interactive: inter.length, under44: under44.length, under44s: under44.slice(0, 8), under48, textNodes: fs.length, lt11: fs.filter((x) => x < 11).length, lt12: fs.filter((x) => x < 12).length, lt14: fs.filter((x) => x < 14).length, headings: h.join(","), ld, overflow: document.documentElement.scrollWidth - innerWidth, dom: document.getElementsByTagName("*").length };
    });
    out.routes[r] = res;
    await page.close();
  }
  await ctx.close();
}
// 2) perf on throttled field network (Lighthouse "slow 4G" + 4x CPU), cold cache
for (const r of ["/", "/pedia/quartz", "/explore", "/identify", "/pedia"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  await ctx.addInitScript(seed);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  let bytes = 0, js = 0, reqs = 0;
  cdp.on("Network.loadingFinished", (e) => { bytes += e.encodedDataLength; reqs++; });
  cdp.on("Network.responseReceived", (e) => { if (e.type === "Script") js++; });
  await page.addInitScript(() => { window.__lcp = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true }); window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true }); });
  const t0 = Date.now();
  await page.goto(base + r, { waitUntil: "load", timeout: 90000 });
  const load = Date.now() - t0;
  await page.waitForTimeout(2500);
  const m = await page.evaluate(() => { const p = performance.getEntriesByType("paint").find((x) => x.name === "first-contentful-paint"); const n = performance.getEntriesByType("navigation")[0]; return { fcp: Math.round(p?.startTime || 0), lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), ttfb: Math.round(n.responseStart), domInteractive: Math.round(n.domInteractive) }; });
  out.perf[r] = { ...m, load, kbTransferred: Math.round(bytes / 1024), requests: reqs, scripts: js };
  await ctx.close();
}
await browser.close();
writeFileSync("/workspace/.audit/result.json", JSON.stringify(out, null, 1));
console.log("done");
