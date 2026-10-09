import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react, a as HeadContent, c as createRouter, d as createFileRoute, f as createRootRoute, g as notFound, h as require_jsx_runtime, i as Scripts, l as Outlet, o as useRouterState, p as Link, u as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { n as MINERAL_BY_ID, r as findMineralByName, t as MINERALS } from "./minerals-E6H8ZwFP.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as object, i as number, n as array, s as string, t as _enum } from "../_libs/zod.mjs";
import { C as Gem, E as Compass, O as Camera, S as House, _ as Map, a as TriangleAlert, c as Sparkles, g as Menu, h as MessageSquare, j as BookOpen, l as ShoppingBag, n as WifiOff, r as User, s as Target, t as X, u as Shield, v as Lock } from "../_libs/lucide-react.mjs";
import { S as cn, d as migrateLegacyPhotos, g as Button, h as xpToNext, m as useField, n as SITES, r as SITE_BY_ID, w as todayKey, x as CrystalGem } from "./router-CMQznpBx2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-BCed6diZ.js
/**
* Per-route <head> builder. Canonical origin is rhgo.me.
* Emits title, description, robots, canonical, Open Graph / Twitter share
* tags and JSON-LD for public pages; private pages get noindex only.
*/
var SITE_URL = "https://rhgo.me";
var SITE_NAME = "RockHound GO";
var SHARE_IMAGE = `${SITE_URL}/og.jpg`;
/** Trim to a search-snippet length on a word boundary. */
function clamp(text, max = 158) {
	const t = text.replace(/\s+/g, " ").trim();
	if (t.length <= max) return t;
	const cut = t.slice(0, max - 1);
	return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 40))}…`;
}
function canonicalUrl(path) {
	return `${SITE_URL}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
}
function pageHead({ title, description, path, noindex, jsonLd }) {
	const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
	const meta = [
		{ title: fullTitle },
		{
			name: "description",
			content: description
		},
		{
			name: "robots",
			content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
		}
	];
	if (!noindex) {
		const url = canonicalUrl(path);
		meta.push({
			property: "og:type",
			content: "website"
		}, {
			property: "og:site_name",
			content: SITE_NAME
		}, {
			property: "og:title",
			content: fullTitle
		}, {
			property: "og:description",
			content: description
		}, {
			property: "og:url",
			content: url
		}, {
			property: "og:image",
			content: SHARE_IMAGE
		}, {
			property: "og:image:width",
			content: "1200"
		}, {
			property: "og:image:height",
			content: "630"
		}, {
			property: "og:image:alt",
			content: "RockHound GO — field companion for rockhounds"
		}, {
			name: "twitter:card",
			content: "summary_large_image"
		}, {
			name: "twitter:title",
			content: fullTitle
		}, {
			name: "twitter:description",
			content: description
		}, {
			name: "twitter:image",
			content: SHARE_IMAGE
		});
	}
	return {
		meta,
		links: noindex ? [] : [{
			rel: "canonical",
			href: canonicalUrl(path)
		}],
		scripts: noindex ? [] : (jsonLd ? Array.isArray(jsonLd) ? jsonLd : [jsonLd] : []).map((block) => ({
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				...block
			}).replace(/</g, "\\u003c")
		}))
	};
}
/** Private pages share one description and are never indexed. */
function privateHead(title, path) {
	return pageHead({
		title,
		path,
		noindex: true,
		description: "Private to this device."
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CMQznpBx.js
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
/** Router-wide 404. The server responds with HTTP 404 when this renders. */
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				name: "robots",
				content: "noindex, nofollow"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-14 place-items-center rounded-full border border-line-strong text-frost",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] uppercase tracking-[0.18em] text-amber",
				children: "404 · off the map"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl text-fg",
				children: "No outcrop here"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-xs text-sm text-muted",
				children: "That page doesn't exist. Head back to the hub or open the field map."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex min-h-12 items-center rounded-md bg-gold px-5 text-sm font-medium text-void focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void",
					children: "Command hub"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/explore",
					className: "inline-flex min-h-12 items-center rounded-md border border-line-strong px-5 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void",
					children: "Field map"
				})]
			})
		]
	});
}
function CinematicOpener() {
	const mark = useField((s) => s.markOpenerSeen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-void p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rh-rise max-w-sm text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
					hue: "#f5b642",
					system: "trigonal",
					size: 96,
					className: "mx-auto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-[12px] font-medium uppercase tracking-[0.28em] text-frost",
					children: "Field intelligence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl tracking-tight text-fg",
					children: "RockHound GO"
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
					className: "text-[12px] font-medium uppercase tracking-[0.2em] text-frost",
					children: "RockHound GO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid size-12 place-items-center rounded-lg border border-line bg-stone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-gold" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-[12px] uppercase tracking-[0.18em] text-faint",
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
						className: "text-[12px] uppercase tracking-[0.16em] text-faint",
						children: "What should we call you"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Field name",
						className: "mt-2 h-11 w-full rounded-md border border-line-strong bg-void px-3 text-sm text-fg outline-none placeholder:text-faint focus:border-frost"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex items-center gap-2",
					children: SLIDES.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1 flex-1 rounded-full ${idx <= i ? "bg-frost" : "bg-fg/10"}` }, idx))
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
var VS = `
attribute vec2 a_pos;
varying vec2 vUv;
void main() {
  vUv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;
var FS = `
precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform float u_intensity;
uniform float u_hue;
uniform float u_speed;
uniform float u_bio;
uniform vec2 u_res;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p *= 2.03;
    a *= 0.52;
  }
  return v;
}

void main() {
  vec2 uv = vUv - 0.5;
  float d = length(uv);
  if (d > 0.5) { gl_FragColor = vec4(0.0); return; }

  float t = u_time * u_speed;

  float ang = t * 0.22 + d * 1.4;
  float ca = cos(ang), sa = sin(ang);
  vec2 q = mat2(ca, -sa, sa, ca) * uv * 2.15;

  vec2 w1 = vec2(fbm(q + vec2(t * 0.31, t * 0.19)), fbm(q + vec2(-t * 0.24, t * 0.27) + 4.1));
  vec2 w2 = vec2(fbm(q + 1.85 * w1 + vec2(t * 0.28, 0.05)), fbm(q + 1.85 * w1 + vec2(0.0, -t * 0.33) + 2.7));
  float flow = fbm(q + 2.4 * w2);

  float band = flow * 5.2 + t * 0.55 + u_hue + length(w2) * 1.1;
  float h = fract(0.78 + 0.16 * sin(band) + w1.x * 0.12);
  float pool = smoothstep(0.12, 0.92, flow);
  float shimmer = 0.5 + 0.5 * sin(flow * 9.0 + t * 1.6);

  vec3 oil = hsv2rgb(vec3(h, 0.72, (pool * 0.62 + shimmer * 0.22) * u_intensity));

  float crown = smoothstep(0.42, 0.0, length(uv - vec2(-0.16, 0.20)));
  vec3 chrome = mix(vec3(0.05, 0.04, 0.10), vec3(0.32, 0.30, 0.48), crown);
  chrome = mix(chrome, vec3(0.70, 0.82, 0.92), crown * crown * 0.5);

  float fres = pow(smoothstep(0.18, 0.5, d), 1.6);
  vec3 rim = hsv2rgb(vec3(fract(0.72 + t * 0.08 + u_hue), 0.45, 0.95));

  vec3 col = chrome + oil * 0.78 + rim * fres * 0.42;

  float core = smoothstep(0.16, 0.0, length(uv - vec2(0.02, 0.01)));

  // Cold light from inside — ~480nm cyan, like dinoflagellates / photophores.
  float breath = 0.55 + 0.45 * sin(t * 2.15);
  float dusk = 0.55 + 0.45 * sin(t * 0.62 + 1.4);
  vec3 bio = mix(vec3(0.18, 0.95, 0.88), vec3(0.42, 1.0, 0.58), dusk);

  // Comb-row / mycelial filaments along the liquid ridges
  float ridge = abs(sin(flow * 13.5 + t * 0.85));
  float vein = pow(smoothstep(0.55, 0.98, ridge), 2.4) * (0.28 + 0.72 * breath);

  // Discrete photophores that wander and flash independently
  float photos = 0.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    vec2 seed = vec2(fi * 1.17, fi * 0.73);
    vec2 p = vec2(hash(seed), hash(seed.yx + 2.4)) - 0.5;
    p *= 0.58;
    p += 0.13 * vec2(sin(t * 0.34 + fi), cos(t * 0.27 + fi * 1.37));
    float pl = length(p);
    if (pl > 0.40) p *= 0.40 / pl;
    float rad = 0.016 + 0.014 * hash(seed + 8.1);
    float flash = sin(t * (1.55 + fi * 0.33) + fi * 1.7);
    flash = pow(max(flash, 0.0), 5.0);
    photos += smoothstep(rad * 2.6, 0.0, length(uv - p)) * (0.22 + flash * 1.15);
  }

  // Drifting motes (plankton)
  float motes = 0.0;
  for (int j = 0; j < 7; j++) {
    float fj = float(j);
    vec2 m = vec2(hash(vec2(fj, 3.1)), hash(vec2(9.4, fj))) - 0.5;
    m += 0.22 * vec2(sin(t * 0.21 + fj * 0.9), cos(t * 0.18 + fj * 1.2));
    m *= 0.72;
    motes += smoothstep(0.012, 0.0, length(uv - m));
  }

  float emit = (vein * 0.7 + photos * 1.05 + motes * 0.55 + core * 0.3) * u_bio * u_intensity;
  col += bio * emit;
  col += bio * emit * emit * 0.9;

  // Subsurface scatter — light blooms through the metal, strongest at center
  float sss = (1.0 - smoothstep(0.0, 0.48, d)) * emit * 0.35;
  col += bio * sss;

  float shade = smoothstep(0.5, 0.08, d);
  col *= mix(0.48, 1.0, shade);

  float a = smoothstep(0.5, 0.455, d);
  gl_FragColor = vec4(col, a);
}
`;
function compile(gl, type, src) {
	const sh = gl.createShader(type);
	if (!sh) return null;
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		gl.deleteShader(sh);
		return null;
	}
	return sh;
}
var STATE = {
	idle: {
		hue: 0,
		speed: .55,
		intensity: 1,
		bio: .9
	},
	resting: {
		hue: .02,
		speed: .38,
		intensity: .88,
		bio: .55
	},
	listening: {
		hue: -.16,
		speed: .9,
		intensity: 1.1,
		bio: 1.25
	},
	thinking: {
		hue: -.08,
		speed: 1.15,
		intensity: 1.05,
		bio: 1.05
	},
	speaking: {
		hue: .05,
		speed: 1.32,
		intensity: 1.18,
		bio: 1.4
	}
};
function OpalShader({ state = "idle" }) {
	const canvasRef = (0, import_react.useRef)(null);
	const stateRef = (0, import_react.useRef)(state);
	stateRef.current = state;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const gl = canvas.getContext("webgl", {
			alpha: true,
			antialias: true,
			premultipliedAlpha: false
		});
		if (!gl) return;
		const vs = compile(gl, gl.VERTEX_SHADER, VS);
		const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
		if (!vs || !fs) return;
		const prog = gl.createProgram();
		if (!prog) return;
		gl.attachShader(prog, vs);
		gl.attachShader(prog, fs);
		gl.linkProgram(prog);
		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
		gl.useProgram(prog);
		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1
		]), gl.STATIC_DRAW);
		const loc = gl.getAttribLocation(prog, "a_pos");
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
		const uTime = gl.getUniformLocation(prog, "u_time");
		const uInt = gl.getUniformLocation(prog, "u_intensity");
		const uHue = gl.getUniformLocation(prog, "u_hue");
		const uSpeed = gl.getUniformLocation(prog, "u_speed");
		const uBio = gl.getUniformLocation(prog, "u_bio");
		const uRes = gl.getUniformLocation(prog, "u_res");
		let raf = 0;
		let alive = true;
		const t0 = performance.now();
		let last = 0;
		const resize = () => {
			const parent = canvas.parentElement;
			const w = parent?.clientWidth || 160;
			const h = parent?.clientHeight || 160;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.max(32, Math.floor(w * dpr));
			canvas.height = Math.max(32, Math.floor(h * dpr));
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.uniform2f(uRes, canvas.width, canvas.height);
		};
		resize();
		const ro = new ResizeObserver(resize);
		if (canvas.parentElement) ro.observe(canvas.parentElement);
		const draw = (now) => {
			if (!alive) return;
			raf = requestAnimationFrame(draw);
			if (reduce && last > 0) return;
			if (now - last < 30) return;
			last = now;
			const st = STATE[stateRef.current] ?? STATE.idle;
			gl.uniform1f(uTime, (now - t0) / 1e3);
			gl.uniform1f(uInt, st.intensity);
			gl.uniform1f(uHue, st.hue);
			gl.uniform1f(uSpeed, st.speed);
			gl.uniform1f(uBio, st.bio);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		};
		raf = requestAnimationFrame(draw);
		const onHide = () => {
			if (document.hidden) cancelAnimationFrame(raf);
			else raf = requestAnimationFrame(draw);
		};
		document.addEventListener("visibilitychange", onHide);
		return () => {
			alive = false;
			cancelAnimationFrame(raf);
			document.removeEventListener("visibilitychange", onHide);
			ro.disconnect();
			gl.deleteProgram(prog);
			gl.deleteShader(vs);
			gl.deleteShader(fs);
			gl.deleteBuffer(buf);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "orb-shader",
		"aria-hidden": true
	});
}
function growthTier(level) {
	if (level < 3) return 1;
	if (level < 5) return 2;
	return 3;
}
function LiquidMetalOrb({ size = 140, state = "idle", level = 1, className, interactive = true }) {
	const wrapRef = (0, import_react.useRef)(null);
	const poseRef = (0, import_react.useRef)(null);
	const pose = (0, import_react.useRef)({
		x: 0,
		y: 0,
		s: 1
	});
	const pointer = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const stateRef = (0, import_react.useRef)(state);
	stateRef.current = state;
	const tier = growthTier(level);
	const mini = size < 80;
	(0, import_react.useEffect)(() => {
		const el = wrapRef.current;
		const poseEl = poseRef.current;
		if (!el || !poseEl) return;
		let raf = 0;
		let alive = true;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const onMove = (e) => {
			pointer.current.x = e.clientX;
			pointer.current.y = e.clientY;
		};
		if (interactive && !mini) window.addEventListener("pointermove", onMove);
		const tick = (now) => {
			if (!alive) return;
			raf = requestAnimationFrame(tick);
			if (reduce) return;
			const t = now * .001;
			const st = stateRef.current;
			const wobX = Math.sin(t * .7) * 3.2;
			const wobY = Math.cos(t * .53) * 2.6;
			const breath = 1 + Math.sin(t * (st === "speaking" ? 2.4 : st === "listening" ? 1.6 : .85)) * .018;
			let leanX = 0;
			let leanY = 0;
			if (interactive && !mini) {
				const r = el.getBoundingClientRect();
				const dx = (pointer.current.x - (r.left + r.width / 2)) / Math.max(r.width, 1);
				const dy = (pointer.current.y - (r.top + r.height / 2)) / Math.max(r.height, 1);
				leanX = Math.max(-10, Math.min(10, dx * 8));
				leanY = Math.max(-8, Math.min(8, dy * 6));
			}
			const p = pose.current;
			p.x += (leanX + wobX - p.x) * .12;
			p.y += (leanY + wobY - p.y) * .12;
			p.s += (breath - p.s) * .16;
			poseEl.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.s})`;
		};
		raf = requestAnimationFrame(tick);
		return () => {
			alive = false;
			cancelAnimationFrame(raf);
			window.removeEventListener("pointermove", onMove);
		};
	}, [interactive, mini]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		"data-state": state,
		className: cn("orb-shell", mini && "orb-shell-mini", className),
		style: {
			width: size,
			height: size
		},
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-glow-bio" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-glow-mid" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-glow-core" }),
			!mini && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "orb-motes",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				]
			}),
			tier >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "orb-ring orb-ring-a",
				viewBox: "0 0 240 240",
				width: size * 1.22,
				height: size * 1.22,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "120,18 210,72 210,168 120,222 30,168 30,72",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.2"
				})
			}),
			tier >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "orb-ring orb-ring-b",
				viewBox: "0 0 240 240",
				width: size * 1.38,
				height: size * 1.38,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "120,8 218,66 218,174 120,232 22,174 22,66",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "0.8"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: poseRef,
				className: "orb-pose",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "orb-body",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpalShader, { state }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-film" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-film-counter" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-caustic" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-rim" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-spec" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-glint" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb-ripple" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb-ripple delay-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orb-ripple delay-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb-iris" })
					]
				})
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
var IdentifyInput = object({
	imageDataUrl: string().max(2e6).regex(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/),
	notes: string().max(300).optional(),
	locality: string().max(120).optional()
});
var identifySpecimen = createServerFn({ method: "POST" }).validator((input) => IdentifyInput.parse(input)).handler(createSsrRpc("7e21a7c7dfbe6a11dec545ec79c9ac91890a8f328b0decb36744ebd1fc131d3a"));
var CloverInput = object({
	question: string().min(1).max(800),
	history: array(object({
		role: _enum(["user", "assistant"]),
		text: string().max(800)
	})).max(16).optional(),
	companion: object({
		name: string().max(40),
		level: number().int().min(0).max(1e3),
		mood: string().max(24),
		energy: number().min(0).max(100),
		streak: number().int().min(0).max(1e5),
		todaysFinds: number().int().min(0).max(1e4),
		collection: array(string().max(60)).max(16)
	}).optional(),
	mode: _enum(["voice", "text"]).optional()
});
var askClover = createServerFn({ method: "POST" }).validator((input) => CloverInput.parse(input)).handler(createSsrRpc("c70c46c50fe1438464e51a0cdbbd58cd880dd95e147db9e66685ea9eb551bf66"));
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
var SpeakInput = object({ text: string().min(1).max(800) });
var TranscribeInput = object({ audioDataUrl: string().max(28e5).regex(/^data:audio\/(webm|ogg|mp4|mpeg|wav|x-m4a)(;codecs=[A-Za-z0-9.,=-]+)?;base64,[A-Za-z0-9+/=]+$/) });
var speakClover = createServerFn({ method: "POST" }).validator((input) => SpeakInput.parse(input)).handler(createSsrRpc("b2e0318fa02b334f5ed76157bb1657ac522da5d9d53a2faa5ef81db85048b334"));
var transcribeClover = createServerFn({ method: "POST" }).validator((input) => TranscribeInput.parse(input)).handler(createSsrRpc("042763fd345a97f0345dc0cd42b9436661ff0d26a355cf8c24dd7b66626f4b22"));
var SILENCE_MS = 1400;
var MAX_RECORD_MS = 14e3;
var WAIT_SPEECH_MS = 9e3;
var VOICE_RMS = .038;
var BARGE_RMS = .11;
var BARGE_HOLD_MS = 220;
function getSpeechRecognition() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function pickBrowserVoice(voices) {
	const score = (v) => {
		const n = v.name.toLowerCase();
		let s = 0;
		if (/en[-_]?us/i.test(v.lang)) s += 4;
		else if (v.lang.toLowerCase().startsWith("en")) s += 2;
		if (/neural|natural|premium|enhanced|google/i.test(n)) s += 5;
		if (/samantha|karen|moira|tessa|victoria|zira|siri|aria|jenny|female/i.test(n)) s += 4;
		if (/male|david|daniel|alex|fred/i.test(n)) s -= 3;
		return s;
	};
	return [...voices].sort((a, b) => score(b) - score(a))[0] ?? null;
}
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result || ""));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("read failed"));
		reader.readAsDataURL(blob);
	});
}
function rmsFrom(buf) {
	let sum = 0;
	for (let i = 0; i < buf.length; i++) {
		const v = ((buf[i] ?? 128) - 128) / 128;
		sum += v * v;
	}
	return Math.sqrt(sum / Math.max(buf.length, 1));
}
function useCloverVoice() {
	const [speaking, setSpeaking] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [micSupported, setMicSupported] = (0, import_react.useState)(false);
	const [micError, setMicError] = (0, import_react.useState)(null);
	const audioRef = (0, import_react.useRef)(null);
	const recRef = (0, import_react.useRef)(null);
	const mediaRecRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const ctxRef = (0, import_react.useRef)(null);
	const analyserRef = (0, import_react.useRef)(null);
	const sourceRef = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(0);
	const listenGen = (0, import_react.useRef)(0);
	const deliveredRef = (0, import_react.useRef)(false);
	const bargeRef = (0, import_react.useRef)(false);
	const speakingRef = (0, import_react.useRef)(false);
	const liveRef = (0, import_react.useRef)(false);
	const skipRef = (0, import_react.useRef)(false);
	const holdOptsRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const sr = !!getSpeechRecognition();
		const rec = typeof window !== "undefined" && typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia;
		setMicSupported(sr || rec);
		if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.getVoices();
	}, []);
	const killRaf = () => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		rafRef.current = 0;
	};
	const ensureContext = async () => {
		if (typeof window === "undefined") return null;
		const Ctx = window.AudioContext || window.webkitAudioContext;
		if (!Ctx) return null;
		if (!ctxRef.current) ctxRef.current = new Ctx();
		if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
		return ctxRef.current;
	};
	const ensureStream = (0, import_react.useCallback)(async () => {
		const existing = streamRef.current;
		if (existing && existing.getAudioTracks().some((t) => t.readyState === "live")) {
			setMicError(null);
			return existing;
		}
		if (!navigator.mediaDevices?.getUserMedia) {
			setMicError("This browser has no microphone access.");
			return null;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: {
				echoCancellation: true,
				noiseSuppression: true,
				autoGainControl: true
			} });
			streamRef.current = stream;
			setMicError(null);
			const ctx = await ensureContext();
			if (ctx) {
				try {
					sourceRef.current?.disconnect();
				} catch {}
				const src = ctx.createMediaStreamSource(stream);
				const analyser = ctx.createAnalyser();
				analyser.fftSize = 512;
				src.connect(analyser);
				sourceRef.current = src;
				analyserRef.current = analyser;
			}
			return stream;
		} catch {
			setMicError("Allow the microphone so Clover can hear you.");
			return null;
		}
	}, []);
	const unlock = (0, import_react.useCallback)(() => {
		if (typeof window === "undefined") return;
		if (!audioRef.current) audioRef.current = new Audio();
		const silent = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";
		const a = audioRef.current;
		a.src = silent;
		a.volume = 0;
		a.play().then(() => {
			a.pause();
			a.volume = 1;
		}).catch(() => {
			a.volume = 1;
		});
		ensureContext();
		ensureStream();
	}, [ensureStream]);
	const stopSpeak = (0, import_react.useCallback)(() => {
		bargeRef.current = false;
		try {
			audioRef.current?.pause();
		} catch {}
		if (typeof window !== "undefined") window.speechSynthesis?.cancel();
		setSpeaking(false);
	}, []);
	const releaseMic = (0, import_react.useCallback)(() => {
		listenGen.current += 1;
		killRaf();
		try {
			recRef.current?.abort?.();
			recRef.current?.stop();
		} catch {}
		recRef.current = null;
		try {
			if (mediaRecRef.current?.state === "recording") mediaRecRef.current.stop();
		} catch {}
		mediaRecRef.current = null;
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
		try {
			sourceRef.current?.disconnect();
		} catch {}
		sourceRef.current = null;
		analyserRef.current = null;
		ctxRef.current?.close();
		ctxRef.current = null;
		setListening(false);
	}, []);
	const stopListen = (0, import_react.useCallback)(() => {
		listenGen.current += 1;
		killRaf();
		try {
			recRef.current?.abort?.();
			recRef.current?.stop();
		} catch {}
		recRef.current = null;
		try {
			if (mediaRecRef.current?.state === "recording") mediaRecRef.current.stop();
		} catch {}
		mediaRecRef.current = null;
		setListening(false);
	}, []);
	const speakBrowser = (0, import_react.useCallback)((text) => {
		return new Promise((resolve) => {
			if (typeof window === "undefined" || !window.speechSynthesis) {
				resolve();
				return;
			}
			const run = () => {
				const utter = new SpeechSynthesisUtterance(text);
				utter.lang = "en-US";
				utter.rate = .92;
				utter.pitch = 1.06;
				const voice = pickBrowserVoice(window.speechSynthesis.getVoices());
				if (voice) utter.voice = voice;
				utter.onend = () => {
					setSpeaking(false);
					resolve();
				};
				utter.onerror = () => {
					setSpeaking(false);
					resolve();
				};
				setSpeaking(true);
				window.speechSynthesis.cancel();
				window.speechSynthesis.speak(utter);
			};
			if (window.speechSynthesis.getVoices().length) {
				run();
				return;
			}
			const t = window.setTimeout(run, 400);
			window.speechSynthesis.onvoiceschanged = () => {
				window.clearTimeout(t);
				window.speechSynthesis.onvoiceschanged = null;
				run();
			};
		});
	}, []);
	const watchBargeIn = (0, import_react.useCallback)((onBarge) => {
		bargeRef.current = true;
		const analyser = analyserRef.current;
		if (!analyser) return;
		const buf = new Uint8Array(analyser.frequencyBinCount);
		const startAt = performance.now();
		let loudSince = null;
		const tick = () => {
			if (!bargeRef.current) return;
			analyser.getByteTimeDomainData(buf);
			const now = performance.now();
			if (now - startAt < 550) {
				rafRef.current = requestAnimationFrame(tick);
				return;
			}
			if (rmsFrom(buf) > BARGE_RMS) {
				if (loudSince == null) loudSince = now;
				if (now - loudSince > BARGE_HOLD_MS) {
					bargeRef.current = false;
					onBarge();
					return;
				}
			} else loudSince = null;
			rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
	}, []);
	const speak = (0, import_react.useCallback)(async (text) => {
		stopSpeak();
		if (!text.trim()) return false;
		setSpeaking(true);
		speakingRef.current = true;
		skipRef.current = true;
		let settled = false;
		let barged = false;
		const finishSpeak = () => {
			if (settled) return;
			settled = true;
			bargeRef.current = false;
			speakingRef.current = false;
			skipRef.current = barged ? false : false;
			setSpeaking(false);
		};
		await new Promise((resolve) => {
			const done = () => {
				try {
					audioRef.current?.pause();
				} catch {}
				if (typeof window !== "undefined") window.speechSynthesis?.cancel();
				finishSpeak();
				resolve();
			};
			watchBargeIn(() => {
				barged = true;
				skipRef.current = false;
				done();
			});
			(async () => {
				try {
					const res = await speakClover({ data: { text: text.slice(0, 800) } });
					if (settled) return;
					if (res.ok) {
						const url = `data:audio/mpeg;base64,${res.audio}`;
						const audio = audioRef.current ?? new Audio();
						audioRef.current = audio;
						audio.volume = 1;
						audio.src = url;
						audio.onended = done;
						audio.onerror = done;
						try {
							await audio.play();
						} catch {
							done();
						}
						return;
					}
				} catch {}
				if (settled) return;
				await speakBrowser(text);
				done();
			})();
		});
		return barged;
	}, [
		speakBrowser,
		stopSpeak,
		watchBargeIn
	]);
	const startListen = (0, import_react.useCallback)((opts) => {
		stopListen();
		const gen = listenGen.current;
		deliveredRef.current = false;
		const deliver = (text) => {
			if (gen !== listenGen.current || deliveredRef.current) return;
			if (speakingRef.current || skipRef.current) return;
			const clean = text.trim();
			if (clean.length < 2) return;
			deliveredRef.current = true;
			opts.onInterim("");
			opts.onResult(clean);
		};
		const finish = (got) => {
			if (gen !== listenGen.current) return;
			setListening(false);
			opts.onEnd(got || deliveredRef.current);
		};
		(async () => {
			const stream = await ensureStream();
			if (gen !== listenGen.current) return;
			if (!stream) {
				finish(false);
				return;
			}
			setListening(true);
			const Ctor = getSpeechRecognition();
			let srFinal = "";
			if (Ctor) try {
				const rec = new Ctor();
				rec.continuous = true;
				rec.interimResults = true;
				rec.lang = "en-US";
				rec.maxAlternatives = 1;
				rec.onresult = (ev) => {
					if (gen !== listenGen.current) return;
					let interim = "";
					let finalText = "";
					for (let i = ev.resultIndex; i < ev.results.length; i++) {
						const r = ev.results[i];
						if (!r) continue;
						if (r.isFinal) finalText += r[0]?.transcript ?? "";
						else interim += r[0]?.transcript ?? "";
					}
					if (finalText) srFinal += `${srFinal ? " " : ""}${finalText.trim()}`;
					const live = `${srFinal}${interim ? (srFinal ? " " : "") + interim : ""}`.trim();
					if (live) opts.onInterim(live);
				};
				rec.onerror = (e) => {
					if (e.error === "aborted" || e.error === "no-speech") return;
					if (e.error === "not-allowed" || e.error === "service-not-allowed") setMicError("Allow the microphone so Clover can hear you.");
				};
				rec.onend = () => {
					recRef.current = null;
				};
				recRef.current = rec;
				rec.start();
			} catch {
				recRef.current = null;
			}
			if (typeof MediaRecorder === "undefined") {
				if (!Ctor) finish(false);
				return;
			}
			const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : "";
			const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : void 0);
			mediaRecRef.current = rec;
			const chunks = [];
			rec.ondataavailable = (e) => {
				if (e.data?.size) chunks.push(e.data);
			};
			rec.onstop = async () => {
				if (gen !== listenGen.current) return;
				if (deliveredRef.current) {
					finish(true);
					return;
				}
				if (srFinal.trim().length >= 2) {
					deliver(srFinal);
					finish(true);
					return;
				}
				if (!chunks.length) {
					finish(false);
					return;
				}
				try {
					opts.onInterim("Hearing you…");
					const blob = new Blob(chunks, { type: rec.mimeType || mime || "audio/webm" });
					if (blob.size < 800) {
						finish(false);
						return;
					}
					const transcribed = await transcribeClover({ data: { audioDataUrl: await blobToDataUrl(blob) } });
					if (gen !== listenGen.current) return;
					if (transcribed.ok && transcribed.text.trim().length >= 2) {
						deliver(transcribed.text);
						finish(true);
					} else finish(false);
				} catch {
					finish(false);
				}
			};
			rec.start(250);
			const analyser = analyserRef.current;
			const buf = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
			const startedAt = Date.now();
			let spoke = false;
			let lastVoice = Date.now();
			const tick = () => {
				if (gen !== listenGen.current) return;
				if (deliveredRef.current) {
					try {
						if (rec.state === "recording") rec.stop();
					} catch {}
					try {
						recRef.current?.stop();
					} catch {}
					return;
				}
				const now = Date.now();
				if (buf && analyser) {
					analyser.getByteTimeDomainData(buf);
					if (rmsFrom(buf) > VOICE_RMS) {
						spoke = true;
						lastVoice = now;
					}
				}
				if (spoke && now - lastVoice > SILENCE_MS || now - startedAt > MAX_RECORD_MS || !spoke && now - startedAt > WAIT_SPEECH_MS) {
					try {
						if (rec.state === "recording") rec.stop();
					} catch {}
					try {
						recRef.current?.stop();
					} catch {}
					return;
				}
				rafRef.current = requestAnimationFrame(tick);
			};
			rafRef.current = requestAnimationFrame(tick);
		})();
	}, [ensureStream, stopListen]);
	const holdListen = (0, import_react.useCallback)((opts) => {
		liveRef.current = true;
		holdOptsRef.current = opts;
		const loop = () => {
			if (!liveRef.current) return;
			startListen({
				onResult: opts.onResult,
				onInterim: opts.onInterim,
				onEnd: (got) => {
					opts.onEnd(got);
					if (liveRef.current && !speakingRef.current && !got) window.setTimeout(loop, 160);
				}
			});
		};
		loop();
	}, [startListen]);
	(0, import_react.useEffect)(() => () => {
		stopSpeak();
		releaseMic();
	}, [releaseMic, stopSpeak]);
	return {
		speak,
		stopSpeak,
		startListen,
		holdListen,
		stopListen,
		releaseMic,
		speaking,
		listening,
		micSupported,
		micError,
		unlock
	};
}
var REMARKS = [
	"Still here. What did you pick up?",
	"Name the rock. I'll take the lookalikes.",
	"No rush. The ground isn't going anywhere.",
	"I'm listening. Texture, streak, where you found it."
];
var GREETINGS = (c) => {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const time = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
	const pool = [
		`Good ${time}, ${c.name}. I'm Clover. Just talk — I'm listening.`,
		`Hey ${c.name}. I'm here. What are you seeing?`,
		`I'm with you. Tell me about the rock, or just think out loud.`
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
	const [line, setLine] = (0, import_react.useState)("");
	const activeRef = (0, import_react.useRef)(false);
	const phaseRef = (0, import_react.useRef)("idle");
	const quietTurnsRef = (0, import_react.useRef)(0);
	const voice = useCloverVoice();
	const companion = companionFromField({
		displayName: useField((s) => s.displayName),
		xp: useField((s) => s.xp),
		streak: useField((s) => s.streak),
		specimens: useField((s) => s.specimens)
	});
	const setOrbPhase = (0, import_react.useCallback)((next) => {
		const y = typeof window !== "undefined" ? window.scrollY : 0;
		setPhase(next);
		if (typeof window === "undefined") return;
		const restore = () => {
			if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y);
		};
		restore();
		requestAnimationFrame(restore);
		window.setTimeout(restore, 60);
		window.setTimeout(restore, 220);
	}, []);
	(0, import_react.useEffect)(() => {
		phaseRef.current = phase;
	}, [phase]);
	const beginListening = (0, import_react.useCallback)(() => {
		if (!activeRef.current) return;
		if (!voice.micSupported) {
			setOrbPhase("listening");
			return;
		}
		setInterim("");
		setOrbPhase("listening");
		voice.holdListen({
			onResult: (text) => {
				quietTurnsRef.current = 0;
				sendRef.current?.(text, "voice");
			},
			onInterim: setInterim,
			onEnd: (got) => {
				if (!activeRef.current) return;
				if (got) return;
				if (voice.micError) return;
				setOrbPhase("listening");
			}
		});
	}, [voice, setOrbPhase]);
	const send = (0, import_react.useCallback)(async (raw, mode = "voice") => {
		const question = raw.trim();
		if (!question || !activeRef.current) return;
		setInterim("");
		voice.stopListen();
		const push = useField.getState().pushClover;
		push({
			role: "user",
			text: question
		});
		setOrbPhase("thinking");
		const history = useField.getState().clover.slice(-17, -1).map((m) => ({
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
		setLine(reply);
		setOrbPhase("speaking");
		const barged = await voice.speak(reply);
		if (!activeRef.current) return;
		window.setTimeout(() => {
			if (activeRef.current) beginListening();
		}, barged ? 80 : 220);
	}, [
		beginListening,
		companion,
		voice,
		setOrbPhase
	]);
	const sendRef = (0, import_react.useRef)(send);
	sendRef.current = send;
	const remarkRef = (0, import_react.useRef)(async () => {});
	const start = (0, import_react.useCallback)(() => {
		activeRef.current = true;
		quietTurnsRef.current = 0;
		voice.unlock();
		const pool = GREETINGS(companion);
		const line = pool[Math.floor(Math.random() * pool.length)] ?? pool[0];
		const existing = useField.getState().clover;
		const opening = existing.length === 1 && existing[0]?.role === "assistant" ? existing[0].text : line;
		if (!(existing.length === 1 && existing[0]?.role === "assistant")) useField.getState().pushClover({
			role: "assistant",
			text: opening
		});
		setLine(opening);
		setOrbPhase("speaking");
		(async () => {
			await voice.speak(opening);
			if (!activeRef.current) return;
			window.setTimeout(() => {
				if (activeRef.current) beginListening();
			}, 280);
		})();
	}, [
		beginListening,
		companion,
		voice,
		setOrbPhase
	]);
	const end = (0, import_react.useCallback)(() => {
		activeRef.current = false;
		voice.stopListen();
		voice.stopSpeak();
		voice.releaseMic();
		setOrbPhase("idle");
		setInterim("");
		setLine("");
	}, [voice, setOrbPhase]);
	remarkRef.current = (0, import_react.useCallback)(async () => {
		if (!activeRef.current) return;
		const remark = REMARKS[Math.floor(Math.random() * REMARKS.length)] ?? REMARKS[0];
		setLine(remark);
		setOrbPhase("speaking");
		await voice.speak(remark);
		if (!activeRef.current) return;
		window.setTimeout(() => {
			if (activeRef.current) beginListening();
		}, 280);
	}, [
		beginListening,
		voice,
		setOrbPhase
	]);
	const nudge = (0, import_react.useCallback)(() => {
		if (!activeRef.current) {
			start();
			return;
		}
		voice.stopSpeak();
		voice.unlock();
		quietTurnsRef.current = 0;
		beginListening();
	}, [
		beginListening,
		start,
		voice
	]);
	(0, import_react.useEffect)(() => () => {
		activeRef.current = false;
	}, []);
	return {
		phase,
		interim,
		line,
		start,
		end,
		nudge,
		send,
		ensureLive: (0, import_react.useCallback)(() => {
			voice.unlock();
		}, [voice]),
		voiceSupported: voice.micSupported,
		micError: voice.micError,
		companion,
		open: phase !== "idle",
		beginListening
	};
}
var ROUTE_TIPS = {
	"/": [
		"Find anything fun, or just wandering?",
		"Every specimen has a legal path.",
		"Pyrite versus gold. Ask me."
	],
	"/explore": [
		"Public land is not a free-for-all.",
		"Creek beds after a storm. Gravels reshuffle.",
		"Granite contacts hide quartz veins."
	],
	"/vault": ["GeoDex is the cabinet. Provenance is the value."],
	"/market": ["Rarity on a listing is a claim, not a lab report."],
	"/quests": ["One scan, one log, one map look. That's a field day."],
	"/pedia": ["Open a species before you trust a hunch."],
	"/community": ["Don't post exact GPS for sensitive sites."]
};
var DEFAULT_TIPS = ["I'm Clover. Tap me when you want to talk."];
var HIDDEN_PREFIX = ["/identify", "/clover"];
function FloatingCloverOrb() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const onboarded = useField((s) => s.onboarded);
	const openerSeen = useField((s) => s.openerSeen);
	const fieldMode = useField((s) => s.fieldMode);
	const clover = useCloverConversation();
	const [tip, setTip] = (0, import_react.useState)("");
	const [showTip, setShowTip] = (0, import_react.useState)(false);
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
	function handleTap(e) {
		e.currentTarget.focus({ preventScroll: true });
		setShowTip(false);
		if (!clover.open) clover.start();
		else clover.nudge();
	}
	if (hidden) return null;
	const size = clover.open ? 68 : 64;
	const spoken = clover.phase === "listening" && clover.interim ? clover.interim : clover.line && clover.phase !== "idle" ? clover.line : showTip ? tip : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed z-[35] flex flex-col items-end",
		style: {
			bottom: "calc(5.75rem + env(safe-area-inset-bottom, 0px))",
			right: 12
		},
		children: [spoken && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "orb-tip pointer-events-none mb-3 max-w-52 rh-rise",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "orb-tip-dot",
				"data-mood": clover.companion.mood
			}), spoken]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onMouseDown: (e) => e.preventDefault(),
			onClick: handleTap,
			"aria-label": clover.open ? "Talk to Clover" : "Wake Clover",
			className: "orb-stage pointer-events-auto grid place-items-center transition-transform duration-150 ease-out active:scale-[0.96]",
			style: {
				width: size + 22,
				height: size + 22
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidMetalOrb, {
				size,
				state: clover.phase,
				level: clover.companion.level
			})
		})]
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
	},
	{
		to: "/data",
		label: "Your data",
		icon: Lock
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [menu, setMenu] = (0, import_react.useState)(false);
	const onboarded = useField((s) => s.onboarded);
	const openerSeen = useField((s) => s.openerSeen);
	const fieldMode = useField((s) => s.fieldMode);
	const setFieldMode = useField((s) => s.setFieldMode);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		useField.getState().hydrateDay();
		migrateLegacyPhotos();
	}, []);
	(0, import_react.useEffect)(() => {
		setMenu(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!menu) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setMenu(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [menu]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-mode": fieldMode ? "field" : "home",
		className: "min-h-dvh bg-void text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rh-grain min-h-dvh",
			children: [
				mounted && !onboarded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {}),
				mounted && onboarded && !openerSeen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicOpener, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-30 border-b border-line bg-void/80 backdrop-blur-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-14 max-w-lg items-center gap-3 px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": menu ? "Close menu" : "Open menu",
								"aria-expanded": menu,
								"aria-controls": "main-menu",
								onClick: () => setMenu((v) => !v),
								className: "grid size-12 place-items-center rounded-md text-muted hover:bg-fg/5 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void",
								children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex min-h-12 min-w-0 flex-1 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[17px] font-semibold tracking-tight text-fg",
										children: "RockHound"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[17px] font-semibold text-frost",
										children: "GO"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": fieldMode ? "Field mode, switch to Hub" : "Hub mode, switch to Field",
								title: fieldMode ? "Field theme on. Tap for the Hub theme." : "Tap for the Field theme for outdoor use.",
								onClick: () => setFieldMode(!fieldMode),
								className: cn("h-12 rounded-full border px-4 text-[12px] font-medium uppercase tracking-[0.14em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void", fieldMode ? "border-field/40 bg-field/15 text-field" : "border-line text-muted hover:text-fg"),
								children: fieldMode ? "Field" : "Hub"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/clover",
								"aria-label": "Clover AGI Assistant",
								className: "grid size-12 place-items-center rounded-md text-cyan hover:bg-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
							})
						]
					})
				}),
				menu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-40 bg-void/70",
					onClick: () => setMenu(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						id: "main-menu",
						"aria-label": "Main menu navigation",
						className: "absolute left-0 top-14 w-[min(100%,20rem)] border-r border-line bg-obsidian p-3 pb-8 shadow-panel",
						onClick: (e) => e.stopPropagation(),
						children: [MENU.map((item) => {
							const Icon = item.icon;
							const active = pathname === item.to;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								"aria-current": active ? "page" : void 0,
								className: cn("flex min-h-12 items-center gap-3 rounded-md px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void", active ? "bg-fg/10 text-fg" : "text-muted hover:bg-fg/5 hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-center gap-2 px-3 text-[12px] uppercase tracking-[0.14em] text-faint",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-3" }), " Stored on this device · no account"]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-lg overflow-x-clip px-4 pb-28 pt-5",
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
								"aria-current": active ? "page" : void 0,
								className: "-mt-5 flex flex-1 flex-col items-center gap-1 pb-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-14 place-items-center rounded-full border border-gold/50 bg-gold text-void shadow-[0_8px_24px_rgb(212_175_55_/_0.28)]", active && "ring-2 ring-gold/40"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[12px] font-medium uppercase tracking-[0.14em] text-gold",
									children: "Scan"
								})]
							}, tab.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: tab.to,
								"aria-current": active ? "page" : void 0,
								className: "flex min-h-[64px] flex-1 flex-col items-center justify-center gap-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-[18px]", active ? "text-fg" : "text-faint") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-[12px] font-medium uppercase tracking-[0.12em]", active ? "text-fg" : "text-faint"),
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
				className: "flex items-center justify-between text-xs text-muted",
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
				role: "progressbar",
				"aria-label": `Level ${level} progress`,
				"aria-valuenow": into,
				"aria-valuemin": 0,
				"aria-valuemax": need,
				"aria-valuetext": `${into} of ${need} XP to level ${level + 1}`,
				className: "mt-2 h-1.5 overflow-hidden rounded-full bg-fg/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-frost",
					style: { width: `${Math.round(pct * 100)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-4 gap-1 text-center text-[12px] uppercase tracking-[0.12em] text-faint",
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
/**
* Registers /sw.js in production builds for offline field use. In dev it
* removes any stale registration so HMR modules are never served from cache.
*/
function ServiceWorker() {
	(0, import_react.useEffect)(() => {
		if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
		{
			const register = () => {
				navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
			};
			if (document.readyState === "complete") register();
			else window.addEventListener("load", register, { once: true });
		}
	}, []);
	return null;
}
var styles_default = "/assets/styles-CdMGbO5g.css";
var APP_NAME = "RockHound GO";
var Route$17 = createRootRoute({
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
				content: "#07090b"
			},
			{
				name: "color-scheme",
				content: "dark"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: APP_NAME
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
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
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/icons/apple-touch-icon.png"
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceWorker, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center",
					toastOptions: { style: {
						background: "#141a1f",
						border: "1px solid rgb(238 243 246 / 0.12)",
						color: "#eef3f6"
					} }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$15 = () => import("./routes-C7K8_a3R.mjs");
var Route$16 = createFileRoute("/")({
	head: () => pageHead({
		title: "Rock & mineral ID, field map and GeoDex",
		path: "/",
		description: "AI mineral identification, rockhounding map, specimen vault, and field tools. The operating system for modern rockhounding.",
		jsonLd: [{
			"@type": "WebSite",
			name: SITE_NAME,
			url: SITE_URL
		}, {
			"@type": "WebApplication",
			name: SITE_NAME,
			url: SITE_URL,
			applicationCategory: "ReferenceApplication",
			operatingSystem: "Web",
			description: "AI mineral identification, rockhounding map, specimen vault, and field tools."
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./clover-DbP0KKfQ.mjs");
var Route$15 = createFileRoute("/clover")({
	head: () => privateHead("Clover", "/clover"),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./community-CbIetWRj.mjs");
var Route$14 = createFileRoute("/community")({
	head: () => privateHead("Field feed", "/community"),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./data-CFfvmMKO.mjs");
var Route$13 = createFileRoute("/data")({
	head: () => pageHead({
		title: "How your data is handled",
		path: "/data",
		description: "What RockHound GO stores on your device, what it sends to its AI provider and when, and how to export or erase your data."
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./explore-CHkIAwSA.mjs");
var Route$12 = createFileRoute("/explore")({
	head: () => pageHead({
		title: "Field map",
		path: "/explore",
		description: `${SITES.length} rockhounding localities with access type, difficulty, likely finds, and land-status notes. Always confirm land status before you go.`
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./identify-CcxpuQcD.mjs");
var Route$11 = createFileRoute("/identify")({
	head: () => pageHead({
		title: "Identify a mineral",
		path: "/identify",
		description: "Identify a mineral from one photo, or score the Mineralpedia catalog with field tests — no photo needed."
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./market-TunYfyfp.mjs");
var Route$10 = createFileRoute("/market")({
	head: () => privateHead("Specimen market", "/market"),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./pedia-B24EHJb8.mjs");
var Route$9 = createFileRoute("/pedia")({
	head: () => pageHead({
		title: "Mineralpedia",
		path: "/pedia",
		description: `Mineralpedia: ${MINERALS.length} field species with tests, lookalikes, and hardness.`
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./profile-DaQb9BC7.mjs");
var Route$8 = createFileRoute("/profile")({
	head: () => privateHead("Progress", "/profile"),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./quests-BKoBLxk4.mjs");
var Route$7 = createFileRoute("/quests")({
	head: () => privateHead("Daily quests", "/quests"),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./safety-DKRvsBoS.mjs");
var Route$6 = createFileRoute("/safety")({
	head: () => pageHead({
		title: "Safety & land status",
		path: "/safety",
		description: "Land before the hammer: confirm posted signs, claim markers, and seasonal closures, and follow the stewardship doctrine before you collect."
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
/** Indexable routes only — private/per-device pages are deliberately absent. */
var STATIC_PATHS = [
	"/",
	"/explore",
	"/identify",
	"/pedia",
	"/safety",
	"/data"
];
function buildSitemap() {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		...STATIC_PATHS,
		...MINERALS.map((m) => `/pedia/${m.id}`),
		...SITES.map((s) => `/explore/${s.id}`)
	].map((p) => `  <url><loc>${canonicalUrl(p)}</loc></url>`).join("\n")}\n</urlset>\n`;
}
var Route$5 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: () => new Response(buildSitemap(), { headers: {
	"content-type": "application/xml; charset=utf-8",
	"cache-control": "public, max-age=3600"
} }) } } });
var $$splitComponentImporter$4 = () => import("./trips-Km-AEt6N.mjs");
var Route$4 = createFileRoute("/trips")({
	head: () => privateHead("Trip planner", "/trips"),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./vault-DDmhVkBl.mjs");
var Route$3 = createFileRoute("/vault")({
	head: () => privateHead("GeoDex", "/vault"),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./explore_._id-CPbfzjDj.mjs");
var Route$2 = createFileRoute("/explore_/$id")({
	loader: ({ params }) => {
		const site = SITE_BY_ID[params.id];
		if (!site) throw notFound();
		return { site };
	},
	head: ({ loaderData }) => {
		const site = loaderData?.site;
		if (!site) return {};
		return pageHead({
			title: `${site.name}, ${site.state}`,
			path: `/explore/${site.id}`,
			description: clamp(`Rockhounding at ${site.name}, ${site.state}. Likely finds: ${site.finds.slice(0, 4).join(", ")}. Season: ${site.season}.`),
			jsonLd: {
				"@type": "Place",
				name: site.name,
				url: canonicalUrl(`/explore/${site.id}`),
				address: {
					"@type": "PostalAddress",
					addressRegion: site.state
				},
				geo: {
					"@type": "GeoCoordinates",
					latitude: site.lat,
					longitude: site.lng
				}
			}
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./pedia_._id-BKoKC_5p.mjs");
var Route$1 = createFileRoute("/pedia_/$id")({
	loader: ({ params }) => {
		const mineral = MINERAL_BY_ID[params.id];
		if (!mineral) throw notFound();
		return { mineral };
	},
	head: ({ loaderData }) => {
		const m = loaderData?.mineral;
		if (!m) return {};
		return pageHead({
			title: `${m.name} — identification & field tests`,
			path: `/pedia/${m.id}`,
			description: clamp(m.blurb),
			jsonLd: {
				"@type": "DefinedTerm",
				name: m.name,
				description: m.blurb,
				url: canonicalUrl(`/pedia/${m.id}`),
				inDefinedTermSet: {
					"@type": "DefinedTermSet",
					name: "Mineralpedia",
					url: canonicalUrl("/pedia")
				}
			}
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./vault_._id-C6MQGal8.mjs");
var Route = createFileRoute("/vault_/$id")({
	head: () => privateHead("Specimen", "/vault/$id"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$16.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$17
	}),
	CloverRoute: Route$15.update({
		id: "/clover",
		path: "/clover",
		getParentRoute: () => Route$17
	}),
	CommunityRoute: Route$14.update({
		id: "/community",
		path: "/community",
		getParentRoute: () => Route$17
	}),
	DataRoute: Route$13.update({
		id: "/data",
		path: "/data",
		getParentRoute: () => Route$17
	}),
	ExploreRoute: Route$12.update({
		id: "/explore",
		path: "/explore",
		getParentRoute: () => Route$17
	}),
	IdentifyRoute: Route$11.update({
		id: "/identify",
		path: "/identify",
		getParentRoute: () => Route$17
	}),
	MarketRoute: Route$10.update({
		id: "/market",
		path: "/market",
		getParentRoute: () => Route$17
	}),
	PediaRoute: Route$9.update({
		id: "/pedia",
		path: "/pedia",
		getParentRoute: () => Route$17
	}),
	ProfileRoute: Route$8.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$17
	}),
	QuestsRoute: Route$7.update({
		id: "/quests",
		path: "/quests",
		getParentRoute: () => Route$17
	}),
	SafetyRoute: Route$6.update({
		id: "/safety",
		path: "/safety",
		getParentRoute: () => Route$17
	}),
	SitemapDotxmlRoute: Route$5.update({
		id: "/sitemap.xml",
		path: "/sitemap.xml",
		getParentRoute: () => Route$17
	}),
	TripsRoute: Route$4.update({
		id: "/trips",
		path: "/trips",
		getParentRoute: () => Route$17
	}),
	VaultRoute: Route$3.update({
		id: "/vault",
		path: "/vault",
		getParentRoute: () => Route$17
	}),
	ExploreIdRoute: Route$2.update({
		id: "/explore_/$id",
		path: "/explore/$id",
		getParentRoute: () => Route$17
	}),
	PediaIdRoute: Route$1.update({
		id: "/pedia_/$id",
		path: "/pedia/$id",
		getParentRoute: () => Route$17
	}),
	VaultIdRoute: Route.update({
		id: "/vault_/$id",
		path: "/vault/$id",
		getParentRoute: () => Route$17
	})
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound,
		scrollRestoration: true
	});
}
//#endregion
export { XpRibbon as a, router_exports as c, Route$2 as i, useCloverConversation as l, Route as n, getRouter as o, Route$1 as r, identifySpecimen as s, LiquidMetalOrb as t };
