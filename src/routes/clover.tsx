import { createFileRoute } from "@tanstack/react-router";
import { HeroCloverOrb } from "@/components/orb/hero-orb";

export const Route = createFileRoute("/clover")({ component: CloverPage });

function CloverPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <HeroCloverOrb size={196} />
    </div>
  );
}
