import { describe, it } from "node:test";
import assert from "node:assert/strict";

function isValidImageDataUrl(url) {
  return /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test((url || "").trim());
}

describe("isValidImageDataUrl", () => {
  it("accepts valid image data URLs", () => {
    assert.equal(isValidImageDataUrl("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="), true);
    assert.equal(isValidImageDataUrl("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP..."), true);
    assert.equal(isValidImageDataUrl("data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"), true);
    assert.equal(isValidImageDataUrl("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"), true);
  });

  it("rejects non-image or malformed data URLs", () => {
    assert.equal(isValidImageDataUrl(""), false);
    assert.equal(isValidImageDataUrl("https://example.com/test.jpg"), false);
    assert.equal(isValidImageDataUrl("data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="), false);
    assert.equal(isValidImageDataUrl("data:application/json;base64,e30="), false);
    assert.equal(isValidImageDataUrl("data:image/png;utf8,hello"), false);
    assert.equal(isValidImageDataUrl("data:image/exe;base64,abc"), false);
  });
});
