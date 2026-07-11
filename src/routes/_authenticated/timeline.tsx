import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUp, BadgeCheck, LogOut } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

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
};

export const Route = createFileRoute("/_authenticated/timeline")({
  component: TimelinePage,
  head: () => ({
    meta: [
      { title: "Timeline — CivicNet" },
      { name: "description", content: "The civic feed. Real grievances. Real replies." },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-sm text-foreground/70">Couldn't load the feed: {error.message}</div>
  ),
});

function TimelinePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = Route.useRouteContext();

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

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  const displayName =
    (user.user_metadata?.display_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "friend";

  return (
    <main className="min-h-screen bg-background">
      {/* Masthead */}
      <header className="border-b border-hairline/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[900px] items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="font-display text-2xl leading-none">
            Civic<span className="italic text-primary">Net</span>
            <span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs uppercase tracking-[0.2em] text-foreground/60 sm:inline">
              Signed in as <span className="text-foreground">{displayName}</span>
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Section head */}
      <section className="mx-auto max-w-[900px] px-6 pt-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">
          <span className="mr-2 text-accent">✦</span> The Civic Feed
        </p>
        <h1 className="font-display mt-4 text-5xl leading-[0.98] tracking-[-0.02em] sm:text-6xl">
          What the country is <span className="italic">saying</span>
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-foreground/70">
          Grievances and opinions from citizens across the country — and, where it happens,
          the response from the officials on the record.
        </p>
        <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-foreground/60">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Live · updates as posts arrive
        </div>
      </section>

      {/* Feed */}
      <section className="mx-auto max-w-[900px] px-6 py-10">
        {isLoading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl border border-hairline/60 bg-muted/40" />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <ul className="space-y-6">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </ul>
        ) : (
          <p className="py-16 text-center text-sm text-foreground/60">No posts yet.</p>
        )}
      </section>
    </main>
  );
}

function PostCard({ post }: { post: Post }) {
  const status = statusMeta(post.status);
  return (
    <li className="group rounded-2xl border border-hairline/70 bg-background p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(15,81,50,0.25)]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
          {post.author_initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
            <span className="font-semibold text-foreground">{post.author_name}</span>
            <span className="text-foreground/50">·</span>
            <span className="text-foreground/70">{post.region}</span>
            <span className="text-foreground/50">·</span>
            <span className="rounded-full border border-hairline px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/70">
              {post.scope}
            </span>
            <span className="ml-auto text-xs text-foreground/50">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground">{post.body}</p>

          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-muted/50 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <ArrowUp className="h-3.5 w-3.5 text-primary" />
              {post.upvote_count.toLocaleString()}
            </button>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          {post.official_reply && (
            <div className="mt-5 rounded-xl border border-primary/25 bg-primary/[0.04] p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                  <BadgeCheck className="h-3 w-3" /> Verified Official
                </span>
                <span className="text-xs font-semibold text-foreground">
                  {post.official_reply_by}
                </span>
                <span className="text-xs text-foreground/60">· {post.official_reply_title}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                {post.official_reply}
              </p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function statusMeta(status: string): { label: string; className: string } {
  switch (status) {
    case "resolved":
      return { label: "Resolved", className: "bg-primary/15 text-primary" };
    case "in_progress":
      return { label: "In progress", className: "bg-accent/25 text-foreground" };
    case "escalated":
      return { label: "Escalated", className: "bg-accent/25 text-foreground" };
    default:
      return { label: "Open", className: "bg-muted text-foreground/70" };
  }
}
