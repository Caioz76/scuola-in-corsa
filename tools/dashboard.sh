#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  tools/dashboard.sh — genera "dashboard.html" nella radice del progetto
#
#  Raccoglie lo stato reale del progetto (codice, test, sessioni, modello,
#  avanzamento) e produce una pagina HTML AUTONOMA: si apre con doppio clic,
#  non richiede server né internet.
#
#  È di SOLA LETTURA: non modifica il progetto, non tocca il modello locale.
#  Può girare mentre la sessione B lavora.
#
#  Uso:
#    bash tools/dashboard.sh          → rigenera dashboard.html
#    bash tools/dashboard.sh --open   → rigenera e apre nel browser
#
#  Nota: un file HTML aperto da disco NON si aggiorna da solo. Per vedere
#  dati nuovi, rieseguire lo script. Il comando `--watch` lo rigenera ogni
#  60 secondi in background.
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
ROOT="$(pwd)"
OUT="$ROOT/dashboard.html"

# ── 1. RACCOLTA DATI ─────────────────────────────────────────────────
INIZIO_TS=$(date +%s)

# Codice
TS_TOT=$(npx tsc --noEmit 2>&1 | grep -c "error TS" || true)
TS_LISTA=$(npx tsc --noEmit 2>&1 | grep "error TS" | head -40 || true)
PATCH_A="no"
grep -q "SortRound" src/content/types.ts 2>/dev/null && PATCH_A="sì"

SRC_FILE=$(find src -name "*.ts" 2>/dev/null | wc -l | tr -d ' ')
SRC_RIGHE=$(find src -name "*.ts" -exec cat {} \; 2>/dev/null | wc -l | tr -d ' ')
SCENE=$(ls src/scenes/*.ts 2>/dev/null | wc -l | tr -d ' ')

# Test (solo conteggi, output breve)
# Il testo integrale serve per la stampa; i NUMERI servono ai grafici.
VITEST_RAW=$(npm test 2>&1 | grep -E "^ *Tests " | tail -1 | sed 's/^ *//' || echo "n/d")
VITEST_OUT="$VITEST_RAW"
VITEST_PASS=$(printf '%s' "$VITEST_RAW" | grep -oE '[0-9]+ passed' | grep -oE '[0-9]+' | head -1); VITEST_PASS=${VITEST_PASS:-0}
VITEST_FAIL=$(printf '%s' "$VITEST_RAW" | grep -oE '[0-9]+ failed' | grep -oE '[0-9]+' | head -1); VITEST_FAIL=${VITEST_FAIL:-0}
VITEST_SKIP=$(printf '%s' "$VITEST_RAW" | grep -oE '[0-9]+ skipped' | grep -oE '[0-9]+' | head -1); VITEST_SKIP=${VITEST_SKIP:-0}

PW_OUT=""; PW_PASS=0; PW_FAIL=0; PW_SKIP=0
if [ -x node_modules/.bin/playwright ]; then
  PW_RAW=$(npx playwright test 2>&1 || true)
  PW_OUT=$(printf '%s' "$PW_RAW" | grep -E "[0-9]+ passed|[0-9]+ failed|[0-9]+ skipped" | tail -1 | sed 's/^ *//')
  PW_PASS=$(printf '%s' "$PW_RAW" | grep -oE '[0-9]+ passed' | grep -oE '[0-9]+' | head -1); PW_PASS=${PW_PASS:-0}
  PW_FAIL=$(printf '%s' "$PW_RAW" | grep -oE '[0-9]+ failed' | grep -oE '[0-9]+' | head -1); PW_FAIL=${PW_FAIL:-0}
  PW_SKIP=$(printf '%s' "$PW_RAW" | grep -oE '[0-9]+ skipped' | grep -oE '[0-9]+' | head -1); PW_SKIP=${PW_SKIP:-0}
fi

# Sessioni (dal database di OpenCode)
DB="$HOME/.local/share/opencode/opencode.db"
SESSIONI=""
if [ -f "$DB" ]; then
  SESSIONI=$(sqlite3 -separator '|' "$DB" \
    "SELECT COALESCE(title,'(senza titolo)'),
            COALESCE(json_extract(model,'\$.providerID') || '/' || json_extract(model,'\$.id'), '-'),
            datetime(time_updated/1000,'unixepoch','localtime')
     FROM session_v2 ORDER BY time_updated DESC LIMIT 5;" 2>/dev/null || true)
fi

# ── Segnale di "thrashing" di B (ultime 12 ore) ──────────────────────
# PERCHÉ: stanotte B ha fatto 27 compaction, 40 letture e solo 2 modifiche,
# restando ferma 3 ore. Il rapporto letture/modifiche è il campanello che
# mancava: alto = B legge e rilegge senza produrre (loop da compaction).
# Dati REALI dal DB, niente stime.
SES_B="ses_ea0501762ffeu4cberdJrM00C9"
B_COMPACT=0; B_TURNI=0; B_LETTURE=0; B_MODIFICHE=0; B_RAPPORTO="—"
if [ -f "$DB" ]; then
  _r=$(sqlite3 -separator '|' "$DB" "
    SELECT SUM(type='compaction'),
           SUM(type='assistant'),
           SUM(CASE WHEN data LIKE '%\"name\":\"read\"%' THEN 1 ELSE 0 END),
           SUM(CASE WHEN data LIKE '%\"name\":\"edit\"%' THEN 1 ELSE 0 END)
    FROM session_message WHERE session_id='$SES_B'
    AND time_created > (strftime('%s','now')-12*3600)*1000;" 2>/dev/null)
  if [ -n "$_r" ]; then
    B_COMPACT=$(printf '%s' "$_r" | cut -d'|' -f1); B_COMPACT=${B_COMPACT:-0}; B_COMPACT=${B_COMPACT:-0}
    B_TURNI=$(printf '%s' "$_r" | cut -d'|' -f2); B_TURNI=${B_TURNI:-0}
    B_LETTURE=$(printf '%s' "$_r" | cut -d'|' -f3); B_LETTURE=${B_LETTURE:-0}
    B_MODIFICHE=$(printf '%s' "$_r" | cut -d'|' -f4); B_MODIFICHE=${B_MODIFICHE:-0}
    [ "$B_MODIFICHE" -gt 0 ] && B_RAPPORTO="$(( B_LETTURE / B_MODIFICHE )):1"
  fi
fi
# Allarme: molte compaction e poche modifiche = B sta girando a vuoto.
B_ALLARME="no"
if [ "${B_COMPACT:-0}" -ge 10 ] && [ "${B_MODIFICHE:-0}" -le 2 ]; then B_ALLARME="sì"; fi

# Timeline: le ultime voci del registro in COORDINAMENTO.md (dati reali, non inventati).
# Le righe hanno forma: `| 23/10 00:45 | A | testo |`
TIMELINE=""
if [ -f "$ROOT/COORDINAMENTO.md" ]; then
  TIMELINE=$(grep -E "^\| [0-9]{2}/[0-9]{2} [0-9]{2}:[0-9]{2} \|" "$ROOT/COORDINAMENTO.md" | tail -12 || true)
fi

# ── Sessione C (revisore Antigravity/Gemini) ─────────────────────────
# SOLO DATI VERI. Non esiste un "avanzamento %" leggibile di agy: mostrarlo
# sarebbe inventare un dato. Qui leggiamo ciò che è realmente verificabile:
#   - se il binario agy esiste e che versione è (agy --version);
#   - il contenuto di REVISIONI.md (il PRODOTTO di C): numero di rilievi per gravità;
#   - quando C ha scritto l'ultima volta (mtime di REVISIONI.md).
C_AGY_VERSIONE=""
if command -v agy >/dev/null 2>&1; then
  C_AGY_VERSIONE=$(agy --version 2>/dev/null | head -1 | tr -d '\r' || true)
elif [ -x "$HOME/.local/bin/agy" ]; then
  C_AGY_VERSIONE=$("$HOME/.local/bin/agy" --version 2>/dev/null | head -1 | tr -d '\r' || true)
fi

C_RILIEVI_TOT=0; C_RILIEVI_ERR=0; C_RILIEVI_RIS=0; C_RILIEVI_NOTA=0; C_RILIEVI_CHIUSI=0
C_ULTIMA="—"; C_REV_HTML=""
if [ -f "$ROOT/REVISIONI.md" ]; then
  C_ULTIMA=$(stat -f '%Sm' -t '%d/%m %H:%M' "$ROOT/REVISIONI.md" 2>/dev/null || echo '—')
  # Conta le righe della tabella "Rilievi": | # | 🔴/🟡/🔵/✅ | ... | ... | stato |
  C_RILIEVI_ERR=$(grep -cE '^\| [0-9]+ \| 🔴' "$ROOT/REVISIONI.md" || true)
  C_RILIEVI_RIS=$(grep -cE '^\| [0-9]+ \| 🟡' "$ROOT/REVISIONI.md" || true)
  C_RILIEVI_NOTA=$(grep -cE '^\| [0-9]+ \| 🔵' "$ROOT/REVISIONI.md" || true)
  C_RILIEVI_CHIUSI=$(grep -cE '^\| [0-9]+ \| ✅' "$ROOT/REVISIONI.md" || true)
  C_RILIEVI_TOT=$(( C_RILIEVI_ERR + C_RILIEVI_RIS + C_RILIEVI_NOTA + C_RILIEVI_CHIUSI ))
  # Righe grezze dei rilievi (per la tabella), ripulite dal markdown minimo.
  # Colonne reali in REVISIONI.md: | # | Gravità | Dove | Cosa | Verifica di A | Stato |
  C_REV_HTML="<table><thead><tr><th>#</th><th>Gravità</th><th>Dove</th><th>Cosa</th><th>Verifica di A</th><th>Stato</th></tr></thead><tbody>"
  esc(){ printf '%s' "$1" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g'; }
  pul(){ printf '%s' "$1" | sed 's/`//g; s/\*\*//g' | sed 's/^ *//; s/ *$//'; }
  while IFS= read -r riga; do
    [ -z "$riga" ] && continue
    # Estraggo i 6 campi con python (le celle possono contenere caratteri speciali).
    num=$(printf '%s' "$riga"  | python3 -c 'import sys;print(sys.stdin.read().split("|")[1].strip())' 2>/dev/null || echo '?')
    grav=$(printf '%s' "$riga" | python3 -c 'import sys;print(sys.stdin.read().split("|")[2].strip())' 2>/dev/null || echo '')
    dove=$(printf '%s' "$riga" | python3 -c 'import sys;print(sys.stdin.read().split("|")[3].strip())' 2>/dev/null || echo '')
    cosa=$(printf '%s' "$riga" | python3 -c 'import sys;print(sys.stdin.read().split("|")[4].strip())' 2>/dev/null || echo '')
    verif=$(printf '%s' "$riga"| python3 -c 'import sys;print(sys.stdin.read().split("|")[5].strip())' 2>/dev/null || echo '')
    stato=$(printf '%s' "$riga"| python3 -c 'import sys;t=sys.stdin.read().split("|");print(t[6].strip() if len(t)>6 else "")' 2>/dev/null || echo '')
    st_class=""
    case "$stato" in aperto*) st_class=' style="color:var(--warn);white-space:nowrap"';; chiuso*|corrett*) st_class=' style="color:var(--ok);white-space:nowrap"';; esac
    C_REV_HTML="$C_REV_HTML<tr><td>$(pul "$num")</td><td style=\"white-space:nowrap\">$(esc "$(pul "$grav")")</td><td><code>$(esc "$(pul "$dove")")</code></td><td>$(esc "$(pul "$cosa")")</td><td class=\"muted\">$(esc "$(pul "$verif")")</td><td$st_class>$(esc "$(pul "$stato")")</td></tr>"
  done < <(grep -E '^\| [0-9]+ \| (🔴|🟡|🔵|✅)' "$ROOT/REVISIONI.md" || true)
  C_REV_HTML="$C_REV_HTML</tbody></table>"
else
  C_REV_HTML='<p class="muted">REVISIONI.md non esiste ancora.</p>'
fi

# ── Automazione notturna: sorvegliante + coda + canale ───────────────
# Dati REALI: dal lock del processo, dal diario, da CODA.md, da IDIS.
SORV_ATTIVO="no"; SORV_PID="—"; SORV_DIARIO_ULT=""; SORV_DIARIO_N=0
SORV_STATO="assente"; SORV_INVIATO="no"; SORV_QUANDO="—"
if [ -f "$ROOT/tools/.sorvegliante/lock" ]; then
  SORV_PID=$(cat "$ROOT/tools/.sorvegliante/lock" 2>/dev/null || echo '—')
  if kill -0 "$SORV_PID" 2>/dev/null; then SORV_ATTIVO="sì"; fi
fi
if [ -f "$ROOT/tools/.sorvegliante/diario.log" ]; then
  SORV_DIARIO_N=$(grep -c . "$ROOT/tools/.sorvegliante/diario.log" 2>/dev/null || echo 0)
  SORV_DIARIO_ULT=$(tail -1 "$ROOT/tools/.sorvegliante/diario.log" 2>/dev/null | sed 's/^\[[^]]*\] *//' || true)
fi
if [ -f "$ROOT/tools/.sorvegliante/stato.txt" ]; then
  SORV_STATO=$(grep -E '^compito1=' "$ROOT/tools/.sorvegliante/stato.txt" 2>/dev/null | cut -d= -f2 || echo '?')
  SORV_QUANDO=$(grep -E '^aggiornato=|^quando=' "$ROOT/tools/.sorvegliante/stato.txt" 2>/dev/null | cut -d= -f2 | head -1 || echo '—')
fi
[ -f "$ROOT/tools/.sorvegliante/compito2_inviato" ] && SORV_INVIATO=$(cat "$ROOT/tools/.sorvegliante/compito2_inviato" 2>/dev/null)

# CODA.md → tabella dei compiti + conteggio aperti/chiusi
CODA_HTML=""; CODA_APERTI=0; CODA_FATTI=0
if [ -f "$ROOT/CODA.md" ]; then
  CODA_HTML="<table><thead><tr><th>#</th><th>Compito</th><th>In coda</th><th>Esito</th></tr></thead><tbody>"
  # righe del registro: | N | nome | data | preso | esito |  (5 colonne)
  while IFS= read -r r; do
    [ -z "$r" ] && continue
    n=$(printf '%s' "$r" | awk -F'|' '{gsub(/^ +| +$/,"",$2);print $2}')
    nome=$(printf '%s' "$r" | awk -F'|' '{gsub(/^ +| +$/,"",$3);print $3}' | sed 's/\*\*//g; s/`//g')
    quando=$(printf '%s' "$r" | awk -F'|' '{gsub(/^ +| +$/,"",$4);print $4}')
    esito=$(printf '%s' "$r" | awk -F'|' '{gsub(/^ +| +$/,"",$6);print $6}')
    case "$esito" in *⬜*) CODA_APERTI=$((CODA_APERTI+1));; *✅*) CODA_FATTI=$((CODA_FATTI+1));; esac
    CODA_HTML="$CODA_HTML<tr><td>$n</td><td>$nome</td><td class=\"muted\">$quando</td><td>$esito</td></tr>"
  done < <(grep -E '^\| [0-9]+ \|' "$ROOT/CODA.md" | grep -vE 'esistono le scene|si decide' || true)
  CODA_HTML="$CODA_HTML</tbody></table>"
fi

# IDEE.md → conteggio idee in attesa
IDEE_N=0
[ -f "$ROOT/IDEE.md" ] && IDEE_N=$(grep -cE '^\| *[🟢🟡🔵🔴✅]|^\| *[0-9]+ *\|' "$ROOT/IDEE.md" 2>/dev/null || echo 0)

# CREDITI-ARGON.md → token totali spesi da C
ARGON_TOK=0; ARGON_CHIAMATE=0
if [ -f "$ROOT/CREDITI-ARGON.md" ]; then
  while IFS= read -r r; do
    t=$(printf '%s' "$r" | awk -F'|' '{gsub(/[^0-9]/,"",$5);print $5}')
    [ -n "$t" ] && [ "$t" != "0" ] && { ARGON_TOK=$((ARGON_TOK+t)); ARGON_CHIAMATE=$((ARGON_CHIAMATE+1)); }
  done < <(grep -E '^\| [0-9]{2}/[0-9]{2} ' "$ROOT/CREDITI-ARGON.md" || true)
fi

# ── Dati VOLATILI: letti tutti insieme, il più tardi possibile ───────
# Nota di correttezza: i dati lenti (tsc, test) sono stati misurati nei
# secondi precedenti; questi qui sotto sono invece lo stato "adesso".
# L'orario di QUESTA sezione è quello mostrato come istante della rilevazione.

# Modello locale
LM_PID=$(pgrep -f "llama-server" | head -1 || true)
LM_STATO="non attivo"
LM_TEMPO=""
LM_CPU=""
LM_RSS=""
if [ -n "$LM_PID" ]; then
  T1=$(ps -p "$LM_PID" -o time= 2>/dev/null | tr -d ' ')
  sleep 2
  T2=$(ps -p "$LM_PID" -o time= 2>/dev/null | tr -d ' ')
  LM_CPU=$(ps -p "$LM_PID" -o %cpu= 2>/dev/null | tr -d ' ')
  RSS=$(ps -p "$LM_PID" -o rss= 2>/dev/null | tr -d ' ')
  LM_RSS=$(awk -v r="${RSS:-0}" 'BEGIN { printf "%.2f", r/1048576 }')
  LM_TEMPO="$T1 → $T2"
  if [ "$T1" != "$T2" ]; then LM_STATO="sta elaborando"; else LM_STATO="inattivo (pronto)"; fi
fi

# Connessioni: letta ADESSO, nello stesso istante dello stato del modello,
# così i due valori sono coerenti fra loro. Se il modello non è attivo, il
# numero di connessioni non ha significato e viene azzerato.
if [ -n "$LM_PID" ]; then
  LM_CONN=$(lsof -nP -iTCP:1234 2>/dev/null | grep -c ESTABLISHED)
  LM_CONN=${LM_CONN:-0}
else
  LM_CONN="—"
fi

# Memoria: letta adesso.
RSS_TOT=$(sysctl -n hw.memsize 2>/dev/null | awk '{printf "%.0f", $1/1073741824}')
MEM_LIB=$(memory_pressure 2>/dev/null | grep -oE 'free percentage: [0-9]+' | grep -oE '[0-9]+')
MEM_LIB=${MEM_LIB:-?}

# File modificati di recente (ultimi 60 min)
RECENTI=$(find src -name "*.ts" -newermt "-60 minutes" 2>/dev/null || true)
N_RECENTI=$(printf '%s' "$RECENTI" | grep -c .)
N_RECENTI=${N_RECENTI:-0}

# Marca temporale: l'istante ESATTO della rilevazione dei dati volatili.
ORA=$(date '+%d/%m/%Y %H:%M:%S')
DURATA=$(( $(date +%s) - INIZIO_TS ))

# ── 2. VALUTAZIONI ───────────────────────────────────────────────────

# Stato complessivo (semaforo)
if [ "$TS_TOT" -eq 0 ] && [ "$SCENE" -gt 0 ]; then
  SEMAFORO="verde"; STATO_TXT="Tutto in ordine"
elif [ "$TS_TOT" -eq 0 ]; then
  SEMAFORO="giallo"; STATO_TXT="Codice pulito, scene in corso"
else
  SEMAFORO="giallo"; STATO_TXT="In sviluppo (errori noti, patch in valutazione)"
fi

# Genera le righe HTML per gli errori tsc
if [ -z "$TS_LISTA" ]; then
  ERRORI_HTML='<p class="ok">Nessun errore: il codice compila.</p>'
else
  ERRORI_HTML="<ul class=\"errori\">"
  while IFS= read -r riga; do
    [ -z "$riga" ] && continue
    # evidenzia file e codice errore
    riga_esc=$(printf '%s' "$riga" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    ERRORI_HTML="$ERRORI_HTML<li><code>$riga_esc</code></li>"
  done <<< "$TS_LISTA"
  ERRORI_HTML="$ERRORI_HTML</ul>"
fi

# Righe sessioni
if [ -z "$SESSIONI" ]; then
  SESSIONI_HTML='<tr><td colspan="3" class="muted">nessuna sessione trovata</td></tr>'
else
  SESSIONI_HTML=""
  while IFS='|' read -r titolo modello quando; do
    [ -z "$titolo" ] && continue
    t=$(printf '%s' "$titolo" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    SESSIONI_HTML="$SESSIONI_HTML<tr><td>$t</td><td><code>$modello</code></td><td class=\"muted\">$quando</td></tr>"
  done <<< "$SESSIONI"
fi

# Righe file modificati di recente
if [ "$N_RECENTI" -eq 0 ]; then
  RECENTI_HTML='<p class="muted">Nessun file src/ modificato nell'"'"'ultima ora.</p>'
else
  RECENTI_HTML="<ul>"
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    RECENTI_HTML="$RECENTI_HTML<li><code>$f</code> <span class=\"muted\">($(stat -f '%Sm' -t '%H:%M' "$f"))</span></li>"
  done <<< "$RECENTI"
  RECENTI_HTML="$RECENTI_HTML</ul>"
fi

# Patch A
if [ "$PATCH_A" = "sì" ]; then
  PATCH_HTML='<span class="pill ok">applicata</span>'
else
  PATCH_HTML='<span class="pill warn">in valutazione</span>'
fi

# Timeline HTML: ogni voce diventa un nodo con orario, autore e testo.
# Il testo passa da markdown minimale (**grassetto**, `codice`) a HTML.
if [ -z "$TIMELINE" ]; then
  TIMELINE_HTML='<p class="muted">Nessuna voce di registro trovata in COORDINAMENTO.md.</p>'
else
  TIMELINE_HTML="<ol class=\"timeline\">"
  while IFS= read -r riga; do
    [ -z "$riga" ] && continue
    # separa:  | dataora | autore | testo... |
    quando=$(printf '%s' "$riga" | awk -F'|' '{gsub(/^ +| +$/,"",$2); print $2}')
    autore=$(printf '%s' "$riga" | awk -F'|' '{gsub(/^ +| +$/,"",$3); print $3}')
    testo=$(printf '%s' "$riga" | awk -F'|' '{gsub(/^ +| +$/,"",$4); print $4}')
    # markdown minimale → HTML (prima si scappa, poi si decora)
    testo=$(printf '%s' "$testo" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    testo=$(printf '%s' "$testo" | sed -E 's/\*\*([^*]+)\*\*/<strong>\1<\/strong>/g')
    testo=$(printf '%s' "$testo" | sed -E 's/`([^`]+)`/<code>\1<\/code>/g')
    TIMELINE_HTML="$TIMELINE_HTML<li class=\"ev\"><span class=\"ev-ora\">$quando</span><span class=\"ev-autore\">$autore</span><span class=\"ev-testo\">$testo</span></li>"
  done <<< "$TIMELINE"
  TIMELINE_HTML="$TIMELINE_HTML</ol>"
fi

# Barra di avanzamento sessioni: percentuale di errori risolti rispetto al picco noto.
# Il picco è 36 (misurato); quando arriva a 0 la barra è piena.
PICCO_ERRORI=36
KPI_PCT=$(( 100 - (TS_TOT * 100 / PICCO_ERRORI) ))
[ "$KPI_PCT" -lt 0 ] && KPI_PCT=0
[ "$KPI_PCT" -gt 100 ] && KPI_PCT=100

# ── 3. TEMPLATE HTML ─────────────────────────────────────────────────
export OUT ORA DURATA STATO_TXT SEMAFORO TS_TOT ERRORI_HTML PATCH_HTML SRC_FILE SRC_RIGHE SCENE \
       VITEST_OUT PW_OUT SESSIONI_HTML LM_STATO LM_CPU LM_TEMPO LM_CONN LM_RSS LM_PID \
       RSS_TOT MEM_LIB RECENTI_HTML TIMELINE_HTML \
       VITEST_PASS VITEST_FAIL VITEST_SKIP PW_PASS PW_FAIL PW_SKIP KPI_PCT \
       C_AGY_VERSIONE C_RILIEVI_TOT C_RILIEVI_ERR C_RILIEVI_RIS C_RILIEVI_NOTA C_RILIEVI_CHIUSI C_ULTIMA C_REV_HTML \
       SORV_ATTIVO SORV_PID SORV_DIARIO_ULT SORV_DIARIO_N SORV_STATO SORV_INVIATO SORV_QUANDO \
       CODA_HTML CODA_APERTI CODA_FATTI IDEE_N ARGON_TOK ARGON_CHIAMATE \
       B_COMPACT B_TURNI B_LETTURE B_MODIFICHE B_RAPPORTO B_ALLARME

python3 - <<'PYEOF'
import os
e = os.environ
def g(k, d=""): return e.get(k, d)

html = f"""<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard — Scuola in Corsa</title>
<!-- Auto-ricarica: la pagina si ricarica ogni 30s, così se `dashboard.sh --watch`
     sta rigenerando il file, i dati si aggiornano da soli. Se lo script NON è in
     esecuzione, la pagina si ricarica ma i dati restano quelli dell'ultima
     generazione (l'orario in alto te lo dice sempre con certezza). -->
<meta http-equiv="refresh" content="30">
<style>
  :root {{
    /* Tavolozza moderna, desaturata. Ogni colore-testo supera WCAG AA (>=4.5:1)
       sul fondo delle schede; i valori di contrasto sono verificati. */
    --bg: #0a0d13; --bg2: #10141d; --card: #151a24; --card2: #1e2531;
    --txt: #eef2f8; --muted: #939db3;
    --ok: #4ade80; --warn: #fbbf24; --bad: #f87171;
    --info: #5ea8ff; --viola: #b18cf5;
    --border: #303a4e; --border-soft: #232a39;
    --ombra: 0 1px 2px rgba(0,0,0,.35), 0 8px 24px -12px rgba(0,0,0,.6);
  }}
  * {{ box-sizing: border-box; }}
  body {{
    margin: 0; padding: 26px 24px;
    background:
      radial-gradient(1400px 700px at 50% -15%, #141c2e 0%, transparent 65%),
      var(--bg);
    color: var(--txt);
    font: 15px/1.55 -apple-system, "Segoe UI", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }}
  /* Larghezza: si sfrutta il 95% della finestra. Il tetto a 3000px evita solo
     che su monitor ultra-larghi le righe di testo diventino illeggibili. */
  .wrap {{ width: 95%; max-width: 3000px; margin: 0 auto; }}

  /* ── Intestazione ─────────────────────────────── */
  header {{ display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 26px; }}
  h1 {{ margin: 0 0 6px; font-size: 27px; letter-spacing: -.5px; font-weight: 700; }}
  h1 .anno {{ color: var(--muted); font-weight: 400; font-size: 17px; }}
  .sub {{ color: var(--muted); font-size: 13px; }}
  .semaforo {{
    display: flex; align-items: center; gap: 12px; background: var(--card);
    border: 1px solid var(--border-soft); border-radius: 14px; padding: 14px 20px;
    box-shadow: var(--ombra); min-width: 260px;
  }}
  .dot {{ width: 14px; height: 14px; border-radius: 50%; flex: none; }}
  .dot.verde {{ background: var(--ok); box-shadow: 0 0 14px var(--ok); }}
  .dot.giallo {{ background: var(--warn); box-shadow: 0 0 14px var(--warn); }}
  .dot.rosso {{ background: var(--bad); box-shadow: 0 0 14px var(--bad); }}

  /* ── Schede KPI ───────────────────────────────── */
  .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px; }}
  .kpi {{
    background: linear-gradient(180deg, var(--card) 0%, var(--card2) 160%);
    border: 1px solid var(--border-soft); border-radius: 14px; padding: 18px 20px;
    box-shadow: var(--ombra); position: relative; overflow: hidden;
  }}
  .kpi::after {{
    content: ""; position: absolute; inset: 0 0 auto 0; height: 3px;
    background: linear-gradient(90deg, var(--accento, var(--info)), transparent);
  }}
  .kpi .lab {{ color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: .9px; margin-bottom: 10px; }}
  .kpi .val {{ font-size: 32px; font-weight: 700; letter-spacing: -.8px; line-height: 1.1; font-variant-numeric: tabular-nums; }}
  .kpi .val small {{ font-size: 13px; font-weight: 400; color: var(--muted); letter-spacing: 0; }}
  .kpi .nota {{ font-size: 12px; color: var(--muted); margin-top: 8px; }}

  /* ── Sezioni ──────────────────────────────────── */
  section {{
    background: var(--card); border: 1px solid var(--border-soft); border-radius: 14px;
    padding: 22px 24px; margin-bottom: 18px; box-shadow: var(--ombra);
  }}
  h2 {{
    margin: 0 0 18px; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1.4px;
    color: var(--info); font-weight: 700; display: flex; align-items: center; gap: 8px;
  }}
  h2::before {{ content: ""; width: 3px; height: 14px; background: currentColor; border-radius: 2px; }}

  /* ── Grafici ──────────────────────────────────── */
  .grafici {{ display: grid; grid-template-columns: 340px 1fr; gap: 32px; align-items: center; }}
  @media (max-width: 820px) {{ .grafici {{ grid-template-columns: 1fr; }} }}
  .ciambella {{ display: flex; flex-direction: column; align-items: center; gap: 14px; }}
  .ciambella svg {{ transform: rotate(-90deg); filter: drop-shadow(0 0 12px rgba(0,0,0,.35)); }}
  .ciambella .pct {{ font-size: 30px; font-weight: 700; fill: var(--txt); }}
  .ciambella .pct-lab {{ font-size: 11px; fill: var(--muted); }}
  .ciambella .legenda {{ font-size: 12.5px; color: var(--muted); text-align: center; }}
  .barre {{ display: flex; flex-direction: column; gap: 18px; }}
  .barra-riga .etich {{ display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 7px; }}
  .barra-riga .etich .num {{ font-variant-numeric: tabular-nums; color: var(--muted); }}
  .barra {{ height: 10px; background: var(--card2); border-radius: 99px; overflow: hidden; display: flex; }}
  .barra > i {{ display: block; height: 100%; transition: width .3s; }}
  .barra > i.pass {{ background: linear-gradient(90deg, #34d399, var(--ok)); }}
  .barra > i.fail {{ background: linear-gradient(90deg, #ef4444, var(--bad)); }}
  .barra > i.skip {{ background: #4a5468; }}
  .barra > i.info {{ background: linear-gradient(90deg, #3b82f6, var(--info)); }}

  /* ── Timeline ─────────────────────────────────── */
  /* `min(430px, 100%)` evita l'overflow: su schermi stretti la colonna
     scende sotto i 430px invece di forzare la larghezza. */
  .timeline {{ list-style: none; margin: 0; padding: 0; position: relative;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(min(430px, 100%), 1fr));
    gap: 12px 14px; align-items: start; }}
  .ev {{ position: relative; padding: 12px 14px 12px 34px; font-size: 13.5px;
    background: var(--card2); border: 1px solid var(--border-soft);
    border-radius: 10px; }}
  .ev::before {{
    content: ""; position: absolute; left: 13px; top: 17px; width: 9px; height: 9px;
    border-radius: 50%; background: var(--info);
    box-shadow: 0 0 0 3px rgba(94,168,255,.16);
  }}
  .ev-ora {{ font-variant-numeric: tabular-nums; color: var(--viola); font-weight: 600; margin-right: 8px; }}
  .ev-autore {{
    display: inline-block; background: rgba(94,168,255,.14); color: var(--info);
    border: 1px solid rgba(94,168,255,.28);
    border-radius: 6px; padding: 0 7px; font-size: 11px; font-weight: 700;
    margin-right: 8px; vertical-align: 1px;
  }}
  .ev-testo {{ color: var(--txt); }}

  /* ── Tabelle ──────────────────────────────────── */
  table {{ width: 100%; border-collapse: collapse; font-size: 13.5px; }}
  td {{ padding: 9px 10px; border-bottom: 1px solid var(--border-soft); vertical-align: top; }}
  tr:last-child td {{ border-bottom: none; }}
  td:first-child {{ color: var(--muted); width: 230px; }}
  code {{ background: var(--card2); padding: 2px 6px; border-radius: 5px; font-size: 12.5px; word-break: break-word; color: #c7d4ee; }}
  .errori {{ margin: 0; padding-left: 0; list-style: none; }}
  .errori li {{ padding: 6px 0; border-bottom: 1px solid var(--border-soft); }}
  .errori li:last-child {{ border-bottom: none; }}
  .muted {{ color: var(--muted); }}
  .ok {{ color: var(--ok); margin: 0; }}
  .pill {{ display: inline-block; padding: 3px 11px; border-radius: 99px; font-size: 12px; font-weight: 600; }}
  .pill.ok {{ background: rgba(74,222,128,.14); color: var(--ok); }}
  .pill.warn {{ background: rgba(251,191,36,.14); color: var(--warn); }}
  .due {{ display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }}
  @media (max-width: 720px) {{ .due {{ grid-template-columns: 1fr; }} }}
  ul {{ margin: 0; padding-left: 18px; }}
  li {{ padding: 3px 0; }}
  footer {{ color: var(--muted); font-size: 12px; text-align: center; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--border-soft); }}
</style>
</head>
<body>
<div class="wrap">

  <header>
    <div>
      <h1>Scuola in Corsa <span class="anno">dashboard di sviluppo</span></h1>
      <div class="sub">Dati del <strong>{g('ORA')}</strong>
        <span class="pill warn" title="La pagina ricarica ogni 30s, ma i dati cambiano solo se dashboard.sh viene rieseguito">fotografia, non tempo reale</span>
        <br>Rilevazione durata {g('DURATA')}s &middot; modello e memoria letti all'istante finale
      </div>
    </div>
    <div class="semaforo">
      <span class="dot {g('SEMAFORO')}"></span>
      <div>
        <div style="font-weight:600">{g('STATO_TXT')}</div>
        <div class="muted" style="font-size:12px">{g('TS_TOT')} errori di tipo &middot; {g('SCENE')} scene</div>
      </div>
    </div>
  </header>

  {('<div style="background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.45);border-radius:12px;padding:14px 18px;margin-bottom:20px"><strong style="color:var(--warn)">&#9888;&#65039; B sta girando a vuoto</strong> &mdash; nelle ultime 12 ore: <strong>' + g('B_COMPACT') + ' compaction</strong>, <strong>' + g('B_LETTURE') + ' letture</strong>, solo <strong>' + g('B_MODIFICHE') + ' modifiche</strong> (rapporto ' + g('B_RAPPORTO') + '). Legge e rilegge senza applicare le correzioni: probabile loop da compaction. Serve un compito <em>corto</em> con le cause esatte.</div>') if g('B_ALLARME') == 'sì' else ''}

  <div class="grid">
    <div class="kpi" style="--accento: {'var(--ok)' if g('TS_TOT') == '0' else 'var(--warn)'}">
      <div class="lab">Errori TypeScript</div>
      <div class="val">{g('TS_TOT')} <small>/ atteso 0</small></div>
      <div class="nota">{g('KPI_PCT')}% del picco (36) risolto</div>
    </div>
    <div class="kpi" style="--accento: var(--info)">
      <div class="lab">Codice sorgente</div>
      <div class="val">{g('SRC_RIGHE')} <small>righe</small></div>
      <div class="nota">{g('SRC_FILE')} file in <code>src/</code></div>
    </div>
    <div class="kpi" style="--accento: {'var(--ok)' if g('VITEST_FAIL') == '0' else 'var(--bad)'}">
      <div class="lab">Test unitari (Vitest)</div>
      <div class="val">{int(g('VITEST_PASS') or 0) + int(g('VITEST_FAIL') or 0)} <small>eseguiti</small></div>
      <div class="nota">{g('VITEST_PASS')} passati &middot; {g('VITEST_FAIL')} falliti</div>
    </div>
    <div class="kpi" style="--accento: {'var(--ok)' if g('PW_FAIL') == '0' else 'var(--bad)'}">
      <div class="lab">Test end-to-end (Playwright)</div>
      <div class="val">{int(g('PW_PASS') or 0) + int(g('PW_FAIL') or 0)} <small>eseguiti</small></div>
      <div class="nota">{g('PW_PASS')} passati &middot; {g('PW_SKIP')} saltati &middot; {g('PW_FAIL')} falliti</div>
    </div>
    <div class="kpi" style="--accento: var(--viola)">
      <div class="lab">Compiti in coda a B</div>
      <div class="val">{g('CODA_APERTI')} <small>aperti</small></div>
      <div class="nota">{g('CODA_FATTI')} conclusi &middot; <code>CODA.md</code></div>
    </div>
    <div class="kpi" style="--accento: var(--warn)">
      <div class="lab">Crediti Argon (sessione C)</div>
      <div class="val">{int(g('ARGON_TOK') or 0):,} <small>token</small></div>
      <div class="nota">{g('ARGON_CHIAMATE')} chiamate &middot; {g('IDEE_N')} idee prodotte</div>
    </div>
  </div>

  <section>
    <h2>Grafici</h2>
    <div class="grafici">
      <div class="ciambella">
        <svg width="190" height="190" viewBox="0 0 190 190" role="img"
             aria-label="Errori risolti rispetto al picco di 36: {g('KPI_PCT')} per cento">
          <circle cx="95" cy="95" r="78" fill="none" stroke="#1e2531" stroke-width="16"/>
          <circle cx="95" cy="95" r="78" fill="none" stroke="{'#4ade80' if g('TS_TOT') == '0' else ('#f87171' if int(g('TS_TOT') or 0) > 36 else '#fbbf24')}"
                  stroke-width="16" stroke-linecap="round"
                  stroke-dasharray="{round(2 * 3.14159 * 78 * int(g('KPI_PCT') or 0) / 100)} 999"/>
          <text x="95" y="98" text-anchor="middle" class="pct">{g('KPI_PCT')}%</text>
          <text x="95" y="118" text-anchor="middle" class="pct-lab">{'completato' if g('TS_TOT') == '0' else 'errori risolti'}</text>
        </svg>
        <div class="legenda">
          {'✅ Il codice compila: 0 errori di tipo.' if g('TS_TOT') == '0' else str(g('TS_TOT')) + ' errori rimasti sul picco di 36'}
        </div>
      </div>
      <div class="barre">
        <div class="barra-riga">
          <div class="etich"><span>Test unitari — passati</span><span class="num">{g('VITEST_PASS')} / {int(g('VITEST_PASS') or 0) + int(g('VITEST_FAIL') or 0)}</span></div>
          <div class="barra">
            <i class="pass" style="width:{ (int(g('VITEST_PASS') or 0) * 100 // max(1, int(g('VITEST_PASS') or 0) + int(g('VITEST_FAIL') or 0))) }%"></i>
            <i class="fail" style="width:{ (int(g('VITEST_FAIL') or 0) * 100 // max(1, int(g('VITEST_PASS') or 0) + int(g('VITEST_FAIL') or 0))) }%"></i>
          </div>
        </div>
        <div class="barra-riga">
          <div class="etich"><span>Test end-to-end — passati</span><span class="num">{g('PW_PASS')} / {int(g('PW_PASS') or 0) + int(g('PW_FAIL') or 0) + int(g('PW_SKIP') or 0)}</span></div>
          <div class="barra">
            <i class="pass" style="width:{ (int(g('PW_PASS') or 0) * 100 // max(1, int(g('PW_PASS') or 0) + int(g('PW_FAIL') or 0) + int(g('PW_SKIP') or 0))) }%"></i>
            <i class="skip" style="width:{ (int(g('PW_SKIP') or 0) * 100 // max(1, int(g('PW_PASS') or 0) + int(g('PW_FAIL') or 0) + int(g('PW_SKIP') or 0))) }%"></i>
            <i class="fail" style="width:{ (int(g('PW_FAIL') or 0) * 100 // max(1, int(g('PW_PASS') or 0) + int(g('PW_FAIL') or 0) + int(g('PW_SKIP') or 0))) }%"></i>
          </div>
        </div>
        <div class="barra-riga">
          <div class="etich"><span>Errori TypeScript risolti</span><span class="num">{g('KPI_PCT')}%</span></div>
          <div class="barra"><i class="info" style="width:{g('KPI_PCT')}%"></i></div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <h2>Automazione notturna (sorvegliante &rarr; B)</h2>
    <div class="due">
      <div>
        <table>
          <tr><td>Sorvegliante</td><td>{'<span class="pill ok">attivo (PID ' + g('SORV_PID') + ')</span>' if g('SORV_ATTIVO') == 'sì' else '<span class="pill warn">non attivo</span>'}</td></tr>
          <tr><td>Stato Compito 1</td><td>{'<span class="pill ok">concluso</span>' if g('SORV_STATO') == 'concluso' else '<span class="pill warn">' + g('SORV_STATO') + '</span>'}</td></tr>
          <tr><td>Compito 2 inviato</td><td>{('<span class="pill ok">sì &middot; ' + g('SORV_INVIATO') + '</span>') if g('SORV_INVIATO') not in ('', 'no') else '<span class="pill warn">non ancora</span>'}</td></tr>
          <tr><td>Ultimo aggiornamento</td><td>{g('SORV_QUANDO')}</td></tr>
          <tr><td>B nelle ultime 12h</td><td><code>{g('B_COMPACT')}</code> compaction &middot; <code>{g('B_LETTURE')}</code> letture &middot; <code>{g('B_MODIFICHE')}</code> modifiche</td></tr>
          <tr><td>Rapporto letture/modifiche</td><td>{('<span class="pill warn">' + g('B_RAPPORTO') + ' &mdash; B legge e rilegge senza produrre</span>') if g('B_ALLARME') == 'sì' else ('<code>' + g('B_RAPPORTO') + '</code>')}</td></tr>
        </table>
      </div>
      <div>
        <div class="lab" style="color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.9px;margin-bottom:8px">Diario ({g('SORV_DIARIO_N')} righe)</div>
        <div class="muted" style="font-size:13px;background:var(--card2);border:1px solid var(--border-soft);border-radius:10px;padding:12px">Ultima: {g('SORV_DIARIO_ULT') or '—'}<br><br>
        Il sorvegliante invia il Compito 2 <strong>solo</strong> quando B &egrave; davvero ferma (tsc=0 + test verdi + CPU stabile + nessuna scrittura, per 2 giri). Non tocca <code>src/</code>.</div>
      </div>
    </div>
  </section>

  <section>
    <h2>Coda dei compiti per B (dispatcher di A)</h2>
    <div style="overflow-x:auto">{g('CODA_HTML')}</div>
  </section>

  <section>
    <h2>Registro attività (dal contratto)</h2>
    {g('TIMELINE_HTML')}
  </section>

  <section>
    <h2>Revisione indipendente (sessione C &middot; Antigravity/Gemini)</h2>
    <p class="muted" style="margin-top:0">
      C <strong>legge</strong> <code>src/</code> e segnala i difetti; scrive <strong>solo</strong>
      <code>REVISIONI.md</code>. Dati letti dal file e da <code>agy --version</code>.
      <em>Non</em> esiste una &laquo;percentuale di avanzamento&raquo; di C: mostrarla
      sarebbe inventare un dato, quindi non c&rsquo;&egrave;.
    </p>
    <table>
      <tr><td>Tool <code>agy</code> (CLI)</td><td>{'<span class="pill ok">v' + g('C_AGY_VERSIONE') + '</span>' if g('C_AGY_VERSIONE') else '<span class="pill warn">non installato</span>'}</td></tr>
      <tr><td>Ultima scrittura di C</td><td>{g('C_ULTIMA')}</td></tr>
      <tr><td>Rilievi totali</td><td><strong>{g('C_RILIEVI_TOT', '0')}</strong></td></tr>
      <tr><td>Per gravità</td><td><span class="pill" style="border-color:var(--bad);color:var(--bad)">🔴 {g('C_RILIEVI_ERR','0')} errori</span> <span class="pill" style="border-color:var(--warn);color:var(--warn)">🟡 {g('C_RILIEVI_RIS','0')} rischi</span> <span class="pill">🔵 {g('C_RILIEVI_NOTA','0')} note</span> <span class="pill" style="border-color:var(--ok);color:var(--ok)">✅ {g('C_RILIEVI_CHIUSI','0')} corretti</span></td></tr>
    </table>
    <div style="margin-top:14px;overflow-x:auto">{g('C_REV_HTML')}</div>
  </section>

  <section>
    <h2>Avanzamento del lavoro</h2>
    <table>
      <tr><td>Patch dei tipi (sezione A)</td><td>{g('PATCH_HTML')}</td></tr>
      <tr><td>Scene di gioco (<code>src/scenes/</code>)</td><td>{'<span class="pill ok">presenti</span>' if g('SCENE') != '0' else '<span class="pill warn">da scrivere</span>'}</td></tr>
      <tr><td>File <code>src/</code> modificati nell'ultima ora</td><td>{g('N_RECENTI', '0') if g('N_RECENTI') else '0'}</td></tr>
    </table>
    <div style="margin-top:14px">{g('RECENTI_HTML')}</div>
  </section>

  <section>
    <h2>Errori di tipo da risolvere</h2>
    {g('ERRORI_HTML')}
  </section>

  <div class="due">
    <section>
      <h2>Sessioni di lavoro</h2>
      <table>{g('SESSIONI_HTML')}</table>
    </section>

    <section>
      <h2>Modello locale (LM Studio)</h2>
      <table>
        <tr><td>Stato</td><td>{g('LM_STATO')}</td></tr>
        <tr><td>Processo</td><td><code>{g('LM_PID') or '—'}</code></td></tr>
        <tr><td>CPU</td><td>{g('LM_CPU') or '—'}%</td></tr>
        <tr><td>Tempo CPU (2s)</td><td><code>{g('LM_TEMPO') or '—'}</code></td></tr>
        <tr><td>Connessioni</td><td>{g('LM_CONN')}</td></tr>
        <tr><td>Memoria usata</td><td>{g('LM_RSS') or '—'} GB</td></tr>
        <tr><td>RAM totale / libera</td><td>{g('RSS_TOT')} GB / {g('MEM_LIB')}%</td></tr>
      </table>
    </section>
  </div>

  <footer>
    Generata da <code>tools/dashboard.sh</code> &middot; sola lettura: nessuna modifica al progetto, nessun accesso al modello.<br>
    Aggiorna: <code>bash tools/dashboard.sh</code> &middot; apri: <code>bash tools/dashboard.sh --open</code> &middot; automatico: <code>bash tools/dashboard.sh --watch</code>
  </footer>

</div>
</body>
</html>
"""

with open(os.environ["OUT"], "w", encoding="utf-8") as f:
    f.write(html)
print(f"  ✅ dashboard scritta: {os.environ['OUT']}")
PYEOF

# ── 4. OPZIONI CLI ───────────────────────────────────────────────────
case "${1:-}" in
  --open)
    command -v open >/dev/null 2>&1 && open "$OUT"
    ;;
  --watch)
    # Intervallo configurabile: `--watch [secondi]` (default 300s = 5 min).
    # ⚠️ Ogni giro esegue tsc + vitest + playwright: occupa la CPU. Poiché il
    # modello di B è LOCALE e gira su CPU, un intervallo troppo corto rallenta B.
    # Quindi il default non è 60s ma 300s: dati freschi senza rubare CPU a B.
    WATCH_INT="${2:-300}"
    echo "  ┌──────────────────────────────────────────────────────┐"
    echo "  │  MODALITÀ WATCH — la dashboard si aggiorna da sola    │"
    printf "  │  Rigenero ogni %-4ss. Apri dashboard.html nel browser.│\n" "$WATCH_INT"
    echo "  │  La pagina si ricarica ogni 30s e mostra i dati nuovi.│"
    echo "  │  Ctrl+C per uscire.                                   │"
    echo "  └──────────────────────────────────────────────────────┘"
    echo "  (intervallo lungo di proposito: ogni giro esegue i test e"
    echo "   occuperebbe la CPU del modello locale di B)"
    echo
    # Rigenera subito una volta, poi a intervalli regolari.
    bash "$0" >/dev/null 2>&1 && echo "  ✅ $(date '+%H:%M:%S') — dashboard aggiornata"
    # Assicura che l'HTML ricarichi: se manca il meta refresh, lo aggiunge.
    if ! grep -q 'http-equiv="refresh"' "$OUT" 2>/dev/null; then
      echo "  ⚠️  attenzione: il meta refresh non è presente nell'HTML"
    fi
    trap 'echo; echo "  watch terminato."; exit 0' INT TERM
    while true; do
      sleep "$WATCH_INT"
      if bash "$0" >/dev/null 2>&1; then
        printf '  ✅ %s — dashboard aggiornata\n' "$(date '+%H:%M:%S')"
      else
        printf '  ⚠️  %s — rigenerazione fallita\n' "$(date '+%H:%M:%S')"
      fi
    done
    ;;
esac
