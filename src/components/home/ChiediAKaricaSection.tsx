"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ChiediAKarica from "./ChiediAKarica";

export default function ChiediAKaricaSection() {
  return (
    <section
      id="chiedi-karica"
      aria-label="Chiedi a Karica — assistente AI sull'energia di casa"
      className="relative py-24 sm:py-32 overflow-hidden bg-bg-dark"
    >
      {/* Ambient layers — ciano + verde, intenzionalmente diversi da AppInAzione */}
      <div className="glow-orb absolute top-1/3 left-[10%] w-[420px] h-[420px] rounded-full bg-green-primary/[0.06] blur-[140px] pointer-events-none" />
      <div className="glow-orb-slow absolute bottom-1/4 right-[5%] w-[380px] h-[380px] rounded-full bg-cyan-accent/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          {/* Pill kicker with "live AI" status */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-primary/10 border border-green-primary/30 mb-5">
            <Sparkles size={12} className="text-green-primary" />
            <span className="text-green-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              IA pronta a risponderti
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-4">
            Hai dubbi sull&apos;energia di casa?{" "}
            <span className="text-gradient">Chiedi a Karica</span>.
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
            Incentivi, Comunità Energetiche, pannelli, bollette, normativa.
            Provala — il cacatua risponde in italiano, ricorda la conversazione
            e ti dice quando una domanda è fuori dalla sua competenza.
          </p>
        </motion.div>

        {/* La card glow contiene la chat vera e propria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="card-glow p-5 sm:p-7"
        >
          <div className="relative z-10">
            <ChiediAKarica />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
