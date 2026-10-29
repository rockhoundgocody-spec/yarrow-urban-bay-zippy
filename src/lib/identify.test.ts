import test from "node:test";
import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import { identifySpecimen } from "./identify.ts";

const GLOBAL_STORAGE_KEY = Symbol.for("tanstack-start:start-storage-context");
const globalObj = globalThis as unknown as Record<symbol, AsyncLocalStorage<unknown>>;
globalObj[GLOBAL_STORAGE_KEY] ??= new AsyncLocalStorage();
const startStorage = globalObj[GLOBAL_STORAGE_KEY];

function runInServerContext<T>(fn: () => Promise<T>): Promise<T> {
  return startStorage.run(
    {
      request: new Request("http://localhost"),
      executedRequestMiddlewares: new Set(),
      handlerType: "serverFn",
    },
    fn,
  );
}

test("identifySpecimen rejects missing or non-string imageDataUrl", async () => {
  const originalKey = process.env.XAI_API_KEY;
  process.env.XAI_API_KEY = "test-api-key";

  try {
    await runInServerContext(async () => {
      // @ts-expect-error - testing invalid payload
      await assert.rejects(() => identifySpecimen({ data: {} }), (err) => err === "Invalid image input.");

      // @ts-expect-error - testing invalid payload
      await assert.rejects(() => identifySpecimen({ data: { imageDataUrl: 123 } }), (err) => err === "Invalid image input.");
    });
  } finally {
    process.env.XAI_API_KEY = originalKey;
  }
});

test("identifySpecimen rejects invalid image schemes", async () => {
  const originalKey = process.env.XAI_API_KEY;
  process.env.XAI_API_KEY = "test-api-key";

  try {
    await runInServerContext(async () => {
      await assert.rejects(
        () => identifySpecimen({ data: { imageDataUrl: "javascript:alert(1)" } }),
        (err) => err === "Invalid image format.",
      );
    });
  } finally {
    process.env.XAI_API_KEY = originalKey;
  }
});
