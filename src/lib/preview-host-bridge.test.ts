import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isSafeBridgePath } from "./preview-host-bridge.ts";

describe("isSafeBridgePath", () => {
  it("allows safe relative paths", () => {
    assert.equal(isSafeBridgePath("/"), true);
    assert.equal(isSafeBridgePath("/explore"), true);
    assert.equal(isSafeBridgePath("/pedia/123"), true);
    assert.equal(isSafeBridgePath("/pedia/123?query=rock#section"), true);
  });

  it("rejects non-string or non-slash starting inputs", () => {
    // @ts-expect-error testing invalid input type
    assert.equal(isSafeBridgePath(null), false);
    // @ts-expect-error testing invalid input type
    assert.equal(isSafeBridgePath(undefined), false);
    assert.equal(isSafeBridgePath(""), false);
    assert.equal(isSafeBridgePath("explore"), false);
    assert.equal(isSafeBridgePath("https://evil.com"), false);
    assert.equal(isSafeBridgePath("javascript:alert(1)"), false);
  });

  it("rejects protocol-relative slashes and backslashes", () => {
    assert.equal(isSafeBridgePath("//evil.com"), false);
    assert.equal(isSafeBridgePath("//evil.com/path"), false);
    assert.equal(isSafeBridgePath("/\\evil.com"), false);
    assert.equal(isSafeBridgePath("/path\\to\\resource"), false);
  });

  it("rejects leading whitespace or control characters after slash", () => {
    assert.equal(isSafeBridgePath("/\tevil.com"), false);
    assert.equal(isSafeBridgePath("/\nevil.com"), false);
    assert.equal(isSafeBridgePath("/ evil.com"), false);
    assert.equal(isSafeBridgePath("/\0evil.com"), false);
  });
});
