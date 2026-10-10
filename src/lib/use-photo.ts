import { useEffect, useState } from "react";
import { getPhoto } from "@/lib/photo-store";

/** Loads a specimen photo from IndexedDB (client only). */
export function usePhoto(specimenId: string | undefined, hasPhoto: boolean | undefined): string | undefined {
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    let live = true;
    if (!specimenId || !hasPhoto) {
      setUrl(undefined);
      return;
    }
    getPhoto(specimenId)
      .then((v) => {
        if (live) setUrl(v);
      })
      .catch(() => {
        if (live) setUrl(undefined);
      });
    return () => {
      live = false;
    };
  }, [specimenId, hasPhoto]);
  return url;
}
