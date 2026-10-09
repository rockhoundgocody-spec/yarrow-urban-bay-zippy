import { h as require_jsx_runtime, p as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as MessageSquare } from "../_libs/lucide-react.mjs";
import { _ as Panel } from "./router-CMQznpBx2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-CbIetWRj.js
var import_jsx_runtime = require_jsx_runtime();
function CommunityPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.18em] text-frost",
			children: "Community"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-2xl text-fg",
			children: "Field feed"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "flex flex-col items-start gap-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
					className: "size-6 text-frost",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg text-fg",
					children: "No posts yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: "The feed opens when collectors can sign in and share finds. Your GeoDex stays private on this device until you choose to share."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/identify",
					className: "inline-flex min-h-12 items-center rounded-md bg-gold px-4 text-sm font-medium text-void focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost",
					children: "Scan a specimen"
				})
			]
		})]
	});
}
//#endregion
export { CommunityPage as component };
