import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeInput, mergeCatalog, matchFieldKey } from "./identify.ts";

test("sanitizeInput strips control characters and truncates text", () => {
  assert.equal(sanitizeInput("hello\x00world"), "helloworld");
  assert.equal(sanitizeInput("a".repeat(400), 300), "a".repeat(300));
  assert.equal(sanitizeInput(undefined), "");
});

test("mergeCatalog fills missing catalog details from mineral catalog", () => {
  const merged = mergeCatalog({
    name: "Quartz",
    family: "",
    confidence: 0.9,
    rarity: "common",
    fieldNotes: "Common mineral found in granite",
    keyFeatures: [],
    alternatives: [],
    notGeological: false,
    source: "ai",
  });
  assert.equal(merged.mineralId, "quartz");
  assert.equal(merged.family, "Silicate (Tectosilicate)");
});

test("matchFieldKey ranks minerals matching key properties", () => {
  const results = matchFieldKey({ color: "purple", hardness: 7 });
  assert.ok(results.length > 0);
  assert.equal(results[0].name, "Amethyst");
});
