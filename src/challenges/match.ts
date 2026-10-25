/**
 * Prove di abbinamento (dragdrop "match"): colonna di elementi a sinistra,
 * colonna (mescolata) a destra. Si tocca un elemento e poi il suo paio.
 *
 *  - coppia giusta  → linea verde, entrambi verdi, bloccati;
 *  - coppia sbagliata → rosso + onWrong, poi si riprova;
 *  - 3 errori (o timeout) → reveal (tutte le linee corrette).
 *
 * Le righe della colonna destra sono MESCOLATE; `pairs[i] = [i, idx]` dice
 * quale elemento di destra è corretto per l'elemento di sinistra i.
 */
import type Phaser from 'phaser';
import type { EffectiveConfig } from '../bes/resolver';
import type { DragDropRound } from '../content/types';
import { synth } from '../audio/synth';
import { C } from '../art/palette';
import {
  MAX_ATTEMPTS,
  flashCue,
  makeButton,
  makeChip,
  makeText,
  shuffle,
  showBanner,
  testoSemplice,
  type Btn,
  type Challenge,
  type ChallengeCallbacks,
  type Chip
} from './ui';

type MatchRound = Extract<DragDropRound, { mode: 'match' }>;

const LEFT_X = 276;
const RIGHT_X = 748;
const CHIP_W = 264;

/** Righe verticali comprese tra 198 e 442 (lasciano spazio a prompt, indizio, istruzione e terra). */
function rowsY(n: number): number[] {
  if (n === 1) return [310];
  const top = 198;
  const bottom = 442;
  return Array.from({ length: n }, (_, i) => top + ((bottom - top) * i) / (n - 1));
}

export class MatchChallenge implements Challenge {
  private scene: Phaser.Scene;
  private round: MatchRound;
  private cfg: EffectiveConfig;
  private cb: ChallengeCallbacks;

  private n: number;
  private ys: number[];
  private rightOrder: number[]; // rightOrder[riga] = indice in rightItems

  private leftChips: Chip[] = [];
  private rightChips: Chip[] = [];
  private lines: Phaser.GameObjects.Graphics;
  private selected: { side: 'L' | 'R'; row: number } | null = null;

  private matched = 0;
  private attempts = 0;
  private locked = false;
  private revealed = false;
  private timers: Phaser.Time.TimerEvent[] = [];

  private promptText: Phaser.GameObjects.Text;
  private hintText: Phaser.GameObjects.Text | null = null;
  private instrText: Phaser.GameObjects.Text | null = null;
  private reBtn: Btn | null = null;

  constructor(
    scene: Phaser.Scene,
    round: MatchRound,
    cfg: EffectiveConfig,
    cb: ChallengeCallbacks
  ) {
    this.scene = scene;
    this.round = round;
    this.cfg = cfg;
    this.cb = cb;

    const left = round.leftItems ?? [];
    const right = round.rightItems ?? [];
    const pairs = round.pairs ?? [];
    this.n = left.length;
    this.ys = rowsY(this.n);
    // colonna destra mescolata (ma NON identica all'ordine, se possibile)
    let order = shuffle(right.map((_, i) => i));
    if (this.n > 1 && order.every((v, i) => v === i)) {
      order = [...order.slice(1), order[0]];
    }
    this.rightOrder = order;

    // ── Prompt / hint / istruzione ──
    const promptX = cfg.repeatPrompt ? 450 : 512;
    const promptWrap = cfg.repeatPrompt ? 640 : 780;
    this.promptText = makeText(scene, promptX, 66, testoSemplice(round.prompt, cfg), cfg, {
      size: 25,
      bold: true,
      color: '#000000',
      wrap: promptWrap,
      maxH: 54
    });
    if (round.hint && cfg.showHintUpfront) {
      this.showHintNow();
    }
    this.instrText = makeText(
      scene,
      512,
      142,
      cfg.simpleLanguage
        ? 'Tocca le coppie giuste'
        : 'Abbina: tocca un elemento e poi il suo compagno giusto',
      cfg,
      { size: 14, bold: true, color: '#1e293b', wrap: 740, maxH: 22 }
    );

    // ── Colonne ──
    const chipH = this.n >= 4 ? 64 : 76;
    for (let i = 0; i < this.n; i++) {
      const lc = makeChip(scene, cfg, LEFT_X, this.ys[i], left[i], {
        w: CHIP_W,
        h: chipH,
        size: 18,
        depth: 18
      });
      lc.onTap(() => this.onTap('L', i));
      this.leftChips.push(lc);

      const rc = makeChip(scene, cfg, RIGHT_X, this.ys[i], right[this.rightOrder[i]], {
        w: CHIP_W,
        h: chipH,
        size: 18,
        depth: 18
      });
      rc.onTap(() => this.onTap('R', i));
      this.rightChips.push(rc);
    }

    // linee (sotto le chip, sopra lo sfondo)
    this.lines = scene.add.graphics().setDepth(10);

    // ── Rileggi (regola repeatPrompt) ──
    if (cfg.repeatPrompt) {
      this.reBtn = makeButton(scene, cfg, 900, 68, 'Rileggi', {
        scale: 0.52,
        maxTargetScale: 1.04,
        depth: 12
      });
      this.reBtn.onTap(() => {
        if (this.locked) return;
        synth.play('click');
        const banner = showBanner(scene, cfg, this.round.prompt, null, 'ok');
        this.schedule(() => banner.dispose(), 2200);
      });
    }
  }

  /** Mostra l'hint (una sola volta). */
  private showHintNow(): void {
    if (this.hintText || !this.round.hint) return;
    this.hintText = makeText(this.scene, 512, 112, `💡 ${testoSemplice(this.round.hint, this.cfg)}`, this.cfg, {
      size: 14,
      color: C.orangeDeep,
      italic: true,
      wrap: 740,
      maxH: 24
    });
  }

  // ── Interazione ────────────────────────────────────────────────

  private onTap(side: 'L' | 'R', row: number): void {
    if (this.locked) return;
    const chip = side === 'L' ? this.leftChips[row] : this.rightChips[row];
    if (!chip || !chip.root.active) return;

    synth.play('click');
    if (!this.selected) {
      this.selected = { side, row };
      chip.setSelected(true);
      return;
    }
    if (this.selected.side === side) {
      // cambio di selezione nella stessa colonna
      const prev = this.chipAt(this.selected.side, this.selected.row);
      if (prev) prev.setSelected(false);
      this.selected = { side, row };
      chip.setSelected(true);
      return;
    }

    // colonne diverse → verifica la coppia
    const L = side === 'L' ? row : this.selected.row;
    const R = side === 'R' ? row : this.selected.row;
    const selL = this.leftChips[L];
    const selR = this.rightChips[R];
    this.selected = null;
    this.evaluate(L, R, selL, selR);
  }

  private chipAt(side: 'L' | 'R', row: number): Chip | undefined {
    return side === 'L' ? this.leftChips[row] : this.rightChips[row];
  }

  private evaluate(L: number, R: number, chipL: Chip, chipR: Chip): void {
    // pairs[L] = [L, idx giusto in rightItems]; la riga R contiene rightOrder[R]
    const correct = (this.round.pairs ?? [])[L]?.[1] === this.rightOrder[R];

    if (correct) {
      chipL.setSelected(false);
      chipR.setSelected(false);
      chipL.setCorrect();
      chipR.setCorrect();
      chipL.setEnabled(false);
      chipR.setEnabled(false);
      this.drawLine(L, R);
      synth.play('correct');
      flashCue(this.scene, this.cfg, 'ok');
      this.matched++;
      if (this.matched >= this.n) {
        this.locked = true;
        this.cb.onCorrect();
      }
      return;
    }

    // ── errore ──
    this.attempts++;
    chipL.setWrong();
    chipR.setWrong();
    synth.play('wrong');
    flashCue(this.scene, this.cfg, 'bad');
    this.cb.onWrong(this.attempts);

    // hint "tardivo" (regola showHintUpfront=false)
    if (this.attempts === 1 && !this.cfg.showHintUpfront) this.showHintNow();

    if (this.attempts >= MAX_ATTEMPTS) {
      this.locked = true;
      this.schedule(() => this.reveal(), 700);
      return;
    }
    // lascia vedere l'errore, poi si riprova
    this.schedule(() => {
      if (this.locked || this.revealed) return;
      chipL.setTint(null);
      chipR.setTint(null);
    }, 950);
  }

  private drawLine(L: number, R: number): void {
    this.lines.lineStyle(5, 0x58d68d, 0.95);
    this.lines.lineBetween(LEFT_X + CHIP_W / 2 - 8, this.ys[L], RIGHT_X - CHIP_W / 2 + 8, this.ys[R]);
    this.lines.lineStyle(0, 0x000000, 0);
  }

  /** Mostra tutti gli abbinamenti corretti. */
  reveal(): void {
    if (this.revealed) return;
    this.revealed = true;
    this.locked = true;
    this.clearTimers();
    const pairs = this.round.pairs ?? [];
    for (let L = 0; L < this.n; L++) {
      const want = pairs[L]?.[1];
      const R = this.rightOrder.findIndex((v) => v === want);
      if (R === -1) continue;
      this.drawLine(L, R);
      this.leftChips[L].setCorrect();
      this.leftChips[L].setEnabled(false);
      this.rightChips[R].setCorrect();
      this.rightChips[R].setEnabled(false);
    }
  }

  lock(): void {
    this.locked = true;
    this.clearTimers();
  }

  dispose(): void {
    this.locked = true;
    this.revealed = true;
    this.clearTimers();
    this.leftChips.forEach((c) => c.dispose());
    this.rightChips.forEach((c) => c.dispose());
    this.lines.destroy();
    this.promptText.destroy();
    if (this.hintText) this.hintText.destroy();
    if (this.instrText) this.instrText.destroy();
    if (this.reBtn) this.reBtn.dispose();
  }

  private schedule(fn: () => void, ms: number): void {
    this.timers.push(this.scene.time.delayedCall(ms, fn));
  }

  private clearTimers(): void {
    this.timers.forEach((t) => t.remove(false));
    this.timers = [];
  }
}
