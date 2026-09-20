import assert from "node:assert/strict";
import test from "node:test";
import { resolveParentEmbedderOrigin } from "./preview-embedder-origin.ts";

test("resolveParentEmbedderOrigin rejects untrusted parent origins even on sandbox guest host", () => {
  // Scenario: guest app running on app.grok-sandbox.com framed by malicious parent https://attacker.com
  const origin = resolveParentEmbedderOrigin(
    false,
    "https://attacker.com",
    "https://attacker.com",
    "app.grok-sandbox.com",
  );
  assert.equal(origin, null);
});

test("resolveParentEmbedderOrigin accepts valid grok.com parent origins", () => {
  const origin = resolveParentEmbedderOrigin(
    false,
    "https://grok.com/chat",
    "https://grok.com",
    "app.grok-sandbox.com",
  );
  assert.equal(origin, "https://grok.com");
});

test("resolveParentEmbedderOrigin accepts valid grok-sandbox.com parent origins", () => {
  const origin = resolveParentEmbedderOrigin(
    false,
    "https://embed.grok-sandbox.com",
    "https://embed.grok-sandbox.com",
    "app.grok-sandbox.com",
  );
  assert.equal(origin, "https://embed.grok-sandbox.com");
});

test("resolveParentEmbedderOrigin accepts localhost parent origins", () => {
  const origin = resolveParentEmbedderOrigin(
    false,
    "http://localhost:3000",
    "http://localhost:3000",
    "localhost",
  );
  assert.equal(origin, "http://localhost:3000");
});

test("resolveParentEmbedderOrigin returns null when parentIsSelf is true", () => {
  const origin = resolveParentEmbedderOrigin(
    true,
    "https://grok.com",
    "https://grok.com",
    "app.grok-sandbox.com",
  );
  assert.equal(origin, null);
});
