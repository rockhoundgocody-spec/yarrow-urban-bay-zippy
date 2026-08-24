import type { Rarity } from "@/data/minerals";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const RARITY_CLASS: Record<Rarity, string> = {
  common: "text-rarity-common border-rarity-common/30 bg-rarity-common/10",
  uncommon: "text-rarity-uncommon border-rarity-uncommon/30 bg-rarity-uncommon/10",
  rare: "text-rarity-rare border-rarity-rare/30 bg-rarity-rare/10",
  epic: "text-rarity-epic border-rarity-epic/30 bg-rarity-epic/10",
  legendary: "text-rarity-legendary border-rarity-legendary/30 bg-rarity-legendary/10",
};

export function RarityChip({ rarity, className }: { rarity: Rarity; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]",
        RARITY_CLASS[rarity],
        className,
      )}
    >
      {rarity}
    </span>
  );
}

export function Panel({
  children,
  className,
  hairline,
}: {
  children: ReactNode;
  className?: string;
  hairline?: boolean;
}) {
  return (
    <div className={cn("rh-panel rounded-xl", hairline && "rh-hairline", className)}>{children}</div>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "gold" | "line" }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium tracking-wide transition-colors duration-150 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        variant === "primary" && "bg-fg text-void hover:bg-fg/90",
        variant === "gold" && "bg-gold text-void hover:bg-gold/90",
        variant === "ghost" && "bg-fg/5 text-fg hover:bg-fg/10",
        variant === "line" && "border border-line-strong bg-transparent text-fg hover:bg-fg/5",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-faint">{label}</p>
      <p className="mt-1 font-display text-lg tabular-nums text-fg">{value}</p>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-faint">{children}</p>
  );
}
