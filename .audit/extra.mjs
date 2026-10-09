import { chromium } from "/workspace/node_modules/playwright/index.mjs";
import { readFileSync } from "node:fs";
const base = "http://127.0.0.1:8081";
const AXE = readFileSync("/tmp/axe/node_modules/axe-core/axe.min.js", "utf8");
const ROUTES = ["/", "/explore", "/explore/crater-diamonds", "/explore/emerald-creek", "/identify", "/pedia", "/pedia/red-beryl", "/pedia/diamond", "/safety", "/trips", "/quests", "/profile", "/vault", "/clover", "/community", "/market", "/data", "/no-such-page"];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => { try { if (!localStorage.getItem("rhgo-field-v2")) localStorage.setItem("rhgo-field-v2", JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 3 })); } catch { /* blocked */ } });
let viol = 0, u44 = 0, u48 = 0, small = 0;
for (const r of ROUTES) {
  const p = await ctx.newPage(); const st = (await p.goto(base + r, { waitUntil: "networkidle" })).status(); await p.waitForTimeout(400);
  await p.addScriptTag({ content: AXE });
  const res = await p.evaluate(async () => {
    const v = (await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } })).violations.map((x) => `${x.id}x${x.nodes.length}`);
    const vis = (el) => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.visibility !== "hidden" && s.display !== "none" && b.width > 0 && b.height > 0; };
    const inter = [...document.querySelectorAll("a[href],button,input,select,textarea,[role=button]")].filter(vis).filter((el) => !el.closest(".sr-only") && !(el.type === "file"));
    const sz = inter.map((el) => el.getBoundingClientRect());
    const b48 = inter.filter((el, i) => sz[i].width < 48 || sz[i].height < 48).map((el) => `${el.tagName} "${(el.getAttribute("aria-label") || el.textContent).trim().slice(0, 18)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
    const texts = [...document.querySelectorAll("body *")].filter((el) => vis(el) && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1));
    return { v, u44: sz.filter((s) => s.width < 44 || s.height < 44).length, b48, small: texts.filter((el) => parseFloat(getComputedStyle(el).fontSize) < 12).length, h1: document.querySelector("h1")?.textContent };
  });
  viol += res.v.length; u44 += res.u44; u48 += res.b48.length; small += res.small;
  console.log(`${st} ${r.padEnd(26)} axe:${res.v.join(",") || "clean"} <44:${res.u44} <48:${res.b48.length} ${res.b48.slice(0, 3).join(" ; ")} <12px:${res.small} h1="${res.h1}"`);
  await p.close();
}
console.log(`TOTAL axe:${viol} <44:${u44} <48:${u48} <12px:${small}`);
// AI probe: capture endpoint, then send invalid payload
const p = await ctx.newPage(); let cap = null;
p.on("request", (r) => { if (r.method() === "POST" && r.url().includes("_serverFn")) cap = { url: r.url(), body: r.postData(), headers: r.headers() }; });
await p.goto(base + "/identify", { waitUntil: "networkidle" });
await p.setInputFiles('input[type="file"]', "/workspace/public/icons/icon-192.png");
await p.getByRole("button", { name: "Identify" }).click(); await p.waitForTimeout(3000);
const ui = await p.evaluate(() => [...document.querySelectorAll(".text-danger")].map((e) => e.textContent.trim()).join(" | "));
console.log("UI after Identify:", ui);
const full = { ...cap.headers, origin: base }; delete full["content-length"];
const noOrigin = { ...full }; delete noOrigin.origin;
for (const [label, headers, body] of [
  ["no origin", noOrigin, cap.body],
  ["valid replay", full, cap.body],
  ["bad payload", full, cap.body.replace(/data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+/, "https://example.com/x.png")],
  ["oversized payload", full, cap.body.replace(/base64,/, "base64," + "A".repeat(2_100_000))],
]) {
  const r = await fetch(cap.url, { method: "POST", headers, body });
  console.log(`probe ${label}: ${r.status} ${(await r.text()).slice(0, 90)}`);
}
await b.close();
