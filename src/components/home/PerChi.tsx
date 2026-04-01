"use client";

import { motion } from "framer-motion";
import { Home, Building2, Landmark } from "lucide-react";

const targets = [
  {
    icon: Home,
    title: "Famiglie e proprietari",
    description:
      "Capisci quanto sprechi, scopri gli interventi giusti per casa tua e accedi a finanziamenti dedicati. Tutto in un'unica app.",
    accent: "from-green-primary/20 to-transparent",
    iconColor: "text-green-primary",
  },
  {
    icon: Building2,
    title: "Condomini e amministratori",
    description:
      "Diagnosi energetica dell'edificio, coordinamento interventi e accesso alle Comunità Energetiche per risparmiare insieme.",
    accent: "from-cyan-accent/20 to-transparent",
    iconColor: "text-cyan-accent",
  },
  {
    icon: Landmark,
    title: "Imprese e Comuni",
    description:
      "Monitora i consumi, riqualifica gli immobili e partecipa alle CER. Karica orchestra fornitori, finanziamenti e pratiche.",
    accent: "from-pink-accent/20 to-transparent",
    iconColor: "text-pink-accent",
  },
];

export default function PerChi() {
  return (
    <section id="per-chi" className="relative py-24 sm:py-32 bg-bg-dark overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            Per <span className="text-gradient">chi</span> è Karica
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {targets.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group card-glow p-6 sm:p-8 transition-all duration-500"
            >
              <div className="relative z-10">
                {/* Accent gradient top */}
                <div className={`absolute -top-8 -left-8 -right-8 h-32 bg-gradient-to-b ${t.accent} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className={`relative w-14 h-14 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center mb-5 group-hover:border-current transition-colors duration-500 ${t.iconColor}`}>
                  <t.icon size={24} />
                </div>
                <h3 className="relative text-lg font-bold text-text-primary mb-3">
                  {t.title}
                </h3>
                <p className="relative text-sm text-text-secondary leading-relaxed">
                  {t.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
