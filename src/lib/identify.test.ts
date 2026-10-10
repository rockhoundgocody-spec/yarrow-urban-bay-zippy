import assert from "node:assert/strict";
import { test } from "node:test";
import { sanitizeIdentifyInput } from "./identify.ts";

test("sanitizeIdentifyInput - valid dataUrl input", () => {
  const result = sanitizeIdentifyInput({
    imageDataUrl: "data:image/jpeg;base64,12345",
    locality: "Mojave Desert\nNear Barstow",
    notes: "Found near quartzite vein\r\n\tSome quartz crystals",
  });

  assert.equal(result.imageDataUrl, "data:image/jpeg;base64,12345");
  assert.equal(result.locality, "Mojave Desert Near Barstow");
  assert.equal(result.notes, "Found near quartzite vein Some quartz crystals");
});

test("sanitizeIdentifyInput - truncates long inputs", () => {
  const longLocality = "A".repeat(300);
  const longNotes = "B".repeat(600);

  const result = sanitizeIdentifyInput({
    imageDataUrl: "https://example.com/specimen.jpg",
    locality: longLocality,
    notes: longNotes,
  });

  assert.equal(result.locality?.length, 200);
  assert.equal(result.notes?.length, 500);
});

test("sanitizeIdentifyInput - rejects invalid image source", () => {
  assert.throws(
    () => sanitizeIdentifyInput({ imageDataUrl: "javascript:alert(1)" }),
    /Invalid image source format/,
  );

  assert.throws(
    () => sanitizeIdentifyInput({ imageDataUrl: "" }),
    /Invalid image source format/,
  );
});

test("sanitizeIdentifyInput - rejects non-object payload", () => {
  assert.throws(() => sanitizeIdentifyInput(null), /Invalid request payload/);
  assert.throws(() => sanitizeIdentifyInput("invalid"), /Invalid request payload/);
});
