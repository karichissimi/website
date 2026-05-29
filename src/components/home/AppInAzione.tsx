"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { PanInfo } from "framer-motion";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { haptic } from "@/lib/haptics";
import { useLang } from "@/lib/i18n";

type LocalisedStage = {
  bodySrc: string;
  kicker: { it: string; en: string };
  title: { it: string; en: string };
  body: { it: string; en: string };
};

const stages: LocalisedStage[] = [
  {
    bodySrc: "/app/01-bolletta-body.png",
    kicker: { it: "1 · Bolletta", en: "1 · Bill" },
    title: {
      it: "Una foto. Karica legge i tuoi consumi reali.",
      en: "Just a photo. Karica reads your real consumption.",
    },
    body: {
      it: "Niente moduli, niente codici contatore. Riconosce kWh, € e fornitore direttamente dalla bolletta.",
      en: "No forms, no meter codes. It picks up kWh, € and supplier straight from your bill.",
    },
  },
  {
    bodySrc: "/app/02-edificio-body.png",
    kicker: { it: "2 · Edificio", en: "2 · Building" },
    title: {
      it: "Qualche domanda semplice sulla casa.",
      en: "A few simple questions about your home.",
    },
    body: {
      it: "Tipo di abitazione, dove sei, com'è fatta. Niente gergo tecnico — il cacatua ti guida.",
      en: "Building type, location, structure. No technical jargon — the cockatoo walks you through it.",
    },
  },
  {
    bodySrc: "/app/03-dimensione-body.png",
    kicker: { it: "3 · Profilo", en: "3 · Profile" },
    title: {
      it: "Capisce la tua casa come la conosci tu.",
      en: "It learns your home the way you know it.",
    },
    body: {
      it: "Dimensione, impianti, abitudini. Incrocia i tuoi dati con case simili nella tua zona.",
      en: "Size, systems, habits. It cross-references your data with similar homes in your area.",
    },
  },
  {
    bodySrc: "/app/04-calcolo-body.png",
    kicker: { it: "4 · AI", en: "4 · AI" },
    title: {
      it: "AI e dataset nazionali al lavoro.",
      en: "AI and national datasets, at work.",
    },
    body: {
      it: "Modello proprietario + banche dati su classe energetica, costi degli interventi e incentivi attivi.",
      en: "Proprietary model plus national datasets on energy class, retrofit costs and active incentives.",
    },
  },
  {
    bodySrc: "/app/05-diagnosi-body.png",
    kicker: { it: "5 · Diagnosi", en: "5 · Diagnosis" },
    title: {
      it: "La tua classe energetica stimata.",
      en: "Your estimated energy class.",
    },
    body: {
      it: "E quanto puoi davvero risparmiare ogni anno — con fasce reali, non promesse.",
      en: "And how much you can actually save each year — real ranges, not promises.",
    },
  },
  {
    bodySrc: "/app/06-interventi-body.png",
    kicker: { it: "6 · Piano", en: "6 · Plan" },
    title: {
      it: "Interventi su misura, già prioritizzati.",
      en: "Tailored retrofits, already prioritised.",
    },
    body: {
      it: "Dal cambio infissi al fotovoltaico — risparmio annuo, urgenza e incentivi disponibili per ognuno.",
      en: "From new windows to solar PV — annual savings, urgency and available incentives for each one.",
    },
  },
];

const COPY = {
  it: {
    sectionAria: "L'app Karica in azione",
    altScreenPrefix: "Schermata Karica —",
    dragHint: "Provalo",
    stepLabel: (i: number, k: string) => `Vai allo step ${i}: ${k}`,
    stepTitle: "Step della demo",
  },
  en: {
    sectionAria: "The Karica app in action",
    altScreenPrefix: "Karica screen —",
    dragHint: "Try it",
    stepLabel: (i: number, k: string) => `Jump to step ${i}: ${k}`,
    stepTitle: "Demo steps",
  },
} as const;

const AUTOPLAY_MS = 5000;
const SWIPE_OFFSET = 40;
const SWIPE_VELOCITY = 300;
const SPRING_TRANSITION = { type: "spring", stiffness: 230, damping: 32 } as const;

// Phone canvas + OLED window — kept in sync with the Python pipeline that
// builds bezel.png, chrome-status.png, chrome-browser.png, *-screen.png.
const PHONE_W = 555;
const PHONE_H = 1115;
const SCREEN_LEFT_PCT = (33 / PHONE_W) * 100;
const SCREEN_TOP_PCT = (33 / PHONE_H) * 100;
const SCREEN_WIDTH_PCT = (489 / PHONE_W) * 100;
const SCREEN_HEIGHT_PCT = (1049 / PHONE_H) * 100;
const SCREEN_RADIUS_PCT = (48 / PHONE_W) * 100;

// Heights of the static chrome strips (as % of OLED window height)
const STATUS_HEIGHT_PCT = (96 / 1049) * 100;
const BROWSER_HEIGHT_PCT = (178 / 1049) * 100;

// Pointer-driven tilt amplitudes
const PTR_ROTATE_Y = 14;
const PTR_ROTATE_X = 10;
// Pointer-driven translation amplitudes (px) — phone "follows" the finger
const PTR_TRANSLATE_X = 22;
const PTR_TRANSLATE_Y = 16;

// Phone thickness for the 3D box. Bigger = more visible side when rotating.
const THICKNESS_PX = 32;
const PHONE_RADIUS_PCT = 12.5; // matches the bezel.png corner curvature

export default function AppInAzione() {
  const { lang } = useLang();
  const t = COPY[lang];
  const [current, setCurrent] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const n = stages.length;

  // Stage progress 0..1 driving the *base* 3D rotation.
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

  // Base rotation across the journey — bigger amplitudes so the device
  // really reads as moving in 3D, not subtly nudging.
  const baseRotateY = useTransform(stageProgress, [0, 0.5, 1], [30, -3, -30]);
  const baseRotateX = useTransform(stageProgress, [0, 0.5, 1], [16, 2, -14]);
  const floatY = useTransform(stageProgress, [0, 0.5, 1], [-10, 0, 10]);

  // Pointer-driven extra tilt — lets the user "play" with the phone on hover.
  const ptrX = useMotionValue(0); // -1..1
  const ptrY = useMotionValue(0); // -1..1
  const ptrXSmooth = useSpring(ptrX, { stiffness: 180, damping: 22 });
  const ptrYSmooth = useSpring(ptrY, { stiffness: 180, damping: 22 });
  const ptrRotateY = useTransform(ptrXSmooth, (v) => v * PTR_ROTATE_Y);
  const ptrRotateX = useTransform(ptrYSmooth, (v) => v * -PTR_ROTATE_X);

  // Pointer-driven translation — phone shifts position with the finger.
  const ptrTranslateX = useTransform(ptrXSmooth, (v) => v * PTR_TRANSLATE_X);
  const ptrTranslateY = useTransform(ptrYSmooth, (v) => v * PTR_TRANSLATE_Y);

  // Combine base + pointer.
  const rotateY = useTransform<number, number>(
    [baseRotateY, ptrRotateY],
    ([a, b]) => a + b
  );
  const rotateX = useTransform<number, number>(
    [baseRotateX, ptrRotateX],
    ([a, b]) => a + b
  );
  // Vertical position = base float (from stage progress) + pointer drag offset
  const totalY = useTransform<number, number>(
    [floatY, ptrTranslateY],
    ([a, b]) => a + b
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Mouse hover + finger drag both tilt the phone in 3D so it feels
      // alive when you touch it. On touch this happens *concurrently* with
      // the carousel drag gesture, which reads as 'wrestling with the phone'.
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      ptrX.set(Math.max(-1, Math.min(1, nx)));
      ptrY.set(Math.max(-1, Math.min(1, ny)));
    },
    [ptrX, ptrY]
  );

  const onPointerLeave = useCallback(() => {
    ptrX.set(0);
    ptrY.set(0);
  }, [ptrX, ptrY]);

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // On touch, "leave" doesn't fire automatically — release brings the
      // tilt back to neutral.
      if (e.pointerType === "touch") {
        ptrX.set(0);
        ptrY.set(0);
      }
    },
    [ptrX, ptrY]
  );

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

  // Keyboard: ↑ / ↓ (and ← / → as fallback) when section is in view.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const next = e.key === "ArrowDown" || e.key === "ArrowRight";
      const prev = e.key === "ArrowUp" || e.key === "ArrowLeft";
      if (!next && !prev) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      e.preventDefault();
      goTo(next ? current + 1 : current - 1, true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  // Vertical drag: swipe up = next, swipe down = prev (matches real scroll).
  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const { offset, velocity } = info;
      const swipedUp = offset.y < -SWIPE_OFFSET || velocity.y < -SWIPE_VELOCITY;
      const swipedDown = offset.y > SWIPE_OFFSET || velocity.y > SWIPE_VELOCITY;
      if (swipedUp) goTo(current + 1, true);
      else if (swipedDown) goTo(current - 1, true);
    },
    [current, goTo]
  );

  return (
    <section
      ref={sectionRef}
      id="app-in-azione"
      aria-label={t.sectionAria}
      className="relative bg-bg-dark overflow-hidden py-20 sm:py-24 md:py-28"
    >
      {/* Ambient layers */}
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-accent/[0.05] blur-[140px] pointer-events-none" />
      <div className="glow-orb-slow absolute top-1/3 right-[5%] w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Phone column — flex-col so PROVALO sits below the phone in
              page flow, NOT inside the rotating 3D wrapper. */}
          <div
            className="order-1 md:order-2 relative flex flex-col items-center justify-center gap-5 sm:gap-7 w-full select-none min-w-0"
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerLeave}
          >
            <div
              className="relative flex items-center justify-center"
              style={{ perspective: "900px" }}
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
                y: totalY,
                x: ptrTranslateX,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                width: "clamp(200px, 28vh, 280px)",
                height: "clamp(400px, 56vh, 562px)",
                maxWidth: "100%",
              }}
              className="relative will-change-transform"
            >
              {/* Real 3D thickness — back panel + 4 side rim strips rotated
                  90° on the appropriate axis. transformStyle: preserve-3d
                  on the parent makes children participate in the same 3D
                  space, so rotating the wrapper actually reveals the sides. */}

              {/* Back panel — solid rounded rect at the back of the box,
                  represents the rear face of the phone. */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: `translateZ(${-THICKNESS_PX / 2}px)`,
                  background:
                    "linear-gradient(135deg, #1c1c24 0%, #0b0b12 50%, #161620 100%)",
                  borderRadius: `${PHONE_RADIUS_PCT}%`,
                  boxShadow:
                    "inset 0 0 24px rgba(0,0,0,0.7), 0 0 1px rgba(70,72,85,0.5)",
                }}
              />

              {/* Right side rim — visible when rotateY > 0 */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  top: "4%",
                  bottom: "4%",
                  right: 0,
                  width: `${THICKNESS_PX}px`,
                  transformOrigin: "0% 50%",
                  transform: `rotateY(90deg)`,
                  background:
                    "linear-gradient(180deg, #1a1a22 0%, #2a2a35 8%, #353541 50%, #2a2a35 92%, #1a1a22 100%)",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.5)",
                  borderRadius: "3px",
                }}
              />

              {/* Left side rim — visible when rotateY < 0 */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  top: "4%",
                  bottom: "4%",
                  left: 0,
                  width: `${THICKNESS_PX}px`,
                  transformOrigin: "100% 50%",
                  transform: `rotateY(-90deg)`,
                  background:
                    "linear-gradient(180deg, #1a1a22 0%, #2a2a35 8%, #353541 50%, #2a2a35 92%, #1a1a22 100%)",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.5)",
                  borderRadius: "3px",
                }}
              />

              {/* Top side rim — visible when rotateX < 0 (looking down at top) */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  left: "5%",
                  right: "5%",
                  top: 0,
                  height: `${THICKNESS_PX}px`,
                  transformOrigin: "50% 100%",
                  transform: `rotateX(90deg)`,
                  background:
                    "linear-gradient(90deg, #1a1a22 0%, #2a2a35 10%, #353541 50%, #2a2a35 90%, #1a1a22 100%)",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.5)",
                  borderRadius: "3px",
                }}
              />

              {/* Bottom side rim — visible when rotateX > 0 (looking up at bottom) */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  left: "5%",
                  right: "5%",
                  bottom: 0,
                  height: `${THICKNESS_PX}px`,
                  transformOrigin: "50% 0%",
                  transform: `rotateX(-90deg)`,
                  background:
                    "linear-gradient(90deg, #1a1a22 0%, #2a2a35 10%, #353541 50%, #2a2a35 90%, #1a1a22 100%)",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.5)",
                  borderRadius: "3px",
                }}
              />

              {/* Front face wrapper — pushes everything forward so OLED, bezel
                  and chrome live on the FRONT plane of the 3D box. */}
              <div
                className="absolute inset-0"
                style={{
                  transform: `translateZ(${THICKNESS_PX / 2}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
              {/* OLED window — fixed in place. Drag and animate live inside
                  the body slot so the OLED itself never translates outside
                  the bezel. */}
              <div
                className="absolute overflow-hidden bg-bg-darker"
                style={{
                  left: `${SCREEN_LEFT_PCT}%`,
                  top: `${SCREEN_TOP_PCT}%`,
                  width: `${SCREEN_WIDTH_PCT}%`,
                  height: `${SCREEN_HEIGHT_PCT}%`,
                  borderRadius: `${SCREEN_RADIUS_PCT}%`,
                }}
              >
                {/* Body slot — between the two chrome bars. Only this area
                    receives the drag gesture; nothing else can translate. */}
                <motion.div
                  className="absolute left-0 right-0 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-x"
                  style={{
                    top: `${STATUS_HEIGHT_PCT}%`,
                    bottom: `${BROWSER_HEIGHT_PCT}%`,
                  }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.22}
                  dragMomentum={false}
                  onDragStart={() => !interacted && setInteracted(true)}
                  onDragEnd={onDragEnd}
                >
                  <motion.div
                    className="absolute inset-0 flex flex-col"
                    animate={{ y: `-${current * 100}%` }}
                    transition={SPRING_TRANSITION}
                  >
                    {stages.map((s, i) => (
                      <div
                        key={s.bodySrc}
                        className="relative w-full h-full shrink-0"
                      >
                        <Image
                          src={s.bodySrc}
                          alt={`${t.altScreenPrefix} ${s.kicker[lang]}`}
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

                {/* Static iOS status bar — pinned at top of OLED, above body */}
                <Image
                  src="/app/chrome-status.png"
                  alt=""
                  aria-hidden
                  width={489}
                  height={96}
                  priority
                  draggable={false}
                  className="absolute top-0 left-0 w-full pointer-events-none select-none"
                  style={{ height: `${STATUS_HEIGHT_PCT}%` }}
                />

                {/* Static Safari bottom bar — pinned at bottom of OLED */}
                <Image
                  src="/app/chrome-browser.png"
                  alt=""
                  aria-hidden
                  width={489}
                  height={178}
                  priority
                  draggable={false}
                  className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
                  style={{ height: `${BROWSER_HEIGHT_PCT}%` }}
                />
              </div>

              {/* Bezel — sits on top of everything, never moves.
                  Layered filter stack:
                  - directional black shadow (depth) — bigger, more saturated
                  - cyan rim light on the lit side (matches brand glow)
                  - green back-rim accent (subtle, behind) */}
              <Image
                src="/app/bezel.png"
                alt=""
                aria-hidden
                width={PHONE_W}
                height={PHONE_H}
                priority
                draggable={false}
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                style={{
                  filter:
                    "drop-shadow(36px 50px 70px rgba(0,0,0,0.75)) drop-shadow(-8px -4px 28px rgba(0,212,212,0.18)) drop-shadow(0 0 40px rgba(57,255,20,0.08))",
                }}
              />

              {/* Specular highlight strip — fakes the catch of light along
                  the left edge of the phone. Sits above bezel, follows
                  the 3D rotation of the wrapper. */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 18%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 100%)",
                  borderRadius: "12%",
                  WebkitMaskImage: "url(/app/bezel.png)",
                  maskImage: "url(/app/bezel.png)",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                }}
              />
              </div>
              {/* /front face wrapper */}

            </motion.div>
            </div>

            {/* Play CTA — vive nel flow della colonna sotto al telefono.
                Non ha perspective ne' rotazione: e' una pill sempre dritta
                centrata, smette di essere visibile alla prima interazione. */}
            {!interacted && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  opacity: { delay: 0.6, duration: 0.4 },
                  y: { delay: 0.6, duration: 0.4 },
                  scale: { delay: 1, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-primary text-bg-dark shadow-[0_8px_24px_rgba(57,255,20,0.35)] pointer-events-none"
                aria-hidden
              >
                <Play size={12} fill="currentColor" strokeWidth={0} />
                <span className="text-[11px] uppercase tracking-wider font-bold whitespace-nowrap">
                  {t.dragHint}
                </span>
              </motion.div>
            )}
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
                  <div key={s.bodySrc} className="w-full shrink-0 pr-4">
                    <p className="text-green-primary font-semibold text-[11px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3">
                      {s.kicker[lang]}
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-text-primary leading-[1.15] mb-3 sm:mb-4">
                      {s.title[lang]}
                    </h2>
                    <p className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                      {s.body[lang]}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dots */}
            <div
              className="flex justify-center md:justify-start gap-2 mt-6"
              role="tablist"
              aria-label={t.stepTitle}
            >
              {stages.map((s, i) => {
                const isActive = i === current;
                return (
                  <button
                    key={s.bodySrc}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={t.stepLabel(i + 1, s.kicker[lang])}
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
