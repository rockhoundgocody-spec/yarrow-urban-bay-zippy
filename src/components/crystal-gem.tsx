import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  hue: string;
  system?: string;
  className?: string;
  size?: number;
};

export function CrystalGem({ hue, system = "trigonal", className, size = 64 }: Props) {
  const uid = useId().replace(/:/g, "");
  const id = `${uid}-${hue.replace("#", "")}`;
  const s = system.toLowerCase();
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="18%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="38%" stopColor={hue} stopOpacity="0.95" />
          <stop offset="100%" stopColor={hue} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <ellipse cx="40" cy="68" rx="18" ry="5" fill={hue} opacity="0.22" />
      {s.includes("cubic") ? (
        <g>
          <polygon points="22,28 40,18 62,30 44,40" fill={`url(#g-${id})`} />
          <polygon points="22,28 44,40 44,60 22,48" fill={hue} opacity="0.7" />
          <polygon points="44,40 62,30 62,50 44,60" fill={hue} opacity="0.45" />
        </g>
      ) : s.includes("hex") || s.includes("trig") ? (
        <g>
          <polygon points="40,10 56,20 56,42 40,32 24,42 24,20" fill={`url(#g-${id})`} />
          <polygon points="24,42 40,32 56,42 40,70" fill={hue} opacity="0.55" />
          <polygon points="40,32 56,20 56,42" fill="#fff" opacity="0.18" />
        </g>
      ) : s.includes("ortho") || s.includes("tetra") ? (
        <g>
          <polygon points="28,12 52,18 58,58 24,64" fill={`url(#g-${id})`} />
          <polygon points="28,12 40,8 52,18 40,24" fill="#fff" opacity="0.22" />
        </g>
      ) : s.includes("amorphous") || s.includes("none") ? (
        <path
          d="M22 36c2-14 18-22 30-16 10 4 16 18 12 28-4 12-18 20-30 16-10-4-14-16-12-28z"
          fill={`url(#g-${id})`}
        />
      ) : (
        <g>
          <polygon points="18,34 40,8 64,30 50,70 26,64" fill={`url(#g-${id})`} />
          <polygon points="40,8 64,30 40,38" fill="#fff" opacity="0.2" />
        </g>
      )}
    </svg>
  );
}
