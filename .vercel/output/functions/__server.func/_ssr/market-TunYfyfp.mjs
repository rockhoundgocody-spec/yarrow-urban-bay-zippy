import { h as require_jsx_runtime, p as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ShoppingBag } from "../_libs/lucide-react.mjs";
import { _ as Panel } from "./router-zv3UGgEF2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-TunYfyfp.js
var import_jsx_runtime = require_jsx_runtime();
function MarketPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.18em] text-gold",
			children: "Commerce"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-2xl text-fg",
			children: "Specimen market"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "flex flex-col items-start gap-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
					className: "size-6 text-gold",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg text-fg",
					children: "The market isn't open yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: "Buying and selling will open once collectors can sign in and list their own specimens. Until then there are no listings here — nothing on this page is for sale."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/vault",
					className: "inline-flex min-h-12 items-center rounded-md border border-line-strong px-4 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost",
					children: "Open your GeoDex"
				})
			]
		})]
	});
}
//#endregion
export { MarketPage as component };
