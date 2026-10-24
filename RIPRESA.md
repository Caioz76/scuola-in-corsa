# RIPRESA — stato al 24/10/2026, 03:35

Punto di ripresa reale. Se qualcosa non torna, **fidati dei comandi**, non di
questo file: in fondo ci sono le tre verifiche che dicono la verità.

## Cosa funziona ORA (verificato, non dichiarato)

| Controllo | Valore |
|---|---|
| `npx tsc --noEmit` | **0 errori** |
| `npm test` (vitest) | **39/39** |
| `npx playwright test` | **21/21** |
| Flusso in browser | `Boot → Title → Subject → Game → Results` (+ `Settings`, `Levels`) |
| Una tappa intera | giocata dal test e2e in **14,8 s**, 6/6 |
| Stelle | 3 piene, salvate in `localStorage` come `sic.progress` |
| Audio | si sblocca al primo gesto; profilo Sordità = zero suoni e zero contesto |
| Contenuti in gioco | 4 materie; **matematica e italiano con 2 tappe** (12 esercizi revisionati) |
| Tappa successiva | da `Results` si passa alla tappa 2, senza tornare al titolo |
| Tutte le tappe | da `Subject` (in alto a destra) si sceglie direttamente qualsiasi tappa |
| Pausa e progresso | col profilo BES: "Prova 2 di 6" e pausa che riprende dallo stesso punto |
| Regole una per una | 19 regole con effetto reale, salvate subito in `sic.settings.overrides` |
| Progressi | dal titolo: stelle di ogni tappa e totale, senza rigiocare |
| Mondo di gioco | scenografia parallax per materia, Pico che corre, pista con checkpoint |
| `window.__GIOCO__` | `{ scena, materia, scenaAttiva, audio }` |

Ultimo commit di codice: **`54beed4`** — “progressi e alto contrasto” (poi mondo di gioco, in commit).

## Com'è fatto il codice oggi

```
src/main.ts             creazione gioco + gancio di test + avvio audio
src/scenes/shared.ts    tipo Materia + get/set (nessun import circolare)
src/scenes/boot.ts      texture UI + icone → Title
src/scenes/title.ts     titolo, "Gioca" → Subject
src/scenes/subject.ts   4 materie → Game (+ "Tutte le tappe" → Levels)
src/scenes/levels.ts    scelta diretta di ogni tappa, con le stelle
src/scenes/game.ts      prove reali, avanzamento, 3 errori → si prosegue
src/scenes/results.ts   punteggio, 3 stelle, salvataggio, Rigioca/Titolo
src/scenes/settings.ts  9 profili BES + 19 regole singole, salvataggio immediato
src/scenes/progress.ts  stelle per tappa + ultima partita (solo per l'insegnante)
src/art/world.ts        scenografia, Pico, pista e checkpoint (livello visivo)
src/art/backgrounds.ts  cieli/colline delle materie (texture in Boot)
src/art/pico.ts         frame di Pico (idle, corsa, salto, festa)
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

### Accesso diretto per l'insegnante

`src/scenes/levels.ts` ("Tutte le tappe") elenca le tappe di tutte le materie
con le stelle già prese. Ogni bottone imposta materia e tappa e avvia il gioco,
quindi non serve completare la prima per provare la seconda. Si apre dal
pulsante in alto a destra in `Subject`. Il percorso del bambino resta
`Materia → prima tappa` (un tocco in meno), ma l'insegnante arriva a qualsiasi
tappa in due tocchi.

### Pausa, progresso e ritmo (regole BES che ora agiscono)

Tre regole erano dichiarate ma senza effetto:

- **`pauseAllowed`** (ADHD, ansia): in `Game` compare "Pausa"; apre `PauseScene`,
  mette davvero in pausa timer, tween e input di `Game`, e "Continua" riprende
  dalla stessa prova.
- **`clearProgress`** (ADHD, autismo, disabilità intellettiva, ansia): in alto a
  destra si legge "Prova 2 di 6".
- **`slowPace`** (ADHD, autismo, discalculia, ansia): il feedback resta sullo
  schermo 1,6 volte più a lungo (900→1440 ms, 2600→4160 ms). Ora è anche un
  campo di `EffectiveConfig`, quindi verificabile dai test.

`tests/e2e/pausa.spec.ts` verifica pausa e ripresa reale; senza profilo né il
bottone né il contatore compaiono.

### Il mondo: una corsa, non un quiz su fondo nero (24/10)

Prima le scene erano rettangoli scuri con bottoni. Ora c'è un livello visivo
(`src/art/world.ts`) usato da Title, Subject, Levels, Game, Results, Progress e
Settings:

- **scenografia parallax** per materia (`src/art/backgrounds.ts`, texture create
  in Boot): cielo, sole, colline e simboli della materia;
- **Pico**, il robot giallo (`src/art/pico.ts`), corre in basso a sinistra con le
  ruote che girano;
- **pista** con un segmento per prova e la bandiera del traguardo: rispondendo
  giusto Pico salta, il mondo accelera e il segmento si accende; dopo tre errori
  Pico inciampa ma la corsa prosegue;
- un **velo scuro** sopra la scenografia tiene leggibili i testi chiari.

Regole BES collegate: `noDecoration` toglie la scenografia (resta la pista),
`reduceMotion` ferma lo scorrimento. `tests/e2e/mondo.spec.ts` verifica che il
terreno scorra davvero, che Pico salti alla risposta giusta e che le due regole
spengano ciò che devono.

La domanda resta un quiz: la corsa è il contesto, non un platformer. Se si vuole
un gioco d'azione vero (saltare ostacoli), è un'altra scelta di prodotto.

### Stato reale delle regole BES (aggiornato 24/10)

Dire "9 profili" non basta: ecco quali regole hanno un effetto verificabile e
quali sono ancora solo dichiarate. Fonte: uso di `EffectiveConfig` in `src/`.

| Regola | Effetto |
|---|---|
| `pauseAllowed` | ✅ pausa reale, ripresa dallo stesso punto |
| `clearProgress` | ✅ "Prova 2 di 6" |
| `slowPace` | ✅ feedback 1,6× più lunghi |
| `fewerOptions` | ✅ massimo 2 opzioni, la corretta resta |
| `hintFirst` | ✅ suggerimento subito (quiz) |
| `errorExplanation` | ✅ spiegazione dopo l'errore (quiz) |
| `dyslexiaFont`, `largerText` | ✅ font e scala del testo |
| `visualSupports` | ✅ riga numerica / base dieci / tabella |
| `tapInsteadOfDrag`, `largerTargets`, `noPrecision` | ✅ |
| `repeatPrompt` | ✅ bottone "Rileggi" |
| `musicOff`, `soundCues`, `visualInsteadOfAudio` | ✅ audio |
| `colorCoding`, `immediateFeedback`, `positiveReinforcement` | ✅ sempre attivi |
| `extraTime`, `noStreakPressure` | ✅ non c'è timer né serie da nascondere |
| `oneAtATime`, `predictableLayout` | ✅ una prova alla volta, layout fisso |
| `reduceMotion` | ✅ scenografia ferma (pista inclusa) |
| `noDecoration` | ✅ niente scenografia: resta la pista su fondo scuro |
| `highContrast` | ✅ testi tenui → bianco, bordo nero (sfondi invariati) |
| `shorterText`, `simpleLanguage` | ⚠️ i testi dei contenuti non vengono semplificati |
| `mascotGuide` | ⚠️ Pico c'è e corre, ma non guida: nessun suggerimento dato da lui |

Le ultime righe sono le uniche promesse non mantenute: o si implementano o si
tolgono dai profili. Non vanno lasciate come se funzionassero.

### Regole una per una (override individuali)

Da `Settings` → "Regole una per una" si accende/spegne ogni regola; l'override
vince sul profilo e resta salvato in `sic.settings.overrides`. La schermata
mostra **solo le 19 regole con un effetto verificabile**: esporre anche testi
brevi, linguaggio semplice e Pico guida sarebbe una promessa falsa (vedi
tabella sopra).

`makeToggle` in `src/challenges/ui.ts` disegna la riga e rende tutta la superficie
toccabile (non solo il testo). `tests/e2e/override.spec.ts` accende "Pausa quando
serve" senza profilo e verifica che il bottone "Pausa" compaia davvero in gioco.

## Bozze di contenuto in attesa di revisione umana

In `content/drafts/` ci sono 8 pacchetti validati ma **non ancora in gioco**
(6 prove ciascuno): `mat-7-9-l2` e `ita-8-10-l2` sono già stati approvati e
integrati; restano da leggere:

- `sci-8-10-l2` — viventi e ambiente (mammiferi, radici, catena alimentare, ciclo dell'acqua, farfalla)
- `sto-10-12-l2` — Grecia e Roma (democrazia ateniese, forme di governo, terme, date)
- `mat-7-9-l3` — moltiplicare e dividere (tabelline, divisioni, problemi, ordine)
- `ita-8-10-l3` — significati e tempi (sinonimi, contrari, passato, ordine alfabetico)
- `sci-8-10-l3` — materia, energia, pianeta (particelle, rinnovabili, stati, pianeti, semina)
- `sto-10-12-l3` — Medioevo e Rinascimento (feudo, Carlo Magno, peste, umanesimo)

Nessuno entra in `src/content/packs.ts` senza il via dell'umano.

### Progressi per l'insegnante

Dal titolo, in alto a destra, "Progressi" apre `src/scenes/progress.ts`: elenca
tutte le tappe di tutte le materie con le stelle salvate e il totale. Legge solo
`sic.progress` e `sic.history` (nessun dato personale). Mostra anche l'ultima
partita (punteggio e data): `Results` ora chiama `pushResult`, che prima non era
mai usato, quindi lo storico non veniva salvato affatto.
`tests/e2e/progressi.spec.ts` semina due tappe con 3 e 1 stella e una partita
5/6, e verifica che compaiano davvero.

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
npx vitest run 2>&1 | grep -E "Tests"        # → 39 passed
npx playwright test 2>&1 | tail -2           # → 21 passed
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
