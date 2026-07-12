import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Bell, MessageCircle, ArrowUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/notifications")({
  component: NotificationsPage,
  head: () => ({ meta: [{ title: "Notifications — CivicNet" }, { name: "robots", content: "noindex" }] }),
});

const ITEMS = [
  { icon: BadgeCheck, tone: "text-primary", who: "Hon. A. Okeke", what: "replied to your post about the Umudim borehole.", when: "2h" },
  { icon: ArrowUp, tone: "text-primary", who: "412 citizens", what: "upvoted your post in Nnewi North.", when: "6h" },
  { icon: MessageCircle, tone: "text-foreground", who: "Dr. K. Nwafor", what: "mentioned you in a reply about the Awka hospital.", when: "1d" },
];

function NotificationsPage() {
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-hairline/60 bg-background/85 px-6 py-4 backdrop-blur">
        <h1 className="font-display text-2xl leading-none tracking-tight">Notifications</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground/50">
          Replies, upvotes, mentions
        </p>
      </header>
      <ul>
        {ITEMS.map((it, i) => {
          const Icon = it.icon;
          return (
            <li key={i} className="flex items-start gap-3 border-b border-hairline/50 px-6 py-4 hover:bg-muted/25">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted ${it.tone}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="flex-1 text-sm text-foreground">
                <span className="font-semibold">{it.who}</span>{" "}
                <span className="text-foreground/75">{it.what}</span>
              </p>
              <span className="text-xs text-foreground/50">{it.when}</span>
            </li>
          );
        })}
      </ul>
      <div className="px-6 py-16 text-center text-sm text-foreground/60">
        <Bell className="mx-auto mb-3 h-6 w-6 text-foreground/30" />
        You're all caught up.
      </div>
    </div>
  );
}
