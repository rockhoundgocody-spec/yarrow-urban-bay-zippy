import { useEffect, useRef, useState } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui";
import { clearPhotos, getPhotos, putPhoto } from "@/lib/photo-store";
import { useField, type PersistedState } from "@/lib/store";

const EXPORT_FORMAT = "rockhound-go-geodex";
const EXPORT_VERSION = 1;

const ImportFile = z.object({
  format: z.literal(EXPORT_FORMAT),
  version: z.number().int().min(1).max(EXPORT_VERSION),
  exportedAt: z.string(),
  data: z.object({
    displayName: z.string().max(60),
    xp: z.number().min(0),
    collectorXp: z.number().min(0),
    stewardXp: z.number().min(0),
    scientistXp: z.number().min(0),
    explorerXp: z.number().min(0),
    streak: z.number().int().min(0),
    lastActiveDay: z.string().nullable(),
    specimens: z.array(z.object({ id: z.string(), name: z.string(), createdAt: z.number() }).passthrough()).max(10_000),
    savedSiteIds: z.array(z.string()),
    visitedSiteIds: z.array(z.string()),
    trips: z.array(z.object({ id: z.string() }).passthrough()),
    badges: z.array(z.object({ id: z.string(), earnedAt: z.number() }).passthrough()),
    readSpeciesIds: z.array(z.string()).default([]),
  }),
  photos: z.record(z.string(), z.string().regex(/^data:image\/(jpeg|png|webp);base64,/)).default({}),
});

function pickPersisted(): PersistedState {
  const s = useField.getState();
  return {
    displayName: s.displayName,
    xp: s.xp,
    collectorXp: s.collectorXp,
    stewardXp: s.stewardXp,
    scientistXp: s.scientistXp,
    explorerXp: s.explorerXp,
    streak: s.streak,
    lastActiveDay: s.lastActiveDay,
    specimens: s.specimens.map(({ photoDataUrl: _p, ...rest }) => rest),
    savedSiteIds: s.savedSiteIds,
    visitedSiteIds: s.visitedSiteIds,
    trips: s.trips,
    badges: s.badges,
    readSpeciesIds: s.readSpeciesIds,
  };
}

/** Two-tap confirm: first tap arms, second tap within 5 s acts. Glove-friendly, no modal. */
function useArm(): [boolean, () => boolean] {
  const [armed, setArmed] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const tap = () => {
    if (armed) {
      window.clearTimeout(timer.current);
      setArmed(false);
      return true;
    }
    setArmed(true);
    timer.current = window.setTimeout(() => setArmed(false), 5000);
    return false;
  };
  return [armed, tap];
}

export function DataControls() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [resetArmed, tapReset] = useArm();
  const reset = useField((s) => s.resetLocal);
  const replaceAll = useField((s) => s.replaceAll);
  const count = useField((s) => s.specimens.length);

  async function exportData() {
    setBusy(true);
    try {
      const data = pickPersisted();
      const photos = await getPhotos(data.specimens.filter((s) => s.hasPhoto).map((s) => s.id));
      const blob = new Blob(
        [JSON.stringify({ format: EXPORT_FORMAT, version: EXPORT_VERSION, exportedAt: new Date().toISOString(), data, photos })],
        { type: "application/json" },
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rockhound-go-geodex-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
      toast.success(`Exported ${data.specimens.length} specimens and ${Object.keys(photos).length} photos`);
    } catch {
      toast.error("Export failed. Nothing was changed.");
    } finally {
      setBusy(false);
    }
  }

  async function importFile(file: File) {
    setBusy(true);
    try {
      const parsed = ImportFile.safeParse(JSON.parse(await file.text()));
      if (!parsed.success) {
        toast.error("That file isn't a RockHound GO export.");
        return;
      }
      const { data, photos } = parsed.data;
      await clearPhotos().catch(() => undefined);
      let saved = 0;
      for (const [id, url] of Object.entries(photos)) {
        if (await putPhoto(id, url).then(() => true).catch(() => false)) saved++;
      }
      replaceAll({
        ...(data as unknown as PersistedState),
        specimens: (data.specimens as unknown as PersistedState["specimens"]).map((s) => ({
          ...s,
          hasPhoto: Boolean(photos[s.id]),
        })),
      });
      toast.success(`Imported ${data.specimens.length} specimens and ${saved} photos`);
    } catch {
      toast.error("Couldn't read that file. Nothing was changed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <section className="space-y-3" aria-labelledby="data-heading">
      <h2 id="data-heading" className="text-xs uppercase tracking-[0.16em] text-faint">
        Your data
      </h2>
      <p className="text-[13px] leading-relaxed text-muted">
        Your GeoDex, trips and progress are stored only on this device. Export a backup file regularly — clearing your
        browser data or changing phones erases what isn't backed up.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="line" className="min-h-12" disabled={busy} onClick={() => void exportData()}>
          <Download className="size-4" aria-hidden="true" /> Export
        </Button>
        <Button variant="line" className="min-h-12" disabled={busy} onClick={() => fileRef.current?.click()}>
          <Upload className="size-4" aria-hidden="true" /> Import
        </Button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        aria-label="Import a RockHound GO backup file"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void importFile(f);
        }}
      />
      <p className="text-[13px] text-faint">Importing replaces what's on this device with the backup.</p>
      <Button
        variant="line"
        className="min-h-12 w-full text-danger"
        disabled={busy}
        aria-live="polite"
        onClick={() => {
          if (!tapReset()) return;
          reset();
          void clearPhotos().catch(() => undefined);
          toast("Field data erased from this device.");
        }}
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        {resetArmed ? `Tap again to erase ${count} specimens and all progress` : "Erase all data on this device"}
      </Button>
    </section>
  );
}
