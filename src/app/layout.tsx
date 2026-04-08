import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const avantGarde = localFont({
  src: [
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-XLt.otf", weight: "200", style: "normal" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-Bk.otf", weight: "400", style: "normal" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-Md.otf", weight: "500", style: "normal" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-Demi.otf", weight: "600", style: "normal" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-XLtObl.otf", weight: "200", style: "italic" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-BkObl.otf", weight: "400", style: "italic" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-MdObl.otf", weight: "500", style: "italic" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-DemiObl.otf", weight: "600", style: "italic" },
    { path: "../../public/graphics/KaricaFont/ITCAvantGardePro-BoldObl.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-karica",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Karica — L'energia di casa tua, finalmente chiara",
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
    title: "Karica — L'energia di casa tua, finalmente chiara",
    description:
      "La piattaforma digitale che semplifica l'accesso all'energia pulita per famiglie, condomini e imprese.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${avantGarde.variable} antialiased`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-green-primary focus:text-bg-dark focus:px-4 focus:py-2.5 focus:rounded-lg focus:font-bold focus:shadow-[0_8px_24px_rgba(57,255,20,0.3)]"
        >
          Vai al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}
