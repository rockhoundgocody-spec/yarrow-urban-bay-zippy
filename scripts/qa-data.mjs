/** End-to-end: photo storage, undo, export, two-tap erase and import. Usage: node scripts/qa-data.mjs <base-url> */
import { chromium } from "playwright";
const base = (process.argv[2] || "http://127.0.0.1:8081").replace(/\/$/, "");
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
const p = await ctx.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
const step = (ok, msg) => { console.log(`${ok ? "PASS" : "FAIL"} ${msg}`); if (!ok) process.exitCode = 1; };
await p.goto(base + "/", { waitUntil: "networkidle" });
await p.evaluate(() => localStorage.setItem("rhgo-field-v2", JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 3 })));

// 1. Save a photographed find
await p.goto(base + "/identify", { waitUntil: "networkidle" });
await p.setInputFiles('input[type="file"]', new URL("../public/icons/icon-192.png", import.meta.url).pathname);
await p.getByRole("tab", { name: "Catalog" }).or(p.getByRole("button", { name: "Catalog" })).first().click();
await p.locator("#panel-sample button").first().click();
await p.getByRole("checkbox").check();
await p.locator("button", { hasText: "Collected" }).or(p.locator("button:has(p.font-medium)")).first().click();
await p.getByRole("button", { name: "Log this discovery" }).click();
await p.waitForURL(/\/vault\/sp/); await p.waitForTimeout(800);
const vaultUrl = p.url();
step(await p.locator("main img[src^='data:image']").count() === 1, "photo shows on the new specimen page");
const ls = await p.evaluate(() => localStorage.getItem("rhgo-field-v2"));
step(!/data:image/.test(ls), `localStorage holds no photo bytes (${ls.length} chars)`);
await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(600);
step(await p.locator("main img[src^='data:image']").count() === 1, "photo survives a reload (IndexedDB)");

// 2. Delete + undo
await p.getByRole("button", { name: /Remove from GeoDex/ }).click();
await p.waitForURL(/\/vault$/);
await p.getByRole("button", { name: "Undo" }).click(); await p.waitForTimeout(500);
await p.goto(vaultUrl, { waitUntil: "networkidle" }); await p.waitForTimeout(600);
step(await p.locator("main h1").textContent() !== "No outcrop here" && await p.locator("main img[src^='data:image']").count() === 1, "undo restores the specimen and its photo");

// 3. Export
await p.goto(base + "/profile", { waitUntil: "networkidle" });
const [dl] = await Promise.all([p.waitForEvent("download"), p.getByRole("button", { name: "Export" }).click()]);
const path = `${(await import("node:os")).tmpdir()}/geodex-export.json`; await dl.saveAs(path);
const exp = JSON.parse(await (await import("node:fs/promises")).readFile(path, "utf8"));
step(exp.format === "rockhound-go-geodex" && exp.data.specimens.length === 1 && Object.keys(exp.photos).length === 1, `export has 1 specimen + 1 photo (${dl.suggestedFilename()})`);

// 4. Two-tap erase
const erase = p.getByRole("button", { name: /Erase all data|Tap again/ });
await erase.click();
step(/Tap again to erase 1 specimens/.test(await erase.textContent()), "first tap only arms the erase");
await erase.click(); await p.waitForTimeout(500);
await p.goto(base + "/vault", { waitUntil: "networkidle" });
step(await p.locator("main a[href^='/vault/sp']").count() === 0, "second tap erases the GeoDex");

// 5. Import
await p.goto(base + "/profile", { waitUntil: "networkidle" });
await p.setInputFiles('input[type="file"]', path); await p.waitForTimeout(1500);
await p.goto(vaultUrl, { waitUntil: "networkidle" }); await p.waitForTimeout(700);
step(await p.locator("main img[src^='data:image']").count() === 1, "import restores specimen and photo");
step(errs.length === 0, `no page errors (${errs.join(" | ").slice(0, 160)})`);
await b.close();
