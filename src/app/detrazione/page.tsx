import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetrazioneForm from "./DetrazioneForm";

export const metadata: Metadata = {
  title: "Karica — Detrazione 65% per Family & Friends",
  description:
    "Pagina riservata. Detrazione IRPEF 65% per chi investe in Karica come startup innovativa, più 10% di sconto sugli interventi a casa propria.",
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
  { label: "Home", href: "/" },
];

export default function DetrazionePage() {
  return (
    <>
      <Navbar links={navLinks} />

      <main id="main" className="relative overflow-hidden">
        {/* HERO — la detrazione è l'amo, niente fronzoli */}
        <section
          aria-label="Detrazione 65% per Family & Friends"
          className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-16 noise"
        >
          <div className="glow-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-green-primary/[0.08] blur-[120px]" />
          <div className="glow-orb-slow absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.06] blur-[100px]" />
          <div className="absolute inset-0 dot-grid opacity-[0.12]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Image
                src="/graphics/Karica_Logo_Felice.png"
                alt=""
                aria-hidden
                width={56}
                height={56}
                priority
                className="h-12 sm:h-14 w-auto animate-float"
              />
              <Image
                src="/graphics/Karica_Scritta_WHITE.png"
                alt="Karica"
                width={160}
                height={44}
                priority
                className="h-9 sm:h-11 w-auto"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-accent/10 border border-cyan-accent/30 mb-6">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-accent" />
              </span>
              <span className="text-cyan-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                Pagina riservata — Family &amp; Friends
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-text-primary leading-[0.95] mb-5 tracking-tight">
              Detrazione{" "}
              <span className="text-gradient">65%</span>
            </h1>

            <p className="text-lg sm:text-2xl text-text-secondary leading-snug max-w-2xl mx-auto mb-3">
              Per chi <span className="text-text-primary font-semibold">investe in Karica</span>.
            </p>
            <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
              Per le persone fisiche che investono in startup innovative,
              fino a <span className="text-text-secondary font-semibold">€300.000</span> di investimento,
              recuperabili nella dichiarazione IRPEF dell&apos;anno successivo.
              Regime de minimis (art. 29-bis D.L. 179/2012, mod. L. 193/2024).
            </p>

            <a
              href="#bonus"
              className="btn-press-soft mt-10 inline-flex items-center gap-2 text-cyan-accent text-sm font-semibold hover:text-cyan-accent/80 transition-colors"
            >
              Scopri il bonus Family &amp; Friends ↓
            </a>
          </div>
        </section>

        {/* COS'È KARICA — tre righe, non un trattato */}
        <section
          aria-label="Cos'è Karica"
          className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden"
        >
          <div className="glow-orb absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[120px]" />

          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
            <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4 text-center">
              In tre righe
            </p>
            <p className="text-xl sm:text-2xl text-text-primary font-semibold leading-relaxed text-center mb-3">
              Karica porta famiglie e imprese{" "}
              <span className="text-gradient">dal problema energetico al risparmio</span>.
            </p>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed text-center">
              Una piattaforma digitale che fa diagnosi, propone gli interventi giusti
              e li esegue con la rete dei partner in piattaforma. Stiamo costruendo l&apos;app
              con 5.000 clienti reali del partner energia, dal giorno uno.
            </p>
          </div>
        </section>

        {/* BONUS F&F — la vera leva */}
        <section
          id="bonus"
          aria-label="Bonus Family & Friends"
          className="relative py-20 sm:py-28 bg-bg-dark overflow-hidden scroll-mt-20"
        >
          <div className="glow-orb absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
          <div className="glow-orb-slow absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-cyan-accent font-semibold text-xs uppercase tracking-widest mb-3">
                Il bonus che ti spetta in più
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
                <span className="text-gradient">10% di sconto</span>
                <br className="sm:hidden" />
                {" "}sui lavori sulla tua proprietà.
              </h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
                Chi entra dal canale Family &amp; Friends riceve uno sconto del
                10% su qualunque intervento di efficientamento energetico
                realizzato tramite Karica sulla propria proprietà —
                casa, secondo immobile o sede d&apos;impresa.
              </p>
            </div>

            {/* Esempio numerico — il cuore della pagina */}
            <div className="card-glow p-6 sm:p-10">
              <div className="relative z-10">
                <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-6 text-center">
                  Esempio concreto
                </p>

                {/* Lato investimento */}
                <div className="mb-6">
                  <p className="text-green-primary text-xs uppercase tracking-wider font-bold mb-3">
                    01 — Investimento in Karica
                  </p>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between items-baseline">
                      <span className="text-text-secondary">Investi</span>
                      <span className="text-text-primary font-mono font-bold">€50.000</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-text-secondary">Detrazione IRPEF 65%</span>
                      <span className="text-green-primary font-mono font-bold">−€32.500</span>
                    </div>
                    <div className="border-t border-card-border/60 pt-2 flex justify-between items-baseline">
                      <span className="text-text-primary font-semibold">Costo effettivo</span>
                      <span className="text-green-primary font-mono font-black text-lg sm:text-xl">€17.500</span>
                    </div>
                  </div>
                </div>

                {/* Lato F&F */}
                <div className="mb-6 pt-6 border-t border-card-border/40">
                  <p className="text-cyan-accent text-xs uppercase tracking-wider font-bold mb-3">
                    02 — Sconto F&amp;F sui lavori
                  </p>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between items-baseline">
                      <span className="text-text-secondary">Lavoro sulla tua proprietà</span>
                      <span className="text-text-primary font-mono font-bold">€100.000</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-text-secondary">Sconto F&amp;F 10%</span>
                      <span className="text-cyan-accent font-mono font-bold">−€10.000</span>
                    </div>
                  </div>
                </div>

                {/* Totale */}
                <div className="pt-6 border-t-2 border-green-primary/30 bg-green-primary/[0.04] -mx-6 sm:-mx-10 px-6 sm:px-10 pb-2 rounded-b-2xl">
                  <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-2 text-center">
                    Risparmio reale
                  </p>
                  <p className="text-center">
                    <span className="block text-4xl sm:text-6xl font-black text-green-primary font-mono leading-none">
                      €42.500
                    </span>
                    <span className="block text-text-muted text-xs sm:text-sm mt-2">
                      su €150.000 movimentati
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-text-disabled text-[11px] text-center mt-6 max-w-xl mx-auto leading-relaxed">
              La detrazione IRPEF del 65% richiede capienza fiscale e
              mantenimento dell&apos;investimento per almeno 3 anni
              (art. 29-bis D.L. 179/2012, mod. L. 193/2024).
              Lo sconto F&amp;F è cumulabile con detrazioni edilizie statali
              dove ammesso dalla normativa.
            </p>
          </div>
        </section>

        {/* CTA — lead misurabile */}
        <Suspense fallback={null}>
          <DetrazioneForm />
        </Suspense>
      </main>

      <Footer links={footerLinks} showDisclaimer />
    </>
  );
}
