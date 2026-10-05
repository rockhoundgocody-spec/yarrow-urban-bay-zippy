import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-DfeXRT9v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/speak-DmILtAo5.js
var speakClover_createServerFn_handler = createServerRpc({
	id: "b2e0318fa02b334f5ed76157bb1657ac522da5d9d53a2faa5ef81db85048b334",
	name: "speakClover",
	filename: "src/lib/speak.ts"
}, (opts) => speakClover.__executeServer(opts));
var speakClover = createServerFn({ method: "POST" }).validator((input) => input).handler(speakClover_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	const text = data.text.trim().slice(0, 800);
	if (!apiKey || !text) return { ok: false };
	const res = await fetch("https://api.x.ai/v1/tts", {
		method: "POST",
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
var transcribeClover = createServerFn({ method: "POST" }).validator((input) => input).handler(transcribeClover_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Voice is offline."
	};
	const raw = data.audioDataUrl;
	const comma = raw.indexOf(",");
	if (comma < 0) return {
		ok: false,
		error: "No audio."
	};
	const meta = raw.slice(0, comma);
	const b64 = raw.slice(comma + 1);
	const mime = /data:([^;]+)/.exec(meta)?.[1] || "audio/webm";
	const bytes = Buffer.from(b64, "base64");
	if (bytes.byteLength < 400) return {
		ok: false,
		error: "Too short."
	};
	const ext = mime.includes("mp4") ? "mp4" : mime.includes("ogg") ? "ogg" : "webm";
	const form = new FormData();
	form.append("language", "en");
	form.append("file", new Blob([bytes], { type: mime }), `voice.${ext}`);
	const res = await fetch("https://api.x.ai/v1/stt", {
		method: "POST",
		headers: { Authorization: `Bearer ${apiKey}` },
		body: form
	});
	if (!res.ok) return {
		ok: false,
		error: `Could not hear that (${res.status}).`
	};
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
