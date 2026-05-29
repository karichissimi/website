"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const COPY = {
  it: {
    emptyEmail: "Serve una mail per metterti in lista.",
    invalidEmail: "Formato mail non valido — controlla il punto e la @.",
    submitError400: "La mail non ci piace — prova un altro indirizzo.",
    submitError500: "Il server fa i capricci. Riprova tra un minuto o scrivici a info@karica.it.",
    submitErrorNet: "Connessione persa. Controlla la rete e riprova.",
    successTitle: "Sei in lista.",
    successBody: "Ti scriviamo quando l'app è pronta per te.",
    emailLabel: "Email",
    emailPlaceholder: "la-tua-email@esempio.com",
    cta: "Entra in waitlist",
  },
  en: {
    emptyEmail: "We need an email to put you on the list.",
    invalidEmail: "That doesn't look right — check the dot and the @.",
    submitError400: "We don't like that email — try another address.",
    submitError500: "Our server is having a moment. Try again in a minute or write to info@karica.it.",
    submitErrorNet: "Lost the connection. Check your network and try again.",
    successTitle: "You're on the list.",
    successBody: "We'll write you when the app is ready for you.",
    emailLabel: "Email",
    emailPlaceholder: "your-email@example.com",
    cta: "Join the waitlist",
  },
} as const;

export default function WaitlistForm() {
  const { lang } = useLang();
  const t = COPY[lang];
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, source: "waitlist" }),
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
      if (kind === "validation") setSubmitError(t.submitError400);
      else if (kind === "server") setSubmitError(t.submitError500);
      else setSubmitError(t.submitErrorNet);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="relative inline-block mb-3">
          <div className="absolute inset-0 bg-green-primary/20 blur-xl rounded-full" />
          <CheckCircle className="relative text-green-primary" size={48} />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-1">
          {t.successTitle}
        </h3>
        <p className="text-text-secondary text-sm">
          {t.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="waitlist-email" className="sr-only">
        {t.emailLabel}
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        onBlur={handleEmailBlur}
        placeholder={t.emailPlaceholder}
        aria-invalid={!!emailError}
        aria-describedby={emailError ? "waitlist-email-error" : undefined}
        className={`w-full bg-bg-darker border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none transition-all ${
          emailError
            ? "border-pink-accent/60 focus:border-pink-accent focus:shadow-[0_0_12px_rgba(255,77,109,0.15)]"
            : "border-card-border focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)]"
        }`}
      />
      {emailError && (
        <p
          id="waitlist-email-error"
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
        {t.cta}
      </button>
    </form>
  );
}
