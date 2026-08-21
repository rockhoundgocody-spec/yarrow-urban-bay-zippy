import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useField } from "./router-BX6Bgd6N.mjs";
import { _ as suggestHunt, n as LiquidMetalOrb, r as MOOD_LABEL, t as CloverVoicePanel, v as useCloverConversation } from "./router-BX6Bgd6N2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hero-orb-BwNr4uYn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HeroCloverOrb({ size = 148, variant = "hero" }) {
	const messages = useField((s) => s.clover);
	const clover = useCloverConversation();
	const [hunt, setHunt] = (0, import_react.useState)(null);
	const [huntLoading, setHuntLoading] = (0, import_react.useState)(false);
	const c = clover.companion;
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
	function handleTap() {
		if (!clover.open) clover.start();
		else clover.nudge();
	}
	function handleHunt() {
		if (huntLoading) return;
		setHuntLoading(true);
		try {
			let lat;
			let lng;
			try {
				const cached = sessionStorage.getItem("rhgo_last_gps");
				if (cached) {
					const gps = JSON.parse(cached);
					lat = gps.lat;
					lng = gps.lng;
				}
			} catch {}
			setHunt(suggestHunt({
				collection: c.collection,
				name: c.name,
				lat,
				lng
			}));
		} finally {
			setHuntLoading(false);
		}
	}
	const panel = clover.open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: variant === "inline" ? "mt-3 w-full rh-rise" : "mt-4 w-full max-w-sm rh-rise",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloverVoicePanel, {
			compact: false,
			phase: clover.phase,
			messages,
			interim: clover.interim,
			onClose: clover.end,
			onHunt: handleHunt,
			huntLoading,
			hunt,
			onDismissHunt: () => setHunt(null),
			voiceSupported: clover.voiceSupported,
			onSend: (t) => void clover.send(t),
			onMic: clover.nudge
		})
	}) : null;
	if (variant === "inline") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: handleTap,
		"aria-label": clover.open ? "Talk to Clover now" : "Start talking with Clover",
		className: "rh-panel flex w-full items-center gap-3 rounded-xl p-3 text-left transition-transform duration-150 ease-out active:scale-[0.98]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative size-16 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidMetalOrb, {
					size: 64,
					state: clover.phase === "idle" ? "resting" : clover.phase,
					level: c.level
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] uppercase tracking-[0.16em] text-amethyst",
						children: ["Orb AGI · ", MOOD_LABEL[c.mood]]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg text-fg",
						children: "Clover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: clover.open ? "Listening — tap to take a turn" : "Tap to talk. Tests, lookalikes, hunt next."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[10px] tabular-nums text-faint",
				children: ["Lv ", c.level]
			})
		]
	}), panel] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: handleTap,
				"aria-label": clover.open ? "Talk to Clover now" : "Start talking with Clover",
				className: "relative grid place-items-center transition-transform duration-150 ease-out active:scale-[0.97]",
				style: {
					width: size + 24,
					height: size + 24
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidMetalOrb, {
					size,
					state: clover.phase === "idle" ? "resting" : clover.phase,
					level: c.level
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-center text-[10px] uppercase tracking-[0.18em] text-amethyst",
				children: [
					MOOD_LABEL[c.mood],
					" · Lv ",
					c.level,
					" · ",
					c.energy,
					"% energy"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-center text-xs text-muted",
				children: clover.open ? "Tap the orb to take a turn. Mic or type." : "Tap the orb. Hands-free field companion."
			}),
			panel
		]
	});
}
//#endregion
export { HeroCloverOrb as t };
