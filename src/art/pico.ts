/**
 * Pico — il robot giallo di Scuola in Corsa.
 * Frame procedurali (idle, corsa, salto, festa) su canvas 96×96.
 */
import type Phaser from 'phaser';
import { C } from './palette';

export interface PicoOpts {
  wheelAngle: number;
  tilt: number;
  armsUp: boolean;
  blink: boolean;
  mouth: 'smile' | 'open' | 'o';
}

function drawPico(ctx: CanvasRenderingContext2D, S: number, o: PicoOpts): void {
  const u = S / 96;
  ctx.save();
  // ombra (non ruota con il corpo)
  ctx.fillStyle = 'rgba(59,74,90,0.14)';
  ctx.beginPath(); ctx.ellipse(48*u, 91*u, 26*u, 4.5*u, 0, 0, 7); ctx.fill();

  ctx.translate(48*u, 54*u);
  ctx.rotate(o.tilt);
  ctx.translate(-48*u, -54*u);

  // antenna
  ctx.strokeStyle = C.picoDark; ctx.lineWidth = 3*u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(48*u, 18*u); ctx.lineTo(48*u, 9*u); ctx.stroke();
  ctx.fillStyle = C.orange;
  ctx.beginPath(); ctx.arc(48*u, 7*u, 4*u, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath(); ctx.arc(46.8*u, 5.8*u, 1.4*u, 0, 7); ctx.fill();

  // braccia
  ctx.fillStyle = C.picoDark;
  if (o.armsUp) {
    ctx.save(); ctx.translate(20*u, 50*u); ctx.rotate(-0.85);
    ctx.beginPath(); ctx.roundRect(-5*u, -20*u, 10*u, 22*u, 5*u); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.translate(76*u, 50*u); ctx.rotate(0.85);
    ctx.beginPath(); ctx.roundRect(-5*u, -20*u, 10*u, 22*u, 5*u); ctx.fill();
    ctx.restore();
  } else {
    ctx.beginPath(); ctx.roundRect(12*u, 46*u, 10*u, 22*u, 5*u); ctx.fill();
    ctx.beginPath(); ctx.roundRect(74*u, 46*u, 10*u, 22*u, 5*u); ctx.fill();
  }

  // corpo
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.roundRect(18*u, 18*u, 60*u, 58*u, 16*u); ctx.fill();
  ctx.fillStyle = C.pico;
  ctx.beginPath(); ctx.roundRect(21*u, 21*u, 54*u, 52*u, 13*u); ctx.fill();
  // riflesso
  ctx.fillStyle = 'rgba(255,255,255,0.30)';
  ctx.beginPath(); ctx.roundRect(25*u, 24*u, 46*u, 13*u, 7*u); ctx.fill();

  // visiera (azzurra, come uno schermo pulito)
  ctx.fillStyle = '#bfe6ff';
  ctx.beginPath(); ctx.roundRect(28*u, 32*u, 40*u, 27*u, 10*u); ctx.fill();

  // occhi
  if (o.blink) {
    ctx.strokeStyle = C.picoEye; ctx.lineWidth = 2.6*u; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(33*u, 45*u); ctx.lineTo(41*u, 45*u); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(55*u, 45*u); ctx.lineTo(63*u, 45*u); ctx.stroke();
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(37*u, 45*u, 6*u, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(59*u, 45*u, 6*u, 0, 7); ctx.fill();
    ctx.fillStyle = C.picoEye;
    ctx.beginPath(); ctx.arc(38*u, 46*u, 3.2*u, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(60*u, 46*u, 3.2*u, 0, 7); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(36.8*u, 44.4*u, 1.2*u, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(58.8*u, 44.4*u, 1.2*u, 0, 7); ctx.fill();
  }

  // bocca
  if (o.mouth === 'smile') {
    ctx.strokeStyle = C.picoEye; ctx.lineWidth = 2.4*u; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(43*u, 52*u); ctx.quadraticCurveTo(48*u, 56.5*u, 53*u, 52*u); ctx.stroke();
  } else if (o.mouth === 'open') {
    ctx.fillStyle = C.picoEye;
    ctx.beginPath(); ctx.ellipse(48*u, 53.5*u, 5*u, 4*u, 0, 0, 7); ctx.fill();
    ctx.fillStyle = C.picoCheek;
    ctx.beginPath(); ctx.ellipse(48*u, 55*u, 2.6*u, 1.7*u, 0, 0, 7); ctx.fill();
  } else {
    ctx.fillStyle = C.picoEye;
    ctx.beginPath(); ctx.arc(48*u, 53.5*u, 3*u, 0, 7); ctx.fill();
  }

  // guance
  ctx.fillStyle = C.picoCheek;
  ctx.beginPath(); ctx.ellipse(31.5*u, 51*u, 3*u, 2*u, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(64.5*u, 51*u, 3*u, 2*u, 0, 0, 7); ctx.fill();

  // ruote
  for (const [wx, wy] of [[32, 77], [64, 77]] as const) {
    ctx.fillStyle = C.ink;
    ctx.beginPath(); ctx.arc(wx*u, wy*u, 8*u, 0, 7); ctx.fill();
    ctx.fillStyle = C.gray;
    ctx.beginPath(); ctx.arc(wx*u, wy*u, 4.4*u, 0, 7); ctx.fill();
    ctx.strokeStyle = C.grayDeep; ctx.lineWidth = 1.8*u; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(wx*u + Math.cos(o.wheelAngle)*3.4*u, wy*u + Math.sin(o.wheelAngle)*3.4*u);
    ctx.lineTo(wx*u - Math.cos(o.wheelAngle)*3.4*u, wy*u - Math.sin(o.wheelAngle)*3.4*u);
    ctx.stroke();
    ctx.fillStyle = C.ink;
    ctx.beginPath(); ctx.arc(wx*u, wy*u, 1.6*u, 0, 7); ctx.fill();
  }

  ctx.restore();
}

/** Crea i frame di Pico. Da chiamare una volta sola (Boot). */
export function ensurePico(scene: Phaser.Scene): void {
  const make = (key: string, o: PicoOpts): void => {
    if (scene.textures.exists(key)) scene.textures.remove(key);
    const cv = scene.textures.createCanvas(key, 96, 96);
    if (!cv) return;
    drawPico(cv.getContext(), 96, o);
    cv.refresh();
  };
  make('pico-idle', { wheelAngle: 0, tilt: 0, armsUp: false, blink: false, mouth: 'smile' });
  make('pico-run1', { wheelAngle: 0.5, tilt: -0.05, armsUp: false, blink: false, mouth: 'smile' });
  make('pico-run2', { wheelAngle: 2.3, tilt: 0.05, armsUp: false, blink: false, mouth: 'open' });
  make('pico-jump', { wheelAngle: 1.2, tilt: 0, armsUp: true, blink: false, mouth: 'open' });
  make('pico-cheer', { wheelAngle: 0, tilt: 0, armsUp: true, blink: false, mouth: 'open' });
  make('pico-blink', { wheelAngle: 0, tilt: 0, armsUp: false, blink: true, mouth: 'smile' });
  make('pico-think', { wheelAngle: 0, tilt: 0.05, armsUp: false, blink: false, mouth: 'o' });
  ensurePicoSide(scene);
}

/** Pico di profilo, per la corsa: una ruota, visiera frontale e braccio. */
interface SideOpts {
  wheelAngle: number;
  tilt: number;
  arm: 'down' | 'forward' | 'back' | 'up';
}

function drawPicoSide(ctx: CanvasRenderingContext2D, S: number, o: SideOpts): void {
  const u = S / 96;
  // ombra a terra (non si inclina con il corpo)
  ctx.fillStyle = 'rgba(59,74,90,0.16)';
  ctx.beginPath(); ctx.ellipse(50 * u, 91 * u, 28 * u, 4.5 * u, 0, 0, 7); ctx.fill();

  // Si inclina sulla ruota, come chi spinge in avanti.
  ctx.save();
  ctx.translate(46 * u, 78 * u);
  ctx.rotate(o.tilt);
  ctx.translate(-46 * u, -78 * u);

  // zaino (dietro al corpo)
  ctx.fillStyle = C.blueDeep;
  ctx.beginPath(); ctx.roundRect(9 * u, 38 * u, 15 * u, 24 * u, 5 * u); ctx.fill();
  ctx.fillStyle = C.blue;
  ctx.beginPath(); ctx.roundRect(11 * u, 40 * u, 10 * u, 19 * u, 4 * u); ctx.fill();

  // ruota
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.arc(46 * u, 78 * u, 12 * u, 0, 7); ctx.fill();
  ctx.fillStyle = C.gray;
  ctx.beginPath(); ctx.arc(46 * u, 78 * u, 7.5 * u, 0, 7); ctx.fill();
  ctx.strokeStyle = C.grayDeep;
  ctx.lineWidth = 2.2 * u;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(46 * u + Math.cos(o.wheelAngle) * 6 * u, 78 * u + Math.sin(o.wheelAngle) * 6 * u);
  ctx.lineTo(46 * u - Math.cos(o.wheelAngle) * 6 * u, 78 * u - Math.sin(o.wheelAngle) * 6 * u);
  ctx.stroke();
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.arc(46 * u, 78 * u, 2 * u, 0, 7); ctx.fill();

  // braccio (dietro o davanti al corpo, a seconda del passo)
  const ang = o.arm === 'forward' ? 1.15 : o.arm === 'back' ? -1.05 : o.arm === 'up' ? -2.2 : 0.15;
  ctx.save();
  ctx.translate(66 * u, 50 * u);
  ctx.rotate(ang);
  ctx.fillStyle = C.picoDark;
  ctx.beginPath(); ctx.roundRect(-4.5 * u, -2 * u, 9 * u, 21 * u, 4.5 * u); ctx.fill();
  ctx.restore();

  // corpo
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.roundRect(19 * u, 26 * u, 55 * u, 47 * u, 15 * u); ctx.fill();
  ctx.fillStyle = C.pico;
  ctx.beginPath(); ctx.roundRect(22 * u, 29 * u, 49 * u, 41 * u, 12 * u); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.32)';
  ctx.beginPath(); ctx.roundRect(26 * u, 32 * u, 40 * u, 11 * u, 6 * u); ctx.fill();

  // visiera frontale (guarda a destra)
  ctx.fillStyle = '#bfe6ff';
  ctx.beginPath(); ctx.roundRect(49 * u, 35 * u, 23 * u, 19 * u, 8 * u); ctx.fill();
  // occhio
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(61 * u, 44 * u, 5.2 * u, 0, 7); ctx.fill();
  ctx.fillStyle = C.picoEye;
  ctx.beginPath(); ctx.arc(62.4 * u, 44.6 * u, 2.8 * u, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(61 * u, 42.6 * u, 1.1 * u, 0, 7); ctx.fill();

  // bocca e guancia
  ctx.strokeStyle = C.picoEye;
  ctx.lineWidth = 2 * u;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(56 * u, 57 * u);
  ctx.quadraticCurveTo(61 * u, 60 * u, 66 * u, 56 * u);
  ctx.stroke();
  ctx.fillStyle = C.picoCheek;
  ctx.beginPath(); ctx.ellipse(52 * u, 55 * u, 2.6 * u, 1.8 * u, 0, 0, 7); ctx.fill();

  // antenna
  ctx.strokeStyle = C.picoDark;
  ctx.lineWidth = 3 * u;
  ctx.beginPath(); ctx.moveTo(38 * u, 26 * u); ctx.lineTo(35 * u, 14 * u); ctx.stroke();
  ctx.fillStyle = C.orange;
  ctx.beginPath(); ctx.arc(35 * u, 11 * u, 4 * u, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath(); ctx.arc(33.8 * u, 9.8 * u, 1.3 * u, 0, 7); ctx.fill();

  ctx.restore();
}

/** Frame di Pico di profilo (modalità Runner). */
export function ensurePicoSide(scene: Phaser.Scene): void {
  const make = (key: string, o: SideOpts): void => {
    if (scene.textures.exists(key)) scene.textures.remove(key);
    const cv = scene.textures.createCanvas(key, 96, 96);
    if (!cv) return;
    drawPicoSide(cv.getContext(), 96, o);
    cv.refresh();
  };
  make('pico-side-idle', { wheelAngle: 0, tilt: 0, arm: 'down' });
  make('pico-side1', { wheelAngle: 0.5, tilt: -0.04, arm: 'forward' });
  make('pico-side2', { wheelAngle: 2.3, tilt: 0.05, arm: 'back' });
  make('pico-side-jump', { wheelAngle: 1.2, tilt: -0.14, arm: 'up' });
}
