"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Send, Loader2, Sparkles, RotateCcw } from "lucide-react";

const suggestions = [
  "Quanto costa un impianto fotovoltaico?",
  "Come funziona una Comunità Energetica?",
  "Che incentivi ci sono nel 2026?",
  "Conviene la pompa di calore?",
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Mode = "idle" | "loading" | "error";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ChiediAKarica() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("idle");
  const [error, setError] = useState("");
  const scrollAnchor = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message when the conversation grows or is loading
  useEffect(() => {
    if (messages.length === 0 && mode !== "loading" && mode !== "error") return;
    scrollAnchor.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, mode]);

  async function sendRequest(convo: Message[]) {
    setMode("loading");
    setError("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: convo.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        if (res.status === 429) throw new Error("rate");
        if (res.status === 422) throw new Error("safety");
        if (res.status >= 500) throw new Error("server");
        throw new Error("request");
      }

      const data = await res.json();
      const botMsg: Message = {
        id: uid(),
        role: "assistant",
        content: data.answer,
      };
      setMessages([...convo, botMsg]);
      setMode("idle");
    } catch (err) {
      const kind = err instanceof Error ? err.message : "";
      if (kind === "rate") {
        setError("Oh! Troppe domande di fila — dammi un attimo e riprova.");
      } else if (kind === "safety") {
        setError("Non riesco a rispondere a questa — prova a riformularla.");
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

  async function handleAsk(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: uid(), role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    await sendRequest(next);
  }

  async function handleRetry() {
    // `messages` already ends with the failed user message — just re-send it
    if (messages.length === 0) return;
    if (messages[messages.length - 1].role !== "user") return;
    await sendRequest(messages);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleAsk(input);
  }

  function handleReset() {
    setMessages([]);
    setInput("");
    setError("");
    setMode("idle");
  }

  const isEmpty = messages.length === 0 && mode === "idle";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className=""
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-green-primary" />
          <p className="text-green-primary font-semibold text-xs uppercase tracking-widest">
            Chiedi a Karica
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-[11px] text-text-muted hover:text-green-primary transition-colors font-medium"
          >
            <RotateCcw size={12} />
            Nuova conversazione
          </button>
        )}
      </div>

      {/* Conversation area */}
      <div className="space-y-4 mb-5">
        {/* Empty state — big cacatua + greeting */}
        {isEmpty && (
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-green-primary/20 blur-2xl rounded-full" />
              <Image
                src="/graphics/Karica_Logo_Felice.png"
                alt="Karica"
                width={80}
                height={80}
                className="relative h-16 w-auto sm:h-20 animate-float"
              />
            </div>
            <div className="flex-1 min-w-0 pt-2">
              <div className="bubble">
                <p className="text-text-primary text-sm sm:text-base font-bold mb-1">
                  Ciao! Sono Karica 🦜
                </p>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  Chiedimi di energia, incentivi, pannelli, CER o bollette.
                  Puoi anche farmi domande di approfondimento — mi ricordo
                  quello di cui abbiamo appena parlato.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Threaded messages */}
        <AnimatePresence initial={false}>
          {messages.map((m) =>
            m.role === "user" ? (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-end"
              >
                <div className="max-w-[85%] bg-cyan-accent/10 border border-cyan-accent/30 rounded-2xl rounded-br-sm px-4 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                  <p className="text-[11px] uppercase tracking-wider text-cyan-accent/80 font-semibold mb-1">
                    Tu
                  </p>
                  <p className="text-text-primary text-sm leading-relaxed">
                    {m.content}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.95, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-2 sm:gap-3"
              >
                <Image
                  src="/graphics/Karica_Logo_Felice.png"
                  alt=""
                  aria-hidden
                  width={40}
                  height={40}
                  className="flex-shrink-0 h-9 w-auto sm:h-10 mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="bubble">
                    <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                      {m.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          )}

          {/* Loading bubble (bot thinking) */}
          {mode === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-2 sm:gap-3"
            >
              <Image
                src="/graphics/Karica_Logo_Felice.png"
                alt=""
                aria-hidden
                width={40}
                height={40}
                className="flex-shrink-0 h-9 w-auto sm:h-10 mt-1 animate-bounce"
              />
              <div className="flex-1 min-w-0">
                <div className="bubble inline-block">
                  <div className="flex gap-1.5 items-center py-0.5">
                    <span
                      className="w-2 h-2 rounded-full bg-green-primary animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-cyan-accent animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-pink-accent animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error bubble */}
          {mode === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-2 sm:gap-3"
            >
              <Image
                src="/graphics/Karica_Logo_Felice.png"
                alt=""
                aria-hidden
                width={40}
                height={40}
                className="flex-shrink-0 h-9 w-auto sm:h-10 mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="bubble bubble-error">
                  <p className="text-pink-accent text-sm font-semibold mb-1">
                    Ops!
                  </p>
                  <p className="text-text-secondary text-xs mb-3">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-accent hover:text-cyan-accent/80 transition-colors"
                  >
                    Riprova &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={scrollAnchor} />
      </div>

      {/* Suggestion pills — only on empty state */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 ml-[68px] sm:ml-[96px]"
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
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            messages.length === 0
              ? "Scrivi la tua domanda..."
              : "Fai una domanda di approfondimento..."
          }
          className="flex-1 min-w-0 bg-card-bg border border-card-border rounded-full px-4 py-2.5 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-green-primary/60 focus:shadow-[0_0_0_3px_rgba(57,255,20,0.08)] transition-all"
        />
        <button
          type="submit"
          disabled={mode === "loading" || !input.trim()}
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
