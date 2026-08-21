import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-DfAvtWOL.mjs";
import { E as FlipHorizontal, S as ImagePlus, T as Gem, b as Landmark, k as Camera, s as Sparkles, t as X, u as ShieldAlert, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useField, c as Button, d as SectionLabel, h as formatUsd, l as Panel, n as CrystalGem, p as cn, r as XP_REWARDS, u as RarityChip } from "./router-BX6Bgd6N.mjs";
import { d as identifySpecimen, f as matchFieldKey, p as mineralToResult } from "./router-BX6Bgd6N2.mjs";
import { t as nextInChain } from "./chains-BYKGPKKQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/identify-DxGGnXIR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OPTIONS = [
	{
		id: "chattel_collected",
		icon: Gem,
		title: "Add to GeoDex",
		body: "You collected it. Provenance, photo, and collector XP stay on this device.",
		xp: XP_REWARDS.saveVault,
		lane: "Collector"
	},
	{
		id: "affixed_logged",
		icon: Landmark,
		title: "Mark in place",
		body: "Leave it. Log the observation. Steward XP. Location stays private.",
		xp: XP_REWARDS.stewardLog,
		lane: "Steward"
	},
	{
		id: "restricted_observed",
		icon: ShieldAlert,
		title: "Observe only",
		body: "No legal access to collect. Record the sighting without a pin.",
		xp: XP_REWARDS.restrictedObserve,
		lane: "Explorer"
	}
];
function DiscoveryChoice({ onConfirm }) {
	const [legal, setLegal] = (0, import_react.useState)(false);
	const [picked, setPicked] = (0, import_react.useState)(null);
	function confirm() {
		if (!picked) return;
		onConfirm({
			disposition: picked,
			collected: picked === "chattel_collected",
			leftInPlace: picked === "affixed_logged",
			legalStatus: picked === "restricted_observed" ? "restricted" : legal ? "allowed" : "unknown",
			ethicsPromptShown: true,
			userConfirmedLegalAccess: legal && picked !== "restricted_observed",
			geoPrivacy: picked === "restricted_observed" ? "hidden" : "exact_private"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-medium uppercase tracking-[0.16em] text-gold",
				children: "Discovery choice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Collecting is a legal and ethical decision. Reward documentation more than extraction."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 items-start gap-3 rounded-lg border border-line bg-void/40 px-3 py-3 text-sm text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: legal,
					onChange: (e) => setLegal(e.target.checked),
					className: "mt-1 size-4 accent-gold"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I had legal access to this ground and will follow posted rules." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: OPTIONS.map((o) => {
					const Icon = o.icon;
					const active = picked === o.id;
					const blocked = o.id === "chattel_collected" && !legal;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: blocked,
						onClick: () => setPicked(o.id),
						className: cn("flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors duration-150", active ? "border-gold/50 bg-gold/10" : "border-line bg-void/30 hover:bg-fg/5", blocked && "opacity-40"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("mt-0.5 size-4 shrink-0", active ? "text-gold" : "text-muted") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-fg",
									children: o.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted",
									children: o.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[10px] uppercase tracking-[0.14em] text-faint",
									children: [
										"+",
										o.xp,
										" XP · ",
										o.lane
									]
								})
							]
						})]
					}, o.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "gold",
				className: "w-full",
				disabled: !picked,
				onClick: confirm,
				children: "Log this discovery"
			})
		]
	});
}
async function fileToDataUrl(file, max = 768, quality = .72) {
	const url = URL.createObjectURL(file);
	try {
		const img = await loadImage(url);
		const scale = Math.min(1, max / Math.max(img.width, img.height));
		const w = Math.max(1, Math.round(img.width * scale));
		const h = Math.max(1, Math.round(img.height * scale));
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas unavailable");
		ctx.drawImage(img, 0, 0, w, h);
		return canvas.toDataURL("image/jpeg", quality);
	} finally {
		URL.revokeObjectURL(url);
	}
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that image"));
		img.src = src;
	});
}
async function captureFromVideo(video, max = 768) {
	const scale = Math.min(1, max / Math.max(video.videoWidth || 640, video.videoHeight || 480));
	const w = Math.max(1, Math.round((video.videoWidth || 640) * scale));
	const h = Math.max(1, Math.round((video.videoHeight || 480) * scale));
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas unavailable");
	ctx.drawImage(video, 0, 0, w, h);
	return canvas.toDataURL("image/jpeg", .72);
}
var COLORS = [
	"clear",
	"white",
	"purple",
	"green",
	"blue",
	"yellow",
	"red",
	"black",
	"pink",
	"gold",
	"brown"
];
var LUSTERS = [
	"vitreous",
	"metallic",
	"pearly",
	"earthy",
	"silky",
	"waxy"
];
var STREAKS = [
	"white",
	"black",
	"red",
	"yellow",
	"greenish-black",
	"gray"
];
var SYSTEMS = [
	"cubic",
	"trigonal",
	"hexagonal",
	"orthorhombic",
	"monoclinic",
	"triclinic"
];
var STEPS = [
	"Uploading your photo",
	"Reading mineral properties",
	"Matching the field catalog",
	"Estimating rarity and value",
	"Building your report"
];
function IdentifyPage() {
	const videoRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const [facing, setFacing] = (0, import_react.useState)("environment");
	const [live, setLive] = (0, import_react.useState)(false);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("lens");
	const [key, setKey] = (0, import_react.useState)({});
	const [matches, setMatches] = (0, import_react.useState)([]);
	const addSpecimen = useField((s) => s.addSpecimen);
	const addXp = useField((s) => s.addXp);
	const completeQuest = useField((s) => s.completeQuest);
	const awardBadge = useField((s) => s.awardBadge);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		return () => {
			streamRef.current?.getTracks().forEach((t) => t.stop());
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!busy) return;
		setStep(0);
		const t = window.setInterval(() => setStep((s) => Math.min(STEPS.length - 1, s + 1)), 900);
		return () => window.clearInterval(t);
	}, [busy]);
	async function startCam() {
		setError(null);
		try {
			streamRef.current?.getTracks().forEach((t) => t.stop());
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: facing,
					width: { ideal: 1280 }
				},
				audio: false
			});
			streamRef.current = stream;
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
			}
			setLive(true);
		} catch {
			setError("Camera unavailable. Upload a photo instead.");
			setLive(false);
		}
	}
	function stopCam() {
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
		setLive(false);
	}
	async function shutter() {
		if (!videoRef.current) return;
		const data = await captureFromVideo(videoRef.current);
		setPhoto(data);
		stopCam();
	}
	async function onFile(f) {
		if (!f) return;
		const data = await fileToDataUrl(f);
		setPhoto(data);
		stopCam();
	}
	async function runIdentify() {
		if (!photo) return;
		setBusy(true);
		setError(null);
		setResult(null);
		try {
			const res = await identifySpecimen({ data: { imageDataUrl: photo } });
			if (!res.ok) {
				setError(res.error);
				return;
			}
			setResult(res.result);
			addXp(XP_REWARDS.scan);
			completeQuest("scan");
			awardBadge("first-scan");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Scan failed.");
		} finally {
			setBusy(false);
		}
	}
	function save(r, src, choice) {
		if (r.notGeological) {
			toast("Not a geological specimen.");
			return;
		}
		const sp = addSpecimen({
			mineralId: r.mineralId,
			name: r.name,
			family: r.family,
			formula: r.formula,
			rarity: r.rarity,
			confidence: r.confidence,
			photoDataUrl: photo ?? void 0,
			notes: "",
			hardness: r.hardness,
			luster: r.luster,
			crystalSystem: r.crystalSystem,
			valueLow: r.valueLow,
			valueHigh: r.valueHigh,
			fieldNotes: r.fieldNotes,
			alternatives: r.alternatives,
			source: src,
			...choice
		});
		const label = choice.disposition === "affixed_logged" ? "Marked in place" : choice.disposition === "restricted_observed" ? "Observed only" : "Logged to GeoDex";
		toast.success(`${r.name} · ${label}`);
		setResult(null);
		setPhoto(null);
		navigate({
			to: "/vault/$id",
			params: { id: sp.id }
		});
	}
	function runKey() {
		const found = matchFieldKey(key);
		setMatches(found);
		if (!found.length) toast("No catalog match — loosen a filter.");
		else {
			addXp(XP_REWARDS.scan);
			completeQuest("scan");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-gold",
					children: "Identify"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl text-fg",
					children: "Specimen lens"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Center the specimen and fill the frame. One photo is enough."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-1 rounded-lg bg-stone p-1",
				children: [
					"lens",
					"key",
					"sample"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t),
					className: cn("h-10 rounded-md text-xs font-medium uppercase tracking-[0.12em]", tab === t ? "bg-obsidian text-fg" : "text-muted"),
					children: t === "lens" ? "Lens" : t === "key" ? "Field key" : "Catalog"
				}, t))
			}),
			tab === "lens" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl border border-line bg-obsidian aspect-[3/4]",
						children: [
							photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: photo,
								alt: "Capture",
								className: "size-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: videoRef,
								playsInline: true,
								muted: true,
								className: "size-full object-cover"
							}),
							!photo && !live && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 grid place-items-center p-6 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "mx-auto size-8 text-faint" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted",
										children: "Open the camera or upload from the roll."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-faint",
										children: "Good light. Fill the frame. One angle is enough."
									})
								] })
							}),
							busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 grid place-items-center bg-void/80 p-6 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto size-8 animate-spin text-gold" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-lg text-fg",
										children: STEPS[step]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted",
										children: "Hold still. The report is assembling."
									})
								] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						capture: "environment",
						className: "hidden",
						onChange: (e) => onFile(e.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [!photo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "gold",
								className: "flex-1",
								onClick: live ? shutter : startCam,
								children: live ? "Capture" : "Open camera"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "line",
								onClick: () => fileRef.current?.click(),
								"aria-label": "Upload",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" })
							}),
							live && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								"aria-label": "Flip camera",
								onClick: () => {
									setFacing((f) => f === "environment" ? "user" : "environment");
									startCam();
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipHorizontal, { className: "size-4" })
							})
						] }), photo && !busy && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "flex-1",
							onClick: () => setPhoto(null),
							children: "Retake"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "gold",
							className: "flex-1",
							onClick: () => void runIdentify(),
							children: "Identify"
						})] })]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					})
				]
			}),
			tab === "key" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No photo needed. Score the catalog with field tests."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldChips, {
						label: "Color",
						options: COLORS,
						value: key.color,
						onPick: (v) => setKey({
							...key,
							color: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionLabel, { children: ["Mohs hardness ", key.hardness ?? ""] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 1,
							max: 10,
							step: .5,
							value: key.hardness ?? 5,
							onChange: (e) => setKey({
								...key,
								hardness: Number(e.target.value)
							}),
							className: "w-full accent-amethyst"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex justify-between text-[10px] text-faint",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Talc 1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Diamond 10" })]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldChips, {
						label: "Luster",
						options: LUSTERS,
						value: key.luster,
						onPick: (v) => setKey({
							...key,
							luster: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldChips, {
						label: "Streak",
						options: STREAKS,
						value: key.streak,
						onPick: (v) => setKey({
							...key,
							streak: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldChips, {
						label: "System",
						options: SYSTEMS,
						value: key.system,
						onPick: (v) => setKey({
							...key,
							system: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "primary",
						className: "w-full",
						onClick: runKey,
						children: "Match catalog"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: matches.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
							result: m,
							onSave: (c) => save(m, "manual", c)
						}) }, m.mineralId ?? m.name))
					})
				]
			}),
			tab === "sample" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: MINERALS.slice(0, 12).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "rh-panel rounded-xl p-3 text-left",
					onClick: () => {
						const r = mineralToResult(m, .9, "sample");
						setResult(r);
						addXp(XP_REWARDS.scan);
						completeQuest("scan");
						setTab("lens");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
							hue: m.hue,
							system: m.crystalSystem,
							size: 48
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate text-sm text-fg",
							children: m.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-faint",
							children: m.formula
						})
					]
				}, m.id))
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-void/80 p-4 pb-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[78vh] w-full max-w-md overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mb-2 ml-auto grid size-11 place-items-center rounded-md text-muted",
						onClick: () => setResult(null),
						"aria-label": "Close report",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
						result,
						onSave: (c) => save(result, result.source === "sample" ? "sample" : "scan", c)
					})]
				})
			})
		]
	});
}
function FieldChips({ label, options, value, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onPick(o),
			className: cn("rounded-full border px-3 py-1.5 text-xs capitalize", value === o ? "border-amethyst bg-amethyst/15 text-fg" : "border-line text-muted"),
			children: o
		}, o))
	})] });
}
function ResultCard({ result, onSave }) {
	const mineral = MINERALS.find((m) => m.id === result.mineralId);
	const chain = nextInChain(result.mineralId)[0];
	const nextMin = chain ? MINERALS.find((m) => m.id === chain.nextId) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		hairline: true,
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
					hue: mineral?.hue ?? "#8d7cff",
					system: result.crystalSystem,
					size: 64
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl text-fg",
								children: result.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RarityChip, { rarity: result.rarity })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [result.family, result.formula ? ` · ${result.formula}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs tabular-nums text-cyan",
							children: [
								Math.round(result.confidence * 100),
								"% confidence · ",
								result.source === "ai" ? "Clover vision" : "field key"
							]
						})
					]
				})]
			}),
			result.notGeological && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-danger",
				children: "This does not read as a geological specimen."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted",
				children: result.fieldNotes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 grid grid-cols-2 gap-2 text-xs",
				children: [
					["Hardness", result.hardness],
					["Luster", result.luster],
					["System", result.crystalSystem],
					["Streak", result.streak],
					["Color", result.color],
					["Value", result.valueLow != null ? `${formatUsd(result.valueLow)}–${formatUsd(result.valueHigh ?? result.valueLow)}` : null]
				].filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-void/40 p-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[10px] uppercase tracking-[0.14em] text-faint",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 capitalize text-fg",
						children: v
					})]
				}, k))
			}),
			result.keyFeatures.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-1 text-sm text-muted",
				children: result.keyFeatures.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", f] }, f))
			}),
			result.alternatives.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-faint",
				children: ["Also consider ", result.alternatives.map((a) => a.name).join(", ")]
			}),
			nextMin && chain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-cyan",
				children: [
					chain.chain.name,
					": next look for ",
					nextMin.name,
					"."
				]
			}),
			result.mineralId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pedia/$id",
				params: { id: result.mineralId },
				className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Open in Mineralpedia"]
			}),
			!result.notGeological && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoveryChoice, { onConfirm: onSave })
		]
	});
}
//#endregion
export { IdentifyPage as component };
