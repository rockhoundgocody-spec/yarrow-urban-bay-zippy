import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react, h as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as object, i as number, n as array, o as record, r as literal, s as string } from "../_libs/zod.mjs";
import { T as Download, i as Upload, p as RotateCcw } from "../_libs/lucide-react.mjs";
import { S as cn, _ as Panel, b as Stat, f as putPhoto, g as Button, h as xpToNext, m as useField, p as rankFromLevel, s as clearPhotos, u as getPhotos } from "./router-Ffn1aSfQ2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DmIHY1op.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
var EXPORT_FORMAT = "rockhound-go-geodex";
var EXPORT_VERSION = 1;
var ImportFile = object({
	format: literal(EXPORT_FORMAT),
	version: number().int().min(1).max(EXPORT_VERSION),
	exportedAt: string(),
	data: object({
		displayName: string().max(60),
		xp: number().min(0),
		collectorXp: number().min(0),
		stewardXp: number().min(0),
		scientistXp: number().min(0),
		explorerXp: number().min(0),
		streak: number().int().min(0),
		lastActiveDay: string().nullable(),
		specimens: array(object({
			id: string(),
			name: string(),
			createdAt: number()
		}).passthrough()).max(1e4),
		savedSiteIds: array(string()),
		visitedSiteIds: array(string()),
		trips: array(object({ id: string() }).passthrough()),
		badges: array(object({
			id: string(),
			earnedAt: number()
		}).passthrough()),
		readSpeciesIds: array(string()).default([])
	}),
	photos: record(string(), string().regex(/^data:image\/(jpeg|png|webp);base64,/)).default({})
});
function pickPersisted() {
	const s = useField.getState();
	return {
		displayName: s.displayName,
		xp: s.xp,
		collectorXp: s.collectorXp,
		stewardXp: s.stewardXp,
		scientistXp: s.scientistXp,
		explorerXp: s.explorerXp,
		streak: s.streak,
		lastActiveDay: s.lastActiveDay,
		specimens: s.specimens.map(({ photoDataUrl: _p, ...rest }) => rest),
		savedSiteIds: s.savedSiteIds,
		visitedSiteIds: s.visitedSiteIds,
		trips: s.trips,
		badges: s.badges,
		readSpeciesIds: s.readSpeciesIds
	};
}
/** Two-tap confirm: first tap arms, second tap within 5 s acts. Glove-friendly, no modal. */
function useArm() {
	const [armed, setArmed] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => () => window.clearTimeout(timer.current), []);
	const tap = () => {
		if (armed) {
			window.clearTimeout(timer.current);
			setArmed(false);
			return true;
		}
		setArmed(true);
		timer.current = window.setTimeout(() => setArmed(false), 5e3);
		return false;
	};
	return [armed, tap];
}
function DataControls() {
	const fileRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [resetArmed, tapReset] = useArm();
	const reset = useField((s) => s.resetLocal);
	const replaceAll = useField((s) => s.replaceAll);
	const count = useField((s) => s.specimens.length);
	async function exportData() {
		setBusy(true);
		try {
			const data = pickPersisted();
			const photos = await getPhotos(data.specimens.filter((s) => s.hasPhoto).map((s) => s.id));
			const blob = new Blob([JSON.stringify({
				format: EXPORT_FORMAT,
				version: EXPORT_VERSION,
				exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
				data,
				photos
			})], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `rockhound-go-geodex-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.setTimeout(() => URL.revokeObjectURL(url), 2e3);
			toast.success(`Exported ${data.specimens.length} specimens and ${Object.keys(photos).length} photos`);
		} catch {
			toast.error("Export failed. Nothing was changed.");
		} finally {
			setBusy(false);
		}
	}
	async function importFile(file) {
		setBusy(true);
		try {
			const parsed = ImportFile.safeParse(JSON.parse(await file.text()));
			if (!parsed.success) {
				toast.error("That file isn't a RockHound GO export.");
				return;
			}
			const { data, photos } = parsed.data;
			await clearPhotos().catch(() => void 0);
			let saved = 0;
			for (const [id, url] of Object.entries(photos)) if (await putPhoto(id, url).then(() => true).catch(() => false)) saved++;
			replaceAll({
				...data,
				specimens: data.specimens.map((s) => ({
					...s,
					hasPhoto: Boolean(photos[s.id])
				}))
			});
			toast.success(`Imported ${data.specimens.length} specimens and ${saved} photos`);
		} catch {
			toast.error("Couldn't read that file. Nothing was changed.");
		} finally {
			setBusy(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		"aria-labelledby": "data-heading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "data-heading",
				className: "text-xs uppercase tracking-[0.16em] text-faint",
				children: "Your data"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] leading-relaxed text-muted",
				children: "Your GeoDex, trips and progress are stored only on this device. Export a backup file regularly — clearing your browser data or changing phones erases what isn't backed up."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "line",
					className: "min-h-12",
					disabled: busy,
					onClick: () => void exportData(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						className: "size-4",
						"aria-hidden": "true"
					}), " Export"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "line",
					className: "min-h-12",
					disabled: busy,
					onClick: () => fileRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
						className: "size-4",
						"aria-hidden": "true"
					}), " Import"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "application/json,.json",
				className: "sr-only",
				"aria-label": "Import a RockHound GO backup file",
				onChange: (e) => {
					const f = e.target.files?.[0];
					if (f) importFile(f);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] text-faint",
				children: "Importing replaces what's on this device with the backup."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "line",
				className: "min-h-12 w-full text-danger",
				disabled: busy,
				"aria-live": "polite",
				onClick: () => {
					if (!tapReset()) return;
					reset();
					clearPhotos().catch(() => void 0);
					toast("Field data erased from this device.");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
					className: "size-4",
					"aria-hidden": "true"
				}), resetArmed ? `Tap again to erase ${count} specimens and all progress` : "Erase all data on this device"]
			})
		]
	});
}
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
	const { level } = xpToNext(xp);
	const species = new Set(specimens.map((s) => s.mineralId || s.name.toLowerCase())).size;
	const earned = new Set(badges.map((b) => b.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] uppercase tracking-[0.18em] text-frost",
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
						label: "Species",
						value: species
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
				className: "mb-3 text-[12px] uppercase tracking-[0.16em] text-faint",
				children: "Credentials"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-2",
				children: BADGE_CATALOG.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("rounded-xl border p-3", earned.has(b.id) ? "border-gold/35 bg-gold/8" : "border-line opacity-50"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg",
						children: b.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: b.detail
					})]
				}, b.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[12px] uppercase tracking-[0.16em] text-faint",
					children: "Field name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					defaultValue: name,
					onBlur: (e) => completeOnboarding(e.target.value),
					className: "mt-2 h-12 w-full rounded-md border border-line bg-obsidian px-3 text-sm text-fg outline-none focus:border-frost"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataControls, {})
		]
	});
}
//#endregion
export { ProfilePage as component };
