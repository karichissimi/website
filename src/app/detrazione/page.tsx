import { Suspense } from "react";
import type { Metadata } from "next";
import NidoShell from "@/components/nido/NidoShell";
import DetrazioneContent from "./DetrazioneContent";
import DetrazioneForm from "./DetrazioneForm";

export const metadata: Metadata = {
  title: "Karica — Detrazione 65% per Family & Friends",
  description:
    "Pagina riservata. Detrazione IRPEF 65% per chi investe in Karica come startup innovativa, più 10% di sconto sugli interventi a casa propria.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function DetrazionePage() {
  return (
    <NidoShell
      showStory={false}
      disclaimer
      cta={{ label: { it: "Sono interessato", en: "I'm interested" }, href: "#cta" }}
    >

      <main id="main" className="relative overflow-hidden">
        <DetrazioneContent />

        {/* CTA — lead form */}
        <Suspense fallback={null}>
          <DetrazioneForm />
        </Suspense>
      </main>
    </NidoShell>
  );
}
