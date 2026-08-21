import { createFileRoute } from "@tanstack/react-router";
import { Button, Panel, Stat } from "@/components/ui";
import { BADGE_CATALOG } from "@/data/badges";
import { useField } from "@/lib/store";
import { rankFromLevel, xpToNext } from "@/lib/xp";
import { formatUsd } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const name = useField((s) => s.displayName);
  const xp = useField((s) => s.xp);
  const streak = useField((s) => s.streak);
  const specimens = useField((s) => s.specimens);
  const badges = useField((s) => s.badges);
  const saved = useField((s) => s.savedSiteIds);
  const collector = useField((s) => s.collectorXp);
  const steward = useField((s) => s.stewardXp);
  const scientist = useField((s) => s.scientistXp);
  const explorer = useField((s) => s.explorerXp);
  const completeOnboarding = useField((s) => s.completeOnboarding);
  const reset = useField((s) => s.resetLocal);
  const { level } = xpToNext(xp);
  const value = specimens
    .filter((s) => s.collected)
    .reduce((a, s) => a + ((s.valueLow ?? 0) + (s.valueHigh ?? 0)) / 2, 0);
  const earned = new Set(badges.map((b) => b.id));

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-amethyst">Progress</p>
        <h1 className="mt-1 font-display text-2xl text-fg">{name}</h1>
        <p className="mt-1 text-sm text-muted">
          {rankFromLevel(level)} · Level {level}
        </p>
      </header>
      <Panel className="grid grid-cols-2 gap-4 p-4">
        <Stat label="XP" value={xp} />
        <Stat label="Streak" value={`${streak}d`} />
        <Stat label="GeoDex" value={specimens.length} />
        <Stat label="Collected value" value={formatUsd(value)} />
        <Stat label="Saved sites" value={saved.length} />
        <Stat label="Badges" value={`${earned.size}/${BADGE_CATALOG.length}`} />
      </Panel>

      <Panel className="grid grid-cols-2 gap-3 p-4">
        <Stat label="Collector" value={collector ?? 0} />
        <Stat label="Steward" value={steward ?? 0} />
        <Stat label="Scientist" value={scientist ?? 0} />
        <Stat label="Explorer" value={explorer ?? 0} />
      </Panel>

      <section>
        <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-faint">Credentials</p>
        <ul className="grid grid-cols-2 gap-2">
          {BADGE_CATALOG.map((b) => (
            <li
              key={b.id}
              className={cn(
                "rounded-xl border p-3",
                earned.has(b.id) ? "border-gold/35 bg-gold/8" : "border-line opacity-50",
              )}
            >
              <p className="text-sm text-fg">{b.name}</p>
              <p className="mt-1 text-[11px] text-muted">{b.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.16em] text-faint">Field name</span>
        <input
          defaultValue={name}
          onBlur={(e) => completeOnboarding(e.target.value)}
          className="mt-2 h-11 w-full rounded-md border border-line bg-obsidian px-3 text-sm text-fg outline-none focus:border-amethyst"
        />
      </label>

      <Button variant="line" className="w-full text-danger" onClick={() => reset()}>
        Reset local field data
      </Button>
      <p className="text-[11px] leading-relaxed text-faint">
        Everything here stays on this device. No sign-in — say the word and I'll add accounts.
      </p>
    </div>
  );
}
