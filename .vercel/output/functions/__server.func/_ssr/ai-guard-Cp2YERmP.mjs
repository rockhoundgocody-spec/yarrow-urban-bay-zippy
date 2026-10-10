import { i as getRequestIP, o as setResponseStatus, r as getRequestHeader } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-guard-Cp2YERmP.js
/**
* Server-side protection for the paid AI endpoints (xAI).
* Import ONLY from inside createServerFn handlers.
*
* - Same-origin check: browsers always send Origin on these POSTs; scripts
*   calling from elsewhere (or with no Origin) are refused.
* - Per-IP limits: a short burst window and a daily budget per endpoint.
* - Per-instance global ceiling so one instance can't be used to drain quota.
*
* Limits live in memory, so they are per server instance. That stops casual
* and scripted abuse from a single source; a durable, cross-instance limiter
* needs a shared store (planned with the Supabase move).
*/
var LIMITS = {
	identify: {
		perMinute: 4,
		perDay: 25
	},
	clover: {
		perMinute: 12,
		perDay: 200
	},
	speak: {
		perMinute: 12,
		perDay: 200
	},
	transcribe: {
		perMinute: 12,
		perDay: 200
	}
};
var GLOBAL_PER_MINUTE = 240;
var MINUTE = 6e4;
var DAY = 1440 * MINUTE;
var MAX_KEYS = 2e4;
var hits = /* @__PURE__ */ new Map();
var globalHits = [];
var AiGuardError = class extends Error {
	userMessage;
	constructor(userMessage) {
		super(userMessage);
		this.userMessage = userMessage;
	}
};
function sameOrigin() {
	const origin = getRequestHeader("origin");
	if (!origin) return false;
	const host = getRequestHeader("x-forwarded-host") ?? getRequestHeader("host");
	try {
		return !!host && new URL(origin).host === host.split(",")[0].trim();
	} catch {
		return false;
	}
}
function clientKey() {
	try {
		return getRequestIP({ xForwardedFor: true }) ?? "unknown";
	} catch {
		return "unknown";
	}
}
/** Throws AiGuardError when the call must be refused. */
function guardAiCall(kind) {
	if (!sameOrigin()) throw new AiGuardError("This request isn't allowed.");
	const now = Date.now();
	globalHits = globalHits.filter((t) => now - t < MINUTE);
	if (globalHits.length >= GLOBAL_PER_MINUTE) throw new AiGuardError("The field guide is busy. Try again in a minute.");
	const key = `${kind}:${clientKey()}`;
	const recent = (hits.get(key) ?? []).filter((t) => now - t < DAY);
	const lastMinute = recent.filter((t) => now - t < MINUTE).length;
	const { perMinute, perDay } = LIMITS[kind];
	if (lastMinute >= perMinute) throw new AiGuardError("Slow down a moment, then try again.");
	if (recent.length >= perDay) throw new AiGuardError("Daily limit reached for this feature. It resets tomorrow.");
	recent.push(now);
	if (!hits.has(key) && hits.size >= MAX_KEYS) {
		const oldest = hits.keys().next().value;
		if (oldest !== void 0) hits.delete(oldest);
	}
	hits.set(key, recent);
	globalHits.push(now);
}
function aiModel() {
	return process.env.XAI_MODEL || "grok-4.5";
}
var AI_TIMEOUT_MS = 25e3;
/** Validator helper: never throws, so bad input becomes a 400 instead of a 500. */
function parseInput(schema, input) {
	const r = schema.safeParse(input);
	return r.success ? {
		valid: true,
		value: r.data
	} : { valid: false };
}
/** Marks the response 400 Bad Request. Call from a handler when input was invalid. */
function rejectInvalidInput() {
	try {
		setResponseStatus(400);
	} catch {}
}
//#endregion
export { parseInput as a, guardAiCall as i, AiGuardError as n, rejectInvalidInput as o, aiModel as r, AI_TIMEOUT_MS as t };
