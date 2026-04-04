"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

interface NewsItem {
  title: string;
  tag: string;
  detail: string;
  source: string;
  sourceLabel: string;
  accentColor: string;
}

const news: NewsItem[] = [
  {
    title: "Bonus Casa 2026: confermato il 50%",
    tag: "50%",
    detail: "La detrazione per ristrutturazione ed efficientamento resta al 50% per la prima casa (36% per le seconde). Tetto massimo €96.000 per unità immobiliare, in 10 rate annuali. Confermati Ecobonus, Sismabonus e Bonus Mobili.",
    source: "https://www.fiscoetasse.com/new-rassegna-stampa/2812-bonus-casa-2026-cosa-ci-aspetta.html",
    sourceLabel: "FISCOeTASSE",
    accentColor: "#39FF14",
  },
  {
    title: "Case Green: recepimento entro maggio",
    tag: "EPBD",
    detail: "Entro il 29 maggio 2026 l'Italia deve recepire la direttiva (UE) 2024/1275. Obiettivo: -16% emissioni residenziali entro il 2030. Cambiano le classi energetiche. Oltre il 60% degli edifici italiani è in classe F o G — il gap più ampio d'Europa.",
    source: "https://www.altroconsumo.it/casa-energia/casa-condominio/news/nuovo-regolamento-ue-classi-energetiche-edifici",
    sourceLabel: "Altroconsumo",
    accentColor: "#FF4D6D",
  },
  {
    title: "CER: 795 milioni dal PNRR",
    tag: "CER",
    detail: "Il CdM ha approvato 795,5 milioni per le Comunità Energetiche Rinnovabili. Tariffa GSE di circa 110 €/MWh per 20 anni. Contributi a fondo perduto per comuni sotto 50.000 abitanti. Lavori da completare entro giugno 2026.",
    source: "https://www.mrkilowatt.it/news/aggiornamento-incentivi/incentivi-fotovoltaico-2026-torna-il-fondo-perduto-per-cer-e-autoconsumo/",
    sourceLabel: "Mr. Kilowatt",
    accentColor: "#00D4D4",
  },
  {
    title: "Bollette: -9% nel 2026",
    tag: "-9%",
    detail: "Risparmio stimato di €212/famiglia. Gas -12%, elettricità -2%. Attenzione: nel secondo trimestre 2026 aumento dell'8,1% per tensioni geopolitiche. Un'offerta a prezzo fisso può proteggere dalle oscillazioni.",
    source: "https://tg24.sky.it/economia/2025/12/22/bollette-luce-gas-prezzi-2026-dati",
    sourceLabel: "Sky TG24",
    accentColor: "#39FF14",
  },
  {
    title: "Fotovoltaico: da €7.000 chiavi in mano",
    tag: "FV",
    detail: "Un impianto da 6 kW costa da €6.599 senza accumulo a €12.599 con batteria. Detrazione al 50% fino a 20 kW anche senza ristrutturazione. IVA ridotta al 10%.",
    source: "https://www.enpal.com/it/fotovoltaico/guida-ai-costi-di-impianto-fotovoltaico",
    sourceLabel: "Enpal",
    accentColor: "#00D4D4",
  },
  {
    title: "Conto Termico 3.0: fino al 65%",
    tag: "65%",
    detail: "Incentivi fino al 65% per efficienza energetica e produzione termica da rinnovabili. Portale GSE sospeso temporaneamente per affluenza record. Privati: solo se abbinato a pompa di calore.",
    source: "https://www.abcontact.it/conto-termico-3-0-2026/",
    sourceLabel: "AB Contact",
    accentColor: "#FF4D6D",
  },
  {
    title: "Pompe di calore: -40% in bolletta",
    tag: "PDC",
    detail: "Riscaldamento, raffrescamento e acqua calda con un unico apparecchio. Risparmio fino al 40% vs caldaia a gas. Incentivabile con Ecobonus al 50% o Conto Termico 3.0 al 65%.",
    source: "https://www.sienergyconsulting.it/bonus-caldaia-fotovoltaico-2026-novita/",
    sourceLabel: "Sienergy",
    accentColor: "#39FF14",
  },
  {
    title: "Classe energetica: +30% sul valore casa",
    tag: "+30%",
    detail: "Un immobile in classe A vale fino al 30% in più di uno in classe G. Con la direttiva EPBD, gli edifici in classe F e G dovranno essere riqualificati. Chi interviene ora protegge il valore.",
    source: "https://www.giornaletecnologico.net/direttiva-case-green-italia-2026/",
    sourceLabel: "Giornale Tecnologico",
    accentColor: "#00D4D4",
  },
  {
    title: "Superbonus 110%: chiuso",
    tag: "STOP",
    detail: "Non più disponibile per l'efficientamento energetico. Resta solo per ricostruzione post-sisma. Alternative: Ecobonus al 50% (prima casa) o Conto Termico 3.0 (fino al 65%).",
    source: "https://aenergy.it/bonus-edilizi-2026/",
    sourceLabel: "AEnergy",
    accentColor: "#FF4D6D",
  },
  {
    title: "Startup innovative: detrazione 65%",
    tag: "INVEST",
    detail: "Chi investe in una startup come Karica detrae fino al 65% dall'IRPEF. Su €25.000 investiti, il costo effettivo è €8.750. Mantenimento minimo 3 anni.",
    source: "https://www.mimit.gov.it/it/impresa/competitivita-e-nuove-imprese/start-up-innovative/incentivi-de-minimis",
    sourceLabel: "MIMIT",
    accentColor: "#39FF14",
  },
];

export default function EnergiaPillole() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <section id="energia" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-bg-darker" />
      <div className="glow-orb absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Energia in pillole
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            Quello che devi sapere.{" "}
            <span className="text-gradient">Oggi.</span>
          </h2>
        </motion.div>

        {/* Compact pill grid */}
        <div className="flex flex-wrap gap-2">
          {news.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <button
                onClick={() => setOpenCard(openCard === i ? null : i)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  openCard === i
                    ? "ring-1 scale-105"
                    : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: openCard === i ? item.accentColor + "20" : "#1E254060",
                  color: openCard === i ? item.accentColor : "#C8D0E0",
                  ["--tw-ring-color" as string]: item.accentColor + "50",
                } as React.CSSProperties}
              >
                <span
                  className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: item.accentColor + "20",
                    color: item.accentColor,
                  }}
                >
                  {item.tag}
                </span>
                <span className="whitespace-nowrap">{item.title}</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Expanded card */}
        <AnimatePresence>
          {openCard !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                className="mt-5 rounded-2xl p-5 sm:p-6 border"
                style={{
                  backgroundColor: "#1E2540",
                  borderColor: news[openCard].accentColor + "30",
                  background: `linear-gradient(135deg, ${news[openCard].accentColor}08 0%, #1E2540 40%)`,
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold text-text-primary">
                    {news[openCard].title}
                  </h3>
                  <button
                    onClick={() => setOpenCard(null)}
                    className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {news[openCard].detail}
                </p>
                <a
                  href={news[openCard].source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                  style={{ color: news[openCard].accentColor }}
                >
                  <ExternalLink size={11} />
                  <span className="underline underline-offset-2">
                    {news[openCard].sourceLabel}
                  </span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
