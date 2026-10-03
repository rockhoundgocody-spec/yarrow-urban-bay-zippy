import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { sanitizeSameOriginRedirect, sanitizeOAuthUrl } from "./client.ts";

describe("sanitizeSameOriginRedirect", () => {
  const originalWindow = globalThis.window;

  before(() => {
    // Simulate browser window context
    globalThis.window = {
      location: {
        origin: "https://my-app.grok.me",
      } as unknown as Location,
    } as unknown as Window & typeof globalThis;
  });

  after(() => {
    globalThis.window = originalWindow;
  });

  it("returns relative path resolved against origin for valid relative URL", () => {
    assert.equal(
      sanitizeSameOriginRedirect("/profile"),
      "https://my-app.grok.me/profile",
    );
  });

  it("returns same origin absolute URL as is", () => {
    assert.equal(
      sanitizeSameOriginRedirect("https://my-app.grok.me/dashboard"),
      "https://my-app.grok.me/dashboard",
    );
  });

  it("rejects javascript: URIs and falls back to default", () => {
    assert.equal(
      sanitizeSameOriginRedirect("javascript:alert(document.domain)"),
      "/",
    );
  });

  it("rejects data: URIs and falls back to default", () => {
    assert.equal(
      sanitizeSameOriginRedirect("data:text/html,<script>alert(1)</script>"),
      "/",
    );
  });

  it("rejects external domains (Open Redirect) and falls back to default", () => {
    assert.equal(
      sanitizeSameOriginRedirect("https://attacker.com/login"),
      "/",
    );
    assert.equal(
      sanitizeSameOriginRedirect("//attacker.com/login"),
      "/",
    );
  });

  it("uses provided fallback when URL is unsafe", () => {
    assert.equal(
      sanitizeSameOriginRedirect("javascript:alert(1)", "/custom-fallback"),
      "/custom-fallback",
    );
  });
});

describe("sanitizeOAuthUrl", () => {
  const originalWindow = globalThis.window;

  before(() => {
    globalThis.window = {
      location: {
        origin: "https://my-app.grok.me",
      } as unknown as Location,
    } as unknown as Window & typeof globalThis;
  });

  after(() => {
    globalThis.window = originalWindow;
  });

  it("allows valid http and https external URLs", () => {
    assert.equal(
      sanitizeOAuthUrl("https://auth.grok.com/oauth/authorize"),
      "https://auth.grok.com/oauth/authorize",
    );
  });

  it("rejects javascript: URIs for OAuth URL", () => {
    assert.equal(sanitizeOAuthUrl("javascript:alert(1)"), null);
  });

  it("rejects data: URIs for OAuth URL", () => {
    assert.equal(
      sanitizeOAuthUrl("data:text/html,<script>alert(1)</script>"),
      null,
    );
  });
});
