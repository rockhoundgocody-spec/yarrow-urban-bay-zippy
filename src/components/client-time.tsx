import { useEffect, useState } from "react";
import { formatRelative } from "@/lib/utils";

/**
 * Client-clock rendering helpers.
 *
 * Greetings, "today's" rotations and "40m ago" labels all come from the
 * visitor's clock and timezone. The server pass has neither — it renders in UTC,
 * at the moment the response is built — so computing them during SSR makes the
 * client's first pass disagree with the server HTML. React then throws
 * "Hydration failed because the server rendered text didn't match the client"
 * and regenerates that tree on the client, i.e. the screen visibly re-renders
 * on load. Everything time-derived renders through this module so the first
 * paint the client produces matches the server HTML exactly.
 */

/** `false` during SSR and the hydrating render; `true` from the first post-mount render. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Relative timestamp, filled in from the visitor's clock once mounted. */
export function RelativeTime({ at, className }: { at: number; className?: string }) {
  const mounted = useMounted();
  return <span className={className}>{mounted ? formatRelative(at) : null}</span>;
}
