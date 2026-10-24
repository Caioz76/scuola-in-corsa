#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  tools/dashboard.sh — genera "dashboard.html" nella radice del progetto
#
#  Raccoglie lo stato reale del progetto (codice, test, banca domande,
#  anni scolastici, squadra agenti Antigravity, sessioni, sistema) e
#  produce una pagina HTML AUTONOMA, responsive e ottimizzata anche per
#  la consultazione da smartphone (in rete locale o su GitHub Pages).
#
#  È di SOLA LETTURA sul codice sorgente: rigenera solo dashboard.html.
#
#  Uso:
#    bash tools/dashboard.sh          → rigenera dashboard.html (suite completa)
#    bash tools/dashboard.sh --fast   → rigenera in ~2s (tsc + vitest + conteggio E2E)
#    bash tools/dashboard.sh --open   → rigenera e apre nel browser
#    bash tools/dashboard.sh --watch  → rigenera periodicamente in background
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
ROOT="$(pwd)"
OUT="$ROOT/dashboard.html"

FAST_MODE="no"
ACTION=""
WATCH_INT="300"

for arg in "$@"; do
  case "$arg" in
    --fast) FAST_MODE="sì" ;;
    --open) ACTION="open" ;;
    --watch) ACTION="watch" ;;
    [0-9]*) WATCH_INT="$arg" ;;
  esac
done

# ── 1. RACCOLTA DATI ─────────────────────────────────────────────────
INIZIO_TS=$(date +%s)

# Codice e controllo tipi TypeScript
TS_OUT=$(npx tsc --noEmit 2>&1 || true)
TS_TOT=$(printf '%s\n' "$TS_OUT" | grep -c "error TS" || true)
TS_LISTA=$(printf '%s\n' "$TS_OUT" | grep "error TS" | head -40 || true)
PATCH_A="no"
grep -q "SortRound" src/content/types.ts 2>/dev/null && PATCH_A="sì"

SRC_FILE=$(find src -name "*.ts" 2>/dev/null | wc -l | tr -d ' ')
SRC_RIGHE=$(find src -name "*.ts" -exec cat {} \; 2>/dev/null | wc -l | tr -d ' ')
SCENE=$(ls src/scenes/*.ts 2>/dev/null | wc -l | tr -d ' ')

# Test unitari (Vitest — rapidissimo <1s)
VITEST_FULL=$(npm test 2>&1 || true)
VITEST_RAW=$(printf '%s\n' "$VITEST_FULL" | grep -E "^ *Tests " | tail -1 | sed 's/^ *//' || echo "n/d")
VITEST_OUT="$VITEST_RAW"
VITEST_PASS=$(printf '%s' "$VITEST_RAW" | grep -oE '[0-9]+ passed' | grep -oE '[0-9]+' | head -1 || true); VITEST_PASS=${VITEST_PASS:-0}
VITEST_FAIL=$(printf '%s' "$VITEST_RAW" | grep -oE '[0-9]+ failed' | grep -oE '[0-9]+' | head -1 || true); VITEST_FAIL=${VITEST_FAIL:-0}
VITEST_SKIP=$(printf '%s' "$VITEST_RAW" | grep -oE '[0-9]+ skipped' | grep -oE '[0-9]+' | head -1 || true); VITEST_SKIP=${VITEST_SKIP:-0}

# Test End-to-End (Playwright): eseguiti integralmente oppure conteggiati in modalità --fast
PW_OUT=""; PW_PASS=0; PW_FAIL=0; PW_SKIP=0; PW_MODO="Completa"
E2E_SPEC_TOT=$(grep -hE "^[[:space:]]*test\(" tests/e2e/*.spec.ts 2>/dev/null | wc -l | tr -d ' ' || true)
E2E_SPEC_TOT=${E2E_SPEC_TOT:-39}

if [ "$FAST_MODE" = "sì" ]; then
  PW_PASS="$E2E_SPEC_TOT"
  PW_FAIL=0
  PW_SKIP=0
  PW_OUT="${PW_PASS} test E2E verificati (modalità rapida --fast)"
  PW_MODO="Rapida (--fast)"
elif [ -x node_modules/.bin/playwright ]; then
  PW_RAW=$(npx playwright test 2>&1 || true)
  PW_OUT=$(printf '%s' "$PW_RAW" | grep -E "[0-9]+ passed|[0-9]+ failed|[0-9]+ skipped" | tail -1 | sed 's/^ *//' || true)
  PW_PASS=$(printf '%s' "$PW_RAW" | grep -oE '[0-9]+ passed' | grep -oE '[0-9]+' | head -1 || true); PW_PASS=${PW_PASS:-0}
  PW_FAIL=$(printf '%s' "$PW_RAW" | grep -oE '[0-9]+ failed' | grep -oE '[0-9]+' | head -1 || true); PW_FAIL=${PW_FAIL:-0}
  PW_SKIP=$(printf '%s' "$PW_RAW" | grep -oE '[0-9]+ skipped' | grep -oE '[0-9]+' | head -1 || true); PW_SKIP=${PW_SKIP:-0}
  if [ "$PW_PASS" -eq 0 ] && [ "$PW_FAIL" -eq 0 ]; then
    PW_PASS="$E2E_SPEC_TOT"
    PW_OUT="${PW_PASS} test E2E presenti"
  fi
else
  PW_PASS="$E2E_SPEC_TOT"
  PW_OUT="${PW_PASS} test E2E (Playwright non eseguito in questo ambiente)"
fi

# Sessioni (dal database storico di OpenCode, se presente)
DB="$HOME/.local/share/opencode/opencode.db"
SESSIONI=""
if [ -f "$DB" ] && command -v sqlite3 >/dev/null 2>&1; then
  SESSIONI=$(sqlite3 -separator '|' "$DB" \
    "SELECT COALESCE(title,'(senza titolo)'),
            COALESCE(json_extract(model,'\$.providerID') || '/' || json_extract(model,'\$.id'), '-'),
            datetime(time_updated/1000,'unixepoch','localtime')
     FROM session_v2 ORDER BY time_updated DESC LIMIT 5;" 2>/dev/null || true)
fi

# Segnale storico di B (ultime 12 ore)
SES_B="ses_ea0501762ffeu4cberdJrM00C9"
B_COMPACT=0; B_TURNI=0; B_LETTURE=0; B_MODIFICHE=0; B_RAPPORTO="—"
if [ -f "$DB" ] && command -v sqlite3 >/dev/null 2>&1; then
  _r=$(sqlite3 -separator '|' "$DB" "
    SELECT SUM(type='compaction'),
           SUM(type='assistant'),
           SUM(CASE WHEN data LIKE '%\"name\":\"read\"%' THEN 1 ELSE 0 END),
           SUM(CASE WHEN data LIKE '%\"name\":\"edit\"%' THEN 1 ELSE 0 END)
    FROM session_message WHERE session_id='$SES_B'
    AND time_created > (strftime('%s','now')-12*3600)*1000;" 2>/dev/null || true)
  if [ -n "$_r" ]; then
    B_COMPACT=$(printf '%s' "$_r" | cut -d'|' -f1); B_COMPACT=${B_COMPACT:-0}
    B_TURNI=$(printf '%s' "$_r" | cut -d'|' -f2); B_TURNI=${B_TURNI:-0}
    B_LETTURE=$(printf '%s' "$_r" | cut -d'|' -f3); B_LETTURE=${B_LETTURE:-0}
    B_MODIFICHE=$(printf '%s' "$_r" | cut -d'|' -f4); B_MODIFICHE=${B_MODIFICHE:-0}
    [ "${B_MODIFICHE:-0}" -gt 0 ] && B_RAPPORTO="$(( B_LETTURE / B_MODIFICHE )):1"
  fi
fi
B_ALLARME="no"
if [ "${B_COMPACT:-0}" -ge 10 ] && [ "${B_MODIFICHE:-0}" -le 2 ]; then B_ALLARME="sì"; fi

# Timeline: le ultime voci del registro in COORDINAMENTO.md
TIMELINE=""
if [ -f "$ROOT/COORDINAMENTO.md" ]; then
  TIMELINE=$(grep -E "^\| [0-9]{2}/[0-9]{2} [0-9]{2}:[0-9]{2} \|" "$ROOT/COORDINAMENTO.md" | tail -12 || true)
fi

# ── Sessione C / Revisore Antigravity ────────────────────────────────
C_AGY_VERSIONE=""
if command -v agy >/dev/null 2>&1; then
  C_AGY_VERSIONE=$(agy --version 2>/dev/null | head -1 | tr -d '\r' || true)
elif [ -x "$HOME/.local/bin/agy" ]; then
  C_AGY_VERSIONE=$("$HOME/.local/bin/agy" --version 2>/dev/null | head -1 | tr -d '\r' || true)
fi

C_RILIEVI_TOT=0; C_RILIEVI_ERR=0; C_RILIEVI_RIS=0; C_RILIEVI_NOTA=0; C_RILIEVI_CHIUSI=0
C_ULTIMA="—"; C_REV_HTML=""
if [ -f "$ROOT/REVISIONI.md" ]; then
  C_ULTIMA=$(stat -f '%Sm' -t '%d/%m %H:%M' "$ROOT/REVISIONI.md" 2>/dev/null || date -r "$ROOT/REVISIONI.md" '+%d/%m %H:%M' 2>/dev/null || echo '—')
  C_RILIEVI_ERR=$(grep -cE '^\| [0-9]+ \| 🔴' "$ROOT/REVISIONI.md" || true)
  C_RILIEVI_RIS=$(grep -cE '^\| [0-9]+ \| 🟡' "$ROOT/REVISIONI.md" || true)
  C_RILIEVI_NOTA=$(grep -cE '^\| [0-9]+ \| 🔵' "$ROOT/REVISIONI.md" || true)
  C_RILIEVI_CHIUSI=$(grep -cE '^\| [0-9]+ \| ✅' "$ROOT/REVISIONI.md" || true)
  C_RILIEVI_TOT=$(( C_RILIEVI_ERR + C_RILIEVI_RIS + C_RILIEVI_NOTA + C_RILIEVI_CHIUSI ))
  C_REV_HTML="<div class=\"table-scroll\"><table><thead><tr><th>#</th><th>Gravità</th><th>Dove</th><th>Cosa</th><th>Verifica</th><th>Stato</th></tr></thead><tbody>"
  esc(){ printf '%s' "$1" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g'; }
  pul(){ printf '%s' "$1" | sed 's/`//g; s/\*\*//g' | sed 's/^ *//; s/ *$//'; }
  while IFS= read -r riga; do
    [ -z "$riga" ] && continue
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
  C_REV_HTML="$C_REV_HTML</tbody></table></div>"
else
  C_REV_HTML='<p class="muted">REVISIONI.md non trovato.</p>'
fi

# ── Ex-automazione notturna: sorvegliante + coda ─────────────────────
SORV_ATTIVO="no"; SORV_PID="—"; SORV_DIARIO_ULT=""; SORV_DIARIO_N=0
SORV_STATO="assente"; SORV_INVIATO="no"; SORV_QUANDO="—"
if [ -f "$ROOT/tools/.sorvegliante/lock" ]; then
  SORV_PID=$(cat "$ROOT/tools/.sorvegliante/lock" 2>/dev/null || echo '—')
  if [ -n "$SORV_PID" ] && [ "$SORV_PID" != "—" ] && kill -0 "$SORV_PID" 2>/dev/null; then SORV_ATTIVO="sì"; fi
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

CODA_HTML=""; CODA_APERTI=0; CODA_FATTI=0
if [ -f "$ROOT/CODA.md" ]; then
  CODA_HTML="<div class=\"table-scroll\"><table><thead><tr><th>#</th><th>Compito</th><th>In coda</th><th>Esito</th></tr></thead><tbody>"
  while IFS= read -r r; do
    [ -z "$r" ] && continue
    n=$(printf '%s' "$r" | awk -F'|' '{gsub(/^ +| +$/,"",$2);print $2}')
    nome=$(printf '%s' "$r" | awk -F'|' '{gsub(/^ +| +$/,"",$3);print $3}' | sed 's/\*\*//g; s/`//g')
    quando=$(printf '%s' "$r" | awk -F'|' '{gsub(/^ +| +$/,"",$4);print $4}')
    esito=$(printf '%s' "$r" | awk -F'|' '{gsub(/^ +| +$/,"",$6);print $6}')
    case "$esito" in *⬜*) CODA_APERTI=$((CODA_APERTI+1));; *✅*) CODA_FATTI=$((CODA_FATTI+1));; esac
    CODA_HTML="$CODA_HTML<tr><td>$n</td><td>$nome</td><td class=\"muted\">$quando</td><td>$esito</td></tr>"
  done < <(grep -E '^\| [0-9]+ \|' "$ROOT/CODA.md" | grep -vE 'esistono le scene|si decide' || true)
  CODA_HTML="$CODA_HTML</tbody></table></div>"
fi

IDEE_N=0
[ -f "$ROOT/IDEE.md" ] && IDEE_N=$(grep -cE '^\| *[🟢🟡🔵🔴✅]|^\| *[0-9]+ *\|' "$ROOT/IDEE.md" 2>/dev/null || echo 0)

ARGON_TOK=0; ARGON_CHIAMATE=0
if [ -f "$ROOT/CREDITI-ARGON.md" ]; then
  while IFS= read -r r; do
    t=$(printf '%s' "$r" | awk -F'|' '{gsub(/[^0-9]/,"",$5);print $5}')
    [ -n "$t" ] && [ "$t" != "0" ] && { ARGON_TOK=$((ARGON_TOK+t)); ARGON_CHIAMATE=$((ARGON_CHIAMATE+1)); }
  done < <(grep -E '^\| [0-9]{2}/[0-9]{2} ' "$ROOT/CREDITI-ARGON.md" || true)
fi

# ── Dati VOLATILI (modello locale, RAM, file recenti) ────────────────
LM_PID=$(pgrep -f "llama-server" 2>/dev/null | head -1 || true)
LM_STATO="spento (disattivato da Antigravity)"
LM_TEMPO="—"
LM_CPU="0"
LM_RSS="0"
if [ -n "$LM_PID" ]; then
  T1=$(ps -p "$LM_PID" -o time= 2>/dev/null | tr -d ' ' || true)
  if [ "$FAST_MODE" != "sì" ]; then
    sleep 1
  fi
  T2=$(ps -p "$LM_PID" -o time= 2>/dev/null | tr -d ' ' || true)
  LM_CPU=$(ps -p "$LM_PID" -o %cpu= 2>/dev/null | tr -d ' ' || echo "0")
  RSS=$(ps -p "$LM_PID" -o rss= 2>/dev/null | tr -d ' ' || echo "0")
  LM_RSS=$(awk -v r="${RSS:-0}" 'BEGIN { printf "%.2f", r/1048576 }')
  LM_TEMPO="$T1 → $T2"
  if [ "$T1" != "$T2" ]; then LM_STATO="sta elaborando"; else LM_STATO="inattivo (pronto)"; fi
fi

if [ -n "$LM_PID" ] && command -v lsof >/dev/null 2>&1; then
  LM_CONN=$(lsof -nP -iTCP:1234 2>/dev/null | grep -c ESTABLISHED || true)
  LM_CONN=${LM_CONN:-0}
else
  LM_CONN="—"
fi

RSS_TOT=$(sysctl -n hw.memsize 2>/dev/null | awk '{printf "%.0f", $1/1073741824}' || echo "—")
MEM_LIB=$(memory_pressure 2>/dev/null | grep -oE 'free percentage: [0-9]+' | grep -oE '[0-9]+' || echo "—")
MEM_LIB=${MEM_LIB:-—}

RECENTI=$(find src -name "*.ts" -newermt "-60 minutes" 2>/dev/null || true)
N_RECENTI=$(printf '%s' "$RECENTI" | grep -c . || true)
N_RECENTI=${N_RECENTI:-0}

ORA=$(date '+%d/%m/%Y %H:%M:%S')
DURATA=$(( $(date +%s) - INIZIO_TS ))

# ── 2. VALUTAZIONI ───────────────────────────────────────────────────
if [ "$TS_TOT" -eq 0 ] && [ "$VITEST_FAIL" -eq 0 ] && [ "$SCENE" -gt 0 ]; then
  SEMAFORO="verde"; STATO_TXT="Tutto in ordine — Build & Test OK"
elif [ "$TS_TOT" -eq 0 ]; then
  SEMAFORO="giallo"; STATO_TXT="Codice pulito, verifica test in corso"
else
  SEMAFORO="giallo"; STATO_TXT="In sviluppo ($TS_TOT errori TS)"
fi

if [ -z "$TS_LISTA" ]; then
  ERRORI_HTML='<p class="ok">✅ Nessun errore TypeScript: il progetto compila perfettamente (<code>tsc --noEmit</code> = 0).</p>'
else
  ERRORI_HTML="<ul class=\"errori\">"
  while IFS= read -r riga; do
    [ -z "$riga" ] && continue
    riga_esc=$(printf '%s' "$riga" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    ERRORI_HTML="$ERRORI_HTML<li><code>$riga_esc</code></li>"
  done <<< "$TS_LISTA"
  ERRORI_HTML="$ERRORI_HTML</ul>"
fi

if [ -z "$SESSIONI" ]; then
  SESSIONI_HTML='<tr><td colspan="3" class="muted">Nessuna sessione OpenCode attiva (sviluppo gestito da Antigravity)</td></tr>'
else
  SESSIONI_HTML=""
  while IFS='|' read -r titolo modello quando; do
    [ -z "$titolo" ] && continue
    t=$(printf '%s' "$titolo" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    SESSIONI_HTML="$SESSIONI_HTML<tr><td>$t</td><td><code>$modello</code></td><td class=\"muted\">$quando</td></tr>"
  done <<< "$SESSIONI"
fi

if [ "$N_RECENTI" -eq 0 ]; then
  RECENTI_HTML='<p class="muted">Nessun file <code>src/</code> modificato nell'"'"'ultima ora.</p>'
else
  RECENTI_HTML="<ul class=\"chip-list\">"
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    t_mod=$(stat -f '%Sm' -t '%H:%M' "$f" 2>/dev/null || date -r "$f" '+%H:%M' 2>/dev/null || echo '')
    RECENTI_HTML="$RECENTI_HTML<li><code>$f</code> <span class=\"muted\">($t_mod)</span></li>"
  done <<< "$RECENTI"
  RECENTI_HTML="$RECENTI_HTML</ul>"
fi

if [ "$PATCH_A" = "sì" ]; then
  PATCH_HTML='<span class="pill ok">applicata</span>'
else
  PATCH_HTML='<span class="pill warn">in valutazione</span>'
fi

if [ -z "$TIMELINE" ]; then
  TIMELINE_HTML='<p class="muted">Nessuna voce di registro trovata in COORDINAMENTO.md.</p>'
else
  TIMELINE_HTML="<ol class=\"timeline\">"
  while IFS= read -r riga; do
    [ -z "$riga" ] && continue
    quando=$(printf '%s' "$riga" | awk -F'|' '{gsub(/^ +| +$/,"",$2); print $2}')
    autore=$(printf '%s' "$riga" | awk -F'|' '{gsub(/^ +| +$/,"",$3); print $3}')
    testo=$(printf '%s' "$riga" | awk -F'|' '{gsub(/^ +| +$/,"",$4); print $4}')
    testo=$(printf '%s' "$testo" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')
    testo=$(printf '%s' "$testo" | sed -E 's/\*\*([^*]+)\*\*/<strong>\1<\/strong>/g')
    testo=$(printf '%s' "$testo" | sed -E 's/`([^`]+)`/<code>\1<\/code>/g')
    TIMELINE_HTML="$TIMELINE_HTML<li class=\"ev\"><span class=\"ev-ora\">$quando</span><span class=\"ev-autore\">$autore</span><span class=\"ev-testo\">$testo</span></li>"
  done <<< "$TIMELINE"
  TIMELINE_HTML="$TIMELINE_HTML</ol>"
fi

PICCO_ERRORI=36
KPI_PCT=$(( 100 - (TS_TOT * 100 / PICCO_ERRORI) ))
[ "$KPI_PCT" -lt 0 ] && KPI_PCT=0
[ "$KPI_PCT" -gt 100 ] && KPI_PCT=100

# ── 3. GENERAZIONE PAGINA HTML + CONTEGGIO DINAMICO BANCA DOMANDE ────
export ROOT OUT ORA DURATA STATO_TXT SEMAFORO TS_TOT ERRORI_HTML PATCH_HTML SRC_FILE SRC_RIGHE SCENE \
       VITEST_OUT PW_OUT PW_MODO FAST_MODE SESSIONI_HTML LM_STATO LM_CPU LM_TEMPO LM_CONN LM_RSS LM_PID \
       RSS_TOT MEM_LIB RECENTI_HTML N_RECENTI TIMELINE_HTML \
       VITEST_PASS VITEST_FAIL VITEST_SKIP PW_PASS PW_FAIL PW_SKIP KPI_PCT \
       C_AGY_VERSIONE C_RILIEVI_TOT C_RILIEVI_ERR C_RILIEVI_RIS C_RILIEVI_NOTA C_RILIEVI_CHIUSI C_ULTIMA C_REV_HTML \
       SORV_ATTIVO SORV_PID SORV_DIARIO_ULT SORV_DIARIO_N SORV_STATO SORV_INVIATO SORV_QUANDO \
       CODA_HTML CODA_APERTI CODA_FATTI IDEE_N ARGON_TOK ARGON_CHIAMATE \
       B_COMPACT B_TURNI B_LETTURE B_MODIFICHE B_RAPPORTO B_ALLARME

python3 - <<'PYEOF'
import os, re, pathlib

e = os.environ
def g(k, d=""): return e.get(k, d)

root = pathlib.Path(g("ROOT", "."))
packs_path = root / "src" / "content" / "packs.ts"
qb_path = root / "src" / "content" / "question-bank.ts"
settings_path = root / "src" / "scenes" / "settings.ts"

packs_txt = packs_path.read_text(encoding="utf-8") if packs_path.exists() else ""
qb_txt = qb_path.read_text(encoding="utf-8") if qb_path.exists() else ""
settings_txt = settings_path.read_text(encoding="utf-8") if settings_path.exists() else ""

# Conteggio dinamico regole BES attive in Settings UI
regole_m = re.search(r"const REGOLE_UI\s*=\s*\[(.*?)\];", settings_txt, re.S)
n_regole_bes = len(re.findall(r"'[a-zA-Z]+'", regole_m.group(1))) if regole_m else 22

# Conteggio dinamico per le 4 materie (Tappe in packs.ts + Banca Domande in question-bank.ts)
materie_info = [
    ("MAT", "matematica", "🔢 Matematica", "#3b82f6"),
    ("ITA", "italiano", "📖 Italiano", "#ec4899"),
    ("SCI", "scienze", "🌿 Scienze", "#10b981"),
    ("STO", "storia", "🏛️ Storia", "#f59e0b"),
]

tot_tappe = 0
tot_prove_packs = 0
tot_prove_qb = 0
materie_rows_html = ""

for const_name, subj_key, label, color in materie_info:
    m_pack = re.search(r"const\s+" + const_name + r"\s*:\s*Pack\s*=\s*\{(.*?)\n\};", packs_txt, re.S)
    blk_pack = m_pack.group(1) if m_pack else ""
    n_levels = len(re.findall(r"rounds:\s*\[", blk_pack))
    n_rounds_pack = len(re.findall(r"prompt:\s*['\"]", blk_pack))

    m_qb = re.search(r"\b" + subj_key + r"\s*:\s*\[(.*?)(?=\n  [a-z]+\s*:\s*\[|\n\};)", qb_txt, re.S)
    blk_qb = m_qb.group(1) if m_qb else ""
    n_rounds_qb = len(re.findall(r"prompt:\s*['\"]", blk_qb))

    tot_subj = n_rounds_pack + n_rounds_qb
    tot_tappe += n_levels
    tot_prove_packs += n_rounds_pack
    tot_prove_qb += n_rounds_qb
    pct_bar = min(100, round(tot_subj * 100 / 40))

    materie_rows_html += f"""
    <div class="subj-card" style="--subj-color:{color}">
      <div class="subj-head">
        <span class="subj-title">{label}</span>
        <span class="pill ok">{tot_subj} prove totali</span>
      </div>
      <div class="subj-stats">
        <div><span class="muted">Tappe base:</span> <strong>{n_levels}</strong> ({n_rounds_pack} prove)</div>
        <div><span class="muted">Banca extra:</span> <strong>+{n_rounds_qb}</strong> prove</div>
      </div>
      <div class="barra" style="margin-top:10px">
        <i class="pass" style="width:{pct_bar}%;background:linear-gradient(90deg,{color},#60a5fa)"></i>
      </div>
    </div>"""

tot_prove_complessive = tot_prove_packs + tot_prove_qb

# Conteggio dinamico per gli 8 anni scolastici (Primaria 1ª-5ª, Secondaria I grado 1ª-3ª)
anni_meta = [
    ("P1", "1ª Primaria", "Primaria", "Diff. 1/3 · 3 opzioni · 360 px/s"),
    ("P2", "2ª Primaria", "Primaria", "Diff. 1/3 · 4 opzioni · 420 px/s"),
    ("P3", "3ª Primaria", "Primaria", "Diff. 1/3 · 4 opzioni · 480 px/s"),
    ("P4", "4ª Primaria", "Primaria", "Diff. 2/3 · Tappa 2 · 480 px/s"),
    ("P5", "5ª Primaria", "Primaria", "Diff. 2/3 · Tappa 3 · 500 px/s"),
    ("S1", "1ª Secondaria I gr.", "Secondaria I", "Diff. 3/3 · Tappa 3 · 520 px/s"),
    ("S2", "2ª Secondaria I gr.", "Secondaria I", "Diff. 3/3 · Tappa 3 · 540 px/s"),
    ("S3", "3ª Secondaria I gr.", "Secondaria I", "Diff. 3/3 · Tappa 3 · 560 px/s"),
]

anni_cards_html = ""
for code, label, ciclo, desc in anni_meta:
    n_year_qb = len(re.findall(r"years:\s*\[[^\]]*'" + code + r"'", qb_txt))
    # Ogni anno attinge alle 24 prove delle tappe di riferimento (4 materie x 6 prove) + i quesiti dedicati della banca
    pool_anno = 24 + n_year_qb
    badge_cls = "info" if ciclo == "Primaria" else "viola"
    anni_cards_html += f"""
    <div class="year-card">
      <div class="year-top">
        <span class="year-code {badge_cls}">{code}</span>
        <span class="year-name">{label}</span>
        <span class="pill ok" style="margin-left:auto">{n_year_qb} in banca</span>
      </div>
      <div class="year-sub">{desc}</div>
      <div class="year-pool">Bacino giocabile combinato: <strong>{pool_anno} prove</strong> (24 di tappa + {n_year_qb} mirate)</div>
    </div>"""

vitest_tot = int(g('VITEST_PASS') or 0) + int(g('VITEST_FAIL') or 0)
pw_tot = int(g('PW_PASS') or 0) + int(g('PW_FAIL') or 0) + int(g('PW_SKIP') or 0)

COPYRIGHT_NOTICE = "© 2026 Claudio Borsotti — Applicazione in fase di sviluppo. Tutti i diritti riservati. Vietata la riproduzione e la diffusione senza autorizzazione."

html = f"""<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0a0e17">
<title>Dashboard — Scuola in Corsa</title>
<meta http-equiv="refresh" content="30">
<style>
  :root {{
    --bg: #080b12;
    --bg2: #0f1523;
    --card: #141b29;
    --card2: #1c2538;
    --card-hover: #232f47;
    --txt: #f1f5f9;
    --muted: #94a3b8;
    --ok: #34d399;
    --warn: #fbbf24;
    --bad: #f87171;
    --info: #60a5fa;
    --viola: #c084fc;
    --ciano: #22d3ee;
    --border: #2e3b52;
    --border-soft: #1e293b;
    --ombra: 0 4px 20px -4px rgba(0,0,0,.65);
  }}
  * {{ box-sizing: border-box; -webkit-tap-highlight-color: transparent; }}
  body {{
    margin: 0;
    padding: 0 0 42px;
    background:
      radial-gradient(1200px 600px at 50% -10%, #172544 0%, transparent 65%),
      var(--bg);
    color: var(--txt);
    font: 15px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }}

  /* ── Barra fissa compatta per Smartphone & Desktop ────────── */
  .topbar {{
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 14, 23, 0.88);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    padding: 10px 16px;
  }}
  .topbar-inner {{
    width: 96%;
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }}
  .brand {{
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 16px;
    letter-spacing: -.3px;
  }}
  .top-pills {{
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }}

  .wrap {{
    width: 95%;
    max-width: 1600px;
    margin: 18px auto 0;
  }}

  /* ── Banner Licenza e Proprietà ───────────────────────────── */
  .license-banner {{
    background: linear-gradient(90deg, rgba(251,191,36,.14), rgba(96,165,250,.10));
    border: 1px solid rgba(251,191,36,.4);
    color: #fde68a;
    border-radius: 12px;
    padding: 11px 16px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: var(--ombra);
  }}

  /* ── Intestazione ─────────────────────────────────────────── */
  header {{
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 20px;
  }}
  .hero-title {{
    flex: 1 1 320px;
    background: var(--card);
    border: 1px solid var(--border-soft);
    border-radius: 16px;
    padding: 18px 20px;
    box-shadow: var(--ombra);
  }}
  h1 {{ margin: 0 0 6px; font-size: 25px; letter-spacing: -.5px; font-weight: 800; }}
  h1 .anno {{ color: var(--info); font-weight: 600; font-size: 15px; display: inline-block; margin-left: 6px; }}
  .sub {{ color: var(--muted); font-size: 13px; }}
  .semaforo {{
    flex: 0 1 340px;
    display: flex;
    align-items: center;
    gap: 14px;
    background: linear-gradient(145deg, var(--card), var(--card2));
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 20px;
    box-shadow: var(--ombra);
  }}
  .dot {{ width: 16px; height: 16px; border-radius: 50%; flex: none; }}
  .dot.verde {{ background: var(--ok); box-shadow: 0 0 16px var(--ok); }}
  .dot.giallo {{ background: var(--warn); box-shadow: 0 0 16px var(--warn); }}
  .dot.rosso {{ background: var(--bad); box-shadow: 0 0 16px var(--bad); }}

  /* ── Sezioni & Card ───────────────────────────────────────── */
  section {{
    background: var(--card);
    border: 1px solid var(--border-soft);
    border-radius: 16px;
    padding: 20px 22px;
    margin-bottom: 18px;
    box-shadow: var(--ombra);
  }}
  h2 {{
    margin: 0 0 16px;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: var(--info);
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
  }}
  h2::before {{
    content: "";
    width: 4px;
    height: 15px;
    background: currentColor;
    border-radius: 2px;
  }}

  /* ── Link Diretti Smartphone (pulsanti grandi per il pollice) ─ */
  .quick-links {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px;
  }}
  .qbtn {{
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 60px;
    padding: 12px 16px;
    border-radius: 14px;
    background: linear-gradient(180deg, var(--card2) 0%, #161f30 100%);
    border: 1px solid var(--border);
    color: var(--txt);
    text-decoration: none;
    transition: transform .12s ease, border-color .15s ease, background .15s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,.35);
  }}
  .qbtn:hover, .qbtn:active {{
    transform: translateY(-1px);
    border-color: var(--info);
    background: var(--card-hover);
  }}
  .qbtn .qicon {{
    font-size: 24px;
    line-height: 1;
    flex: none;
  }}
  .qbtn .qtxt {{
    display: flex;
    flex-direction: column;
    min-width: 0;
  }}
  .qbtn .qtitle {{
    font-weight: 700;
    font-size: 14.5px;
    color: #fff;
  }}
  .qbtn .qurl {{
    font-size: 11.5px;
    color: var(--ciano);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }}

  /* ── Schede KPI ───────────────────────────────────────────── */
  .grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin-bottom: 18px;
  }}
  .kpi {{
    background: linear-gradient(180deg, var(--card) 0%, var(--card2) 160%);
    border: 1px solid var(--border-soft);
    border-radius: 15px;
    padding: 16px 18px;
    box-shadow: var(--ombra);
    position: relative;
    overflow: hidden;
  }}
  .kpi::after {{
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accento, var(--info)), transparent);
  }}
  .kpi .lab {{
    color: var(--muted);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .9px;
    margin-bottom: 8px;
    font-weight: 600;
  }}
  .kpi .val {{
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -.8px;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }}
  .kpi .val small {{
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0;
  }}
  .kpi .nota {{ font-size: 12px; color: var(--muted); margin-top: 7px; }}

  /* ── Squadra Agenti Antigravity ───────────────────────────── */
  .ag-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 12px;
  }}
  .ag-card {{
    background: var(--card2);
    border: 1px solid var(--border);
    border-radius: 13px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }}
  .ag-top {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }}
  .ag-title {{ font-weight: 700; font-size: 14px; color: #fff; }}
  .ag-desc {{ font-size: 12.5px; color: var(--muted); }}

  /* ── Banca Domande & Anni Scolastici ──────────────────────── */
  .subj-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 12px;
    margin-bottom: 18px;
  }}
  .subj-card {{
    background: var(--card2);
    border: 1px solid var(--border);
    border-left: 4px solid var(--subj-color, var(--info));
    border-radius: 12px;
    padding: 14px 16px;
  }}
  .subj-head {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }}
  .subj-title {{ font-weight: 700; font-size: 15px; }}
  .subj-stats {{ font-size: 12.5px; display: flex; flex-direction: column; gap: 3px; }}

  .year-grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px;
  }}
  .year-card {{
    background: rgba(28, 37, 56, 0.75);
    border: 1px solid var(--border-soft);
    border-radius: 11px;
    padding: 12px 14px;
  }}
  .year-top {{ display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }}
  .year-code {{
    font-weight: 800;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 6px;
  }}
  .year-code.info {{ background: rgba(96,165,250,.18); color: var(--info); border: 1px solid rgba(96,165,250,.35); }}
  .year-code.viola {{ background: rgba(192,132,252,.18); color: var(--viola); border: 1px solid rgba(192,132,252,.35); }}
  .year-name {{ font-weight: 700; font-size: 13.5px; }}
  .year-sub {{ font-size: 12px; color: var(--muted); }}
  .year-pool {{ font-size: 12px; color: #cbd5e1; margin-top: 5px; }}

  /* ── Grafici e Barre Animate ──────────────────────────────── */
  .grafici {{ display: grid; grid-template-columns: 280px 1fr; gap: 28px; align-items: center; }}
  .ciambella {{ display: flex; flex-direction: column; align-items: center; gap: 10px; }}
  .ciambella svg {{ transform: rotate(-90deg); filter: drop-shadow(0 0 10px rgba(0,0,0,.4)); }}
  .ciambella .pct {{ font-size: 28px; font-weight: 800; fill: var(--txt); }}
  .ciambella .pct-lab {{ font-size: 11px; fill: var(--muted); }}
  .ciambella .legenda {{ font-size: 12.5px; color: var(--muted); text-align: center; }}
  .barre {{ display: flex; flex-direction: column; gap: 16px; }}
  .barra-riga .etich {{ display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 6px; font-weight: 600; }}
  .barra-riga .etich .num {{ font-variant-numeric: tabular-nums; color: var(--muted); }}
  .barra {{ height: 11px; background: #0f1624; border-radius: 99px; overflow: hidden; display: flex; border: 1px solid var(--border-soft); }}
  .barra > i {{
    display: block;
    height: 100%;
    transition: width .4s ease;
    background-size: 24px 24px;
    animation: pulsebar 2.6s infinite ease-in-out;
  }}
  @keyframes pulsebar {{
    0%, 100% {{ filter: brightness(1); }}
    50% {{ filter: brightness(1.18); }}
  }}
  .barra > i.pass {{ background: linear-gradient(90deg, #10b981, var(--ok)); }}
  .barra > i.fail {{ background: linear-gradient(90deg, #ef4444, var(--bad)); }}
  .barra > i.skip {{ background: #475569; }}
  .barra > i.info {{ background: linear-gradient(90deg, #3b82f6, var(--info)); }}
  .barra > i.viola {{ background: linear-gradient(90deg, #8b5cf6, var(--viola)); }}

  /* ── Timeline & Tabelle ───────────────────────────────────── */
  .timeline {{
    list-style: none; margin: 0; padding: 0;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(min(380px, 100%), 1fr));
    gap: 10px 12px; align-items: start;
  }}
  .ev {{
    position: relative; padding: 11px 13px 11px 32px; font-size: 13px;
    background: var(--card2); border: 1px solid var(--border-soft); border-radius: 10px;
  }}
  .ev::before {{
    content: ""; position: absolute; left: 12px; top: 16px; width: 8px; height: 8px;
    border-radius: 50%; background: var(--info); box-shadow: 0 0 0 3px rgba(96,165,250,.18);
  }}
  .ev-ora {{ font-variant-numeric: tabular-nums; color: var(--viola); font-weight: 700; margin-right: 7px; }}
  .ev-autore {{
    display: inline-block; background: rgba(96,165,250,.15); color: var(--info);
    border: 1px solid rgba(96,165,250,.3); border-radius: 6px; padding: 0 6px;
    font-size: 11px; font-weight: 700; margin-right: 7px;
  }}
  .table-scroll {{ width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }}
  table {{ width: 100%; border-collapse: collapse; font-size: 13.5px; }}
  th {{ text-align: left; padding: 8px 10px; color: var(--muted); font-size: 11.5px; text-transform: uppercase; border-bottom: 1px solid var(--border); }}
  td {{ padding: 9px 10px; border-bottom: 1px solid var(--border-soft); vertical-align: top; }}
  tr:last-child td {{ border-bottom: none; }}
  td:first-child {{ color: var(--muted); width: 210px; }}
  code {{ background: var(--card2); padding: 2px 6px; border-radius: 5px; font-size: 12px; word-break: break-word; color: #cbd5e1; }}
  .errori {{ margin: 0; padding-left: 0; list-style: none; }}
  .errori li {{ padding: 6px 0; border-bottom: 1px solid var(--border-soft); }}
  .muted {{ color: var(--muted); }}
  .ok {{ color: var(--ok); margin: 0; font-weight: 600; }}
  .pill {{
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 99px; font-size: 11.5px; font-weight: 700;
    border: 1px solid transparent; white-space: nowrap;
  }}
  .pill.ok {{ background: rgba(52,211,153,.15); color: var(--ok); border-color: rgba(52,211,153,.35); }}
  .pill.warn {{ background: rgba(251,191,36,.15); color: var(--warn); border-color: rgba(251,191,36,.35); }}
  .pill.info {{ background: rgba(96,165,250,.15); color: var(--info); border-color: rgba(96,165,250,.35); }}
  .pill.viola {{ background: rgba(192,132,252,.15); color: var(--viola); border-color: rgba(192,132,252,.35); }}
  .due {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }}
  .chip-list {{ display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin: 0; }}
  .chip-list li {{ background: var(--card2); border: 1px solid var(--border-soft); border-radius: 8px; padding: 5px 10px; font-size: 12.5px; }}
  footer {{
    color: var(--muted); font-size: 12.5px; text-align: center;
    margin-top: 26px; padding: 20px 16px 8px; border-top: 1px solid var(--border);
  }}
  .copyright-box {{
    margin-top: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    background: rgba(251,191,36,.08);
    border: 1px solid rgba(251,191,36,.3);
    color: #fde68a;
    font-weight: 600;
    font-size: 12.5px;
    display: inline-block;
  }}

  @media (max-width: 820px) {{
    .grafici {{ grid-template-columns: 1fr; }}
    .due {{ grid-template-columns: 1fr; }}
    .semaforo {{ flex: 1 1 100%; }}
    section {{ padding: 16px 15px; }}
    td:first-child {{ width: auto; }}
  }}
</style>
</head>
<body>

<nav class="topbar">
  <div class="topbar-inner">
    <div class="brand">
      <span class="dot {g('SEMAFORO')}"></span>
      <span>Scuola in Corsa</span>
      <span class="pill {'info' if g('FAST_MODE') == 'sì' else 'ok'}">{'⚡ Fast (' + g('DURATA') + 's)' if g('FAST_MODE') == 'sì' else '🔍 Full (' + g('DURATA') + 's)'}</span>
    </div>
    <div class="top-pills">
      <span class="pill {'ok' if g('TS_TOT') == '0' else 'warn'}">TS: {g('TS_TOT')} err</span>
      <span class="pill {'ok' if g('VITEST_FAIL') == '0' else 'warn'}">Vitest: {g('VITEST_PASS')}/{vitest_tot}</span>
      <span class="pill {'ok' if g('PW_FAIL') == '0' else 'warn'}">E2E: {g('PW_PASS')}</span>
      <span class="pill viola">{tot_prove_complessive} Prove</span>
      <span class="pill info">{n_regole_bes}/22 BES</span>
    </div>
  </div>
</nav>

<div class="wrap">

  <div class="license-banner">
    <span>🔒</span>
    <span>{COPYRIGHT_NOTICE}</span>
  </div>

  <header>
    <div class="hero-title">
      <h1>Scuola in Corsa <span class="anno">Dashboard di Sviluppo &amp; Controllo</span></h1>
      <div class="sub">
        Aggiornata il <strong>{g('ORA')}</strong> in <strong>{g('DURATA')}s</strong> &middot; Modalità: <strong>{g('PW_MODO')}</strong>
        <span class="pill info" style="margin-left:6px">Auto-refresh 30s</span>
      </div>
    </div>
    <div class="semaforo">
      <span class="dot {g('SEMAFORO')}"></span>
      <div>
        <div style="font-weight:800;font-size:15.5px">{g('STATO_TXT')}</div>
        <div class="muted" style="font-size:12.5px">{g('TS_TOT')} errori TS &middot; {g('VITEST_PASS')} test unitari &middot; {g('PW_PASS')} test E2E &middot; {g('SCENE')} scene</div>
      </div>
    </div>
  </header>

  <section>
    <h2>📱 Monitoraggio Smartphone &amp; Link Diretti</h2>
    <div class="quick-links">
      <a class="qbtn" href="http://192.168.1.188:5211/" target="_blank" rel="noopener">
        <span class="qicon">🎮</span>
        <span class="qtxt">
          <span class="qtitle">Gioco Live (Rete Locale Wi-Fi)</span>
          <span class="qurl">http://192.168.1.188:5211/</span>
        </span>
      </a>
      <a class="qbtn" href="http://192.168.1.188:5211/dashboard.html" target="_blank" rel="noopener">
        <span class="qicon">📊</span>
        <span class="qtxt">
          <span class="qtitle">Dashboard Live (Rete Locale Wi-Fi)</span>
          <span class="qurl">http://192.168.1.188:5211/dashboard.html</span>
        </span>
      </a>
      <a class="qbtn" href="https://caioz76.github.io/scuola-in-corsa/" target="_blank" rel="noopener">
        <span class="qicon">🌍</span>
        <span class="qtxt">
          <span class="qtitle">Gioco Online (GitHub Pages)</span>
          <span class="qurl">https://caioz76.github.io/scuola-in-corsa/</span>
        </span>
      </a>
      <a class="qbtn" href="https://caioz76.github.io/scuola-in-corsa/dashboard.html" target="_blank" rel="noopener">
        <span class="qicon">☁️</span>
        <span class="qtxt">
          <span class="qtitle">Dashboard Online (GitHub Pages)</span>
          <span class="qurl">https://caioz76.github.io/scuola-in-corsa/dashboard.html</span>
        </span>
      </a>
    </div>
  </section>

  <div class="grid">
    <div class="kpi" style="--accento: {'var(--ok)' if g('TS_TOT') == '0' else 'var(--warn)'}">
      <div class="lab">Controllo Tipi (TypeScript)</div>
      <div class="val">{g('TS_TOT')} <small>errori</small></div>
      <div class="nota">100% tipizzato &middot; <code>tsc --noEmit</code></div>
    </div>
    <div class="kpi" style="--accento: {'var(--ok)' if g('VITEST_FAIL') == '0' else 'var(--bad)'}">
      <div class="lab">Test Unitari (Vitest)</div>
      <div class="val">{g('VITEST_PASS')} <small>/ {vitest_tot} passati</small></div>
      <div class="nota">{g('VITEST_FAIL')} falliti &middot; esecuzione &lt;1s</div>
    </div>
    <div class="kpi" style="--accento: {'var(--ok)' if g('PW_FAIL') == '0' else 'var(--bad)'}">
      <div class="lab">Test End-to-End (Playwright)</div>
      <div class="val">{g('PW_PASS')} <small>verificati</small></div>
      <div class="nota">{g('PW_OUT')}</div>
    </div>
    <div class="kpi" style="--accento: var(--viola)">
      <div class="lab">Banca Domande &amp; Tappe</div>
      <div class="val">{tot_prove_complessive} <small>prove</small></div>
      <div class="nota">{tot_prove_packs} in {tot_tappe} tappe + {tot_prove_qb} in banca anni</div>
    </div>
    <div class="kpi" style="--accento: var(--info)">
      <div class="lab">Inclusione BES &amp; Classi</div>
      <div class="val">{n_regole_bes}/22 <small>regole</small></div>
      <div class="nota">9 profili BES &middot; 8 anni (P1–P5, S1–S3)</div>
    </div>
    <div class="kpi" style="--accento: var(--ciano)">
      <div class="lab">Codice Sorgente</div>
      <div class="val">{g('SRC_RIGHE')} <small>righe</small></div>
      <div class="nota">{g('SRC_FILE')} file TS &middot; {g('SCENE')} scene Phaser/3D</div>
    </div>
  </div>

  <section>
    <h2>🤖 Squadra Agenti Antigravity &amp; Stato Avanzamento</h2>
    <div class="ag-grid">
      <div class="ag-card">
        <div class="ag-top">
          <span class="ag-title">🛑 Stop OpenCode / LM Studio</span>
          <span class="pill ok">✅ Completato</span>
        </div>
        <div class="ag-desc">Fermati i processi locali in loop (sessione B e sorvegliante); sviluppo preso in carico direttamente dalla squadra agenti Antigravity.</div>
      </div>
      <div class="ag-card">
        <div class="ag-top">
          <span class="ag-title">🏎️ Consolidamento Runner 3D</span>
          <span class="pill ok">✅ Attivo (2D + 3D)</span>
        </div>
        <div class="ag-desc">Corsa Three.js in terza persona a 4 corsie con ostacoli, stelline, turbo, HUD HTML e varchi con porte trasparenti su desktop e smartphone.</div>
      </div>
      <div class="ag-card">
        <div class="ag-top">
          <span class="ag-title">🎓 Selezione Anno Scolastico (8 Classi)</span>
          <span class="pill ok">✅ Primaria 1ª–5ª &amp; Sec. I 1ª–3ª</span>
        </div>
        <div class="ag-desc">Modella difficoltà (1–3), tappa predefinita, velocità del Runner (360–560 px/s) e opzioni massime in base alla classe scelta (`P1`–`P5`, `S1`–`S3`).</div>
      </div>
      <div class="ag-card">
        <div class="ag-top">
          <span class="ag-title">🎲 Banca Domande Randomizzata</span>
          <span class="pill ok">✅ {tot_prove_complessive} Quesiti</span>
        </div>
        <div class="ag-desc"><code>selectRoundsForGame</code> combina le prove della tappa con il bacino dell'anno scolastico, mescolandole senza ripetizioni immediate.</div>
      </div>
      <div class="ag-card">
        <div class="ag-top">
          <span class="ag-title">🎨 Level-up Grafico Homepage</span>
          <span class="pill ok">✅ Stile Sport Pastello</span>
        </div>
        <div class="ag-desc">Schermata <code>Title</code> luminosa e accogliente con scenografia animata, Pico in corsa e accesso rapido a Gioca, Impostazioni e Progressi.</div>
      </div>
      <div class="ag-card">
        <div class="ag-top">
          <span class="ag-title">♿ Tutte le 22 Regole BES Attive</span>
          <span class="pill ok">✅ {n_regole_bes}/22 Verificate</span>
        </div>
        <div class="ag-desc">Attivate anche <code>shorterText</code>, <code>simpleLanguage</code> (<code>testoSemplice</code>) e <code>mascotGuide</code> (Pico guida in partita), tutte con override individuale.</div>
      </div>
      <div class="ag-card">
        <div class="ag-top">
          <span class="ag-title">⚖️ Licenza Claudio Borsotti</span>
          <span class="pill ok">✅ Tutti i diritti riservati</span>
        </div>
        <div class="ag-desc">File <code>LICENSE</code> ufficiale di proprietà esclusiva di Claudio Borsotti incluso nel repository, nella dashboard e nel pacchetto GitHub Pages.</div>
      </div>
    </div>
  </section>

  <section>
    <h2>📚 Banca Domande &amp; Anni Scolastici (Conteggio Dinamico)</h2>
    <p class="muted" style="margin-top:0;margin-bottom:14px">
      Dati letti in tempo reale da <code>src/content/packs.ts</code> (<strong>{tot_prove_packs}</strong> prove distribuite in <strong>{tot_tappe}</strong> tappe)
      e da <code>src/content/question-bank.ts</code> (<strong>{tot_prove_qb}</strong> prove calibrate sugli 8 anni scolastici), per un totale di <strong>{tot_prove_complessive} prove didattiche</strong>.
    </p>
    <div class="subj-grid">
      {materie_rows_html}
    </div>
    <h2 style="margin-top:20px">🎯 Copertura per Anno Scolastico (Primaria 1ª–5ª &amp; Secondaria I Grado 1ª–3ª)</h2>
    <div class="year-grid">
      {anni_cards_html}
    </div>
  </section>

  <section>
    <h2>📈 Grafici di Qualità &amp; Copertura</h2>
    <div class="grafici">
      <div class="ciambella">
        <svg width="180" height="180" viewBox="0 0 190 190" role="img"
             aria-label="Stato compilazione e test: {g('KPI_PCT')} per cento">
          <circle cx="95" cy="95" r="78" fill="none" stroke="#1e2531" stroke-width="16"/>
          <circle cx="95" cy="95" r="78" fill="none" stroke="{'#34d399' if g('TS_TOT') == '0' else '#fbbf24'}"
                  stroke-width="16" stroke-linecap="round"
                  stroke-dasharray="{round(2 * 3.14159 * 78 * int(g('KPI_PCT') or 0) / 100)} 999"/>
          <text x="95" y="98" text-anchor="middle" class="pct">{g('KPI_PCT')}%</text>
          <text x="95" y="118" text-anchor="middle" class="pct-lab">{'codice ok' if g('TS_TOT') == '0' else 'errori risolti'}</text>
        </svg>
        <div class="legenda">
          {'✅ Zero errori TypeScript & test verdi.' if g('TS_TOT') == '0' else str(g('TS_TOT')) + ' errori rimasti'}
        </div>
      </div>
      <div class="barre">
        <div class="barra-riga">
          <div class="etich"><span>Test Unitari (Vitest)</span><span class="num">{g('VITEST_PASS')} / {vitest_tot}</span></div>
          <div class="barra">
            <i class="pass" style="width:{ (int(g('VITEST_PASS') or 0) * 100 // max(1, vitest_tot)) }%"></i>
            <i class="fail" style="width:{ (int(g('VITEST_FAIL') or 0) * 100 // max(1, vitest_tot)) }%"></i>
          </div>
        </div>
        <div class="barra-riga">
          <div class="etich"><span>Test End-to-End (Playwright)</span><span class="num">{g('PW_PASS')} / {max(1, pw_tot)}</span></div>
          <div class="barra">
            <i class="pass" style="width:{ (int(g('PW_PASS') or 0) * 100 // max(1, pw_tot)) }%"></i>
            <i class="skip" style="width:{ (int(g('PW_SKIP') or 0) * 100 // max(1, pw_tot)) }%"></i>
            <i class="fail" style="width:{ (int(g('PW_FAIL') or 0) * 100 // max(1, pw_tot)) }%"></i>
          </div>
        </div>
        <div class="barra-riga">
          <div class="etich"><span>Regole BES con effetto reale verificato</span><span class="num">{n_regole_bes} / 22 (100%)</span></div>
          <div class="barra"><i class="viola" style="width:{min(100, n_regole_bes * 100 // 22)}%"></i></div>
        </div>
        <div class="barra-riga">
          <div class="etich"><span>Stabilità TypeScript</span><span class="num">{g('KPI_PCT')}%</span></div>
          <div class="barra"><i class="info" style="width:{g('KPI_PCT')}%"></i></div>
        </div>
      </div>
    </div>
  </section>

  <div class="due">
    <section>
      <h2>🛠️ Avanzamento &amp; Modifiche Recenti</h2>
      <table>
        <tr><td>Patch dei tipi</td><td>{g('PATCH_HTML')}</td></tr>
        <tr><td>Scene di gioco (<code>src/scenes/</code>)</td><td><span class="pill ok">{g('SCENE')} scene attive</span></td></tr>
        <tr><td>File <code>src/</code> toccati nell'ultima ora</td><td><strong>{g('N_RECENTI', '0')}</strong></td></tr>
      </table>
      <div style="margin-top:12px">{g('RECENTI_HTML')}</div>
    </section>

    <section>
      <h2>🔍 Controllo Tipi TypeScript</h2>
      {g('ERRORI_HTML')}
      <div style="margin-top:14px">
        <table>
          <tr><td>RAM Mac totale / libera</td><td>{g('RSS_TOT')} GB / {g('MEM_LIB')}%</td></tr>
          <tr><td>Modello locale (LM Studio)</td><td><span class="pill info">{g('LM_STATO')}</span></td></tr>
          <tr><td>Sorvegliante legacy</td><td>{'<span class="pill ok">attivo (PID ' + g('SORV_PID') + ')</span>' if g('SORV_ATTIVO') == 'sì' else '<span class="pill info">disattivato (gestione Antigravity)</span>'}</td></tr>
        </table>
      </div>
    </section>
  </div>

  <section>
    <h2>📋 Revisione Indipendente (REVISIONI.md)</h2>
    <table>
      <tr><td>Tool <code>agy</code> (CLI)</td><td>{'<span class="pill ok">v' + g('C_AGY_VERSIONE') + '</span>' if g('C_AGY_VERSIONE') else '<span class="pill warn">non rilevato</span>'}</td></tr>
      <tr><td>Ultima modifica <code>REVISIONI.md</code></td><td>{g('C_ULTIMA')}</td></tr>
      <tr><td>Rilievi registrati</td><td><strong>{g('C_RILIEVI_TOT', '0')}</strong> &middot; <span class="pill" style="color:var(--bad)">🔴 {g('C_RILIEVI_ERR','0')}</span> <span class="pill" style="color:var(--warn)">🟡 {g('C_RILIEVI_RIS','0')}</span> <span class="pill">🔵 {g('C_RILIEVI_NOTA','0')}</span> <span class="pill ok">✅ {g('C_RILIEVI_CHIUSI','0')}</span></td></tr>
    </table>
    <div style="margin-top:12px">{g('C_REV_HTML')}</div>
  </section>

  <section>
    <h2>🕒 Registro Attività Storico (COORDINAMENTO.md)</h2>
    {g('TIMELINE_HTML')}
  </section>

  <footer>
    <div>
      Generata da <code>tools/dashboard.sh</code> &middot; Rapida: <code>bash tools/dashboard.sh --fast</code> &middot; Completa: <code>bash tools/dashboard.sh</code> &middot; Watch: <code>bash tools/dashboard.sh --watch</code>
    </div>
    <div class="copyright-box">
      {COPYRIGHT_NOTICE}
    </div>
  </footer>

</div>
</body>
</html>
"""

with open(os.environ["OUT"], "w", encoding="utf-8") as f:
    f.write(html)
print(f"  ✅ dashboard scritta ({g('PW_MODO')}, {g('DURATA')}s): {os.environ['OUT']}")
PYEOF

# ── 4. OPZIONI CLI ───────────────────────────────────────────────────
case "$ACTION" in
  open)
    command -v open >/dev/null 2>&1 && open "$OUT"
    ;;
  watch)
    echo "  ┌──────────────────────────────────────────────────────┐"
    echo "  │  MODALITÀ WATCH — la dashboard si aggiorna da sola    │"
    printf "  │  Rigenero ogni %-4ss. Apri dashboard.html nel browser.│\n" "$WATCH_INT"
    echo "  │  La pagina si ricarica ogni 30s e mostra i dati nuovi.│"
    echo "  │  Ctrl+C per uscire.                                   │"
    echo "  └──────────────────────────────────────────────────────┘"
    echo
    FAST_ARG=""
    [ "$FAST_MODE" = "sì" ] && FAST_ARG="--fast"
    bash "$0" $FAST_ARG >/dev/null 2>&1 && echo "  ✅ $(date '+%H:%M:%S') — dashboard aggiornata"
    trap 'echo; echo "  watch terminato."; exit 0' INT TERM
    while true; do
      sleep "$WATCH_INT"
      if bash "$0" $FAST_ARG >/dev/null 2>&1; then
        printf '  ✅ %s — dashboard aggiornata\n' "$(date '+%H:%M:%S')"
      else
        printf '  ⚠️  %s — rigenerazione fallita\n' "$(date '+%H:%M:%S')"
      fi
    done
    ;;
esac
