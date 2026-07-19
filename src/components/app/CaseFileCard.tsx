import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowUp,
  BadgeCheck,
  Bookmark,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share2,
} from "lucide-react";
import { EscalationLadder } from "./EscalationLadder";

export type CasePost = {
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

function statusMeta(status: string) {
  switch (status) {
    case "resolved":
      return {
        label: "Resolved",
        edge: "before:bg-primary",
        chip: "bg-primary/15 text-primary",
      };
    case "in_progress":
      return {
        label: "In progress",
        edge: "before:bg-accent",
        chip: "bg-accent/30 text-foreground",
      };
    case "escalated":
      return {
        label: "Escalated",
        edge: "before:bg-destructive",
        chip: "bg-destructive/15 text-destructive",
      };
    default:
      return {
        label: "Open",
        edge: "before:bg-foreground/40",
        chip: "bg-muted text-foreground/70",
      };
  }
}

function caseNumber(id: string, region: string) {
  // Derive a stable-ish label like "NN-0421" from region + id.
  const prefix = region
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase() || "CV";
  const tail = id.replace(/\D/g, "").slice(-4).padStart(4, "0") ||
    Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `${prefix}-${tail}`;
}

function categoryFromBody(body: string): string {
  const b = body.toLowerCase();
  if (/water|borehole|tap/.test(b)) return "Water";
  if (/light|power|electric|nepa|band|transformer/.test(b)) return "Power";
  if (/road|pothole|traffic|bus|brt/.test(b)) return "Transit";
  if (/school|teacher|class|subeb/.test(b)) return "Education";
  if (/hospital|clinic|health|drug|phc/.test(b)) return "Health";
  if (/waste|refuse|dump|gutter|drain/.test(b)) return "Sanitation";
  if (/security|robbery|kidnap|police/.test(b)) return "Security";
  return "General";
}

export function CaseFileCard({ post, index = 0 }: { post: CasePost; index?: number }) {
  const status = statusMeta(post.status);
  const caseNo = caseNumber(post.id, post.region);
  const category = categoryFromBody(post.body);

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className={`relative overflow-hidden rounded-2xl border border-hairline/70 bg-card shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] hover:bg-muted/25 ${status.edge}`}
    >
      {/* Ribbon header */}
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-hairline/50 bg-muted/25 px-5 py-2.5">
        <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-foreground/70">
          CASE #{caseNo}
        </span>
        <span className="h-3 w-px bg-hairline/70" />
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          {category}
        </span>
        <span className="h-3 w-px bg-hairline/70" />
        <span className="inline-flex items-center gap-1 text-[11px] text-foreground/70">
          <MapPin className="h-3 w-3" />
          {post.region} · {post.scope}
        </span>
        <span
          className={`ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${status.chip}`}
        >
          {status.label}
        </span>
      </header>

      {/* Filed by section */}
      <section className="px-5 pb-4 pt-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/45">
          Filed by
        </p>
        <div className="mt-2 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/25 text-xs font-semibold text-foreground">
            {post.author_initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1.5 text-sm">
              <span className="font-semibold text-foreground">{post.author_name}</span>
              <span className="text-foreground/50">· Citizen ·</span>
              <span className="text-foreground/60">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </span>
              <button
                className="ml-auto text-foreground/40 transition-colors hover:text-foreground"
                aria-label="More"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">
              {post.body}
            </p>

            {post.image_url && (
              <div className="mt-3 overflow-hidden rounded-xl border border-hairline/60">
                <img
                  src={post.image_url}
                  alt="attachment"
                  className="max-h-[420px] w-full object-cover"
                />
              </div>
            )}

            {post.poll && (
              <div className="mt-3 space-y-2 rounded-xl border border-hairline/60 bg-muted/30 p-3">
                {post.poll.options.map((o, i) => (
                  <button
                    key={i}
                    className="flex w-full items-center justify-between rounded-full border border-hairline bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <span>{o.text}</span>
                    <span className="text-xs text-foreground/50">{o.votes}</span>
                  </button>
                ))}
                <p className="pt-1 text-[10px] uppercase tracking-[0.14em] text-foreground/50">
                  Poll · tap to vote
                </p>
              </div>
            )}

            <div className="mt-3 flex items-center gap-4 text-xs text-foreground/65">
              <span className="inline-flex items-center gap-1 font-semibold text-primary">
                <ArrowUp className="h-3.5 w-3.5" /> {post.upvote_count.toLocaleString()} citizens
                signed on
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />{" "}
                {Math.max(0, Math.round(post.upvote_count / 40))} comments
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Escalation ladder */}
      <section className="border-t border-hairline/40 bg-muted/15 px-5 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/45">
            Escalation
          </p>
          <EscalationLadder scope={post.scope} status={post.status} />
        </div>
      </section>

      {/* Official response */}
      <section className="border-t border-hairline/50 px-5 py-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/45">
          Official response
        </p>
        {post.official_reply ? (
          <div className="mt-2 rounded-xl border border-primary/25 bg-primary/[0.045] p-3.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                <BadgeCheck className="h-3 w-3" /> Verified
              </span>
              <span className="text-sm font-semibold text-foreground">
                {post.official_reply_by}
              </span>
              <span className="text-xs text-foreground/60">· {post.official_reply_title}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
              {post.official_reply}
            </p>
          </div>
        ) : (
          <div className="mt-2 rounded-xl border border-dashed border-hairline/80 bg-background/40 p-3.5 text-sm italic text-foreground/60">
            Awaiting an official response. This case remains on the public record.
          </div>
        )}
      </section>

      {/* Actions */}
      <footer className="flex items-center gap-1 border-t border-hairline/50 px-3 py-2 text-foreground/55">
        <ActionBtn icon={<ArrowUp className="h-4 w-4" />} label="Sign on" />
        <ActionBtn icon={<MessageCircle className="h-4 w-4" />} label="Comment" />
        <ActionBtn icon={<Repeat2 className="h-4 w-4" />} label="Amplify" />
        <ActionBtn icon={<Bookmark className="h-4 w-4" />} label="Save" />
        <ActionBtn icon={<Share2 className="h-4 w-4" />} label="Share" />
      </footer>
    </motion.li>
  );
}

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-muted hover:text-foreground">
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
