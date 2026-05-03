"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { haptic } from "@/lib/haptics";

interface NavLink {
  label: string;
  href: string;
  highlight?: boolean;
}

interface NavbarProps {
  links: NavLink[];
  cta: { label: string; href: string };
  logoHref?: string;
}

const SCROLL_THRESHOLD = 80;

export default function Navbar({ links, cta, logoHref = "/" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Reset scroll position on page load/reload instead of restoring previous position
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Track scroll: the entire navbar is hidden at the top of the page and
  // slides down once the user has scrolled past the threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Force the navbar visible when the dropdown menu is open, otherwise it
  // would disappear under the user's finger if they scroll back to top.
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

            {/* Hamburger button (right) — visible on all screen sizes */}
            <button
              onClick={() => {
                haptic("light");
                setOpen(!open);
              }}
              className="btn-press-soft text-text-secondary hover:text-green-primary"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Dropdown menu — same on all screen sizes */}
        {open && (
          <div className="bg-bg-darker border-t border-card-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
              {links.map((link) => {
                const className = link.highlight
                  ? "btn-press block border border-cyan-accent text-cyan-accent font-bold text-sm px-5 py-3 rounded-lg uppercase tracking-wider text-center hover:bg-cyan-accent/10 transition-all"
                  : "block text-text-secondary hover:text-green-primary transition-colors text-center text-sm font-medium py-2";
                return link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={className}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={className}
                  >
                    {link.label}
                  </a>
                );
              })}
              {cta.href.startsWith("/") ? (
                <Link
                  href={cta.href}
                  onClick={() => {
                    haptic("medium");
                    setOpen(false);
                  }}
                  className="btn-press block bg-green-primary text-bg-dark font-bold text-sm px-5 py-3 rounded-lg uppercase tracking-wider text-center hover:bg-green-dark transition-colors"
                >
                  {cta.label}
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
                  {cta.label}
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
