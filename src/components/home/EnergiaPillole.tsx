"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

type Category = "tutti" | "incentivi" | "normativa" | "mercato" | "tech";

interface NewsItem {
  title: string;
  tag: string;
  category: Category;
  summary: string;
  detail: string;
  source: string;
  sourceLabel: string;
  accentColor: string;
}

const categories: { key: Category; label: string }[] = [
  { key: "tutti", label: "Tutti" },
  { key: "incentivi", label: "Incentivi" },
  { key: "normativa", label: "Normativa" },
  { key: "mercato", label: "Mercato" },
  { key: "tech", label: "Tecnologie" },
];

const news: NewsItem[] = [
  {
    title: "Bonus Casa 2026: detrazione al 50% confermata",
    tag: "50%",
    category: "incentivi",
    summary: "La detrazione per ristrutturazione e efficientamento resta al 50% per la prima casa. Tetto a €96.000.",
    detail: "Nel 2026 sono confermati Bonus Ristrutturazioni ed Ecobonus con le stesse aliquote del 2025. Per la prima casa si detrae il 50%, per le seconde il 36%. Tetto massimo €96.000 per unità immobiliare, in 10 rate annuali.",
    source: "https://www.fiscoetasse.com/new-rassegna-stampa/2812-bonus-casa-2026-cosa-ci-aspetta.html",
    sourceLabel: "FISCOeTASSE",
    accentColor: "#39FF14",
  },
  {
    title: "Case Green: l'Italia deve recepire la direttiva entro maggio",
    tag: "EPBD",
    category: "normativa",
    summary: "Riduzione del 16% delle emissioni residenziali entro il 2030. Oltre il 60% degli edifici italiani è in classe F o G.",
    detail: "Entro il 29 maggio 2026 l'Italia deve recepire la direttiva (UE) 2024/1275. Cambiano le classi energetiche: via le sottoclassi A1-A4, restano dalla A (emissioni zero) alla G. Per i nuovi edifici pubblici sopra i 250 mq, obbligo di pannelli solari dal 31 dicembre 2026.",
    source: "https://www.altroconsumo.it/casa-energia/casa-condominio/news/nuovo-regolamento-ue-classi-energetiche-edifici",
    sourceLabel: "Altroconsumo",
    accentColor: "#FF4D6D",
  },
  {
    title: "Comunità Energetiche: 795 milioni di fondi PNRR",
    tag: "CER",
    category: "incentivi",
    summary: "Tornano i contributi a fondo perduto. Il GSE paga una tariffa incentivante per 20 anni su ogni kWh condiviso.",
    detail: "Il CdM ha approvato il decreto PNRR con 795,5 milioni per le CER. Tariffa GSE di circa 110 €/MWh per impianti fino a 600 kW, con maggiorazioni per comuni sotto i 5.000 abitanti. Lavori da completare entro il 30 giugno 2026.",
    source: "https://www.mrkilowatt.it/news/aggiornamento-incentivi/incentivi-fotovoltaico-2026-torna-il-fondo-perduto-per-cer-e-autoconsumo/",
    sourceLabel: "Mr. Kilowatt",
    accentColor: "#00D4D4",
  },
  {
    title: "Bollette 2026: risparmio di €212 per famiglia",
    tag: "-9%",
    category: "mercato",
    summary: "Prezzi in calo. Gas -12%, elettricità -2%. Ma nel secondo trimestre aumento dell'8% per tensioni geopolitiche.",
    detail: "Spesa annuale per famiglia tipo: €2.236 (da €2.450 nel 2025). Il PUN cala del 4%, il PSV (gas) del 25%. Attenzione: nel Q2 2026 aumento dell'8,1% nel mercato tutelato. Un'offerta a prezzo fisso nel mercato libero può proteggere dalle oscillazioni.",
    source: "https://tg24.sky.it/economia/2025/12/22/bollette-luce-gas-prezzi-2026-dati",
    sourceLabel: "Sky TG24",
    accentColor: "#39FF14",
  },
  {
    title: "Fotovoltaico: da €7.000 per un impianto da 6 kW",
    tag: "FV",
    category: "tech",
    summary: "Con la detrazione al 50% il costo effettivo si dimezza. IVA agevolata al 10% su materiali e installazione.",
    detail: "Un impianto da 6 kW (il più diffuso) costa da €6.599 senza accumulo a €12.599 con batteria. La detrazione del 50% si applica fino a 20 kW anche senza ristrutturazione. Non cumulabile con Conto Termico 3.0 per i privati, salvo installazione con pompa di calore.",
    source: "https://www.enpal.com/it/fotovoltaico/guida-ai-costi-di-impianto-fotovoltaico",
    sourceLabel: "Enpal",
    accentColor: "#00D4D4",
  },
  {
    title: "Conto Termico 3.0: incentivi fino al 65%",
    tag: "65%",
    category: "incentivi",
    summary: "Copre fino al 65% delle spese. Il portale GSE ha registrato un'affluenza senza precedenti e ha sospeso le domande.",
    detail: "Il Conto Termico 3.0 incentiva efficienza energetica e produzione termica da rinnovabili. Dal 2 febbraio 2026 è attivo il PortalTermico 3.0, sospeso dal 3 marzo per affluenza record. I privati non possono usarlo per il solo fotovoltaico — serve l'abbinamento con pompa di calore.",
    source: "https://www.abcontact.it/conto-termico-3-0-2026/",
    sourceLabel: "AB Contact",
    accentColor: "#FF4D6D",
  },
  {
    title: "Pompe di calore: -40% in bolletta rispetto al gas",
    tag: "PDC",
    category: "tech",
    summary: "Riscaldano, raffreddano e producono acqua calda con un unico apparecchio. Incentivabili con Ecobonus e Conto Termico.",
    detail: "La pompa di calore è la tecnologia chiave: un unico apparecchio per riscaldamento, raffrescamento e acqua calda, alimentato da elettricità (idealmente da fotovoltaico). Risparmio fino al 40% vs caldaia a gas. Incentivabile con Ecobonus al 50% o Conto Termico 3.0 fino al 65%.",
    source: "https://www.sienergyconsulting.it/bonus-caldaia-fotovoltaico-2026-novita/",
    sourceLabel: "Sienergy",
    accentColor: "#39FF14",
  },
  {
    title: "Classe energetica: quanto vale la tua casa?",
    tag: "+30%",
    category: "normativa",
    summary: "Un immobile in classe A vale fino al 30% in più. Con la direttiva Case Green, le classi basse perderanno valore.",
    detail: "L'APE è già obbligatorio per vendere o affittare. Con la direttiva EPBD le classi vengono semplificate (da A a G). Gli edifici in classe F e G — oltre il 60% del patrimonio italiano — dovranno essere riqualificati. Chi interviene ora protegge il valore dell'immobile.",
    source: "https://www.giornaletecnologico.net/direttiva-case-green-italia-2026/",
    sourceLabel: "Giornale Tecnologico",
    accentColor: "#00D4D4",
  },
  {
    title: "Superbonus 110%: chiuso definitivamente",
    tag: "STOP",
    category: "normativa",
    summary: "Non più disponibile per l'efficientamento. Resta solo per ricostruzione post-sisma. Le alternative: Ecobonus e Conto Termico.",
    detail: "Il Superbonus 110% è concluso per l'efficientamento energetico. Resta disponibile solo per ricostruzione in aree colpite da terremoti. Le alternative attuali: Ecobonus al 50% (prima casa) o 36% (seconda casa), Conto Termico 3.0 (fino al 65% per interventi specifici).",
    source: "https://aenergy.it/bonus-edilizi-2026/",
    sourceLabel: "AEnergy",
    accentColor: "#FF4D6D",
  },
  {
    title: "Investire in startup innovative: detrazione 65%",
    tag: "INVEST",
    category: "incentivi",
    summary: "Chi investe in una startup come Karica detrae fino al 65% dall'IRPEF. Su €25.000 il costo effettivo è €8.750.",
    detail: "Detrazione IRPEF del 65% (regime de minimis, art. 29-bis D.L. 179/2012) per investimenti fino a €100.000/anno in startup innovative. Mantenimento minimo 3 anni. L'eccedenza diventa credito d'imposta. Karica è iscritta come Startup Innovativa.",
    source: "https://www.mimit.gov.it/it/impresa/competitivita-e-nuove-imprese/start-up-innovative/incentivi-de-minimis",
    sourceLabel: "MIMIT",
    accentColor: "#39FF14",
  },
];

export default function EnergiaPillole() {
  const [activeCategory, setActiveCategory] = useState<Category>("tutti");
  const [openCard, setOpenCard] = useState<number | null>(null);

  const filtered = activeCategory === "tutti"
    ? news
    : news.filter((n) => n.category === activeCategory);

  return (
    <section id="energia" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-bg-darker" />
      <div className="glow-orb absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />
      <div className="glow-orb-slow absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.03] blur-[80px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
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

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setOpenCard(null); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.key
                  ? "bg-green-primary text-bg-dark"
                  : "bg-card-bg border border-card-border text-text-muted hover:text-text-secondary hover:border-card-border/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const globalIndex = news.indexOf(item);
              const isOpen = openCard === globalIndex;

              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className={isOpen ? "sm:col-span-2" : ""}
                >
                  <button
                    onClick={() => setOpenCard(isOpen ? null : globalIndex)}
                    className="w-full text-left group"
                  >
                    <div
                      className={`relative rounded-xl p-4 transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "bg-card-bg ring-1"
                          : "bg-card-bg/40 hover:bg-card-bg ring-0 hover:ring-1"
                      }`}
                      style={
                        { "--tw-ring-color": item.accentColor + "30" } as React.CSSProperties
                      }
                    >
                      <div
                        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                          isOpen ? "opacity-100" : "group-hover:opacity-60"
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${item.accentColor}12 0%, transparent 50%)`,
                        }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span
                                className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
                                style={{
                                  color: item.accentColor,
                                  backgroundColor: item.accentColor + "15",
                                }}
                              >
                                {item.tag}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-text-primary leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs text-text-muted mt-1 leading-relaxed">
                              {item.summary}
                            </p>
                          </div>
                          {isOpen && (
                            <X size={16} className="text-text-muted flex-shrink-0 mt-1" />
                          )}
                        </div>

                        {/* Expanded detail */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-3 border-t border-card-border/50">
                                <p className="text-text-secondary text-sm leading-relaxed mb-3">
                                  {item.detail}
                                </p>
                                <a
                                  href={item.source}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 text-xs text-cyan-accent hover:text-cyan-accent/80 transition-colors"
                                >
                                  <ExternalLink size={10} />
                                  <span className="underline underline-offset-2">
                                    Fonte: {item.sourceLabel}
                                  </span>
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
