/* RockHound GO service worker — offline field use.
 *
 * Pages:   network-first (fresh when signal exists), cached copy when not,
 *          falling back to the cached command hub for never-visited pages.
 * Assets:  /assets/* are content-hashed → cache-first, kept indefinitely.
 * Other same-origin GETs (icons, manifest, og): stale-while-revalidate.
 * Cross-origin requests and non-GET calls (server functions, AI) pass through.
 */
const VERSION = "rhgo-v1";
const SHELL = `${VERSION}-shell`;
const ASSETS = `${VERSION}-assets`;
const PAGES = `${VERSION}-pages`;

// Core field pages, precached so the app opens with no signal after one visit.
const CORE_PAGES = ["/", "/identify", "/explore", "/pedia", "/vault", "/safety", "/trips"];

async function precache() {
  const pages = await caches.open(PAGES);
  const assets = await caches.open(ASSETS);
  const found = new Set();
  await Promise.all(
    CORE_PAGES.map(async (path) => {
      try {
        const res = await fetch(path, { credentials: "same-origin" });
        if (!res.ok) return;
        const html = await res.clone().text();
        for (const m of html.matchAll(/["'](\/assets\/[^"'\s?#]+)["']/g)) found.add(m[1]);
        await pages.put(path, res);
      } catch {
        /* offline during install — runtime caching fills in later */
      }
    }),
  );
  await Promise.all(
    [...found].map((url) => assets.add(url).catch(() => undefined)),
  );
  const shell = await caches.open(SHELL);
  await Promise.all(
    ["/favicon.svg", "/icons/icon-192.png", "/manifest.webmanifest"].map((u) => shell.add(u).catch(() => undefined)),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

async function networkFirstPage(request) {
  const cache = await caches.open(PAGES);
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    return (
      (await cache.match(request, { ignoreSearch: true })) ||
      (await cache.match("/")) ||
      new Response("<h1>Offline</h1><p>Reconnect once to cache RockHound GO for the field.</p>", {
        status: 503,
        headers: { "content-type": "text/html; charset=utf-8" },
      })
    );
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(SHELL);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => undefined);
  return hit || (await network) || Response.error();
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_serverFn") || url.pathname.startsWith("/api/")) return;
  if (url.pathname === "/sw.js") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
  } else if (url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});
