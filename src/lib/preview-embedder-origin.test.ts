import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isGrokEmbedderOrigin,
  isSandboxPreviewGuestHost,
  resolveParentEmbedderOrigin,
} from "./preview-embedder-origin.ts";

describe("resolveParentEmbedderOrigin", () => {
  it("returns null when parent is self", () => {
    const origin = resolveParentEmbedderOrigin(
      true,
      "https://grok.com",
      null,
      "preview.grok-sandbox.com",
    );
    assert.equal(origin, null);
  });

  it("accepts valid grok embedder origins from referrer or ancestorOrigin", () => {
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://grok.com/chat", null, "app.grok-sandbox.com"),
      "https://grok.com",
    );
    assert.equal(
      resolveParentEmbedderOrigin(false, "", "https://sub.grok.com", "app.grok-sandbox.com"),
      "https://sub.grok.com",
    );
    assert.equal(
      resolveParentEmbedderOrigin(false, "http://localhost:3000", null, "localhost"),
      "http://localhost:3000",
    );
  });

  it("accepts sandbox preview parent host", () => {
    assert.equal(
      resolveParentEmbedderOrigin(
        false,
        "https://embedder.grok-sandbox.com/preview",
        null,
        "app.grok-sandbox.com",
      ),
      "https://embedder.grok-sandbox.com",
    );
  });

  it("rejects untrusted parent origins even when guest is on grok-sandbox.com", () => {
    const origin = resolveParentEmbedderOrigin(
      false,
      "https://attacker.com/malicious",
      "https://attacker.com",
      "app.grok-sandbox.com",
    );
    assert.equal(origin, null);
  });

  it("accepts remint preview pairs when guest and parent hosts match pattern", () => {
    assert.equal(
      resolveParentEmbedderOrigin(
        false,
        "https://example.com",
        null,
        "app.preview.example.com",
      ),
      "https://example.com",
    );
  });
});

describe("isGrokEmbedderOrigin", () => {
  it("validates grok and local origins", () => {
    assert.equal(isGrokEmbedderOrigin("https://grok.com"), true);
    assert.equal(isGrokEmbedderOrigin("https://sub.grok.com"), true);
    assert.equal(isGrokEmbedderOrigin("http://localhost:8080"), true);
    assert.equal(isGrokEmbedderOrigin("http://127.0.0.1:3000"), true);
    assert.equal(isGrokEmbedderOrigin("https://evil.com"), false);
  });
});

describe("isSandboxPreviewGuestHost", () => {
  it("identifies grok-sandbox.com hosts", () => {
    assert.equal(isSandboxPreviewGuestHost("grok-sandbox.com"), true);
    assert.equal(isSandboxPreviewGuestHost("abc.grok-sandbox.com"), true);
    assert.equal(isSandboxPreviewGuestHost("example.com"), false);
  });
});
