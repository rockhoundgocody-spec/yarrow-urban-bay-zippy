import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react, h as require_jsx_runtime, p as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-BzbnUKRY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$2 } from "./router-y7NTENN7.mjs";
import { A as BookmarkCheck, E as Compass, k as Bookmark } from "../_libs/lucide-react.mjs";
import { _ as Panel, a as siteHazards, g as Button, m as useField, r as SITE_BY_ID } from "./router-y7NTENN72.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore_._id-Bc4biugd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SitePage() {
	const { id } = Route$2.useParams();
	const site = SITE_BY_ID[id];
	const visit = useField((s) => s.visitSite);
	const toggle = useField((s) => s.toggleSaveSite);
	const saved = useField((s) => s.savedSiteIds.includes(id));
	const addTrip = useField((s) => s.addTrip);
	(0, import_react.useEffect)(() => {
		if (site) visit(site.id);
	}, [site, visit]);
	if (!site) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "p-6 text-sm text-muted",
		children: ["Unknown locality. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/explore",
			children: "Back to map"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] uppercase tracking-[0.18em] text-field",
				children: site.region
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl leading-tight text-fg",
				children: site.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					site.state,
					" · ",
					site.category.replace("_", " "),
					" · ",
					site.difficulty
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "grid grid-cols-2 gap-3 p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] uppercase tracking-[0.14em] text-faint",
					children: "Access"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 capitalize text-fg",
					children: site.access
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] uppercase tracking-[0.14em] text-faint",
					children: "Season"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-fg",
					children: site.season
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: site.notes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-gold/25 bg-gold/5 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] uppercase tracking-[0.16em] text-gold",
						children: "Land status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-fg/90",
						children: site.legality
					}),
					site.legalityCheckedAt && site.legalitySource ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[13px] text-muted",
						children: [
							"Checked ",
							site.legalityCheckedAt,
							" ·",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: site.legalitySource,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex min-h-12 items-center text-cyan underline",
								children: "source"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[13px] font-medium text-gold",
						children: "Unverified. Rules change and claims move — confirm with the land manager or posted signs before you collect."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[12px] uppercase tracking-[0.16em] text-faint",
				children: "Hazards"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: siteHazards(site.category).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-line px-3 py-1.5 text-xs text-muted",
					children: h
				}, h))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-faint",
				children: "Pins are fuzzed for privacy. Confirm posted rules before collecting. Restricted ground is observe-only."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[12px] uppercase tracking-[0.16em] text-faint",
				children: "Expected finds"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: site.finds.map((name) => {
					const m = MINERALS.find((x) => x.name === name);
					return m ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pedia/$id",
						params: { id: m.id },
						className: "inline-flex min-h-12 items-center rounded-full border border-line px-3 py-1.5 text-xs text-fg",
						children: name
					}, name) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-line px-3 py-1.5 text-xs text-muted",
						children: name
					}, name);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: saved ? "ghost" : "primary",
					className: "flex-1",
					onClick: () => {
						toggle(site.id);
						toast(saved ? "Removed from saved sites" : "Saved to your route book");
					},
					children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), saved ? "Saved" : "Save site"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "gold",
					className: "flex-1",
					onClick: () => {
						addTrip({
							name: site.name,
							date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
							siteIds: [site.id],
							notes: "",
							gear: defaultGear()
						});
						toast.success("Trip drafted");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }), " Plan trip"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/trips",
				className: "flex min-h-12 items-center justify-center text-sm text-muted",
				children: "Open trip planner"
			})
		]
	});
}
function defaultGear() {
	return [
		{
			id: "g1",
			label: "Safety glasses",
			packed: false
		},
		{
			id: "g2",
			label: "Crack hammer",
			packed: false
		},
		{
			id: "g3",
			label: "Water 2L",
			packed: false
		},
		{
			id: "g4",
			label: "Sample bags",
			packed: false
		},
		{
			id: "g5",
			label: "First aid",
			packed: false
		},
		{
			id: "g6",
			label: "Sun / weather layer",
			packed: false
		}
	];
}
//#endregion
export { SitePage as component };
