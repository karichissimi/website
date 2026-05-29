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
  { label: "Come funziona", href: "#come-funziona" },
  { label: "Per chi", href: "#per-chi" },
  { label: "Energia", href: "#energia" },
];

export default function Home() {
  return (
    <>
      <Navbar inlineCta={{ label: "Contattaci →", href: "/contatti" }} />
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
