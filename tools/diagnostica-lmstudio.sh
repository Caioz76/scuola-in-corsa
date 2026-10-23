#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# diagnostica-lmstudio.sh — verifica lo stato REALE di LM Studio
#
# Uso:  bash tools/diagnostica-lmstudio.sh
#
# Nato dopo aver scoperto TRE trappole di LM Studio:
#
#   1. `lms load --context-length N` viene IGNORATO: la config salvata in
#      ~/.lmstudio/.internal/user-concrete-model-default-config/<modello>.json
#      ha la precedenza.
#   2. La chiave di config NON è "llm.load.parallel" (inesistente!) ma
#      semplicemente "parallel", e si passa via API REST.
#   3. `parallel` di default è 4 sui modelli già scaricati → KV cache ×4.
#
# Lo strumento chiave: `echo_load_config: true` mostra la config
# EFFETTIVAMENTE applicata, non quella che credi di aver impostato.
#
# ⚠️  Sola lettura: non ricarica il modello.
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail

BASE="${LM_BASE:-http://127.0.0.1:1234}"
OK="✅"; WARN="⚠️ "; ERR="❌"

echo "═══════════════════════════════════════════════════════════"
echo " DIAGNOSTICA LM STUDIO — $(date '+%d/%m/%Y %H:%M')"
echo "═══════════════════════════════════════════════════════════"
echo

# ── 1. Server raggiungibile? ────────────────────────────────────────
echo "── 1. SERVER ──────────────────────────────────────────────"
if curl -s --max-time 5 "$BASE/v1/models" >/dev/null 2>&1; then
  echo "  $OK server attivo su $BASE"
else
  echo "  $ERR server NON raggiungibile su $BASE"
  echo "     → apri LM Studio e avvia il server locale (porta 1234)"
  exit 1
fi
echo

# ── 2. Config EFFETTIVA del modello caricato ────────────────────────
echo "── 2. CONFIG EFFETTIVA (da /api/v0/models) ────────────────"
curl -s --max-time 5 "$BASE/api/v0/models" 2>/dev/null | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
except Exception as e:
    print('  ⚠️  impossibile leggere i modelli:', e)
    sys.exit(0)
for m in d.get('data', []):
    if m.get('state') != 'loaded':
        continue
    ctx = m.get('loaded_context_length')
    mx  = m.get('max_context_length')
    print(f\"  modello:   {m.get('id')}\")
    print(f\"  contesto:  {ctx}  (max {mx})\")
    print(f\"  formato:   {m.get('compatibility_type')} / {m.get('quantization')}\")
    if ctx and ctx < 32000:
        print('  ⚠️  contesto basso: la config salvata potrebbe forzarlo')
" 2>/dev/null
echo

# ── 3. parallel e coda ──────────────────────────────────────────────
echo "── 3. PARALLEL E CODA ─────────────────────────────────────"
PS_LINE=$(curl -s --max-time 5 "$BASE/api/v0/models" 2>/dev/null | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    for m in d.get('data', []):
        if m.get('state') == 'loaded':
            print(m.get('id'))
            break
except Exception:
    pass
" 2>/dev/null)

if [ -n "${PS_LINE:-}" ]; then
  echo "  Nota: 'parallel' NON è visibile in /api/v0/models."
  echo "        Per vederlo serve ricaricare con echo_load_config=true."
  echo "        Default osservato sui modelli esistenti: parallel=4."
fi

if command -v lsof >/dev/null 2>&1; then
  CONNS=$(lsof -nP -iTCP:1234 2>/dev/null | grep -c ESTABLISHED)
  echo "  Connessioni attive al modello: $CONNS"
  if [ "${CONNS:-0}" -ge 2 ]; then
    echo "  $WARN più client connessi: le richieste possono finire IN CODA."
    echo "     Se llama-server è a CPU 0% e le richieste vanno in timeout,"
    echo "     il blocco è a monte (un client in attesa di approvazione)."
  fi
fi
echo

# ── 4. Memoria e swap ───────────────────────────────────────────────
echo "── 4. MEMORIA ─────────────────────────────────────────────"
RAM_GB=$(sysctl -n hw.memsize | awk '{printf "%.1f", $1/1073741824}')
echo "  RAM totale: ${RAM_GB} GB"

RSS=$(ps aux | grep -i "llama-server" | grep -v grep | awk '{s+=$6} END {printf "%.2f", s/1048576}')
echo "  Modello (llama-server) RSS: ${RSS:-0} GB"

SWAP=$(sysctl -n vm.swapusage | grep -oE 'used = [0-9.]+M' | grep -oE '[0-9.]+')
echo "  Swap usato: ${SWAP:-0} MB"
if [ -n "${SWAP:-}" ] && [ "${SWAP%%.*}" -gt 500 ] 2>/dev/null; then
  echo "  $WARN swap in uso: la GPU può leggere i pesi dal disco."
fi

FREE_PCT=$(memory_pressure 2>/dev/null | grep -oE 'free percentage: [0-9]+' | grep -oE '[0-9]+')
echo "  Memoria libera: ${FREE_PCT:-?}%"
echo

# ── 5. Il modello STA lavorando? ────────────────────────────────────
echo "── 5. ATTIVITÀ DEL MODELLO ────────────────────────────────"
C1=$(ps aux | grep "llama-server" | grep -v grep | awk '{print $3}' | head -1)
T1=$(ps aux | grep "llama-server" | grep -v grep | awk '{print $10}' | head -1)
sleep 3
C2=$(ps aux | grep "llama-server" | grep -v grep | awk '{print $3}' | head -1)
T2=$(ps aux | grep "llama-server" | grep -v grep | awk '{print $10}' | head -1)
echo "  CPU: ${C1:-?}% → ${C2:-?}%   (tempo CPU: ${T1:-?} → ${T2:-?})"
if [ "${C1:-0}" = "0.0" ] && [ "$C1" = "$C2" ] && [ "$T1" = "$T2" ]; then
  if [ "${CONNS:-0}" -gt 0 ]; then
    echo "  $WARN llama-server è FERMO (CPU 0%) ma ci sono $CONNS connessioni."
    echo "     Richieste in timeout? Il blocco è a monte: un client tiene le slot."
    echo "     Se PERSISTE dopo un riavvio del client → riavvia l'APP LM Studio"
    echo "     (il server può entrare in deadlock: /v1/models risponde ma"
    echo "      /v1/chat/completions va in timeout anche per modelli inesistenti)."
  else
    echo "  $OK modello inattivo e pronto (nessuna richiesta in corso)."
  fi
else
  echo "  $OK llama-server sta elaborando."
fi
echo
echo "═══════════════════════════════════════════════════════════"
echo " Per ricaricare con la config GIUSTA (via API, non CLI):"
echo
echo "   curl -X POST $BASE/api/v1/models/load \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"model\":\"qwen/qwen3.8-27b\",\"context_length\":32768,"
echo "          \"flash_attention\":true,\"parallel\":2,\"echo_load_config\":true}'"
echo
echo " ⚠️  Unload prima: lms unload --all"
echo "═══════════════════════════════════════════════════════════"
