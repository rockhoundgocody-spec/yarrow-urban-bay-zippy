import assert from "node:assert/strict";
import test from "node:test";
import {
  isGrokEmbedderOrigin,
  isSandboxPreviewGuestHost,
  resolveParentEmbedderOrigin,
} from "./preview-embedder-origin.ts";

test("isGrokEmbedderOrigin matches valid grok.com, subdomains, and local origins", () => {
  assert.equal(isGrokEmbedderOrigin("https://grok.com"), true);
  assert.equal(isGrokEmbedderOrigin("https://app.grok.com"), true);
  assert.equal(isGrokEmbedderOrigin("http://localhost:3000"), true);
  assert.equal(isGrokEmbedderOrigin("http://127.0.0.1:8080"), true);
  assert.equal(isGrokEmbedderOrigin("https://evil.com"), false);
  assert.equal(isGrokEmbedderOrigin("https://notgrok.com"), false);
});

test("isSandboxPreviewGuestHost matches grok-sandbox.com and subdomains", () => {
  assert.equal(isSandboxPreviewGuestHost("grok-sandbox.com"), true);
  assert.equal(isSandboxPreviewGuestHost("my-app.grok-sandbox.com"), true);
  assert.equal(isSandboxPreviewGuestHost("attacker.com"), false);
});

test("resolveParentEmbedderOrigin rejects untrusted parent origins framing grok-sandbox.com", () => {
  // Untrusted attacker origin framing a sandbox preview guest
  const attackerReferrer = "https://attacker.com/page";
  const guestHostname = "app-123.grok-sandbox.com";

  // Attacker framing must return null
  const origin = resolveParentEmbedderOrigin(
    false,
    attackerReferrer,
    null,
    guestHostname,
  );
  assert.equal(origin, null);
});

test("resolveParentEmbedderOrigin accepts legitimate parent embedder origins", () => {
  const validGrokReferrer = "https://grok.com/chat";
  const guestHostname = "app-123.grok-sandbox.com";

  const origin = resolveParentEmbedderOrigin(
    false,
    validGrokReferrer,
    null,
    guestHostname,
  );
  assert.equal(origin, "https://grok.com");
});

test("resolveParentEmbedderOrigin returns null when parent is self", () => {
  const origin = resolveParentEmbedderOrigin(
    true,
    "https://grok.com",
    null,
    "app-123.grok-sandbox.com",
  );
  assert.equal(origin, null);
});
