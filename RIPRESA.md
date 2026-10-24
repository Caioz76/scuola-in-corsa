# RIPRESA — stato al 24/10/2026, 03:35

Punto di ripresa reale. Se qualcosa non torna, **fidati dei comandi**, non di
questo file: in fondo ci sono le tre verifiche che dicono la verità.

## Cosa funziona ORA (verificato, non dichiarato)

| Controllo | Valore |
|---|---|
| `npx tsc --noEmit` | **0 errori** |
| `npm test` (vitest) | **32/32** |
| `npx playwright test` | **11/11** |
| Flusso in browser | `Boot → Title → Subject → Game → Results` (+ `Settings`) |
| Una tappa intera | giocata dal test e2e in **14,8 s**, 6/6 |
| Stelle | 3 piene, salvate in `localStorage` come `sic.progress` |
| Audio | si sblocca al primo gesto; profilo Sordità = zero suoni e zero contesto |
| Contenuti in gioco | 4 materie; **matematica e italiano con 2 tappe** (12 esercizi revisionati) |
| Tappa successiva | da `Results` si passa alla tappa 2, senza tornare al titolo |
| `window.__GIOCO__` | `{ scena, materia, scenaAttiva, audio }` |

Ultimo commit: **`46ebd69`** — “contenuti: seconda tappa di matematica e italiano”.

## Com'è fatto il codice oggi

```
src/main.ts             creazione gioco + gancio di test + avvio audio
src/scenes/shared.ts    tipo Materia + get/set (nessun import circolare)
src/scenes/boot.ts      texture UI + icone → Title
src/scenes/title.ts     titolo, "Gioca" → Subject
src/scenes/subject.ts   4 materie → Game
src/scenes/game.ts      prove reali, avanzamento, 3 errori → si prosegue
src/scenes/results.ts   punteggio, 3 stelle, salvataggio, Rigioca/Titolo
src/scenes/settings.ts  9 profili BES, salvataggio immediato
src/core/settings.ts    loadSettings/saveSettings su localStorage (+ evento)
src/audio/synth.ts      motore Web Audio procedurale (nessun asset)
src/audio/apply.ts      regole BES → audio, unlock al primo gesto
src/challenges/hit.ts   geometria pura delle aree cliccabili
```

## Audio: cosa è cambiato (24/10)

Prima `synth` era un motore spento: `unlock()`, `setSfx/setMusic` e
`startMusic()` non venivano mai chiamati, quindi la musica non partiva e le
regole BES (`soundCues`, `musicOff`, `visualInsteadOfAudio`) erano ignorate.

Ora `src/audio/apply.ts` fa da ponte:

- all'avvio legge le impostazioni, risolve il profilo e applica `cfg.sfx` /
  `cfg.music`;
- al **primo gesto vero** (`pointerdown`/`keydown`) chiama `synth.unlock()`;
  la musica parte solo quando l'`AudioContext` è davvero `running`;
- `saveSettings` emette `sic:settings`, così cambiare profilo spegne o
  riaccende l'audio subito, senza ricaricare;
- col profilo **Sordità** non viene nemmeno creato un `AudioContext`: non è
  volume a zero, è audio assente. Il segnale visivo equivalente esiste già
  (`flashCue` in `src/challenges/ui.ts`);
- `__GIOCO__.audio` espone `{ sfx, music, running, musicPlaying }` per gli e2e.

`tests/e2e/audio.spec.ts` verifica i due fatti: prima del tocco `running` è
falso, dopo è vero e la musica suona; con Sordità resta tutto falso anche dopo
il tocco.

## Seconda tappa: contenuti approvati e raggiungibili (24/10)

I due piloti (matematica 7-9 e italiano 8-10, 6 prove ciascuno) sono stati
revisionati dall'umano e sono ora **dentro** `src/content/packs.ts` come
`mat-7-9-l2` e `ita-8-10-l2`. Due suggerimenti sono stati corretti prima
dell'ingresso: «ogni passo aggiunge una decina» e «inizia dal numero più
piccolo».

Per raggiungerli non serve una schermata in più: `Results` mostra **Tappa
successiva** quando esiste il livello seguente. La tappa scelta vive in
`src/scenes/shared.ts` (`getLevel/setLevel`), `GameScene` la usa e ricade sulla
prima se non è valida (es. cambio materia). L'e2e gioca la tappa 1, tocca
«Tappa successiva» e verifica che compaia la prima domanda della tappa 2.

Le bozze restano in `content/drafts/` come traccia della revisione; il test
`tests/content-drafts.test.ts` continua a validarle.

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
npx vitest run 2>&1 | grep -E "Tests"        # → 32 passed
npx playwright test 2>&1 | tail -2           # → 11 passed
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
