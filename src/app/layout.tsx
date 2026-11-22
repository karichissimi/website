import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

// Questrial ships only 400/normal — bold and italic are browser-synthesized
// (font-synthesis in globals.css), like PowerPoint's faux bold/italic.
const questrial = Questrial({
  weight: "400",
  // latin-ext: the wordmark uses dotless "ı" (U+0131) for its leaf tittle
  subsets: ["latin", "latin-ext"],
  variable: "--font-karica",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.karica.it"),
  // Each page declares its own address as the official one (resolved
  // against metadataBase and the route path).
  alternates: { canonical: "./" },
  title: {
    default: "Karica — Il tuo consulente energetico digitale",
    template: "%s | Karica",
  },
  description:
    "Karica ti mostra quanto sprechi, cosa fare per risparmiare e ti guida passo passo. Diagnosi, interventi, finanziamenti e Comunità Energetiche in un unico ecosistema.",
  icons: {
    icon: [
      { url: "/graphics/favicon/favicon.ico", sizes: "any" },
      { url: "/graphics/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/graphics/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/graphics/favicon/apple-touch-icon.png",
  },
  manifest: "/graphics/favicon/site.webmanifest",
  openGraph: {
    title: "Karica — Il tuo consulente energetico digitale",
    description:
      "Incentivi, finanziamento ed esecuzione dei lavori in un unico percorso digitale, anche senza anticipo.",
    type: "website",
    locale: "it_IT",
    siteName: "Karica",
    url: "./",
    images: [
      {
        url: "/og-karica.png",
        width: 1200,
        height: 630,
        alt: "Karica — il tuo consulente energetico digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karica — Il tuo consulente energetico digitale",
    description:
      "Incentivi, finanziamento ed esecuzione dei lavori in un unico percorso digitale, anche senza anticipo.",
    images: ["/og-karica.png"],
  },
};

// JSON-LD Organization schema — strutturato per Google e altri motori
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Karica",
  legalName: "Karica S.r.l.",
  url: "https://www.karica.it",
  logo: "https://www.karica.it/graphics/Karica_Logo_Felice.png",
  image: "https://www.karica.it/og-karica.png",
  description:
    "Piattaforma digitale per la transizione energetica: diagnosi, interventi di efficienza, finanziamenti green e Comunità Energetiche Rinnovabili in un unico ecosistema.",
  foundingDate: "2025",
  vatID: "14470800963",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Vallarsa 11",
    addressLocality: "Milano",
    postalCode: "20139",
    addressCountry: "IT",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@karica.it",
    contactType: "customer support",
    availableLanguage: ["Italian", "English"],
  },
  areaServed: { "@type": "Country", name: "Italy" },
  knowsAbout: [
    "transizione energetica",
    "Comunità Energetiche Rinnovabili",
    "efficienza energetica",
    "diagnosi energetica",
    "incentivi green",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Karica",
  url: "https://www.karica.it",
  inLanguage: "it-IT",
  publisher: { "@type": "Organization", name: "Karica" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${questrial.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen">
        <LangProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-green-primary focus:text-bg-dark focus:px-4 focus:py-2.5 focus:rounded-lg focus:font-bold focus:shadow-[0_8px_24px_rgba(57,255,20,0.3)]"
          >
            Vai al contenuto / Skip to content
          </a>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
