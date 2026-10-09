import { chromium } from "/workspace/node_modules/playwright/index.mjs";
const base = "http://127.0.0.1:8081";
const b = await chromium.launch(); const p = await b.newPage(); let cap = null;
p.on("request", (r) => { if (r.method() === "POST" && r.url().includes("_serverFn")) cap = { url: r.url(), body: r.postData(), headers: r.headers() }; });
await p.goto(base + "/identify", { waitUntil: "networkidle" });
await p.setInputFiles('input[type="file"]', "/workspace/public/icons/icon-192.png");
await p.getByRole("button", { name: "Identify" }).click(); await p.waitForTimeout(3000);
console.log("headers sent by app:", Object.keys(cap.headers).join(","));
const h = { ...cap.headers, origin: base }; delete h["content-length"];
for (const [label, body] of [["valid replay", cap.body], ["bad payload", cap.body.replace(/data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+/, "https://example.com/x.png")], ["huge payload", cap.body.replace(/base64,/, "base64," + "A".repeat(2_100_000))]]) {
  const r = await fetch(cap.url, { method: "POST", headers: h, body });
  console.log(`${label}: ${r.status} ${(await r.text()).replace(/\s+/g, " ").slice(0, 120)}`);
}
await b.close();
