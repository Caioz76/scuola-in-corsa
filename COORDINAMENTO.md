# COORDINAMENTO — Scuola in Corsa

> **File-contratto tra sessioni.** Serve a due sessioni OpenCode che lavorano in
> parallelo **senza parlarsi**, sullo stesso progetto (`/Users/caioz/scuola-in-corsa`).
> Chi lavora qui **legge prima** e **aggiorna dopo**. È l'unico punto di verità
> condiviso oltre al codice stesso.

**Ultimo aggiornamento:** 22 ottobre 2026
**Aggiornato da:** sessione A (coordinamento)

---

## 1. REGOLA D'ORO — chi tocca cosa

Due sessioni sullo stesso codice **si danneggiano**. La divisione è rigida:

| **Sessione** | Ruolo | Aree di lavoro | NON tocca |
|---|---|---|---|
| **A — Coordinamento** (questa) | Produce materiale, analisi, contenuti | `tools/`, `docs/`, file `.md`, README | `src/` |
| **B — Build** (terminale principale) | Scrive il codice del gioco | `src/`, `tests/`, `tsconfig.json`, `vite.config.ts` | `tools/` |
| **C — Revisione** (Antigravity/Gemini, quando attivo) | **Verifica** il codice di B, senza modificarlo | `REVISIONI.md` (solo questo file) | **tutto il resto** |

> 🔑 **Le sessioni usano MODELLI DIVERSI** (verificato 22/10/2026):
> **A** gira su `opencode/big-pickle` (modello remoto, **non usa la GPU**).
> **B** gira su `lmstudio/qwen/qwen3.8-27b` (locale, **usa la GPU**).
> **C**, se attivo, gira su **Gemini (cloud)** — non usa la GPU, quindi **può
> lavorare in parallelo a B** senza contesa. Verifica sempre con:
> `sqlite3 ~/.local/share/opencode/opencode.db "SELECT id,model FROM session_v2 ORDER BY time_updated DESC LIMIT 5;"`

> ⚠️ **C è un REVISORE, non un secondo B.** Scrive **solo** in `REVISIONI.md`.
> Non tocca `src/`, non tocca `tools/`. La sua funzione è **giudicare codice che
> non ha scritto** — è il vantaggio di avere una terza testa indipendente.
> Se C trovasse un bug, **non lo corregge**: lo segnala in `REVISIONI.md`, e B (o
> l'utente) decide. Vedi §3.6.

**Regola:** se non sei sicuro di chi possiede un file, **non scriverlo**. Aggiungi una nota in fondo a questo file.

---

## 2. STATO CONDIVISO (aggiornare SEMPRE)

| Campo | Valore |
|---|---|
| **Fase corrente** | Fix `tsc` (patch A→G in valutazione da B) |
| **Bloccante attuale** | 36 errori `tsc` in `src/` — patch scritta, B la sta valutando |
| **Modello attivo** | `lmstudio/qwen/qwen3.8-27b` (ctx 32768, parallel 1, flash_attention on, ~12 tok/s) |
| **Ultimo `tsc` pulito?** | ❌ NO (36 errori) |
| **Sessione C** | ⚪ non avviata — revisore indipendente (§3.6) |

### Semaforo delle sessioni

| Sessione | Stato | Sta lavorando su |
|---|---|---|
| **A** | 🟢 attiva | documentazione, strumenti, dashboard, e2e |
| **B** | 🟢 attiva | patch dei tipi + scene (modello locale in uso) |
| **C** | 🟢 installata, pronta | (revisore indipendente — vede §3.6; `agy`, modello cloud) |

> Aggiorna questa tabella quando inizi/finisci. Se la tua sessione è ⚪ inattiva,
> le altre possono procedere senza rischi di collisione.

---

## 3. INTERFACCE STABILI (non rompere senza avvisare)

Queste sono le "API" tra le due sessioni. **Cambiarle rompe il lavoro dell'altra.**

### 3.1 Tipi dei contenuti — `src/content/types.ts`
I tipi `Pack`, `Level`, `Round`, `QuizRound`, `ImageRound`, `DragDropRound`, `SequenceRound`
sono consumati dalla **content factory** (`tools/content-factory/`).

> ⚠️ **PATCH A IN SOSPESO:** la patch proposta trasforma `DragDropRound` da
> interfaccia singola a **union discriminata** (`SortRound | MatchDragDropRound`).
> Se applicata, `tools/content-factory/index.ts` va riallineato.
> **Chi applica la patch A: aggiorni anche la factory o avvisi qui.**

### 3.2 Validatore — `src/content/validate.ts`
La factory usa `validatePack()` come **fonte di verità** per accettare i contenuti.
Se cambia la firma, avvisare.

### 3.3 Icone — `src/art/icons-painters.ts`
La factory ha una **copia dell'elenco icone** in `tools/content-factory/index.ts`
(costante `ICON_IDS`). **Se si aggiungono painter, aggiornare entrambi.**

### 3.4 Storage — chiavi `localStorage`
Prefisso `sic.`: `settings`, `student`, `progress`, `history`, `packs.custom`.
La factory **non** usa localStorage (scrive su file in `tools/.../out/`).

### 3.5 Stato del gioco su `window.__GIOCO__` — RICHIESTA A B (sblocca i test e2e)

> **Perché:** i test di flusso (`tests/e2e/flusso.spec.ts`, sessione A) verificano
> titolo → scelta materia → partita → risultati. Il gioco gira su un **canvas
> Phaser**, quindi il testo **non è selezionabile con i selettori CSS**: gli e2e
> non hanno nulla da leggere. Oggi quei test sono **in `skip`** (0 fail) in attesa
> di questo gancio.
>
> **Cosa serve (piccolo e a basso rischio):** esporre la scena attiva su
> `window`, così i test possono leggerla. **~6 righe in `src/main.ts`.**

**Contratto richiesto** (forma esatta attesa dai test):

```ts
// su window, sempre aggiornato quando cambia scena
window.__GIOCO__ = { scena: 'Title', materia: null }
//                    ^ stringa     ^ string | null
```

**Implementazione suggerita** — in `src/main.ts`, al posto dell'attuale
`new Phaser.Game({ ... })` finale (riga 32):

```ts
const game = new Phaser.Game({
  /* …esattamente come adesso… */
  scene: [BootScene]
});

// ── Gancio per i test e2e (sessione A) ──────────────────────────────
// Espone la scena attiva SENZA spingere stato (nessun evento, nessun costo
// per frame): un getter che legge la scena al momento della richiesta, quindi
// non può mai essere "vecchio". Vedi COORDINAMENTO.md §3.5.
const g = window as unknown as {
  __GIOCO__?: { scena: string; materia: string | null };
};
g.__GIOCO__ = {
  get scena(): string {
    return game.scene.getScenes(true)[0]?.scene.key ?? 'Boot';
  },
  materia: null
};
```

**Perché un getter e non un evento:** Phaser emette `START` **per singola scena**
(`this.events`), non globalmente: ascoltarlo in modo affidabile richiede di
agganciarsi a ogni scena. Un getter letto su richiesta è più semplice, non ha
costo a ogni frame e non può restare disallineato.

**Note per B:**
- Le **chiavi di scena** devono essere questi nomi perché i test li confrontano:
  `Boot`, `Title`, `Subject`, `Game`, `Results`.
- `materia` può restare `null` finché non c'è la scelta materia; aggiornalo quando
  esiste (`'matematica' | 'italiano' | 'scienze' | 'storia'`).
- Se preferisci un approccio diverso (es. overlay HTML), va bene: **l'importante è
  che `window.__GIOCO__.scena` esista e rifletta la scena corrente.** Avvisa qui se
  cambi forma.
- **Non deve** rompere nulla: è puramente additivo e non tocca la resa grafica.

**Cosa fa A quando il gancio esiste:** i 2 `skip` in `tests/e2e/flusso.spec.ts`
si attivano da soli e diventano verifiche reali. A raffinerà i selettori sul
comportamento effettivo delle scene.

### 3.6 Ruolo di C — revisore indipendente (Antigravity / Gemini)

> **C non esegue codice di gioco, non modifica `src/`, non corregge nulla.**
> Scrive **solo** in `REVISIONI.md`. La sua unicità è l'**indipendenza**: giudica
> codice che non ha scritto, quindi non ha l'attaccamento dell'autore.

#### 3.6.a La strategia dei tre ruoli (deciso dall'utente, 23/10 00:25)

L'utente ha definito una **divisione economica del lavoro**. Ogni ruolo usa il
modello giusto per il *tipo* di lavoro, non per prestigio:

| Ruolo | Chi | Modello | Costo | Perché questo ruolo |
|---|---|---|---|---|
| **Pensare** — ideare soluzioni, revisionare, giudicare | **C** | Gemini 4 Argon (`agy`) | 💳 crediti abbonamento | Il giudizio è dove il modello forte rende di più |
| **Orchestrare** — coordinare, verificare, produrre materiale | **A** | `big-pickle` | gratis (remoto) | Mediazione tra chi pensa e chi scrive |
| **Scrivere** — materializzare il codice | **B** | Qwen locale | **gratuito e illimitato** | Il volume non deve costare crediti |

> 🔑 **Il principio:** i token **infiniti** (B, locale) si usano dove serve
> **volume**; i **crediti a pagamento** (C, Argon) si usano dove serve **giudizio**.
> Usare Argon per controllare un `if` è spreco; usare Qwen per decidere
> l'architettura è azzardo.

#### 3.6.b Confine A / C — chi decide cosa (⚠️ NON sfumare)

Poiché **sia A sia C fanno "pensiero"**, il confine va scritto o si sovrappongono:

| Chi | Produce | NON fa |
|---|---|---|
| **C** (Argon) | **Proposte** e **rilievi**: idee, analisi, difetti segnalati | non verifica sul reale, non coordina, non scrive codice |
| **A** (io) | **Verifica** ogni proposta di C sul codice reale; **coordina**; traduce in istruzioni per B | non impone a C *come* pensare; non scrive in `src/` |
| **B** (Qwen) | **Esegue**: scrive il codice conforme alle istruzioni di A | non decide l'architettura da solo |

> ⚠️ **Regola anti-sovrapposizione:** una proposta di C **non è una decisione**
> finché A non l'ha verificata sul reale. C può sbagliare (come ha già fatto sulla
> gravità dei rilievi, §`REVISIONI.md`): A è il filtro. Senza questo filtro,
> avremmo due "cervelli" che si contraddicono e un solo esecutore confuso.

#### 3.6.c Misura dei consumi Argon (⚠️ i crediti si contano, non si stimano)

`agy --output-format json` espone l'uso **reale** dei token (verificato 23/10):

```json
{ "usage": { "input_tokens": ..., "output_tokens": ...,
             "thinking_tokens": ..., "cache_read_tokens": ..., "total_tokens": ... },
  "duration_seconds": ..., "num_turns": ..., "status": "SUCCESS" }
```

Ogni chiamata ad Argon va registrata in **`CREDITI-ARGON.md`** (file di A) con:
data, compito, modello, token totali, durata, esito. Così si può calcolare il
**costo per rilievo utile** e decidere con i numeri quando conviene C e quando
basta B. Non si stima mai a memoria.

**Cosa deve fare C, in ordine:**

1. **Leggere** `COORDINAMENTO.md` (questo file) e `REVISIONI.md`.
2. **Analizzare in sola lettura** i moduli di `src/` (24 file, ~4.400 righe).
   `src/` è di B: C lo **legge**, mai lo scrive.
3. **Verificare** i punti dove il codice può mentire:
   - correttezza dei calcoli (punteggi, progressi, risoluzione BES);
   - casi limite (liste vuote, dati assenti, valori fuori scala);
   - coerenza coi tipi in `src/content/types.ts`;
   - assenza di stato condiviso pericoloso tra moduli;
   - che i test esistenti verifichino davvero ciò che dicono.
4. **Scrivere i risultati in `REVISIONI.md`**, in ordine di gravità, con:
   file, riga, cosa è sbagliato, **perché**, e come riprodurlo. Niente opinioni
   sullo stile: solo difetti concreti e verificabili.

**Cosa C NON fa:**
- ❌ non modifica `src/`, `tests/`, `tools/` — **nessun file oltre `REVISIONI.md`**;
- ❌ non tocca il modello locale (è di B);
- ❌ non "riscrive" il codice nella sua testa e propone l'intero file: segnala
  il problema puntuale, non impone la sua architettura.

**Regola anti-conflitto:** se un file non è `REVISIONI.md`, **C non lo scrive**.
Se C ritiene urgente una correzione, la **descrive** in `REVISIONI.md` e la
lascia decidere a B o all'utente.

**Come si pilota Antigravity CLI (`agy`) — verificato 23/10 00:06:**

> Installato in `~/.local/bin/agy` (v1.4.5). **Autenticato e funzionante.**
> Modelli cloud disponibili: Gemini 4 Argon, Gemini 3.8 Flash, Claude Opus/Sonnet 5.5.
> **Non usa la GPU** → convive con B senza contesa.

```bash
export PATH="$HOME/.local/bin:$PATH"          # agy vive qui

# Modalità SICURA (sola lettura, non scrive nulla — verificato):
agy --mode plan --model gemini-3.8-flash-low \
    -p="<istruzione>"
```

**Regole d'uso (imparate sul campo):**
- ⚠️ Il prompt va **attaccato** al flag: `-p="testo"`, **non** `-p "testo"`.
- ✅ Usare sempre `--mode plan`: **non scrive**, propone e chiede conferma.
  Verificato: con `plan` l'impronta di `src/` resta identica anche se gli si
  ordina di modificare un file.
- ❌ **MAI** `--dangerously-skip-permissions`.
- ❌ **MAI** `--mode accept-edits` o `auto` per C: scriverebbero senza chiedere.
- ✅ `agy models` / `agy agents` per vedere le opzioni, senza avviare sessioni.

**Perché un revisore e non un terzo scrittore:** tre agenti che scrivono sullo
stesso codice si sovrascrivono, e il progetto **non è versionato con git** (nessun
`undo`). Un revisore che *legge* aggiunge valore senza aggiungere rischio.

---

### 3.7 Canale A → B e automazione notturna (verificato 23/10 01:00)

**Il problema.** A non ha una TUI per B, ma B **non ha iniziativa**: finito un
compito si ferma e aspetta un prompt. Se nessuno glielo manda, il tempo è perso.

**Il canale (esiste, ed è stato verificato).**

```bash
opencode run --session ses_ea0501762ffeu4cberdJrM00C9 "<messaggio>"
```

- Parla con **lo stesso server** di B: legge `~/.config/opencode/service.json`
  (contiene la password) e si autentica da solo. **Non** avvia un server parallelo.
- ⚠️ `--session` **CREA** la sessione **se l'ID non esiste**. Quindi **prima di
  inviare** si verifica che l'ID sia nel DB:
  `SELECT COUNT(*) FROM session_v2 WHERE id='<ID>'` → deve dare `1`.
- Il prompt viene **scritto subito**, ma la **risposta aspetta la slot del modello**
  (Qwen è a **parallel 1**). Se il comando si interrompe, il turno muore.
- ⚠️ Il **DB di OpenCode** ha `session_v2` (anagrafica, con `title`) e
  `session_message` (i messaggi). Non esiste una tabella `session`.

**Regola d'oro:** il canale si usa **solo** quando B è **davvero ferma**. Per
"ferma" non basta `tsc` = 0 (può capitare a metà lavoro): servono **4 condizioni
per 2 giri consecutivi** — `tsc` = 0, `npm test` = 26 passed, **CPU stabile**,
**nessuna scrittura in `src/`** da 2 min.

**Chi lo usa:** `tools/sorvegliante.sh` (file di A). Guardie: **lock** (un solo
sorvegliante — due invierebbero due volte), **guardia sull'ID**, `--prova`
(mostra senza inviare), `--stop`. Diario in `tools/.sorvegliante/diario.log`.

**Cosa NON automatizza:** il **Compito 3** (le scene). È troppo grosso per essere
spedito senza supervisione: va spezzato in sotto-compiti corti con l'umano presente.

---

## 4. LAVORO IN CORSO

### Sessione A (coordinamento)
- ✅ Analisi completa del codice (sola lettura)
- ✅ `~/Downloads/PATCH-SCUOLA-IN-CORSA.md` — patch A→G per i fix `tsc`
- ✅ `tools/content-factory/index.ts` — generatore dei 120 round
- ✅ `tools/carica-modello.sh` — carica il modello con la config corretta (API REST)
- ✅ `tools/diagnostica-lmstudio.sh` — diagnostica prestazioni modello
- ✅ `tools/benchmark-modelli.sh` — confronto velocità modelli
- ✅ `COORDINAMENTO.md` — questo contratto
- ✅ `.opencode/agents/orchestrator.md` — agente verificatore (su **big-pickle**)
- ✅ `README.md` — documentazione generale (323 righe)
- ✅ `docs/guida-insegnante.md` — guida per l'insegnante (366 righe)
- ✅ `playwright.config.ts` + `tests/e2e/smoke.spec.ts` — test e2e (**4/4 passano**)
- ✅ `tests/e2e/flusso.spec.ts` — **bozza pronta** dei test di flusso (2 skip finché mancano le scene, 0 fail)
- ✅ `vitest.config.ts` — esclude `tests/e2e/` da Vitest (evita conflitto coi test di B)
- ✅ `tools/content-factory/index.ts` — **0 errori tsc** (risolti i 14 con `@types/node` + fix tipo `report`)
- ✅ `tests/content-factory.test.ts` — **12 test** sulla normalizzazione dei round (offline, no Qwen)
- ✅ `tools/content-factory/index.ts` — `normalizeRound` esportato + guard su `main()` (importabile nei test)
- ✅ `dashboard.html` + `tools/dashboard.sh` — dashboard di sviluppo (`--watch` per auto-aggiornamento)
- ✅ `tools/sorveglia.sh` — cruscotto da terminale (equivalente senza browser)
- ✅ `CODA.md` — **coda dei compiti per B** (A fa da dispatcher)
- ✅ `DISPATCH-B.md` — messaggio Compito 1 (consegnato 00:53)
- ✅ `tools/argon.sh` + `CREDITI-ARGON.md` — pilota C e misura i token reali
- ✅ `IDEE.md` — 5 idee di C, verificate da A contro il codice
- ✅ `tools/sorvegliante.sh` — **in esecuzione** (PID 15530): invia il Compito 2 quando B è ferma
- ✅ `DISPATCH-C2.txt` — messaggio Compito 2 (che il sorvegliante invierà)
- ✅ `dashboard.html` + `tools/dashboard.sh` — **aggiornata**: KPI coda + crediti Argon, sezione "Automazione notturna", tabella coda compiti; `--watch N` **configurabile** (default 300s per non rubare CPU a B); **watch attivo** (PID 19442)
- 🔜 Verificare il Compito 1 quando B lo dichiara (`tsc`=0, `npm test`=26)
- 🔜 Test e2e di flusso: **attivare** i 2 skip quando B scrive `src/scenes/`

### Sessione B (build) — aggiornato 23/10 22:40
- ✅ Applicare patch A→D (fix `tsc`) — C1+C2, 0 errori dal 19:48
- ✅ Fix runtime dell'input (C5): `setInteractive(hit, Phaser.Geom.Rectangle.Contains)`
- ✅ **Esporre `window.__GIOCO__`** (C3) — getter `scena` + `materia`, §3.5
- ✅ Scene: `Boot` → `Title` (C4) → `Subject` (C6) → `Game` (C8)
- 🔜 Spezzare `main.ts` in `src/scenes/` (sblocca le corsie parallele)
- 🔜 `Results` (mancante) + stelle + salvataggio
- 🔜 DOM: impostazioni BES, editor, report
- 🔜 Audio (`src/audio/synth.ts` è pronto)

---

## 5. PROSSIME MOSSE (in ordine)

| # | Chi | Cosa | Dipende da |
|---|---|---|---|
| 1 | **B** | Applicare patch A-D → `npx tsc --noEmit` pulito | — |
| 2 | **B** | Applicare patch E (5 bug runtime) | #1 |
| 3 | **A** | Riallineare `tools/content-factory/` ai tipi post-patch-A | #1 |
| 4 | **B** | Scrivere `src/scenes/` (Boot, Title, Subject, Game, Results) | #1 |
| 5 | **A** | Test Playwright (`tests/e2e/` + config) | — |
| 6 | **B** | DOM: settings/editor/report | #4 |
| 7 | **A** | Generare 120 round + report | #3 |
| 8 | **Tu** | **Revisione manuale 100%** dei round generati | #7 |

> 🟡 **RICHIESTA APERTA A** → **B**: esporre `window.__GIOCO__ = { scena, materia }`
> in `src/main.ts` (§3.5). Sono ~6 righe, non toccano la grafica, e **sbloccano i
> test e2e di flusso** di A (oggi 2 `skip`). Non è bloccante per B: quando B
> arriva alle scene, aggiungerlo è quasi gratis.

| # | Chi | Cosa | Dipende da |
|---|---|---|---|
| 9 | **C** | Revisione indipendente di `src/` → rilievi in `REVISIONI.md` (§3.6) | — (può iniziare subito, in sola lettura) |

---

## 6. NOTE DAI MODELLI (⚠️ importanti)

Lezioni imparate, da non ripetere:

- **⚠️ LM Studio IGNORA `lms load --context-length`:** la config di caricamento è
  salvata in `~/.lmstudio/.internal/user-concrete-model-default-config/<modello>.json`.
  Se lì c'è `contextLength: 16000`, OGNI `--context-length` da CLI viene IGNORATO.
- **⚠️ LA CHIAVE `parallel` NON È `llm.load.parallel`:** quella chiave **non esiste**
  (verificato: nessuna occorrenza in LM Studio). Il campo vero si chiama **`parallel`**
  e si passa **solo via API REST**. Scriverlo nel file JSON non ha alcun effetto.
- **✅ METODO AFFIDABILE — API REST (non CLI):**
  ```bash
  curl -X POST http://127.0.0.1:1234/api/v1/models/load \
    -H 'Content-Type: application/json' \
    -d '{"model":"qwen/qwen3.8-27b","context_length":32768,
         "flash_attention":true,"parallel":2,"echo_load_config":true}'
  ```
  **`echo_load_config: true` è ESSENZIALE:** mostra la config *realmente applicata*,
  non quella che credi di aver impostato. Senza, si naviga alla cieca.
  Script pronto: `bash tools/carica-modello.sh 32768 2`
- **⚠️ `parallel` di default è 4** sui modelli già scaricati → KV cache ×4. Su 32 GB
  con un modello da ~18 GB conviene **2** (una slot per la sessione B, una di riserva).
- **✅ `flash_attention: true`** riduce memoria e aumenta velocità. Va attivato
  esplicitamente (di default può essere off).
- **KV cache `q8_0` invece di `f16`** dimezza la memoria della cache.
- **⚠️ Un modello può restare in `PROCESSINGPROMPT` con `llama-server` a CPU 0%:**
  NON è un bug e NON è swap. Significa che **un client a monte tiene le slot**
  (es. una sessione in attesa di approvazione). Verifica con:
  `lsof -nP -iTCP:1234 | grep ESTABLISHED` — se `opencode serve` ha connessioni
  aperte, la richiesta è **in coda**, non bloccata.
- **⚠️ DEADLOCK DELL'APP LM STUDIO (importante!):** in certe condizioni l'endpoint
  di inferenza si blocca: **`/v1/models` risponde in 2 ms, ma `/v1/chat/completions`
  va in timeout** — perfino per un modello INESISTENTE (che dovrebbe dare errore
  immediato). Sintomo: `llama-server` a CPU 0%, richieste a 0 byte, `HTTP 000`.
  **`lms server stop/start` NON basta.** La cura: **riavviare l'app LM Studio**
  (`osascript -e 'quit app "LM Studio"'`, poi `open -a "LM Studio"` e
  `lms server start`). Dopo il riavvio: 80 token in 6,7 s (~12 tok/s) invece di timeout.
- **⚠️ NON ricaricare il modello mentre un'altra sessione lo usa:** `lms unload --all`
  rimuove il modello che l'altra sessione sta usando → sembra un "blocco" ma è
  l'interferenza. E il ricaricamento può creare **istanze con suffisso**
  (`qwen/qwen3.8-27b:2`) che l'altra sessione non trova.
  → Carica con l'ID ESATTO e verifica con `lms ps` che non ci siano suffissi.
- **`reasoning_effort: "none"` è OBBLIGATORIO** per Qwen, altrimenti "pensa" troppo
  (181K token di reasoning osservati).
- **Il modello sbaglia gli ID** → gli ID si assegnano **sempre nel codice**.
- **`json_schema` in LM Studio funziona solo se OGNI campo ha `description`.**
- **Il modello tronca il JSON** → intercettare e ritentare.
- **Il modello lascia markdown residuo** → il validatore lo boccia (correttamente).
- **Phaser 3.90:** gli `Sprite` non hanno `.add()` → usare `Container`.
  `pointerupcancel` non esiste nella `.d.ts`. `Pointer` non è EventEmitter.

---

## 7. CAUTIONI PER LE DUE SESSIONI

### 🔴 REGOLA #1: non ricaricare il modello mentre l'altra sessione lo usa
`lms unload --all` rimuove il modello che l'altra sessione sta usando. Sembra un
"blocco del modello", ma è **interferenza**. Sintomo tipico: richieste a 0 byte,
`HTTP 000`, `llama-server` a CPU 0%.

**Prima di ricaricare:** verifica che nessuno sia connesso:
```bash
lsof -nP -iTCP:1234 | grep ESTABLISHED   # 0 connessioni = via libera
```
Se ci sono connessioni, **aspetta** o accordati. Non ricaricare "tanto per".

### ⚠️ Se il modello sembra bloccato (e non è interferenza)
1. `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:1234/v1/models` → 200?
2. Prova un modello **inesistente**: se **va in timeout** invece di dare errore
   immediato, l'app LM Studio è in **deadlock**.
3. Cura: **riavvia l'app LM Studio** (non basta `lms server stop/start`):
   ```bash
   osascript -e 'quit app "LM Studio"'
   open -a "LM Studio" && sleep 20 && lms server start
   ```

### ⚠️ Una sola GPU + memoria al limite
Macchina: **M1 Pro, 32 GB unificati**. Il modello Qwen occupa **~18,6 GB** in RAM.
Con macOS (~5-6 GB) e OpenCode (~1 GB) restano **~6 GB di margine**: non c'è spazio
per due sessioni che usano il modello *contemporaneamente*.

**Diagnostica rapida se è tutto lento:**
```bash
lms ps                    # controlla CONTEXT e PARALLEL attivi
sysctl vm.swapusage       # se "used" cresce → sta swappando
memory_pressure | tail -3 # Pageins alti = GPU legge da disco
```
Config corretta attesa: `CONTEXT 32768`, `PARALLEL 1`, RSS ~18,6 GB.

### ⚠️ Nessun git
Il progetto **non è versionato**. Backup manuale in
`~/Users/caioz/scuola-in-corsa-backup-*`. Fare backup prima di modifiche grosse.

### ⚠️ Un solo scrittore per file
Mai due sessioni sullo stesso file. Se serve, accordarsi tramite questo file.

---

## 8. LOG DEI CAMBIAMENTI

> ⚠️ **Nota sull'accuratezza degli orari (23/10 00:09).** Le voci scritte prima
> della syscall riportavano **orari di fantasia** (01:xx–02:xx) mentre l'orologio
> del sistema segnava **00:0x**: erano mal calcolati e fuori ordine. Il log è
> stato **riordinato** e gli orari sono ora ancorati a ciò che è verificabile
> (mtime dei file). Quando l'ora esatta di un evento non è ricostruibile, la voce
> usa l'ora **arrotondata al minuto noto**, non un valore inventato.
>
> Regola per il futuro: **l'ora si legge sempre dall'orologio**
> (`date '+%d/%m %H:%M'`), mai a memoria.

| Data | Sessione | Cosa |
|---|---|---|
| 22/10 21:46 | A | Creato backup progetto + DB |
| 22/10 22:00 | A | Creato `tools/content-factory/index.ts` |
| 22/10 22:10 | A | Creato questo file di coordinamento |
| 22/10 22:15 | A | Creato agente `orchestrator` |
| 22/10 22:40 | A | **Ottimizzato LM Studio**: scoperto che `--context-length` era ignorato (config salvata a 16000). Corretto a 32768 + KV cache q8_0 + parallel 1. RSS 20,98→18,64 GB. Backup config in `~/Downloads/lmstudio-qwen-config-backup.json`. |
| 22/10 22:55 | A | **Verificato dal DB: le due sessioni usano modelli DIVERSI.** A = `big-pickle` (remoto, no GPU), B = `qwen` (locale, GPU). A non ruba risorse a B. |
| 22/10 23:05 | A | **Diagnosticata coda modello**: con `parallel 1` la sessione B occupava l'unica slot → richieste di A in timeout (0 byte, HTTP 000). Ripristinato **parallel 2** (ctx 32768, q8_0). RSS 19,36 GB. |
| 22/10 23:10 | A | **Orchestratore spostato su `opencode/big-pickle`** (modello remoto): non usa più la GPU. Funziona anche quando la sessione B satura Qwen. |
| 22/10 23:15 | A | **Scritti `README.md` (323 righe) e `docs/guida-insegnante.md` (366 righe)** — lavorando in parallelo alla sessione B, senza toccare `src/`. Verificata l'accuratezza: **29 regole citate = 29 regole reali** in `src/bes/rules.ts`, 9 profili = 9 nel codice. Zero collisioni. |
| 22/10 23:16 | A | **Test Playwright operativi**: `playwright.config.ts` (webServer Vite automatico) + `tests/e2e/smoke.spec.ts` (**4/4 passano**). Creato `vitest.config.ts` per **escludere `tests/e2e/` da Vitest** (altrimenti Vitest raccoglieva i .spec.ts di Playwright e falliva). I 14 test di B restano verdi. |
| 22/10 23:20 | A | **Verificato il nome VERO del campo parallel**: `llm.load.parallel` NON esiste (nessuna occorrenza in LM Studio). Il campo è `parallel` e va passato **via API REST**. Creati `tools/carica-modello.sh` e diagnostica aggiornata. Scoperto che il default è **parallel 4**. |
| 22/10 23:25 | A | **RISOLTO il blocco del modello**: era un **deadlock dell'app LM Studio** (endpoint chat bloccato, `/v1/models` ok). Riavvio dell'app → **80 token in 6,7 s (~12 tok/s)**, prima timeout. Ricaricato con ctx 32768, parallel 1, flash_attention on. RSS 19,6 GB, swap 0. |
| 22/10 23:30 | A | **parallel 2 non entra in memoria** (guardrail: 19,87 GB > disponibile). L'utente ha impostato il default dell'app a **parallel 1**. Scoperto che LM Studio a volte **ricarica da solo con parallel 4** → 20,71 GB → guardrail blocca → deadlock. Verificare sempre `lms ps` dopo un load. |
| 22/10 23:30 | A | **12 nuovi test offline** (`tests/content-factory.test.ts`) sulla normalizzazione dei round: dragdrop sort/match, coppie ricostruite, id assegnato dal codice. Reso `normalizeRound` esportabile + guard su `main()`. Totale test: **14 → 26**, tutti verdi, **senza Qwen**. |
| 22/10 23:40 | A | **Analizzato il rischio di rottura della factory con la patch A**: la patch rende OBBLIGATORI `sortItems`/`leftItems`/`rightItems`/`pairs`. Verificato che la factory li produce già correttamente (righe 382/392) → **nessuna rottura prevista**. Test aggiunto per bloccarlo. |
| 22/10 23:42 | A | **`tools/content-factory/` a 0 errori tsc**: i 14 errori erano `process`/`require` senza `@types/node` (installato) + un tipo sbagliato (`report: string[]` su un `.join()`). **NON toccato `tsconfig.json`** (è di B). |
| 22/10 23:45 | A | **⚠️ VERIFICATO: la patch A→G NON è su disco.** `tsc` dà ancora errori, nessun file `src/` ha mtime dopo le 20:00, nessuna worktree. La patch resta da applicare. Non l'ho applicata io (src/ è di B) per non creare conflitti. |
| 22/10 23:51 | A | **🎨 Redesign grafico della dashboard** (richiesto dall'utente): aggiunti (1) **ciambella SVG** degli errori risolti sul picco di 36, con colore per severità; (2) **grafici a barre** per i risultati dei test (passati/falliti/saltati) e l'avanzamento; (3) **timeline** delle ultime 12 voci lette da `COORDINAMENTO.md` (dati reali, non inventati, con markdown → HTML); (4) restyling generale (KPI con accento colorato, sfondo a gradiente, tipografia). **Correttezza prima dell'estetica**: verificato che HTML sia ben formato e che i numeri combacino col reale (26/26 Vitest, 36 errori, 4385 righe). |
| 22/10 23:53 | A | **📐 Larghezza e palette (richieste dall'utente).** (1) **Larghezza**: `.wrap` passa da `max-width:1160px` a `width:95%` (tetto 3000px). Il contenuto ora occupa **91–93%** dello schermo (era ~60% a 1920px) — 4 schede KPI per riga, timeline a 3 colonne, grafici su 1728px. Verificato **senza overflow orizzontale** da 360px a 3440px. (2) **Palette**: sostituiti i colori "Tailwind-400" con un set **più moderno e desaturato** (base slate/indigo). Contrasto verificato WCAG: `--txt` 15,5:1, `--muted` 6,4:1 (era 5,4), `--info` 7,1:1 (era 6,5), `--border` 1,53:1 (era 1,46) — **tutti AA o AA+**, nessuna regressione. (3) Corretto un **overflow su telefono**: la timeline forzava colonne da 430px. Ora `minmax(min(430px,100%),1fr)`. |
| 22/10 23:55 | A | **🪝 Richiesta aperta A → B (§3.5): `window.__GIOCO__`.** Per sbloccare i test e2e di flusso (oggi 2 `skip`) serve che il motore esponga la scena attiva: il canvas Phaser non è leggibile dai selettori CSS. Ho scritto in §3.5 la **forma esatta** (`{ scena, materia }`), lo **snippet pronto** (~8 righe in `src/main.ts`) e le chiavi di scena attese (`Boot/Title/Subject/Game/Results`). **Snippet verificato davvero**: l'ho eseguito su Phaser 3.90 reale (HEADLESS) e il getter segue la transizione Boot→Title senza errori. Scelto un **getter** invece di un evento: Phaser emette `START` per singola scena, non globalmente. Aggiornati anche i commenti di `tests/e2e/flusso.spec.ts`. Nessuna modifica a `src/`. |
| 23/10 00:00 | A | **👤 Predisposta la sessione C (Antigravity/Gemini) come REVISORE indipendente.** Su richiesta dell'utente. C scrive **solo** `REVISIONI.md` e **legge** `src/` senza modificarlo: tre scrittori sullo stesso codice si sovrascriverebbero e il progetto **non ha git**. Aggiunta §3.6 con istruzioni operative, ruolo di C nella Regola d'Oro, nel semaforo e nelle prossime mosse. Creato `REVISIONI.md` con formato dei rilievi (gravità/dove/cosa/perché/riproduzione) e indicazione dei moduli più densi di logica. Aggiornati i campi obsoleti dello *Stato condiviso* (32→36 errori, patch A-E→A-G). |
| 23/10 00:02 | A | **🛠️ Creato `tools/sentinella.sh`** — rete di sicurezza per sorvegliare i cambiamenti per area (snapshot + diff, attribuzione A/B/C). |
| 23/10 00:03 | A | **⚠️ Errore mio, corretto: ho toccato un file di B durante un test.** Provando la sentinella ho scritto in `src/core/constants.ts` (area di B) e il ripristino ha **rimosso il newline finale**. Ripristinato dal backup e **verificato**: `src/` identico al backup in **tutti e 24 i file**, `tsc` invariato. Lezione: i test di scrittura si fanno **solo** su cartelle temporanee, mai su file reali altrui. |
| 23/10 00:06 | A | **🛠️ Installato e verificato Antigravity CLI (`agy` v1.4.5)** in `~/.local/bin`, su richiesta dell'utente. Installer letto prima di eseguirlo: verifica il **checksum SHA-512**, nessun `sudo`. Verificato che **legge il progetto** (gli ho chiesto i 9 profili BES: corretti) e che **`--mode plan` non scrive**: dandogli l'ordine di modificare `constants.ts`, l'impronta di `src/` è rimasta **identica**. Documentata in §3.6 la sintassi corretta (`-p="testo"`, prompt attaccato al flag). ❌ Mai `--dangerously-skip-permissions` né `--mode accept-edits` per C. |
| 23/10 00:09 | A | **🧹 Riordinato questo log.** Gli orari erano in parte **inventati** (indicavano 01:xx–02:xx mentre l'orologio reale segnava 00:0x). Riordinati e riancorati ai **mtime verificabili** dei file; aggiunta in testa al log una nota d'accuratezza e la regola «l'ora si legge sempre dall'orologio». Verificato che `src/` non è stato alterato. |
| 23/10 00:15 | A | **🔬 Prima revisione reale di C + verifica dei suoi rilievi.** `agy` (`gemini-4-argon-medium`, `--mode plan`) ha analizzato `src/core/progress.ts`: 6 rilievi. **Non accettati sulla parola**: riprodotti da A in cartella temporanea con copia fedele del codice. Tutti confermati, ma **rimodulata la gravità**: i rilievi su `localStorage` corrotto sono note di robustezza (richiedono dati già guasti), non errori. **L'unico 🔴 vero**: `setStars` non limita i valori (0–3) e la guardia `stars > cur` può **bloccare per sempre** i punteggi di un livello. Scritto in `REVISIONI.md`. `src/` intatto (impronta identica). |
| 23/10 00:25 | A | **🎯 Definiti i tre ruoli come STRATEGIA economica** (decisione dell'utente). **C** (Argon, crediti) = pensare/ideare/revisionare; **A** (big-pickle, gratis) = orchestrare e verificare; **B** (Qwen locale, illimitato) = scrivere il codice. Aggiunto §3.6.a (tabella dei ruoli), §3.6.b (**confine A/C**: una proposta di C non è decisione finché A non l'ha verificata) e §3.6.c (**misura dei consumi**). Creato `tools/argon.sh`: pilota C in `--mode plan` e registra i token **reali** (`--output-format json` → `usage`) in `CREDITI-ARGON.md`. Scoperto che `agy` espone `input/output/thinking/cache/total_tokens`: il costo si **misura**, non si stima. |
| 23/10 00:33 | A | **🧠 Prima sessione di "pensiero" ad Argon** (14.880 token, 59s, registrati). Compito: idee per la qualità didattica. Argon ha prodotto 5 idee. **Verificate da A contro il codice reale** e raccolte in **`IDEE.md`** con valutazione: 4 valide, 1 (TTS) con **fattibilità sottostimata** da C. Scoperte di A: `RoundOutcome.attempts` **esiste già** (metà dell'idea sugli indizi è già fatta); `state.ts` registra `timeMs` → conferma di **non** usarlo per le stelle. Scelta da A come prima: **agenda visiva CAA** (puro HUD, costo basso). |
| 23/10 00:38 | A | **🔍 Diagnosticato lo stato di B (e corretto un mio errore).** Ho letto la `compaction` di B come un **blocco** ("ferma da 13 min, summary vuoto"). **Sbagliato**: `summary:""` significa "non ancora scritto", e B stava **compattando** (confermato dall'utente e dal modello `loaded`). Lezione annotata: per dichiarare B bloccata servono **due prove** (sessione ferma **e** modello che non risponde). Annullata una mia richiesta di prova al modello per **non contendere la slot**. |
| 23/10 00:45 | A | **🚦 Creato `CODA.md` — A fa da DISPATCHER per B** (ruolo richiesto dall'utente). Verificato che i **36 errori tsc sono concentrati in 5 file** (`src/challenges/`). Coda in ordine: (1) **sbloccare il compilatore**, (2) **gancio `window.__GIOCO__`**, (3) **prima scena**; le 5 idee di C restano in attesa finché non esistono le scene. **Regola tecnica messa nella coda**: compiti **corti**, una sessione per compito, perché B ha ctx 32768 e la memoria è **già satura** (RSS 17,63 GB, **2,15 GB in swap**, 15% libero). **NON** aumentare il contesto: KV cache +4,3 GB → swap → B a ~1-2 tok/s. Aggiunta la **regola anti-magazzino** (avviso se un compito resta fermo >30 min). |
| 23/10 00:57 | A | **📥 Il Compito 1 è arrivato a B.** Il messaggio è stato copiato negli **appunti di macOS** (`pbcopy`) e l'utente l'ha incollato: nel DB compare un evento **`user` alle 00:53:37** e la **CPU del modello cresce** (11:01,63 → 11:02,77). Quindi B **lavora**. Chiarito anche il dubbio dell'utente ("se non inviamo il Compito 2, B va avanti?"): **no**, B **non ha iniziativa** — finito un compito si ferma e aspetta un prompt. Il tempo *fino* alla fine del Compito 1 è lavoro buono; il tempo *dopo* sarebbe **perso**. |
| 23/10 01:00 | A | **🔑 TROVATO IL CANALE verso B (verificato, non supposto).** `opencode run --session <ID> "<messaggio>"` parla con **lo stesso server** di B: legge `~/.config/opencode/service.json` (password `VqFuy…`) e si autentica da solo. Ho **provato il canale su una sessione di prova** (`PROVA-CANALE-A`), **mai su B**: ha **creato una sessione nuova**, ha **scritto il messaggio** (`user` 01:01:33), poi è andato in **timeout a 60s** perché **la slot di Qwen era occupata da B**. **B non è stata toccata** (verificato). **Lezioni:** (1) `--session` **crea** la sessione se l'ID non esiste → serve una **guardia** che verifichi l'ID nel DB prima di inviare; (2) il prompt viene scritto **subito** ma la **risposta aspetta la slot** → se si interrompe il comando, il turno muore (messaggio orfano); (3) quindi il canale va usato **solo** quando B è **davvero ferma**. Sessione di prova **eliminata** (`opencode session delete`). |
| 23/10 01:04 | A | **🌙 Avviato `tools/sorvegliante.sh` — il "semaforo" che manda i compiti da solo.** Decisione dell'utente: usare la notte, non sprecarla. Il criterio **non** è lo stato della sessione (ambiguo) ma **4 condizioni oggettive**, tutte vere per **2 giri consecutivi**: (a) `tsc` = 0, (b) `npm test` = 26 passed, (c) **CPU del modello stabile**, (d) **nessuna scrittura in `src/`** da 2 min. Solo allora invia il **Compito 2** con `opencode run --session B`. **Guardie implementate:** lock file (un solo sorvegliante — due invierebbero due volte), guardia sull'ID sessione (se non esiste nel DB, **non invia** e avvisa), `--prova` che mostra senza inviare, `--stop` per fermarlo. **Non** tocca `src/`, **non** usa `--auto`. Il **Compito 3** (le scene) **non** lo invia: è grosso, va spezzato con l'umano. Diario in `tools/.sorvegliante/diario.log`. |
| 23/10 01:12 | A | **📊 Dashboard aggiornata alle nuove funzioni** (richiesta dell'utente: "tienila aggiornata"). Aggiunte 3 cose, tutte con **dati veri** letti da file, mai stimati: (1) **KPI nuovi** — compiti aperti in `CODA.md`, token consumati da C in `CREDITI-ARGON.md`; (2) **sezione "Automazione notturna"** — stato del sorvegliante (PID dal lock, vivo/non vivo), stato del Compito 1, se il Compito 2 è stato inviato, e l'**ultima riga del diario**; (3) **tabella "Coda dei compiti"** — i compiti di `CODA.md` con esito. **Decisione tecnica**: il `--watch` girava ogni 60s eseguendo `tsc`+`vitest`+`playwright` a ogni giro → **ruba CPU al modello locale di B**. Cambiato a **300s** (configurabile con `--watch N`) e verificato che **non** disturba il sorvegliante: questo misura il **tempo CPU del processo `llama-server`**, non la CPU totale, quindi i test del watch **non** producono falsi "B è ferma". Avviati **due daemon**: sorvegliante (PID 15530) e watch dashboard (PID 19442). |
| 23/10 07:19 | A | **🌅 Bilancio della notte (dati, non impressioni).** Il sorvegliante ha girato **tutta la notte** (252 righe di diario, 01:01 → 07:17) e ha fatto **la cosa giusta**: non ha mai inviato il Compito 2, perché la condizione era `tsc` = 0 e **non ci è mai arrivato**. **Progresso reale**: 36 → **20 errori** tsc, test sempre **26 passed**, **1 solo file** modificato (`src/content/types.ts`, 04:09). **Ma B si è fermata alle 04:09**: tre ore senza più scrivere. **Diagnosi provata**: nelle ultime 12h B ha fatto **27 compaction, 40 letture, 2 modifiche** (rapporto **20:1**) — legge file interi, il contesto si riempie, compatta, dimentica, rilegge. Il suo stesso reasoning lo dice: *"Let me continue from where I left off… to apply 5 fixes"*. Ha il piano ma non lo trattiene. **Scoperta chiave**: i 20 errori sono **6 cause**, non 20 problemi — `C.ink` in `palette.ts` è una **stringa** esadecimale mentre `fillStyle` vuole un **numero** (7 errori da sola); `p.on/off/once` su un `Phaser.Input.Pointer`, che **non è** un EventEmitter (6 errori); `sprite` tipato `Sprite` ma è un `Container` + `import type Phaser` (4 errori). Preparato **`DISPATCH-C1B.txt`** (42 righe, ~500 token) con le 6 cause, le righe esatte e il divieto esplicito di leggere file interi. |
| 23/10 07:22 | A | **🛡️ La dashboard ora riconosce il loop** (l'allarme che ieri notte mancava). Aggiunto il **rapporto letture/modifiche di B** nelle ultime 12h, letto dal DB (`session_message`), con **banner giallo in cima** quando compaction ≥ 10 e modifiche ≤ 2. Oggi mostra: *27 compaction · 40 letture · 2 modifiche · rapporto 20:1*. Il senso: stanotte il sorvegliante guardava solo `tsc`, che è **lento** a cambiare; il rapporto letture/modifiche è un **segnale precoce** che `tsc` non dà. Inviato a B il messaggio chirurgico con `opencode run --session` (accodato, non ha interrotto il turno in corso). |
| 23/10 17:30 | A | **🔄 Ripresa dopo lo spegnimento.** Verificato lo stato reale: `src/` a **20 errori**, copia patchata a **3** (tutti `ui.ts`), nessun daemon, B ferma da 9h (ultimo evento `idle/interrupted` alle 07:33). Riavviato LM Studio (`lms server start`, modello 131072 già persistito). **Consegnata `PATCH-C1`** a B con guardia sull'ID: prefill di **753 s** (17:05:57 → 17:18:29), poi generazione in corso. **Preparata `PATCH-C2`** (13 sostituzioni: root `Sprite`→`Container` in `makeButton`/`makeChip`/`makeSlot` + tipo `slotRoots`), **verificata end-to-end**: copia fresca dell'attuale `src/` + C1 + C2 → **`tsc` = 0 errori**. Script riutilizzabile: `tools/.patch-work/applica-c2.py <dir>`. Scoperto che `sprite.add(text)` non esiste su `Sprite`: a runtime il testo finiva a `(0,0)` del mondo (bug visivo oltre che di tipo). **Misurazioni sul contesto 131k**: prefill 753 s vs mediana 81 s del 32k; **zero compaction** (prima 26 in 40 turni); RSS invariato (17,6 GB), swap 1,30 → 1,84 GB. **Dato chiave**: nella finestra "32k" gli input avevano mediana **35.515** e max **58.666** token, oltre i 32.768 dichiarati → i prompt erano **troncati**, probabile causa del loop. |

---

## 9. COME USARE QUESTO FILE

**Sessione B, all'inizio di un turno:**
> *"Leggi COORDINAMENTO.md e dimmi da dove riprendere."*

**Sessione A, dopo aver prodotto qualcosa:**
> aggiorna le sezioni 2, 4, 5, 8.

**Tu (umano), per far comunicare le sessioni:**
> non serve incollare nulla: basta dire a B *"leggi COORDINAMENTO.md"*.
> Il file **è** il canale.

---

*Questo file è il ponte tra le sessioni. Tienilo onesto: se dichiari lavoro
fatto che non lo è, l'altra sessione costruirà su basi false.*
