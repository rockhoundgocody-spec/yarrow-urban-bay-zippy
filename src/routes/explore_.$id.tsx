import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Compass } from "lucide-react";
import { useEffect } from "react";
import { Button, Panel } from "@/components/ui";
import { SITE_BY_ID, siteHazards } from "@/data/locations";
import { MINERALS } from "@/data/minerals";
import { useField } from "@/lib/store";
import { toast } from "sonner";
import { pageHead, canonicalUrl, clamp } from "@/lib/seo";

export const Route = createFileRoute("/explore_/$id")({
  loader: ({ params }) => {
    const site = SITE_BY_ID[params.id];
    if (!site) throw notFound();
    return { site };
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site;
    if (!site) return {};
    return pageHead({
      title: `${site.name}, ${site.state}`,
      path: `/explore/${site.id}`,
      description: clamp(`Rockhounding at ${site.name}, ${site.state}. Likely finds: ${site.finds.slice(0, 4).join(", ")}. Season: ${site.season}.`),
      jsonLd: {
        "@type": "Place",
        name: site.name,
        url: canonicalUrl(`/explore/${site.id}`),
        address: { "@type": "PostalAddress", addressRegion: site.state },
        geo: { "@type": "GeoCoordinates", latitude: site.lat, longitude: site.lng },
      },
    });
  },
  component: SitePage,
});

function SitePage() {
  const { id } = Route.useParams();
  const site = SITE_BY_ID[id];
  const visit = useField((s) => s.visitSite);
  const toggle = useField((s) => s.toggleSaveSite);
  const saved = useField((s) => s.savedSiteIds.includes(id));
  const addTrip = useField((s) => s.addTrip);

  useEffect(() => {
    if (site) visit(site.id);
  }, [site, visit]);

  if (!site) {
    return (
      <Panel className="p-6 text-sm text-muted">
        Unknown locality. <Link to="/explore">Back to map</Link>
      </Panel>
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-[12px] uppercase tracking-[0.18em] text-field">{site.region}</p>
      <h1 className="font-display text-2xl leading-tight text-fg">{site.name}</h1>
      <p className="text-sm text-muted">
        {site.state} · {site.category.replace("_", " ")} · {site.difficulty}
      </p>

      <Panel className="grid grid-cols-2 gap-3 p-4 text-sm">
        <div>
          <p className="text-[12px] uppercase tracking-[0.14em] text-faint">Access</p>
          <p className="mt-1 capitalize text-fg">{site.access}</p>
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.14em] text-faint">Season</p>
          <p className="mt-1 text-fg">{site.season}</p>
        </div>
      </Panel>

      <p className="text-sm leading-relaxed text-muted">{site.notes}</p>

      <div className="rounded-xl border border-gold/25 bg-gold/5 p-4">
        <p className="text-[12px] uppercase tracking-[0.16em] text-gold">Land status</p>
        <p className="mt-2 text-sm leading-relaxed text-fg/90">{site.legality}</p>
        {site.legalityCheckedAt && site.legalitySource ? (
          <p className="mt-2 text-[13px] text-muted">
            Checked {site.legalityCheckedAt} ·{" "}
            <a href={site.legalitySource} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-cyan underline">
              source
            </a>
          </p>
        ) : (
          <p className="mt-2 text-[13px] font-medium text-gold">
            Unverified. Rules change and claims move — confirm with the land manager or posted signs before you
            collect.
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 text-[12px] uppercase tracking-[0.16em] text-faint">Hazards</p>
        <div className="flex flex-wrap gap-2">
          {siteHazards(site.category).map((h) => (
            <span key={h} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
              {h}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-faint">
        Pins are fuzzed for privacy. Confirm posted rules before collecting. Restricted ground is observe-only.
      </p>

      <div>
        <p className="mb-2 text-[12px] uppercase tracking-[0.16em] text-faint">Expected finds</p>
        <div className="flex flex-wrap gap-2">
          {site.finds.map((name) => {
            const m = MINERALS.find((x) => x.name === name);
            return m ? (
              <Link
                key={name}
                to="/pedia/$id"
                params={{ id: m.id }}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-3 py-1.5 text-xs text-fg"
              >
                {name}
              </Link>
            ) : (
              <span key={name} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
                {name}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={saved ? "ghost" : "primary"}
          className="flex-1"
          onClick={() => {
            toggle(site.id);
            toast(saved ? "Removed from saved sites" : "Saved to your route book");
          }}
        >
          {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
          {saved ? "Saved" : "Save site"}
        </Button>
        <Button
          variant="gold"
          className="flex-1"
          onClick={() => {
            addTrip({
              name: site.name,
              date: new Date().toISOString().slice(0, 10),
              siteIds: [site.id],
              notes: "",
              gear: defaultGear(),
            });
            toast.success("Trip drafted");
          }}
        >
          <Compass className="size-4" /> Plan trip
        </Button>
      </div>
      <Link to="/trips" className="flex min-h-12 items-center justify-center text-sm text-muted">
        Open trip planner
      </Link>
    </div>
  );
}

function defaultGear() {
  return [
    { id: "g1", label: "Safety glasses", packed: false },
    { id: "g2", label: "Crack hammer", packed: false },
    { id: "g3", label: "Water 2L", packed: false },
    { id: "g4", label: "Sample bags", packed: false },
    { id: "g5", label: "First aid", packed: false },
    { id: "g6", label: "Sun / weather layer", packed: false },
  ];
}
