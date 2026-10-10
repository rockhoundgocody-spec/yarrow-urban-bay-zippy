/**
 * Per-route <head> builder. Canonical origin is rhgo.me.
 * Emits title, description, robots, canonical, Open Graph / Twitter share
 * tags and JSON-LD for public pages; private pages get noindex only.
 */
export const SITE_URL = "https://rhgo.me";
export const SITE_NAME = "RockHound GO";
export const SHARE_IMAGE = `${SITE_URL}/og.jpg`;

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

/** Trim to a search-snippet length on a word boundary. */
export function clamp(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 40))}…`;
}

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
  if (!noindex) {
    const url = canonicalUrl(path);
    meta.push(
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: SHARE_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "RockHound GO — field companion for rockhounds" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: SHARE_IMAGE },
    );
  }
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
