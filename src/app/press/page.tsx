import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PressContent from "./PressContent";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Logo pack, screenshot dell'app, bio del team e contatti stampa di Karica.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const footerLinks = [{ label: "Home", href: "/" }];

export default function PressPage() {
  return (
    <>
      <Navbar inlineCta={{ label: { it: "Scrivici →", en: "Email us →" }, href: "mailto:info@karica.it" }} />
      <PressContent />
      <Footer links={footerLinks} />
    </>
  );
}
