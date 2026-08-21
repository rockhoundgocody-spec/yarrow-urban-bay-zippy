import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-DfAvtWOL.mjs";
import { f as Search } from "../_libs/lucide-react.mjs";
import { a as useField, d as SectionLabel, n as CrystalGem, p as cn, u as RarityChip } from "./router-BX6Bgd6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pedia-_qlJvo1e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATS = [
	{
		k: "all",
		l: "All"
	},
	{
		k: "silicate",
		l: "Silicates"
	},
	{
		k: "carbonate",
		l: "Carbonates"
	},
	{
		k: "sulfide",
		l: "Sulfides"
	},
	{
		k: "oxide",
		l: "Oxides"
	},
	{
		k: "rock",
		l: "Rocks"
	},
	{
		k: "other",
		l: "Other"
	}
];
function PediaPage() {
	const complete = useField((s) => s.completeQuest);
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => MINERALS.filter((m) => {
		if (cat !== "all" && m.category !== cat) return false;
		if (!q) return true;
		const s = q.toLowerCase();
		return `${m.name} ${m.formula} ${m.family} ${m.colors.join(" ")}`.toLowerCase().includes(s);
	}), [q, cat]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-amethyst",
					children: "Learn"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl text-fg",
					children: "Mineralpedia"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [MINERALS.length, " field species with tests, lookalikes, and hardness."]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Name, formula, color",
					className: "h-11 w-full rounded-md border border-line bg-obsidian pl-10 pr-3 text-sm text-fg outline-none placeholder:text-faint focus:border-amethyst"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5 overflow-x-auto pb-1",
				children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setCat(c.k),
					className: cn("shrink-0 rounded-full border px-3 py-1.5 text-xs", cat === c.k ? "border-amethyst/40 bg-amethyst/10 text-fg" : "border-line text-muted"),
					children: c.l
				}, c.k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionLabel, { children: [list.length, " entries"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: list.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/pedia/$id",
					params: { id: m.id },
					onClick: () => complete("pedia"),
					className: "rh-panel flex items-center gap-3 rounded-xl p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
							hue: m.hue,
							system: m.crystalSystem,
							size: 44
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-sm text-fg",
								children: m.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-[11px] text-faint",
								children: [
									m.formula,
									" · Mohs ",
									m.hardnessMin,
									m.hardnessMax !== m.hardnessMin ? `–${m.hardnessMax}` : ""
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RarityChip, { rarity: m.rarity })
					]
				}) }, m.id))
			})
		]
	});
}
//#endregion
export { PediaPage as component };
