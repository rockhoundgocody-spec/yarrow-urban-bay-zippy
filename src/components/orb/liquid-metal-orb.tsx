import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { OpalShader } from "@/components/orb/opal-shader";

export type OrbState = "idle" | "listening" | "thinking" | "speaking" | "resting";

type Props = {
  size?: number;
  state?: OrbState;
  level?: number;
  className?: string;
  interactive?: boolean;
};

function growthTier(level: number) {
  if (level < 3) return 1;
  if (level < 5) return 2;
  return 3;
}

export function LiquidMetalOrb({
  size = 140,
  state = "idle",
  level = 1,
  className,
  interactive = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const poseRef = useRef<HTMLDivElement>(null);
  const pose = useRef({ x: 0, y: 0, s: 1 });
  const pointer = useRef({ x: 0, y: 0 });
  const stateRef = useRef(state);
  stateRef.current = state;
  const tier = growthTier(level);
  const mini = size < 80;

  useEffect(() => {
    const el = wrapRef.current;
    const poseEl = poseRef.current;
    if (!el || !poseEl) return;
    let raf = 0;
    let alive = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    };
    if (interactive && !mini) window.addEventListener("pointermove", onMove);

    const tick = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(tick);
      if (reduce) return;
      const t = now * 0.001;
      const st = stateRef.current;
      const wobX = Math.sin(t * 0.7) * 3.2;
      const wobY = Math.cos(t * 0.53) * 2.6;
      const breath =
        1 + Math.sin(t * (st === "speaking" ? 2.4 : st === "listening" ? 1.6 : 0.85)) * 0.018;
      let leanX = 0;
      let leanY = 0;
      if (interactive && !mini) {
        const r = el.getBoundingClientRect();
        const dx = (pointer.current.x - (r.left + r.width / 2)) / Math.max(r.width, 1);
        const dy = (pointer.current.y - (r.top + r.height / 2)) / Math.max(r.height, 1);
        leanX = Math.max(-10, Math.min(10, dx * 8));
        leanY = Math.max(-8, Math.min(8, dy * 6));
      }
      const p = pose.current;
      p.x += (leanX + wobX - p.x) * 0.12;
      p.y += (leanY + wobY - p.y) * 0.12;
      p.s += (breath - p.s) * 0.16;
      poseEl.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.s})`;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [interactive, mini]);

  return (
    <div
      ref={wrapRef}
      data-state={state}
      className={cn("orb-shell", mini && "orb-shell-mini", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="orb-glow" />
      <div className="orb-glow-bio" />
      <div className="orb-glow-mid" />
      <div className="orb-glow-core" />
      {!mini && (
        <div className="orb-motes" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      {tier >= 2 && (
        <svg className="orb-ring orb-ring-a" viewBox="0 0 240 240" width={size * 1.22} height={size * 1.22}>
          <polygon
            points="120,18 210,72 210,168 120,222 30,168 30,72"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      )}
      {tier >= 3 && (
        <svg className="orb-ring orb-ring-b" viewBox="0 0 240 240" width={size * 1.38} height={size * 1.38}>
          <polygon
            points="120,8 218,66 218,174 120,232 22,174 22,66"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>
      )}
      <div ref={poseRef} className="orb-pose">
        <div className="orb-body">
          <OpalShader state={state} />
          <div className="orb-film" />
          <div className="orb-film-counter" />
          <div className="orb-caustic" />
          <div className="orb-rim" />
          <div className="orb-spec" />
          <div className="orb-glint" />
          <span className="orb-ripple" />
          <span className="orb-ripple delay-1" />
          <span className="orb-ripple delay-2" />
          <div className="orb-iris" />
        </div>
      </div>
    </div>
  );
}
