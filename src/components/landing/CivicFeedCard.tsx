import { motion } from "framer-motion";
import { ArrowUp, CheckCircle2, MessageCircle, TrendingUp } from "lucide-react";

export function CivicFeedCard() {
  return (
    <div className="relative w-full max-w-md">
      {/* floating sticker: upvote counter */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: -20 }}
        animate={{ opacity: 1, y: 0, rotate: -12 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-6 -top-6 z-20 rounded-2xl border border-primary/20 bg-card px-4 py-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.2)] md:-left-10"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowUp className="h-4 w-4" />
          </div>
          <div>
            <p className="text-lg font-bold leading-none text-foreground">+128</p>
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground">this hour</p>
          </div>
        </div>
      </motion.div>

      {/* floating sticker: verified badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 8 }}
        transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-4 top-16 z-20 flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.25)] md:-right-8"
      >
        <CheckCircle2 className="h-3.5 w-3.5 text-foreground" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
          Gov. Verified
        </span>
      </motion.div>

      {/* floating sticker: trending */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 15 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-4 -right-6 z-20 rounded-xl border border-hairline bg-card px-3 py-2 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.2)] md:-right-10"
      >
        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold text-foreground">#WaterForUmudim</span>
        </div>
      </motion.div>

      {/* main card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* peeking card behind */}
        <div
          className="absolute -bottom-6 left-6 right-6 h-24 rotate-2 rounded-2xl border border-hairline/60 bg-card/70 shadow-sm"
          aria-hidden
        />

        <div className="relative rounded-2xl border border-primary/20 bg-card shadow-[0_30px_60px_-30px_rgba(15,81,50,0.35),0_10px_30px_-15px_rgba(0,0,0,0.15)]">
          {/* header */}
          <div className="flex items-center justify-between border-b border-hairline/50 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-live absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Live · Nnewi North LGA
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Ward 4
            </span>
          </div>

          {/* post 1 */}
          <div className="px-5 pb-4 pt-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                CN
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Chinelo N.</span>
                  <span>· 2h · Citizen</span>
                </div>
                <p className="mt-1.5 text-[15px] leading-snug text-foreground">
                  The borehole in <span className="font-medium">Umudim</span> has been dry for 3
                  weeks. Kids walk 40 minutes for water. Please help.
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 font-medium text-primary">
                    <ArrowUp className="h-3.5 w-3.5" /> 412
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" /> 38
                  </span>
                  <span className="ml-auto rounded-full bg-accent/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                    Sent to LGA Chair
                  </span>
                </div>
              </div>
            </div>

            {/* official response */}
            <div className="mt-4 rounded-xl border border-primary/25 bg-primary/[0.06] p-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Official
              </div>
              <p className="mt-1.5 text-sm font-medium text-foreground">
                Hon. A. Okeke{" "}
                <span className="font-normal text-muted-foreground">· LGA Chairman</span>
              </p>
              <p className="mt-1.5 text-[14px] leading-snug text-foreground/85">
                "Repair team is on site today. I'll post a photo update on Friday."
              </p>
            </div>
          </div>

          {/* peeking post 2 */}
          <div className="border-t border-hairline/50 px-5 py-4 opacity-70">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-7 w-7 rounded-full bg-accent/30" />
              <span className="font-medium text-foreground">Ifeanyi O.</span>
              <span>· Streetlights on Market Road…</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
