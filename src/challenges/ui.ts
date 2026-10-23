/**
 * Helper UI condivisi dalle prove (challenges) e dalle scene:
 * font BES, bottoni, chip, slot, banner, mescolamento, cue visivi.
 *
 * Qui vivono anche i contratti comuni:
 *  - `Challenge`: interfaccia che ogni prova deve implementare
 *  - `ChallengeCallbacks`: come la prova comunica il risultato al GameScene
 */
import Phaser from 'phaser';
import type { EffectiveConfig } from '../bes/resolver';
import type { Option } from '../content/types';
import { hitRect } from './hit';

/** Massimo di tentativi falliti per ogni prova (poi si rivela la risposta). */
export const MAX_ATTEMPTS = 3;

export interface ChallengeCallbacks {
  /** Chiamato UNA sola volta quando lo studente risponde correttamente. */
  onCorrect: () => void;
  /** Chiamato ad ogni tentativo fallito (attempts = 1-based). */
  onWrong: (attempts: number) => void;
}

/** Contratto di ogni prova. */
export interface Challenge {
  /** Mostra la risposta corretta (chiamato da fuori su timeout/3° errore). */
  reveal(): void;
  /** Blocca ogni interazione (nessun callback dopo la lock). */
  lock(): void;
  /** Rimuove tutti gli oggetti e i timer creati dalla prova. */
  dispose(): void;
}

export interface FontSpec {
  family: string;
  spacing: number;
}

/** Font in base alle regole BES (dislessia → Comic Sans + spaziatura). */
export function fontSpec(cfg: EffectiveConfig): FontSpec {
  return cfg.font === 'dyslexia'
    ? { family: '"Comic Sans MS", Verdana, sans-serif', spacing: 2 }
    : { family: 'Verdana, sans-serif', spacing: 0 };
}

export interface TextOpts {
  size?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  wrap?: number;
  /** Contorno bianco leggero (leggibilità su sfondi vari). */
  outline?: boolean;
}

/** Testo BES-aware (font, scala, spaziatura). */
export function makeText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  str: string,
  cfg: EffectiveConfig,
  o: TextOpts = {}
): Phaser.GameObjects.Text {
  const spec = fontSpec(cfg);
  const size = Math.round((o.size ?? 22) * cfg.fontScale);
  const t = scene.add.text(x, y, str, {
    fontFamily: spec.family,
    fontSize: `${size}px`,
    fontStyle: o.bold ? 'bold' : 'normal',
    color: o.color ?? '#20222f',
    align: o.align ?? 'center',
    wordWrap: { width: o.wrap ?? 820, useAdvancedWrap: true },
    letterSpacing: spec.spacing,
    lineSpacing: Math.round(size * 0.16)
  }).setOrigin(0.5);
  if (o.italic) t.setStyle({ fontStyle: 'italic' });
  if (o.outline) t.setShadow(0, 0, '#ffffff', Math.max(2, Math.round(size * 0.09)), true, false);
  return t;
}

export type BtnKind = 'normal' | 'correct' | 'wrong' | 'disabled';

export interface Btn {
  root: Phaser.GameObjects.Container;
  text: Phaser.GameObjects.Text;
  setLabel(s: string): void;
  setKind(k: BtnKind): void;
  setEnabled(b: boolean): void;
  onTap(cb: () => void): void;
  dispose(): void;
}

/** Dimensione base del bottone (texture btn-*). */
export const BTN_W = 320;
export const BTN_H = 84;

const KIND_TEX: Record<BtnKind, string> = {
  normal: 'btn-blue',
  correct: 'btn-green',
  wrong: 'btn-red',
  disabled: 'btn-gray'
};

/**
 * Bottone glossy Flash. Interattivo sul sprite (hit area centrata,
 * ampliata se `permissiveTouch` è attiva).
 */
export function makeButton(
  scene: Phaser.Scene,
  cfg: EffectiveConfig,
  x: number,
  y: number,
  label: string,
  o: { w?: number; scale?: number; depth?: number } = {}
): Btn {
  const s = cfg.targetScale * (o.scale ?? 1);
  const sprite = scene.add.sprite(0, 0, 'btn-blue').setScale(s);
  const spec = fontSpec(cfg);
  const text = scene.add.text(0, 0, label, {
    fontFamily: spec.family,
    fontSize: `${Math.round(24 * cfg.fontScale)}px`,
    fontStyle: 'bold',
    color: '#14213a',
    align: 'center',
    wordWrap: { width: BTN_W - 44, useAdvancedWrap: true },
    letterSpacing: spec.spacing
  }).setOrigin(0.5);
  const root = scene.add.container(x, y, [sprite, text]);
  root.setDepth(o.depth ?? 10);

  // Coordinate di TEXTURE: è lo spazio in cui Phaser fa il controllo.
  const hit = permissiveHit(cfg, sprite.width, sprite.height);
  sprite.setInteractive(hit, Phaser.Geom.Rectangle.Contains);

  let enabled = true;
  return {
    root,
    text,
    setLabel(s: string): void {
      text.setText(s);
    },
    setKind(k: BtnKind): void {
      if (scene.textures.exists(KIND_TEX[k])) sprite.setTexture(KIND_TEX[k]);
      if (k === 'disabled') text.setStyle({ color: '#5a6484' });
      else text.setStyle({ color: '#14213a' });
    },
    setEnabled(b: boolean): void {
      enabled = b;
      if (b) sprite.setInteractive(hit, Phaser.Geom.Rectangle.Contains);
      else sprite.disableInteractive();
    },
    onTap(cb: () => void): void {
      sprite.on('pointerup', () => {
        if (enabled) cb();
      });
    },
    dispose(): void {
      sprite.removeAllListeners();
      root.destroy();
    }
  };
}

/** Colori-tint delle chip (card bianca tintata). */
export const TINT = {
  selected: 0xffe98a,
  correct: 0xb5f2cf,
  wrong: 0xffb3b3,
  dim: 0xd8dce6
} as const;

export interface Chip {
  root: Phaser.GameObjects.Container;
  text: Phaser.GameObjects.Text;
  setTint(t: number | null): void;
  setSelected(b: boolean): void;
  setCorrect(): void;
  setWrong(): void;
  setDim(): void;
  setEnabled(b: boolean): void;
  onTap(cb: () => void): void;
  onDragStart?(cb: (p: Phaser.Input.Pointer) => void): void;
  dispose(): void;
}

/**
 * Chip bianca (texture `card`) con etichetta — per riordino, sequenza,
 * abbinamenti. Stati visivi tramite TINT (mai tint "moltiplicato" su
 * texture colorate: qui la card è bianca, quindi va bene).
 */
export function makeChip(
  scene: Phaser.Scene,
  cfg: EffectiveConfig,
  x: number,
  y: number,
  label: string,
  o: { w?: number; h?: number; size?: number; depth?: number } = {}
): Chip {
  const w = o.w ?? 256;
  const h = o.h ?? 96;
  const s = cfg.targetScale * (w / 256);
  const sprite = scene.add.sprite(0, 0, 'card').setScale(s);
  const spec = fontSpec(cfg);
  const text = scene.add.text(0, 0, label, {
    fontFamily: spec.family,
    fontSize: `${Math.round((o.size ?? 22) * cfg.fontScale)}px`,
    fontStyle: 'bold',
    color: '#20222f',
    align: 'center',
    wordWrap: { width: w - 40, useAdvancedWrap: true },
    letterSpacing: spec.spacing
  }).setOrigin(0.5);
  const root = scene.add.container(x, y, [sprite, text]);
  root.setDepth(o.depth ?? 20);

  // Coordinate di TEXTURE: è lo spazio in cui Phaser fa il controllo.
  const hit = permissiveHit(cfg, sprite.width, sprite.height);
  sprite.setInteractive(hit, Phaser.Geom.Rectangle.Contains);

  let enabled = true;
  return {
    root,
    text,
    setTint(t: number | null): void {
      if (t === null) sprite.clearTint();
      else sprite.setTint(t);
    },
    setSelected(b: boolean): void {
      this.setTint(b ? TINT.selected : null);
    },
    setCorrect(): void {
      this.setTint(TINT.correct);
    },
    setWrong(): void {
      this.setTint(TINT.wrong);
    },
    setDim(): void {
      this.setTint(TINT.dim);
    },
    setEnabled(b: boolean): void {
      enabled = b;
      if (b) sprite.setInteractive(hit, Phaser.Geom.Rectangle.Contains);
      else sprite.disableInteractive();
    },
    onTap(cb: () => void): void {
      sprite.on('pointerup', () => {
        if (enabled) cb();
      });
    },
    onDragStart(cb: (p: Phaser.Input.Pointer) => void): void {
      sprite.on('pointerdown', (p: Phaser.Input.Pointer) => {
        if (enabled) cb(p);
      });
    },
    dispose(): void {
      sprite.removeAllListeners();
      root.destroy();
    }
  };
}

/** Slot tratteggiato numerato (posizioni per il riordino). */
export function makeSlot(
  scene: Phaser.Scene,
  cfg: EffectiveConfig,
  x: number,
  y: number,
  index: number,
  o: { w?: number; h?: number } = {}
): { root: Phaser.GameObjects.Container; dispose(): void } {
  const w = o.w ?? 256;
  const h = o.h ?? 96;
  const s = cfg.targetScale * (w / 256);
  const sprite = scene.add.sprite(0, 0, 'slot').setScale(s);
  const spec = fontSpec(cfg);
  const num = scene.add.text(0, 0, String(index), {
    fontFamily: spec.family,
    fontSize: `${Math.round(20 * cfg.fontScale)}px`,
    fontStyle: 'bold',
    color: '#5a6484',
    letterSpacing: spec.spacing
  }).setOrigin(0.5);
  const root = scene.add.container(x, y, [sprite, num]);
  root.setDepth(5);
  return {
    root,
    dispose(): void {
      root.destroy();
    }
  };
}

/** Rettangolo hit centrato sull'oggetto (ampliato con permissiveTouch). */
export function permissiveHit(cfg: EffectiveConfig, w: number, h: number): Phaser.Geom.Rectangle {
  const r = hitRect(w, h, cfg.permissiveTouch);
  return new Phaser.Geom.Rectangle(r.x, r.y, r.width, r.height);
}

/** Fisher–Yates su una COPIA (non muta l'originale). */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

/**
 * Adatta il numero di opzioni al limite BES (`fewerOptions`).
 * Mantiene SEMPRE l'opzione corretta + fintantefattibili sbagliate.
 */
export function fitOptions(options: Option[], max: number): Option[] {
  const shuffled = shuffle(options);
  if (shuffled.length <= max) return shuffled;
  const correct = shuffled.filter((o) => o.correct);
  const wrong = shuffle(shuffled.filter((o) => !o.correct)).slice(0, Math.max(0, max - correct.length));
  return shuffle([...correct, ...wrong]);
}

/**
 * Lampeggio a tutto schermo (cue visivo per chi ha difficoltà audio).
 * Non interattivo: NON intercetta i tocchi.
 */
export function flashCue(scene: Phaser.Scene, cfg: EffectiveConfig, kind: 'ok' | 'bad'): void {
  if (!cfg.visualAudioCues) return;
  const color = kind === 'ok' ? 0x58d68d : 0xff5d5d;
  const r = scene.add.rectangle(512, 288, 1024, 576, color, 0).setDepth(400);
  scene.tweens.add({
    targets: r,
    alpha: 0.32,
    duration: 130,
    yoyo: true,
    repeat: 1,
    onComplete: () => r.destroy()
  });
}

/**
 * Banner di feedback (sotto, sopra la terra). Il chiamante decide la durata
 * e chiama dispose() (con fade out).
 */
export function showBanner(
  scene: Phaser.Scene,
  cfg: EffectiveConfig,
  text: string,
  sub: string | null,
  kind: 'ok' | 'bad'
): { dispose(): void } {
  const w = 720;
  const h = sub ? 138 : 96;
  const cx = 512;
  const cy = 468;
  const spec = fontSpec(cfg);
  const g = scene.add.graphics().setDepth(300);
  g.fillStyle(0x20222f, 0.93);
  g.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, 18);
  g.lineStyle(3, kind === 'ok' ? 0x58d68d : 0xff5d5d, 1);
  g.strokeRoundedRect(cx - w / 2, cy - h / 2, w, h, 18);

  const t1 = scene.add
    .text(cx, sub ? cy - 27 : cy, text, {
      fontFamily: spec.family,
      fontSize: `${Math.round(27 * cfg.fontScale)}px`,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: w - 64, useAdvancedWrap: true },
      letterSpacing: spec.spacing
    })
    .setOrigin(0.5)
    .setDepth(301);

  let t2: Phaser.GameObjects.Text | null = null;
  if (sub) {
    t2 = scene.add
      .text(cx, cy + 32, sub, {
        fontFamily: spec.family,
        fontSize: `${Math.round(18 * cfg.fontScale)}px`,
        color: '#cdd6f0',
        align: 'center',
        wordWrap: { width: w - 64, useAdvancedWrap: true },
        letterSpacing: spec.spacing
      })
      .setOrigin(0.5)
      .setDepth(301);
  }

  const objs = [g, t1, ...(t2 ? [t2] : [])];
  scene.tweens.add({ targets: objs, alpha: 1, duration: 160 });
  return {
    dispose(): void {
      scene.tweens.add({
        targets: objs,
        alpha: 0,
        duration: 200,
        onComplete: () => {
          g.destroy();
          t1.destroy();
          if (t2) t2.destroy();
        }
      });
    }
  };
}

/**
 * Posizioni per le opzioni multiple in base al numero (2-4),
 * tenendo conto della scala degli obiettivi.
 */
export function optionLayout(n: number, scale: number): [number, number][] {
  const w = BTN_W * scale;
  const gap = 24 * scale;
  if (n <= 1) return [[512, 350]];
  if (n === 2) return [[512 - w / 2 - gap, 350], [512 + w / 2 + gap, 350]];
  if (n === 3) return [[512 - w / 2 - gap, 296], [512 + w / 2 + gap, 296], [512, 448]];
  return [
    [512 - w / 2 - gap, 296],
    [512 + w / 2 + gap, 296],
    [512 - w / 2 - gap, 452],
    [512 + w / 2 + gap, 452]
  ];
}
