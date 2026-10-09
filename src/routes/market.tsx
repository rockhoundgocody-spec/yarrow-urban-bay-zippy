import { Link, createFileRoute } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Panel } from "@/components/ui";
import { privateHead } from "@/lib/seo";

export const Route = createFileRoute("/market")({
  head: () => privateHead("Specimen market", "/market"),
  component: MarketPage,
});

function MarketPage() {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Commerce</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Specimen market</h1>
      </header>
      <Panel className="flex flex-col items-start gap-3 p-5">
        <ShoppingBag className="size-6 text-gold" aria-hidden="true" />
        <p className="font-display text-lg text-fg">The market isn't open yet.</p>
        <p className="text-sm leading-relaxed text-muted">
          Buying and selling will open once collectors can sign in and list their own specimens. Until then there are no
          listings here — nothing on this page is for sale.
        </p>
        <Link
          to="/vault"
          className="inline-flex min-h-12 items-center rounded-md border border-line-strong px-4 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost"
        >
          Open your GeoDex
        </Link>
      </Panel>
    </div>
  );
}
