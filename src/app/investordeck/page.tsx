import type { Metadata } from "next";
import { Poppins, Space_Mono } from "next/font/google";
import DeckGate from "./DeckGate";
import { DeckHeader, DeckFooter } from "./DeckChrome";
import "./deck.css";

// Brand Guidelines v0.1: Poppins for everything, Space Mono only for short
// uppercase labels. Loaded here so only this page pays for them.
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Investor Deck",
  description: "Area riservata — investor deck Karica.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function InvestorDeckPage() {
  return (
    <div className={`kd-root ${poppins.variable} ${spaceMono.variable}`}>
      <DeckHeader />
      <main id="main" className="kd-main">
        <DeckGate />
      </main>
      <DeckFooter />
    </div>
  );
}
