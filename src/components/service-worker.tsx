import { useEffect } from "react";

/**
 * Registers /sw.js in production builds for offline field use. In dev it
 * removes any stale registration so HMR modules are never served from cache.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    if (import.meta.env.PROD) {
      const register = () => {
        navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
          /* unsupported context (e.g. private mode) — app still works online */
        });
      };
      if (document.readyState === "complete") register();
      else window.addEventListener("load", register, { once: true });
    } else {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => undefined);
    }
  }, []);
  return null;
}
