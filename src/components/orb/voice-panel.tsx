import { Compass, Keyboard, Loader2, Mic, Send, Target, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { OrbState } from "@/components/orb/liquid-metal-orb";
import type { HuntResult } from "@/lib/hunt";
import type { CloverMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

const PHASE_TEXT: Record<OrbState, string> = {
  idle: "",
  thinking: "Reading the outcrop…",
  speaking: "Talk over me to take a turn",
  listening: "I'm listening — just talk",
  resting: "Tap the orb or the mic when you're ready",
};

type Props = {
  phase: OrbState;
  messages: CloverMessage[];
  interim: string;
  onClose: () => void;
  onHunt: () => void;
  huntLoading: boolean;
  hunt: HuntResult | null;
  onDismissHunt: () => void;
  voiceSupported: boolean;
  micError?: string | null;
  onSend: (text: string) => void;
  onMic: () => void;
  compact?: boolean;
};

function Wave({ mode }: { mode: "listening" | "speaking" }) {
  return (
    <span className="orb-wave" data-mode={mode} aria-hidden>
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function CloverVoicePanel({
  phase,
  messages,
  interim,
  onClose,
  onHunt,
  huntLoading,
  hunt,
  onDismissHunt,
  voiceSupported,
  micError = null,
  onSend,
  onMic,
  compact = true,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const shown = compact ? messages.slice(-8) : messages;

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight });
  }, [messages, interim, hunt]);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-line bg-obsidian/95 shadow-panel backdrop-blur-md",
        compact ? "w-[min(100%,18.5rem)] max-h-80" : "max-h-[min(52vh,28rem)] w-full",
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-amethyst">Clover · field AGI</p>
          {(phase === "listening" || phase === "speaking") && <Wave mode={phase} />}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onHunt}
            disabled={huntLoading}
            className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-[11px] text-cyan disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian"
            aria-label="Find next hunt suggestion"
          >
            {huntLoading ? <Loader2 className="size-3.5 animate-spin" /> : <Target className="size-3.5" />}
            Hunt
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="End conversation"
            className="grid size-9 place-items-center rounded-md text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className="min-h-24 flex-1 space-y-2 overflow-y-auto px-3 py-2"
        style={{ overflowAnchor: "none" }}
      >
        {shown.map((m) => (
          <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed",
                m.role === "user" ? "bg-amethyst/20 text-fg" : "bg-stone text-fg/90",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
        {interim && (
          <div className="flex justify-end">
            <div className="max-w-[90%] rounded-xl border border-dashed border-amethyst/30 px-3 py-2 text-xs italic text-muted">
              {interim}
            </div>
          </div>
        )}
        {phase === "thinking" && (
          <div className="inline-flex items-center gap-2 text-xs text-muted">
            <Loader2 className="size-3.5 animate-spin" /> Thinking…
          </div>
        )}
        {hunt && (
          <div className="rounded-xl border border-amethyst/25 bg-amethyst/10 p-2">
            <p className="px-1 text-[10px] font-medium uppercase tracking-[0.14em] text-amethyst">
              Hunt next · {hunt.collection_size} logged
            </p>
            <p className="mt-1 px-1 text-xs leading-relaxed text-muted">{hunt.clover_intro}</p>
            <div className="mt-2 space-y-2">
              {hunt.suggestions.map((s) => (
                <Link
                  key={`${s.siteId}-${s.mineral_name}`}
                  to="/explore/$id"
                  params={{ id: s.siteId }}
                  className="block rounded-lg border border-line bg-void/50 p-2"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-medium text-fg">{s.mineral_name}</span>
                    {s.distance_mi != null && (
                      <span className="font-mono text-[10px] text-cyan">{s.distance_mi} mi</span>
                    )}
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-cyan">
                    <Compass className="size-3" /> {s.hotspot_name}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted">{s.what_to_look_for}</p>
                  <p className="mt-0.5 text-[11px] italic text-faint">{s.why}</p>
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={onDismissHunt}
              aria-label="Dismiss hunt suggestions"
              className="mt-1 w-full rounded-md py-1 text-[11px] text-faint hover:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      <form
        className="flex items-center gap-1.5 border-t border-line px-2 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          onSend(draft.trim());
          setDraft("");
        }}
      >
        {voiceSupported && (
          <button
            type="button"
            onClick={onMic}
            aria-label={phase === "listening" ? "Listening: tap to pause microphone" : "Microphone: tap to speak"}
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian",
              phase === "listening"
                ? "bg-field/25 text-field shadow-[0_0_16px_rgb(61_207_138_/_0.45)]"
                : phase === "speaking"
                  ? "bg-amethyst/20 text-amethyst"
                  : "text-muted hover:bg-fg/5 hover:text-fg",
            )}
          >
            <Mic className={cn("size-4", phase === "listening" && "animate-pulse")} />
          </button>
        )}
        {!voiceSupported && <Keyboard className="ml-1 size-3.5 shrink-0 text-faint" />}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          aria-label="Ask Clover a field question"
          placeholder={voiceSupported ? "Type, or just talk" : "Ask Clover a field question"}
          className="h-10 min-w-0 flex-1 rounded-md bg-transparent px-2 text-sm text-fg outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian"
        />
        <button
          type="submit"
          disabled={!draft.trim() || phase === "thinking"}
          aria-label="Send message to Clover"
          className="grid size-10 place-items-center rounded-md text-cyan disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian"
        >
          <Send className="size-4" />
        </button>
      </form>
      <p className="px-3 pb-2 text-center text-[10px] text-faint">
        {micError ?? PHASE_TEXT[phase]}
      </p>
    </div>
  );
}
