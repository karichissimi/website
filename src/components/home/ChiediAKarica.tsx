"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Send, Loader2, Sparkles } from "lucide-react";

const suggestions = [
  "Quanto costa un impianto fotovoltaico?",
  "Come funziona una Comunità Energetica?",
  "Che incentivi ci sono nel 2026?",
  "Conviene la pompa di calore?",
];

type Mode = "idle" | "loading" | "answer" | "error";

export default function ChiediAKarica() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>("idle");

  async function handleAsk(q: string) {
    const text = (q || question).trim();
    if (!text) return;

    setMode("loading");
    setError("");
    setAnswer("");
    setQuestion(text);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      if (!res.ok) {
        if (res.status === 429) throw new Error("rate");
        if (res.status >= 500) throw new Error("server");
        throw new Error("request");
      }

      const data = await res.json();
      setAnswer(data.answer);
      setMode("answer");
    } catch (err) {
      const kind = err instanceof Error ? err.message : "";
      if (kind === "rate") {
        setError("Oh! Troppe domande di fila — dammi un attimo e riprova.");
      } else if (kind === "server") {
        setError("Il mio cervello ha avuto un hiccup. Riprova tra un minuto.");
      } else if (kind === "request") {
        setError("Non ho capito la richiesta — prova a riformularla.");
      } else {
        setError("Ho perso la connessione. Controlla la rete e riprova.");
      }
      setMode("error");
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleAsk(question);
  }

  function handleReset() {
    setAnswer("");
    setQuestion("");
    setError("");
    setMode("idle");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 pt-10 border-t border-card-border/30"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={14} className="text-green-primary" />
        <p className="text-green-primary font-semibold text-xs uppercase tracking-widest">
          Chiedi a Karica
        </p>
      </div>

      {/* Cacatua + balloon stage */}
      <div className="flex items-start gap-3 sm:gap-4 mb-5">
        {/* Cacatua character */}
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-green-primary/20 blur-2xl rounded-full" />
          <Image
            src="/graphics/Karica_Logo_Felice.png"
            alt="Karica"
            width={80}
            height={80}
            className={`relative h-16 w-auto sm:h-20 ${
              mode === "loading" ? "animate-bounce" : "animate-float"
            }`}
          />
        </div>

        {/* Speech bubble */}
        <div className="flex-1 min-w-0 pt-2">
          <AnimatePresence mode="wait">
            {mode === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bubble"
              >
                <p className="text-text-primary text-sm sm:text-base font-bold mb-1">
                  Ciao! Sono Karica 🦜
                </p>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  Chiedimi di energia, incentivi, pannelli, CER o bollette.
                  Rispondo al volo — prova con uno dei suggerimenti qui sotto.
                </p>
              </motion.div>
            )}

            {mode === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -10 }}
                transition={{ duration: 0.25 }}
                className="bubble inline-block"
              >
                <p className="text-text-muted text-[11px] uppercase tracking-wider font-semibold mb-1.5">
                  Ci penso un secondo...
                </p>
                <div className="flex gap-1.5 items-center">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-green-primary animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-cyan-accent animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-pink-accent animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </motion.div>
            )}

            {mode === "answer" && (
              <motion.div
                key="answer"
                initial={{ opacity: 0, scale: 0.95, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bubble"
              >
                {question && (
                  <p className="text-text-muted text-[11px] uppercase tracking-wider font-semibold mb-2">
                    Hai chiesto: <span className="text-text-secondary normal-case tracking-normal">{question}</span>
                  </p>
                )}
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                  {answer}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-primary hover:text-green-dark transition-colors"
                >
                  Un&apos;altra domanda &rarr;
                </button>
              </motion.div>
            )}

            {mode === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -10 }}
                transition={{ duration: 0.3 }}
                className="bubble bubble-error"
              >
                <p className="text-pink-accent text-sm font-semibold mb-1">
                  Ops! Qualcosa non ha funzionato.
                </p>
                <p className="text-text-secondary text-xs mb-3">{error}</p>
                <button
                  onClick={handleReset}
                  className="text-xs font-semibold text-cyan-accent hover:text-cyan-accent/80 transition-colors"
                >
                  Riprova &rarr;
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Suggestion pills */}
      {mode === "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 ml-[72px] sm:ml-[96px]"
        >
          <p className="text-[11px] text-text-muted mb-2 font-medium">
            Tocca una domanda 👇
          </p>
          <div className="flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              onClick={() => handleAsk(s)}
              className="text-[11px] sm:text-xs px-4 py-2.5 min-h-[40px] rounded-full bg-card-bg border border-card-border text-text-secondary hover:border-green-primary/50 hover:text-green-primary hover:bg-green-primary/5 transition-all hover:-translate-y-0.5"
            >
              {s}
            </motion.button>
          ))}
          </div>
        </motion.div>
      )}

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 ml-[72px] sm:ml-[96px]"
      >
        <input
          type="text"
          value={mode === "idle" || mode === "error" ? question : ""}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Scrivi la tua domanda..."
          disabled={mode === "loading"}
          className="flex-1 min-w-0 bg-card-bg border border-card-border rounded-full px-4 py-2.5 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-green-primary/60 focus:shadow-[0_0_0_3px_rgba(57,255,20,0.08)] transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={mode === "loading" || !question.trim()}
          aria-label="Invia domanda"
          className="flex-shrink-0 bg-green-primary text-bg-dark font-bold w-11 h-11 flex items-center justify-center rounded-full hover:bg-green-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(57,255,20,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {mode === "loading" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </form>
    </motion.div>
  );
}
