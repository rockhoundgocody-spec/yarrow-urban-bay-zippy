import { CrystalGem } from "@/components/crystal-gem";
import { Button } from "@/components/ui";
import { useField } from "@/lib/store";

export function CinematicOpener() {
  const mark = useField((s) => s.markOpenerSeen);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-void p-6">
      <div className="rh-rise max-w-sm text-center">
        <CrystalGem hue="#8d7cff" system="trigonal" size={96} className="mx-auto" />
        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.28em] text-amethyst">
          Field intelligence
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-fg">RockHound-GO</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Explore. Scan. Choose. Log. The operating system for disciplined discovery — not a camera roll.
        </p>
        <Button variant="gold" className="mt-8 w-full" onClick={mark}>
          Enter the field
        </Button>
      </div>
    </div>
  );
}
