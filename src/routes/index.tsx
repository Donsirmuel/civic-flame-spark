import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/landing/Nav";
import { MapHero } from "@/components/landing/MapHero";
import { HowItMoves } from "@/components/landing/HowItMoves";
import { ClosingBand } from "@/components/landing/ClosingBand";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ property: "og:url", content: "/" }],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <MapHero />
      <HowItMoves />
      <ClosingBand />
      <Footer />
    </main>
  );
}
