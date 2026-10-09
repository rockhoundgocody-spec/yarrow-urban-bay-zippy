import { chromium } from "/workspace/node_modules/playwright/index.mjs";
import { readFileSync } from "node:fs";
const base = "http://127.0.0.1:8081";
const AXE = readFileSync("/tmp/axe/node_modules/axe-core/axe.min.js", "utf8");
const ROUTES = ["/", "/explore", "/explore/crater-diamonds", "/explore/emerald-creek", "/identify", "/pedia", "/pedia/red-beryl", "/pedia/diamond", "/safety", "/trips", "/quests", "/profile", "/vault", "/clover", "/community", "/market", "/data", "/no-such-page"];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => { try { if (!localStorage.getItem("rhgo-field-v2")) localStorage.setItem("rhgo-field-v2", JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 3 })); } catch { /* blocked */ } });
let viol = 0, u44 = 0, u48 = 0, small = 0;
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
  { const t = await r.text(); console.log(`probe ${label}: ${r.status} ${(t.match(/"(This request[^"]*|Slow down[^"]*|Daily limit[^"]*|Invalid request\.|Identification failed[^"]*|Photo ID is unavailable[^"]*)"/) || ["", "(no message)"])[1]}`); }
}
await b.close();
