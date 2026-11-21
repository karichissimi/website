"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Loader2, AlertCircle, Download, ExternalLink } from "lucide-react";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";
import PdfViewer from "./PdfViewer";

const COPY = {
  it: {
    eyebrow: "Area riservata · Investitori",
    title: "Investor ",
    titleHighlight: "Deck",
    intro: "Inserisci la password che hai ricevuto per accedere al deck.",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••••",
    cta: "Sblocca il deck",
    wrongPassword: "Password non corretta. Riprova.",
    serverError: "Il server fa i capricci. Riprova o scrivici a info@karica.it.",
    netError: "Connessione persa. Riprova.",
    openTab: "Apri in una nuova scheda",
    download: "Scarica il PDF",
    confidential:
      "Documento riservato. Non condividere il link o la password senza il consenso di Karica.",
  },
  en: {
    eyebrow: "Restricted area · Investors",
    title: "Investor ",
    titleHighlight: "Deck",
    intro: "Enter the password you received to access the deck.",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••••",
    cta: "Unlock the deck",
    wrongPassword: "Wrong password. Try again.",
    serverError: "Our server is having a moment. Try again or write to info@karica.it.",
    netError: "Lost the connection. Try again.",
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
    <AnimatePresence mode="wait">
      {checking ? (
        <motion.div
          key="checking"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="kd-spinner"
        >
          <Loader2 className="animate-spin" size={32} />
        </motion.div>
      ) : unlocked ? (
        <motion.div
          key="deck"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="kd-deck"
        >
          <div className="kd-deck-head">
            <div>
              <span className="kd-eyebrow">{t.eyebrow}</span>
              <h1 className="kd-title">
                {t.title}
                <span className="kd-mark">{t.titleHighlight}</span>
              </h1>
            </div>
            <div className="kd-deck-actions">
              <a href={PDF_URL} target="_blank" rel="noopener" className="kd-btn kd-btn--paper">
                <ExternalLink size={16} />
                {t.openTab}
              </a>
              <a href={`${PDF_URL}?download=1`} className="kd-btn">
                <Download size={16} />
                {t.download}
              </a>
            </div>
          </div>

          <PdfViewer url={PDF_URL} lang={lang} />
          <p className="kd-note">{t.confidential}</p>
        </motion.div>
      ) : (
        <motion.div
          key="gate"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="kd-gate"
        >
          <div className="kd-card">
            <span className="kd-eyebrow">{t.eyebrow}</span>
            <h1 className="kd-title">
              {t.title}
              <span className="kd-mark">{t.titleHighlight}</span>
            </h1>
            <p className="kd-intro">{t.intro}</p>

            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="deck-password" className="kd-eyebrow kd-field-label">
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
                className="kd-input"
              />

              {error && (
                <p role="alert" className="kd-error">
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || password.length === 0}
                className="kd-btn kd-btn--block"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={16} />}
                {t.cta}
              </button>
            </form>
          </div>

          <p className="kd-note">{t.confidential}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
