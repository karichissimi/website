import Image from "next/image";
import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import WaitlistForm from "./WaitlistForm";

// Sotto questa soglia preferiamo "I primi ad averla in mano" al numero
// (40 iscritti in vetrina suonano peggio che dire "siamo all'inizio").
const COUNT_THRESHOLD = 100;

const getWaitlistCount = unstable_cache(
  async (): Promise<number | null> => {
    try {
      const { count, error } = await supabaseAdmin
        .from("leads_karica")
        .select("*", { count: "exact", head: true })
        .eq("source", "waitlist");
      if (error) return null;
      return count ?? 0;
    } catch {
      return null;
    }
  },
  ["waitlist-count"],
  { revalidate: 300, tags: ["waitlist"] }
);

export default async function HomeCTA() {
  const count = await getWaitlistCount();
  const showCount = count !== null && count >= COUNT_THRESHOLD;

  return (
    <section aria-label="Entra nella waitlist Karica" className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden">
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
              ? `${(count as number).toLocaleString("it-IT")} in waitlist`
              : "Waitlist aperta"}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-4">
          L&apos;app sta{" "}
          <span className="text-gradient">arrivando</span>.
        </h2>
        <p className="text-text-secondary text-base sm:text-lg mb-8 max-w-md mx-auto">
          {showCount
            ? "Lascia la mail: sei tra i prossimi a ricevere l'invito."
            : "I primi ad averla in mano. Lascia la mail e ti scriviamo appena puoi provarla."}
        </p>

        <div className="card-glow p-6 sm:p-8 text-left">
          <div className="relative z-10">
            <WaitlistForm />
          </div>
        </div>

        <p className="text-text-disabled text-xs mt-5">
          Niente spam. Solo il giorno in cui l&apos;app è pronta per te.
        </p>
      </div>
    </section>
  );
}
