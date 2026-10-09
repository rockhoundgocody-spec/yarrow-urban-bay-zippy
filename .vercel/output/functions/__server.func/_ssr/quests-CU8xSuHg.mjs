import { g as require_jsx_runtime, p as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as BookOpen, T as Camera, h as Map, s as Sparkles, w as Check, x as Gem } from "../_libs/lucide-react.mjs";
import { _ as cn, c as useField, f as Panel } from "./router-CRN5OVWq2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quests-CU8xSuHg.js
var import_jsx_runtime = require_jsx_runtime();
var ICONS = {
	scan: Camera,
	vault: Gem,
	map: Map,
	pedia: BookOpen,
	clover: Sparkles
};
var LINKS = {
	scan: "/identify",
	vault: "/identify",
	map: "/explore",
	pedia: "/pedia",
	clover: "/clover"
};
function QuestsPage() {
	const quests = useField((s) => s.quests);
	const done = quests.filter((q) => q.done).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-gold",
					children: "Play & progress"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl text-fg",
					children: "Daily briefing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						done,
						"/",
						quests.length,
						" complete. Resets at midnight UTC."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "progressbar",
					"aria-label": "Daily quests completion",
					"aria-valuenow": done,
					"aria-valuemin": 0,
					"aria-valuemax": quests.length,
					"aria-valuetext": `${done} of ${quests.length} daily quests completed`,
					className: "h-1.5 overflow-hidden rounded-full bg-fg/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-gold",
						style: { width: `${done / Math.max(quests.length, 1) * 100}%` }
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: quests.map((q) => {
					const Icon = ICONS[q.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: LINKS[q.id],
						className: cn("rh-panel flex items-center gap-3 rounded-xl p-4", q.done && "opacity-60"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-md border border-line",
								children: q.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-field" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-gold" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-fg",
									children: q.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: q.detail
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs tabular-nums text-muted",
								children: ["+", q.xp]
							})
						]
					}) }, q.id);
				})
			})
		]
	});
}
//#endregion
export { QuestsPage as component };
