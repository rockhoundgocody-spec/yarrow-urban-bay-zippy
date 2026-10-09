import { chromium } from "/workspace/node_modules/playwright/index.mjs";
import { readFileSync } from "node:fs";
const base = process.argv[2];
const AXE = readFileSync("/tmp/axe/node_modules/axe-core/axe.min.js", "utf8");
const ROUTES = ["/", "/explore", "/explore/crater-diamonds", "/identify", "/pedia", "/pedia/quartz", "/safety", "/trips", "/quests", "/profile", "/vault", "/clover", "/community", "/market", "/data", "/no-such-page"];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => { try { if (!localStorage.getItem("rhgo-field-v2")) localStorage.setItem("rhgo-field-v2", JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 3 })); } catch { /* blocked */ } });
let total = 0;
for (const r of ROUTES) {
  const p = await ctx.newPage(); await p.goto(base + r, { waitUntil: "networkidle" }); await p.waitForTimeout(400);
  await p.addScriptTag({ content: AXE });
  const v = await p.evaluate(async () => (await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } })).violations.map((x) => `${x.id}[${x.impact}]x${x.nodes.length}: ${x.nodes[0].target.join(" ")}`));
  total += v.length; console.log(r.padEnd(26), v.length ? v.join(" | ") : "clean"); await p.close();
}
console.log("violations:", total); await b.close();
