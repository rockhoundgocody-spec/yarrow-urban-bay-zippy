import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useField, d as SectionLabel, p as cn } from "./router-BX6Bgd6N.mjs";
import { m as projectSite, s as SITES } from "./router-BX6Bgd6N2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-jwvQhNSq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACCESS = [
	{
		k: "all",
		l: "Any access"
	},
	{
		k: "public",
		l: "Public"
	},
	{
		k: "fee",
		l: "Fee dig"
	},
	{
		k: "permit",
		l: "Permit"
	},
	{
		k: "permission",
		l: "Ask first"
	}
];
function ExplorePage() {
	const saved = useField((s) => s.savedSiteIds);
	const [q, setQ] = (0, import_react.useState)("");
	const [access, setAccess] = (0, import_react.useState)("all");
	const [diff, setDiff] = (0, import_react.useState)("all");
	const [picked, setPicked] = (0, import_react.useState)(SITES[0]?.id ?? null);
	const list = (0, import_react.useMemo)(() => SITES.filter((s) => {
		if (access !== "all" && s.access !== access) return false;
		if (diff !== "all" && s.difficulty !== diff) return false;
		if (q && !`${s.name} ${s.state} ${s.finds.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
		return true;
	}), [
		q,
		access,
		diff
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-field",
					children: "Explore"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl text-fg",
					children: "Field map"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Verified-style localities. Always confirm land status before you go."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-xl border border-line bg-void",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 100 64",
					className: "w-full",
					"aria-label": "Contiguous United States field map",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							width: "100",
							height: "64",
							className: "fill-void"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M12 18 L18 12 L28 11 L40 10 L52 10.5 L62 11 L70 13 L78 16 L84 14 L88 18 L90 24 L87 30 L85 36 L86 42 L80 46 L72 50 L64 52 L54 53 L46 51 L40 52 L34 50 L28 47 L22 42 L16 36 L13 28 Z\n               M80 46 L82 54 L79 57 L76 50 Z\n               M28 47 L26 56 L22 54 L24 47 Z",
							className: "fill-stone stroke-amethyst/50",
							strokeWidth: "0.45"
						}),
						list.map((s) => {
							const { x, y } = projectSite(s.lat, s.lng);
							const active = picked === s.id;
							const isSaved = saved.includes(s.id);
							const px = x;
							const py = y * .64;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${px} ${py})`,
								className: "cursor-pointer",
								onClick: () => setPicked(s.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									r: active ? 3.2 : 2.2,
									fill: isSaved ? "#d4af37" : active ? "#8d7cff" : "#3dcf8a"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									r: active ? 5.5 : 3.6,
									fill: isSaved ? "#d4af37" : "#3dcf8a",
									opacity: "0.2"
								})]
							}, s.id);
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.14em] text-faint",
					children: [list.length, " sites · gold = saved"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search sites, states, minerals",
				className: "h-11 w-full rounded-md border border-line bg-obsidian px-3 text-sm text-fg outline-none placeholder:text-faint focus:border-field"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5 overflow-x-auto",
				children: ACCESS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setAccess(a.k),
					className: cn("shrink-0 rounded-full border px-3 py-1.5 text-xs", access === a.k ? "border-field/40 bg-field/10 text-fg" : "border-line text-muted"),
					children: a.l
				}, a.k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5",
				children: [
					"all",
					"easy",
					"moderate",
					"hard"
				].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDiff(d),
					className: cn("rounded-full border px-3 py-1.5 text-xs capitalize", diff === d ? "border-fg/30 bg-fg/10 text-fg" : "border-line text-muted"),
					children: d
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Localities" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/explore/$id",
					params: { id: s.id },
					className: cn("rh-panel block rounded-xl p-4", picked === s.id && "border-amethyst/40"),
					onClick: () => setPicked(s.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-fg",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-muted",
							children: [
								s.state,
								" · ",
								s.access.replace("_", " "),
								" · ",
								s.difficulty
							]
						})] }), saved.includes(s.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.14em] text-gold",
							children: "Saved"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-faint",
						children: s.finds.slice(0, 4).join(" · ")
					})]
				}) }, s.id))
			})
		]
	});
}
//#endregion
export { ExplorePage as component };
