import { Link, createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { CrystalGem } from "@/components/crystal-gem";
import { MINERALS } from "@/data/minerals";
import { useField } from "@/lib/store";
import { cn, formatRelative } from "@/lib/utils";

export const Route = createFileRoute("/community")({ component: CommunityPage });

function CommunityPage() {
  const posts = useField((s) => s.posts);
  const toggle = useField((s) => s.toggleLike);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[10px] uppercase tracking-[0.18em] text-amethyst">Community</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Field feed</h1>
        <p className="mt-1 text-sm text-muted">Finds from collectors on the circuit. Local likes stay on this device.</p>
      </header>
      <ul className="space-y-3">
        {posts.map((p) => {
          const m = MINERALS.find((x) => x.id === p.mineralId);
          return (
            <li key={p.id} className="rh-panel rounded-xl p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-fg">{p.author}</p>
                <p className="text-[11px] text-faint">{formatRelative(p.at)}</p>
              </div>
              <div className="mt-3 flex items-start gap-3">
                <CrystalGem hue={p.hue} system={m?.crystalSystem} size={52} />
                <div className="min-w-0">
                  <p className="font-display text-fg">{p.mineral}</p>
                  <p className="text-xs text-muted">{p.location}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.caption}</p>
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  className={cn("inline-flex min-h-11 items-center gap-2 text-sm", p.liked ? "text-gold" : "text-muted")}
                >
                  <Heart className={cn("size-4", p.liked && "fill-gold")} />
                  <span className="tabular-nums">{p.likes}</span>
                </button>
                {p.mineralId && (
                  <Link to="/pedia/$id" params={{ id: p.mineralId }} className="text-xs text-cyan">
                    Species
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
