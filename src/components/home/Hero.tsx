"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";

const COPY = {
  it: {
    aria: "Introduzione a Karica",
    headlinePre: "L'",
    headlineWord1: "energia",
    headlineMid: " di casa tua,",
    headlineEnd: "finalmente ",
    headlineWord2: "chiara",
    intro: (
      <>
        Karica ti mostra <strong className="text-text-primary">quanto sprechi</strong>, cosa fare
        per risparmiare e ti guida passo passo — <em>dalla diagnosi al risultato</em>.
      </>
    ),
    scrollCueLabel: "Scorri per vedere l'app in azione",
    scrollCueText: "Vedi l'app in azione",
  },
  en: {
    aria: "Introducing Karica",
    headlinePre: "Your home ",
    headlineWord1: "energy",
    headlineMid: ",",
    headlineEnd: "finally ",
    headlineWord2: "clear",
    intro: (
      <>
        Karica shows you exactly <strong className="text-text-primary">what you&apos;re wasting</strong>,
        what to do to save, and walks you through it — <em>from diagnosis to result</em>.
      </>
    ),
    scrollCueLabel: "Scroll to see the app in action",
    scrollCueText: "See the app in action",
  },
} as const;

export default function HomeHero() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <section
      aria-label={t.aria}
      className="relative min-h-[100svh] flex flex-col overflow-hidden py-24 sm:py-28 noise"
    >
      <div className="glow-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-accent/[0.06] blur-[100px]" />
      <div className="glow-orb absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.04] blur-[80px]" />
      <div className="absolute inset-0 dot-grid opacity-[0.12]" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 max-w-4xl mx-auto w-full px-4 sm:px-6 text-center">
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
          {t.headlinePre}
          <span className="text-gradient">{t.headlineWord1}</span>
          {t.headlineMid}
          <br />
          {t.headlineEnd}
          <span className="text-gradient">{t.headlineWord2}</span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          className="text-base sm:text-xl text-text-secondary max-w-xl mx-auto leading-snug sm:leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.intro}
        </motion.p>

        {/* Scroll cue */}
        <motion.a
          href="#app-in-azione"
          onClick={() => haptic("light")}
          aria-label={t.scrollCueLabel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="group inline-flex flex-col items-center gap-2 text-text-muted hover:text-green-primary transition-colors"
        >
          <span className="text-xs sm:text-sm uppercase tracking-widest font-semibold">
            {t.scrollCueText}
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronDown size={22} strokeWidth={2.5} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
