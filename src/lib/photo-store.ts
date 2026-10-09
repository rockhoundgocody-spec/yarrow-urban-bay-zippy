/**
 * Specimen photos live in IndexedDB, not localStorage: localStorage caps
 * around 5 MB per site, which a few dozen photos would exhaust. IndexedDB
 * typically allows hundreds of MB and stores large strings efficiently.
 */
const DB_NAME = "rhgo-photos";
const STORE = "photos";

function hasIdb(): boolean {
  return typeof indexedDB !== "undefined";
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (!hasIdb()) return Promise.reject(new Error("IndexedDB unavailable"));
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        dbPromise = null;
        reject(req.error ?? new Error("Could not open photo storage"));
      };
    });
  }
  return dbPromise;
}

function run<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const req = fn(tx.objectStore(STORE));
        tx.oncomplete = () => resolve(req.result);
        tx.onerror = () => reject(tx.error ?? new Error("Photo storage failed"));
        tx.onabort = () => reject(tx.error ?? new Error("Photo storage aborted"));
      }),
  );
}

export function putPhoto(id: string, dataUrl: string): Promise<void> {
  return run("readwrite", (s) => s.put(dataUrl, id)).then(() => undefined);
}

export function getPhoto(id: string): Promise<string | undefined> {
  return run<string | undefined>("readonly", (s) => s.get(id) as IDBRequest<string | undefined>);
}

export function deletePhoto(id: string): Promise<void> {
  return run("readwrite", (s) => s.delete(id)).then(() => undefined);
}

export function clearPhotos(): Promise<void> {
  return run("readwrite", (s) => s.clear()).then(() => undefined);
}

export async function getPhotos(ids: string[]): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const id of ids) {
    const v = await getPhoto(id).catch(() => undefined);
    if (v) out[id] = v;
  }
  return out;
}
