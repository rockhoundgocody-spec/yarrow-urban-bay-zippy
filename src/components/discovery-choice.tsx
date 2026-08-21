import { Gem, Landmark, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui";
import type { DiscoveryDisposition, LegalStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { XP_REWARDS } from "@/lib/xp";

export type DiscoveryChoiceValue = {
  disposition: DiscoveryDisposition;
  collected: boolean;
  leftInPlace: boolean;
  legalStatus: LegalStatus;
  ethicsPromptShown: true;
  userConfirmedLegalAccess: boolean;
  geoPrivacy: "exact_private" | "fuzzed_public" | "hidden";
};

const OPTIONS: {
  id: DiscoveryDisposition;
  icon: typeof Gem;
  title: string;
  body: string;
  xp: number;
  lane: string;
}[] = [
  {
    id: "chattel_collected",
    icon: Gem,
    title: "Add to GeoDex",
    body: "You collected it. Provenance, photo, and collector XP stay on this device.",
    xp: XP_REWARDS.saveVault,
    lane: "Collector",
  },
  {
    id: "affixed_logged",
    icon: Landmark,
    title: "Mark in place",
    body: "Leave it. Log the observation. Steward XP. Location stays private.",
    xp: XP_REWARDS.stewardLog,
    lane: "Steward",
  },
  {
    id: "restricted_observed",
    icon: ShieldAlert,
    title: "Observe only",
    body: "No legal access to collect. Record the sighting without a pin.",
    xp: XP_REWARDS.restrictedObserve,
    lane: "Explorer",
  },
];

export function DiscoveryChoice({
  onConfirm,
}: {
  onConfirm: (choice: DiscoveryChoiceValue) => void;
}) {
  const [legal, setLegal] = useState(false);
  const [picked, setPicked] = useState<DiscoveryDisposition | null>(null);

  function confirm() {
    if (!picked) return;
    const collected = picked === "chattel_collected";
    onConfirm({
      disposition: picked,
      collected,
      leftInPlace: picked === "affixed_logged",
      legalStatus: picked === "restricted_observed" ? "restricted" : legal ? "allowed" : "unknown",
      ethicsPromptShown: true,
      userConfirmedLegalAccess: legal && picked !== "restricted_observed",
      geoPrivacy: picked === "restricted_observed" ? "hidden" : "exact_private",
    });
  }

  return (
    <div className="mt-5 space-y-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold">Discovery choice</p>
      <p className="text-sm leading-relaxed text-muted">
        Collecting is a legal and ethical decision. Reward documentation more than extraction.
      </p>
      <label className="flex min-h-11 items-start gap-3 rounded-lg border border-line bg-void/40 px-3 py-3 text-sm text-fg">
        <input
          type="checkbox"
          checked={legal}
          onChange={(e) => setLegal(e.target.checked)}
          className="mt-1 size-4 accent-gold"
        />
        <span>I had legal access to this ground and will follow posted rules.</span>
      </label>
      <div className="space-y-2">
        {OPTIONS.map((o) => {
          const Icon = o.icon;
          const active = picked === o.id;
          const blocked = o.id === "chattel_collected" && !legal;
          return (
            <button
              key={o.id}
              type="button"
              disabled={blocked}
              onClick={() => setPicked(o.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors duration-150",
                active ? "border-gold/50 bg-gold/10" : "border-line bg-void/30 hover:bg-fg/5",
                blocked && "opacity-40",
              )}
            >
              <Icon className={cn("mt-0.5 size-4 shrink-0", active ? "text-gold" : "text-muted")} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-fg">{o.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{o.body}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-faint">
                  +{o.xp} XP · {o.lane}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <Button variant="gold" className="w-full" disabled={!picked} onClick={confirm}>
        Log this discovery
      </Button>
    </div>
  );
}
