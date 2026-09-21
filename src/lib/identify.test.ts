import assert from "node:assert/strict";
import test from "node:test";
import { AskCloverInputSchema, IdentifyInputSchema } from "./identify.ts";
import { SpeakInputSchema, TranscribeInputSchema } from "./speak.ts";

test("IdentifyInputSchema accepts valid input", () => {
  const valid = { imageDataUrl: "data:image/jpeg;base64,1234", notes: "found near river", locality: "Utah" };
  const parsed = IdentifyInputSchema.parse(valid);
  assert.equal(parsed.imageDataUrl, valid.imageDataUrl);
  assert.equal(parsed.notes, valid.notes);
  assert.equal(parsed.locality, valid.locality);
});

test("IdentifyInputSchema rejects empty or non-string imageDataUrl", () => {
  assert.throws(() => IdentifyInputSchema.parse({ imageDataUrl: "" }));
  assert.throws(() => IdentifyInputSchema.parse({ imageDataUrl: 123 }));
  assert.throws(() => IdentifyInputSchema.parse({}));
});

test("AskCloverInputSchema accepts valid input", () => {
  const valid = {
    question: "What is quartz?",
    history: [{ role: "user" as const, text: "Hello" }],
    companion: {
      name: "Rockhound",
      level: 2,
      mood: "curious",
      energy: 80,
      streak: 5,
      todaysFinds: 3,
      collection: ["quartz", "amethyst"],
    },
    mode: "voice" as const,
  };
  const parsed = AskCloverInputSchema.parse(valid);
  assert.equal(parsed.question, "What is quartz?");
  assert.equal(parsed.companion?.name, "Rockhound");
});

test("AskCloverInputSchema rejects invalid role or empty question", () => {
  assert.throws(() => AskCloverInputSchema.parse({ question: "" }));
  assert.throws(() =>
    AskCloverInputSchema.parse({
      question: "Hello",
      history: [{ role: "invalid_role", text: "hi" }],
    }),
  );
});

test("SpeakInputSchema validates text parameter", () => {
  assert.equal(SpeakInputSchema.parse({ text: "Hello Clover" }).text, "Hello Clover");
  assert.throws(() => SpeakInputSchema.parse({ text: "" }));
  assert.throws(() => SpeakInputSchema.parse({}));
});

test("TranscribeInputSchema validates audioDataUrl parameter", () => {
  assert.equal(
    TranscribeInputSchema.parse({ audioDataUrl: "data:audio/webm;base64,123" }).audioDataUrl,
    "data:audio/webm;base64,123",
  );
  assert.throws(() => TranscribeInputSchema.parse({ audioDataUrl: "" }));
  assert.throws(() => TranscribeInputSchema.parse({}));
});
