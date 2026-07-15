import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeckGate from "./DeckGate";

export const metadata: Metadata = {
  title: "Investor Deck",
  description: "Area riservata — investor deck Karica.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const footerLinks = [{ label: "Home", href: "/" }];

export default function InvestorDeckPage() {
  return (
    <>
      <Navbar inlineCta={{ label: { it: "Scrivici →", en: "Email us →" }, href: "mailto:info@karica.it" }} />
      <main id="main">
        <DeckGate />
      </main>
      <Footer links={footerLinks} />
    </>
  );
}
