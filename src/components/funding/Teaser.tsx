"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Shield } from "lucide-react";
import Counter from "../Counter";
import { useLang } from "@/lib/i18n";

const COPY = {
  it: {
    aria: "L'opportunità di investimento",
    kicker: "L'opportunità",
    titlePre: "Perché stai guardando ",
    titleHighlight: "questa pagina",
    p1Pre:
      "Il mercato dell'efficientamento energetico residenziale in Italia è enorme, frammentato e senza un leader digitale. ",
    p1Bold: "Karica lo sta organizzando.",
    p2Pre: "Abbiamo già un partner con ",
    p2Bold1: "5.000 clienti reali",
    p2Mid:
      ", un general contractor che esegue i lavori, e un piano che genera ",
    p2Bold2: "EBITDA positivo dal primo anno",
    p2Post: ".",
    kpis: {
      revenue: "Ricavi previsti 2030",
      users: "Utenti a regime",
      ebitda: "EBITDA 2030",
    },
    hookCopy:
      "Il resto — strategia, numeri, struttura dell'operazione — te lo raccontiamo di persona.",
    cta: "Richiedi il pitch deck",
  },
  en: {
    aria: "The investment opportunity",
    kicker: "The opportunity",
    titlePre: "Why you're on ",
    titleHighlight: "this page",
    p1Pre:
      "Italy's residential energy-efficiency market is huge, fragmented and without a digital leader. ",
    p1Bold: "Karica is organising it.",
    p2Pre: "We already have a partner with ",
    p2Bold1: "5,000 real customers",
    p2Mid:
      ", a general contractor that executes the works, and a plan that delivers ",
    p2Bold2: "positive EBITDA from year one",
    p2Post: ".",
    kpis: {
      revenue: "Projected 2030 revenue",
      users: "Users at scale",
      ebitda: "2030 EBITDA",
    },
    hookCopy:
      "The rest — strategy, numbers, deal structure — we explain to you in person.",
    cta: "Request the pitch deck",
  },
} as const;

export default function Teaser() {
  const { lang } = useLang();
  const t = COPY[lang];

  const kpis = [
    {
      icon: TrendingUp,
      prefix: "€",
      target: 6.62,
      suffix: "M",
      label: t.kpis.revenue,
      decimals: 2,
      color: "text-green-primary",
    },
    {
      icon: Users,
      prefix: "",
      target: 94750,
      suffix: "",
      label: t.kpis.users,
      decimals: 0,
      color: "text-cyan-accent",
    },
    {
      icon: Shield,
      prefix: "",
      target: 46,
      suffix: "%",
      label: t.kpis.ebitda,
      decimals: 0,
      color: "text-cyan-accent",
    },
  ];

  return (
    <section
      id="opportunita"
      aria-label={t.aria}
      className="relative py-24 sm:py-32 overflow-hidden bg-bg-darker"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
            {t.titlePre}
            <span className="text-gradient">{t.titleHighlight}</span>
          </h2>
          <div className="space-y-4 text-lg text-text-secondary">
            <p>
              {t.p1Pre}
              <strong className="text-text-primary">{t.p1Bold}</strong>
            </p>
            <p>
              {t.p2Pre}
              <strong className="text-green-primary">{t.p2Bold1}</strong>
              {t.p2Mid}
              <strong className="text-green-primary">{t.p2Bold2}</strong>
              {t.p2Post}
            </p>
          </div>
        </motion.div>

        {/* 3 punchy numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-14"
        >
          {kpis.map((kpi) => (
            <div key={kpi.label} className="text-center">
              <kpi.icon className={`mx-auto mb-2 ${kpi.color}`} size={20} />
              <Counter
                target={kpi.target}
                prefix={kpi.prefix}
                suffix={kpi.suffix}
                decimals={kpi.decimals}
                className={`text-2xl sm:text-3xl font-black font-mono ${kpi.color}`}
              />
              <p className="text-xs text-text-muted mt-1">{kpi.label}</p>
            </div>
          ))}
        </motion.div>

        {/* The hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-text-muted text-sm mb-6">{t.hookCopy}</p>
          <a
            href="#cta"
            className="inline-block bg-green-primary text-bg-dark font-bold px-8 py-4 rounded-lg uppercase tracking-wider text-base hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
          >
            {t.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
