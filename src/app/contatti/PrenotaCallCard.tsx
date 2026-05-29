"use client";

import { Calendar, ArrowUpRight, Check, Clock, Video, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";

const CALENDLY_URL = "https://calendly.com/alessandro-zanin-karica/new-meeting";

const COPY = {
  it: {
    aria: "Prenota una call con il team Karica",
    slots: "Slot disponibili questa settimana",
    kicker: "Faccia a faccia (digitale)",
    titlePre: "Prenota una ",
    titleHighlight: "call",
    body1: "Senza slide. Senza pitch. Senza copione.",
    bodyStrong: "Solo le tue domande e qualcuno del team",
    body3:
      "che ti risponde davvero — anche se è per dirti “non lo so, te lo cerco e ti scrivo”.",
    featureMinutes: "30 minuti",
    featureCall: "Video call",
    featureLang: "Italiano o english",
    trust: [
      "Niente form da 18 campi",
      "Niente call center, parli col team",
      "Se non ti convince, nessuno ti richiama",
    ],
    cta: "Apri il calendario",
    signOff: "Dall'altra parte trovi una persona vera, non un bot.",
  },
  en: {
    aria: "Book a call with the Karica team",
    slots: "Slots open this week",
    kicker: "Face to face (digital)",
    titlePre: "Book a ",
    titleHighlight: "call",
    body1: "No slides. No pitch. No script.",
    bodyStrong: "Just your questions and someone from the team",
    body3:
      "who actually answers — even if the answer is “I don't know, I'll look into it and write back”.",
    featureMinutes: "30 minutes",
    featureCall: "Video call",
    featureLang: "English or Italian",
    trust: [
      "No 18-field forms",
      "No call centre, you talk to the team",
      "If it's not for you, nobody chases you",
    ],
    cta: "Open the calendar",
    signOff: "On the other end there's a real person, not a bot.",
  },
} as const;

export default function PrenotaCallCard() {
  const { lang } = useLang();
  const t = COPY[lang];
  const features = [
    { icon: Clock, label: t.featureMinutes },
    { icon: Video, label: t.featureCall },
    { icon: Globe, label: t.featureLang },
  ];
  return (
    <motion.section
      aria-label={t.aria}
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
                {t.slots}
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
                {t.kicker}
              </p>
              <h2 className="text-text-primary text-xl sm:text-2xl font-black leading-tight">
                {t.titlePre}<span className="text-gradient">{t.titleHighlight}</span>
              </h2>
            </div>
          </div>

          {/* Personal copy */}
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-5">
            {t.body1}
            <br />
            <span className="text-text-primary font-semibold">{t.bodyStrong}</span>{" "}
            {t.body3}
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
            {t.trust.map((item) => (
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
            <span className="relative z-10">{t.cta}</span>
            <ArrowUpRight
              size={18}
              className="relative z-10 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
            />
          </a>

          {/* Personal sign-off */}
          <p className="text-center text-text-muted text-[11px] mt-4 italic">
            {t.signOff}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
