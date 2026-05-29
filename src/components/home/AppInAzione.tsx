"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PanInfo } from "framer-motion";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { haptic } from "@/lib/haptics";

type Stage = {
  screen: string;
  kicker: string;
  title: string;
  body: string;
};

const stages: Stage[] = [
  {
    screen: "/app/01-bolletta-screen.png",
    kicker: "1 · Bolletta",
    title: "Una foto. Karica legge i tuoi consumi reali.",
    body: "Niente moduli, niente codici contatore. Riconosce kWh, € e fornitore direttamente dalla bolletta.",
  },
  {
    screen: "/app/02-edificio-screen.png",
    kicker: "2 · Edificio",
    title: "Qualche domanda semplice sulla casa.",
    body: "Tipo di abitazione, dove sei, com'è fatta. Niente gergo tecnico — il cacatua ti guida.",
  },
  {
    screen: "/app/03-dimensione-screen.png",
    kicker: "3 · Profilo",
    title: "Capisce la tua casa come la conosci tu.",
    body: "Dimensione, impianti, abitudini. Incrocia i tuoi dati con case simili nella tua zona.",
  },
  {
    screen: "/app/04-calcolo-screen.png",
    kicker: "4 · AI",
    title: "AI e dataset nazionali al lavoro.",
    body: "Modello proprietario + banche dati su classe energetica, costi degli interventi e incentivi attivi.",
  },
  {
    screen: "/app/05-diagnosi-screen.png",
    kicker: "5 · Diagnosi",
    title: "La tua classe energetica stimata.",
    body: "E quanto puoi davvero risparmiare ogni anno — con fasce reali, non promesse.",
  },
  {
    screen: "/app/06-interventi-screen.png",
    kicker: "6 · Piano",
    title: "Interventi su misura, già prioritizzati.",
    body: "Dal cambio infissi al fotovoltaico — risparmio annuo, urgenza e incentivi disponibili per ognuno.",
  },
];

const AUTOPLAY_MS = 5000;
const SWIPE_OFFSET = 50;
const SWIPE_VELOCITY = 350;
const SPRING_TRANSITION = { type: "spring", stiffness: 230, damping: 32 } as const;

// Phone canvas & OLED window measurements — kept in sync with the Python
// pipeline that builds bezel.png + *-screen.png assets.
const PHONE_W = 555;
const PHONE_H = 1115;
const SCREEN_LEFT_PCT = (33 / PHONE_W) * 100; // 5.95%
const SCREEN_TOP_PCT = (33 / PHONE_H) * 100; // 2.96%
const SCREEN_WIDTH_PCT = (489 / PHONE_W) * 100; // 88.11%
const SCREEN_HEIGHT_PCT = (1049 / PHONE_H) * 100; // 94.08%
const SCREEN_RADIUS_PCT = (48 / PHONE_W) * 100; // 8.65%

export default function AppInAzione() {
  const [current, setCurrent] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const n = stages.length;

  // Smoothly animated progress 0..1 used to drive the phone's 3D rotation.
  const stageProgress = useMotionValue(0);

  useEffect(() => {
    const target = n > 1 ? current / (n - 1) : 0;
    const controls = animate(stageProgress, target, {
      type: "spring",
      stiffness: 130,
      damping: 24,
      mass: 0.35,
    });
    return controls.stop;
  }, [current, n, stageProgress]);

  const rotateY = useTransform(stageProgress, [0, 0.5, 1], [22, -3, -22]);
  const rotateX = useTransform(stageProgress, [0, 0.5, 1], [10, 1, -8]);
  const floatY = useTransform(stageProgress, [0, 0.5, 1], [-10, 0, 10]);

  const goTo = useCallback(
    (i: number, fromUser: boolean) => {
      const clamped = Math.max(0, Math.min(n - 1, i));
      if (clamped === current) return;
      if (fromUser) {
        if (!interacted) setInteracted(true);
        haptic("light");
      }
      setCurrent(clamped);
    },
    [current, interacted, n]
  );

  // Autoplay 5s, loops, stops at first interaction.
  useEffect(() => {
    if (interacted) return;
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % n);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [interacted, n]);

  // Keyboard arrows when the section is in view.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      e.preventDefault();
      goTo(e.key === "ArrowRight" ? current + 1 : current - 1, true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const { offset, velocity } = info;
      const swipedLeft = offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY;
      const swipedRight = offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY;
      if (swipedLeft) goTo(current + 1, true);
      else if (swipedRight) goTo(current - 1, true);
    },
    [current, goTo]
  );

  return (
    <section
      ref={sectionRef}
      id="app-in-azione"
      aria-label="L'app Karica in azione"
      className="relative bg-bg-dark overflow-hidden py-20 sm:py-24 md:py-28"
    >
      {/* Ambient layers */}
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-accent/[0.05] blur-[140px] pointer-events-none" />
      <div className="glow-orb-slow absolute top-1/3 right-[5%] w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Phone — bezel is static, only the screen content slides */}
          <div
            className="order-1 md:order-2 relative flex items-center justify-center w-full select-none min-w-0"
            style={{ perspective: "1400px" }}
          >
            {/* Glow halo */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden
            >
              <div className="w-[55%] h-[68%] rounded-full bg-cyan-accent/20 blur-[80px]" />
            </div>

            <motion.div
              style={{
                rotateY,
                rotateX,
                y: floatY,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                // Phone size — explicit width AND height so nothing can blow out
                // the layout on any viewport. Derived from PHONE_AR.
                width: "clamp(200px, 28vh, 280px)",
                height: "clamp(400px, 56vh, 562px)",
                maxWidth: "100%",
              }}
              className="relative will-change-transform"
            >
              {/* OLED window — the only thing that slides on swipe */}
              <motion.div
                className="absolute overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y bg-bg-darker"
                style={{
                  left: `${SCREEN_LEFT_PCT}%`,
                  top: `${SCREEN_TOP_PCT}%`,
                  width: `${SCREEN_WIDTH_PCT}%`,
                  height: `${SCREEN_HEIGHT_PCT}%`,
                  borderRadius: `${SCREEN_RADIUS_PCT}%`,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                dragMomentum={false}
                onDragStart={() => !interacted && setInteracted(true)}
                onDragEnd={onDragEnd}
              >
                <motion.div
                  className="flex h-full w-full"
                  animate={{ x: `-${current * 100}%` }}
                  transition={SPRING_TRANSITION}
                >
                  {stages.map((s, i) => (
                    <div
                      key={s.screen}
                      className="relative w-full h-full shrink-0"
                    >
                      <Image
                        src={s.screen}
                        alt={`Schermata Karica — ${s.kicker}`}
                        fill
                        priority={i === 0}
                        draggable={false}
                        sizes="(max-width: 768px) 60vw, 30vw"
                        className="object-cover pointer-events-none"
                      />
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Bezel — sits on top of the sliding screen, never moves */}
              <Image
                src="/app/bezel.png"
                alt=""
                aria-hidden
                width={PHONE_W}
                height={PHONE_H}
                priority
                draggable={false}
                className="absolute inset-0 w-full h-full pointer-events-none select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              />

              {/* Drag hint — only until first interaction */}
              {!interacted && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg/80 border border-card-border backdrop-blur-sm pointer-events-none"
                  aria-hidden
                >
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-text-muted">
                    Trascina
                  </span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-green-primary text-sm"
                  >
                    →
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Copy */}
          <div className="order-2 md:order-1 text-center md:text-left min-w-0">
            <div className="overflow-hidden">
              <motion.div
                className="flex w-full"
                animate={{ x: `-${current * 100}%` }}
                transition={SPRING_TRANSITION}
              >
                {stages.map((s) => (
                  <div
                    key={s.kicker}
                    className="w-full shrink-0 pr-4"
                  >
                    <p className="text-green-primary font-semibold text-[11px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3">
                      {s.kicker}
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-text-primary leading-[1.15] mb-3 sm:mb-4">
                      {s.title}
                    </h2>
                    <p className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                      {s.body}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dots */}
            <div
              className="flex justify-center md:justify-start gap-2 mt-6"
              role="tablist"
              aria-label="Step della demo"
            >
              {stages.map((s, i) => {
                const isActive = i === current;
                return (
                  <button
                    key={s.kicker}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Vai allo step ${i + 1}: ${s.kicker}`}
                    onClick={() => goTo(i, true)}
                    className="group p-1.5 -m-1.5"
                  >
                    <span
                      className={`block w-1.5 h-1.5 rounded-full bg-green-primary transition-all duration-200 ${
                        isActive ? "scale-150 opacity-100" : "opacity-30 group-hover:opacity-60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
