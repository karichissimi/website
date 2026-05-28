import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Il team di Karica: founder e persone che costruiscono la piattaforma per la transizione energetica.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

type Person = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  initials: string;
};

const founders: Person[] = [
  {
    name: "Alessandro Zanin",
    role: "CEO & Co-Founder",
    bio: "Oltre quindici anni nella gestione end-to-end di progetti software, nell'automazione di processi complessi e nell'integrazione di sistemi gestionali in contesti regolamentati. In Karica guida la product strategy, l'architettura della piattaforma e la supervisione dello sviluppo.",
    photo: "/team/alessandro-zanin.jpg",
    initials: "AZ",
  },
  {
    name: "Elia Vassallo",
    role: "Commercial & Co-Founder",
    bio: "Executive MBA SDA Bocconi e oltre dieci anni di esperienza commerciale internazionale. In Karica guida lo sviluppo commerciale, le partnership di filiera e il go-to-market sul territorio.",
    photo: "/team/elia-vassallo.jpg",
    initials: "EV",
  },
  {
    name: "Federico Romis",
    role: "Operations & Co-Founder",
    bio: "Ingegnere, responsabile scientifico del progetto. Coordina l'esecuzione operativa, l'industrializzazione dei processi tecnici e l'orchestrazione della filiera tra Karica e i partner della rete EnerBee.",
    photo: "/team/federico-romis.jpg",
    initials: "FR",
  },
  {
    name: "Alfredo Perazzo",
    role: "Energy, Operations & Co-Founder",
    bio: "EGE certificato RINA, CEO di EVM S.r.l. e CTO di GTI S.r.l. Porta in Karica vent'anni di esperienza nell'efficientamento energetico e nella gestione di impianti, garantendo la qualità tecnica delle soluzioni proposte agli utenti.",
    photo: "/team/alfredo-perazzo.jpg",
    initials: "AP",
  },
];

const team: Person[] = [
  {
    name: "Gabriele Gaino",
    role: "Business Analyst & ML Engineer",
    bio: "Perito informatico con oltre quindici anni di esperienza tra gestione dati, controllo di processi e sviluppo software. Expertise principale in machine learning, data science e sviluppo di modelli in Python. In Karica è responsabile della pipeline di aggregazione federata, del training e benchmarking dei modelli e dell'integrazione SHAP per l'interpretabilità.",
    photo: "/team/gabriele-gaino.jpg",
    initials: "GG",
  },
  {
    name: "Massimiliano Foss",
    role: "Senior Developer",
    bio: "Sviluppatore senior con expertise in mobile application development e infrastruttura backend. In Karica è responsabile della client-side feature extraction e dell'integrazione dei moduli di calcolo sulla piattaforma multi-canale.",
    initials: "MF",
  },
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

const footerLinks = [{ label: "Home", href: "/" }];

export default function WhoWeArePage() {
  return (
    <>
      <Navbar inlineCta={{ label: "Contattaci →", href: "/contatti" }} />

      <main id="main" className="relative min-h-[100svh] overflow-hidden pt-24 sm:pt-28 pb-20">
        {/* Ambient background */}
        <div className="glow-orb absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-green-primary/[0.05] blur-[120px]" />
        <div className="glow-orb-slow absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.04] blur-[100px]" />
        <div className="glow-orb absolute bottom-[10%] left-[30%] w-[450px] h-[450px] rounded-full bg-pink-accent/[0.03] blur-[110px]" />
        <div className="absolute inset-0 dot-grid opacity-[0.10]" />

        {/* Hero */}
        <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center mb-16 sm:mb-24">
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
            Chi siamo
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight mb-5">
            Le persone dietro{" "}
            <span className="text-gradient">Karica</span>.
          </h1>

          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Un gruppo di founder con vent&apos;anni di esperienza in software, business e
            transizione energetica — più un team che costruisce ogni giorno la
            piattaforma che vuoi avere sul telefono.
          </p>
        </section>

        {/* Founders */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-28">
          <div className="flex items-center gap-3 mb-8 sm:mb-12 max-w-5xl mx-auto">
            <span className="h-px flex-1 bg-card-border" aria-hidden />
            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">
              Founders
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
                      {person.role}
                    </p>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                      {person.bio}
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
              Team
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
                      {person.role}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {person.bio}
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
                Vuoi conoscerci?
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-text-primary leading-tight mb-5">
                Parliamoci con{" "}
                <span className="text-gradient">calma</span>.
              </h2>
              <Link
                href="/contatti"
                className="btn-press inline-flex items-center gap-2 bg-green-primary text-bg-dark font-bold text-sm px-5 py-3 rounded-lg uppercase tracking-wider hover:bg-green-dark transition-colors"
              >
                Contattaci
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
