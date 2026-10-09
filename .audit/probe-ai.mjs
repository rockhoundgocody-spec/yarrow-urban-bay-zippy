import { chromium } from "/workspace/node_modules/playwright/index.mjs";
const base = "http://127.0.0.1:8081";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
await ctx.addInitScript(() => { try { localStorage.setItem("rhgo-field-v2", JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 3 })); } catch { /* blocked */ } });
const p = await ctx.newPage();
let captured = null;
p.on("request", (r) => { if (r.method() === "POST" && r.url().includes("_serverFn")) captured = { url: r.url(), body: r.postData(), headers: r.headers() }; });
await p.goto(base + "/identify", { waitUntil: "networkidle" });
await p.setInputFiles('input[type="file"]', "/workspace/public/icons/icon-192.png");
await p.getByRole("button", { name: "Identify" }).click();
await p.waitForTimeout(4000);
const shown = await p.evaluate(() => [...document.querySelectorAll(".text-danger, [role=alert]")].map((e) => e.textContent.trim()).join(" | "));
console.log("UI message after real click:", shown || "(none)");
if (!captured) { console.log("no server fn request captured"); process.exit(1); }
console.log("endpoint:", captured.url.replace(base, ""));
const send = async (label, headers, body) => {
  const r = await fetch(captured.url, { method: "POST", headers: { "content-type": captured.headers["content-type"], ...headers }, body });
  const t = await r.text();
  console.log(`${label.padEnd(34)} -> ${r.status} ${t.replace(/\s+/g, " ").slice(0, 150)}`);
};
await send("no Origin (script)", {}, captured.body);
await send("foreign Origin", { origin: "https://evil.example" }, captured.body);
await send("same Origin, oversized image", { origin: base }, captured.body.replace(/base64,[A-Za-z0-9+/=]{10}/, (m) => m + "A".repeat(2_100_000)));
await send("same Origin, non-image URL", { origin: base }, captured.body.replace(/data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+/, "https://example.com/x.png"));
for (let i = 1; i <= 6; i++) await send(`same Origin, valid #${i}`, { origin: base }, captured.body);
await b.close();
