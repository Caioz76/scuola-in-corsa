/**
 * Sfondi parallax per materia: cielo + sole + decorazioni a tema (far)
 * e colline (mid). Larghezza 2048 = 2× lo schermo, cicli sinusoidali interi
 * → tileabile senza cuciture.
 */
import type Phaser from 'phaser';

type Ctx = CanvasRenderingContext2D;

export const SUBJECTS = ['matematica', 'italiano', 'scienze', 'storia'] as const;
export type SubjectId = (typeof SUBJECTS)[number];

const W = 2048;
const H = 576;

interface Theme {
  farTop: string; farBottom: string; sun: string;
  hill1: string; hill2: string;
}

const THEMES: Record<SubjectId, Theme> = {
  matematica: { farTop: '#c9ecff', farBottom: '#7ec8f2', sun: '#ffd93d', hill1: '#a8e6b4', hill2: '#58d68d' },
  italiano:   { farTop: '#ffedd2', farBottom: '#ffd9a0', sun: '#ff9f43', hill1: '#f2b58a', hill2: '#e8926f' },
  scienze:    { farTop: '#d9f9e9', farBottom: '#9fe8c5', sun: '#ffe98a', hill1: '#7ad9a8', hill2: '#35b06f' },
  storia:     { farTop: '#f7e8cf', farBottom: '#e8c9a0', sun: '#ffcf5d', hill1: '#d2ab7c', hill2: '#b58a5c' }
};

function cloud(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.beginPath();
  ctx.arc(x - 34 * s, y + 6 * s, 18 * s, 0, 7);
  ctx.arc(x, y, 24 * s, 0, 7);
  ctx.arc(x + 34 * s, y + 6 * s, 18 * s, 0, 7);
  ctx.fill();
}

function sky(ctx: Ctx, t: Theme): void {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, t.farTop);
  g.addColorStop(1, t.farBottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // sole
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath(); ctx.arc(1720, 118, 88, 0, 7); ctx.fill();
  ctx.fillStyle = t.sun;
  ctx.beginPath(); ctx.arc(1720, 118, 62, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath(); ctx.arc(1700, 98, 16, 0, 7); ctx.fill();
  // nuvole
  cloud(ctx, 300, 110, 1);
  cloud(ctx, 900, 82, 0.8);
  cloud(ctx, 1400, 150, 0.9);
}

function hillBand(ctx: Ctx, color: string, base: number, amp: number, cycles: number): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, base);
  for (let x = 0; x <= W; x += 16) {
    const y = base - (Math.sin((x / W) * Math.PI * 2 * cycles) * 0.5 + 0.5) * amp;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();
}

function hills(ctx: Ctx, t: Theme): void {
  hillBand(ctx, t.hill1, 410, 110, 6);
  hillBand(ctx, t.hill2, 480, 80, 9);
}

// ── Decorazioni a tema (alpha bassa, "acquaforte" sullo sfondo) ─────────

function symbol(ctx: Ctx, ch: string, x: number, y: number, size: number): void {
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = `bold ${size}px Verdana, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(ch, x, y);
}

function atom(ctx: Ctx, x: number, y: number, r: number): void {
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0.5, 0, 7); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, -0.5, 0, 7); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
}

function leaf(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(18 * s, -16 * s, 34 * s, 0);
  ctx.quadraticCurveTo(18 * s, 16 * s, 0, 0);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function flask(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 6 * s, y - 16 * s);
  ctx.lineTo(x - 6 * s, y - 4 * s);
  ctx.lineTo(x - 14 * s, y + 14 * s);
  ctx.lineTo(x + 14 * s, y + 14 * s);
  ctx.lineTo(x + 6 * s, y - 4 * s);
  ctx.lineTo(x + 6 * s, y - 16 * s);
  ctx.closePath(); ctx.stroke();
}

function column(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillRect(x - 16 * s, y - 22 * s, 32 * s, 5 * s);          // capitello
  ctx.fillRect(x - 12 * s, y - 17 * s, 24 * s, 30 * s);        // fusto
  ctx.fillRect(x - 16 * s, y + 13 * s, 32 * s, 5 * s);         // base
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  for (const dx of [-7, 0, 7]) ctx.fillRect(x + dx * s - 1 * s, y - 15 * s, 2 * s, 26 * s);
}

function arch(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 5 * s;
  ctx.beginPath();
  ctx.moveTo(x - 20 * s, y + 20 * s);
  ctx.lineTo(x - 20 * s, y);
  ctx.arc(x, y, 20 * s, Math.PI, 0);
  ctx.lineTo(x + 20 * s, y + 20 * s);
  ctx.stroke();
}

function book(ctx: Ctx, x: number, y: number, s: number): void {
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.moveTo(x, y - 12 * s);
  ctx.quadraticCurveTo(x - 14 * s, y - 16 * s, x - 24 * s, y - 10 * s);
  ctx.lineTo(x - 24 * s, y + 10 * s);
  ctx.quadraticCurveTo(x - 12 * s, y + 4 * s, x, y + 8 * s);
  ctx.quadraticCurveTo(x + 12 * s, y + 4 * s, x + 24 * s, y + 10 * s);
  ctx.lineTo(x + 24 * s, y - 10 * s);
  ctx.quadraticCurveTo(x + 14 * s, y - 16 * s, x, y - 12 * s);
  ctx.closePath(); ctx.fill();
}

function decorations(ctx: Ctx, s: SubjectId): void {
  if (s === 'matematica') {
    const syms: [string, number, number, number][] = [
      ['+', 260, 220, 40], ['÷', 520, 150, 34], ['×', 760, 250, 38],
      ['=', 1100, 180, 40], ['7', 1350, 260, 36], ['3', 1560, 210, 32],
      ['√', 880, 300, 34], ['π', 1240, 320, 38], ['−', 430, 320, 34], ['9', 1000, 130, 30]
    ];
    for (const [ch, x, y, sz] of syms) symbol(ctx, ch, x, y, sz);
  } else if (s === 'italiano') {
    const ls: [string, number, number, number][] = [
      ['A', 300, 200, 44], ['b', 560, 260, 40], ['C', 820, 160, 42],
      ['D', 1150, 240, 40], ['E', 1420, 170, 38], ['F', 1650, 260, 36]
    ];
    for (const [ch, x, y, sz] of ls) symbol(ctx, ch, x, y, sz);
    book(ctx, 700, 320, 1.2);
    book(ctx, 1300, 300, 1.0);
  } else if (s === 'scienze') {
    atom(ctx, 340, 210, 30);
    atom(ctx, 1200, 170, 26);
    leaf(ctx, 700, 250, 1.4);
    leaf(ctx, 1480, 240, 1.2);
    flask(ctx, 950, 300, 1.4);
    flask(ctx, 1600, 150, 1.1);
  } else {
    column(ctx, 320, 230, 1.4);
    column(ctx, 1300, 210, 1.2);
    arch(ctx, 750, 220, 1.6);
    arch(ctx, 1550, 260, 1.2);
  }
}

/** Crea gli sfondi parallax delle 4 materie (2 texture ciascuna). */
export function ensureBackgrounds(scene: Phaser.Scene): void {
  for (const s of SUBJECTS) {
    const t = THEMES[s];
    const farKey = `bg-${s}-far`;
    if (scene.textures.exists(farKey)) scene.textures.remove(farKey);
    const cv = scene.textures.createCanvas(farKey, W, H);
    if (cv) {
      const ctx = cv.getContext();
      sky(ctx, t);
      decorations(ctx, s);
      cv.refresh();
    }
    const midKey = `bg-${s}-mid`;
    if (scene.textures.exists(midKey)) scene.textures.remove(midKey);
    const cv2 = scene.textures.createCanvas(midKey, W, H);
    if (cv2) {
      hills(cv2.getContext(), t);
      cv2.refresh();
    }
  }
}
