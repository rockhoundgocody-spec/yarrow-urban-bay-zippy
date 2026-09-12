import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveParentEmbedderOrigin } from "../src/lib/preview-embedder-origin.ts";

describe("resolveParentEmbedderOrigin", () => {
  it("allows grok.com embedder origins", () => {
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://grok.com", null, "my-app.grok-sandbox.com"),
      "https://grok.com",
    );
  });

  it("rejects untrusted parent origins even when guest is on grok-sandbox.com", () => {
    assert.equal(
      resolveParentEmbedderOrigin(false, "https://evil.com", null, "my-app.grok-sandbox.com"),
      null,
    );
  });

  it("allows valid sandbox parent embedder origins", () => {
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
});
