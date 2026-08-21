import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-DfAvtWOL.mjs";
import { f as Search, k as Camera } from "../_libs/lucide-react.mjs";
import { a as useField, d as SectionLabel, f as Stat, h as formatUsd, l as Panel, n as CrystalGem, u as RarityChip } from "./router-BX6Bgd6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault-Dkc2mAtv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		k: "all",
		l: "All"
	},
	{
		k: "common",
		l: "Common"
	},
	{
		k: "uncommon",
		l: "Uncommon"
	},
	{
		k: "rare",
		l: "Rare"
	},
	{
		k: "epic",
		l: "Epic"
	},
	{
		k: "legendary",
		l: "Legendary"
	}
];
var DISPO = [
	{
		k: "all",
		l: "Any path"
	},
	{
		k: "chattel_collected",
		l: "Collected"
	},
	{
		k: "affixed_logged",
		l: "In place"
	},
	{
		k: "restricted_observed",
		l: "Observed"
	}
];
function VaultPage() {
	const specimens = useField((s) => s.specimens);
	const [q, setQ] = (0, import_react.useState)("");
	const [rarity, setRarity] = (0, import_react.useState)("all");
	const [dispo, setDispo] = (0, import_react.useState)("all");
	const value = specimens.filter((s) => s.collected).reduce((a, s) => a + ((s.valueLow ?? 0) + (s.valueHigh ?? 0)) / 2, 0);
	const unique = new Set(specimens.map((s) => s.mineralId || s.name)).size;
	const inPlace = specimens.filter((s) => s.disposition === "affixed_logged").length;
	const list = (0, import_react.useMemo)(() => {
		return specimens.filter((s) => {
			if (rarity !== "all" && s.rarity !== rarity) return false;
			if (dispo !== "all" && s.disposition !== dispo) return false;
			if (q && !`${s.name} ${s.family}`.toLowerCase().includes(q.toLowerCase())) return false;
			return true;
		});
	}, [
		specimens,
		q,
		rarity,
		dispo
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-cyan",
					children: "Collection"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl text-fg",
					children: "GeoDex"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Collected, left in place, and observed — one archive."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "grid grid-cols-3 gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Entries",
						value: specimens.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Species",
						value: unique
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "In place",
						value: inPlace
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-faint",
				children: [
					"Collected value estimate ",
					formatUsd(value),
					" · in-place finds are not priced."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search GeoDex",
					className: "h-11 w-full rounded-md border border-line bg-obsidian pl-10 pr-3 text-sm text-fg outline-none placeholder:text-faint focus:border-amethyst"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5 overflow-x-auto pb-1",
				children: DISPO.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDispo(f.k),
					className: `shrink-0 rounded-full border px-3 py-1.5 text-xs ${dispo === f.k ? "border-fg/30 bg-fg/10 text-fg" : "border-line text-muted"}`,
					children: f.l
				}, f.k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5 overflow-x-auto pb-1",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setRarity(f.k),
					className: `shrink-0 rounded-full border px-3 py-1.5 text-xs ${rarity === f.k ? "border-fg/30 bg-fg/10 text-fg" : "border-line text-muted"}`,
					children: f.l
				}, f.k))
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: specimens.length === 0 ? "GeoDex is empty." : "Nothing matches those filters."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/identify",
					className: "mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), " Scan a specimen"]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-3",
				children: list.map((s) => {
					const m = MINERALS.find((x) => x.id === s.mineralId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/vault/$id",
						params: { id: s.id },
						className: "rh-panel block rounded-xl p-3",
						children: [
							s.photoDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s.photoDataUrl,
								alt: "",
								className: "mb-2 h-24 w-full rounded-md object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 grid h-24 place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
									hue: m?.hue ?? "#8d7cff",
									system: s.crystalSystem,
									size: 56
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-sm text-fg",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RarityChip, { rarity: s.rarity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] tabular-nums text-faint",
									children: s.disposition === "affixed_logged" ? "In place" : s.disposition === "restricted_observed" ? "Observed" : `${Math.round(s.confidence * 100)}%`
								})]
							})
						]
					}) }, s.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionLabel, { children: [MINERALS.length, " species in Mineralpedia if you want to study first"] })
		]
	});
}
//#endregion
export { VaultPage as component };
