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
    body: "Niente moduli da compilare, niente codici contatore. Riconosce kWh, € e fornitore direttamente dalla bolletta.",
  },
  {
    src: "/app/02-edificio.png",
    kicker: "2 · Edificio",
    title: "Ti fa qualche domanda semplice sulla casa.",
    body: "Tipo di abitazione, dove sei, com'è fatta. Niente gergo tecnico — il cacatua ti guida passo per passo.",
  },
  {
    src: "/app/03-dimensione.png",
    kicker: "3 · Profilo",
    title: "Capisce la tua casa come la conosci tu.",
    body: "Dimensione, impianti, abitudini. Incrocia le tue risposte con i dati di case simili alla tua sul territorio.",
  },
  {
    src: "/app/04-calcolo.png",
    kicker: "4 · AI",
    title: "Mette al lavoro AI e dataset nazionali.",
    body: "Modello proprietario + banche dati su classe energetica, costi degli interventi e incentivi attivi nella tua zona.",
  },
  {
    src: "/app/05-diagnosi.png",
    kicker: "5 · Diagnosi",
    title: "La tua classe energetica stimata.",
    body: "E quanto puoi davvero risparmiare all'anno. Niente preventivi fumosi: punti critici e fasce di risparmio reali.",
  },
  {
    src: "/app/06-interventi.png",
    kicker: "6 · Piano",
    title: "Interventi su misura, già prioritizzati.",
    body: "Dal cambio infissi al fotovoltaico — ognuno con risparmio annuo, livello di urgenza e incentivi disponibili.",
  },
];

const FADE = 0.035;

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
  const start = index / total;
  const end = (index + 1) / total;
  const input = [start - FADE, start + FADE, end - FADE, end + FADE];
  // First screen stays visible before its range; last screen stays after.
  const output: number[] =
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0];
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
        className="w-auto h-full max-h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
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
  const start = index / total;
  const end = (index + 1) / total;
  const input = [start - FADE, start + FADE, end - FADE, end + FADE];
  const output: number[] =
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0];
  const opacity = useTransform(progress, input, output);
  // Slight Y offset entering/leaving for a touch of motion
  const y = useTransform(progress, input, index === 0 ? [0, 0, 0, -10] : index === total - 1 ? [10, 0, 0, 0] : [10, 0, 0, -10]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <p className="text-green-primary font-semibold text-sm uppercase tracking-widest mb-3">
        {stage.kicker}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-[1.1] mb-5">
        {stage.title}
      </h2>
      <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
        {stage.body}
      </p>
    </motion.div>
  );
}

export default function AppInAzione() {
  const sectionRef = useRef<HTMLElement>(null);

  // Progress through the entire tall section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });

  const n = stages.length;

  // Subtle device "handheld" wiggle: small rotation shifts per stage so the
  // phone feels alive, not pinned. Values picked to read as accidental motion,
  // not a metronome.
  const rotateY = useTransform(progress, [0, 0.2, 0.4, 0.6, 0.8, 1], [-9, -3, 4, -2, 5, -4]);
  const rotateX = useTransform(progress, [0, 0.2, 0.4, 0.6, 0.8, 1], [5, -2, 3, -3, 2, -2]);
  const floatY = useTransform(progress, [0, 1], [-6, 6]);

  return (
    <section
      ref={sectionRef}
      id="app-in-azione"
      aria-label="L'app Karica in azione"
      className="relative bg-bg-dark snap-none"
      style={{ height: `${n * 100}vh`, scrollSnapAlign: "none" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Ambient glow */}
        <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-accent/[0.05] blur-[140px] pointer-events-none" />
        <div className="glow-orb-slow absolute top-1/3 right-[5%] w-[400px] h-[400px] rounded-full bg-green-primary/[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Copy column — stages cross-fade in place */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="relative min-h-[16rem] sm:min-h-[18rem] md:min-h-[20rem]">
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

              {/* Stage indicator dots */}
              <div className="flex justify-center md:justify-start gap-2 mt-6">
                {stages.map((_, i) => (
                  <StageDot key={i} index={i} total={n} progress={progress} />
                ))}
              </div>
            </div>

            {/* Phone — sticky scene, screens cross-fade inside, wrapper wiggles in 3D */}
            <div
              className="order-1 md:order-2 relative flex justify-center items-center"
              style={{ perspective: "1400px" }}
            >
              {/* Glow halo behind phone */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <div className="w-[60%] h-[70%] rounded-full bg-cyan-accent/20 blur-[90px]" />
              </div>

              <motion.div
                style={{
                  rotateY,
                  rotateX,
                  y: floatY,
                  transformStyle: "preserve-3d",
                }}
                className="relative will-change-transform"
              >
                {/* Aspect-ratio container so the phones stack identically */}
                <div
                  className="relative h-[64vh] sm:h-[68vh] md:h-[72vh] max-h-[640px]"
                  style={{ aspectRatio: "555 / 1115" }}
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
            </div>
          </div>
        </div>
      </div>
    </section>
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
  const scale = useTransform(active, [0, 1], [1, 1.4]);
  const opacity = useTransform(active, [0, 1], [0.3, 1]);
  return (
    <motion.span
      style={{ scale, opacity }}
      className="block w-1.5 h-1.5 rounded-full bg-green-primary"
      aria-hidden
    />
  );
}
