"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />
      <div className="glow-orb-slow absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-cyan-accent/[0.04] blur-[80px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt="Karica"
              width={48}
              height={48}
              className="h-12 w-auto animate-float-slow"
            />
            <Image
              src="/graphics/Karica_Scritta_WHITE.png"
              alt="Karica"
              width={140}
              height={40}
              className="h-9 w-auto"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-4">
            Presto <span className="text-gradient">disponibile</span>
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto">
            Karica è in fase di lancio. Stiamo costruendo la piattaforma
            con i primi 5.000 utenti reali.
          </p>

          <Link
            href="/funding"
            className="group inline-flex items-center gap-4 card-glow px-8 py-5 transition-all duration-500 hover:shadow-[0_0_40px_rgba(57,255,20,0.12)]"
          >
            <div className="relative z-10 text-left">
              <p className="text-text-primary font-bold">
                Sei un investitore?
              </p>
              <p className="text-text-muted text-sm">
                Stiamo raccogliendo €500k pre-seed — scopri l&apos;opportunità
              </p>
            </div>
            <ArrowRight
              size={24}
              className="relative z-10 text-green-primary group-hover:translate-x-2 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
