"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import KaricaWordmark from "@/components/KaricaWordmark";

type LocalisedLabel = string | { it: string; en: string };

interface FooterLink {
  label: LocalisedLabel;
  href: string;
}

interface FooterProps {
  links: FooterLink[];
  showDisclaimer?: boolean;
}

const COPY = {
  it: {
    contacts: "Contatti",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    legal: "Note Legali",
    companyLine: (year: number) =>
      `© ${year} Karica S.r.l. — Via Vallarsa 11, Milano — P.IVA 14470800963 — Startup Innovativa`,
    disclaimer:
      "Le proiezioni finanziarie rappresentano stime basate su assunzioni ragionevoli ma non garantite. I rendimenti passati o previsti non costituiscono garanzia di risultati futuri. Si invitano gli investitori a consultare i propri consulenti finanziari e legali.",
  },
  en: {
    contacts: "Contact",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    legal: "Legal Notes",
    companyLine: (year: number) =>
      `© ${year} Karica S.r.l. — Via Vallarsa 11, Milan — VAT 14470800963 — Innovative Startup`,
    disclaimer:
      "Financial projections are estimates based on reasonable but unguaranteed assumptions. Past or expected returns are not a guarantee of future results. Investors are advised to consult their own financial and legal advisors.",
  },
} as const;

export default function Footer({ links, showDisclaimer = false }: FooterProps) {
  const { lang } = useLang();
  const t = COPY[lang];
  return (
    <footer className="bg-bg-darker border-t border-card-border py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt=""
              aria-hidden
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <KaricaWordmark className="text-[22px]" />
          </Link>
          <div className="flex items-center gap-6 text-xs text-text-muted">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-text-secondary transition-colors"
              >
                {typeof link.label === "string" ? link.label : link.label[lang]}
              </a>
            ))}
            <Link
              href="/contatti"
              className="hover:text-text-secondary transition-colors"
            >
              {t.contacts}
            </Link>
          </div>
        </div>

        <div className="border-t border-card-border pt-6 space-y-2 text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] text-text-muted mb-2">
            <Link href="/privacy-policy" className="hover:text-text-secondary transition-colors">
              {t.privacy}
            </Link>
            <span className="text-text-disabled">|</span>
            <Link href="/cookie-policy" className="hover:text-text-secondary transition-colors">
              {t.cookie}
            </Link>
            <span className="text-text-disabled">|</span>
            <Link href="/note-legali" className="hover:text-text-secondary transition-colors">
              {t.legal}
            </Link>
          </div>
          <p className="text-text-disabled text-xs">
            {t.companyLine(new Date().getFullYear())}
          </p>
          {showDisclaimer && (
            <p className="text-text-disabled text-[10px] max-w-2xl mx-auto">
              {t.disclaimer}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
