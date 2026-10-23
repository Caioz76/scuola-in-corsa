#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  tools/sentinella.sh — sorveglia chi tocca cosa (rete di sicurezza)
#
#  PERCHÉ ESISTE
#    Il progetto NON è versionato con git: se un agente scrive dove non deve,
#    non c'è un "annulla". Il file-contratto COORDINAMENTO.md dice chi possiede
#    cosa, ma è un'istruzione, non un lucchetto. Questo script è il lucchetto
#    possibile: fotografa lo stato attuale e, ai giri successivi, MOSTRA COSA È
#    CAMBIATO e se il cambiamento è fuori dalla zona attesa.
#
#  COSA FA (onesto, senza magie)
#    1. Calcola un checksum per ogni file sorvegliato.
#    2. Confronta col giro precedente (snapshot su disco).
#    3. Segnala i file NUOVI, MODIFICATI, SPARITI.
#    4. Evidenzia se un file modificato appartiene a un'area "vietata"
#       rispetto al proprietario atteso.
#
#  COSA *NON* FA (limiti dichiarati, per non dare falsa sicurezza)
#    - NON impedisce una scrittura: nessuno script lo può fare senza privilegi.
#    - NON attribuisce con certezza la scrittura a A, B o C: il filesystem non
#      registra "chi" ha scritto. Deduce solo dall'AREA del file.
#    - NON legge il database di OpenCode per attribuire i tool-call: è fragile
#      (dati JSON potenzialmente troncati) e darebbe attribuzioni sbagliate.
#
#  USO
#    bash tools/sentinella.sh            → confronta con l'ultimo snapshot
#    bash tools/sentinella.sh --fissa    → (ri)crea lo snapshot di riferimento
#    bash tools/sentinella.sh --watch    → controlla ogni 20s
#
#  È di SOLA LETTURA sul progetto: scrive solo dentro tools/.sentinella/.
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
ROOT="$(pwd)"
DIR="$ROOT/tools/.sentinella"
SNAP="$DIR/snapshot.txt"
PREC="$DIR/precedente.txt"

mkdir -p "$DIR"

# ── Zone e proprietari (la mappa del contratto, in forma di codice) ──
# Formato: "prefisso:proprietario"
ZONE=(
  "src:B"
  "tests:B"
  "tsconfig.json:B"
  "vite.config.ts:B"
  "tools:A"
  "docs:A"
  "README.md:A"
  "COORDINAMENTO.md:A"
  "CREDITI-ARGON.md:A"
  "IDEE.md:A"
  "CODA.md:A"
  "DISPATCH-B.md:A"
  "DISPATCH-C2.txt:A"
  "SORVEGLIANTE-APPUNTI.txt:A"
  "REVISIONI.md:C"
)

# Restituisce il proprietario atteso per un percorso (o "?").
proprietario() {
  local f="$1" z
  for z in "${ZONE[@]}"; do
    local pref="${z%%:*}" chi="${z##*:}"
    if [ "$f" = "$pref" ] || [[ "$f" == "$pref"/* ]]; then echo "$chi"; return; fi
  done
  echo "?"
}

# Fotografia: checksum di ogni file sorvegliato (esclusi quelli di servizio).
fotografa() {
  local out="$1"
  : > "$out"
  {
    find src tools docs tests -type f \
      -not -path "*/node_modules/*" \
      -not -path "*/.sentinella/*" \
      -not -path "*/out/*" \
      -not -name ".DS_Store" 2>/dev/null
    [ -f README.md ] && echo README.md
    [ -f COORDINAMENTO.md ] && echo COORDINAMENTO.md
    [ -f REVISIONI.md ] && echo REVISIONI.md
    [ -f CREDITI-ARGON.md ] && echo CREDITI-ARGON.md
    [ -f IDEE.md ] && echo IDEE.md
    [ -f CODA.md ] && echo CODA.md
    [ -f DISPATCH-B.md ] && echo DISPATCH-B.md
    [ -f DISPATCH-C2.txt ] && echo DISPATCH-C2.txt
    [ -f SORVEGLIANTE-APPUNTI.txt ] && echo SORVEGLIANTE-APPUNTI.txt
    [ -f tsconfig.json ] && echo tsconfig.json
    [ -f vite.config.ts ] && echo vite.config.ts
  } | LC_ALL=C sort | while IFS= read -r f; do
    [ -f "$f" ] || continue
    printf '%s  %s\n' "$(shasum "$f" | cut -c1-16)" "$f"
  done >> "$out"
}

# ── Modalità --fissa: crea (o rifà) lo snapshot di riferimento ──────
if [ "${1:-}" = "--fissa" ]; then
  fotografa "$SNAP"
  echo "  ✅ snapshot fissato: $(grep -c . "$SNAP") file sorvegliati"
  echo "     ($SNAP)"
  exit 0
fi

# ── Primo avvio: crea lo snapshot e spiega ──────────────────────────
if [ ! -f "$SNAP" ]; then
  fotografa "$SNAP"
  echo "  ℹ️  primo avvio: ho fissato lo stato attuale come riferimento."
  echo "     ($(grep -c . "$SNAP") file). Riesegui per vedere i cambiamenti."
  exit 0
fi

# ── Confronto ────────────────────────────────────────────────────────
fotografa "$PREC"
N=0; CAMBIATI=0; SOSPETTI=0

echo "  ┌────────────────────────────────────────────────────────────┐"
echo "  │  SENTINELLA — cosa è cambiato dall'ultimo controllo        │"
echo "  └────────────────────────────────────────────────────────────┘"
echo

# Confronto riga per riga (snapshot = "hash  percorso", già ordinato per percorso)
while IFS= read -r riga; do
  [ -z "$riga" ] && continue
  hash="${riga%%  *}"; f="${riga##*  }"
  vecchio=$(grep -F "  $f" "$SNAP" 2>/dev/null | head -1 | cut -c1-16)
  if [ -z "$vecchio" ]; then
    chi=$(proprietario "$f")
    printf '  🆕 NUOVO       %-42s (area di %s)\n' "$f" "$chi"
    CAMBIATI=$((CAMBIATI+1))
  elif [ "$hash" != "$vecchio" ]; then
    chi=$(proprietario "$f")
    printf '  ✏️  MODIFICATO  %-42s (area di %s)\n' "$f" "$chi"
    CAMBIATI=$((CAMBIATI+1))
  fi
  N=$((N+1))
done < "$PREC"

# File spariti
while IFS= read -r riga; do
  [ -z "$riga" ] && continue
  f="${riga##*  }"
  if ! grep -qF "  $f" "$PREC" 2>/dev/null; then
    chi=$(proprietario "$f")
    printf '  ❌ SPARITO     %-42s (era area di %s)\n' "$f" "$chi"
    CAMBIATI=$((CAMBIATI+1))
  fi
done < "$SNAP"

echo
if [ "$CAMBIATI" -eq 0 ]; then
  echo "  ✅ nessun cambiamento ($N file sorvegliati)"
else
  echo "  ⚠️  $CAMBIATI file cambiati su $N sorvegliati"
  echo
  echo "  ⚠️  ATTENZIONE: verifica che i cambiamenti siano dell'agente giusto:"
  echo "      src/ → B    tools/docs/README/contratto → A    REVISIONI.md → C"
fi

# Aggiorna il riferimento per il prossimo giro.
cp "$PREC" "$SNAP"
