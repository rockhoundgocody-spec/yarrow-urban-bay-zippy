import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { AI_TIMEOUT_MS, AiGuardError, guardAiCall, parseInput, rejectInvalidInput } from "@/lib/ai-guard";

const SpeakInput = z.object({ text: z.string().min(1).max(800) });

// ~2 MB of audio once decoded (base64 is 4/3 the size).
const TranscribeInput = z.object({
  audioDataUrl: z
    .string()
    .max(2_800_000)
    .regex(/^data:audio\/(webm|ogg|mp4|mpeg|wav|x-m4a)(;codecs=[A-Za-z0-9.,=-]+)?;base64,[A-Za-z0-9+/=]+$/),
});

export const speakClover = createServerFn({ method: "POST" })
  .validator((input: unknown) => parseInput(SpeakInput, input))
  .handler(async ({ data: input }): Promise<{ ok: true; audio: string } | { ok: false }> => {
    if (!input.valid) {
      rejectInvalidInput();
      return { ok: false };
    }
    const data = input.value;
    try {
      guardAiCall("speak");
    } catch (e) {
      if (e instanceof AiGuardError) return { ok: false };
      throw e;
    }
    const apiKey = process.env.XAI_API_KEY;
    const text = data.text.trim();
    if (!apiKey || !text) return { ok: false };

    let res: Response;
    try {
      res = await fetch("https://api.x.ai/v1/tts", {
        method: "POST",
        signal: AbortSignal.timeout(AI_TIMEOUT_MS),
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice_id: "ara",
          language: "en",
          speed: 0.96,
          text_normalization: true,
        }),
      });
    } catch {
      return { ok: false };
    }
    if (!res.ok) return { ok: false };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength < 200) return { ok: false };
    return { ok: true, audio: buf.toString("base64") };
  });

export const transcribeClover = createServerFn({ method: "POST" })
  .validator((input: unknown) => parseInput(TranscribeInput, input))
  .handler(async ({ data: input }): Promise<{ ok: true; text: string } | { ok: false; error: string }> => {
    if (!input.valid) {
      rejectInvalidInput();
      return { ok: false, error: "Invalid request." };
    }
    const data = input.value;
    try {
      guardAiCall("transcribe");
    } catch (e) {
      if (e instanceof AiGuardError) return { ok: false, error: e.userMessage };
      throw e;
    }
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Voice is offline right now." };

    const raw = data.audioDataUrl;
    const comma = raw.indexOf(",");
    const meta = raw.slice(0, comma);
    const bytes = Buffer.from(raw.slice(comma + 1), "base64");
    if (bytes.byteLength < 400) return { ok: false, error: "Too short." };
    const mime = /data:([^;]+)/.exec(meta)?.[1] || "audio/webm";

    const ext = mime.includes("mp4") || mime.includes("m4a") ? "mp4" : mime.includes("ogg") ? "ogg" : mime.includes("wav") ? "wav" : mime.includes("mpeg") ? "mp3" : "webm";
    const form = new FormData();
    form.append("language", "en");
    form.append("file", new Blob([bytes], { type: mime }), `voice.${ext}`);

    let res: Response;
    try {
      res = await fetch("https://api.x.ai/v1/stt", {
        method: "POST",
        signal: AbortSignal.timeout(AI_TIMEOUT_MS),
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
      });
    } catch {
      return { ok: false, error: "Couldn't reach voice service. Check your signal." };
    }
    if (!res.ok) {
      console.error("[transcribe] upstream", res.status);
      return { ok: false, error: "Couldn't hear that. Try again." };
    }
    const body = (await res.json()) as { text?: string };
    const text = String(body.text || "").trim();
    if (text.length < 2) return { ok: false, error: "Didn't catch that." };
    return { ok: true, text: text.slice(0, 800) };
  });
