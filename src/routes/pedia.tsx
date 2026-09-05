import { Link, createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CrystalGem } from "@/components/crystal-gem";
import { Button, RarityChip, SectionLabel } from "@/components/ui";
import { MINERALS, type MineralCategory } from "@/data/minerals";
import { useField } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pedia")({ component: PediaPage });

const CATS: { k: MineralCategory | "all"; l: string }[] = [
  { k: "all", l: "All" },
  { k: "silicate", l: "Silicates" },
  { k: "carbonate", l: "Carbonates" },
  { k: "sulfide", l: "Sulfides" },
  { k: "oxide", l: "Oxides" },
  { k: "rock", l: "Rocks" },
  { k: "other", l: "Other" },
];

function PediaPage() {
  const complete = useField((s) => s.completeQuest);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<MineralCategory | "all">("all");
  const list = useMemo(
    () =>
      MINERALS.filter((m) => {
        if (cat !== "all" && m.category !== cat) return false;
        if (!q) return true;
        const s = q.toLowerCase();
        return `${m.name} ${m.formula} ${m.family} ${m.colors.join(" ")}`.toLowerCase().includes(s);
      }),
    [q, cat],
  );

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-amethyst">Learn</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Mineralpedia</h1>
        <p className="mt-1 text-sm text-muted">{MINERALS.length} field species with tests, lookalikes, and hardness.</p>
      </header>
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          type="search"
          aria-label="Search minerals by name, formula, or color"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Name, formula, color"
          className="h-11 w-full rounded-md border border-line bg-obsidian pl-10 pr-10 text-sm text-fg outline-none placeholder:text-faint focus:border-amethyst focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-2 focus-visible:ring-offset-void [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQ("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst rounded-md"
          >
            <X className="size-4" />
          </button>
        )}
      </label>
      <div className="flex gap-1.5 overflow-x-auto pb-1" role="toolbar" aria-label="Filter minerals by category">
        {CATS.map((c) => (
          <button
            key={c.k}
            type="button"
            aria-pressed={cat === c.k}
            onClick={() => setCat(c.k)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-2 focus-visible:ring-offset-void",
              cat === c.k ? "border-amethyst/40 bg-amethyst/10 text-fg" : "border-line text-muted hover:text-fg",
            )}
          >
            {c.l}
          </button>
        ))}
      </div>
      <SectionLabel>{list.length} entries</SectionLabel>
      {list.length === 0 ? (
        <div className="rh-panel rounded-xl p-6 text-center">
          <p className="text-sm font-medium text-fg">No matching minerals found</p>
          <p className="mt-1 text-xs text-muted">Try adjusting your search terms or filter category.</p>
          <Button
            variant="ghost"
            className="mt-4 text-xs"
            onClick={() => {
              setQ("");
              setCat("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <ul className="space-y-2">
          {list.map((m) => (
            <li key={m.id}>
              <Link
                to="/pedia/$id"
                params={{ id: m.id }}
                onClick={() => complete("pedia")}
                className="rh-panel flex items-center gap-3 rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-2 focus-visible:ring-offset-void"
              >
                <CrystalGem hue={m.hue} system={m.crystalSystem} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm text-fg">{m.name}</p>
                  <p className="truncate text-[11px] text-faint">
                    {m.formula} · Mohs {m.hardnessMin}
                    {m.hardnessMax !== m.hardnessMin ? `–${m.hardnessMax}` : ""}
                  </p>
                </div>
                <RarityChip rarity={m.rarity} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
