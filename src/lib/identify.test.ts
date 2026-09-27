import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateIdentifyInput, validateAskCloverInput } from "./identify.ts";
import { validateSpeakInput, validateTranscribeInput } from "./speak.ts";

describe("validateIdentifyInput", () => {
  it("rejects non-object or null input", () => {
    assert.throws(
      () => validateIdentifyInput(null),
      /Invalid request payload/,
    );
  });

  it("rejects missing or non-data/http URL image input", () => {
    assert.throws(
      () => validateIdentifyInput({ imageDataUrl: "ftp://example.com/pic.jpg" }),
      /A valid image data URL or HTTP URL is required/,
    );
  });

  it("accepts valid data URL and truncates optional fields", () => {
    const res = validateIdentifyInput({
      imageDataUrl: "data:image/jpeg;base64,123",
      notes: "a".repeat(600),
      locality: "b".repeat(300),
    });
    assert.equal(res.imageDataUrl, "data:image/jpeg;base64,123");
    assert.equal(res.notes?.length, 500);
    assert.equal(res.locality?.length, 200);
  });
});

describe("validateAskCloverInput", () => {
  it("rejects empty question string", () => {
    assert.throws(
      () => validateAskCloverInput({ question: "   " }),
      /Question is required/,
    );
  });

  it("accepts valid question and truncates long question", () => {
    const res = validateAskCloverInput({ question: "  What rock is this?  " + "x".repeat(900) });
    assert.equal(res.question.length, 800);
  });
});

describe("validateSpeakInput & validateTranscribeInput", () => {
  it("rejects empty text for speak input", () => {
    assert.throws(
      () => validateSpeakInput({ text: "  " }),
      /Text parameter is required/,
    );
  });

  it("rejects invalid non-data URL for transcribe input", () => {
    assert.throws(
      () => validateTranscribeInput({ audioDataUrl: "http://invalid" }),
      /Valid audio data URL is required/,
    );
  });

  it("accepts valid audio data URL", () => {
    const res = validateTranscribeInput({ audioDataUrl: "data:audio/webm;base64,abc" });
    assert.equal(res.audioDataUrl, "data:audio/webm;base64,abc");
  });
});
