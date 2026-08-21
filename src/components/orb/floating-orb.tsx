import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { LiquidMetalOrb } from "@/components/orb/liquid-metal-orb";
import { useCloverConversation } from "@/components/orb/use-clover-conversation";
import { useField } from "@/lib/store";

const ROUTE_TIPS: Record<string, string[]> = {
  "/": [
    "Find anything fun, or just wandering?",
    "Every specimen has a legal path.",
    "Pyrite versus gold. Ask me.",
  ],
  "/explore": [
    "Public land is not a free-for-all.",
    "Creek beds after a storm. Gravels reshuffle.",
    "Granite contacts hide quartz veins.",
  ],
  "/vault": ["GeoDex is the cabinet. Provenance is the value."],
  "/market": ["Rarity on a listing is a claim, not a lab report."],
  "/quests": ["One scan, one log, one map look. That's a field day."],
  "/pedia": ["Open a species before you trust a hunch."],
  "/community": ["Don't post exact GPS for sensitive sites."],
};

const DEFAULT_TIPS = ["I'm Clover. Tap me when you want to talk."];
const HIDDEN_PREFIX = ["/identify", "/clover"];

export function FloatingCloverOrb() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onboarded = useField((s) => s.onboarded);
  const openerSeen = useField((s) => s.openerSeen);
  const fieldMode = useField((s) => s.fieldMode);
  const clover = useCloverConversation();
  const [tip, setTip] = useState("");
  const [showTip, setShowTip] = useState(false);
  const tipTimer = useRef<number | null>(null);

  const hidden =
    !onboarded ||
    !openerSeen ||
    HIDDEN_PREFIX.some((r) => pathname === r || pathname.startsWith(`${r}/`)) ||
    (pathname === "/" && !fieldMode);

  useEffect(() => {
    if (hidden || clover.open) {
      setShowTip(false);
      return;
    }
    const pick = () => {
      const pool = ROUTE_TIPS[pathname] ?? DEFAULT_TIPS;
      return pool[Math.floor(Math.random() * pool.length)] ?? DEFAULT_TIPS[0];
    };
    const arrival = window.setTimeout(() => {
      setTip(pick());
      setShowTip(true);
      tipTimer.current = window.setTimeout(() => setShowTip(false), 4200);
    }, 2800);
    const periodic = window.setInterval(() => {
      if (clover.open) return;
      setTip(pick());
      setShowTip(true);
      if (tipTimer.current) window.clearTimeout(tipTimer.current);
      tipTimer.current = window.setTimeout(() => setShowTip(false), 3800);
    }, 42000);
    return () => {
      window.clearTimeout(arrival);
      window.clearInterval(periodic);
      if (tipTimer.current) window.clearTimeout(tipTimer.current);
    };
  }, [pathname, hidden, clover.open]);

  function handleTap(e: MouseEvent<HTMLButtonElement>) {
    e.currentTarget.focus({ preventScroll: true });
    setShowTip(false);
    if (!clover.open) clover.start();
    else clover.nudge();
  }

  if (hidden) return null;

  const size = clover.open ? 68 : 64;
  const spoken =
    clover.phase === "listening" && clover.interim
      ? clover.interim
      : clover.line && clover.phase !== "idle"
        ? clover.line
        : showTip
          ? tip
          : "";

  return (
    <div
      className="pointer-events-none fixed z-[35] flex flex-col items-end"
      style={{ bottom: "calc(5.75rem + env(safe-area-inset-bottom, 0px))", right: 12 }}
    >
      {spoken && (
        <div className="orb-tip pointer-events-none mb-3 max-w-52 rh-rise">
          <span className="orb-tip-dot" data-mood={clover.companion.mood} />
          {spoken}
        </div>
      )}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleTap}
        aria-label={clover.open ? "Talk to Clover" : "Wake Clover"}
        className="orb-stage pointer-events-auto grid place-items-center transition-transform duration-150 ease-out active:scale-[0.96]"
        style={{ width: size + 22, height: size + 22 }}
      >
        <LiquidMetalOrb size={size} state={clover.phase} level={clover.companion.level} />
      </button>
    </div>
  );
}
