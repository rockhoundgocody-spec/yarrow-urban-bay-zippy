import { Link, createFileRoute } from "@tanstack/react-router";
import { Camera, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CrystalGem } from "@/components/crystal-gem";
import { Panel, RarityChip, SectionLabel, Stat } from "@/components/ui";
import { MINERALS, type Rarity } from "@/data/minerals";
import { useField } from "@/lib/store";
import { formatUsd } from "@/lib/utils";
import type { DiscoveryDisposition } from "@/lib/types";

export const Route = createFileRoute("/vault")({ component: VaultPage });

const FILTERS: { k: Rarity | "all"; l: string }[] = [
  { k: "all", l: "All" },
  { k: "common", l: "Common" },
  { k: "uncommon", l: "Uncommon" },
  { k: "rare", l: "Rare" },
  { k: "epic", l: "Epic" },
  { k: "legendary", l: "Legendary" },
];

const DISPO: { k: DiscoveryDisposition | "all"; l: string }[] = [
  { k: "all", l: "Any path" },
  { k: "chattel_collected", l: "Collected" },
  { k: "affixed_logged", l: "In place" },
  { k: "restricted_observed", l: "Observed" },
];

function VaultPage() {
  const specimens = useField((s) => s.specimens);
  const [q, setQ] = useState("");
  const [rarity, setRarity] = useState<Rarity | "all">("all");
  const [dispo, setDispo] = useState<DiscoveryDisposition | "all">("all");

  const value = specimens
    .filter((s) => s.collected)
    .reduce((a, s) => a + ((s.valueLow ?? 0) + (s.valueHigh ?? 0)) / 2, 0);
  const unique = new Set(specimens.map((s) => s.mineralId || s.name)).size;
  const inPlace = specimens.filter((s) => s.disposition === "affixed_logged").length;

  const list = useMemo(() => {
    return specimens.filter((s) => {
      if (rarity !== "all" && s.rarity !== rarity) return false;
      if (dispo !== "all" && s.disposition !== dispo) return false;
      if (q && !`${s.name} ${s.family}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [specimens, q, rarity, dispo]);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-cyan">Collection</p>
        <h1 className="mt-1 font-display text-2xl text-fg">GeoDex</h1>
        <p className="mt-1 text-sm text-muted">Collected, left in place, and observed — one archive.</p>
      </header>

      <Panel className="grid grid-cols-3 gap-3 p-4">
        <Stat label="Entries" value={specimens.length} />
        <Stat label="Species" value={unique} />
        <Stat label="In place" value={inPlace} />
      </Panel>
      <p className="text-xs text-faint">Collected value estimate {formatUsd(value)} · in-place finds are not priced.</p>

      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search GeoDex"
          className="h-11 w-full rounded-md border border-line bg-obsidian pl-10 pr-3 text-sm text-fg outline-none placeholder:text-faint focus:border-amethyst"
        />
      </label>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {DISPO.map((f) => (
          <button
            key={f.k}
            type="button"
            onClick={() => setDispo(f.k)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs ${
              dispo === f.k ? "border-fg/30 bg-fg/10 text-fg" : "border-line text-muted"
            }`}
          >
            {f.l}
          </button>
        ))}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.k}
            type="button"
            onClick={() => setRarity(f.k)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs ${
              rarity === f.k ? "border-fg/30 bg-fg/10 text-fg" : "border-line text-muted"
            }`}
          >
            {f.l}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Panel className="p-6 text-center">
          <p className="text-sm text-muted">
            {specimens.length === 0 ? "GeoDex is empty." : "Nothing matches those filters."}
          </p>
          <Link to="/identify" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-gold">
            <Camera className="size-4" /> Scan a specimen
          </Link>
        </Panel>
      ) : (
        <ul className="grid grid-cols-2 gap-3">
          {list.map((s) => {
            const m = MINERALS.find((x) => x.id === s.mineralId);
            return (
              <li key={s.id}>
                <Link to="/vault/$id" params={{ id: s.id }} className="rh-panel block rounded-xl p-3">
                  {s.photoDataUrl ? (
                    <img src={s.photoDataUrl} alt="" className="mb-2 h-24 w-full rounded-md object-cover" />
                  ) : (
                    <div className="mb-2 grid h-24 place-items-center">
                      <CrystalGem hue={m?.hue ?? "#8d7cff"} system={s.crystalSystem} size={56} />
                    </div>
                  )}
                  <p className="truncate font-display text-sm text-fg">{s.name}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <RarityChip rarity={s.rarity} />
                    <span className="text-[11px] tabular-nums text-faint">
                      {s.disposition === "affixed_logged"
                        ? "In place"
                        : s.disposition === "restricted_observed"
                          ? "Observed"
                          : `${Math.round(s.confidence * 100)}%`}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <SectionLabel>{MINERALS.length} species in Mineralpedia if you want to study first</SectionLabel>
    </div>
  );
}
