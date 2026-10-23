/**
 * Prove a scelta: quiz (testo) e riconoscimento immagine (icona).
 *
 * Regole applicate:
 *  - fewerOptions → fitOptions (sempre mantiene la risposta giusta)
 *  - all'opzione corretta → bottone verde; errore → bottone rosso
 *  - showExplanationOnWrong → spiegazione breve dopo l'errore
 *  - visualSupports + support → riga numerica / base dieci / tabella
 *  - repeatPrompt → bottone "Rileggi"
 *  - MAX_ATTEMPTS falliti → reveal (la risposta giusta si illumina)
 */
import type Phaser from 'phaser';
import type { EffectiveConfig } from '../bes/resolver';
import type { ImageRound, Option, QuizRound } from '../content/types';
import { synth } from '../audio/synth';
import { C, hexNum } from '../art/palette';
import {
  MAX_ATTEMPTS,
  optionLayout,
  showBanner,
  type Btn,
  type Challenge,
  type ChallengeCallbacks,
  flashCue,
  fitOptions,
  makeButton,
  makeText
} from './ui';

type ChoiceRound = QuizRound | ImageRound;

export class ChoiceChallenge implements Challenge {
  private scene: Phaser.Scene;
  private round: ChoiceRound;
  private cfg: EffectiveConfig;
  private cb: ChallengeCallbacks;

  private btns: Btn[] = [];
  private options: Option[] = [];
  private attempts = 0;
  private locked = false;
  private revealed = false;
  private timers: Phaser.Time.TimerEvent[] = [];
  private promptText: Phaser.GameObjects.Text;
  private hintText: Phaser.GameObjects.Text | null = null;
  private supportG: Phaser.GameObjects.Graphics | null = null;
  private supportTexts: Phaser.GameObjects.Text[] = [];

  constructor(scene: Phaser.Scene, round: ChoiceRound, cfg: EffectiveConfig, cb: ChallengeCallbacks) {
    this.scene = scene;
    this.round = round;
    this.cfg = cfg;
    this.cb = cb;

    // ── Prompt ──
    this.promptText = makeText(scene, 512, 64, round.prompt, cfg, {
      size: 26,
      bold: true,
      wrap: 800,
      outline: true
    });

    // ── Hint ──
    // Regola showHintUpfront=true → subito; false → compare dopo il 1° errore.
    if (round.hint && cfg.showHintUpfront) {
      this.showHintNow();
    }

    // ── Supporto matematico (visivo) ──
    let optsTop = 250;
    if (round.type === 'quiz' && round.support && cfg.visualSupports) {
      this.supportG = this.drawSupport(round.support);
      optsTop = 262;
    }

    // ── Icona (riconoscimento immagine) ──
    if (round.type === 'image') {
      const iconKey = `icon-${round.icon}`;
      if (scene.textures.exists(iconKey)) {
        scene.add.image(512, 186, iconKey).setScale(2.0).setDepth(8);
      }
      optsTop = 286;
    }

    // ── Opzioni (adattate al limite BES; salvate: i bottoni seguono QUESTE) ──
    this.options = fitOptions(round.options, cfg.maxOptions);
    const options = this.options;
    const scale = cfg.targetScale;
    const pos = optionLayout(options.length, scale);
    // se ci sono icona o supporto, le opzioni partono più in basso
    const yShift = optsTop > 296 ? optsTop - 296 : 0;

    options.forEach((opt, i) => {
      const [px, py] = pos[i];
      const b = makeButton(scene, cfg, px, py + yShift, opt.label, { depth: 10 });
      b.onTap(() => this.onPick(i));
      this.btns.push(b);
    });

    // ── Rileggi (regola repeatPrompt) ──
    if (cfg.repeatPrompt) {
      const rb = makeButton(scene, cfg, 950, 112, 'Rileggi', { scale: 0.62, depth: 12 });
      rb.onTap(() => {
        const banner = showBanner(scene, cfg, round.prompt, null, 'ok');
        scene.time.delayedCall(2200, () => banner.dispose());
      });
    }
  }

  /** Testo piccolo per il supporto (tracciato, smaltito in dispose). */
  private supportLabel(x: number, y: number, s: string, size = 13): void {
    const t = this.scene.add
      .text(x, y, s, { fontFamily: 'Verdana, sans-serif', fontSize: `${size}px`, color: '#20222f' })
      .setOrigin(0.5)
      .setDepth(7);
    this.supportTexts.push(t);
  }

  /** Disegna il supporto matematico richiesto. */
  private drawSupport(kind: 'numberLine' | 'baseTen' | 'table'): Phaser.GameObjects.Graphics {
    const g = this.scene.add.graphics().setDepth(6);
    g.fillStyle(0xffffff, 0.72);
    g.fillRoundedRect(180, 132, 664, 84, 14);
    g.lineStyle(2, hexNum(C.ink), 0.4);
    g.strokeRoundedRect(180, 132, 664, 84, 14);

    if (kind === 'numberLine') {
      const x0 = 220;
      const x1 = 804;
      g.lineStyle(3, hexNum(C.ink), 0.9);
      g.lineBetween(x0, 176, x1, 176);
      const n = 20;
      for (let i = 0; i <= n; i++) {
        const x = x0 + ((x1 - x0) * i) / n;
        g.lineStyle(2, hexNum(C.ink), 0.8);
        g.lineBetween(x, 176, x, i % 5 === 0 ? 162 : 169);
        if (i % 5 === 0) {
          g.fillStyle(hexNum(C.ink), 0.9);
          g.fillCircle(x, 158, 2);
          this.supportLabel(x, 150, String(i));
        }
      }
    } else if (kind === 'baseTen') {
      // 4 aste da 10 + 9 unità
      for (let r = 0; r < 4; r++) {
        const bx = 240 + r * 64;
        g.fillStyle(hexNum(C.blueDeep), 0.95);
        g.fillRoundedRect(bx, 148, 48, 20, 5);
        for (let k = 1; k < 10; k++) {
          g.lineStyle(1, 0xffffff, 0.55);
          g.lineBetween(bx + k * 5, 148, bx + k * 5, 168);
        }
      }
      for (let k = 0; k < 9; k++) {
        g.fillStyle(hexNum(C.green), 0.95);
        g.fillRoundedRect(520 + (k % 9) * 30, 150, 22, 22, 4);
      }
      this.supportLabel(700, 196, 'aste = 10 · quadretti = 1');
    } else {
      // tabella 10×10
      const x0 = 432;
      const y0 = 140;
      const cell = 7.2;
      for (let i = 0; i <= 10; i++) {
        g.lineStyle(1, hexNum(C.ink), 0.5);
        g.lineBetween(x0 + i * cell, y0, x0 + i * cell, y0 + 10 * cell);
        g.lineBetween(x0, y0 + i * cell, x0 + 10 * cell, y0 + i * cell);
      }
      this.supportLabel(512, 206, 'tabella 10×10 (100 caselle)');
    }
    return g;
  }

  private onPick(i: number): void {
    if (this.locked || this.revealed) return;
    const correct = this.options[i].correct;

    if (correct) {
      this.btns[i].setKind('correct');
      this.btns.forEach((b, j) => {
        if (j !== i) b.setKind('disabled');
      });
      synth.play('correct');
      flashCue(this.scene, this.cfg, 'ok');
      this.locked = true;
      this.cb.onCorrect();
      return;
    }

    // ── Errore ──
    this.attempts++;
    this.btns[i].setKind('wrong');
    synth.play('wrong');
    flashCue(this.scene, this.cfg, 'bad');
    this.cb.onWrong(this.attempts);

    // hint "tardivo" (regola showHintUpfront=false)
    if (this.attempts === 1 && !this.cfg.showHintUpfront) this.showHintNow();

    if (this.attempts >= MAX_ATTEMPTS) {
      // 3° errore: si blocca e si rivela la risposta giusta
      this.locked = true;
      this.schedule(() => this.reveal(), 600);
      return;
    }

    // Mostra l'errore, spiega se la regola lo richiede, poi riprova
    const explain = this.cfg.showExplanationOnWrong && this.round.explanation;
    const delay = explain ? 2000 : 950;
    if (explain) {
      const banner = showBanner(this.scene, this.cfg, 'Quasi! Guarda la spiegazione', this.round.explanation!, 'bad');
      this.schedule(() => banner.dispose(), delay - 250);
    }
    this.schedule(() => {
      if (this.locked) return;
      this.btns.forEach((b, j) => {
        if (j !== i) b.setKind('normal');
        else b.setKind('normal');
      });
    }, delay);
  }

  /** Mostra l'hint (una sola volta). */
  private showHintNow(): void {
    if (this.hintText || !this.round.hint) return;
    this.hintText = makeText(this.scene, 512, 112, `💡 ${this.round.hint}`, this.cfg, {
      size: 15,
      color: C.orangeDeep,
      italic: true,
      wrap: 760
    });
  }

  /** delayCall tracciata (pulita in dispose/lock). */
  private schedule(fn: () => void, ms: number): void {
    const t = this.scene.time.delayedCall(ms, fn);
    this.timers.push(t);
  }

  reveal(): void {
    if (this.revealed) return;
    this.revealed = true;
    this.locked = true;
    this.timers.forEach((t) => t.remove(false));
    this.timers = [];
    this.btns.forEach((b, i) => {
      b.setKind(this.options[i].correct ? 'correct' : 'disabled');
    });
  }

  lock(): void {
    this.locked = true;
    this.timers.forEach((t) => t.remove(false));
    this.timers = [];
  }

  dispose(): void {
    this.locked = true;
    this.revealed = true;
    this.timers.forEach((t) => t.remove(false));
    this.timers = [];
    this.btns.forEach((b) => b.dispose());
    this.btns = [];
    this.promptText.destroy();
    if (this.hintText) this.hintText.destroy();
    if (this.supportG) this.supportG.destroy();
    this.supportTexts.forEach((t) => t.destroy());
    this.supportTexts = [];
  }
}
