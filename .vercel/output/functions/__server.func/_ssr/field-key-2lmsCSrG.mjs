import { r as findMineralByName, t as MINERALS } from "./minerals-BzbnUKRY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-key-2lmsCSrG.js
/** Pure, client-safe identification helpers (no server or network code). */
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
		keyFeatures: raw.keyFeatures.length ? raw.keyFeatures : hit.keyFeatures.slice(0, 4)
	};
}
function scoreMineral(m, key) {
	let s = 0;
	if (key.color) {
		const c = key.color.toLowerCase();
		if (m.colors.some((x) => x.toLowerCase().includes(c) || c.includes(x.toLowerCase()))) s += 3;
		if (m.name.toLowerCase().includes(c)) s += 1;
	}
	if (key.hardness != null && m.hardnessMin != null && m.hardnessMax != null) {
		if (key.hardness >= m.hardnessMin - .5 && key.hardness <= m.hardnessMax + .5) s += 3;
		else if (Math.abs(key.hardness - (m.hardnessMin + m.hardnessMax) / 2) <= 1.5) s += 1;
	}
	if (key.luster) {
		const l = key.luster.toLowerCase();
		if (m.luster.some((x) => x.toLowerCase().includes(l))) s += 2;
	}
	if (key.streak) {
		const st = key.streak.toLowerCase();
		if (m.streak.toLowerCase().includes(st) || st.includes(m.streak.toLowerCase().split(" ")[0] || "___")) s += 2;
	}
	if (key.system) {
		if (m.crystalSystem.toLowerCase().includes(key.system.toLowerCase())) s += 2;
	}
	return s;
}
function matchFieldKey(key) {
	const ranked = MINERALS.map((m) => ({
		m,
		score: scoreMineral(m, key)
	})).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
	if (!ranked.length) return [];
	const top = ranked[0].score;
	return ranked.map(({ m, score }) => mineralToResult(m, Math.max(.28, Math.min(.92, score / Math.max(top, 1) * .78)), "field-key"));
}
function mineralToResult(m, confidence, source) {
	return {
		name: m.name,
		mineralId: m.id,
		family: m.family,
		formula: m.formula,
		confidence,
		rarity: m.rarity,
		hardness: m.hardnessMin != null ? `${m.hardnessMin}${m.hardnessMax !== m.hardnessMin ? `–${m.hardnessMax}` : ""}` : void 0,
		luster: m.luster[0],
		crystalSystem: m.crystalSystem,
		streak: m.streak,
		color: m.colors.slice(0, 3).join(", "),
		fieldNotes: m.blurb,
		keyFeatures: m.keyFeatures.slice(0, 4),
		alternatives: m.similar.slice(0, 3).map((s, i) => ({
			name: s.name,
			confidence: Math.max(.15, confidence - .18 - i * .08)
		})),
		notGeological: false,
		source
	};
}
//#endregion
export { mineralToResult as i, matchFieldKey as n, mergeCatalog as r, asRarity as t };
