"use client";

import Link from "next/link";
import Image from "next/image";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";

const COPY = {
  it: {
    write: "Scrivici",
    contacts: "Contatti",
    legal: "Note legali",
    company: (year: number) =>
      `© ${year} Karica S.r.l. — Via Vallarsa 11, Milano — P.IVA 14470800963 — Startup Innovativa`,
  },
  en: {
    write: "Email us",
    contacts: "Contact",
    legal: "Legal notes",
    company: (year: number) =>
      `© ${year} Karica S.r.l. — Via Vallarsa 11, Milan — VAT 14470800963 — Innovative Startup`,
  },
} as const;

// Page-local header and footer: the shared Navbar/Footer carry the dark neon
// theme of the rest of the site, this page follows the investor deck look.
export function DeckHeader() {
  const { lang, setLang } = useLang();
  const t = COPY[lang];

  return (
    <header className="kd-header">
      <Link href="/" className="kd-logo">
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

      <div className="kd-header-actions">
        <div role="group" aria-label="Language switcher" className="kd-lang">
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
        <a href="mailto:info@karica.it" className="kd-btn kd-btn--small kd-header-cta">
          {t.write}
        </a>
      </div>
    </header>
  );
}

export function DeckFooter() {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <footer className="kd-footer">
      <div className="kd-footer-inner">
        <Link href="/" className="kd-footer-brand">
          karica
        </Link>
        <nav className="kd-footer-links" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/contatti">{t.contacts}</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/cookie-policy">Cookie</Link>
          <Link href="/note-legali">{t.legal}</Link>
        </nav>
        <p className="kd-footer-legal">{t.company(new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}
