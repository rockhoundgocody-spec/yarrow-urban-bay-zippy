import { h as require_jsx_runtime, m as useNavigate, p as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-E6H8ZwFP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-zv3UGgEF.mjs";
import { o as Trash2 } from "../_libs/lucide-react.mjs";
import { _ as Panel, c as deletePhoto, g as Button, m as useField, v as RarityChip, x as CrystalGem } from "./router-zv3UGgEF2.mjs";
import { t as nextInChain } from "./chains-BYKGPKKQ.mjs";
import { t as usePhoto } from "./use-photo-CnqYJ6YN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault_._id-G-a38YCO.js
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
	const restore = useField((s) => s.restoreSpecimen);
	const photo = usePhoto(specimen?.id, specimen?.hasPhoto);
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
				className: "text-[12px] uppercase tracking-[0.18em] text-cyan",
				children: "GeoDex specimen"
			}),
			photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo,
				alt: specimen.name,
				className: "w-full rounded-xl object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
					hue: mineral?.hue ?? "#bfe9ff",
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
							className: "text-[12px] uppercase tracking-[0.14em] text-faint",
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
					["Collected", specimen.collected ? "Yes" : "No — left or observed"],
					["Source", specimen.source],
					["Legal", specimen.legalStatus?.replace("_", " ")],
					["Privacy", specimen.geoPrivacy?.replace("_", " ")]
				].filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-obsidian p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[12px] uppercase tracking-[0.14em] text-faint",
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
						className: "text-[12px] uppercase tracking-[0.16em] text-cyan",
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
					className: "text-[12px] uppercase tracking-[0.16em] text-faint",
					children: "Field notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: specimen.notes,
					onChange: (e) => update(specimen.id, { notes: e.target.value }),
					rows: 3,
					className: "mt-2 w-full rounded-md border border-line bg-obsidian p-3 text-sm text-fg outline-none focus:border-frost",
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
					const removed = specimen;
					remove(removed.id);
					const timer = window.setTimeout(() => {
						if (removed.hasPhoto) deletePhoto(removed.id).catch(() => void 0);
					}, 1e4);
					toast(`Removed ${removed.name} from GeoDex`, {
						duration: 1e4,
						action: {
							label: "Undo",
							onClick: () => {
								window.clearTimeout(timer);
								restore(removed);
							}
						}
					});
					navigate({ to: "/vault" });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Remove from GeoDex"]
			})
		]
	});
}
//#endregion
export { SpecimenPage as component };
