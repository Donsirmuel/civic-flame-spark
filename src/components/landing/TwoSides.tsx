import { ArrowUpRight } from "lucide-react";

export function TwoSides() {
  return (
    <section className="border-y border-hairline">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-2">
        <div className="border-b border-hairline p-10 md:border-b-0 md:border-r md:p-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
            For Citizens
          </p>
          <h3 className="font-display mt-4 text-3xl leading-tight tracking-tight md:text-4xl">
            Say it once. Put it where it can't be ignored.
          </h3>
          <a
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Sign up <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="bg-primary p-10 text-primary-foreground md:p-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            For Officials
          </p>
          <h3 className="font-display mt-4 text-3xl leading-tight tracking-tight md:text-4xl">
            Meet the people you serve — not just at election time.
          </h3>
          <a
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Sign up as an official <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
