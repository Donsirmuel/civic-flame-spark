export function ClosingBand() {
  return (
    <section id="join" className="relative bg-accent">
      <div className="mx-auto max-w-[1400px] px-6 py-24 text-center md:px-10 md:py-32">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-foreground/70">
          Front page · Final edition
        </p>
        <h2 className="font-display mt-6 text-5xl italic leading-[0.95] tracking-[-0.02em] text-foreground sm:text-6xl md:text-8xl">
          The square is open.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base text-foreground/75">
          Bring your grievance. Bring your idea. Bring your ward. The people who represent you are
          expected to be here too.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#top"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-[0_15px_40px_-12px_rgba(15,81,50,0.5)] transition-all hover:brightness-110"
          >
            Sign Up
          </a>
          <a
            href="#top"
            className="inline-flex items-center justify-center rounded-full border border-foreground/25 px-7 py-4 text-sm font-semibold text-foreground transition-all hover:border-foreground/50"
          >
            I'm a Government Official
          </a>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.22em] text-foreground/60">
          No cost <span className="mx-2">·</span> No noise <span className="mx-2">·</span> Just voices
        </p>
      </div>
    </section>
  );
}
