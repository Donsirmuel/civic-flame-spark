import { motion } from "framer-motion";

const chapters = [
  {
    n: "I.",
    title: "Post grievances and opinions",
    body: "From a broken borehole to a policy critique — put it on the record where it can't be ignored.",
  },
  {
    n: "II.",
    title: "Verified officials, on the badge",
    body: "Every representative signs up under a verification protocol. No impostors, no ghost accounts.",
  },
  {
    n: "III.",
    title: "Follow issues from ward to federal",
    body: "Route posts up the ladder — LGA, State, National Assembly — as visibility and priority grow.",
  },
  {
    n: "IV.",
    title: "Upvotes surface what matters",
    body: "The community decides which grievances rise. The most-supported cannot be quietly buried.",
  },
  {
    n: "V.",
    title: "Track responses and resolutions",
    body: "Every official reply is timestamped, public, and follow-uppable. Progress lives on the timeline.",
  },
  {
    n: "VI.",
    title: "Moderated, safe, human",
    body: "Real identities, community guidelines, and no anonymous bullying. A square, not a shouting match.",
  },
];

export function Chapters() {
  return (
    <section id="chapters" className="relative">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-baseline justify-between border-b border-hairline pb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Chapters
          </p>
          <h2 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">
            What lives inside the <span className="italic text-primary">square</span>.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-16 md:grid-cols-2">
          {chapters.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: "easeOut" }}
              className="group relative grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-hairline/70 py-8"
            >
              <span className="font-display text-4xl italic text-accent md:text-5xl">{c.n}</span>
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
