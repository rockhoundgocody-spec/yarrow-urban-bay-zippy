import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { Panel, SectionLabel } from "@/components/ui";

export const Route = createFileRoute("/safety")({ component: SafetyPage });

const RULES = [
  {
    title: "Verify land status",
    body: "Public, fee-dig, permit, and private are not the same. A pin in this app is not permission. Call the land manager.",
  },
  {
    title: "Exact locations stay private",
    body: "Find coordinates never leave this device. If you share, fuzz the pin. Never post a public GPS for a sensitive site.",
  },
  {
    title: "Collecting is optional",
    body: "Marking a specimen in place awards more XP than taking it. Restricted ground is observe-only.",
  },
  {
    title: "Do not encourage illegal collecting",
    body: "National parks, monuments, and many wilderness areas prohibit collecting. If the status is unknown, leave it.",
  },
  {
    title: "Field hazards",
    body: "Heat, shafts, falling rock, tides, and weather kill rockhounds. Pack water, tell someone the plan, wear eyes.",
  },
];

function SafetyPage() {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-field">Safety · legality</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Land before the hammer</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          RockHound-GO is a field intelligence platform. It will not tell you a site is legal if it is not.
        </p>
      </header>

      <Panel className="flex items-start gap-3 p-4">
        <Shield className="mt-0.5 size-5 text-field" />
        <p className="text-sm leading-relaxed text-muted">
          Access chips on the map are starting points. Always confirm posted signs, claim markers, and seasonal closures.
        </p>
      </Panel>

      <SectionLabel>Stewardship doctrine</SectionLabel>
      <ul className="space-y-2">
        {RULES.map((r) => (
          <li key={r.title} className="rh-panel rounded-xl p-4">
            <p className="font-display text-fg">{r.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
          </li>
        ))}
      </ul>

      <Link to="/explore" className="block text-center text-sm text-cyan">
        Open the field map
      </Link>
    </div>
  );
}
