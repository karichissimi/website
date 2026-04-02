"use client";

import { motion } from "framer-motion";

const scenari = [
  { label: "Floor garantito", sublabel: "24 mesi, qualsiasi scenario", value: "€583k", multiplo: "1,17x", irr: "8%", highlight: false, pct: 7, barColor: "bg-text-muted/40" },
  { label: "Stress test", sublabel: "−30% su tutti i driver", value: "€1,55M", multiplo: "3,1x", irr: "~25%", highlight: false, pct: 18, barColor: "bg-cyan-accent/40" },
  { label: "Conservativo", sublabel: "Exit 3x ricavi", value: "€2,67M", multiplo: "5,3x", irr: "~40%", highlight: false, pct: 32, barColor: "bg-cyan-accent/60" },
  { label: "Scenario base", sublabel: "Exit 5x ricavi", value: "€4,45M", multiplo: "8,9x", irr: "~55%", highlight: true, pct: 53, barColor: "bg-gradient-to-r from-green-primary to-cyan-accent" },
  { label: "Ottimistico", sublabel: "Exit 12x EBITDA", value: "€3,91M", multiplo: "7,8x", irr: "~51%", highlight: false, pct: 47, barColor: "bg-gradient-to-r from-green-primary via-cyan-accent to-pink-accent" },
];

export default function Rendimenti() {
  return (
    <section id="rendimenti" className="relative py-24 sm:py-32 bg-bg-dark overflow-hidden">
      <div className="glow-orb absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            Quanto puoi <span className="text-gradient">guadagnare</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">Scenari di rendimento su €500k in 5 anni.</p>
        </motion.div>

        <div className="space-y-3">
          {scenari.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-xl border p-5 transition-all duration-300 ${s.highlight ? "border-green-primary/40 bg-green-primary/5 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]" : "border-card-border bg-card-bg hover:border-card-border/80"}`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold ${s.highlight ? "text-green-primary" : "text-text-primary"}`}>{s.label}</h3>
                    {s.highlight && <span className="bg-green-primary/20 text-green-primary text-xs font-bold px-2 py-0.5 rounded animate-pulse">BASE</span>}
                  </div>
                  <p className="text-text-muted text-xs">{s.sublabel}</p>
                </div>
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="text-right"><p className="text-text-muted text-[10px] uppercase tracking-wider">Valore</p><p className={`font-mono font-bold ${s.highlight ? "text-green-primary text-lg" : "text-text-primary"}`}>{s.value}</p></div>
                  <div className="text-right"><p className="text-text-muted text-[10px] uppercase tracking-wider">Multiplo</p><p className={`font-mono font-bold ${s.highlight ? "text-green-primary text-lg" : "text-text-primary"}`}>{s.multiplo}</p></div>
                  <div className="text-right"><p className="text-text-muted text-[10px] uppercase tracking-wider">IRR</p><p className={`font-mono font-bold ${s.highlight ? "text-green-primary text-lg" : "text-text-primary"}`}>{s.irr}</p></div>
                </div>
              </div>
              <div className="w-full h-1.5 bg-card-border/50 rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full ${s.barColor}`} initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 + i * 0.1 }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="text-center text-text-muted text-xs mt-6 max-w-xl mx-auto">
          Diluzione Series A (16,8%) inclusa. Piano con fee progressiva 10→20%.
        </motion.p>
      </div>
    </section>
  );
}
