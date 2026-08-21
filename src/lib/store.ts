import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  BadgeId,
  BadgeState,
  CloverMessage,
  CommunityPost,
  DailyQuest,
  DiscoveryDisposition,
  Specimen,
  Trip,
  XpLane,
} from "@/lib/types";
import { COMMUNITY_SEED } from "@/data/feed";
import { XP_REWARDS, levelFromXp } from "@/lib/xp";
import { todayKey, uid } from "@/lib/utils";

const QUEST_DEFS: Omit<DailyQuest, "done">[] = [
  { id: "scan", title: "Scan a specimen", detail: "Run one identification — photo or field key.", xp: XP_REWARDS.quest },
  { id: "vault", title: "Log a find", detail: "Save a specimen into GeoDex — collected or in place.", xp: XP_REWARDS.quest },
  { id: "map", title: "Study a locality", detail: "Open a field site on the map.", xp: XP_REWARDS.quest },
  { id: "pedia", title: "Read a species", detail: "Open any Mineralpedia entry.", xp: 25 },
  { id: "clover", title: "Ask Clover", detail: "One field question to the AI guide.", xp: XP_REWARDS.quest },
];

type FieldState = {
  onboarded: boolean;
  displayName: string;
  xp: number;
  collectorXp: number;
  stewardXp: number;
  scientistXp: number;
  explorerXp: number;
  streak: number;
  lastActiveDay: string | null;
  specimens: Specimen[];
  savedSiteIds: string[];
  visitedSiteIds: string[];
  trips: Trip[];
  badges: BadgeState[];
  quests: DailyQuest[];
  questDay: string | null;
  posts: CommunityPost[];
  clover: CloverMessage[];
  lastScanId: string | null;
  fieldMode: boolean;
  openerSeen: boolean;

  hydrateDay: () => void;
  completeOnboarding: (name: string) => void;
  addXp: (amount: number) => void;
  addXpLane: (lane: XpLane, amount: number) => void;
  addSpecimen: (s: Omit<Specimen, "id" | "createdAt">) => Specimen;
  updateSpecimen: (id: string, patch: Partial<Specimen>) => void;
  removeSpecimen: (id: string) => void;
  toggleSaveSite: (id: string) => void;
  visitSite: (id: string) => void;
  completeQuest: (id: DailyQuest["id"]) => void;
  addTrip: (t: Omit<Trip, "id" | "createdAt">) => void;
  toggleGear: (tripId: string, gearId: string) => void;
  toggleLike: (postId: string) => void;
  pushClover: (m: Omit<CloverMessage, "id" | "at">) => void;
  awardBadge: (id: BadgeId) => void;
  setFieldMode: (on: boolean) => void;
  markOpenerSeen: () => void;
  resetLocal: () => void;
};

function freshQuests(): DailyQuest[] {
  return QUEST_DEFS.map((q) => ({ ...q, done: false }));
}

const CLOVER_HELLO: CloverMessage = {
  id: "c0",
  role: "assistant",
  text: "I'm Clover. Just talk — I'm already listening.",
  at: Date.now(),
};

function evalBadges(get: () => FieldState, award: (id: BadgeId) => void) {
  const s = get();
  if (s.specimens.length >= 1) award("first-scan");
  if (s.specimens.length >= 5) award("vault-5");
  const species = new Set(s.specimens.map((x) => x.mineralId || x.name.toLowerCase()));
  if (species.size >= 10) award("species-10");
  if (s.streak >= 3) award("streak-3");
  if (s.streak >= 7) award("streak-7");
  if (s.specimens.some((x) => x.rarity === "legendary")) award("legendary-find");
  if (s.savedSiteIds.length >= 3) award("map-3");
  if (s.clover.some((m) => m.role === "user")) award("clover");
  if (s.quests.every((q) => q.done) && s.quests.length > 0) award("quest-day");
  if (s.trips.length >= 1) award("first-trip");
  if (s.specimens.filter((x) => x.disposition === "affixed_logged").length >= 3) award("steward-3");
}

function laneForDisposition(d: DiscoveryDisposition): { lane: XpLane; amount: number } {
  if (d === "affixed_logged") return { lane: "steward", amount: XP_REWARDS.stewardLog };
  if (d === "restricted_observed") return { lane: "explorer", amount: XP_REWARDS.restrictedObserve };
  return { lane: "collector", amount: XP_REWARDS.saveVault };
}

const INITIAL = {
  onboarded: false,
  displayName: "Field hand",
  xp: 0,
  collectorXp: 0,
  stewardXp: 0,
  scientistXp: 0,
  explorerXp: 0,
  streak: 0,
  lastActiveDay: null as string | null,
  specimens: [] as Specimen[],
  savedSiteIds: [] as string[],
  visitedSiteIds: [] as string[],
  trips: [] as Trip[],
  badges: [] as BadgeState[],
  quests: freshQuests(),
  questDay: null as string | null,
  posts: COMMUNITY_SEED,
  clover: [CLOVER_HELLO],
  lastScanId: null as string | null,
  fieldMode: false,
  openerSeen: false,
};

export const useField = create<FieldState>()(
  persist(
    (set, get) => ({
      ...INITIAL,

      hydrateDay: () => {
        const today = todayKey();
        const s = get();
        let streak = s.streak;
        let last = s.lastActiveDay;
        let xp = s.xp;
        let explorerXp = s.explorerXp ?? 0;
        if (last !== today) {
          const y = new Date();
          y.setDate(y.getDate() - 1);
          const yesterday = todayKey(y);
          if (last === yesterday) streak = (streak || 0) + 1;
          else streak = 1;
          last = today;
          xp += XP_REWARDS.dailyLogin;
          explorerXp += XP_REWARDS.dailyLogin;
        }
        const quests = s.questDay === today ? s.quests : freshQuests();
        set({ streak, lastActiveDay: last, xp, explorerXp, quests, questDay: today });
      },

      completeOnboarding: (name) => set({ onboarded: true, displayName: name.trim() || "Field hand" }),

      addXp: (amount) => set({ xp: get().xp + amount }),

      addXpLane: (lane, amount) => {
        const s = get();
        const patch =
          lane === "collector"
            ? { collectorXp: s.collectorXp + amount }
            : lane === "steward"
              ? { stewardXp: s.stewardXp + amount }
              : lane === "scientist"
                ? { scientistXp: s.scientistXp + amount }
                : { explorerXp: s.explorerXp + amount };
        set({ xp: s.xp + amount, ...patch });
      },

      addSpecimen: (input) => {
        const { lane, amount } = laneForDisposition(input.disposition);
        const specimen: Specimen = {
          ...input,
          id: uid("sp"),
          createdAt: Date.now(),
          xpLane: lane,
          xpAwarded: amount,
        };
        const firstOf =
          input.mineralId && !get().specimens.some((s) => s.mineralId === input.mineralId);
        set({ specimens: [specimen, ...get().specimens], lastScanId: specimen.id });
        get().addXpLane(lane, amount);
        if (firstOf) get().addXpLane("scientist", XP_REWARDS.firstOfSpecies);
        get().completeQuest("vault");
        evalBadges(get, (id) => get().awardBadge(id));
        return specimen;
      },

      updateSpecimen: (id, patch) =>
        set({ specimens: get().specimens.map((s) => (s.id === id ? { ...s, ...patch } : s)) }),

      removeSpecimen: (id) => set({ specimens: get().specimens.filter((s) => s.id !== id) }),

      toggleSaveSite: (id) => {
        const has = get().savedSiteIds.includes(id);
        const savedSiteIds = has ? get().savedSiteIds.filter((x) => x !== id) : [...get().savedSiteIds, id];
        set({ savedSiteIds });
        if (!has) get().addXpLane("explorer", XP_REWARDS.saveSite);
        evalBadges(get, (b) => get().awardBadge(b));
      },

      visitSite: (id) => {
        if (!get().visitedSiteIds.includes(id)) {
          set({ visitedSiteIds: [...get().visitedSiteIds, id] });
          get().addXpLane("explorer", XP_REWARDS.visitSite);
        }
        get().completeQuest("map");
      },

      completeQuest: (id) => {
        const today = todayKey();
        const quests = (get().questDay === today ? get().quests : freshQuests()).map((q) => {
          if (q.id !== id || q.done) return q;
          get().addXp(q.xp);
          return { ...q, done: true };
        });
        set({ quests, questDay: today });
        evalBadges(get, (b) => get().awardBadge(b));
      },

      addTrip: (t) => {
        set({ trips: [{ ...t, id: uid("tr"), createdAt: Date.now() }, ...get().trips] });
        get().awardBadge("first-trip");
      },

      toggleGear: (tripId, gearId) =>
        set({
          trips: get().trips.map((t) =>
            t.id !== tripId
              ? t
              : { ...t, gear: t.gear.map((g) => (g.id === gearId ? { ...g, packed: !g.packed } : g)) },
          ),
        }),

      toggleLike: (postId) =>
        set({
          posts: get().posts.map((p) =>
            p.id === postId ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p,
          ),
        }),

      pushClover: (m) => {
        set({ clover: [...get().clover, { ...m, id: uid("cl"), at: Date.now() }] });
        if (m.role === "user") {
          get().completeQuest("clover");
          get().addXpLane("scientist", XP_REWARDS.cloverAsk);
        }
        evalBadges(get, (b) => get().awardBadge(b));
      },

      awardBadge: (id) => {
        if (get().badges.some((b) => b.id === id)) return;
        set({ badges: [...get().badges, { id, earnedAt: Date.now() }] });
      },

      setFieldMode: (on) => set({ fieldMode: on }),
      markOpenerSeen: () => set({ openerSeen: true }),

      resetLocal: () => set({ ...INITIAL, posts: COMMUNITY_SEED, clover: [{ ...CLOVER_HELLO, at: Date.now() }], quests: freshQuests() }),
    }),
    { name: "rhgo-field-v2" },
  ),
);

export function vaultStats(specimens: Specimen[]) {
  const value = specimens.reduce((a, s) => a + ((s.valueLow ?? 0) + (s.valueHigh ?? 0)) / 2, 0);
  const unique = new Set(specimens.map((s) => s.mineralId || s.name)).size;
  return { count: specimens.length, unique, value, level: levelFromXp(useField.getState().xp) };
}
