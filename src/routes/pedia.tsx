import { Link, createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CrystalGem } from "@/components/crystal-gem";
import { RarityChip, SectionLabel } from "@/components/ui";
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
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Name, formula, color"
          className="h-11 w-full rounded-md border border-line bg-obsidian pl-10 pr-3 text-sm text-fg outline-none placeholder:text-faint focus:border-amethyst"
        />
      </label>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {CATS.map((c) => (
          <button
            key={c.k}
            type="button"
            onClick={() => setCat(c.k)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs",
              cat === c.k ? "border-amethyst/40 bg-amethyst/10 text-fg" : "border-line text-muted",
            )}
          >
            {c.l}
          </button>
        ))}
      </div>
      <SectionLabel>{list.length} entries</SectionLabel>
      <ul className="space-y-2">
        {list.map((m) => (
          <li key={m.id}>
            <Link
              to="/pedia/$id"
              params={{ id: m.id }}
              onClick={() => complete("pedia")}
              className="rh-panel flex items-center gap-3 rounded-xl p-3"
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
    </div>
  );
}
