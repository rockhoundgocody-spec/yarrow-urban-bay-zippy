import { createFileRoute } from "@tanstack/react-router";
import { HeroCloverOrb } from "@/components/orb/hero-orb";
import { privateHead } from "@/lib/seo";

export const Route = createFileRoute("/clover")({
  head: () => privateHead("Clover", "/clover"),
  component: CloverPage,
});

function CloverPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <HeroCloverOrb size={196} />
    </div>
  );
}
