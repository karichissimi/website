// 15 December 2026, 11:00 in Italy (CET, UTC+1).
export const LAUNCH_AT = Date.UTC(2026, 11, 15, 10, 0, 0);

// Shared by the page (visible text) and by the FAQ structured data, so the
// two can never drift apart. Figures come from the Storia page and the
// investor deck: do not add numbers that are not already published there.
export const FAQ = [
  {
    q: { it: "Che cos'è Karica?", en: "What is Karica?" },
    a: {
      it: "Karica è il tuo consulente energetico digitale: incentivi, finanziamento ed esecuzione dei lavori in un unico percorso digitale, anche senza anticipo.",
      en: "Karica is your digital energy advisor: incentives, financing and the works themselves in a single digital journey, even with no upfront payment.",
    },
  },
  {
    q: {
      it: "Perché la transizione energetica riguarda casa mia?",
      en: "Why does the energy transition concern my home?",
    },
    a: {
      it: "Perché il 45,3% delle abitazioni italiane è in classe energetica F o G, e la direttiva europea EPBD «Case Green» chiede di ridurre del 16% l'energia primaria degli edifici entro il 2030.",
      en: "Because 45.3% of Italian homes are in energy class F or G, and the European EPBD \"Green Homes\" directive requires a 16% cut in the primary energy used by buildings by 2030.",
    },
  },
  {
    q: {
      it: "Che cos'è una Comunità Energetica Rinnovabile (CER)?",
      en: "What is a Renewable Energy Community (REC)?",
    },
    a: {
      it: "È un gruppo di persone che condivide energia rinnovabile prodotta localmente. Karica trova la CER più vicina a te, gestisce l'iscrizione e segue la tua partecipazione.",
      en: "It is a group of people sharing locally produced renewable energy. Karica finds the community closest to you, handles the sign-up and follows your participation.",
    },
  },
  {
    q: {
      it: "Cosa succede il 15 dicembre alle 11:00?",
      en: "What happens on 15 December at 11:00?",
    },
    a: {
      it: "Lo diciamo alle 11:00 in punto. Lascia la tua email qui sopra e te lo scriviamo noi.",
      en: "We'll say it at 11:00 sharp. Leave your email above and we'll write to you.",
    },
  },
] as const;
