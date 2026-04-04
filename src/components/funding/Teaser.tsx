"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Shield } from "lucide-react";
import Counter from "../Counter";

export default function Teaser() {
  return (
    <section id="opportunita" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-bg-darker" />
      <div className="glow-orb absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-green-primary/[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
            L&apos;opportunità
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
            Perché stai guardando{" "}
            <span className="text-gradient">questa pagina</span>
          </h2>
          <div className="space-y-4 text-lg text-text-secondary">
            <p>
              Il mercato dell&apos;efficientamento energetico residenziale in Italia è enorme,
              frammentato e senza un leader digitale.{" "}
              <strong className="text-text-primary">Karica lo sta organizzando.</strong>
            </p>
            <p>
              Abbiamo già un partner con{" "}
              <strong className="text-green-primary">5.000 clienti reali</strong>,
              un general contractor che esegue i lavori,
              e un piano che genera{" "}
              <strong className="text-green-primary">EBITDA positivo dal primo anno</strong>.
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
          {[
            { icon: TrendingUp, prefix: "€", target: 6.5, suffix: " milioni", label: "Ricavi previsti 2030", decimals: 1, color: "text-green-primary" },
            { icon: Users, prefix: "", target: 94750, suffix: "", label: "Utenti a regime", decimals: 0, color: "text-cyan-accent" },
            { icon: Shield, prefix: "", target: 8, suffix: "%", label: "Rendimento garantito", decimals: 0, color: "text-pink-accent" },
          ].map((kpi) => (
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
          <p className="text-text-muted text-sm mb-6">
            Il resto — strategia, numeri, struttura dell&apos;operazione — te lo raccontiamo di persona.
          </p>
          <a
            href="#cta"
            className="inline-block bg-green-primary text-bg-dark font-bold px-8 py-4 rounded-lg uppercase tracking-wider text-base hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
          >
            Richiedi il pitch deck
          </a>
        </motion.div>
      </div>
    </section>
  );
}
