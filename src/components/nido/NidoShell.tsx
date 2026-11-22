import type { ReactNode } from "react";
import { nidoFontVars } from "@/lib/nidoFonts";
import { NidoHeader, NidoFooter, type NidoCta } from "./NidoChrome";
import "@/app/nido.css";

// Wrapper for the public pages in the new brand look (cream paper, night-blue
// ink, rare green).
export default function NidoShell({
  children,
  header = true,
  cta,
  showStory = true,
  disclaimer = false,
}: {
  children: ReactNode;
  header?: boolean;
  cta?: NidoCta;
  showStory?: boolean;
  disclaimer?: boolean;
}) {
  return (
    <div className={`nido ${nidoFontVars}`}>
      {header && <NidoHeader cta={cta} showStory={showStory} />}
      {children}
      <NidoFooter disclaimer={disclaimer} />
    </div>
  );
}
