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
              { label: "Valutazione post-money", value: "€2.500.000", accent: false },
              { label: "Quota equity (round pieno)", value: "20%", accent: true },
              { label: "Ticket minimo", value: "€25.000 = 1%", accent: false },
              { label: "Multipli accettati", value: "€50k, €75k, €100k", accent: false },
              { label: "Strumento", value: "Quote ordinarie", accent: false },
              { label: "Detrazione IRPEF", value: "65% (startup innovativa)", accent: true },
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
            { icon: Shield, title: "EBITDA positivo 2026", text: "Il capitale non copre perdite operative.", color: "text-green-primary", border: "border-green-primary/20 hover:border-green-primary/40", bg: "bg-green-primary/5 hover:bg-green-primary/10" },
            { icon: CheckCircle, title: "Entraco firmato", text: "5.000 clienti reali dal giorno uno. Contratto 3 anni.", color: "text-green-primary", border: "border-green-primary/20 hover:border-green-primary/40", bg: "bg-green-primary/5 hover:bg-green-primary/10" },
            { icon: Clock, title: "Detrazione 65%", text: "Costo effettivo €8.750 su €25k (startup innovativa).", color: "text-cyan-accent", border: "border-cyan-accent/20 hover:border-cyan-accent/40", bg: "bg-cyan-accent/5 hover:bg-cyan-accent/10" },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className={`rounded-xl p-5 text-center border transition-all duration-300 ${item.border} ${item.bg}`}>
              <item.icon className={`mx-auto mb-3 ${item.color}`} size={28} />
              <h3 className="text-text-primary font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-text-muted text-xs">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-3">
          <Accordion title="Come funziona l'operazione?">
            <div className="text-text-secondary text-sm space-y-3">
              <p>Aumento di capitale riservato a investitori terzi, <strong className="text-green-primary">equity diretto a prezzo fisso</strong>. Nessuna convertible, nessun SAFE, nessuna tranche.</p>
              <p>Investi €25.000 → ricevi il 1% post-money della società. Multipli accettati: €50k (2%), €75k (3%), €100k (4%). A raccolta piena: €500k = 20% post-money.</p>
              <p><strong className="text-text-primary">Diritti patrimoniali pieni</strong>: dividendi, liquidazione, exit. Diritti amministrativi limitati per non appesantire la governance. Per partecipazioni inferiori al 2% il conferimento avviene tramite società fiduciaria.</p>
              <p><strong className="text-text-primary">Diritti informativi</strong>: report semestrale su KPI operativi e situazione finanziaria.</p>
            </div>
          </Accordion>
          <Accordion title="Come milestone dei due round">
            <div className="text-sm space-y-4">
              <div className="bg-bg-dark rounded-lg p-4 border border-green-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-primary/20 text-green-primary text-xs font-bold px-2 py-0.5 rounded">PRE-SEED</span>
                  <span className="text-text-primary font-bold">€500.000 — 2026</span>
                </div>
                <ul className="text-text-muted text-xs space-y-1 list-disc list-inside">
                  <li>100+ lavori chiusi</li><li>Conversione &ge; 2%</li><li>2+ White Label firmati</li><li>NPS &ge; 40</li>
                </ul>
              </div>
              <div className="bg-bg-dark rounded-lg p-4 border border-cyan-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-cyan-accent/20 text-cyan-accent text-xs font-bold px-2 py-0.5 rounded">SEED</span>
                  <span className="text-text-primary font-bold">€1.500.000 — 2028</span>
                </div>
                <ul className="text-text-muted text-xs space-y-1 list-disc list-inside">
                  <li>5+ White Label attivi</li><li>€2,5M revenue</li><li>Metriche validate</li><li>8+ partner certificati</li>
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
                { risk: "Meno WL del previsto", mit: "Pipeline GTI attiva. Se 1/anno: ~€3,8M ricavi 2030, piano regge." },
                { risk: "Fee non accettata al 20%", mit: "Fee resta al 15%. Piano regge comunque." },
                { risk: "Dipendenza GTI", mit: "Academy dal 2028 per rete indipendente. 25 partner a regime." },
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
