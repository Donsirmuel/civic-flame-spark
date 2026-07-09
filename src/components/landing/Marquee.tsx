const words = [
  "Grievances",
  "Opinions",
  "Policy",
  "Transparency",
  "Grassroots → Federal",
  "Verified Officials",
  "Public Square",
  "Accountability",
];

export function Marquee() {
  const line = [...words, ...words, ...words];
  return (
    <section className="relative overflow-hidden border-y border-primary/20 bg-primary py-5 text-primary-foreground">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl italic md:text-3xl">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
