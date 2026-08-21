import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useField, c as Button, f as Stat, h as formatUsd, i as rankFromLevel, l as Panel, o as xpToNext, p as cn } from "./router-BX6Bgd6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CAmAZAmd.js
var import_jsx_runtime = require_jsx_runtime();
var BADGE_CATALOG = [
	{
		id: "first-scan",
		name: "First Light",
		detail: "Logged your first specimen."
	},
	{
		id: "vault-5",
		name: "Cabinet of Five",
		detail: "Five specimens in GeoDex."
	},
	{
		id: "species-10",
		name: "Ten Species",
		detail: "Ten distinct minerals documented."
	},
	{
		id: "streak-3",
		name: "Three-Day Discipline",
		detail: "Opened the field OS three days running."
	},
	{
		id: "streak-7",
		name: "Week in the Field",
		detail: "Seven-day streak."
	},
	{
		id: "legendary-find",
		name: "Legendary",
		detail: "Logged a legendary-tier find."
	},
	{
		id: "map-3",
		name: "Route Book",
		detail: "Saved three localities."
	},
	{
		id: "clover",
		name: "Clover Initiate",
		detail: "Asked the field guide a question."
	},
	{
		id: "quest-day",
		name: "Full Briefing",
		detail: "Cleared every daily quest."
	},
	{
		id: "first-trip",
		name: "Itinerary",
		detail: "Planned a field trip."
	},
	{
		id: "steward-3",
		name: "Leave No Trace",
		detail: "Marked three finds in place."
	}
];
function ProfilePage() {
	const name = useField((s) => s.displayName);
	const xp = useField((s) => s.xp);
	const streak = useField((s) => s.streak);
	const specimens = useField((s) => s.specimens);
	const badges = useField((s) => s.badges);
	const saved = useField((s) => s.savedSiteIds);
	const collector = useField((s) => s.collectorXp);
	const steward = useField((s) => s.stewardXp);
	const scientist = useField((s) => s.scientistXp);
	const explorer = useField((s) => s.explorerXp);
	const completeOnboarding = useField((s) => s.completeOnboarding);
	const reset = useField((s) => s.resetLocal);
	const { level } = xpToNext(xp);
	const value = specimens.filter((s) => s.collected).reduce((a, s) => a + ((s.valueLow ?? 0) + (s.valueHigh ?? 0)) / 2, 0);
	const earned = new Set(badges.map((b) => b.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-amethyst",
					children: "Progress"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl text-fg",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						rankFromLevel(level),
						" · Level ",
						level
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "grid grid-cols-2 gap-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "XP",
						value: xp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Streak",
						value: `${streak}d`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "GeoDex",
						value: specimens.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Collected value",
						value: formatUsd(value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Saved sites",
						value: saved.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Badges",
						value: `${earned.size}/${BADGE_CATALOG.length}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "grid grid-cols-2 gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Collector",
						value: collector ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Steward",
						value: steward ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Scientist",
						value: scientist ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Explorer",
						value: explorer ?? 0
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-[10px] uppercase tracking-[0.16em] text-faint",
				children: "Credentials"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-2",
				children: BADGE_CATALOG.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("rounded-xl border p-3", earned.has(b.id) ? "border-gold/35 bg-gold/8" : "border-line opacity-50"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg",
						children: b.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-muted",
						children: b.detail
					})]
				}, b.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] uppercase tracking-[0.16em] text-faint",
					children: "Field name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					defaultValue: name,
					onBlur: (e) => completeOnboarding(e.target.value),
					className: "mt-2 h-11 w-full rounded-md border border-line bg-obsidian px-3 text-sm text-fg outline-none focus:border-amethyst"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "line",
				className: "w-full text-danger",
				onClick: () => reset(),
				children: "Reset local field data"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] leading-relaxed text-faint",
				children: "Everything here stays on this device. No sign-in — say the word and I'll add accounts."
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
