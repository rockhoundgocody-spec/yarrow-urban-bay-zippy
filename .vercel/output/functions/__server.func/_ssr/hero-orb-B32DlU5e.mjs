import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as cn } from "./router-a352uhk_.mjs";
import { d as useCloverConversation, t as LiquidMetalOrb } from "./router-a352uhk_2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hero-orb-B32DlU5e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrbSpeech({ line, interim, phase, micError, compact = false }) {
	const live = phase === "listening" && interim.trim();
	const text = micError ? micError : live ? interim : phase === "thinking" ? "…" : phase === "listening" ? "" : line;
	if (!text && phase === "idle") return null;
	if (!text && phase === "resting") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("orb-line", compact && "orb-line-compact", live && "orb-line-live"),
		"aria-live": "polite",
		children: text
	});
}
function HeroCloverOrb({ size = 160, variant = "hero" }) {
	const clover = useCloverConversation();
	(0, import_react.useEffect)(() => {
		if (typeof navigator === "undefined" || !navigator.geolocation) return;
		if (sessionStorage.getItem("rhgo_last_gps")) return;
		navigator.geolocation.getCurrentPosition((pos) => sessionStorage.setItem("rhgo_last_gps", JSON.stringify({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		})), () => {}, {
			timeout: 8e3,
			maximumAge: 6e5
		});
	}, []);
	function handleTap(e) {
		e.currentTarget.focus({ preventScroll: true });
		if (!clover.open) clover.start();
		else if (clover.phase === "resting") clover.nudge();
		else clover.nudge();
	}
	const pad = variant === "inline" ? 72 : 88;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onMouseDown: (e) => e.preventDefault(),
			onClick: handleTap,
			"aria-label": clover.open ? "Talk to Clover" : "Wake Clover",
			className: "orb-stage grid place-items-center transition-transform duration-150 ease-out active:scale-[0.97]",
			style: {
				width: size + pad,
				height: size + pad
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidMetalOrb, {
				size,
				state: clover.phase,
				level: clover.companion.level
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbSpeech, {
			line: clover.line,
			interim: clover.interim,
			phase: clover.phase,
			micError: clover.micError
		})]
	});
}
//#endregion
export { HeroCloverOrb as t };
