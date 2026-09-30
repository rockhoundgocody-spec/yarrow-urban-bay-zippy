import test from "node:test";
import assert from "node:assert/strict";
import { validateAndIdentifySpecimen, matchFieldKey, mergeCatalog } from "./identify.ts";

test("validateAndIdentifySpecimen rejects missing or non-data-URL image payloads", async () => {
  process.env.XAI_API_KEY = "mock_key";

  const res1 = await validateAndIdentifySpecimen({ imageDataUrl: "https://example.com/malicious.jpg" });
  assert.equal(res1.ok, false);
  if (!res1.ok) {
    assert.match(res1.error, /Invalid image format/i);
  }

  const res2 = await validateAndIdentifySpecimen({ imageDataUrl: "not_a_data_url" });
  assert.equal(res2.ok, false);
  if (!res2.ok) {
    assert.match(res2.error, /Invalid image format/i);
  }
});

test("matchFieldKey correctly filters and ranks catalog items", () => {
  const matches = matchFieldKey({ color: "purple", hardness: 7 });
  assert.ok(matches.length > 0);
  assert.equal(matches[0].name, "Amethyst");
});

test("mergeCatalog augments unknown raw results with catalog data", () => {
  const raw = {
    name: "Amethyst",
    family: "Silicate",
    confidence: 0.9,
    rarity: "uncommon" as const,
    keyFeatures: [],
    alternatives: [],
    notGeological: false,
    source: "ai" as const,
  };
  const merged = mergeCatalog(raw);
  assert.equal(merged.mineralId, "amethyst");
  assert.equal(merged.crystalSystem, "trigonal");
});
