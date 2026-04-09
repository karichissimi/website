"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FundingBanner from "../FundingBanner";
import { haptic } from "@/lib/haptics";

export default function HomeHero() {
  return (
    <section
      aria-label="Introduzione a Karica"
      className="relative min-h-[100svh] sm:min-h-screen flex flex-col overflow-hidden pt-20 sm:pt-24 pb-6 sm:pb-16 noise"
    >
      <div className="glow-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.06] blur-[100px]" />
      <div className="glow-orb absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.04] blur-[80px]" />
      <div className="absolute inset-0 dot-grid opacity-[0.12]" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-between max-w-4xl mx-auto w-full px-4 sm:px-6 text-center">
        {/* Logo */}
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
            className="h-14 sm:h-18 w-auto animate-float"
          />
          <Image
            src="/graphics/Karica_Scritta_WHITE.png"
            alt="Karica"
            width={200}
            height={56}
            className="h-11 sm:h-14 w-auto"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-[34px] sm:text-5xl md:text-7xl font-black text-text-primary leading-[1.05] sm:leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          L&apos;<span className="text-gradient">energia</span> di casa tua,
          <br />
          finalmente{" "}
          <span className="text-gradient">chiara</span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          className="text-base sm:text-xl text-text-secondary max-w-xl mx-auto leading-snug sm:leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Karica ti mostra quanto sprechi, cosa fare per risparmiare
          e ti guida passo passo — dalla diagnosi al risultato.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="/funding"
            onClick={() => haptic("medium")}
            className="btn-press group relative inline-block bg-green-primary text-bg-dark font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-lg uppercase tracking-wider text-sm sm:text-base hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
          >
            <span className="relative z-10">Investi in Karica →</span>
          </a>
        </motion.div>

        {/* Funding progress banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full"
        >
          <FundingBanner />
        </motion.div>
      </div>
    </section>
  );
}
