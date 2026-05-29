"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, Landmark, ChevronRight, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Target = {
  icon: LucideIcon;
  title: { it: string; en: string };
  subtitle: { it: string; en: string };
  description: { it: string; en: string };
  detail: { it: string; en: string };
  accentColor: string;
  iconBg: string;
  tag: string;
};

const targets: Target[] = [
  {
    icon: Home,
    title: { it: "Famiglie e proprietari", en: "Households & owners" },
    subtitle: {
      it: "Bollette, interventi, finanziamenti",
      en: "Bills, retrofits, financing",
    },
    description: {
      it: "Capisci quanto sprechi, scopri gli interventi giusti per casa tua e accedi a finanziamenti dedicati. Tutto in un'unica app.",
      en: "See where you're wasting, find the right retrofits for your home, tap into dedicated financing. All in one app.",
    },
    detail: {
      it: "Karica analizza le tue bollette reali, ti mostra dove sprechi e ti propone gli interventi più efficaci. Puoi simulare il risparmio, richiedere un preventivo e accedere a finanziamenti green — senza uscire dall'app. Infine monitori il risultato mese dopo mese.",
      en: "Karica reads your real bills, shows you where you're wasting and recommends the most effective retrofits. Simulate the savings, request a quote and access green financing — without leaving the app. Then you monitor the result month after month.",
    },
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
    tag: "B2C",
  },
  {
    icon: Building2,
    title: {
      it: "Condomini e amministratori",
      en: "Condominiums & property managers",
    },
    subtitle: {
      it: "Diagnosi edificio, CER condominiale",
      en: "Building diagnosis, condo Energy Community",
    },
    description: {
      it: "Diagnosi energetica dell'edificio, coordinamento interventi e accesso alle Comunità Energetiche per risparmiare insieme.",
      en: "Energy diagnosis of the whole building, retrofit coordination and access to Energy Communities to save together.",
    },
    detail: {
      it: "L'amministratore ottiene una diagnosi completa del condominio e può coordinare interventi collettivi: cappotto, caldaia centralizzata, fotovoltaico su tetto. Karica gestisce anche l'attivazione della CER condominiale e la distribuzione degli incentivi GSE tra i condomini.",
      en: "Property managers get a complete diagnosis of the building and can coordinate collective retrofits: external insulation, central heating, rooftop PV. Karica also handles activation of the condo Energy Community and distribution of GSE incentives among residents.",
    },
    accentColor: "#00D4D4",
    iconBg: "bg-cyan-accent/10",
    tag: "B2B",
  },
  {
    icon: Landmark,
    title: { it: "Imprese e Comuni", en: "Businesses & municipalities" },
    subtitle: {
      it: "Monitoraggio consumi, riqualificazione",
      en: "Consumption monitoring, retrofitting",
    },
    description: {
      it: "Monitora i consumi, riqualifica gli immobili e partecipa alle CER. Karica orchestra fornitori, finanziamenti e pratiche.",
      en: "Monitor consumption, retrofit buildings and join Energy Communities. Karica orchestrates suppliers, financing and paperwork.",
    },
    detail: {
      it: "Per le PMI e i Comuni, Karica diventa il cruscotto energetico. Monitoraggio consumi su più sedi, gestione delle pratiche di riqualificazione, accesso a incentivi e finanziamenti green. GTI esegue i lavori, Karica orchestra tutto il processo digitale.",
      en: "For SMEs and municipalities, Karica becomes the energy cockpit. Multi-site consumption monitoring, retrofit paperwork, access to incentives and green financing. GTI executes the works, Karica orchestrates the entire digital workflow.",
    },
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
    tag: "B2G",
  },
];

const COPY = {
  it: {
    aria: "Per chi è pensato Karica",
    kicker: "Per chi",
    titleLine1: "Un'unica piattaforma,",
    titleLine2: "tre mondi diversi.",
  },
  en: {
    aria: "Who Karica is for",
    kicker: "Who it's for",
    titleLine1: "One platform,",
    titleLine2: "three different worlds.",
  },
} as const;

export default function PerChi() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="per-chi" aria-label={c.aria} className="relative py-24 sm:py-32 overflow-hidden bg-bg-dark">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {c.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            {c.titleLine1}
            <br />
            <span className="text-gradient">{c.titleLine2}</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {targets.map((target, i) => {
            const isOpen = open === i;
            const Icon = target.icon;

            return (
              <motion.div
                key={target.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full group"
                >
                  <div
                    className={`relative rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-card-bg ring-1"
                        : "bg-card-bg/50 hover:bg-card-bg ring-0 hover:ring-1"
                    }`}
                    style={
                      { "--tw-ring-color": target.accentColor + "30" } as React.CSSProperties
                    }
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
                        isOpen ? "opacity-100" : "group-hover:opacity-60"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${target.accentColor}15 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                      <div
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${target.iconBg} flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? "scale-110" : "group-hover:scale-105"
                        }`}
                      >
                        <Icon size={22} style={{ color: target.accentColor }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              color: target.accentColor,
                              backgroundColor: target.accentColor + "15",
                            }}
                          >
                            {target.tag}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                          {target.title[lang]}
                        </h3>
                        <p className="text-[11px] sm:text-sm text-text-muted mt-0.5 leading-snug">
                          {target.subtitle[lang]}
                        </p>
                      </div>

                      <ChevronRight
                        size={20}
                        className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${
                          isOpen ? "rotate-90" : "group-hover:translate-x-1"
                        }`}
                        style={isOpen ? { color: target.accentColor } : undefined}
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
                      <div className="px-5 sm:px-6 pb-5 pt-3 ml-16 sm:ml-19">
                        <div
                          className="w-8 h-0.5 rounded-full mb-3"
                          style={{ backgroundColor: target.accentColor + "40" }}
                        />
                        <p className="text-text-secondary text-sm leading-relaxed mb-2">
                          {target.detail[lang]}
                        </p>
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
