import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Camera,
  Compass,
  Gem,
  Map,
  Navigation,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import { CrystalGem } from "@/components/crystal-gem";
import { HeroCloverOrb } from "@/components/orb/hero-orb";
import { SyncStatusBar } from "@/components/sync-bar";
import { XpRibbon } from "@/components/app-shell";
import { Panel, SectionLabel } from "@/components/ui";
import { SITES } from "@/data/locations";
import { MINERALS } from "@/data/minerals";
import { useField } from "@/lib/store";
import { rankFromLevel, xpToNext } from "@/lib/xp";
import { formatRelative } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const FIELD_MISSIONS = [
  { to: "/identify", icon: Camera, title: "Scan", sub: "Identify specimen", priority: true },
  { to: "/explore", icon: Map, title: "Field map", sub: "Live terrain intel", priority: true },
  { to: "/safety", icon: Shield, title: "Legality", sub: "Access rules · risk", priority: false },
  { to: "/vault", icon: Gem, title: "GeoDex", sub: "Field log · finds", priority: false },
  { to: "/trips", icon: Navigation, title: "Trip planner", sub: "Saved routes", priority: false },
  { to: "/safety", icon: AlertTriangle, title: "Weather & safety", sub: "Hazards · ethics", priority: false },
] as const;

function Home() {
  const name = useField((s) => s.displayName);
  const xp = useField((s) => s.xp);
  const streak = useField((s) => s.streak);
  const specimens = useField((s) => s.specimens);
  const quests = useField((s) => s.quests);
  const fieldMode = useField((s) => s.fieldMode);
  const { level } = xpToNext(xp);
  const nextQuest = quests.find((q) => !q.done);
  const featured = SITES[(new Date().getDate() - 1) % SITES.length] ?? SITES[0];
  const mineral = MINERALS.find((m) => m.id === "amethyst") ?? MINERALS[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
  const month = new Date().toLocaleString("en-US", { month: "long" });

  if (fieldMode) {
    return (
      <div className="space-y-5">
        <header>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-field shadow-[0_0_8px_var(--color-field)]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-field">Field mode · active</p>
          </div>
          <h1 className="mt-2 font-display text-[1.75rem] leading-tight text-fg">Field operations</h1>
          <p className="mt-1 text-sm text-muted">{rankFromLevel(level)} · {month} window</p>
        </header>
        <SyncStatusBar />
        <Link to="/identify" className="block">
          <Panel hairline className="flex items-center gap-4 p-4">
            <div className="grid size-14 place-items-center rounded-lg bg-gold text-void">
              <Camera className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gold">Primary action</p>
              <p className="font-display text-xl text-fg">Scan a specimen</p>
              <p className="text-sm text-muted">One photo. Then choose: collect or leave it.</p>
            </div>
          </Panel>
        </Link>
        <div className="space-y-2">
          {FIELD_MISSIONS.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link key={tile.title} to={tile.to} className="rh-panel flex min-h-16 items-center gap-3 rounded-xl px-4 py-3">
                <div className="grid size-10 place-items-center rounded-lg border border-line bg-void/40">
                  <Icon className={tile.priority ? "size-5 text-gold" : "size-5 text-field"} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fg">{tile.title}</p>
                  <p className="text-xs text-muted">{tile.sub}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-amethyst">Operating system active</p>
        <h1 className="mt-2 font-display text-[1.75rem] leading-tight text-fg">
          {greeting}, {name}.
        </h1>
        <p className="mt-1 text-sm text-muted">
          {rankFromLevel(level)} · disciplined discovery.
        </p>
      </header>

      <XpRibbon />
      <HeroCloverOrb variant="inline" size={128} />
      <SyncStatusBar />

      <Link to="/identify" className="block">
        <Panel hairline className="flex items-center gap-4 p-4">
          <div className="grid size-14 place-items-center rounded-lg bg-gold text-void">
            <Camera className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.16em] text-gold">Primary action</p>
            <p className="font-display text-xl text-fg">Scan a specimen</p>
            <p className="text-sm text-muted">Photo or field key. Then choose the ethical path.</p>
          </div>
        </Panel>
      </Link>

      {nextQuest && (
        <Link to="/quests" className="block">
          <Panel className="flex items-center gap-3 p-4">
            <Target className="size-4 text-cyan" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-faint">Next in the briefing</p>
              <p className="text-sm text-fg">{nextQuest.title}</p>
            </div>
            <span className="text-xs tabular-nums text-muted">+{nextQuest.xp} XP</span>
          </Panel>
        </Link>
      )}

      <section>
        <SectionLabel>Today's hunt</SectionLabel>
        <Link to="/explore/$id" params={{ id: featured.id }} className="rh-panel block rounded-xl p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-field">{featured.state} · {featured.access}</p>
          <p className="mt-1 font-display text-lg text-fg">{featured.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{featured.notes}</p>
          <p className="mt-3 text-xs text-faint">{featured.finds.join(" · ")}</p>
        </Link>
      </section>

      <section>
        <SectionLabel>Species of the hour</SectionLabel>
        <Link to="/pedia/$id" params={{ id: mineral.id }} className="rh-panel flex items-center gap-3 rounded-xl p-4">
          <CrystalGem hue={mineral.hue} system={mineral.crystalSystem} size={56} />
          <div className="min-w-0">
            <p className="font-display text-fg">{mineral.name}</p>
            <p className="text-xs text-muted">
              {mineral.formula} · Mohs {mineral.hardnessMin}
            </p>
          </div>
        </Link>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <SectionLabel>Recent GeoDex</SectionLabel>
          <Link to="/vault" className="text-xs text-muted hover:text-fg">
            Open
          </Link>
        </div>
        {specimens.length === 0 ? (
          <Panel className="p-4 text-sm text-muted">
            Empty cabinet. Scan your first specimen — collect it, or mark it in place.
          </Panel>
        ) : (
          <ul className="space-y-2">
            {specimens.slice(0, 3).map((s) => (
              <li key={s.id}>
                <Link to="/vault/$id" params={{ id: s.id }} className="rh-panel flex items-center gap-3 rounded-xl px-3 py-3">
                  <CrystalGem
                    hue={MINERALS.find((m) => m.id === s.mineralId)?.hue ?? "#8d7cff"}
                    system={s.crystalSystem}
                    size={40}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-fg">{s.name}</p>
                    <p className="text-[11px] text-faint">
                      {s.disposition === "affixed_logged"
                        ? "In place"
                        : s.disposition === "restricted_observed"
                          ? "Observed"
                          : "Collected"}{" "}
                      · {formatRelative(s.createdAt)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex gap-2 pb-2">
        <Link to="/clover" className="rh-panel flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm text-cyan">
          <Sparkles className="size-4" /> Clover chamber
        </Link>
        <Link to="/trips" className="rh-panel flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm text-muted">
          <Compass className="size-4" /> Plan a trip
        </Link>
      </div>

      <p className="pb-4 text-center text-[11px] text-faint">
        {streak} day streak · {specimens.length} in GeoDex
      </p>
    </div>
  );
}
