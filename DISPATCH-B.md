# Dispatcher → B · messaggio pronto da incollare

> A prepara qui il testo esatto per B. Copia-incolla **solo il blocco** nella TUI di B.
> Motivo: messaggio corto = contesto corto = **niente compaction** (B ha ctx 32768).

---

```
Compito 1 (priorità assoluta): far compilare il progetto.

Situazione: npx tsc --noEmit dà 36 errori, tutti in src/challenges/:
  - match.ts  (14)
  - order.ts   (9)
  - choice.ts  (7)
  - ui.ts      (4)
  - index.ts   (2)

I codici dominanti e le loro cause reali:
  - TS2339 "Property 'leftItems'/'rightItems'/'pairs' does not exist on type 'never'"
    → i round sono tipizzati in modo che TS non riesce a restringerli.
      Manca la discriminazione per tipo di round (i campi sortItems/leftItems/
      rightItems/pairs esistono solo su alcuni tipi di Round).
  - TS2345 "Argument of type 'X' is not assignable to parameter of type 'never'/'number'"
    → tipi dei round non ristretti + un mismatch string/number in choice.ts.
  - TS7006 "Parameter implicitly has an 'any' type" → aggiungere il tipo.
  - TS1361, TS2722, TS2367, TS2554, TS2322 → casi puntuali dello stesso nodo.

C'è una patch pronta nella mia cartella:
  ~/Downloads/PATCH-SCUOLA-IN-CORSA.md
che copre questi errori. src/ è TUO: valuti tu se applicarla o correggere a mano.

Vincoli:
  - npm test deve restare verde: adesso è "Tests 26 passed (26)".
    Non rompere i 26 test.
  - Non toccare tools/ (è di A).

Criterio di completamento (esatto):
  npx tsc --noEmit 2>&1 | grep -c "error TS"   → deve stampare 0
  npm test 2>&1 | grep -E "^ *Tests "          → deve dire 26 passed
```

---

## Perché questo messaggio è scritto così

| Scelta | Motivo |
|---|---|
| Dati **esatti** (conteggi per file, codici) | B non deve cercare: meno letture = meno contesto = niente compaction |
| Spiega **le cause**, non solo i sintomi | `never` è un sintomo di restringimento; se B capisce il nodo, non tocca 36 punti a caso |
| Cita la patch | evita lavoro duplicato — ma **lascia decidere B** (`src/` è suo) |
| **Criterio di verifica esatto** | A può controllare in 5 secondi se è finito, senza fidarsi |
| Dice cosa **non** toccare | ribadisce il confine (`tools/` è di A) |
| Nessun file da leggere oltre il necessario | è la regola tecnica: compiti corti |

---

## Dopo che B finisce

A esegue la verifica (non si fida della dichiarazione di B):

```bash
cd /Users/caioz/scuola-in-corsa
npx tsc --noEmit 2>&1 | grep -c "error TS"     # atteso: 0
npm test 2>&1 | grep -E "^ *Tests "            # atteso: 26 passed
```

Se entrambi tornano → Compito 1 ✅, si passa al Compito 2 (`window.__GIOCO__`).
Se no → A riporta a B **cosa** è ancora rotto, con i codici esatti.
