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
      <h1 className="sr-only">Clover, your field companion</h1>
      <HeroCloverOrb size={196} />
    </div>
  );
}
