import { Link, createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { Panel } from "@/components/ui";
import { privateHead } from "@/lib/seo";

export const Route = createFileRoute("/community")({
  head: () => privateHead("Field feed", "/community"),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-frost">Community</p>
        <h1 className="mt-1 font-display text-2xl text-fg">Field feed</h1>
      </header>
      <Panel className="flex flex-col items-start gap-3 p-5">
        <MessageSquare className="size-6 text-frost" aria-hidden="true" />
        <p className="font-display text-lg text-fg">No posts yet.</p>
        <p className="text-sm leading-relaxed text-muted">
          The feed opens when collectors can sign in and share finds. Your GeoDex stays private on this device until
          you choose to share.
        </p>
        <Link
          to="/identify"
          className="inline-flex min-h-12 items-center rounded-md bg-gold px-4 text-sm font-medium text-void focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frost"
        >
          Scan a specimen
        </Link>
      </Panel>
    </div>
  );
}
