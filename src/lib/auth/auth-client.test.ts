import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { safeRedirect } from "./client.ts";

type WindowStub = { location: { href: string; origin: string } };

function withWindow<T>(stub: WindowStub, fn: () => T): T {
  (globalThis as { window?: unknown }).window = stub;
  try {
    return fn();
  } finally {
    delete (globalThis as { window?: unknown }).window;
  }
}

describe("safeRedirect", () => {
  it("redirects to valid http or https URLs", () => {
    let redirectedTo = "";
    const mockWindow = {
      location: {
        origin: "https://my-app.grok.me",
        get href() {
          return redirectedTo;
        },
        set href(val: string) {
          redirectedTo = val;
        },
      },
    };

    const result = withWindow(mockWindow, () => safeRedirect("/profile"));
    assert.equal(result, true);
    assert.equal(redirectedTo, "https://my-app.grok.me/profile");
  });

  it("redirects to external http or https URLs", () => {
    let redirectedTo = "";
    const mockWindow = {
      location: {
        origin: "https://my-app.grok.me",
        get href() {
          return redirectedTo;
        },
        set href(val: string) {
          redirectedTo = val;
        },
      },
    };

    const result = withWindow(mockWindow, () =>
      safeRedirect("https://example.com/oauth"),
    );
    assert.equal(result, true);
    assert.equal(redirectedTo, "https://example.com/oauth");
  });

  it("rejects javascript: scheme and falls back to fallback URL", () => {
    let redirectedTo = "";
    const mockWindow = {
      location: {
        origin: "https://my-app.grok.me",
        get href() {
          return redirectedTo;
        },
        set href(val: string) {
          redirectedTo = val;
        },
      },
    };

    const result = withWindow(mockWindow, () =>
      safeRedirect("javascript:alert(1)", "/"),
    );
    assert.equal(result, true);
    assert.equal(redirectedTo, "https://my-app.grok.me/");
  });

  it("rejects data: scheme and falls back to fallback URL", () => {
    let redirectedTo = "";
    const mockWindow = {
      location: {
        origin: "https://my-app.grok.me",
        get href() {
          return redirectedTo;
        },
        set href(val: string) {
          redirectedTo = val;
        },
      },
    };

    const result = withWindow(mockWindow, () =>
      safeRedirect("data:text/html,<script>alert(1)</script>", "/home"),
    );
    assert.equal(result, true);
    assert.equal(redirectedTo, "https://my-app.grok.me/home");
  });

  it("returns false when window is undefined (SSR)", () => {
    const result = safeRedirect("/profile");
    assert.equal(result, false);
  });
});
