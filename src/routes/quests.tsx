import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Camera, Gem, Map, BookOpen, Sparkles } from "lucide-react";
import { Panel } from "@/components/ui";
import { useField } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { QuestId } from "@/lib/types";

export const Route = createFileRoute("/quests")({ component: QuestsPage });

const ICONS: Record<QuestId, typeof Camera> = {
  scan: Camera,
  vault: Gem,
  map: Map,
  pedia: BookOpen,
  clover: Sparkles,
};

const LINKS = {
  scan: "/identify",
  vault: "/identify",
  map: "/explore",
  pedia: "/pedia",
  clover: "/clover",
} as const;

function QuestsPage() {
  const quests = useField((s) => s.quests);
  const done = quests.filter((q) => q.done).length;

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-gold">Play & progress</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Daily briefing</h1>
        <p className="mt-1 text-sm text-muted">
          {done}/{quests.length} complete. Resets at midnight UTC.
        </p>
      </header>
      <Panel className="p-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-fg/10">
          <div className="h-full bg-gold" style={{ width: `${(done / Math.max(quests.length, 1)) * 100}%` }} />
        </div>
      </Panel>
      <ul className="space-y-2">
        {quests.map((q) => {
          const Icon = ICONS[q.id];
          return (
            <li key={q.id}>
              <Link
                to={LINKS[q.id]}
                className={cn("rh-panel flex items-center gap-3 rounded-xl p-4", q.done && "opacity-60")}
              >
                <span className="grid size-10 place-items-center rounded-md border border-line">
                  {q.done ? <Check className="size-4 text-field" /> : <Icon className="size-4 text-gold" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-fg">{q.title}</p>
                  <p className="text-xs text-muted">{q.detail}</p>
                </div>
                <span className="text-xs tabular-nums text-muted">+{q.xp}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
