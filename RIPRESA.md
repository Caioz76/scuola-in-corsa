# RIPRESA — stato al 23/10/2026, 17:30

Pausa per uscita. Questo file dice esattamente da dove ripartire.

## Cosa sta succedendo ORA (non ucciderlo)

B sta applicando **`PATCH-C1`**. Il dispatch è partito alle **17:05:57** ed è
ancora vivo (processo `opencode run`, log in `tools/.dispatch/patch-c1-*.log`).

| Momento | Evento |
|---|---|
| 17:05:57 | prompt consegnato a B (guardia sull'ID superata) |
| 17:18:29 | fine prefill: 100% (753 s, il più lungo mai registrato) |
| 17:18:30 | B ha iniziato a generare; nessun file di `src/` ancora toccato |

⚠️ Il turno è **in corso**: la risposta non è ancora nel DB. Non interrompere
il processo e non inviare altro a B finché non compare il messaggio `idle`.

Per controllare se ha finito, senza disturbarlo:

```bash
cd /Users/caioz/scuola-in-corsa
pgrep -f "opencode run" >/dev/null && echo "B lavora" || echo "B ha finito"
find src -newermt "2026-10-23 17:00" -type f          # deve elencare i file patchati
npx tsc --noEmit 2>&1 | grep -c "error TS"            # atteso: 3 (poi 0 con C2)
```

## Punto esatto del lavoro

| Stato | Valore |
|---|---|
| `tsc` reale su `src/` | **20 errori** (B non ha ancora scritto) |
| `tsc` su `tools/.patch-work/src-patched/` | **0 errori** |
| `tsc` su copia fresca di `src/` + C1 + C2 | **0 errori** (verificato, `/tmp/final`) |
| Test | 26 passed (ultimo giro noto; da riconfermare dopo la patch) |

### Le due patch sono pronte e verificate

- **`PATCH-C1.txt`** — 15 sostituzioni, 17 errori (`choice.ts`, `order.ts`,
  `match.ts`, `validate.ts`, `ui.ts` import). **Già consegnata** a B.
- **`PATCH-C2.txt`** — 13 sostituzioni, gli ultimi 3 errori (`ui.ts` Container
  + `order.ts` tipo `slotRoots`). **Pronta, NON ancora consegnata.**

Verifica end-to-end delle due patch insieme, partendo dall'attuale `src/`:

```bash
cd /Users/caioz/scuola-in-corsa
rm -rf /tmp/final && mkdir -p /tmp/final && cp -R src /tmp/final/src
python3 tools/.patch-work/applica-c2.py /tmp/final
ln -sfn /Users/caioz/scuola-in-corsa/node_modules /tmp/final/node_modules
cp tsconfig.json /tmp/final/tsconfig.json
npx tsc -p /tmp/final/tsconfig.json --noEmit | grep -c "error TS"   # → 0
```

## Cosa fa PATCH-C2 (e perché è sicura)

In `makeButton`, `makeChip`, `makeSlot` il root diventa un
`Phaser.GameObjects.Container` a `(x, y)`; sprite e testo sono figli a `(0,0)`.
`root` passa da `Sprite` a `Container` in `Btn`, `Chip`, `makeSlot` e in
`order.ts:slotRoots`. `dispose()` distrugge il container (che distrugge i figli).

Controllato che il resto del codice usi solo `root.active`, `root.setPosition`,
`root.setDepth`: tutte e tre esistono su `Container`. I listener di input
restano sullo **sprite** (figlio interattivo di un container: supportato da
Phaser 3.90).

Nota: `sprite.add(text)` non è mai esistito su uno `Sprite` (errore di tipo).
A runtime il testo finiva a `(0,0)` del mondo, cioè in alto a sinistra: la patch
corregge anche quel bug visivo.

## Comando pronto per consegnare C2 (dopo che C1 è a 3 errori)

```bash
cd /Users/caioz/scuola-in-corsa
SES_B="ses_ea0501762ffeu4cberdJrM00C9"
N=$(sqlite3 ~/.local/share/opencode/opencode.db \
    "SELECT COUNT(*) FROM session_v2 WHERE id='$SES_B';")
[ "$N" = "1" ] || { echo "⛔ guardia: sessione non trovata"; exit 1; }
npx tsc --noEmit 2>&1 | grep -c "error TS"   # DEVE dire 3, altrimenti fermarsi
opencode run --session "$SES_B" "$(cat PATCH-C2.txt)"
```

Poi: `npx tsc --noEmit` → **0 errori**, `npm test` → **26 passed**.

## Misurazioni sul contesto 131k (23/10)

Config: contesto **131072**, KV cache q8_0, flash attention on, parallel 1,
speculazione MTP on. Backup config: `.bak-20261023-075847` (32768).

| Metrica | 32k (prima 07:58) | 131k (oggi) |
|---|---|---|
| Prefill mediana | 81 s | — |
| Prefill p90 / max | 159 s / 255 s | **753 s** (primo turno, a freddo) |
| Compaction | 26 in 40 turni | **0** |
| Generazione | mediana 5,2 tok/s | in misura |
| RSS `llama-server` | 17,63 GB | 17,6 GB |
| Swap usato | 1,30 GB | 1,84 GB |

⚠️ I 753 s includono il **cold start** (modello caricato alle 17:05:40). Per
separare i due effetti serve il **secondo** request a caldo: se scende verso
200-250 s è cold start, se resta ~700 s è il contesto.

**Scoperta importante**: nella finestra "32k" gli input registrati nei turni di B
avevano **mediana 35.515 token, massimo 58.666** — oltre i 32.768 dichiarati.
Quindi i prompt venivano **troncati** dal server: è la spiegazione più probabile
del loop "ho il piano ma non lo trattengo". Il limite vero era più basso di
quello che OpenCode credeva di avere.

## Altro stato utile

- **C (agy)** non è una sessione persistente: `~/.local/bin/agy` v1.4.5, ultima
  esecuzione 23/10 00:33, 14.880 token totali. `pgrep -x agy` vuoto = ferma.
- **Daemon**: sorvegliante e dashboard **non** sono attivi (fermati prima della
  pausa). Se servono:
  ```bash
  nohup tools/sorvegliante.sh >/dev/null 2>&1 &
  nohup tools/dashboard.sh --watch 300 >/dev/null 2>&1 &
  ```
  ⚠️ Il sorvegliante invia il Compito 2 quando `tsc` = 0: **non avviarlo**
  mentre C2 non è ancora consegnata, o rischia di accodare lavoro a B.
- LM Studio: server avviato alle 17:05:40, modello caricato a 131072.
  Se il Mac si riavvia: `~/.lmstudio/bin/lms server start`.

## Cose da NON fare

- Non dare a B compiti tipo "correggi questi errori": lo fanno leggere e compattare.
  Dargli **patch esatte** (`oldString`/`newString`), che applica senza leggere.
- Non ricaricare/scaricare modelli mentre B lavora.
- Non toccare `src/` da questa sessione: è di B.
- Non rilanciare `PATCH-C1` se B ha già applicato parte delle sostituzioni:
  le `edit` fallirebbero. Controllare prima con `tsc` e `find src -newermt`.
