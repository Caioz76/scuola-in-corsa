#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  tools/sorvegliante.sh — guardiano della notte (A → B)
#
#  COSA FA
#    1. Ogni N secondi misura il CRITERIO OGGETTIVO del Compito 1
#       (tsc --noEmit = 0 E npm test = 26 passed). Non usa lo stato della
#       sessione di B: quello è ambiguo (visto: 0% CPU = "pronta", non
#       "bloccata").
#    2. Quando il criterio è soddisfatto PER 2 CONTROLLI CONSECUTIVI
#       (= B ha finito davvero, non è a metà), invia il Compito 2 a B
#       con `opencode run --session <B>`.
#    3. Registra tutto in tools/.sorvegliante/diario.log.
#
#  LE 4 CONDIZIONI DI SICUREZZA (tutte devono valere per 2 giri di fila)
#    a) tsc --noEmit = 0                    → il Compito 1 è finito
#    b) npm test   = 26 passed              → nessuna regressione
#    c) CPU del modello stabile             → B ha smesso di generare
#    d) nessun file src/ scritto da 2 min   → B ha smesso di scrivere
#    Se una sola manca, NON invia. Le condizioni (c)+(d) esistono per non
#    spedire il Compito 2 mentre B è ancora a metà del Compito 1.
#
#  COSA *NON* FA
#    - NON invia mai due volte lo stesso compito (marca `inviato`).
#    - NON invia il Compito 3 (le scene): grosso, da spezzare con l'umano.
#    - NON tocca src/. NON tocca la coda se non per marcare l'esito.
#    - NON usa --dangerously-skip-permissions né --auto.
#
#  USO
#    bash tools/sorvegliante.sh                 → gira finché non invia il C2
#    bash tools/sorvegliante.sh --una-volta     → un solo controllo (test)
#    bash tools/sorvegliante.sh --intervallo 60 → ogni 60s (default 60)
#    bash tools/sorvegliante.sh --prova         → NON invia: mostra cosa farebbe
#    bash tools/sorvegliante.sh --stop          → chiede di uscire al prossimo giro
# ─────────────────────────────────────────────────────────────────────
set -uo pipefail
# Risolvo la radice del progetto in modo robusto: risalgo finché trovo CODA.md.
# (così funziona sia da tools/ sia da una copia in una sottocartella)
_d="$(cd "$(dirname "$0")" && pwd)"
while [ "$_d" != "/" ] && [ ! -f "$_d/CODA.md" ]; do _d="$(dirname "$_d")"; done
cd "$_d" || exit 1
ROOT="$(pwd)"
DIR="$ROOT/tools/.sorvegliante"
LOG="$DIR/diario.log"
STATO="$DIR/stato.txt"
SES_B="ses_ea0501762ffeu4cberdJrM00C9"
INTERVALLO=60
UNA_VOLTA=0
PROVA=0
CONSECUTIVE=0          # quanti giri di fila il criterio è soddisfatto
SOGLIA=2               # servono 2 giri consecutivi
ALREADY="$DIR/compito2_inviato"

mkdir -p "$DIR"

# ── LOCK: impedisce due sorveglianti in parallelo (potrebbero inviare 2 volte) ──
LOCK="$DIR/lock"
if [ -f "$LOCK" ]; then
  OLD=$(cat "$LOCK" 2>/dev/null)
  if kill -0 "$OLD" 2>/dev/null; then
    echo "  ⛔ c'è già un sorvegliante attivo (PID $OLD). Esco per non duplicare."
    exit 1
  fi
  echo "  (lock vecchio di un processo morto: lo sovrascrivo)"
fi
echo $$ > "$LOCK"
trap 'rm -f "$LOCK"' EXIT INT TERM

while [ "$#" -gt 0 ]; do
  case "$1" in
    --una-volta) UNA_VOLTA=1; shift ;;
    --prova)     PROVA=1; shift ;;
    --intervallo) INTERVALLO="${2:-60}"; shift 2 ;;
    --stop) echo "stop" > "$DIR/stop"; echo "  stop richiesto"; exit 0 ;;
    -h|--help) sed -n '2,40p' "$0"; exit 0 ;;
    *) shift ;;
  esac
done

log() { printf '[%s] %s\n' "$(date '+%d/%m %H:%M:%S')" "$1" | tee -a "$LOG"; }

# ── stato del modello: CPU time di llama-server (2 campioni ravvicinati) ──
modello_inattivo() {
  local PS T1 T2
  PS=$(pgrep -f "llama-server.*[Qq]wen" | head -1)
  [ -z "$PS" ] && { echo "no"; return; }       # non trovato → considera attivo
  T1=$(ps -o time= -p "$PS" 2>/dev/null | tr -d ' ')
  sleep 3
  T2=$(ps -o time= -p "$PS" 2>/dev/null | tr -d ' ')
  [ "$T1" = "$T2" ] && echo "si" || echo "no"
}

# ── src/ è stato scritto di recente? ──
src_fermo() {
  local n
  n=$(find "$ROOT/src" -name '*.ts' -newermt '-2 minutes' 2>/dev/null | wc -l | tr -d ' ')
  [ "$n" = "0" ] && echo "si" || echo "no"
}

# ── il criterio del Compito 1 ──
verifica_compito1() {
  local err test_out
  err=$(npx tsc --noEmit 2>&1 | grep -c "error TS")
  test_out=$(npm test 2>&1 | grep -E "^ *Tests " | tail -1 | sed 's/^ *//')
  printf '%s|%s' "$err" "$test_out"
}

# ── GUARDIA: la sessione di B esiste davvero? ──
#  `--session <ID>` CREA la sessione se l'ID non esiste. Quindi PRIMA di
#  inviare, verifico che l'ID sia nel DB. Se non c'è, NON invio (evito di
#  creare una sessione nuova e sprecare il compito nel vuoto).
sessione_b_esiste() {
  local n
  n=$(sqlite3 "$HOME/.local/share/opencode/opencode.db" \
      "SELECT COUNT(*) FROM session_v2 WHERE id='$SES_B';" 2>/dev/null)
  [ "$n" = "1" ] && echo "si" || echo "no"
}

# ── invia il Compito 2 a B ──
invia_compito2() {
  local msg
  msg="$(cat "$ROOT/DISPATCH-C2.txt")"

  if [ "$(sessione_b_esiste)" != "si" ]; then
    log "⛔ GUARDIA: la sessione di B ($SES_B) NON esiste nel DB. NON invio"
    log "   (se inviassi, '--session' creerebbe una sessione nuova e il compito"
    log "   finirebbe nel vuoto). Serve l'umano."
    return 1
  fi

  if [ "$PROVA" = "1" ]; then
    log "🧪 PROVA: la sessione di B esiste ✅ — avrei inviato a $SES_B:"
    printf '%s\n' "$msg" | sed 's/^/    | /' | tee -a "$LOG"
    return 0
  fi
  log "📤 INVIO il Compito 2 a B ($SES_B)…"
  if timeout 1800 opencode run --session "$SES_B" "$msg" >>"$DIR/invio.log" 2>&1; then
    log "✅ Compito 2 inviato (vedi invio.log)"
    date '+%d/%m %H:%M:%S' > "$ALREADY"
    return 0
  else
    log "⚠️ invio fallito (vedi invio.log) — NON riprovo da solo, avviso e basta"
    return 1
  fi
}

log "sorvegliante avviato (intervallo ${INTERVALLO}s, soglia ${SOGLIA} giri; sola lettura finché B lavora)"

while :; do
  [ -f "$DIR/stop" ] && { log "ricevuto stop, esco"; rm -f "$DIR/stop"; break; }

  RIS=$(verifica_compito1); ERR="${RIS%%|*}"; TEST="${RIS##*|}"

  if [ "$ERR" = "0" ]; then
    INATTIVO=$(modello_inattivo)
    FERMO=$(src_fermo)
    if [ "$INATTIVO" = "si" ] && [ "$FERMO" = "si" ]; then
      CONSECUTIVE=$((CONSECUTIVE+1))
      log "compito 1 OK (tsc=0, test=$TEST) e B ferma → conferma $CONSECUTIVE/$SOGLIA"
    else
      CONSECUTIVE=0
      log "compito 1 OK (tsc=0) MA B ancora attiva (cpu_inattiva=$INATTIVO, src_fermo=$FERMO) → aspetto"
    fi

    if [ "$CONSECUTIVE" -ge "$SOGLIA" ] && [ ! -f "$ALREADY" ]; then
      log "🎯 B ferma e Compito 1 concluso → invio il Compito 2"
      if invia_compito2; then
        { echo "compito1=concluso"; echo "compito2=inviato";
          echo "quando=$(date '+%d/%m %H:%M:%S')"; } > "$STATO"
        log "🏁 lavoro della notte concluso. Esco."
        break
      else
        { echo "compito1=concluso"; echo "compito2=invio-fallito";
          echo "quando=$(date '+%d/%m %H:%M:%S')"; } > "$STATO"
        break
      fi
    fi
    [ -f "$ALREADY" ] && { log "Compito 2 già inviato in precedenza → esco"; break; }
  else
    CONSECUTIVE=0
    { echo "compito1=in-corso"; echo "tsc=$ERR"; echo "test=$TEST";
      echo "aggiornato=$(date '+%d/%m %H:%M:%S')"; } > "$STATO"
    log "compito 1 in corso: $ERR errori tsc | test: $TEST"
  fi

  [ "$UNA_VOLTA" = "1" ] && break
  sleep "$INTERVALLO"
done

log "sorvegliante terminato"
