"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Loader2 } from "lucide-react";

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
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="text-green-primary" size={18} />
        <h3 className="text-lg font-bold text-text-primary">
          Chiedi a Karica
        </h3>
      </div>

      <p className="text-text-muted text-sm mb-5">
        Hai una domanda su energia, incentivi o risparmio? Chiedi qui.
      </p>

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

      {/* Answer */}
      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-green-primary/5 border border-green-primary/20 p-4"
        >
          <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
            {answer}
          </p>
          <button
            onClick={() => { setAnswer(""); setQuestion(""); }}
            className="mt-3 text-xs text-green-primary hover:text-green-dark transition-colors"
          >
            Fai un&apos;altra domanda →
          </button>
        </motion.div>
      )}

      {error && (
        <p className="text-pink-accent text-xs mt-2">{error}</p>
      )}
    </motion.div>
  );
}
