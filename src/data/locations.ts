export type AccessType = "public" | "fee" | "permit" | "permission";
export type Difficulty = "easy" | "moderate" | "hard";
export type SiteCategory =
  | "state_park"
  | "fee_dig"
  | "beach"
  | "desert"
  | "pegmatite"
  | "quarry"
  | "museum"
  | "alpine"
  | "historic_mine"
  | "forest"
  | "outcrop"
  | "gravel_bar";


export type FieldSite = {
  id: string;
  name: string;
  state: string;
  region: string;
  lat: number;
  lng: number;
  category: SiteCategory;
  access: AccessType;
  difficulty: Difficulty;
  finds: string[];
  notes: string;
  /** Collecting rules as last understood. Unsourced until `legalityCheckedAt` and `legalitySource` are set. */
  legality: string;
  legalityCheckedAt?: string;
  legalitySource?: string;
  season: string;
};

export const SITES: FieldSite[] = [
  {
    id: "crater-diamonds",
    name: "Crater of Diamonds State Park",
    state: "Arkansas",
    region: "South",
    lat: 34.032,
    lng: -93.672,
    category: "state_park",
    access: "public",
    difficulty: "easy",
    finds: ["Diamond", "Amethyst", "Garnet (Almandine)", "Jasper", "Agate", "Quartz"],
    notes: "Search a plowed field over an eroded volcanic pipe. Park staff identify finds free of charge.",
    legality: "State park search area, open daily 8 a.m.–4 p.m. with paid admission. Any rock or mineral you find is yours to keep. No ladders or battery- or motor-powered tools.",
    season: "Year-round, daily 8 a.m.–4 p.m.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.arkansas.com/state-parks/explore/parks/crater-of-diamonds-state-park",
  },
  {
    id: "herkimer",
    name: "Herkimer Diamond Mines",
    state: "New York",
    region: "Northeast",
    lat: 43.026,
    lng: -74.986,
    category: "fee_dig",
    access: "fee",
    difficulty: "moderate",
    finds: ["Quartz", "Calcite", "Dolomite"],
    notes: "Double-terminated quartz in Cambrian dolomite vugs. Bring a crack hammer and safety glasses.",
    legality: "Private pay-to-dig operation open to the public; crack hammers can be rented on site. Collect only within the mine's digging area.",
    season: "Call ahead for season and hours.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.roadsideamerica.com/story/6164",
  },
  {
    id: "franklin-nj",
    name: "Franklin Mineral Dump",
    state: "New Jersey",
    region: "Northeast",
    lat: 41.122,
    lng: -74.581,
    category: "museum",
    access: "fee",
    difficulty: "easy",
    finds: ["Calcite", "Fluorite", "Garnet (Almandine)"],
    notes: "More than 90 fluorescent minerals are known from Franklin. Bring a UV lamp for the night digs.",
    legality: "Collecting is allowed on the Buckwheat Dump whenever the Franklin Mineral Museum is open, for an admission charge plus a per-pound fee. Night digs are scheduled separately.",
    season: "April–November, museum hours.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.njskylands.com/attractions-franklin-mineral-museum",
  },
  {
    id: "lake-superior",
    name: "Lake Superior Agate Shore",
    state: "Minnesota",
    region: "Midwest",
    lat: 47.05,
    lng: -91.67,
    category: "beach",
    access: "permission",
    difficulty: "easy",
    finds: ["Agate", "Jasper", "Quartz"],
    notes: "Walk the North Shore after storms. Look for translucence, banding, and a waxy chalcedony luster.",
    legality: "Rock collecting is not allowed in any Minnesota state park or state recreation area. Outside parks, confirm who owns the shore and get permission before collecting.",
    season: "Spring through fall. After big storms.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://dnr.state.mn.us/education/geology/digging/stateparks.html",
  },
  {
    id: "emerald-hollow",
    name: "Emerald Hollow Mine",
    state: "North Carolina",
    region: "South",
    lat: 35.8,
    lng: -81.14,
    category: "fee_dig",
    access: "fee",
    difficulty: "easy",
    finds: ["Beryl (Emerald/Aquamarine)", "Quartz", "Garnet (Almandine)"],
    notes: "Billed as the only emerald mine in the U.S. open to public prospecting. Sluice buckets or work the creek.",
    legality: "Fee mine open to the public: sluice mine-filled buckets, or prospect creek-side only in the areas where digging is permitted.",
    season: "Call ahead for hours.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.visitnc.com/emerald-hollow-mine",
  },
  {
    id: "graves-mountain",
    name: "Graves Mountain",
    state: "Georgia",
    region: "South",
    lat: 33.73,
    lng: -82.73,
    category: "quarry",
    access: "permission",
    difficulty: "moderate",
    finds: ["Rutile", "Kyanite", "Pyrite"],
    notes: "Known for rutile, mined there by Tiffany & Co. from the 1920s to the 1980s, plus 40-odd other mineral types.",
    legality: "Open to the public only during the announced spring and fall Rock Swap and Dig weekends (8 a.m.–6 p.m.; admission was free with donations in 2025). No access outside events.",
    season: "Spring and fall event weekends.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.wrdw.com/2025/03/07/graves-mountain-annual-spring-rock-swap-dig-returns",
  },
  {
    id: "amelia",
    name: "Morefield Mine",
    state: "Virginia",
    region: "South",
    lat: 37.34,
    lng: -77.97,
    category: "pegmatite",
    access: "fee",
    difficulty: "easy",
    finds: ["Topaz", "Garnet (Almandine)", "Amethyst"],
    notes: "Amazonite, topaz and garnet from the mine dumps of a classic pegmatite.",
    legality: "Fee digging on mine dumps and by sluice, open only on certain days in spring and fall. Call ahead to confirm dates.",
    season: "Certain days in spring and fall.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.virginia.org/listing/morefield-gem-mine/6171/amp/",
  },
  {
    id: "mt-antero",
    name: "Mount Antero",
    state: "Colorado",
    region: "Mountain",
    lat: 38.674,
    lng: -106.246,
    category: "alpine",
    access: "public",
    difficulty: "hard",
    finds: ["Beryl (Emerald/Aquamarine)", "Quartz", "Fluorite"],
    notes: "High-alpine aquamarine in granite. 4WD plus a lung-burning hike. Summer only.",
    legality: "National forest: collecting small quantities for personal use with hand tools needs no permit; mechanized equipment needs approval. Active mining claims on the mountain are off-limits to collectors.",
    season: "July–September.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.fs.usda.gov/r02/psicc/recreation/opportunities/other",
  },
  {
    id: "topaz-mountain",
    name: "Topaz Mountain",
    state: "Utah",
    region: "Mountain",
    lat: 39.6665,
    lng: -113.1146,
    category: "desert",
    access: "public",
    difficulty: "moderate",
    finds: ["Topaz", "Beryl (Emerald/Aquamarine)", "Quartz"],
    notes: "Sherry topaz in rhyolite cavities. Bring water, a hat, and a crack hammer.",
    legality: "BLM Topaz Mountain Rockhound Recreation Area: collect reasonable amounts of topaz and crystals for personal, non-commercial use. Stay off active mining claims.",
    season: "Spring and fall. Summer is brutal.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.blm.gov/visit/topaz-mountain-rockhound-recreation-area",
  },
  {
    id: "quartzsite",
    name: "Quartzsite Desert Fields",
    state: "Arizona",
    region: "Southwest",
    lat: 33.66,
    lng: -114.23,
    category: "desert",
    access: "public",
    difficulty: "moderate",
    finds: ["Quartz", "Agate", "Jasper"],
    notes: "Town surrounded by BLM public land with desert agate, jasper and quartz.",
    legality: "BLM public land: reasonable amounts for personal, non-commercial use are generally allowed. Not on active mining claims, developed recreation sites, or land with privately owned minerals.",
    season: "November–March.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.blm.gov/programs/recreation/rockhounding",
  },
  {
    id: "pala",
    name: "Pala Pegmatite District",
    state: "California",
    region: "West",
    lat: 33.365,
    lng: -117.076,
    category: "pegmatite",
    access: "permit",
    difficulty: "hard",
    finds: ["Tourmaline", "Beryl (Emerald/Aquamarine)", "Quartz"],
    notes: "World-class gem pegmatites. Most mines are private tours, not walk-up digs.",
    legality: "Private mines. As of September 2026, Oceanview Mine is reported to offer public fee digging and tours; other Pala mines are closed to the public. No roadside collecting.",
    season: "Contact Oceanview Mine for dig dates.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://hoodline.com/2026/09/how-pala-s-pink-tourmaline-once-dazzled-china-s-imperial-court/",
  },
  {
    id: "jade-cove",
    name: "Jade Cove",
    state: "California",
    region: "West",
    lat: 35.88,
    lng: -121.46,
    category: "beach",
    access: "public",
    difficulty: "moderate",
    finds: ["Serpentine", "Jasper"],
    notes: "Pacific nephrite in cobbles. Tide-aware collecting on a steep Big Sur shore.",
    legality: "Forest Service restrictions on removing rock above the mean high tide line are posted at the site, and offshore jade falls under the Monterey Bay National Marine Sanctuary. Read the posted rules before collecting anything.",
    season: "Year-round. Minus tides are best.",
  },
  {
    id: "richardson",
    name: "Richardson's Rock Ranch",
    state: "Oregon",
    region: "West",
    lat: 44.63,
    lng: -120.92,
    category: "fee_dig",
    access: "fee",
    difficulty: "easy",
    finds: ["Agate", "Jasper"],
    notes: "The thunder-egg classroom. Dig, cut, and polish on site.",
    legality: "Fee dig for thundereggs, paid by the pound; open seven days in summer. Call ahead to confirm hours.",
    season: "Summer, daily (call to confirm).",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.bendsource.com/news/rockhounding-at-richardsons-rock-ranch-6395928/",
  },
  {
    id: "maury",
    name: "Maury Mountain",
    state: "Oregon",
    region: "West",
    lat: 44.03,
    lng: -120.45,
    category: "forest",
    access: "public",
    difficulty: "easy",
    finds: ["Agate"],
    notes: "Moss agate area on the Ochoco National Forest, Central Oregon.",
    legality: "Ochoco National Forest lists the Maury Mountains as a moss agate area. The forest does not publish collecting limits online; ask the supervisor's office for current rules.",
    season: "Late spring–fall.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://fs.usda.gov/r06/ochoco/natural-resources/rocks-minerals",
  },
  {
    id: "emerald-creek",
    name: "Emerald Creek Garnet Area",
    state: "Idaho",
    region: "West",
    lat: 47.02,
    lng: -116.32,
    category: "forest",
    access: "permit",
    difficulty: "moderate",
    finds: ["Garnet (Almandine)"],
    notes: "USFS star-garnet collecting in a cold creek. Waders help.",
    legality: "Reserved ticket and on-site mineral permit required. Open Thursday–Saturday from Memorial Day weekend to Labor Day weekend. Limit 2 lb of garnet per person per day and one permit per person per year.",
    season: "Thursday–Saturday, Memorial Day to Labor Day weekends.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://www.recreation.gov/ticket/facility/10086846?tab=info",
  },
  {
    id: "wyoming-jade",
    name: "Granite Mountains Jade",
    state: "Wyoming",
    region: "Mountain",
    lat: 42.5,
    lng: -107.5,
    category: "desert",
    access: "public",
    difficulty: "hard",
    finds: ["Serpentine", "Quartz"],
    notes: "Historic nephrite jade fields. Remote, windy, and worth a long walk.",
    legality: "BLM Wyoming: reasonable amounts for personal use, collected by hand or with non-powered hand tools; no resale. Jade on an unpatented jade claim belongs to the claim holder.",
    season: "May–October.",
    legalityCheckedAt: "2026-10-09",
    legalitySource: "https://BLM.GOV/sites/default/files/documents/files/WYNF-0004_rockhounding%20%28051418%29.pdf",
  },
];

export const SITE_BY_ID: Record<string, FieldSite> = Object.fromEntries(
  SITES.map((s) => [s.id, s]),
);

export function projectSite(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 124.8) / 58.5) * 100;
  const y = ((49.2 - lat) / 25.2) * 100;
  return {
    x: Math.min(96, Math.max(4, x)),
    y: Math.min(92, Math.max(6, y)),
  };
}

const HAZARDS: Record<SiteCategory, string[]> = {
  state_park: ["Heat", "Sun"],
  fee_dig: ["Flying chips", "Uneven ground"],
  beach: ["Tide", "Cliff edges"],
  desert: ["Heat", "Water", "Rattlesnakes"],
  pegmatite: ["Loose rock", "Steep cuts"],
  quarry: ["Falling rock", "Blasting zones"],
  museum: ["None"],
  alpine: ["Altitude", "Weather", "Ice"],
  historic_mine: ["Unstable ground", "Shafts"],
  forest: ["Ticks", "Deadfall"],
  outcrop: ["Loose scree", "Exposure"],
  gravel_bar: ["Current", "Undercut banks"],
};

export function siteHazards(category: SiteCategory): string[] {
  return HAZARDS[category] ?? ["Verify conditions"];
}

