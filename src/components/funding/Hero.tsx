"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ExternalLink } from "lucide-react";
import Counter from "../Counter";
import KpiModal from "../KpiModal";
import FundingBanner from "../FundingBanner";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";
import KaricaWordmark from "@/components/KaricaWordmark";

interface Kpi {
  prefix: string;
  target: number;
  suffix: string;
  label: { it: string; en: string };
  sublabel?: { it: string; en: string };
  explanation?: { it: string; en: string };
  decimals?: number;
  richContent?: ReactNode;
}

const kpis: Kpi[] = [
  {
    prefix: "€",
    target: 1.5,
    suffix: "M",
    decimals: 1,
    label: { it: "Valutazione pre-money", en: "Pre-money valuation" },
    explanation: {
      it: "Abbiamo stabilito che Karica vale €1,5 milioni prima di ricevere l'investimento. Questo prezzo è stato calcolato con 3 metodi diversi e confrontato con altre startup italiane simili — abbiamo scelto un valore sotto il fair value indicato dai metodi, per premiare chi entra adesso.",
      en: "We've set Karica's value at €1.5M before the new investment. The price comes from three independent valuation methods cross-checked against comparable Italian startups — we chose a value below the fair-value indicated by those methods, so the people who come in now are rewarded.",
    },
  },
  {
    prefix: "",
    target: 25,
    suffix: "%",
    label: { it: "Equity per l'investitore", en: "Investor equity" },
    explanation: {
      it: "Chi investe €500.000 ottiene il 25% della società (post-money €2M). Significa diventare socio e partecipare alla crescita di Karica. Ogni €20.000 investiti = 1% della società. Diritti patrimoniali pieni (dividendi, liquidazione, exit).",
      en: "Investing €500,000 gets you 25% of the company (post-money €2M). You become a shareholder and participate in Karica's upside. Every €20,000 invested = 1% of the company. Full economic rights (dividends, liquidation, exit).",
    },
  },
  {
    prefix: "€",
    target: 6.62,
    suffix: "M",
    decimals: 2,
    label: { it: "Ricavi previsti 2030", en: "Projected 2030 revenue" },
    explanation: {
      it: "Il piano quinquennale stima ricavi per €6,62 milioni al 2030, partendo da €231k nel 2026. Crescita guidata dalla fee progressiva 10%→20% sul GMV e dall'espansione dei partner White Label (11 partner cumulati al 2030). EBITDA positivo dal primo anno.",
      en: "The five-year plan projects €6.62M in revenue by 2030, starting from €231k in 2026. Growth driven by the progressive 10%→20% fee on GMV and by White Label partner expansion (11 cumulative partners by 2030). Positive EBITDA from year one.",
    },
  },
  {
    prefix: "€",
    target: 10000,
    suffix: "",
    label: { it: "Ticket minimo", en: "Minimum ticket" },
    sublabel: {
      it: "da €3.500 con detrazione 65%",
      en: "from €3,500 with 65% tax relief",
    },
  },
];

const TICKET_MODAL_COPY = {
  it: {
    intro1Pre: "Puoi investire a partire da ",
    intro1Bold: "€10.000",
    intro1Post: ". Come Startup Innovativa, Karica dà accesso alla ",
    intro1BoldGreen: "detrazione IRPEF del 65%",
    intro1End: " sull'importo investito.",
    boxInvestment: "Investimento",
    boxDeduction: "Detrazione IRPEF (65%)",
    boxEffective: "Costo effettivo",
    fineprint:
      "La detrazione del 65% (regime de minimis) è prevista dall'art. 29-bis D.L. 179/2012, modificato dalla L. 193/2024. Si applica a investimenti fino a €300.000/anno in Startup Innovative. Richiede il mantenimento dell'investimento per almeno 3 anni e capienza IRPEF sufficiente. Se la detrazione supera l'imposta lorda, l'eccedenza diventa credito d'imposta (Ris. AE 30/E del 28/04/2025).",
    sources: "Fonti ufficiali",
  },
  en: {
    intro1Pre: "You can invest from ",
    intro1Bold: "€10,000",
    intro1Post: ". As an Innovative Startup, Karica grants access to the ",
    intro1BoldGreen: "65% personal income tax relief",
    intro1End: " on the invested amount.",
    boxInvestment: "Investment",
    boxDeduction: "Income-tax relief (65%)",
    boxEffective: "Effective cost",
    fineprint:
      "The 65% relief (de minimis regime) is set out in art. 29-bis D.L. 179/2012, as amended by L. 193/2024. It applies to investments up to €300,000/year in Innovative Startups. Requires holding the investment for at least 3 years and sufficient IRPEF tax capacity. If the relief exceeds the gross tax due, the surplus becomes a tax credit (Ris. AE 30/E of 28/04/2025).",
    sources: "Official sources",
  },
} as const;

function TicketModalContent() {
  const { lang } = useLang();
  const t = TICKET_MODAL_COPY[lang];
  return (
    <div className="text-sm space-y-4">
      <p className="text-text-secondary leading-relaxed">
        {t.intro1Pre}
        <strong className="text-text-primary">{t.intro1Bold}</strong>
        {t.intro1Post}
        <strong className="text-green-primary">{t.intro1BoldGreen}</strong>
        {t.intro1End}
      </p>

      {/* Calculation box */}
      <div className="bg-bg-darker rounded-xl p-4 border border-green-primary/20 space-y-2">
        <div className="flex justify-between">
          <span className="text-text-muted">{t.boxInvestment}</span>
          <span className="text-text-primary font-mono font-bold">€10.000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">{t.boxDeduction}</span>
          <span className="text-green-primary font-mono font-bold">−€6.500</span>
        </div>
        <div className="border-t border-card-border pt-2 flex justify-between">
          <span className="text-text-primary font-semibold">{t.boxEffective}</span>
          <span className="text-green-primary font-mono font-black text-lg">€3.500</span>
        </div>
      </div>

      <p className="text-text-muted text-xs leading-relaxed">{t.fineprint}</p>

      {/* Sources */}
      <div className="space-y-1.5">
        <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold">
          {t.sources}
        </p>
        {[
          {
            label: "MIMIT — Incentivi de minimis startup innovative",
            url: "https://www.mimit.gov.it/it/impresa/competitivita-e-nuove-imprese/start-up-innovative/incentivi-de-minimis",
          },
          {
            label: "Agenzia delle Entrate — Startup innovative",
            url: "https://www.agenziaentrate.gov.it/portale/Schede/Agevolazioni/Scheda+Start+up+innovative/InfoGen+start-up+innovative/",
          },
          {
            label: "Normattiva — D.L. 179/2012",
            url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2012-10-18;179",
          },
        ].map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-cyan-accent text-xs hover:text-cyan-accent/80 transition-colors"
          >
            <ExternalLink size={10} className="flex-shrink-0" />
            <span className="underline underline-offset-2">{source.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const HERO_COPY = {
  it: {
    aria: "Introduzione investimento Karica",
    titlePre: "Investi nella ",
    titleHighlight: "transizione energetica",
    intro1:
      "Karica raccoglie €500.000 per costruire la piattaforma digitale che porta famiglie e imprese dal problema energetico al risparmio.",
    intro2: "Con 5.000 clienti reali dal giorno uno.",
    ctaPrimary: "Richiedi il pitch deck",
    ctaSecondary: "Come funziona",
    ticketModalLabel: "Ticket minimo — detraibile al 65%",
  },
  en: {
    aria: "Introducing the Karica investment",
    titlePre: "Invest in the ",
    titleHighlight: "energy transition",
    intro1:
      "Karica is raising €500,000 to build the digital platform that walks households and businesses from energy problem to real savings.",
    intro2: "With 5,000 real customers from day one.",
    ctaPrimary: "Request the pitch deck",
    ctaSecondary: "How it works",
    ticketModalLabel: "Minimum ticket — 65% tax relief",
  },
} as const;

export default function Hero() {
  const { lang } = useLang();
  const t = HERO_COPY[lang];
  const [modal, setModal] = useState<number | null>(null);

  return (
    <section aria-label={t.aria} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 noise">
      <div className="glow-orb absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-green-primary/[0.07] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.06] blur-[100px]" />
      <div className="glow-orb absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.03] blur-[80px]" />
      <div className="absolute inset-0 dot-grid opacity-[0.12]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt=""
              aria-hidden
              width={64}
              height={64}
              className="h-16 w-auto animate-float"
            />
            <KaricaWordmark className="text-[60px] sm:text-[66px]" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-text-primary leading-[1.15] mb-5">
            {t.titlePre}
            <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.intro1}
            <br className="hidden sm:block" />
            <span className="text-text-primary font-semibold">{t.intro2}</span>
          </motion.p>

          {/* Key investment numbers */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {kpis.map((kpi, i) => (
              <button
                key={kpi.label.it}
                onClick={() => {
                  haptic("light");
                  setModal(i);
                }}
                className="btn-press-soft group card-glow p-4 transition-all duration-500 cursor-pointer text-left hover:shadow-[0_0_25px_rgba(57,255,20,0.12)]"
              >
                <div className="relative z-10">
                  <Counter
                    target={kpi.target}
                    prefix={kpi.prefix}
                    suffix={kpi.suffix}
                    decimals={kpi.decimals}
                    className="text-2xl sm:text-3xl font-black text-green-primary font-mono"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    {kpi.label[lang]}
                    <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-green-primary">
                      &rarr;
                    </span>
                  </p>
                  {kpi.sublabel && (
                    <p className="text-[10px] text-cyan-accent font-semibold mt-1">
                      {kpi.sublabel[lang]}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </motion.div>

          {/* Funding progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mb-8"
          >
            <FundingBanner />
          </motion.div>


          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <a
              href="#cta"
              onClick={() => haptic("medium")}
              className="btn-press relative bg-green-primary text-bg-dark font-bold px-8 py-4 rounded-lg uppercase tracking-wider text-base hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="#opportunita"
              onClick={() => haptic("light")}
              className="btn-press-soft border border-card-border text-text-secondary font-semibold px-8 py-4 rounded-lg text-base hover:border-green-primary/50 hover:text-green-primary transition-all hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]"
            >
              {t.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-darker to-transparent" />

      <motion.a
        href="#opportunita"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-green-primary transition-colors z-10"
      >
        <ArrowDown size={24} className="animate-bounce" />
      </motion.a>

      {/* KPI Modals */}
      {modal !== null && modal < 3 && (
        <KpiModal
          open
          onClose={() => setModal(null)}
          value={`${kpis[modal].prefix}${kpis[modal].target}${kpis[modal].suffix}`}
          label={kpis[modal].label[lang]}
          explanation={kpis[modal].explanation?.[lang]}
        />
      )}
      {modal === 3 && (
        <KpiModal
          open
          onClose={() => setModal(null)}
          value="€10.000"
          label={t.ticketModalLabel}
        >
          <TicketModalContent />
        </KpiModal>
      )}
    </section>
  );
}
