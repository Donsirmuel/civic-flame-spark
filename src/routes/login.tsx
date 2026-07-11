import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useSession } from "@/hooks/use-session";
import { AuthShell } from "./signup";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(200),
});

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Log in — CivicNet" },
      { name: "description", content: "Log in to CivicNet." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/timeline", replace: true });
  }, [session, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Enter a valid email and password");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/timeline", replace: true });
  };

  const onGoogle = async () => {
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (res.error) toast.error("Google sign-in failed");
    else if (!res.redirected) navigate({ to: "/timeline", replace: true });
  };

  return (
    <AuthShell
      mode="login"
      form={form}
      setForm={setForm}
      submitting={submitting}
      onSubmit={onSubmit}
      onGoogle={onGoogle}
    />
  );
}
