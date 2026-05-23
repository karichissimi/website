"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { haptic } from "@/lib/haptics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[\d\s+\-().]{6,}$/;

export default function DetrazioneForm() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [touched, setTouched] = useState({ email: false, phone: false });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // UTM capture: persists once landed, so even after a page rerender the
  // attribution stays attached to the lead.
  const [utm, setUtm] = useState<{
    source: string;
    medium: string;
    campaign: string;
  } | null>(null);

  useEffect(() => {
    setUtm({
      source: searchParams.get("utm_source") || "direct",
      medium: searchParams.get("utm_medium") || "",
      campaign: searchParams.get("utm_campaign") || "",
    });
  }, [searchParams]);

  function validateEmail(v: string): string {
    const t = v.trim();
    if (!t) return "Lasciaci una mail per ricontattarti.";
    if (!EMAIL_RE.test(t)) return "Formato mail non valido.";
    return "";
  }

  function validatePhone(v: string): string {
    const t = v.trim();
    if (!t) return ""; // optional
    if (!PHONE_RE.test(t)) return "Numero non valido.";
    return "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    haptic("medium");

    const eErr = validateEmail(email);
    const pErr = validatePhone(phone);
    setEmailError(eErr);
    setPhoneError(pErr);
    setTouched({ email: true, phone: true });

    if (eErr || pErr) {
      haptic("heavy");
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "detrazione",
          utm_source: utm?.source || "direct",
          utm_medium: utm?.medium || "",
          utm_campaign: utm?.campaign || "",
        }),
      });

      if (!res.ok) {
        if (res.status >= 400 && res.status < 500) throw new Error("validation");
        throw new Error("server");
      }
      setSubmitted(true);
      haptic("success");
    } catch (err) {
      haptic("heavy");
      const kind = err instanceof Error ? err.message : "";
      if (kind === "validation") {
        setSubmitError("I dati non sono passati. Controlla e riprova.");
      } else if (kind === "server") {
        setSubmitError("Il server fa i capricci. Riprova o scrivici a info@karica.it.");
      } else {
        setSubmitError("Connessione persa. Riprova.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="cta"
      aria-label="Lascia i tuoi contatti"
      className="relative py-24 sm:py-32 bg-bg-darker overflow-hidden scroll-mt-20"
    >
      <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-primary/[0.05] blur-[120px]" />

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-text-primary mb-3">
            Sono <span className="text-gradient">interessato</span>.
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Lasciami i contatti, ti chiamiamo noi per spiegare i passaggi.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card-glow p-6 sm:p-8"
        >
          <div className="relative z-10">
            {submitted ? (
              <div className="text-center py-6">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-green-primary/20 blur-xl rounded-full" />
                  <CheckCircle className="relative text-green-primary" size={56} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Ricevuto.
                </h3>
                <p className="text-text-secondary text-sm">
                  Ti contattiamo entro 48 ore. Se hai fretta, scrivi a{" "}
                  <a
                    href="mailto:info@karica.it"
                    className="text-green-primary font-semibold hover:underline"
                  >
                    info@karica.it
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="ff-name" className="block text-sm font-semibold text-text-secondary mb-1.5">
                    Nome e cognome
                  </label>
                  <input
                    id="ff-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mario Rossi"
                    className="w-full bg-bg-darker border border-card-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="ff-email" className="block text-sm font-semibold text-text-secondary mb-1.5">
                    Email *
                  </label>
                  <input
                    id="ff-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched.email) setEmailError(validateEmail(e.target.value));
                    }}
                    onBlur={() => {
                      setTouched((t) => ({ ...t, email: true }));
                      setEmailError(validateEmail(email));
                    }}
                    placeholder="mario@email.com"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "ff-email-error" : undefined}
                    className={`w-full bg-bg-darker border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none transition-all ${
                      emailError
                        ? "border-pink-accent/60 focus:border-pink-accent focus:shadow-[0_0_12px_rgba(255,77,109,0.15)]"
                        : "border-card-border focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)]"
                    }`}
                  />
                  {emailError && (
                    <p
                      id="ff-email-error"
                      className="mt-1.5 flex items-center gap-1.5 text-pink-accent text-xs"
                    >
                      <AlertCircle size={12} className="flex-shrink-0" />
                      {emailError}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="ff-phone" className="block text-sm font-semibold text-text-secondary mb-1.5">
                    Telefono <span className="text-text-muted font-normal">(consigliato)</span>
                  </label>
                  <input
                    id="ff-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (touched.phone) setPhoneError(validatePhone(e.target.value));
                    }}
                    onBlur={() => {
                      setTouched((t) => ({ ...t, phone: true }));
                      setPhoneError(validatePhone(phone));
                    }}
                    placeholder="+39 333 1234567"
                    aria-invalid={!!phoneError}
                    className={`w-full bg-bg-darker border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none transition-all ${
                      phoneError
                        ? "border-pink-accent/60 focus:border-pink-accent focus:shadow-[0_0_12px_rgba(255,77,109,0.15)]"
                        : "border-card-border focus:border-green-primary/60 focus:shadow-[0_0_12px_rgba(57,255,20,0.1)]"
                    }`}
                  />
                  {phoneError && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-pink-accent text-xs">
                      <AlertCircle size={12} className="flex-shrink-0" />
                      {phoneError}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="flex items-start gap-2 rounded-lg bg-pink-accent/5 border border-pink-accent/20 px-3 py-2.5">
                    <AlertCircle size={14} className="flex-shrink-0 text-pink-accent mt-0.5" />
                    <p className="text-pink-accent text-xs leading-relaxed">{submitError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-press w-full flex items-center justify-center gap-2 bg-green-primary text-bg-dark font-bold py-4 rounded-lg uppercase tracking-wider text-sm hover:bg-green-dark transition-colors hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  Lasciami i contatti
                </button>

                <p className="text-text-disabled text-[11px] text-center leading-relaxed">
                  I tuoi dati restano tra te e Karica. Nessuna terza parte,
                  nessuna mailing list, niente spam.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
