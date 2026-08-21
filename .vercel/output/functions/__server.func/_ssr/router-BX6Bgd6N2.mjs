import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react, _ as createFileRoute, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { r as findMineralByName, t as MINERALS } from "./minerals-DfAvtWOL.mjs";
import { C as House, D as Compass, M as BookOpen, T as Gem, _ as Menu, c as ShoppingBag, d as Send, g as MessageSquare, h as Mic, i as TriangleAlert, k as Camera, l as Shield, n as WifiOff, o as Target, r as User, s as Sparkles, t as X, v as Map, x as Keyboard, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as useField, c as Button, g as todayKey, n as CrystalGem, o as xpToNext, p as cn } from "./router-BX6Bgd6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BX6Bgd6N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-void px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-lg",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function CinematicOpener() {
	const mark = useField((s) => s.markOpenerSeen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-void p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rh-rise max-w-sm text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
					hue: "#8d7cff",
					system: "trigonal",
					size: 96,
					className: "mx-auto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-[10px] font-medium uppercase tracking-[0.28em] text-amethyst",
					children: "Field intelligence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl tracking-tight text-fg",
					children: "RockHound-GO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: "Explore. Scan. Choose. Log. The operating system for disciplined discovery — not a camera roll."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "gold",
					className: "mt-8 w-full",
					onClick: mark,
					children: "Enter the field"
				})
			]
		})
	});
}
var SLIDES = [
	{
		icon: Camera,
		kicker: "Scan",
		title: "Photograph a specimen. Get a field report.",
		body: "Clover reads color, habit, and luster. One photo is enough. Confidence stays honest."
	},
	{
		icon: Compass,
		kicker: "Explore",
		title: "Localities with land status attached.",
		body: "Public beaches, fee digs, alpine claims. Every pin carries access notes — verify before you go."
	},
	{
		icon: Gem,
		kicker: "Choose",
		title: "Collect, or mark it in place.",
		body: "GeoDex logs both paths. Steward XP for leaving a find. Collector XP for legal collection. Extraction is never the only win."
	}
];
function Onboarding() {
	const [i, setI] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const complete = useField((s) => s.completeOnboarding);
	const slide = SLIDES[i];
	const Icon = slide.icon;
	const last = i === SLIDES.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-void/94 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rh-panel rh-hairline w-full max-w-md rounded-2xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-medium uppercase tracking-[0.2em] text-amethyst",
					children: "RockHound-GO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid size-12 place-items-center rounded-lg border border-line bg-stone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-gold" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-[10px] uppercase tracking-[0.18em] text-faint",
					children: slide.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-2xl leading-tight text-fg",
					children: slide.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: slide.body
				}),
				last && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-5 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-[0.16em] text-faint",
						children: "What should we call you"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Field name",
						className: "mt-2 h-11 w-full rounded-md border border-line-strong bg-void px-3 text-sm text-fg outline-none placeholder:text-faint focus:border-amethyst"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex items-center gap-2",
					children: SLIDES.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1 flex-1 rounded-full ${idx <= i ? "bg-amethyst" : "bg-fg/10"}` }, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "flex-1",
						onClick: () => complete(name),
						children: "Skip"
					}), last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "gold",
						className: "flex-1",
						onClick: () => complete(name),
						children: "Enter the field"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "primary",
						className: "flex-1",
						onClick: () => setI((v) => v + 1),
						children: "Continue"
					})]
				})
			]
		})
	});
}
function growthTier(level) {
	if (level < 3) return 1;
	if (level < 5) return 2;
	return 3;
}
function LiquidMetalOrb({ size = 140, state = "idle", level = 1, className, interactive = true }) {
	const wrapRef = (0, import_react.useRef)(null);
	const tier = growthTier(level);
	(0, import_react.useEffect)(() => {
		if (!interactive) return;
		const el = wrapRef.current;
		if (!el) return;
		const onMove = (e) => {
			const r = el.getBoundingClientRect();
			const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(r.width, 1);
			const dy = (e.clientY - (r.top + r.height / 2)) / Math.max(r.height, 1);
			el.style.setProperty("--orb-lean-x", `${dx * 10}px`);
			el.style.setProperty("--orb-lean-y", `${dy * 8}px`);
		};
		const onLeave = () => {
			el.style.setProperty("--orb-lean-x", "0px");
			el.style.setProperty("--orb-lean-y", "0px");
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerleave", onLeave);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerleave", onLeave);
		};
	}, [interactive]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		"data-state": state,
		className: cn("orb-shell", size < 80 && "orb-shell-mini", className),
		style: {
			width: size,
			height: size
		},
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-aura" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-aura-warm" }),
			tier >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "orb-ring orb-ring-a",
				viewBox: "0 0 240 240",
				width: size * 1.18,
				height: size * 1.18,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "120,18 210,72 210,168 120,222 30,168 30,72",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1"
				})
			}),
			tier >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "orb-ring orb-ring-b",
				viewBox: "0 0 240 240",
				width: size * 1.32,
				height: size * 1.32,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "120,8 218,66 218,174 120,232 22,174 22,66",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "0.7"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "orb-body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-film" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-film-counter" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-spec" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-glint" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb-ripple" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb-ripple delay-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb-ripple delay-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-iris" })
				]
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function scoreMineral(m, key) {
	let s = 0;
	if (key.color) {
		const c = key.color.toLowerCase();
		if (m.colors.some((x) => x.toLowerCase().includes(c) || c.includes(x.toLowerCase()))) s += 3;
		if (m.name.toLowerCase().includes(c)) s += 1;
	}
	if (key.hardness != null && m.hardnessMin != null && m.hardnessMax != null) {
		if (key.hardness >= m.hardnessMin - .5 && key.hardness <= m.hardnessMax + .5) s += 3;
		else if (Math.abs(key.hardness - (m.hardnessMin + m.hardnessMax) / 2) <= 1.5) s += 1;
	}
	if (key.luster) {
		const l = key.luster.toLowerCase();
		if (m.luster.some((x) => x.toLowerCase().includes(l))) s += 2;
	}
	if (key.streak) {
		const st = key.streak.toLowerCase();
		if (m.streak.toLowerCase().includes(st) || st.includes(m.streak.toLowerCase().split(" ")[0] || "___")) s += 2;
	}
	if (key.system) {
		if (m.crystalSystem.toLowerCase().includes(key.system.toLowerCase())) s += 2;
	}
	return s;
}
function matchFieldKey(key) {
	const ranked = MINERALS.map((m) => ({
		m,
		score: scoreMineral(m, key)
	})).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
	if (!ranked.length) return [];
	const top = ranked[0].score;
	return ranked.map(({ m, score }) => mineralToResult(m, Math.max(.28, Math.min(.92, score / Math.max(top, 1) * .78)), "field-key"));
}
function mineralToResult(m, confidence, source) {
	return {
		name: m.name,
		mineralId: m.id,
		family: m.family,
		formula: m.formula,
		confidence,
		rarity: m.rarity,
		hardness: m.hardnessMin != null ? `${m.hardnessMin}${m.hardnessMax !== m.hardnessMin ? `–${m.hardnessMax}` : ""}` : void 0,
		luster: m.luster[0],
		crystalSystem: m.crystalSystem,
		streak: m.streak,
		color: m.colors.slice(0, 3).join(", "),
		valueLow: m.valueLow,
		valueHigh: m.valueHigh,
		fieldNotes: m.blurb,
		keyFeatures: m.keyFeatures.slice(0, 4),
		alternatives: m.similar.slice(0, 3).map((s, i) => ({
			name: s.name,
			confidence: Math.max(.15, confidence - .18 - i * .08)
		})),
		notGeological: false,
		source
	};
}
var identifySpecimen = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7e21a7c7dfbe6a11dec545ec79c9ac91890a8f328b0decb36744ebd1fc131d3a"));
var askClover = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("c70c46c50fe1438464e51a0cdbbd58cd880dd95e147db9e66685ea9eb551bf66"));
function companionFromField(input) {
	const { level } = xpToNext(input.xp);
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const today = todayKey();
	const todaysFinds = input.specimens.filter((s) => todayKey(new Date(s.createdAt)) === today).length;
	const collection = [...new Set(input.specimens.map((s) => s.name))].slice(0, 24);
	const mood = todaysFinds > 0 ? "radiant" : hour >= 22 || hour < 6 ? "drowsy" : input.streak >= 3 ? "keen" : "calm";
	const energy = Math.max(28, Math.min(100, 52 + input.streak * 6 + todaysFinds * 8 - (hour >= 22 ? 12 : 0)));
	return {
		name: input.displayName || "explorer",
		level,
		mood,
		energy,
		streak: input.streak,
		todaysFinds,
		collection
	};
}
var MOOD_LABEL = {
	calm: "Calm",
	keen: "Keen",
	radiant: "Radiant",
	drowsy: "Drowsy"
};
var FALLBACKS = [
	{
		keys: [
			"pyrite",
			"fool",
			"gold"
		],
		text: "Pyrite vs gold: streak and hardness. Pyrite streaks green-black and shatters. Gold streaks yellow and flattens. Density is the rest of the story."
	},
	{
		keys: [
			"calcite",
			"vinegar",
			"acid",
			"fizz"
		],
		text: "Vinegar is enough for calcite — it fizzes on a fresh face. Dolomite usually needs powdering first. Quartz never fizzes. That's the ten-second carbonate test."
	},
	{
		keys: [
			"pack",
			"desert",
			"kit",
			"gear"
		],
		text: "Desert kit: water, sun, closed shoes, rock hammer, goggles, first aid, and a printed land-status note. Confirm access before you dig — an app is not a permit."
	},
	{
		keys: [
			"agate",
			"jasper",
			"superior"
		],
		text: "Lake Superior agate shows tight fortification banding and a waxy translucence. Jasper is opaque. Wet the face — banding is the tell."
	},
	{
		keys: [
			"hardness",
			"mohs",
			"scratch"
		],
		text: "Field Mohs: fingernail 2.5, penny 3, knife 5.5, glass 5.5, streak plate 7. Test a point, not a weathered skin."
	}
];
function localCloverReply(question, companion) {
	const q = question.toLowerCase();
	const hit = FALLBACKS.find((f) => f.keys.some((k) => q.includes(k)));
	if (hit) return hit.text;
	const mineral = MINERALS.find((m) => q.includes(m.name.toLowerCase()));
	if (mineral) return `${mineral.name}: ${mineral.blurb} Field test — ${mineral.fieldTests[0] ?? mineral.keyFeatures[0]}.`;
	if (q.includes("log") || q.includes("found")) return "Tell me the species and roughly where you picked it. I'll log it to GeoDex so you can finish the ethics path later.";
	if (q.includes("hunt") || q.includes("where") || q.includes("next")) return `${companion.name}, tap Hunt and I'll match gaps in your cabinet to mapped sites. I won't invent a legal locality.`;
	return `I'm on field memory for a second, ${companion.name}. Ask a test, a packing list, or a lookalike — I'll stay practical.`;
}
function parseLoggedFind(details) {
	const mineral = findMineralByName(details) ?? MINERALS.find((m) => details.toLowerCase().includes(m.name.toLowerCase()));
	if (mineral) return {
		name: mineral.name,
		mineralId: mineral.id,
		family: mineral.family,
		formula: mineral.formula,
		rarity: mineral.rarity
	};
	return {
		name: (details.replace(/^(log|record|add|found|i found)\s+/i, "").split(/[,.]/)[0]?.trim() || "Unnamed specimen").slice(0, 48),
		family: "Undetermined",
		rarity: "common"
	};
}
function getSpeechRecognition() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
var GREETINGS = (c) => {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const time = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
	const pool = [
		`Good ${time}, ${c.name}. I'm Clover — tap once and talk, or type if the wind's up.`,
		`Hey ${c.name}. Find anything fun, or just wandering?`,
		`I'm here. Ask a test, a lookalike, or tell me what you just picked up.`
	];
	if (c.streak >= 7) pool.unshift(`Seven days in a row. That's a real streak. What's the plan this ${time}?`);
	else if (c.streak >= 3) pool.unshift(`Day ${c.streak} together. How's the ground treating you?`);
	if (c.mood === "radiant") pool.unshift("You logged a find today. Tell me about it — I want the texture, not the trophy.");
	if (c.mood === "drowsy") pool.unshift("No pressure. I'm just glad you opened the field kit.");
	return pool;
};
function useCloverConversation() {
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [interim, setInterim] = (0, import_react.useState)("");
	const [voiceSupported, setVoiceSupported] = (0, import_react.useState)(false);
	const activeRef = (0, import_react.useRef)(false);
	const recRef = (0, import_react.useRef)(null);
	const phaseRef = (0, import_react.useRef)("idle");
	const gotResultRef = (0, import_react.useRef)(false);
	const quietTurnsRef = (0, import_react.useRef)(0);
	const companion = companionFromField({
		displayName: useField((s) => s.displayName),
		xp: useField((s) => s.xp),
		streak: useField((s) => s.streak),
		specimens: useField((s) => s.specimens)
	});
	(0, import_react.useEffect)(() => {
		phaseRef.current = phase;
	}, [phase]);
	(0, import_react.useEffect)(() => {
		setVoiceSupported(!!getSpeechRecognition() && typeof window !== "undefined" && "speechSynthesis" in window);
	}, []);
	const stopSpeech = (0, import_react.useCallback)(() => {
		if (typeof window === "undefined") return;
		window.speechSynthesis?.cancel();
	}, []);
	const speak = (0, import_react.useCallback)((text) => {
		if (typeof window === "undefined" || !window.speechSynthesis) {
			setPhase("resting");
			return;
		}
		stopSpeech();
		const utter = new SpeechSynthesisUtterance(text);
		utter.rate = .96;
		utter.pitch = 1.04;
		const voices = window.speechSynthesis.getVoices();
		const preferred = voices.find((v) => /female|samantha|victoria|karen|moira|zira|google us/i.test(v.name)) ?? voices.find((v) => v.lang.startsWith("en"));
		if (preferred) utter.voice = preferred;
		utter.onend = () => {
			if (!activeRef.current) return;
			setPhase("resting");
		};
		utter.onerror = () => {
			if (activeRef.current) setPhase("resting");
		};
		setPhase("speaking");
		window.speechSynthesis.speak(utter);
	}, [stopSpeech]);
	const send = (0, import_react.useCallback)(async (raw, mode = "text") => {
		const question = raw.trim();
		if (!question || !activeRef.current) return;
		setInterim("");
		const push = useField.getState().pushClover;
		push({
			role: "user",
			text: question
		});
		setPhase("thinking");
		const history = useField.getState().clover.slice(-9, -1).map((m) => ({
			role: m.role,
			text: m.text
		}));
		let reply = localCloverReply(question, companion);
		try {
			const res = await askClover({ data: {
				question,
				history,
				companion,
				mode
			} });
			if (res.ok) {
				reply = res.text;
				if (res.logFind && res.findDetails) {
					const parsed = parseLoggedFind(res.findDetails);
					useField.getState().addSpecimen({
						name: parsed.name,
						mineralId: parsed.mineralId,
						family: parsed.family,
						formula: parsed.formula,
						rarity: parsed.rarity,
						confidence: .55,
						notes: res.findDetails,
						fieldNotes: "Logged by Clover from conversation.",
						source: "manual",
						disposition: "unknown",
						collected: false,
						leftInPlace: false,
						legalStatus: "unknown",
						ethicsPromptShown: false,
						userConfirmedLegalAccess: false,
						geoPrivacy: "hidden"
					});
					reply = `${reply} Logged ${parsed.name} to GeoDex.`;
				}
			}
		} catch {}
		if (!activeRef.current) return;
		push({
			role: "assistant",
			text: reply
		});
		speak(reply);
	}, [companion, speak]);
	const beginListening = (0, import_react.useCallback)(() => {
		if (!activeRef.current) return;
		const Ctor = getSpeechRecognition();
		if (!Ctor) {
			setPhase("resting");
			return;
		}
		recRef.current?.stop();
		const rec = new Ctor();
		rec.continuous = false;
		rec.interimResults = true;
		rec.lang = "en-US";
		gotResultRef.current = false;
		rec.onresult = (ev) => {
			const last = ev.results[ev.results.length - 1];
			if (!last) return;
			const text = last[0]?.transcript ?? "";
			if (last.isFinal) {
				gotResultRef.current = true;
				quietTurnsRef.current = 0;
				send(text, "voice");
			} else setInterim(text);
		};
		rec.onerror = () => {
			if (activeRef.current && phaseRef.current === "listening") setPhase("resting");
		};
		rec.onend = () => {
			if (!activeRef.current) return;
			if (!gotResultRef.current && phaseRef.current === "listening") {
				quietTurnsRef.current += 1;
				setPhase("resting");
			}
		};
		recRef.current = rec;
		setInterim("");
		setPhase("listening");
		try {
			rec.start();
		} catch {
			setPhase("resting");
		}
	}, [send]);
	const start = (0, import_react.useCallback)(() => {
		activeRef.current = true;
		quietTurnsRef.current = 0;
		const pool = GREETINGS(companion);
		const line = pool[Math.floor(Math.random() * pool.length)] ?? pool[0];
		const existing = useField.getState().clover;
		if (existing.length === 1 && existing[0]?.role === "assistant") speak(existing[0].text);
		else {
			useField.getState().pushClover({
				role: "assistant",
				text: line
			});
			speak(line);
		}
	}, [companion, speak]);
	const end = (0, import_react.useCallback)(() => {
		activeRef.current = false;
		recRef.current?.stop();
		recRef.current = null;
		stopSpeech();
		setPhase("idle");
		setInterim("");
	}, [stopSpeech]);
	const nudge = (0, import_react.useCallback)(() => {
		if (!activeRef.current) {
			start();
			return;
		}
		if (phaseRef.current === "speaking") stopSpeech();
		recRef.current?.stop();
		quietTurnsRef.current = 0;
		beginListening();
	}, [
		beginListening,
		start,
		stopSpeech
	]);
	(0, import_react.useEffect)(() => () => {
		activeRef.current = false;
		recRef.current?.stop();
		if (typeof window !== "undefined") window.speechSynthesis?.cancel();
	}, []);
	return {
		phase,
		interim,
		start,
		end,
		nudge,
		send,
		voiceSupported,
		companion,
		open: phase !== "idle",
		beginListening
	};
}
var PHASE_TEXT = {
	idle: "",
	thinking: "Reading the outcrop…",
	speaking: "Talking — jump in any time",
	listening: "Listening",
	resting: "Here whenever you are"
};
function CloverVoicePanel({ phase, messages, interim, onClose, onHunt, huntLoading, hunt, onDismissHunt, voiceSupported, onSend, onMic, compact = true }) {
	const bottomRef = (0, import_react.useRef)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const shown = compact ? messages.slice(-8) : messages;
	(0, import_react.useEffect)(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		messages,
		interim,
		hunt,
		phase
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col overflow-hidden rounded-2xl border border-line bg-obsidian/95 shadow-panel backdrop-blur-md", compact ? "w-[min(100%,18.5rem)] max-h-80" : "max-h-[min(52vh,28rem)] w-full"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-line px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.16em] text-amethyst",
					children: "Clover · field AGI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onHunt,
						disabled: huntLoading,
						className: "inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-[11px] text-cyan disabled:opacity-40",
						"aria-label": "Hunt next",
						children: [huntLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-3.5" }), "Hunt"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "End conversation",
						className: "grid size-9 place-items-center text-muted hover:text-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-24 flex-1 space-y-2 overflow-y-auto px-3 py-2",
				children: [
					shown.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex", m.role === "user" ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed", m.role === "user" ? "bg-amethyst/20 text-fg" : "bg-stone text-fg/90"),
							children: m.text
						})
					}, m.id)),
					interim && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[90%] rounded-xl border border-dashed border-amethyst/30 px-3 py-2 text-xs italic text-muted",
							children: interim
						})
					}),
					phase === "thinking" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), " Thinking…"]
					}),
					hunt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-amethyst/25 bg-amethyst/10 p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "px-1 text-[10px] font-medium uppercase tracking-[0.14em] text-amethyst",
								children: [
									"Hunt next · ",
									hunt.collection_size,
									" logged"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 px-1 text-xs leading-relaxed text-muted",
								children: hunt.clover_intro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 space-y-2",
								children: hunt.suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/explore/$id",
									params: { id: s.siteId },
									className: "block rounded-lg border border-line bg-void/50 p-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-medium text-fg",
												children: s.mineral_name
											}), s.distance_mi != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-[10px] text-cyan",
												children: [s.distance_mi, " mi"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-0.5 flex items-center gap-1 text-[11px] text-cyan",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-3" }),
												" ",
												s.hotspot_name
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11px] leading-relaxed text-muted",
											children: s.what_to_look_for
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-[11px] italic text-faint",
											children: s.why
										})
									]
								}, `${s.siteId}-${s.mineral_name}`))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onDismissHunt,
								className: "mt-1 w-full py-1 text-[11px] text-faint hover:text-muted",
								children: "Dismiss"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottomRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex items-center gap-1.5 border-t border-line px-2 py-2",
				onSubmit: (e) => {
					e.preventDefault();
					if (!draft.trim()) return;
					onSend(draft.trim());
					setDraft("");
				},
				children: [
					voiceSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onMic,
						"aria-label": "Talk",
						className: cn("grid size-10 shrink-0 place-items-center rounded-md", phase === "listening" ? "bg-cyan/20 text-cyan" : "text-muted hover:bg-fg/5 hover:text-fg"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: cn("size-4", phase === "listening" && "animate-pulse") })
					}),
					!voiceSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "ml-1 size-3.5 shrink-0 text-faint" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						placeholder: voiceSupported ? "Type, or tap the mic" : "Ask Clover a field question",
						className: "h-10 min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-faint"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !draft.trim() || phase === "thinking",
						"aria-label": "Send",
						className: "grid size-10 place-items-center rounded-md text-cyan disabled:opacity-30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 pb-2 text-center text-[10px] text-faint",
				children: PHASE_TEXT[phase]
			})
		]
	});
}
var SITES = [
	{
		id: "crater-diamonds",
		name: "Crater of Diamonds State Park",
		state: "Arkansas",
		region: "South",
		lat: 34.032,
		lng: -93.672,
		category: "state_park",
		access: "public",
		difficulty: "easy",
		finds: [
			"Quartz",
			"Pyrite",
			"Amethyst"
		],
		notes: "The only public diamond mine on Earth. Keep what you find. Plowed field over a lamproite pipe.",
		legality: "State park. Digging allowed in the search area. Keep any diamonds you find.",
		season: "Year-round. After rain is best."
	},
	{
		id: "hot-springs-quartz",
		name: "Ouachita Quartz Veins",
		state: "Arkansas",
		region: "South",
		lat: 34.51,
		lng: -93.05,
		category: "fee_dig",
		access: "fee",
		difficulty: "easy",
		finds: ["Quartz", "Smoky Quartz"],
		notes: "Clear quartz points from hydrothermal veins. Several commercial digs around Hot Springs and Mount Ida.",
		legality: "Pay-to-dig private mines. Stay on posted claims.",
		season: "Year-round."
	},
	{
		id: "herkimer",
		name: "Herkimer Diamond Mines",
		state: "New York",
		region: "Northeast",
		lat: 43.026,
		lng: -74.986,
		category: "fee_dig",
		access: "fee",
		difficulty: "moderate",
		finds: [
			"Quartz",
			"Calcite",
			"Dolomite"
		],
		notes: "Double-terminated quartz in Cambrian dolomite vugs. Bring a crack hammer and safety glasses.",
		legality: "Private pay-to-dig. Do not collect off-claim.",
		season: "April–November."
	},
	{
		id: "franklin-nj",
		name: "Franklin Mineral Dump",
		state: "New Jersey",
		region: "Northeast",
		lat: 41.122,
		lng: -74.581,
		category: "museum",
		access: "fee",
		difficulty: "easy",
		finds: [
			"Calcite",
			"Fluorite",
			"Garnet (Almandine)"
		],
		notes: "Fluorescent mineral capital of the world. Night collecting on the Buckwheat dump is the ritual.",
		legality: "Museum dump collecting during posted hours. UV lamps encouraged.",
		season: "April–October."
	},
	{
		id: "lake-superior",
		name: "Lake Superior Agate Shore",
		state: "Minnesota",
		region: "Midwest",
		lat: 47.05,
		lng: -91.67,
		category: "beach",
		access: "public",
		difficulty: "easy",
		finds: [
			"Agate",
			"Jasper",
			"Quartz"
		],
		notes: "Walk the North Shore after storms. Look for translucence, banding, and a waxy chalcedony luster.",
		legality: "Public beaches. Personal amounts only. No digging in parks.",
		season: "Spring through fall. After big storms."
	},
	{
		id: "keweenaw",
		name: "Keweenaw Copper Country",
		state: "Michigan",
		region: "Midwest",
		lat: 47.24,
		lng: -88.45,
		category: "historic_mine",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Agate",
			"Calcite",
			"Epidote"
		],
		notes: "Historic copper mine dumps and Lake Superior cobbles. Datolite and native copper are the prizes.",
		legality: "Public dumps and beaches. Respect private mine property.",
		season: "May–October."
	},
	{
		id: "emerald-hollow",
		name: "Emerald Hollow Mine",
		state: "North Carolina",
		region: "South",
		lat: 35.8,
		lng: -81.14,
		category: "fee_dig",
		access: "fee",
		difficulty: "easy",
		finds: [
			"Beryl (Emerald/Aquamarine)",
			"Quartz",
			"Garnet (Almandine)"
		],
		notes: "America's only emerald mine open to the public. Flume and creek collecting.",
		legality: "Fee dig. Keep what you find.",
		season: "Year-round, weather depending."
	},
	{
		id: "graves-mountain",
		name: "Graves Mountain",
		state: "Georgia",
		region: "South",
		lat: 33.73,
		lng: -82.73,
		category: "quarry",
		access: "fee",
		difficulty: "moderate",
		finds: [
			"Rutile",
			"Kyanite",
			"Pyrite"
		],
		notes: "World-class rutile and lazulite. Open-dig days are scheduled — watch the club calendar.",
		legality: "Managed open-dig events. No trespassing off-event.",
		season: "Scheduled weekends."
	},
	{
		id: "amelia",
		name: "Morefield Mine",
		state: "Virginia",
		region: "South",
		lat: 37.34,
		lng: -77.97,
		category: "pegmatite",
		access: "fee",
		difficulty: "easy",
		finds: [
			"Garnet (Almandine)",
			"Quartz",
			"Muscovite (Mica)"
		],
		notes: "Amazonite, spessartine, and mica books from a classic pegmatite.",
		legality: "Fee dig on private mine property.",
		season: "Spring–fall."
	},
	{
		id: "mt-antero",
		name: "Mount Antero",
		state: "Colorado",
		region: "Mountain",
		lat: 38.674,
		lng: -106.246,
		category: "alpine",
		access: "public",
		difficulty: "hard",
		finds: [
			"Beryl (Emerald/Aquamarine)",
			"Quartz",
			"Fluorite"
		],
		notes: "High-alpine aquamarine in granite. 4WD plus a lung-burning hike. Summer only.",
		legality: "National forest. Claims exist — do not collect on marked claims.",
		season: "July–September."
	},
	{
		id: "topaz-mountain",
		name: "Topaz Mountain",
		state: "Utah",
		region: "Mountain",
		lat: 39.7,
		lng: -113.1,
		category: "desert",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Topaz",
			"Beryl (Emerald/Aquamarine)",
			"Quartz"
		],
		notes: "Sherry topaz in rhyolite cavities. Bring water, a hat, and a crack hammer.",
		legality: "BLM land. Personal collecting. Claims nearby — stay off them.",
		season: "Spring and fall. Summer is brutal."
	},
	{
		id: "blanchard",
		name: "Blanchard Claims",
		state: "New Mexico",
		region: "Southwest",
		lat: 33.77,
		lng: -106.12,
		category: "fee_dig",
		access: "fee",
		difficulty: "moderate",
		finds: [
			"Fluorite",
			"Galena",
			"Barite"
		],
		notes: "Classic blue-green Blanchard fluorite cubes with galena. Desert hiking.",
		legality: "Collect through the Blanchard Rock Shop. Do not enter unescorted claims.",
		season: "October–April."
	},
	{
		id: "quartzsite",
		name: "Quartzsite Desert Fields",
		state: "Arizona",
		region: "Southwest",
		lat: 33.66,
		lng: -114.23,
		category: "desert",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Quartz",
			"Agate",
			"Jasper"
		],
		notes: "Winter collecting capital of the West. BLM land around town is the classroom.",
		legality: "BLM personal collecting. Watch for claims and desert tortoise habitat.",
		season: "November–March."
	},
	{
		id: "pala",
		name: "Pala Pegmatite District",
		state: "California",
		region: "West",
		lat: 33.365,
		lng: -117.076,
		category: "pegmatite",
		access: "permit",
		difficulty: "hard",
		finds: [
			"Tourmaline",
			"Beryl (Emerald/Aquamarine)",
			"Quartz"
		],
		notes: "World-class gem pegmatites. Most mines are private tours, not walk-up digs.",
		legality: "Private mines. Tour or permit only. No roadside collecting.",
		season: "Year-round tours."
	},
	{
		id: "jade-cove",
		name: "Jade Cove",
		state: "California",
		region: "West",
		lat: 35.88,
		lng: -121.46,
		category: "beach",
		access: "public",
		difficulty: "moderate",
		finds: ["Serpentine", "Jasper"],
		notes: "Pacific nephrite in cobbles. Tide-aware collecting on a steep Big Sur shore.",
		legality: "Los Padres National Forest. Personal amounts. Watch tides and poison oak.",
		season: "Year-round. Minus tides are best."
	},
	{
		id: "mojave",
		name: "Mojave Chalcedony Fields",
		state: "California",
		region: "West",
		lat: 35,
		lng: -116.2,
		category: "desert",
		access: "public",
		difficulty: "moderate",
		finds: [
			"Agate",
			"Jasper",
			"Quartz"
		],
		notes: "Wide BLM collecting for banded agate and desert pavement chalcedony. Heat is the real hazard.",
		legality: "BLM. Personal collecting. Stay off wilderness and claims.",
		season: "November–April."
	},
	{
		id: "richardson",
		name: "Richardson's Rock Ranch",
		state: "Oregon",
		region: "West",
		lat: 44.63,
		lng: -120.92,
		category: "fee_dig",
		access: "fee",
		difficulty: "easy",
		finds: ["Agate", "Jasper"],
		notes: "The thunder-egg classroom. Dig, cut, and polish on site.",
		legality: "Fee dig. Keep what you find.",
		season: "March–October."
	},
	{
		id: "maury",
		name: "Maury Mountain",
		state: "Oregon",
		region: "West",
		lat: 44.03,
		lng: -120.45,
		category: "fee_dig",
		access: "fee",
		difficulty: "easy",
		finds: ["Jasper", "Agate"],
		notes: "Moss and picture jasper from classic Central Oregon beds.",
		legality: "Fee or club trips. Confirm current land status before digging.",
		season: "Late spring–fall."
	},
	{
		id: "emerald-creek",
		name: "Emerald Creek Garnet Area",
		state: "Idaho",
		region: "West",
		lat: 47.02,
		lng: -116.32,
		category: "forest",
		access: "public",
		difficulty: "moderate",
		finds: ["Garnet (Almandine)"],
		notes: "USFS star-garnet collecting in a cold creek. Waders help.",
		legality: "National forest designated collecting area. Follow USFS rules.",
		season: "July–September."
	},
	{
		id: "wyoming-jade",
		name: "Granite Mountains Jade",
		state: "Wyoming",
		region: "Mountain",
		lat: 42.5,
		lng: -107.5,
		category: "desert",
		access: "public",
		difficulty: "hard",
		finds: ["Serpentine", "Quartz"],
		notes: "Historic nephrite jade fields. Remote, windy, and worth a long walk.",
		legality: "Mix of BLM and claims. Personal collecting off-claim only.",
		season: "May–October."
	},
	{
		id: "mason-topaz",
		name: "Mason County Topaz",
		state: "Texas",
		region: "South",
		lat: 30.75,
		lng: -99.23,
		category: "fee_dig",
		access: "fee",
		difficulty: "moderate",
		finds: ["Topaz", "Quartz"],
		notes: "Blue topaz in streambeds on private ranches. A Texas classic.",
		legality: "Ranch fee digs only. No public land collecting here.",
		season: "October–May."
	},
	{
		id: "hickory-creek",
		name: "Hickory Creek Gravel Bar",
		state: "Illinois",
		region: "Midwest",
		lat: 41.7938,
		lng: -87.8162,
		category: "gravel_bar",
		access: "public",
		difficulty: "easy",
		finds: [
			"Quartz",
			"Orthoclase (Potassium Feldspar)",
			"Muscovite (Mica)"
		],
		notes: "Seasonal bar along Hickory Creek. Best after spring flooding.",
		legality: "Public access along the waterway. Respect private banks.",
		season: "After spring floods."
	},
	{
		id: "salt-creek",
		name: "Salt Creek Public Beach",
		state: "Illinois",
		region: "Midwest",
		lat: 41.8456,
		lng: -87.9234,
		category: "beach",
		access: "public",
		difficulty: "easy",
		finds: ["Quartz", "Calcite"],
		notes: "Rocky shore with better finds after rain. Beginner-friendly.",
		legality: "Public park. Collection as posted.",
		season: "Spring–fall."
	},
	{
		id: "dunes",
		name: "Indiana Dunes Shore",
		state: "Indiana",
		region: "Midwest",
		lat: 41.65,
		lng: -87.07,
		category: "beach",
		access: "public",
		difficulty: "easy",
		finds: ["Quartz", "Agate"],
		notes: "Lake Michigan sand and occasional banded pebbles. Walk, don't dig dunes.",
		legality: "State and national park rules. No collecting in protected dune habitat.",
		season: "Year-round beaches."
	}
];
var SITE_BY_ID = Object.fromEntries(SITES.map((s) => [s.id, s]));
function projectSite(lat, lng) {
	const x = (lng + 124.8) / 58.5 * 100;
	const y = (49.2 - lat) / 25.2 * 100;
	return {
		x: Math.min(96, Math.max(4, x)),
		y: Math.min(92, Math.max(6, y))
	};
}
var HAZARDS = {
	state_park: ["Heat", "Sun"],
	fee_dig: ["Flying chips", "Uneven ground"],
	beach: ["Tide", "Cliff edges"],
	desert: [
		"Heat",
		"Water",
		"Rattlesnakes"
	],
	pegmatite: ["Loose rock", "Steep cuts"],
	quarry: ["Falling rock", "Blasting zones"],
	museum: ["None"],
	alpine: [
		"Altitude",
		"Weather",
		"Ice"
	],
	historic_mine: ["Unstable ground", "Shafts"],
	forest: ["Ticks", "Deadfall"],
	outcrop: ["Loose scree", "Exposure"],
	gravel_bar: ["Current", "Undercut banks"]
};
function siteHazards(category) {
	return HAZARDS[category] ?? ["Verify conditions"];
}
function distanceMi(lat1, lng1, lat2, lng2) {
	const R = 3959;
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLng = (lng2 - lng1) * Math.PI / 180;
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function suggestHunt(input) {
	const owned = new Set(input.collection.map((n) => n.toLowerCase()));
	const scored = [];
	for (const site of SITES) {
		const dist = input.lat != null && input.lng != null ? Math.round(distanceMi(input.lat, input.lng, site.lat, site.lng)) : null;
		for (const find of site.finds) {
			if (owned.has(find.toLowerCase())) continue;
			const mineral = findMineralByName(find);
			let score = 4;
			if (site.access === "public") score += 2;
			if (site.difficulty === "easy") score += 1;
			if (dist != null) score += Math.max(0, 8 - dist / 120);
			if (mineral && mineral.rarity !== "common") score += 1;
			scored.push({
				mineral_name: find,
				hotspot_name: `${site.name}, ${site.state}`,
				distance_mi: dist,
				difficulty: site.difficulty,
				what_to_look_for: mineral?.keyFeatures[0] ?? site.notes,
				why: `You don't have ${find} yet, and ${site.name} is a mapped ${site.access} locality.`,
				siteId: site.id,
				score
			});
		}
	}
	scored.sort((a, b) => b.score - a.score);
	const seen = /* @__PURE__ */ new Set();
	const suggestions = [];
	for (const row of scored) {
		const key = row.mineral_name.toLowerCase();
		if (seen.has(key)) continue;
		seen.add(key);
		suggestions.push(row);
		if (suggestions.length >= 3) break;
	}
	return {
		clover_intro: suggestions.length ? `${input.name}, I'd hunt these next — gaps in your cabinet that actually occur at mapped sites. Verify land status on the ground.` : `${input.name}, your cabinet already covers the mapped finds. Open Mineralpedia and pick a new family to chase.`,
		suggestions,
		collection_size: input.collection.length
	};
}
var ROUTE_TIPS = {
	"/": [
		"Tap the orb to talk. I'm Clover — field mineralogy, packing, land-status caution.",
		"Every specimen has a legal path. Collect, leave it, or just observe.",
		"Ask me a lookalike question. Pyrite vs gold never gets old."
	],
	"/explore": [
		"Public land is not the same as a free-for-all. Check the site card before you dig.",
		"Creek beds after a storm. That's when the gravels reshuffle.",
		"Granite outcrops often hide quartz veins on the contact."
	],
	"/vault": ["GeoDex is the cabinet. Provenance is the value.", "Sort by rarity if you want the crown jewel. Sort by family if you want science."],
	"/market": ["Rarity on a listing is a claim, not a lab report. Ask for the tests.", "Provenance adds real value. A pretty rock without a story is just inventory."],
	"/quests": ["Daily quests reset at midnight. Streaks compound the XP.", "One scan, one log, one map look. That's a complete field day."],
	"/pedia": ["Mineralpedia is the field memory. Open a species before you trust a hunch."],
	"/community": ["The feed is other rockhounds. Don't post exact GPS for sensitive sites."]
};
var DEFAULT_TIPS = ["Tap me — I'm Clover, your field AGI.", "The ground is hiding something. Ask me how to test it."];
var HIDDEN_PREFIX = ["/identify", "/clover"];
function FloatingCloverOrb() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const onboarded = useField((s) => s.onboarded);
	const openerSeen = useField((s) => s.openerSeen);
	const fieldMode = useField((s) => s.fieldMode);
	const messages = useField((s) => s.clover);
	const clover = useCloverConversation();
	const [tip, setTip] = (0, import_react.useState)("");
	const [showTip, setShowTip] = (0, import_react.useState)(false);
	const [hunt, setHunt] = (0, import_react.useState)(null);
	const [huntLoading, setHuntLoading] = (0, import_react.useState)(false);
	const tipTimer = (0, import_react.useRef)(null);
	const hidden = !onboarded || !openerSeen || HIDDEN_PREFIX.some((r) => pathname === r || pathname.startsWith(`${r}/`)) || pathname === "/" && !fieldMode;
	(0, import_react.useEffect)(() => {
		if (hidden || clover.open) {
			setShowTip(false);
			return;
		}
		const pick = () => {
			const pool = ROUTE_TIPS[pathname] ?? DEFAULT_TIPS;
			return pool[Math.floor(Math.random() * pool.length)] ?? DEFAULT_TIPS[0];
		};
		const arrival = window.setTimeout(() => {
			setTip(pick());
			setShowTip(true);
			tipTimer.current = window.setTimeout(() => setShowTip(false), 4200);
		}, 2800);
		const periodic = window.setInterval(() => {
			if (clover.open) return;
			setTip(pick());
			setShowTip(true);
			if (tipTimer.current) window.clearTimeout(tipTimer.current);
			tipTimer.current = window.setTimeout(() => setShowTip(false), 3800);
		}, 42e3);
		return () => {
			window.clearTimeout(arrival);
			window.clearInterval(periodic);
			if (tipTimer.current) window.clearTimeout(tipTimer.current);
		};
	}, [
		pathname,
		hidden,
		clover.open
	]);
	function handleTap() {
		setShowTip(false);
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
				collection: clover.companion.collection,
				name: clover.companion.name,
				lat,
				lng
			}));
		} finally {
			setHuntLoading(false);
		}
	}
	if (hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed z-[35] flex flex-col items-end",
		style: {
			bottom: "calc(5.75rem + env(safe-area-inset-bottom, 0px))",
			right: 14
		},
		children: [
			clover.open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto mb-3 rh-rise",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloverVoicePanel, {
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
			}),
			!clover.open && showTip && tip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "orb-tip pointer-events-none mb-3 max-w-52 rh-rise",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "orb-tip-dot",
					"data-mood": clover.companion.mood
				}), tip]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: handleTap,
				"aria-label": clover.open ? "Talk to Clover" : "Open Clover, the field AGI",
				className: "pointer-events-auto relative transition-transform duration-150 ease-out active:scale-[0.96]",
				style: {
					width: clover.open ? 58 : 56,
					height: clover.open ? 58 : 56
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidMetalOrb, {
					size: clover.open ? 58 : 56,
					state: clover.phase,
					level: clover.companion.level
				})
			})
		]
	});
}
var TABS = [
	{
		to: "/explore",
		label: "Map",
		icon: Map
	},
	{
		to: "/vault",
		label: "GeoDex",
		icon: Gem
	},
	{
		to: "/identify",
		label: "Scan",
		icon: Sparkles,
		center: true
	},
	{
		to: "/community",
		label: "Feed",
		icon: MessageSquare
	},
	{
		to: "/market",
		label: "Market",
		icon: ShoppingBag
	}
];
var MENU = [
	{
		to: "/",
		label: "Command hub",
		icon: House
	},
	{
		to: "/pedia",
		label: "Mineralpedia",
		icon: BookOpen
	},
	{
		to: "/quests",
		label: "Daily quests",
		icon: Target
	},
	{
		to: "/trips",
		label: "Trip planner",
		icon: Compass
	},
	{
		to: "/safety",
		label: "Safety & land",
		icon: Shield
	},
	{
		to: "/clover",
		label: "Clover AGI",
		icon: Sparkles
	},
	{
		to: "/profile",
		label: "Progress",
		icon: User
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [menu, setMenu] = (0, import_react.useState)(false);
	const onboarded = useField((s) => s.onboarded);
	const openerSeen = useField((s) => s.openerSeen);
	const fieldMode = useField((s) => s.fieldMode);
	const setFieldMode = useField((s) => s.setFieldMode);
	(0, import_react.useEffect)(() => {
		useField.getState().hydrateDay();
	}, []);
	(0, import_react.useEffect)(() => {
		setMenu(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-mode": fieldMode ? "field" : "home",
		className: "min-h-dvh bg-void text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rh-grain min-h-dvh",
			children: [
				!onboarded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {}),
				onboarded && !openerSeen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicOpener, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-30 border-b border-line bg-void/80 backdrop-blur-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-14 max-w-lg items-center gap-3 px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": menu ? "Close menu" : "Open menu",
								onClick: () => setMenu((v) => !v),
								className: "grid size-11 place-items-center rounded-md text-muted hover:bg-fg/5 hover:text-fg",
								children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex min-w-0 flex-1 items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[17px] font-semibold tracking-tight text-fg",
									children: "RockHound"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-[17px] font-semibold text-amethyst",
									children: "GO"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFieldMode(!fieldMode),
								className: cn("h-8 rounded-full border px-3 text-[10px] font-medium uppercase tracking-[0.14em]", fieldMode ? "border-field/40 bg-field/15 text-field" : "border-line text-muted hover:text-fg"),
								children: fieldMode ? "Field" : "Hub"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/clover",
								"aria-label": "Clover",
								className: "grid size-11 place-items-center rounded-md text-cyan hover:bg-cyan/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
							})
						]
					})
				}),
				menu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-40 bg-void/70",
					onClick: () => setMenu(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "absolute left-0 top-14 w-[min(100%,20rem)] border-r border-line bg-obsidian p-3 pb-8 shadow-panel",
						onClick: (e) => e.stopPropagation(),
						children: [MENU.map((item) => {
							const Icon = item.icon;
							const active = pathname === item.to;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex min-h-12 items-center gap-3 rounded-md px-3 text-sm", active ? "bg-fg/10 text-fg" : "text-muted hover:bg-fg/5 hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-center gap-2 px-3 text-[10px] uppercase tracking-[0.14em] text-faint",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-3" }), " Local cache · no account"]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-lg px-4 pb-28 pt-5",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingCloverOrb, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-void/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex max-w-lg items-end px-2",
						children: TABS.map((tab) => {
							const Icon = tab.icon;
							const active = pathname === tab.to || pathname.startsWith(`${tab.to}/`);
							if ("center" in tab && tab.center) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: tab.to,
								"aria-label": "Scan specimen",
								className: "-mt-5 flex flex-1 flex-col items-center gap-1 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-14 place-items-center rounded-full border border-gold/50 bg-gold text-void shadow-[0_8px_24px_rgb(212_175_55_/_0.28)]", active && "ring-2 ring-gold/40"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-medium uppercase tracking-[0.14em] text-gold",
									children: "Scan"
								})]
							}, tab.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: tab.to,
								className: "flex min-h-[64px] flex-1 flex-col items-center justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-[18px]", active ? "text-fg" : "text-faint") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-[10px] font-medium uppercase tracking-[0.12em]", active ? "text-fg" : "text-faint"),
									children: tab.label
								})]
							}, tab.to);
						})
					})
				})
			]
		})
	});
}
function XpRibbon() {
	const xp = useField((s) => s.xp);
	const streak = useField((s) => s.streak);
	const collector = useField((s) => s.collectorXp);
	const steward = useField((s) => s.stewardXp);
	const scientist = useField((s) => s.scientistXp);
	const explorer = useField((s) => s.explorerXp);
	const { level, pct, into, need } = xpToNext(xp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rh-panel rh-hairline rounded-xl px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-[11px] text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-sm text-fg",
					children: ["Level ", level]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [
						into,
						"/",
						need,
						" XP · ",
						streak,
						"d streak"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-1.5 overflow-hidden rounded-full bg-fg/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-amethyst",
					style: { width: `${Math.round(pct * 100)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-4 gap-1 text-center text-[9px] uppercase tracking-[0.12em] text-faint",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block tabular-nums text-fg",
						children: collector ?? 0
					}), "Collector"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block tabular-nums text-field",
						children: steward ?? 0
					}), "Steward"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block tabular-nums text-cyan",
						children: scientist ?? 0
					}), "Scientist"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block tabular-nums text-gold",
						children: explorer ?? 0
					}), "Explorer"] })
				]
			})
		]
	});
}
var styles_default = "/assets/styles-Bf6l7l9Q.css";
var APP_NAME = "RockHound-GO";
var Route$15 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "AI mineral identification, rockhounding map, specimen vault, and field tools. The operating system for modern rockhounding."
			},
			{
				name: "theme-color",
				content: "#07060F"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;600&family=Syne:wght@500;600;700&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-void text-fg antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center",
					toastOptions: { style: {
						background: "#171427",
						border: "1px solid rgb(236 232 247 / 0.12)",
						color: "#ece8f7"
					} }
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$14 = () => import("./routes-Dg7JDjiq.mjs");
var Route$14 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./clover-BrJA-2hm.mjs");
var Route$13 = createFileRoute("/clover")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./community-DukazXae.mjs");
var Route$12 = createFileRoute("/community")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./explore-jwvQhNSq.mjs");
var Route$11 = createFileRoute("/explore")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./identify-DxGGnXIR.mjs");
var Route$10 = createFileRoute("/identify")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./market-DrLa_Gdz.mjs");
var Route$9 = createFileRoute("/market")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./pedia-_qlJvo1e.mjs");
var Route$8 = createFileRoute("/pedia")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./profile-CAmAZAmd.mjs");
var Route$7 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./quests-DUavXFRV.mjs");
var Route$6 = createFileRoute("/quests")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./safety-BXQQRn_U.mjs");
var Route$5 = createFileRoute("/safety")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./trips-Dk2yO-FN.mjs");
var Route$4 = createFileRoute("/trips")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./vault-Dkc2mAtv.mjs");
var Route$3 = createFileRoute("/vault")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./explore._id-DaGwq5cW.mjs");
var Route$2 = createFileRoute("/explore/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./pedia._id-CkmkqlRv.mjs");
var Route$1 = createFileRoute("/pedia/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./vault._id-C_aRkxN6.mjs");
var Route = createFileRoute("/vault/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var CloverRoute = Route$13.update({
	id: "/clover",
	path: "/clover",
	getParentRoute: () => Route$15
});
var CommunityRoute = Route$12.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => Route$15
});
var ExploreRoute = Route$11.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => Route$15
});
var IdentifyRoute = Route$10.update({
	id: "/identify",
	path: "/identify",
	getParentRoute: () => Route$15
});
var MarketRoute = Route$9.update({
	id: "/market",
	path: "/market",
	getParentRoute: () => Route$15
});
var PediaRoute = Route$8.update({
	id: "/pedia",
	path: "/pedia",
	getParentRoute: () => Route$15
});
var ProfileRoute = Route$7.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$15
});
var QuestsRoute = Route$6.update({
	id: "/quests",
	path: "/quests",
	getParentRoute: () => Route$15
});
var SafetyRoute = Route$5.update({
	id: "/safety",
	path: "/safety",
	getParentRoute: () => Route$15
});
var TripsRoute = Route$4.update({
	id: "/trips",
	path: "/trips",
	getParentRoute: () => Route$15
});
var VaultRoute = Route$3.update({
	id: "/vault",
	path: "/vault",
	getParentRoute: () => Route$15
});
var ExploreIdRoute = Route$2.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ExploreRoute
});
var PediaIdRoute = Route$1.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => PediaRoute
});
var VaultIdRoute = Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => VaultRoute
});
var ExploreRouteChildren = { ExploreIdRoute };
var ExploreRouteWithChildren = ExploreRoute._addFileChildren(ExploreRouteChildren);
var PediaRouteChildren = { PediaIdRoute };
var PediaRouteWithChildren = PediaRoute._addFileChildren(PediaRouteChildren);
var VaultRouteChildren = { VaultIdRoute };
var rootRouteChildren = {
	IndexRoute,
	CloverRoute,
	CommunityRoute,
	ExploreRoute: ExploreRouteWithChildren,
	IdentifyRoute,
	MarketRoute,
	PediaRoute: PediaRouteWithChildren,
	ProfileRoute,
	QuestsRoute,
	SafetyRoute,
	TripsRoute,
	VaultRoute: VaultRoute._addFileChildren(VaultRouteChildren)
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { suggestHunt as _, Route$1 as a, SITE_BY_ID as c, identifySpecimen as d, matchFieldKey as f, siteHazards as g, router_exports as h, Route as i, XpRibbon as l, projectSite as m, LiquidMetalOrb as n, Route$2 as o, mineralToResult as p, MOOD_LABEL as r, SITES as s, CloverVoicePanel as t, getRouter as u, useCloverConversation as v };
