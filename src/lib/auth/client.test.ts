import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { safeRedirectUrl } from "./client.ts";

describe("safeRedirectUrl", () => {
  it("allows safe relative paths", () => {
    assert.equal(
      safeRedirectUrl("/profile"),
      "http://localhost/profile",
    );
    assert.equal(
      safeRedirectUrl("/vault?id=123#top"),
      "http://localhost/vault?id=123#top",
    );
  });

  it("allows safe http and https absolute URLs", () => {
    assert.equal(
      safeRedirectUrl("https://example.com/login"),
      "https://example.com/login",
    );
    assert.equal(
      safeRedirectUrl("http://localhost:8080/dashboard"),
      "http://localhost:8080/dashboard",
    );
  });

  it("rejects javascript: URIs and falls back to default", () => {
    assert.equal(safeRedirectUrl("javascript:alert(1)"), "/");
    assert.equal(
      safeRedirectUrl("javascript:alert(1)", "/fallback"),
      "/fallback",
    );
    assert.equal(
      safeRedirectUrl("java\nscript:alert(1)"),
      "/",
    );
  });

  it("rejects data: URIs and falls back to default", () => {
    assert.equal(
      safeRedirectUrl("data:text/html,<script>alert(1)</script>"),
      "/",
    );
  });

  it("rejects invalid, empty, or non-string inputs", () => {
    assert.equal(safeRedirectUrl(""), "/");
    assert.equal(safeRedirectUrl("   "), "/");
    assert.equal(safeRedirectUrl(null as unknown as string), "/");
    assert.equal(safeRedirectUrl(undefined as unknown as string), "/");
  });
});
