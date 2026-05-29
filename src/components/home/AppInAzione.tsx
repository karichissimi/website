"use client";

import { useRef } from "react";
import Image from "next/image";
import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Stage = {
  src: string;
  kicker: string;
  title: string;
  body: string;
};

const stages: Stage[] = [
  {
    src: "/app/01-bolletta.png",
    kicker: "1 · Bolletta",
    title: "Una foto. Karica legge i tuoi consumi reali.",
    body: "Niente moduli, niente codici contatore. Riconosce kWh, € e fornitore direttamente dalla bolletta.",
  },
  {
    src: "/app/02-edificio.png",
    kicker: "2 · Edificio",
    title: "Qualche domanda semplice sulla casa.",
    body: "Tipo di abitazione, dove sei, com'è fatta. Niente gergo tecnico — il cacatua ti guida.",
  },
  {
    src: "/app/03-dimensione.png",
    kicker: "3 · Profilo",
    title: "Capisce la tua casa come la conosci tu.",
    body: "Dimensione, impianti, abitudini. Incrocia i tuoi dati con case simili nella tua zona.",
  },
  {
    src: "/app/04-calcolo.png",
    kicker: "4 · AI",
    title: "AI e dataset nazionali al lavoro.",
    body: "Modello proprietario + banche dati su classe energetica, costi degli interventi e incentivi attivi.",
  },
  {
    src: "/app/05-diagnosi.png",
    kicker: "5 · Diagnosi",
    title: "La tua classe energetica stimata.",
    body: "E quanto puoi davvero risparmiare ogni anno — con fasce reali, non promesse.",
  },
  {
    src: "/app/06-interventi.png",
    kicker: "6 · Piano",
    title: "Interventi su misura, già prioritizzati.",
    body: "Dal cambio infissi al fotovoltaico — risparmio annuo, urgenza e incentivi disponibili per ognuno.",
  },
];

const FADE = 0.035;

function stageOpacityKeyframes(index: number, total: number) {
  const start = index / total;
  const end = (index + 1) / total;
  const input = [start - FADE, start + FADE, end - FADE, end + FADE];
  const output: number[] =
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0];
  return { input, output };
}

function PhoneScreen({
  stage,
  progress,
  index,
  total,
}: {
  stage: Stage;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const { input, output } = stageOpacityKeyframes(index, total);
  const opacity = useTransform(progress, input, output);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <Image
        src={stage.src}
        alt={`Schermata Karica — ${stage.kicker}`}
        width={555}
        height={1115}
        priority={index === 0}
        className="w-auto h-full max-h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      />
    </motion.div>
  );
}

function StageCopy({
  stage,
  progress,
  index,
  total,
}: {
  stage: Stage;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const { input, output } = stageOpacityKeyframes(index, total);
  const opacity = useTransform(progress, input, output);
  const yOutput: number[] =
    index === 0
      ? [0, 0, 0, -8]
      : index === total - 1
      ? [8, 0, 0, 0]
      : [8, 0, 0, -8];
  const y = useTransform(progress, input, yOutput);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <p className="text-green-primary font-semibold text-[11px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3">
        {stage.kicker}
      </p>
      <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-text-primary leading-[1.15] mb-2 sm:mb-4">
        {stage.title}
      </h2>
      <p className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
        {stage.body}
      </p>
    </motion.div>
  );
}

function StageDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const active = useTransform(
    progress,
    [start - 0.02, start + 0.02, end - 0.02, end + 0.02],
    [0, 1, 1, 0]
  );
  const scale = useTransform(active, [0, 1], [1, 1.5]);
  const opacity = useTransform(active, [0, 1], [0.25, 1]);
  return (
    <motion.span
      style={{ scale, opacity }}
      className="block w-1.5 h-1.5 rounded-full bg-green-primary"
      aria-hidden
    />
  );
}

export default function AppInAzione() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value so motion feels continuous, not snappy.
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.35,
  });

  const n = stages.length;

  // Continuous 3D rotation across the entire journey — bigger amplitude so
  // it actually reads as a moving device, not a static screen with a wiggle.
  // The phone "turns" smoothly from one side to the other as you scroll.
  const rotateY = useTransform(progress, [0, 0.5, 1], [22, -3, -22]);
  const rotateX = useTransform(progress, [0, 0.5, 1], [10, 1, -8]);
  const floatY = useTransform(progress, [0, 0.5, 1], [-10, 0, 10]);
  // Small continuous breathing-like noise layered on top for "handheld" feel.
  const wiggleY = useTransform(progress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -2, 1.5, -1, 2, -1.5]);
  const wiggleX = useTransform(progress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, -1, 1.5, -1, 1]);

  return (
    <section
      ref={sectionRef}
      id="app-in-azione"
      aria-label="L'app Karica in azione"
      className="relative bg-bg-dark"
      style={{ height: `${n * 100}vh`, scrollSnapAlign: "none" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient layers */}
        <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-accent/[0.05] blur-[140px] pointer-events-none" />
        <div className="glow-orb-slow absolute top-1/3 right-[5%] w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

        {/* Main composition — flex column on mobile, grid on md+.
            Heights are clamped so the phone + copy always fit a single viewport,
            no matter the device. */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-10 pt-20 pb-6 md:py-12 gap-4">
          {/* Phone column */}
          <div
            className="order-1 md:order-2 relative flex items-center justify-center w-full"
            style={{ perspective: "1400px", flexBasis: "55%", flexShrink: 0 }}
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
                x: wiggleX,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
              }}
              className="relative will-change-transform"
            >
              <motion.div
                style={{ y: wiggleY }}
                className="relative"
              >
                {/* Aspect-ratio container with responsive clamp on height */}
                <div
                  className="relative"
                  style={{
                    height: "clamp(360px, 50vh, 560px)",
                    aspectRatio: "555 / 1115",
                  }}
                >
                  {stages.map((s, i) => (
                    <PhoneScreen
                      key={s.src}
                      stage={s}
                      progress={progress}
                      index={i}
                      total={n}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Copy column */}
          <div className="order-2 md:order-1 text-center md:text-left flex-1 min-h-0 flex flex-col justify-center">
            <div className="relative min-h-[10rem] sm:min-h-[12rem] md:min-h-[16rem]">
              {stages.map((s, i) => (
                <StageCopy
                  key={s.kicker}
                  stage={s}
                  progress={progress}
                  index={i}
                  total={n}
                />
              ))}
            </div>

            {/* Stage dots */}
            <div className="flex justify-center md:justify-start gap-2 mt-4 md:mt-6">
              {stages.map((_, i) => (
                <StageDot key={i} index={i} total={n} progress={progress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
