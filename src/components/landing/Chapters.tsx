import { motion } from "framer-motion";

const chapters = [
  {
    n: "01",
    title: "Post what's wrong",
    body: "A broken borehole. A closed clinic. A bad policy. Say it plainly — it goes on the record.",
  },
  {
    n: "02",
    title: "Officials are verified",
    body: "Every representative signs up and gets a real badge. No fake accounts, no impostors.",
  },
  {
    n: "03",
    title: "From your ward to the top",
    body: "Start local. If it grows, it moves up — LGA, State, all the way to federal.",
  },
  {
    n: "04",
    title: "Upvotes decide what matters",
    body: "The posts your community backs the most rise to the top. Nothing gets quietly buried.",
  },
  {
    n: "05",
    title: "See the reply, track the fix",
    body: "Every official response is public and timestamped. You can follow it until it's done.",
  },
  {
    n: "06",
    title: "Real names, real rules",
    body: "Moderated conversations, real identities, no anonymous hate. A square, not a shouting match.",
  },
];

export function Chapters() {
  return (
    <section id="chapters" className="relative">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline justify-between border-b border-hairline pb-6"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            How it works
          </p>
          <h2 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">
            Simple, on purpose.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-x-16 md:grid-cols-2">
          {chapters.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: 0.06 * Math.floor(i / 2) + (i % 2) * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-hairline/70 py-8"
            >
              {/* accent rule that grows in from the left when in view */}
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 h-px w-10 origin-left bg-accent"
              />
              <span className="text-2xl font-bold tabular-nums text-primary transition-colors duration-300 group-hover:text-accent md:text-3xl">
                {c.n}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {c.title}
                </h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-foreground/70">
                  {c.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
