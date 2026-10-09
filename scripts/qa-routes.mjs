/**
 * Route QA: visits every app route (plus sampled detail pages and a bogus
 * URL) at phone size and reports HTTP status, h1, robots/canonical, console
 * errors, page errors, CSP violations, failed requests, horizontal overflow,
 * and every internal link target's status (dead-link check).
 *
 *   node scripts/qa-routes.mjs http://127.0.0.1:8080 [--shots]
 * Exit code 1 on any failure.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = (process.argv[2] || "http://127.0.0.1:8080").replace(/\/$/, "");
const shots = process.argv.includes("--shots");

const ROUTES = [
  ["/", 200], ["/explore", 200], ["/explore/crater-diamonds", 200], ["/identify", 200],
  ["/pedia", 200], ["/pedia/quartz", 200], ["/pedia/amethyst", 200], ["/safety", 200],
  ["/trips", 200], ["/quests", 200], ["/profile", 200], ["/vault", 200], ["/clover", 200],
  ["/community", 200], ["/market", 200], ["/pedia/not-a-mineral", 404],
  ["/explore/not-a-site", 404], ["/no-such-page", 404],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
// Skip first-run overlays so page content is what gets checked.
await ctx.addInitScript(() => {
  try {
    const key = "rhgo-field-v2";
    const cur = JSON.parse(localStorage.getItem(key) || "null");
    if (!cur) localStorage.setItem(key, JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 0 }));
  } catch {}
});

let failed = false;
const links = new Set();
if (shots) mkdirSync("screenshots", { recursive: true });

for (const [path, expect] of ROUTES) {
  const page = await ctx.newPage();
  const problems = [];
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    // Chrome logs the document's own intentional 404 as a resource error;
    // real subresource 4xx/5xx are caught by the response listener below.
    if (expect === 404 && /status of 404/.test(m.text()) && m.location().url.replace(base, "") === path) return;
    problems.push(`console: ${m.text().slice(0, 200)} @ ${m.location().url}`);
  });
  page.on("response", (r) => {
    if (r.request().resourceType() === "document") return;
    if (r.url().startsWith(base) && r.status() >= 400) problems.push(`subresource ${r.status()}: ${r.url()}`);
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${String(e.message).slice(0, 200)}`));
  page.on("requestfailed", (r) => {
    const u = r.url();
    if (!u.startsWith(base)) return; // third-party flakiness is reported via console if it matters
    problems.push(`requestfailed: ${u} ${r.failure()?.errorText}`);
  });
  const res = await page.goto(base + path, { waitUntil: "networkidle", timeout: 45000 }).catch((e) => {
    problems.push(`goto: ${e.message}`);
    return null;
  });
  const status = res?.status() ?? 0;
  await page.waitForTimeout(400);
  const info = await page.evaluate(() => ({
    h1: [...document.querySelectorAll("h1")].map((h) => h.textContent?.trim()).join(" | "),
    robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
    canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.getAttribute("href")),
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    hrefs: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
  }));
  for (const h of info.hrefs) if (h && h.startsWith("/") && !h.startsWith("//")) links.add(h.split("#")[0]);
  if (status !== expect) problems.push(`status ${status} (expected ${expect})`);
  if (!info.h1) problems.push("no h1");
  if (info.canonical.length > 1) problems.push(`duplicate canonical ${info.canonical.join(",")}`);
  if (info.overflow > 1) problems.push(`horizontal overflow ${info.overflow}px`);
  if (shots) await page.screenshot({ path: `screenshots/route${path.replace(/\//g, "_") || "_home"}.png` });
  const ok = problems.length === 0;
  if (!ok) failed = true;
  console.log(`${ok ? "PASS" : "FAIL"} ${status} ${path}  h1="${info.h1}"  robots="${info.robots}"`);
  for (const p of problems) console.log(`     - ${p}`);
  await page.close();
}

// Dead-link sweep over every internal href seen on the pages above.
const dead = [];
for (const href of [...links].sort()) {
  const r = await ctx.request.get(base + href, { maxRedirects: 3 }).catch(() => null);
  if (!r || r.status() >= 400) dead.push(`${href} → ${r?.status() ?? "ERR"}`);
}
console.log(`\nInternal links checked: ${links.size}; dead: ${dead.length}`);
for (const d of dead) console.log(`  DEAD ${d}`);
if (dead.length) failed = true;

await browser.close();
process.exit(failed ? 1 : 0);
