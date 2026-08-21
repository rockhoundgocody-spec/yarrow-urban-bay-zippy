import { findMineralByName, MINERALS } from "@/data/minerals";
import { todayKey } from "@/lib/utils";
import { xpToNext } from "@/lib/xp";
import type { Specimen } from "@/lib/types";

export type CompanionMood = "calm" | "keen" | "radiant" | "drowsy";

export type CompanionState = {
  name: string;
  level: number;
  mood: CompanionMood;
  energy: number;
  streak: number;
  todaysFinds: number;
  collection: string[];
};

export function companionFromField(input: {
  displayName: string;
  xp: number;
  streak: number;
  specimens: Specimen[];
}): CompanionState {
  const { level } = xpToNext(input.xp);
  const hour = new Date().getHours();
  const today = todayKey();
  const todaysFinds = input.specimens.filter((s) => todayKey(new Date(s.createdAt)) === today).length;
  const collection = [...new Set(input.specimens.map((s) => s.name))].slice(0, 24);
  const mood: CompanionMood =
    todaysFinds > 0
      ? "radiant"
      : hour >= 22 || hour < 6
        ? "drowsy"
        : input.streak >= 3
          ? "keen"
          : "calm";
  const energy = Math.max(28, Math.min(100, 52 + input.streak * 6 + todaysFinds * 8 - (hour >= 22 ? 12 : 0)));
  return {
    name: input.displayName || "explorer",
    level,
    mood,
    energy,
    streak: input.streak,
    todaysFinds,
    collection,
  };
}

export const MOOD_LABEL: Record<CompanionMood, string> = {
  calm: "Calm",
  keen: "Keen",
  radiant: "Radiant",
  drowsy: "Drowsy",
};

const FALLBACKS = [
  {
    keys: ["pyrite", "fool", "gold"],
    text: "Pyrite vs gold: streak and hardness. Pyrite streaks green-black and shatters. Gold streaks yellow and flattens. Density is the rest of the story.",
  },
  {
    keys: ["calcite", "vinegar", "acid", "fizz"],
    text: "Vinegar is enough for calcite — it fizzes on a fresh face. Dolomite usually needs powdering first. Quartz never fizzes. That's the ten-second carbonate test.",
  },
  {
    keys: ["pack", "desert", "kit", "gear"],
    text: "Desert kit: water, sun, closed shoes, rock hammer, goggles, first aid, and a printed land-status note. Confirm access before you dig — an app is not a permit.",
  },
  {
    keys: ["agate", "jasper", "superior"],
    text: "Lake Superior agate shows tight fortification banding and a waxy translucence. Jasper is opaque. Wet the face — banding is the tell.",
  },
  {
    keys: ["hardness", "mohs", "scratch"],
    text: "Field Mohs: fingernail 2.5, penny 3, knife 5.5, glass 5.5, streak plate 7. Test a point, not a weathered skin.",
  },
];

export function localCloverReply(question: string, companion: CompanionState): string {
  const q = question.toLowerCase();
  const hit = FALLBACKS.find((f) => f.keys.some((k) => q.includes(k)));
  if (hit) return hit.text;
  const mineral = MINERALS.find((m) => q.includes(m.name.toLowerCase()));
  if (mineral) {
    return `${mineral.name}: ${mineral.blurb} Field test — ${mineral.fieldTests[0] ?? mineral.keyFeatures[0]}.`;
  }
  if (q.includes("log") || q.includes("found")) {
    return "Tell me the species and roughly where you picked it. I'll log it to GeoDex so you can finish the ethics path later.";
  }
  if (q.includes("hunt") || q.includes("where") || q.includes("next")) {
    return `${companion.name}, tap Hunt and I'll match gaps in your cabinet to mapped sites. I won't invent a legal locality.`;
  }
  return `I'm on field memory for a second, ${companion.name}. Ask a test, a packing list, or a lookalike — I'll stay practical.`;
}

export function parseLoggedFind(details: string): {
  name: string;
  mineralId?: string;
  family: string;
  formula?: string;
  rarity: Specimen["rarity"];
} {
  const mineral = findMineralByName(details) ?? MINERALS.find((m) => details.toLowerCase().includes(m.name.toLowerCase()));
  if (mineral) {
    return {
      name: mineral.name,
      mineralId: mineral.id,
      family: mineral.family,
      formula: mineral.formula,
      rarity: mineral.rarity,
    };
  }
  const name = details.replace(/^(log|record|add|found|i found)\s+/i, "").split(/[,.]/)[0]?.trim() || "Unnamed specimen";
  return { name: name.slice(0, 48), family: "Undetermined", rarity: "common" };
}
