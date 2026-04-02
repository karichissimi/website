"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FundingBanner from "../FundingBanner";

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[calc(4rem+36px)] noise">
      {/* Animated orbs */}
      <div className="glow-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.06] blur-[100px]" />
      <div className="glow-orb absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.04] blur-[80px]" />

      {/* Dot grid */}
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
            L&apos;energia di casa tua,
            <br />
            finalmente{" "}
            <span className="text-gradient">chiara</span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Karica ti mostra quanto sprechi, cosa fare per risparmiare
            e ti guida passo passo — dalla diagnosi al risultato.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="/funding"
              className="group relative bg-green-primary text-bg-dark font-bold px-8 py-4 rounded-lg uppercase tracking-wider text-base hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
            >
              <span className="relative z-10">Investi in Karica →</span>
            </a>
            <a
              href="#come-funziona"
              className="border border-cyan-accent/40 text-cyan-accent font-semibold px-8 py-4 rounded-lg text-base hover:border-cyan-accent hover:bg-cyan-accent/5 transition-all"
            >
              Scopri come funziona
            </a>
          </motion.div>

          {/* Funding progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <FundingBanner />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-darker to-transparent" />
    </section>
  );
}
