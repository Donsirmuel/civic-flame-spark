import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Composer } from "@/components/app/Composer";
import { CaseFileCard, type CasePost } from "@/components/app/CaseFileCard";

const TABS = ["For you", "Verified", "My region", "Trending"] as const;
type Tab = (typeof TABS)[number];

export const Route = createFileRoute("/_authenticated/timeline")({
  component: TimelinePage,
  head: () => ({
    meta: [
      { title: "Home — CivicNet" },
      { name: "description", content: "The civic case docket. Real grievances. Real replies." },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-sm text-foreground/70">
      Couldn't load the feed: {error.message}
    </div>
  ),
});

function TimelinePage() {
  const [tab, setTab] = useState<Tab>("For you");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<CasePost[]> => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CasePost[];
    },
  });

  const filtered = (posts ?? []).filter((p) => {
    if (tab === "Verified") return !!p.official_reply;
    if (tab === "Trending") return p.upvote_count >= 500;
    return true;
  });

  return (
    <div>
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-hairline/60 bg-background/85 backdrop-blur">
        <div className="flex items-baseline justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-2xl leading-none tracking-tight">The Docket</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground/50">
              Open cases · public record
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live
          </span>
        </div>
        <nav className="flex" role="tablist" aria-label="Docket filter">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t)}
                className={`relative flex-1 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/60 ${
                  active ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {t}
                {active && (
                  <span className="absolute inset-x-6 -bottom-px h-[3px] rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>
      </header>

      <Composer />

      <section className="px-4 py-4 sm:px-6">
        {isLoading ? (
          <ul className="space-y-4">
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className="h-48 animate-pulse rounded-2xl border border-hairline/60 bg-muted/40"
              />
            ))}
          </ul>
        ) : filtered.length ? (
          <ul className="space-y-4">
            {filtered.map((p, i) => (
              <CaseFileCard key={p.id} post={p} index={i} />
            ))}
          </ul>
        ) : (
          <p className="px-6 py-16 text-center text-sm text-foreground/60">
            Nothing here yet in <span className="font-medium">{tab}</span>.
          </p>
        )}
      </section>
    </div>
  );
}
