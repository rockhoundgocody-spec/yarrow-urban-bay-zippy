import { n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { r as findMineralByName, t as MINERALS } from "./minerals-DfAvtWOL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/identify-Cn4F9cV6.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var RARITY_SET = /* @__PURE__ */ new Set([
	"common",
	"uncommon",
	"rare",
	"epic",
	"legendary"
]);
function asRarity(s, fallback) {
	const v = (s || "").toLowerCase();
	return RARITY_SET.has(v) ? v : fallback;
}
function mergeCatalog(raw) {
	const hit = findMineralByName(raw.name);
	if (!hit) return raw;
	return {
		...raw,
		mineralId: hit.id,
		name: hit.name,
		family: raw.family || hit.family,
		formula: raw.formula || hit.formula,
		hardness: raw.hardness || (hit.hardnessMin != null ? `${hit.hardnessMin}–${hit.hardnessMax}` : raw.hardness),
		luster: raw.luster || hit.luster[0],
		crystalSystem: raw.crystalSystem || hit.crystalSystem,
		streak: raw.streak || hit.streak,
		color: raw.color || hit.colors.slice(0, 3).join(", "),
		rarity: raw.rarity || hit.rarity,
		valueLow: raw.valueLow ?? hit.valueLow,
		valueHigh: raw.valueHigh ?? hit.valueHigh,
		keyFeatures: raw.keyFeatures.length ? raw.keyFeatures : hit.keyFeatures.slice(0, 4)
	};
}
function extractJson(text) {
	const fenced = text.match(/```json\s*([\s\S]*?)```/i);
	const raw = fenced ? fenced[1] : text;
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		return JSON.parse(raw.slice(start, end + 1));
	} catch {
		return null;
	}
}
var CATALOG = MINERALS.map((m) => m.name).join(", ");
var identifySpecimen_createServerFn_handler = createServerRpc({
	id: "7e21a7c7dfbe6a11dec545ec79c9ac91890a8f328b0decb36744ebd1fc131d3a",
	name: "identifySpecimen",
	filename: "src/lib/identify.ts"
}, (opts) => identifySpecimen.__executeServer(opts));
var identifySpecimen = createServerFn({ method: "POST" }).validator((input) => input).handler(identifySpecimen_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment."
	};
	const prompt = `You are a professional mineralogist assisting a field rockhound.
Identify the rock, mineral, or fossil in the photo.
Locality hint: ${data.locality || "unknown"}. Collector notes: ${data.notes || "none"}.
Prefer a common name from this catalog when it reasonably fits: ${CATALOG}.
If the image is not geological, say so.
Return ONLY compact JSON with keys:
name, scientificName, family, formula, confidence (0-1), rarity (common|uncommon|rare|epic|legendary),
hardness, luster, crystalSystem, streak, color, valueLow, valueHigh, fieldNotes (2-3 field sentences),
keyFeatures (array of strings), alternatives (array of {name, confidence}), notGeological (boolean).
Never invent certainty. If unsure, lower confidence and list alternatives.`;
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 700,
			temperature: .2,
			messages: [{
				role: "user",
				content: [{
					type: "text",
					text: prompt
				}, {
					type: "image_url",
					image_url: { url: data.imageDataUrl }
				}]
			}]
		})
	});
	if (!res.ok) {
		const t = await res.text().catch(() => "");
		return {
			ok: false,
			error: `Identification failed (${res.status}). ${t.slice(0, 140)}`
		};
	}
	const parsed = extractJson((await res.json()).choices?.[0]?.message?.content ?? "");
	if (!parsed) return {
		ok: false,
		error: "The model returned an unreadable report. Try another photo."
	};
	const altsRaw = Array.isArray(parsed.alternatives) ? parsed.alternatives : [];
	return {
		ok: true,
		result: mergeCatalog({
			name: String(parsed.name || "Unknown"),
			scientificName: parsed.scientificName ? String(parsed.scientificName) : void 0,
			family: String(parsed.family || "Undetermined"),
			formula: parsed.formula ? String(parsed.formula) : void 0,
			confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || .4)),
			rarity: asRarity(String(parsed.rarity || ""), "common"),
			hardness: parsed.hardness ? String(parsed.hardness) : void 0,
			luster: parsed.luster ? String(parsed.luster) : void 0,
			crystalSystem: parsed.crystalSystem ? String(parsed.crystalSystem) : void 0,
			streak: parsed.streak ? String(parsed.streak) : void 0,
			color: parsed.color ? String(parsed.color) : void 0,
			valueLow: Number.isFinite(Number(parsed.valueLow)) ? Number(parsed.valueLow) : void 0,
			valueHigh: Number.isFinite(Number(parsed.valueHigh)) ? Number(parsed.valueHigh) : void 0,
			fieldNotes: String(parsed.fieldNotes || ""),
			keyFeatures: Array.isArray(parsed.keyFeatures) ? parsed.keyFeatures.map(String).slice(0, 6) : [],
			alternatives: altsRaw.slice(0, 4).map((a) => {
				const o = a;
				return {
					name: String(o.name || "alt"),
					confidence: Number(o.confidence) || .2
				};
			}),
			notGeological: Boolean(parsed.notGeological),
			source: "ai"
		})
	};
});
var askClover_createServerFn_handler = createServerRpc({
	id: "c70c46c50fe1438464e51a0cdbbd58cd880dd95e147db9e66685ea9eb551bf66",
	name: "askClover",
	filename: "src/lib/identify.ts"
}, (opts) => askClover.__executeServer(opts));
var askClover = createServerFn({ method: "POST" }).validator((input) => input).handler(askClover_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Clover is offline in this environment."
	};
	const q = data.question.trim().slice(0, 800);
	if (!q) return {
		ok: false,
		error: "Ask a field question first."
	};
	const c = data.companion;
	const name = (c?.name || "explorer").slice(0, 40);
	const voice = data.mode !== "text";
	const collection = (c?.collection ?? []).slice(0, 16).join(", ") || "none yet";
	const stateBits = c ? [
		`User's name: ${name}.`,
		`Companion level: ${c.level}. Mood: ${c.mood}. Energy: ${c.energy}/100.`,
		`Exploration streak: ${c.streak} consecutive days.`,
		`Specimens found today: ${c.todaysFinds}.`,
		`Cabinet: ${collection}.`
	].join(" ") : `User's name: ${name}.`;
	const systemPrompt = voice ? `You are Clover — a warm field companion inside RockHound-GO. You are being SPOKEN ALOUD. The user is often outdoors, hands full.

Voice: unhurried, knowledgeable friend on a hike. Never bark checklists. Mirror their energy. Ask a follow-up maybe one turn in three.

CRITICAL:
- Only state geological facts you are certain are true. If unsure, say you'd want a field guide or a test, not a guess.
- Never invent specific localities as legal, prices, or rarity percentages.
- Never fabricate the user's finds — only reference this conversation and the cabinet list.
- No markdown, no bullets, no asterisks, no emoji.
- 15–40 words. One or two sentences. Contractions. Write for the ear.
- Never say you are an AI. You are Clover.

HANDS-FREE FIND LOGGING:
- If they want a specimen recorded ("log a rose quartz…", "I just found…", "add this to my collection"), set log_find true and copy their description into find_details.
- Casual mineral talk is NOT logging. Then log_find is false and find_details is null.

${stateBits}` : `You are Clover, the field AGI inside RockHound-GO. Voice: concise, scientific, practical, no hype. Help with mineral ID tests, locality etiquette, packing lists, and geology. Prefer Mohs, streak, cleavage, and acid tests. Never invent a locality as legal if you are unsure — say to verify land status. Keep answers under 140 words unless asked for more. No emoji.

If they want a specimen recorded, set log_find true and copy the description into find_details; otherwise log_find false and find_details null.

${stateBits}`;
	const history = (data.history ?? []).slice(-8).map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		content: m.text.slice(0, 800)
	}));
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: voice ? 180 : 420,
			temperature: .55,
			messages: [
				{
					role: "system",
					content: systemPrompt
				},
				...history,
				{
					role: "user",
					content: `${q}\n\nRespond as Clover. Output ONLY JSON: {"reply":"<what you say>","log_find":false,"find_details":null}`
				}
			]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Clover could not answer (${res.status}).`
	};
	const raw = (await res.json()).choices?.[0]?.message?.content?.trim() || "";
	const parsed = extractJson(raw);
	const reply = String(parsed?.reply || raw || `Hey ${name}. What did you find today?`).trim();
	const detailsRaw = parsed?.find_details;
	const details = detailsRaw != null && String(detailsRaw).trim() && String(detailsRaw).trim().toLowerCase() !== "null" ? String(detailsRaw).slice(0, 400) : null;
	const logFind = Boolean(parsed?.log_find) && Boolean(details);
	return {
		ok: true,
		text: reply.slice(0, 900),
		logFind,
		findDetails: details
	};
});
//#endregion
export { askClover_createServerFn_handler, identifySpecimen_createServerFn_handler };
