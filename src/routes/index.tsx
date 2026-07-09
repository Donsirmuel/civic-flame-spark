import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Chapters } from "@/components/landing/Chapters";
import { TwoSides } from "@/components/landing/TwoSides";
import { ClosingBand } from "@/components/landing/ClosingBand";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Chapters />
      <TwoSides />
      <ClosingBand />
      <Footer />
    </main>
  );
}
