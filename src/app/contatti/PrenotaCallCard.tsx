"use client";

import { Calendar, ArrowUpRight, Check, Clock, Video, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { haptic } from "@/lib/haptics";

const CALENDLY_URL = "https://calendly.com/alessandro-zanin-karica/new-meeting";

const features = [
  { icon: Clock, label: "30 minuti" },
  { icon: Video, label: "Video call" },
  { icon: Globe, label: "Italiano o english" },
];

export default function PrenotaCallCard() {
  return (
    <motion.section
      aria-label="Prenota una call con il team Karica"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-10"
    >
      {/* Glow halo behind the card */}
      <div
        aria-hidden
        className="absolute -inset-6 bg-gradient-to-br from-green-primary/15 via-cyan-accent/10 to-transparent blur-3xl rounded-[2rem] pointer-events-none"
      />

      <div className="relative card-glow p-6 sm:p-8 text-left overflow-hidden">
        {/* Decorative corner glow */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-green-primary/15 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-cyan-accent/10 blur-3xl pointer-events-none"
        />

        <div className="relative z-10">
          {/* Live availability badge */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-primary/10 border border-green-primary/30">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary" />
              </span>
              <span className="text-green-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                Slot disponibili questa settimana
              </span>
            </div>
          </div>

          {/* Icon + kicker */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-green-primary/30 blur-xl rounded-2xl" />
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-primary to-cyan-accent flex items-center justify-center shadow-[0_0_24px_rgba(57,255,20,0.35)]">
                <Calendar size={24} className="text-bg-dark" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <p className="text-text-muted text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold mb-0.5">
                Faccia a faccia (digitale)
              </p>
              <h2 className="text-text-primary text-xl sm:text-2xl font-black leading-tight">
                Prenota una <span className="text-gradient">call</span>
              </h2>
            </div>
          </div>

          {/* Personal copy */}
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-5">
            Senza slide. Senza pitch. Senza copione.
            <br />
            <span className="text-text-primary font-semibold">
              Solo le tue domande e qualcuno del team
            </span>{" "}
            che ti risponde davvero — anche se è per dirti
            &ldquo;non lo so, te lo cerco e ti scrivo&rdquo;.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-7">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-darker border border-card-border text-xs"
              >
                <Icon size={12} className="text-cyan-accent flex-shrink-0" />
                <span className="text-text-secondary font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Trust micro-list */}
          <div className="space-y-2 mb-7 pl-1">
            {[
              "Niente form da 18 campi",
              "Niente call center, parli col team",
              "Se non ti convince, nessuno ti richiama",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-text-muted text-xs sm:text-sm">
                <Check size={14} className="text-green-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => haptic("medium")}
            className="btn-press group relative w-full flex items-center justify-center gap-2 bg-green-primary text-bg-dark font-bold py-4 rounded-xl uppercase tracking-wider text-sm hover:bg-green-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(57,255,20,0.4)] overflow-hidden"
          >
            {/* Shimmer sweep on hover */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
            <Calendar size={18} className="relative z-10" />
            <span className="relative z-10">Apri il calendario</span>
            <ArrowUpRight
              size={18}
              className="relative z-10 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
            />
          </a>

          {/* Personal sign-off */}
          <p className="text-center text-text-muted text-[11px] mt-4 italic">
            Dall&apos;altra parte trovi una persona vera, non un bot.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
