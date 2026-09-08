import assert from "node:assert/strict";
import { test } from "node:test";
import { isSafeBridgePath } from "../src/lib/preview-host-bridge.ts";

test("isSafeBridgePath allows valid relative application paths", () => {
  assert.equal(isSafeBridgePath("/"), true);
  assert.equal(isSafeBridgePath("/explore"), true);
  assert.equal(isSafeBridgePath("/pedia/123"), true);
  assert.equal(isSafeBridgePath("/vault/sp_125?tab=details#top"), true);
});

test("isSafeBridgePath rejects protocol-relative, absolute, or escaped paths", () => {
  assert.equal(isSafeBridgePath("//evil.com"), false);
  assert.equal(isSafeBridgePath("/\\evil.com"), false);
  assert.equal(isSafeBridgePath("https://evil.com"), false);
  assert.equal(isSafeBridgePath("http://evil.com"), false);
});

test("isSafeBridgePath rejects JavaScript, Data, or scheme-injected paths", () => {
  assert.equal(isSafeBridgePath("/javascript:alert(1)"), false);
  assert.equal(isSafeBridgePath("/data:text/html,xss"), false);
  assert.equal(isSafeBridgePath("/vbscript:msgbox(1)"), false);
  assert.equal(isSafeBridgePath("/http://evil.com"), false);
  assert.equal(isSafeBridgePath("/https://evil.com"), false);
});

test("isSafeBridgePath rejects control characters and null bytes", () => {
  assert.equal(isSafeBridgePath("/\0"), false);
  assert.equal(isSafeBridgePath("/\r\n/evil.com"), false);
  assert.equal(isSafeBridgePath("/\t/evil.com"), false);
  assert.equal(isSafeBridgePath("/\x1f/test"), false);
});
