import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveParentEmbedderOrigin } from "./preview-embedder-origin.ts";

describe("resolveParentEmbedderOrigin", () => {
  it("returns null if parentIsSelf is true", () => {
    assert.equal(
      resolveParentEmbedderOrigin(true, "https://grok.com", null, "test.grok-sandbox.com"),
      null,
    );
  });

  it("returns grok.com origin for grok embedders", () => {
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://grok.com/chat", null, "app.example.com"),
      "https://grok.com",
    );
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://sub.grok.com/path", null, "app.example.com"),
      "https://sub.grok.com",
    );
  });

  it("rejects untrusted parent origins when guest is on grok-sandbox.com", () => {
    assert.equal(
      resolveParentEmbedderOrigin(
        false,
        "https://attacker.com",
        "https://attacker.com",
        "my-app.grok-sandbox.com",
      ),
      null,
    );
  });

  it("accepts valid sandbox parent origins when guest is on grok-sandbox.com", () => {
    assert.equal(
      resolveParentEmbedderOrigin(
        false,
        "https://preview.grok-sandbox.com",
        null,
        "my-app.grok-sandbox.com",
      ),
      "https://preview.grok-sandbox.com",
    );
  });

  it("handles remint preview pairs correctly", () => {
    assert.equal(
      resolveParentEmbedderOrigin(
        false,
        "https://example.com",
        null,
        "app.preview.example.com",
      ),
      "https://example.com",
    );
    assert.equal(
      resolveParentEmbedderOrigin(
        false,
        "https://attacker.com",
        null,
        "app.preview.example.com",
      ),
      null,
    );
  });
});
