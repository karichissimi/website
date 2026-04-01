"use client";

import { motion } from "framer-motion";
import { TrendingDown, Shield, Timer, Lock } from "lucide-react";

const reasons = [
  { icon: TrendingDown, title: "Il prezzo più basso", description: "La Series A nel 2028 sarà a multipli molto superiori. Chi entra oggi compra a €2M una società che varrà €6-10M.", color: "text-green-primary", glow: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.12)]" },
  { icon: Shield, title: "Rischio ridotto", description: "Entraco firmato, 5.000 utenti reali, supply chain operativa. EBITDA positivo dal primo anno.", color: "text-cyan-accent", glow: "group-hover:shadow-[0_0_30px_rgba(0,212,212,0.12)]" },
  { icon: Lock, title: "Protezione al ribasso", description: "Floor €583.200. Cassa 2026 di €534k > capitale investito. Piano regge con -30% su tutti i driver.", color: "text-pink-accent", glow: "group-hover:shadow-[0_0_30px_rgba(255,77,109,0.12)]" },
  { icon: Timer, title: "Finestra limitata", description: "Unico round pre-seed. Quote B con PIK 8% e floor non saranno più disponibili.", color: "text-green-primary", glow: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.12)]" },
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
