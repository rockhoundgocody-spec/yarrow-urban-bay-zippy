export type DiscoveryChain = {
  id: string;
  name: string;
  mineralIds: string[];
  note: string;
};

export const DISCOVERY_CHAINS: DiscoveryChain[] = [
  {
    id: "fluorite-district",
    name: "Fluorite district",
    mineralIds: ["fluorite", "calcite", "galena", "sphalerite", "barite"],
    note: "Mississippi Valley-type veins: fluorite with calcite, galena, sphalerite, and barite.",
  },
  {
    id: "quartz-family",
    name: "Quartz family",
    mineralIds: ["quartz", "amethyst", "citrine", "smoky-quartz", "rose-quartz", "agate", "jasper"],
    note: "Same chemistry, different color and habit. Learn the variety, then the host rock.",
  },
  {
    id: "copper-suite",
    name: "Copper suite",
    mineralIds: ["malachite", "azurite", "chalcopyrite", "bornite-peacock-ore"],
    note: "Oxidation sequence from primary copper sulfides to green and blue carbonates.",
  },
  {
    id: "pegmatite-royalty",
    name: "Pegmatite royalty",
    mineralIds: ["tourmaline", "beryl-emerald-aquamarine", "topaz", "muscovite-mica", "orthoclase-potassium-feldspar"],
    note: "Coarse granite pockets: beryl, tourmaline, topaz, mica books, and feldspar walls.",
  },
  {
    id: "iron-oxides",
    name: "Iron oxides",
    mineralIds: ["hematite", "magnetite", "pyrite"],
    note: "Streak and magnetism separate hematite from magnetite. Pyrite is the sulfide cousin.",
  },
  {
    id: "carbonate-test",
    name: "Carbonate test",
    mineralIds: ["calcite", "dolomite", "malachite", "azurite"],
    note: "Acid is the field test. Calcite fizzes whole; dolomite needs powder.",
  },
];

export function chainsForMineral(mineralId?: string): DiscoveryChain[] {
  if (!mineralId) return [];
  return DISCOVERY_CHAINS.filter((c) => c.mineralIds.includes(mineralId));
}

export function nextInChain(mineralId?: string): { chain: DiscoveryChain; nextId: string }[] {
  if (!mineralId) return [];
  const out: { chain: DiscoveryChain; nextId: string }[] = [];
  for (const chain of chainsForMineral(mineralId)) {
    const i = chain.mineralIds.indexOf(mineralId);
    const nextId = chain.mineralIds[i + 1] ?? chain.mineralIds.find((id) => id !== mineralId);
    if (nextId) out.push({ chain, nextId });
  }
  return out;
}
