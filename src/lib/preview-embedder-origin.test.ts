import assert from "node:assert/strict";
import test from "node:test";
import { resolveParentEmbedderOrigin } from "./preview-embedder-origin.ts";

test("resolveParentEmbedderOrigin - rejects untrusted parent origin even if framed inside sandbox guest host", () => {
  const result = resolveParentEmbedderOrigin(
    false,
    "https://evil.com/malicious",
    null,
    "app.grok-sandbox.com",
  );
  assert.equal(result, null);
});

test("resolveParentEmbedderOrigin - allows trusted grok parent origin", () => {
  const result = resolveParentEmbedderOrigin(
    false,
    "https://grok.com/chat",
    null,
    "app.grok-sandbox.com",
  );
  assert.equal(result, "https://grok.com");
});

test("resolveParentEmbedderOrigin - allows sandbox preview parent origin", () => {
  const result = resolveParentEmbedderOrigin(
    false,
    "https://sub.grok-sandbox.com/embed",
    null,
    "app.grok-sandbox.com",
  );
  assert.equal(result, "https://sub.grok-sandbox.com");
});

test("resolveParentEmbedderOrigin - allows localhost parent origin", () => {
  const result = resolveParentEmbedderOrigin(
    false,
    "http://localhost:3000/app",
    null,
    "app.grok-sandbox.com",
  );
  assert.equal(result, "http://localhost:3000");
});

test("resolveParentEmbedderOrigin - rejects when framed by self", () => {
  const result = resolveParentEmbedderOrigin(
    true,
    "https://grok.com",
    null,
    "grok.com",
  );
  assert.equal(result, null);
});
