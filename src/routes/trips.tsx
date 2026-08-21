import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Panel, SectionLabel } from "@/components/ui";
import { SITE_BY_ID, SITES } from "@/data/locations";
import { useField } from "@/lib/store";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/trips")({ component: TripsPage });

function TripsPage() {
  const trips = useField((s) => s.trips);
  const addTrip = useField((s) => s.addTrip);
  const toggleGear = useField((s) => s.toggleGear);
  const [name, setName] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [siteId, setSiteId] = useState(SITES[0]?.id ?? "");

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-field">Field ops</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Trip planner</h1>
        <p className="mt-1 text-sm text-muted">Itinerary, gear, land-status reminder. Pack the night before.</p>
      </header>

      <Panel className="space-y-3 p-4">
        <SectionLabel>New itinerary</SectionLabel>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Trip name"
          className="h-11 w-full rounded-md border border-line bg-void px-3 text-sm text-fg outline-none focus:border-field"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-11 w-full rounded-md border border-line bg-void px-3 text-sm text-fg outline-none"
        />
        <select
          value={siteId}
          onChange={(e) => setSiteId(e.target.value)}
          className="h-11 w-full rounded-md border border-line bg-void px-3 text-sm text-fg"
        >
          {SITES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.state}
            </option>
          ))}
        </select>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => {
            if (!name.trim()) return;
            addTrip({
              name: name.trim(),
              date,
              siteIds: siteId ? [siteId] : [],
              notes: "",
              gear: [
                { id: uid("g"), label: "Safety glasses", packed: false },
                { id: uid("g"), label: "Crack hammer", packed: false },
                { id: uid("g"), label: "Water", packed: false },
                { id: uid("g"), label: "Sample bags", packed: false },
                { id: uid("g"), label: "First aid", packed: false },
              ],
            });
            setName("");
          }}
        >
          Create trip
        </Button>
      </Panel>

      {trips.length === 0 ? (
        <p className="text-sm text-muted">No trips yet. Start from a locality or the form above.</p>
      ) : (
        <ul className="space-y-3">
          {trips.map((t) => (
            <li key={t.id} className="rh-panel rounded-xl p-4">
              <p className="font-display text-fg">{t.name}</p>
              <p className="text-xs text-muted">{t.date}</p>
              <ul className="mt-3 space-y-1">
                {t.siteIds.map((id) => {
                  const s = SITE_BY_ID[id];
                  return s ? (
                    <li key={id}>
                      <Link to="/explore/$id" params={{ id }} className="text-sm text-cyan">
                        {s.name}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
              <div className="mt-3 space-y-1">
                {t.gear.map((g) => (
                  <label key={g.id} className="flex min-h-11 items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={g.packed}
                      onChange={() => toggleGear(t.id, g.id)}
                      className="size-4 accent-field"
                    />
                    <span className={g.packed ? "text-muted line-through" : "text-fg"}>{g.label}</span>
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
