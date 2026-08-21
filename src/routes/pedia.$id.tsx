import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CrystalGem } from "@/components/crystal-gem";
import { Button, Panel, RarityChip } from "@/components/ui";
import { MINERAL_BY_ID, findMineralByName } from "@/data/minerals";
import { SITES } from "@/data/locations";
import { nextInChain } from "@/data/chains";
import { mineralToResult } from "@/lib/identify";
import { useField } from "@/lib/store";
import { XP_REWARDS } from "@/lib/xp";
import { toast } from "sonner";

export const Route = createFileRoute("/pedia/$id")({ component: MineralPage });

const READ = new Set<string>();

function MineralPage() {
  const { id } = Route.useParams();
  const m = MINERAL_BY_ID[id];
  const complete = useField((s) => s.completeQuest);
  const addSpecimen = useField((s) => s.addSpecimen);
  const addXpLane = useField((s) => s.addXpLane);
  const chain = nextInChain(m?.id)[0];
  const nextMin = chain ? MINERAL_BY_ID[chain.nextId] : undefined;

  useEffect(() => {
    if (!m) return;
    complete("pedia");
    if (!READ.has(m.id)) {
      READ.add(m.id);
      addXpLane("scientist", XP_REWARDS.pediaRead);
    }
  }, [m, complete, addXpLane]);

  if (!m) {
    return (
      <Panel className="p-6 text-sm text-muted">
        Unknown species. <Link to="/pedia">Catalog</Link>
      </Panel>
    );
  }

  const sites = SITES.filter((s) => s.finds.includes(m.name));

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <CrystalGem hue={m.hue} system={m.crystalSystem} size={80} />
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-amethyst">{m.family}</p>
          <h1 className="mt-1 font-display text-2xl text-fg">{m.name}</h1>
          <p className="mt-1 font-mono text-sm text-muted">{m.formula}</p>
          <div className="mt-2">
            <RarityChip rarity={m.rarity} />
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted">{m.blurb}</p>
      <dl className="grid grid-cols-2 gap-2 text-xs">
        {[
          ["Mohs", m.hardnessMin != null ? `${m.hardnessMin}${m.hardnessMax !== m.hardnessMin ? `–${m.hardnessMax}` : ""}` : "—"],
          ["Luster", m.luster.join(", ")],
          ["Streak", m.streak],
          ["System", m.crystalSystem],
          ["Habit", m.habit.join(", ")],
          ["SG", m.sgMin != null ? `${m.sgMin}–${m.sgMax}` : "—"],
          ["Cleavage", m.cleavage],
          ["Color", m.colors.slice(0, 4).join(", ")],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line bg-obsidian p-3">
            <dt className="text-[10px] uppercase tracking-[0.14em] text-faint">{k}</dt>
            <dd className="mt-1 capitalize text-fg">{v}</dd>
          </div>
        ))}
      </dl>
      {chain && nextMin && (
        <Link to="/pedia/$id" params={{ id: nextMin.id }} className="rh-panel block rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-cyan">Discovery chain · {chain.chain.name}</p>
          <p className="mt-2 text-sm text-fg">Related: {nextMin.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{chain.chain.note}</p>
        </Link>
      )}
      <section>
        <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-faint">Key features</p>
        <ul className="space-y-1 text-sm text-muted">
          {m.keyFeatures.map((f) => (
            <li key={f}>· {f}</li>
          ))}
        </ul>
      </section>
      <section>
        <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-faint">Field tests</p>
        <ul className="space-y-1 text-sm text-muted">
          {m.fieldTests.map((f) => (
            <li key={f}>· {f}</li>
          ))}
        </ul>
      </section>
      {m.similar.length > 0 && (
        <section>
          <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-gold">Often confused with</p>
          <ul className="space-y-2">
            {m.similar.map((s) => {
              const alt = findMineralByName(s.name);
              return (
                <li key={s.name} className="rounded-xl border border-line p-3 text-sm">
                  {alt ? (
                    <Link to="/pedia/$id" params={{ id: alt.id }} className="text-fg">
                      {s.name}
                    </Link>
                  ) : (
                    <span className="text-fg">{s.name}</span>
                  )}
                  <p className="mt-1 text-xs text-muted">{s.note}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {sites.length > 0 && (
        <section>
          <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-field">Where to look</p>
          <ul className="space-y-2">
            {sites.map((s) => (
              <li key={s.id}>
                <Link to="/explore/$id" params={{ id: s.id }} className="text-sm text-fg">
                  {s.name}
                  <span className="text-muted"> · {s.state}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Button
        variant="gold"
        className="w-full"
        onClick={() => {
          const r = mineralToResult(m, 1, "sample");
          addSpecimen({
            mineralId: m.id,
            name: m.name,
            family: m.family,
            formula: m.formula,
            rarity: m.rarity,
            confidence: 1,
            notes: "Logged from Mineralpedia",
            hardness: r.hardness,
            luster: r.luster,
            crystalSystem: r.crystalSystem,
            valueLow: m.valueLow,
            valueHigh: m.valueHigh,
            fieldNotes: m.blurb,
            source: "sample",
            disposition: "chattel_collected",
            collected: true,
            leftInPlace: false,
            legalStatus: "unknown",
            ethicsPromptShown: true,
            userConfirmedLegalAccess: false,
            geoPrivacy: "exact_private",
          });
          toast.success("Study specimen added to GeoDex");
        }}
      >
        Add study specimen
      </Button>
    </div>
  );
}
