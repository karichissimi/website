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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
