import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUp,
  BadgeCheck,
  Bookmark,
  Landmark,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Composer } from "@/components/app/Composer";

type Post = {
  id: string;
  author_name: string;
  author_initials: string;
  region: string;
  scope: string;
  body: string;
  upvote_count: number;
  official_reply: string | null;
  official_reply_by: string | null;
  official_reply_title: string | null;
  status: string;
  created_at: string;
  image_url?: string | null;
  poll?: { question: string; options: { text: string; votes: number }[] } | null;
};

const TABS = ["For you", "Verified", "My region", "Trending"] as const;
type Tab = (typeof TABS)[number];

export const Route = createFileRoute("/_authenticated/timeline")({
  component: TimelinePage,
  head: () => ({
    meta: [
      { title: "Home — CivicNet" },
      { name: "description", content: "The civic feed. Real grievances. Real replies." },
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
    queryFn: async (): Promise<Post[]> => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Post[];
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
            <h1 className="font-display text-2xl leading-none tracking-tight">Home</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground/50">
              The civic feed
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
        <nav className="flex" role="tablist" aria-label="Feed filter">
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

      {/* Composer */}
      <Composer />

      {/* Feed */}
      <section>
        {isLoading ? (
          <ul>
            {[0, 1, 2].map((i) => (
              <li key={i} className="border-b border-hairline/50 px-6 py-6">
                <div className="flex gap-3">
                  <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-muted" />
                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-40 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-full animate-pulse rounded bg-muted" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : filtered.length ? (
          <ul>
            {filtered.map((p) => (
              <PostRow key={p.id} post={p} />
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

function PostRow({ post }: { post: Post }) {
  const status = statusMeta(post.status);
  return (
    <li className="group border-b border-hairline/50 px-6 py-5 transition-colors hover:bg-muted/25">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/25 text-sm font-semibold text-foreground">
          {post.author_initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-semibold text-foreground">{post.author_name}</span>
            <span className="text-foreground/50">·</span>
            <span className="inline-flex items-center gap-1 text-foreground/70">
              <MapPin className="h-3 w-3" />
              {post.region}
            </span>
            <span
              className={`ml-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${scopeChip(
                post.scope,
              )}`}
            >
              <Landmark className="h-2.5 w-2.5" />
              {post.scope}
            </span>
            <span className="ml-auto text-xs text-foreground/50">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
            <button
              className="text-foreground/40 transition-colors hover:text-foreground"
              aria-label="More"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-2 text-[15px] leading-relaxed text-foreground">{post.body}</p>

          {post.official_reply && (
            <div className="mt-3 rounded-xl border border-primary/25 bg-primary/[0.045] p-3.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </span>
                <span className="text-xs font-semibold text-foreground">
                  {post.official_reply_by}
                </span>
                <span className="text-xs text-foreground/60">
                  · {post.official_reply_title}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                {post.official_reply}
              </p>
            </div>
          )}

          <div className="mt-3 flex items-center gap-1 text-foreground/55">
            <ActionButton
              icon={<ArrowUp className="h-4 w-4" />}
              label={post.upvote_count.toLocaleString()}
              hoverClass="hover:text-primary hover:bg-primary/10"
            />
            <ActionButton
              icon={<Repeat2 className="h-4 w-4" />}
              label={String(Math.max(1, Math.round(post.upvote_count / 24)))}
              hoverClass="hover:text-foreground hover:bg-muted"
            />
            <ActionButton
              icon={<Bookmark className="h-4 w-4" />}
              hoverClass="hover:text-accent-foreground hover:bg-accent/25"
            />
            <ActionButton
              icon={<Share2 className="h-4 w-4" />}
              hoverClass="hover:text-foreground hover:bg-muted"
            />
            <span
              className={`ml-auto rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${status.className}`}
            >
              {status.label}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

function ActionButton({
  icon,
  label,
  hoverClass,
}: {
  icon: React.ReactNode;
  label?: string;
  hoverClass: string;
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors ${hoverClass}`}
    >
      {icon}
      {label ? <span>{label}</span> : null}
    </button>
  );
}

function scopeChip(scope: string): string {
  switch (scope) {
    case "STATE":
      return "border-accent/60 bg-accent/15 text-foreground";
    case "FEDERAL":
      return "border-primary/40 bg-primary/10 text-primary";
    default:
      return "border-hairline bg-background text-foreground/70";
  }
}

function statusMeta(status: string): { label: string; className: string } {
  switch (status) {
    case "resolved":
      return { label: "Resolved", className: "bg-primary/15 text-primary" };
    case "in_progress":
      return { label: "In progress", className: "bg-accent/30 text-foreground" };
    case "escalated":
      return { label: "Escalated", className: "bg-destructive/15 text-destructive" };
    default:
      return { label: "Open", className: "bg-muted text-foreground/70" };
  }
}
