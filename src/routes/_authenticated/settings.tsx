import { createFileRoute } from "@tanstack/react-router";
import { Bell, Globe, Lock, Palette, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — CivicNet" }, { name: "robots", content: "noindex" }] }),
});

const SECTIONS = [
  { icon: Bell, title: "Notifications", desc: "Email digests, official reply alerts, and mention pings." },
  { icon: Lock, title: "Privacy & safety", desc: "Who can DM you, tagged post visibility, blocked officials." },
  { icon: Globe, title: "Region & language", desc: "Set your LGA and state to personalise the feed." },
  { icon: Palette, title: "Display", desc: "Density, motion, and theme preferences." },
];

function SettingsPage() {
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-hairline/60 bg-background/85 px-6 py-4 backdrop-blur">
        <h1 className="font-display text-2xl leading-none tracking-tight">Settings</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground/50">
          Preferences & account
        </p>
      </header>

      <ul>
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <li
              key={s.title}
              className="flex items-start gap-4 border-b border-hairline/50 px-6 py-5 transition-colors hover:bg-muted/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-5 w-5 text-foreground/70" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="mt-0.5 text-sm text-foreground/60">{s.desc}</p>
              </div>
              <span className="text-xs text-foreground/40">Coming soon</span>
            </li>
          );
        })}
        <li className="flex items-start gap-4 px-6 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-destructive">Delete account</p>
            <p className="mt-0.5 text-sm text-foreground/60">
              Permanently remove your CivicNet account and posts.
            </p>
          </div>
          <button className="rounded-full border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10">
            Request
          </button>
        </li>
      </ul>
    </div>
  );
}
