"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AppInAzione() {
  return (
    <section
      id="app-in-azione"
      aria-label="L'app Karica in azione"
      className="relative py-24 sm:py-32 overflow-hidden bg-bg-dark"
    >
      {/* Ambient glow */}
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-accent/[0.05] blur-[140px] pointer-events-none" />
      <div className="glow-orb-slow absolute top-1/3 right-[5%] w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-10 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1 text-center md:text-left"
          >
            <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
              L&apos;app, in azione
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-5">
              Capisce la tua bolletta
              <br />
              <span className="text-gradient">in 30 secondi</span>.
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Carica una foto della bolletta. Karica legge i tuoi consumi reali,
              li confronta con case simili alla tua, e ti dice dove puoi
              risparmiare davvero.
            </p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 relative flex justify-center"
          >
            {/* Phone glow */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden
            >
              <div className="w-[70%] h-[80%] rounded-[100px] bg-cyan-accent/25 blur-[90px]" />
            </div>

            <div className="phone-tilt relative">
              <Image
                src="/app/analisi-smart.png"
                alt="Schermata dell'app Karica: analisi smart della bolletta"
                width={668}
                height={1259}
                className="relative w-[260px] sm:w-[300px] md:w-[340px] h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
