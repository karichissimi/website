import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoriaContent from "./StoriaContent";

export const metadata: Metadata = {
  title: "Storia & Manifesto",
  description:
    "Perché esiste Karica. Il problema dell'energia in Italia, la soluzione che mancava, il momento per costruirla.",
  openGraph: {
    title: "Karica — Perché esistiamo",
    description:
      "Il rapporto tra cittadini e mondo dell'energia è strutturalmente disfunzionale. Karica colma il vuoto.",
  },
};

const footerLinks = [{ label: "Home", href: "/" }];

export default function StoriaPage() {
  return (
    <>
      <Navbar inlineCta={{ label: { it: "Contattaci →", en: "Contact us →" }, href: "/contatti" }} />
      <StoriaContent />
      <Footer links={footerLinks} />
    </>
  );
}
