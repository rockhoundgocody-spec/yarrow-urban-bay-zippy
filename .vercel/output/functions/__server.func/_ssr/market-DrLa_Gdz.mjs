import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MINERALS } from "./minerals-DfAvtWOL.mjs";
import { h as formatUsd, n as CrystalGem, s as MARKET_SEED, u as RarityChip } from "./router-BX6Bgd6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-DrLa_Gdz.js
var import_jsx_runtime = require_jsx_runtime();
function MarketPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-[0.18em] text-gold",
				children: "Commerce"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-2xl text-fg",
				children: "Specimen market"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "A reading list of cabinet material. Listings are illustrative — no checkout in this field OS."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: MARKET_SEED.map((l) => {
				const m = MINERALS.find((x) => x.id === l.mineralId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rh-panel rounded-xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrystalGem, {
								hue: l.hue,
								system: m?.crystalSystem,
								size: 52
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-fg",
											children: l.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display tabular-nums text-gold",
											children: formatUsd(l.price)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: [
											l.seller,
											" · ",
											l.locale
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RarityChip, { rarity: l.rarity })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: l.note
						}),
						l.mineralId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/pedia/$id",
							params: { id: l.mineralId },
							className: "mt-3 inline-block text-xs text-cyan",
							children: ["Study ", l.mineral]
						})
					]
				}, l.id);
			})
		})]
	});
}
//#endregion
export { MarketPage as component };
