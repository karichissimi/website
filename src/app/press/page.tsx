import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Mail, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const footerLinks = [
  { label: "Home", href: "/" },
];

type Asset = {
  label: string;
  description: string;
  href: string;
  preview?: string;
  filename: string;
};

const logos: Asset[] = [
  {
    label: "Cacatua — logo principale",
    description: "Trasparente, ottimo su sfondi scuri",
    href: "/graphics/Karica_Logo_Felice.png",
    preview: "/graphics/Karica_Logo_Felice.png",
    filename: "karica-logo-cacatua.png",
  },
  {
    label: "Wordmark bianco",
    description: "Per sfondi scuri",
    href: "/graphics/Karica_Scritta_WHITE.png",
    preview: "/graphics/Karica_Scritta_WHITE.png",
    filename: "karica-wordmark-white.png",
  },
  {
    label: "Wordmark blu",
    description: "Per sfondi chiari",
    href: "/graphics/Karica_Scritta_BLU.png",
    preview: "/graphics/Karica_Scritta_BLU.png",
    filename: "karica-wordmark-blu.png",
  },
  {
    label: "Open Graph image (1200×630)",
    description: "Anteprima social pronta all'uso",
    href: "/og-image.png",
    preview: "/og-image.png",
    filename: "karica-og-image.png",
  },
];

const screens: Asset[] = [
  {
    label: "Diagnosi bolletta",
    description: "Schermata di apertura del wizard",
    href: "/app/01-bolletta-screen.png",
    preview: "/app/01-bolletta-screen.png",
    filename: "karica-screen-01-bolletta.png",
  },
  {
    label: "Analisi smart",
    description: "Schermata risultato del calcolo AI",
    href: "/app/04-calcolo-screen.png",
    preview: "/app/04-calcolo-screen.png",
    filename: "karica-screen-04-calcolo.png",
  },
  {
    label: "Diagnosi finale",
    description: "Classe energetica + risparmio stimato",
    href: "/app/05-diagnosi-screen.png",
    preview: "/app/05-diagnosi-screen.png",
    filename: "karica-screen-05-diagnosi.png",
  },
  {
    label: "Piano interventi",
    description: "Interventi prioritizzati con risparmio annuo",
    href: "/app/06-interventi-screen.png",
    preview: "/app/06-interventi-screen.png",
    filename: "karica-screen-06-interventi.png",
  },
];

const founders = [
  {
    name: "Alessandro Zanin",
    role: "CEO & Co-Founder",
    photo: "/team/alessandro-zanin.jpg",
    bio: "Digital transformation lead in financial services. Manager in Moltiply Group, dove ha guidato la trasformazione del back-office bancario (da 160 a 30 risorse italiane via automazione end-to-end). EMEA awards in Tupperware Brands HQ per il lancio di piattaforme digitali B2B2C.",
  },
  {
    name: "Federico Romis",
    role: "Operations & Co-Founder",
    photo: "/team/federico-romis.jpg",
    bio: "Imprenditore costruzioni & energia. Fondatore di società operative nell'efficientamento energetico con appalti chiusi oltre €30M. Ingegnere civile con dottorato internazionale (Pisa, Minho, Firenze), specializzato in ingegneria sismica. 20 anni di execution su edifici complessi.",
  },
  {
    name: "Alfredo Perazzo",
    role: "Energy, Operations & Co-Founder",
    photo: "/team/alfredo-perazzo.jpg",
    bio: "CEO di E-VM S.r.l., CTO di GTI S.r.l. Best Installer Italiano 2024-25 (EUPD Research). Project Leader Superbonus in IREN Mercato (€80M con 200+ fornitori coordinati). EGE certificato RINA + Ingegnere Edile-Architettura.",
  },
  {
    name: "Elia Vassallo",
    role: "Commercial & Co-Founder",
    photo: "/team/elia-vassallo.jpg",
    bio: "Head of Sales in Ryoma Coffee World. 2x revenue growth in 2 anni via re-segmentation e nuovi distribution agreement. Executive MBA SDA Bocconi. Oltre 10 anni di sviluppo commerciale B2B internazionale.",
  },
];

const facts = [
  { label: "Ragione sociale", value: "Karica S.r.l." },
  { label: "Forma giuridica", value: "Startup innovativa (art. 25 D.L. 179/2012)" },
  { label: "Sede legale", value: "Via Vallarsa 11, Milano" },
  { label: "P.IVA", value: "14470800963" },
  { label: "Anno costituzione", value: "2025" },
  { label: "Sito", value: "karica.it" },
];

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <article className="rounded-2xl border border-card-border bg-card-bg/40 overflow-hidden">
      <div className="relative aspect-video bg-bg-darker flex items-center justify-center p-4">
        {asset.preview && (
          <Image
            src={asset.preview}
            alt={asset.label}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-text-primary font-bold text-sm mb-1">
          {asset.label}
        </h3>
        <p className="text-text-muted text-xs mb-4">{asset.description}</p>
        <a
          href={asset.href}
          download={asset.filename}
          className="btn-press-soft inline-flex items-center gap-2 text-cyan-accent text-xs font-semibold hover:text-cyan-accent/80 transition-colors"
        >
          <Download size={14} />
          Scarica
        </a>
      </div>
    </article>
  );
}

export default function PressPage() {
  return (
    <>
      <Navbar inlineCta={{ label: { it: "Scrivici →", en: "Email us →" }, href: "mailto:info@karica.it" }} />

      <main id="main" className="relative overflow-hidden">
        {/* HERO */}
        <section
          aria-label="Press kit"
          className="relative pt-24 sm:pt-28 pb-16 overflow-hidden"
        >
          <div className="glow-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />
          <div className="glow-orb-slow absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />
          <div className="absolute inset-0 dot-grid opacity-[0.10]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-accent/10 border border-cyan-accent/30 mb-6">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-accent" />
              </span>
              <span className="text-cyan-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                Press kit Karica
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary leading-[1.05] mb-5">
              Tutto quello che ti serve per{" "}
              <span className="text-gradient">parlare di Karica</span>.
            </h1>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Logo pack, screenshot dell&apos;app, bio del team e dati aziendali.
              Per richieste specifiche o materiale custom,{" "}
              <a
                href="mailto:info@karica.it"
                className="text-cyan-accent hover:underline"
              >
                scrivici
              </a>.
            </p>
          </div>
        </section>

        {/* FACTS / DATI AZIENDALI */}
        <section className="relative py-12 bg-bg-darker overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4">
              Dati aziendali
            </p>
            <div className="rounded-2xl border border-card-border bg-card-bg/40 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {facts.map((f, i) => (
                    <tr
                      key={f.label}
                      className={i < facts.length - 1 ? "border-b border-card-border/40" : ""}
                    >
                      <td className="px-4 py-3 text-text-muted text-xs sm:text-sm font-semibold uppercase tracking-wider">
                        {f.label}
                      </td>
                      <td className="px-4 py-3 text-text-primary text-sm sm:text-base font-mono">
                        {f.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* LOGO PACK */}
        <section className="relative py-16 sm:py-20 bg-bg-dark overflow-hidden">
          <div className="glow-orb absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-3">
                Logo pack
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight">
                Quattro asset, tre varianti del marchio.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {logos.map((logo) => (
                <AssetCard key={logo.label} asset={logo} />
              ))}
            </div>
          </div>
        </section>

        {/* SCREENSHOT */}
        <section className="relative py-16 sm:py-20 bg-bg-darker overflow-hidden">
          <div className="glow-orb absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[100px]" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <p className="text-cyan-accent font-semibold text-xs uppercase tracking-widest mb-3">
                Screenshot app
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight">
                Le schermate più rappresentative del flusso.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {screens.map((scr) => (
                <AssetCard key={scr.label} asset={scr} />
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="relative py-16 sm:py-20 bg-bg-dark overflow-hidden">
          <div className="glow-orb absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-3">
                Bio founder
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight">
                I quattro mestieri che Karica deve dominare.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {founders.map((f) => (
                <article
                  key={f.name}
                  className="rounded-2xl border border-card-border bg-card-bg/40 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-card-border bg-card-bg">
                      <Image
                        src={f.photo}
                        alt={f.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-primary font-bold text-base sm:text-lg leading-tight">
                        {f.name}
                      </h3>
                      <p className="text-green-primary text-xs font-semibold uppercase tracking-wider mt-0.5">
                        {f.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                    {f.bio}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center sm:text-left">
              <Link
                href="/whoweare"
                className="btn-press-soft inline-flex items-center gap-2 text-cyan-accent text-sm font-semibold hover:text-cyan-accent/80 transition-colors"
              >
                Vedi il team completo
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* CONTATTO STAMPA */}
        <section className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden">
          <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-3">
              Contatto stampa
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-5">
              Hai bisogno di altro?
            </h2>
            <p className="text-text-secondary text-base sm:text-lg mb-8">
              Scrivici: rispondiamo direttamente, senza filtri di agenzia.
            </p>

            <a
              href="mailto:info@karica.it"
              className="btn-press inline-flex items-center gap-2 bg-green-primary text-bg-dark font-bold px-5 py-3 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-colors"
            >
              <Mail size={16} />
              info@karica.it
            </a>
          </div>
        </section>
      </main>

      <Footer links={footerLinks} />
    </>
  );
}
