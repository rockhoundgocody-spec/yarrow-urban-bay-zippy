import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveParentEmbedderOrigin } from "./preview-embedder-origin.ts";

describe("resolveParentEmbedderOrigin", () => {
  it("returns null when parentIsSelf is true", () => {
    assert.equal(
      resolveParentEmbedderOrigin(true, "https://grok.com", null, "app.grok-sandbox.com"),
      null,
    );
  });

  it("accepts official Grok embedder origins", () => {
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://grok.com", null, "app.grok-sandbox.com"),
      "https://grok.com",
    );
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://sub.grok.com", null, "app.grok-sandbox.com"),
      "https://sub.grok.com",
    );
    assert.equal(
      resolveParentEmbedderOrigin(false, "http://localhost:3000", null, "app.grok-sandbox.com"),
      "http://localhost:3000",
    );
  });

  it("accepts valid remint preview pairs for sandbox preview guest hosts", () => {
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://example.com", null, "sub.preview.example.com"),
      "https://example.com",
    );
  });

  it("rejects untrusted origins framing a sandbox preview guest host", () => {
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://attacker.com", null, "app.grok-sandbox.com"),
      null,
    );
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://evil.com/page", "https://evil.com", "my-app.grok-sandbox.com"),
      null,
    );
  });
});
