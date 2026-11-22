import type { Metadata } from "next";
import Hero from "@/components/funding/Hero";
import Teaser from "@/components/funding/Teaser";
import Ecosistema from "@/components/home/Ecosistema";
import CTA from "@/components/funding/CTA";
import NidoShell from "@/components/nido/NidoShell";

export const metadata: Metadata = {
  title: "Karica — Investi nella transizione energetica",
  description:
    "Round pre-seed €500.000. Valutazione pre-money €1,5M, post-money €2M. EBITDA positivo dal primo anno, €6,62M ricavi stimati 2030. Investi in Karica.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function InvestioraPage() {
  return (
    <NidoShell
      showStory={false}
      disclaimer
      cta={{ label: { it: "Investi ora", en: "Invest now" }, href: "#cta" }}
    >
      <main id="main">
        <Hero />
        <Teaser />
        <Ecosistema />
        <CTA />
      </main>
    </NidoShell>
  );
}
