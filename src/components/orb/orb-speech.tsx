import type { OrbState } from "@/components/orb/liquid-metal-orb";
import { cn } from "@/lib/utils";

export function OrbSpeech({
  line,
  interim,
  phase,
  micError,
  compact = false,
}: {
  line: string;
  interim: string;
  phase: OrbState;
  micError?: string | null;
  compact?: boolean;
}) {
  const live = phase === "listening" && interim.trim();
  const text = micError
    ? micError
    : live
      ? interim
      : phase === "thinking"
        ? "…"
        : phase === "listening"
          ? ""
          : line;
  if (!text && phase === "idle") return null;
  if (!text && phase === "resting") return null;

  return (
    <p
      className={cn("orb-line", compact && "orb-line-compact", live && "orb-line-live")}
      aria-live="polite"
    >
      {text}
    </p>
  );
}
