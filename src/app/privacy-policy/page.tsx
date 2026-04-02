import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR).",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-text-muted text-sm mb-10">
            Informativa sul trattamento dei dati personali ai sensi dell&apos;art. 13
            del Regolamento UE 2016/679 (GDPR)
          </p>

          <section className="legal-section">
            <h2>1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali è:
            </p>
            <address className="not-italic text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Karica S.r.l.</strong> — Startup Innovativa<br />
              Sede legale: Via Vallarsa 11, 20141 Milano (MI)<br />
              P.IVA / C.F.: 14470800963<br />
              E-mail: <a href="mailto:privacy@karica.it" className="text-cyan-accent hover:underline">privacy@karica.it</a><br />
              PEC: <a href="mailto:karica@pec.it" className="text-cyan-accent hover:underline">karica@pec.it</a>
            </address>
          </section>

          <section className="legal-section">
            <h2>2. Dati Personali Raccolti</h2>
            <p>
              Attraverso il presente sito web, il Titolare raccoglie le seguenti categorie di dati personali:
            </p>
            <h3>a) Dati forniti volontariamente dall&apos;utente</h3>
            <ul>
              <li><strong>Nome e cognome</strong></li>
              <li><strong>Indirizzo e-mail</strong></li>
            </ul>
            <p>
              Questi dati vengono raccolti tramite la compilazione del modulo di contatto
              presente sul sito (richiesta del pitch deck o prenotazione di una call).
            </p>
            <h3>b) Dati di navigazione</h3>
            <p>
              I sistemi informatici e le procedure software preposte al funzionamento di
              questo sito acquisiscono, nel corso del loro normale esercizio, alcuni dati
              la cui trasmissione è implicita nell&apos;uso dei protocolli di comunicazione
              Internet (ad es. indirizzi IP, tipo di browser, sistema operativo, pagine
              visitate, orari di accesso).
            </p>
            <h3>c) Cookie</h3>
            <p>
              Il sito utilizza cookie tecnici e, previo consenso, cookie analitici. Per
              maggiori informazioni si rimanda alla{" "}
              <Link href="/cookie-policy" className="text-cyan-accent hover:underline">
                Cookie Policy
              </Link>.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Finalità e Base Giuridica del Trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalità:</p>
            <table className="w-full text-sm border-collapse mt-4 mb-4">
              <thead>
                <tr className="border-b border-card-border text-left">
                  <th className="py-2 pr-4 text-text-primary font-semibold">Finalità</th>
                  <th className="py-2 text-text-primary font-semibold">Base giuridica</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">Gestione della richiesta di contatto e invio del pitch deck</td>
                  <td className="py-3">Esecuzione di misure precontrattuali su richiesta dell&apos;interessato (art. 6.1.b GDPR)</td>
                </tr>
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">Invio di comunicazioni informative relative all&apos;opportunità di investimento</td>
                  <td className="py-3">Consenso dell&apos;interessato (art. 6.1.a GDPR)</td>
                </tr>
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">Adempimento di obblighi di legge (fiscali, contabili)</td>
                  <td className="py-3">Obbligo legale (art. 6.1.c GDPR)</td>
                </tr>
                <tr className="border-b border-card-border/50">
                  <td className="py-3 pr-4">Analisi statistica aggregata del traffico web</td>
                  <td className="py-3">Legittimo interesse del Titolare (art. 6.1.f GDPR)</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="legal-section">
            <h2>4. Modalità del Trattamento</h2>
            <p>
              Il trattamento dei dati personali è effettuato mediante strumenti informatici
              e telematici, con logiche strettamente correlate alle finalità sopra indicate
              e, comunque, in modo da garantire la sicurezza e la riservatezza dei dati
              stessi, nel rispetto delle misure organizzative, fisiche e logiche previste
              dalle disposizioni vigenti.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Comunicazione e Diffusione dei Dati</h2>
            <p>
              I dati personali potranno essere comunicati a:
            </p>
            <ul>
              <li>
                Soggetti che possono accedere ai dati in forza di disposizioni di legge o
                regolamento, nei limiti previsti da tali norme;
              </li>
              <li>
                Soggetti che svolgono attività strumentali per conto del Titolare (ad es.
                fornitori di servizi di hosting, piattaforme di invio e-mail, servizi di
                analytics), nominati Responsabili del trattamento ai sensi dell&apos;art. 28 GDPR;
              </li>
              <li>
                Consulenti legali e fiscali del Titolare, per gli adempimenti connessi.
              </li>
            </ul>
            <p>
              I dati non saranno oggetto di diffusione, né saranno trasferiti a Paesi terzi
              al di fuori dello Spazio Economico Europeo, salvo verso fornitori che
              garantiscano un livello di protezione adeguato ai sensi del Capo V del GDPR
              (ad es. decisioni di adeguatezza, clausole contrattuali standard).
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Periodo di Conservazione</h2>
            <ul>
              <li>
                <strong>Dati di contatto (nome, e-mail):</strong> conservati per un periodo
                massimo di <strong>24 mesi</strong> dalla raccolta, salvo che il rapporto
                con l&apos;interessato si evolva in un rapporto contrattuale, nel qual caso si
                applicheranno i termini di conservazione previsti dalla legge.
              </li>
              <li>
                <strong>Dati di navigazione:</strong> conservati per il tempo strettamente
                necessario alla gestione tecnica del sito e, in forma aggregata e anonima,
                per finalità statistiche.
              </li>
              <li>
                <strong>Cookie:</strong> si rimanda alla{" "}
                <Link href="/cookie-policy" className="text-cyan-accent hover:underline">
                  Cookie Policy
                </Link>{" "}
                per le durate specifiche.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Diritti dell&apos;Interessato</h2>
            <p>
              Ai sensi degli artt. 15-22 del GDPR, l&apos;interessato ha il diritto di:
            </p>
            <ul>
              <li><strong>Accesso</strong> — ottenere conferma dell&apos;esistenza di un trattamento e accedere ai propri dati (art. 15);</li>
              <li><strong>Rettifica</strong> — ottenere la correzione di dati inesatti o l&apos;integrazione di dati incompleti (art. 16);</li>
              <li><strong>Cancellazione</strong> — ottenere la cancellazione dei propri dati, ove sussistano i presupposti di legge (art. 17);</li>
              <li><strong>Limitazione</strong> — ottenere la limitazione del trattamento (art. 18);</li>
              <li><strong>Portabilità</strong> — ricevere i propri dati in formato strutturato, di uso comune e leggibile da dispositivo automatico (art. 20);</li>
              <li><strong>Opposizione</strong> — opporsi al trattamento per motivi legittimi (art. 21);</li>
              <li><strong>Revoca del consenso</strong> — revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prestato prima della revoca (art. 7.3).</li>
            </ul>
            <p>
              Le richieste possono essere inviate a:{" "}
              <a href="mailto:privacy@karica.it" className="text-cyan-accent hover:underline">
                privacy@karica.it
              </a>
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Reclamo all&apos;Autorità di Controllo</h2>
            <p>
              L&apos;interessato ha il diritto di proporre reclamo al{" "}
              <strong>Garante per la protezione dei dati personali</strong>,
              Piazza Venezia 11, 00187 Roma,{" "}
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-accent hover:underline"
              >
                www.garanteprivacy.it
              </a>, qualora ritenga che il trattamento dei propri dati personali
              avvenga in violazione del GDPR.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Conferimento dei Dati e Conseguenze del Rifiuto</h2>
            <p>
              Il conferimento dei dati personali tramite il modulo di contatto è facoltativo.
              Tuttavia, il mancato conferimento dei dati contrassegnati come obbligatori
              (nome e indirizzo e-mail) comporterà l&apos;impossibilità per il Titolare di dare
              seguito alla richiesta dell&apos;utente.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Modifiche alla presente Informativa</h2>
            <p>
              Il Titolare si riserva il diritto di apportare modifiche alla presente
              informativa in qualsiasi momento. Le eventuali modifiche saranno pubblicate
              su questa pagina. Si invita pertanto l&apos;utente a consultare periodicamente
              la presente pagina.
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
            <Link href="/cookie-policy" className="hover:text-text-secondary transition-colors">Cookie Policy</Link>
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
