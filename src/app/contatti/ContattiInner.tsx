"use client";

import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";
import PrenotaCallCard from "./PrenotaCallCard";
import { useLang } from "@/lib/i18n";

const COPY = {
  it: {
    kicker: "Contatti",
    titlePre: "Parliamoci con ",
    titleHighlight: "calma",
    titlePost: ".",
    intro:
      "Una domanda, una proposta, o solo curiosità sul progetto? Scrivici — rispondiamo a mano, senza fretta né moduli infiniti.",
    emailKicker: "Scrivici una mail",
    soft: "Niente centralini, niente bot — solo persone.",
    divider: "oppure, se preferisci",
  },
  en: {
    kicker: "Contact",
    titlePre: "Let's talk, ",
    titleHighlight: "no rush",
    titlePost: ".",
    intro:
      "A question, a partnership idea, or just curiosity about the project? Drop us a line — we reply by hand, no endless forms.",
    emailKicker: "Send us an email",
    soft: "No call centres, no bots — just people.",
    divider: "or, if you prefer",
  },
} as const;

export default function ContattiInner() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <main id="main" className="relative min-h-[100svh] overflow-hidden pt-24 sm:pt-28 pb-20">
      <div className="glow-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />
      <div className="glow-orb-slow absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />
      <div className="absolute inset-0 dot-grid opacity-[0.12]" />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-green-primary/20 blur-2xl rounded-full" />
          <Image
            src="/graphics/Karica_Logo_Felice.png"
            alt="Karica"
            width={72}
            height={72}
            className="relative h-16 sm:h-18 w-auto animate-float mx-auto"
          />
        </div>

        <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-3">
          {t.kicker}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-5">
          {t.titlePre}
          <span className="text-gradient">{t.titleHighlight}</span>
          {t.titlePost}
        </h1>

        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          {t.intro}
        </p>

        <a
          href="mailto:info@karica.it"
          className="btn-press-soft card-glow group block p-6 sm:p-8 mb-8 text-left transition-all hover:shadow-[0_0_40px_rgba(57,255,20,0.12)]"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-primary/10 flex items-center justify-center border border-green-primary/20">
              <Mail size={22} className="text-green-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-muted text-[11px] uppercase tracking-wider font-semibold mb-1">
                {t.emailKicker}
              </p>
              <p className="text-text-primary text-lg sm:text-xl font-bold font-mono truncate">
                info@karica.it
              </p>
            </div>
            <ArrowUpRight
              size={20}
              className="flex-shrink-0 text-text-muted group-hover:text-green-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
            />
          </div>
        </a>

        <p className="text-text-muted text-xs">{t.soft}</p>

        <div className="relative my-12" aria-hidden>
          <div className="absolute inset-0 flex items-center">
            <div className="section-divider w-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-bg-darker px-4 text-text-muted text-[11px] uppercase tracking-widest font-semibold">
              {t.divider}
            </span>
          </div>
        </div>

        <PrenotaCallCard />
      </div>
    </main>
  );
}
