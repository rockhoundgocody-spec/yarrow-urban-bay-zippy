import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Shield } from "../_libs/lucide-react.mjs";
import { d as SectionLabel, l as Panel } from "./router-BX6Bgd6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/safety-BXQQRn_U.js
var import_jsx_runtime = require_jsx_runtime();
var RULES = [
	{
		title: "Verify land status",
		body: "Public, fee-dig, permit, and private are not the same. A pin in this app is not permission. Call the land manager."
	},
	{
		title: "Exact locations stay private",
		body: "Find coordinates never leave this device. If you share, fuzz the pin. Never post a public GPS for a sensitive site."
	},
	{
		title: "Collecting is optional",
		body: "Marking a specimen in place awards more XP than taking it. Restricted ground is observe-only."
	},
	{
		title: "Do not encourage illegal collecting",
		body: "National parks, monuments, and many wilderness areas prohibit collecting. If the status is unknown, leave it."
	},
	{
		title: "Field hazards",
		body: "Heat, shafts, falling rock, tides, and weather kill rockhounds. Pack water, tell someone the plan, wear eyes."
	}
];
function SafetyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-field",
					children: "Safety · legality"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl text-fg",
					children: "Land before the hammer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "RockHound-GO is a field intelligence platform. It will not tell you a site is legal if it is not."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "flex items-start gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "mt-0.5 size-5 text-field" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: "Access chips on the map are starting points. Always confirm posted signs, claim markers, and seasonal closures."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Stewardship doctrine" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: RULES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rh-panel rounded-xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-fg",
						children: r.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: r.body
					})]
				}, r.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/explore",
				className: "block text-center text-sm text-cyan",
				children: "Open the field map"
			})
		]
	});
}
//#endregion
export { SafetyPage as component };
