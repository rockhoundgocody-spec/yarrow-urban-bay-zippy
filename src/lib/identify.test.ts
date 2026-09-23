import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { processIdentifySpecimen } from "./identify.ts";

describe("processIdentifySpecimen security validation", () => {
  it("rejects invalid or missing image data URL schemes", async () => {
    process.env.XAI_API_KEY = "test-api-key";
    try {
      const resultNoData = await processIdentifySpecimen({ imageDataUrl: "" });
      assert.equal(resultNoData.ok, false);
      assert.equal(resultNoData.error, "Invalid image format provided.");

      const resultInvalidScheme = await processIdentifySpecimen({
        imageDataUrl: "javascript:alert(1)",
      });
      assert.equal(resultInvalidScheme.ok, false);
      assert.equal(resultInvalidScheme.error, "Invalid image format provided.");
    } finally {
      delete process.env.XAI_API_KEY;
    }
  });

  it("rejects oversized image payloads (>15MB)", async () => {
    process.env.XAI_API_KEY = "test-api-key";
    try {
      const hugeDataUrl = "data:image/png;base64," + "A".repeat(16 * 1024 * 1024);
      const result = await processIdentifySpecimen({ imageDataUrl: hugeDataUrl });
      assert.equal(result.ok, false);
      assert.equal(result.error, "Image payload is too large.");
    } finally {
      delete process.env.XAI_API_KEY;
    }
  });

  it("returns safe error messages without leaking upstream details when API fails", async () => {
    process.env.XAI_API_KEY = "test-api-key";
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async () => {
      return new Response("Internal API failure details with sensitive tokens", { status: 500 });
    }) as typeof fetch;

    try {
      const result = await processIdentifySpecimen({
        imageDataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      });
      assert.equal(result.ok, false);
      assert.equal(result.error, "Identification failed. Please try again with a clear photo.");
      assert.equal((result.error as string).includes("sensitive tokens"), false);
      assert.equal((result.error as string).includes("500"), false);
    } finally {
      globalThis.fetch = realFetch;
      delete process.env.XAI_API_KEY;
    }
  });
});
