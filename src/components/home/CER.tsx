"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Zap, Coins, ChevronRight } from "lucide-react";

const items = [
  {
    icon: Users,
    title: "Entri nella CER",
    subtitle: "Iscrizione automatica, zero burocrazia",
    text: "Ti colleghi alla Comunità Energetica del tuo quartiere o condominio. Karica gestisce tutto: burocrazia, iscrizione, monitoraggio.",
    detail:
      "Una Comunità Energetica Rinnovabile (CER) è un gruppo di persone che condivide energia rinnovabile prodotta localmente. Karica trova la CER più vicina a te, gestisce l'iscrizione e monitora la tua partecipazione. Non devi fare nulla: ci pensiamo noi.",
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
  },
  {
    icon: Zap,
    title: "Condividi energia",
    subtitle: "Benefici anche senza pannelli",
    text: "Chi produce energia rinnovabile la condivide con i membri della comunità. Tutti ne beneficiano, anche senza pannelli sul tetto.",
    detail:
      "Non serve avere pannelli solari sul tetto. Basta far parte della CER per beneficiare dell'energia prodotta da altri membri. L'energia condivisa viene tracciata automaticamente e ogni membro riceve la sua quota di incentivo in proporzione ai consumi.",
    accentColor: "#00D4D4",
    iconBg: "bg-cyan-accent/10",
  },
  {
    icon: Coins,
    title: "Ricevi l'incentivo",
    subtitle: "Incentivo GSE gestito da Karica",
    text: "Il GSE riconosce un incentivo per l'energia condivisa. Karica ti mostra quanto guadagni e gestisce la distribuzione.",
    detail:
      "Il Gestore dei Servizi Energetici (GSE) riconosce un incentivo economico per ogni kWh di energia condivisa nella CER. Karica calcola la tua quota, ti mostra quanto guadagni nella dashboard e gestisce la distribuzione. Tu vedi i soldi arrivare, senza pensare a nulla.",
    accentColor: "#FF4D6D",
    iconBg: "bg-pink-accent/10",
  },
];

export default function CER() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="cer" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-darker to-bg-dark" />
      <div className="glow-orb absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-cyan-accent/[0.05] blur-[140px]" />
      <div className="glow-orb-slow absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-green-primary/[0.04] blur-[80px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyan-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Comunità Energetiche
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            Condividi energia con i tuoi vicini.
            <br />
            <span className="text-gradient">Risparmi tutti, guadagni tu.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = open === i;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                      { "--tw-ring-color": item.accentColor + "30" } as React.CSSProperties
                    }
                  >
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                        isOpen ? "opacity-100" : "group-hover:opacity-60"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${item.accentColor}15 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                      <div
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${item.iconBg} flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? "scale-110" : "group-hover:scale-105"
                        }`}
                      >
                        <Icon size={22} style={{ color: item.accentColor }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                          {item.title}
                        </h3>
                        <p className="text-sm text-text-muted mt-0.5 hidden sm:block">
                          {item.subtitle}
                        </p>
                      </div>

                      <ChevronRight
                        size={20}
                        className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${
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
                      <div className="px-5 sm:px-6 pb-5 pt-3 ml-16 sm:ml-19">
                        <div
                          className="w-8 h-0.5 rounded-full mb-3"
                          style={{ backgroundColor: item.accentColor + "40" }}
                        />
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {item.detail}
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
