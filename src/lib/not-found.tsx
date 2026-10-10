import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

/** Router-wide 404. The server responds with HTTP 404 when this renders. */
export function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <meta name="robots" content="noindex, nofollow" />
      <span className="grid size-14 place-items-center rounded-full border border-line-strong text-frost" aria-hidden="true">
        <Compass className="size-6" />
      </span>
      <p className="text-[12px] uppercase tracking-[0.18em] text-amber">404 · off the map</p>
      <h1 className="font-display text-2xl text-fg">No outcrop here</h1>
      <p className="max-w-xs text-sm text-muted">That page doesn't exist. Head back to the hub or open the field map.</p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center rounded-md bg-gold px-5 text-sm font-medium text-void focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          Command hub
        </Link>
        <Link
          to="/explore"
          className="inline-flex min-h-12 items-center rounded-md border border-line-strong px-5 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          Field map
        </Link>
      </div>
    </section>
  );
}
