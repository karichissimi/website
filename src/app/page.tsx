import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/Hero";
import ComeFunziona from "@/components/home/ComeFunziona";
import PerChi from "@/components/home/PerChi";
import CER from "@/components/home/CER";
import Ecosistema from "@/components/home/Ecosistema";
import HomeCTA from "@/components/home/HomeCTA";
import Footer from "@/components/Footer";

const navLinks = [
  { label: "Come funziona", href: "#come-funziona" },
  { label: "Per chi", href: "#per-chi" },
  { label: "CER", href: "#cer" },
  { label: "Ecosistema", href: "#ecosistema" },
];

const footerLinks = [
  { label: "Come funziona", href: "#come-funziona" },
  { label: "Per chi", href: "#per-chi" },
  { label: "CER", href: "#cer" },
  { label: "Investitori", href: "/funding" },
];

export default function Home() {
  return (
    <>
      <Navbar
        links={navLinks}
        cta={{ label: "Investitori", href: "/funding" }}
      />
      <main>
        <HomeHero />
        <ComeFunziona />
        <PerChi />
        <CER />
        <Ecosistema />
        <HomeCTA />
      </main>
      <Footer links={footerLinks} />
    </>
  );
}
