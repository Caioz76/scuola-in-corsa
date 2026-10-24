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
}

export interface World {
  /** Quante prove sono state superate (accende i checkpoint). */
  setProgress(done: number, total: number): void;
  /** Scatto in avanti: il mondo accelera, Pico salta. */
  dash(): void;
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
  const scenografia = cfg.decoration;
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
    // Velo scuro: la scenografia si vede, ma i testi chiari restano leggibili.
    const velo = scene.add.rectangle(0, 0, W, H, 0x101833, 0.42).setOrigin(0).setDepth(-25);
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

  const disegnaCheckpoint = (): void => {
    checkpoint.clear();
    if (!opts.track || totali <= 0) return;
    const x0 = 196;
    const x1 = 500;
    const y = 546;
    const passoX = (x1 - x0) / totali;
    const largo = Math.max(8, passoX - 8);
    for (let i = 0; i < totali; i++) {
      const acceso = i < fatti;
      const x = x0 + passoX * i;
      checkpoint.fillStyle(acceso ? 0x58d68d : 0x1b2138, acceso ? 1 : 0.85);
      checkpoint.fillRoundedRect(x, y - 6, largo, 12, 6);
      checkpoint.lineStyle(2, acceso ? 0x8fe3b0 : 0x6f7a99, 0.9);
      checkpoint.strokeRoundedRect(x, y - 6, largo, 12, 6);
    }
    if (!bandiera) {
      bandiera = scene.add.image(566, 508, 'flag').setScale(0.52).setDepth(-13);
      oggetti.push(bandiera);
    }
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
    destroy(): void {
      distruggi();
    }
  };
}
