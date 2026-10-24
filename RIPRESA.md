# RIPRESA — stato al 24/10/2026

> **Proprietà e Licenza**: `© 2026 Claudio Borsotti — Applicazione in fase di sviluppo. Tutti i diritti riservati. Vietata la riproduzione e la diffusione senza autorizzazione.` (vedi file [`LICENSE`](LICENSE)).

Punto di ripresa reale. Se qualcosa non torna, **fidati dei comandi**, non di
questo file: in fondo ci sono le verifiche che dicono la verità.

## Cosa funziona ORA (verificato, non dichiarato)

| Controllo | Valore |
|---|---|
| `npx tsc --noEmit` | **0 errori** |
| `npm test` (vitest) | **43/43 test unitari passati (<1 s)** |
| `npx playwright test` | **39/39 test E2E verificati** |
| Flusso in browser | `Boot → Title → Subject → Game → Results` (+ `Settings`, `Levels`, `Progress`, `Pause`) |
| Una tappa intera | giocata dal test e2e in **14,8 s**, 6/6 |
| Stelle | 3 piene, salvate in `localStorage` come `sic.progress` |
| Audio | si sblocca al primo gesto; profilo Sordità = zero suoni e zero contesto |
| Contenuti in gioco | **184 prove totali**: 4 materie con **3 tappe ciascuna** (72 prove in `packs.ts`) + **112 prove extra** nella banca domande (`question-bank.ts`, 28 per materia) |
| Anni scolastici (8 classi) | **Primaria 1ª–5ª (`P1`–`P5`)** e **Secondaria I grado 1ª–3ª (`S1`–`S3`)**: calibrano difficoltà (1–3), tappa iniziale, velocità Runner (360–560 px/s) e numero opzioni |
| Estrazione randomica | `selectRoundsForGame` unisce le prove della tappa al bacino dell'anno scolastico, mescola senza ripetere le prove appena giocate (`randomQuestions`, disattivabile in Impostazioni) |
| Tappa successiva | da `Results` si passa alla tappa seguente, senza tornare al titolo |
| Tutte le tappe | da `Subject` (in alto a destra) si sceglie direttamente qualsiasi tappa |
| Navigazione in partita | barra **Pausa / Esci** sempre visibile (HTML sopra il canvas, safe area, ≥44 px); pausa reale e ripresa dallo stesso punto; uscita con conferma |
| Profilo BES e pausa | col profilo: "Prova 2 di 6"; "Pausa quando serve" ferma la partita da sola se si cambia app o si nasconde la pagina |
| Regole BES una per una | **22/22 regole tutte con effetto reale** (incluse `shorterText`, `simpleLanguage` e `mascotGuide`), salvate subito in `sic.settings.overrides` |
| Modalità di gioco | **Quiz** (bottoni) o **Runner** (cartelli sulla pista), scelta in Impostazioni |
| Grafica | **2D** o **3D** (terza persona, Three.js), scelta separata dalla modalità |
| Homepage (`Title`) | Level-up grafico in stile Wii pastello, scenografia viva con Pico in corsa e navigazione immediata |
| Telefono | layout a tutto schermo senza scroll; in verticale invita a ruotare; provato su iPhone 13 emulato |
| Pubblicazione Gioco | **https://caioz76.github.io/scuola-in-corsa/** — GitHub Pages, aggiornata a ogni push su `main` |
| Dashboard Smartphone | **https://caioz76.github.io/scuola-in-corsa/dashboard.html** (e in LAN `http://192.168.1.188:5211/dashboard.html`), rigenerabile in ~2 s con `bash tools/dashboard.sh --fast` |
| Licenza | **© 2026 Claudio Borsotti** (`LICENSE`), tutti i diritti riservati, inclusa anche in `dist/ScuolaInCorsa/` |
| Progressi | dal titolo: stelle di ogni tappa e totale, senza rigiocare |
| Mondo di gioco | scenografia parallax per materia, Pico che corre, pista con checkpoint |
| `window.__GIOCO__` | `{ scena, materia, scenaAttiva, audio, treD, rounds }` |

Ultimo commit di codice: leggi `git log -1 --oneline` (un hash scritto a mano
invecchia subito).

## Com'è fatto il codice oggi

```
src/main.ts               creazione gioco + gancio di test + avvio audio
src/scenes/shared.ts      tipo Materia + get/set (nessun import circolare)
src/scenes/boot.ts        texture UI + icone → Title
src/scenes/title.ts       homepage (level-up grafico), "Gioca" → Subject
src/scenes/subject.ts     4 materie → Game (+ "Tutte le tappe" → Levels)
src/scenes/levels.ts      scelta diretta di ogni tappa, con le stelle
src/scenes/game.ts        prove reali, estrazione per anno, guida Pico, 3 errori → si prosegue
src/scenes/results.ts     punteggio, 3 stelle, salvataggio, Rigioca/Tappa succ./Titolo
src/scenes/settings.ts    9 profili BES + 22 regole singole + 8 anni scolastici
src/scenes/progress.ts    stelle per tappa + ultima partita (solo per l'insegnante)
src/content/packs.ts      12 tappe (3 per materia, 72 prove) + selectRoundsForGame
src/content/question-bank.ts  banca estesa (112 prove, 28 per materia) targata per anno (P1..P5, S1..S3)
src/bes/resolver.ts       resolver BES (22 regole) + 8 anni scolastici (ANNI_SCOLASTICI)
src/art/world.ts          scenografia, Pico, pista e checkpoint (livello visivo 2D)
src/art/three-world.ts    mondo 3D in terza persona (Three.js) e cancello con porte
src/ui/nav.ts             barra HTML Pausa/Esci, sempre disponibile
src/ui/runner-answers.ts  risposte HTML in basso per il Runner 3D
src/art/backgrounds.ts    cieli/colline delle materie (texture in Boot)
src/art/pico.ts           frame di Pico (idle, corsa, salto, festa)
src/core/settings.ts      loadSettings/saveSettings su localStorage (+ evento)
src/audio/synth.ts        motore Web Audio procedurale (nessun asset)
src/audio/apply.ts        regole BES → audio, unlock al primo gesto
src/challenges/hit.ts     geometria pura delle aree cliccabili
src/challenges/ui.ts      testi BES, testoSemplice (shorterText/simpleLanguage), bottoni, banner
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

- **`pauseAllowed`** (ADHD, ansia): la pausa manuale c'è sempre per tutti; con
  questa regola la partita si mette in pausa **da sola** se il bambino esce
  dalla pagina o cambia app, così al ritorno ritrova la prova dov'era.
- **`clearProgress`** (ADHD, autismo, disabilità intellettiva, ansia): in alto a
  destra si legge "Prova 2 di 6".
- **`slowPace`** (ADHD, autismo, discalculia, ansia): il feedback resta sullo
  schermo 1,6 volte più a lungo (900→1440 ms, 2600→4160 ms). Ora è anche un
  campo di `EffectiveConfig`, quindi verificabile dai test.

La barra **Pausa / Esci** è HTML (`src/ui/nav.ts`) e non Phaser: così resta
grande e toccabile anche quando il canvas è scalato su un telefono. "Esci" non
butta via la tappa per un tocco sbagliato: chiede conferma. `tests/e2e/pausa.spec.ts`
verifica pausa, ripresa, uscita con conferma e pausa automatica; senza profilo
il contatore non compare, ma la barra sì.

### Il mondo: una corsa, non un quiz su fondo nero (24/10)

Prima le scene erano rettangoli scuri con bottoni. Ora c'è un livello visivo
(`src/art/world.ts`) usato da Title, Subject, Levels, Game, Results, Progress e
Settings:

- **scenografia parallax** per materia (`src/art/backgrounds.ts`, texture create
  in Boot): cielo, sole, colline e simboli della materia;
- **Pico**, il robot giallo (`src/art/pico.ts`), corre in basso a sinistra con le
  ruote che girano;
- **pista** con un cerchio per prova e la bandiera del traguardo: rispondendo
  giusto Pico salta, il mondo accelera e lui **avanza al checkpoint successivo**
  (a fine tappa arriva alla bandiera); dopo tre errori inciampa ma la corsa
  prosegue;
- un **velo bianco** sopra la scenografia tiene leggibili i testi scuri.

Regole BES collegate: `noDecoration` toglie la scenografia (resta la pista),
`reduceMotion` ferma lo scorrimento. `tests/e2e/mondo.spec.ts` verifica che il
terreno scorra davvero, che Pico salti alla risposta giusta e che le due regole
spengano ciò che devono.

### Due modi di giocare: Quiz e Runner (24/10)

La modalità si sceglie in **Impostazioni → Modalità: Quiz / Runner** e viene
salvata in `sic.settings.mode` (default `quiz`). Non è una regola BES: è una
scelta di prodotto, quindi resta anche cambiando profilo.

- **Quiz** — le prove a scelta sono bottoni in basso; Pico avanza di checkpoint
  in checkpoint.
- **Runner** — le stesse prove diventano **cartelli piantati sulla pista**, che
  entrano da destra e si fermano davanti a Pico. Toccando un cartello, Pico
  salta e lo testa: se è giusto esplode in stelline, se è sbagliato il cartello
  cade e si riprova (3 tentativi, come nel quiz). Pico torna al suo posto a ogni
  salto, mentre il mondo continua a scorrere.

Riordino e abbinamento restano uguali nelle due modalità: non hanno un
equivalente onesto in corsa e fingere il contrario sarebbe peggio.

I cartelli usano gli stessi aiuti BES dei bottoni: numero di opzioni, font e
scala del testo, alto contrasto, suggerimento, "Rileggi", ritmo lento. Non c'è
timer in nessuna delle due modalità.

`tests/e2e/runner.spec.ts` verifica la scelta salvata, la sostituzione dei
bottoni con i cartelli, il salto di Pico verso la risposta giusta,
`fewerOptions` → 2 cartelli e che tre errori non blocchino la corsa.
`tests/e2e/tappa.spec.ts` continua a giocare una tappa intera in modalità Quiz.

### Grafica 2D e 3D, scelta separata (24/10)

In **Impostazioni → Grafica: 2D / 3D** si sceglie come si vede il gioco. È una
scelta indipendente da Quiz/Runner: si può giocare Quiz o Runner in entrambe.
Sta in `sic.settings.graphics` (default `2d`), normalizzata in
`src/core/settings.ts`.

- **2D** — il side-scroller disegnato con Phaser (`src/art/world.ts`).
- **3D** — un canvas Three.js sotto l'interfaccia (`src/art/three-world.ts`):
  Pico di spalle, camera in terza persona che lo segue, pista con cordoli che
  scorrono, prato a strisce, alberi, sassi, fiori, nuvole, sole con alone.
  Il canvas 3D copre tutto lo schermo (anche i telefoni più larghi di 16:9);
  Phaser resta sopra, trasparente, e continua a gestire input, testi e prove.

In **Runner 3D** la corsa è un vero runner a corsie:

- **quattro corsie** (`CORSIE = [-3.3, -1.1, 1.1, 3.3]`), Pico parte nella
  seconda da sinistra. Si cambia corsia con ←/→ (o A/D), con lo swipe
  orizzontale o con i bottoni **SX / DX** in basso a sinistra;
- **salto** con Spazio/↑ (o W), swipe verso l'alto o bottone **Salta**: supera i
  coni bassi; **scivolata** con ↓ (o S), swipe verso il basso o bottone **Giù**:
  passa sotto le sbarre alte;
- **ostacoli** (coni, sbarre, cesti) tolgono un cuore e azzerano la serie; non
  fermano mai la partita: con zero cuori si riprende con un cuore e una breve
  frenata. **Stelline** danno punti e caricano il **turbo**; a barra piena Pico
  accelera, sfonda gli ostacoli ed è invulnerabile per qualche secondo;
- **HUD** in alto a destra (`src/ui/runner-hud.ts`): cuori, stelline, punti,
  moltiplicatore di serie e barra del turbo. È HTML, quindi leggibile anche
  quando il canvas è scalato;
- **risposte** in una barra HTML in basso (`src/ui/runner-answers.ts`), sotto
  Pico: compaiono solo a cancello fermo, si nascondono in pausa e non coprono
  il badge "?". Si risponde toccando il bottone o allineando Pico alla porta e
  saltando. La risposta giusta illumina la porta di verde, aumenta la serie,
  ridà un cuore e fa ripartire la corsa; quella sbagliata fa tremare la porta e
  si riprova; dopo 3 errori la porta giusta si apre da sola.

Le **porte** del cancello sono riferimenti visivi colorati e trasparenti, senza
etichette. In **Quiz 3D** i bottoni restano l'interfaccia Phaser: il 3D è il
mondo, non un modo diverso di rispondere. Riordino e abbinamento restano 2D e
fermano il mondo.

Regole BES: con **alto contrasto** il 3D si spegne e si torna al 2D (fondo
chiaro uniforme e testi neri); con **riduci i movimenti** il mondo resta fermo
e il cancello si presenta subito; `noDecoration` toglie la scenografia.

`tests/e2e/runner.spec.ts` verifica che in 3D, durante la corsa, si vedano HUD
e comandi e non le risposte; che corsie, salto, scivolata, stelline e perdita di
un cuore funzionino davvero; che al varco le risposte arrivino nella metà bassa
dello schermo, senza coprire Pico; che un tocco sbagliato venga registrato senza
cambiare domanda; che quello giusto (o il salto sulla porta allineata) porti al
cancello successivo; che in verticale la domanda resti in alto e le risposte in
basso; che il Quiz 3D mostri i bottoni e che l'alto contrasto spenga il canvas
3D.

### Telefono e pubblicazione (24/10)

- `src/style.css`: il gioco occupa tutto lo schermo, niente scroll né zoom;
- la barra **Pausa / Esci** e le risposte del Runner 3D sono HTML, con
  `env(safe-area-inset-*)` e bottoni da almeno 46 px reali;
- in verticale il canvas Phaser 16:9 si aggancia in alto sotto la barra
  (`body.con-3d`), così la domanda non finisce sopra il cancello; su telefono
  l'HUD scende sotto la barra e il canvas con lui; le risposte restano in basso
  e l'avviso "Ruota il telefono" si nasconde quando sono aperte o quando il 3D
  si adatta già al verticale;
- `index.html` usa `viewport-fit=cover` per i telefoni con notch;
- verificato con iPhone 13 emulato in landscape **e** in verticale (tap Title →
  Subject → Game, cancello fermo, pausa, conferma uscita), senza errori
  console.

`.github/workflows/deploy.yml` costruisce e pubblica su GitHub Pages a ogni push
su `main`: typecheck, test unitari, build, deploy di `dist/ScuolaInCorsa`. La
build è un solo `index.html`, quindi funziona anche sotto `/<repo>/`.

Il repository è **pubblico**: https://github.com/Caioz76/scuola-in-corsa
Il gioco è online: **https://caioz76.github.io/scuola-in-corsa/**

Ultimo deploy verificato (24/10): workflow verde, sito raggiungibile, prova da
iPhone 13 emulato in landscape (Impostazioni → Runner → 3D → partita con 4
cartelli), nessun errore console. Anche la build single-file è stata provata in
3D: Three.js è dentro l'unico `index.html` (1,86 MB, 489 kB gzip).

Per aggiornare il sito basta `git push origin main`. Se il workflow fallisce,
GitHub non tocca l'ultima versione pubblicata.

Nota sull'autenticazione: su questa macchina `gh` è installato e l'accesso è
dell'account **Caioz76**, con scope `repo` + `workflow` (quest'ultimo serve per
pubblicare il file del workflow). L'autore dei commit è stato riallineato a
`Caioz76 <Caioz76@users.noreply.github.com>`.

### Stile grafico: ispirazione Wii, non copia (24/10)

Richiesta: «uno stile ispirato alla Nintendo Wii, cogli solo ispirazione».
Il risultato è un tema chiaro e morbido, disegnato da zero:

- **palette** (`src/art/palette.ts`): fondo `#eaf6ff`, superfici bianche, pastelli;
  i ruoli del testo stanno in `T` (titolo blu, corpo ardesia, tenui grigio);
- **bottoni e pannelli** (`src/art/textures.ts`): niente contorni neri, bordo in
  una tinta più scura del corpo, ombra morbida staccata, riflesso ampio;
- **sfondi** (`src/art/backgrounds.ts`): cieli pastello con sole e colline, più un
  tema neutro `scuola` per titolo, materia e impostazioni;
- **Pico** (`src/art/pico.ts`): visiera azzurra e ombra morbida;
- **font** (`src/challenges/ui.ts`): Arial Rounded → Trebuchet → Segoe UI, con
  ricaduta su Verdana; il profilo dislessia mantiene Comic Sans;
- **pausa** (`src/scenes/pause.ts`): scheda bianca sopra un velo quasi pieno, così
  il quiz dietro non sembra più cliccabile;
- **alto contrasto**: ora tutto il testo diventa nero pieno e la scenografia si
  spegne, invece di lasciare testi chiari su fondo chiaro.

Difetti di layout trovati guardando gli screenshot e corretti: il bottone
"Rileggi" usciva dallo schermo a destra, la bandiera finiva sotto i bottoni dei
risultati, i bottoni della pausa si sovrapponevano alle opzioni del quiz, il
feedback "Giusto!" copriva le opzioni e Pico (ora compare sopra i bottoni nelle
prove a scelta, in basso nelle altre).

### Selezione per Anno Scolastico: Primaria (1ª–5ª) e Secondaria I grado (1ª–3ª) (24/10)

In **Impostazioni → Anno scolastico** (e riassunto nell'intestazione di Impostazioni e in `GameScene`) lo studente o l'insegnante può scegliere fra **8 classi** (`ANNI_SCOLASTICI` in `src/bes/resolver.ts`, salvate in `sic.settings.schoolYear`, default `P3`):

- **Scuola Primaria**:
  - `P1` (**1ª Primaria**): difficoltà 1/3, tappa iniziale 1, massimo 3 opzioni nei quiz, velocità Runner `360 px/s`;
  - `P2` (**2ª Primaria**): difficoltà 1/3, tappa iniziale 1, velocità Runner `420 px/s`;
  - `P3` (**3ª Primaria**): difficoltà 1/3, tappa iniziale 1, velocità Runner `480 px/s`;
  - `P4` (**4ª Primaria**): difficoltà 2/3, tappa iniziale 2, velocità Runner `480 px/s`;
  - `P5` (**5ª Primaria**): difficoltà 2/3, tappa iniziale 3, velocità Runner `500 px/s`;
- **Scuola Secondaria di primo grado**:
  - `S1` (**1ª Secondaria**): difficoltà 3/3, tappa iniziale 3, velocità Runner `520 px/s`;
  - `S2` (**2ª Secondaria**): difficoltà 3/3, tappa iniziale 3, velocità Runner `540 px/s`;
  - `S3` (**3ª Secondaria**): difficoltà 3/3, tappa iniziale 3, velocità Runner `560 px/s`.

### Banca Domande Estesa ed Estrazione Randomica (24/10)

Tutte e 4 le materie (**Matematica**, **Italiano**, **Scienze**, **Storia**) dispongono ora di **3 tappe complete** ciascuna in `src/content/packs.ts` (12 tappe × 6 prove = **72 prove strutturate**), affiancate dalla banca domande per anno scolastico in `src/content/question-bank.ts` (**112 prove extra**, 28 per materia, etichettate per `years: ['P1', ...]`), per un totale di **184 prove didattiche** nel gioco.

All'avvio di ogni partita, `selectRoundsForGame(pack, level, settings)` in `src/content/packs.ts`:
- se `settings.randomQuestions !== false` (attivo di default, commutabile nella scheda *Anno scolastico* in Impostazioni), unisce le prove della tappa selezionata con quelle di `BANCA_DOMANDE[pack.subject]` compatibili con l'anno scolastico attivo;
- evita di riproporre subito le prove appena uscite nella partita precedente (`ultimiRoundIds`) e mescola l'ordine tenendo prima 4 prove a scelta (`quiz`/`image`, ideali per i varchi del Runner) e in coda 2 prove interattive (`dragdrop`/`sequence`);
- espone le prove estratte tramite `getActiveRounds()` e `window.__GIOCO__.rounds`.

### Level-up Grafico della Homepage (`TitleScene`) (24/10)

La schermata iniziale (`src/scenes/title.ts`) accoglie il giocatore con il tema pastello ispirato alla Nintendo Wii, scenografia animata a scorrimento con Pico in corsa, tipografia curata ad alta leggibilità e pulsanti immediati per **Gioca**, **Impostazioni** e **Progressi**.

### Stato reale delle regole BES: tutte le 22 regole attive (aggiornato 24/10)

Tutte le **22 regole BES** hanno ora un effetto reale e verificabile nel motore di gioco (`EffectiveConfig` in `src/bes/resolver.ts`, `src/challenges/ui.ts` e `src/scenes/game.ts`):

| Regola | Effetto |
|---|---|
| `pauseAllowed` | ✅ pausa automatica quando la pagina viene nascosta (la pausa manuale è sempre disponibile) |
| `clearProgress` | ✅ "Prova 2 di 6" |
| `slowPace` | ✅ feedback 1,6× più lunghi e movimento ridotto |
| `fewerOptions` | ✅ massimo 2 opzioni, la corretta resta |
| `hintFirst` | ✅ suggerimento subito (quiz) |
| `errorExplanation` | ✅ spiegazione dopo l'errore (quiz) |
| `dyslexiaFont`, `largerText` | ✅ font Comic Sans spaziato e scala del testo `1.25×` |
| `visualSupports` | ✅ riga numerica / base dieci / tabella |
| `tapInsteadOfDrag`, `largerTargets`, `noPrecision` | ✅ tocco al posto del drag, bersagli `1.3×`, area di tocco permissiva |
| `repeatPrompt` | ✅ bottone "Rileggi" |
| `musicOff`, `soundCues`, `visualInsteadOfAudio` | ✅ controllo completo Web Audio e lampeggio visivo (`flashCue`) |
| `colorCoding`, `immediateFeedback`, `positiveReinforcement` | ✅ sempre attivi |
| `extraTime`, `noStreakPressure` | ✅ non c'è timer punitivo né serie da nascondere |
| `oneAtATime`, `predictableLayout` | ✅ una prova alla volta, layout fisso |
| `reduceMotion` | ✅ scenografia ferma (pista inclusa) |
| `noDecoration` | ✅ niente scenografia: resta la pista pulita |
| `highContrast` | ✅ testi nero pieno `#000000` su fondo chiaro, 3D disattivato |
| `shorterText`, `simpleLanguage` | ✅ `testoSemplice(str, cfg)` in `src/challenges/ui.ts` accorcia le consegne, rimuove subordinate secondarie e semplifica il lessico |
| `mascotGuide` | ✅ in `src/scenes/game.ts` Pico accompagna lo studente passo per passo con messaggi guida contestuali al tipo di prova e all'esito |

### Regole una per una (override individuali — 22/22)

Da `Settings` → "Regole una per una" si accende/spegne ciascuna delle **22 regole** (`REGOLE_UI` in `src/scenes/settings.ts`); l'override vince sul profilo e resta salvato in `sic.settings.overrides`.

`makeToggle` in `src/challenges/ui.ts` disegna la riga e rende tutta la superficie
toccabile (non solo il testo). `tests/e2e/override.spec.ts` accende "Pausa quando
serve" senza profilo e verifica che la regola arrivi fino al gioco: la pagina
nascosta mette la partita in pausa.

### Licenza e Proprietà Intellettuale (`LICENSE`) (24/10)

Il progetto è tutelato dal file [`LICENSE`](LICENSE) nella radice del repository (copiato anche in `dist/ScuolaInCorsa/LICENSE` durante il deploy):

> `© 2026 Claudio Borsotti — Applicazione in fase di sviluppo. Tutti i diritti riservati. Vietata la riproduzione e la diffusione senza autorizzazione.`

### Dashboard di Controllo Smartphone & Flag `--fast` (24/10)

Lo script `tools/dashboard.sh` genera `dashboard.html` con layout responsive per smartphone, barra di stato fissa in alto, pulsanti grandi per i link diretti (Gioco e Dashboard in rete locale Wi-Fi `:5211` e su GitHub Pages), stato della squadra agenti Antigravity e conteggio dinamico delle 184 prove per materia e per gli 8 anni scolastici:

- `bash tools/dashboard.sh --fast` rigenera `dashboard.html` in **~2 secondi** (esegue `tsc --noEmit` + `vitest` e conta i test E2E senza attendere i 3 minuti di Playwright);
- `.github/workflows/deploy.yml` esegue `bash tools/dashboard.sh --fast` a ogni push e pubblica `dashboard.html` e `LICENSE` su **`https://caioz76.github.io/scuola-in-corsa/dashboard.html`**.

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

## Processi e monitoraggio

| Cosa | Comando / URL | Note |
|---|---|---|
| Dashboard rapida (~2 s) | `bash tools/dashboard.sh --fast` | aggiorna `dashboard.html` (anche pubblicata su GitHub Pages) |
| Vite di collaudo, porta 5211 | `http://192.168.1.188:5211/` | `--host`, raggiungibile da smartphone sulla stessa Wi-Fi |
| Sito e Dashboard Online | `https://caioz76.github.io/scuola-in-corsa/` | e `/dashboard.html`, aggiornati da GitHub Actions |

## Verifica in tre comandi

```bash
cd /Users/caioz/scuola-in-corsa
npx tsc --noEmit 2>&1 | grep -c "error TS"   # → 0
npx vitest run 2>&1 | grep -E "Tests"        # → tutti passati
npx playwright test 2>&1 | tail -2           # → 39 passed
```

## Corsie parallele — `tools/lane.sh`

```bash
bash tools/lane.sh <nome> <modello> <file-prompt> <file-write-set>
```

Garanzie meccaniche: worktree separato, lock tra corsie, lock sui file non
committati, audit del write-set (`git status -uall`), `tsc` + `vitest` dentro il
worktree, patch pronta in `tools/.patches/<nome>.patch` **mai applicata da sola**.

## Prossimi passi, in ordine di valore

1. **Collaudo in classe su tablet e smartphone**: provare con alunni della Primaria (1ª–5ª) e Secondaria di I grado (1ª–3ª) sia la modalità Quiz sia il Runner 2D/3D.
2. **Espansione continua della banca domande** (`src/content/question-bank.ts`): aggiungere nuovi quesiti curricolari per ciascuno degli 8 anni scolastici o tramite pacchetti personalizzati dell'insegnante (`packs.custom`).
3. **Monitoraggio da remoto**: consultare `https://caioz76.github.io/scuola-in-corsa/dashboard.html` o `http://192.168.1.188:5211/dashboard.html` da smartphone.
