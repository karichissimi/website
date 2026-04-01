# KARICA — Contesto di Progetto per Claude Code

> **Questo file è la memoria persistente del progetto Karica.**
> Leggilo integralmente prima di ogni task di sviluppo.
> Non chiedere informazioni che sono già qui.

---

## CHI È KARICA

Karica è una **Startup Innovativa** — piattaforma digitale "one-stop-shop" per la transizione energetica.

**Posizionamento:** Braccio digitale che connette:
- **ENERBee** (costruzioni/impianti) → esecuzione lavori
- **EC Hub** → rete nazionale Comunità Energetiche (CER)

**Mission:** Semplificare l'accesso all'energia pulita, rendendola condivisa (CER), comprensibile (gamification) e vantaggiosa.

**Target:**
- **B2C:** Condomini / Famiglie / Proprietari casa
- **B2B:** Amministratori, Installatori, Presidenti CER
- **B2G:** Comuni

---

## I 4 PILASTRI DI RICAVO

Ogni feature deve essere collegata ad almeno uno di questi pilastri:

| # | Pilastro | Meccanismo | Fee Target |
|---|---|---|---|
| 1 | **CER** | Fee attivazione + gestione ricorrente + % share incentivo GSE | ~20% incentivo GSE |
| 2 | **Interventi (Riqualificazione)** | Lead generation per ENERBee/Partner su lavori efficientamento | ~8% sui lavori |
| 3 | **Finanziamenti Green** | Commissioni su prestiti tramite partner bancari | ~1.5% |
| 4 | **Upsell & Premium** | Marketplace energia B2B + Abbonamenti PRO + servizi a valore aggiunto | TBD |

---

## BRAND IDENTITY

### Mascot
**Il Cacatua** — pappagallo con cresta che si alza/abbassa. Non è decorazione: è la personalità dell'app.
- Animazioni contestuali (analizza, celebra, avverte)
- Micro-interazioni e stati d'animo basati sui progressi utente
- Easter egg

### Palette Colori (USARE SEMPRE QUESTI HEX)

```css
:root {
  /* Backgrounds */
  --bg-dark:        #161B2E;   /* Background primario — quasi nero blu */
  --bg-darker:      #0F1320;   /* Background sezioni hero */
  --card-bg:        #1E2540;   /* Sfondo cards e componenti */
  --card-border:    #2A3357;   /* Bordi sottili cards */

  /* Brand Colors */
  --green-primary:  #39FF14;   /* Verde neon — accent principale, CTA, highlight */
  --green-dark:     #22CC00;   /* Verde scuro — hover states */
  --cyan-accent:    #00D4D4;   /* Ciano — secondario, icone, link attivi */
  --pink-accent:    #FF4D6D;   /* Rosa/coral — alert, icone energia, urgenza */

  /* Typography */
  --text-primary:   #FFFFFF;   /* Testo principale su dark */
  --text-secondary: #C8D0E0;   /* Testo corpo */
  --text-muted:     #8892A4;   /* Testo secondario, caption */
  --text-disabled:  #4A5270;   /* Disabled states */

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #161B2E 0%, #1E2540 100%);
  --gradient-green: linear-gradient(90deg, #39FF14 0%, #00D4D4 100%);
  --gradient-card: linear-gradient(180deg, #1E2540 0%, #161B2E 100%);
}
```

### Typography
- **Headlines:** Sans-serif geometrico, weight 700-900, uppercase per titoli impatto
- **Subheadlines:** Weight 600, normal case
- **Body:** Weight 400-500, line-height 1.6
- **Numeri/KPI:** Monospace o tabular-nums, grande e prominente
- **Font suggerito:** Inter, Plus Jakarta Sans, o Outfit (Google Fonts, gratuiti)

### Tono di Voce (SEMPRE)
- ✅ **Semplice** — niente tecnicismi, parla come a un amico intelligente
- ✅ **Diretto** — prima il dato/beneficio, poi la spiegazione
- ✅ **Empowering** — l'utente è protagonista, non vittima della bolletta
- ❌ **Mai** moralista o "ecologista predicante"
- ❌ **Mai** gergo energetico senza traduzione immediata
- ❌ **Mai** CTA di vendita prima di aver mostrato valore

### Copy Efficace — Pattern
```
PRIMA: "Implementa soluzioni di efficienza energetica per ridurre i consumi"
DOPO:  "Scopri quanto stai perdendo ogni mese — e come fermarlo."

PRIMA: "Comunità Energetica Rinnovabile con incentivo GSE al 20%"
DOPO:  "Condividi energia con i tuoi vicini. Risparmi tutti, guadagni tu."
```

---

## ARCHITETTURA PRODOTTO

### L'ecosistema

```
KARICA APP (Frontend consumer + dashboard agenti)
    │
    ├── ENERBee E-VM (General Contractor → lead → Odoo CRM)
    ├── GBI / GTI (Esecuzione lavori edili + impiantistici)
    ├── Entraco (Fornitore energia → 5.000 clienti reali, dati consumo)
    └── EC Hub (Rete CER nazionale)
```

### Partnership Entraco — Vantaggio Competitivo Chiave
- 5.000 clienti reali (2.000 residenziali, 3.000 PMI) in Liguria
- Dati consumi storici (kWh, Smc) già disponibili
- La diagnosi energetica è **pre-compilata** prima che l'utente apra l'app
- Nessun competitor può replicare questo in tempi brevi

### Stack Tecnico (già in uso nel progetto)
- **Database:** Supabase (PostgreSQL) — schema in `Karica_MVP_DataModel.xlsx`
- **Backend/API:** Supabase Edge Functions
- **Frontend app:** React Native / Expo (mobile) + web responsive
- **CRM partner:** Odoo (bidirezionale con Karica via API)
- **Auth:** Supabase Auth

---

## MVP — SCOPE E PRIORITÀ

### Epiche MVP (IN SCOPE)
| Epica | Descrizione | Pilastro |
|---|---|---|
| B2C-1 | Onboarding + diagnosi energetica (wizard 7 step) | 2 |
| B2C-2 | Sezione RISPARMIO — bollette + trend + benchmark | 2 |
| B2C-3 | Sezione INTERVENTI — raccomandazioni + simulatore + lead | 2 |
| B2C-4 | Sezione CER — accesso e gestione Comunità Energetica | 1 |

### Fuori MVP (Fase 2/Scale — NON sviluppare ora)
- Marketplace B2B avanzato
- Abbonamento PRO con pricing definitivo
- White label per terze parti
- Karica Academy
- Data Products

### Principi di Prodotto (Non violarli mai)
1. **Prima il valore, poi la richiesta** — mai form prima di un dato utile
2. **Non puzzare di vendita** — gli interventi sono punto di arrivo, non pitch
3. **Numeri prima di tutto** — ogni schermata deve mostrare un numero rilevante per l'utente

---

## KPI E OBIETTIVI FINANZIARI

| Anno | Utenti Piattaforma | Ricavi Target |
|---|---|---|
| Anno 1 (operativo) | ~2.000 | ~€48k |
| Anno 2 (operativo) | ~16.000 | ~€190k |
| Anno 3 | ~30.000+ | ~€615k |

**CAC target:** contenuto — leva principale è la base Entraco (5.000 clienti warm)
**Burn rate:** monitorare sempre. Se costi sviluppo salgono senza crescita utenti → STOP e revisione.

---

## LANDING PAGE INVESTOR — OBIETTIVO

La landing page per il fundraising deve comunicare:

### Gerarchia dei Messaggi (in ordine)
1. **Problema:** Il mercato energia è opaco, frammentato, nessuno guida il cliente end-to-end
2. **Soluzione:** Karica = percorso completo (diagnosi → interventi → finanziamento → risparmio misurabile)
3. **Vantaggio competitivo:** Partnership Entraco (5.000 clienti + dati reali) + EnerBee (esecuzione garantita)
4. **Traction:** Mostrare metriche reali se disponibili, altrimenti partnership firmate e pipeline
5. **Business model:** I 4 pilastri in modo semplice
6. **Team:** Chi siete, perché voi
7. **Ask:** Quanto raccogliete, per cosa (milestone specifiche)

### CTA Principale Landing Investor
```
Primaria: "Richiedi il pitch deck completo" → form email
Secondaria: "Prenota una call" → Calendly
```

### Tono per Investor
- Dati e numeri concreti > aggettivi
- Mostrare il "perché adesso" (contesto normativo: EPBD, REPowerEU, RED III)
- Il mercato non va convinto ad esistere — va solo catturato
- Risultati verificabili > promesse

---

## COMPONENTI UI RICORRENTI

### Card Metrica (pattern standard)
```
┌─────────────────────────────┐
│  [ICONA]  Label categoria   │
│                             │
│  €1.234                     │  ← numero grande, --green-primary
│  +12% rispetto a ieri  ↑    │  ← trend, colore contestuale
│                             │
│  Descrizione breve          │  ← --text-muted
└─────────────────────────────┘
```

### Bottone Primario
```css
.btn-primary {
  background: var(--green-primary);
  color: var(--bg-dark);
  font-weight: 700;
  border-radius: 8px;
  padding: 14px 28px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: var(--green-dark);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(57, 255, 20, 0.3);
}
```

### Highlight testuale (parole chiave in verde)
```html
<!-- Pattern usato nei titoli del deck -->
<h1>La <span style="color: var(--green-primary)">rivoluzione</span> dell'energia è iniziata</h1>
```

---

## FILE DI RIFERIMENTO NEL PROGETTO

| File | Contenuto |
|---|---|
| `Karica_MVP_Product_Bible.docx` | Specifica funzionale completa dell'app |
| `Karica_MVP_DataModel.xlsx` | Schema database Supabase |
| `BP_Karica_5_yrs.xlsx` | Business plan 5 anni con KPI |
| `Karica_BusinessPlan_5_yrs.pdf` | Business plan in formato leggibile |
| `Karica_Investor_Deck.pdf` | Deck per investitori (fonte brand visivo) |
| `Karica___Strategic_Core_Definition.pdf` | Strategia e posizionamento |
| `Karica_Entraco_DigitalStrategy.docx` | Strategia digitale partnership Entraco |
| `EnerBee_-_strategia_ed_organigramma.docx` | Struttura EnerBee Group |

---

## REGOLE PER CLAUDE CODE

1. **Non inventare numeri** — usa solo quelli nei file di riferimento
2. **Rispetta la palette** — usare sempre le variabili CSS definite sopra
3. **Il cacatua è sempre verde** (#39FF14 o variante) su sfondo scuro
4. **Mobile-first** — l'app è principalmente mobile, le landing devono esserlo
5. **Accessibilità** — contrasto minimo AA su tutti i testi
6. **Niente form senza prima mostrare valore** — principio P1 del prodotto
7. **Lingua UI:** Italiano per contenuti consumer, Inglese per codice/commenti
