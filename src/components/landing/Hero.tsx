import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CivicFeedCard } from "./CivicFeedCard";

const rise = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:py-28">
        <div className="relative">
          <motion.p
            {...rise}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary"
          >
            <span className="mr-2 text-accent">✦</span>
            A civic network for developing democracies
          </motion.p>

          <h1 className="font-display mt-6 text-[56px] leading-[0.98] tracking-[-0.02em] text-foreground sm:text-[72px] md:text-[88px] lg:text-[104px]">
            <motion.span {...rise} transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }} className="block italic">
              Speak up.
            </motion.span>
            <motion.span {...rise} transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }} className="block">
              Be heard.
            </motion.span>
            <motion.span {...rise} transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }} className="block">
              Be{" "}
              <span className="hand-underline italic text-primary">answered</span>
              <span className="text-accent">.</span>
            </motion.span>
          </h1>

          <motion.p
            {...rise}
            transition={{ duration: 0.7, delay: 0.48, ease: "easeOut" }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-foreground/75"
          >
            CivicNet is where citizens and verified government officials meet — from your local ward
            to the federal level. Post what's wrong. Get a real reply.
          </motion.p>

          <motion.div
            {...rise}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="/signup"
              className="cta-base cta-primary inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_rgba(15,81,50,0.6)]"
            >
              <span className="relative z-[2]">Sign Up as a Citizen</span>
            </a>
            <a
              href="/signup"
              className="cta-base cta-ghost inline-flex items-center justify-center gap-2 rounded-full border border-foreground/25 bg-transparent px-6 py-3.5 text-sm font-semibold text-foreground"
            >
              <CheckCircle2 className="relative z-[2] h-4 w-4 text-primary transition-colors duration-300 group-hover:text-accent" />
              <span className="relative z-[2]">I'm a Government Official</span>
            </a>
          </motion.div>

          <motion.p
            {...rise}
            transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
            className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            Verified officials <span className="mx-2 text-accent">·</span> Public accountability{" "}
            <span className="mx-2 text-accent">·</span> Free forever
          </motion.p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          {/* soft ochre glow */}
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[40%] bg-accent/25 blur-3xl"
          />
          <CivicFeedCard />
        </div>
      </div>
    </section>
  );
}
