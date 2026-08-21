export const XP_REWARDS = {
  scan: 50,
  saveVault: 25,
  stewardLog: 40,
  restrictedObserve: 20,
  firstOfSpecies: 80,
  visitSite: 15,
  saveSite: 20,
  cloverAsk: 15,
  quest: 40,
  dailyLogin: 10,
  pediaRead: 15,
} as const;

export type XpLane = "collector" | "steward" | "scientist" | "explorer";

export function levelFromXp(xp: number): number {
  return Math.floor(Math.sqrt(Math.max(0, xp) / 40)) + 1;
}

export function xpToNext(xp: number): { level: number; into: number; need: number; pct: number } {
  const level = levelFromXp(xp);
  const at = 40 * (level - 1) ** 2;
  const next = 40 * level ** 2;
  const into = xp - at;
  const need = next - at;
  return { level, into, need, pct: need === 0 ? 1 : Math.min(1, into / need) };
}

export const RANKS = [
  { min: 1, name: "Scout" },
  { min: 3, name: "Field Hand" },
  { min: 5, name: "Collector" },
  { min: 8, name: "Prospector" },
  { min: 12, name: "Mineralogist" },
  { min: 18, name: "Master" },
] as const;

export function rankFromLevel(level: number): string {
  let name: string = RANKS[0].name;
  for (const r of RANKS) if (level >= r.min) name = r.name;
  return name;
}

export const LANE_LABEL: Record<XpLane, string> = {
  collector: "Collector",
  steward: "Steward",
  scientist: "Scientist",
  explorer: "Explorer",
};
