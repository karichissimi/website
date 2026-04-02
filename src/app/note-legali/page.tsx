import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Note Legali",
  description:
    "Note legali, termini e condizioni d'uso e disclaimer del sito web di Karica S.r.l.",
};

export default function NoteLegaliPage() {
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
            Note Legali
          </h1>
          <p className="text-text-muted text-sm mb-10">
            Termini e condizioni d&apos;uso del sito web — Avvisi legali e disclaimer
          </p>

          <section className="legal-section">
            <h2>1. Informazioni sulla Società</h2>
            <address className="not-italic text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Karica S.r.l.</strong> — Startup Innovativa<br />
              Sede legale: Via Vallarsa 11, 20141 Milano (MI)<br />
              P.IVA / C.F.: 14470800963<br />
              Iscritta al Registro delle Imprese di Milano<br />
              Iscritta alla sezione speciale delle Startup Innovative<br />
              E-mail: <a href="mailto:info@karica.it" className="text-cyan-accent hover:underline">info@karica.it</a><br />
              PEC: <a href="mailto:karica@pec.it" className="text-cyan-accent hover:underline">karica@pec.it</a>
            </address>
          </section>

          <section className="legal-section">
            <h2>2. Condizioni Generali d&apos;Uso</h2>
            <p>
              L&apos;accesso e l&apos;utilizzo del presente sito web sono regolati dalle seguenti
              condizioni generali. Navigando il sito, l&apos;utente accetta integralmente tali
              condizioni. In caso di disaccordo, l&apos;utente è invitato a non proseguire la
              navigazione.
            </p>
            <p>
              Karica S.r.l. si riserva il diritto di modificare in qualsiasi momento i
              contenuti del sito e le presenti condizioni d&apos;uso, senza obbligo di preavviso.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti presenti sul sito — inclusi, a titolo esemplificativo e non
              esaustivo, testi, immagini, grafiche, loghi, marchi, layout, software e
              qualsiasi altro materiale — sono di proprietà di Karica S.r.l. o dei
              rispettivi aventi diritto e sono protetti dalle leggi italiane e
              internazionali in materia di proprietà intellettuale e industriale.
            </p>
            <p>
              È vietata qualsiasi forma di riproduzione, distribuzione, pubblicazione,
              trasmissione, modifica o utilizzo, totale o parziale, dei contenuti del sito
              senza la previa autorizzazione scritta di Karica S.r.l.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Disclaimer — Proiezioni Finanziarie e Investimento</h2>
            <div className="bg-card-bg border border-card-border rounded-xl p-5 my-4">
              <p className="text-text-primary font-semibold mb-3">
                Avviso importante per potenziali investitori
              </p>
              <ul className="space-y-3">
                <li>
                  Le <strong>proiezioni finanziarie</strong>, i dati previsionali e le stime
                  di rendimento presentati sul sito e nei materiali informativi (pitch deck,
                  business plan) rappresentano <strong>stime basate su assunzioni ragionevoli
                  ma non garantite</strong>. I risultati effettivi potrebbero differire in
                  modo significativo dalle previsioni.
                </li>
                <li>
                  I <strong>rendimenti passati o previsti non costituiscono garanzia</strong>{" "}
                  di risultati futuri. Ogni investimento comporta un grado di rischio,
                  inclusa la possibile perdita totale del capitale investito.
                </li>
                <li>
                  Le informazioni presenti sul sito hanno <strong>finalità esclusivamente
                  informativa</strong> e non costituiscono un&apos;offerta al pubblico, una
                  sollecitazione all&apos;investimento, né una consulenza finanziaria,
                  legale o fiscale.
                </li>
                <li>
                  Si invitano i potenziali investitori a <strong>consultare i propri
                  consulenti finanziari, legali e fiscali</strong> prima di assumere
                  qualsiasi decisione di investimento, al fine di valutare l&apos;adeguatezza
                  dell&apos;operazione rispetto alla propria situazione patrimoniale e al
                  proprio profilo di rischio.
                </li>
                <li>
                  Karica S.r.l. non rilascia alcuna dichiarazione o garanzia, espressa o
                  implicita, circa la <strong>completezza, accuratezza o aggiornamento</strong>{" "}
                  delle informazioni contenute nel sito.
                </li>
              </ul>
            </div>
          </section>

          <section className="legal-section">
            <h2>5. Limitazione di Responsabilità</h2>
            <p>
              Karica S.r.l. compie ogni ragionevole sforzo per assicurare che le
              informazioni pubblicate sul sito siano accurate e aggiornate. Tuttavia, il
              Titolare non garantisce la completezza, l&apos;esattezza e l&apos;aggiornamento
              dei contenuti e declina ogni responsabilità per eventuali errori, omissioni
              o imprecisioni.
            </p>
            <p>
              Karica S.r.l. non sarà responsabile per danni diretti, indiretti,
              incidentali, consequenziali o punitivi derivanti dall&apos;accesso, dall&apos;utilizzo
              o dall&apos;impossibilità di utilizzare il sito web o i suoi contenuti.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Link a Siti Esterni</h2>
            <p>
              Il sito potrebbe contenere link a siti web di terze parti. Tali link sono
              forniti esclusivamente a scopo informativo e di comodità dell&apos;utente.
              Karica S.r.l. non esercita alcun controllo sui contenuti dei siti esterni e
              non si assume alcuna responsabilità in relazione ad essi, alla loro
              disponibilità, ai contenuti, alla privacy policy o alle pratiche da essi
              adottate.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Normativa di Riferimento</h2>
            <p>
              Il presente sito e le comunicazioni relative all&apos;opportunità di investimento
              sono realizzati nel rispetto della normativa italiana e europea vigente, con
              particolare riferimento a:
            </p>
            <ul>
              <li>Regolamento UE 2016/679 (GDPR) — protezione dei dati personali;</li>
              <li>D.Lgs. 196/2003 e s.m.i. (Codice Privacy italiano);</li>
              <li>D.Lgs. 70/2003 — commercio elettronico;</li>
              <li>D.Lgs. 24/2014 — normativa sulle startup innovative;</li>
              <li>Testo Unico della Finanza (D.Lgs. 58/1998) — per quanto applicabile.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Legge Applicabile e Foro Competente</h2>
            <p>
              Le presenti note legali sono regolate dalla legge italiana. Per qualsiasi
              controversia relativa all&apos;interpretazione, esecuzione o risoluzione delle
              presenti condizioni sarà competente in via esclusiva il Foro di Milano.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa alle presenti note legali, è possibile
              contattare Karica S.r.l. ai seguenti recapiti:
            </p>
            <ul>
              <li>E-mail: <a href="mailto:info@karica.it" className="text-cyan-accent hover:underline">info@karica.it</a></li>
              <li>PEC: <a href="mailto:karica@pec.it" className="text-cyan-accent hover:underline">karica@pec.it</a></li>
            </ul>
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
            <Link href="/cookie-policy" className="hover:text-text-secondary transition-colors">Cookie Policy</Link>
          </div>
          <p className="text-text-disabled text-xs">
            &copy; {new Date().getFullYear()} Karica S.r.l. — Via Vallarsa 11, Milano — P.IVA 14470800963
          </p>
        </div>
      </footer>
    </>
  );
}
