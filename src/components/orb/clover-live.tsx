import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useCloverConversation } from "@/components/orb/use-clover-conversation";

type Live = ReturnType<typeof useCloverConversation>;

const CloverLiveContext = createContext<Live | null>(null);

export function CloverLiveProvider({ children }: { children: ReactNode }) {
  const clover = useCloverConversation();

  useEffect(() => {
    const boot = () => {
      clover.start();
    };
    const onFirst = () => boot();
    window.addEventListener("pointerdown", onFirst, { once: true, capture: true });
    window.addEventListener("keydown", onFirst, { once: true, capture: true });
    try {
      void navigator.permissions?.query({ name: "microphone" as PermissionName }).then((p) => {
        if (p.state === "granted") boot();
      });
    } catch {
      /* permissions API missing */
    }
    return () => {
      window.removeEventListener("pointerdown", onFirst, true);
      window.removeEventListener("keydown", onFirst, true);
    };
  }, [clover]);

  return <CloverLiveContext.Provider value={clover}>{children}</CloverLiveContext.Provider>;
}

export function useClover() {
  const ctx = useContext(CloverLiveContext);
  if (!ctx) throw new Error("Clover live is not mounted");
  return ctx;
}
