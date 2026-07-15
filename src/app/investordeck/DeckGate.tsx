"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Loader2, AlertCircle, Download, ExternalLink } from "lucide-react";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";
import PdfViewer from "./PdfViewer";

const COPY = {
  it: {
    title: "Investor ",
    titleHighlight: "Deck",
    intro: "Area riservata. Inserisci la password che hai ricevuto per accedere al deck.",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••••",
    cta: "Sblocca il deck",
    wrongPassword: "Password non corretta. Riprova.",
    serverError: "Il server fa i capricci. Riprova o scrivici a info@karica.it.",
    netError: "Connessione persa. Riprova.",
    unlockedTitle: "Karica — Investor Deck",
    openTab: "Apri in una nuova scheda",
    download: "Scarica il PDF",
    confidential:
      "Documento riservato. Non condividere il link o la password senza il consenso di Karica.",
  },
  en: {
    title: "Investor ",
    titleHighlight: "Deck",
    intro: "Restricted area. Enter the password you received to access the deck.",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••••",
    cta: "Unlock the deck",
    wrongPassword: "Wrong password. Try again.",
    serverError: "Our server is having a moment. Try again or write to info@karica.it.",
    netError: "Lost the connection. Try again.",
    unlockedTitle: "Karica — Investor Deck",
    openTab: "Open in a new tab",
    download: "Download the PDF",
    confidential:
      "Confidential document. Do not share the link or the password without Karica's consent.",
  },
} as const;

const PDF_URL = "/api/investordeck";

export default function DeckGate() {
  const { lang } = useLang();
  const t = COPY[lang];

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  // Returning visitors with a valid cookie skip the form entirely.
  useEffect(() => {
    let cancelled = false;
    fetch(PDF_URL, { method: "HEAD", cache: "no-store" })
      .then((res) => {
        if (!cancelled && res.ok) setUnlocked(true);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    haptic("medium");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(PDF_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        haptic("success");
        setUnlocked(true);
      } else if (res.status === 401) {
        haptic("heavy");
        setError(t.wrongPassword);
      } else {
        setError(t.serverError);
      }
    } catch {
      setError(t.netError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 pt-28 pb-16 overflow-hidden">
      <div className="glow-orb absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

      <AnimatePresence mode="wait">
        {checking ? (
          <motion.div
            key="checking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex items-center justify-center py-24"
          >
            <Loader2 className="animate-spin text-text-muted" size={32} />
          </motion.div>
        ) : unlocked ? (
          <motion.div
            key="deck"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-5xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center gap-3">
                <Unlock className="text-green-primary" size={24} />
                {t.unlockedTitle}
              </h1>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener"
                  className="btn-press flex items-center gap-2 border border-card-border bg-card-bg text-text-secondary font-semibold px-4 py-2.5 rounded-lg text-sm hover:border-green-primary/60 hover:text-text-primary transition-colors"
                >
                  <ExternalLink size={16} />
                  {t.openTab}
                </a>
                <a
                  href={`${PDF_URL}?download=1`}
                  className="btn-press flex items-center gap-2 bg-green-primary text-bg-dark font-bold px-4 py-2.5 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-colors hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                >
                  <Download size={16} />
                  {t.download}
                </a>
              </div>
            </div>

            <PdfViewer url={PDF_URL} lang={lang} />
            <p className="mt-6 text-xs text-text-disabled">{t.confidential}</p>
          </motion.div>
        ) : (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative w-full max-w-md"
          >
            <div className="rounded-2xl border border-card-border bg-card-bg p-8 md:p-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-primary/20 blur-xl rounded-full" />
                  <Lock className="relative text-green-primary" size={40} />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-text-primary text-center mb-3">
                {t.title}
                <span className="text-green-primary">{t.titleHighlight}</span>
              </h1>
              <p className="text-text-secondary text-center mb-8">{t.intro}</p>

              <form onSubmit={handleSubmit} noValidate>
                <label
                  htmlFor="deck-password"
                  className="block text-sm font-semibold text-text-secondary mb-2"
                >
                  {t.passwordLabel}
                </label>
                <input
                  id="deck-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder={t.passwordPlaceholder}
                  className="w-full bg-bg-darker border border-card-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)] transition-all"
                />

                {error && (
                  <p
                    role="alert"
                    className="mt-3 flex items-center gap-2 text-sm text-pink-accent"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || password.length === 0}
                  className="btn-press mt-6 w-full flex items-center justify-center gap-2 bg-green-primary text-bg-dark font-bold py-4 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-colors hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={16} />}
                  {t.cta}
                </button>
              </form>
            </div>

            <p className="mt-6 text-xs text-text-disabled text-center">{t.confidential}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
