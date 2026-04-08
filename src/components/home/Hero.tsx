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
    <section
      aria-label="Introduzione a Karica"
      className="relative min-h-screen flex flex-col overflow-hidden pt-20 sm:pt-24 pb-10 sm:pb-16 noise"
    >
      <div className="glow-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.06] blur-[100px]" />
      <div className="glow-orb absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.04] blur-[80px]" />
      <div className="absolute inset-0 dot-grid opacity-[0.12]" />

      {/* Content stage: fills the section height, distributes 3 groups top/middle/bottom */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between sm:justify-center sm:gap-10 max-w-4xl mx-auto w-full px-4 sm:px-6 text-center">
        {/* Group 1 — Logo */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/graphics/Karica_Logo_Felice.png"
            alt=""
            aria-hidden
            width={72}
            height={72}
            className="h-12 sm:h-18 w-auto animate-float"
          />
          <Image
            src="/graphics/Karica_Scritta_WHITE.png"
            alt="Karica"
            width={200}
            height={56}
            className="h-9 sm:h-14 w-auto"
          />
        </motion.div>

        {/* Group 2 — Headline, paragraph, ticker */}
        <motion.div
          className="flex flex-col items-center w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[28px] sm:text-5xl md:text-7xl font-black text-text-primary leading-[1.05] sm:leading-[1.1] mb-3 sm:mb-6">
            L&apos;<span className="text-gradient">energia</span> di casa tua,
            <br />
            finalmente{" "}
            <span className="text-gradient">chiara</span>
          </h1>

          <p className="text-sm sm:text-xl text-text-secondary max-w-xl mx-auto mb-4 sm:mb-8 leading-snug sm:leading-relaxed">
            Karica ti mostra quanto sprechi, cosa fare per risparmiare
            e ti guida passo passo — dalla diagnosi al risultato.
          </p>

          {/* Rotating fact ticker */}
          <div className="flex justify-center px-2 w-full">
            <a
              href="#energia"
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-2xl sm:rounded-full bg-card-bg/60 border border-card-border hover:border-card-border/80 transition-colors cursor-pointer group max-w-full"
            >
              <span className="text-text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex-shrink-0">
                💡 Lo sapevi?
              </span>
              <span className="w-px h-3 bg-card-border flex-shrink-0" />
              <div className="relative overflow-hidden min-w-0">
                {/* Invisible sizer: the div matches the current fact's dimensions */}
                <span
                  aria-hidden
                  className="invisible block text-[11px] sm:text-sm font-medium leading-[1.3] sm:leading-normal"
                >
                  {facts[factIndex].text}
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={factIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 text-[11px] sm:text-sm font-medium text-left leading-[1.3] sm:leading-normal"
                    style={{ color: facts[factIndex].color }}
                  >
                    {facts[factIndex].text}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="hidden sm:inline text-text-muted text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                &darr;
              </span>
            </a>
          </div>
        </motion.div>

        {/* Group 3 — CTAs + FundingBanner */}
        <motion.div
          className="w-full flex flex-col items-center gap-5 sm:gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
            <a
              href="/funding"
              className="group relative bg-green-primary text-bg-dark font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-lg uppercase tracking-wider text-sm sm:text-base hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
            >
              <span className="relative z-10">Investi in Karica →</span>
            </a>
            <a
              href="#energia"
              className="border border-cyan-accent/40 text-cyan-accent font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base hover:border-cyan-accent hover:bg-cyan-accent/5 transition-all"
            >
              Scopri le novità sull&apos;energia
            </a>
          </div>

          <FundingBanner />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-darker to-transparent pointer-events-none" />
    </section>
  );
}
