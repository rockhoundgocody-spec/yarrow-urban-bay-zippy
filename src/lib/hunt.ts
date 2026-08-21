import { SITES, type FieldSite } from "@/data/locations";
import { findMineralByName } from "@/data/minerals";

export type HuntSuggestion = {
  mineral_name: string;
  hotspot_name: string;
  distance_mi: number | null;
  difficulty: FieldSite["difficulty"];
  what_to_look_for: string;
  why: string;
  siteId: string;
};

export type HuntResult = {
  clover_intro: string;
  suggestions: HuntSuggestion[];
  collection_size: number;
};

function distanceMi(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function suggestHunt(input: {
  collection: string[];
  name: string;
  lat?: number | null;
  lng?: number | null;
}): HuntResult {
  const owned = new Set(input.collection.map((n) => n.toLowerCase()));
  type Scored = HuntSuggestion & { score: number };
  const scored: Scored[] = [];

  for (const site of SITES) {
    const dist =
      input.lat != null && input.lng != null ? Math.round(distanceMi(input.lat, input.lng, site.lat, site.lng)) : null;
    for (const find of site.finds) {
      if (owned.has(find.toLowerCase())) continue;
      const mineral = findMineralByName(find);
      let score = 4;
      if (site.access === "public") score += 2;
      if (site.difficulty === "easy") score += 1;
      if (dist != null) score += Math.max(0, 8 - dist / 120);
      if (mineral && mineral.rarity !== "common") score += 1;
      scored.push({
        mineral_name: find,
        hotspot_name: `${site.name}, ${site.state}`,
        distance_mi: dist,
        difficulty: site.difficulty,
        what_to_look_for: mineral?.keyFeatures[0] ?? site.notes,
        why: `You don't have ${find} yet, and ${site.name} is a mapped ${site.access} locality.`,
        siteId: site.id,
        score,
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const suggestions: HuntSuggestion[] = [];
  for (const row of scored) {
    const key = row.mineral_name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    suggestions.push(row);
    if (suggestions.length >= 3) break;
  }

  const intro = suggestions.length
    ? `${input.name}, I'd hunt these next — gaps in your cabinet that actually occur at mapped sites. Verify land status on the ground.`
    : `${input.name}, your cabinet already covers the mapped finds. Open Mineralpedia and pick a new family to chase.`;

  return {
    clover_intro: intro,
    suggestions,
    collection_size: input.collection.length,
  };
}
