import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveParentEmbedderOrigin, isGrokEmbedderOrigin } from "./preview-embedder-origin.ts";

test("isGrokEmbedderOrigin validates allowed embedder origins", () => {
  assert.equal(isGrokEmbedderOrigin("https://grok.com"), true);
  assert.equal(isGrokEmbedderOrigin("https://sub.grok.com"), true);
  assert.equal(isGrokEmbedderOrigin("http://localhost:8080"), true);
  assert.equal(isGrokEmbedderOrigin("http://127.0.0.1:8080"), true);
  assert.equal(isGrokEmbedderOrigin("https://evil.com"), false);
  assert.equal(isGrokEmbedderOrigin("https://notgrok.com"), false);
});

test("resolveParentEmbedderOrigin rejects untrusted parent origins on sandbox guest hosts", () => {
  const result = resolveParentEmbedderOrigin(
    false,
    "https://evil.com/page",
    null,
    "app.grok-sandbox.com"
  );
  assert.equal(result, null);
});

test("resolveParentEmbedderOrigin allows trusted grok embedder origins on sandbox guest hosts", () => {
  const result = resolveParentEmbedderOrigin(
    false,
    "https://grok.com/chat",
    null,
    "app.grok-sandbox.com"
  );
  assert.equal(result, "https://grok.com");
});
