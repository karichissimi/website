import type { ReactNode } from "react";
import { nidoFontVars } from "@/lib/nidoFonts";
import { NidoHeader, NidoFooter } from "./NidoChrome";
import "@/app/nido.css";

// Wrapper for the public pages in the new brand look (cream paper, night-blue
// ink, rare green). The reserved pages keep the previous dark theme.
export default function NidoShell({
  children,
  header = true,
}: {
  children: ReactNode;
  header?: boolean;
}) {
  return (
    <div className={`nido ${nidoFontVars}`}>
      {header && <NidoHeader />}
      {children}
      <NidoFooter />
    </div>
  );
}
