"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLang, FlagIT, FlagUK } from "@/lib/i18n";
import { haptic } from "@/lib/haptics";

/**
 * Cartoon speech bubble that pops out next to the cacatua mascot on first
 * visit and asks the user which language they prefer. Dismisses itself
 * after a choice is made (or the X is clicked) and persists the decision
 * in localStorage so the balloon never shows again.
 */
export default function LangBalloon() {
  const { hasChosen, hydrated, setLang, dismissChoice } = useLang();
  const [delayPassed, setDelayPassed] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setDelayPassed(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  const visible = hydrated && !hasChosen && delayPassed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="lang-balloon"
          initial={{ opacity: 0, scale: 0.6, x: -16, y: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -8, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className="fixed top-3 sm:top-4 left-3 sm:left-6 z-[120] pointer-events-auto select-none"
          role="dialog"
          aria-label="Language picker"
        >
          <div className="relative flex items-end gap-2 sm:gap-3">
            {/* Cacatua mascot — anchored to the balloon's bottom-left */}
            <motion.div
              animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex-shrink-0"
            >
              <div className="absolute inset-0 bg-green-primary/30 blur-xl rounded-full" />
              <Image
                src="/graphics/Karica_Logo_Felice.png"
                alt=""
                aria-hidden
                width={48}
                height={48}
                priority
                className="relative h-10 w-auto sm:h-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              />
            </motion.div>

            {/* Speech bubble — white card with a tail pointing to the cacatua */}
            <div className="relative">
              {/* Tail (left side, pointing back to the cacatua) — built with
                  two stacked triangles via CSS borders so it has the same
                  border colour as the bubble. */}
              <span
                aria-hidden
                className="absolute -left-[10px] bottom-3 w-0 h-0"
                style={{
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderRight: "12px solid #161B2E",
                }}
              />
              <span
                aria-hidden
                className="absolute -left-[7px] bottom-[14px] w-0 h-0"
                style={{
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderRight: "10px solid #ffffff",
                }}
              />

              <div className="relative bg-white text-bg-dark rounded-2xl px-4 py-3 sm:py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] border-2 border-bg-dark min-w-[210px] sm:min-w-[240px]">
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => {
                    haptic("light");
                    dismissChoice();
                  }}
                  aria-label="Chiudi / Close"
                  className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-bg-dark text-white rounded-full flex items-center justify-center hover:bg-bg-darker transition-colors shadow-md"
                >
                  <X size={12} strokeWidth={3} />
                </button>

                <p className="text-[12px] sm:text-[13px] font-bold leading-snug mb-2.5 text-bg-dark">
                  Ehi! Ti parlo italiano o english? <span className="text-green-primary">🦜</span>
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      haptic("medium");
                      setLang("it");
                    }}
                    className="btn-press group flex items-center gap-1.5 px-2.5 py-1.5 bg-green-primary hover:bg-green-dark text-bg-dark border border-green-dark rounded-lg font-black text-[11px] uppercase tracking-wider transition-colors shadow-[0_3px_0_0_#22CC00] active:translate-y-[2px] active:shadow-none"
                  >
                    <FlagIT className="w-4 h-auto rounded-[1px] overflow-hidden" />
                    Italiano
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      haptic("medium");
                      setLang("en");
                    }}
                    className="btn-press group flex items-center gap-1.5 px-2.5 py-1.5 bg-cyan-accent hover:bg-cyan-accent/80 text-bg-dark border border-cyan-accent/70 rounded-lg font-black text-[11px] uppercase tracking-wider transition-colors shadow-[0_3px_0_0_#00a0a0] active:translate-y-[2px] active:shadow-none"
                  >
                    <FlagUK className="w-4 h-auto rounded-[1px] overflow-hidden" />
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
