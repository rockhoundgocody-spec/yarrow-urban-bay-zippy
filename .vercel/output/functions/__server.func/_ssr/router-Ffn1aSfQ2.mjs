import { i as __toESM } from "../_runtime.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { _ as require_react, h as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as router_exports } from "./router-Ffn1aSfQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BT_pei-n.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
function formatRelative(ts) {
	const delta = Date.now() - ts;
	const m = Math.floor(delta / 6e4);
	if (m < 1) return "just now";
	if (m < 60) return `${m}m ago`;
	const h = Math.floor(m / 60);
	if (h < 24) return `${h}h ago`;
	const d = Math.floor(h / 24);
	if (d < 14) return `${d}d ago`;
	return new Date(ts).toLocaleDateString();
}
function todayKey(d = /* @__PURE__ */ new Date()) {
	return d.toISOString().slice(0, 10);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/crystal-gem-19REvr3C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CrystalGem({ hue, system = "trigonal", className, size = 64 }) {
	const id = `${(0, import_react.useId)().replace(/:/g, "")}-${hue.replace("#", "")}`;
	const s = system.toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		width: size,
		height: size,
		className: cn("shrink-0", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `g-${id}`,
				x1: "18%",
				y1: "0%",
				x2: "88%",
				y2: "100%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#fff",
						stopOpacity: "0.55"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "38%",
						stopColor: hue,
						stopOpacity: "0.95"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: hue,
						stopOpacity: "0.45"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "40",
				cy: "68",
				rx: "18",
				ry: "5",
				fill: hue,
				opacity: "0.22"
			}),
			s.includes("cubic") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "22,28 40,18 62,30 44,40",
					fill: `url(#g-${id})`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "22,28 44,40 44,60 22,48",
					fill: hue,
					opacity: "0.7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "44,40 62,30 62,50 44,60",
					fill: hue,
					opacity: "0.45"
				})
			] }) : s.includes("hex") || s.includes("trig") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "40,10 56,20 56,42 40,32 24,42 24,20",
					fill: `url(#g-${id})`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "24,42 40,32 56,42 40,70",
					fill: hue,
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "40,32 56,20 56,42",
					fill: "#fff",
					opacity: "0.18"
				})
			] }) : s.includes("ortho") || s.includes("tetra") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "28,12 52,18 58,58 24,64",
				fill: `url(#g-${id})`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "28,12 40,8 52,18 40,24",
				fill: "#fff",
				opacity: "0.22"
			})] }) : s.includes("amorphous") || s.includes("none") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 36c2-14 18-22 30-16 10 4 16 18 12 28-4 12-18 20-30 16-10-4-14-16-12-28z",
				fill: `url(#g-${id})`
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "18,34 40,8 64,30 50,70 26,64",
				fill: `url(#g-${id})`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "40,8 64,30 40,38",
				fill: "#fff",
				opacity: "0.2"
			})] })
		]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/ui-DkRTeORz.js
var RARITY_CLASS = {
	common: "text-rarity-common border-rarity-common/30 bg-rarity-common/10",
	uncommon: "text-rarity-uncommon border-rarity-uncommon/30 bg-rarity-uncommon/10",
	rare: "text-rarity-rare border-rarity-rare/30 bg-rarity-rare/10",
	epic: "text-rarity-epic border-rarity-epic/30 bg-rarity-epic/10",
	legendary: "text-rarity-legendary border-rarity-legendary/30 bg-rarity-legendary/10"
};
function RarityChip({ rarity, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[12px] font-medium uppercase tracking-[0.14em]", RARITY_CLASS[rarity], className),
		children: rarity
	});
}
function Panel({ children, className, hairline }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rh-panel rounded-xl", hairline && "rh-hairline", className),
		children
	});
}
function Button({ children, className, variant = "primary", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium tracking-wide transition-colors duration-150 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void", variant === "primary" && "bg-fg text-void hover:bg-fg/90", variant === "gold" && "bg-gold text-void hover:bg-gold/90", variant === "ghost" && "bg-fg/5 text-fg hover:bg-fg/10", variant === "line" && "border border-line-strong bg-transparent text-fg hover:bg-fg/5", className),
		...props,
		children
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[12px] font-medium uppercase tracking-[0.16em] text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-lg tabular-nums text-fg",
			children: value
		})]
	});
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-faint",
		children
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/store-B_ox8Xpi.js
/**
* Specimen photos live in IndexedDB, not localStorage: localStorage caps
* around 5 MB per site, which a few dozen photos would exhaust. IndexedDB
* typically allows hundreds of MB and stores large strings efficiently.
*/
var DB_NAME = "rhgo-photos";
var STORE = "photos";
function hasIdb() {
	return typeof indexedDB !== "undefined";
}
var dbPromise = null;
function openDb() {
	if (!hasIdb()) return Promise.reject(/* @__PURE__ */ new Error("IndexedDB unavailable"));
	if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => {
			dbPromise = null;
			reject(req.error ?? /* @__PURE__ */ new Error("Could not open photo storage"));
		};
	});
	return dbPromise;
}
function run(mode, fn) {
	return openDb().then((db) => new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, mode);
		const req = fn(tx.objectStore(STORE));
		tx.oncomplete = () => resolve(req.result);
		tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("Photo storage failed"));
		tx.onabort = () => reject(tx.error ?? /* @__PURE__ */ new Error("Photo storage aborted"));
	}));
}
function putPhoto(id, dataUrl) {
	return run("readwrite", (s) => s.put(dataUrl, id)).then(() => void 0);
}
function getPhoto(id) {
	return run("readonly", (s) => s.get(id));
}
function deletePhoto(id) {
	return run("readwrite", (s) => s.delete(id)).then(() => void 0);
}
function clearPhotos() {
	return run("readwrite", (s) => s.clear()).then(() => void 0);
}
async function getPhotos(ids) {
	const out = {};
	for (const id of ids) {
		const v = await getPhoto(id).catch(() => void 0);
		if (v) out[id] = v;
	}
	return out;
}
var XP_REWARDS = {
	scan: 50,
	saveVault: 25,
	stewardLog: 40,
	restrictedObserve: 20,
	firstOfSpecies: 80,
	visitSite: 15,
	saveSite: 20,
	cloverAsk: 15,
	quest: 40,
	dailyLogin: 10,
	pediaRead: 15
};
function levelFromXp(xp) {
	return Math.floor(Math.sqrt(Math.max(0, xp) / 40)) + 1;
}
function xpToNext(xp) {
	const level = levelFromXp(xp);
	const at = 40 * (level - 1) ** 2;
	const next = 40 * level ** 2;
	const into = xp - at;
	const need = next - at;
	return {
		level,
		into,
		need,
		pct: need === 0 ? 1 : Math.min(1, into / need)
	};
}
var RANKS = [
	{
		min: 1,
		name: "Scout"
	},
	{
		min: 3,
		name: "Field Hand"
	},
	{
		min: 5,
		name: "Collector"
	},
	{
		min: 8,
		name: "Prospector"
	},
	{
		min: 12,
		name: "Mineralogist"
	},
	{
		min: 18,
		name: "Master"
	}
];
function rankFromLevel(level) {
	let name = RANKS[0].name;
	for (const r of RANKS) if (level >= r.min) name = r.name;
	return name;
}
var QUEST_DEFS = [
	{
		id: "scan",
		title: "Scan a specimen",
		detail: "Run one identification — photo or field key.",
		xp: XP_REWARDS.quest
	},
	{
		id: "vault",
		title: "Log a find",
		detail: "Save a specimen into GeoDex — collected or in place.",
		xp: XP_REWARDS.quest
	},
	{
		id: "map",
		title: "Study a locality",
		detail: "Open a field site on the map.",
		xp: XP_REWARDS.quest
	},
	{
		id: "pedia",
		title: "Read a species",
		detail: "Open any Mineralpedia entry.",
		xp: 25
	},
	{
		id: "clover",
		title: "Ask Clover",
		detail: "One field question to the AI guide.",
		xp: XP_REWARDS.quest
	}
];
function freshQuests() {
	return QUEST_DEFS.map((q) => ({
		...q,
		done: false
	}));
}
var CLOVER_HELLO = {
	id: "c0",
	role: "assistant",
	text: "I'm Clover. Just talk — I'm already listening.",
	at: Date.now()
};
function evalBadges(get, award) {
	const s = get();
	if (s.specimens.length >= 1) award("first-scan");
	if (s.specimens.length >= 5) award("vault-5");
	if (new Set(s.specimens.map((x) => x.mineralId || x.name.toLowerCase())).size >= 10) award("species-10");
	if (s.streak >= 3) award("streak-3");
	if (s.streak >= 7) award("streak-7");
	if (s.specimens.some((x) => x.rarity === "legendary")) award("legendary-find");
	if (s.savedSiteIds.length >= 3) award("map-3");
	if (s.clover.some((m) => m.role === "user")) award("clover");
	if (s.quests.every((q) => q.done) && s.quests.length > 0) award("quest-day");
	if (s.trips.length >= 1) award("first-trip");
	if (s.specimens.filter((x) => x.disposition === "affixed_logged").length >= 3) award("steward-3");
}
function laneForDisposition(d) {
	if (d === "affixed_logged") return {
		lane: "steward",
		amount: XP_REWARDS.stewardLog
	};
	if (d === "restricted_observed") return {
		lane: "explorer",
		amount: XP_REWARDS.restrictedObserve
	};
	return {
		lane: "collector",
		amount: XP_REWARDS.saveVault
	};
}
var warnedFull = false;
/** localStorage wrapper that never throws and tells the user when a save fails. */
var safeStorage = {
	getItem: (name) => {
		try {
			return localStorage.getItem(name);
		} catch {
			return null;
		}
	},
	setItem: (name, value) => {
		try {
			localStorage.setItem(name, value);
			warnedFull = false;
		} catch {
			if (!warnedFull) {
				warnedFull = true;
				toast.error("Couldn't save to this device — storage is full or blocked. Export your GeoDex from Progress.", { duration: 1e4 });
			}
		}
	},
	removeItem: (name) => {
		try {
			localStorage.removeItem(name);
		} catch {}
	}
};
var INITIAL = {
	onboarded: false,
	displayName: "Field hand",
	xp: 0,
	collectorXp: 0,
	stewardXp: 0,
	scientistXp: 0,
	explorerXp: 0,
	streak: 0,
	lastActiveDay: null,
	specimens: [],
	savedSiteIds: [],
	visitedSiteIds: [],
	trips: [],
	badges: [],
	quests: freshQuests(),
	questDay: null,
	readSpeciesIds: [],
	clover: [CLOVER_HELLO],
	lastScanId: null,
	fieldMode: false,
	openerSeen: false
};
var useField = create()(persist((set, get) => ({
	...INITIAL,
	hydrateDay: () => {
		const today = todayKey();
		const s = get();
		let streak = s.streak;
		let last = s.lastActiveDay;
		let xp = s.xp;
		let explorerXp = s.explorerXp ?? 0;
		if (last !== today) {
			const y = /* @__PURE__ */ new Date();
			y.setDate(y.getDate() - 1);
			const yesterday = todayKey(y);
			if (last === yesterday) streak = (streak || 0) + 1;
			else streak = 1;
			last = today;
			xp += XP_REWARDS.dailyLogin;
			explorerXp += XP_REWARDS.dailyLogin;
		}
		const quests = s.questDay === today ? s.quests : freshQuests();
		set({
			streak,
			lastActiveDay: last,
			xp,
			explorerXp,
			quests,
			questDay: today
		});
	},
	completeOnboarding: (name) => set({
		onboarded: true,
		displayName: name.trim() || "Field hand"
	}),
	addXp: (amount) => set({ xp: get().xp + amount }),
	addXpLane: (lane, amount) => {
		const s = get();
		const patch = lane === "collector" ? { collectorXp: s.collectorXp + amount } : lane === "steward" ? { stewardXp: s.stewardXp + amount } : lane === "scientist" ? { scientistXp: s.scientistXp + amount } : { explorerXp: s.explorerXp + amount };
		set({
			xp: s.xp + amount,
			...patch
		});
	},
	addSpecimen: (input) => {
		const { lane, amount } = laneForDisposition(input.disposition);
		const { photoDataUrl, ...rest } = input;
		const specimen = {
			...rest,
			id: uid("sp"),
			createdAt: Date.now(),
			xpLane: lane,
			xpAwarded: amount,
			hasPhoto: Boolean(photoDataUrl)
		};
		if (photoDataUrl) putPhoto(specimen.id, photoDataUrl).catch(() => {
			get().updateSpecimen(specimen.id, { hasPhoto: false });
			toast.error("The photo couldn't be saved on this device. The find itself was saved.");
		});
		const firstOf = input.mineralId && !get().specimens.some((s) => s.mineralId === input.mineralId);
		set({
			specimens: [specimen, ...get().specimens],
			lastScanId: specimen.id
		});
		get().addXpLane(lane, amount);
		if (firstOf) get().addXpLane("scientist", XP_REWARDS.firstOfSpecies);
		get().completeQuest("vault");
		evalBadges(get, (id) => get().awardBadge(id));
		return specimen;
	},
	updateSpecimen: (id, patch) => set({ specimens: get().specimens.map((s) => s.id === id ? {
		...s,
		...patch
	} : s) }),
	removeSpecimen: (id) => set({ specimens: get().specimens.filter((s) => s.id !== id) }),
	restoreSpecimen: (sp) => {
		if (get().specimens.some((s) => s.id === sp.id)) return;
		set({ specimens: [sp, ...get().specimens].sort((a, b) => b.createdAt - a.createdAt) });
	},
	markSpeciesRead: (mineralId) => {
		if (get().readSpeciesIds.includes(mineralId)) return false;
		set({ readSpeciesIds: [...get().readSpeciesIds, mineralId] });
		return true;
	},
	replaceAll: (data) => set({
		...INITIAL,
		...data,
		onboarded: true,
		openerSeen: true,
		quests: freshQuests()
	}),
	toggleSaveSite: (id) => {
		const has = get().savedSiteIds.includes(id);
		set({ savedSiteIds: has ? get().savedSiteIds.filter((x) => x !== id) : [...get().savedSiteIds, id] });
		if (!has) get().addXpLane("explorer", XP_REWARDS.saveSite);
		evalBadges(get, (b) => get().awardBadge(b));
	},
	visitSite: (id) => {
		if (!get().visitedSiteIds.includes(id)) {
			set({ visitedSiteIds: [...get().visitedSiteIds, id] });
			get().addXpLane("explorer", XP_REWARDS.visitSite);
		}
		get().completeQuest("map");
	},
	completeQuest: (id) => {
		const today = todayKey();
		set({
			quests: (get().questDay === today ? get().quests : freshQuests()).map((q) => {
				if (q.id !== id || q.done) return q;
				get().addXp(q.xp);
				return {
					...q,
					done: true
				};
			}),
			questDay: today
		});
		evalBadges(get, (b) => get().awardBadge(b));
	},
	addTrip: (t) => {
		set({ trips: [{
			...t,
			id: uid("tr"),
			createdAt: Date.now()
		}, ...get().trips] });
		get().awardBadge("first-trip");
	},
	toggleGear: (tripId, gearId) => set({ trips: get().trips.map((t) => t.id !== tripId ? t : {
		...t,
		gear: t.gear.map((g) => g.id === gearId ? {
			...g,
			packed: !g.packed
		} : g)
	}) }),
	pushClover: (m) => {
		set({ clover: [...get().clover, {
			...m,
			id: uid("cl"),
			at: Date.now()
		}] });
		if (m.role === "user") {
			get().completeQuest("clover");
			get().addXpLane("scientist", XP_REWARDS.cloverAsk);
		}
		evalBadges(get, (b) => get().awardBadge(b));
	},
	awardBadge: (id) => {
		if (get().badges.some((b) => b.id === id)) return;
		set({ badges: [...get().badges, {
			id,
			earnedAt: Date.now()
		}] });
	},
	setFieldMode: (on) => set({ fieldMode: on }),
	markOpenerSeen: () => set({ openerSeen: true }),
	resetLocal: () => {
		for (const sp of get().specimens) if (sp.hasPhoto) deletePhoto(sp.id).catch(() => void 0);
		set({
			...INITIAL,
			clover: [{
				...CLOVER_HELLO,
				at: Date.now()
			}],
			quests: freshQuests()
		});
	}
}), {
	name: "rhgo-field-v2",
	version: 3,
	storage: createJSONStorage(() => safeStorage),
	migrate: (persisted, version) => {
		const st = persisted ?? {};
		if (version < 3) {
			delete st.posts;
			st.specimens = (Array.isArray(st.specimens) ? st.specimens : []).map((sp) => {
				const { valueLow: _l, valueHigh: _h, ...rest } = sp;
				return rest;
			});
			if (!Array.isArray(st.readSpeciesIds)) st.readSpeciesIds = [];
		}
		return st;
	}
}));
/**
* Moves photos saved by older versions (inline base64 in localStorage) into
* IndexedDB, then drops them from the persisted state to free space.
*/
async function migrateLegacyPhotos() {
	const legacy = useField.getState().specimens.filter((s) => s.photoDataUrl);
	for (const sp of legacy) try {
		await putPhoto(sp.id, sp.photoDataUrl);
		useField.getState().updateSpecimen(sp.id, {
			photoDataUrl: void 0,
			hasPhoto: true
		});
	} catch {
		return;
	}
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/locations-CZiBO9s4.js
var SITES = [
	{
		id: "crater-diamonds",
		name: "Crater of Diamonds State Park",
		state: "Arkansas",
		region: "South",
		lat: 34.032,
		lng: -93.672,
		category: "state_park",
		access: "public",
		difficulty: "easy",
		finds: [
			"Diamond",
			"Amethyst",
			"Garnet (Almandine)",
			"Jasper",
			"Agate",
			"Quartz"
		],
		notes: "Search a plowed field over an eroded volcanic pipe. Park staff identify finds free of charge.",
		legality: "State park search area, open daily 8 a.m.–4 p.m. with paid admission. Any rock or mineral you find is yours to keep. No ladders or battery- or motor-powered tools.",
		season: "Year-round, daily 8 a.m.–4 p.m.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.arkansas.com/state-parks/explore/parks/crater-of-diamonds-state-park"
	},
	{
		id: "herkimer",
		name: "Herkimer Diamond Mines",
		state: "New York",
		region: "Northeast",
		lat: 43.026,
		lng: -74.986,
		category: "fee_dig",
		access: "fee",
		difficulty: "moderate",
		finds: [
			"Quartz",
			"Calcite",
			"Dolomite"
		],
		notes: "Double-terminated quartz in Cambrian dolomite vugs. Bring a crack hammer and safety glasses.",
		legality: "Private pay-to-dig operation open to the public; crack hammers can be rented on site. Collect only within the mine's digging area.",
		season: "Call ahead for season and hours.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.roadsideamerica.com/story/6164"
	},
	{
		id: "franklin-nj",
		name: "Franklin Mineral Dump",
		state: "New Jersey",
		region: "Northeast",
		lat: 41.122,
		lng: -74.581,
		category: "museum",
		access: "fee",
		difficulty: "easy",
		finds: [
			"Calcite",
			"Fluorite",
			"Garnet (Almandine)"
		],
		notes: "More than 90 fluorescent minerals are known from Franklin. Bring a UV lamp for the night digs.",
		legality: "Collecting is allowed on the Buckwheat Dump whenever the Franklin Mineral Museum is open, for an admission charge plus a per-pound fee. Night digs are scheduled separately.",
		season: "April–November, museum hours.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.njskylands.com/attractions-franklin-mineral-museum"
	},
	{
		id: "lake-superior",
		name: "Lake Superior Agate Shore",
		state: "Minnesota",
		region: "Midwest",
		lat: 47.05,
		lng: -91.67,
		category: "beach",
		access: "permission",
		difficulty: "easy",
		finds: [
			"Agate",
			"Jasper",
			"Quartz"
		],
		notes: "Walk the North Shore after storms. Look for translucence, banding, and a waxy chalcedony luster.",
		legality: "Rock collecting is not allowed in any Minnesota state park or state recreation area. Outside parks, confirm who owns the shore and get permission before collecting.",
		season: "Spring through fall. After big storms.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://dnr.state.mn.us/education/geology/digging/stateparks.html"
	},
	{
		id: "emerald-hollow",
		name: "Emerald Hollow Mine",
		state: "North Carolina",
		region: "South",
		lat: 35.8,
		lng: -81.14,
		category: "fee_dig",
		access: "fee",
		difficulty: "easy",
		finds: [
			"Beryl (Emerald/Aquamarine)",
			"Quartz",
			"Garnet (Almandine)"
		],
		notes: "Billed as the only emerald mine in the U.S. open to public prospecting. Sluice buckets or work the creek.",
		legality: "Fee mine open to the public: sluice mine-filled buckets, or prospect creek-side only in the areas where digging is permitted.",
		season: "Call ahead for hours.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.visitnc.com/emerald-hollow-mine"
	},
	{
		id: "graves-mountain",
		name: "Graves Mountain",
		state: "Georgia",
		region: "South",
		lat: 33.73,
		lng: -82.73,
		category: "quarry",
		access: "permission",
		difficulty: "moderate",
		finds: [
			"Rutile",
			"Kyanite",
			"Pyrite"
		],
		notes: "Known for rutile, mined there by Tiffany & Co. from the 1920s to the 1980s, plus 40-odd other mineral types.",
		legality: "Open to the public only during the announced spring and fall Rock Swap and Dig weekends (8 a.m.–6 p.m.; admission was free with donations in 2025). No access outside events.",
		season: "Spring and fall event weekends.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.wrdw.com/2025/03/07/graves-mountain-annual-spring-rock-swap-dig-returns"
	},
	{
		id: "amelia",
		name: "Morefield Mine",
		state: "Virginia",
		region: "South",
		lat: 37.34,
		lng: -77.97,
		category: "pegmatite",
		access: "fee",
		difficulty: "easy",
		finds: [
			"Topaz",
			"Garnet (Almandine)",
			"Amethyst"
		],
		notes: "Amazonite, topaz and garnet from the mine dumps of a classic pegmatite.",
		legality: "Fee digging on mine dumps and by sluice, open only on certain days in spring and fall. Call ahead to confirm dates.",
		season: "Certain days in spring and fall.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.virginia.org/listing/morefield-gem-mine/6171/amp/"
	},
	{
		id: "mt-antero",
		name: "Mount Antero",
		state: "Colorado",
		region: "Mountain",
		lat: 38.674,
		lng: -106.246,
		category: "alpine",
		access: "public",
		difficulty: "hard",
		finds: [
			"Beryl (Emerald/Aquamarine)",
			"Quartz",
			"Fluorite"
		],
		notes: "High-alpine aquamarine in granite. 4WD plus a lung-burning hike. Summer only.",
		legality: "National forest: collecting small quantities for personal use with hand tools needs no permit; mechanized equipment needs approval. Active mining claims on the mountain are off-limits to collectors.",
		season: "July–September.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.fs.usda.gov/r02/psicc/recreation/opportunities/other"
	},
	{
		id: "topaz-mountain",
		name: "Topaz Mountain",
		state: "Utah",
		region: "Mountain",
		lat: 39.6665,
		lng: -113.1146,
		category: "desert",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Topaz",
			"Beryl (Emerald/Aquamarine)",
			"Quartz"
		],
		notes: "Sherry topaz in rhyolite cavities. Bring water, a hat, and a crack hammer.",
		legality: "BLM Topaz Mountain Rockhound Recreation Area: collect reasonable amounts of topaz and crystals for personal, non-commercial use. Stay off active mining claims.",
		season: "Spring and fall. Summer is brutal.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.blm.gov/visit/topaz-mountain-rockhound-recreation-area"
	},
	{
		id: "quartzsite",
		name: "Quartzsite Desert Fields",
		state: "Arizona",
		region: "Southwest",
		lat: 33.66,
		lng: -114.23,
		category: "desert",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Quartz",
			"Agate",
			"Jasper"
		],
		notes: "Town surrounded by BLM public land with desert agate, jasper and quartz.",
		legality: "BLM public land: reasonable amounts for personal, non-commercial use are generally allowed. Not on active mining claims, developed recreation sites, or land with privately owned minerals.",
		season: "November–March.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.blm.gov/programs/recreation/rockhounding"
	},
	{
		id: "pala",
		name: "Pala Pegmatite District",
		state: "California",
		region: "West",
		lat: 33.365,
		lng: -117.076,
		category: "pegmatite",
		access: "permit",
		difficulty: "hard",
		finds: [
			"Tourmaline",
			"Beryl (Emerald/Aquamarine)",
			"Quartz"
		],
		notes: "World-class gem pegmatites. Most mines are private tours, not walk-up digs.",
		legality: "Private mines. As of September 2026, Oceanview Mine is reported to offer public fee digging and tours; other Pala mines are closed to the public. No roadside collecting.",
		season: "Contact Oceanview Mine for dig dates.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://hoodline.com/2026/09/how-pala-s-pink-tourmaline-once-dazzled-china-s-imperial-court/"
	},
	{
		id: "jade-cove",
		name: "Jade Cove",
		state: "California",
		region: "West",
		lat: 35.88,
		lng: -121.46,
		category: "beach",
		access: "public",
		difficulty: "moderate",
		finds: ["Serpentine", "Jasper"],
		notes: "Pacific nephrite in cobbles. Tide-aware collecting on a steep Big Sur shore.",
		legality: "Forest Service restrictions on removing rock above the mean high tide line are posted at the site, and offshore jade falls under the Monterey Bay National Marine Sanctuary. Read the posted rules before collecting anything.",
		season: "Year-round. Minus tides are best."
	},
	{
		id: "richardson",
		name: "Richardson's Rock Ranch",
		state: "Oregon",
		region: "West",
		lat: 44.63,
		lng: -120.92,
		category: "fee_dig",
		access: "fee",
		difficulty: "easy",
		finds: ["Agate", "Jasper"],
		notes: "The thunder-egg classroom. Dig, cut, and polish on site.",
		legality: "Fee dig for thundereggs, paid by the pound; open seven days in summer. Call ahead to confirm hours.",
		season: "Summer, daily (call to confirm).",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.bendsource.com/news/rockhounding-at-richardsons-rock-ranch-6395928/"
	},
	{
		id: "maury",
		name: "Maury Mountain",
		state: "Oregon",
		region: "West",
		lat: 44.03,
		lng: -120.45,
		category: "forest",
		access: "public",
		difficulty: "easy",
		finds: ["Agate"],
		notes: "Moss agate area on the Ochoco National Forest, Central Oregon.",
		legality: "Ochoco National Forest lists the Maury Mountains as a moss agate area. The forest does not publish collecting limits online; ask the supervisor's office for current rules.",
		season: "Late spring–fall.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://fs.usda.gov/r06/ochoco/natural-resources/rocks-minerals"
	},
	{
		id: "emerald-creek",
		name: "Emerald Creek Garnet Area",
		state: "Idaho",
		region: "West",
		lat: 47.02,
		lng: -116.32,
		category: "forest",
		access: "permit",
		difficulty: "moderate",
		finds: ["Garnet (Almandine)"],
		notes: "USFS star-garnet collecting in a cold creek. Waders help.",
		legality: "Reserved ticket and on-site mineral permit required. Open Thursday–Saturday from Memorial Day weekend to Labor Day weekend. Limit 2 lb of garnet per person per day and one permit per person per year.",
		season: "Thursday–Saturday, Memorial Day to Labor Day weekends.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://www.recreation.gov/ticket/facility/10086846?tab=info"
	},
	{
		id: "wyoming-jade",
		name: "Granite Mountains Jade",
		state: "Wyoming",
		region: "Mountain",
		lat: 42.5,
		lng: -107.5,
		category: "desert",
		access: "public",
		difficulty: "hard",
		finds: ["Serpentine", "Quartz"],
		notes: "Historic nephrite jade fields. Remote, windy, and worth a long walk.",
		legality: "BLM Wyoming: reasonable amounts for personal use, collected by hand or with non-powered hand tools; no resale. Jade on an unpatented jade claim belongs to the claim holder.",
		season: "May–October.",
		legalityCheckedAt: "2026-10-09",
		legalitySource: "https://BLM.GOV/sites/default/files/documents/files/WYNF-0004_rockhounding%20%28051418%29.pdf"
	}
];
var SITE_BY_ID = Object.fromEntries(SITES.map((s) => [s.id, s]));
function projectSite(lat, lng) {
	const x = (lng + 124.8) / 58.5 * 100;
	const y = (49.2 - lat) / 25.2 * 100;
	return {
		x: Math.min(96, Math.max(4, x)),
		y: Math.min(92, Math.max(6, y))
	};
}
var HAZARDS = {
	state_park: ["Heat", "Sun"],
	fee_dig: ["Flying chips", "Uneven ground"],
	beach: ["Tide", "Cliff edges"],
	desert: [
		"Heat",
		"Water",
		"Rattlesnakes"
	],
	pegmatite: ["Loose rock", "Steep cuts"],
	quarry: ["Falling rock", "Blasting zones"],
	museum: ["None"],
	alpine: [
		"Altitude",
		"Weather",
		"Ice"
	],
	historic_mine: ["Unstable ground", "Shafts"],
	forest: ["Ticks", "Deadfall"],
	outcrop: ["Loose scree", "Exposure"],
	gravel_bar: ["Current", "Undercut banks"]
};
function siteHazards(category) {
	return HAZARDS[category] ?? ["Verify conditions"];
}
//#endregion
export { formatRelative as C, cn as S, uid as T, Panel as _, siteHazards as a, Stat as b, deletePhoto as c, migrateLegacyPhotos as d, putPhoto as f, Button as g, xpToNext as h, projectSite as i, getPhoto as l, useField as m, SITES as n, XP_REWARDS as o, rankFromLevel as p, SITE_BY_ID as r, clearPhotos as s, router_exports as t, getPhotos as u, RarityChip as v, todayKey as w, CrystalGem as x, SectionLabel as y };
