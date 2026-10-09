import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { CrystalGem } from "@/components/crystal-gem";
import { Button, Panel, RarityChip } from "@/components/ui";
import { MINERALS } from "@/data/minerals";
import { nextInChain } from "@/data/chains";
import { useField } from "@/lib/store";
import { privateHead } from "@/lib/seo";
import { usePhoto } from "@/lib/use-photo";
import { deletePhoto } from "@/lib/photo-store";
import { toast } from "sonner";

export const Route = createFileRoute("/vault_/$id")({
  head: () => privateHead("Specimen", "/vault/$id"),
  component: SpecimenPage,
});

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
  const restore = useField((s) => s.restoreSpecimen);
  const photo = usePhoto(specimen?.id, specimen?.hasPhoto);
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
      {photo && <img src={photo} alt={specimen.name} className="w-full rounded-xl object-cover" />}
      <div className="flex items-start gap-3">
        <CrystalGem hue={mineral?.hue ?? "#bfe9ff"} system={specimen.crystalSystem} size={64} />
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
          ["Collected", specimen.collected ? "Yes" : "No — left or observed"],
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
          className="mt-2 w-full rounded-md border border-line bg-obsidian p-3 text-sm text-fg outline-none focus:border-frost"
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
          const removed = specimen;
          remove(removed.id);
          // Keep the photo until the undo window closes.
          const timer = window.setTimeout(() => {
            if (removed.hasPhoto) void deletePhoto(removed.id).catch(() => undefined);
          }, 10_000);
          toast(`Removed ${removed.name} from GeoDex`, {
            duration: 10_000,
            action: {
              label: "Undo",
              onClick: () => {
                window.clearTimeout(timer);
                restore(removed);
              },
            },
          });
          void navigate({ to: "/vault" });
        }}
      >
        <Trash2 className="size-4" /> Remove from GeoDex
      </Button>
    </div>
  );
}
