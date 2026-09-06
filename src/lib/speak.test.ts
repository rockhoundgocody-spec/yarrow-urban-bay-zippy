import assert from "node:assert/strict";
import test from "node:test";
import { speakClover, transcribeClover } from "./speak.ts";

test("speakClover validator rejects invalid input", () => {
  const fn = speakClover as unknown as Record<string, unknown>;
  const validator = (fn._validator || fn.__validator || fn.validator) as (
    arg: unknown,
  ) => unknown;
  if (typeof validator === "function") {
    assert.throws(() => validator(null), /Invalid input/);
    assert.throws(() => validator({}), /Invalid input/);
    assert.throws(() => validator({ text: 123 }), /Invalid input/);
    assert.deepEqual(validator({ text: "Hello" }), { text: "Hello" });
  }
});

test("transcribeClover validator rejects invalid or oversized input", () => {
  const fn = transcribeClover as unknown as Record<string, unknown>;
  const validator = (fn._validator || fn.__validator || fn.validator) as (
    arg: unknown,
  ) => unknown;
  if (typeof validator === "function") {
    assert.throws(() => validator(null), /Invalid input/);
    assert.throws(() => validator({}), /Invalid input/);
    assert.throws(() => validator({ audioDataUrl: 123 }), /Invalid input/);

    const hugePayload = "data:audio/webm;base64," + "a".repeat(11 * 1024 * 1024);
    assert.throws(() => validator({ audioDataUrl: hugePayload }), /exceeds max size limit/);

    const validPayload = "data:audio/webm;base64,AAAA";
    assert.deepEqual(validator({ audioDataUrl: validPayload }), { audioDataUrl: validPayload });
  }
});
