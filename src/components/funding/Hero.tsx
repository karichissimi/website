"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Shield, ExternalLink } from "lucide-react";
import Counter from "../Counter";
import KpiModal from "../KpiModal";
import FundingBanner from "../FundingBanner";

interface Kpi {
  prefix: string;
  target: number;
  suffix: string;
  label: string;
  sublabel?: string;
  explanation?: string;
  richContent?: ReactNode;
}

const kpis: Kpi[] = [
  {
    prefix: "€",
    target: 2000000,
    suffix: "",
    label: "Valutazione pre-money",
    explanation:
      "Abbiamo stabilito che Karica vale €2 milioni prima di ricevere l'investimento. Questo prezzo è stato calcolato con 3 metodi diversi e confrontato con altre startup italiane simili. È volutamente conservativo, per premiare chi entra adesso.",
  },
  {
    prefix: "",
    target: 20,
    suffix: "%",
    label: "Equity per l'investitore",
    explanation:
      "Chi investe €500.000 ottiene il 20% della società. Significa diventare socio e partecipare alla crescita di Karica. Se la società cresce di valore, cresce anche il valore della tua quota.",
  },
  {
    prefix: "",
    target: 8,
    suffix: "%",
    label: "Rendimento garantito annuo",
    explanation:
      "Indipendentemente da come va, il tuo investimento matura un rendimento dell'8% all'anno per 2 anni. Automatico, senza toccare la cassa dell'azienda. Dopo 24 mesi hai diritto ad almeno €583.200 su €500k investiti.",
  },
  {
    prefix: "€",
    target: 25000,
    suffix: "",
    label: "Ticket minimo",
    sublabel: "da €8.750 con detrazione 65%",
  },
];

function TicketModalContent() {
  return (
    <div className="text-sm space-y-4">
      <p className="text-text-secondary leading-relaxed">
        Puoi investire a partire da <strong className="text-text-primary">€25.000</strong>.
        Come Startup Innovativa, Karica dà accesso alla{" "}
        <strong className="text-green-primary">detrazione IRPEF del 65%</strong> sull&apos;importo investito.
      </p>

      {/* Calculation box */}
      <div className="bg-bg-darker rounded-xl p-4 border border-green-primary/20 space-y-2">
        <div className="flex justify-between">
          <span className="text-text-muted">Investimento</span>
          <span className="text-text-primary font-mono font-bold">€25.000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Detrazione IRPEF (65%)</span>
          <span className="text-green-primary font-mono font-bold">−€16.250</span>
        </div>
        <div className="border-t border-card-border pt-2 flex justify-between">
          <span className="text-text-primary font-semibold">Costo effettivo</span>
          <span className="text-green-primary font-mono font-black text-lg">€8.750</span>
        </div>
      </div>

      <p className="text-text-muted text-xs leading-relaxed">
        La detrazione del 65% (regime de minimis) è prevista dall&apos;art. 29-bis D.L. 179/2012,
        modificato dalla L. 193/2024. Si applica a investimenti fino a €100.000/anno
        in Startup Innovative. Richiede il mantenimento dell&apos;investimento per almeno 3 anni
        e capienza IRPEF sufficiente. Se la detrazione supera l&apos;imposta lorda,
        l&apos;eccedenza diventa credito d&apos;imposta (Ris. AE 30/E del 28/04/2025).
      </p>

      {/* Sources */}
      <div className="space-y-1.5">
        <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold">
          Fonti ufficiali
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

export default function Hero() {
  const [modal, setModal] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 noise">
      <div className="glow-orb absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-green-primary/[0.07] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.06] blur-[100px]" />
      <div className="glow-orb absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.03] blur-[80px]" />
      <div className="absolute inset-0 dot-grid opacity-20" />

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
              alt="Karica"
              width={64}
              height={64}
              className="h-16 w-auto animate-float"
            />
            <Image
              src="/graphics/Karica_Scritta_WHITE.png"
              alt="Karica"
              width={180}
              height={50}
              className="h-11 sm:h-12 w-auto"
            />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-text-primary leading-[1.15] mb-5">
            Investi nella{" "}
            <span className="text-gradient">transizione energetica</span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Karica raccoglie €500.000 per costruire la piattaforma digitale
            che porta famiglie e imprese dal problema energetico al risparmio.
            <br className="hidden sm:block" />
            <span className="text-text-primary font-semibold">
              Con 5.000 clienti reali dal giorno uno.
            </span>
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
                key={kpi.label}
                onClick={() => setModal(i)}
                className="group card-glow p-4 transition-all duration-500 cursor-pointer text-left hover:shadow-[0_0_25px_rgba(57,255,20,0.12)]"
              >
                <div className="relative z-10">
                  <Counter
                    target={kpi.target}
                    prefix={kpi.prefix}
                    suffix={kpi.suffix}
                    className="text-2xl sm:text-3xl font-black text-green-primary font-mono"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    {kpi.label}
                    <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-green-primary">
                      &rarr;
                    </span>
                  </p>
                  {kpi.sublabel && (
                    <p className="text-[10px] text-cyan-accent font-semibold mt-1">
                      {kpi.sublabel}
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

          {/* Floor guarantee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-flex items-center gap-2 bg-green-primary/10 border border-green-primary/20 rounded-full px-5 py-2.5 mb-8 hover:bg-green-primary/15 transition-colors"
          >
            <Shield size={16} className="text-green-primary" />
            <span className="text-sm text-green-primary font-semibold">
              Floor garantito: ricevi almeno €583.200 su €500k investiti
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <a
              href="#cta"
              className="relative bg-green-primary text-bg-dark font-bold px-8 py-4 rounded-lg uppercase tracking-wider text-base hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
            >
              Richiedi il pitch deck
            </a>
            <a
              href="#opportunita"
              className="border border-card-border text-text-secondary font-semibold px-8 py-4 rounded-lg text-base hover:border-green-primary/50 hover:text-green-primary transition-all hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]"
            >
              Come funziona
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
          label={kpis[modal].label}
          explanation={kpis[modal].explanation}
        />
      )}
      {modal === 3 && (
        <KpiModal
          open
          onClose={() => setModal(null)}
          value="€25.000"
          label="Ticket minimo — detraibile al 65%"
        >
          <TicketModalContent />
        </KpiModal>
      )}
    </section>
  );
}
