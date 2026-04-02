"use client";

import { motion } from "framer-motion";

const metriche = [
  {
    num: "01",
    name: "Tasso di conversione",
    target: "≥ 2%",
    description:
      "Su 100 utenti, almeno 2 completano un intervento. Validato sulla base Entraco.",
    color: "text-green-primary",
    border: "border-green-primary/30",
    bg: "bg-green-primary/5",
  },
  {
    num: "02",
    name: "Soddisfazione utente (NPS)",
    target: "≥ 40",
    description:
      "La maggioranza degli utenti raccomanda Karica. Se il punteggio è basso, scalare brucia cassa.",
    color: "text-cyan-accent",
    border: "border-cyan-accent/30",
    bg: "bg-cyan-accent/5",
  },
  {
    num: "03",
    name: "Retention partner",
    target: "≥ 90%",
    description:
      "I partner che entrano devono restare. Senza retention, l'Academy non ha senso economico.",
    color: "text-green-primary",
    border: "border-green-primary/30",
    bg: "bg-green-primary/5",
  },
  {
    num: "04",
    name: "Tempo lead → cantiere",
    target: "≤ 90 giorni",
    description:
      "Il processo deve essere rapido. Se si allunga, il cliente perde fiducia.",
    color: "text-cyan-accent",
    border: "border-cyan-accent/30",
    bg: "bg-cyan-accent/5",
  },
  {
    num: "05",
    name: "Unit economics positivi",
    target: "✓",
    description:
      "Ricavo per utente superiore al costo per utente, misurato su base trimestrale.",
    color: "text-pink-accent",
    border: "border-pink-accent/30",
    bg: "bg-pink-accent/5",
  },
];

export default function Metriche() {
  return (
    <section id="metriche" className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-cyan-accent uppercase tracking-widest text-sm font-semibold mb-4">
            Validazione
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            <span className="text-gradient">5 metriche</span>.
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            L&apos;Atto 2 si sblocca solo quando questi numeri sono dimostrati.
          </p>
        </motion.div>

        {/* Metric rows */}
        <div className="space-y-3">
          {metriche.map((m, i) => (
            <motion.div
              key={m.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-2xl border-l-4 ${m.border} bg-card-bg/50 p-5 sm:p-6 transition-all duration-300 hover:bg-card-bg/80`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                {/* Number */}
                <span className={`text-2xl sm:text-3xl font-black font-mono ${m.color} flex-shrink-0 w-12`}>
                  {m.num}
                </span>

                {/* Name + description */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text-primary mb-1">
                    {m.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Target */}
                <div className={`flex-shrink-0 ${m.bg} rounded-lg px-4 py-2 text-center`}>
                  <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold mb-0.5">
                    Target
                  </p>
                  <p className={`font-mono font-bold text-lg ${m.color}`}>
                    {m.target}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
