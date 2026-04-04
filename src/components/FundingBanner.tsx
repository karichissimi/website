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
        className="block bg-bg-darker border-b border-pink-accent/20 hover:bg-bg-darker transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-center gap-2 text-xs">
          <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-accent opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-pink-accent" /></span>
          <span className="text-text-secondary"><span className="text-pink-accent font-bold">€150k raccolti</span> — restano €350k</span>
          <span className="text-pink-accent font-semibold hidden sm:inline">→</span>
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
                target={150000}
                prefix="€"
                suffix=""
                className="text-2xl font-black text-green-primary font-mono"
              />
              <span className="text-text-muted text-sm">/ €500.000</span>
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

        {/* Soft urgency */}
        <p className="text-text-muted text-xs mt-2.5">
          Primo round pre-seed — queste condizioni non saranno ripetute
        </p>
      </div>
    </motion.div>
  );
}
