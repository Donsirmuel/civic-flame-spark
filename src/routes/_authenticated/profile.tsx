import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Calendar, MapPin } from "lucide-react";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Profile — CivicNet" }, { name: "robots", content: "noindex" }] }),
});

function ProfilePage() {
  const { session } = useSession();
  const email = session?.user.email ?? "";
  const name =
    (session?.user.user_metadata?.display_name as string | undefined) ||
    email.split("@")[0] ||
    "you";
  const handle = "@" + (email.split("@")[0] || "citizen").toLowerCase();
  const initials = name.slice(0, 2).toUpperCase();
  const joined = session?.user.created_at
    ? new Date(session.user.created_at).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "recently";

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-hairline/60 bg-background/85 px-6 py-4 backdrop-blur">
        <h1 className="font-display text-2xl leading-none tracking-tight">Profile</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground/50">
          Your civic identity
        </p>
      </header>

      {/* Cover */}
      <div className="relative h-40 border-b border-hairline/60 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10">
        <div className="absolute -bottom-10 left-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-primary text-xl font-bold text-primary-foreground shadow-md">
          {initials}
        </div>
      </div>

      <div className="px-6 pt-14 pb-6">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-3xl leading-none">{name}</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
            Citizen
          </span>
        </div>
        <p className="mt-1 text-sm text-foreground/60">{handle}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/70">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Region not set</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined {joined}</span>
        </div>

        <div className="mt-5 flex gap-6 text-sm">
          <span><span className="font-bold text-foreground">0</span> <span className="text-foreground/60">posts</span></span>
          <span><span className="font-bold text-foreground">12</span> <span className="text-foreground/60">upvotes cast</span></span>
          <span><span className="font-bold text-foreground">3</span> <span className="text-foreground/60">following officials</span></span>
        </div>

        <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/[0.05] p-4">
          <div className="flex items-center gap-2 text-primary">
            <BadgeCheck className="h-4 w-4" />
            <p className="text-[11px] font-bold uppercase tracking-[0.18em]">Get verified</p>
          </div>
          <p className="mt-1.5 text-sm text-foreground/80">
            Verified accounts get a badge, higher post priority, and a direct line to their LGA
            representative. Verification opens after email confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
