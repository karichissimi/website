"use client";

import { motion } from "framer-motion";

const partners = [
  {
    name: "ENERBee",
    role: "General Contractor",
    detail: "Esegue i lavori di riqualificazione",
    color: "border-green-primary/30 hover:border-green-primary/60",
    textColor: "text-green-primary",
    dotBg: "bg-green-primary",
    url: null,
  },
  {
    name: "Entraco",
    role: "Fornitore energia",
    detail: "5.000 clienti reali con dati consumi",
    color: "border-cyan-accent/30 hover:border-cyan-accent/60",
    textColor: "text-cyan-accent",
    dotBg: "bg-cyan-accent",
    url: "https://www.entraco.it",
  },
  {
    name: "EC Hub",
    role: "Rete CER",
    detail: "Comunità Energetiche su scala nazionale",
    color: "border-green-primary/30 hover:border-green-primary/60",
    textColor: "text-green-primary",
    dotBg: "bg-green-primary",
    url: "https://echub.it",
  },
  {
    name: "Partner Bancari",
    role: "Finanziamenti",
    detail: "Prestiti green integrati nell'app",
    color: "border-cyan-accent/30 hover:border-cyan-accent/60",
    textColor: "text-cyan-accent",
    dotBg: "bg-cyan-accent",
    url: null,
  },
];

export default function Ecosistema() {
  return (
    <section id="ecosistema" className="relative py-24 sm:py-32 bg-bg-dark overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.12]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-4">
            Un <span className="text-gradient">marketplace</span>, non un&apos;app
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Karica connette domanda e offerta della transizione energetica
            attraverso un ecosistema di partner già operativi.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card-glow p-8 sm:p-10"
        >
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Central hub */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-primary/20 blur-xl rounded-xl" />
              <div className="relative bg-bg-darker border border-green-primary/40 rounded-xl px-8 py-4 text-green-primary font-bold text-center text-lg">
                KARICA
              </div>
            </div>

            {/* Connection lines */}
            <div className="w-px h-6 bg-gradient-to-b from-green-primary/60 to-card-border" />

            {/* Partners */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative block bg-bg-darker border rounded-xl p-4 text-center transition-all duration-300 ${partner.color} hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] cursor-pointer`}
                    >
                      {/* Live indicator */}
                      <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${partner.dotBg}`} />
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${partner.dotBg}`} />
                      </span>
                      <p className={`font-bold text-sm ${partner.textColor} group-hover:underline underline-offset-4 decoration-2`}>
                        {partner.name}
                      </p>
                      <p className="text-text-muted text-xs mt-0.5">{partner.role}</p>
                      <p className="text-text-disabled text-[11px] mt-2">{partner.detail}</p>
                      <p className={`text-[10px] mt-2 font-semibold uppercase tracking-wider ${partner.textColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                        Visita il sito &rarr;
                      </p>
                    </a>
                  ) : (
                    <div className="bg-bg-darker/60 border border-card-border/50 rounded-xl p-4 text-center cursor-default">
                      <p className={`font-bold text-sm ${partner.textColor} opacity-70`}>
                        {partner.name}
                      </p>
                      <p className="text-text-muted text-xs mt-0.5 opacity-70">{partner.role}</p>
                      <p className="text-text-disabled text-[11px] mt-2">{partner.detail}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
