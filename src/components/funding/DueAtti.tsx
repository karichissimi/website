"use client";

import { motion } from "framer-motion";

export default function DueAtti() {
  return (
    <section id="strategia" className="relative py-24 sm:py-32 bg-bg-dark overflow-hidden">
      {/* Glow orbs */}
      <div className="glow-orb absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-primary/[0.04] blur-[100px]" />
      <div className="glow-orb-slow absolute -bottom-48 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[100px]" />
      <div className="glow-orb absolute top-1/2 -right-64 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.03] blur-[80px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-green-primary uppercase tracking-widest text-sm font-semibold mb-4">
            La strategia
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary">
            Due atti, <span className="text-gradient">un piano</span>.
          </h2>
        </motion.div>

        {/* Two Act Cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {/* Act 1 — Green accent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group card-glow p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(57,255,20,0.12)]"
          >
            <div className="relative z-10">
              <span className="inline-block bg-green-primary/20 text-green-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
                2026–2027
              </span>
              <h3 className="text-xl font-bold text-text-primary mb-1">
                Atto 1 — Il Laboratorio
              </h3>
              <p className="text-green-primary font-semibold text-sm mb-4">
                Pre-seed €500k
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Ambiente controllato. Entraco porta 5.000 clienti reali, ENERBee
                esegue i lavori. Validiamo il modello, dimostriamo che funziona.
                EBITDA positivo dal primo anno. Fee al 10-12% — Karica genera lead e consulenza base.
              </p>
              <p className="text-xs text-text-muted italic border-t border-card-border/50 pt-4">
                Come Airbnb: prima una citt&agrave;, poi il mondo.
              </p>
            </div>
          </motion.div>

          {/* Act 2 — Cyan accent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group card-glow p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,212,0.12)]"
          >
            <div className="relative z-10">
              <span className="inline-block bg-cyan-accent/20 text-cyan-accent text-xs font-bold px-3 py-1 rounded-full mb-4">
                2028–2030
              </span>
              <h3 className="text-xl font-bold text-text-primary mb-1">
                Atto 2 — Il Marketplace Aperto
              </h3>
              <p className="text-cyan-accent font-semibold text-sm mb-4">
                Seed €1,5M
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Si scala. La Karica Academy costruisce la rete di partner
                certificati. Le Digital Operations automatizzano il processo. La
                fee sale al 15-20% perch&eacute; Karica gestisce l&apos;intero percorso end-to-end.
              </p>
              <p className="text-xs text-text-muted italic border-t border-card-border/50 pt-4">
                Si entra nell&apos;Atto 2 solo con le metriche validate.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Key message box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="bg-green-primary/5 border border-green-primary/20 rounded-2xl p-6 sm:p-8 text-center"
        >
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Non passiamo alla fase 2 finch&eacute; la fase 1 non &egrave;
            perfettamente collaudata. I{" "}
            <strong className="text-green-primary">€500k</strong> comprano
            questo diritto: il diritto di perfezionare senza fretta.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
