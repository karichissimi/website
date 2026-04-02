"use client";

import { motion } from "framer-motion";
import Accordion from "../Accordion";
import { Zap, Users, HardHat, TrendingUp } from "lucide-react";

export default function Opportunita() {
  return (
    <section id="opportunita" className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-4">
            Cosa fa <span className="text-green-primary">Karica</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Karica è il marketplace verticale della transizione energetica residenziale.
            Connette chi vuole risparmiare con chi esegue i lavori, attraverso un processo digitale end-to-end.
          </p>
        </motion.div>

        {/* Simple explanation cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid sm:grid-cols-2 gap-4 mb-10"
        >
          {[
            {
              icon: Users,
              title: "Vende alle utility",
              text: "Ogni utility partner porta i propri clienti sulla piattaforma. Costo di acquisizione utenti: zero. Nel 2030, il 62% degli utenti arriva dai partner a CAC zero.",
            },
            {
              icon: Zap,
              title: "Il laboratorio controllato",
              text: "Si parte da Entraco (5.000 clienti reali) per validare il modello in un ambiente controllato. Come Airbnb: prima una città, poi il mondo.",
            },
            {
              icon: HardHat,
              title: "Esecuzione garantita",
              text: "I lavori li esegue la rete di partner certificati. Nella fase 1 è ENERBee. Dalla fase 2 si apre con la Karica Academy.",
            },
            {
              icon: TrendingUp,
              title: "10 fonti di ricavo",
              text: "3 pillar Core (interventi, switch energia, finanziamenti) + 7 di supporto. Revenue diversificata dal primo anno.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-green-primary/30 transition-colors"
            >
              <card.icon className="text-green-primary mb-3" size={24} />
              <h3 className="text-base font-bold text-text-primary mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-text-secondary">{card.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Expandable details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-3"
        >
          <Accordion title="Perché il mercato energia ha bisogno di Karica?">
            <div className="space-y-3 text-text-secondary text-sm">
              <p>
                30 milioni di famiglie italiane pagano troppo e non sanno perché.
                Le bollette sono incomprensibili, gli installatori frammentati,
                i finanziamenti difficili da trovare. <strong className="text-text-primary">Nessuno guida il cliente dall&apos;inizio alla fine.</strong>
              </p>
              <p>
                Nel frattempo l&apos;Europa impone la transizione: la direttiva EPBD
                obbliga a riqualificare milioni di edifici entro il 2030.
                Il mercato c&apos;è già, serve solo qualcuno che lo organizzi.
              </p>
            </div>
          </Accordion>

          <Accordion title="Come guadagna Karica?">
            <div className="space-y-4 text-sm">
              <p className="text-text-muted text-xs font-semibold uppercase tracking-wide">3 Pillar Core</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { name: "Interventi", fee: "10% fee su GMV lavori", desc: "Fee su ogni lavoro completato tramite la piattaforma" },
                  { name: "Switch Energia", fee: "€50 bounty + €5/mese trailing", desc: "Commissione sul cambio fornitore energia" },
                  { name: "Finanziamenti", fee: "3% + 0.3%/anno trailing", desc: "Origination prestiti green tramite partner bancari" },
                ].map((p) => (
                  <div key={p.name} className="bg-bg-dark rounded-lg p-4 border border-card-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-text-primary font-semibold">{p.name}</span>
                      <span className="text-green-primary text-xs font-bold">{p.fee}</span>
                    </div>
                    <p className="text-text-muted text-xs">{p.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-xs mt-2">
                Più 7 pillar di supporto: canoni White Label, Academy, Subscription Pro, Marketplace prodotti, O&amp;M post-vendita, CER, Data Products.
              </p>
            </div>
          </Accordion>

          <Accordion title="Perché Karica parte con un vantaggio?">
            <div className="space-y-3 text-text-secondary text-sm">
              <p>
                <strong className="text-text-primary">Entraco</strong> (fornitore energia, 5.000 clienti reali)
                ha già firmato un contratto triennale. I dati di consumo sono pre-compilati:
                l&apos;utente apre l&apos;app e trova la sua diagnosi energetica pronta.
              </p>
              <p>
                <strong className="text-text-primary">ENERBee Group</strong> garantisce l&apos;esecuzione nella fase 1.
                Dalla fase 2, la Karica Academy costruisce una rete di partner certificati indipendente — il vero moat competitivo.
              </p>
              <p>
                Il 62% degli utenti al 2030 arriverà dai partner White Label.
                <strong className="text-text-primary"> Costo di acquisizione: zero.</strong>
              </p>
            </div>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
