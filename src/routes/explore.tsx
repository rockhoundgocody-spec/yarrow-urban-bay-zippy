import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Panel, SectionLabel } from "@/components/ui";
import { SITES, projectSite, type AccessType, type Difficulty } from "@/data/locations";
import { useField } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/explore")({ component: ExplorePage });

const ACCESS: { k: AccessType | "all"; l: string }[] = [
  { k: "all", l: "Any access" },
  { k: "public", l: "Public" },
  { k: "fee", l: "Fee dig" },
  { k: "permit", l: "Permit" },
  { k: "permission", l: "Ask first" },
];

function ExplorePage() {
  const saved = useField((s) => s.savedSiteIds);
  const [q, setQ] = useState("");
  const [access, setAccess] = useState<AccessType | "all">("all");
  const [diff, setDiff] = useState<Difficulty | "all">("all");
  const [picked, setPicked] = useState<string | null>(SITES[0]?.id ?? null);

  const list = useMemo(
    () =>
      SITES.filter((s) => {
        if (access !== "all" && s.access !== access) return false;
        if (diff !== "all" && s.difficulty !== diff) return false;
        if (q && !`${s.name} ${s.state} ${s.finds.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [q, access, diff],
  );

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-field">Explore</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Field map</h1>
        <p className="mt-1 text-sm text-muted">Verified-style localities. Always confirm land status before you go.</p>
      </header>

      <div className="relative overflow-hidden rounded-xl border border-line bg-void">
        <svg viewBox="0 0 100 64" className="w-full" aria-label="Contiguous United States field map">
          <rect width="100" height="64" className="fill-void" />
          <path
            d="M12 18 L18 12 L28 11 L40 10 L52 10.5 L62 11 L70 13 L78 16 L84 14 L88 18 L90 24 L87 30 L85 36 L86 42 L80 46 L72 50 L64 52 L54 53 L46 51 L40 52 L34 50 L28 47 L22 42 L16 36 L13 28 Z
               M80 46 L82 54 L79 57 L76 50 Z
               M28 47 L26 56 L22 54 L24 47 Z"
            className="fill-stone stroke-amethyst/50"
            strokeWidth="0.45"
          />
          {list.map((s) => {
            const { x, y } = projectSite(s.lat, s.lng);
            const active = picked === s.id;
            const isSaved = saved.includes(s.id);
            const px = x;
            const py = y * 0.64;
            return (
              <g
                key={s.id}
                transform={`translate(${px} ${py})`}
                className="cursor-pointer"
                onClick={() => setPicked(s.id)}
              >
                <circle r={active ? 3.2 : 2.2} fill={isSaved ? "#d4af37" : active ? "#8d7cff" : "#3dcf8a"} />
                <circle r={active ? 5.5 : 3.6} fill={isSaved ? "#d4af37" : "#3dcf8a"} opacity="0.2" />
              </g>
            );
          })}
        </svg>
        <p className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.14em] text-faint">
          {list.length} sites · gold = saved
        </p>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search sites, states, minerals"
        className="h-11 w-full rounded-md border border-line bg-obsidian px-3 text-sm text-fg outline-none placeholder:text-faint focus:border-field"
      />

      <div className="flex gap-1.5 overflow-x-auto">
        {ACCESS.map((a) => (
          <button
            key={a.k}
            type="button"
            onClick={() => setAccess(a.k)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs",
              access === a.k ? "border-field/40 bg-field/10 text-fg" : "border-line text-muted",
            )}
          >
            {a.l}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5">
        {(["all", "easy", "moderate", "hard"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDiff(d)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs capitalize",
              diff === d ? "border-fg/30 bg-fg/10 text-fg" : "border-line text-muted",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <SectionLabel>Localities</SectionLabel>
      <ul className="space-y-2">
        {list.map((s) => (
          <li key={s.id}>
            <Link
              to="/explore/$id"
              params={{ id: s.id }}
              className={cn("rh-panel block rounded-xl p-4", picked === s.id && "border-amethyst/40")}
              onClick={() => setPicked(s.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-fg">{s.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {s.state} · {s.access.replace("_", " ")} · {s.difficulty}
                  </p>
                </div>
                {saved.includes(s.id) && <span className="text-[10px] uppercase tracking-[0.14em] text-gold">Saved</span>}
              </div>
              <p className="mt-2 text-xs text-faint">{s.finds.slice(0, 4).join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
