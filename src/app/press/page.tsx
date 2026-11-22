import type { Metadata } from "next";
import NidoShell from "@/components/nido/NidoShell";
import PressContent from "./PressContent";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Logo pack, screenshot dell'app, bio del team e contatti stampa di Karica.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function PressPage() {
  return (
    <NidoShell showStory={false} cta={{ label: { it: "Scrivici", en: "Email us" }, href: "mailto:info@karica.it" }}>
      <PressContent />
    </NidoShell>
  );
}
