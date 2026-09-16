import { createServerFn } from "@tanstack/react-start";
import { assertSameSiteRequest } from "./auth/isolation.server.ts";

export function validateSpeakInput(input: unknown): { text: string } {
  if (!input || typeof input !== "object") throw new Error("Invalid request payload");
  const obj = input as Record<string, unknown>;
  const text = typeof obj.text === "string" ? obj.text.trim() : "";
  if (!text) throw new Error("Text parameter is required");
  return { text: text.slice(0, 800) };
}

export function validateTranscribeInput(input: unknown): { audioDataUrl: string } {
  if (!input || typeof input !== "object") throw new Error("Invalid request payload");
  const obj = input as Record<string, unknown>;
  const audioDataUrl = typeof obj.audioDataUrl === "string" ? obj.audioDataUrl.trim() : "";
  if (!audioDataUrl || !audioDataUrl.startsWith("data:")) {
    throw new Error("Valid audio data URL is required");
  }
  return { audioDataUrl };
}

export const speakClover = createServerFn({ method: "POST" })
  .validator(validateSpeakInput)
  .handler(async ({ data }): Promise<{ ok: true; audio: string } | { ok: false }> => {
    assertSameSiteRequest();
    const apiKey = process.env.XAI_API_KEY;
    const text = data.text;
    if (!apiKey || !text) return { ok: false };

    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voice_id: "ara",
        language: "en",
        speed: 0.96,
        text_normalization: true,
      }),
    });
    if (!res.ok) return { ok: false };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength < 200) return { ok: false };
    return { ok: true, audio: buf.toString("base64") };
  });

export const transcribeClover = createServerFn({ method: "POST" })
  .validator(validateTranscribeInput)
  .handler(async ({ data }): Promise<{ ok: true; text: string } | { ok: false; error: string }> => {
    assertSameSiteRequest();
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Voice is offline." };

    const raw = data.audioDataUrl;
    const comma = raw.indexOf(",");
    if (comma < 0) return { ok: false, error: "No audio." };
    const meta = raw.slice(0, comma);
    const b64 = raw.slice(comma + 1);
    const mime = /data:([^;]+)/.exec(meta)?.[1] || "audio/webm";
    const bytes = Buffer.from(b64, "base64");
    if (bytes.byteLength < 400) return { ok: false, error: "Too short." };

    const ext = mime.includes("mp4") ? "mp4" : mime.includes("ogg") ? "ogg" : "webm";
    const form = new FormData();
    form.append("language", "en");
    form.append("file", new Blob([bytes], { type: mime }), `voice.${ext}`);

    const res = await fetch("https://api.x.ai/v1/stt", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
    if (!res.ok) return { ok: false, error: `Could not hear that (${res.status}).` };
    const body = (await res.json()) as { text?: string };
    const text = String(body.text || "").trim();
    if (text.length < 2) return { ok: false, error: "Didn't catch that." };
    return { ok: true, text: text.slice(0, 800) };
  });
