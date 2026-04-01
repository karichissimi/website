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
            Karica è una piattaforma digitale che aiuta le aziende dell&apos;energia
            a guidare i propri clienti verso il risparmio energetico — e a guadagnarci sopra.
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
              text: "Karica si vende a fornitori di energia (come Entraco) che portano i loro clienti sulla piattaforma. Costo di acquisizione: zero.",
            },
            {
              icon: Zap,
              title: "Diagnosi automatica",
              text: "Con i dati reali di consumo, l'app mostra subito quanto si spreca e cosa fare. Nessun dato da inserire a mano.",
            },
            {
              icon: HardHat,
              title: "Lavori garantiti",
              text: "I lavori li esegue ENERBee, il General Contractor del gruppo. Karica guadagna una commissione su ogni intervento.",
            },
            {
              icon: TrendingUp,
              title: "4 fonti di ricavo",
              text: "Commissioni su lavori, fee CER, finanziamenti green, abbonamenti premium. Revenue diversificata, non dipendente da un solo canale.",
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
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Interventi", fee: "~8% sul valore dei lavori", desc: "Commissione su ogni lavoro eseguito dai partner" },
                  { name: "CER", fee: "~20% incentivo GSE", desc: "Fee su attivazione e gestione Comunità Energetiche" },
                  { name: "Finanziamenti", fee: "~1.5% sul finanziato", desc: "Commissione su prestiti green tramite partner bancari" },
                  { name: "Premium", fee: "Ricorrente", desc: "Abbonamenti PRO e marketplace B2B" },
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
                <strong className="text-text-primary">ENERBee Group</strong> è il General Contractor
                del gruppo — i lavori si eseguono senza cercare fornitori esterni.
              </p>
              <p>
                Il 72% degli utenti al 2030 arriverà dai partner White Label.
                <strong className="text-text-primary"> Costo di acquisizione: zero.</strong>
              </p>
            </div>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
