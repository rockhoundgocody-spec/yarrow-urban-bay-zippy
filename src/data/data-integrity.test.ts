import { describe, expect, it } from "vitest";
import { MINERALS, MINERAL_BY_ID } from "@/data/minerals";
import { SITES } from "@/data/locations";
import { DISCOVERY_CHAINS } from "@/data/chains";

describe("mineral catalog", () => {
  it("has unique ids and names", () => {
    expect(new Set(MINERALS.map((m) => m.id)).size).toBe(MINERALS.length);
    expect(new Set(MINERALS.map((m) => m.name.toLowerCase())).size).toBe(MINERALS.length);
  });

  it("carries no price or value fields (no unsourced valuations)", () => {
    for (const m of MINERALS) {
      expect(m).not.toHaveProperty("valueLow");
      expect(m).not.toHaveProperty("valueHigh");
      expect(m).not.toHaveProperty("price");
    }
  });

  it("has sane hardness and specific-gravity ranges", () => {
    for (const m of MINERALS) {
      if (m.hardnessMin != null && m.hardnessMax != null) {
        expect(m.hardnessMin).toBeGreaterThanOrEqual(1);
        expect(m.hardnessMax).toBeLessThanOrEqual(10);
        expect(m.hardnessMin).toBeLessThanOrEqual(m.hardnessMax);
      }
      if (m.sgMin != null && m.sgMax != null) expect(m.sgMin).toBeLessThanOrEqual(m.sgMax);
    }
  });

  it("discovery chains only point at real minerals", () => {
    for (const c of DISCOVERY_CHAINS) for (const id of c.mineralIds) expect(MINERAL_BY_ID[id], `${c.name}: ${id}`).toBeDefined();
  });
});

describe("field localities", () => {
  it("has unique ids", () => {
    expect(new Set(SITES.map((s) => s.id)).size).toBe(SITES.length);
  });

  it("does not include the removed, unverifiable Illinois sites", () => {
    const ids = SITES.map((s) => s.id);
    expect(ids).not.toContain("salt-creek");
    expect(ids).not.toContain("hickory-creek");
  });

  it("places every site inside the contiguous United States", () => {
    for (const s of SITES) {
      expect(s.lat, s.id).toBeGreaterThan(24);
      expect(s.lat, s.id).toBeLessThan(49.5);
      expect(s.lng, s.id).toBeGreaterThan(-125);
      expect(s.lng, s.id).toBeLessThan(-66);
    }
  });

  it("only marks legality verified when both a date and a source are given", () => {
    for (const s of SITES) {
      expect(Boolean(s.legalityCheckedAt), s.id).toBe(Boolean(s.legalitySource));
      if (s.legalitySource) expect(s.legalitySource).toMatch(/^https:\/\//);
    }
  });
});
