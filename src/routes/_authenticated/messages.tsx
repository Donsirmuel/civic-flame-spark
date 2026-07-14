import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Paperclip, Search, Send, Smile } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/messages")({
  component: MessagesPage,
  head: () => ({
    meta: [{ title: "Messages — CivicNet" }, { name: "robots", content: "noindex" }],
  }),
});

type Thread = {
  id: string;
  name: string;
  role: string;
  last: string;
  when: string;
  unread: number;
  verified: boolean;
  online?: boolean;
  messages: { from: "me" | "them"; text: string; when: string }[];
};

const THREADS: Thread[] = [
  {
    id: "okeke",
    name: "Hon. A. Okeke",
    role: "LGA Chairman · Nnewi North",
    last: "I'll share the photo update on Friday.",
    when: "2h",
    unread: 2,
    verified: true,
    online: true,
    messages: [
      { from: "them", text: "Received your post about the Umudim borehole.", when: "Mon 09:12" },
      { from: "me", text: "Thank you sir. The pump has been down for 11 days.", when: "Mon 09:15" },
      { from: "them", text: "Contractor mobilised. I'll share the photo update on Friday.", when: "2h" },
    ],
  },
  {
    id: "nwafor",
    name: "Dr. K. Nwafor",
    role: "State Commissioner · Health",
    last: "Ambulance allocation confirmed for Awka South.",
    when: "1d",
    unread: 1,
    verified: true,
    messages: [
      { from: "them", text: "Ambulance allocation confirmed for Awka South.", when: "1d" },
    ],
  },
  {
    id: "adeyemi",
    name: "Mrs. B. Adeyemi",
    role: "LAWMA Zonal Officer",
    last: "Truck rerouted, thanks for the tag.",
    when: "3d",
    unread: 0,
    verified: true,
    messages: [
      { from: "me", text: "The pickup on Ijoko Road missed again today.", when: "3d" },
      { from: "them", text: "Truck rerouted, thanks for the tag.", when: "3d" },
    ],
  },
  {
    id: "youth",
    name: "Youth Council, Awka South",
    role: "Community group · 214 members",
    last: "Meeting minutes attached.",
    when: "5d",
    unread: 0,
    verified: false,
    messages: [{ from: "them", text: "Meeting minutes attached.", when: "5d" }],
  },
];

function MessagesPage() {
  const [activeId, setActiveId] = useState<string | null>(THREADS[0]?.id ?? null);
  const [draft, setDraft] = useState("");
  const active = THREADS.find((t) => t.id === activeId) ?? null;
  const totalUnread = THREADS.reduce((n, t) => n + t.unread, 0);

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[340px_minmax(0,1fr)]">
      {/* Thread list */}
      <aside
        className={`border-r border-hairline/60 ${active ? "hidden md:block" : "block"}`}
      >
        <header className="sticky top-0 z-30 border-b border-hairline/60 bg-background/85 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl leading-none tracking-tight">Messages</h1>
              {totalUnread > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                  {totalUnread}
                </span>
              )}
            </div>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground/50">
            Direct lines to officials
          </p>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/50" />
            <input
              type="search"
              placeholder="Search conversations"
              className="w-full rounded-full border border-hairline bg-muted/40 py-2 pl-9 pr-3 text-sm placeholder:text-foreground/50 focus:border-primary/40 focus:outline-none"
            />
          </div>
        </header>

        <ul>
          {THREADS.map((t) => {
            const isActive = t.id === activeId;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setActiveId(t.id)}
                  className={`flex w-full gap-3 border-b border-hairline/40 px-5 py-4 text-left transition-colors ${
                    isActive ? "bg-muted/60" : "hover:bg-muted/30"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/40 text-xs font-semibold text-foreground">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    {t.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-semibold">{t.name}</p>
                      {t.verified && <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />}
                      <span className="ml-auto shrink-0 text-[11px] text-foreground/50">
                        {t.when}
                      </span>
                    </div>
                    <p className="truncate text-[11px] uppercase tracking-[0.14em] text-foreground/50">
                      {t.role}
                    </p>
                    <p
                      className={`mt-1 truncate text-sm ${
                        t.unread ? "font-medium text-foreground" : "text-foreground/65"
                      }`}
                    >
                      {t.last}
                    </p>
                  </div>
                  {t.unread > 0 && (
                    <span className="mt-1 inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                      {t.unread}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Conversation pane */}
      <section
        className={`flex min-h-screen flex-col ${active ? "flex" : "hidden md:flex"}`}
      >
        {active ? (
          <>
            <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-hairline/60 bg-background/85 px-4 py-3 backdrop-blur sm:px-6">
              <button
                onClick={() => setActiveId(null)}
                aria-label="Back"
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:bg-muted md:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/40 text-xs font-semibold text-foreground">
                {active.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold">{active.name}</p>
                  {active.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
                </div>
                <p className="truncate text-[11px] uppercase tracking-[0.14em] text-foreground/50">
                  {active.role}
                </p>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-6 sm:px-6">
              {active.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.from === "me"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-muted text-foreground"
                    }`}
                  >
                    <p>{m.text}</p>
                    <p
                      className={`mt-1 text-[10px] uppercase tracking-[0.14em] ${
                        m.from === "me" ? "text-primary-foreground/70" : "text-foreground/50"
                      }`}
                    >
                      {m.when}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 border-t border-hairline/60 bg-background/95 px-3 py-3 backdrop-blur sm:px-6">
              <div className="flex items-end gap-2 rounded-2xl border border-hairline bg-card px-3 py-2">
                <button
                  aria-label="Attach"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/60 hover:bg-muted hover:text-foreground"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <button
                  aria-label="Emoji"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/60 hover:bg-muted hover:text-foreground"
                >
                  <Smile className="h-4 w-4" />
                </button>
                <textarea
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={`Message ${active.name}…`}
                  className="flex-1 resize-none bg-transparent py-1.5 text-sm placeholder:text-foreground/45 focus:outline-none"
                />
                <button
                  disabled={!draft.trim()}
                  onClick={() => setDraft("")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-10 text-center">
            <p className="font-display text-xl">Select a conversation</p>
            <p className="max-w-sm text-sm text-foreground/60">
              Direct messages open once your account is verified as a citizen or official.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
