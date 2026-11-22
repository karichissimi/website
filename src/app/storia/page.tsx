import type { Metadata } from "next";
import NidoShell from "@/components/nido/NidoShell";
import StoriaContent from "./StoriaContent";

export const metadata: Metadata = {
  title: "Storia & Manifesto",
  description:
    "Perché esiste Karica. Il problema dell'energia in Italia, la soluzione che mancava, il momento per costruirla.",
  openGraph: {
    title: "Karica — Perché esistiamo",
    description:
      "Il rapporto tra cittadini e mondo dell'energia è strutturalmente disfunzionale. Karica colma il vuoto.",
    url: "/storia",
    type: "website",
    locale: "it_IT",
    siteName: "Karica",
    images: [{ url: "/og-karica.png", width: 1200, height: 630, alt: "Karica" }],
  },
};

export default function StoriaPage() {
  return (
    <NidoShell>
      <StoriaContent />
    </NidoShell>
  );
}
