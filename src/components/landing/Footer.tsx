export function Footer() {
  return (
    <footer className="border-t border-hairline bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-hairline/60 pb-6">
          <p className="font-display text-2xl">
            Civic<span className="italic text-primary">Net</span>
            <span className="text-accent">.</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            A civic network · Est. 2026
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-foreground/80">
              <li><a href="#chapters" className="hover:text-primary">Manifesto</a></li>
              <li><a href="#chapters" className="hover:text-primary">How it works</a></li>
              <li><a href="#join" className="hover:text-primary">Sign up</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              For Officials
            </p>
            <ul className="mt-3 space-y-2 text-foreground/80">
              <li><a href="#join" className="hover:text-primary">Request verification</a></li>
              <li><a href="#chapters" className="hover:text-primary">Accountability</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              About
            </p>
            <ul className="mt-3 space-y-2 text-foreground/80">
              <li>
                <a
                  href="https://github.com/Donsirmuel/CivicNet"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary"
                >
                  GitHub
                </a>
              </li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-foreground/80">
              <li><a href="#" className="hover:text-primary">Privacy</a></li>
              <li><a href="#" className="hover:text-primary">Terms</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-hairline/60 pt-6 text-xs text-muted-foreground">
          Set in <span className="font-display italic">DM Serif Display</span> &amp; Plus Jakarta
          Sans. A final-year project by{" "}
          <a
            href="https://github.com/Donsirmuel"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-primary"
          >
            Samuel Olaonipekun
          </a>
          . © 2026 CivicNet.
        </p>
      </div>
    </footer>
  );
}
