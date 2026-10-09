import { createFileRoute } from "@tanstack/react-router";
import { MINERALS } from "@/data/minerals";
import { SITES } from "@/data/locations";
import { canonicalUrl } from "@/lib/seo";

/** Indexable routes only — private/per-device pages are deliberately absent. */
const STATIC_PATHS = ["/", "/explore", "/identify", "/pedia", "/safety"];

function buildSitemap(): string {
  const paths = [
    ...STATIC_PATHS,
    ...MINERALS.map((m) => `/pedia/${m.id}`),
    ...SITES.map((s) => `/explore/${s.id}`),
  ];
  const urls = paths
    .map((p) => `  <url><loc>${canonicalUrl(p)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
