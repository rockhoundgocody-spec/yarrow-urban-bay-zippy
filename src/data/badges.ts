import type { BadgeId } from "@/lib/types";

export const BADGE_CATALOG: { id: BadgeId; name: string; detail: string }[] = [
  { id: "first-scan", name: "First Light", detail: "Logged your first specimen." },
  { id: "vault-5", name: "Cabinet of Five", detail: "Five specimens in GeoDex." },
  { id: "species-10", name: "Ten Species", detail: "Ten distinct minerals documented." },
  { id: "streak-3", name: "Three-Day Discipline", detail: "Opened the field OS three days running." },
  { id: "streak-7", name: "Week in the Field", detail: "Seven-day streak." },
  { id: "legendary-find", name: "Legendary", detail: "Logged a legendary-tier find." },
  { id: "map-3", name: "Route Book", detail: "Saved three localities." },
  { id: "clover", name: "Clover Initiate", detail: "Asked the field guide a question." },
  { id: "quest-day", name: "Full Briefing", detail: "Cleared every daily quest." },
  { id: "first-trip", name: "Itinerary", detail: "Planned a field trip." },
  { id: "steward-3", name: "Leave No Trace", detail: "Marked three finds in place." },
];
