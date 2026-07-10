const words = [
  "Water",
  "Roads",
  "Schools",
  "Power",
  "Health",
  "Jobs",
  "Safety",
  "Housing",
  "Transport",
];

export function Marquee() {
  const line = [...words, ...words, ...words];
  return (
    <section className="relative overflow-hidden border-y border-primary/20 bg-primary py-4 text-primary-foreground">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.28em] md:text-base">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            {w}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
