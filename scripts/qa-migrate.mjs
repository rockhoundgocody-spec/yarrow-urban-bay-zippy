/** End-to-end: old (v0–v2) saved data migrates without losing finds or photos. Usage: node scripts/qa-migrate.mjs <base-url> */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
const base = (process.argv[2] || "http://127.0.0.1:8081").replace(/\/$/, "");
const photo = "data:image/png;base64," + readFileSync(new URL("../public/icons/icon-192.png", import.meta.url)).toString("base64");
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.goto(base + "/data", { waitUntil: "networkidle" });
await p.evaluate((photo) => localStorage.setItem("rhgo-field-v2", JSON.stringify({ version: 0, state: {
  onboarded: true, openerSeen: true, displayName: "Old user", xp: 120,
  posts: [{ id: "p1", author: "Mara V.", likes: 48 }],
  specimens: [{ id: "sp_old1", name: "Quartz", mineralId: "quartz", family: "Silicate", rarity: "common", confidence: 0.9, notes: "", createdAt: 1, source: "scan", disposition: "chattel_collected", collected: true, leftInPlace: false, legalStatus: "unknown", ethicsPromptShown: true, userConfirmedLegalAccess: true, geoPrivacy: "exact_private", valueLow: 2, valueHigh: 25, photoDataUrl: photo }],
} })), photo);
await p.goto(base + "/vault/sp_old1", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
const st = JSON.parse(await p.evaluate(() => localStorage.getItem("rhgo-field-v2")));
const sp = st.state.specimens[0];
const check = (ok, m) => { console.log(`${ok ? "PASS" : "FAIL"} ${m}`); if (!ok) process.exitCode = 1; };
check(st.version === 3, `store migrated to version ${st.version}`);
check(!("posts" in st.state), "seeded community posts removed");
check(!("valueLow" in sp) && !("valueHigh" in sp), "price fields stripped from old specimens");
check(!sp.photoDataUrl && sp.hasPhoto === true, "inline photo moved out of localStorage");
check(await p.locator("main img[src^='data:image']").count() === 1, "migrated photo still displays (IndexedDB)");
console.log("xp:", st.state.xp, "name:", st.state.displayName); check(st.state.xp >= 120 && st.state.displayName === "Old user", "progress and name preserved (daily-login XP may add on top)");
check(errs.length === 0, `no page errors ${errs.join(" | ").slice(0, 120)}`);
await b.close();
