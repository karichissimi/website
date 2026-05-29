"use client";

import Image from "next/image";
import WaitlistForm from "./WaitlistForm";
import { useLang } from "@/lib/i18n";

const COUNT_THRESHOLD = 100;

const COPY = {
  it: {
    aria: "Richiedi l'accesso a Karica",
    pillWithCount: (n: string) => `${n} richieste di accesso`,
    pillOpen: "Rollout in corso",
    headlinePre: "Sta arrivando nella ",
    headlineHighlight: "tua zona",
    headlinePost: ".",
    introWithCount:
      "Lascia la mail: ti mandiamo l'invito appena Karica arriva nella tua zona.",
    introOpen:
      "Karica si sta espandendo per area. Lascia la mail e ti scriviamo quando tocca a te.",
    disclaimer: "Niente spam. Solo l'invito quando arriva il tuo turno.",
    locale: "it-IT",
  },
  en: {
    aria: "Request access to Karica",
    pillWithCount: (n: string) => `${n} access requests`,
    pillOpen: "Rolling out",
    headlinePre: "Coming to ",
    headlineHighlight: "your area",
    headlinePost: ".",
    introWithCount:
      "Leave your email — we'll send your invite as soon as Karica lands in your area.",
    introOpen:
      "Karica is rolling out area by area. Leave your email and we'll write when it's your turn.",
    disclaimer: "No spam. Just the invite when it's your turn.",
    locale: "en-GB",
  },
} as const;

export default function HomeCTAInner({ count }: { count: number | null }) {
  const { lang } = useLang();
  const t = COPY[lang];
  const showCount = count !== null && count >= COUNT_THRESHOLD;

  return (
    <section aria-label={t.aria} className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />
      <div className="glow-orb-slow absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-cyan-accent/[0.04] blur-[80px]" />

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/graphics/Karica_Logo_Felice.png"
            alt=""
            aria-hidden
            width={48}
            height={48}
            className="h-12 w-auto animate-float-slow"
          />
          <Image
            src="/graphics/Karica_Scritta_WHITE.png"
            alt="Karica"
            width={140}
            height={40}
            className="h-9 w-auto"
          />
        </div>

        {/* Social-proof / status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-primary/10 border border-green-primary/30 mb-5">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary" />
          </span>
          <span className="text-green-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            {showCount
              ? t.pillWithCount((count as number).toLocaleString(t.locale))
              : t.pillOpen}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-4">
          {t.headlinePre}
          <span className="text-gradient">{t.headlineHighlight}</span>
          {t.headlinePost}
        </h2>
        <p className="text-text-secondary text-base sm:text-lg mb-8 max-w-md mx-auto">
          {showCount ? t.introWithCount : t.introOpen}
        </p>

        <div className="card-glow p-6 sm:p-8 text-left">
          <div className="relative z-10">
            <WaitlistForm />
          </div>
        </div>

        <p className="text-text-disabled text-xs mt-5">{t.disclaimer}</p>
      </div>
    </section>
  );
}
