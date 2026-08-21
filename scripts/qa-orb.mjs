import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] || "http://127.0.0.1:8080";
mkdirSync("/workspace/screenshots", { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.setDefaultTimeout(20000);

await page.goto(base, { waitUntil: "networkidle" });

async function dismissGates() {
  const skip = page.getByRole("button", { name: /skip/i });
  if (await skip.isVisible().catch(() => false)) await skip.click();
  const enter = page.getByRole("button", { name: /enter the field/i });
  if (await enter.isVisible().catch(() => false)) await enter.click();
  await page.waitForTimeout(400);
}

await dismissGates();
await page.screenshot({ path: "/workspace/screenshots/qa-orb-home.png", fullPage: false });

await page.goto(`${base}/clover`, { waitUntil: "networkidle" });
await dismissGates();
await page.screenshot({ path: "/workspace/screenshots/qa-orb-chamber.png", fullPage: false });

const orbBtn = page.getByRole("button", { name: /clover/i }).first();
if (await orbBtn.isVisible().catch(() => false)) await orbBtn.click();
await page.waitForTimeout(600);
await page.screenshot({ path: "/workspace/screenshots/qa-orb-awake.png", fullPage: false });

const input = page.getByPlaceholder(/ask clover|type, or/i);
await input.fill("How do I tell pyrite from gold in the field?");
await page.getByRole("button", { name: /^send$/i }).click();
await page.waitForTimeout(8000);
await page.screenshot({ path: "/workspace/screenshots/qa-orb-reply.png", fullPage: false });

const hunt = page.getByRole("button", { name: /hunt next/i });
if (await hunt.isVisible().catch(() => false)) {
  await hunt.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "/workspace/screenshots/qa-orb-hunt.png", fullPage: false });
}

await page.goto(`${base}/explore`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "/workspace/screenshots/qa-orb-float.png", fullPage: false });

const body = await page.locator("body").innerText();
console.log(JSON.stringify({
  ok: true,
  hasClover: /clover/i.test(body),
  sample: body.slice(0, 240),
}, null, 2));

await browser.close();
