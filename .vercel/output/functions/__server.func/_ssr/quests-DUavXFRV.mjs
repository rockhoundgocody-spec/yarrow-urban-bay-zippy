import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as BookOpen, O as Check, T as Gem, k as Camera, s as Sparkles, v as Map } from "../_libs/lucide-react.mjs";
import { a as useField, l as Panel, p as cn } from "./router-BX6Bgd6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quests-DUavXFRV.js
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
