import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function TwoSides() {
  return (
    <section className="border-y border-hairline">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative border-b border-hairline p-10 md:border-b-0 md:border-r md:p-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
            For Citizens
          </p>
          <h3 className="font-display mt-4 text-3xl leading-tight tracking-tight md:text-4xl">
            Say it once. Put it where it can't be ignored.
          </h3>
          <a
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <span className="relative">
              Sign up
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative bg-primary p-10 text-primary-foreground md:p-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            For Officials
          </p>
          <h3 className="font-display mt-4 text-3xl leading-tight tracking-tight md:text-4xl">
            Meet the people you serve — not just at election time.
          </h3>
          <a
            href="/signup"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            <span className="relative">
              Sign up as an official
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
