"use client";

import Link from "next/link";
import Image from "next/image";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";

const COPY = {
  it: {
    story: "Storia",
    contact: "Contattaci",
    contacts: "Contatti",
    legal: "Note legali",
    company: (year: number) =>
      `© ${year} Karica S.r.l. — Via Vallarsa 11, Milano — P.IVA 14470800963 — Startup Innovativa`,
  },
  en: {
    story: "Story",
    contact: "Contact us",
    contacts: "Contact",
    legal: "Legal notes",
    company: (year: number) =>
      `© ${year} Karica S.r.l. — Via Vallarsa 11, Milan — VAT 14470800963 — Innovative Startup`,
  },
} as const;

export function NidoLang() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language switcher" className="nd-lang">
      {(["it", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          aria-label={code === "it" ? "Italiano" : "English"}
          onClick={() => {
            haptic("light");
            setLang(code);
          }}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function NidoHeader() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <header className="nd-header">
      <Link href="/" className="nd-logo">
        <Image
          src="/graphics/Karica_Logo_Felice.png"
          alt=""
          aria-hidden
          width={21}
          height={40}
          priority
        />
        karica
      </Link>
      <div className="nd-header-actions">
        <Link href="/storia" className="nd-navlink">
          {t.story}
        </Link>
        <NidoLang />
        <Link href="/contatti" className="nd-btn nd-btn--small nd-header-cta">
          {t.contact}
        </Link>
      </div>
    </header>
  );
}

export function NidoFooter() {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <footer className="nd-footer">
      <div className="nd-footer-inner">
        <Link href="/" className="nd-footer-brand">
          karica
        </Link>
        <nav className="nd-footer-links" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/storia">{t.story}</Link>
          <Link href="/contatti">{t.contacts}</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/cookie-policy">Cookie</Link>
          <Link href="/note-legali">{t.legal}</Link>
        </nav>
        <p className="nd-footer-legal">{t.company(new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}
