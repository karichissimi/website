"use client";

import { motion } from "framer-motion";
import Accordion from "../Accordion";
import Counter from "../Counter";

const piano = [
  { label: "Utenti attivi", y1: "5.000", y2: "17.250", y3: "35.250", y4: "62.750", y5: "94.750" },
  { label: "Clienti White Label", y1: "1", y2: "3", y3: "5", y4: "8", y5: "11" },
  { label: "Lavori chiusi", y1: "100", y2: "345", y3: "705", y4: "1.255", y5: "1.895" },
  { label: "Partner esecuzione", y1: "2", y2: "4", y3: "8", y4: "14", y5: "22" },
  { label: "Fee Karica su GMV", y1: "10%", y2: "12%", y3: "15%", y4: "18%", y5: "20%", highlight: true },
  { label: "Ricavi", y1: "€231k", y2: "€1,13M", y3: "€2,45M", y4: "€4,44M", y5: "€6,62M", highlight: true },
  { label: "EBITDA", y1: "€7k", y2: "€510k", y3: "€389k", y4: "€1,73M", y5: "€3,07M", highlight: true },
  { label: "EBITDA %", y1: "3%", y2: "45%", y3: "16%", y4: "39%", y5: "46%" },
  { label: "Cassa cumulata", y1: "€505k", y2: "€862k", y3: "€2,49M", y4: "€3,54M", y5: "€5,65M" },
];

export default function Numeri() {
  return (
    <section id="numeri" className="relative py-24 sm:py-32 bg-bg-dark overflow-hidden">
      <div className="glow-orb absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            I <span className="text-gradient">numeri</span> del piano
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Piano quinquennale 2026–2030. EBITDA positivo dal primo anno.
            Il capitale raccolto non finanzia perdite.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { prefix: "€", target: 6.62, suffix: "M", label: "Ricavi 2030", sub: "da €231k nel 2026", decimals: 2 },
            { prefix: "", target: 46, suffix: "%", label: "EBITDA margin", sub: "a regime", decimals: 0 },
            { prefix: "€", target: 5.65, suffix: "M", label: "Cassa cumulata", sub: "al 2030", decimals: 2 },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="group card-glow p-5 text-center transition-all duration-500 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]"
            >
              <div className="relative z-10">
                <Counter
                  target={kpi.target}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                  decimals={kpi.decimals}
                  className="text-2xl sm:text-3xl font-black text-green-primary font-mono"
                />
                <p className="text-sm text-text-primary font-semibold mt-1">{kpi.label}</p>
                <p className="text-xs text-text-muted mt-0.5">{kpi.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          <Accordion title="Vedi il piano completo 2026–2030">
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-2 px-2 text-text-muted font-medium" />
                    <th className="text-right py-2 px-2 text-text-muted font-medium">2026</th>
                    <th className="text-right py-2 px-2 text-text-muted font-medium">2027</th>
                    <th className="text-right py-2 px-2 text-text-muted font-medium">2028</th>
                    <th className="text-right py-2 px-2 text-text-muted font-medium">2029</th>
                    <th className="text-right py-2 px-2 text-green-primary font-bold">2030</th>
                  </tr>
                </thead>
                <tbody>
                  {piano.map((row) => (
                    <tr key={row.label} className={`border-b border-card-border/50 ${row.highlight ? "bg-green-primary/5" : ""}`}>
                      <td className={`py-2.5 px-2 ${row.highlight ? "text-text-primary font-semibold" : "text-text-secondary"}`}>{row.label}</td>
                      <td className="text-right py-2.5 px-2 text-text-secondary font-mono text-xs">{row.y1}</td>
                      <td className="text-right py-2.5 px-2 text-text-secondary font-mono text-xs">{row.y2}</td>
                      <td className="text-right py-2.5 px-2 text-text-secondary font-mono text-xs">{row.y3}</td>
                      <td className="text-right py-2.5 px-2 text-text-secondary font-mono text-xs">{row.y4}</td>
                      <td className={`text-right py-2.5 px-2 font-mono text-xs font-bold ${row.highlight ? "text-green-primary" : "text-text-primary"}`}>{row.y5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-4">58% degli utenti al 2030 da partner White Label a CAC zero. 11 partner di distribuzione cumulativi.</p>
          </Accordion>

          <Accordion title="Come vengono usati i fondi?">
            <div className="space-y-3">
              {[
                { dest: "Prodotto & Tecnologia", amount: "€250.000", pct: 50, color: "bg-green-primary" },
                { dest: "Operations Digitali", amount: "€120.000", pct: 24, color: "bg-cyan-accent" },
                { dest: "Compliance & Legal", amount: "€50.000", pct: 10, color: "bg-pink-accent" },
                { dest: "Riserva operativa", amount: "€80.000", pct: 16, color: "bg-text-muted" },
              ].map((item) => (
                <div key={item.dest} className="bg-bg-dark rounded-lg p-4 border border-card-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-primary font-semibold text-sm">{item.dest}</span>
                    <span className="text-green-primary font-mono font-bold text-sm">{item.amount}</span>
                  </div>
                  <div className="w-full h-1.5 bg-card-border rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
