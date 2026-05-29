"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Zap, Coins, ChevronRight, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Item = {
  icon: LucideIcon;
  title: { it: string; en: string };
  subtitle: { it: string; en: string };
  detail: { it: string; en: string };
  accentColor: string;
  iconBg: string;
};

const items: Item[] = [
  {
    icon: Users,
    title: { it: "Entri nella CER", en: "Join the Energy Community" },
    subtitle: {
      it: "Iscrizione automatica, zero burocrazia",
      en: "Automatic enrolment, zero paperwork",
    },
    detail: {
      it: "Una Comunità Energetica Rinnovabile (CER) è un gruppo di persone che condivide energia rinnovabile prodotta localmente. Karica trova la CER più vicina a te, gestisce l'iscrizione e monitora la tua partecipazione. Non devi fare nulla: ci pensiamo noi.",
      en: "A Renewable Energy Community (REC) is a group of people that shares locally-produced renewable energy. Karica finds the closest REC to you, handles enrolment and monitors your participation. You don't have to do anything: we take care of it.",
    },
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
  },
  {
    icon: Zap,
    title: { it: "Condividi energia", en: "Share energy" },
    subtitle: {
      it: "Benefici anche senza pannelli",
      en: "Benefit even without solar panels",
    },
    detail: {
      it: "Non serve avere pannelli solari sul tetto. Basta far parte della CER per beneficiare dell'energia prodotta da altri membri. L'energia condivisa viene tracciata automaticamente e ogni membro riceve la sua quota di incentivo in proporzione ai consumi.",
      en: "You don't need solar panels on your roof. Just being part of the REC is enough to benefit from energy produced by other members. Shared energy is tracked automatically and each member receives their share of the incentive in proportion to their consumption.",
    },
    accentColor: "#00D4D4",
    iconBg: "bg-cyan-accent/10",
  },
  {
    icon: Coins,
    title: { it: "Ricevi l'incentivo", en: "Earn the incentive" },
    subtitle: {
      it: "Incentivo GSE gestito da Karica",
      en: "GSE incentive, handled by Karica",
    },
    detail: {
      it: "Il Gestore dei Servizi Energetici (GSE) riconosce un incentivo economico per ogni kWh di energia condivisa nella CER. Karica calcola la tua quota, ti mostra quanto guadagni nella dashboard e gestisce la distribuzione. Tu vedi i soldi arrivare, senza pensare a nulla.",
      en: "Italy's Energy Services Manager (GSE) pays an incentive for each kWh of energy shared inside the REC. Karica calculates your share, shows you what you're earning on the dashboard and handles the payout. You see the money come in — no hassle.",
    },
    accentColor: "#39FF14",
    iconBg: "bg-green-primary/10",
  },
];

const COPY = {
  it: {
    aria: "Comunità Energetiche",
    kicker: "Comunità Energetiche",
    titleLine1: "Condividi energia con i tuoi vicini.",
    titleLine2: "Tutti risparmiano e tu guadagni.",
  },
  en: {
    aria: "Energy Communities",
    kicker: "Energy Communities",
    titleLine1: "Share energy with your neighbours.",
    titleLine2: "Everyone saves — and you earn.",
  },
} as const;

export default function CER() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="cer" aria-label={c.aria} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-darker to-bg-dark" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-cyan-accent font-semibold text-sm uppercase tracking-widest mb-3">
            {c.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight">
            {c.titleLine1}
            <br />
            <span className="text-gradient">{c.titleLine2}</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = open === i;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title.it}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full group"
                >
                  <div
                    className={`relative rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-card-bg ring-1"
                        : "bg-card-bg/50 hover:bg-card-bg ring-0 hover:ring-1"
                    }`}
                    style={
                      { "--tw-ring-color": item.accentColor + "30" } as React.CSSProperties
                    }
                  >
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                        isOpen ? "opacity-100" : "group-hover:opacity-60"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${item.accentColor}15 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                      <div
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${item.iconBg} flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? "scale-110" : "group-hover:scale-105"
                        }`}
                      >
                        <Icon size={22} style={{ color: item.accentColor }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                          {item.title[lang]}
                        </h3>
                        <p className="text-[11px] sm:text-sm text-text-muted mt-0.5 leading-snug">
                          {item.subtitle[lang]}
                        </p>
                      </div>

                      <ChevronRight
                        size={20}
                        className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${
                          isOpen ? "rotate-90" : "group-hover:translate-x-1"
                        }`}
                        style={isOpen ? { color: item.accentColor } : undefined}
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-3 ml-16 sm:ml-19">
                        <div
                          className="w-8 h-0.5 rounded-full mb-3"
                          style={{ backgroundColor: item.accentColor + "40" }}
                        />
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {item.detail[lang]}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
