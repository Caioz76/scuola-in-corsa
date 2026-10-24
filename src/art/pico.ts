/**
 * Pico — il Mii-Robot Atleta di Scuola in Corsa (stile Nintendo Wii Sports).
 * Scocca bianco-perla e giallo solare, maglia sportiva Azzurro Wii (#00a2e8)
 * con colletto a V bianco, fascia antisudore (sweatband), mani sferiche
 * fluttuanti stile Mii, visiera espressiva e ruote high-tech Wii.
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

/** Disegna una mano sferica fluttuante stile Mii con polsino sportivo. */
function drawMiiHand(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, u: number): void {
  // Ombra morbida
  ctx.fillStyle = 'rgba(43,66,94,0.22)';
  ctx.beginPath(); ctx.arc(x, y + 1.4 * u, r, 0, 7); ctx.fill();
  // Sfera bianca porcellana Mii
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.strokeStyle = '#00a2e8';
  ctx.lineWidth = 1.6 * u;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke();
  // Riflesso lucido
  ctx.fillStyle = '#e8f6ff';
  ctx.beginPath(); ctx.arc(x - r * 0.28, y - r * 0.28, r * 0.38, 0, 7); ctx.fill();
}

function drawPico(ctx: CanvasRenderingContext2D, S: number, o: PicoOpts): void {
  const u = S / 96;
  ctx.save();
  // Ombra a terra (non ruota con il corpo)
  ctx.fillStyle = 'rgba(25,55,85,0.18)';
  ctx.beginPath(); ctx.ellipse(48 * u, 91 * u, 27 * u, 4.8 * u, 0, 0, 7); ctx.fill();

  ctx.translate(48 * u, 54 * u);
  ctx.rotate(o.tilt);
  ctx.translate(-48 * u, -54 * u);

  // Antenna high-tech con sfera luminosa Azzurro Wii / Oro
  ctx.strokeStyle = '#3b4a5a';
  ctx.lineWidth = 3 * u;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(48 * u, 18 * u); ctx.lineTo(48 * u, 8.5 * u); ctx.stroke();
  ctx.fillStyle = '#00a2e8';
  ctx.beginPath(); ctx.arc(48 * u, 6.8 * u, 4.4 * u, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(46.6 * u, 5.4 * u, 1.6 * u, 0, 7); ctx.fill();

  // Braccia sportive + mani sferiche fluttuanti stile Mii
  if (o.armsUp) {
    // Braccio sinistro alzato
    ctx.fillStyle = '#00a2e8';
    ctx.beginPath(); ctx.arc(16 * u, 44 * u, 4.8 * u, 0, 7); ctx.fill();
    drawMiiHand(ctx, 10 * u, 33 * u, 6.2 * u, u);
    // Braccio destro alzato
    ctx.fillStyle = '#00a2e8';
    ctx.beginPath(); ctx.arc(80 * u, 44 * u, 4.8 * u, 0, 7); ctx.fill();
    drawMiiHand(ctx, 86 * u, 33 * u, 6.2 * u, u);
  } else {
    // Spalle/maniche corte Wii Sports
    ctx.fillStyle = '#00a2e8';
    ctx.beginPath(); ctx.arc(16 * u, 49 * u, 5 * u, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(80 * u, 49 * u, 5 * u, 0, 7); ctx.fill();
    // Mani sferiche fluttuanti Mii
    drawMiiHand(ctx, 12 * u, 61 * u, 6 * u, u);
    drawMiiHand(ctx, 84 * u, 61 * u, 6 * u, u);
  }

  // Corpo principale: guscio superiore giallo solare + maglia atletica Wii Sports in basso
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.roundRect(18 * u, 17 * u, 60 * u, 59 * u, 17 * u); ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(20.5 * u, 19.5 * u, 55 * u, 54 * u, 14.5 * u);
  ctx.clip();

  // Parte alta: giallo solare brillante Pico
  ctx.fillStyle = C.pico;
  ctx.fillRect(18 * u, 17 * u, 60 * u, 42 * u);

  // Parte bassa: divisa sportiva Azzurro Wii (#00a2e8) con bordo bianco
  ctx.fillStyle = '#00a2e8';
  ctx.fillRect(18 * u, 55 * u, 60 * u, 22 * u);
  // Colletto / striscia sportiva bianca a V stile polo Wii Sports
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3 * u;
  ctx.beginPath();
  ctx.moveTo(20 * u, 56 * u);
  ctx.lineTo(42 * u, 56 * u);
  ctx.lineTo(48 * u, 62 * u);
  ctx.lineTo(54 * u, 56 * u);
  ctx.lineTo(76 * u, 56 * u);
  ctx.stroke();

  // Fascia antisudore (sweatband) sportiva bianca e azzurra/corallo sulla fronte
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(19 * u, 22.5 * u, 58 * u, 6.5 * u);
  ctx.fillStyle = '#00a2e8';
  ctx.fillRect(19 * u, 24.8 * u, 58 * u, 2.2 * u);

  ctx.restore();

  // Riflesso superiore glossy sulla testa
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.beginPath(); ctx.roundRect(26 * u, 19.5 * u, 44 * u, 5 * u, 3 * u); ctx.fill();

  // Visiera luminosa stile schermo Mii
  ctx.fillStyle = '#1f3347';
  ctx.beginPath(); ctx.roundRect(26.5 * u, 30.5 * u, 43 * u, 26 * u, 11 * u); ctx.fill();
  ctx.fillStyle = '#d9f2ff';
  ctx.beginPath(); ctx.roundRect(28 * u, 32 * u, 40 * u, 23 * u, 9.5 * u); ctx.fill();

  // Sopracciglia espressive stile Mii
  ctx.strokeStyle = '#2f3b4c';
  ctx.lineWidth = 2.2 * u;
  ctx.lineCap = 'round';
  const browY = o.armsUp ? 35.5 * u : 36.8 * u;
  ctx.beginPath(); ctx.moveTo(33 * u, browY); ctx.quadraticCurveTo(37 * u, browY - 2 * u, 41 * u, browY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(55 * u, browY); ctx.quadraticCurveTo(59 * u, browY - 2 * u, 63 * u, browY); ctx.stroke();

  // Occhi Mii
  if (o.blink) {
    ctx.strokeStyle = C.picoEye;
    ctx.lineWidth = 2.6 * u;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(33 * u, 44 * u); ctx.lineTo(41 * u, 44 * u); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(55 * u, 44 * u); ctx.lineTo(63 * u, 44 * u); ctx.stroke();
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(37 * u, 43.5 * u, 5.6 * u, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(59 * u, 43.5 * u, 5.6 * u, 0, 7); ctx.fill();
    ctx.fillStyle = '#0078b8';
    ctx.beginPath(); ctx.arc(37.8 * u, 44 * u, 3.6 * u, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(59.8 * u, 44 * u, 3.6 * u, 0, 7); ctx.fill();
    ctx.fillStyle = C.picoEye;
    ctx.beginPath(); ctx.arc(38 * u, 44.2 * u, 2.2 * u, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(60 * u, 44.2 * u, 2.2 * u, 0, 7); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(36.6 * u, 42.6 * u, 1.3 * u, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(58.6 * u, 42.6 * u, 1.3 * u, 0, 7); ctx.fill();
  }

  // Bocca
  if (o.mouth === 'smile') {
    ctx.strokeStyle = C.picoEye;
    ctx.lineWidth = 2.3 * u;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(43.5 * u, 49.5 * u); ctx.quadraticCurveTo(48 * u, 53.8 * u, 52.5 * u, 49.5 * u); ctx.stroke();
  } else if (o.mouth === 'open') {
    ctx.fillStyle = C.picoEye;
    ctx.beginPath(); ctx.ellipse(48 * u, 50.5 * u, 4.6 * u, 3.4 * u, 0, 0, 7); ctx.fill();
    ctx.fillStyle = C.picoCheek;
    ctx.beginPath(); ctx.ellipse(48 * u, 51.8 * u, 2.4 * u, 1.5 * u, 0, 0, 7); ctx.fill();
  } else {
    ctx.fillStyle = C.picoEye;
    ctx.beginPath(); ctx.arc(48 * u, 50.5 * u, 2.6 * u, 0, 7); ctx.fill();
  }

  // Guance rosate Mii
  ctx.fillStyle = C.picoCheek;
  ctx.beginPath(); ctx.ellipse(31.5 * u, 48.5 * u, 2.8 * u, 1.8 * u, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(64.5 * u, 48.5 * u, 2.8 * u, 1.8 * u, 0, 0, 7); ctx.fill();

  // Medaglietta / pettorale sportivo sul petto
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.roundRect(41 * u, 63 * u, 14 * u, 8 * u, 3 * u); ctx.fill();
  ctx.fillStyle = '#0078b8';
  ctx.fillRect(44 * u, 65.5 * u, 8 * u, 3 * u);

  // Ruote sportive con cerchione Azzurro Wii
  for (const [wx, wy] of [[32, 78], [64, 78]] as const) {
    ctx.fillStyle = C.ink;
    ctx.beginPath(); ctx.arc(wx * u, wy * u, 8.5 * u, 0, 7); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(wx * u, wy * u, 5.5 * u, 0, 7); ctx.fill();
    ctx.strokeStyle = '#00a2e8';
    ctx.lineWidth = 2 * u;
    ctx.beginPath(); ctx.arc(wx * u, wy * u, 4.6 * u, 0, 7); ctx.stroke();
    ctx.strokeStyle = '#00a2e8';
    ctx.lineWidth = 1.8 * u;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(wx * u + Math.cos(o.wheelAngle) * 3.8 * u, wy * u + Math.sin(o.wheelAngle) * 3.8 * u);
    ctx.lineTo(wx * u - Math.cos(o.wheelAngle) * 3.8 * u, wy * u - Math.sin(o.wheelAngle) * 3.8 * u);
    ctx.stroke();
    ctx.fillStyle = C.ink;
    ctx.beginPath(); ctx.arc(wx * u, wy * u, 1.6 * u, 0, 7); ctx.fill();
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

/** Pico di profilo, per la corsa: una ruota sportiva, visiera frontale e mano Mii. */
interface SideOpts {
  wheelAngle: number;
  tilt: number;
  arm: 'down' | 'forward' | 'back' | 'up';
}

function drawPicoSide(ctx: CanvasRenderingContext2D, S: number, o: SideOpts): void {
  const u = S / 96;
  // Ombra a terra (non si inclina con il corpo)
  ctx.fillStyle = 'rgba(25,55,85,0.18)';
  ctx.beginPath(); ctx.ellipse(50 * u, 91 * u, 28 * u, 4.8 * u, 0, 0, 7); ctx.fill();

  // Si inclina sulla ruota, come un runner in spinta
  ctx.save();
  ctx.translate(46 * u, 78 * u);
  ctx.rotate(o.tilt);
  ctx.translate(-46 * u, -78 * u);

  // Zainetto sportivo aerodinamico (bianco e Azzurro Wii)
  ctx.fillStyle = '#0078b8';
  ctx.beginPath(); ctx.roundRect(8 * u, 37 * u, 15 * u, 25 * u, 6 * u); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.roundRect(10 * u, 39 * u, 11 * u, 20 * u, 4 * u); ctx.fill();
  ctx.fillStyle = '#00a2e8';
  ctx.fillRect(10 * u, 46 * u, 11 * u, 5 * u);

  // Ruota sportiva Wii con cerchione bianco e raggio azzurro
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.arc(46 * u, 78 * u, 12.5 * u, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(46 * u, 78 * u, 8.2 * u, 0, 7); ctx.fill();
  ctx.strokeStyle = '#00a2e8';
  ctx.lineWidth = 2.4 * u;
  ctx.beginPath(); ctx.arc(46 * u, 78 * u, 7 * u, 0, 7); ctx.stroke();
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(46 * u + Math.cos(o.wheelAngle) * 6.2 * u, 78 * u + Math.sin(o.wheelAngle) * 6.2 * u);
  ctx.lineTo(46 * u - Math.cos(o.wheelAngle) * 6.2 * u, 78 * u - Math.sin(o.wheelAngle) * 6.2 * u);
  ctx.stroke();
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.arc(46 * u, 78 * u, 2.2 * u, 0, 7); ctx.fill();

  // Corpo di profilo: testa giallo solare + maglia sportiva Azzurro Wii
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.roundRect(19 * u, 25 * u, 55 * u, 48 * u, 15 * u); ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(21.5 * u, 27.5 * u, 50 * u, 43 * u, 12.5 * u);
  ctx.clip();

  ctx.fillStyle = C.pico;
  ctx.fillRect(19 * u, 25 * u, 55 * u, 33 * u);

  // Maglia atletica Azzurro Wii nella parte bassa del busto
  ctx.fillStyle = '#00a2e8';
  ctx.fillRect(19 * u, 56 * u, 55 * u, 17 * u);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(19 * u, 55.5 * u, 55 * u, 2.5 * u);

  // Fascia antisudore (sweatband) sulla fronte + codine svolazzanti dietro
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(19 * u, 29.5 * u, 55 * u, 5.5 * u);
  ctx.fillStyle = '#00a2e8';
  ctx.fillRect(19 * u, 31.3 * u, 55 * u, 2 * u);

  ctx.restore();

  // Codina del nastro antisudore che sventola dietro la nuca
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(19 * u, 31 * u);
  ctx.lineTo(9 * u, 28 * u);
  ctx.lineTo(11 * u, 34 * u);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#00a2e8';
  ctx.lineWidth = 1.5 * u;
  ctx.stroke();

  // Visiera frontale (guarda a destra)
  ctx.fillStyle = '#1f3347';
  ctx.beginPath(); ctx.roundRect(47.5 * u, 35.5 * u, 24.5 * u, 19.5 * u, 8.5 * u); ctx.fill();
  ctx.fillStyle = '#d9f2ff';
  ctx.beginPath(); ctx.roundRect(49 * u, 37 * u, 22 * u, 16.5 * u, 7.5 * u); ctx.fill();

  // Sopracciglio determinato Mii
  ctx.strokeStyle = '#2f3b4c';
  ctx.lineWidth = 2.2 * u;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(56 * u, 39.5 * u); ctx.lineTo(65 * u, 40.5 * u); ctx.stroke();

  // Occhio
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(61 * u, 45.5 * u, 5 * u, 0, 7); ctx.fill();
  ctx.fillStyle = '#0078b8';
  ctx.beginPath(); ctx.arc(62 * u, 46 * u, 3.2 * u, 0, 7); ctx.fill();
  ctx.fillStyle = C.picoEye;
  ctx.beginPath(); ctx.arc(62.4 * u, 46 * u, 2 * u, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(61 * u, 44.2 * u, 1.2 * u, 0, 7); ctx.fill();

  // Bocca sorridente e guancia
  ctx.strokeStyle = C.picoEye;
  ctx.lineWidth = 2 * u;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(57 * u, 55 * u);
  ctx.quadraticCurveTo(62 * u, 58 * u, 66.5 * u, 54 * u);
  ctx.stroke();
  ctx.fillStyle = C.picoCheek;
  ctx.beginPath(); ctx.ellipse(53 * u, 53.5 * u, 2.6 * u, 1.7 * u, 0, 0, 7); ctx.fill();

  // Braccio + mano sferica Mii in primo piano (oscilla con il passo)
  const handPos: [number, number] =
    o.arm === 'forward'
      ? [64 * u, 56 * u]
      : o.arm === 'back'
        ? [28 * u, 58 * u]
        : o.arm === 'up'
          ? [62 * u, 32 * u]
          : [46 * u, 62 * u];
  // Spalla azzurra
  ctx.fillStyle = '#0078b8';
  ctx.beginPath(); ctx.arc(44 * u, 54 * u, 4.5 * u, 0, 7); ctx.fill();
  drawMiiHand(ctx, handPos[0], handPos[1], 6 * u, u);

  // Antenna inclinata per la velocità
  ctx.strokeStyle = '#3b4a5a';
  ctx.lineWidth = 3 * u;
  ctx.beginPath(); ctx.moveTo(39 * u, 25 * u); ctx.lineTo(35 * u, 13 * u); ctx.stroke();
  ctx.fillStyle = '#00a2e8';
  ctx.beginPath(); ctx.arc(35 * u, 10.5 * u, 4.2 * u, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(33.8 * u, 9.3 * u, 1.4 * u, 0, 7); ctx.fill();

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
