"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send, Loader2 } from "lucide-react";

const suggestions = [
  "Quanto costa un impianto fotovoltaico?",
  "Come funziona una Comunità Energetica?",
  "Che incentivi ci sono nel 2026?",
  "Conviene la pompa di calore?",
];

export default function ChiediAKarica() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk(q: string) {
    const text = q || question;
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setQuestion(text);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Qualcosa è andato storto");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleAsk(question);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 pt-10 border-t border-card-border/30"
    >
      {/* Header with cacatua */}
      <div className="flex items-center gap-3 mb-5">
        <Image
          src="/graphics/Karica_Logo_Felice.png"
          alt="Karica"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
        <div>
          <h3 className="text-lg font-bold text-text-primary">
            Chiedi a Karica
          </h3>
          <p className="text-text-muted text-xs">
            Domande su energia, incentivi o risparmio? Chiedi qui.
          </p>
        </div>
      </div>

      {/* Suggestion pills */}
      {!answer && !loading && (
        <div className="flex flex-wrap gap-2 mb-5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleAsk(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-text-secondary hover:border-green-primary/30 hover:text-green-primary transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Scrivi la tua domanda..."
          disabled={loading}
          className="flex-1 bg-card-bg border border-card-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-green-primary/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="flex-shrink-0 bg-green-primary text-bg-dark font-bold px-4 py-3 rounded-xl hover:bg-green-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>

      {/* Loading state with cacatua */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start gap-3 p-4"
        >
          <Image
            src="/graphics/Karica_Logo_Felice.png"
            alt="Karica"
            width={28}
            height={28}
            className="h-7 w-auto animate-float mt-0.5"
          />
          <div className="flex gap-1.5 pt-2">
            <span className="w-2 h-2 rounded-full bg-green-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 rounded-full bg-green-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 rounded-full bg-green-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </motion.div>
      )}

      {/* Answer with cacatua avatar */}
      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3"
        >
          <Image
            src="/graphics/Karica_Logo_Felice.png"
            alt="Karica"
            width={28}
            height={28}
            className="h-7 w-auto flex-shrink-0 mt-1"
          />
          <div className="flex-1 rounded-xl bg-green-primary/5 border border-green-primary/20 p-4">
            <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
              {answer}
            </p>
            <button
              onClick={() => { setAnswer(""); setQuestion(""); }}
              className="mt-3 text-xs text-green-primary hover:text-green-dark transition-colors"
            >
              Fai un&apos;altra domanda &rarr;
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <div className="flex items-start gap-3 mt-2">
          <Image
            src="/graphics/Karica_Logo_Felice.png"
            alt="Karica"
            width={28}
            height={28}
            className="h-7 w-auto flex-shrink-0 mt-0.5"
          />
          <p className="text-pink-accent text-xs pt-2">{error}</p>
        </div>
      )}
    </motion.div>
  );
}
