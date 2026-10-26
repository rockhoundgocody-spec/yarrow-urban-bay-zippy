import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeTextInput, validateImageDataUrl } from "./identify.ts";

test("validateImageDataUrl accepts valid data:image URLs", () => {
  const validJpeg = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";
  const result = validateImageDataUrl(validJpeg);
  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.url, validJpeg);
  }
});

test("validateImageDataUrl rejects non-data:image schemes (SSRF protection)", () => {
  const httpUrl = "http://169.254.169.254/latest/meta-data/";
  const resultHttp = validateImageDataUrl(httpUrl);
  assert.equal(resultHttp.valid, false);
  if (!resultHttp.valid) {
    assert.match(resultHttp.error, /Invalid image scheme/i);
  }

  const javascriptUrl = "javascript:alert(1)";
  const resultJs = validateImageDataUrl(javascriptUrl);
  assert.equal(resultJs.valid, false);

  const fileUrl = "file:///etc/passwd";
  assert.equal(validateImageDataUrl(fileUrl).valid, false);
});

test("validateImageDataUrl rejects empty or non-string inputs", () => {
  assert.equal(validateImageDataUrl(null).valid, false);
  assert.equal(validateImageDataUrl(undefined).valid, false);
  assert.equal(validateImageDataUrl("").valid, false);
});

test("validateImageDataUrl rejects oversized image payloads (DoS protection)", () => {
  const hugePayload = "data:image/png;base64," + "A".repeat(11 * 1024 * 1024);
  const result = validateImageDataUrl(hugePayload);
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.match(result.error, /exceeds maximum allowed size/i);
  }
});

test("sanitizeTextInput bounds text input length and handles fallbacks", () => {
  assert.equal(sanitizeTextInput(undefined, "fallback"), "fallback");
  assert.equal(sanitizeTextInput("", "fallback"), "fallback");
  assert.equal(sanitizeTextInput("  ", "fallback"), "fallback");
  assert.equal(sanitizeTextInput("Sample Location", "fallback"), "Sample Location");

  const longInput = "A".repeat(1000);
  const sanitized = sanitizeTextInput(longInput, "fallback");
  assert.equal(sanitized.length, 500);
});
