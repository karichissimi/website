"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { haptic } from "@/lib/haptics";

export type Lang = "it" | "en";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  hasChosen: boolean;
  dismissChoice: () => void;
  hydrated: boolean;
};

const LangContext = createContext<LangContextValue>({
  lang: "it",
  setLang: () => {},
  hasChosen: false,
  dismissChoice: () => {},
  hydrated: false,
});

const STORAGE_KEY = "karica-lang";
const CHOSEN_KEY = "karica-lang-chosen";

/**
 * Wraps the app so every client component can read/write the active language.
 * - Default IT on first paint (matches primary audience).
 * - On mount: rehydrate from localStorage; if absent, sniff navigator.language
 *   and switch to EN only when the browser is clearly English-speaking.
 * - Persists choice to localStorage on every change.
 */
export function LangProvider({
  children,
  defaultLang = "it",
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const [hasChosen, setHasChosen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const chosen = window.localStorage.getItem(CHOSEN_KEY) === "1";
      if (saved === "it" || saved === "en") {
        setLangState(saved);
      } else {
        const nav = window.navigator.language?.toLowerCase() ?? "";
        if (nav.startsWith("en")) setLangState("en");
      }
      setHasChosen(chosen);
    } catch {
      // localStorage may be blocked (Safari private mode etc.) — silent ok
    }
    setHydrated(true);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setHasChosen(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      window.localStorage.setItem(CHOSEN_KEY, "1");
    } catch {
      // ignore
    }
    // Reflect in <html lang="..."> for screen readers + SEO crawlers
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  const dismissChoice = useCallback(() => {
    setHasChosen(true);
    try {
      window.localStorage.setItem(CHOSEN_KEY, "1");
    } catch {
      // ignore
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, hasChosen, dismissChoice, hydrated }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** Convenience: pick a value from an EN/IT dict using the current language. */
export function useT<T>(dict: { it: T; en: T }): T {
  const { lang } = useLang();
  return dict[lang];
}

// ──────────────────────────────────────────────────────────────────────────
// Flag SVGs — same artwork used originally inside /whoweare. Inlined so the
// toggle stays a single self-contained component, no extra fetch.
// ──────────────────────────────────────────────────────────────────────────

export function FlagUK({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden focusable="false">
      <clipPath id="lang-uk-mask">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#lang-uk-mask)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function FlagIT({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden focusable="false">
      <rect width="1" height="2" fill="#008C45" />
      <rect x="1" width="1" height="2" fill="#F4F5F0" />
      <rect x="2" width="1" height="2" fill="#CD212A" />
    </svg>
  );
}

/**
 * Inline language toggle designed to sit right next to the logo wordmark
 * at the top of the page. Minimal: just two micro flag pills, the
 * inactive one is dimmed.
 */
export function LangInline() {
  const { lang, setLang } = useLang();
  const base =
    "flex items-center justify-center w-5 h-5 rounded-sm transition-all";
  const active = "ring-1 ring-green-primary/70 shadow-[0_0_8px_rgba(57,255,20,0.25)] opacity-100";
  const inactive = "opacity-35 hover:opacity-75";

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="hidden sm:inline-flex items-center gap-1 ml-2 pl-2 border-l border-card-border/60"
    >
      <button
        type="button"
        onClick={() => {
          haptic("light");
          setLang("it");
        }}
        aria-pressed={lang === "it"}
        aria-label="Italiano"
        className={`${base} ${lang === "it" ? active : inactive}`}
      >
        <FlagIT className="w-4 h-auto rounded-[1px] overflow-hidden" />
      </button>
      <button
        type="button"
        onClick={() => {
          haptic("light");
          setLang("en");
        }}
        aria-pressed={lang === "en"}
        aria-label="English"
        className={`${base} ${lang === "en" ? active : inactive}`}
      >
        <FlagUK className="w-4 h-auto rounded-[1px] overflow-hidden" />
      </button>
    </div>
  );
}

/**
 * Two flag buttons that toggle EN ↔ IT.
 * Compact form factor designed to live inside the Navbar.
 */
export function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const wrapperClass = compact
    ? "inline-flex items-center gap-1 p-1 rounded-md bg-card-bg/60 border border-card-border backdrop-blur-sm"
    : "inline-flex items-center gap-2 p-1.5 rounded-lg bg-card-bg/60 border border-card-border backdrop-blur-sm";
  const btnClass = compact
    ? "btn-press-soft flex items-center justify-center w-7 h-6 rounded transition-all"
    : "btn-press-soft flex items-center justify-center w-9 h-7 rounded-md transition-all";
  const flagClass = compact ? "w-5 h-auto rounded-[2px] overflow-hidden" : "w-6 h-auto rounded-[2px] overflow-hidden";

  return (
    <div role="group" aria-label="Language switcher" className={wrapperClass}>
      <button
        type="button"
        onClick={() => {
          haptic("light");
          setLang("it");
        }}
        aria-pressed={lang === "it"}
        aria-label="Italiano"
        className={`${btnClass} ${
          lang === "it"
            ? "border border-green-primary/60 bg-green-primary/10 shadow-[0_0_12px_rgba(57,255,20,0.18)]"
            : "border border-transparent opacity-55 hover:opacity-100"
        }`}
      >
        <FlagIT className={flagClass} />
      </button>
      <button
        type="button"
        onClick={() => {
          haptic("light");
          setLang("en");
        }}
        aria-pressed={lang === "en"}
        aria-label="English"
        className={`${btnClass} ${
          lang === "en"
            ? "border border-green-primary/60 bg-green-primary/10 shadow-[0_0_12px_rgba(57,255,20,0.18)]"
            : "border border-transparent opacity-55 hover:opacity-100"
        }`}
      >
        <FlagUK className={flagClass} />
      </button>
    </div>
  );
}
