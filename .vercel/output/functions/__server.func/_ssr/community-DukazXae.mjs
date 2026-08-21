import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-DfAvtWOL.mjs";
import { w as Heart } from "../_libs/lucide-react.mjs";
import { a as useField, m as formatRelative, n as CrystalGem, p as cn } from "./router-BX6Bgd6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-DukazXae.js
var import_jsx_runtime = require_jsx_runtime();
function CommunityPage() {
	const posts = useField((s) => s.posts);
	const toggle = useField((s) => s.toggleLike);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-[0.18em] text-amethyst",
				children: "Community"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-2xl text-fg",
				children: "Field feed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Finds from collectors on the circuit. Local likes stay on this device."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: posts.map((p) => {
				const m = MINERALS.find((x) => x.id === p.mineralId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rh-panel rounded-xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: p.author
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-faint",
								children: formatRelative(p.at)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
								hue: p.hue,
								system: m?.crystalSystem,
								size: 52
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-fg",
									children: p.mineral
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: p.location
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: p.caption
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggle(p.id),
								className: cn("inline-flex min-h-11 items-center gap-2 text-sm", p.liked ? "text-gold" : "text-muted"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", p.liked && "fill-gold") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: p.likes
								})]
							}), p.mineralId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pedia/$id",
								params: { id: p.mineralId },
								className: "text-xs text-cyan",
								children: "Species"
							})]
						})
					]
				}, p.id);
			})
		})]
	});
}
//#endregion
export { CommunityPage as component };
