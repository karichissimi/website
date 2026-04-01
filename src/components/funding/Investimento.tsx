"use client";

import { motion } from "framer-motion";
import Accordion from "../Accordion";
import { Shield, CheckCircle, Clock } from "lucide-react";
import GlowOrbs from "../GlowOrbs";

export default function Investimento() {
  return (
    <section id="investimento" className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      <GlowOrbs />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            Come funziona{" "}
            <span className="text-gradient">l&apos;investimento</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Struttura semplice, protezione concreta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-glow p-6 sm:p-8 mb-10"
        >
          <div className="relative z-10 space-y-4">
            {[
              { label: "Investimento totale round", value: "€500.000", accent: true },
              { label: "Valutazione pre-money", value: "€2.000.000", accent: true },
              { label: "Quota equity per l'investitore", value: "20%", accent: true },
              { label: "Ticket minimo", value: "€25.000", accent: false },
              { label: "Strumento", value: "Quote di categoria B", accent: false },
              { label: "Rendimento garantito", value: "8% annuo per 24 mesi (PIK)", accent: true },
              { label: "Floor garantito", value: "€583.200 su €500k investiti", accent: true },
              { label: "Lock-up", value: "24 mesi", accent: false },
            ].map((row, i, arr) => (
              <div key={row.label} className={`flex items-center justify-between py-2.5 ${i < arr.length - 1 ? "border-b border-card-border/50" : ""}`}>
                <span className="text-text-secondary text-sm">{row.label}</span>
                <span className={`font-bold text-sm font-mono ${row.accent ? "text-green-primary" : "text-text-primary"}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: Shield, title: "Floor garantito", text: "Ricevi almeno €583.200 su €500k.", color: "text-green-primary", border: "border-green-primary/20 hover:border-green-primary/40", bg: "bg-green-primary/5 hover:bg-green-primary/10" },
            { icon: CheckCircle, title: "Milestone verificabili", text: "Due tranche da €250k legate a risultati.", color: "text-cyan-accent", border: "border-cyan-accent/20 hover:border-cyan-accent/40", bg: "bg-cyan-accent/5 hover:bg-cyan-accent/10" },
            { icon: Clock, title: "EBITDA dal giorno uno", text: "I soldi non coprono perdite.", color: "text-pink-accent", border: "border-pink-accent/20 hover:border-pink-accent/40", bg: "bg-pink-accent/5 hover:bg-pink-accent/10" },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className={`rounded-xl p-5 text-center border transition-all duration-300 ${item.border} ${item.bg}`}>
              <item.icon className={`mx-auto mb-3 ${item.color}`} size={28} />
              <h3 className="text-text-primary font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-text-muted text-xs">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-3">
          <Accordion title="Cosa significa rendimento PIK 8%?">
            <div className="text-text-secondary text-sm space-y-3">
              <p>PIK = <strong className="text-green-primary">&quot;Payment In Kind&quot;</strong>: il rendimento matura senza toccare la cassa.</p>
              <p>Investi €500.000 → dopo 24 mesi hai diritto ad almeno €583.200. Liquidato alla scadenza, exit o dividendi.</p>
            </div>
          </Accordion>
          <Accordion title="Come funzionano le due tranche?">
            <div className="text-sm space-y-4">
              <div className="bg-bg-dark rounded-lg p-4 border border-green-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-primary/20 text-green-primary text-xs font-bold px-2 py-0.5 rounded">TRANCHE 1</span>
                  <span className="text-text-primary font-bold">€250.000 — entro Q2 2026</span>
                </div>
                <ul className="text-text-muted text-xs space-y-1 list-disc list-inside">
                  <li>Piattaforma live con i 3 pilastri</li><li>500+ utenti onboardati</li><li>2+ partner operativi</li><li>Revenue run-rate &ge; €80k/anno</li>
                </ul>
              </div>
              <div className="bg-bg-dark rounded-lg p-4 border border-cyan-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-cyan-accent/20 text-cyan-accent text-xs font-bold px-2 py-0.5 rounded">TRANCHE 2</span>
                  <span className="text-text-primary font-bold">€250.000 — entro Q2 2027</span>
                </div>
                <ul className="text-text-muted text-xs space-y-1 list-disc list-inside">
                  <li>Ricavi 2026 &ge; €175k</li><li>3.500+ utenti attivi</li><li>EBITDA positivo</li><li>1+ contratto White Label</li>
                </ul>
              </div>
            </div>
          </Accordion>
          <Accordion title="Come è stata calcolata la valutazione?">
            <div className="text-text-secondary text-sm space-y-3">
              <p>3 metodologie indipendenti:</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { method: "Metodo VC", center: "€2,0M", range: "€1,4M — €2,5M", color: "border-green-primary/20" },
                  { method: "Revenue Multiple", center: "€2,4M", range: "€1,6M — €3,3M", color: "border-cyan-accent/20" },
                  { method: "Scorecard Italia", center: "€2,2M", range: "€2,0M — €2,5M", color: "border-pink-accent/20" },
                ].map((m) => (
                  <div key={m.method} className={`bg-bg-dark rounded-lg p-3 border text-center ${m.color}`}>
                    <p className="text-text-primary font-semibold text-xs mb-1">{m.method}</p>
                    <p className="text-green-primary font-mono font-bold text-lg">{m.center}</p>
                    <p className="text-text-disabled text-xs">{m.range}</p>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
          <Accordion title="Quali sono i rischi?">
            <div className="text-sm space-y-3">
              {[
                { risk: "Conversione < 2%", mit: "A/B test su 5.000 utenti reali. Piano regge all'1,5%." },
                { risk: "Meno WL del previsto", mit: "Con 2/anno: ricavi 2030 a €3,6M, comunque profittevole." },
                { risk: "Dipendenza ENERBee", mit: "Academy dal 2028 per rete indipendente. 25 partner a regime." },
                { risk: "Cambio normativa", mit: "Driver principale e EPBD europea. 10 pillar diversificati." },
              ].map((item) => (
                <div key={item.risk} className="bg-bg-dark rounded-lg p-4 border border-pink-accent/20">
                  <p className="text-pink-accent font-semibold text-xs mb-1">{item.risk}</p>
                  <p className="text-text-muted text-xs">{item.mit}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
