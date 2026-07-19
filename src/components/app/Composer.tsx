import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  Image as ImageIcon,
  Landmark,
  MapPin,
  Smile,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/hooks/use-session";

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
  // client-only extras (rendered when present)
  image_url?: string | null;
  poll?: { question: string; options: { text: string; votes: number }[] } | null;
};

const SCOPES = ["LGA", "STATE", "FEDERAL"] as const;
const EMOJIS = ["🇳🇬", "✊", "📣", "🗳️", "💧", "⚡", "🏥", "🚧", "📚", "🔥", "👀", "🙏"];

const MAX = 280;

export function Composer() {
  const qc = useQueryClient();
  const { session } = useSession();
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const [body, setBody] = useState("");
  const [scope, setScope] = useState<(typeof SCOPES)[number]>("LGA");
  const [region, setRegion] = useState("Nnewi North");
  const [image, setImage] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [poll, setPoll] = useState<string[] | null>(null);

  const email = session?.user.email ?? "you@civicnet";
  const displayName =
    (session?.user.user_metadata?.display_name as string | undefined) ||
    email.split("@")[0] ||
    "You";
  const initials = displayName.slice(0, 2).toUpperCase();

  const insertEmoji = (e: string) => {
    setBody((b) => (b + " " + e).trimStart());
    setShowEmoji(false);
    areaRef.current?.focus();
  };

  const onFile = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) return toast.error("Only image files.");
    if (f.size > 4 * 1024 * 1024) return toast.error("Image must be under 4MB.");
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(f);
  };

  const addPoll = () => setPoll(poll ? null : ["", ""]);
  const updatePoll = (i: number, v: string) =>
    setPoll((p) => p?.map((x, idx) => (idx === i ? v : x)) ?? null);
  const addOption = () => setPoll((p) => (p && p.length < 4 ? [...p, ""] : p));
  const removeOption = (i: number) =>
    setPoll((p) => (p && p.length > 2 ? p.filter((_, idx) => idx !== i) : p));

  const reset = () => {
    setBody("");
    setImage(null);
    setPoll(null);
  };

  const submit = () => {
    const trimmed = body.trim();
    if (!trimmed) return toast.error("Say something first.");
    if (trimmed.length > MAX) return toast.error(`Keep it under ${MAX} characters.`);
    if (poll && poll.filter((o) => o.trim()).length < 2)
      return toast.error("Polls need at least 2 filled options.");

    const post: Post = {
      id: `local-${crypto.randomUUID()}`,
      author_name: displayName,
      author_initials: initials,
      region,
      scope,
      body: trimmed,
      upvote_count: 0,
      official_reply: null,
      official_reply_by: null,
      official_reply_title: null,
      status: "open",
      created_at: new Date().toISOString(),
      image_url: image,
      poll: poll
        ? {
            question: trimmed,
            options: poll
              .filter((o) => o.trim())
              .map((text) => ({ text, votes: 0 })),
          }
        : null,
    };

    qc.setQueryData<Post[]>(["posts"], (old) => [post, ...(old ?? [])]);
    reset();
    toast.success("Posted to your community.");
  };

  const remaining = MAX - body.length;
  const nearLimit = remaining <= 40;

  return (
    <div className="border-b border-hairline/60 bg-background px-4 py-4 sm:px-6">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-accent/40 text-sm font-semibold text-foreground">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <textarea
            ref={areaRef}
            value={body}
            onChange={(e) => setBody(e.target.value.slice(0, MAX + 40))}
            rows={2}
            placeholder="File a grievance — what needs a public reply?"
            className="w-full resize-none bg-transparent text-[16px] leading-relaxed text-foreground placeholder:text-foreground/45 focus:outline-none"
          />


          {/* Image preview */}
          {image && (
            <div className="relative mt-2 overflow-hidden rounded-2xl border border-hairline/60">
              <img src={image} alt="attachment preview" className="max-h-80 w-full object-cover" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 text-foreground shadow-sm hover:bg-background"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Poll editor */}
          {poll && (
            <div className="mt-3 rounded-2xl border border-hairline/70 bg-muted/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                  Poll
                </span>
                <button
                  type="button"
                  onClick={() => setPoll(null)}
                  className="text-xs text-foreground/60 hover:text-foreground"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-2">
                {poll.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={opt}
                      onChange={(e) => updatePoll(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="flex-1 rounded-full border border-hairline bg-background px-3 py-1.5 text-sm focus:border-primary/50 focus:outline-none"
                    />
                    {poll.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(i)}
                        className="text-foreground/50 hover:text-destructive"
                        aria-label="Remove option"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                {poll.length < 4 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    + Add option
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Scope + region row */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full border border-hairline bg-muted/40 p-0.5">
              {SCOPES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    scope === s
                      ? "bg-foreground text-background"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  <Landmark className="h-3 w-3" />
                  {s}
                </button>
              ))}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-background px-3 py-1 text-xs">
              <MapPin className="h-3 w-3 text-foreground/60" />
              <input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-28 bg-transparent focus:outline-none"
                placeholder="Region"
              />
            </div>
          </div>

          {/* Action bar */}
          <div className="mt-3 flex items-center justify-between border-t border-hairline/50 pt-3">
            <div className="relative flex items-center gap-1 text-foreground/60">
              <label className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-primary/10 hover:text-primary">
                <ImageIcon className="h-4.5 w-4.5" />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <button
                type="button"
                onClick={() => setShowEmoji((s) => !s)}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Add emoji"
              >
                <Smile className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={addPoll}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-primary/10 hover:text-primary ${
                  poll ? "bg-primary/10 text-primary" : ""
                }`}
                aria-label="Add poll"
              >
                <BarChart3 className="h-4.5 w-4.5" />
              </button>

              {showEmoji && (
                <div className="absolute left-0 top-10 z-40 grid grid-cols-6 gap-1 rounded-2xl border border-hairline bg-popover p-2 shadow-lg">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => insertEmoji(e)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-lg hover:bg-muted"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs tabular-nums ${
                  remaining < 0
                    ? "text-destructive"
                    : nearLimit
                      ? "text-accent-foreground"
                      : "text-foreground/50"
                }`}
              >
                {remaining}
              </span>
              <button
                type="button"
                onClick={submit}
                disabled={!body.trim() || remaining < 0}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                File case
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
