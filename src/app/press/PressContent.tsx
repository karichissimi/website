"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Mail, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

type LocalisedAsset = {
  href: string;
  preview: string;
  filename: string;
  label: { it: string; en: string };
  description: { it: string; en: string };
};

const logos: LocalisedAsset[] = [
  {
    href: "/graphics/Karica_Logo_Felice.png",
    preview: "/graphics/Karica_Logo_Felice.png",
    filename: "karica-logo-cacatua.png",
    label: { it: "Cacatua — logo principale", en: "Cockatoo — main logo" },
    description: { it: "Trasparente, ottimo su sfondi scuri", en: "Transparent, ideal on dark backgrounds" },
  },
  {
    href: "/graphics/Karica_Wordmark.png",
    preview: "/graphics/Karica_Wordmark.png",
    filename: "karica-wordmark.png",
    label: { it: "Wordmark gradiente", en: "Gradient wordmark" },
    description: { it: "Trasparente, con foglia sulla i — il logo ufficiale", en: "Transparent, leaf-dotted i — the official wordmark" },
  },
  {
    href: "/graphics/Karica_Scritta_BLU.png",
    preview: "/graphics/Karica_Scritta_BLU.png",
    filename: "karica-wordmark-blu.png",
    label: { it: "Wordmark blu", en: "Blue wordmark" },
    description: { it: "Per sfondi chiari", en: "For light backgrounds" },
  },
  {
    href: "/og-image.png",
    preview: "/og-image.png",
    filename: "karica-og-image.png",
    label: { it: "Open Graph image (1200×630)", en: "Open Graph image (1200×630)" },
    description: { it: "Anteprima social pronta all'uso", en: "Ready-to-use social preview" },
  },
];

const screens: LocalisedAsset[] = [
  {
    href: "/app/01-bolletta-screen.png",
    preview: "/app/01-bolletta-screen.png",
    filename: "karica-screen-01-bolletta.png",
    label: { it: "Diagnosi bolletta", en: "Bill diagnosis" },
    description: { it: "Schermata di apertura del wizard", en: "Wizard opening screen" },
  },
  {
    href: "/app/04-calcolo-screen.png",
    preview: "/app/04-calcolo-screen.png",
    filename: "karica-screen-04-calcolo.png",
    label: { it: "Analisi smart", en: "Smart analysis" },
    description: { it: "Schermata risultato del calcolo AI", en: "AI computation result screen" },
  },
  {
    href: "/app/05-diagnosi-screen.png",
    preview: "/app/05-diagnosi-screen.png",
    filename: "karica-screen-05-diagnosi.png",
    label: { it: "Diagnosi finale", en: "Final diagnosis" },
    description: { it: "Classe energetica + risparmio stimato", en: "Energy class + estimated savings" },
  },
  {
    href: "/app/06-interventi-screen.png",
    preview: "/app/06-interventi-screen.png",
    filename: "karica-screen-06-interventi.png",
    label: { it: "Piano interventi", en: "Retrofit plan" },
    description: { it: "Interventi prioritizzati con risparmio annuo", en: "Prioritised retrofits with yearly savings" },
  },
];

type Founder = {
  name: string;
  role: { it: string; en: string };
  photo: string;
  bio: { it: string; en: string };
};

const founders: Founder[] = [
  {
    name: "Alessandro Zanin",
    role: { it: "CEO & Co-Founder", en: "CEO & Co-Founder" },
    photo: "/team/alessandro-zanin.jpg",
    bio: {
      it: "Digital transformation lead in financial services. Manager in Moltiply Group, dove ha guidato la trasformazione del back-office bancario (da 160 a 30 risorse italiane via automazione end-to-end). EMEA awards in Tupperware Brands HQ per il lancio di piattaforme digitali B2B2C.",
      en: "Digital transformation lead in financial services. Manager at Moltiply Group, where he led the bank back-office transformation (160 → 30 Italian roles via end-to-end automation). EMEA awards at Tupperware Brands HQ for launching B2B2C digital platforms.",
    },
  },
  {
    name: "Federico Romis",
    role: { it: "Operations & Co-Founder", en: "Operations & Co-Founder" },
    photo: "/team/federico-romis.jpg",
    bio: {
      it: "Imprenditore costruzioni & energia. Fondatore di società operative nell'efficientamento energetico con appalti chiusi oltre €30M. Ingegnere civile con dottorato internazionale (Pisa, Minho, Firenze), specializzato in ingegneria sismica. 20 anni di execution su edifici complessi.",
      en: "Construction & energy entrepreneur. Founder of operating companies in energy efficiency with €30M+ in closed contracts. Civil engineer with international PhD (Pisa, Minho, Florence), specialised in seismic engineering. 20 years of execution on complex buildings.",
    },
  },
  {
    name: "Alfredo Perazzo",
    role: { it: "Energy, Operations & Co-Founder", en: "Energy, Operations & Co-Founder" },
    photo: "/team/alfredo-perazzo.jpg",
    bio: {
      it: "CEO di E-VM S.r.l., CTO di GTI S.r.l. Best Installer Italiano 2024-25 (EUPD Research). Project Leader Superbonus in IREN Mercato (€80M con 200+ fornitori coordinati). EGE certificato RINA + Ingegnere Edile-Architettura.",
      en: "CEO of E-VM S.r.l., CTO of GTI S.r.l. Best Italian Installer 2024-25 (EUPD Research). Superbonus Project Leader at IREN Mercato (€80M, 200+ suppliers coordinated). RINA-certified EGE + Building Engineer-Architect.",
    },
  },
  {
    name: "Elia Vassallo",
    role: { it: "Commercial & Co-Founder", en: "Commercial & Co-Founder" },
    photo: "/team/elia-vassallo.jpg",
    bio: {
      it: "Head of Sales in Ryoma Coffee World. 2x revenue growth in 2 anni via re-segmentation e nuovi distribution agreement. Executive MBA SDA Bocconi. Oltre 10 anni di sviluppo commerciale B2B internazionale.",
      en: "Head of Sales at Ryoma Coffee World. 2× revenue growth in 2 years via re-segmentation and new distribution agreements. Executive MBA at SDA Bocconi. 10+ years of international B2B commercial development.",
    },
  },
];

const COPY = {
  it: {
    pill: "Press kit Karica",
    titlePre: "Tutto quello che ti serve per ",
    titleHighlight: "parlare di Karica",
    titlePost: ".",
    intro: "Logo pack, screenshot dell'app, bio del team e dati aziendali. Per richieste specifiche o materiale custom, ",
    introLink: "scrivici",
    introEnd: ".",
    factsKicker: "Dati aziendali",
    facts: [
      { label: "Ragione sociale", value: "Karica S.r.l." },
      { label: "Forma giuridica", value: "Startup innovativa (art. 25 D.L. 179/2012)" },
      { label: "Sede legale", value: "Via Vallarsa 11, Milano" },
      { label: "P.IVA", value: "14470800963" },
      { label: "Anno costituzione", value: "2025" },
      { label: "Sito", value: "karica.it" },
    ],
    logoKicker: "Logo pack",
    logoTitle: "Quattro asset, tre varianti del marchio.",
    screensKicker: "Screenshot app",
    screensTitle: "Le schermate più rappresentative del flusso.",
    foundersKicker: "Bio founder",
    foundersTitle: "I quattro mestieri che Karica deve dominare.",
    teamCta: "Vedi il team completo",
    download: "Scarica",
    contactKicker: "Contatto stampa",
    contactTitle: "Hai bisogno di altro?",
    contactBody: "Scrivici: rispondiamo direttamente, senza filtri di agenzia.",
  },
  en: {
    pill: "Karica press kit",
    titlePre: "Everything you need to ",
    titleHighlight: "talk about Karica",
    titlePost: ".",
    intro: "Logo pack, app screenshots, team bios and company data. For specific requests or custom materials, ",
    introLink: "drop us a line",
    introEnd: ".",
    factsKicker: "Company data",
    facts: [
      { label: "Legal name", value: "Karica S.r.l." },
      { label: "Legal form", value: "Innovative startup (art. 25 D.L. 179/2012)" },
      { label: "Registered office", value: "Via Vallarsa 11, Milan" },
      { label: "VAT", value: "14470800963" },
      { label: "Year founded", value: "2025" },
      { label: "Website", value: "karica.it" },
    ],
    logoKicker: "Logo pack",
    logoTitle: "Four assets, three brand variants.",
    screensKicker: "App screenshots",
    screensTitle: "The most representative screens of the flow.",
    foundersKicker: "Founder bios",
    foundersTitle: "The four crafts Karica must master.",
    teamCta: "See the full team",
    download: "Download",
    contactKicker: "Press contact",
    contactTitle: "Need anything else?",
    contactBody: "Write to us: we reply directly, no agency filter.",
  },
} as const;

function AssetCard({ asset }: { asset: LocalisedAsset }) {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <article className="rounded-2xl border border-card-border bg-card-bg/40 overflow-hidden">
      <div className="relative aspect-video bg-bg-darker flex items-center justify-center p-4">
        <Image
          src={asset.preview}
          alt={asset.label[lang]}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-text-primary font-bold text-sm mb-1">{asset.label[lang]}</h3>
        <p className="text-text-muted text-xs mb-4">{asset.description[lang]}</p>
        <a
          href={asset.href}
          download={asset.filename}
          className="btn-press-soft inline-flex items-center gap-2 text-cyan-accent text-xs font-semibold hover:text-cyan-accent/80 transition-colors"
        >
          <Download size={14} />
          {t.download}
        </a>
      </div>
    </article>
  );
}

export default function PressContent() {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <main id="main" className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
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
              {t.pill}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary leading-[1.05] mb-5">
            {t.titlePre}
            <span className="text-gradient">{t.titleHighlight}</span>
            {t.titlePost}
          </h1>

          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.intro}
            <a href="mailto:info@karica.it" className="text-cyan-accent hover:underline">
              {t.introLink}
            </a>
            {t.introEnd}
          </p>
        </div>
      </section>

      {/* FACTS */}
      <section className="relative py-12 bg-bg-darker overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4">
            {t.factsKicker}
          </p>
          <div className="rounded-2xl border border-card-border bg-card-bg/40 overflow-hidden">
            <table className="w-full">
              <tbody>
                {t.facts.map((f, i) => (
                  <tr key={f.label} className={i < t.facts.length - 1 ? "border-b border-card-border/40" : ""}>
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
              {t.logoKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight">
              {t.logoTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {logos.map((logo) => (
              <AssetCard key={logo.filename} asset={logo} />
            ))}
          </div>
        </div>
      </section>

      {/* SCREENS */}
      <section className="relative py-16 sm:py-20 bg-bg-darker overflow-hidden">
        <div className="glow-orb absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[100px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-cyan-accent font-semibold text-xs uppercase tracking-widest mb-3">
              {t.screensKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight">
              {t.screensTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {screens.map((scr) => (
              <AssetCard key={scr.filename} asset={scr} />
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="relative py-16 sm:py-20 bg-bg-dark overflow-hidden">
        <div className="glow-orb absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-3">
              {t.foundersKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight">
              {t.foundersTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {founders.map((f) => (
              <article key={f.name} className="rounded-2xl border border-card-border bg-card-bg/40 p-5 sm:p-6">
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
                      {f.role[lang]}
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {f.bio[lang]}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center sm:text-left">
            <Link
              href="/whoweare"
              className="btn-press-soft inline-flex items-center gap-2 text-cyan-accent text-sm font-semibold hover:text-cyan-accent/80 transition-colors"
            >
              {t.teamCta}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden">
        <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-3">
            {t.contactKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-5">
            {t.contactTitle}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg mb-8">{t.contactBody}</p>

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
  );
}
