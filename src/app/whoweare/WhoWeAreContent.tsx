"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { haptic } from "@/lib/haptics";

type Lang = "en" | "it";

type Person = {
  name: string;
  role: { en: string; it: string };
  bio: { en: string; it: string };
  photo?: string;
  initials: string;
};

const founders: Person[] = [
  {
    name: "Alessandro Zanin",
    role: { en: "CEO & Co-Founder", it: "CEO & Co-Founder" },
    bio: {
      en: "Over fifteen years managing end-to-end software projects, complex process automation and integration of enterprise systems in regulated contexts. At Karica he leads product strategy, platform architecture and development supervision.",
      it: "Oltre quindici anni nella gestione end-to-end di progetti software, nell'automazione di processi complessi e nell'integrazione di sistemi gestionali in contesti regolamentati. In Karica guida la product strategy, l'architettura della piattaforma e la supervisione dello sviluppo.",
    },
    photo: "/team/alessandro-zanin.jpg",
    initials: "AZ",
  },
  {
    name: "Elia Vassallo",
    role: { en: "Commercial & Co-Founder", it: "Commercial & Co-Founder" },
    bio: {
      en: "Executive MBA from SDA Bocconi and over ten years of international commercial experience. At Karica he leads commercial development, supply-chain partnerships and go-to-market on the ground.",
      it: "Executive MBA SDA Bocconi e oltre dieci anni di esperienza commerciale internazionale. In Karica guida lo sviluppo commerciale, le partnership di filiera e il go-to-market sul territorio.",
    },
    photo: "/team/elia-vassallo.jpg",
    initials: "EV",
  },
  {
    name: "Federico Romis",
    role: { en: "Operations & Co-Founder", it: "Operations & Co-Founder" },
    bio: {
      en: "Engineer and scientific lead of the project. He coordinates operational execution, the industrialization of technical processes, and the orchestration of the supply chain between Karica and the EnerBee partner network.",
      it: "Ingegnere, responsabile scientifico del progetto. Coordina l'esecuzione operativa, l'industrializzazione dei processi tecnici e l'orchestrazione della filiera tra Karica e i partner della rete EnerBee.",
    },
    photo: "/team/federico-romis.jpg",
    initials: "FR",
  },
  {
    name: "Alfredo Perazzo",
    role: {
      en: "Energy, Operations & Co-Founder",
      it: "Energy, Operations & Co-Founder",
    },
    bio: {
      en: "RINA-certified Energy Management Expert (EGE), CEO of EVM S.r.l. and CTO of GTI S.r.l. He brings to Karica twenty years of experience in energy efficiency and plant management, ensuring the technical quality of the solutions we offer.",
      it: "EGE certificato RINA, CEO di EVM S.r.l. e CTO di GTI S.r.l. Porta in Karica vent'anni di esperienza nell'efficientamento energetico e nella gestione di impianti, garantendo la qualità tecnica delle soluzioni proposte agli utenti.",
    },
    photo: "/team/alfredo-perazzo.jpg",
    initials: "AP",
  },
];

const team: Person[] = [
  {
    name: "Gabriele Gaino",
    role: {
      en: "Business Analyst & ML Engineer",
      it: "Business Analyst & ML Engineer",
    },
    bio: {
      en: "IT specialist with over fifteen years of experience across data management, process control and software development. Primary expertise in machine learning, data science and Python-based model development. At Karica he is responsible for the federated aggregation pipeline, model training and benchmarking, and SHAP integration for interpretability.",
      it: "Perito informatico con oltre quindici anni di esperienza tra gestione dati, controllo di processi e sviluppo software. Expertise principale in machine learning, data science e sviluppo di modelli in Python. In Karica è responsabile della pipeline di aggregazione federata, del training e benchmarking dei modelli e dell'integrazione SHAP per l'interpretabilità.",
    },
    photo: "/team/gabriele-gaino.jpg",
    initials: "GG",
  },
  {
    name: "Massimiliano Foss",
    role: { en: "Senior Developer", it: "Senior Developer" },
    bio: {
      en: "Senior developer with expertise in mobile application development and backend infrastructure. At Karica he is responsible for client-side feature extraction and for integrating computational modules across the multi-channel platform.",
      it: "Sviluppatore senior con expertise in mobile application development e infrastruttura backend. In Karica è responsabile della client-side feature extraction e dell'integrazione dei moduli di calcolo sulla piattaforma multi-canale.",
    },
    photo: "/team/massimiliano-foss.jpg",
    initials: "MF",
  },
];

const copy = {
  en: {
    kicker: "Who we are",
    titlePre: "The people behind ",
    titleHighlight: "Karica",
    titlePost: ".",
    intro:
      "A group of founders with two decades of experience in software, business and the energy transition — plus a team that builds, every day, the platform you want on your phone.",
    foundersLabel: "Founders",
    teamLabel: "Team",
    ctaKicker: "Want to meet us?",
    ctaTitlePre: "Let's talk, no ",
    ctaTitleHighlight: "rush",
    ctaTitlePost: ".",
    ctaButton: "Get in touch",
    navCta: "Contact us →",
    footerHome: "Home",
  },
  it: {
    kicker: "Chi siamo",
    titlePre: "Le persone dietro ",
    titleHighlight: "Karica",
    titlePost: ".",
    intro:
      "Un gruppo di founder con vent'anni di esperienza in software, business e transizione energetica — più un team che costruisce ogni giorno la piattaforma che vuoi avere sul telefono.",
    foundersLabel: "Founders",
    teamLabel: "Team",
    ctaKicker: "Vuoi conoscerci?",
    ctaTitlePre: "Parliamoci con ",
    ctaTitleHighlight: "calma",
    ctaTitlePost: ".",
    ctaButton: "Contattaci",
    navCta: "Contattaci →",
    footerHome: "Home",
  },
} as const;

function Avatar({ person, size }: { person: Person; size: "lg" | "md" }) {
  const dim = size === "lg" ? 160 : 120;
  const wrapperClass =
    size === "lg"
      ? "relative w-40 h-40 sm:w-44 sm:h-44"
      : "relative w-28 h-28 sm:w-32 sm:h-32";

  return (
    <div className={wrapperClass}>
      <div className="absolute inset-0 rounded-full bg-green-primary/20 blur-2xl" aria-hidden />
      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-card-border bg-card-bg">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            width={dim}
            height={dim}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card-bg to-bg-darker">
            <span className="font-black text-3xl sm:text-4xl text-gradient">
              {person.initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function FlagUK({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden focusable="false">
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagIT({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden focusable="false">
      <rect width="1" height="2" fill="#008C45" />
      <rect x="1" width="1" height="2" fill="#F4F5F0" />
      <rect x="2" width="1" height="2" fill="#CD212A" />
    </svg>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const base =
    "btn-press-soft flex items-center justify-center w-9 h-7 rounded-md border transition-all";
  const active = "border-green-primary/60 bg-green-primary/10 shadow-[0_0_16px_rgba(57,255,20,0.15)]";
  const inactive = "border-card-border opacity-60 hover:opacity-100 hover:border-text-muted";

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center gap-2 p-1.5 rounded-lg bg-card-bg/60 border border-card-border backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={() => {
          haptic("light");
          setLang("en");
        }}
        aria-pressed={lang === "en"}
        aria-label="English"
        className={`${base} ${lang === "en" ? active : inactive}`}
      >
        <FlagUK className="w-6 h-auto rounded-[2px] overflow-hidden" />
      </button>
      <button
        type="button"
        onClick={() => {
          haptic("light");
          setLang("it");
        }}
        aria-pressed={lang === "it"}
        aria-label="Italiano"
        className={`${base} ${lang === "it" ? active : inactive}`}
      >
        <FlagIT className="w-6 h-auto rounded-[2px] overflow-hidden" />
      </button>
    </div>
  );
}

export default function WhoWeAreContent() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  const footerLinks = [{ label: t.footerHome, href: "/" }];

  return (
    <>
      <Navbar inlineCta={{ label: t.navCta, href: "/contatti" }} />

      <main id="main" className="relative min-h-[100svh] overflow-hidden pt-24 sm:pt-28 pb-20">
        {/* Ambient background */}
        <div className="glow-orb absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />
        <div className="glow-orb-slow absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />
        <div className="glow-orb absolute bottom-[10%] left-[30%] w-[450px] h-[450px] rounded-full bg-pink-accent/[0.03] blur-[110px]" />
        <div className="absolute inset-0 dot-grid opacity-[0.10]" />

        {/* Hero */}
        <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center mb-16 sm:mb-24">
          {/* Language switcher */}
          <div className="flex justify-center mb-6">
            <LangToggle lang={lang} setLang={setLang} />
          </div>

          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-green-primary/20 blur-2xl rounded-full" />
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt="Karica"
              width={72}
              height={72}
              className="relative h-16 sm:h-18 w-auto animate-float mx-auto"
            />
          </div>

          <p className="text-green-primary font-semibold text-xs uppercase tracking-widest mb-3">
            {t.kicker}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-5">
            {t.titlePre}
            <span className="text-gradient">{t.titleHighlight}</span>
            {t.titlePost}
          </h1>

          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.intro}
          </p>
        </section>

        {/* Founders */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-8 sm:mb-12 max-w-5xl mx-auto">
            <span className="h-px flex-1 bg-card-border" aria-hidden />
            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">
              {t.foundersLabel}
            </p>
            <span className="h-px flex-1 bg-card-border" aria-hidden />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {founders.map((person) => (
              <article
                key={person.name}
                className="card-glow group p-6 sm:p-8 transition-all hover:shadow-[0_0_40px_rgba(57,255,20,0.10)]"
              >
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <div className="flex-shrink-0">
                    <Avatar person={person} size="lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-black text-text-primary leading-tight mb-1">
                      {person.name}
                    </h2>
                    <p className="text-green-primary text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3">
                      {person.role[lang]}
                    </p>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                      {person.bio[lang]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 sm:mb-12 max-w-5xl mx-auto">
            <span className="h-px flex-1 bg-card-border" aria-hidden />
            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">
              {t.teamLabel}
            </p>
            <span className="h-px flex-1 bg-card-border" aria-hidden />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {team.map((person) => (
              <article
                key={person.name}
                className="card-glow group p-6 sm:p-8 transition-all hover:shadow-[0_0_40px_rgba(0,212,212,0.10)]"
              >
                <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                  <div className="flex-shrink-0">
                    <Avatar person={person} size="md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-black text-text-primary leading-tight mb-1">
                      {person.name}
                    </h3>
                    <p className="text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-3">
                      {person.role[lang]}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {person.bio[lang]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="card-glow p-6 sm:p-8">
            <div className="relative z-10">
              <p className="text-text-muted text-[11px] uppercase tracking-widest font-semibold mb-3">
                {t.ctaKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-text-primary leading-tight mb-5">
                {t.ctaTitlePre}
                <span className="text-gradient">{t.ctaTitleHighlight}</span>
                {t.ctaTitlePost}
              </h2>
              <Link
                href="/contatti"
                className="btn-press inline-flex items-center gap-2 bg-green-primary text-bg-dark font-bold text-sm px-5 py-3 rounded-lg uppercase tracking-wider hover:bg-green-dark transition-colors"
              >
                {t.ctaButton}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer links={footerLinks} />
    </>
  );
}
