"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wrench, TrendingDown, ChevronRight, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Step = {
  icon: LucideIcon;
  step: string;
  title: { it: string; en: string };
  subtitle: { it: string; en: string };
  detail: { it: string; en: string };
  gradient: string;
  accentColor: string;
  iconBg: string;
  tag: { it: string; en: string };
};

const steps: Step[] = [
  {
    icon: Search,
    step: "01",
    title: {
      it: "Scopri quanto sprechi",
      en: "See where you're wasting",
    },
    subtitle: {
      it: "Carica una bolletta, rispondi a poche domande",
      en: "Upload a bill, answer a few quick questions",
    },
    detail: {
      it: "Karica è il tuo consulente energetico gratuito. Carichi una bolletta e rispondi a qualche domanda sulla tua casa — tipo di impianto, anno di costruzione, superficie. In pochi minuti hai un quadro chiaro di quanto spendi, dove sprechi e cosa puoi fare per migliorare.",
      en: "Karica is your free energy advisor. You upload a bill and answer a few questions about your home — heating system, construction year, square metres. In a few minutes you have a clear picture of what you spend, where it's wasted, and what you can do about it.",
    },
    gradient: "from-green-primary/20 via-green-primary/5 to-transparent",
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
    tag: { it: "Gratuita", en: "Free" },
  },
  {
    icon: Wrench,
    step: "02",
    title: {
      it: "Scegli cosa migliorare",
      en: "Choose what to fix",
    },
    subtitle: {
      it: "Consigli su misura, simulatore di risparmio",
      en: "Tailored suggestions, savings simulator",
    },
    detail: {
      it: "Sulla base del tuo profilo energetico, Karica ti suggerisce gli interventi più efficaci per la tua situazione: isolamento, pompa di calore, fotovoltaico, infissi. Per ognuno vedi il costo stimato, il risparmio annuo e in quanto tempo rientri dell'investimento.",
      en: "Based on your energy profile, Karica suggests the most effective retrofits for your situation: insulation, heat pump, solar PV, new windows. For each one you see estimated cost, annual savings and payback time.",
    },
    gradient: "from-cyan-accent/20 via-cyan-accent/5 to-transparent",
    accentColor: "#00D4D4",
    iconBg: "bg-cyan-accent/10",
    tag: { it: "Personalizzata", en: "Personalised" },
  },
  {
    icon: TrendingDown,
    step: "03",
    title: {
      it: "Risparmia davvero",
      en: "Save for real",
    },
    subtitle: {
      it: "Professionisti certificati, risultati misurabili",
      en: "Certified installers, measurable results",
    },
    detail: {
      it: "Se decidi di procedere, i lavori li eseguono professionisti certificati della rete GTI. Finanziamento incluso se serve. Dopo l'intervento, Karica continua a monitorare i tuoi consumi: vedi il risparmio reale mese dopo mese. Puoi anche unirti a una Comunità Energetica per condividere energia e ricevere incentivi.",
      en: "If you decide to go ahead, the work is done by certified installers from the GTI network. Financing included if you need it. After the retrofit, Karica keeps tracking your usage: you see the real savings month after month. You can also join an Energy Community to share power and earn incentives.",
    },
    gradient: "from-green-primary/20 via-green-primary/5 to-transparent",
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
    tag: { it: "Misurabile", en: "Measurable" },
  },
];

const COPY = {
  it: {
    aria: "Come funziona Karica",
    kicker: "Come funziona",
    titleLine1: "Dalla bolletta al risparmio.",
    titleLine2: "In tre passi.",
  },
  en: {
    aria: "How Karica works",
    kicker: "How it works",
    titleLine1: "From bill to savings.",
    titleLine2: "In three steps.",
  },
} as const;

export default function ComeFunziona() {
  const { lang } = useLang();
  const t = COPY[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="come-funziona" aria-label={t.aria} className="relative py-24 sm:py-32 overflow-hidden bg-bg-darker">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            {t.titleLine1}
            <br />
            <span className="text-gradient">{t.titleLine2}</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((s, i) => {
            const isOpen = open === i;
            const Icon = s.icon;

            return (
              <motion.div
                key={s.step}
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
                      { "--tw-ring-color": s.accentColor + "30" } as React.CSSProperties
                    }
                  >
                    {/* Gradient accent */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${s.gradient} opacity-0 transition-opacity duration-500 ${
                        isOpen ? "opacity-100" : "group-hover:opacity-60"
                      }`}
                    />

                    <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                      {/* Step number + icon */}
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${s.iconBg} flex items-center justify-center transition-transform duration-300 ${
                            isOpen ? "scale-110" : "group-hover:scale-105"
                          }`}
                        >
                          <Icon size={22} style={{ color: s.accentColor }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: s.accentColor }}
                          >
                            {s.step}
                          </span>
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              color: s.accentColor,
                              backgroundColor: s.accentColor + "15",
                            }}
                          >
                            {s.tag[lang]}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                          {s.title[lang]}
                        </h3>
                        <p className="text-[11px] sm:text-sm text-text-muted mt-0.5 leading-snug">
                          {s.subtitle[lang]}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight
                        size={20}
                        className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${
                          isOpen ? "rotate-90" : "group-hover:translate-x-1"
                        }`}
                        style={isOpen ? { color: s.accentColor } : undefined}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
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
                          style={{ backgroundColor: s.accentColor + "40" }}
                        />
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {s.detail[lang]}
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
