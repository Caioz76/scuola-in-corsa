#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  tools/lane.sh — esegue un compito su una "corsia" isolata (git worktree)
#
#  Perché esiste: più agenti in parallelo sono sicuri solo se
#    1. ognuno scrive in una copia separata del progetto (worktree);
#    2. ogni corsia DICHIARA i file che toccherà (write-set);
#    3. il merge lo fa A, uno alla volta, verificando ogni volta.
#  Questo script fa rispettare 1 e 2 meccanicamente: se una corsia tocca
#  un file non dichiarato, il risultato viene marcato FALLITA e non va
#  mergiato.
#
#  Uso:
#    bash tools/lane.sh <nome> <modello> <file-prompt> <file-write-set>
#
#  Esempio:
#    bash tools/lane.sh c7 gemini-4-argon-high /tmp/p.txt /tmp/w.txt
#
#  Exit code: 0 = ok e write-set rispettato · 1 = errore · 2 = rifiutata
#  (lock o file già in lavorazione) · 3 = write-set violato o verifica rossa
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
ROOT="$(pwd)"
INIZIO_TS=$(date +%s)
LANES="$ROOT/tools/.lanes"
DISP="$ROOT/tools/.dispatch"
PATCHES="$ROOT/tools/.patches"
mkdir -p "$LANES" "$DISP" "$PATCHES"

NOME="${1:-}"; MODELLO="${2:-}"; PROMPT="${3:-}"; WSET="${4:-}"
if [ -z "$NOME" ] || [ -z "$MODELLO" ] || [ -z "$PROMPT" ] || [ -z "$WSET" ]; then
  sed -n '17,27p' "$0" | sed 's/^#  \{0,1\}//'
  exit 1
fi
[[ "$NOME" =~ ^[a-z0-9_-]+$ ]] || { echo "⛔ nome corsia: solo a-z 0-9 _ -"; exit 1; }
[ -f "$PROMPT" ] || { echo "⛔ prompt non trovato: $PROMPT"; exit 1; }
[ -f "$WSET" ]   || { echo "⛔ write-set non trovato: $WSET"; exit 1; }
command -v agy >/dev/null 2>&1 || { echo "⛔ agy non nel PATH"; exit 1; }
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "⛔ non è un repo git"; exit 1; }

# ── Normalizza write-set (righe non vuote, senza ./) ─────────────────
PATHS=()
while IFS= read -r line; do
  line="${line%%#*}"; line="$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//;s#^\./##;s#/$##')"
  [ -n "$line" ] && PATHS+=("$line")
done < "$WSET"
[ "${#PATHS[@]}" -gt 0 ] || { echo "⛔ write-set vuoto"; exit 1; }

# ── Lock 1: nessun'altra corsia viva deve dichiarare gli stessi file ─
for pidfile in "$LANES"/*.pid; do
  [ -e "$pidfile" ] || continue
  altra="$(basename "$pidfile" .pid)"
  [ "$altra" = "$NOME" ] && continue
  apid="$(cat "$pidfile" 2>/dev/null || true)"
  [ -n "$apid" ] && kill -0 "$apid" 2>/dev/null || continue   # corsia morta: ignora
  [ -f "$LANES/$altra.set" ] || continue
  while IFS= read -r altro; do
    [ -z "$altro" ] && continue
    for p in "${PATHS[@]}"; do
      if [ "$p" = "$altro" ] || [[ "$p" == "$altro"/* ]] || [[ "$altro" == "$p"/* ]]; then
        echo "⛔ sovrapposizione con la corsia '$altra' su: $p"
        exit 2
      fi
    done
  done < "$LANES/$altra.set"
done

# ── Lock 2: i file dichiarati non devono essere in lavorazione su main ─
SPORCHI="$(git status --porcelain -- "${PATHS[@]}" | head -5)"
if [ -n "$SPORCHI" ]; then
  echo "⛔ questi file hanno modifiche non committate su main (un altro scrittore è al lavoro):"
  echo "$SPORCHI" | sed 's/^/   /'
  echo "   commit o attendi, poi riprova."
  exit 2
fi

# ── Worktree isolato ────────────────────────────────────────────────
WT="/tmp/scuola-lane-$NOME"
BRANCH="lane/$NOME"
if [ -e "$WT" ]; then echo "⛔ esiste già $WT (rimuovilo con: git worktree remove --force $WT)"; exit 1; fi
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then echo "⛔ esiste già il branch $BRANCH"; exit 1; fi
git worktree add "$WT" -b "$BRANCH" -q || { echo "⛔ creazione worktree fallita"; exit 1; }
ln -sfn "$ROOT/node_modules" "$WT/node_modules"
printf '%s\n' "${PATHS[@]}" > "$LANES/$NOME.set"

LOG="$DISP/lane-$NOME-$(date +%H%M%S).log"
echo "▶ corsia '$NOME' — modello $MODELLO"
echo "  worktree: $WT"
echo "  write-set: ${PATHS[*]}"
echo "  log: $LOG"

( cd "$WT" && agy -p "$(cat "$PROMPT")" \
    --model "$MODELLO" --mode accept-edits --dangerously-skip-permissions \
    --output-format json ) > "$LOG" 2>&1 &
APID=$!
echo "$APID" > "$LANES/$NOME.pid"
echo "  pid: $APID — in esecuzione"

wait "$APID"; RC=$?
rm -f "$LANES/$NOME.pid"
echo "◀ corsia '$NOME' terminata (exit $RC) dopo $(( $(date +%s) - INIZIO_TS ))s"

# ── Audit write-set ─────────────────────────────────────────────────
# -uall: elenca i FILE, non la cartella "content/" · --no-renames: un path per riga
CAMBIATI="$(git -C "$WT" -c core.quotepath=false status --porcelain -uall --no-renames | cut -c4- | sed 's#/$##')"
VIOLAZIONE=0
while IFS= read -r f; do
  [ -z "$f" ] && continue
  ok=0
  for p in "${PATHS[@]}"; do
    if [ "$f" = "$p" ] || [[ "$f" == "$p"/* ]]; then ok=1; break; fi
  done
  [ "$ok" = 0 ] && { echo "⛔ file NON dichiarato: $f"; VIOLAZIONE=1; }
done <<< "$CAMBIATI"

if [ -z "$CAMBIATI" ]; then echo "⚠️  nessun file modificato"; fi

# ── Verifica nel worktree ───────────────────────────────────────────
ERR=$(cd "$WT" && npx tsc --noEmit 2>&1 | grep -c "error TS")
VOUT=$(cd "$WT" && npx vitest run 2>&1)
TESTS=$(echo "$VOUT" | grep -E "^ *Tests " | tail -1 | sed 's/^ *//')
FALLITI=$(echo "$VOUT" | grep -cE "^ *Tests .*failed")
echo "  tsc: $ERR errori · ${TESTS:-nessun esito test}"

# ── Patch pronta per il merge (non applicata) ───────────────────────
# `add -A` serve a includere i file NUOVI (git diff da solo non li vede).
git -C "$WT" add -A
git -C "$WT" diff --cached > "$PATCHES/$NOME.patch"
echo "  patch: $PATCHES/$NOME.patch ($(wc -l < "$PATCHES/$NOME.patch" | tr -d ' ') righe)"

if [ "$VIOLAZIONE" != 0 ]; then echo "❌ RIFIUTATA: write-set violato"; exit 3; fi
if [ "$ERR" != 0 ] || [ "$FALLITI" != 0 ] || [ -z "$TESTS" ]; then
  echo "❌ RIFIUTATA: verifica rossa"; exit 3
fi
echo "✅ PRONTA per il merge: git apply --3way $PATCHES/$NOME.patch"
exit 0
