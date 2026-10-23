# IDEE — proposte di C (Argon) valutate da A

> **File di A.** Raccoglie le **proposte di pensiero** di C (Gemini Argon), con la
> valutazione di A: sono realizzabili? sono già nel gioco? valgono i crediti spesi?
> Serve a non perdere le idee buone e a non riproporre ciò che esiste.
> **Regola:** una proposta non è una decisione finché A non l'ha confrontata col reale.
> Vedi `COORDINAMENTO.md` §3.6.a/b.

---

## Proposta n. 1 — Scaffolding dopo il primo errore
**Compito:** aumentare la qualità didattica · **Modello:** `gemini-4-argon-medium` · **23/10 00:33** · 14.880 token

**L'idea di C:** al primo errore, invece di togliere subito una stella, il gioco
riduce il carico cognitivo (oscurra un distrattore, evidenzia la categoria corretta,
blocca l'elemento già giusto). Beneficio massimo: **ADHD** (bassa tolleranza alla
frustrazione, guessing impulsivo) e **discalculia**.

**Valutazione di A:** ✅ **realizzabile e ben mirata.**

- **Quasi tutto l'occorrente esiste già.** `RoundOutcome.attempts` (`core/state.ts:32`)
  conta **già** i tentativi per round: è esattamente la variabile che C propone di
  aggiungere. Non serve inventarla — serve **usarla**.
- **Il costo vero non è tecnico, è di progetto:** decidere *come* cambia
  l'assegnazione delle stelle quando si usa l'aiuto. Questa è una decisione
  **didattica**, non di codice: se l'aiuto rende la stella "gratis", il gioco
  perde valore; se non la dà mai, lo scaffolding diventa inutile. **Da decidere
  prima di implementare.**
- **Rischio:** `setStars` non esiste ancora nelle scene (mai chiamato). Le scene
  non sono scritte: **è il momento giusto** per progettarlo, non ci sarà da
  riscrivere nulla.

**Stato:** 💡 valida · da trasformare in istruzione per B **dopo** la decisione
sulle stelle.

---

## Proposta n. 2 — Doppia codifica numerica (subitizing)
**L'idea di C:** affiancare al simbolo `5` la sua rappresentazione visiva (dado /
ten-frame) nelle sfide numeriche. Beneficio: **discalculia** (deficit del *number sense*).

**Valutazione di A:** ✅ **realizzabile, costo basso.**

- Il gioco disegna già ogni texture proceduralmente (`art/textures.ts`,
  `art/icons-painters.ts`): una funzione helper che genera i pallini in pattern
  1–10 è coerente con l'architettura esistente, **non** introduce asset nuovi.
- **Punto di attenzione:** funziona **solo se i round sono numerici**. Serve sapere
  quali sfide lo sono — e i round sono contenuto (`content/packs.ts`), non codice.
  Va gestito con un **flag nel contenuto**, non con un'euristica sul testo.

**Stato:** 💡 valida · richiede una decisione sul formato del contenuto.

---

## Proposta n. 3 — Agenda visiva predittiva (striscia CAA)
**L'idea di C:** mostrare in alto le icone delle micro-sfide del livello, spuntandole
man mano. Beneficio: **spettro autistico**, **ansia** (riduce l'imprevedibilità).

**Valutazione di A:** ✅ **la più economica e la più solida delle cinque.**

- Richiede solo di leggere l'elenco dei round del livello all'avvio della scena e
  disegnare una fila di icone di stato. Le icone **esistono già** (`art/icons.ts`).
- **Perché è la migliore:** non tocca la logica di punteggio, non dipende dal
  contenuto, non ha rischi. È puro **HUD**. Il rapporto valore/costo è il più alto
  delle cinque proposte.
- Coerente con la separazione del progetto: è presentazione, non regole.

**Stato:** 🟢 **da proporre a B per prima** (quando B arriva alle scene).

---

## Proposta n. 4 — Sintesi vocale (TTS) con evidenziazione
**L'idea di C:** leggere ad alta voce consegna e opzioni, evidenziando le parole.
Beneficio: **dislessia, DSL** (scarica la decodifica grafema-fonema).

**Valutazione di A:** ⚠️ **realizzabile, ma NON è "difficoltà media" come dice C.**

- C dice "media" per la sincronizzazione `onboundary`. Il problema vero è
  **più grande**: `window.speechSynthesis` **non è deterministico** tra browser e
  sistemi, e la sincronizzazione parola-per-parola è inaffidabile su Safari/iOS.
  Un gioco per bambini con BES **non può** avere lettura che "a volte funziona".
- **Il gioco ha già audio procedurale** (`audio/synth.ts`, Web Audio): ma è
  **sintesi di toni**, non voce. Non riusa quella strada.
- **Costo reale probabilmente più alto** di quanto C stimi. Se si fa, va fatto
  con una **prova su browser reali** prima di prometterlo.

**Stato:** 🟡 **da verificare la fattibilità prima** di qualsiasi impegno. Non è
"media": è **incerta**.

---

## Proposta n. 5 — Stelle metacognitive invece che a tempo ("Pausa Pensiero")
**L'idea di C:** slegare le 3 stelle dal tempo; introdurre un cooldown di
osservazione e un pulsante "Controlla" prima della conferma. Beneficio:
**ADHD** (inibizione), **disprassia** (lentezza esecutiva).

**Valutazione di A:** ✅ **concettualmente la più giusta, e confermata dal codice.**

- **`state.ts` registra già `timeMs`** per round. C propone di **non usarlo per le
  stelle**: è coerente — il dato c'è per i report, non per premiare la velocità.
- È in linea col principio del progetto: **un gioco per BES non deve premiare la
  velocità**. Chi ha dislessia o disprassia sarebbe penalizzato per qualcosa che
  non è competenza didattica.
- **Attenzione:** il pulsante "Controlla" cambia il flusso delle sfide (un passo
  in più prima di confermare). Va deciso **dopo** che le scene esistono, non prima.

**Stato:** 💡 valida · è una decisione di **progettazione**, da prendere quando B
affronta le scene.

---

## Sintesi di A (ordine di valore)

| # | Proposta | Valore | Costo | Nota di A |
|---|---|---|---|---|
| 3 | Agenda visiva (CAA) | alto | **basso** | 🟢 **prima scelta** — HUD puro, zero rischi |
| 5 | Stelle metacognitive | alto | medio | ✅ principio giusto, decisione di progetto |
| 1 | Scaffolding dopo errore | alto | medio | ✅ `attempts` esiste già |
| 2 | Doppia codifica numerica | medio | basso | ✅ dipende dal contenuto |
| 4 | Sintesi vocale | alto | **incerto** | 🟡 fattibilità NON provata: C la sottostima |

**Costo di questa sessione: 14.880 token** per 5 idee, di cui **4 valide** e
**1 da verificare**. Rapporto favorevole: sono proposte *progettuali* (difficili
da ottenere da un modello locale), non controlli meccanici (che Qwen fa gratis).
**Questo è l'uso corretto dei crediti secondo la strategia §3.6.a.**
