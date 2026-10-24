/**
 * Modalità Runner: le risposte non sono bottoni del quiz ma **cartelli**
 * piantati lungo la pista. Entrano scorrendo da destra e si fermano davanti a
 * Pico; toccandone uno, Pico salta a testata sul cartello.
 *
 * - risposta giusta → il cartello diventa verde, esplode in stelline, Pico
 *   esulta e la corsa avanza;
 * - risposta sbagliata → il cartello diventa rosso e cade, Pico inciampa e si
 *   riprova (fino a 3 tentativi, come nel quiz);
 * - nessun timer: chi ha bisogno di tempo può guardare i cartelli quanto vuole.
 *
 * Le regole BES restano rispettate: numero di opzioni, font, scala del testo,
 * alto contrasto, suggerimento, ripetizione della domanda, ritmo lento.
 */
import Phaser from 'phaser';
import type { EffectiveConfig } from '../bes/resolver';
import type { ImageRound, Option, QuizRound } from '../content/types';
import { synth } from '../audio/synth';
import { T } from '../art/palette';
import {
  MAX_ATTEMPTS,
  fitOptions,
  flashCue,
  fontSpec,
  makeButton,
  makeText,
  showBanner,
  type Btn,
  type Challenge,
  type ChallengeCallbacks
} from './ui';

type ChoiceRound = QuizRound | ImageRound;
type Kind = 'normal' | 'correct' | 'wrong' | 'dim';

/** Quello che il Runner chiede al mondo di gioco (Pico che salta e inciampa). */
export interface RunnerWorld {
  leap(x: number, y: number): void;
  stumble(): void;
}

interface Sign {
  root: Phaser.GameObjects.Container;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Dove si ferma il cartello dopo l'ingresso da destra. */
  targetX: number;
  setKind(k: Kind): void;
  setEnabled(b: boolean): void;
  onTap(cb: () => void): void;
  dispose(): void;
}

/** Un cartello della pista: scheda bianca su un palo, con etichetta grande. */
function makeSign(
  scene: Phaser.Scene,
  cfg: EffectiveConfig,
  x: number,
  y: number,
  w: number,
  label: string,
  targetX: number
): Sign {
  const spec = fontSpec(cfg);
  const text = scene.add
    .text(0, 0, label, {
      fontFamily: spec.family,
      fontSize: `${Math.round(19 * cfg.fontScale)}px`,
      fontStyle: 'bold',
      color: cfg.highContrast ? '#000000' : T.body,
      align: 'center',
      wordWrap: { width: w - 34, useAdvancedWrap: true },
      letterSpacing: spec.spacing
    })
    .setOrigin(0.5);
  const h = Math.max(70, Math.round(text.height) + 28);

  const card = scene.add.graphics();
  const draw = (kind: Kind): void => {
    card.clear();
    const bordo =
      kind === 'correct' ? 0x3aa564 : kind === 'wrong' ? 0xe05a5a : kind === 'dim' ? 0xc9d3e0 : 0x5fade3;
    const corpo =
      kind === 'correct' ? 0xdff6e7 : kind === 'wrong' ? 0xffe1e1 : 0xffffff;
    // ombra morbida
    card.fillStyle(0x3b4a5a, 0.16);
    card.fillRoundedRect(-w / 2 + 4, -h / 2 + 6, w, h, 18);
    // scheda
    card.fillStyle(corpo, 0.98);
    card.fillRoundedRect(-w / 2, -h / 2, w, h, 18);
    card.lineStyle(4, bordo, 1);
    card.strokeRoundedRect(-w / 2, -h / 2, w, h, 18);
  };
  draw('normal');

  const root = scene.add.container(x, y, [card, text]).setDepth(20).setName('segno');
  const margine = cfg.permissiveTouch ? 20 : 8;
  root.setInteractive(
    new Phaser.Geom.Rectangle(-w / 2 - margine, -h / 2 - margine, w + margine * 2, h + margine * 2),
    Phaser.Geom.Rectangle.Contains
  );

  let enabled = true;
  return {
    root,
    x,
    y,
    w,
    h,
    targetX,
    setKind(k: Kind): void {
      draw(k);
      root.setAlpha(k === 'dim' ? 0.55 : 1);
      text.setStyle({
        color: cfg.highContrast
          ? '#000000'
          : k === 'correct'
            ? T.ok
            : k === 'wrong'
              ? T.bad
              : k === 'dim'
                ? T.faint
                : T.body
      });
    },
    setEnabled(b: boolean): void {
      enabled = b;
      if (b) root.setInteractive();
      else root.disableInteractive();
    },
    onTap(cb: () => void): void {
      root.on('pointerup', () => {
        if (enabled) cb();
      });
    },
    dispose(): void {
      root.removeAllListeners();
      root.destroy();
    }
  };
}

export class RunnerChallenge implements Challenge {
  private scene: Phaser.Scene;
  private round: ChoiceRound;
  private cfg: EffectiveConfig;
  private cb: ChallengeCallbacks;
  private world: RunnerWorld | null;

  private options: Option[];
  private signs: Sign[] = [];
  private objects: Phaser.GameObjects.GameObject[] = [];
  private timers: Phaser.Time.TimerEvent[] = [];
  private tweens: Phaser.Tweens.Tween[] = [];

  private promptText: Phaser.GameObjects.Text;
  private hintText: Phaser.GameObjects.Text | null = null;
  private reBtn: Btn | null = null;

  private attempts = 0;
  private locked = false;
  private revealed = false;

  constructor(
    scene: Phaser.Scene,
    round: ChoiceRound,
    cfg: EffectiveConfig,
    cb: ChallengeCallbacks,
    world: RunnerWorld | null = null
  ) {
    this.scene = scene;
    this.round = round;
    this.cfg = cfg;
    this.cb = cb;
    this.world = world;

    this.options = fitOptions(round.options, cfg.maxOptions);

    // ── Domanda ──
    this.promptText = makeText(scene, 512, 64, round.prompt, cfg, {
      size: 26,
      bold: true,
      color: T.body,
      wrap: 800,
      outline: true
    });
    if (round.hint && cfg.showHintUpfront) this.showHintNow();

    // ── Icona (prove di riconoscimento immagine) ──
    if (round.type === 'image') {
      const key = `icon-${round.icon}`;
      if (scene.textures.exists(key)) {
        this.objects.push(scene.add.image(512, 186, key).setScale(1.7).setDepth(8));
      }
    }

    // ── Cartelli in fila sulla pista ──
    const n = this.options.length;
    const gap = 18;
    const larghezza = Math.min(210, (900 - (n - 1) * gap) / n);
    const totale = n * larghezza + (n - 1) * gap;
    const x0 = 512 - totale / 2 + larghezza / 2;
    const y = 384;
    const animato = cfg.motion !== 'off';

    this.options.forEach((opt, i) => {
      const targetX = x0 + i * (larghezza + gap);
      const sign = makeSign(scene, cfg, targetX, y, larghezza, opt.label, targetX);
      sign.onTap(() => this.onPick(i));
      this.signs.push(sign);

      // Palo che regge il cartello, piantato sul bordo della pista.
      const palo = scene.add.graphics().setDepth(6);
      const fondo = y + sign.h / 2;
      palo.fillStyle(0x8a99ad, 0.9);
      palo.fillRoundedRect(targetX - 3, fondo, 6, 480 - fondo, 3);
      palo.fillStyle(0x6f7a99, 0.9);
      palo.fillEllipse(targetX, 481, 28, 8);
      this.objects.push(palo);

      if (!animato) return;
      // Ingresso da destra, uno dopo l'altro: il mondo scorre, i cartelli arrivano.
      sign.root.setX(targetX + 760).setAlpha(0);
      this.tweens.push(
        scene.tweens.add({
          targets: sign.root,
          x: targetX,
          alpha: 1,
          duration: 380,
          delay: 80 * i,
          ease: 'Cubic.easeOut',
          onComplete: () => {
            // leggero dondolio: sono cartelli, non bottoni
            this.tweens.push(
              scene.tweens.add({
                targets: sign.root,
                y: y - 5,
                duration: 1500 + i * 120,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
              })
            );
          }
        })
      );
    });

    // ── Rileggi (regola repeatPrompt) ──
    if (cfg.repeatPrompt) {
      this.reBtn = makeButton(scene, cfg, 872, 112, 'Rileggi', { scale: 0.58, depth: 12 });
      this.reBtn.onTap(() => {
        const banner = showBanner(scene, cfg, round.prompt, null, 'ok', { y: 186 });
        this.schedule(() => banner.dispose(), 2200);
      });
    }
  }

  // ── Interazione ────────────────────────────────────────────────

  private onPick(i: number): void {
    if (this.locked || this.revealed) return;
    const sign = this.signs[i];
    const correct = this.options[i].correct;

    // Se i cartelli stanno ancora entrando, si fermano subito dove devono.
    this.signs.forEach((s) => {
      this.scene.tweens.killTweensOf(s.root);
      s.root.setX(s.targetX).setAlpha(1);
    });

    this.locked = true;
    synth.play('click');
    this.world?.leap(sign.x, sign.y + sign.h / 2 + 24);

    if (correct) {
      sign.setKind('correct');
      this.signs.forEach((s, j) => {
        if (j !== i) s.setKind('dim');
        s.setEnabled(false);
      });
      synth.play('correct');
      flashCue(this.scene, this.cfg, 'ok');
      this.burst(sign);
      this.cb.onCorrect();
      return;
    }

    // ── Errore ──
    this.attempts++;
    sign.setKind('wrong');
    this.shake(sign);
    this.world?.stumble();
    synth.play('wrong');
    flashCue(this.scene, this.cfg, 'bad');
    this.cb.onWrong(this.attempts);

    if (this.attempts === 1 && !this.cfg.showHintUpfront) this.showHintNow();

    if (this.attempts >= MAX_ATTEMPTS) {
      this.schedule(() => this.reveal(), 600);
      return;
    }

    const explain = this.cfg.showExplanationOnWrong && this.round.explanation;
    const delay = explain ? 2000 : 950;
    if (explain) {
      const banner = showBanner(
        this.scene,
        this.cfg,
        'Quasi! Guarda la spiegazione',
        this.round.explanation!,
        'bad',
        { y: 186 }
      );
      this.schedule(() => banner.dispose(), delay - 250);
    }
    this.schedule(() => {
      if (this.revealed) return;
      sign.setKind('normal');
      this.locked = false;
    }, delay);
  }

  /** Stelline dal cartello indovinato. */
  private burst(sign: Sign): void {
    for (let i = 0; i < 6; i++) {
      const ang = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      const stella = this.scene.add
        .image(sign.x, sign.y, 'star')
        .setScale(0.34)
        .setDepth(30);
      this.objects.push(stella);
      this.tweens.push(
        this.scene.tweens.add({
          targets: stella,
          x: sign.x + Math.cos(ang) * 70,
          y: sign.y + Math.sin(ang) * 60,
          alpha: 0,
          duration: 620,
          ease: 'Quad.easeOut',
          onComplete: () => stella.destroy()
        })
      );
    }
  }

  private shake(sign: Sign): void {
    this.tweens.push(
      this.scene.tweens.add({
        targets: sign.root,
        x: sign.targetX + 7,
        duration: 60,
        yoyo: true,
        repeat: 3,
        ease: 'Sine.easeInOut',
        onComplete: () => sign.root.setX(sign.targetX)
      })
    );
  }

  private showHintNow(): void {
    if (this.hintText || !this.round.hint) return;
    this.hintText = makeText(this.scene, 512, 112, `💡 ${this.round.hint}`, this.cfg, {
      size: 15,
      color: '#c96a12',
      italic: true,
      wrap: 760
    });
  }

  private schedule(fn: () => void, ms: number): void {
    const t = this.scene.time.delayedCall(ms, fn);
    this.timers.push(t);
  }

  // ── Contratto Challenge ────────────────────────────────────────

  reveal(): void {
    if (this.revealed) return;
    this.revealed = true;
    this.locked = true;
    this.timers.forEach((t) => t.remove(false));
    this.timers = [];
    this.signs.forEach((s, i) => {
      s.setKind(this.options[i].correct ? 'correct' : 'dim');
      s.setEnabled(false);
    });
  }

  lock(): void {
    this.locked = true;
    this.timers.forEach((t) => t.remove(false));
    this.timers = [];
    this.signs.forEach((s) => s.setEnabled(false));
  }

  dispose(): void {
    this.locked = true;
    this.revealed = true;
    this.timers.forEach((t) => t.remove(false));
    this.timers = [];
    this.tweens.forEach((t) => t.remove());
    this.tweens = [];
    this.signs.forEach((s) => s.dispose());
    this.signs = [];
    this.promptText.destroy();
    if (this.hintText) this.hintText.destroy();
    if (this.reBtn) this.reBtn.dispose();
    this.objects.forEach((o) => o.destroy());
    this.objects = [];
  }
}
