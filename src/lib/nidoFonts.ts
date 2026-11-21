import { Poppins, Space_Mono } from "next/font/google";

// Brand Guidelines v0.1 ("Il nido"): Poppins for everything, Space Mono only
// for short uppercase labels and data.
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

export const nidoFontVars = `${poppins.variable} ${spaceMono.variable}`;
