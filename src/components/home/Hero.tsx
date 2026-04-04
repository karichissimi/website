"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FundingBanner from "../FundingBanner";

const facts = [
  { text: "Il 60% delle case italiane è in classe energetica F o G", color: "#FF4D6D" },
  { text: "Con la direttiva Case Green, riqualificare non sarà più opzionale", color: "#00D4D4" },
  { text: "Un impianto fotovoltaico da 6 kW costa da €7.000 chiavi in mano", color: "#39FF14" },
  { text: "Le bollette 2026 calano del 9%, ma il mercato resta volatile", color: "#FF4D6D" },
  { text: "Le Comunità Energetiche hanno ricevuto 795 milioni di fondi PNRR", color: "#00D4D4" },
  { text: "Il Bonus Casa 2026 conferma la detrazione al 50% per la prima casa", color: "#39FF14" },
  { text: "Una pompa di calore fa risparmiare fino al 40% rispetto alla caldaia a gas", color: "#FF4D6D" },
  { text: "Un immobile in classe A vale fino al 30% in più di uno in classe G", color: "#00D4D4" },
];

export default function HomeHero() {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 noise">
      <div className="glow-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.06] blur-[100px]" />
      <div className="glow-orb absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.04] blur-[80px]" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt="Karica"
              width={72}
              height={72}
              className="h-18 w-auto animate-float"
            />
            <Image
              src="/graphics/Karica_Scritta_WHITE.png"
              alt="Karica"
              width={200}
              height={56}
              className="h-12 sm:h-14 w-auto"
            />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-primary leading-[1.1] mb-6">
            L&apos;<span className="text-gradient">energia</span> di casa tua,
            <br />
            finalmente{" "}
            <span className="text-gradient">chiara</span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Karica ti mostra quanto sprechi, cosa fare per risparmiare
            e ti guida passo passo — dalla diagnosi al risultato.
          </motion.p>

          {/* Rotating fact ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10"
          >
            <a
              href="#energia"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card-bg/60 border border-card-border hover:border-card-border/80 transition-colors cursor-pointer group"
            >
              <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                Sapevi che
              </span>
              <span className="w-px h-3 bg-card-border" />
              <div className="relative h-5 overflow-hidden min-w-[200px] sm:min-w-[340px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={factIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 text-xs sm:text-sm font-medium text-left"
                    style={{ color: facts[factIndex].color }}
                  >
                    {facts[factIndex].text}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-text-muted text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                &darr;
              </span>
            </a>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a
              href="/funding"
              className="group relative bg-green-primary text-bg-dark font-bold px-8 py-4 rounded-lg uppercase tracking-wider text-base hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
            >
              <span className="relative z-10">Investi in Karica →</span>
            </a>
            <a
              href="#energia"
              className="border border-cyan-accent/40 text-cyan-accent font-semibold px-8 py-4 rounded-lg text-base hover:border-cyan-accent hover:bg-cyan-accent/5 transition-all"
            >
              Scopri le novità energia
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12"
          >
            <FundingBanner />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-darker to-transparent" />
    </section>
  );
}
