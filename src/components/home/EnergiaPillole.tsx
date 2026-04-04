"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ExternalLink, Zap } from "lucide-react";

const news = [
  {
    title: "Bonus Casa 2026: detrazione al 50% confermata",
    summary: "La detrazione per ristrutturazione e efficientamento energetico resta al 50% per la prima casa (36% per le seconde). Tetto di spesa confermato a €96.000.",
    detail: "Nel 2026 sono confermati il Bonus Ristrutturazioni e l'Ecobonus con le stesse aliquote del 2025. Per la prima casa si detrae il 50% delle spese sostenute, per le seconde case il 36%. Il tetto massimo di spesa è €96.000 per unità immobiliare. La detrazione si spalma in 10 rate annuali di pari importo.",
    source: "https://www.fiscoetasse.com/new-rassegna-stampa/2812-bonus-casa-2026-cosa-ci-aspetta.html",
    sourceLabel: "FISCOeTASSE.com",
    accentColor: "#39FF14",
  },
  {
    title: "Direttiva Case Green: l'Italia deve recepirla entro maggio 2026",
    summary: "La direttiva europea EPBD impone di ridurre del 16% le emissioni degli edifici residenziali entro il 2030. L'Italia ha il patrimonio edilizio più vecchio d'Europa.",
    detail: "Entro il 29 maggio 2026 l'Italia deve recepire la direttiva (UE) 2024/1275. Oltre il 60% degli edifici italiani è in classe F o G. Cambiano le classi energetiche: via le sottoclassi A1-A4, restano dalla A (emissioni zero) alla G. Per i nuovi edifici pubblici sopra i 250 mq, obbligo di pannelli solari dal 31 dicembre 2026.",
    source: "https://www.altroconsumo.it/casa-energia/casa-condominio/news/nuovo-regolamento-ue-classi-energetiche-edifici",
    sourceLabel: "Altroconsumo",
    accentColor: "#FF4D6D",
  },
  {
    title: "Comunità Energetiche: 795 milioni di fondi PNRR riattivati",
    summary: "Tornano i contributi a fondo perduto per le CER. Il GSE eroga una tariffa incentivante per 20 anni su ogni kWh condiviso. Puoi partecipare anche senza pannelli.",
    detail: "Il Consiglio dei Ministri ha approvato il nuovo decreto PNRR con 795,5 milioni per le CER. La tariffa incentivante del GSE è di circa 110 €/MWh per impianti fino a 600 kW, con maggiorazioni per i comuni sotto i 5.000 abitanti. I lavori devono essere completati entro il 30 giugno 2026 e gli impianti in esercizio entro dicembre 2027.",
    source: "https://www.mrkilowatt.it/news/aggiornamento-incentivi/incentivi-fotovoltaico-2026-torna-il-fondo-perduto-per-cer-e-autoconsumo/",
    sourceLabel: "Mr. Kilowatt",
    accentColor: "#00D4D4",
  },
  {
    title: "Bollette 2026: risparmio stimato di €212 per famiglia",
    summary: "Prezzi in calo del 9% rispetto al 2025. Il gas scende del 12%, l'elettricità del 2%. Ma attenzione: nel secondo trimestre aumento dell'8% per tensioni geopolitiche.",
    detail: "Secondo le stime, la spesa annuale per una famiglia tipo scende a €2.236 (da €2.450 nel 2025). Il PUN (prezzo energia all'ingrosso) cala del 4%, il PSV (gas) del 25%. Tuttavia, il mercato resta volatile: nel Q2 2026 si registra un aumento dell'8,1% nel mercato tutelato. Passare al mercato libero con un'offerta a prezzo fisso può proteggere dalle oscillazioni.",
    source: "https://tg24.sky.it/economia/2025/12/22/bollette-luce-gas-prezzi-2026-dati",
    sourceLabel: "Sky TG24",
    accentColor: "#39FF14",
  },
  {
    title: "Fotovoltaico residenziale: da €7.000 chiavi in mano",
    summary: "Un impianto da 6 kW costa tra €7.000 e €13.000. Con la detrazione al 50% il costo effettivo si dimezza. IVA agevolata al 10% su materiali e installazione.",
    detail: "Nel 2026 un impianto fotovoltaico da 6 kW (il più diffuso per uso residenziale) costa da €6.599 senza accumulo a €12.599 con batteria. La detrazione del 50% si applica fino a 20 kW anche senza ristrutturazione. L'IVA è ridotta dal 22% al 10%. Non è possibile cumulare con il Conto Termico 3.0 per i privati, salvo installazione contestuale a pompa di calore.",
    source: "https://www.enpal.com/it/fotovoltaico/guida-ai-costi-di-impianto-fotovoltaico",
    sourceLabel: "Enpal",
    accentColor: "#00D4D4",
  },
  {
    title: "Conto Termico 3.0: incentivi fino al 65%",
    summary: "Il nuovo Conto Termico copre fino al 65% delle spese per efficientamento energetico. Il portale GSE ha registrato un'affluenza senza precedenti.",
    detail: "Il Conto Termico 3.0 incentiva interventi di efficienza energetica e produzione di energia termica da fonti rinnovabili. Il contributo arriva fino al 65% delle spese. Dal 2 febbraio 2026 è attivo il PortalTermico 3.0, ma il GSE ha sospeso temporaneamente le domande il 3 marzo per l'affluenza record. Attenzione: i privati non possono usarlo per il solo fotovoltaico, solo se abbinato a pompa di calore.",
    source: "https://www.abcontact.it/conto-termico-3-0-2026/",
    sourceLabel: "AB Contact",
    accentColor: "#FF4D6D",
  },
  {
    title: "Pompe di calore: il futuro del riscaldamento domestico",
    summary: "Le pompe di calore sostituiscono caldaie a gas con risparmi fino al 40% in bolletta. Incentivabili con Ecobonus 50% e Conto Termico 3.0.",
    detail: "La pompa di calore è la tecnologia chiave della transizione energetica domestica: riscalda, raffredda e produce acqua calda con un unico apparecchio, usando energia elettrica (idealmente da fotovoltaico). Il risparmio rispetto a una caldaia a gas può arrivare al 40%. Con il Conto Termico 3.0 si può ottenere fino al 65% di contributo. Con l'Ecobonus si detrae il 50%.",
    source: "https://www.sienergyconsulting.it/bonus-caldaia-fotovoltaico-2026-novita/",
    sourceLabel: "Sienergy",
    accentColor: "#39FF14",
  },
  {
    title: "Classe energetica: perché conta per il valore della tua casa",
    summary: "Un immobile in classe A vale fino al 30% in più rispetto alla stessa casa in classe G. Con la direttiva Case Green, le classi basse perderanno ulteriore valore.",
    detail: "L'Attestato di Prestazione Energetica (APE) è già obbligatorio per vendere o affittare. Con la direttiva EPBD, le classi energetiche vengono semplificate (da A a G, senza sottoclassi). Gli edifici in classe F e G — oltre il 60% del patrimonio italiano — dovranno essere riqualificati progressivamente. Chi interviene ora protegge il valore dell'immobile e anticipa gli obblighi.",
    source: "https://www.giornaletecnologico.net/direttiva-case-green-italia-2026/",
    sourceLabel: "Giornale Tecnologico",
    accentColor: "#00D4D4",
  },
  {
    title: "Superbonus: chiuso per i privati, resta solo per il sisma",
    summary: "Il Superbonus 110% non è più disponibile per l'efficientamento energetico. Resta attivo solo per interventi di ricostruzione in zone colpite da terremoti.",
    detail: "Il Superbonus 110% è definitivamente concluso per i lavori di efficientamento energetico. Nel 2026 rimane disponibile esclusivamente per interventi di ricostruzione post-sismica nelle aree colpite da eventi sismici. Per l'efficientamento, le alternative attuali sono l'Ecobonus al 50% (prima casa) o 36% (seconda casa) e il Conto Termico 3.0 (fino al 65% per interventi specifici).",
    source: "https://aenergy.it/bonus-edilizi-2026/",
    sourceLabel: "AEnergy",
    accentColor: "#FF4D6D",
  },
  {
    title: "Investire in startup innovative: detrazione fino al 65%",
    summary: "Chi investe in una startup innovativa come Karica può detrarre fino al 65% dell'importo investito dall'IRPEF. Su €25.000 investiti, il costo effettivo è €8.750.",
    detail: "La detrazione IRPEF del 65% (regime de minimis, art. 29-bis D.L. 179/2012) si applica a investimenti fino a €100.000/anno in startup innovative. Richiede il mantenimento per almeno 3 anni. Se la detrazione supera l'imposta, l'eccedenza diventa credito d'imposta. Karica S.r.l. è iscritta nella sezione speciale del Registro Imprese come Startup Innovativa.",
    source: "https://www.mimit.gov.it/it/impresa/competitivita-e-nuove-imprese/start-up-innovative/incentivi-de-minimis",
    sourceLabel: "MIMIT",
    accentColor: "#39FF14",
  },
];

export default function EnergiaPillole() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="energia" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-bg-dark" />
      <div className="glow-orb absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-green-primary" size={16} />
            <p className="text-green-primary font-semibold text-sm uppercase tracking-widest">
              Energia in pillole
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            Quello che devi sapere.
            <br />
            <span className="text-gradient">Oggi.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {news.map((item, i) => {
            const isOpen = open === i;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full group"
                >
                  <div
                    className={`relative rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-card-bg ring-1"
                        : "bg-card-bg/50 hover:bg-card-bg ring-0 hover:ring-1"
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
                        background: `linear-gradient(135deg, ${item.accentColor}10 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-start gap-3">
                      <div
                        className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: item.accentColor + "60" }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-text-primary leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        className={`flex-shrink-0 text-text-muted mt-1 transition-transform duration-300 ${
                          isOpen ? "rotate-90" : "group-hover:translate-x-1"
                        }`}
                        style={isOpen ? { color: item.accentColor } : undefined}
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-4 pt-2 ml-4">
                        <div
                          className="w-6 h-0.5 rounded-full mb-3"
                          style={{ backgroundColor: item.accentColor + "40" }}
                        />
                        <p className="text-text-secondary text-sm leading-relaxed mb-3">
                          {item.detail}
                        </p>
                        <a
                          href={item.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-cyan-accent hover:text-cyan-accent/80 transition-colors"
                        >
                          <ExternalLink size={10} />
                          <span className="underline underline-offset-2">
                            {item.sourceLabel}
                          </span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
