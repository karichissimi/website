"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, Landmark, ChevronRight } from "lucide-react";

const targets = [
  {
    icon: Home,
    title: "Famiglie e proprietari",
    subtitle: "Bollette, interventi, finanziamenti",
    description:
      "Capisci quanto sprechi, scopri gli interventi giusti per casa tua e accedi a finanziamenti dedicati. Tutto in un'unica app.",
    detail:
      "Karica analizza le tue bollette reali, ti mostra dove sprechi e ti propone gli interventi più efficaci. Puoi simulare il risparmio, richiedere un preventivo e accedere a finanziamenti green — senza uscire dall'app. Infine monitori il risultato mese dopo mese.",
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
    tag: "B2C",
  },
  {
    icon: Building2,
    title: "Condomini e amministratori",
    subtitle: "Diagnosi edificio, CER condominiale",
    description:
      "Diagnosi energetica dell'edificio, coordinamento interventi e accesso alle Comunità Energetiche per risparmiare insieme.",
    detail:
      "L'amministratore ottiene una diagnosi completa del condominio e può coordinare interventi collettivi: cappotto, caldaia centralizzata, fotovoltaico su tetto. Karica gestisce anche l'attivazione della CER condominiale e la distribuzione degli incentivi GSE tra i condomini.",
    accentColor: "#00D4D4",
    iconBg: "bg-cyan-accent/10",
    tag: "B2B",
  },
  {
    icon: Landmark,
    title: "Imprese e Comuni",
    subtitle: "Monitoraggio consumi, riqualificazione",
    description:
      "Monitora i consumi, riqualifica gli immobili e partecipa alle CER. Karica orchestra fornitori, finanziamenti e pratiche.",
    detail:
      "Per le PMI e i Comuni, Karica diventa il cruscotto energetico. Monitoraggio consumi su più sedi, gestione delle pratiche di riqualificazione, accesso a incentivi e finanziamenti green. ENERBee esegue i lavori, Karica orchestra tutto il processo digitale.",
    accentColor: "#FF4D6D",
    iconBg: "bg-pink-accent/10",
    tag: "B2G",
  },
];

export default function PerChi() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="per-chi" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background with gradient mesh */}
      <div className="absolute inset-0 bg-bg-dark" />
      <div className="glow-orb absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.04] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-pink-accent/[0.04] blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyan-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Per chi
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            Un&apos;unica piattaforma,
            <br />
            <span className="text-gradient">tre mondi diversi.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {targets.map((t, i) => {
            const isOpen = open === i;
            const Icon = t.icon;

            return (
              <motion.div
                key={t.title}
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
                      { "--tw-ring-color": t.accentColor + "30" } as React.CSSProperties
                    }
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
                        isOpen ? "opacity-100" : "group-hover:opacity-60"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${t.accentColor}15 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                      <div
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${t.iconBg} flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? "scale-110" : "group-hover:scale-105"
                        }`}
                      >
                        <Icon size={22} style={{ color: t.accentColor }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              color: t.accentColor,
                              backgroundColor: t.accentColor + "15",
                            }}
                          >
                            {t.tag}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                          {t.title}
                        </h3>
                        <p className="text-sm text-text-muted mt-0.5 hidden sm:block">
                          {t.subtitle}
                        </p>
                      </div>

                      <ChevronRight
                        size={20}
                        className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${
                          isOpen ? "rotate-90" : "group-hover:translate-x-1"
                        }`}
                        style={isOpen ? { color: t.accentColor } : undefined}
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
                          style={{ backgroundColor: t.accentColor + "40" }}
                        />
                        <p className="text-text-secondary text-sm leading-relaxed mb-2">
                          {t.detail}
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
