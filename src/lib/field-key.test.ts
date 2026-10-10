import { describe, expect, it } from "vitest";
import { MINERAL_BY_ID } from "@/data/minerals";
import { asRarity, matchFieldKey, mineralToResult } from "@/lib/field-key";

describe("field key", () => {
  it("returns nothing when no traits are given", () => {
    expect(matchFieldKey({})).toEqual([]);
  });

  it("ranks quartz first for a hard, glassy, colorless specimen", () => {
    const out = matchFieldKey({ color: "colorless", hardness: 7, luster: "vitreous", system: "trigonal" });
    expect(out.length).toBeGreaterThan(0);
    expect(out.length).toBeLessThanOrEqual(5);
    expect(out[0].mineralId).toBe("quartz");
  });

  it("keeps confidences within the documented 28–92% band, best first", () => {
    const out = matchFieldKey({ hardness: 3, luster: "vitreous" });
    for (const r of out) {
      expect(r.confidence).toBeGreaterThanOrEqual(0.28);
      expect(r.confidence).toBeLessThanOrEqual(0.92);
      expect(r.source).toBe("field-key");
    }
    expect(out[0].confidence).toBeGreaterThanOrEqual(out[out.length - 1].confidence);
  });

  it("never attaches a price to a result", () => {
    const r = mineralToResult(MINERAL_BY_ID.quartz, 0.9, "sample");
    expect(r).not.toHaveProperty("valueLow");
    expect(r).not.toHaveProperty("valueHigh");
  });

  it("falls back for unknown rarity strings", () => {
    expect(asRarity("LEGENDARY", "common")).toBe("legendary");
    expect(asRarity("mythic", "common")).toBe("common");
    expect(asRarity(undefined, "rare")).toBe("rare");
  });
});
