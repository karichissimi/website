"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";

const COPY = {
  it: {
    aria: "Energia in pillole — novità e incentivi",
    kicker: "Energia in pillole",
    titlePre: "Quello che devi sapere. ",
    titleHighlight: "Oggi.",
    subLabel: "Le novità del momento",
    readMore: "Leggi →",
    showLess: "Mostra meno",
    showMore: "Scopri di più",
    sourcePrefix: "Fonte:",
    close: "Chiudi",
    closeAria: "Chiudi",
  },
  en: {
    aria: "Energy briefings — news and incentives",
    kicker: "Energy briefings",
    titlePre: "What you need to know. ",
    titleHighlight: "Today.",
    subLabel: "Top stories right now",
    readMore: "Read →",
    showLess: "Show less",
    showMore: "Show more",
    sourcePrefix: "Source:",
    close: "Close",
    closeAria: "Close",
  },
} as const;

const INITIAL_VISIBLE = 6;

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
    detail: "Entro il 29 maggio 2026 l'Italia deve recepire la direttiva (UE) 2024/1275. Obiettivo: -16% emissioni residenziali entro il 2030. Cambiano le classi energetiche. Il 54% degli edifici italiani è in classe F o G — il gap più ampio d'Europa.",
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
];

export default function EnergiaPillole() {
  const { lang } = useLang();
  const t = COPY[lang];
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const visibleNews = showAll ? news : news.slice(0, INITIAL_VISIBLE);
  const hiddenCount = news.length - INITIAL_VISIBLE;

  // Lock body scroll while modal is open
  useEffect(() => {
    if (openCard !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openCard]);

  // ESC closes the modal
  useEffect(() => {
    if (openCard === null) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCard(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [openCard]);

  function toggleShowAll() {
    const next = !showAll;
    setShowAll(next);
    // If collapsing and the currently-open card is about to be hidden, close it
    if (!next && openCard !== null && openCard >= INITIAL_VISIBLE) {
      setOpenCard(null);
    }
    // Keep the toggle button anchored under the user's eye after the layout
    // change, so the page doesn't appear to "jump" out from under their finger
    if (next) {
      requestAnimationFrame(() => {
        toggleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  return (
    <section id="energia" aria-label={t.aria} className="relative py-24 sm:py-32 overflow-hidden bg-bg-darker">
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            {t.titlePre}
            <span className="text-gradient">{t.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Sub-label introducing the news grid */}
        <div className="mb-5">
          <p className="text-cyan-accent text-sm uppercase tracking-widest font-semibold">
            {t.subLabel}
          </p>
        </div>

        {/* Bento-style grid: compact cards, numbers as visual protagonists */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {visibleNews.map((item, i) => {
            const isOpen = openCard === i;
            return (
              <motion.button
                key={item.title}
                onClick={() => setOpenCard(isOpen ? null : i)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.35, delay: Math.min(i, INITIAL_VISIBLE - 1) * 0.04 }}
                className="group relative overflow-hidden rounded-xl p-4 sm:p-5 text-left border transition-colors duration-300 min-h-[124px] sm:min-h-[140px] flex flex-col justify-between"
                style={{
                  background: `linear-gradient(135deg, ${item.accentColor}14 0%, ${item.accentColor}06 45%, transparent 100%)`,
                  borderColor: isOpen ? item.accentColor : `${item.accentColor}30`,
                  boxShadow: isOpen
                    ? `0 6px 24px ${item.accentColor}25, inset 0 0 30px ${item.accentColor}12`
                    : undefined,
                }}
              >
                {/* Ambient glow (hover only) */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 40px ${item.accentColor}18` }}
                />

                {/* Big tag / number — brand sans, not mono */}
                <span
                  className="relative z-10 block text-3xl sm:text-4xl font-black leading-none tracking-tight mb-2"
                  style={{ color: item.accentColor }}
                >
                  {item.tag}
                </span>

                {/* Title + micro CTA */}
                <div className="relative z-10">
                  <p className="text-xs sm:text-sm font-bold text-text-primary leading-snug mb-1 line-clamp-2">
                    {item.title}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-wider font-semibold transition-all"
                    style={{ color: item.accentColor, opacity: isOpen ? 1 : 0.55 }}
                  >
                    {t.readMore}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Show more / Show less toggle */}
        {hiddenCount > 0 && (
          <div className="mt-5 flex justify-center">
            <button
              ref={toggleRef}
              onClick={toggleShowAll}
              className="btn-press-soft group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-accent hover:text-cyan-accent/80 transition-colors px-4 py-2"
            >
              {showAll ? (
                <>
                  {t.showLess}
                  <ChevronDown size={14} className="rotate-180 transition-transform" />
                </>
              ) : (
                <>
                  {t.showMore} <span className="text-text-muted font-normal">(+{hiddenCount})</span>
                  <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}

      </div>

      {/* News detail modal — opens over the viewport, not inline. User reads
          without scrolling, closes via X / backdrop / ESC */}
      <AnimatePresence>
        {openCard !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpenCard(null)}
              className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg max-h-[85vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label={news[openCard].title}
            >
              <div
                className="relative rounded-2xl p-6 sm:p-8 border-2"
                style={{
                  borderColor: news[openCard].accentColor + "60",
                  background: `linear-gradient(155deg, ${news[openCard].accentColor}1a 0%, #161B2E 45%)`,
                  boxShadow: `0 24px 64px ${news[openCard].accentColor}25, 0 20px 60px rgba(0,0,0,0.55)`,
                }}
              >
                <button
                  onClick={() => setOpenCard(null)}
                  aria-label={t.closeAria}
                  className="absolute top-3 right-3 p-2 text-text-muted hover:text-text-primary hover:bg-card-bg/70 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Big tag */}
                <span
                  className="block text-5xl sm:text-6xl font-black leading-none tracking-tight mb-5 pr-10"
                  style={{ color: news[openCard].accentColor }}
                >
                  {news[openCard].tag}
                </span>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight mb-4">
                  {news[openCard].title}
                </h3>

                {/* Detail */}
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
                  {news[openCard].detail}
                </p>

                {/* Source + close action */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-card-border/50">
                  <a
                    href={news[openCard].source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors"
                    style={{ color: news[openCard].accentColor }}
                  >
                    <ExternalLink size={14} />
                    <span className="underline underline-offset-2">
                      {t.sourcePrefix} {news[openCard].sourceLabel}
                    </span>
                  </a>
                  <button
                    onClick={() => setOpenCard(null)}
                    className="text-xs sm:text-sm font-semibold text-text-muted hover:text-text-primary transition-colors"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
