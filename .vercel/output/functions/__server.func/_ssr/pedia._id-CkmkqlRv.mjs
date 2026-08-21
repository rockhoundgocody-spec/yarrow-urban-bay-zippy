import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as MINERAL_BY_ID, r as findMineralByName } from "./minerals-DfAvtWOL.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useField, c as Button, l as Panel, n as CrystalGem, r as XP_REWARDS, u as RarityChip } from "./router-BX6Bgd6N.mjs";
import { a as Route$1, p as mineralToResult, s as SITES } from "./router-BX6Bgd6N2.mjs";
import { t as nextInChain } from "./chains-BYKGPKKQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pedia._id-CkmkqlRv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var READ = /* @__PURE__ */ new Set();
function MineralPage() {
	const { id } = Route$1.useParams();
	const m = MINERAL_BY_ID[id];
	const complete = useField((s) => s.completeQuest);
	const addSpecimen = useField((s) => s.addSpecimen);
	const addXpLane = useField((s) => s.addXpLane);
	const chain = nextInChain(m?.id)[0];
	const nextMin = chain ? MINERAL_BY_ID[chain.nextId] : void 0;
	(0, import_react.useEffect)(() => {
		if (!m) return;
		complete("pedia");
		if (!READ.has(m.id)) {
			READ.add(m.id);
			addXpLane("scientist", XP_REWARDS.pediaRead);
		}
	}, [
		m,
		complete,
		addXpLane
	]);
	if (!m) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "p-6 text-sm text-muted",
		children: ["Unknown species. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/pedia",
			children: "Catalog"
		})]
	});
	const sites = SITES.filter((s) => s.finds.includes(m.name));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
					hue: m.hue,
					system: m.crystalSystem,
					size: 80
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.18em] text-amethyst",
						children: m.family
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-2xl text-fg",
						children: m.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-sm text-muted",
						children: m.formula
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RarityChip, { rarity: m.rarity })
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: m.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-2 gap-2 text-xs",
				children: [
					["Mohs", m.hardnessMin != null ? `${m.hardnessMin}${m.hardnessMax !== m.hardnessMin ? `–${m.hardnessMax}` : ""}` : "—"],
					["Luster", m.luster.join(", ")],
					["Streak", m.streak],
					["System", m.crystalSystem],
					["Habit", m.habit.join(", ")],
					["SG", m.sgMin != null ? `${m.sgMin}–${m.sgMax}` : "—"],
					["Cleavage", m.cleavage],
					["Color", m.colors.slice(0, 4).join(", ")]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-obsidian p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[10px] uppercase tracking-[0.14em] text-faint",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 capitalize text-fg",
						children: v
					})]
				}, k))
			}),
			chain && nextMin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pedia/$id",
				params: { id: nextMin.id },
				className: "rh-panel block rounded-xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] uppercase tracking-[0.16em] text-cyan",
						children: ["Discovery chain · ", chain.chain.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-fg",
						children: ["Related: ", nextMin.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted",
						children: chain.chain.note
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[10px] uppercase tracking-[0.16em] text-faint",
				children: "Key features"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm text-muted",
				children: m.keyFeatures.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", f] }, f))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[10px] uppercase tracking-[0.16em] text-faint",
				children: "Field tests"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm text-muted",
				children: m.fieldTests.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", f] }, f))
			})] }),
			m.similar.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[10px] uppercase tracking-[0.16em] text-gold",
				children: "Often confused with"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: m.similar.map((s) => {
					const alt = findMineralByName(s.name);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line p-3 text-sm",
						children: [alt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pedia/$id",
							params: { id: alt.id },
							className: "text-fg",
							children: s.name
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: s.note
						})]
					}, s.name);
				})
			})] }),
			sites.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[10px] uppercase tracking-[0.16em] text-field",
				children: "Where to look"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/explore/$id",
					params: { id: s.id },
					className: "text-sm text-fg",
					children: [s.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [" · ", s.state]
					})]
				}) }, s.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "gold",
				className: "w-full",
				onClick: () => {
					const r = mineralToResult(m, 1, "sample");
					addSpecimen({
						mineralId: m.id,
						name: m.name,
						family: m.family,
						formula: m.formula,
						rarity: m.rarity,
						confidence: 1,
						notes: "Logged from Mineralpedia",
						hardness: r.hardness,
						luster: r.luster,
						crystalSystem: r.crystalSystem,
						valueLow: m.valueLow,
						valueHigh: m.valueHigh,
						fieldNotes: m.blurb,
						source: "sample",
						disposition: "chattel_collected",
						collected: true,
						leftInPlace: false,
						legalStatus: "unknown",
						ethicsPromptShown: true,
						userConfirmedLegalAccess: false,
						geoPrivacy: "exact_private"
					});
					toast.success("Study specimen added to GeoDex");
				},
				children: "Add study specimen"
			})
		]
	});
}
//#endregion
export { MineralPage as component };
