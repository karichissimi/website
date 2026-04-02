"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavLink[];
  cta: { label: string; href: string };
  logoHref?: string;
  showFundingBanner?: boolean;
}

export default function Navbar({ links, cta, logoHref = "/", showFundingBanner = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-bg-darker border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href={logoHref} className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/graphics/Karica_Logo_Felice.png"
                alt="Karica"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
              <Image
                src="/graphics/Karica_Scritta_WHITE.png"
                alt="Karica"
                width={100}
                height={28}
                className="h-5 w-auto"
              />
            </Link>

            {/* Center: funding badge (mobile + desktop) */}
            {showFundingBanner && (
              <a
                href="/funding"
                className="flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-green-primary/20 hover:border-green-primary/40 transition-colors"
              >
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-primary" />
                </span>
                <span className="text-green-primary font-bold whitespace-nowrap">€150k raccolti su 500k</span>
              </a>
            )}

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-green-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={cta.href}
                className="bg-green-primary text-bg-dark font-bold text-sm px-5 py-2.5 rounded-lg uppercase tracking-wider hover:bg-green-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(57,255,20,0.3)]"
              >
                {cta.label}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-text-secondary hover:text-green-primary"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden bg-bg-darker border-t border-card-border">
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-text-secondary hover:text-green-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={cta.href}
                onClick={() => setOpen(false)}
                className="block bg-green-primary text-bg-dark font-bold text-sm px-5 py-2.5 rounded-lg uppercase tracking-wider text-center"
              >
                {cta.label}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
