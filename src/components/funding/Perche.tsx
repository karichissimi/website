"use client";

import { motion } from "framer-motion";
import { TrendingDown, Shield, Timer, Percent } from "lucide-react";

const reasons = [
  { icon: TrendingDown, title: "Il prezzo più basso", description: "La Series A nel 2028 sarà a multipli molto superiori. Chi entra oggi compra a €1,5M una società che a base plan vale €6,62M di ricavi 2030.", color: "text-green-primary", glow: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.12)]" },
  { icon: Shield, title: "Rischio ridotto", description: "Entraco firmato, 5.000 utenti reali, supply chain operativa via GTI. EBITDA positivo dal primo anno (€7k nel 2026, €510k nel 2027).", color: "text-cyan-accent", glow: "group-hover:shadow-[0_0_30px_rgba(0,212,212,0.12)]" },
  { icon: Percent, title: "Detrazione 65%", description: "Karica è startup innovativa: detrazione IRPEF del 65% sull'importo investito. Costo effettivo €3.500 su €10.000 ticket minimo.", color: "text-green-primary", glow: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.12)]" },
  { icon: Timer, title: "Finestra limitata", description: "Unico round pre-seed. Valutazione pre-money €1,5M concepita come sconto strutturale: a 3x i ricavi 2027 (€1,13M) il fair value implicito è già €3,4M.", color: "text-cyan-accent", glow: "group-hover:shadow-[0_0_30px_rgba(0,212,212,0.12)]" },
];

export default function Perche() {
  return (
    <section className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            Perché <span className="text-gradient-pink">entrare ora</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`group card-glow p-6 transition-all duration-500 ${r.glow}`}>
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-card-bg border border-card-border flex items-center justify-center mb-4 group-hover:border-current transition-colors duration-500 ${r.color}`}><r.icon size={20} /></div>
                <h3 className="text-base font-bold text-text-primary mb-2">{r.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
