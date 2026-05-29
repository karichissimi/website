import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const footerLinks = [
  { label: "Home", href: "/" },
];

export default function StoriaPage() {
  return (
    <>
      <Navbar inlineCta={{ label: "Contattaci →", href: "/contatti" }} />

      <main id="main" className="relative overflow-hidden">
        {/* HERO */}
        <section
          aria-label="Manifesto"
          className="relative min-h-[80svh] flex items-center justify-center pt-24 sm:pt-28 pb-12 overflow-hidden"
        >
          <div className="glow-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
          <div className="glow-orb-slow absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[100px]" />
          <div className="absolute inset-0 dot-grid opacity-[0.10]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="relative inline-block mb-7">
              <div className="absolute inset-0 bg-green-primary/20 blur-2xl rounded-full" />
              <Image
                src="/graphics/Karica_Logo_Felice.png"
                alt="Karica"
                width={72}
                height={72}
                priority
                className="relative h-16 sm:h-18 w-auto animate-float mx-auto"
              />
            </div>

            <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4">
              Manifesto
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary leading-[1.05] mb-6">
              L&apos;energia di casa tua,
              <br />
              <span className="text-gradient">finalmente chiara.</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Karica nasce dall&apos;idea che la transizione energetica
              italiana non abbia un problema di soluzioni — ne ha uno di
              mediazione. Ecco perché esistiamo.
            </p>
          </div>
        </section>

        {/* IL PROBLEMA */}
        <section
          aria-label="Il problema"
          className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden"
        >
          <div className="glow-orb absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-pink-accent/[0.04] blur-[120px]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-pink-accent font-semibold text-xs uppercase tracking-widest mb-4">
              Il problema
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-8">
              Il rapporto tra cittadini ed energia è{" "}
              <span className="text-gradient">strutturalmente disfunzionale</span>.
            </h2>

            <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
              <p>
                Il <strong className="text-text-primary">45,3% delle abitazioni italiane</strong> ricade
                in classe energetica F o G. Sono 3 milioni di unità immobiliari da
                efficientare prioritariamente entro il 2030. È il divario più ampio d&apos;Europa.
              </p>
              <p>
                Eppure il problema non si esaurisce nelle case da riqualificare. Milioni
                di famiglie e PMI pagano bollette che non sanno leggere, accedono a
                tariffe inefficienti, ignorano la possibilità di entrare in una Comunità
                Energetica per dimezzare il costo dell&apos;energia, e quando finalmente
                decidono di intervenire si trovano davanti a un percorso frammentato e opaco.
              </p>
              <p className="text-text-primary font-semibold">
                Il denominatore comune è uno: nessun ambiente digitale italiano
                accompagna il cittadino e la PMI nella loro intera relazione con l&apos;energia.
              </p>
              <p>
                Comparatori di bollette si fermano allo switch. Installatori digitali fanno
                solo fotovoltaico o solo pompe di calore. Marketplace generalisti routano lead.
                Utility vendono pacchetti casa bundled con la fornitura. Tutti coprono una
                porzione. Nessuno copre il tragitto.
              </p>
            </div>
          </div>
        </section>

        {/* LA SOLUZIONE */}
        <section
          aria-label="La soluzione"
          className="relative py-20 sm:py-24 bg-bg-dark overflow-hidden"
        >
          <div className="glow-orb absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full bg-green-primary/[0.05] blur-[110px]" />
          <div className="glow-orb-slow absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4">
              La soluzione
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-8">
              Karica è{" "}
              <span className="text-gradient">la piattaforma personale dell&apos;energia</span>.
            </h2>

            <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
              <p>
                L&apos;ambiente digitale in cui un cittadino o un&apos;impresa gestiscono
                l&apos;intera relazione con la propria energia — consumi, fornitura, partecipazione
                a comunità, comportamenti, interventi di efficienza, post-vendita.
              </p>
              <p>
                È al tempo stesso un marketplace della transizione energetica: uno spazio
                dove domanda e offerta si incontrano in un&apos;unica interfaccia. L&apos;utente
                trova diagnosi, simulazioni, switch ottimizzato, adesione a CER, modelli PPA
                per PMI, interventi di riqualificazione, gamification sui consumi virtuosi,
                community per condividere strategie di risparmio.
              </p>
              <p className="text-text-primary font-semibold">
                I lavori restano il servizio con la più alta monetizzazione unitaria.
                Ma non sono il prodotto. Il prodotto è l&apos;ambiente.
              </p>
            </div>
          </div>
        </section>

        {/* PERCHÉ ORA */}
        <section
          aria-label="Perché adesso"
          className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden"
        >
          <div className="glow-orb absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[120px]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-cyan-accent font-semibold text-xs uppercase tracking-widest mb-4">
              Perché adesso
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-8">
              La transizione è{" "}
              <span className="text-gradient">strutturale</span>, non ciclica.
            </h2>

            <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
              <p>
                La direttiva europea <strong className="text-text-primary">EPBD &quot;Case Green&quot;</strong> impone
                una riduzione del 16% dell&apos;energia primaria degli edifici entro il 2030.
                Il PNIEC fissa 79,2 GW di solare al 2030. Il PNRR ha allocato 795 milioni
                alle Comunità Energetiche.
              </p>
              <p>
                Studio Nomisma quantifica in <strong className="text-text-primary">€115 miliardi</strong>{" "}
                gli investimenti necessari nel residenziale tra il 2027 e il 2030.
                Energy &amp; Strategy del Politecnico di Milano stima il mercato dell&apos;efficienza
                su una traiettoria di 64–105 miliardi con CAGR dell&apos;11%.
              </p>
              <p className="text-text-primary font-semibold">
                Chi organizza la transizione ne cattura il valore. Karica è quel
                tassello mancante.
              </p>
            </div>
          </div>
        </section>

        {/* CHI SIAMO */}
        <section
          aria-label="Chi siamo"
          className="relative py-20 sm:py-24 bg-bg-dark overflow-hidden"
        >
          <div className="glow-orb absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4">
              Chi siamo
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
              60+ anni cumulati nei quattro mestieri che{" "}
              <span className="text-gradient">Karica deve dominare</span>.
            </h2>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-4">
              Quattro founder con competenze complementari: prodotto digitale,
              partnership B2B, supply chain edilizia, esecuzione industriale
              dell&apos;energia. Più un team di analisti e ingegneri che costruisce
              la piattaforma ogni giorno.
            </p>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
              Un progetto nato durante l&apos;Executive MBA in SDA Bocconi, dove
              tre dei founder si sono conosciuti — ma le competenze operative
              arrivano da carriere indipendenti costruite negli ultimi vent&apos;anni.
            </p>

            <Link
              href="/whoweare"
              className="btn-press inline-flex items-center gap-2 border border-card-border text-text-primary font-semibold px-5 py-3 rounded-lg text-sm hover:border-green-primary/50 hover:text-green-primary transition-all"
            >
              Conosci il team
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        {/* CTA finale */}
        <section className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden">
          <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-3">
              Vuoi parlarci?
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-6">
              Scriviamoci.
            </h2>
            <p className="text-text-secondary text-base mb-8">
              Siamo qui per rispondere a domande, partnership, stampa, investor.
            </p>
            <Link
              href="/contatti"
              className="btn-press inline-flex items-center gap-2 bg-green-primary text-bg-dark font-bold px-5 py-3 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-colors"
            >
              Contattaci
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer links={footerLinks} />
    </>
  );
}
