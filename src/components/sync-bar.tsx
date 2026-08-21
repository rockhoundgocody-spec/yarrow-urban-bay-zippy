import { WifiOff } from "lucide-react";
import { useField } from "@/lib/store";

export function SyncStatusBar() {
  const count = useField((s) => s.specimens.length);
  return (
    <div className="flex items-center gap-2 px-1 text-[10px] uppercase tracking-[0.14em] text-faint">
      <WifiOff className="size-3" />
      Local cache · {count} finds on this device · queued 0
    </div>
  );
}
