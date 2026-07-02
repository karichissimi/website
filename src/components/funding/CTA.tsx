"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Calendar, CheckCircle, Loader2, AlertCircle, Sparkles, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";
import KaricaWordmark from "@/components/KaricaWordmark";

const COPY = {
  it: {
    aria: "Richiedi il pitch deck",
    emptyEmail: "Serve una mail per spedirti il pitch deck.",
    invalidEmail: "Formato mail non valido — controlla il punto e la @.",
    submitError400: "La mail non ci piace — prova un altro indirizzo.",
    submitError500: "Il nostro server fa i capricci. Riprova tra un minuto o scrivici a info@karica.it.",
    submitErrorNet: "Connessione persa. Controlla la rete e riprova.",
    titlePre: "Vuoi saperne ",
    titleHighlight: "di più",
    titlePost: "?",
    intro: "Ricevi il pitch deck completo con tutti i dettagli dell'operazione.",
    ffKicker: "Sei in Family & Friends?",
    ffBody: "Detrazione IRPEF 65% + 10% sconto sui lavori",
    successTitle: "Richiesta inviata!",
    successBody: "Ti invieremo il pitch deck completo entro 24 ore.",
    nameLabel: "Nome e cognome",
    namePlaceholder: "Mario Rossi",
    emailLabel: "Email *",
    emailPlaceholder: "mario@email.com",
    cta: "Richiedi il pitch deck",
    orDivider: "oppure",
    bookCall: "Prenota una call con il team",
    disclaimer: "Documento riservato. Nessun impegno richiesto.",
  },
  en: {
    aria: "Request the pitch deck",
    emptyEmail: "We need an email to send you the pitch deck.",
    invalidEmail: "That doesn't look right — check the dot and the @.",
    submitError400: "We don't like that email — try another address.",
    submitError500: "Our server is having a moment. Try again in a minute or write to info@karica.it.",
    submitErrorNet: "Lost the connection. Check your network and try again.",
    titlePre: "Want to know ",
    titleHighlight: "more",
    titlePost: "?",
    intro: "Get the full pitch deck with all the deal details.",
    ffKicker: "Are you in Family & Friends?",
    ffBody: "65% personal income tax relief + 10% off the works",
    successTitle: "Request sent!",
    successBody: "We'll send you the full pitch deck within 24 hours.",
    nameLabel: "Full name",
    namePlaceholder: "Mario Rossi",
    emailLabel: "Email *",
    emailPlaceholder: "mario@email.com",
    cta: "Request the pitch deck",
    orDivider: "or",
    bookCall: "Book a call with the team",
    disclaimer: "Confidential document. No commitment required.",
  },
} as const;

// Simple but solid email check — not exhaustive, just catches common mistakes
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function CTA() {
  const { lang } = useLang();
  const t = COPY[lang];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validateEmail(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return t.emptyEmail;
    if (!EMAIL_RE.test(trimmed)) return t.invalidEmail;
    return "";
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    // Re-validate as user types, but only if they've already blurred once
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
        body: JSON.stringify({ name, email, source: "investiora" }),
      });

      if (!res.ok) {
        // Distinguish server-side validation from generic server failure
        if (res.status >= 400 && res.status < 500) {
          throw new Error("validation");
        }
        throw new Error("server");
      }
      setSubmitted(true);
      haptic("success");
    } catch (err) {
      haptic("heavy");
      const kind = err instanceof Error ? err.message : "";
      if (kind === "validation") setSubmitError(t.submitError400);
      else if (kind === "server") setSubmitError(t.submitError500);
      else setSubmitError(t.submitErrorNet);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="cta" aria-label={t.aria} className="relative py-24 sm:py-32 bg-bg-dark overflow-hidden">
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
              alt=""
              aria-hidden
              width={44}
              height={44}
              className="h-11 w-auto animate-float-slow"
            />
            <KaricaWordmark className="text-[44px]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-3">
            {t.titlePre}
            <span className="text-gradient">{t.titleHighlight}</span>
            {t.titlePost}
          </h2>
          <p className="text-text-secondary">{t.intro}</p>
        </motion.div>

        {/* F&F cross-link — chi è in Family & Friends ha un vantaggio extra
            (detrazione 65% + 10% sconto lavori): qui sotto trova la pagina dedicata. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href="/detrazione"
            onClick={() => haptic("light")}
            className="btn-press-soft group block rounded-xl border border-cyan-accent/30 bg-cyan-accent/[0.06] hover:bg-cyan-accent/[0.10] hover:border-cyan-accent/50 transition-all p-4 sm:p-5"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-cyan-accent/15 flex items-center justify-center">
                <Sparkles size={18} className="text-cyan-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-cyan-accent text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5">
                  {t.ffKicker}
                </p>
                <p className="text-text-primary text-sm sm:text-base font-semibold leading-snug">
                  {t.ffBody}
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="flex-shrink-0 text-text-muted group-hover:text-cyan-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </Link>
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
                  {t.successTitle}
                </h3>
                <p className="text-text-secondary text-sm">
                  {t.successBody}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-text-secondary mb-1.5">
                    {t.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-bg-darker border border-card-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-text-secondary mb-1.5">
                    {t.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    placeholder={t.emailPlaceholder}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                    className={`w-full bg-bg-darker border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none transition-all ${
                      emailError
                        ? "border-pink-accent/60 focus:border-pink-accent focus:shadow-[0_0_12px_rgba(255,77,109,0.15)]"
                        : "border-card-border focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)]"
                    }`}
                  />
                  {emailError && (
                    <p
                      id="email-error"
                      className="mt-1.5 flex items-center gap-1.5 text-pink-accent text-xs"
                    >
                      <AlertCircle size={12} className="flex-shrink-0" />
                      {emailError}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="flex items-start gap-2 rounded-lg bg-pink-accent/5 border border-pink-accent/20 px-3 py-2.5">
                    <AlertCircle size={14} className="flex-shrink-0 text-pink-accent mt-0.5" />
                    <p className="text-pink-accent text-xs leading-relaxed">{submitError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-press w-full flex items-center justify-center gap-2 bg-green-primary text-bg-dark font-bold py-4 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {t.cta}
                </button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="section-divider w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card-bg px-4 text-text-muted text-xs">{t.orDivider}</span>
                  </div>
                </div>

                <a
                  href="https://calendly.com/alessandro-zanin-karica/new-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => haptic("medium")}
                  className="btn-press w-full flex items-center justify-center gap-2 border border-card-border text-text-secondary font-semibold py-3.5 rounded-lg text-sm hover:border-cyan-accent/50 hover:text-cyan-accent transition-all hover:shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                >
                  <Calendar size={16} />
                  {t.bookCall}
                </a>
              </form>
            )}
          </div>
        </motion.div>

        <p className="text-center text-text-disabled text-xs mt-6">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}
