import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/Hero";
import AppInAzione from "@/components/home/AppInAzione";
import ChiediAKaricaSection from "@/components/home/ChiediAKaricaSection";
import ComeFunziona from "@/components/home/ComeFunziona";
import PerChi from "@/components/home/PerChi";
import CER from "@/components/home/CER";
import EnergiaPillole from "@/components/home/EnergiaPillole";
import HomeCTA from "@/components/home/HomeCTA";
import Footer from "@/components/Footer";

const footerLinks = [
  { label: { it: "Come funziona", en: "How it works" }, href: "#come-funziona" },
  { label: { it: "Per chi", en: "Who it's for" }, href: "#per-chi" },
  { label: { it: "Energia", en: "Energy" }, href: "#energia" },
  { label: { it: "Storia", en: "Story" }, href: "/storia" },
];

export default function Home() {
  return (
    <>
      <Navbar inlineCta={{ label: { it: "Contattaci →", en: "Contact us →" }, href: "/contatti" }} />
      <main id="main">
        <HomeHero />
        <AppInAzione />
        <ChiediAKaricaSection />
        <ComeFunziona />
        <PerChi />
        <CER />
        <EnergiaPillole />
        <HomeCTA />
      </main>
      <Footer links={footerLinks} />
    </>
  );
}
