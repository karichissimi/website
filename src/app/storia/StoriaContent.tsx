"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

const COPY = {
  it: {
    kicker: "Manifesto",
    titleLine1: "L'energia di casa tua,",
    titleHighlight: "finalmente chiara.",
    intro:
      "Karica nasce dall'idea che la transizione energetica italiana non abbia un problema di soluzioni — ne ha uno di mediazione. Ecco perché esistiamo.",
    problemKicker: "Il problema",
    problemTitlePre: "Il rapporto tra cittadini ed energia è ",
    problemTitleHighlight: "strutturalmente disfunzionale",
    problemTitlePost: ".",
    problemP1Pre: "Il ",
    problemP1Bold: "45,3% delle abitazioni italiane",
    problemP1Post:
      " ricade in classe energetica F o G. Sono 3 milioni di unità immobiliari da efficientare prioritariamente entro il 2030. È il divario più ampio d'Europa.",
    problemP2:
      "Eppure il problema non si esaurisce nelle case da riqualificare. Milioni di famiglie e PMI pagano bollette che non sanno leggere, accedono a tariffe inefficienti, ignorano la possibilità di entrare in una Comunità Energetica per dimezzare il costo dell'energia, e quando finalmente decidono di intervenire si trovano davanti a un percorso frammentato e opaco.",
    problemP3:
      "Il denominatore comune è uno: nessun ambiente digitale italiano accompagna il cittadino e la PMI nella loro intera relazione con l'energia.",
    problemP4:
      "Comparatori di bollette si fermano allo switch. Installatori digitali fanno solo fotovoltaico o solo pompe di calore. Marketplace generalisti routano lead. Utility vendono pacchetti casa bundled con la fornitura. Tutti coprono una porzione. Nessuno copre il tragitto.",
    solutionKicker: "La soluzione",
    solutionTitlePre: "Karica è ",
    solutionTitleHighlight: "la piattaforma personale dell'energia",
    solutionTitlePost: ".",
    solutionP1:
      "L'ambiente digitale in cui un cittadino o un'impresa gestiscono l'intera relazione con la propria energia — consumi, fornitura, partecipazione a comunità, comportamenti, interventi di efficienza, post-vendita.",
    solutionP2:
      "È al tempo stesso un marketplace della transizione energetica: uno spazio dove domanda e offerta si incontrano in un'unica interfaccia. L'utente trova diagnosi, simulazioni, switch ottimizzato, adesione a CER, modelli PPA per PMI, interventi di riqualificazione, gamification sui consumi virtuosi, community per condividere strategie di risparmio.",
    solutionP3:
      "I lavori restano il servizio con la più alta monetizzazione unitaria. Ma non sono il prodotto. Il prodotto è l'ambiente.",
    whyKicker: "Perché adesso",
    whyTitlePre: "La transizione è ",
    whyTitleHighlight: "strutturale",
    whyTitlePost: ", non ciclica.",
    whyP1Pre: "La direttiva europea ",
    whyP1Bold: "EPBD \"Case Green\"",
    whyP1Post:
      " impone una riduzione del 16% dell'energia primaria degli edifici entro il 2030. Il PNIEC fissa 79,2 GW di solare al 2030. Il PNRR ha allocato 795 milioni alle Comunità Energetiche.",
    whyP2Pre: "Studio Nomisma quantifica in ",
    whyP2Bold: "€115 miliardi",
    whyP2Post:
      " gli investimenti necessari nel residenziale tra il 2027 e il 2030. Energy & Strategy del Politecnico di Milano stima il mercato dell'efficienza su una traiettoria di 64–105 miliardi con CAGR dell'11%.",
    whyP3:
      "Chi organizza la transizione ne cattura il valore. Karica è quel tassello mancante.",
    teamKicker: "Chi siamo",
    teamTitlePre: "60+ anni cumulati nei quattro mestieri che ",
    teamTitleHighlight: "Karica deve dominare",
    teamTitlePost: ".",
    teamP1:
      "Quattro founder con competenze complementari: prodotto digitale, partnership B2B, supply chain edilizia, esecuzione industriale dell'energia. Più un team di analisti e ingegneri che costruisce la piattaforma ogni giorno.",
    teamP2:
      "Un progetto nato durante l'Executive MBA in SDA Bocconi, dove tre dei founder si sono conosciuti — ma le competenze operative arrivano da carriere indipendenti costruite negli ultimi vent'anni.",
    teamCta: "Conosci il team",
    ctaKicker: "Vuoi parlarci?",
    ctaTitle: "Scriviamoci.",
    ctaBody:
      "Siamo qui per rispondere a domande, partnership, stampa, investor.",
    ctaButton: "Contattaci",
  },
  en: {
    kicker: "Manifesto",
    titleLine1: "Your home energy,",
    titleHighlight: "finally clear.",
    intro:
      "Karica is built on a single idea: Italy's energy transition doesn't have a solutions problem — it has a mediation problem. That's why we exist.",
    problemKicker: "The problem",
    problemTitlePre: "Citizens' relationship with energy is ",
    problemTitleHighlight: "structurally dysfunctional",
    problemTitlePost: ".",
    problemP1Pre: "",
    problemP1Bold: "45.3% of Italian homes",
    problemP1Post:
      " sit in energy class F or G. That's 3 million units that need a retrofit by 2030 as a priority. It's the widest gap in Europe.",
    problemP2:
      "But the problem isn't just buildings. Millions of households and SMEs pay bills they can't read, sit on inefficient tariffs, don't know they could join an Energy Community to halve their cost, and when they finally decide to act they face a fragmented, opaque journey.",
    problemP3:
      "The common denominator: no Italian digital environment walks citizens and SMEs through their entire relationship with energy.",
    problemP4:
      "Bill comparators stop at the switch. Digital installers only do solar PV or only heat pumps. Generalist marketplaces just route leads. Utilities sell home packages bundled with supply. Each covers a slice. Nobody covers the whole journey.",
    solutionKicker: "The solution",
    solutionTitlePre: "Karica is ",
    solutionTitleHighlight: "the personal energy platform",
    solutionTitlePost: ".",
    solutionP1:
      "The digital environment where a citizen or a business manages their entire relationship with their energy — consumption, supply, community participation, behaviours, retrofits, after-sales.",
    solutionP2:
      "It's also a marketplace for the energy transition: a space where supply and demand meet in a single interface. Users find diagnostics, simulations, optimised switching, REC enrolment, PPA models for SMEs, retrofits, gamified consumption, communities to share savings strategies.",
    solutionP3:
      "Retrofits remain the service with the highest unit monetisation. But they're not the product. The product is the environment.",
    whyKicker: "Why now",
    whyTitlePre: "The transition is ",
    whyTitleHighlight: "structural",
    whyTitlePost: ", not cyclical.",
    whyP1Pre: "The EU's ",
    whyP1Bold: "EPBD \"Green Homes\"",
    whyP1Post:
      " directive requires a 16% cut in primary energy use of buildings by 2030. Italy's PNIEC sets 79.2 GW of solar by 2030. The PNRR has earmarked €795M for Energy Communities.",
    whyP2Pre: "Nomisma puts the residential investment need at ",
    whyP2Bold: "€115 billion",
    whyP2Post:
      " between 2027 and 2030. Politecnico di Milano's Energy & Strategy estimates the efficiency market on a €64–105B trajectory with 11% CAGR.",
    whyP3:
      "Whoever organises the transition captures its value. Karica is the missing piece.",
    teamKicker: "Who we are",
    teamTitlePre: "60+ cumulative years across the four crafts ",
    teamTitleHighlight: "Karica must master",
    teamTitlePost: ".",
    teamP1:
      "Four founders with complementary skills: digital product, B2B partnerships, construction supply chain, industrial energy execution. Plus a team of analysts and engineers building the platform every day.",
    teamP2:
      "A project born during the Executive MBA at SDA Bocconi, where three of the founders met — but the operational skills come from independent careers built over the past two decades.",
    teamCta: "Meet the team",
    ctaKicker: "Want to talk?",
    ctaTitle: "Let's write.",
    ctaBody: "We're here to answer questions, partnership offers, press and investor enquiries.",
    ctaButton: "Contact us",
  },
} as const;

export default function StoriaContent() {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <main id="main" className="relative overflow-hidden">
      {/* HERO */}
      <section
        aria-label={t.kicker}
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
            {t.kicker}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary leading-[1.05] mb-6">
            {t.titleLine1}
            <br />
            <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.intro}
          </p>
        </div>
      </section>

      {/* IL PROBLEMA */}
      <section className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden">
        <div className="glow-orb absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-pink-accent/[0.04] blur-[120px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-pink-accent font-semibold text-xs uppercase tracking-widest mb-4">
            {t.problemKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-8">
            {t.problemTitlePre}
            <span className="text-gradient">{t.problemTitleHighlight}</span>
            {t.problemTitlePost}
          </h2>

          <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
            <p>
              {t.problemP1Pre}
              <strong className="text-text-primary">{t.problemP1Bold}</strong>
              {t.problemP1Post}
            </p>
            <p>{t.problemP2}</p>
            <p className="text-text-primary font-semibold">{t.problemP3}</p>
            <p>{t.problemP4}</p>
          </div>
        </div>
      </section>

      {/* LA SOLUZIONE */}
      <section className="relative py-20 sm:py-24 bg-bg-dark overflow-hidden">
        <div className="glow-orb absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full bg-green-primary/[0.05] blur-[110px]" />
        <div className="glow-orb-slow absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4">
            {t.solutionKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-8">
            {t.solutionTitlePre}
            <span className="text-gradient">{t.solutionTitleHighlight}</span>
            {t.solutionTitlePost}
          </h2>

          <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
            <p>{t.solutionP1}</p>
            <p>{t.solutionP2}</p>
            <p className="text-text-primary font-semibold">{t.solutionP3}</p>
          </div>
        </div>
      </section>

      {/* PERCHÉ ORA */}
      <section className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden">
        <div className="glow-orb absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[120px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-cyan-accent font-semibold text-xs uppercase tracking-widest mb-4">
            {t.whyKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-8">
            {t.whyTitlePre}
            <span className="text-gradient">{t.whyTitleHighlight}</span>
            {t.whyTitlePost}
          </h2>

          <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
            <p>
              {t.whyP1Pre}
              <strong className="text-text-primary">{t.whyP1Bold}</strong>
              {t.whyP1Post}
            </p>
            <p>
              {t.whyP2Pre}
              <strong className="text-text-primary">{t.whyP2Bold}</strong>
              {t.whyP2Post}
            </p>
            <p className="text-text-primary font-semibold">{t.whyP3}</p>
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section className="relative py-20 sm:py-24 bg-bg-dark overflow-hidden">
        <div className="glow-orb absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4">
            {t.teamKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
            {t.teamTitlePre}
            <span className="text-gradient">{t.teamTitleHighlight}</span>
            {t.teamTitlePost}
          </h2>

          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-4">
            {t.teamP1}
          </p>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8">
            {t.teamP2}
          </p>

          <Link
            href="/whoweare"
            className="btn-press inline-flex items-center gap-2 border border-card-border text-text-primary font-semibold px-5 py-3 rounded-lg text-sm hover:border-green-primary/50 hover:text-green-primary transition-all"
          >
            {t.teamCta}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA finale */}
      <section className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden">
        <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-3">
            {t.ctaKicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-text-secondary text-base mb-8">{t.ctaBody}</p>
          <Link
            href="/contatti"
            className="btn-press inline-flex items-center gap-2 bg-green-primary text-bg-dark font-bold px-5 py-3 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-colors"
          >
            {t.ctaButton}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
