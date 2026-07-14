import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  AtSign,
  BadgeCheck,
  Bell,
  MessageCircle,
  Repeat2,
  UserPlus,
} from "lucide-react";
import type { ComponentType } from "react";

export const Route = createFileRoute("/_authenticated/notifications")({
  component: NotificationsPage,
  head: () => ({
    meta: [{ title: "Notifications — CivicNet" }, { name: "robots", content: "noindex" }],
  }),
});

type Item = {
  icon: ComponentType<{ className?: string }>;
  tone: string;
  who: string;
  meta?: string;
  what: string;
  quote?: string;
  when: string;
  unread?: boolean;
  verified?: boolean;
};

const TODAY: Item[] = [
  {
    icon: BadgeCheck,
    tone: "text-primary bg-primary/12",
    who: "Hon. A. Okeke",
    meta: "LGA Chairman · Nnewi North",
    what: "replied to your post about the Umudim borehole.",
    quote: "Contractor is on-site tomorrow. We'll share photos by Friday.",
    when: "2h",
    unread: true,
    verified: true,
  },
  {
    icon: ArrowUp,
    tone: "text-primary bg-primary/12",
    who: "412 citizens",
    what: "upvoted your post in Nnewi North.",
    when: "6h",
    unread: true,
  },
  {
    icon: AtSign,
    tone: "text-accent-foreground bg-accent/30",
    who: "@barrister_uche",
    what: "mentioned you in a reply about the Awka General Hospital thread.",
    when: "9h",
    unread: true,
  },
];

const EARLIER: Item[] = [
  {
    icon: MessageCircle,
    tone: "text-foreground bg-muted",
    who: "Dr. K. Nwafor",
    meta: "State Commissioner · Health",
    what: "commented on the ambulance allocation post.",
    when: "1d",
    verified: true,
  },
  {
    icon: Repeat2,
    tone: "text-foreground bg-muted",
    who: "Mrs. B. Adeyemi",
    what: "reshared your LAWMA complaint to the Ikorodu zonal feed.",
    when: "2d",
    verified: true,
  },
  {
    icon: UserPlus,
    tone: "text-foreground bg-muted",
    who: "Youth Council, Awka South",
    what: "started following you.",
    when: "3d",
  },
  {
    icon: ArrowUp,
    tone: "text-foreground bg-muted",
    who: "128 citizens",
    what: "upvoted your reply about the Zaria road repairs.",
    when: "4d",
  },
];

function NotificationsPage() {
  const unread = TODAY.filter((i) => i.unread).length;

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-hairline/60 bg-background/85 px-5 py-4 backdrop-blur sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl leading-none tracking-tight">Notifications</h1>
              {unread > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                  {unread}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground/50">
              Replies · upvotes · mentions
            </p>
          </div>
          <button className="rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-foreground/70 hover:bg-muted">
            Mark all read
          </button>
        </div>
      </header>

      <Section title="Today">
        {TODAY.map((it, i) => (
          <Row key={"t" + i} item={it} />
        ))}
      </Section>

      <Section title="Earlier">
        {EARLIER.map((it, i) => (
          <Row key={"e" + i} item={it} />
        ))}
      </Section>

      <div className="px-6 py-12 text-center text-sm text-foreground/60">
        <Bell className="mx-auto mb-2 h-5 w-5 text-foreground/30" />
        You're all caught up.
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="border-b border-hairline/40 bg-muted/30 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/60 sm:px-6">
        {title}
      </h2>
      <ul>{children}</ul>
    </section>
  );
}

function Row({ item }: { item: Item }) {
  const Icon = item.icon;
  return (
    <li
      className={`relative flex items-start gap-3 border-b border-hairline/40 px-5 py-4 transition-colors hover:bg-muted/30 sm:px-6 ${
        item.unread ? "bg-primary/[0.035]" : ""
      }`}
    >
      {item.unread && (
        <span
          aria-hidden
          className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary sm:left-2"
        />
      )}
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.tone}`}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-foreground">
          <span className="font-semibold">{item.who}</span>
          {item.verified && (
            <BadgeCheck className="ml-1 inline h-3.5 w-3.5 -translate-y-0.5 text-primary" />
          )}{" "}
          <span className="text-foreground/75">{item.what}</span>
        </p>
        {item.meta && (
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-foreground/50">
            {item.meta}
          </p>
        )}
        {item.quote && (
          <p className="mt-2 rounded-lg border-l-2 border-primary/40 bg-muted/40 px-3 py-2 text-sm text-foreground/80">
            "{item.quote}"
          </p>
        )}
      </div>
      <span className="shrink-0 text-xs text-foreground/50">{item.when}</span>
    </li>
  );
}
