"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface KpiModalProps {
  open: boolean;
  onClose: () => void;
  value: string;
  label: string;
  explanation: string;
}

export default function KpiModal({ open, onClose, value, label, explanation }: KpiModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md"
          >
            <div className="relative card-glow p-6 sm:p-8">
              <div className="relative z-10">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-0 right-0 text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Chiudi"
                >
                  <X size={20} />
                </button>

                {/* Content */}
                <div className="text-center mb-5">
                  <p className="text-4xl sm:text-5xl font-black text-green-primary font-mono mb-2">
                    {value}
                  </p>
                  <p className="text-sm text-text-muted font-semibold uppercase tracking-wider">
                    {label}
                  </p>
                </div>

                <div className="section-divider mb-5" />

                <p className="text-text-secondary text-sm leading-relaxed">
                  {explanation}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
