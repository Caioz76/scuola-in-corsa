/**
 * Texture procedurali stile Flash 8/AS3: pulsanti glossy, pannello,
 * terra, bandiera checkpoint, stella, cuore. Tutto Canvas 2D, zero asset.
 */
import type Phaser from 'phaser';
import { C } from './palette';
import { ICON_IDS, ICON_PAINTERS } from './icons';

type Ctx = CanvasRenderingContext2D;

function lgrad(ctx: Ctx, x0: number, y0: number, x1: number, y1: number, stops: [number, string][]): CanvasGradient {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  for (const [o, c] of stops) g.addColorStop(o, c);
  return g;
}

/**
 * Bottone chiaro e arrotondato: ombra morbida, corpo pastello, riflesso alto.
 * Niente contorno nero: il bordo è una versione più scura del colore stesso.
 */
function button(ctx: Ctx, w: number, h: number, base: string, dark: string, light: string): void {
  // ombra morbida staccata dal corpo
  ctx.fillStyle = 'rgba(59,74,90,0.16)';
  ctx.beginPath(); ctx.roundRect(4, 8, w - 8, h - 10, h / 2.1); ctx.fill();
  // corpo
  ctx.fillStyle = dark;
  ctx.beginPath(); ctx.roundRect(2, 2, w - 4, h - 8, h / 2.1); ctx.fill();
  ctx.fillStyle = lgrad(ctx, 0, 4, 0, h - 8, [[0, light], [0.45, base], [1, base]]);
  ctx.beginPath(); ctx.roundRect(5, 5, w - 10, h - 16, h / 2.6); ctx.fill();
  // riflesso alto, ampio e morbido
  ctx.fillStyle = 'rgba(255,255,255,0.44)';
  ctx.beginPath(); ctx.roundRect(14, 9, w - 28, h * 0.30, h / 4); ctx.fill();
  // riga di luce sul bordo superiore
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.beginPath(); ctx.roundRect(18, 7, w - 36, 4, 2); ctx.fill();
}

/** Pannello scuro con bordo, header e fondo in gradiente. */
function panel(ctx: Ctx, w: number, h: number): void {
  // ombra morbida
  ctx.fillStyle = 'rgba(59,74,90,0.16)';
  ctx.beginPath(); ctx.roundRect(6, 10, w - 12, h - 12, 24); ctx.fill();
  // carta bianca
  ctx.fillStyle = C.panel;
  ctx.beginPath(); ctx.roundRect(2, 2, w - 4, h - 8, 22); ctx.fill();
  // fascia d'intestazione azzurra
  ctx.fillStyle = '#eaf4ff';
  ctx.beginPath(); ctx.roundRect(12, 12, w - 24, 44, 16); ctx.fill();
  ctx.strokeStyle = 'rgba(59,74,90,0.10)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(2, 2, w - 4, h - 8, 22); ctx.stroke();
}

function star(ctx: Ctx, s: number): void {
  const u = s / 48;
  ctx.fillStyle = '#e8b71e';
  const pts: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 21 : 9;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    pts.push([24 + Math.cos(a) * r, 24 + Math.sin(a) * r]);
  }
  ctx.beginPath(); ctx.moveTo(pts[0][0] * u, pts[0][1] * u);
  for (let i = 1; i < 10; i++) ctx.lineTo(pts[i][0] * u, pts[i][1] * u);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffd93d';
  const pts2: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 16 : 7;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    pts2.push([23 + Math.cos(a) * r, 23 + Math.sin(a) * r]);
  }
  ctx.beginPath(); ctx.moveTo(pts2[0][0] * u, pts2[0][1] * u);
  for (let i = 1; i < 10; i++) ctx.lineTo(pts2[i][0] * u, pts2[i][1] * u);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.beginPath(); ctx.arc(19 * u, 18 * u, 3 * u, 0, 7); ctx.fill();
}

function heart(ctx: Ctx, s: number): void {
  const u = s / 48;
  ctx.fillStyle = '#d64242';
  ctx.beginPath();
  ctx.moveTo(24*u, 42*u);
  ctx.bezierCurveTo(6*u, 30*u, 7*u, 10*u, 20*u, 11*u);
  ctx.quadraticCurveTo(24*u, 12*u, 24*u, 17*u);
  ctx.quadraticCurveTo(24*u, 12*u, 28*u, 11*u);
  ctx.bezierCurveTo(41*u, 10*u, 42*u, 30*u, 24*u, 42*u);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ff5d5d';
  ctx.beginPath();
  ctx.moveTo(24*u, 38*u);
  ctx.bezierCurveTo(9*u, 27*u, 10*u, 11*u, 20*u, 12*u);
  ctx.quadraticCurveTo(24*u, 13*u, 24*u, 17*u);
  ctx.quadraticCurveTo(24*u, 13*u, 28*u, 12*u);
  ctx.bezierCurveTo(38*u, 11*u, 39*u, 27*u, 24*u, 38*u);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.beginPath(); ctx.ellipse(17*u, 19*u, 3.4*u, 2.2*u, -0.6, 0, 7); ctx.fill();
}

function flag(ctx: Ctx, w: number, h: number): void {
  // base
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.roundRect(26, h - 14, 20, 12, 4); ctx.fill();
  ctx.fillStyle = C.grayDeep;
  ctx.beginPath(); ctx.roundRect(30, h - 18, 12, 10, 3); ctx.fill();
  // asta
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.roundRect(33, 6, 6, h - 22, 3); ctx.fill();
  ctx.fillStyle = C.gray;
  ctx.beginPath(); ctx.arc(36, 6, 5, 0, 7); ctx.fill();
  // bandiera
  ctx.fillStyle = C.redDeep;
  ctx.beginPath();
  ctx.moveTo(39, 10); ctx.lineTo(68, 18); ctx.lineTo(39, 28); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.red;
  ctx.beginPath();
  ctx.moveTo(39, 12); ctx.lineTo(64, 18); ctx.lineTo(39, 25); ctx.closePath(); ctx.fill();
}

/** Tile di terra tileabile (bordi piatto = si ripete senza cuciture). */
function ground(ctx: Ctx, w: number, h: number): void {
  // prato chiaro
  ctx.fillStyle = lgrad(ctx, 0, 20, 0, h, [[0, '#a8e39a'], [1, '#7ccf72']]);
  ctx.fillRect(0, 20, w, h - 20);
  // chiazze d'erba
  ctx.fillStyle = 'rgba(60,120,60,0.12)';
  for (const [x, y, r] of [[18, 52, 5], [46, 70, 6], [80, 48, 4], [104, 76, 5], [64, 88, 4]] as const) {
    ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.7, 0, 0, 7); ctx.fill();
  }
  // fascia di erba più alta
  ctx.fillStyle = '#8fe08a';
  ctx.fillRect(0, 12, w, 12);
  // bordo chiaro, non nero
  ctx.fillStyle = '#c9f0b8';
  ctx.fillRect(0, 10, w, 3);
  // ciuffi (posizioni interne, tileabili)
  ctx.fillStyle = '#7ccf72';
  for (const x of [12, 34, 58, 82, 108]) {
    ctx.beginPath(); ctx.moveTo(x - 5, 12); ctx.lineTo(x, 4); ctx.lineTo(x + 5, 12); ctx.closePath(); ctx.fill();
  }
}

/** Chip bianco (base per opzioni trascinabili, riordino, abbinamenti). */
function card(ctx: Ctx, w: number, h: number): void {
  // ombra morbida
  ctx.fillStyle = 'rgba(59,74,90,0.18)';
  ctx.beginPath(); ctx.roundRect(4, 7, w - 8, h - 10, 18); ctx.fill();
  // carta bianca
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.roundRect(2, 2, w - 4, h - 10, 17); ctx.fill();
  ctx.fillStyle = 'rgba(234,244,255,0.9)';
  ctx.beginPath(); ctx.roundRect(10, 6, w - 20, h * 0.28, 12); ctx.fill();
  ctx.strokeStyle = 'rgba(59,74,90,0.16)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(2, 2, w - 4, h - 10, 17); ctx.stroke();
}

/** Slot vuoto (bordo tratteggiato) per le prove di riordino. */
function slot(ctx: Ctx, w: number, h: number): void {
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath(); ctx.roundRect(4, 4, w - 8, h - 8, 16); ctx.fill();
  ctx.strokeStyle = 'rgba(59,74,90,0.35)';
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 8]);
  ctx.beginPath(); ctx.roundRect(4, 4, w - 8, h - 8, 16); ctx.stroke();
  ctx.setLineDash([]);
}

/** Bottone tondo piccolo (HUD: pausa, audio). */
function roundbtn(ctx: Ctx, s: number): void {
  ctx.fillStyle = 'rgba(59,74,90,0.16)';
  ctx.beginPath(); ctx.arc(s / 2, s / 2 + 2, s / 2 - 2, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 2 - 4, 0, 7); ctx.fill();
  ctx.fillStyle = lgrad(ctx, 0, 4, 0, s - 4, [[0, '#ffffff'], [1, '#e8f1fa']]);
  ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 2 - 7, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.beginPath(); ctx.ellipse(s / 2, s * 0.30, s * 0.30, s * 0.15, 0, 0, 7); ctx.fill();
}

/** Oggetti di bordo strada: danno la misura dello scorrimento. */
function propsRow(ctx: Ctx, w: number, h: number): void {
  // cespuglio
  const bush = (x: number, s: number): void => {
    ctx.fillStyle = '#5cc45c';
    ctx.beginPath();
    ctx.arc(x - 13 * s, h - 12 * s, 10 * s, 0, 7);
    ctx.arc(x, h - 18 * s, 13 * s, 0, 7);
    ctx.arc(x + 13 * s, h - 12 * s, 10 * s, 0, 7);
    ctx.fill();
    ctx.fillStyle = '#8fe08a';
    ctx.beginPath();
    ctx.arc(x - 8 * s, h - 20 * s, 7 * s, 0, 7);
    ctx.arc(x + 6 * s, h - 22 * s, 8 * s, 0, 7);
    ctx.fill();
  };
  // sasso
  const stone = (x: number, s: number): void => {
    ctx.fillStyle = '#c9d3e0';
    ctx.beginPath(); ctx.ellipse(x, h - 9 * s, 14 * s, 9 * s, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#eef2f7';
    ctx.beginPath(); ctx.ellipse(x - 3 * s, h - 12 * s, 7 * s, 4 * s, -0.3, 0, 7); ctx.fill();
  };
  // fiorellino
  const flower = (x: number, s: number): void => {
    ctx.strokeStyle = '#5cc45c';
    ctx.lineWidth = 2.5 * s;
    ctx.beginPath(); ctx.moveTo(x, h - 4 * s); ctx.lineTo(x, h - 18 * s); ctx.stroke();
    ctx.fillStyle = '#ffa8c8';
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * 5 * s, h - 18 * s + Math.sin(a) * 5 * s, 3.4 * s, 0, 7);
      ctx.fill();
    }
    ctx.fillStyle = '#ffd93d';
    ctx.beginPath(); ctx.arc(x, h - 18 * s, 3 * s, 0, 7); ctx.fill();
  };
  bush(52, 1);
  stone(150, 0.9);
  flower(238, 1);
  bush(330, 0.75);
  stone(404, 0.7);
  flower(474, 0.85);
  // ciuffi d'erba
  ctx.fillStyle = '#7ccf72';
  for (const x of [20, 108, 196, 288, 372, 448]) {
    ctx.beginPath(); ctx.moveTo(x - 5, h); ctx.lineTo(x, h - 11); ctx.lineTo(x + 5, h); ctx.closePath(); ctx.fill();
  }
}

/** Crea tutte le texture UI. Da chiamare una volta sola (Boot). */
export function ensureUI(scene: Phaser.Scene): void {
  const make = (key: string, w: number, h: number, draw: (ctx: Ctx) => void): void => {
    if (scene.textures.exists(key)) scene.textures.remove(key);
    const cv = scene.textures.createCanvas(key, w, h);
    if (!cv) return;
    draw(cv.getContext());
    cv.refresh();
  };
  make('btn-green', 320, 84, (ctx) => button(ctx, 320, 84, '#8fdcab', '#57b87f', '#cdf7dd'));
  make('btn-blue', 320, 84, (ctx) => button(ctx, 320, 84, '#93d2f7', '#5fade3', '#d2efff'));
  make('btn-orange', 320, 84, (ctx) => button(ctx, 320, 84, C.orange, C.orangeDeep, '#ffd9a8'));
  make('btn-red', 320, 84, (ctx) => button(ctx, 320, 84, '#f79a9a', '#d97b7b', '#ffd0d0'));
  make('btn-yellow', 320, 84, (ctx) => button(ctx, 320, 84, C.pico, C.picoDark, '#fff3b0'));
  make('btn-gray', 320, 84, (ctx) => button(ctx, 320, 84, C.gray, C.grayDeep, '#eef2fa'));
  make('panel', 700, 480, (ctx) => panel(ctx, 700, 480));
  make('star', 48, 48, (ctx) => star(ctx, 48));
  make('heart', 48, 48, (ctx) => heart(ctx, 48));
  make('flag', 72, 108, (ctx) => flag(ctx, 72, 108));
  make('ground', 128, 96, (ctx) => ground(ctx, 128, 96));
  make('card', 256, 96, (ctx) => card(ctx, 256, 96));
  make('slot', 256, 96, (ctx) => slot(ctx, 256, 96));
  make('roundbtn', 48, 48, (ctx) => roundbtn(ctx, 48));
  // groundRow: 9 tile ripetuti → larghezza 1152, sposta seamlessly con mod 128
  make('groundRow', 1152, 96, (ctx) => {
    for (let i = 0; i < 9; i++) {
      ctx.save();
      ctx.translate(i * 128, 0);
      ground(ctx, 128, 96);
      ctx.restore();
    }
  });
  // propsRow: cespugli, sassi e fiori sul bordo della pista (modalità Runner)
  make('propsRow', 512, 64, (ctx) => propsRow(ctx, 512, 64));
}

/** Crea le texture delle icone (id → texture `icon-{id}`) per le prove di riconoscimento. */
export function ensureIcons(scene: Phaser.Scene): void {
  for (const id of ICON_IDS) {
    const key = `icon-${id}`;
    if (scene.textures.exists(key)) scene.textures.remove(key);
    const cv = scene.textures.createCanvas(key, 96, 96);
    if (!cv) continue;
    const ctx = cv.getContext();
    // fondo carta morbido
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.beginPath(); ctx.roundRect(2, 2, 92, 92, 14); ctx.fill();
    ctx.strokeStyle = 'rgba(32,34,47,0.25)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(3, 3, 90, 90, 13); ctx.stroke();
    ICON_PAINTERS[id](ctx, 96);
    cv.refresh();
  }
}
