import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Compass, M as BookOpen, h as Mic, o as Target, p as ScanLine } from "../_libs/lucide-react.mjs";
import { d as SectionLabel, l as Panel } from "./router-BX6Bgd6N.mjs";
import { t as HeroCloverOrb } from "./hero-orb-BwNr4uYn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clover-BrJA-2hm.js
var import_jsx_runtime = require_jsx_runtime();
var CAPABILITIES = [
	{
		icon: ScanLine,
		title: "Field ID",
		detail: "Lookalikes, Mohs, streak, acid — spoken or typed."
	},
	{
		icon: Target,
		title: "Hunt next",
		detail: "Gaps in your cabinet matched to mapped sites."
	},
	{
		icon: BookOpen,
		title: "Log a find",
		detail: "Say what you picked up. Clover files it in GeoDex."
	},
	{
		icon: Compass,
		title: "Land caution",
		detail: "Never treats an app pin as a permit."
	}
];
function CloverPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-medium uppercase tracking-[0.2em] text-cyan",
						children: "Orb AGI agent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-2xl text-fg",
						children: "Clover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-1 max-w-sm text-sm text-muted",
						children: "Liquid-metal companion from RockHound-GO. Hands-free in the field. Tap the orb to wake her."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCloverOrb, { size: 136 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "What she can do" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: CAPABILITIES.map((c) => {
					const Icon = c.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-amethyst" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium text-fg",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted",
								children: c.detail
							})
						]
					}, c.title);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "flex items-start gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "mt-0.5 size-4 shrink-0 text-cyan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: "Talk over her to take a turn. Type if the mic is busy."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Try: “How do I tell pyrite from gold?” or “Log a rose quartz I found by the creek.”"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/identify",
					className: "rh-panel flex min-h-12 flex-1 items-center justify-center rounded-xl text-sm text-gold",
					children: "Scan a specimen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/pedia",
					className: "rh-panel flex min-h-12 flex-1 items-center justify-center rounded-xl text-sm text-muted",
					children: "Mineralpedia"
				})]
			})
		]
	});
}
//#endregion
export { CloverPage as component };
