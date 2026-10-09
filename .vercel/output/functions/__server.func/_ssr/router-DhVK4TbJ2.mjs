import { i as __toESM } from "../_runtime.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { g as require_jsx_runtime, v as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { u as router_exports } from "./router-DhVK4TbJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-pIJJTy8H.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
function formatUsd(n) {
	if (n >= 1e3) return `$${(n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1)}k`;
	return `$${Math.round(n)}`;
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
//#region node_modules/.nitro/vite/services/ssr/assets/crystal-gem-DIif6PZF.js
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
//#region node_modules/.nitro/vite/services/ssr/assets/ui-BRYJT9tv.js
var RARITY_CLASS = {
	common: "text-rarity-common border-rarity-common/30 bg-rarity-common/10",
	uncommon: "text-rarity-uncommon border-rarity-uncommon/30 bg-rarity-uncommon/10",
	rare: "text-rarity-rare border-rarity-rare/30 bg-rarity-rare/10",
	epic: "text-rarity-epic border-rarity-epic/30 bg-rarity-epic/10",
	legendary: "text-rarity-legendary border-rarity-legendary/30 bg-rarity-legendary/10"
};
function RarityChip({ rarity, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]", RARITY_CLASS[rarity], className),
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
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium tracking-wide transition-colors duration-150 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void", variant === "primary" && "bg-fg text-void hover:bg-fg/90", variant === "gold" && "bg-gold text-void hover:bg-gold/90", variant === "ghost" && "bg-fg/5 text-fg hover:bg-fg/10", variant === "line" && "border border-line-strong bg-transparent text-fg hover:bg-fg/5", className),
		...props,
		children
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-medium uppercase tracking-[0.16em] text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-lg tabular-nums text-fg",
			children: value
		})]
	});
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-faint",
		children
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/feed-8k7svmTo.js
var COMMUNITY_SEED = [
	{
		id: "p1",
		author: "Mara V.",
		mineral: "Lake Superior Agate",
		mineralId: "agate",
		location: "North Shore, MN",
		caption: "Pulled this after a nor'easter. Tight fortification banding, still wet from the beach.",
		likes: 48,
		liked: false,
		hue: "#c47a4a",
		at: Date.now() - 24e5
	},
	{
		id: "p2",
		author: "Cole R.",
		mineral: "Herkimer Quartz",
		mineralId: "quartz",
		location: "Middleville, NY",
		caption: "Double terminated, water-clear. Took three hours in the same vug.",
		likes: 112,
		liked: false,
		hue: "#c9d4e8",
		at: Date.now() - 108e5
	},
	{
		id: "p3",
		author: "Juniper",
		mineral: "Blanchard Fluorite",
		mineralId: "fluorite",
		location: "Bingham, NM",
		caption: "Blue-green cubes on galena. The dump still gives if you sit with it.",
		likes: 76,
		liked: false,
		hue: "#7ae7a0",
		at: Date.now() - 252e5
	},
	{
		id: "p4",
		author: "Theo K.",
		mineral: "Star Garnet",
		mineralId: "garnet-almandine",
		location: "Emerald Creek, ID",
		caption: "Four-ray star in the creek. Cold water, warm find.",
		likes: 91,
		liked: false,
		hue: "#9b1c2c",
		at: Date.now() - 504e5
	},
	{
		id: "p5",
		author: "Sable",
		mineral: "Amethyst",
		mineralId: "amethyst",
		location: "Thunder Bay analog — cabinet",
		caption: "Deep royal zoning. Not a field find — a trade. Still logging it.",
		likes: 33,
		liked: false,
		hue: "#8D7CFF",
		at: Date.now() - 792e5
	},
	{
		id: "p6",
		author: "Hank P.",
		mineral: "Native Copper",
		location: "Keweenaw, MI",
		caption: "Half-pound float from a stamp-sand beach. Green skin, copper heart.",
		likes: 64,
		liked: false,
		hue: "#c46a3a",
		at: Date.now() - 108e6
	}
];
var MARKET_SEED = [
	{
		id: "m1",
		title: "Cabinet amethyst cluster, 11 cm",
		seller: "North Shore Minerals",
		mineral: "Amethyst",
		mineralId: "amethyst",
		rarity: "uncommon",
		price: 145,
		locale: "Duluth, MN",
		hue: "#8D7CFF",
		note: "Self-collected Thunder Bay material. No repairs."
	},
	{
		id: "m2",
		title: "Herkimer pair, matrix",
		seller: "Mohawk Claims",
		mineral: "Quartz",
		mineralId: "quartz",
		rarity: "uncommon",
		price: 88,
		locale: "Herkimer, NY",
		hue: "#c9d4e8",
		note: "Two double-terminated points on dolomite."
	},
	{
		id: "m3",
		title: "Blanchard fluorite cube",
		seller: "Desert Latch",
		mineral: "Fluorite",
		mineralId: "fluorite",
		rarity: "uncommon",
		price: 62,
		locale: "Bingham, NM",
		hue: "#7ae7a0",
		note: "12 mm edge. Classic blue-green, galena specks."
	},
	{
		id: "m4",
		title: "Lake Superior agate, 4.2 oz",
		seller: "Agate Weather",
		mineral: "Agate",
		mineralId: "agate",
		rarity: "uncommon",
		price: 55,
		locale: "Two Harbors, MN",
		hue: "#c47a4a",
		note: "Candy striping, uncut. Beach find 2025."
	},
	{
		id: "m5",
		title: "Pyrite cube on matrix",
		seller: "Navajún Import",
		mineral: "Pyrite",
		mineralId: "pyrite",
		rarity: "common",
		price: 34,
		locale: "Madrid / cabinet",
		hue: "#d4af37",
		note: "Geometric Spanish pyrite. Display quality."
	},
	{
		id: "m6",
		title: "Malachite botryoidal slab",
		seller: "Copper Belt",
		mineral: "Malachite",
		mineralId: "malachite",
		rarity: "uncommon",
		price: 120,
		locale: "Bisbee analog",
		hue: "#1f8a5a",
		note: "Polished face, raw back. 9 cm."
	},
	{
		id: "m7",
		title: "Sherry topaz crystal",
		seller: "Thomas Range",
		mineral: "Topaz",
		mineralId: "topaz",
		rarity: "rare",
		price: 210,
		locale: "Juab County, UT",
		hue: "#f0c878",
		note: "Terminated, 2.4 cm. Color-stable."
	},
	{
		id: "m8",
		title: "Tourmaline pencil, bicolor",
		seller: "Pala Bench",
		mineral: "Tourmaline",
		mineralId: "tourmaline",
		rarity: "rare",
		price: 390,
		locale: "Pala, CA",
		hue: "#2a2438",
		note: "Green to pink. Slight termination ding."
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/store-D9E74ruj.js
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
	posts: COMMUNITY_SEED,
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
		const specimen = {
			...input,
			id: uid("sp"),
			createdAt: Date.now(),
			xpLane: lane,
			xpAwarded: amount
		};
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
	toggleLike: (postId) => set({ posts: get().posts.map((p) => p.id === postId ? {
		...p,
		liked: !p.liked,
		likes: p.likes + (p.liked ? -1 : 1)
	} : p) }),
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
	resetLocal: () => set({
		...INITIAL,
		posts: COMMUNITY_SEED,
		clover: [{
			...CLOVER_HELLO,
			at: Date.now()
		}],
		quests: freshQuests()
	})
}), { name: "rhgo-field-v2" }));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/locations-D74AG4wx.js
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
			"Quartz",
			"Pyrite",
			"Amethyst"
		],
		notes: "The only public diamond mine on Earth. Keep what you find. Plowed field over a lamproite pipe.",
		legality: "State park. Digging allowed in the search area. Keep any diamonds you find.",
		season: "Year-round. After rain is best."
	},
	{
		id: "hot-springs-quartz",
		name: "Ouachita Quartz Veins",
		state: "Arkansas",
		region: "South",
		lat: 34.51,
		lng: -93.05,
		category: "fee_dig",
		access: "fee",
		difficulty: "easy",
		finds: ["Quartz", "Smoky Quartz"],
		notes: "Clear quartz points from hydrothermal veins. Several commercial digs around Hot Springs and Mount Ida.",
		legality: "Pay-to-dig private mines. Stay on posted claims.",
		season: "Year-round."
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
		legality: "Private pay-to-dig. Do not collect off-claim.",
		season: "April–November."
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
		notes: "Fluorescent mineral capital of the world. Night collecting on the Buckwheat dump is the ritual.",
		legality: "Museum dump collecting during posted hours. UV lamps encouraged.",
		season: "April–October."
	},
	{
		id: "lake-superior",
		name: "Lake Superior Agate Shore",
		state: "Minnesota",
		region: "Midwest",
		lat: 47.05,
		lng: -91.67,
		category: "beach",
		access: "public",
		difficulty: "easy",
		finds: [
			"Agate",
			"Jasper",
			"Quartz"
		],
		notes: "Walk the North Shore after storms. Look for translucence, banding, and a waxy chalcedony luster.",
		legality: "Public beaches. Personal amounts only. No digging in parks.",
		season: "Spring through fall. After big storms."
	},
	{
		id: "keweenaw",
		name: "Keweenaw Copper Country",
		state: "Michigan",
		region: "Midwest",
		lat: 47.24,
		lng: -88.45,
		category: "historic_mine",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Agate",
			"Calcite",
			"Epidote"
		],
		notes: "Historic copper mine dumps and Lake Superior cobbles. Datolite and native copper are the prizes.",
		legality: "Public dumps and beaches. Respect private mine property.",
		season: "May–October."
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
		notes: "America's only emerald mine open to the public. Flume and creek collecting.",
		legality: "Fee dig. Keep what you find.",
		season: "Year-round, weather depending."
	},
	{
		id: "graves-mountain",
		name: "Graves Mountain",
		state: "Georgia",
		region: "South",
		lat: 33.73,
		lng: -82.73,
		category: "quarry",
		access: "fee",
		difficulty: "moderate",
		finds: [
			"Rutile",
			"Kyanite",
			"Pyrite"
		],
		notes: "World-class rutile and lazulite. Open-dig days are scheduled — watch the club calendar.",
		legality: "Managed open-dig events. No trespassing off-event.",
		season: "Scheduled weekends."
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
			"Garnet (Almandine)",
			"Quartz",
			"Muscovite (Mica)"
		],
		notes: "Amazonite, spessartine, and mica books from a classic pegmatite.",
		legality: "Fee dig on private mine property.",
		season: "Spring–fall."
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
		legality: "National forest. Claims exist — do not collect on marked claims.",
		season: "July–September."
	},
	{
		id: "topaz-mountain",
		name: "Topaz Mountain",
		state: "Utah",
		region: "Mountain",
		lat: 39.7,
		lng: -113.1,
		category: "desert",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Topaz",
			"Beryl (Emerald/Aquamarine)",
			"Quartz"
		],
		notes: "Sherry topaz in rhyolite cavities. Bring water, a hat, and a crack hammer.",
		legality: "BLM land. Personal collecting. Claims nearby — stay off them.",
		season: "Spring and fall. Summer is brutal."
	},
	{
		id: "blanchard",
		name: "Blanchard Claims",
		state: "New Mexico",
		region: "Southwest",
		lat: 33.77,
		lng: -106.12,
		category: "fee_dig",
		access: "fee",
		difficulty: "moderate",
		finds: [
			"Fluorite",
			"Galena",
			"Barite"
		],
		notes: "Classic blue-green Blanchard fluorite cubes with galena. Desert hiking.",
		legality: "Collect through the Blanchard Rock Shop. Do not enter unescorted claims.",
		season: "October–April."
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
		notes: "Winter collecting capital of the West. BLM land around town is the classroom.",
		legality: "BLM personal collecting. Watch for claims and desert tortoise habitat.",
		season: "November–March."
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
		legality: "Private mines. Tour or permit only. No roadside collecting.",
		season: "Year-round tours."
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
		legality: "Los Padres National Forest. Personal amounts. Watch tides and poison oak.",
		season: "Year-round. Minus tides are best."
	},
	{
		id: "mojave",
		name: "Mojave Chalcedony Fields",
		state: "California",
		region: "West",
		lat: 35,
		lng: -116.2,
		category: "desert",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Agate",
			"Jasper",
			"Quartz"
		],
		notes: "Wide BLM collecting for banded agate and desert pavement chalcedony. Heat is the real hazard.",
		legality: "BLM. Personal collecting. Stay off wilderness and claims.",
		season: "November–April."
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
		legality: "Fee dig. Keep what you find.",
		season: "March–October."
	},
	{
		id: "maury",
		name: "Maury Mountain",
		state: "Oregon",
		region: "West",
		lat: 44.03,
		lng: -120.45,
		category: "fee_dig",
		access: "fee",
		difficulty: "easy",
		finds: ["Jasper", "Agate"],
		notes: "Moss and picture jasper from classic Central Oregon beds.",
		legality: "Fee or club trips. Confirm current land status before digging.",
		season: "Late spring–fall."
	},
	{
		id: "emerald-creek",
		name: "Emerald Creek Garnet Area",
		state: "Idaho",
		region: "West",
		lat: 47.02,
		lng: -116.32,
		category: "forest",
		access: "public",
		difficulty: "moderate",
		finds: ["Garnet (Almandine)"],
		notes: "USFS star-garnet collecting in a cold creek. Waders help.",
		legality: "National forest designated collecting area. Follow USFS rules.",
		season: "July–September."
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
		legality: "Mix of BLM and claims. Personal collecting off-claim only.",
		season: "May–October."
	},
	{
		id: "mason-topaz",
		name: "Mason County Topaz",
		state: "Texas",
		region: "South",
		lat: 30.75,
		lng: -99.23,
		category: "fee_dig",
		access: "fee",
		difficulty: "moderate",
		finds: ["Topaz", "Quartz"],
		notes: "Blue topaz in streambeds on private ranches. A Texas classic.",
		legality: "Ranch fee digs only. No public land collecting here.",
		season: "October–May."
	},
	{
		id: "hickory-creek",
		name: "Hickory Creek Gravel Bar",
		state: "Illinois",
		region: "Midwest",
		lat: 41.7938,
		lng: -87.8162,
		category: "gravel_bar",
		access: "public",
		difficulty: "easy",
		finds: [
			"Quartz",
			"Orthoclase (Potassium Feldspar)",
			"Muscovite (Mica)"
		],
		notes: "Seasonal bar along Hickory Creek. Best after spring flooding.",
		legality: "Public access along the waterway. Respect private banks.",
		season: "After spring floods."
	},
	{
		id: "salt-creek",
		name: "Salt Creek Public Beach",
		state: "Illinois",
		region: "Midwest",
		lat: 41.8456,
		lng: -87.9234,
		category: "beach",
		access: "public",
		difficulty: "easy",
		finds: ["Quartz", "Calcite"],
		notes: "Rocky shore with better finds after rain. Beginner-friendly.",
		legality: "Public park. Collection as posted.",
		season: "Spring–fall."
	},
	{
		id: "dunes",
		name: "Indiana Dunes Shore",
		state: "Indiana",
		region: "Midwest",
		lat: 41.65,
		lng: -87.07,
		category: "beach",
		access: "public",
		difficulty: "easy",
		finds: ["Quartz", "Agate"],
		notes: "Lake Michigan sand and occasional banded pebbles. Walk, don't dig dunes.",
		legality: "State and national park rules. No collecting in protected dune habitat.",
		season: "Year-round beaches."
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
export { cn as _, siteHazards as a, todayKey as b, useField as c, Button as d, Panel as f, CrystalGem as g, Stat as h, projectSite as i, xpToNext as l, SectionLabel as m, SITES as n, XP_REWARDS as o, RarityChip as p, SITE_BY_ID as r, rankFromLevel as s, router_exports as t, MARKET_SEED as u, formatRelative as v, uid as x, formatUsd as y };
