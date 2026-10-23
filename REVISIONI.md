# REVISIONI — Scuola in Corsa

> **Questo file appartiene alla sessione C** (Antigravity / Gemini, revisore
> indipendente). È l'**unico** file che C scrive. Vedi `COORDINAMENTO.md` §3.6.
>
> **C legge `src/`, non lo modifica.** Ogni rilievo è una *segnalazione*, non una
> correzione: decide B (o l'utente). Se un rilievo viene corretto, lo si annota
> nella colonna "Esito" senza cancellare la riga.

**Ultimo aggiornamento:** 23 ottobre 2026, ore 00:15
**Aggiornato da:** sessione A — su revisione di **C** (`agy`, modello `gemini-4-argon-medium`)
**Bersaglio della 1ª revisione:** `src/core/progress.ts` (34 righe) + contesto `storage.ts`, `state.ts`

> ✅ **Ogni rilievo è stato verificato da A, non accettato sulla parola.** I casi
> sono stati riprodotti in una cartella temporanea con una **copia fedele** del
> codice: i risultati sotto riportano ciò che è stato **osservato**, non ciò che C
> ha affermato. Dove la gravità dichiarata da C non regge alla verifica, è
> segnalato.

---

## Come scrivere un rilievo

Un rilievo utile ha queste parti. Se ne manca una, C lo ripensi:

| Campo | Cosa scrivere |
|---|---|
| **Gravità** | 🔴 errore (risultato sbagliato) · 🟡 rischio (può sbagliare) · 🔵 nota |
| **Dove** | `file:riga` — preciso, non "in qualche punto" |
| **Cosa** | il difetto in una frase |
| **Perché** | la conseguenza concreta (cosa si rompe, cosa si calcola male) |
| **Riproduzione** | come farlo vedere (caso d'ingresso, valore che lo scatena) |
| **Proposta** | la correzione minima, in parole. **Non** riscrivere il file intero. |

---

## Rilievi

_(verificati da A il 23/10 00:15 — riprodotti in cartella temporanea, mai su file reali)_

| # | Gravità | Dove | Cosa | Verifica di A | Stato |
|---|---|---|---|---|---|
| 1 | 🔴 errore | `core/progress.ts:13-19` | `setStars` **non limita** `stars`: accetta 5/∞/NaN senza clamp a 0–3 | ✅ **confermato** — `setStars(5)` poi `setStars(3)` lascia **5**: la guardia `stars > cur` blocca **per sempre** i punteggi legittimi su quel livello | aperto |
| 2 | 🟡 rischio | `core/progress.ts:25-30` | `pushResult` fa `.push()` su ciò che arriva da storage **senza** verificare `Array.isArray` | ✅ **confermato** — `history="null"` → `TypeError: Cannot read properties of null`; `history="{}"` → `history.push is not a function` | aperto |
| 3 | 🔵 nota | `core/progress.ts:13-19` | Input invalido (`-1`, `NaN`) **sporca lo storage** con oggetti vuoti `{"p":{}}` | ✅ **confermato** — con storage vuoto, `setStars(p,l,-1)` scrive `{"p":{}}` | aperto |
| 4 | 🔵 nota | `core/progress.ts:7-23` (`storage.ts:35-42`) | `Progress` corrotto in `localStorage` non è difeso: `"null"` o `{"p1":123}` fanno crashare i lettori | ✅ **confermato** — 4 crash distinti riprodotti (`TypeError` ×4) | aperto |
| 5 | 🔵 nota | `core/progress.ts:22` | `packId` che collide con `Object.prototype` (`toString`, `constructor`) fa restituire una **stringa** dove il tipo dichiara `number` | ✅ **confermato** — `starsFor('toString','name')` restituisce `"toString"` (viola il tipo di ritorno) | aperto |
| 6 | ✅ corretto | `core/progress.ts:9-11` | `loadProgress()` **non** restituisce un riferimento condiviso | ✅ **confermato** — due chiamate danno copie distinte; chi modifica non inquina gli altri | chiuso |

> **Nota di A sulla gravità.** C aveva indicato i rilievi 4 e 5 con enfasi alta.
> La verifica ridimensiona: **richiedono un `localStorage` già corrotto o un
> `packId` che nessun contenuto reale usa** — non sono errori che il gioco si crea
> da solo. Vanno tenuti come 🔵 note di robustezza. **Il rilievo 1 è l'unico
> davvero grave**, perché `setStars` riceve i punteggi dal gioco: è lì che un
> valore fuori scala può entrare per davvero.
>
> **Precisazione su "cosa si perde" col taglio a 200 (rilievo 2).** Il taglio
> `slice(-200)` è **corretto** come coda FIFO (C lo dice, e la verifica conferma):
> si perdono i dettagli delle partite più vecchie, **non** le stelle (salvate a
> parte). Il difetto vero è la **mancata validazione**, non il taglio.

---

## Rilievi chiusi

_(rilievi verificati come corretti da B o dall'utente)_

| # | Rilievo | Esito | Data |
|---|---|---|---|
| — | — | — | — |

---

## Note per C (contesto utile)

- **Modello di C:** Gemini (cloud) — **non usa la GPU**, quindi può lavorare
  mentre B usa il modello locale (Qwen, `parallel 1`). Nessuna contesa.
- **`src/` è di B:** leggere sì, scrivere no. Vale per ogni file tranne questo.
- **I 36 errori `tsc` attuali** sono noti e in attesa della patch (di B): non
  sono il bersaglio della revisione. Meglio concentrarsi su ciò che i tipi **non**
  catturano: logica, casi limite, calcoli.
- **Moduli più densi di logica** (dove un errore fa più danno):
  `core/progress.ts`, `core/settings.ts`, `core/state.ts`, `bes/resolver.ts`,
  `bes/rules.ts`, `content/validate.ts`, `challenges/*.ts`.
- **Fonte di verità dei tipi:** `src/content/types.ts`.
- Se C trova un problema **urgente**, lo segnali qui e basta: **non corregga**.
