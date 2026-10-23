#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  tools/sorveglia.sh — cruscotto di stato del progetto
#
#  Mostra in un solo colpo:
#    - stato del codice (errori tsc, file modificati, scene presenti)
#    - stato dei test (Vitest + Playwright)
#    - stato della sessione B (elabora? attende? bloccata?)
#    - stato del modello locale (CPU, connessioni, memoria)
#
#  È di SOLA LETTURA: non modifica nulla, non tocca il modello.
#  Può essere eseguito mentre la sessione B lavora.
#
#  Uso:  bash tools/sorveglia.sh
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

# Colori (disattivati se l'output non è un terminale).
if [ -t 1 ]; then
  B=$'\033[1m'; D=$'\033[2m'; R=$'\033[0m'
  OK=$'\033[32m'; WARN=$'\033[33m'; BAD=$'\033[31m'; INFO=$'\033[36m'
else
  B=""; D=""; R=""; OK=""; WARN=""; BAD=""; INFO=""
fi

hr() { printf '%s\n' "───────────────────────────────────────────────────────────"; }
titolo() { printf '\n%s%s%s\n' "$B" "$1" "$R"; hr; }

# ── Helper: conta SOLO le righe "error TS" (ignora il riepilogo di npm) ──
# NB: il formato reale è "error TS2345:", quindi il pattern NON ha i due punti.
conta_errori() {
  npx tsc --noEmit 2>&1 | grep -c "error TS" || true
}

printf '%s╔═══════════════════════════════════════════════════════════╗%s\n' "$B" "$R"
printf '%s║  CRUSCOTTO — Scuola in Corsa    %s            ║%s\n' "$B" "$(date '+%d/%m %H:%M')" "$R"
printf '%s╚═══════════════════════════════════════════════════════════╝%s\n' "$B" "$R"

# ── 1. CODICE ────────────────────────────────────────────────────────
titolo "1. CODICE (src/)"
ERRORI=$(conta_errori)
if [ "$ERRORI" -eq 0 ]; then
  printf '  %s✅ tsc pulito — nessun errore%s\n' "$OK" "$R"
else
  printf '  %s%s errori tsc%s\n' "$WARN" "$ERRORI" "$R"
  npx tsc --noEmit 2>&1 | grep "error TS" | sed -E 's/\(([0-9]+),[0-9]+\)/:\1/' \
    | sed 's/^/     /' | head -8
  printf '  %s(altri eventuali omessi)%s\n' "$D" "$R"
fi

# Patch A applicata?
if grep -q "SortRound" src/content/types.ts 2>/dev/null; then
  printf '  %s✅ patch A risulta applicata%s (SortRound presente)\n' "$OK" "$R"
else
  printf '  %s⏳ patch A non ancora applicata%s (38→36 errori attesi)\n' "$WARN" "$R"
fi

# File modificati di recente
echo
printf '  %sFile src/ modificati di recente:%s\n' "$B" "$R"
RECENTI=$(find src -name "*.ts" -newermt "-30 minutes" 2>/dev/null)
if [ -z "$RECENTI" ]; then
  printf '     %s(nessuno negli ultimi 30 min)%s\n' "$D" "$R"
else
  echo "$RECENTI" | while read -r f; do
    printf '     %s  %s\n' "$(stat -f '%Sm' -t '%H:%M' "$f")" "$f"
  done
fi

# Scene
if [ -d src/scenes ] && [ -n "$(ls -A src/scenes 2>/dev/null)" ]; then
  printf '  %s✅ scene presenti:%s %s\n' "$OK" "$R" "$(ls src/scenes | tr '\n' ' ')"
else
  printf '  %s⏳ scene non ancora scritte%s (src/scenes/)\n' "$WARN" "$R"
fi

# ── 2. TEST ──────────────────────────────────────────────────────────
titolo "2. TEST"
VITEST=$(npm test 2>&1 | grep -E "^ *Tests " | tail -1 | sed 's/^ *//')
if echo "$VITEST" | grep -q "passed"; then
  printf '  %s✅ Vitest:%s %s\n' "$OK" "$R" "$VITEST"
else
  printf '  %s%s Vitest:%s %s\n' "$BAD" "❌" "$R" "$VITEST"
fi

if [ -f node_modules/.bin/playwright ]; then
  PW=$(npx playwright test 2>&1 | grep -E "passed|failed|skipped" | tail -1 | sed 's/^ *//')
  printf '  %sPlaywright:%s %s\n' "$INFO" "$R" "$PW"
else
  printf '  %sPlaywright non installato%s\n' "$D" "$R"
fi

# ── 3. SESSIONE B ────────────────────────────────────────────────────
titolo "3. SESSIONE B (agente di build)"
B_PID=$(pgrep -f "opencode serve" | head -1 || true)
if [ -n "$B_PID" ]; then
  B_CPU=$(ps -p "$B_PID" -o %cpu= 2>/dev/null | tr -d ' ' || echo "?")
  printf '  processo opencode serve: PID %s (CPU %s%%)\n' "$B_PID" "${B_CPU:-?}"
else
  printf '  %snessun processo di build in esecuzione%s\n' "$D" "$R"
fi

# Il modello sta elaborando? (due campioni del tempo CPU)
LS_PID=$(pgrep -f "llama-server" | head -1 || true)
if [ -n "$LS_PID" ]; then
  T1=$(ps -p "$LS_PID" -o time= 2>/dev/null | tr -d ' ')
  sleep 2
  T2=$(ps -p "$LS_PID" -o time= 2>/dev/null | tr -d ' ')
  CONNS=$(lsof -nP -iTCP:1234 2>/dev/null | grep -c ESTABLISHED)
  CONNS=${CONNS:-0}
  if [ "$T1" != "$T2" ]; then
    printf '  %s✅ modello sta ELABORANDO%s (tempo CPU %s → %s)\n' "$OK" "$R" "$T1" "$T2"
  else
    if [ "$CONNS" -gt 1 ]; then
      printf '  %s⚠️  modello fermo ma con %s connessioni%s\n' "$WARN" "$CONNS" "$R"
      printf '     %spossibile richiesta pendente; se persiste, vedere COORDINAMENTO.md §7%s\n' "$D" "$R"
    else
      printf '  modello inattivo e pronto (tempo CPU fermo a %s)\n' "$T1"
    fi
  fi
  printf '  connessioni attive alla porta 1234: %s\n' "$CONNS"
else
  printf '  %snessun llama-server attivo%s\n' "$D" "$R"
fi

# Ultimo aggiornamento della sessione di build
ULTIMO=$(sqlite3 ~/.local/share/opencode/opencode.db \
  "SELECT datetime(time_updated/1000,'unixepoch','localtime') FROM session_v2 ORDER BY time_updated DESC LIMIT 1;" 2>/dev/null || echo "?")
printf '  ultimo aggiornamento sessione: %s\n' "$ULTIMO"

# ── 4. MEMORIA ───────────────────────────────────────────────────────
titolo "4. MEMORIA"
TOT=$(sysctl -n hw.memsize 2>/dev/null | awk '{printf "%.0f", $1/1073741824}')
LIBERA=$(memory_pressure 2>/dev/null | grep -oE 'free percentage: [0-9]+' | grep -oE '[0-9]+')
printf '  RAM totale: %s GB   libera: %s%%\n' "$TOT" "${LIBERA:-?}"
if [ -n "$LS_PID" ]; then
  RSS=$(ps -p "$LS_PID" -o rss= 2>/dev/null | tr -d ' ')
  if [ -n "$RSS" ]; then
    # awk evita il problema della virgola decimale del locale italiano.
    awk -v r="$RSS" 'BEGIN { printf "  modello (llama-server): %.2f GB\n", r/1048576 }'
  fi
fi
SWAP=$(sysctl -n vm.swapusage 2>/dev/null | grep -oE 'used = [0-9.]+M' | grep -oE '[0-9.]+')
printf '  swap usato: %s MB\n' "${SWAP:-0}"

printf '\n'
