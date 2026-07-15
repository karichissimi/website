"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

type ViewerState = "loading" | "ready" | "error";

const COPY = {
  it: {
    loading: "Caricamento deck…",
    error: "Impossibile caricare il viewer. Usa i pulsanti qui sopra per aprire o scaricare il PDF.",
    pageOf: (n: number, total: number) => `Pagina ${n} di ${total}`,
  },
  en: {
    loading: "Loading deck…",
    error: "Couldn't load the viewer. Use the buttons above to open or download the PDF.",
    pageOf: (n: number, total: number) => `Page ${n} of ${total}`,
  },
} as const;

/**
 * Renders every page of the PDF onto canvases via pdf.js. The browser's
 * native PDF plugin is unreliable inside iframes (blank in some Chromes,
 * first-page-only on iOS Safari), so we paint the pages ourselves.
 */
export default function PdfViewer({ url, lang }: { url: string; lang: "it" | "en" }) {
  const t = COPY[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ViewerState>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.arrayBuffer();

        const pdf = await pdfjs.getDocument({ data }).promise;
        if (cancelled) return;

        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        // Cap the DPR: 23 slides at 3x on a phone would eat memory for
        // sharpness nobody can see.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          if (cancelled) return;

          const baseViewport = page.getViewport({ scale: 1 });
          const scale = container.clientWidth / baseViewport.width;
          const viewport = page.getViewport({ scale: scale * dpr });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.display = "block";
          canvas.setAttribute("role", "img");
          canvas.setAttribute("aria-label", t.pageOf(i, pdf.numPages));

          await page.render({ canvas, viewport }).promise;
          if (cancelled) return;

          container.appendChild(canvas);
          setProgress(Math.round((i / pdf.numPages) * 100));
        }

        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
    };
    // t is derived from lang; re-render pages only when source or lang changes
  }, [url, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rounded-xl border border-card-border bg-bg-darker overflow-hidden">
      {state === "loading" && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-text-muted">
          <Loader2 className="animate-spin" size={28} />
          <span className="text-sm tabular-nums">
            {t.loading} {progress > 0 ? `${progress}%` : ""}
          </span>
        </div>
      )}
      {state === "error" && (
        <div className="flex items-center justify-center gap-2 py-24 px-6 text-sm text-pink-accent text-center">
          <AlertCircle size={18} className="shrink-0" />
          {t.error}
        </div>
      )}
      <div
        ref={containerRef}
        className={state === "ready" ? "max-h-[80vh] overflow-y-auto [&>canvas+canvas]:mt-2" : "h-0 overflow-hidden"}
      />
    </div>
  );
}
