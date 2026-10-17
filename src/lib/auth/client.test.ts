import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { sanitizeRedirectUrl } from "./client.ts";

describe("sanitizeRedirectUrl", () => {
  let originalWindow: typeof globalThis.window;

  before(() => {
    originalWindow = globalThis.window;
    // Mock window object for node test environment
    globalThis.window = {
      location: {
        origin: "https://app.example.com",
      } as Location,
    } as unknown as Window & typeof globalThis;
  });

  after(() => {
    globalThis.window = originalWindow;
  });

  it("returns relative path resolved against origin", () => {
    assert.equal(
      sanitizeRedirectUrl("/dashboard"),
      "https://app.example.com/dashboard",
    );
  });

  it("returns valid https URL", () => {
    assert.equal(
      sanitizeRedirectUrl("https://app.example.com/login"),
      "https://app.example.com/login",
    );
  });

  it("returns valid http URL", () => {
    assert.equal(
      sanitizeRedirectUrl("http://localhost:8080/home"),
      "http://localhost:8080/home",
    );
  });

  it("blocks javascript: protocol and returns fallback", () => {
    assert.equal(
      sanitizeRedirectUrl("javascript:alert(document.cookie)", "/"),
      "/",
    );
  });

  it("blocks data: protocol and returns fallback", () => {
    assert.equal(
      sanitizeRedirectUrl("data:text/html,<script>alert(1)</script>", "/login"),
      "/login",
    );
  });

  it("blocks vbscript: protocol and returns fallback", () => {
    assert.equal(
      sanitizeRedirectUrl("vbscript:msgbox(1)", "/"),
      "/",
    );
  });

  it("handles malformed URLs and returns fallback", () => {
    assert.equal(
      sanitizeRedirectUrl("http://[invalid-ip]", "/"),
      "/",
    );
  });
});
