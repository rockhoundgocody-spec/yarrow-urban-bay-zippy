import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { CrystalGem } from "@/components/crystal-gem";
import { Button, Panel, RarityChip } from "@/components/ui";
import { MINERALS } from "@/data/minerals";
import { nextInChain } from "@/data/chains";
import { useField } from "@/lib/store";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/vault/$id")({ component: SpecimenPage });

const DISPO_LABEL: Record<string, string> = {
  chattel_collected: "Collected · GeoDex",
  affixed_logged: "Marked in place · Steward",
  restricted_observed: "Observed only · restricted ground",
  unknown: "Unknown path",
};

function SpecimenPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const specimen = useField((s) => s.specimens.find((x) => x.id === id));
  const update = useField((s) => s.updateSpecimen);
  const remove = useField((s) => s.removeSpecimen);
  const mineral = MINERALS.find((m) => m.id === specimen?.mineralId);
  const chain = nextInChain(specimen?.mineralId)[0];
  const nextMin = chain ? MINERALS.find((m) => m.id === chain.nextId) : undefined;

  if (!specimen) {
    return (
      <Panel className="p-6 text-sm text-muted">
        Specimen not in GeoDex. <Link to="/vault">Return</Link>
      </Panel>
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-cyan">GeoDex specimen</p>
      {specimen.photoDataUrl && (
        <img src={specimen.photoDataUrl} alt={specimen.name} className="w-full rounded-xl object-cover" />
      )}
      <div className="flex items-start gap-3">
        <CrystalGem hue={mineral?.hue ?? "#8d7cff"} system={specimen.crystalSystem} size={64} />
        <div>
          <h1 className="font-display text-2xl text-fg">{specimen.name}</h1>
          <p className="mt-1 text-sm text-muted">
            {specimen.family}
            {specimen.formula ? ` · ${specimen.formula}` : ""}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RarityChip rarity={specimen.rarity} />
            <span className="text-[10px] uppercase tracking-[0.14em] text-faint">
              {DISPO_LABEL[specimen.disposition] ?? specimen.disposition}
            </span>
          </div>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-xs">
        {[
          ["Confidence", `${Math.round(specimen.confidence * 100)}%`],
          ["Hardness", specimen.hardness],
          ["Luster", specimen.luster],
          ["System", specimen.crystalSystem],
          [
            "Est. value",
            specimen.collected && specimen.valueLow != null
              ? `${formatUsd(specimen.valueLow)}–${formatUsd(specimen.valueHigh ?? specimen.valueLow)}`
              : specimen.collected
                ? null
                : "Not collected",
          ],
          ["Source", specimen.source],
          ["Legal", specimen.legalStatus?.replace("_", " ")],
          ["Privacy", specimen.geoPrivacy?.replace("_", " ")],
        ]
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line bg-obsidian p-3">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-faint">{k}</dt>
              <dd className="mt-1 capitalize text-fg">{v}</dd>
            </div>
          ))}
      </dl>
      {specimen.fieldNotes && <p className="text-sm leading-relaxed text-muted">{specimen.fieldNotes}</p>}
      {chain && nextMin && (
        <Link to="/pedia/$id" params={{ id: nextMin.id }} className="rh-panel block rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-cyan">Discovery chain · {chain.chain.name}</p>
          <p className="mt-2 text-sm text-fg">Next observation: {nextMin.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{chain.chain.note}</p>
        </Link>
      )}
      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.16em] text-faint">Field notes</span>
        <textarea
          value={specimen.notes}
          onChange={(e) => update(specimen.id, { notes: e.target.value })}
          rows={3}
          className="mt-2 w-full rounded-md border border-line bg-obsidian p-3 text-sm text-fg outline-none focus:border-amethyst"
          placeholder="Locality, weather, companions, tests run…"
        />
      </label>
      {mineral && (
        <Link to="/pedia/$id" params={{ id: mineral.id }} className="block text-sm text-cyan">
          Open {mineral.name} in Mineralpedia
        </Link>
      )}
      <Button
        variant="line"
        className="w-full text-danger"
        onClick={() => {
          remove(specimen.id);
          void navigate({ to: "/vault" });
        }}
      >
        <Trash2 className="size-4" /> Remove from GeoDex
      </Button>
    </div>
  );
}
