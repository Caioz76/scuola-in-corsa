# Scuola in Corsa

Gioco didattico 2D per bambini della scuola primaria, sviluppato con **Phaser 3**
e **TypeScript**. Il gioco è pensato per essere **inclusivo per davvero**: ogni
profilo BES (Bisogni Educativi Speciali) è una configurazione concreta che cambia
il modo in cui il gioco si comporta, non un'etichetta.

> **Versione in sviluppo.** Il codice sorgente è in evoluzione; questo documento
> descrive l'architettura e le funzioni previste.

---

## Indice

1. [Cos'è](#cosè)
2. [Come si gioca](#come-si-gioca)
3. [Avvio rapido](#avvio-rapido)
4. [Struttura del progetto](#struttura-del-progetto)
5. [I contenuti: i pacchetti](#i-contenuti-i-pacchetti)
6. [I tipi di sfida](#i-tipi-di-sfida)
7. [Inclusione: profili e regole BES](#inclusione-profili-e-regole-bes)
8. [Per chi sviluppa](#per-chi-sviluppa)
9. [Documentazione](#documentazione)
10. [Stato del progetto](#stato-del-progetto)

---

## Cos'è

**Scuola in Corsa** è un gioco a scorrimento in cui il bambino avanza lungo un
percorso e incontra **checkpoint** didattici: a ogni tappa deve risolvere una
sfida (un quiz, un riconoscimento di immagine, un abbinamento, una sequenza).
Superata la sfida, il percorso continua.

Il gioco ha una mascotte, **Pico**, che accompagna il bambino e dà indicazioni.

**Niente rete, niente server, niente dipendenze esterne a runtime**: i contenuti
sono JSON statici, la grafica e i suoni sono generati proceduralmente. Il gioco
funziona offline una volta caricato.

### Principi di progettazione

- **Il nome del gioco si cambia in un punto solo** (`src/core/constants.ts`).
- **I contenuti sono dati, non codice**: le sfide vivono in pacchetti JSON.
- **L'AI non assegna mai gli ID**: gli identificativi sono generati dal codice,
  il modello linguistico produce solo i testi. Questo rende i contenuti
  riproducibili e validabili.
- **L'inclusione è configurazione**: le regole BES sono un livello separato che
  si applica sopra al gioco, senza duplicare le scene.

---

## Come si gioca

1. Il bambino sceglie (o l'insegnante imposta) un **profilo BES** — oppure nessuno.
2. Sceglie una **materia**: matematica, italiano, scienze o storia.
3. Percorre il livello: il personaggio scorre, a ogni checkpoint compare una sfida.
4. Risponde; il gioco dà un **riscontro immediato** (positivo o con spiegazione).
5. Il progresso viene salvato in locale: si può riprendere da dove si era rimasti.

---

## Avvio rapido

Requisiti: **Node.js 18+** e npm.

```bash
npm install      # installa le dipendenze
npm run dev      # avvia il server di sviluppo (Vite)
```

Poi apri l'indirizzo mostrato nel terminale (di solito `http://localhost:5173`).

### Comandi disponibili

| Comando | Cosa fa |
|---|---|
| `npm run dev` | Avvia il gioco in sviluppo, con ricarica automatica |
| `npm run build` | Crea la versione di produzione in `dist/` |
| `npm run preview` | Mostra la versione di produzione appena creata |
| `npm run typecheck` | Controlla i tipi TypeScript senza generare file |
| `npm test` | Esegue i test (Vitest) |

### Come si distribuisce a scuola

`npm run build` produce una cartella `dist/` che può essere servita da qualsiasi
server statico — o anche aperta da un file locale, se il pacchetto viene
costruito come file singolo (`vite-plugin-singlefile` è già fra le dipendenze).
Questo permette di usarlo su una LIM o su un computer di laboratorio **senza
installare nulla**.

---

## Struttura del progetto

```
scuola-in-corsa/
├── src/
│   ├── main.ts            # punto di ingresso: crea la scena Phaser
│   ├── core/              # costanti, stato, salvataggi, impostazioni
│   ├── art/               # grafica procedurale (sfondi, icone, Pico, palette)
│   ├── audio/             # suoni sintetizzati proceduralmente
│   ├── challenges/        # i quattro tipi di sfida (logica + interfaccia)
│   ├── content/           # modello dei contenuti, validatore, pacchetti
│   └── bes/               # profili e regole di inclusione
├── tests/                 # test automatici (Vitest)
├── tools/                 # strumenti di sviluppo (Content Factory, script LM Studio)
├── docs/                  # documentazione (guida per l'insegnante)
└── COORDINAMENTO.md       # contratto di lavoro fra le sessioni di sviluppo
```

### Cosa fa ogni cartella

| Cartella | Responsabilità |
|---|---|
| `src/core/` | Nome del gioco, dimensioni, velocità; stato della partita; salvataggio; impostazioni |
| `src/art/` | Tutto il disegno è **procedurale**: nessun file immagine da gestire |
| `src/audio/` | I suoni sono generati con sintesi, non campionati |
| `src/challenges/` | Ogni tipo di prova ha la sua scena e la sua interfaccia |
| `src/content/` | **Fonte unica dei tipi** (`types.ts`), validatore (`validate.ts`), pacchetti |
| `src/bes/` | Profili (`profiles.ts`), regole (`rules.ts`), risoluzione (`resolver.ts`) |

---

## I contenuti: i pacchetti

Un **pacchetto** (pack) è un insieme di livelli per una materia e una fascia
d'età. La struttura è definita in `src/content/types.ts`.

```jsonc
{
  "packId": "mat-7-9",
  "version": "1",
  "title": "Matematica",
  "subject": "matematica",
  "ageRange": "7-9",
  "difficulty": 1,
  "levels": [
    {
      "id": "liv-1",
      "title": "Prima tappa: contare e operare",
      "difficulty": 1,
      "rounds": [ /* ... */ ]
    }
  ]
}
```

### Materie e fasce d'età disponibili

| Materia | `subject` | Fascia d'età |
|---|---|---|
| Matematica | `matematica` | 7-9 |
| Italiano | `italiano` | 8-10 |
| Scienze | `scienze` | 8-10 |
| Storia | `storia` | 10-12 |

### Regole di validità

Il validatore (`src/content/validate.ts`) controlla ogni pacchetto prima che
entri nel gioco. Le regole principali:

- Gli **ID sono univoci** all'interno del pacchetto.
- Un quiz ha **2-4 opzioni**, con **una sola** corretta.
- Le opzioni hanno **testo visibile**: mai segnaposto tipo "A", "B", "C".
- I riferimenti a icone devono puntare a **icone esistenti** nella libreria.
- Per gli abbinamenti, gli indici delle coppie devono essere validi.

> Per un esempio concreto, vedi `src/content/packs.ts` e i test in
> `tests/content.test.ts`.

---

## I tipi di sfida

Il gioco prevede **quattro tipi** di prova (`RoundType`):

| Tipo | Cosa chiede al bambino | Campi chiave |
|---|---|---|
| `quiz` | Scegliere la risposta corretta fra 2-4 opzioni | `options`, `support` (per la matematica) |
| `image` | Riconoscere un'icona e scegliere la parola giusta | `icon`, `options` |
| `dragdrop` | Riordinare oppure abbinare elementi | `mode`, `sortItems` / `leftItems`+`rightItems`+`pairs` |
| `sequence` | Mettere gli elementi in ordine cronologico o logico | `direction` (`tap` o `drag`), `items` |

Ogni prova ha sempre:

- `prompt` — la domanda per il bambino;
- `hint` — un suggerimento che **aiuta senza rivelare** la risposta;
- `explanation` — una spiegazione breve, utile dopo un errore o per l'insegnante.

Per la matematica sono previsti tre **supporti visivi** (`MathSupport`):
`numberLine` (riga numerica), `baseTen` (base dieci), `table` (tabella).

---

## Inclusione: profili e regole BES

L'inclusione è il cuore del progetto. Funziona in **due livelli**:

1. Le **regole** (`src/bes/rules.ts`) sono i singoli interruttori: 30 comportamenti
   che il gioco può attivare o disattivare.
2. I **profili** (`src/bes/profiles.ts`) sono **preset**: partono da un insieme di
   regole sensato per un bisogno specifico. **Un profilo non è una gabbia**:
   l'insegnante può poi cambiare ogni singola regola.

### I profili disponibili

| Profilo | Cosa fa, in breve |
|---|---|
| **ADHD** | Meno distrazioni, un passo alla volta, niente fretta |
| **Autismo** | Prevedibilità totale: stessi colori, stessi suoni, stesso schema |
| **Dislessia** | Font ad alta leggibilità, testi brevi, più tempo |
| **Discalculia** | Riga numerica, base dieci, errori spiegati con calma |
| **Disgrafia** | Niente scrittura: si tocca, si sceglie, si trascina |
| **Disprassia** | Tocchi grandi e permissivi, niente gesti precisi |
| **Sordità** | Ogni suono diventa un segnale visivo chiaro |
| **Disabilità intellettiva** | Linguaggio semplice, pochi passi, tanti rinforzi positivi |
| **DSA / Ansia** | Zero pressione: si può riprendere, sbagliare e capire |

### Le regole (estratto)

| Regola | Etichetta per l'insegnante |
|---|---|
| `extraTime` | Nessuna fretta |
| `pauseAllowed` | Pausa quando serve |
| `slowPace` | Ritmo lento |
| `oneAtATime` | Una prova alla volta |
| `fewerOptions` | Meno opzioni |
| `shorterText` | Testi brevi |
| `hintFirst` | Suggerimento in partenza |
| `highContrast` | Alto contrasto |
| `dyslexiaFont` | Font leggibile (dislessia) |
| `largerText` | Testo più grande |
| `reduceMotion` | Riduci i movimenti |
| `noDecoration` | Schermata pulita |
| `colorCoding` | Colori guida |
| `visualSupports` | Supporti visivi (matematica) |
| `musicOff` | Niente musica di sottofondo |
| `soundCues` | Suoni di conferma |
| `visualInsteadOfAudio` | Segnali visivi invece che sonori |
| `immediateFeedback` | Risposta subito |
| `positiveReinforcement` | Tanti complimenti |
| `noStreakPressure` | Niente pressione della serie |
| `errorExplanation` | Spiegazione dopo l'errore |
| `tapInsteadOfDrag` | Tocca invece di trascinare |
| `largerTargets` | Bottoni più grandi |
| `noPrecision` | Tocchi permissivi |
| `simpleLanguage` | Linguaggio semplice |
| `repeatPrompt` | Rileggi la domanda |
| `clearProgress` | Progresso ben visibile |
| `predictableLayout` | Schermate sempre uguali |
| `mascotGuide` | Pico guida i passi |

> **Guida completa per l'insegnante:** vedi [`docs/guida-insegnante.md`](docs/guida-insegnante.md).

---

## Per chi sviluppa

### Le regole d'oro

- **I tipi sono la fonte unica.** Prima di cambiare un contenuto, guarda
  `src/content/types.ts`: lo condividono gioco, validatore ed editor.
- **L'LLM non assegna mai gli ID.** Gli identificativi li genera il codice. Questo
  rende i contenuti validabili e riproducibili.
- **Niente dipendenze di rete a runtime.** I pacchetti sono JSON statici.
- **Il disegno e il suono sono procedurali.** Non ci sono asset binari da gestire.

### Test

I test usano **Vitest**:

```bash
npm test
```

I test esistenti coprono due aree critiche:

- **Contenuti** (`tests/content.test.ts`): validità dei pacchetti e degli ID.
- **BES** (`tests/bes.test.ts`): coerenza dei profili e degli override.

### Strumenti di sviluppo

La cartella `tools/` contiene strumenti che **non fanno parte del gioco**:

| File | Cosa fa |
|---|---|
| `tools/content-factory/` | Genera bozze di pacchetti con un modello locale (LM Studio) |
| `tools/diagnostica-lmstudio.sh` | Mostra lo stato del modello locale: server, memoria, coda |
| `tools/carica-modello.sh` | Carica il modello locale con la configurazione corretta |
| `tools/benchmark-modelli.sh` | Confronta la velocità dei modelli disponibili |

---

## Documentazione

| Documento | Per chi |
|---|---|
| `README.md` (questo file) | Chiunque voglia capire il progetto |
| [`docs/guida-insegnante.md`](docs/guida-insegnante.md) | Insegnanti: profili, regole, come usare i contenuti |
| `COORDINAMENTO.md` | Chi sviluppa: accordi fra le sessioni di lavoro |

---

## Stato del progetto

Il progetto è **in sviluppo attivo**. Al momento sono presenti:

- il motore di gioco e le scene;
- i quattro tipi di sfida;
- il sistema BES completo (9 profili, 30 regole);
- quattro pacchetti di contenuti (uno per materia);
- grafica e audio procedurali;
- i test di contenuti e BES.

**In lavorazione:** ampliamento dei contenuti tramite la *Content Factory*,
documentazione per l'insegnante, test end-to-end.

---

## Licenza

Da definire.
