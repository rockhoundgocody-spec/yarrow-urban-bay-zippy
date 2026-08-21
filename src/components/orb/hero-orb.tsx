import { useEffect, type MouseEvent } from "react";
import { LiquidMetalOrb } from "@/components/orb/liquid-metal-orb";
import { OrbSpeech } from "@/components/orb/orb-speech";
import { useCloverConversation } from "@/components/orb/use-clover-conversation";

export function HeroCloverOrb({
  size = 160,
  variant = "hero",
}: {
  size?: number;
  variant?: "hero" | "inline";
}) {
  const clover = useCloverConversation();

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    if (sessionStorage.getItem("rhgo_last_gps")) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        sessionStorage.setItem(
          "rhgo_last_gps",
          JSON.stringify({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        ),
      () => {},
      { timeout: 8000, maximumAge: 600_000 },
    );
  }, []);

  function handleTap(e: MouseEvent<HTMLButtonElement>) {
    e.currentTarget.focus({ preventScroll: true });
    if (!clover.open) clover.start();
    else if (clover.phase === "resting") clover.nudge();
    else clover.nudge();
  }

  const pad = variant === "inline" ? 72 : 88;

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleTap}
        aria-label={clover.open ? "Talk to Clover" : "Wake Clover"}
        className="orb-stage grid place-items-center transition-transform duration-150 ease-out active:scale-[0.97]"
        style={{ width: size + pad, height: size + pad }}
      >
        <LiquidMetalOrb size={size} state={clover.phase} level={clover.companion.level} />
      </button>
      <OrbSpeech
        line={clover.line}
        interim={clover.interim}
        phase={clover.phase}
        micError={clover.micError}
      />
    </div>
  );
}
