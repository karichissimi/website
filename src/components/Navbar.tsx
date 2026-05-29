"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";

type LocalisedLabel = string | { it: string; en: string };

function pickLabel(label: LocalisedLabel, lang: "it" | "en"): string {
  if (typeof label === "string") return label;
  return label[lang];
}

interface NavLink {
  label: LocalisedLabel;
  href: string;
  highlight?: boolean;
}

interface NavbarProps {
  links?: NavLink[];
  cta?: { label: LocalisedLabel; href: string };
  logoHref?: string;
  // When set, replaces the hamburger menu with a directly visible pill CTA.
  // Use this on single-purpose conversion pages where a menu adds friction.
  inlineCta?: { label: LocalisedLabel; href: string };
}

// Hysteresis: avoids show/hide flicker when iOS rubber-band scroll
// oscillates around a single threshold value.
const SHOW_THRESHOLD = 120;
const HIDE_THRESHOLD = 40;

export default function Navbar({ links = [], cta, logoHref = "/", inlineCta }: NavbarProps) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  const openMenuLabel = lang === "en" ? "Open menu" : "Apri menu";
  const closeMenuLabel = lang === "en" ? "Close menu" : "Chiudi menu";
  const menuAriaLabel = lang === "en" ? "Menu" : "Menu";

  // Hide the hamburger entirely when there's nothing meaningful to show in
  // the overlay menu — avoids the "open menu to find a single redundant link"
  // friction that came with /contatti before.
  const hasMenuContent = !inlineCta && (links.length > 0 || !!cta);

  // Reset scroll position on page load/reload instead of restoring previous position
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Show/hide with hysteresis + scroll direction (Apple-style):
  // - hide when at the very top OR scrolling down
  // - show when scrolling up past SHOW_THRESHOLD
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      // Ignore tiny iOS rubber-band deltas
      if (Math.abs(y - lastY.current) < 6) return;
      if (y < HIDE_THRESHOLD) {
        setScrolled(false);
      } else if (goingDown) {
        setScrolled(false);
      } else if (y > SHOW_THRESHOLD) {
        setScrolled(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while overlay menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Force the navbar visible when the overlay menu is open
  const visible = scrolled || open;

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === logoHref) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      e.preventDefault();
      router.push(logoHref);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    setOpen(false);
  }

  return (
    <header
      aria-hidden={!visible}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <nav className="bg-bg-darker/90 backdrop-blur-md border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo (left) */}
            <Link
              href={logoHref}
              onClick={handleLogoClick}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <Image
                src="/graphics/Karica_Logo_Felice.png"
                alt=""
                aria-hidden
                width={28}
                height={28}
                priority
                className="h-7 w-auto"
              />
              <Image
                src="/graphics/Karica_Scritta_WHITE.png"
                alt="Karica"
                width={100}
                height={28}
                priority
                className="h-5 w-auto"
              />
            </Link>

            {/* Right side: inline CTA pill, hamburger button, or nothing */}
            {inlineCta ? (
              inlineCta.href.startsWith("/") ? (
                <Link
                  href={inlineCta.href}
                  onClick={() => haptic("medium")}
                  className="btn-press inline-flex items-center bg-green-primary text-bg-dark font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg uppercase tracking-wider hover:bg-green-dark transition-colors"
                >
                  {pickLabel(inlineCta.label, lang)}
                </Link>
              ) : (
                <a
                  href={inlineCta.href}
                  onClick={() => haptic("medium")}
                  className="btn-press inline-flex items-center bg-green-primary text-bg-dark font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg uppercase tracking-wider hover:bg-green-dark transition-colors"
                >
                  {pickLabel(inlineCta.label, lang)}
                </a>
              )
            ) : hasMenuContent ? (
              <button
                onClick={() => {
                  haptic("light");
                  setOpen(!open);
                }}
                className="btn-press-soft text-text-secondary hover:text-green-primary"
                aria-label={open ? closeMenuLabel : openMenuLabel}
                aria-expanded={open}
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            ) : null}
          </div>
        </div>

      </nav>

      {/* Overlay menu — opaque full-screen panel below the navbar bar.
          Blocks the content below so nothing shows through. */}
      {open && hasMenuContent && (
        <div
          className="fixed left-0 right-0 top-14 sm:top-16 bottom-0 bg-bg-darker border-t border-card-border overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={menuAriaLabel}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-3">
            {links.map((link) => {
              const className = link.highlight
                ? "btn-press block border border-cyan-accent text-cyan-accent font-bold text-sm px-5 py-3 rounded-lg uppercase tracking-wider text-center hover:bg-cyan-accent/10 transition-colors"
                : "block text-text-secondary hover:text-green-primary transition-colors text-center text-sm font-medium py-2";
              return link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {pickLabel(link.label, lang)}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {pickLabel(link.label, lang)}
                </a>
              );
            })}
            {cta && (cta.href.startsWith("/") ? (
              <Link
                href={cta.href}
                onClick={() => {
                  haptic("medium");
                  setOpen(false);
                }}
                className="btn-press block bg-green-primary text-bg-dark font-bold text-sm px-5 py-3 rounded-lg uppercase tracking-wider text-center hover:bg-green-dark transition-colors"
              >
                {pickLabel(cta.label, lang)}
              </Link>
            ) : (
              <a
                href={cta.href}
                onClick={() => {
                  haptic("medium");
                  setOpen(false);
                }}
                className="btn-press block bg-green-primary text-bg-dark font-bold text-sm px-5 py-3 rounded-lg uppercase tracking-wider text-center hover:bg-green-dark transition-colors"
              >
                {pickLabel(cta.label, lang)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
