import type { Rarity } from "@/data/minerals";

export type IdentifyResult = {
  name: string;
  scientificName?: string;
  family: string;
  formula?: string;
  mineralId?: string;
  confidence: number;
  rarity: Rarity;
  hardness?: string;
  luster?: string;
  crystalSystem?: string;
  streak?: string;
  color?: string;
  valueLow?: number;
  valueHigh?: number;
  fieldNotes: string;
  keyFeatures: string[];
  alternatives: { name: string; confidence: number }[];
  notGeological: boolean;
  source: "ai" | "field-key" | "sample";
};

export type DiscoveryDisposition =
  | "chattel_collected"
  | "affixed_logged"
  | "restricted_observed"
  | "unknown";

export type LegalStatus = "allowed" | "permit_required" | "private" | "restricted" | "unknown";
export type GeoPrivacy = "exact_private" | "fuzzed_public" | "hidden";
export type XpLane = "collector" | "steward" | "scientist" | "explorer";

export type Specimen = {
  id: string;
  mineralId?: string;
  name: string;
  family: string;
  formula?: string;
  rarity: Rarity;
  confidence: number;
  photoDataUrl?: string;
  notes: string;
  locationName?: string;
  locationId?: string;
  hardness?: string;
  luster?: string;
  crystalSystem?: string;
  valueLow?: number;
  valueHigh?: number;
  fieldNotes?: string;
  alternatives?: { name: string; confidence: number }[];
  createdAt: number;
  source: "scan" | "manual" | "sample";
  disposition: DiscoveryDisposition;
  collected: boolean;
  leftInPlace: boolean;
  legalStatus: LegalStatus;
  ethicsPromptShown: boolean;
  userConfirmedLegalAccess: boolean;
  geoPrivacy: GeoPrivacy;
  xpAwarded?: number;
  xpLane?: XpLane;
};

export type Trip = {
  id: string;
  name: string;
  date: string;
  siteIds: string[];
  gear: { id: string; label: string; packed: boolean }[];
  notes: string;
  createdAt: number;
};

export type BadgeId =
  | "first-scan"
  | "vault-5"
  | "species-10"
  | "streak-3"
  | "streak-7"
  | "legendary-find"
  | "map-3"
  | "clover"
  | "quest-day"
  | "first-trip"
  | "steward-3";

export type BadgeState = { id: BadgeId; earnedAt: number };

export type QuestId = "scan" | "vault" | "map" | "pedia" | "clover";

export type DailyQuest = {
  id: QuestId;
  title: string;
  detail: string;
  xp: number;
  done: boolean;
};

export type CloverMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  at: number;
};

export type CommunityPost = {
  id: string;
  author: string;
  mineral: string;
  mineralId?: string;
  location: string;
  caption: string;
  likes: number;
  liked: boolean;
  hue: string;
  at: number;
};

export type MarketListing = {
  id: string;
  title: string;
  seller: string;
  mineral: string;
  mineralId?: string;
  rarity: Rarity;
  price: number;
  locale: string;
  hue: string;
  note: string;
};
