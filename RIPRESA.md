# RIPRESA — stato al 23/10/2026, 23:25

Punto di ripresa reale. Se qualcosa non torna, **fidati dei comandi**, non di
questo file: in fondo ci sono le tre verifiche che dicono la verità.

## Cosa funziona ORA (verificato, non dichiarato)

| Controllo | Valore |
|---|---|
| `npx tsc --noEmit` | **0 errori** |
| `npm test` (vitest) | **32/32** |
| `npx playwright test` | **9/9** |
| Flusso in browser | `Boot → Title → Subject → Game → Results` (+ `Settings`) |
| Una tappa intera | giocata dal test e2e in **13,5 s**, 6/6 |
| Stelle | 3 piene, salvate in `localStorage` come `sic.progress` |
| `window.__GIOCO__` | `{ scena, materia, scenaAttiva }` |

Ultimo commit: **`1d4c4f5`** — “ui: il testo scala col bottone”.

## Com'è fatto il codice oggi

```
src/main.ts             36 righe: creazione gioco + gancio di test
src/scenes/shared.ts    tipo Materia + get/set (nessun import circolare)
src/scenes/boot.ts      texture UI + icone → Title
src/scenes/title.ts     titolo, "Gioca" → Subject
src/scenes/subject.ts   4 materie → Game
src/scenes/game.ts      prove reali, avanzamento, 3 errori → si prosegue
src/scenes/results.ts   punteggio, 3 stelle, salvataggio, Rigioca/Titolo
src/scenes/settings.ts  9 profili BES, salvataggio immediato
src/core/settings.ts    loadSettings/saveSettings su localStorage
src/challenges/hit.ts   geometria pura delle aree cliccabili
```

## I due difetti di input trovati stanotte (importante, non rifarli)

1. **Aree cliccabili in coordinate sbagliate** — Phaser normalizza il punto
   locale e **poi** aggiunge `displayOrigin` (128×48 per la card 256×96). Un
   rettangolo centrato su 0 copriva solo una striscia del chip: il centro, dove
   tocca un bambino, non rispondeva. Ora la geometria sta in
   `src/challenges/hit.ts` (modulo puro) e lavora in **coordinate di texture**.
   Regressione coperta da `tests/hit.test.ts`, che simula la normalizzazione.
2. **Tocco contro trascinamento** — al rilascio, il drag riportava la tessera
   nella pozza, annullando il tocco. Ora c'è una soglia di **10 px**: sotto,
   agisce `onChipTap`; sopra, il drag.

Il primo difetto spiega anche perché il bottone "Rileggi" (scala 0,62) era
probabilmente morto al centro.

## Come si verifica una tappa (bot che gioca davvero)

`tmp-check-results.mjs` (temporaneo, gitignored) legge i testi dei GameObject
con `__GIOCO__.scenaAttiva`, prende le risposte dal pack vero
(`/src/content/packs.ts`) e tocca i chip. Stesso approccio nel test permanente
`tests/e2e/tappa.spec.ts`.

## Processi attivi (non ucciderli senza motivo)

| Cosa | PID | Note |
|---|---|---|
| dashboard `--watch 300` | 18276 | rigenera `dashboard.html` ogni 5 min |
| Vite di collaudo, porta 5210 | 56652 | serve il codice vero |
| Sessione B (`opencode run`) | — | **idle**, ultima chiusura 22:38:19 |

## Verifica in tre comandi

```bash
cd /Users/caioz/scuola-in-corsa
npx tsc --noEmit 2>&1 | grep -c "error TS"   # → 0
npx vitest run 2>&1 | grep -E "Tests"        # → 31 passed
npx playwright test 2>&1 | tail -2           # → 8 passed
```

## Corsie parallele — `tools/lane.sh`

```bash
bash tools/lane.sh <nome> <modello> <file-prompt> <file-write-set>
```

Garanzie meccaniche: worktree separato, lock tra corsie, lock sui file non
committati, audit del write-set (`git status -uall`), `tsc` + `vitest` dentro il
worktree, patch pronta in `tools/.patches/<nome>.patch` **mai applicata da sola**.

Misure: C7 **91 s** · pilota contenuti **113 s** · hook **77 s** · hit-area
**110 s** · tap-drag **66 s**. Merge manuale di A con `git apply --3way`.

## Prossimi passi, in ordine di valore

1. **Revisione umana dei due piloti** (`mat-7-9-l2`, `ita-8-10-l2`): è il
   cancello. Senza approvazione i contenuti non entrano in `src/content/`.
2. **Audio**: `src/audio/synth.ts` è già chiamato dalle prove; manca la prova
   che l'`AudioContext` parta al primo gesto e un interruttore.
3. **Scelta del livello**: `GameScene` usa `levels[0]`; con più tappe serve una
   schermata di scelta.
4. **Interruttori BES individuali**: oggi si scelgono i 9 profili; gli override
   per singola regola sono previsti dal resolver ma non hanno UI.
5. **Contenuti**: dopo l'approvazione, generare i pacchetti mancanti (2 minuti
   l'uno con le corsie) e integrarli in `src/content/packs.ts`.

## Problemi noti (veri, non ipotetici)

- **B è lento**: 13–30 min per patch. Il collo di bottiglia è il modello locale.
- **Content Factory** usa lo stesso LM Studio di B (`:1234`, `parallel=1`): non
  può girare in parallelo a B.
- **Un solo livello per materia**: `GameScene` usa `levels[0]`; la scelta del
  livello non esiste ancora.
- **La dashboard** mostra i numeri dell'ultimo giro, non è in tempo reale.
