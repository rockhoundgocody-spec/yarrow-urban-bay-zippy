import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as uid, a as useField, c as Button, d as SectionLabel, l as Panel } from "./router-BX6Bgd6N.mjs";
import { c as SITE_BY_ID, s as SITES } from "./router-BX6Bgd6N2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trips-Dk2yO-FN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TripsPage() {
	const trips = useField((s) => s.trips);
	const addTrip = useField((s) => s.addTrip);
	const toggleGear = useField((s) => s.toggleGear);
	const [name, setName] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [siteId, setSiteId] = (0, import_react.useState)(SITES[0]?.id ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-field",
					children: "Field ops"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl text-fg",
					children: "Trip planner"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Itinerary, gear, land-status reminder. Pack the night before."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "New itinerary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Trip name",
						className: "h-11 w-full rounded-md border border-line bg-void px-3 text-sm text-fg outline-none focus:border-field"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value),
						className: "h-11 w-full rounded-md border border-line bg-void px-3 text-sm text-fg outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: siteId,
						onChange: (e) => setSiteId(e.target.value),
						className: "h-11 w-full rounded-md border border-line bg-void px-3 text-sm text-fg",
						children: SITES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							children: [
								s.name,
								" — ",
								s.state
							]
						}, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "primary",
						className: "w-full",
						onClick: () => {
							if (!name.trim()) return;
							addTrip({
								name: name.trim(),
								date,
								siteIds: siteId ? [siteId] : [],
								notes: "",
								gear: [
									{
										id: uid("g"),
										label: "Safety glasses",
										packed: false
									},
									{
										id: uid("g"),
										label: "Crack hammer",
										packed: false
									},
									{
										id: uid("g"),
										label: "Water",
										packed: false
									},
									{
										id: uid("g"),
										label: "Sample bags",
										packed: false
									},
									{
										id: uid("g"),
										label: "First aid",
										packed: false
									}
								]
							});
							setName("");
						},
						children: "Create trip"
					})
				]
			}),
			trips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No trips yet. Start from a locality or the form above."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: trips.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rh-panel rounded-xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-fg",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1",
							children: t.siteIds.map((id) => {
								const s = SITE_BY_ID[id];
								return s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/explore/$id",
									params: { id },
									className: "text-sm text-cyan",
									children: s.name
								}) }, id) : null;
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-1",
							children: t.gear.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: g.packed,
									onChange: () => toggleGear(t.id, g.id),
									className: "size-4 accent-field"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: g.packed ? "text-muted line-through" : "text-fg",
									children: g.label
								})]
							}, g.id))
						})
					]
				}, t.id))
			})
		]
	});
}
//#endregion
export { TripsPage as component };
