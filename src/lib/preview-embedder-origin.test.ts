import assert from "node:assert/strict";
import test from "node:test";
import { resolveParentEmbedderOrigin } from "./preview-embedder-origin.ts";

test("resolveParentEmbedderOrigin: returns null when parent is self", () => {
  assert.equal(
    resolveParentEmbedderOrigin(true, "https://grok.com", null, "app.grok-sandbox.com"),
    null,
  );
});

test("resolveParentEmbedderOrigin: allows trusted Grok embedder origins", () => {
  assert.equal(
    resolveParentEmbedderOrigin(false, "https://grok.com/chat", null, "app.grok-sandbox.com"),
    "https://grok.com",
  );
  assert.equal(
    resolveParentEmbedderOrigin(false, "http://localhost:3000", null, "app.grok-sandbox.com"),
    "http://localhost:3000",
  );
});

test("resolveParentEmbedderOrigin: allows valid remint preview pair origins", () => {
  assert.equal(
    resolveParentEmbedderOrigin(
      false,
      "https://foo.com",
      null,
      "app.preview.foo.com",
    ),
    "https://foo.com",
  );
});

test("resolveParentEmbedderOrigin: rejects untrusted origins framing sandbox preview guest host", () => {
  assert.equal(
    resolveParentEmbedderOrigin(
      false,
      "https://attacker.com/malicious",
      null,
      "app.grok-sandbox.com",
    ),
    null,
  );
  assert.equal(
    resolveParentEmbedderOrigin(
      false,
      "https://evil.org",
      "https://evil.org",
      "demo.grok-sandbox.com",
    ),
    null,
  );
});
