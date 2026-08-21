import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-DfAvtWOL.mjs";
import { D as Compass, T as Gem, i as TriangleAlert, k as Camera, l as Shield, m as Navigation, n as WifiOff, o as Target, s as Sparkles, v as Map } from "../_libs/lucide-react.mjs";
import { a as useField, d as SectionLabel, i as rankFromLevel, l as Panel, m as formatRelative, n as CrystalGem, o as xpToNext } from "./router-BX6Bgd6N.mjs";
import { l as XpRibbon, s as SITES } from "./router-BX6Bgd6N2.mjs";
import { t as HeroCloverOrb } from "./hero-orb-BwNr4uYn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dg7JDjiq.js
var import_jsx_runtime = require_jsx_runtime();
function SyncStatusBar() {
	const count = useField((s) => s.specimens.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 px-1 text-[10px] uppercase tracking-[0.14em] text-faint",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-3" }),
			"Local cache · ",
			count,
			" finds on this device · queued 0"
		]
	});
}
var FIELD_MISSIONS = [
	{
		to: "/identify",
		icon: Camera,
		title: "Scan",
		sub: "Identify specimen",
		priority: true
	},
	{
		to: "/explore",
		icon: Map,
		title: "Field map",
		sub: "Live terrain intel",
		priority: true
	},
	{
		to: "/safety",
		icon: Shield,
		title: "Legality",
		sub: "Access rules · risk",
		priority: false
	},
	{
		to: "/vault",
		icon: Gem,
		title: "GeoDex",
		sub: "Field log · finds",
		priority: false
	},
	{
		to: "/trips",
		icon: Navigation,
		title: "Trip planner",
		sub: "Saved routes",
		priority: false
	},
	{
		to: "/safety",
		icon: TriangleAlert,
		title: "Weather & safety",
		sub: "Hazards · ethics",
		priority: false
	}
];
function Home() {
	const name = useField((s) => s.displayName);
	const xp = useField((s) => s.xp);
	const streak = useField((s) => s.streak);
	const specimens = useField((s) => s.specimens);
	const quests = useField((s) => s.quests);
	const fieldMode = useField((s) => s.fieldMode);
	const { level } = xpToNext(xp);
	const nextQuest = quests.find((q) => !q.done);
	const featured = SITES[((/* @__PURE__ */ new Date()).getDate() - 1) % SITES.length] ?? SITES[0];
	const mineral = MINERALS.find((m) => m.id === "amethyst") ?? MINERALS[0];
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
	const month = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { month: "long" });
	if (fieldMode) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-field shadow-[0_0_8px_var(--color-field)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-medium uppercase tracking-[0.2em] text-field",
						children: "Field mode · active"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-[1.75rem] leading-tight text-fg",
					children: "Field operations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						rankFromLevel(level),
						" · ",
						month,
						" window"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncStatusBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/identify",
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					hairline: true,
					className: "flex items-center gap-4 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-14 place-items-center rounded-lg bg-gold text-void",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.16em] text-gold",
								children: "Primary action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl text-fg",
								children: "Scan a specimen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "One photo. Then choose: collect or leave it."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: FIELD_MISSIONS.map((tile) => {
					const Icon = tile.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: tile.to,
						className: "rh-panel flex min-h-16 items-center gap-3 rounded-xl px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-10 place-items-center rounded-lg border border-line bg-void/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: tile.priority ? "size-5 text-gold" : "size-5 text-field" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-fg",
								children: tile.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: tile.sub
							})]
						})]
					}, tile.title);
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-medium uppercase tracking-[0.2em] text-amethyst",
					children: "Operating system active"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-display text-[1.75rem] leading-tight text-fg",
					children: [
						greeting,
						", ",
						name,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [rankFromLevel(level), " · disciplined discovery."]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XpRibbon, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCloverOrb, { variant: "inline" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncStatusBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/identify",
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					hairline: true,
					className: "flex items-center gap-4 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-14 place-items-center rounded-lg bg-gold text-void",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.16em] text-gold",
								children: "Primary action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl text-fg",
								children: "Scan a specimen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Photo or field key. Then choose the ethical path."
							})
						]
					})]
				})
			}),
			nextQuest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/quests",
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "flex items-center gap-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-cyan" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.16em] text-faint",
								children: "Next in the briefing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: nextQuest.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs tabular-nums text-muted",
							children: [
								"+",
								nextQuest.xp,
								" XP"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Today's hunt" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/explore/$id",
				params: { id: featured.id },
				className: "rh-panel block rounded-xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] uppercase tracking-[0.16em] text-field",
						children: [
							featured.state,
							" · ",
							featured.access
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-lg text-fg",
						children: featured.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: featured.notes
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-faint",
						children: featured.finds.join(" · ")
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Species of the hour" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pedia/$id",
				params: { id: mineral.id },
				className: "rh-panel flex items-center gap-3 rounded-xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
					hue: mineral.hue,
					system: mineral.crystalSystem,
					size: 56
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-fg",
						children: mineral.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							mineral.formula,
							" · Mohs ",
							mineral.hardnessMin
						]
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Recent GeoDex" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/vault",
					className: "text-xs text-muted hover:text-fg",
					children: "Open"
				})]
			}), specimens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "p-4 text-sm text-muted",
				children: "Empty cabinet. Scan your first specimen — collect it, or mark it in place."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: specimens.slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/vault/$id",
					params: { id: s.id },
					className: "rh-panel flex items-center gap-3 rounded-xl px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
						hue: MINERALS.find((m) => m.id === s.mineralId)?.hue ?? "#8d7cff",
						system: s.crystalSystem,
						size: 40
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm text-fg",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-faint",
							children: [
								s.disposition === "affixed_logged" ? "In place" : s.disposition === "restricted_observed" ? "Observed" : "Collected",
								" ",
								"· ",
								formatRelative(s.createdAt)
							]
						})]
					})]
				}) }, s.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/clover",
					className: "rh-panel flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm text-cyan",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Clover chamber"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/trips",
					className: "rh-panel flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }), " Plan a trip"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "pb-4 text-center text-[11px] text-faint",
				children: [
					streak,
					" day streak · ",
					specimens.length,
					" in GeoDex"
				]
			})
		]
	});
}
//#endregion
export { Home as component };
