import Link from "next/link";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links: FooterLink[];
  showDisclaimer?: boolean;
}

export default function Footer({ links, showDisclaimer = false }: FooterProps) {
  return (
    <footer className="bg-bg-darker border-t border-card-border py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt="Karica"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <Image
              src="/graphics/Karica_Scritta_WHITE.png"
              alt="Karica"
              width={80}
              height={22}
              className="h-4 w-auto"
            />
          </Link>
          <div className="flex items-center gap-6 text-xs text-text-muted">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-text-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-card-border pt-6 space-y-2 text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] text-text-muted mb-2">
            <Link href="/privacy-policy" className="hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-text-disabled">|</span>
            <Link href="/cookie-policy" className="hover:text-text-secondary transition-colors">
              Cookie Policy
            </Link>
            <span className="text-text-disabled">|</span>
            <Link href="/note-legali" className="hover:text-text-secondary transition-colors">
              Note Legali
            </Link>
          </div>
          <p className="text-text-disabled text-xs">
            &copy; {new Date().getFullYear()} Karica S.r.l. — Via Vallarsa 11, Milano — P.IVA 14470800963 — Startup Innovativa
          </p>
          {showDisclaimer && (
            <p className="text-text-disabled text-[10px] max-w-2xl mx-auto">
              Le proiezioni finanziarie rappresentano stime basate su assunzioni ragionevoli ma non garantite.
              I rendimenti passati o previsti non costituiscono garanzia di risultati futuri.
              Si invitano gli investitori a consultare i propri consulenti finanziari e legali.
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
