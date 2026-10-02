import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { isSafeBridgePath } from "./preview-host-bridge.ts";

describe("isSafeBridgePath security validation", () => {
  test("allows valid relative route paths and query strings", () => {
    assert.equal(isSafeBridgePath("/"), true);
    assert.equal(isSafeBridgePath("/vault"), true);
    assert.equal(isSafeBridgePath("/pedia?id=123#section"), true);
    assert.equal(isSafeBridgePath("/explore/location-1"), true);
  });

  test("rejects absolute URLs and protocol schemes", () => {
    assert.equal(isSafeBridgePath("https://evil.com"), false);
    assert.equal(isSafeBridgePath("http://evil.com"), false);
    assert.equal(isSafeBridgePath("javascript:alert(1)"), false);
    assert.equal(isSafeBridgePath("data:text/html,xss"), false);
  });

  test("rejects protocol-relative double slashes and backslashes", () => {
    assert.equal(isSafeBridgePath("//evil.com"), false);
    assert.equal(isSafeBridgePath("/\\evil.com"), false);
    assert.equal(isSafeBridgePath("/\\\\evil.com"), false);
  });

  test("rejects encoded open-redirect payloads", () => {
    assert.equal(isSafeBridgePath("/%2f%2fevil.com"), false);
    assert.equal(isSafeBridgePath("/%5cevil.com"), false);
    assert.equal(isSafeBridgePath("/%2f%2fgoogle.com"), false);
  });

  test("rejects paths containing ASCII control characters", () => {
    assert.equal(isSafeBridgePath("/\t/evil.com"), false);
    assert.equal(isSafeBridgePath("/\r/evil.com"), false);
    assert.equal(isSafeBridgePath("/\n/evil.com"), false);
    assert.equal(isSafeBridgePath("/\0/evil.com"), false);
  });
});
