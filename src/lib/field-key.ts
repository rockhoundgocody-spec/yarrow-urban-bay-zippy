import { MINERALS, findMineralByName, type Mineral, type Rarity } from "@/data/minerals";
import type { IdentifyResult } from "@/lib/types";

/** Pure, client-safe identification helpers (no server or network code). */
export const RARITY_SET = new Set<Rarity>(["common", "uncommon", "rare", "epic", "legendary"]);

export function asRarity(s: string | undefined, fallback: Rarity): Rarity {
  const v = (s || "").toLowerCase() as Rarity;
  return RARITY_SET.has(v) ? v : fallback;
}

export function mergeCatalog(raw: IdentifyResult): IdentifyResult {
  const hit = findMineralByName(raw.name);
  if (!hit) return raw;
  return {
    ...raw,
    mineralId: hit.id,
    name: hit.name,
    family: raw.family || hit.family,
    formula: raw.formula || hit.formula,
    hardness: raw.hardness || (hit.hardnessMin != null ? `${hit.hardnessMin}–${hit.hardnessMax}` : raw.hardness),
    luster: raw.luster || hit.luster[0],
    crystalSystem: raw.crystalSystem || hit.crystalSystem,
    streak: raw.streak || hit.streak,
    color: raw.color || hit.colors.slice(0, 3).join(", "),
    rarity: raw.rarity || hit.rarity,
    keyFeatures: raw.keyFeatures.length ? raw.keyFeatures : hit.keyFeatures.slice(0, 4),
  };
}

export type FieldKey = {
  color?: string;
  hardness?: number;
  luster?: string;
  streak?: string;
  system?: string;
};

function scoreMineral(m: Mineral, key: FieldKey): number {
  let s = 0;
  if (key.color) {
    const c = key.color.toLowerCase();
    if (m.colors.some((x) => x.toLowerCase().includes(c) || c.includes(x.toLowerCase()))) s += 3;
    if (m.name.toLowerCase().includes(c)) s += 1;
  }
  if (key.hardness != null && m.hardnessMin != null && m.hardnessMax != null) {
    if (key.hardness >= m.hardnessMin - 0.5 && key.hardness <= m.hardnessMax + 0.5) s += 3;
    else if (Math.abs(key.hardness - (m.hardnessMin + m.hardnessMax) / 2) <= 1.5) s += 1;
  }
  if (key.luster) {
    const l = key.luster.toLowerCase();
    if (m.luster.some((x) => x.toLowerCase().includes(l))) s += 2;
  }
  if (key.streak) {
    const st = key.streak.toLowerCase();
    if (m.streak.toLowerCase().includes(st) || st.includes(m.streak.toLowerCase().split(" ")[0] || "___")) s += 2;
  }
  if (key.system) {
    if (m.crystalSystem.toLowerCase().includes(key.system.toLowerCase())) s += 2;
  }
  return s;
}

export function matchFieldKey(key: FieldKey): IdentifyResult[] {
  const ranked = MINERALS.map((m) => ({ m, score: scoreMineral(m, key) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  if (!ranked.length) return [];
  const top = ranked[0].score;
  return ranked.map(({ m, score }) => mineralToResult(m, Math.max(0.28, Math.min(0.92, (score / Math.max(top, 1)) * 0.78)), "field-key"));
}

export function mineralToResult(m: Mineral, confidence: number, source: IdentifyResult["source"]): IdentifyResult {
  return {
    name: m.name,
    mineralId: m.id,
    family: m.family,
    formula: m.formula,
    confidence,
    rarity: m.rarity,
    hardness: m.hardnessMin != null ? `${m.hardnessMin}${m.hardnessMax !== m.hardnessMin ? `–${m.hardnessMax}` : ""}` : undefined,
    luster: m.luster[0],
    crystalSystem: m.crystalSystem,
    streak: m.streak,
    color: m.colors.slice(0, 3).join(", "),
    fieldNotes: m.blurb,
    keyFeatures: m.keyFeatures.slice(0, 4),
    alternatives: m.similar.slice(0, 3).map((s, i) => ({ name: s.name, confidence: Math.max(0.15, confidence - 0.18 - i * 0.08) })),
    notGeological: false,
    source,
  };
}

