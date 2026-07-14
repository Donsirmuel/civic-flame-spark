import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Home,
  LogOut,
  MessageSquare,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRound,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { useTheme } from "@/hooks/use-theme";

type NavItem = {
  to: "/timeline" | "/notifications" | "/messages" | "/profile" | "/settings";
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number;
};

const NAV: NavItem[] = [
  { to: "/timeline", label: "Home", icon: Home },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { session } = useSession();
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const email = session?.user.email ?? "";
  const displayName =
    (session?.user.user_metadata?.display_name as string | undefined) ||
    email.split("@")[0] ||
    "you";
  const handle = "@" + (email.split("@")[0] || "citizen").toLowerCase();
  const initials = displayName.slice(0, 2).toUpperCase();

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        {/* ─── Left sidebar ─── */}
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-hairline/60 px-4 py-6 lg:flex">
          <Link to="/timeline" className="mb-8 px-2 font-display text-2xl leading-none">
            Civic<span className="italic text-primary">Net</span>
            <span className="text-accent">.</span>
          </Link>

          <nav className="flex flex-1 flex-col gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.to || (item.to !== "/timeline" && pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group relative flex items-center gap-3 rounded-full px-4 py-3 text-[15px] font-medium transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span
                      className={`ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                        active
                          ? "bg-accent text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Account chip */}
          <div className="mt-4 flex items-center gap-3 rounded-full border border-hairline/70 bg-card px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {initials}
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold">{displayName}</p>
              <p className="truncate text-xs text-foreground/60">{handle}</p>
            </div>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={signOut}
              aria-label="Sign out"
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>

        {/* ─── Main column ─── */}
        <main className="min-h-screen border-x border-hairline/60">{children}</main>

        {/* ─── Right rail ─── */}
        <aside className="sticky top-0 hidden h-screen flex-col gap-5 px-5 py-6 xl:flex">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
            <input
              type="search"
              placeholder="Search regions, officials…"
              className="w-full rounded-full border border-hairline bg-card py-2.5 pl-11 pr-4 text-sm placeholder:text-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <RailCard
            title="Trending regions"
            icon={<Sparkles className="h-3.5 w-3.5 text-accent" />}
            items={[
              { top: "#WaterForUmudim", sub: "Nnewi North · 3,412 posts" },
              { top: "#KadunaZariaRoad", sub: "Federal · 1,829 posts" },
              { top: "#AwkaHospital", sub: "Anambra · 942 posts" },
              { top: "#LawmaLagos", sub: "Ikorodu · 610 posts" },
            ]}
          />

          <RailCard
            title="Verified officials"
            icon={<ShieldCheck className="h-3.5 w-3.5 text-primary" />}
            items={[
              { top: "Hon. A. Okeke", sub: "LGA Chairman · Nnewi North" },
              { top: "Dr. K. Nwafor", sub: "State Commissioner · Health" },
              { top: "Mrs. B. Adeyemi", sub: "LAWMA Zonal Officer" },
            ]}
            action="Follow"
          />

          <p className="px-2 text-[10px] leading-relaxed text-foreground/50">
            CivicNet · A record of what citizens said, and what officials did about it.
          </p>
        </aside>
      </div>

      {/* ─── Mobile bottom nav ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-hairline/70 bg-background/95 px-2 py-2 backdrop-blur lg:hidden">
        {NAV.map((item) => {
          const active =
            pathname === item.to || (item.to !== "/timeline" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors ${
                active ? "text-primary" : "text-foreground/60"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.badge ? (
                <span className="absolute right-2 top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="h-16 lg:hidden" aria-hidden />
    </div>
  );
}

function RailCard({
  title,
  icon,
  items,
  action,
}: {
  title: string;
  icon: ReactNode;
  items: { top: string; sub: string }[];
  action?: string;
}) {
  return (
    <section className="rounded-2xl border border-hairline/70 bg-card">
      <header className="flex items-center gap-2 border-b border-hairline/60 px-4 py-3">
        {icon}
        <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
          {title}
        </h3>
      </header>
      <ul>
        {items.map((it) => (
          <li
            key={it.top}
            className="flex items-center gap-3 border-b border-hairline/40 px-4 py-3 last:border-b-0 hover:bg-muted/50"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{it.top}</p>
              <p className="truncate text-xs text-foreground/60">{it.sub}</p>
            </div>
            {action ? (
              <button className="rounded-full border border-foreground/20 px-3 py-1 text-[11px] font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background">
                {action}
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
