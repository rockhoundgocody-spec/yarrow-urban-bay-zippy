import { describe, expect, it } from "vitest";
import { SHARE_IMAGE, canonicalUrl, clamp, pageHead, privateHead } from "@/lib/seo";

const metaValue = (head: ReturnType<typeof pageHead>, key: string) =>
  head.meta.find((m) => m.name === key || m.property === key)?.content;

describe("seo", () => {
  it("builds canonical URLs on rhgo.me without trailing slashes", () => {
    expect(canonicalUrl("/")).toBe("https://rhgo.me/");
    expect(canonicalUrl("/pedia/quartz/")).toBe("https://rhgo.me/pedia/quartz");
  });

  it("clamps long descriptions on a word boundary", () => {
    const long = "word ".repeat(80);
    const out = clamp(long);
    expect(out.length).toBeLessThanOrEqual(158);
    expect(out.endsWith("…")).toBe(true);
    expect(clamp("short")).toBe("short");
  });

  it("gives public pages canonical, share tags and the brand suffix", () => {
    const head = pageHead({ title: "Quartz", description: "d", path: "/pedia/quartz" });
    expect(head.meta[0]).toEqual({ title: "Quartz · RockHound GO" });
    expect(metaValue(head, "robots")).toMatch(/^index/);
    expect(head.links).toEqual([{ rel: "canonical", href: "https://rhgo.me/pedia/quartz" }]);
    expect(metaValue(head, "og:url")).toBe("https://rhgo.me/pedia/quartz");
    expect(metaValue(head, "og:image")).toBe(SHARE_IMAGE);
    expect(metaValue(head, "twitter:card")).toBe("summary_large_image");
  });

  it("keeps private pages out of search and out of shares", () => {
    const head = privateHead("GeoDex", "/vault");
    expect(metaValue(head, "robots")).toBe("noindex, nofollow");
    expect(head.links).toEqual([]);
    expect(metaValue(head, "og:title")).toBeUndefined();
    expect(head.scripts).toEqual([]);
  });

  it("escapes JSON-LD so data can't close the script tag", () => {
    const head = pageHead({ description: "d", path: "/", jsonLd: { "@type": "Thing", name: "</script><b>" } });
    expect(head.scripts[0].children).not.toContain("</script>");
    expect(JSON.parse(head.scripts[0].children).name).toBe("</script><b>");
  });
});
