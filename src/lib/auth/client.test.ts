import assert from "node:assert/strict";
import { test } from "node:test";
import { sanitizeRedirectUrl } from "./client.ts";

test("sanitizeRedirectUrl: accepts valid relative paths and same-origin URLs", () => {
  assert.equal(sanitizeRedirectUrl("/quests"), "/quests");
  assert.equal(sanitizeRedirectUrl("/vault?id=123#top"), "/vault?id=123#top");
});

test("sanitizeRedirectUrl: blocks javascript: and data: URIs", () => {
  assert.equal(sanitizeRedirectUrl("javascript:alert(1)"), "/");
  assert.equal(sanitizeRedirectUrl("data:text/html,<script>alert(1)</script>"), "/");
});

test("sanitizeRedirectUrl: blocks off-site open redirects", () => {
  assert.equal(sanitizeRedirectUrl("https://evil.com"), "/");
  assert.equal(sanitizeRedirectUrl("//evil.com"), "/");
});
