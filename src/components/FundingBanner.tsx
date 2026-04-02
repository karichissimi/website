"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

interface FundingBannerProps {
  compact?: boolean;
}

const RAISED = 150000;
const GOAL = 500000;
const PCT = Math.round((RAISED / GOAL) * 100);

export default function FundingBanner({ compact = false }: FundingBannerProps) {
  if (compact) {
    return (
      <a
        href="/funding"
        className="block bg-gradient-to-r from-pink-accent/10 via-pink-accent/5 to-transparent border-b border-pink-accent/20 hover:from-pink-accent/15 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-3 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-accent" />
          </span>
          <span className="text-text-secondary">
            <span className="text-pink-accent font-bold">€150.000 già raccolti</span>
            {" "}— restano €350.000
          </span>
          <span className="text-pink-accent font-semibold hidden sm:inline">
            Investi ora →
          </span>
        </div>
      </a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative">
        {/* Labels */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">
              Già raccolti
            </p>
            <div className="flex items-baseline gap-1">
              <Counter
                target={150}
                prefix="€"
                suffix="k"
                className="text-2xl font-black text-green-primary font-mono"
              />
              <span className="text-text-muted text-sm">/ €500k</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-pink-accent text-xs font-bold uppercase tracking-wider">
              {PCT}% completato
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-card-border/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-primary to-cyan-accent relative"
            initial={{ width: 0 }}
            animate={{ width: `${PCT}%` }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pulse at end */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-primary shadow-[0_0_12px_rgba(57,255,20,0.6)]" />
          </motion.div>
        </div>

        {/* Urgency text */}
        <div className="flex items-center gap-2 mt-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-accent" />
          </span>
          <p className="text-pink-accent text-xs font-semibold">
            Round in chiusura — posti limitati a queste condizioni
          </p>
        </div>
      </div>
    </motion.div>
  );
}
