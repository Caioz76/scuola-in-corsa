# RIPRESA — stato al 23/10/2026, 22:40

Punto di ripresa reale. Se qualcosa non torna, **fidati dei comandi**, non di
questo file: in fondo ci sono le tre verifiche che dicono la verità.

## Cosa funziona ORA (verificato, non dichiarato)

| Controllo | Valore |
|---|---|
| `npx tsc --noEmit` | **0 errori** |
| `npm test` (vitest) | **27/27** |
| `npx playwright test` | **7/7** |
| Flusso in browser | `Boot → Title → Subject → Game` |
| Risposta corretta | avanza al round successivo |
| Fine tappa | riepilogo, ritorno al `Title` |
| `window.__GIOCO__` | `{ scena, materia }`, entrambi vivi |

Ultimo commit: **`316eb46`** — “C6+C8: scelta materia e prima scena giocabile”.

## Com'è fatto il codice oggi

`src/main.ts` (198 righe) contiene **tutte** le scene:

- `BootScene` — crea texture UI + icone, passa a `Title`
- `TitleScene` — titolo, sottotitolo, bottone “Gioca” → `Subject`
- `SubjectScene` — 4 materie, `setMateria(id)` → `Game`
- `GameScene` — carica il pack della materia, mostra i round con `showChallenge`,
  “Giusto!” → successivo, “Riprova” sugli errori, riepilogo a fine tappa
- gancio `window.__GIOCO__` (getter, nessun costo per frame) + `setMateria`

Questo è **il prossimo problema da risolvere**: finché le scene stanno in un solo
file, due agenti non possono lavorarci in parallelo.

## Processi attivi (non ucciderli senza motivo)

| Cosa | PID | Note |
|---|---|---|
| dashboard `--watch 300` | 18276 | rigenera `dashboard.html` ogni 5 min |
| Vite di collaudo, porta 5210 | 56652 | serve il codice vero, non una copia |
| Sessione B (`opencode run`) | — | **idle**, ultima chiusura 22:38:19 |

## Verifica in tre comandi

```bash
cd /Users/caioz/scuola-in-corsa
npx tsc --noEmit 2>&1 | grep -c "error TS"   # → 0
npx vitest run 2>&1 | grep -E "Tests"        # → 27 passed
npx playwright test 2>&1 | tail -2           # → 7 passed
```

## Corsie parallele — `tools/lane.sh`

```bash
bash tools/lane.sh <nome> <modello> <file-prompt> <file-write-set>
```

Cosa garantisce, meccanicamente:

1. **worktree git separato** (`/tmp/scuola-lane-<nome>`, branch `lane/<nome>`);
2. **lock**: rifiuta se un’altra corsia viva dichiara gli stessi file;
3. **lock sul working tree**: rifiuta se un file del write-set ha modifiche non
   committate (cioè se B ci sta lavorando);
4. **audit**: ogni file toccato fuori dal write-set → corsia **RIFIUTATA**;
5. **verifica**: `tsc` + `vitest` dentro il worktree; rosso → rifiutata;
6. **patch pronta** in `tools/.patches/<nome>.patch`, **mai applicata da sola**.

Il merge lo fa A, uno alla volta, con `git apply --3way` e verifica completa.
Misure reali: C7 (3 file) **91 s**; pilota contenuti (6 round) **113 s**.

## Prossimi passi, in ordine di valore

1. **Spezzare `main.ts` → `src/scenes/`** (Boot, Title, Subject, Game, shared).
   Sblocca le corsie parallele sulle scene. È il moltiplicatore, non un vezzo.
2. **`ResultsScene`** + stelle + salvataggio in `localStorage` (il core
   `progress.ts` esiste già).
3. **Pannello BES** (profili + interruttori; `resolver.ts` è pronto).
4. **Audio** (`src/audio/synth.ts` esiste già).
5. **120 round**: pilota validato (`content/drafts/mat-7-9-l2.json`, 6 prove).
   Poi 20 pacchetti con le corsie, e **revisione umana obbligatoria**.
6. Integrare in `src/content/packs.ts` solo i pacchetti approvati.

## Problemi noti (veri, non ipotetici)

- **B è lento**: 13–30 min per patch, anche piccola. Il collo di bottiglia è il
  prefill locale a ogni turno + 5 tok/s. Non è un bug: è il modello.
- **La Content Factory** (`tools/content-factory/`) usa **lo stesso** LM Studio
  di B (`:1234`, `parallel=1`): non può girare in parallelo a B.
- **Dashboard**: nella sezione “Automazione notturna” la riga *Ultimo
  aggiornamento* è l’ultima del diario del sorvegliante (fermo). Non è un errore.
- **`main.ts` monolitico**: nessuna corsia può toccare le scene in parallelo.
  Vedi punto 1 dei prossimi passi.
- **Nessun test e2e clicca davvero il gioco**: i 7 test verificano caricamento e
  stato `Title`. Il click è stato collaudato a mano con Playwright (script
  `tmp-check-*.mjs`): il prossimo test da scrivere è il flusso completo.
