import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/funding/Hero";
import Opportunita from "@/components/funding/Opportunita";
import Numeri from "@/components/funding/Numeri";
import Investimento from "@/components/funding/Investimento";
import Rendimenti from "@/components/funding/Rendimenti";
import Perche from "@/components/funding/Perche";
import CTA from "@/components/funding/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Karica — Investi nella transizione energetica",
  description:
    "Round pre-seed €500.000. Valutazione pre-money €2M, rendimento garantito 8% annuo, floor €583.200. Investi in Karica.",
};

const navLinks = [
  { label: "Opportunità", href: "#opportunita" },
  { label: "I numeri", href: "#numeri" },
  { label: "Investimento", href: "#investimento" },
  { label: "Rendimenti", href: "#rendimenti" },
];

const footerLinks = [
  { label: "Opportunità", href: "#opportunita" },
  { label: "Numeri", href: "#numeri" },
  { label: "Investimento", href: "#investimento" },
  { label: "Contatti", href: "#cta" },
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
        <Opportunita />
        <Numeri />
        <Investimento />
        <Rendimenti />
        <Perche />
        <CTA />
      </main>
      <Footer links={footerLinks} showDisclaimer />
    </>
  );
}
