import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa sull'utilizzo dei cookie ai sensi della normativa europea e italiana vigente.",
};

export default function CookiePolicyPage() {
  return (
    <>
      {/* Minimal top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-darker/80 backdrop-blur-md border-b border-card-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/graphics/Karica_Logo_Felice.png"
              alt="Karica"
              width={28}
              height={28}
              className="h-7 w-auto"
            />
            <Image
              src="/graphics/Karica_Scritta_WHITE.png"
              alt="Karica"
              width={100}
              height={28}
              className="h-5 w-auto"
            />
          </Link>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <article className="max-w-3xl mx-auto prose-legal">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
            Cookie Policy
          </h1>
          <p className="text-text-muted text-sm mb-10">
            Informativa sull&apos;utilizzo dei cookie ai sensi del Regolamento UE 2016/679
            (GDPR) e del Provvedimento del Garante Privacy n. 229/2014
          </p>

          <section className="legal-section">
            <h2>1. Cosa sono i Cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti web visitati dall&apos;utente inviano
              al suo terminale (computer, tablet, smartphone), dove vengono memorizzati per
              poi essere ritrasmessi agli stessi siti alla visita successiva. I cookie
              permettono al sito di funzionare correttamente e di raccogliere informazioni
              sulle preferenze degli utenti.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Tipologie di Cookie Utilizzati</h2>

            <h3>a) Cookie tecnici (necessari)</h3>
            <p>
              Sono cookie indispensabili per il corretto funzionamento del sito. Consentono
              la navigazione e l&apos;utilizzo delle funzionalità essenziali (ad esempio, la
              gestione della sessione, il mantenimento delle preferenze di navigazione).
            </p>
            <p>
              <strong>Base giuridica:</strong> non richiedono il consenso dell&apos;utente, in
              quanto necessari all&apos;erogazione del servizio espressamente richiesto
              (art. 122, comma 1, D.Lgs. 196/2003 e s.m.i.).
            </p>
            <table className="w-full text-sm border-collapse mt-4 mb-4">
              <thead>
                <tr className="border-b border-card-border text-left">
                  <th className="py-2 pr-4 text-text-primary font-semibold">Nome</th>
                  <th className="py-2 pr-4 text-text-primary font-semibold">Finalità</th>
                  <th className="py-2 text-text-primary font-semibold">Durata</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4 font-mono text-xs">cookie_consent</td>
                  <td className="py-3 pr-4">Memorizza le preferenze sui cookie espresse dall&apos;utente</td>
                  <td className="py-3">12 mesi</td>
                </tr>
              </tbody>
            </table>

            <h3>b) Cookie analitici</h3>
            <p>
              Il sito potrebbe utilizzare servizi di analisi del traffico web (ad esempio
              Vercel Analytics o strumenti analoghi) per raccogliere informazioni aggregate
              e anonime sull&apos;utilizzo del sito (numero di visitatori, pagine visitate,
              tempo di permanenza, provenienza geografica). Questi dati sono utilizzati
              esclusivamente per finalità statistiche e per migliorare il funzionamento del sito.
            </p>
            <p>
              Quando configurati in modo da ridurre il potere identificativo (ad esempio,
              con mascheramento dell&apos;indirizzo IP e senza incrociare i dati con altre
              informazioni), i cookie analitici sono assimilabili ai cookie tecnici e non
              richiedono consenso preventivo, ai sensi del Provvedimento del Garante
              Privacy del 10 giugno 2021.
            </p>
            <p>
              In caso contrario, verranno installati solo previo consenso dell&apos;utente.
            </p>
            <table className="w-full text-sm border-collapse mt-4 mb-4">
              <thead>
                <tr className="border-b border-card-border text-left">
                  <th className="py-2 pr-4 text-text-primary font-semibold">Servizio</th>
                  <th className="py-2 pr-4 text-text-primary font-semibold">Fornitore</th>
                  <th className="py-2 pr-4 text-text-primary font-semibold">Finalità</th>
                  <th className="py-2 text-text-primary font-semibold">Privacy policy</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">Vercel Analytics</td>
                  <td className="py-3 pr-4">Vercel Inc.</td>
                  <td className="py-3 pr-4">Statistiche di traffico aggregate</td>
                  <td className="py-3">
                    <a
                      href="https://vercel.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-accent hover:underline"
                    >
                      Link
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <h3>c) Cookie di terze parti</h3>
            <p>
              Il sito, allo stato attuale, non utilizza cookie di profilazione propri né
              cookie di terze parti a fini pubblicitari. Qualora in futuro venissero
              introdotti, la presente policy sarà aggiornata e verrà richiesto il consenso
              preventivo dell&apos;utente.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Come Gestire i Cookie</h2>
            <p>
              L&apos;utente può gestire le proprie preferenze sui cookie in qualsiasi momento
              attraverso le impostazioni del proprio browser. Di seguito i link alle guide
              dei principali browser:
            </p>
            <ul>
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-cyan-accent hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-cyan-accent hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-cyan-accent hover:underline">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-cyan-accent hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p>
              Si ricorda che la disabilitazione totale o parziale dei cookie tecnici potrebbe
              compromettere la fruizione delle funzionalità del sito.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Titolare del Trattamento</h2>
            <address className="not-italic text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Karica S.r.l.</strong> — Startup Innovativa<br />
              Sede legale: Via Vallarsa 11, 20141 Milano (MI)<br />
              P.IVA / C.F.: 14470800963<br />
              E-mail: <a href="mailto:privacy@karica.it" className="text-cyan-accent hover:underline">privacy@karica.it</a>
            </address>
          </section>

          <section className="legal-section">
            <h2>5. Diritti dell&apos;Interessato</h2>
            <p>
              Per l&apos;esercizio dei diritti previsti dagli artt. 15-22 del GDPR (accesso,
              rettifica, cancellazione, limitazione, portabilità, opposizione) si rimanda
              alla{" "}
              <Link href="/privacy-policy" className="text-cyan-accent hover:underline">
                Privacy Policy
              </Link>{" "}
              del sito.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Modifiche alla Cookie Policy</h2>
            <p>
              Il Titolare si riserva il diritto di apportare modifiche alla presente Cookie
              Policy in qualsiasi momento. L&apos;utente è invitato a consultare periodicamente
              questa pagina per verificare eventuali aggiornamenti.
            </p>
            <p className="text-text-muted text-sm mt-6">
              Ultimo aggiornamento: aprile 2026
            </p>
          </section>
        </article>
      </main>

      {/* Minimal footer */}
      <footer className="bg-bg-darker border-t border-card-border py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-6 text-xs text-text-muted">
            <Link href="/privacy-policy" className="hover:text-text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/note-legali" className="hover:text-text-secondary transition-colors">Note Legali</Link>
          </div>
          <p className="text-text-disabled text-xs">
            &copy; {new Date().getFullYear()} Karica S.r.l. — Via Vallarsa 11, Milano — P.IVA 14470800963
          </p>
        </div>
      </footer>
    </>
  );
}
