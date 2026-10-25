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
import { SUBJECTS, type ThemeKey, applyPageTheme } from './backgrounds';

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
  /** Pico di profilo (Runner) invece che frontale (Quiz). */
  sidePico?: boolean;
  /** Posizione di Pico sullo schermo; in Runner sta più al centro. */
  picoX?: number;
  /** Cespugli e sassi che scorrono sul bordo della pista (Runner). */
  props?: boolean;
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
  /** Velocità attuale dello scorrimento, in px/s (la usa il Runner). */
  speed(): number;
  /** Cambia la velocità: il mondo accelera o frena dolcemente. */
  setSpeed(px: number): void;
  destroy(): void;
}

export function addWorld(
  scene: Phaser.Scene,
  theme: ThemeKey,
  cfg: EffectiveConfig,
  opts: WorldOpts = {}
): World {
  // Margine extra a sinistra e a destra per coprire qualsiasi aspect ratio panoramico
  // (es. iPhone con Dynamic Island / notch in landscape a tutto schermo).
  const EXTRA_X = 800;
  let curW = Math.max(1024, scene.scale.gameSize.width);
  let curH = Math.max(576, scene.scale.gameSize.height);
  let wBg = Math.max(3600, curW + EXTRA_X * 2);

  applyPageTheme(theme, cfg.highContrast);
  // La scenografia è "decorazione": chi ha chiesto una schermata pulita non la vede.
  const scenografia = cfg.decoration && !cfg.highContrast;
  // Con "riduci i movimenti" la scenografia c'è ma resta ferma.
  const animato = scenografia && cfg.motion !== 'off';
  // Con "riduci i movimenti" la velocità è zero anche se la scena ne chiede una.
  const velocitaBase = animato ? (opts.speed ?? 24) : 0;

  const oggetti: Phaser.GameObjects.GameObject[] = [];
  let far: Phaser.GameObjects.TileSprite | null = null;
  let mid: Phaser.GameObjects.TileSprite | null = null;
  let velo: Phaser.GameObjects.Rectangle | null = null;

  if (scenografia) {
    far = scene.add
      .tileSprite(-EXTRA_X, 0, wBg, curH, `bg-${theme}-far`)
      .setOrigin(0)
      .setDepth(-40)
      .setName('bg-far');
    mid = scene.add
      .tileSprite(-EXTRA_X, 0, wBg, curH, `bg-${theme}-mid`)
      .setOrigin(0)
      .setDepth(-30)
      .setName('bg-mid');
    oggetti.push(far, mid);
    // Velo chiaro: la scenografia si vede, ma i testi scuri restano leggibili.
    velo = scene.add.rectangle(-EXTRA_X, 0, wBg, curH, 0xffffff, 0.34).setOrigin(0).setDepth(-25);
    oggetti.push(velo);
  }

  // Pista: sempre presente, è il terreno su cui corre Pico.
  const pista = scene.add
    .tileSprite(-EXTRA_X, curH - 96, wBg, 96, 'groundRow')
    .setOrigin(0)
    .setDepth(-22)
    .setName('pista');
  oggetti.push(pista);

  // Cespugli, sassi e fiori sul bordo: senza riferimenti vicini lo scorrimento
  // non si vede. Sono decorazione, quindi spariscono con "schermata pulita".
  let props: Phaser.GameObjects.TileSprite | null = null;
  if (opts.props && scenografia) {
    props = scene.add
      .tileSprite(-EXTRA_X, curH - 96, wBg, 64, 'propsRow')
      .setOrigin(0)
      .setDepth(-21)
      .setName('bordo');
    oggetti.push(props);
  }

  // ── Pico ──
  const modoPico = opts.pico ?? 'run';
  const diProfilo = opts.sidePico === true;
  const picoX = opts.picoX ?? 66;
  const texCorsa = diProfilo ? ['pico-side1', 'pico-side2'] : ['pico-run1', 'pico-run2'];
  const texFermo = diProfilo ? 'pico-side-idle' : 'pico-idle';
  const texSalto = diProfilo ? 'pico-side-jump' : 'pico-jump';
  let pico: Phaser.GameObjects.Image | null = null;
  let frame = 0;
  let inCorsa = animato || velocitaBase > 0;
  let saltoInCorso = false;

  if (modoPico !== false) {
    pico = scene.add
      .image(picoX, curH - 50, modoPico === 'cheer' ? (diProfilo ? texSalto : 'pico-cheer') : texCorsa[0])
      .setScale(diProfilo ? 0.92 : 0.84)
      .setDepth(-15)
      .setName('pico');
    oggetti.push(pico);
  }
  // Da dove parte e dove torna dopo un salto (modalità Runner).
  const CASA_X = picoX;
  const CASA_Y = curH - 50;

  const passo = scene.time.addEvent({
    delay: 130,
    loop: true,
    callback: () => {
      if (!pico || !inCorsa || modoPico !== 'run' || saltoInCorso) return;
      frame = 1 - frame;
      pico.setTexture(texCorsa[frame]);
    }
  });

  // Polvere dietro la ruota: dà la velocità anche guardando solo Pico.
  let polvere: Phaser.Time.TimerEvent | null = null;
  if (diProfilo && animato) {
    polvere = scene.time.addEvent({
      delay: 85,
      loop: true,
      callback: () => {
        if (!pico || !inCorsa || saltoInCorso) return;
        const r = Phaser.Math.Between(3, 6);
        const d = scene.add.circle(pico.x - 26, CASA_Y + 30, r, 0xffffff, 0.55).setDepth(-16);
        scene.tweens.add({
          targets: d,
          x: d.x - 46,
          y: d.y - 10,
          alpha: 0,
          scale: 0.4,
          duration: 430,
          ease: 'Quad.easeOut',
          onComplete: () => d.destroy()
        });
      }
    });
  }

  // ── Checkpoint (solo nella schermata di gioco) ──
  const checkpoint = scene.add.graphics().setDepth(-14);
  oggetti.push(checkpoint);
  let bandiera: Phaser.GameObjects.Image | null = null;
  let fatti = 0;
  let totali = 0;

  // La pista va dal primo checkpoint al traguardo: Pico la percorre davvero,
  // prova dopo prova. Con "riduci i movimenti" si sposta senza animazione.
  const xCheckpoint = (i: number): number => {
    const p0 = Math.round(curW * 0.18);
    const p1 = Math.round(curW * 0.85);
    return totali > 1 ? p0 + ((p1 - p0) * i) / (totali - 1) : p1;
  };

  const disegnaCheckpoint = (): void => {
    checkpoint.clear();
    if (!opts.track || totali <= 0) return;
    const p0 = Math.round(curW * 0.18);
    const p1 = Math.round(curW * 0.85);
    const pY = curH - 30;

    // linea della pista, chiara: si vede anche sul prato
    checkpoint.lineStyle(6, 0xffffff, 0.5);
    checkpoint.lineBetween(p0, pY, p1, pY);
    for (let i = 0; i < totali; i++) {
      const acceso = i < fatti;
      const x = xCheckpoint(i);
      checkpoint.fillStyle(acceso ? 0x3aa564 : 0xffffff, acceso ? 1 : 0.95);
      checkpoint.fillCircle(x, pY, 9);
      checkpoint.lineStyle(2, acceso ? 0x24804a : 0x8a99ad, 0.95);
      checkpoint.strokeCircle(x, pY, 9);
    }
    if (!bandiera) {
      bandiera = scene.add.image(p1 + 46, curH - 64, 'flag').setScale(0.5).setDepth(-13);
      oggetti.push(bandiera);
    } else {
      bandiera.setPosition(p1 + 46, curH - 64);
    }
  };

  /** Porta Pico al checkpoint raggiunto (o alla partenza se non ha ancora corso). */
  const portaPico = (compiuti: number): void => {
    if (!pico || opts.advance === false) return;
    const pX = Math.round(curW * 0.06);
    const target = compiuti <= 0 ? pX : xCheckpoint(Math.min(compiuti, totali) - 1);
    if (!animato) {
      pico.x = target;
      return;
    }
    scene.tweens.add({ targets: pico, x: target, duration: 420, ease: 'Cubic.easeOut' });
  };

  disegnaCheckpoint();

  // Reattività dinamica al resize dello schermo (rotazione iPhone landscape / portrait)
  const suResize = (): void => {
    curW = Math.max(1024, scene.scale.gameSize.width);
    curH = Math.max(576, scene.scale.gameSize.height);
    wBg = Math.max(3600, curW + EXTRA_X * 2);
    if (far) far.setSize(wBg, curH);
    if (mid) mid.setSize(wBg, curH);
    if (velo) {
      velo.width = wBg;
      velo.height = curH;
    }
    pista.setSize(wBg, 96);
    pista.y = curH - 96;
    if (props) {
      props.setSize(wBg, 64);
      props.y = curH - 96;
    }
    disegnaCheckpoint();
  };
  scene.scale.on(Phaser.Scale.Events.RESIZE, suResize);

  // ── Scorrimento ──
  let spinta = 0;
  let velocita = velocitaBase;
  let bersaglio = velocitaBase;
  const ACCEL = 1800; // px/s²
  const FRENA = 2600;

  const aggiorna = (_time: number, deltaMs: number): void => {
    const dt = Math.min(deltaMs, 50);
    const dtS = dt / 1000;
    if (spinta > 0) spinta -= dt;
    const desiderata = spinta > 0 ? Math.max(bersaglio, 430) : bersaglio;
    if (!animato) velocita = 0;
    else if (velocita < desiderata) velocita = Math.min(desiderata, velocita + ACCEL * dtS);
    else velocita = Math.max(desiderata, velocita - FRENA * dtS);

    const correndo = animato && velocita > 8;
    if (correndo !== inCorsa) {
      inCorsa = correndo;
      if (pico && !saltoInCorso && modoPico === 'run') {
        pico.setTexture(correndo ? texCorsa[0] : texFermo);
      }
    }

    const spostamento = velocita * dtS;
    if (far) far.tilePositionX += spostamento * 0.35;
    if (mid) mid.tilePositionX += spostamento * 0.7;
    pista.tilePositionX += spostamento;
    if (props) props.tilePositionX += spostamento;
  };
  scene.events.on(Phaser.Scenes.Events.UPDATE, aggiorna);

  // Pulizia automatica: la scena può essere fermata o riavviata (Settings lo fa
  // a ogni tocco). Senza questo, i listener si accumulerebbero a ogni visita.
  const distruggi = (): void => {
    scene.scale.off(Phaser.Scale.Events.RESIZE, suResize);
    scene.events.off(Phaser.Scenes.Events.UPDATE, aggiorna);
    scene.events.off(Phaser.Scenes.Events.SHUTDOWN, distruggi);
    passo.remove(false);
    polvere?.remove(false);
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
      pico.setTexture(texSalto);
      scene.tweens.add({
        targets: pico,
        y: pico.y - 26,
        duration: 170,
        yoyo: true,
        ease: 'Quad.easeOut',
        onComplete: () => {
          saltoInCorso = false;
          if (pico && modoPico === 'run') pico.setTexture(inCorsa ? texCorsa[0] : texFermo);
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
      const bersaglioX = Phaser.Math.Clamp(x, 150, curW - 150);
      const bersaglioY = Phaser.Math.Clamp(y, 300, CASA_Y - 40);
      pico.setTexture(texSalto);
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
                if (pico && modoPico === 'run') pico.setTexture(inCorsa ? texCorsa[0] : texFermo);
              }
            });
          });
        }
      });
    },
    speed(): number {
      return velocita;
    },
    setSpeed(px: number): void {
      bersaglio = animato ? Math.max(0, px) : 0;
    },
    destroy(): void {
      distruggi();
    }
  };
}
