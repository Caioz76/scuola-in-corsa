/**
 * Il "mondo" di Scuola in Corsa: scenografia parallax, pista, Pico che corre
 * e i checkpoint della tappa.
 *
 * È un livello puramente visivo (depth negativi): le prove, i bottoni e i
 * banner restano sopra e non vengono toccati. Le regole BES contano davvero:
 *  - `noDecoration` → niente scenografia, resta la pista su fondo scuro;
 *  - `reduceMotion` → scenografia ferma (nessuno scorrimento).
 */
import Phaser from 'phaser';
import type { EffectiveConfig } from '../bes/resolver';
import { SUBJECTS, type ThemeKey } from './backgrounds';

/** Materia del pacchetto → tema grafico; qualunque altro valore usa il neutro. */
export function themeFor(subject: string | null | undefined): ThemeKey {
  return subject && (SUBJECTS as readonly string[]).includes(subject)
    ? (subject as ThemeKey)
    : 'scuola';
}

export interface WorldOpts {
  /** Pico che corre (default) oppure che esulta; `false` per non mostrarlo. */
  pico?: 'run' | 'cheer' | false;
  /** Pista con i checkpoint in basso (schermata di gioco). */
  track?: boolean;
  /** Velocità di scorrimento in px/s quando il mondo è animato. */
  speed?: number;
  /**
   * Se `false`, superare una prova non sposta Pico lungo la pista: serve alla
   * modalità Runner, dove è il salto verso il cartello a muoverlo.
   */
  advance?: boolean;
}

export interface World {
  /** Quante prove sono state superate (accende i checkpoint). */
  setProgress(done: number, total: number): void;
  /** Scatto in avanti: il mondo accelera, Pico salta. */
  dash(): void;
  /** Salto verso un punto (il cartello scelto in modalità Runner). */
  leap(x: number, y: number): void;
  /** Inciampo: Pico diventa rosso per un attimo. */
  stumble(): void;
  destroy(): void;
}

const W = 1024;
const H = 576;

export function addWorld(
  scene: Phaser.Scene,
  theme: ThemeKey,
  cfg: EffectiveConfig,
  opts: WorldOpts = {}
): World {
  // La scenografia è "decorazione": chi ha chiesto una schermata pulita non la vede.
  const scenografia = cfg.decoration && !cfg.highContrast;
  // Con "riduci i movimenti" la scenografia c'è ma resta ferma.
  const animato = scenografia && cfg.motion !== 'off';
  // Con "riduci i movimenti" la velocità è zero anche se la scena ne chiede una.
  const velocitaBase = animato ? (opts.speed ?? 24) : 0;

  const oggetti: Phaser.GameObjects.GameObject[] = [];
  let far: Phaser.GameObjects.TileSprite | null = null;
  let mid: Phaser.GameObjects.TileSprite | null = null;

  if (scenografia) {
    far = scene.add
      .tileSprite(0, 0, W, H, `bg-${theme}-far`)
      .setOrigin(0)
      .setDepth(-40)
      .setName('bg-far');
    mid = scene.add
      .tileSprite(0, 0, W, H, `bg-${theme}-mid`)
      .setOrigin(0)
      .setDepth(-30)
      .setName('bg-mid');
    oggetti.push(far, mid);
    // Velo chiaro: la scenografia si vede, ma i testi scuri restano leggibili.
    const velo = scene.add.rectangle(0, 0, W, H, 0xffffff, 0.34).setOrigin(0).setDepth(-25);
    oggetti.push(velo);
  }

  // Pista: sempre presente, è il terreno su cui corre Pico.
  const pista = scene.add
    .tileSprite(0, H - 96, W, 96, 'groundRow')
    .setOrigin(0)
    .setDepth(-22)
    .setName('pista');
  oggetti.push(pista);

  // ── Pico ──
  const modoPico = opts.pico ?? 'run';
  let pico: Phaser.GameObjects.Image | null = null;
  let frame = 0;
  let inCorsa = animato || velocitaBase > 0;
  let saltoInCorso = false;

  if (modoPico !== false) {
    pico = scene.add
      .image(66, H - 50, modoPico === 'cheer' ? 'pico-cheer' : 'pico-run1')
      .setScale(0.84)
      .setDepth(-15)
      .setName('pico');
    oggetti.push(pico);
  }
  // Da dove parte e dove torna dopo un salto (modalità Runner).
  const CASA_X = 66;
  const CASA_Y = H - 50;

  const passo = scene.time.addEvent({
    delay: 130,
    loop: true,
    callback: () => {
      if (!pico || !inCorsa || modoPico !== 'run' || saltoInCorso) return;
      frame = 1 - frame;
      pico.setTexture(frame === 1 ? 'pico-run2' : 'pico-run1');
    }
  });

  // ── Checkpoint (solo nella schermata di gioco) ──
  const checkpoint = scene.add.graphics().setDepth(-14);
  oggetti.push(checkpoint);
  let bandiera: Phaser.GameObjects.Image | null = null;
  let fatti = 0;
  let totali = 0;

  // La pista va dal primo checkpoint al traguardo: Pico la percorre davvero,
  // prova dopo prova. Con "riduci i movimenti" si sposta senza animazione.
  const PISTA_X0 = 196;
  const PISTA_X1 = 860;
  const PISTA_Y = 546;
  const PARTENZA_X = 66;

  const xCheckpoint = (i: number): number =>
    totali > 1 ? PISTA_X0 + ((PISTA_X1 - PISTA_X0) * i) / (totali - 1) : PISTA_X1;

  const disegnaCheckpoint = (): void => {
    checkpoint.clear();
    if (!opts.track || totali <= 0) return;
    // linea della pista, chiara: si vede anche sul prato
    checkpoint.lineStyle(6, 0xffffff, 0.5);
    checkpoint.lineBetween(PISTA_X0, PISTA_Y, PISTA_X1, PISTA_Y);
    for (let i = 0; i < totali; i++) {
      const acceso = i < fatti;
      const x = xCheckpoint(i);
      checkpoint.fillStyle(acceso ? 0x3aa564 : 0xffffff, acceso ? 1 : 0.95);
      checkpoint.fillCircle(x, PISTA_Y, 9);
      checkpoint.lineStyle(2, acceso ? 0x24804a : 0x8a99ad, 0.95);
      checkpoint.strokeCircle(x, PISTA_Y, 9);
    }
    if (!bandiera) {
      bandiera = scene.add.image(906, 512, 'flag').setScale(0.5).setDepth(-13);
      oggetti.push(bandiera);
    }
  };

  /** Porta Pico al checkpoint raggiunto (o alla partenza se non ha ancora corso). */
  const portaPico = (compiuti: number): void => {
    if (!pico || opts.advance === false) return;
    const target = compiuti <= 0 ? PARTENZA_X : xCheckpoint(Math.min(compiuti, totali) - 1);
    if (!animato) {
      pico.x = target;
      return;
    }
    scene.tweens.add({ targets: pico, x: target, duration: 420, ease: 'Cubic.easeOut' });
  };

  disegnaCheckpoint();

  // ── Scorrimento ──
  let spinta = 0;

  const aggiorna = (_time: number, deltaMs: number): void => {
    const dt = Math.min(deltaMs, 50);
    const velocita = spinta > 0 ? 430 : velocitaBase;
    if (spinta > 0) spinta -= dt;
    const spostamento = (velocita * dt) / 1000;
    if (far) far.tilePositionX += spostamento * 0.35;
    if (mid) mid.tilePositionX += spostamento * 0.7;
    pista.tilePositionX += spostamento;
  };
  scene.events.on(Phaser.Scenes.Events.UPDATE, aggiorna);

  // Pulizia automatica: la scena può essere fermata o riavviata (Settings lo fa
  // a ogni tocco). Senza questo, i listener si accumulerebbero a ogni visita.
  const distruggi = (): void => {
    scene.events.off(Phaser.Scenes.Events.UPDATE, aggiorna);
    scene.events.off(Phaser.Scenes.Events.SHUTDOWN, distruggi);
    passo.remove(false);
    oggetti.forEach((o) => o.destroy());
  };
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, distruggi);

  return {
    setProgress(done: number, total: number): void {
      fatti = Math.max(0, Math.min(done, total));
      totali = total;
      disegnaCheckpoint();
      portaPico(fatti);
    },
    dash(): void {
      spinta = 700;
      if (!pico || saltoInCorso) return;
      saltoInCorso = true;
      inCorsa = true;
      pico.setTexture('pico-jump');
      scene.tweens.add({
        targets: pico,
        y: pico.y - 26,
        duration: 170,
        yoyo: true,
        ease: 'Quad.easeOut',
        onComplete: () => {
          saltoInCorso = false;
          if (pico && modoPico === 'run') pico.setTexture('pico-run1');
        }
      });
    },
    stumble(): void {
      if (!pico) return;
      pico.setTint(0xff8787);
      scene.time.delayedCall(280, () => pico?.clearTint());
    },
    leap(x: number, y: number): void {
      if (!pico) return;
      // Un salto alla volta; se ne arriva un altro, riparte da dove si trova.
      scene.tweens.killTweensOf(pico);
      saltoInCorso = true;
      inCorsa = true;
      const bersaglioX = Phaser.Math.Clamp(x, 150, W - 150);
      const bersaglioY = Phaser.Math.Clamp(y, 300, CASA_Y - 40);
      pico.setTexture('pico-jump');
      scene.tweens.add({
        targets: pico,
        x: bersaglioX,
        y: bersaglioY,
        duration: animato ? 240 : 0,
        ease: 'Quad.easeOut',
        onComplete: () => {
          // Un attimo di sospensione sulla testata, poi giù sul prato.
          scene.time.delayedCall(animato ? 170 : 0, () => {
            if (!pico) return;
            scene.tweens.add({
              targets: pico,
              x: CASA_X,
              y: CASA_Y,
              duration: animato ? 300 : 0,
              ease: 'Quad.easeIn',
              onComplete: () => {
                saltoInCorso = false;
                if (pico && modoPico === 'run') pico.setTexture('pico-run1');
              }
            });
          });
        }
      });
    },
    destroy(): void {
      distruggi();
    }
  };
}
