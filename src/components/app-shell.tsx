import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Compass,
  Gem,
  Home,
  Map,
  Menu,
  MessageSquare,
  Shield,
  ShoppingBag,
  Sparkles,
  Target,
  User,
  WifiOff,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { CinematicOpener } from "@/components/cinematic-opener";
import { Onboarding } from "@/components/onboarding";
import { FloatingCloverOrb } from "@/components/orb/floating-orb";
import { cn } from "@/lib/utils";
import { useField } from "@/lib/store";
import { xpToNext } from "@/lib/xp";

const TABS = [
  { to: "/explore", label: "Map", icon: Map },
  { to: "/vault", label: "GeoDex", icon: Gem },
  { to: "/identify", label: "Scan", icon: Sparkles, center: true },
  { to: "/community", label: "Feed", icon: MessageSquare },
  { to: "/market", label: "Market", icon: ShoppingBag },
] as const;

const MENU = [
  { to: "/", label: "Command hub", icon: Home },
  { to: "/pedia", label: "Mineralpedia", icon: BookOpen },
  { to: "/quests", label: "Daily quests", icon: Target },
  { to: "/trips", label: "Trip planner", icon: Compass },
  { to: "/safety", label: "Safety & land", icon: Shield },
  { to: "/clover", label: "Clover AGI", icon: Sparkles },
  { to: "/profile", label: "Progress", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const onboarded = useField((s) => s.onboarded);
  const openerSeen = useField((s) => s.openerSeen);
  const fieldMode = useField((s) => s.fieldMode);
  const setFieldMode = useField((s) => s.setFieldMode);

  useEffect(() => {
    useField.getState().hydrateDay();
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  return (
    <div data-mode={fieldMode ? "field" : "home"} className="min-h-dvh bg-void text-fg">
      <div className="rh-grain min-h-dvh">
        {!onboarded && <Onboarding />}
        {onboarded && !openerSeen && <CinematicOpener />}
        <header className="sticky top-0 z-30 border-b border-line bg-void/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((v) => !v)}
              className="grid size-11 place-items-center rounded-md text-muted hover:bg-fg/5 hover:text-fg"
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <Link to="/" className="flex min-w-0 flex-1 items-baseline gap-2">
              <span className="font-display text-[17px] font-semibold tracking-tight text-fg">RockHound</span>
              <span className="font-display text-[17px] font-semibold text-amethyst">GO</span>
            </Link>
            <button
              type="button"
              onClick={() => setFieldMode(!fieldMode)}
              className={cn(
                "h-8 rounded-full border px-3 text-[10px] font-medium uppercase tracking-[0.14em]",
                fieldMode
                  ? "border-field/40 bg-field/15 text-field"
                  : "border-line text-muted hover:text-fg",
              )}
            >
              {fieldMode ? "Field" : "Hub"}
            </button>
            <Link
              to="/clover"
              aria-label="Clover"
              className="grid size-11 place-items-center rounded-md text-cyan hover:bg-cyan/10"
            >
              <Sparkles className="size-5" />
            </Link>
          </div>
        </header>

        {menu && (
          <div className="fixed inset-0 z-40 bg-void/70" onClick={() => setMenu(false)}>
            <nav
              className="absolute left-0 top-14 w-[min(100%,20rem)] border-r border-line bg-obsidian p-3 pb-8 shadow-panel"
              onClick={(e) => e.stopPropagation()}
            >
              {MENU.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex min-h-12 items-center gap-3 rounded-md px-3 text-sm",
                      active ? "bg-fg/10 text-fg" : "text-muted hover:bg-fg/5 hover:text-fg",
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
              <p className="mt-4 flex items-center gap-2 px-3 text-[10px] uppercase tracking-[0.14em] text-faint">
                <WifiOff className="size-3" /> Local cache · no account
              </p>
            </nav>
          </div>
        )}

        <main className="mx-auto w-full max-w-lg overflow-x-clip px-4 pb-28 pt-5">{children}</main>
        <FloatingCloverOrb />

        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-void/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
          <div className="mx-auto flex max-w-lg items-end px-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = pathname === tab.to || pathname.startsWith(`${tab.to}/`);
              if ("center" in tab && tab.center) {
                return (
                  <Link
                    key={tab.to}
                    to={tab.to}
                    aria-label="Scan specimen"
                    className="-mt-5 flex flex-1 flex-col items-center gap-1 pb-2"
                  >
                    <span
                      className={cn(
                        "grid size-14 place-items-center rounded-full border border-gold/50 bg-gold text-void shadow-[0_8px_24px_rgb(212_175_55_/_0.28)]",
                        active && "ring-2 ring-gold/40",
                      )}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold">Scan</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className="flex min-h-[64px] flex-1 flex-col items-center justify-center gap-1"
                >
                  <Icon className={cn("size-[18px]", active ? "text-fg" : "text-faint")} />
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-[0.12em]",
                      active ? "text-fg" : "text-faint",
                    )}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export function XpRibbon() {
  const xp = useField((s) => s.xp);
  const streak = useField((s) => s.streak);
  const collector = useField((s) => s.collectorXp);
  const steward = useField((s) => s.stewardXp);
  const scientist = useField((s) => s.scientistXp);
  const explorer = useField((s) => s.explorerXp);
  const { level, pct, into, need } = xpToNext(xp);
  return (
    <div className="rh-panel rh-hairline rounded-xl px-4 py-3">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span className="font-display text-sm text-fg">Level {level}</span>
        <span className="tabular-nums">
          {into}/{need} XP · {streak}d streak
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-fg/10">
        <div className="h-full rounded-full bg-amethyst" style={{ width: `${Math.round(pct * 100)}%` }} />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1 text-center text-[9px] uppercase tracking-[0.12em] text-faint">
        <span>
          <span className="block tabular-nums text-fg">{collector ?? 0}</span>
          Collector
        </span>
        <span>
          <span className="block tabular-nums text-field">{steward ?? 0}</span>
          Steward
        </span>
        <span>
          <span className="block tabular-nums text-cyan">{scientist ?? 0}</span>
          Scientist
        </span>
        <span>
          <span className="block tabular-nums text-gold">{explorer ?? 0}</span>
          Explorer
        </span>
      </div>
    </div>
  );
}
