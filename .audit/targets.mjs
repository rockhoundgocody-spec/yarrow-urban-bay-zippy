import { chromium } from "/workspace/node_modules/playwright/index.mjs";
const base = process.argv[2] || "http://127.0.0.1:8080";
const ROUTES = ["/", "/explore", "/explore/crater-diamonds", "/identify", "/pedia", "/pedia/quartz", "/safety", "/trips", "/quests", "/profile", "/vault", "/clover", "/community", "/market", "/data", "/no-such-page"];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => { try { if (!localStorage.getItem("rhgo-field-v2")) localStorage.setItem("rhgo-field-v2", JSON.stringify({ state: { onboarded: true, openerSeen: true }, version: 3 })); } catch {} });
const agg = {};
let tot44 = 0, tot48 = 0, totSmall = 0;
for (const r of ROUTES) {
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => { if (m.type() === "error" && !/status of 404/.test(m.text())) errs.push(m.text().slice(0, 120)); });
  await p.goto(base + r, { waitUntil: "networkidle" }); await p.waitForTimeout(400);
  const res = await p.evaluate(() => {
    const vis = (el) => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.visibility !== "hidden" && s.display !== "none" && b.width > 0 && b.height > 0; };
    const inter = [...document.querySelectorAll("a[href],button,input,select,textarea,[role=button],summary")].filter(vis).filter((el) => !el.closest(".sr-only"));
    const bad = inter.map((el) => { const b = el.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), d: `${el.tagName.toLowerCase()} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 22)}" .${(el.className?.baseVal ?? el.className ?? "").toString().split(" ").slice(0, 4).join(".")}` }; });
    const texts = [...document.querySelectorAll("body *")].filter((el) => vis(el) && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1));
    const small = texts.filter((el) => parseFloat(getComputedStyle(el).fontSize) < 12).map((el) => `${getComputedStyle(el).fontSize} "${el.textContent.trim().slice(0, 20)}"`);
    return { u44: bad.filter((x) => x.w < 44 || x.h < 44), u48: bad.filter((x) => x.w < 48 || x.h < 48).length, small, overflow: document.documentElement.scrollWidth - innerWidth };
  });
  tot44 += res.u44.length; tot48 += res.u48; totSmall += res.small.length;
  console.log(`${r.padEnd(26)} <44:${res.u44.length} <48:${res.u48} <12px:${res.small.length} ovf:${res.overflow} errs:${errs.length} ${errs.join(" | ").slice(0, 200)}`);
  for (const x of res.u44) agg[x.d] = (agg[x.d] || 0) + 1, agg[x.d + " @"] = `${x.w}x${x.h}`;
  if (res.small.length) console.log("   small:", res.small.slice(0, 4).join(" ; "));
  await p.close();
}
console.log(`\nTOTAL <44:${tot44} <48:${tot48} <12px:${totSmall}`);
for (const [k, v] of Object.entries(agg)) if (!k.endsWith(" @")) console.log(String(v).padStart(3), agg[k + " @"], k);
await b.close();
