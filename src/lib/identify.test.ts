import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import { identifySpecimen } from "./identify.ts";

const GLOBAL_STORAGE_KEY = Symbol.for("tanstack-start:start-storage-context");

function runWithDummyContext<T>(fn: () => Promise<T>): Promise<T> {
  let storage = (globalThis as Record<symbol, AsyncLocalStorage<unknown>>)[GLOBAL_STORAGE_KEY];
  if (!storage) {
    storage = new AsyncLocalStorage<unknown>();
    (globalThis as Record<symbol, AsyncLocalStorage<unknown>>)[GLOBAL_STORAGE_KEY] = storage;
  }
  return storage.run({ request: new Request("http://localhost:8080/") }, fn);
}

describe("identifySpecimen error handling", () => {
  it("sanitizes non-200 HTTP response errors and does not leak raw response body text", async () => {
    process.env.XAI_API_KEY = "test-key-123";
    const realFetch = globalThis.fetch;
    const sensitiveErrorBody = "SECRET_DETAILS: Upstream internal stack trace or private API key info leaked";

    globalThis.fetch = (async () => {
      return new Response(sensitiveErrorBody, { status: 500 });
    }) as typeof fetch;

    try {
      let result: unknown;
      try {
        result = await runWithDummyContext(() =>
          identifySpecimen({
            data: {
              imageDataUrl:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            },
          }),
        );
      } catch (err: unknown) {
        result = err;
      }

      const errorMsg =
        typeof result === "object" && result !== null
          ? String((result as Record<string, unknown>).error ?? (result as Error).message ?? result)
          : String(result);

      assert.equal(errorMsg.includes("Identification failed (500)."), true);
      assert.equal(errorMsg.includes("SECRET_DETAILS"), false);
    } finally {
      globalThis.fetch = realFetch;
      delete process.env.XAI_API_KEY;
    }
  });
});
