"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import {
  SunMedium,
  HardHat,
  Wrench,
  Zap,
  Network,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { haptic } from "@/lib/haptics";

type Partner = {
  name: string;
  role: { it: string; en: string };
  detail: { it: string; en: string };
  icon: LucideIcon;
  accent: "green" | "cyan" | "pink";
  url: string | null;
  group?: string;
};

const partners: Partner[] = [
  {
    name: "GTI",
    role: { it: "Impianti fotovoltaici", en: "Solar PV systems" },
    detail: { it: "Progettazione e installazione FV", en: "PV design and installation" },
    icon: SunMedium,
    accent: "green",
    url: "https://www.greentechitalia.com/",
    group: "EnerBee Group",
  },
  {
    name: "GBI",
    role: { it: "Costruzioni edili", en: "Construction works" },
    detail: { it: "Esegue i lavori di riqualificazione", en: "Executes retrofit works" },
    icon: HardHat,
    accent: "green",
    url: null,
    group: "EnerBee Group",
  },
  {
    name: "E-VM",
    role: { it: "Engineering & ESCo", en: "Engineering & ESCo" },
    detail: { it: "Efficienza energetica e CER", en: "Energy efficiency and energy communities" },
    icon: Wrench,
    accent: "green",
    url: "https://www.e-vm.it",
    group: "EnerBee Group",
  },
  {
    name: "Entraco",
    role: { it: "Fornitore energia", en: "Energy supplier" },
    detail: {
      it: "5.000 clienti reali con dati consumi",
      en: "5,000 real customers with consumption data",
    },
    icon: Zap,
    accent: "cyan",
    url: "https://www.entraco.it",
  },
  {
    name: "EC Hub",
    role: { it: "Rete CER", en: "Energy community network" },
    detail: {
      it: "Comunità Energetiche su scala nazionale",
      en: "Energy Communities at national scale",
    },
    icon: Network,
    accent: "cyan",
    url: "https://echub.it",
  },
  {
    name: "Partner Bancari",
    role: { it: "Finanziamenti", en: "Financing" },
    detail: { it: "Prestiti green integrati", en: "Integrated green loans" },
    icon: Landmark,
    accent: "pink",
    url: null,
  },
];

const COPY = {
  it: {
    aria: "Ecosistema di partner Karica",
    titlePre: "Un ",
    titleHighlight: "marketplace",
    titlePost: ", non un'app",
    body:
      "Karica connette domanda e offerta della transizione energetica con un ecosistema di partner già operativi.",
    karicaRole: "Piattaforma digitale",
    karicaSub: "L'orchestratore della transizione",
    partnersLabel: "Partner operativi",
  },
  en: {
    aria: "Karica partner ecosystem",
    titlePre: "A ",
    titleHighlight: "marketplace",
    titlePost: ", not an app",
    body:
      "Karica connects energy-transition supply and demand through an ecosystem of already-operating partners.",
    karicaRole: "Digital platform",
    karicaSub: "The transition orchestrator",
    partnersLabel: "Operating partners",
  },
} as const;

const ACCENT = {
  green: {
    text: "text-green-primary",
    border: "border-green-primary/30",
    borderHover: "hover:border-green-primary/70",
    bg: "bg-green-primary",
    glow: "hover:shadow-[0_0_24px_rgba(57,255,20,0.18)]",
    iconBg: "bg-green-primary/10",
  },
  cyan: {
    text: "text-cyan-accent",
    border: "border-cyan-accent/30",
    borderHover: "hover:border-cyan-accent/70",
    bg: "bg-cyan-accent",
    glow: "hover:shadow-[0_0_24px_rgba(0,212,212,0.18)]",
    iconBg: "bg-cyan-accent/10",
  },
  pink: {
    text: "text-pink-accent",
    border: "border-pink-accent/25",
    borderHover: "hover:border-pink-accent/55",
    bg: "bg-pink-accent",
    glow: "hover:shadow-[0_0_24px_rgba(255,77,109,0.15)]",
    iconBg: "bg-pink-accent/10",
  },
} as const;

export default function Ecosistema() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <section
      id="ecosistema"
      aria-label={t.aria}
      className="relative py-14 sm:py-24 bg-bg-dark overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.12]" />
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-green-primary/[0.05] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Compact header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-7 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary mb-2.5 leading-tight">
            {t.titlePre}
            <span className="text-gradient">{t.titleHighlight}</span>
            {t.titlePost}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto leading-snug">
            {t.body}
          </p>
        </motion.div>

        {/* Ecosystem card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card-glow p-4 sm:p-6 relative overflow-hidden"
        >
          {/* Decorative corner glows */}
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-green-primary/10 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-cyan-accent/10 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Central hub — animated logo + name */}
            <div className="relative mb-3 sm:mb-4">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-2xl bg-green-primary/25 blur-xl animate-pulse" />
              <div
                aria-hidden
                className="absolute -inset-1 rounded-2xl border border-green-primary/40 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
              <div className="relative bg-bg-darker border border-green-primary/60 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-2 sm:gap-2.5 shadow-[0_0_28px_rgba(57,255,20,0.25)]">
                <Image
                  src="/graphics/Karica_Logo_Felice.png"
                  alt=""
                  aria-hidden
                  width={28}
                  height={28}
                  className="h-6 sm:h-7 w-auto animate-float"
                />
                <span className="text-shimmer font-black text-sm sm:text-base uppercase tracking-wider">
                  Karica
                </span>
              </div>
            </div>

            {/* Fan-out connection lines (SVG, decorative) */}
            <svg
              aria-hidden
              viewBox="0 0 240 28"
              preserveAspectRatio="none"
              className="w-full h-5 sm:h-7 mb-3 sm:mb-4 opacity-60"
            >
              <defs>
                <linearGradient id="lineGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#39FF14" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2A3357" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Six lines fanning out from center top to six card positions */}
              <line x1="120" y1="0" x2="20" y2="28" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="120" y1="0" x2="60" y2="28" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="120" y1="0" x2="100" y2="28" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="120" y1="0" x2="140" y2="28" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="120" y1="0" x2="180" y2="28" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="120" y1="0" x2="220" y2="28" stroke="url(#lineGrad)" strokeWidth="1" />
            </svg>

            {/* Partner grid — 2 cols mobile, 3 cols tablet+ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
              {partners.map((partner, i) => {
                const Icon = partner.icon;
                const acc = ACCENT[partner.accent];
                const cardBase = `group relative flex flex-col h-full bg-bg-darker border rounded-xl p-3 sm:p-4 transition-all duration-300 ${acc.border}`;
                const cardInteractive = `${acc.borderHover} hover:-translate-y-0.5 ${acc.glow} cursor-pointer btn-press-soft`;

                const inner = (
                  <>
                    {/* Live indicator */}
                    {partner.url && (
                      <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${acc.bg}`} />
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${acc.bg}`} />
                      </span>
                    )}

                    <div className="flex items-start gap-2 sm:gap-2.5">
                      <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${acc.iconBg} border ${acc.border} flex items-center justify-center`}>
                        <Icon size={14} className={acc.text} strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <p className={`font-bold text-xs sm:text-sm ${acc.text} leading-tight truncate`}>
                          {partner.name}
                        </p>
                        <p className="text-text-muted text-[10px] sm:text-xs leading-tight mt-0.5 truncate">
                          {partner.role[lang]}
                        </p>
                      </div>
                    </div>
                    <p className="text-text-disabled text-[10px] sm:text-[11px] mt-2 leading-snug flex-grow">
                      {partner.detail[lang]}
                    </p>
                    {/* Reserve a fixed-height row for the group tag so cards
                        with and without the tag stay the same size. */}
                    <p className="text-text-disabled text-[9px] sm:text-[10px] mt-1.5 italic uppercase tracking-wider min-h-[14px]">
                      {partner.group ? `↳ ${partner.group}` : "\u00A0"}
                    </p>
                  </>
                );

                return (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                    className="h-full"
                  >
                    {partner.url ? (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => haptic("light")}
                        className={`${cardBase} ${cardInteractive}`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={`${cardBase} opacity-80`}>{inner}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footnote — group execution chain explanation */}
            <p className="text-text-muted text-[10px] sm:text-xs mt-4 sm:mt-5 text-center max-w-md">
              GTI, GBI ed E-VM appartengono a{" "}
              <span className="text-text-secondary font-semibold">EnerBee Group</span>
              {" "}e sono le società che eseguono i lavori generati dalla piattaforma.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
