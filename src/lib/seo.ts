/**
 * Per-route <head> builder. Canonical origin is rhgo.me.
 *
 * og:* / twitter:* tags are injected server-side by the PWA head injector
 * (server/middleware/grok-pwa.ts) from the document <title>, so they are not
 * emitted here — duplicates would conflict.
 */
export const SITE_URL = "https://rhgo.me";
export const SITE_NAME = "RockHound GO";

type JsonLd = Record<string, unknown>;

export type PageHeadInput = {
  /** Page title without the brand suffix. Omit for the brand-only title. */
  title?: string;
  description: string;
  /** Path starting with "/". */
  path: string;
  /** Private or per-device pages: keep out of search indexes. */
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
};

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
}

export function pageHead({ title, description, path, noindex, jsonLd }: PageHeadInput) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large" },
  ];
  const links = noindex ? [] : [{ rel: "canonical", href: canonicalUrl(path) }];
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const scripts = noindex
    ? []
    : blocks.map((block) => ({
        type: "application/ld+json",
        // Escape "<" so data can never close the script element.
        children: JSON.stringify({ "@context": "https://schema.org", ...block }).replace(/</g, "\\u003c"),
      }));
  return { meta, links, scripts };
}

/** Private pages share one description and are never indexed. */
export function privateHead(title: string, path: string) {
  return pageHead({
    title,
    path,
    noindex: true,
    description: "Private to this device.",
  });
}
