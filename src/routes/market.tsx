import { Link, createFileRoute } from "@tanstack/react-router";
import { CrystalGem } from "@/components/crystal-gem";
import { RarityChip } from "@/components/ui";
import { MARKET_SEED } from "@/data/feed";
import { MINERALS } from "@/data/minerals";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/market")({ component: MarketPage });

function MarketPage() {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-gold">Commerce</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Specimen market</h1>
        <p className="mt-1 text-sm text-muted">
          A reading list of cabinet material. Listings are illustrative — no checkout in this field OS.
        </p>
      </header>
      <ul className="space-y-3">
        {MARKET_SEED.map((l) => {
          const m = MINERALS.find((x) => x.id === l.mineralId);
          return (
            <li key={l.id} className="rh-panel rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CrystalGem hue={l.hue} system={m?.crystalSystem} size={52} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-fg">{l.title}</p>
                    <p className="font-display tabular-nums text-gold">{formatUsd(l.price)}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {l.seller} · {l.locale}
                  </p>
                  <div className="mt-2">
                    <RarityChip rarity={l.rarity} />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{l.note}</p>
              {l.mineralId && (
                <Link to="/pedia/$id" params={{ id: l.mineralId }} className="mt-3 inline-block text-xs text-cyan">
                  Study {l.mineral}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
