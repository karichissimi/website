"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Wrench, TrendingDown, ArrowRight } from "lucide-react";
import GlowOrbs from "../GlowOrbs";
import KpiModal from "../KpiModal";

const steps = [
  {
    icon: Search,
    step: "1",
    title: "Scopri quanto sprechi",
    description:
      "Colleghi la tua utenza e Karica analizza i tuoi consumi reali. Nessun dato da inserire a mano: vedi subito dove va il denaro.",
    color: "text-green-primary",
    glow: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]",
    detail:
      "Karica si collega ai dati reali del tuo fornitore di energia. In meno di 2 minuti vedi esattamente quanto spendi, quanto sprechi e come ti posizioni rispetto a case simili alla tua. Niente bollette da fotografare, niente dati da inserire: è tutto già pronto grazie alla partnership con Entraco.",
  },
  {
    icon: Wrench,
    step: "2",
    title: "Scegli cosa migliorare",
    description:
      "Karica ti suggerisce gli interventi giusti per casa tua — con un simulatore che ti mostra quanto risparmi e in quanto tempo rientri.",
    color: "text-cyan-accent",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,212,212,0.15)]",
    detail:
      "In base ai tuoi consumi reali, Karica ti propone gli interventi più efficaci: isolamento, pompa di calore, fotovoltaico, infissi. Per ognuno vedi il costo stimato, il risparmio annuo e il tempo di rientro. Non devi cercare preventivi: i lavori li esegue ENERBee, il nostro General Contractor certificato.",
  },
  {
    icon: TrendingDown,
    step: "3",
    title: "Risparmia davvero",
    description:
      "Lavori eseguiti da professionisti certificati, finanziamento incluso se serve. Poi monitori il risparmio reale mese dopo mese.",
    color: "text-pink-accent",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,77,109,0.15)]",
    detail:
      "Dopo l'intervento, Karica continua a monitorare i tuoi consumi. Vedi mese dopo mese quanto stai risparmiando rispetto a prima. Puoi anche unirti a una Comunità Energetica (CER) del tuo quartiere e ricevere un incentivo dal GSE per l'energia condivisa. Il risparmio diventa visibile e concreto.",
  },
];

export default function ComeFunziona() {
  const [modal, setModal] = useState<number | null>(null);

  return (
    <section id="come-funziona" className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      <GlowOrbs />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            Come <span className="text-gradient">funziona</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Tre passaggi. Dalla bolletta al risparmio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.button
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              onClick={() => setModal(i)}
              className={`group relative card-glow p-6 sm:p-8 text-center transition-all duration-500 cursor-pointer ${s.glow}`}
            >
              <div className="relative z-10">
                <span className="text-7xl font-black text-card-border/50 absolute -top-2 right-2 group-hover:text-card-border transition-colors duration-500">
                  {s.step}
                </span>
                <div className={`w-14 h-14 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center mx-auto mb-5 group-hover:border-current transition-colors duration-500 ${s.color}`}>
                  <s.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.description}</p>
                <p className="text-xs text-text-muted mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Clicca per approfondire &rarr;
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Connection arrows on desktop */}
        <div className="hidden md:flex items-center justify-center mt-8 gap-4">
          <div className="flex-1 h-px" style={{ background: "var(--gradient-green)" }} />
          <ArrowRight className="text-cyan-accent" size={20} />
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-accent/50 to-pink-accent/50" />
          <ArrowRight className="text-pink-accent" size={20} />
          <div className="flex-1 h-px bg-gradient-to-r from-pink-accent/50 to-transparent" />
        </div>
      </div>

      {/* Step Modal */}
      {modal !== null && (
        <KpiModal
          open={modal !== null}
          onClose={() => setModal(null)}
          value={steps[modal].step}
          label={steps[modal].title}
          explanation={steps[modal].detail}
        />
      )}
    </section>
  );
}
