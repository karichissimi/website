import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContattiInner from "./ContattiInner";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Parla con il team di Karica. Scrivici a info@karica.it per informazioni, partnership o per saperne di più sul progetto.",
  openGraph: {
    title: "Contatti | Karica",
    description: "Scrivi al team di Karica o prenota una call di 30 minuti.",
    url: "/contatti",
    type: "website",
    locale: "it_IT",
    siteName: "Karica",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Karica" }],
  },
};

const footerLinks = [{ label: "Home", href: "/" }];

export default function ContattiPage() {
  return (
    <>
      <Navbar />
      <ContattiInner />
      <Footer links={footerLinks} />
    </>
  );
}
