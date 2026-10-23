# CREDITI-ARGON — consumo reale della sessione C (Antigravity / Gemini)

> **File di A.** Registra ogni chiamata ad Argon con i token **reali** letti da
> `agy --output-format json` (campo `usage`). Serve a calcolare il **costo per
> risultato utile** e a decidere con i numeri quando conviene C e quando basta B.
> **Non si stima mai a memoria.** Vedi `COORDINAMENTO.md` §3.6.c.

| Data | Compito | Modello | Token tot. | di cui in | out | cache | Durata | Esito |
|---|---|---|---|---|---|---|---|---|
| 23/10 00:33 | Idee qualità didattica | `gemini-4-argon-medium` | 14880 | 13080 | 1800 | 0 | 65s | ok |
| 23/10 21:55 | **C7** leggibilità domanda (3 file, corsia isolata) | `gemini-4-argon-high` | 18981 | 17971 | 1010 | 22125 | 91,6s | ok |
| 23/10 22:09 | **pilota contenuti** matematica 7-9 tappa 2 (6 round, validata) | `gemini-4-argon-high` | 28638 | 25611 | 3027 | 62699 | 113,1s | ok |
| 23/10 22:52 | **hook** `scenaAttiva` per gli e2e che giocano | `gemini-4-argon-high` | 22290 | 20793 | 1497 | 34313 | 77,3s | ok |
| 23/10 23:04 | **hit-area**: aree cliccabili in coordinate di texture | `gemini-4-argon-high` | 28130 | 26123 | 2007 | 51620 | 110,3s | ok |
| 23/10 23:05 | **tap-drag**: tocco distinto dal trascinamento | `gemini-4-argon-high` | 26388 | 24825 | 1563 | 49387 | 66,1s | ok |
| 23/10 23:13 | **BES store**: impostazioni persistenti, scene che le leggono | `gemini-4-argon-high` | 27097 | 24568 | 2529 | 62895 | 112,9s | ok |
| 23/10 23:16 | **BES scena**: pannello con 9 profili | `gemini-4-argon-high` | 23083 | 21030 | 2053 | 41963 | 83,3s | ok |
