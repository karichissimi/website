import type { Metadata } from "next";
import NidoShell from "@/components/nido/NidoShell";
import CountdownHome from "@/components/countdown/CountdownHome";
import { FAQ } from "@/components/countdown/content";
import "./countdown.css";

// The product home (Hero, AppInAzione, ComeFunziona, PerChi, CER, …) is
// parked in src/components/home/ while the countdown campaign is live.

const TITLE = "Karica — Il tuo consulente energetico digitale";
const DESCRIPTION =
  "Incentivi, finanziamento ed esecuzione dei lavori in un unico percorso digitale, anche senza anticipo. Il 15 dicembre alle 11:00 succede qualcosa: lascia la tua email.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    type: "website",
    locale: "it_IT",
    siteName: "Karica",
    images: [{ url: "/og-karica.png", width: 1200, height: 630, alt: "Karica" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-karica.png"] },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q.it,
    acceptedAnswer: { "@type": "Answer", text: item.a.it },
  })),
};

export default function Home() {
  return (
    <NidoShell header={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CountdownHome />
    </NidoShell>
  );
}
