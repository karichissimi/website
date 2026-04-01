"use client";

import { motion } from "framer-motion";
import { Users, Zap, Coins } from "lucide-react";

const items = [
  {
    icon: Users,
    title: "Entri nella CER",
    text: "Ti colleghi alla Comunità Energetica del tuo quartiere o condominio. Karica gestisce tutto: burocrazia, iscrizione, monitoraggio.",
  },
  {
    icon: Zap,
    title: "Condividi energia",
    text: "Chi produce energia rinnovabile la condivide con i membri della comunità. Tutti ne beneficiano, anche senza pannelli sul tetto.",
  },
  {
    icon: Coins,
    title: "Ricevi l'incentivo",
    text: "Il GSE riconosce un incentivo per l'energia condivisa. Karica ti mostra quanto guadagni e gestisce la distribuzione.",
  },
];

export default function CER() {
  return (
    <section id="cer" className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      {/* Accent glow */}
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-primary/[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-cyan-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Comunità Energetiche
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            Condividi energia con i tuoi vicini.
            <br />
            <span className="text-gradient">Risparmi tutti, guadagni tu.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group card-glow p-6 sm:p-8 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center mb-4 group-hover:bg-cyan-accent/20 group-hover:border-cyan-accent/40 transition-all duration-500">
                  <item.icon className="text-cyan-accent" size={22} />
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
