import { n as createServerFn } from "./ssr.mjs";
import { a as parseInput, i as guardAiCall, n as AiGuardError, o as rejectInvalidInput, t as AI_TIMEOUT_MS } from "./ai-guard-Cp2YERmP.mjs";
import { a as object, s as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-DfeXRT9v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/speak-DhYimvjK.js
var SpeakInput = object({ text: string().min(1).max(800) });
var TranscribeInput = object({ audioDataUrl: string().max(28e5).regex(/^data:audio\/(webm|ogg|mp4|mpeg|wav|x-m4a)(;codecs=[A-Za-z0-9.,=-]+)?;base64,[A-Za-z0-9+/=]+$/) });
var speakClover_createServerFn_handler = createServerRpc({
	id: "b2e0318fa02b334f5ed76157bb1657ac522da5d9d53a2faa5ef81db85048b334",
	name: "speakClover",
	filename: "src/lib/speak.ts"
}, (opts) => speakClover.__executeServer(opts));
var speakClover = createServerFn({ method: "POST" }).validator((input) => parseInput(SpeakInput, input)).handler(speakClover_createServerFn_handler, async ({ data: input }) => {
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
	let res;
	try {
		res = await fetch("https://api.x.ai/v1/tts", {
			method: "POST",
			signal: AbortSignal.timeout(AI_TIMEOUT_MS),
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text,
				voice_id: "ara",
				language: "en",
				speed: .96,
				text_normalization: true
			})
		});
	} catch {
		return { ok: false };
	}
	if (!res.ok) return { ok: false };
	const buf = Buffer.from(await res.arrayBuffer());
	if (buf.byteLength < 200) return { ok: false };
	return {
		ok: true,
		audio: buf.toString("base64")
	};
});
var transcribeClover_createServerFn_handler = createServerRpc({
	id: "042763fd345a97f0345dc0cd42b9436661ff0d26a355cf8c24dd7b66626f4b22",
	name: "transcribeClover",
	filename: "src/lib/speak.ts"
}, (opts) => transcribeClover.__executeServer(opts));
var transcribeClover = createServerFn({ method: "POST" }).validator((input) => parseInput(TranscribeInput, input)).handler(transcribeClover_createServerFn_handler, async ({ data: input }) => {
	if (!input.valid) {
		rejectInvalidInput();
		return {
			ok: false,
			error: "Invalid request."
		};
	}
	const data = input.value;
	try {
		guardAiCall("transcribe");
	} catch (e) {
		if (e instanceof AiGuardError) return {
			ok: false,
			error: e.userMessage
		};
		throw e;
	}
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Voice is offline right now."
	};
	const raw = data.audioDataUrl;
	const comma = raw.indexOf(",");
	const meta = raw.slice(0, comma);
	const bytes = Buffer.from(raw.slice(comma + 1), "base64");
	if (bytes.byteLength < 400) return {
		ok: false,
		error: "Too short."
	};
	const mime = /data:([^;]+)/.exec(meta)?.[1] || "audio/webm";
	const ext = mime.includes("mp4") || mime.includes("m4a") ? "mp4" : mime.includes("ogg") ? "ogg" : mime.includes("wav") ? "wav" : mime.includes("mpeg") ? "mp3" : "webm";
	const form = new FormData();
	form.append("language", "en");
	form.append("file", new Blob([bytes], { type: mime }), `voice.${ext}`);
	let res;
	try {
		res = await fetch("https://api.x.ai/v1/stt", {
			method: "POST",
			signal: AbortSignal.timeout(AI_TIMEOUT_MS),
			headers: { Authorization: `Bearer ${apiKey}` },
			body: form
		});
	} catch {
		return {
			ok: false,
			error: "Couldn't reach voice service. Check your signal."
		};
	}
	if (!res.ok) {
		console.error("[transcribe] upstream", res.status);
		return {
			ok: false,
			error: "Couldn't hear that. Try again."
		};
	}
	const body = await res.json();
	const text = String(body.text || "").trim();
	if (text.length < 2) return {
		ok: false,
		error: "Didn't catch that."
	};
	return {
		ok: true,
		text: text.slice(0, 800)
	};
});
//#endregion
export { speakClover_createServerFn_handler, transcribeClover_createServerFn_handler };
