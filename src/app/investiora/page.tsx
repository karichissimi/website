import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/funding/Hero";
import Teaser from "@/components/funding/Teaser";
import Ecosistema from "@/components/home/Ecosistema";
import CTA from "@/components/funding/CTA";
import Footer from "@/components/Footer";

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

const navLinks = [
  { label: "Contatti", href: "/contatti", highlight: true },
];

const footerLinks = [
  { label: "Opportunità", href: "#opportunita" },
  { label: "Ecosistema", href: "#ecosistema" },
  { label: "Home", href: "/" },
];

export default function InvestioraPage() {
  return (
    <>
      <Navbar
        links={navLinks}
        cta={{ label: "Investi ora", href: "#cta" }}
      />
      <main id="main">
        <Hero />
        <Teaser />
        <Ecosistema />
        <CTA />
      </main>
      <Footer links={footerLinks} showDisclaimer />
    </>
  );
}
