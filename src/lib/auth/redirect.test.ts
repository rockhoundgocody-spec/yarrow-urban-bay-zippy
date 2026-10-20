import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeRedirectUrl, sanitizeExternalUrl } from "./client.ts";

describe("sanitizeRedirectUrl", () => {
  const baseOrigin = "http://localhost:8080";

  it("allows relative paths and resolves against baseOrigin", () => {
    assert.equal(sanitizeRedirectUrl("/dashboard", baseOrigin), "http://localhost:8080/dashboard");
    assert.equal(sanitizeRedirectUrl("/profile?id=123#sec", baseOrigin), "http://localhost:8080/profile?id=123#sec");
  });

  it("allows same-origin absolute URLs", () => {
    assert.equal(sanitizeRedirectUrl("http://localhost:8080/home", baseOrigin), "http://localhost:8080/home");
  });

  it("rejects javascript: URIs and returns fallback", () => {
    assert.equal(sanitizeRedirectUrl("javascript:alert(document.cookie)", baseOrigin), "http://localhost:8080/");
    assert.equal(sanitizeRedirectUrl("JavaScript:alert(1)", baseOrigin), "http://localhost:8080/");
  });

  it("rejects data: URIs and returns fallback", () => {
    assert.equal(sanitizeRedirectUrl("data:text/html,<script>alert(1)</script>", baseOrigin), "http://localhost:8080/");
  });

  it("rejects cross-origin absolute URLs to prevent Open Redirects", () => {
    assert.equal(sanitizeRedirectUrl("https://evil.com/phish", baseOrigin), "http://localhost:8080/");
    assert.equal(sanitizeRedirectUrl("http://attacker.org", baseOrigin), "http://localhost:8080/");
  });

  it("rejects protocol-relative URLs pointing off-site", () => {
    assert.equal(sanitizeRedirectUrl("//evil.com/phish", baseOrigin), "http://localhost:8080/");
  });

  it("handles null, undefined, or empty inputs gracefully", () => {
    assert.equal(sanitizeRedirectUrl(null, baseOrigin), "http://localhost:8080/");
    assert.equal(sanitizeRedirectUrl(undefined, baseOrigin), "http://localhost:8080/");
    assert.equal(sanitizeRedirectUrl("", baseOrigin), "http://localhost:8080/");
  });

  it("uses custom fallback if provided", () => {
    assert.equal(sanitizeRedirectUrl("javascript:alert(1)", baseOrigin, "/login"), "http://localhost:8080/login");
  });
});

describe("sanitizeExternalUrl", () => {
  const baseOrigin = "http://localhost:8080";

  it("allows valid external http and https URLs", () => {
    assert.equal(sanitizeExternalUrl("https://auth.grok.com/oauth", baseOrigin), "https://auth.grok.com/oauth");
    assert.equal(sanitizeExternalUrl("http://gate.internal/login", baseOrigin), "http://gate.internal/login");
  });

  it("rejects non-http(s) protocols such as javascript: or data:", () => {
    assert.equal(sanitizeExternalUrl("javascript:alert(1)", baseOrigin), "http://localhost:8080/");
    assert.equal(sanitizeExternalUrl("data:text/html,bad", baseOrigin), "http://localhost:8080/");
  });
});
