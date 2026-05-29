"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

const COPY = {
  it: {
    heroAria: "Detrazione 65% per Family & Friends",
    pill: "Pagina riservata — Family & Friends",
    titlePre: "Detrazione ",
    titleHighlight: "65%",
    leadPre: "Per chi ",
    leadStrong: "investe in Karica",
    leadPost: ".",
    leadDetail1: "Per le persone fisiche che investono in startup innovative, fino a ",
    leadDetail1Bold: "€300.000",
    leadDetail1End:
      " di investimento, recuperabili nella dichiarazione IRPEF dell'anno successivo. Regime de minimis (art. 29-bis D.L. 179/2012, mod. L. 193/2024).",
    scrollCta: "Scopri il bonus Family & Friends ↓",

    karicaAria: "Cos'è Karica",
    karicaKicker: "In tre righe",
    karicaP1Pre: "Karica porta famiglie e imprese ",
    karicaP1Highlight: "dal problema energetico al risparmio",
    karicaP1Post: ".",
    karicaP2:
      "Una piattaforma digitale che fa diagnosi, propone gli interventi giusti e li esegue con la rete dei partner in piattaforma. Stiamo costruendo l'app con 5.000 clienti reali del partner energia, dal giorno uno.",

    bonusAria: "Bonus Family & Friends",
    bonusKicker: "Il bonus che ti spetta in più",
    bonusTitlePre: "",
    bonusTitleHighlight: "10% di sconto",
    bonusTitlePost: " sui lavori sulla tua proprietà.",
    bonusBody:
      "Chi entra dal canale Family & Friends riceve uno sconto del 10% su qualunque intervento di efficientamento energetico realizzato tramite Karica sulla propria proprietà — casa, secondo immobile o sede d'impresa.",

    exampleKicker: "Esempio concreto",
    step1Label: "01 — Investimento in Karica",
    step1Row1: "Investi",
    step1Row2: "Detrazione IRPEF 65%",
    step1Row3: "Costo effettivo",
    step2Label: "02 — Sconto F&F sui lavori",
    step2Row1: "Lavoro sulla tua proprietà",
    step2Row2: "Sconto F&F 10%",
    totalKicker: "Risparmio reale",
    totalNote: "su €150.000 movimentati",
    fineprint:
      "La detrazione IRPEF del 65% richiede capienza fiscale e mantenimento dell'investimento per almeno 3 anni (art. 29-bis D.L. 179/2012, mod. L. 193/2024). Lo sconto F&F è cumulabile con detrazioni edilizie statali dove ammesso dalla normativa.",
    pitchKicker: "Prima di decidere?",
    pitchBody: "Vedi il pitch completo: piano, numeri, team",
  },
  en: {
    heroAria: "65% tax relief for Family & Friends",
    pill: "Reserved page — Family & Friends",
    titlePre: "",
    titleHighlight: "65% tax relief",
    leadPre: "For those who ",
    leadStrong: "invest in Karica",
    leadPost: ".",
    leadDetail1:
      "For individuals investing in innovative startups, up to ",
    leadDetail1Bold: "€300,000",
    leadDetail1End:
      " in investment, recoverable in the following year's personal income tax filing. De minimis regime (art. 29-bis D.L. 179/2012, as amended by L. 193/2024).",
    scrollCta: "Discover the Family & Friends bonus ↓",

    karicaAria: "What Karica is",
    karicaKicker: "In three lines",
    karicaP1Pre: "Karica walks households and businesses ",
    karicaP1Highlight: "from energy problem to real savings",
    karicaP1Post: ".",
    karicaP2:
      "A digital platform that runs the diagnosis, recommends the right retrofits and executes them through the partner network on the platform. We're building the app with 5,000 real customers from the energy partner, from day one.",

    bonusAria: "Family & Friends bonus",
    bonusKicker: "The extra you get",
    bonusTitlePre: "",
    bonusTitleHighlight: "10% off",
    bonusTitlePost: " the works on your property.",
    bonusBody:
      "Anyone joining through the Family & Friends channel receives 10% off any energy-efficiency retrofit carried out through Karica on their own property — home, second property or business location.",

    exampleKicker: "Concrete example",
    step1Label: "01 — Investment in Karica",
    step1Row1: "You invest",
    step1Row2: "65% income-tax relief",
    step1Row3: "Effective cost",
    step2Label: "02 — F&F discount on the works",
    step2Row1: "Works on your property",
    step2Row2: "F&F 10% off",
    totalKicker: "Actual saving",
    totalNote: "on €150,000 moved",
    fineprint:
      "The 65% income-tax relief requires sufficient tax capacity and holding the investment for at least 3 years (art. 29-bis D.L. 179/2012, as amended by L. 193/2024). The F&F discount can be combined with state building incentives where allowed by law.",
    pitchKicker: "Before deciding?",
    pitchBody: "See the full pitch: plan, numbers, team",
  },
} as const;

export default function DetrazioneContent() {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <>
      {/* HERO */}
      <section
        aria-label={t.heroAria}
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
              {t.pill}
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-text-primary leading-[0.95] mb-5 tracking-tight">
            {t.titlePre}
            <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          <p className="text-lg sm:text-2xl text-text-secondary leading-snug max-w-2xl mx-auto mb-3">
            {t.leadPre}
            <span className="text-text-primary font-semibold">{t.leadStrong}</span>
            {t.leadPost}
          </p>
          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
            {t.leadDetail1}
            <span className="text-text-secondary font-semibold">{t.leadDetail1Bold}</span>
            {t.leadDetail1End}
          </p>

          <a
            href="#bonus"
            className="btn-press-soft mt-10 inline-flex items-center gap-2 text-cyan-accent text-sm font-semibold hover:text-cyan-accent/80 transition-colors"
          >
            {t.scrollCta}
          </a>
        </div>
      </section>

      {/* COS'È KARICA */}
      <section
        aria-label={t.karicaAria}
        className="relative py-20 sm:py-24 bg-bg-darker overflow-hidden"
      >
        <div className="glow-orb absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[120px]" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
          <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-4 text-center">
            {t.karicaKicker}
          </p>
          <p className="text-xl sm:text-2xl text-text-primary font-semibold leading-relaxed text-center mb-3">
            {t.karicaP1Pre}
            <span className="text-gradient">{t.karicaP1Highlight}</span>
            {t.karicaP1Post}
          </p>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed text-center">
            {t.karicaP2}
          </p>
        </div>
      </section>

      {/* BONUS F&F */}
      <section
        id="bonus"
        aria-label={t.bonusAria}
        className="relative py-20 sm:py-28 bg-bg-dark overflow-hidden scroll-mt-20"
      >
        <div className="glow-orb absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
        <div className="glow-orb-slow absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-cyan-accent font-semibold text-xs uppercase tracking-widest mb-3">
              {t.bonusKicker}
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-text-primary leading-tight mb-4">
              {t.bonusTitlePre}
              <span className="text-gradient">{t.bonusTitleHighlight}</span>
              {t.bonusTitlePost}
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              {t.bonusBody}
            </p>
          </div>

          {/* Numeric example */}
          <div className="card-glow p-6 sm:p-10">
            <div className="relative z-10">
              <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-6 text-center">
                {t.exampleKicker}
              </p>

              <div className="mb-6">
                <p className="text-green-primary text-xs uppercase tracking-wider font-bold mb-3">
                  {t.step1Label}
                </p>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between items-baseline">
                    <span className="text-text-secondary">{t.step1Row1}</span>
                    <span className="text-text-primary font-mono font-bold">€50.000</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-text-secondary">{t.step1Row2}</span>
                    <span className="text-green-primary font-mono font-bold">−€32.500</span>
                  </div>
                  <div className="border-t border-card-border/60 pt-2 flex justify-between items-baseline">
                    <span className="text-text-primary font-semibold">{t.step1Row3}</span>
                    <span className="text-green-primary font-mono font-black text-lg sm:text-xl">
                      €17.500
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6 pt-6 border-t border-card-border/40">
                <p className="text-cyan-accent text-xs uppercase tracking-wider font-bold mb-3">
                  {t.step2Label}
                </p>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between items-baseline">
                    <span className="text-text-secondary">{t.step2Row1}</span>
                    <span className="text-text-primary font-mono font-bold">€100.000</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-text-secondary">{t.step2Row2}</span>
                    <span className="text-cyan-accent font-mono font-bold">−€10.000</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-green-primary/30 bg-green-primary/[0.04] -mx-6 sm:-mx-10 px-6 sm:px-10 pb-2 rounded-b-2xl">
                <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-2 text-center">
                  {t.totalKicker}
                </p>
                <p className="text-center">
                  <span className="block text-4xl sm:text-6xl font-black text-green-primary font-mono leading-none">
                    €42.500
                  </span>
                  <span className="block text-text-muted text-xs sm:text-sm mt-2">
                    {t.totalNote}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-text-disabled text-[11px] text-center mt-6 max-w-xl mx-auto leading-relaxed">
            {t.fineprint}
          </p>

          {/* Pitch link */}
          <div className="max-w-xl mx-auto mt-10">
            <Link
              href="/investiora"
              className="btn-press-soft group block rounded-xl border border-card-border hover:border-green-primary/40 bg-card-bg/50 hover:bg-card-bg/80 transition-all p-4 sm:p-5"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-green-primary/10 flex items-center justify-center">
                  <FileText size={18} className="text-green-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text-muted text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5">
                    {t.pitchKicker}
                  </p>
                  <p className="text-text-primary text-sm sm:text-base font-semibold leading-snug">
                    {t.pitchBody}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="flex-shrink-0 text-text-muted group-hover:text-green-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
