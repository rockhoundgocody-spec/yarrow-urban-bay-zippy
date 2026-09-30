import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeRedirectUrl } from "./client.ts";

describe("sanitizeRedirectUrl", () => {
  it("preserves safe relative paths", () => {
    assert.equal(sanitizeRedirectUrl("/"), "/");
    assert.equal(sanitizeRedirectUrl("/vault"), "/vault");
    assert.equal(sanitizeRedirectUrl("/pedia?id=1#details"), "/pedia?id=1#details");
  });

  it("sanitizes javascript: payloads and falls back to default '/'", () => {
    assert.equal(sanitizeRedirectUrl("javascript:alert(1)"), "/");
    assert.equal(sanitizeRedirectUrl("javascript:alert(document.cookie)"), "/");
    assert.equal(sanitizeRedirectUrl("  javascript:void(0)  "), "/");
  });

  it("sanitizes data: URLs and falls back to default '/'", () => {
    assert.equal(sanitizeRedirectUrl("data:text/html,<script>alert(1)</script>"), "/");
  });

  it("sanitizes cross-origin URLs and protocol-relative URLs", () => {
    assert.equal(sanitizeRedirectUrl("https://evil.com"), "/");
    assert.equal(sanitizeRedirectUrl("http://attacker.com/login"), "/");
    assert.equal(sanitizeRedirectUrl("//evil.com/phish"), "/");
    assert.equal(sanitizeRedirectUrl("/\\evil.com"), "/");
  });

  it("allows a custom fallback", () => {
    assert.equal(sanitizeRedirectUrl("javascript:alert(1)", "/home"), "/home");
    assert.equal(sanitizeRedirectUrl("https://evil.com", "/dashboard"), "/dashboard");
  });

  it("handles null, undefined, and non-string inputs safely", () => {
    assert.equal(sanitizeRedirectUrl(null), "/");
    assert.equal(sanitizeRedirectUrl(undefined), "/");
    assert.equal(sanitizeRedirectUrl("" as unknown as string), "/");
  });
});
