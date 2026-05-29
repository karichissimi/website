"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Users,
  Handshake,
  ShieldCheck,
  Cloud,
  Sparkles,
  Database,
  Settings2,
  Banknote,
} from "lucide-react";
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
    tractionLabel: "Traction",
    tractionTitle: "Built on real ground.",
    tractionIntro:
      "We did not start from a deck. We started from signed contracts, a working platform and 5,000 real users on day one.",
    stackLabel: "Stack",
    stackTitle: "Cloud-native, AI-first.",
    stackIntro:
      "Modern infrastructure that scales without rewrites. Built to plug into Italian regulators (GSE) and banking partners from day one.",
    roadmapLabel: "Roadmap",
    roadmapTitle: "Three acts.",
    roadmapIntro:
      "A clear path from validation to scale to national energy environment — funded in stages, never raised on promises alone.",
    fundingLabel: "Funding",
    fundingTitle: "Where we are right now.",
    fundingIntro:
      "Pre-seed round €500,000 currently open. Pre-money valuation €1.5M, post-money €2M. Minimum ticket €10,000 (0.5% post-money).",
    fundingKpiTitle: "Plan 2026–2030 — verifiable numbers.",
    fundingKpiIntro:
      "Operating breakeven from year one. Monotonic operating leverage to a 47% EBITDA margin by 2030.",
    fundingKpiHeaders: {
      year: "Year",
      users: "Active users",
      revenue: "Revenue",
      ebitda: "EBITDA",
    },
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
    tractionLabel: "Traction",
    tractionTitle: "Costruita su terreno reale.",
    tractionIntro:
      "Non siamo partiti da un deck. Siamo partiti da contratti firmati, una piattaforma operativa e 5.000 utenti reali dal giorno zero.",
    stackLabel: "Stack",
    stackTitle: "Cloud-native, AI-first.",
    stackIntro:
      "Infrastruttura moderna che scala senza riscritture. Integrata con regolatori italiani (GSE) e partner bancari fin dal giorno uno.",
    roadmapLabel: "Roadmap",
    roadmapTitle: "Tre atti.",
    roadmapIntro:
      "Un percorso chiaro dalla validazione alla scala all'ambiente energetico nazionale — finanziato a tappe, mai promesse senza numeri.",
    fundingLabel: "Funding",
    fundingTitle: "Dove siamo ora.",
    fundingIntro:
      "Round pre-seed €500.000 attualmente aperto. Valutazione pre-money €1,5M, post-money €2M. Ticket minimo €10.000 (0,5% post-money).",
    fundingKpiTitle: "Piano 2026–2030 — numeri verificabili.",
    fundingKpiIntro:
      "Breakeven operativo dal primo anno. Leva operativa monotona crescente fino al 47% di marginalità EBITDA al 2030.",
    fundingKpiHeaders: {
      year: "Anno",
      users: "Utenti attivi",
      revenue: "Ricavi",
      ebitda: "EBITDA",
    },
    ctaKicker: "Vuoi conoscerci?",
    ctaTitlePre: "Parliamoci con ",
    ctaTitleHighlight: "calma",
    ctaTitlePost: ".",
    ctaButton: "Contattaci",
    navCta: "Contattaci →",
    footerHome: "Home",
  },
} as const;

type IconCmp = typeof Users;

type TractionItem = {
  icon: IconCmp;
  value: string;
  label: { en: string; it: string };
  detail: { en: string; it: string };
  accent: "green" | "cyan" | "pink";
};

const tractionItems: TractionItem[] = [
  {
    icon: Users,
    value: "5.000",
    label: {
      en: "Real users from day zero",
      it: "Utenti reali dal giorno zero",
    },
    detail: {
      en: "Onboarded through our signed White Label agreement with Entraco (~60% SMEs, ~40% residential). Pre-filled diagnoses, real consumption data, no cold acquisition.",
      it: "Onboardati tramite il contratto White Label firmato con Entraco (~60% PMI, ~40% residenziale). Diagnosi pre-compilate, dati di consumo reali, zero acquisizione a freddo.",
    },
    accent: "green",
  },
  {
    icon: Handshake,
    value: "4",
    label: {
      en: "Industrial partners contracted",
      it: "Partner industriali contrattualizzati",
    },
    detail: {
      en: "GTI (PV & storage), GBI (construction & retrofit), E-VM (ESCo & bankability), EC HUB ETS (energy communities). Bilateral service contracts, not equity — independence preserved.",
      it: "GTI (FV e storage), GBI (costruzioni e retrofit), E-VM (ESCo e bancabilità), EC HUB ETS (Comunità Energetiche). Contratti di servizio bilaterali, non equity — indipendenza preservata.",
    },
    accent: "cyan",
  },
  {
    icon: ShieldCheck,
    value: "2025",
    label: {
      en: "Innovative startup, certified",
      it: "Startup innovativa, iscritta",
    },
    detail: {
      en: "Incorporated under art. 25 D.L. 179/2012. Eligible for the 65% personal income tax deduction for retail investors, up to €300,000 invested.",
      it: "Costituita ai sensi dell'art. 25 D.L. 179/2012. Eleggibile per la detrazione IRPEF 65% per investitori persone fisiche, fino a €300.000 investiti.",
    },
    accent: "pink",
  },
];

type StackItem = {
  icon: IconCmp;
  title: { en: string; it: string };
  detail: { en: string; it: string };
};

const stackItems: StackItem[] = [
  {
    icon: Cloud,
    title: { en: "Cloud-native backend", it: "Backend cloud-native" },
    detail: {
      en: "Supabase (managed PostgreSQL) + Edge Functions. Multi-region ready. No legacy stack to migrate, no on-prem to maintain.",
      it: "Supabase (PostgreSQL gestito) + Edge Functions. Multi-region ready. Nessuno stack legacy da migrare, nessun on-prem da mantenere.",
    },
  },
  {
    icon: Sparkles,
    title: { en: "Proprietary AI engine", it: "Motore AI proprietario" },
    detail: {
      en: "Forecasting models for energy savings and intervention prioritisation. SHAP integration for interpretability — every recommendation is explainable.",
      it: "Modelli di forecasting su risparmio energetico e prioritizzazione interventi. Integrazione SHAP per l'interpretabilità — ogni raccomandazione è spiegabile.",
    },
  },
  {
    icon: Database,
    title: { en: "Multi-channel client", it: "Client multi-canale" },
    detail: {
      en: "React Native (Expo) for iOS and Android, web app in TypeScript. One codebase, three surfaces. Federated feature extraction client-side for privacy.",
      it: "React Native (Expo) per iOS e Android, web app in TypeScript. Una codebase, tre superfici. Feature extraction federata lato client per la privacy.",
    },
  },
  {
    icon: Settings2,
    title: { en: "ERP & integrations", it: "ERP e integrazioni" },
    detail: {
      en: "Odoo as the operational backbone (CRM, billing, document management). Bi-directional API with the platform. GSE-ready for energy community reporting and incentive flows.",
      it: "Odoo come spina dorsale operativa (CRM, fatturazione, documentale). API bidirezionali con la piattaforma. Pronto per GSE su rendicontazione CER e flussi incentivi.",
    },
  },
];

type RoadmapAct = {
  number: string;
  period: string;
  title: { en: string; it: string };
  funding: { en: string; it: string };
  bullets: { en: string[]; it: string[] };
  accent: "green" | "cyan" | "pink";
};

const roadmapActs: RoadmapAct[] = [
  {
    number: "01",
    period: "2026 — 2027",
    title: { en: "The Laboratory", it: "Il Laboratorio" },
    funding: { en: "Pre-seed €500k", it: "Pre-seed €500k" },
    bullets: {
      en: [
        "Validation on real users (Entraco 5,000 base + industrial network pipeline)",
        "Service mix: energy efficiency (10% fee on works), CER activation via EC HUB, switch & subscription",
        "Operating breakeven from year one",
        "Exit milestones: 100+ works closed, 2+ White Label signed, NPS ≥40",
      ],
      it: [
        "Validazione su utenti reali (base Entraco 5.000 + pipeline network industriale)",
        "Mix servizi: efficienza (fee 10% sui lavori), attivazione CER via EC HUB, switch & subscription",
        "Breakeven operativo dal primo anno",
        "Milestone di uscita: 100+ lavori chiusi, 2+ White Label firmati, NPS ≥40",
      ],
    },
    accent: "green",
  },
  {
    number: "02",
    period: "2028 — 2030",
    title: { en: "The Open Marketplace", it: "Il Marketplace Aperto" },
    funding: { en: "Seed €1.5M", it: "Seed €1,5M" },
    bullets: {
      en: [
        "Karica Academy: nationwide network of certified installers",
        "Digital Operations: AI-driven back-office for commercial/admin tasks",
        "Engagement Layer: community, gamification, wallet (Octopus-style)",
        "2-3 new White Label partners/year, fee on works scales 10% → 20%",
      ],
      it: [
        "Karica Academy: rete nazionale di installatori certificati",
        "Digital Operations: back-office a guida AI per commerciale/amministrazione",
        "Engagement Layer: community, gamification, wallet (modello Octopus)",
        "2-3 nuovi partner White Label/anno, fee sui lavori scala 10% → 20%",
      ],
    },
    accent: "cyan",
  },
  {
    number: "03",
    period: "2031 +",
    title: { en: "The Karica environment", it: "L'ambiente Karica" },
    funding: { en: "Series B (TBD)", it: "Series B (TBD)" },
    bullets: {
      en: [
        "Hardware-software integration: monitoring devices in-home (Ecoflow/Tibber model)",
        "Karica Tariff: direct energy supply with gamification as moat (UK Octopus model)",
        "Peer-to-peer energy trading once Italian regulation aligns with DE/CH",
        "Revenue mix rebalances: works <50% of revenue, recurring takes over",
      ],
      it: [
        "Integrazione hardware-software: dispositivi di monitoring in casa (modello Ecoflow/Tibber)",
        "Tariffa Karica: fornitura energia diretta con gamification come moat (modello UK Octopus)",
        "Peer-to-peer energy trading appena la normativa italiana si allinea a DE/CH",
        "Mix ricavi si riequilibra: lavori <50% dei ricavi, prendono spazio i ricorrenti",
      ],
    },
    accent: "pink",
  },
];

type KpiRow = {
  year: string;
  users: string;
  revenue: string;
  ebitda: string;
};

const kpiRows: KpiRow[] = [
  { year: "2026", users: "5.000",  revenue: "€221k",  ebitda: "breakeven" },
  { year: "2027", users: "18.500", revenue: "€1,17M", ebitda: "€110k · 9%" },
  { year: "2028", users: "36.500", revenue: "€2,55M", ebitda: "€658k · 26%" },
  { year: "2029", users: "69.000", revenue: "€5,10M", ebitda: "€1,92M · 38%" },
  { year: "2030", users: "96.000", revenue: "€7,58M", ebitda: "€3,60M · 47%" },
];

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

        {/* Traction */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 sm:mb-10 max-w-5xl mx-auto">
            <span className="h-px flex-1 bg-card-border" aria-hidden />
            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">
              {t.tractionLabel}
            </p>
            <span className="h-px flex-1 bg-card-border" aria-hidden />
          </div>

          <div className="max-w-3xl mx-auto text-center md:text-left mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight mb-3">
              {t.tractionTitle}
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
              {t.tractionIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {tractionItems.map((item) => {
              const Icon = item.icon;
              const accentColor =
                item.accent === "green"
                  ? "text-green-primary border-green-primary/30 bg-green-primary/[0.06]"
                  : item.accent === "cyan"
                  ? "text-cyan-accent border-cyan-accent/30 bg-cyan-accent/[0.06]"
                  : "text-pink-accent border-pink-accent/30 bg-pink-accent/[0.06]";
              const iconBg =
                item.accent === "green"
                  ? "bg-green-primary/10"
                  : item.accent === "cyan"
                  ? "bg-cyan-accent/10"
                  : "bg-pink-accent/10";
              return (
                <article
                  key={item.value}
                  className={`relative rounded-2xl border p-5 sm:p-6 ${accentColor}`}
                >
                  <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center mb-4`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-text-primary leading-none mb-1 font-mono tabular-nums">
                    {item.value}
                  </p>
                  <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 ${
                    item.accent === "green" ? "text-green-primary" : item.accent === "cyan" ? "text-cyan-accent" : "text-pink-accent"
                  }`}>
                    {item.label[lang]}
                  </p>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                    {item.detail[lang]}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Stack */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 sm:mb-10 max-w-5xl mx-auto">
            <span className="h-px flex-1 bg-card-border" aria-hidden />
            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">
              {t.stackLabel}
            </p>
            <span className="h-px flex-1 bg-card-border" aria-hidden />
          </div>

          <div className="max-w-3xl mx-auto text-center md:text-left mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight mb-3">
              {t.stackTitle}
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
              {t.stackIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {stackItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title.en}
                  className="rounded-xl border border-card-border bg-card-bg/40 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-card-bg border border-card-border flex items-center justify-center">
                      <Icon size={18} className="text-text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-primary font-bold text-sm sm:text-base mb-1.5">
                        {item.title[lang]}
                      </h3>
                      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                        {item.detail[lang]}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Roadmap */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 sm:mb-10 max-w-5xl mx-auto">
            <span className="h-px flex-1 bg-card-border" aria-hidden />
            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">
              {t.roadmapLabel}
            </p>
            <span className="h-px flex-1 bg-card-border" aria-hidden />
          </div>

          <div className="max-w-3xl mx-auto text-center md:text-left mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text-primary leading-tight mb-3">
              {t.roadmapTitle}
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
              {t.roadmapIntro}
            </p>
          </div>

          <div className="space-y-5 max-w-5xl mx-auto">
            {roadmapActs.map((act) => {
              const accentText =
                act.accent === "green"
                  ? "text-green-primary"
                  : act.accent === "cyan"
                  ? "text-cyan-accent"
                  : "text-pink-accent";
              const accentBg =
                act.accent === "green"
                  ? "bg-green-primary/10 border-green-primary/30"
                  : act.accent === "cyan"
                  ? "bg-cyan-accent/10 border-cyan-accent/30"
                  : "bg-pink-accent/10 border-pink-accent/30";
              const bulletDot =
                act.accent === "green"
                  ? "bg-green-primary"
                  : act.accent === "cyan"
                  ? "bg-cyan-accent"
                  : "bg-pink-accent";
              return (
                <article
                  key={act.number}
                  className="rounded-2xl border border-card-border bg-card-bg/40 p-5 sm:p-7"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-start">
                    <div className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${accentBg} self-start`}>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${accentText}`}>
                        {act.number}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${accentText}`}>
                        {act.period}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap mb-3">
                        <h3 className="text-lg sm:text-xl font-black text-text-primary">
                          {act.title[lang]}
                        </h3>
                        <span className={`text-xs sm:text-sm font-bold ${accentText}`}>
                          {act.funding[lang]}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {act.bullets[lang].map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-text-secondary text-xs sm:text-sm leading-relaxed">
                            <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${bulletDot} mt-1.5`} aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Funding — pre-seed + KPI 2026-2030 */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 sm:mb-10 max-w-5xl mx-auto">
            <span className="h-px flex-1 bg-card-border" aria-hidden />
            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">
              {t.fundingLabel}
            </p>
            <span className="h-px flex-1 bg-card-border" aria-hidden />
          </div>

          {/* Funding hero block */}
          <div className="card-glow p-6 sm:p-8 max-w-3xl mx-auto mb-10">
            <div className="relative z-10 flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-primary/15 border border-green-primary/30 flex items-center justify-center">
                <Banknote size={22} className="text-green-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-text-primary leading-tight mb-2">
                  {t.fundingTitle}
                </h2>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  {t.fundingIntro}
                </p>
              </div>
            </div>
          </div>

          {/* KPI 2026-2030 table */}
          <div className="max-w-3xl mx-auto text-center md:text-left mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-text-primary leading-tight mb-2">
              {t.fundingKpiTitle}
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
              {t.fundingKpiIntro}
            </p>
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl border border-card-border bg-card-bg/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-card-border bg-bg-darker/40">
                    <th className="text-left text-text-muted text-[10px] uppercase tracking-widest font-bold px-4 py-3">
                      {t.fundingKpiHeaders.year}
                    </th>
                    <th className="text-right text-text-muted text-[10px] uppercase tracking-widest font-bold px-4 py-3">
                      {t.fundingKpiHeaders.users}
                    </th>
                    <th className="text-right text-text-muted text-[10px] uppercase tracking-widest font-bold px-4 py-3">
                      {t.fundingKpiHeaders.revenue}
                    </th>
                    <th className="text-right text-text-muted text-[10px] uppercase tracking-widest font-bold px-4 py-3">
                      {t.fundingKpiHeaders.ebitda}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kpiRows.map((row, i) => (
                    <tr
                      key={row.year}
                      className={i < kpiRows.length - 1 ? "border-b border-card-border/40" : ""}
                    >
                      <td className="px-4 py-3 font-mono font-bold text-text-primary text-sm">
                        {row.year}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-text-secondary text-sm">
                        {row.users}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-text-primary text-sm font-semibold">
                        {row.revenue}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-green-primary text-sm font-bold">
                        {row.ebitda}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
