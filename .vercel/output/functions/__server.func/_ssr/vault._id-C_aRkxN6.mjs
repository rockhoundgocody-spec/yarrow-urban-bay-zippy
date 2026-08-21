import { H as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-DfAvtWOL.mjs";
import { a as Trash2 } from "../_libs/lucide-react.mjs";
import { a as useField, c as Button, h as formatUsd, l as Panel, n as CrystalGem, u as RarityChip } from "./router-BX6Bgd6N.mjs";
import { i as Route } from "./router-BX6Bgd6N2.mjs";
import { t as nextInChain } from "./chains-BYKGPKKQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault._id-C_aRkxN6.js
var import_jsx_runtime = require_jsx_runtime();
var DISPO_LABEL = {
	chattel_collected: "Collected · GeoDex",
	affixed_logged: "Marked in place · Steward",
	restricted_observed: "Observed only · restricted ground",
	unknown: "Unknown path"
};
function SpecimenPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const specimen = useField((s) => s.specimens.find((x) => x.id === id));
	const update = useField((s) => s.updateSpecimen);
	const remove = useField((s) => s.removeSpecimen);
	const mineral = MINERALS.find((m) => m.id === specimen?.mineralId);
	const chain = nextInChain(specimen?.mineralId)[0];
	const nextMin = chain ? MINERALS.find((m) => m.id === chain.nextId) : void 0;
	if (!specimen) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "p-6 text-sm text-muted",
		children: ["Specimen not in GeoDex. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/vault",
			children: "Return"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-[0.18em] text-cyan",
				children: "GeoDex specimen"
			}),
			specimen.photoDataUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: specimen.photoDataUrl,
				alt: specimen.name,
				className: "w-full rounded-xl object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
					hue: mineral?.hue ?? "#8d7cff",
					system: specimen.crystalSystem,
					size: 64
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl text-fg",
						children: specimen.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [specimen.family, specimen.formula ? ` · ${specimen.formula}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RarityChip, { rarity: specimen.rarity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.14em] text-faint",
							children: DISPO_LABEL[specimen.disposition] ?? specimen.disposition
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-2 gap-2 text-xs",
				children: [
					["Confidence", `${Math.round(specimen.confidence * 100)}%`],
					["Hardness", specimen.hardness],
					["Luster", specimen.luster],
					["System", specimen.crystalSystem],
					["Est. value", specimen.collected && specimen.valueLow != null ? `${formatUsd(specimen.valueLow)}–${formatUsd(specimen.valueHigh ?? specimen.valueLow)}` : specimen.collected ? null : "Not collected"],
					["Source", specimen.source],
					["Legal", specimen.legalStatus?.replace("_", " ")],
					["Privacy", specimen.geoPrivacy?.replace("_", " ")]
				].filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			specimen.fieldNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: specimen.fieldNotes
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
						children: ["Next observation: ", nextMin.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted",
						children: chain.chain.note
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] uppercase tracking-[0.16em] text-faint",
					children: "Field notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: specimen.notes,
					onChange: (e) => update(specimen.id, { notes: e.target.value }),
					rows: 3,
					className: "mt-2 w-full rounded-md border border-line bg-obsidian p-3 text-sm text-fg outline-none focus:border-amethyst",
					placeholder: "Locality, weather, companions, tests run…"
				})]
			}),
			mineral && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pedia/$id",
				params: { id: mineral.id },
				className: "block text-sm text-cyan",
				children: [
					"Open ",
					mineral.name,
					" in Mineralpedia"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "line",
				className: "w-full text-danger",
				onClick: () => {
					remove(specimen.id);
					navigate({ to: "/vault" });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Remove from GeoDex"]
			})
		]
	});
}
//#endregion
export { SpecimenPage as component };
