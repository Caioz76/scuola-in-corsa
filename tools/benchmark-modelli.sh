#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# benchmark-modelli.sh — confronta la velocità dei modelli disponibili
#
# Esegue lo STESSO compito su ogni modello e cronometra. Serve a decidere
# con i numeri, non con le impressioni, quale modello assegnare a un agente.
#
# Uso:  bash tools/benchmark-modelli.sh
# ⚠️  Sola lettura: non modifica nulla. Non ricarica modelli.
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail

BASE="${LM_BASE:-http://127.0.0.1:1234}"

PROMPT='Leggi il seguente elenco di file e dimmi quanti sono e quale tipo ricorre di più:
a.ts, b.ts, c.tsx, d.ts, e.md, f.ts, g.json, h.tsx, i.ts

Rispondi in massimo 3 righe.'

echo "═══════════════════════════════════════════════════════════"
echo " BENCHMARK MODELLI — $(date '+%d/%m/%Y %H:%M')"
echo "═══════════════════════════════════════════════════════════"
echo
echo "Compito: analisi di un elenco corto (simula il lavoro dell'orchestratore)"
echo

python3 - "$BASE" "$PROMPT" <<'PY'
import sys, json, time, urllib.request, urllib.error

base, prompt = sys.argv[1], sys.argv[2]

# 1. Modelli locali disponibili
try:
    with urllib.request.urlopen(f"{base}/v1/models", timeout=5) as r:
        models = [m["id"] for m in json.loads(r.read()).get("data", [])]
except Exception as e:
    print(f"❌ LM Studio non raggiungibile: {e}")
    sys.exit(1)

if not models:
    print("⚠️  Nessun modello locale disponibile")
    sys.exit(0)

print(f"Modelli locali trovati: {', '.join(models)}")
print()
print(f"{'MODELLO':<34} {'TEMPO':>8} {'TOK':>6} {'TOK/S':>7}  ESITO")
print("─" * 78)

results = []
for model in models:
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 200,
        "reasoning_effort": "none",
        "temperature": 0,
    }
    req = urllib.request.Request(
        f"{base}/v1/chat/completions",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            d = json.loads(r.read())
        dt = time.time() - t0
        ct = d.get("usage", {}).get("completion_tokens", 0)
        tps = ct / dt if dt > 0 else 0
        results.append((model, dt, tps))
        print(f"{model:<34} {dt:>7.1f}s {ct:>6} {tps:>7.1f}  ✅")
    except urllib.error.URLError as e:
        dt = time.time() - t0
        print(f"{model:<34} {dt:>7.1f}s {'-':>6} {'-':>7}  ❌ {e.reason}")
    except Exception as e:
        dt = time.time() - t0
        print(f"{model:<34} {dt:>7.1f}s {'-':>6} {'-':>7}  ❌ {type(e).__name__}")

print("─" * 78)
print()
if results:
    best = min(results, key=lambda x: x[1])
    print(f"🏆 Più veloce: {best[0]}  ({best[1]:.1f}s, {best[2]:.1f} tok/s)")
print()
print("Nota: i modelli REMOTI (opencode/*) non compaiono qui perché non")
print("      passano da LM Studio. Per l'orchestratore usiamo big-pickle,")
print("      che gira su server remoto e NON tocca la GPU locale.")
PY
echo
echo "═══════════════════════════════════════════════════════════"
