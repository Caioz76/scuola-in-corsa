# CODA — compiti per B (dispatcher di A)

> **File di A.** È la **lista ordinata** del lavoro per la sessione B. A è il
> *dispatcher*: verifica le proposte di C, le traduce in compiti eseguibili e li
> mette qui in ordine. B prende **un compito alla volta, dall'alto**.
> Vedi `COORDINAMENTO.md` §3.6.a/b.
>
> **PERCHÉ COMPITI CORTI (regola tecnica, non estetica).** B gira con Qwen locale,
> contesto **32768**, e la memoria (32 GB) è **già satura**: `RSS 17,63 GB`,
> **2,15 GB in swap**, 15% di RAM libera. Un compito lungo satura il contesto →
> **compaction** → minuti di lavoro perso. Quindi: **un compito = una sessione**,
> corto, autoconclusivo, verificabile da solo.
> **NON** aumentare il contesto: la KV cache a 65536 costa **+4,3 GB** che non ci
> sono, e il traffico finirebbe nello swap → B a **~1-2 tok/s** invece di 12.

**Ultimo aggiornamento:** 23 ottobre 2026, ore 01:05
**Stato di B al momento della scrittura:** 🟢 **al lavoro sul Compito 1** (ricevuto 00:53:37)

---

## 🌙 AUTOMAZIONE NOTTURNA (attiva dalle 01:04)

L'utente non è presente per ore. Poiché B **non ha iniziativa** (finisce un compito
e si ferma), il tempo dopo il Compito 1 andrebbe perso. Quindi è attivo
**`tools/sorvegliante.sh`**, che **invia da solo il Compito 2** a B **non appena
B è davvero ferma**, con questo criterio (tutte vere per **2 giri consecutivi**):

1. `npx tsc --noEmit` = **0 errori** (Compito 1 concluso)
2. `npm test` = **26 passed** (nessuna regressione)
3. **CPU del modello stabile** (B ha smesso di generare)
4. **nessun file `src/` modificato** negli ultimi 2 minuti

Solo allora esegue `opencode run --session ses_ea0501762ffeu4cberdJrM00C9 "<Compito 2>"`.
Il canale è stato **verificato su una sessione di prova, mai su B**. Guardie attive:
lock (un solo sorvegliante), controllo che l'ID sessione **esista** prima di inviare,
modalità `--prova`, `--stop`. Diario: `tools/.sorvegliante/diario.log`.
**Il Compito 3 NON viene inviato**: è grosso, va spezzato con l'umano presente.

---

## Regole della coda

1. **Un compito alla volta.** B prende solo il primo non completato.
2. **Ogni compito è verificabile da solo** con un comando esatto (sotto, in "Verifica").
3. **A non corregge mai `src/`.** Se serve una correzione, è un compito qui.
4. **Se un compito resta fermo >30 min, A avvisa l'utente** (regola anti-magazzino):
   meglio un allarme che un archivio di lavoro mai fatto.
5. **Le idee di C entrano qui solo quando sono eseguibili.** Un'idea sulla carta
   non è un compito.

---

## ⛔ COMPITO 1 — Sbloccare il compilatore (PRIORITÀ ASSOLUTA)

**Perché per primo:** nessun'altra cosa si può fare finché il progetto non compila.
Non è un'idea, è un **blocco**.

- **Cosa:** applicare la **patch dei tipi** (`~/Downloads/PATCH-SCUOLA-IN-CORSA.md`,
  12.679 byte) oppure correggere a mano i 36 errori. `src/` è di B: decide B.
- **Dove sono gli errori** (tutti in `src/challenges/`): `match.ts` 14,
  `order.ts` 9, `choice.ts` 7, `ui.ts` 4, `index.ts` 2.
- **Codici dominanti:** `TS2339` (proprietà inesistente ×10+), `TS2345` (tipo
  argomento), `TS7006` (parametro implicit `any`).
- **Verifica (esatta):**
  ```bash
  npx tsc --noEmit 2>&1 | grep -c "error TS"     # deve dare: 0
  npm test 2>&1 | grep -E "^ *Tests "            # i test devono restare verdi
  ```
- **Attenzione:** la patch rende **obbligatori** `sortItems`/`leftItems`/
  `rightItems`/`pairs`. La factory di A li produce già correttamente → **nessuna
  rottura prevista** (verificato). Se qualcosa si rompe, i 26 test lo dicono subito.
- **Stato:** ⬜ da fare

---

## 📋 COMPITO 2 — Gancio `window.__GIOCO__` (piccolo, alta resa)

**Perché secondo:** è corto (~8 righe), non tocca la grafica, e **sblocca i test
e2e di flusso** di A (oggi 2 `skip`).

- **Cosa:** in `src/main.ts`, esporre la scena attiva. **Forma esatta e snippet
  pronto: `COORDINAMENTO.md` §3.5.**
  ```js
  window.__GIOCO__ = { scena: 'Boot', materia: null }
  ```
  Chiavi di scena attese: `Boot` → `Title` → `Subject` → `Game` → `Results`.
  **Usare un getter**, non un evento: Phaser emette `START` per singola scena,
  non globalmente (verificato su Phaser 3.90 HEADLESS).
- **Verifica (esatta):** dopo `npm run dev`, in console:
  ```js
  window.__GIOCO__.scena   // "Boot" o "Title", mai undefined
  ```
  Poi A attiva i 2 `skip` in `tests/e2e/flusso.spec.ts`.
- **Stato:** ⬜ da fare

---

## 🎨 COMPITO 3 — Prima scena di gioco (sblocca tutto il resto)

**Perché terzo:** le scene **non esistono** (`src/scenes/` è vuota, 0 file).
Finché non ci sono, **nessuna idea di C è implementabile**.

- **Cosa:** creare la prima scena giocabile (proposta: `BootScene` + `TitleScene`,
  o direttamente la prima sfida) seguendo l'architettura già in `src/challenges/`.
- **Verifica (esatta):**
  ```bash
  ls src/scenes/*.ts | wc -l        # >= 1
  npm run build 2>&1 | tail -3      # build senza errori
  ```
- **Stato:** ⬜ da fare · **nota:** da spezzare in sotto-compiti corti quando ci si arriva.

---

## 💡 IDEE DI C — in attesa di essere eseguibili

> Queste **NON sono ancora compiti**: aspettano che le scene (Compito 3) esistano.
> Dettaglio completo e valutazione in **`IDEE.md`**. Ordine di valore deciso da A.

| Ordine | Idea (da `IDEE.md`) | Pronta quando… |
|---|---|---|
| 🟢 1 | **Agenda visiva (striscia CAA)** — la più economica, è puro HUD | esistono le scene |
| 2 | **Stelle metacognitive** (non a tempo) — decisione di progetto | esistono le scene |
| 3 | **Scaffolding dopo il primo errore** — `attempts` esiste già | esistono le scene |
| 4 | **Doppia codifica numerica** — pattern 1–10 | si decide il flag nel contenuto |
| 🟡 5 | **Sintesi vocale (TTS)** — **fattibilità da verificare prima** | prova su browser reali |

---

## Registro dei compiti

| # | Compito | Messo in coda | Preso da B | Esito |
|---|---|---|---|---|
| 1 | Sbloccare il compilatore (36 errori tsc) | 23/10 00:45 | ⏳ | ⬜ |
| 2 | Gancio `window.__GIOCO__` | 23/10 00:45 | ⏳ | ⬜ |
| 3 | Prima scena di gioco | 23/10 00:45 | ⏳ | ⬜ |
