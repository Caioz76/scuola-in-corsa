/**
 * Helper UI condivisi dalle prove (challenges) e dalle scene:
 * font BES, bottoni, chip, slot, banner, mescolamento, cue visivi.
 *
 * Qui vivono anche i contratti comuni:
 *  - `Challenge`: interfaccia che ogni prova deve implementare
 *  - `ChallengeCallbacks`: come la prova comunica il risultato al GameScene
 */
import Phaser from 'phaser';
import { testoSemplice, type EffectiveConfig } from '../bes/resolver';
import { T } from '../art/palette';
import type { Option } from '../content/types';
import { hitRect } from './hit';

export { testoSemplice };

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
    : { family: '"Arial Rounded MT Bold", "Trebuchet MS", "Segoe UI", Verdana, sans-serif', spacing: 0 };
}

export interface TextOpts {
  size?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  wrap?: number;
  /** Altezza massima consentita in px: riduce automaticamente il font se il testo straborda. */
  maxH?: number;
  /** Contorno bianco leggero (leggibilità su sfondi vari). */
  outline?: boolean;
}

/**
 * Riduce progressivamente il fontSize (fino a `minPx`) se il testo supera
 * `maxW` o `maxH`, evitando sovrapposizioni quando `fontScale > 1` (es. Dislessia / Ipovisione).
 */
export function fitTextToBox(
  t: Phaser.GameObjects.Text,
  maxW: number,
  maxH: number,
  minPx = 11
): void {
  const rawSize = parseInt(String(t.style.fontSize), 10);
  let px = Number.isFinite(rawSize) && rawSize > 0 ? rawSize : 18;
  while (px > minPx && (t.height > maxH || t.width > maxW + 6)) {
    px -= 1;
    t.setFontSize(px);
    t.setLineSpacing(Math.max(1, Math.round(px * 0.12)));
  }
}

/** Testo BES-aware (font, scala, spaziatura, anti-sovrapposizione). */
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
  const colore = cfg.highContrast ? hcColor(o.color ?? T.body) : (o.color ?? T.body);
  const wrapW = o.wrap ?? 820;
  const lineGap = Math.round(size * 0.14);
  const t = scene.add.text(x, y, str, {
    fontFamily: spec.family,
    fontSize: `${size}px`,
    fontStyle: o.bold ? 'bold' : 'normal',
    color: colore,
    align: o.align ?? 'center',
    wordWrap: { width: wrapW, useAdvancedWrap: true },
    letterSpacing: spec.spacing,
    lineSpacing: lineGap
  }).setOrigin(0.5);
  if (o.italic) t.setStyle({ fontStyle: 'italic' });
  if (o.maxH !== undefined && o.maxH > 0) {
    fitTextToBox(t, wrapW, o.maxH, 11);
  }
  if (o.outline) t.setShadow(0, 0, '#ffffff', Math.max(2, Math.round(size * 0.09)), true, false);
  // Alto contrasto: nero pieno, senza ombre decorative.
  if (cfg.highContrast) {
    t.setColor('#000000');
    t.setShadow(0, 0, 'transparent', 0);
  }
  return t;
}

/**
 * Alto contrasto: ogni testo diventa nero pieno su fondo chiaro.
 * Non si conservano i colori decorativi: leggibilità prima di tutto.
 */
function hcColor(_c: string): string {
  return '#000000';
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
  o: { w?: number; scale?: number; maxTargetScale?: number; depth?: number } = {}
): Btn {
  const k = o.scale ?? 1;
  // Nelle griglie fitte (scale < 0.85) limitiamo automaticamente l'espansione di targetScale
  // per impedire che bottoni adiacenti si sovrappongano.
  const defaultMaxTs = k < 0.65 ? 1.03 : k < 0.88 ? 1.06 : 1.22;
  const ts = Math.min(cfg.targetScale, o.maxTargetScale ?? defaultMaxTs);
  const s = ts * k;
  const sprite = scene.add.sprite(0, 0, 'btn-blue').setScale(s);
  const spec = fontSpec(cfg);
  const boxW = Math.max(56, (BTN_W - 36) * s);
  const boxH = Math.max(18, (BTN_H - 18) * s);
  const baseFontPx = Math.max(11, Math.round(24 * cfg.fontScale * k));
  const text = scene.add.text(0, 0, label, {
    fontFamily: spec.family,
    fontSize: `${baseFontPx}px`,
    fontStyle: 'bold',
    color: T.body,
    align: 'center',
    wordWrap: { width: boxW, useAdvancedWrap: true },
    letterSpacing: spec.spacing
  }).setOrigin(0.5);
  fitTextToBox(text, boxW, boxH, 10);
  const root = scene.add.container(x, y, [sprite, text]);
  root.setDepth(o.depth ?? 10);

  // Coordinate di TEXTURE: è lo spazio in cui Phaser fa il controllo.
  const hit = permissiveHit(cfg, sprite.width, sprite.height);
  sprite.setInteractive(hit, Phaser.Geom.Rectangle.Contains);

  let enabled = true;
  return {
    root,
    text,
    setLabel(sLbl: string): void {
      text.setFontSize(baseFontPx);
      text.setText(sLbl);
      fitTextToBox(text, boxW, boxH, 10);
    },
    setKind(kKind: BtnKind): void {
      if (scene.textures.exists(KIND_TEX[kKind])) sprite.setTexture(KIND_TEX[kKind]);
      if (kKind === 'disabled') text.setStyle({ color: T.faint });
      else text.setStyle({ color: T.body });
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
  // Quando larghezza o altezza sono vincolate dalla griglia (match/order),
  // non espandiamo la card oltre la cella assegnata per evitare collisioni.
  const ts = o.w !== undefined || o.h !== undefined ? Math.min(cfg.targetScale, 1.02) : cfg.targetScale;
  const sx = ts * (w / 256);
  const sy = ts * (h / 96);
  const sprite = scene.add.sprite(0, 0, 'card').setScale(sx, sy);
  const spec = fontSpec(cfg);
  const boxW = Math.max(56, w * ts - 32);
  const boxH = Math.max(20, h * ts - 14);
  const text = scene.add.text(0, 0, label, {
    fontFamily: spec.family,
    fontSize: `${Math.round((o.size ?? 22) * cfg.fontScale)}px`,
    fontStyle: 'bold',
    color: T.body,
    align: 'center',
    wordWrap: { width: boxW, useAdvancedWrap: true },
    letterSpacing: spec.spacing
  }).setOrigin(0.5);
  fitTextToBox(text, boxW, boxH, 11);
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
  const ts = o.w !== undefined || o.h !== undefined ? Math.min(cfg.targetScale, 1.02) : cfg.targetScale;
  const sx = ts * (w / 256);
  const sy = ts * (h / 96);
  const sprite = scene.add.sprite(0, 0, 'slot').setScale(sx, sy);
  const spec = fontSpec(cfg);
  const num = scene.add.text(0, 0, String(index), {
    fontFamily: spec.family,
    fontSize: `${Math.round(20 * cfg.fontScale)}px`,
    fontStyle: 'bold',
    color: '#5f7186',
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
 * Riga interruttore per il pannello "regole una per una".
 * Il tocco agisce sull'intera riga (zona interattiva), non solo sul testo.
 */
export function makeToggle(
  scene: Phaser.Scene,
  cfg: EffectiveConfig,
  x: number,
  y: number,
  w: number,
  label: string,
  on: boolean,
  onTap: () => void
): void {
  const h = 32;
  const spec = fontSpec(cfg);
  const g = scene.add.graphics().setDepth(10);
  g.fillStyle(on ? 0xdff6e7 : 0xffffff, 0.96);
  g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 9);
  g.lineStyle(2, on ? 0x3aa564 : 0xc9d3e0, 1);
  g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 9);

  const lbl = scene.add
    .text(x - w / 2 + 12, y, label, {
      fontFamily: spec.family,
      fontSize: `${Math.round(13 * cfg.fontScale)}px`,
      color: cfg.highContrast ? '#000000' : T.body,
      wordWrap: { width: w - 74, useAdvancedWrap: true }
    })
    .setOrigin(0, 0.5)
    .setDepth(11);
  fitTextToBox(lbl, w - 74, h - 6, 10);
  scene.add
    .text(x + w / 2 - 12, y, on ? 'ON' : 'OFF', {
      fontFamily: spec.family,
      fontSize: `${Math.min(15, Math.round(13 * cfg.fontScale))}px`,
      color: on ? T.ok : cfg.highContrast ? '#000000' : T.faint,
      fontStyle: 'bold'
    })
    .setOrigin(1, 0.5)
    .setDepth(11);

  const zona = scene.add.zone(x, y, w, h).setInteractive({ useHandCursor: true });
  zona.setDepth(12);
  zona.on('pointerup', onTap);
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
  kind: 'ok' | 'bad',
  at?: { x?: number; y?: number }
): { dispose(): void } {
  // `at` permette di spostare il feedback dove non copre il contenuto:
  // nelle prove a opzioni va sopra i bottoni, nelle altre in basso.
  const w = 660;
  const h = sub ? 132 : 92;
  const cx = at?.x ?? 512;
  const cy = at?.y ?? 468;
  const spec = fontSpec(cfg);
  const g = scene.add.graphics().setDepth(300);
  // scheda bianca con ombra morbida e bordo colorato
  g.fillStyle(0x3b4a5a, 0.16);
  g.fillRoundedRect(cx - w / 2 + 4, cy - h / 2 + 6, w, h, 20);
  g.fillStyle(0xffffff, 0.97);
  g.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, 20);
  g.lineStyle(4, kind === 'ok' ? 0x3aa564 : 0xe05a5a, 1);
  g.strokeRoundedRect(cx - w / 2, cy - h / 2, w, h, 20);

  const t1 = scene.add
    .text(cx, sub ? cy - 27 : cy, text, {
      fontFamily: spec.family,
      fontSize: `${Math.round(27 * cfg.fontScale)}px`,
      fontStyle: 'bold',
      color: cfg.highContrast ? '#000000' : T.body,
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
        color: cfg.highContrast ? '#000000' : T.sub,
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
  if (n === 3) return [[512 - w / 2 - gap, 296], [512 + w / 2 + gap, 296], [512, 430]];
  return [
    [512 - w / 2 - gap, 296],
    [512 + w / 2 + gap, 296],
    [512 - w / 2 - gap, 432],
    [512 + w / 2 + gap, 432]
  ];
}
