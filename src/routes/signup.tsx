import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useSession } from "@/hooks/use-session";

const schema = z.object({
  displayName: z.string().trim().min(2, "Name too short").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(200),
});

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Sign up — CivicNet" },
      { name: "description", content: "Create your CivicNet account and join the public square." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function SignupPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [form, setForm] = useState({ displayName: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/timeline", replace: true });
  }, [session, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/timeline`,
        data: { display_name: parsed.data.displayName },
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. Welcome to the square.");
    navigate({ to: "/timeline", replace: true });
  };

  const onGoogle = async () => {
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (res.error) toast.error("Google sign-in failed");
    else if (!res.redirected) navigate({ to: "/timeline", replace: true });
  };

  return <AuthShell mode="signup" form={form} setForm={setForm} submitting={submitting} onSubmit={onSubmit} onGoogle={onGoogle} />;
}

function AuthShell({
  mode,
  form,
  setForm,
  submitting,
  onSubmit,
  onGoogle,
}: {
  mode: "signup" | "login";
  form: { displayName?: string; email: string; password: string };
  setForm: (f: any) => void;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onGoogle: () => void;
}) {
  const isSignup = mode === "signup";
  return (
    <main className="relative min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        {/* Left: editorial column */}
        <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-hairline/60 bg-muted/40 p-10 lg:flex">
          <Link to="/" className="font-display text-2xl leading-none">
            Civic<span className="italic text-primary">Net</span>
            <span className="text-accent">.</span>
          </Link>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">
              <span className="mr-2 text-accent">✦</span> Issue 001 · The square
            </p>
            <h2 className="font-display mt-6 text-5xl leading-[0.98] tracking-[-0.02em] text-foreground">
              Speak up. <span className="italic">Be heard.</span>
              <br />
              Be <span className="hand-underline italic text-primary">answered</span>
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/70">
              CivicNet is a civic network for developing democracies. Post what's wrong.
              Get a real reply from a verified official.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Verified officials <span className="mx-2 text-accent">·</span> Public accountability
            <span className="mx-2 text-accent">·</span> Free forever
          </p>
        </aside>

        {/* Right: form */}
        <section className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <Link to="/" className="font-display text-2xl leading-none lg:hidden">
              Civic<span className="italic text-primary">Net</span>
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              {isSignup ? "Join the square" : "Welcome back"}
            </p>
            <h1 className="font-display mt-3 text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              {isSignup ? (
                <>
                  Create your <span className="italic">account</span>
                  <span className="text-accent">.</span>
                </>
              ) : (
                <>
                  Log <span className="italic">in</span>
                  <span className="text-accent">.</span>
                </>
              )}
            </h1>

            <button
              onClick={onGoogle}
              type="button"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-foreground/20 bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-hairline" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                or with email
              </span>
              <div className="h-px flex-1 bg-hairline" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {isSignup && (
                <Field
                  label="Display name"
                  type="text"
                  value={form.displayName || ""}
                  onChange={(v) => setForm({ ...form, displayName: v })}
                  placeholder="Chidi Okeke"
                  autoComplete="name"
                />
              )}
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="you@email.com"
                autoComplete="email"
              />
              <Field
                label="Password"
                type="password"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
                placeholder="At least 6 characters"
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
              <button
                type="submit"
                disabled={submitting}
                className="cta-base cta-primary mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_rgba(15,81,50,0.6)] disabled:opacity-60"
              >
                <span className="relative z-[2]">
                  {submitting ? "One moment…" : isSignup ? "Create account" : "Log in"}
                </span>
              </button>
            </form>

            <p className="mt-8 text-sm text-foreground/70">
              {isSignup ? (
                <>
                  Already a member?{" "}
                  <Link to="/login" className="font-semibold text-primary hover:underline">
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  New here?{" "}
                  <Link to="/signup" className="font-semibold text-primary hover:underline">
                    Create an account
                  </Link>
                </>
              )}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.71v2.26h2.92c1.71-1.57 2.68-3.9 2.68-6.61z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 009 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.71a5.41 5.41 0 010-3.42V4.96H.96a9 9 0 000 8.08l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

export { AuthShell };
