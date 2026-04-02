import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/funding/Hero";
import Teaser from "@/components/funding/Teaser";
import CTA from "@/components/funding/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Karica — Investi nella transizione energetica",
  description:
    "Round pre-seed €500.000. Valutazione pre-money €2M, rendimento garantito 8% annuo, floor €583.200. Investi in Karica.",
};

const navLinks = [
  { label: "Opportunità", href: "#opportunita" },
  { label: "Contatti", href: "#cta" },
];

const footerLinks = [
  { label: "Opportunità", href: "#opportunita" },
  { label: "Contatti", href: "#cta" },
  { label: "Home", href: "/" },
];

export default function FundingPage() {
  return (
    <>
      <Navbar
        links={navLinks}
        cta={{ label: "Investi ora", href: "#cta" }}
      />
      <main>
        <Hero />
        <Teaser />
        <CTA />
      </main>
      <Footer links={footerLinks} showDisclaimer />
    </>
  );
}
