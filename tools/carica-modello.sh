#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# carica-modello.sh — carica Qwen su LM Studio con la config CORRETTA
#
# Uso:  bash tools/carica-modello.sh [context] [parallel]
#       bash tools/carica-modello.sh 131072 1     (default)
#
#   Contesto 131072 = 4× il default precedente (32768). Con KV q8_0 la
#   cache costa ~1 GiB ogni 32k token: 4 GiB a 131k, ~21,2 GB RSS totali.
#   Misurato il 23/10/2026: swap stabile, nessuna attività di swap.
#
#   Il default 131072 è persistito anche in
#   ~/.lmstudio/.internal/user-concrete-model-default-config/qwen/qwen3.8-27b.json
#   (verificato: il JIT lo usa dopo il riavvio dell'app). Questo script
#   serve a forzare/ripristinare la config senza riavviare LM Studio.
#
# ⚠️  PERCHÉ QUESTO SCRIPT ESISTE
#   Il comando `lms load --context-length N --parallel N` NON FUNZIONA
#   come ci si aspetta: LM Studio ha un `parallel: 4` hardcoded di default
#   e la config salvata ha la precedenza sui parametri CLI.
#
#   L'unico metodo affidabile è l'API REST /api/v1/models/load, che
#   accetta esplicitamente context_length, flash_attention e parallel,
#   e con `echo_load_config` MOSTRA cosa ha applicato davvero.
#
#   Verificato il 22/10/2026 su LM Studio (backend llama.cpp, M1 Pro).
#
# ⚠️  parallel 2 NON entra in memoria su 32 GB:
#     "Model loading was stopped due to insufficient system resources.
#      requires approximately 19.87 GB" → guardrail di LM Studio.
#     Usa parallel 1. La KV cache si dimezza.
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

BASE="${LM_BASE:-http://127.0.0.1:1234}"
MODEL="${LM_MODEL:-qwen/qwen3.8-27b}"
CTX="${1:-131072}"
PAR="${2:-1}"

export PATH="$HOME/.lmstudio/bin:$PATH"

echo "═══════════════════════════════════════════════════════════"
echo " Caricamento $MODEL"
echo "   contesto: $CTX   parallel: $PAR   flash_attention: on"
echo "═══════════════════════════════════════════════════════════"
echo

# ── 1. Verifica che il server risponda ──────────────────────────────
if ! curl -s --max-time 5 "$BASE/v1/models" >/dev/null 2>&1; then
  echo "❌ LM Studio non raggiungibile su $BASE"
  echo "   → apri LM Studio e avvia il server locale (porta 1234)"
  exit 1
fi

# ── 2. Scarica TUTTO (elimina istanze zombie) ───────────────────────
echo "1) Unload di tutte le istanze..."
lms unload --all 2>&1 | sed 's/^/   /'
sleep 4

# ── 3. Carica via API REST (il metodo che funziona) ─────────────────
echo "2) Caricamento via API REST..."
echo

RESP=$(curl -sS --max-time 300 -X POST "$BASE/api/v1/models/load" \
  -H 'Content-Type: application/json' \
  -d "{
    \"model\": \"$MODEL\",
    \"context_length\": $CTX,
    \"flash_attention\": true,
    \"parallel\": $PAR,
    \"echo_load_config\": true
  }")

# ── 4. Mostra la config DAVVERO applicata ───────────────────────────
echo "$RESP" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
except Exception as e:
    print('❌ risposta non valida:', e)
    print(sys.stdin.read()[:400] if hasattr(sys.stdin,'read') else '')
    sys.exit(1)

if d.get('status') != 'loaded':
    print('❌ caricamento fallito:', json.dumps(d)[:400])
    sys.exit(1)

lc = d.get('load_config', {})
print('   ✅ caricato in', d.get('load_time_seconds'), 's')
print()
print('   CONFIG EFFETTIVA:')
print('     context_length: ', lc.get('context_length'))
print('     parallel:       ', lc.get('parallel'))
print('     flash_attention:', lc.get('flash_attention'))
print('     eval_batch_size:', lc.get('eval_batch_size'))
print('     kv offload gpu: ', lc.get('offload_kv_cache_to_gpu'))
print()

# Avvisi
ctx = lc.get('context_length')
par = lc.get('parallel')
if ctx == 131072 and par == 1:
    print('   ✅ configurazione attesa (131072 / 1, KV q8_0 ~4 GiB)')
elif ctx:
    print(f'   ℹ️  contesto effettivo: {ctx} (atteso 131072)')
if par and par > 1:
    print(f\"   ⚠️  parallel={par}: KV cache ×{par}. Su 32 GB con modello da ~18 GB\")
    print('       puo superare il guardrail di memoria (parallel 2 richiede ~19,87 GB)')
if ctx and ctx > 131072:
    print(f'   ⚠️  contesto {ctx}: la KV cache supera 4 GiB, rischio swap su 32 GB')
if not lc.get('flash_attention'):
    print('   ⚠️  flash_attention disattivato: più memoria e meno velocità')
"

echo
echo "3) Memoria:"
ps aux | grep "llama-server" | grep -v grep | awk '{printf "   RSS: %.2f GB\n", $6/1048576}'
sysctl vm.swapusage | sed 's/^/   /'
echo
echo "═══════════════════════════════════════════════════════════"
