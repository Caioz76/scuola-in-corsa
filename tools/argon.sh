#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  tools/argon.sh — pilota C (Antigravity/Gemini) e MISURA il consumo
#
#  PERCHÉ ESISTE
#    L'utente paga un abbonamento per Gemini Argon. I crediti non si
#    stimano a sensazione: `agy --output-format json` espone l'uso REALE
#    dei token. Questo script lancia una richiesta e registra il consumo
#    in CREDITI-ARGON.md, così si può calcolare il costo-per-risultato.
#
#  SICUREZZA (non negoziabile)
#    - SEMPRE `--mode plan`: non scrive file, propone e chiede conferma.
#      (Verificato: dandogli l'ordine di modificare un file, l'impronta
#       di src/ resta identica.)
#    - MAI `--dangerously-skip-permissions`, MAI `--mode accept-edits/auto`.
#    - Al termine confronta l'impronta di src/ prima/dopo e AVVISA se cambia.
#
#  USO
#    bash tools/argon.sh "istruzione per C"
#    bash tools/argon.sh --modello gemini-4-argon-high "istruzione"
#    bash tools/argon.sh --nome "Revisione resolver" "istruzione"
#    bash tools/argon.sh --mostra       → stampa il registro dei consumi
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
ROOT="$(pwd)"
export PATH="$HOME/.local/bin:$PATH"
REG="$ROOT/CREDITI-ARGON.md"

MODELLO="gemini-4-argon-medium"
NOME=""
ISTR=""

if [ "${1:-}" = "--mostra" ]; then
  [ -f "$REG" ] && cat "$REG" || echo "  (nessun registro: $REG non esiste)"
  exit 0
fi

while [ "$#" -gt 0 ]; do
  case "$1" in
    --modello) MODELLO="${2:-}"; shift 2 ;;
    --nome)    NOME="${2:-}"; shift 2 ;;
    -h|--help) sed -n '2,25p' "$0"; exit 0 ;;
    *) ISTR="$1"; shift ;;
  esac
done

if [ -z "$ISTR" ]; then
  echo "  ❌ manca l'istruzione. Uso: bash tools/argon.sh \"istruzione\"" >&2
  exit 2
fi
if ! command -v agy >/dev/null 2>&1 && [ ! -x "$HOME/.local/bin/agy" ]; then
  echo "  ❌ agy non trovato. Installa: curl -fsSL https://antigravity.google/cli/install.sh | bash" >&2
  exit 3
fi
AGY="$(command -v agy || echo "$HOME/.local/bin/agy")"

# ── Impronta di src/ PRIMA (garanzia di sola lettura) ────────────────
impronta() { find src -name '*.ts' -exec shasum {} \; 2>/dev/null | LC_ALL=C sort -k2 | shasum | cut -d' ' -f1; }
PRIMA="$(impronta)"

TMP="$(mktemp)"
echo "  ⏳ C ($MODELLO) sta lavorando…"
INIZIO=$(date +%s)
"$AGY" --mode plan --model "$MODELLO" --output-format json -p="$ISTR" > "$TMP" 2>/dev/null
CODICE=$?
FINE=$(date +%s)
DURATA_REALE=$(( FINE - INIZIO ))

# ── Impronta DOPO ────────────────────────────────────────────────────
DOPO="$(impronta)"

# ── Estrai risposta + usage dal JSON ─────────────────────────────────
python3 - "$TMP" <<'PYEOF'
import json, sys
try:
    d = json.load(open(sys.argv[1]))
except Exception as e:
    print("  ⚠️ output non-JSON:", e); print("  --- risposta grezza ---")
    print(open(sys.argv[1]).read()[:2000]); sys.exit(0)
print("\n─────────────── RISPOSTA DI C ───────────────")
print(d.get("response", "(vuota)"))
u = d.get("usage", {}) or {}
print("\n─────────────── CONSUMO REALE ───────────────")
for k in ("input_tokens","output_tokens","thinking_tokens","cache_read_tokens","total_tokens"):
    print(f"  {k:20} {u.get(k,'—')}")
print(f"  {'duration_seconds':20} {d.get('duration_seconds','—')}")
print(f"  {'num_turns':20} {d.get('num_turns','—')}")
print(f"  {'status':20} {d.get('status','—')}")
PYEOF

# ── Registra nel file dei consumi ────────────────────────────────────
USAGE_JSON="$(python3 -c "
import json,sys
try:
    d=json.load(open('$TMP')); u=d.get('usage',{}) or {}
    print(json.dumps({'in':u.get('input_tokens',0),'out':u.get('output_tokens',0),'think':u.get('thinking_tokens',0),'cache':u.get('cache_read_tokens',0),'tot':u.get('total_tokens',0),'dur':d.get('duration_seconds',0),'turns':d.get('num_turns',0),'status':d.get('status','?')}))
except Exception: print('{}')
")"

TOK_TOT=$(printf '%s' "$USAGE_JSON" | python3 -c "import json,sys;print(json.load(sys.stdin).get('tot',0))" 2>/dev/null || echo 0)
TOK_IN=$(printf '%s' "$USAGE_JSON"  | python3 -c "import json,sys;print(json.load(sys.stdin).get('in',0))" 2>/dev/null || echo 0)
TOK_OUT=$(printf '%s' "$USAGE_JSON" | python3 -c "import json,sys;print(json.load(sys.stdin).get('out',0))" 2>/dev/null || echo 0)
TOK_CACHE=$(printf '%s' "$USAGE_JSON" | python3 -c "import json,sys;print(json.load(sys.stdin).get('cache',0))" 2>/dev/null || echo 0)

if [ ! -f "$REG" ]; then
  cat > "$REG" <<'EOF'
# CREDITI-ARGON — consumo reale della sessione C (Antigravity / Gemini)

> **File di A.** Registra ogni chiamata ad Argon con i token **reali** letti da
> `agy --output-format json` (campo `usage`). Serve a calcolare il **costo per
> risultato utile** e a decidere con i numeri quando conviene C e quando basta B.
> **Non si stima mai a memoria.** Vedi `COORDINAMENTO.md` §3.6.c.

| Data | Compito | Modello | Token tot. | di cui in | out | cache | Durata | Esito |
|---|---|---|---|---|---|---|---|---|
EOF
fi

NOMEBREVE="${NOME:-$(printf '%s' "$ISTR" | cut -c1-45)}"
NOMEBREVE="$(printf '%s' "$NOMEBREVE" | sed 's/|/\\|/g')"
printf '| %s | %s | `%s` | %s | %s | %s | %s | %ss | %s |\n' \
  "$(date '+%d/%m %H:%M')" "$NOMEBREVE" "$MODELLO" "$TOK_TOT" "$TOK_IN" "$TOK_OUT" "$TOK_CACHE" "$DURATA_REALE" "$([ $CODICE -eq 0 ] && echo ok || echo "exit $CODICE")" >> "$REG"

rm -f "$TMP"

echo
echo "  ── Registrato in CREDITI-ARGON.md ($TOK_TOT token totali) ──"
if [ "$PRIMA" = "$DOPO" ]; then
  echo "  ✅ src/ INTATTO — C non ha scritto nulla (come previsto)"
else
  echo "  ❌⚠️  src/ MODIFICATO durante la sessione di C! Impronta prima/dopo diversa."
fi
