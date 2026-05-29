"use client";

import { Info } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * Banner shown only when the language is English on the legal pages.
 * Explains that the legally binding text is the Italian one — practice
 * common to Italian-registered companies. Avoids forcing translation
 * of regulatory text and the legal risk that would come with it.
 */
export default function LegalLangNotice() {
  const { lang } = useLang();
  if (lang !== "en") return null;
  return (
    <div className="not-prose mb-10 flex items-start gap-3 rounded-xl border border-cyan-accent/30 bg-cyan-accent/[0.06] px-4 py-3 text-sm">
      <Info size={16} className="flex-shrink-0 text-cyan-accent mt-0.5" />
      <p className="text-text-secondary leading-relaxed">
        This page is published in Italian as required by the company's
        country of registration. The Italian text is the legally binding
        version. For an English summary or specific questions please email{" "}
        <a
          href="mailto:privacy@karica.it"
          className="text-cyan-accent font-semibold hover:underline"
        >
          privacy@karica.it
        </a>
        .
      </p>
    </div>
  );
}
