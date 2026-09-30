import assert from "node:assert/strict";
import { test } from "node:test";
import { sanitizeRedirectUrl } from "../src/lib/auth/client.ts";

test("sanitizeRedirectUrl allows valid relative and http/https URLs", () => {
  const origWindow = globalThis.window;
  globalThis.window = {
    location: {
      origin: "http://localhost:8080",
    },
  };
  try {
    assert.equal(sanitizeRedirectUrl("/profile"), "http://localhost:8080/profile");
    assert.equal(sanitizeRedirectUrl("/"), "http://localhost:8080/");
    assert.equal(sanitizeRedirectUrl("http://localhost:8080/dashboard"), "http://localhost:8080/dashboard");
    assert.equal(sanitizeRedirectUrl("https://example.com/login"), "https://example.com/login");
  } finally {
    globalThis.window = origWindow;
  }
});

test("sanitizeRedirectUrl rejects javascript: and data: schemes and falls back safely", () => {
  const origWindow = globalThis.window;
  globalThis.window = {
    location: {
      origin: "http://localhost:8080",
    },
  };
  try {
    assert.equal(sanitizeRedirectUrl("javascript:alert(1)"), "/");
    assert.equal(sanitizeRedirectUrl("javascript:alert(document.cookie)", "/fallback"), "/fallback");
    assert.equal(sanitizeRedirectUrl("data:text/html,<script>alert(1)</script>"), "/");
    assert.equal(sanitizeRedirectUrl("vbscript:msgbox(1)"), "/");
  } finally {
    globalThis.window = origWindow;
  }
});

test("sanitizeRedirectUrl handles server environment (no window)", () => {
  const origWindow = globalThis.window;
  delete globalThis.window;
  try {
    assert.equal(sanitizeRedirectUrl("https://example.com", "/fallback"), "/fallback");
  } finally {
    globalThis.window = origWindow;
  }
});
