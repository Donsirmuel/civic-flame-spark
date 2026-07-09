export function Nav() {
  return (
    <header className="relative z-10 border-b border-hairline/60">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 md:px-10">
        <p className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground md:block">
          Issue 001 · Est. 2026 · Your Region
        </p>
        <a href="#top" className="font-display text-2xl leading-none tracking-tight md:text-[28px]">
          Civic<span className="italic text-primary">Net</span>
          <span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-2 md:gap-6">
          <a href="#chapters" className="hidden text-sm text-foreground/70 transition-colors hover:text-foreground md:inline">
            Manifesto
          </a>
          <a href="#chapters" className="hidden text-sm text-foreground/70 transition-colors hover:text-foreground md:inline">
            How it works
          </a>
          <a
            href="#join"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            Sign Up
          </a>
        </nav>
      </div>
    </header>
  );
}
