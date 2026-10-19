import assert from "node:assert/strict";
import { test } from "node:test";
import { sanitizeExternalUrl, sanitizeInternalRedirectUrl } from "./client.ts";

test("sanitizeInternalRedirectUrl: valid relative paths", () => {
  assert.equal(sanitizeInternalRedirectUrl("/dashboard"), "/dashboard");
  assert.equal(sanitizeInternalRedirectUrl("/profile?tab=settings"), "/profile?tab=settings");
});

test("sanitizeInternalRedirectUrl: valid relative paths with window origin", () => {
  // @ts-expect-error mock window in test env
  global.window = { location: { origin: "https://example.com" } };
  assert.equal(sanitizeInternalRedirectUrl("/dashboard"), "/dashboard");
  assert.equal(sanitizeInternalRedirectUrl("https://example.com/vault"), "https://example.com/vault");
});

test("sanitizeInternalRedirectUrl: prevents javascript: URI scheme", () => {
  assert.equal(sanitizeInternalRedirectUrl("javascript:alert(1)"), "/");
  assert.equal(sanitizeInternalRedirectUrl("javascript:alert(1)", "/fallback"), "/fallback");
});

test("sanitizeInternalRedirectUrl: prevents data: URI scheme", () => {
  assert.equal(sanitizeInternalRedirectUrl("data:text/html,<script>alert(1)</script>"), "/");
});

test("sanitizeInternalRedirectUrl: prevents cross-origin open redirects", () => {
  assert.equal(sanitizeInternalRedirectUrl("https://evil.example.com/phishing"), "/");
  assert.equal(sanitizeInternalRedirectUrl("//evil.example.com/phishing"), "/");
});

test("sanitizeExternalUrl: allows valid external http/https OAuth URLs", () => {
  assert.equal(
    sanitizeExternalUrl("https://auth.grok.me/oauth/authorize?client_id=123"),
    "https://auth.grok.me/oauth/authorize?client_id=123",
  );
});

test("sanitizeExternalUrl: prevents javascript: and data: schemes in external URLs", () => {
  assert.equal(sanitizeExternalUrl("javascript:alert(1)"), "/");
  assert.equal(sanitizeExternalUrl("data:text/html,x"), "/");
});
