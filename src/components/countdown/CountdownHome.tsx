"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";
import { NidoLang } from "@/components/nido/NidoChrome";
import { LAUNCH_AT, FAQ } from "./content";

const ROTATE_MS = 4000;

const COPY = {
  it: {
    date: "15.12.2026 · ore 11:00",
    units: ["Giorni", "Ore", "Min", "Sec"],
    countdownLabel: (d: number, h: number, m: number) =>
      `Mancano ${d} giorni, ${h} ore e ${m} minuti al 15 dicembre 2026 alle 11:00`,
    spots: [
      { pre: "Il ", hi: "45,3%", post: " delle case italiane è in classe F o G." },
      { pre: "La transizione energetica è ", hi: "in corso", post: ". Normata, finanziata, urgente." },
      { pre: "Il mercato è pronto. ", hi: "Nessuno", post: " ti accompagna fino in fondo." },
      { pre: "Karica: il tuo consulente energetico ", hi: "digitale", post: "." },
    ],
    done: "Ci siamo.",
    emailLabel: "La tua email",
    emailPlaceholder: "la tua email",
    cta: "Avvisami alle 11:00",
    ok: "Fatto. Ti scriviamo il 15 dicembre alle 11:00.",
    invalid: "Controlla l'indirizzo email.",
    error: "Non siamo riusciti a salvarla. Riprova tra poco.",
    privacyPre: "Lasciando l'email accetti la ",
    privacyLink: "privacy policy",
    faqEyebrow: "Nel frattempo",
    faqTitlePre: "Quattro cose da ",
    faqTitleHi: "sapere",
    story: "Leggi perché esiste Karica",
  },
  en: {
    date: "15.12.2026 · 11:00 CET",
    units: ["Days", "Hours", "Min", "Sec"],
    countdownLabel: (d: number, h: number, m: number) =>
      `${d} days, ${h} hours and ${m} minutes to 15 December 2026, 11:00 CET`,
    spots: [
      { pre: "", hi: "45.3%", post: " of Italian homes are in energy class F or G." },
      { pre: "The energy transition is ", hi: "under way", post: ". Regulated, funded, urgent." },
      { pre: "The market is ready. ", hi: "Nobody", post: " walks you through it end to end." },
      { pre: "Karica: your ", hi: "digital", post: " energy advisor." },
    ],
    done: "Here we are.",
    emailLabel: "Your email",
    emailPlaceholder: "your email",
    cta: "Tell me at 11:00",
    ok: "Done. We'll write to you on 15 December at 11:00.",
    invalid: "Check the email address.",
    error: "We couldn't save it. Try again shortly.",
    privacyPre: "By leaving your email you accept the ",
    privacyLink: "privacy policy",
    faqEyebrow: "In the meantime",
    faqTitlePre: "Four things to ",
    faqTitleHi: "know",
    story: "Read why Karica exists",
  },
} as const;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function remaining(now: number) {
  const s = Math.max(0, Math.floor((LAUNCH_AT - now) / 1000));
  return {
    total: s,
    parts: [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60],
  };
}

export default function CountdownHome() {
  const { lang } = useLang();
  const t = COPY[lang];

  // null until mounted: the server cannot know the visitor's "now", and a
  // guessed value would flash and break hydration.
  const [now, setNow] = useState<number | null>(null);
  const [spot, setSpot] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "invalid" | "error">("idle");

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSpot((i) => (i + 1) % 4), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const left = now === null ? null : remaining(now);
  const done = left !== null && left.total === 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    haptic("medium");
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "newsletter" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      haptic("success");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main id="main">
      <section className="cd-hero">
        <div className="cd-top">
          <span className="cd-brand">karica</span>
          <div className="cd-top-right">
            <span className="cd-date">{t.date}</span>
            <NidoLang />
          </div>
        </div>

        <div className="cd-stage">
          <div
            className="cd-clock"
            role="timer"
            aria-label={left ? t.countdownLabel(left.parts[0], left.parts[1], left.parts[2]) : undefined}
          >
            {t.units.map((unit, i) => (
              <div key={unit} className="cd-unit" aria-hidden>
                <span className="cd-num">
                  {/* One fixed-width slot per digit: Poppins digits have
                      different widths ("1" is half a "0"), so without slots
                      the whole clock would shift every second. */}
                  {(left ? pad(left.parts[i]) : "––").split("").map((ch, k) => (
                    <span key={k} className="cd-digit">
                      {ch}
                    </span>
                  ))}
                </span>
                <span className="cd-unit-label">{unit}</span>
              </div>
            ))}
          </div>

          {/* All four messages stay in the page (for readers and search
              engines); only the active one is shown. */}
          <h1 className="cd-spots">
            {done ? (
              <span className="cd-spot cd-spot--on">{t.done}</span>
            ) : (
              t.spots.map((s, i) => (
                <span key={s.hi} className={`cd-spot ${i === spot ? "cd-spot--on" : ""}`}>
                  {s.pre}
                  <em>{s.hi}</em>
                  {s.post}{" "}
                </span>
              ))
            )}
          </h1>

          <Image
            src="/graphics/Karica_Logo_Felice.png"
            alt=""
            aria-hidden
            width={154}
            height={290}
            priority
            className="cd-bird"
          />
        </div>

        <div className="cd-bottom">
          {status === "ok" ? (
            <p className="cd-ok" role="status">
              {t.ok}
            </p>
          ) : (
            <form className="cd-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="cd-email" className="sr-only">
                {t.emailLabel}
              </label>
              <input
                id="cd-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "loading") setStatus("idle");
                }}
                placeholder={t.emailPlaceholder}
                className="cd-input"
              />
              <button type="submit" className="nd-btn" disabled={status === "loading"}>
                {status === "loading" && <Loader2 className="animate-spin" size={16} />}
                {t.cta}
              </button>
            </form>
          )}
          {!done && (
            <div className="cd-dots" aria-hidden>
              {t.spots.map((s, i) => (
                <span key={s.hi} className={i === spot ? "cd-dot cd-dot--on" : "cd-dot"} />
              ))}
            </div>
          )}
          <p className="cd-small" role={status === "invalid" || status === "error" ? "alert" : undefined}>
            {status === "invalid" ? (
              t.invalid
            ) : status === "error" ? (
              t.error
            ) : (
              <>
                {t.privacyPre}
                <Link href="/privacy-policy">{t.privacyLink}</Link>.
              </>
            )}
          </p>
        </div>
      </section>

      <section className="cd-faq" aria-labelledby="cd-faq-title">
        <div className="cd-faq-inner">
          <span className="cd-eyebrow">{t.faqEyebrow}</span>
          <h2 id="cd-faq-title">
            {t.faqTitlePre}
            <span className="cd-mark">{t.faqTitleHi}</span>
          </h2>
          <dl className="cd-faq-list">
            {FAQ.map((item) => (
              <div key={item.q.it} className="cd-faq-item">
                <dt>{item.q[lang]}</dt>
                <dd>{item.a[lang]}</dd>
              </div>
            ))}
          </dl>
          <Link href="/storia" className="nd-btn cd-story">
            {t.story}
          </Link>
        </div>
      </section>
    </main>
  );
}
