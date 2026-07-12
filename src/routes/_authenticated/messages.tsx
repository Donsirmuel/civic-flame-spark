import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_authenticated/messages")({
  component: MessagesPage,
  head: () => ({ meta: [{ title: "Messages — CivicNet" }, { name: "robots", content: "noindex" }] }),
});

const THREADS = [
  { name: "Hon. A. Okeke", role: "LGA Chairman · Nnewi North", last: "I'll share the photo update on Friday.", when: "2h", unread: true },
  { name: "Dr. K. Nwafor", role: "State Commissioner · Health", last: "Ambulance allocation confirmed.", when: "1d", unread: false },
  { name: "Mrs. B. Adeyemi", role: "LAWMA Zonal Officer", last: "Truck rerouted, thanks for the tag.", when: "3d", unread: false },
];

function MessagesPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
      <div className="border-r border-hairline/60">
        <header className="sticky top-0 z-30 border-b border-hairline/60 bg-background/85 px-5 py-4 backdrop-blur">
          <h1 className="font-display text-2xl leading-none tracking-tight">Messages</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground/50">
            Direct lines to officials
          </p>
        </header>
        <ul>
          {THREADS.map((t) => (
            <li key={t.name} className="flex gap-3 border-b border-hairline/40 px-5 py-4 hover:bg-muted/40">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <span className="ml-auto shrink-0 text-[11px] text-foreground/50">{t.when}</span>
                </div>
                <p className="truncate text-[11px] uppercase tracking-[0.14em] text-foreground/50">{t.role}</p>
                <p className="mt-1 truncate text-sm text-foreground/70">{t.last}</p>
              </div>
              {t.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />}
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden flex-col items-center justify-center gap-2 p-10 text-center md:flex">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="h-6 w-6 text-foreground/50" />
        </div>
        <p className="font-display text-xl">Select a conversation</p>
        <p className="max-w-sm text-sm text-foreground/60">
          Direct messages open once your account is verified as a citizen or official.
        </p>
      </div>
    </div>
  );
}
