"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { haptic } from "@/lib/haptics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function HomeCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validateEmail(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return "Serve una mail per restare aggiornato.";
    if (!EMAIL_RE.test(trimmed)) return "Formato mail non valido — controlla il punto e la @.";
    return "";
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    if (emailTouched) setEmailError(validateEmail(value));
  }

  function handleEmailBlur() {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    haptic("medium");

    const emailErr = validateEmail(email);
    setEmailTouched(true);
    setEmailError(emailErr);
    if (emailErr) {
      haptic("heavy");
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });

      if (!res.ok) {
        if (res.status >= 400 && res.status < 500) throw new Error("validation");
        throw new Error("server");
      }
      setSubmitted(true);
      haptic("success");
    } catch (err) {
      haptic("heavy");
      const kind = err instanceof Error ? err.message : "";
      if (kind === "validation") {
        setSubmitError("La mail non ci piace — prova un altro indirizzo.");
      } else if (kind === "server") {
        setSubmitError("Il server fa i capricci. Riprova tra un minuto o scrivici a info@karica.it.");
      } else {
        setSubmitError("Connessione persa. Controlla la rete e riprova.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section aria-label="Resta aggiornato su Karica" className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />
      <div className="glow-orb-slow absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-cyan-accent/[0.04] blur-[80px]" />

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt=""
              aria-hidden
              width={48}
              height={48}
              className="h-12 w-auto animate-float-slow"
            />
            <Image
              src="/graphics/Karica_Scritta_WHITE.png"
              alt="Karica"
              width={140}
              height={40}
              className="h-9 w-auto"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-4">
            Presto disponibile{" "}
            <span className="text-gradient">nella tua regione</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg mb-8 max-w-md mx-auto">
            Lascia la tua mail e sarai tra i primi a provarla.
          </p>

          <div className="card-glow p-6 sm:p-8 text-left">
            <div className="relative z-10">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="relative inline-block mb-3">
                    <div className="absolute inset-0 bg-green-primary/20 blur-xl rounded-full" />
                    <CheckCircle className="relative text-green-primary" size={48} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">
                    Ci siamo!
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Ti scriviamo appena ci sono novità.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    placeholder="la-tua-email@esempio.com"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "newsletter-email-error" : undefined}
                    className={`w-full bg-bg-darker border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none transition-all ${
                      emailError
                        ? "border-pink-accent/60 focus:border-pink-accent focus:shadow-[0_0_12px_rgba(255,77,109,0.15)]"
                        : "border-card-border focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)]"
                    }`}
                  />
                  {emailError && (
                    <p
                      id="newsletter-email-error"
                      className="flex items-center gap-1.5 text-pink-accent text-xs"
                    >
                      <AlertCircle size={12} className="flex-shrink-0" />
                      {emailError}
                    </p>
                  )}

                  {submitError && (
                    <div className="flex items-start gap-2 rounded-lg bg-pink-accent/5 border border-pink-accent/20 px-3 py-2.5">
                      <AlertCircle size={14} className="flex-shrink-0 text-pink-accent mt-0.5" />
                      <p className="text-pink-accent text-xs leading-relaxed">{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-press w-full flex items-center justify-center gap-2 bg-green-primary text-bg-dark font-bold py-3.5 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-colors hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(57,255,20,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                    Resta aggiornato
                  </button>
                </form>
              )}
            </div>
          </div>

          <p className="text-text-disabled text-xs mt-5">
            Niente spam. Solo quando ci sono novità che contano.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
