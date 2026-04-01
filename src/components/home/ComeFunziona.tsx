"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wrench, TrendingDown, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Scopri quanto sprechi",
    subtitle: "Diagnosi in 2 minuti, zero dati da inserire",
    detail:
      "Karica si collega ai dati reali del tuo fornitore di energia. Vedi esattamente quanto spendi, quanto sprechi e come ti posizioni rispetto a case simili alla tua. Niente bollette da fotografare — è tutto già pronto grazie alla partnership con Entraco.",
    gradient: "from-green-primary/20 via-green-primary/5 to-transparent",
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
    tag: "Automatica",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Scegli cosa migliorare",
    subtitle: "Simulatore ROI, preventivi inclusi",
    detail:
      "In base ai tuoi consumi reali, Karica ti propone gli interventi più efficaci: isolamento, pompa di calore, fotovoltaico, infissi. Per ognuno vedi il costo stimato, il risparmio annuo e il tempo di rientro. I lavori li esegue ENERBee, il nostro General Contractor.",
    gradient: "from-cyan-accent/20 via-cyan-accent/5 to-transparent",
    accentColor: "#00D4D4",
    iconBg: "bg-cyan-accent/10",
    tag: "Personalizzata",
  },
  {
    icon: TrendingDown,
    step: "03",
    title: "Risparmia davvero",
    subtitle: "Monitoraggio continuo, incentivi CER",
    detail:
      "Dopo l'intervento, Karica monitora i tuoi consumi mese dopo mese. Vedi quanto stai risparmiando rispetto a prima. Puoi unirti a una Comunità Energetica e ricevere un incentivo dal GSE per l'energia condivisa. Il risparmio diventa visibile e concreto.",
    gradient: "from-pink-accent/20 via-pink-accent/5 to-transparent",
    accentColor: "#FF4D6D",
    iconBg: "bg-pink-accent/10",
    tag: "Misurabile",
  },
];

export default function ComeFunziona() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="come-funziona" className="relative py-24 sm:py-32 overflow-hidden bg-bg-darker">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Come funziona
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            Dalla bolletta al risparmio.
            <br />
            <span className="text-gradient">In tre passi.</span>
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
                            {s.tag}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                          {s.title}
                        </h3>
                        <p className="text-sm text-text-muted mt-0.5 hidden sm:block">
                          {s.subtitle}
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
                          {s.detail}
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
