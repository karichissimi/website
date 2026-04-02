"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Calendar, CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Qualcosa è andato storto. Riprova o scrivici a info@karica.it");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="cta" className="relative py-24 sm:py-32 bg-bg-dark overflow-hidden">
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-primary/[0.06] blur-[120px]" />
      <div className="glow-orb-slow absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-cyan-accent/[0.05] blur-[80px]" />

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt="Karica"
              width={44}
              height={44}
              className="h-11 w-auto animate-float-slow"
            />
            <Image
              src="/graphics/Karica_Scritta_WHITE.png"
              alt="Karica"
              width={120}
              height={34}
              className="h-8 w-auto"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-3">
            Vuoi saperne{" "}
            <span className="text-gradient">di più</span>?
          </h2>
          <p className="text-text-secondary">
            Ricevi il pitch deck completo con tutti i dettagli dell&apos;operazione.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-glow p-6 sm:p-8"
        >
          <div className="relative z-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-green-primary/20 blur-xl rounded-full" />
                  <CheckCircle className="relative text-green-primary" size={56} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Richiesta inviata!
                </h3>
                <p className="text-text-secondary text-sm">
                  Ti invieremo il pitch deck completo entro 24 ore.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-text-secondary mb-1.5">
                    Nome e cognome
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mario Rossi"
                    className="w-full bg-bg-darker border border-card-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-text-secondary mb-1.5">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mario@email.com"
                    className="w-full bg-bg-darker border border-card-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)] transition-all"
                  />
                </div>

                {error && (
                  <p className="text-pink-accent text-xs text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-green-primary text-bg-dark font-bold py-4 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  Richiedi il pitch deck
                </button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="section-divider w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card-bg px-4 text-text-muted text-xs">oppure</span>
                  </div>
                </div>

                <a
                  href="#"
                  className="w-full flex items-center justify-center gap-2 border border-card-border text-text-secondary font-semibold py-3.5 rounded-lg text-sm hover:border-cyan-accent/50 hover:text-cyan-accent transition-all hover:shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                >
                  <Calendar size={16} />
                  Prenota una call con il team
                </a>
              </form>
            )}
          </div>
        </motion.div>

        <p className="text-center text-text-disabled text-xs mt-6">
          Documento riservato. Nessun impegno richiesto.
        </p>
      </div>
    </section>
  );
}
