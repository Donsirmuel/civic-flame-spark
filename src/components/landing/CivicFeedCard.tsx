import { motion } from "framer-motion";
import { ArrowUp, CheckCircle2, MessageCircle } from "lucide-react";

export function CivicFeedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md"
    >
      {/* peeking card behind */}
      <div className="absolute -bottom-6 left-6 right-6 h-24 rounded-2xl border border-hairline/60 bg-card/70 shadow-sm" aria-hidden />

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
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Ward 4</span>
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
                The community borehole in <span className="font-medium">Umudim</span> has been dry for 3 weeks.
                Children walk 40 mins for water. Please.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-medium text-primary">
                  <ArrowUp className="h-3.5 w-3.5" /> 412
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" /> 38
                </span>
                <span className="ml-auto rounded-full bg-accent/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                  Escalated · LGA Chair
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
              Hon. A. Okeke <span className="font-normal text-muted-foreground">· LGA Chairman</span>
            </p>
            <p className="mt-1.5 text-[14px] leading-snug text-foreground/85">
              "Repair team dispatched today. Photo update by Friday."
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
  );
}
